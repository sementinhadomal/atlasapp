const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const htmlFiles = ['yoga.html', 'pilates.html', 'programs.html', 'library.html', 'profile.html', 'subscription.html', 'index.html'];

htmlFiles.forEach(fileName => {
  const filePath = path.join(projectDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace index.html navigation references to programs.html
    content = content.replace(/href="index\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="programs.html?v=1.0.8');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Navigation links updated to programs.html in ${fileName}`);
  }
});
