const fs = require('fs');
const path = require('path');

// 1. PADRONIZAR E LIMPAR YOGA.HTML
const yogaPath = path.join(__dirname, '..', 'yoga.html');
if (fs.existsSync(yogaPath)) {
  let content = fs.readFileSync(yogaPath, 'utf8');

  // Remove os cadeados flutuantes
  const lockRegex = /<div class="card__lock">[\s\S]*?<\/div>/gi;
  content = content.replace(lockRegex, '');

  // Substitui os botões de play antigos (com SVG triângulo grande) pelo botão redondo padrão do pilates
  const playOverlayRegex = /<button class="card__play-overlay" onclick="openVideoModal\('([^']+)',\s*'([^']+)'\)"[^>]*?>[\s\S]*?<\/button>/gi;
  
  content = content.replace(playOverlayRegex, (match, title, duration) => {
    return `<button class="card__play-overlay" onclick="openVideoModal('${title}', '${duration}')" style="position:absolute;inset:0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;">
              <div class="play-icon" style="width:52px;height:52px;border-radius:50%;background:rgba(250,248,244,0.9);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;box-shadow:var(--shadow-md);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-near-black)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </button>`;
  });

  fs.writeFileSync(yogaPath, content, 'utf8');
  console.log('yoga.html limpo de cadeados e botões de play padronizados.');
}

// 2. LIMPAR CADEADOS DO PILATES.HTML
const pilatesPath = path.join(__dirname, '..', 'pilates.html');
if (fs.existsSync(pilatesPath)) {
  let content = fs.readFileSync(pilatesPath, 'utf8');

  // Remove os cadeados flutuantes
  const lockRegex = /<div class="card__lock">[\s\S]*?<\/div>/gi;
  content = content.replace(lockRegex, '');

  fs.writeFileSync(pilatesPath, content, 'utf8');
  console.log('pilates.html limpo de cadeados flutuantes.');
}

// 3. ENFORÇAR CACHE-BUSTING NOS LINKS DE NAVEGAÇÃO
// Ex: href="yoga.html" -> href="yoga.html?v=1.0.4"
const htmlFiles = ['index.html', 'yoga.html', 'pilates.html', 'programs.html', 'library.html', 'profile.html', 'subscription.html'];

htmlFiles.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Substitui links estáticos de navegação
    content = content.replace(/href="index\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="index.html?v=1.0.4');
    content = content.replace(/href="yoga\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="yoga.html?v=1.0.4');
    content = content.replace(/href="pilates\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="pilates.html?v=1.0.4');
    content = content.replace(/href="programs\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="programs.html?v=1.0.4');
    content = content.replace(/href="library\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="library.html?v=1.0.4');
    content = content.replace(/href="profile\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="profile.html?v=1.0.4');
    content = content.replace(/href="subscription\.html(\?v=[a-zA-Z0-9.]+)?/g, 'href="subscription.html?v=1.0.4');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Link-level cache-busting v1.0.4 aplicado em ${fileName}`);
  }
});
