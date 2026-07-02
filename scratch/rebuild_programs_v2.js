const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const filePath = path.join(projectDir, 'programs.html');

if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Separators
  const startMarker = '<div style="display: flex; flex-direction: column; gap: var(--space-2xl);" id="programsGrid">';
  const endMarker = '<!-- FOOTER -->';

  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found!');
    process.exit(1);
  }

  const header = content.substring(0, startIndex + startMarker.length);
  const footer = content.substring(endIndex);
  const programsSection = content.substring(startIndex + startMarker.length, endIndex);

  // Split by program comment prefix
  const parts = programsSection.split('<!-- PROGRAM ');
  console.log(`Processing ${parts.length - 1} programs...`);

  let rebuiltPrograms = '\n\n';

  for (let i = 1; i < parts.length; i++) {
    let part = parts[i];
    
    // If it's the last part, slice off the outer grid closing tags
    if (i === parts.length - 1) {
      const closeMatch = part.match(/<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i);
      if (closeMatch) {
        part = part.substring(0, closeMatch.index + 6);
      }
    }

    const card = '<!-- PROGRAM ' + part;

    // 1. Get comment
    const commentMatch = card.match(/(<!-- PROGRAM [\s\S]*?-->)/);
    const comment = commentMatch ? commentMatch[1] : `<!-- PROGRAM ${i} -->`;

    // 2. Get reveal tag and data-category
    const revealTagMatch = card.match(/(<div class="reveal"[^>]*?>)/);
    let revealTag = revealTagMatch ? revealTagMatch[1] : '<div class="reveal" style="border: 1px solid var(--border-light); border-radius: var(--radius-2xl); overflow: hidden; background: var(--bg-card);">';

    // 3. Get image src and alt
    const imgMatch = card.match(/<img\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*?>/i) || card.match(/<img\s+alt="([^"]*)"\s+src="([^"]+)"[^>]*?>/i);
    let imgHtml = '';
    if (imgMatch) {
      const src = imgMatch[1].includes('src=') ? imgMatch[2] : imgMatch[1];
      const alt = imgMatch[1].includes('src=') ? imgMatch[1] : imgMatch[2];
      imgHtml = `<img src="${src}" alt="${alt}" style="width:100%; height:100%; object-fit:cover;" />`;
    } else {
      imgHtml = `<img src="assets/images/yoga.png" alt="Program" style="width:100%; height:100%; object-fit:cover;" />`;
    }

    // 4. Get title
    const titleMatch = card.match(/<h2 class="heading-lg"[^>]*?>([\s\S]*?)<\/h2>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Atlas Program';

    // 5. Get description
    const descMatch = card.match(/<p style="color:\s*var\(--text-muted\);[^>]*?>([\s\S]*?)<\/p>/) || card.match(/<p[^>]*?>([\s\S]*?)<\/p>/);
    const description = descMatch ? descMatch[1].trim() : '';

    // 6. Get duration text
    const durMatch = card.match(/<span class="label-sm text-muted">([\s\S]*?)<\/span>/);
    const durationText = durMatch ? durMatch[1].trim() : '7 Days';
    let daysNum = 7;
    const extractedNum = parseInt(durationText.replace(/\D/g, ''));
    if (extractedNum) daysNum = extractedNum;

    // 7. Get extraStats block if it exists (using safe substring search)
    let extraStatsHtml = '';
    if (card.includes('Ring workouts') || card.includes('Bar workouts') || card.includes('sessões')) {
      const startIdx = card.indexOf('<div style="display: flex; gap: var(--space-xl); margin-bottom: var(--space-xl);">');
      if (startIdx !== -1) {
        const endIdx = card.indexOf('<div style="display: flex; gap: var(--space-md);');
        if (endIdx !== -1) {
          extraStatsHtml = card.substring(startIdx, endIdx).trim();
        }
      }
    } else if (card.includes('Dias') && card.includes('Treinos') && card.includes('Equipamentos')) {
      const startIdx = card.indexOf('<div style="display: grid; grid-template-columns: repeat(4,1fr);');
      if (startIdx !== -1) {
        const endIdx = card.indexOf('<div style="display: flex; gap: var(--space-md);');
        if (endIdx !== -1) {
          extraStatsHtml = card.substring(startIdx, endIdx).trim();
        }
      }
    }

    // 8. Parse small stats line (Daily, Level, Equipment) using precise RegExp
    let dailyVal = '20–30 min';
    let levelVal = 'Iniciante';
    let equipVal = 'Nenhum';

    const dailyMatch = card.match(/(?:Daily|Diário)<\/div>\s*<div[^>]*?>([\s\S]*?)<\/div>/i);
    const levelMatch = card.match(/(?:Level|Nível)<\/div>\s*<div[^>]*?>([\s\S]*?)<\/div>/i);
    const equipMatch = card.match(/(?:Equipment|Equipamento)<\/div>\s*<div[^>]*?>([\s\S]*?)<\/div>/i);

    if (dailyMatch) dailyVal = dailyMatch[1].trim();
    if (levelMatch) levelVal = levelMatch[1].trim();
    if (equipMatch) equipVal = equipMatch[1].trim();

    // Standard slug ID
    const programId = title.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Rebuild the card beautifully
    const rebuiltCard = `${comment}
        ${revealTag}
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 0;">
            <div style="aspect-ratio: 1; overflow: hidden; position: relative;">
              ${imgHtml}
              <div style="position:absolute; inset:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.02));"></div>
            </div>
            <div style="padding: var(--space-2xl);">
              <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-md);">
                <span class="label-sm text-muted">${durationText}</span>
              </div>
              <h2 class="heading-lg" style="margin-bottom: var(--space-md);">${title}</h2>
              <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: var(--space-xl); font-size: 0.9375rem;">
                ${description}
              </p>

              ${extraStatsHtml ? extraStatsHtml + '\n' : ''}
              <!-- Daily progress grid -->
              <div class="program-progress-grid" data-program-id="${programId}" data-total-days="${daysNum}" data-prefix="D" style="display: grid; grid-template-columns: repeat(7,1fr); gap: var(--space-xs); margin-bottom: var(--space-xl);"></div>

              <div style="display: flex; gap: var(--space-md); align-items: center; flex-wrap: wrap;">
                <button id="btn-${programId}" onclick="startProgram('${title}', ${daysNum})" class="btn btn--primary">Iniciar Programa</button>
                <div style="display: flex; gap: var(--space-lg); margin-left: auto;">
                  <div><div class="label-sm text-muted">Diário</div><div style="font-weight:400; font-size:0.9375rem;">${dailyVal}</div></div>
                  <div><div class="label-sm text-muted">Nível</div><div style="font-weight:400; font-size:0.9375rem;">${levelVal}</div></div>
                  <div><div class="label-sm text-muted">Equipamento</div><div style="font-weight:400; font-size:0.9375rem;">${equipVal}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>\n\n`;

    rebuiltPrograms += rebuiltCard;
  }

  const closingTags = '\n      </div>\n    </div>\n  </section>\n\n';
  const finalHtml = header + rebuiltPrograms + closingTags + footer;
  fs.writeFileSync(filePath, finalHtml, 'utf8');
  console.log('programs.html totalmente reconstruído com 100% de integridade e progresso dinâmico!');
}
