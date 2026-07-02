const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

// Helper to clean and slugify program titles
function getProgramId(title) {
  return title.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 1. REDIRECIONAR INDEX.HTML PARA PROGRAMS.HTML
const indexPath = path.join(projectDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  // Insere script de redirect no head
  if (!content.includes('window.location.href')) {
    content = content.replace('<head>', '<head>\n  <script>\n    window.location.href = "programs.html?v=1.0.8";\n  </script>');
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('Redirecionamento adicionado em index.html');
  }
}

// 2. ALTERAR LINKS DE NAVEGAÇÃO DE INDEX.HTML PARA PROGRAMS.HTML
const htmlFiles = ['index.html', 'yoga.html', 'pilates.html', 'programs.html', 'library.html', 'profile.html', 'subscription.html'];
htmlFiles.forEach(fileName => {
  const filePath = path.join(projectDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Substitui links do menu/footer de index.html para programs.html
    content = content.replace(/href="index\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="programs.html?v=1.0.8');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Navegação atualizada em ${fileName}`);
  }
});

// 3. ATUALIZAR PROGRAMS.HTML PARA TER PROGRESSO DINÂMICO EM TODOS OS 18 PROGRAMAS
const programsPath = path.join(projectDir, 'programs.html');
if (fs.existsSync(programsPath)) {
  let content = fs.readFileSync(programsPath, 'utf8');

  // Separamos pelos blocos de programa
  const blocks = content.split(/<div class="reveal"/g);
  let newContent = blocks[0]; // cabeçalho da página

  for (let i = 1; i < blocks.length; i++) {
    let block = blocks[i];
    
    // Captura o título
    const titleMatch = block.match(/<h2 class="heading-lg"[^>]*?>([\s\S]*?)<\/h2>/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Captura a duração (dias)
    const durationMatch = block.match(/<span class="label-sm text-muted">([\s\S]*?)<\/span>/) || block.match(/(\d+)\s*(Days|Dias)/i);
    let totalDays = 7;
    if (durationMatch) {
      const daysText = durationMatch[1] || '';
      const num = parseInt(daysText.replace(/\D/g, ''));
      if (num) totalDays = num;
    }

    const programId = getProgramId(title);

    // Remove qualquer grade de dias/semanas estática antiga ou estatísticas antigas se houver
    block = block.replace(/<!-- Daily preview -->[\s\S]*?<\/div>\s*<\/div>/g, '');
    block = block.replace(/<div style="display: grid; grid-template-columns: repeat\(4,1fr\)[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
    block = block.replace(/<div style="display: grid; grid-template-columns: repeat\(7,1fr\)[\s\S]*?<\/div>/g, '');
    block = block.replace(/<div style="display: grid; grid-template-columns: repeat\(7, 1fr\)[\s\S]*?<\/div>/g, '');

    // Captura os stats de treino daquele bloco para manter (diário, nível, equipamentos)
    const statsMatch = block.match(/<div style="display: flex; gap: var\(--space-lg\);">[\s\S]*?<\/div>\s*<\/div>/);
    const statsHtml = statsMatch ? statsMatch[0] : '';

    // Reconstrói a área de ação com o botão padronizado Iniciar e a grade de progresso dinâmica
    const actionBlockRegex = /<div style="display: flex; gap: var\(--space-md\); align-items: center; flex-wrap: wrap;">[\s\S]*?<\/div>\s*<\/div>/i;
    
    const replacementActionHtml = `<!-- Daily progress grid -->
              <div class="program-progress-grid" data-program-id="${programId}" data-total-days="${totalDays}" data-prefix="D" style="display: grid; grid-template-columns: repeat(7,1fr); gap: var(--space-xs); margin-bottom: var(--space-xl);"></div>

              <div style="display: flex; gap: var(--space-md); align-items: center; flex-wrap: wrap;">
                <button id="btn-${programId}" onclick="startProgram('${title}', ${totalDays})" class="btn btn--primary">Iniciar Programa</button>
                ${statsHtml}
              </div>`;

    // Substitui a área de botões e grids antigos
    block = block.replace(actionBlockRegex, replacementActionHtml);
    
    // Fallback: se por algum motivo a substituição da ação não pegou, fazemos uma substituição direta antes do fechamento das divs
    if (!block.includes(`data-program-id="${programId}"`)) {
      // Insere antes do fechamento das divs principais
      block = block.replace(/<\/div>\s*<\/div>\s*<\/div>\s*$/g, `${replacementActionHtml}\n            </div>\n          </div>\n        </div>`);
    }

    newContent += '<div class="reveal"' + block;
  }

  fs.writeFileSync(programsPath, newContent, 'utf8');
  console.log('programs.html atualizado com progresso dinâmico e botões em todos os 18 programas.');
}
