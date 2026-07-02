const fs = require('fs');
const path = require('path');

// 1. LIMPAR BADGES DE PROGRAMS.HTML
const programsPath = path.join(__dirname, '..', 'programs.html');
if (fs.existsSync(programsPath)) {
  let content = fs.readFileSync(programsPath, 'utf8');

  // Regex para achar as badges de programas específicas:
  // <span style="padding: 4px 12px; background: ... text-transform: uppercase;">Free Program</span>
  // E variações semelhantes
  const badgeRegex = /<span style="[^"]*?uppercase[^"]*?">[\s\S]*?<\/span>/gi;
  content = content.replace(badgeRegex, '');

  fs.writeFileSync(programsPath, content, 'utf8');
  console.log('Badges de programas removidas de programs.html');
}

// 2. APLICAR CACHE BUSTING EM TODOS OS HTMLS
const htmlFiles = ['index.html', 'yoga.html', 'pilates.html', 'programs.html', 'library.html', 'profile.html', 'subscription.html'];

htmlFiles.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Substitui assets/js/main.js e assets/js/supabase-client.js por versões com query param de versão
    content = content.replace(/assets\/js\/main\.js(\?v=[a-zA-Z0-9.]+)?/g, 'assets/js/main.js?v=1.0.3');
    content = content.replace(/assets\/js\/supabase-client\.js(\?v=[a-zA-Z0-9.]+)?/g, 'assets/js/supabase-client.js?v=1.0.3');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cache-busting aplicado em ${fileName}`);
  }
});
