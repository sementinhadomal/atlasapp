const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const htmlFiles = ['programs.html', 'yoga.html', 'pilates.html', 'library.html', 'profile.html', 'subscription.html', 'index.html'];

htmlFiles.forEach(fileName => {
  const filePath = path.join(projectDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove a tag li correspondente ao link Home do menu principal
    // Exemplo: <li><a href="programs.html?v=1.0.9" class="nav__link active">Home</a></li>
    // Exemplo 2: <li><a href="programs.html?v=1.0.9" class="nav__link">Home</a></li>
    const homeLiRegex = /<li><a href="[^"]*?programs\.html[^"]*?" class="nav__link[^"]*?">Home<\/a><\/li>/gi;
    
    let count = 0;
    content = content.replace(homeLiRegex, () => {
      count++;
      return '';
    });

    if (count > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Removido link Home da barra de navegação em ${fileName}`);
    } else {
      // Tenta uma versão alternativa mais genérica se a primeira falhar
      const fallbackRegex = /<li><a href="[^"]*?" class="nav__link[^"]*?">Home<\/a><\/li>/gi;
      content = content.replace(fallbackRegex, () => {
        count++;
        return '';
      });
      if (count > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[Fallback] Removido link Home em ${fileName}`);
      } else {
        console.log(`Link Home não encontrado na barra de menu de ${fileName}`);
      }
    }
  }
});
