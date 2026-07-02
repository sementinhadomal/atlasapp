const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'yoga.html', 'pilates.html', 'programs.html', 'library.html', 'profile.html', 'subscription.html'];

htmlFiles.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Substitui parâmetros ?v=1.0.4 ou semelhantes por ?v=1.0.7 em todos os links
    content = content.replace(/href="index\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="index.html?v=1.0.7');
    content = content.replace(/href="yoga\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="yoga.html?v=1.0.7');
    content = content.replace(/href="pilates\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="pilates.html?v=1.0.7');
    content = content.replace(/href="programs\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="programs.html?v=1.0.7');
    content = content.replace(/href="library\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="library.html?v=1.0.7');
    content = content.replace(/href="profile\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="profile.html?v=1.0.7');
    content = content.replace(/href="subscription\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="subscription.html?v=1.0.7');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Link-level cache-busting v1.0.7 aplicado em ${fileName}`);
  }
});
