const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const htmlFiles = ['index.html', 'yoga.html', 'pilates.html', 'programs.html', 'library.html', 'profile.html', 'subscription.html'];

htmlFiles.forEach(fileName => {
  const filePath = path.join(projectDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Substitui parâmetros de versão por ?v=1.0.9 em todos os links e scripts
    content = content.replace(/href="index\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="programs.html?v=1.0.9');
    content = content.replace(/href="yoga\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="yoga.html?v=1.0.9');
    content = content.replace(/href="pilates\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="pilates.html?v=1.0.9');
    content = content.replace(/href="programs\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="programs.html?v=1.0.9');
    content = content.replace(/href="library\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="library.html?v=1.0.9');
    content = content.replace(/href="profile\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="profile.html?v=1.0.9');
    content = content.replace(/href="subscription\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="subscription.html?v=1.0.9');

    content = content.replace(/assets\/js\/main\.js(\?v=[a-zA-Z0-9.]+)?/g, 'assets/js/main.js?v=1.0.9');
    content = content.replace(/assets\/js\/supabase-client\.js(\?v=[a-zA-Z0-9.]+)?/g, 'assets/js/supabase-client.js?v=1.0.9');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cache-busting v1.0.9 aplicado em ${fileName}`);
  }
});
