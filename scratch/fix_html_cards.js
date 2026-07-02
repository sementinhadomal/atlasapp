const fs = require('fs');
const path = require('path');

// 1. CORRIGIR YOGA.HTML
const yogaPath = path.join(__dirname, '..', 'yoga.html');
if (fs.existsSync(yogaPath)) {
  let content = fs.readFileSync(yogaPath, 'utf8');
  const cardRegex = /<article class="card reveal"([^>]*?)>([\s\S]*?)<\/article>/g;
  let modifiedCount = 0;

  content = content.replace(cardRegex, (match, attrs, body) => {
    if (body.includes('openVideoModal') || body.includes('openExerciseModal')) {
      return match;
    }

    const titleMatch = body.match(/<h2 class="card__title">([\s\S]*?)<\/h2>/);
    const durationMatch = body.match(/(\d+\s*min)/);
    
    if (titleMatch) {
      const title = titleMatch[1].trim();
      const duration = durationMatch ? durationMatch[1].trim() : '30 min';

      const mediaRegex = /(<div class="card__media">[\s\S]*?<\/div>)/;
      const newMedia = `
            <img src="assets/images/yoga.png" alt="${title}" loading="lazy" style="filter: brightness(0.7);" />
            <span class="card__badge card__badge--premium">Premium</span>
            <div class="card__lock">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <button class="card__play-overlay" onclick="openVideoModal('${title}', '${duration}')" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:transparent; cursor:pointer;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:#fff; drop-shadow: 0 4px 12px rgba(0,0,0,0.5);"><circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.2)"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>
            </button>
          `;
      
      let newBody = body.replace(/<div class="card__media">[\s\S]*?<\/div>/, newMedia.trim());
      modifiedCount++;
      return `<article class="card reveal"${attrs}>${newBody}</article>`;
    }
    return match;
  });

  fs.writeFileSync(yogaPath, content, 'utf8');
  console.log(`Corrigido yoga.html: ${modifiedCount} cards atualizados.`);
}

// 2. CORRIGIR PILATES.HTML
const pilatesPath = path.join(__dirname, '..', 'pilates.html');
if (fs.existsSync(pilatesPath)) {
  let content = fs.readFileSync(pilatesPath, 'utf8');
  
  // Vamos processar o arquivo linha por linha para saber em qual seção de equipamento estamos
  const lines = content.split('\n');
  let currentSection = 'bar'; // default
  let modifiedCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detecta mudança de seção
    if (line.includes('id="barContent"')) currentSection = 'bar';
    else if (line.includes('id="elasticContent"') || line.includes('data-tab="elastic"') && line.includes('Content')) currentSection = 'elastic';
    else if (line.includes('id="ringContent"')) currentSection = 'ring';
    else if (line.includes('id="matContent"')) currentSection = 'mat';
    
    // Se achamos um card que abre
    if (line.includes('<article class="card reveal"') || line.includes('<article class="card"')) {
      // Lê o bloco do card (até fechar </article>)
      let cardBlock = '';
      let j = i;
      while (j < lines.length && !lines[j].includes('</article>')) {
        cardBlock += lines[j] + '\n';
        j++;
      }
      cardBlock += lines[j] + '\n';
      
      // Se não contiver onclick ou openExerciseModal
      if (!cardBlock.includes('openExerciseModal') && !cardBlock.includes('openVideoModal')) {
        // Extrai título
        const titleMatch = cardBlock.match(/<h2 class="card__title">([\s\S]*?)<\/h2>/);
        if (titleMatch) {
          const title = titleMatch[1].trim();
          
          // Injeta o botão de play cobrindo a mídia
          const searchMediaClose = '</div>\r\n            <div class="card__body">';
          const searchMediaCloseAlt = '</div>\n            <div class="card__body">';
          
          let replaceTarget = '';
          let replacement = '';
          
          const buttonHtml = `
              <button onclick="openExerciseModal('${title}', '${currentSection}')" style="position:absolute;inset:0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;">
                <div class="play-icon" style="width:52px;height:52px;border-radius:50%;background:rgba(250,248,244,0.9);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-near-black)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </button>
            </div>
            <div class="card__body">`;
            
          if (cardBlock.includes(searchMediaClose)) {
            replaceTarget = searchMediaClose;
            replacement = buttonHtml;
          } else if (cardBlock.includes(searchMediaCloseAlt)) {
            replaceTarget = searchMediaCloseAlt;
            replacement = buttonHtml;
          }
          
          if (replaceTarget) {
            const newCardBlock = cardBlock.replace(replaceTarget, replacement);
            // Substitui de volta no array de linhas
            const cardLines = newCardBlock.split('\n');
            lines.splice(i, j - i + 1, ...cardLines);
            modifiedCount++;
            // Ajusta o índice para pular o bloco processado
            i = i + cardLines.length - 2;
          }
        }
      }
    }
  }
  
  fs.writeFileSync(pilatesPath, lines.join('\n'), 'utf8');
  console.log(`Corrigido pilates.html: ${modifiedCount} cards atualizados.`);
}
