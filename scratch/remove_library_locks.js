const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'library.html');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex robusto para remover o div do cadeado estático no library
  // Ele tem style absolute com top:8px; right:8px e o SVG com rect x="3" y="11"
  const lockRegex = /<div style="position:\s*absolute;\s*top:\s*8px;\s*right:\s*8px;[\s\S]*?<rect x="3" y="11"[\s\S]*?<\/div>/gi;
  
  let count = 0;
  content = content.replace(lockRegex, () => {
    count++;
    return '';
  });

  // Também remove qualquer filtro escurecedor das imagens (filter:brightness(0.8);)
  content = content.replace(/filter:\s*brightness\(0\.[78]\);/gi, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Removidos ${count} cadeados de library.html e brilho das imagens normalizado.`);
} else {
  console.log('library.html não encontrado.');
}
