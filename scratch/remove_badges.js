const fs = require('fs');
const path = require('path');

const files = ['yoga.html', 'pilates.html', 'library.html', 'index.html'];

files.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove tags do tipo:
    // <span class="card__badge ...">...</span>
    // <span class="card__badge">...</span>
    // E variações com classes adicionais
    const badgeRegex = /<span class="card__badge[^>]*?>[\s\S]*?<\/span>/gi;
    
    let count = 0;
    content = content.replace(badgeRegex, () => {
      count++;
      return '';
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removidas ${count} badges de ${fileName}`);
  } else {
    console.log(`${fileName} não encontrado.`);
  }
});
