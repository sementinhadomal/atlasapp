const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const filesToInject = ['programs.html', 'library.html'];

const modalMarkup = `
  <!-- VIDEO MODAL -->
  <div class="video-modal" id="videoModal" role="dialog" aria-modal="true" aria-label="Video player">
    <div class="video-modal__inner">
      <button class="video-modal__close" id="videoModalClose" aria-label="Close video">✕</button>
      <div class="video-placeholder">
        <div class="play-btn-large">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div id="videoTitle" style="font-family: var(--font-heading); font-size: 1.25rem; color: rgba(255,255,255,0.9);">Loading...</div>
        <div id="videoDuration" style="font-size: 0.875rem; color: rgba(255,255,255,0.5);">0 min</div>
        <!-- Session Controls -->
        <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem;">
          <button style="padding: 0.625rem 1.5rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; color: rgba(255,255,255,0.7); font-size: 0.75rem; cursor: pointer; background: transparent; letter-spacing: 0.1em; text-transform: uppercase;">⏮ Previous</button>
          <button style="padding: 0.875rem 2rem; background: var(--color-accent-gold); border-radius: 999px; color: #fff; font-size: 0.75rem; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500;" onclick="showToast('✅ Session completed! +50 points earned')">Start Session</button>
          <button style="padding: 0.625rem 1.5rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; color: rgba(255,255,255,0.7); font-size: 0.75rem; cursor: pointer; background: transparent; letter-spacing: 0.1em; text-transform: uppercase;">Next ⏭</button>
        </div>
      </div>
    </div>
  </div>
`;

filesToInject.forEach(fileName => {
  const filePath = path.join(projectDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Se já tiver o modal, não faz nada
    if (content.includes('id="videoModal"')) {
      console.log(`${fileName} já contém o modal.`);
      return;
    }

    // Insere o modal logo antes do comentário <!-- FOOTER -->
    if (content.includes('<!-- FOOTER -->')) {
      content = content.replace('<!-- FOOTER -->', modalMarkup + '\n\n  <!-- FOOTER -->');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Video Modal injetado com sucesso em ${fileName}`);
    } else {
      console.log(`Comentário <!-- FOOTER --> não encontrado em ${fileName}`);
    }
  }
});
