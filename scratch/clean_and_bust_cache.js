const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'yoga.html', 'pilates.html', 'programs.html', 'library.html', 'profile.html', 'subscription.html'];

htmlFiles.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Substitui assets/js/main.js e assets/js/supabase-client.js por versões com v=1.0.6
    content = content.replace(/assets\/js\/main\.js(\?v=[a-zA-Z0-9.]+)?/g, 'assets/js/main.js?v=1.0.6');
    content = content.replace(/assets\/js\/supabase-client\.js(\?v=[a-zA-Z0-9.]+)?/g, 'assets/js/supabase-client.js?v=1.0.6');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cache-busting v1.0.6 aplicado em ${fileName}`);
  }
});
