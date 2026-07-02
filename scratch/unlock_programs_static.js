const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'programs.html');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove a div do cadeado estático
  // Ela tem a estrutura:
  // <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
  //   <div style="width: 56px; height: 56px; ...">
  //     <svg ...></svg>
  //   </div>
  // </div>
  const lockOverlayRegex = /<div style="position:\s*absolute;\s*inset:\s*0;\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;">[\s\S]*?<rect x="3" y="11" width="18" height="11"[\s\S]*?<\/div>\s*<\/div>/g;
  
  let count = 0;
  content = content.replace(lockOverlayRegex, () => {
    count++;
    return '';
  });
  console.log(`Removidos ${count} overlays de cadeado estáticos em programs.html`);

  // 2. Remove o filtro de brilho das imagens
  content = content.replace(/filter:\s*brightness\(0\.[78]\);/g, '');

  // 3. Atualiza os links de redirecionamento "subscription.html" nos cards para links de iniciar programa!
  // Em vez de <a href="subscription.html" class="btn btn--gold">...</a>
  // Vamos trocar para um botão que chama startProgram!
  // ex: <button onclick="startProgram('Body Sculptor', 14)" class="btn btn--primary">Iniciar Programa</button>
  const linkRegex = /<a href="subscription.html" class="btn btn--gold">([\s\S]*?)<\/a>/g;
  content = content.replace(linkRegex, (match, text) => {
    // Tenta achar o título do programa mais próximo acima do link no HTML
    // Mas no HTML, o link está abaixo do h2.
    // Para simplificar, o JS já faz essa troca dinamicamente!
    // Como o JS já faz essa troca se canPlayContent() retornar true (e nós definimos que canPlayContent agora sempre retorna true!),
    // o próprio JS já vai mudar o href do botão e o texto para "Iniciar Programa" dinamicamente no carregamento.
    // Então só precisamos garantir que o JS ache todos os botões e remova os cadeados.
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
} else {
  console.log('programs.html não encontrado.');
}
