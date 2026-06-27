/**
 * Atlas Pilates — Main Application Logic
 * Premium interactive exercise player with aesthetic minimalist body silhouettes,
 * real-time biofeedback tension gauges, joint angle trackers, breathing visualizers,
 * and high-end interactive training indicators. Instructions in Portuguese.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initVideoModal();
  initFilters();
  initFAQ();
  initScrollReveal();
  initAuth();
});

// ==========================================
// WORKOUT DATABASE (Simulated Exercises)
// ==========================================
const workoutData = {

  // ============================
  // YOGA SESSIONS
  // ============================

  "Sunrise Morning Flow": {
    type: "yoga",
    duration: "30 min",
    exercises: [
      { name: "Postura da Criança (Balasana)", duration: 30, instructions: "1. Ajoelhe-se e sente-se nos calcanhares. <br>2. Incline o tronco para a frente e apoie a testa no chão. <br>3. Alongue os braços para a frente e respire profundamente.", animation: "childs-pose", target: "Coluna e Quadris" },
      { name: "Alongamento Gato-Vaca (Marjaryasana)", duration: 40, instructions: "1. Fique em quatro apoios (mãos e joelhos). <br>2. Ao inspirar, curve a coluna para baixo e olhe para cima (Vaca). <br>3. Ao expirar, curve a coluna para cima empurrando o chão (Gato).", animation: "cat-cow", target: "Mobilidade da Coluna" },
      { name: "Cachorro Olhando para Baixo", duration: 45, instructions: "1. Suba os quadris e estique as pernas formando um V invertido. <br>2. Empurre os calcanhares em direção ao chão. <br>3. Mantenha os braços esticados e a cabeça relaxada.", animation: "down-dog", target: "Posterior e Ombros" },
      { name: "Saudação ao Sol (Surya Namaskar)", duration: 60, instructions: "1. Inspire elevando os braços. <br>2. Expire dobrando o quadril à frente. <br>3. Desça em chaturanga. <br>4. Inspire no cachorro olhando para cima, expire para baixo.", animation: "vinyasa", target: "Fluxo Corpo Inteiro" },
      { name: "Guerreiro I (Virabhadrasana I)", duration: 40, instructions: "1. Dê um passo largo para trás com o pé esquerdo. <br>2. Flexione o joelho direito a 90 graus. <br>3. Eleve os braços em direção ao teto e alinhe o quadril à frente.", animation: "warrior-1", target: "Pernas e Ombros" }
    ]
  },

  "Power Vinyasa Flow": {
    type: "yoga",
    duration: "55 min",
    exercises: [
      { name: "Guerreiro II (Virabhadrasana II)", duration: 45, instructions: "1. Abra as pernas em posição ampla. <br>2. Gire o pé direito 90° e dobre o joelho direito alinhado ao tornozelo. <br>3. Estenda os braços horizontalmente na altura dos ombros. <br>4. Mantenha o olhar sobre a mão da frente.", animation: "warrior-2", target: "Pernas, Quadril e Core" },
      { name: "Triângulo (Trikonasana)", duration: 40, instructions: "1. Afaste as pernas e estenda os braços em T. <br>2. Incline o tronco lateralmente, descendo a mão direita até a canela ou o chão. <br>3. Estenda o braço esquerdo para cima. <br>4. Olhe para a mão de cima e abra o peito.", animation: "triangle", target: "Flexores Laterais e Quadril" },
      { name: "Cachorro Olhando para Baixo", duration: 45, instructions: "1. Suba os quadris e estique as pernas formando um V invertido. <br>2. Empurre os calcanhares em direção ao chão. <br>3. Mantenha os braços esticados e a cabeça relaxada.", animation: "down-dog", target: "Posterior e Ombros" },
      { name: "Saudação ao Sol (Surya Namaskar)", duration: 60, instructions: "1. Inspire elevando os braços. <br>2. Expire dobrando o quadril à frente. <br>3. Desça em chaturanga. <br>4. Inspire no cachorro olhando para cima, expire para baixo.", animation: "vinyasa", target: "Fluxo Corpo Inteiro" },
      { name: "Torção de Coluna Sentada", duration: 40, instructions: "1. Sente-se com as pernas cruzadas ou com um joelho dobrado. <br>2. Gire o tronco para o lado direito. <br>3. Coloque o cotovelo esquerdo no joelho direito para aprofundar. <br>4. Mantenha a coluna ereta e respire na torção.", animation: "seated-twist", target: "Coluna e Órgãos Abdominais" }
    ]
  },

  "Deep Restore & Relax": {
    type: "yoga",
    duration: "45 min",
    exercises: [
      { name: "Respiração Abdominal Profunda", duration: 30, instructions: "1. Sente-se confortavelmente. <br>2. Coloque uma mão no abdômen. <br>3. Inspire expandindo a barriga. <br>4. Expire lentamente esvaziando os pulmões.", animation: "breath", target: "Sistema Nervoso" },
      { name: "Postura da Esfinge", duration: 40, instructions: "1. Deite-se de barriga para baixo com os antebraços no chão. <br>2. Eleve o peito mantendo os ombros relaxados e longe das orelhas. <br>3. Olhe para a frente.", animation: "sphinx", target: "Lombar" },
      { name: "Ponte Suportada", duration: 50, instructions: "1. Deite-se de costas com os joelhos dobrados. <br>2. Eleve os quadris contraindo os glúteos. <br>3. Mantenha o pescoço relaxado no chão e respire.", animation: "bridge", target: "Glúteos e Lombar" },
      { name: "Torção de Coluna Deitada", duration: 45, instructions: "1. Traga os joelhos ao peito. <br>2. Deixe os joelhos caírem para o lado direito. <br>3. Vire a cabeça para o lado esquerdo e sinta o alongamento.", animation: "twist", target: "Rotação de Coluna" }
    ]
  },

  "Equilíbrio e Força": {
    type: "yoga",
    duration: "40 min",
    exercises: [
      { name: "Postura da Árvore (Vrikshasana)", duration: 45, instructions: "1. Fique de pé sobre a perna esquerda. <br>2. Pressione a sola do pé direito contra a coxa interna esquerda (evite o joelho). <br>3. Una as palmas das mãos no peito ou eleve-as acima da cabeça. <br>4. Mantenha o olhar fixo em um ponto à frente para equilibrar.", animation: "tree-pose", target: "Equilíbrio e Tornozelos" },
      { name: "Guerreiro I (Virabhadrasana I)", duration: 40, instructions: "1. Dê um passo largo para trás com o pé esquerdo. <br>2. Flexione o joelho direito a 90 graus. <br>3. Eleve os braços em direção ao teto e alinhe o quadril à frente.", animation: "warrior-1", target: "Pernas e Ombros" },
      { name: "Guerreiro II (Virabhadrasana II)", duration: 45, instructions: "1. Abra as pernas em posição ampla. <br>2. Gire o pé direito 90° e dobre o joelho direito alinhado ao tornozelo. <br>3. Estenda os braços horizontalmente na altura dos ombros. <br>4. Mantenha o olhar sobre a mão da frente.", animation: "warrior-2", target: "Pernas, Quadril e Core" },
      { name: "Triângulo (Trikonasana)", duration: 40, instructions: "1. Afaste as pernas e estenda os braços em T. <br>2. Incline o tronco lateralmente, descendo a mão direita até a canela ou o chão. <br>3. Estenda o braço esquerdo para cima.", animation: "triangle", target: "Flexores Laterais e Quadril" },
      { name: "Cachorro Olhando para Baixo", duration: 30, instructions: "1. Suba os quadris e estique as pernas formando um V invertido. <br>2. Empurre os calcanhares em direção ao chão. <br>3. Mantenha os braços esticados e a cabeça relaxada.", animation: "down-dog", target: "Posterior e Ombros" }
    ]
  },

  "Post-Workout Recovery": {
    type: "yoga",
    duration: "25 min",
    exercises: [
      { name: "Liberação de Ombros e Pescoço", duration: 30, instructions: "1. Gire o pescoço suavemente em círculos. <br>2. Incline a orelha direita em direção ao ombro correspondente. <br>3. Alterne os lados para soltar a tensão.", animation: "neck", target: "Coluna Cervical" },
      { name: "Alongamento Sentado — Isquiotibiais", duration: 40, instructions: "1. Estique uma das pernas à frente. <br>2. Incline o tronco a partir dos quadris mantendo as costas retas. <br>3. Alcance o pé ou canela.", animation: "hamstring", target: "Cadeia Posterior" },
      { name: "Postura do Pombo", duration: 50, instructions: "1. Traga o joelho direito para a frente no chão. <br>2. Estique a perna esquerda totalmente para trás. <br>3. Desça o quadril em direção ao mat.", animation: "pigeon", target: "Flexores de Quadril" },
      { name: "Relaxamento Final (Savasana)", duration: 60, instructions: "1. Deite-se totalmente plano de costas. <br>2. Deixe os pés caírem para os lados e palmas das mãos para cima. <br>3. Respire e absorva o treino.", animation: "savasana", target: "Restauração Total" }
    ]
  },

  "Yin Yoga Noturno": {
    type: "yoga",
    duration: "50 min",
    exercises: [
      { name: "Respiração 4-7-8 para Relaxar", duration: 60, instructions: "1. Inspire pelo nariz contando 4 tempos. <br>2. Segure o ar por 7 tempos. <br>3. Expire completamente pela boca contando 8 tempos. <br>4. Repita 5 ciclos.", animation: "breath", target: "Sistema Nervoso Parassimpático" },
      { name: "Postura do Pombo Reclinado", duration: 90, instructions: "1. Traga o joelho direito para a frente no chão. <br>2. Estique a perna esquerda totalmente para trás. <br>3. Incline o tronco para frente e descanse os antebraços no chão. <br>4. Fique aqui por 2-3 min por lado.", animation: "pigeon", target: "Quadril Profundo" },
      { name: "Torção de Coluna Deitada", duration: 60, instructions: "1. Traga os joelhos ao peito. <br>2. Deixe os joelhos caírem para o lado direito. <br>3. Vire a cabeça para o lado esquerdo e sinta o alongamento.", animation: "twist", target: "Coluna e Costelas" },
      { name: "Postura da Esfinge Longa", duration: 90, instructions: "1. Deite-se de barriga para baixo com os antebraços no chão. <br>2. Eleve o peito mantendo os ombros relaxados. <br>3. Fique aqui por 2-3 min respirando profundamente.", animation: "sphinx", target: "Lombar e Abdômen" },
      { name: "Savasana Final", duration: 120, instructions: "1. Deite-se de costas. <br>2. Deixe os pés caírem para os lados. <br>3. Feche os olhos e abandone qualquer esforço. <br>4. Permaneça 5-10 minutos.", animation: "savasana", target: "Restauração Completa" }
    ]
  },

  // ============================
  // PILATES — BARRE SESSIONS
  // ============================

  "Squat & Press": {
    type: "pilates",
    equipment: "Barre",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Agachamento com Desenvolvimento", duration: 35, instructions: "1. Fique de pé sobre os elásticos da barra de Pilates. <br>2. Posicione a barra na altura dos ombros. <br>3. Agache flexionando os joelhos e jogando o quadril para trás. <br>4. Fique de pé e empurre a barra acima da cabeça.", animation: "squat-press", target: "Glúteos e Ombros" }
    ]
  },

  "Overhead Lunge": {
    type: "pilates",
    equipment: "Barre",
    sets: 3,
    reps: 10,
    exercises: [
      { name: "Avanço com Barra Elevada", duration: 35, instructions: "1. Fique de pé segurando a barra acima da cabeça com braços esticados. <br>2. Dê um passo largo à frente. <br>3. Flexione os joelhos até o de trás quase tocar o chão. <br>4. Retorne e alterne.", animation: "overhead-lunge", target: "Quadríceps e Estabilidade" }
    ]
  },

  "Força Total com Barra": {
    type: "pilates",
    equipment: "Barre",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "Levantamento Terra (Romanian Deadlift)", duration: 40, instructions: "1. Fique de pé segurando a barra na frente das coxas. <br>2. Incline o tronco à frente a partir dos quadris mantendo as costas retas. <br>3. Desça a barra pelas pernas sentindo a tensão nos isquiotibiais. <br>4. Retorne à posição inicial contraindo os glúteos.", animation: "deadlift-bar", target: "Isquiotibiais e Glúteos" },
      { name: "Remada Curvada com Barra", duration: 35, instructions: "1. Incline o tronco a 45° mantendo as costas retas. <br>2. Segure a barra com as duas mãos à frente. <br>3. Puxe os cotovelos para trás e para cima. <br>4. Aperte as escápulas no topo e desça com controle.", animation: "row-bar", target: "Costas e Bíceps" },
      { name: "Elevação Lateral com Barra", duration: 30, instructions: "1. Fique de pé com a barra paralela ao chão na frente do corpo. <br>2. Mantenha o core contraído. <br>3. Eleve a barra lateralmente até a altura dos ombros. <br>4. Desça com controle.", animation: "side-raise-bar", target: "Deltoides Laterais" },
      { name: "Prancha com Barra", duration: 45, instructions: "1. Apoie as mãos na barra colocada no chão. <br>2. Estique as pernas e forme uma linha reta do calcanhar à cabeça. <br>3. Contraia o abdômen e os glúteos. <br>4. Mantenha por 30-45 segundos respirando.", animation: "plank-bar", target: "Core e Estabilizadores" }
    ]
  },

  // ============================
  // PILATES — RING SESSIONS
  // ============================

  "Inner Thigh Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 3,
    reps: 20,
    exercises: [
      { name: "Aperto de Coxa com Anel", duration: 30, instructions: "1. Deite-se de costas ou sente-se com joelhos dobrados. <br>2. Posicione o anel de Pilates entre as coxas. <br>3. Aperte o anel devagar, segure por 1s e solte com controle.", animation: "thigh-squeeze", target: "Adutores e Core Interno" }
    ]
  },

  "Bridge & Ring Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 4,
    reps: 12,
    exercises: [
      { name: "Ponte com Compressão de Anel", duration: 35, instructions: "1. Deite-se de costas com joelhos dobrados e o anel entre as coxas. <br>2. Eleve os quadris do chão contraindo glúteos e lombar. <br>3. Squeeze o anel no topo da ponte e desça.", animation: "bridge-squeeze", target: "Glúteos e Posterior de Coxa" }
    ]
  },

  "Ring Power — Full Body": {
    type: "pilates",
    equipment: "Ring",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Compressão de Anel no Peito", duration: 30, instructions: "1. Deite-se de costas com joelhos dobrados. <br>2. Segure o anel entre as palmas das mãos na altura do peito. <br>3. Pressione as palmas em direção ao centro do anel. <br>4. Segure 2s e solte com controle.", animation: "ring-chest-press", target: "Peitoral e Tríceps" },
      { name: "Aperto de Coxa com Anel", duration: 30, instructions: "1. Sente-se com joelhos dobrados e pés no chão. <br>2. Posicione o anel entre as coxas. <br>3. Aperte o anel devagar, segure por 1s e solte com controle.", animation: "thigh-squeeze", target: "Adutores" },
      { name: "Aperto Lateral com Anel", duration: 35, instructions: "1. Deite-se de lado com o corpo em linha reta. <br>2. Posicione o anel entre os tornozelos. <br>3. Levante a perna de cima comprimindo o anel. <br>4. Desça com controle e repita.", animation: "ring-side-squeeze", target: "Abdutores e Glúteo Médio" },
      { name: "Ponte com Compressão de Anel", duration: 35, instructions: "1. Deite-se de costas com joelhos dobrados e o anel entre as coxas. <br>2. Eleve os quadris do chão contraindo glúteos e lombar. <br>3. Squeeze o anel no topo da ponte e desça.", animation: "bridge-squeeze", target: "Glúteos e Posterior de Coxa" }
    ]
  },

  // ============================
  // PILATES — CLASSIC MAT
  // ============================

  "Pilates Clássico no Mat": {
    type: "pilates",
    equipment: "Mat",
    sets: 2,
    reps: 10,
    exercises: [
      { name: "O Cem (The Hundred)", duration: 60, instructions: "1. Deite-se de costas e eleve as pernas a 45°. <br>2. Levante a cabeça e os ombros em crunch. <br>3. Estenda os braços paralelos ao chão. <br>4. Bata os braços para cima e para baixo (pompas rápidas) contando 100.", animation: "hundred", target: "Core Profundo e Resistência" },
      { name: "Roll-Up (Enrolamento)", duration: 45, instructions: "1. Deite-se de costas com braços acima da cabeça. <br>2. Inspire e traga os braços para a frente. <br>3. Expire enrolando a coluna vértebra por vértebra até tocar os pés. <br>4. Inspire no topo, expire enrolando de volta.", animation: "roll-up", target: "Coluna e Abdômen" },
      { name: "Círculo de Perna", duration: 40, instructions: "1. Deite-se de costas com uma perna esticada no chão. <br>2. Eleve a outra perna em direção ao teto. <br>3. Faça círculos lentos e controlados com a perna elevada. <br>4. Mantenha o quadril completamente fixo no chão.", animation: "leg-circle", target: "Quadril e Estabilidade de Core" },
      { name: "Pont com Enrolamento", duration: 45, instructions: "1. Deite-se de costas com joelhos dobrados. <br>2. Eleve os quadris articulando a coluna vértebra por vértebra. <br>3. No topo, contraia os glúteos. <br>4. Desça enrolando de volta com controle.", animation: "bridge", target: "Coluna, Glúteos e Isquiotibiais" }
    ]
  }
};

let currentPlayerInterval = null;
let currentExerciseIndex = 0;
let currentSecondsLeft = 0;
let isPlayerPaused = false;
let currentWorkoutName = "";
let currentWorkoutData = null;

// ==========================================
// SCROLL REVEAL (Intersection Observer)
// ==========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
  
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// MOBILE DRAWER MENU
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMenu = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenu);
}

// ==========================================
// PREMIUM WEB AUDIO CHIME
// ==========================================
function playPremiumChime(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'complete') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); 
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); 
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    }
  } catch (e) {
    console.log("Audio contexts blocked.");
  }
}

// ==========================================
// VIDEO MODAL PLAYER SETUP & ACTIONS
// ==========================================
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      closeWorkoutPlayer();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeWorkoutPlayer();
      }
    });
  }
}

function closeWorkoutPlayer() {
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  clearInterval(currentPlayerInterval);
  currentPlayerInterval = null;
}

window.openVideoModal = function(title, duration) {
  launchWorkoutPlayer(title);
};

window.openExerciseModal = function(name, type) {
  launchWorkoutPlayer(name);
};

function launchWorkoutPlayer(name) {
  const modal = document.getElementById('videoModal');
  if (!modal) return;

  currentWorkoutName = name;
  currentWorkoutData = workoutData[name];

  if (!currentWorkoutData) {
    currentWorkoutData = {
      type: "yoga",
      exercises: [
        { name: name, duration: 45, instructions: "Listen to your body. Breathe deeply and maintain control.", animation: "breath", target: "Posture" }
      ]
    };
  }

  currentExerciseIndex = 0;
  isPlayerPaused = false;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  loadExercise(currentExerciseIndex);
}

function loadExercise(index) {
  clearInterval(currentPlayerInterval);
  const exercise = currentWorkoutData.exercises[index];
  currentSecondsLeft = exercise.duration;

  renderPlayerUI(exercise);
  startTimer();
}

function startTimer() {
  currentPlayerInterval = setInterval(() => {
    if (isPlayerPaused) return;

    currentSecondsLeft--;
    
    if (currentSecondsLeft > 0 && currentSecondsLeft <= 3) {
      playPremiumChime('tick');
    }

    updateTimerDisplay();

    if (currentSecondsLeft <= 0) {
      clearInterval(currentPlayerInterval);
      playPremiumChime('complete');
      
      if (currentExerciseIndex < currentWorkoutData.exercises.length - 1) {
        currentExerciseIndex++;
        loadExercise(currentExerciseIndex);
      } else {
        finishWorkout();
      }
    }
  }, 1000);
}

function finishWorkout() {
  const inner = document.querySelector('.video-modal__inner');
  if (!inner) return;

  playPremiumChime('complete');
  
  inner.innerHTML = `
    <button class="video-modal__close" onclick="closeWorkoutPlayer()">✕</button>
    <div style="padding: 3rem 2rem; background: var(--color-near-black); text-align: center; color: #fff; min-height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <span style="font-size: 4rem; margin-bottom: 1.5rem; animation: float 3s ease-in-out infinite;">✨</span>
      <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-accent-gold);">Treino Concluído!</h2>
      <p style="color: rgba(255,255,255,0.6); max-width: 400px; margin-bottom: 2rem; font-size: 0.9375rem;">
        Parabéns! Você completou o treino de <strong>${currentWorkoutName}</strong>. Você está evoluindo sua força, equilíbrio e controle.
      </p>
      <div style="display: flex; gap: 2rem; margin-bottom: 2.5rem; justify-content: center;">
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">+50</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">XP Ganhos</div>
        </div>
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">${currentWorkoutData.type === 'yoga' ? '180' : '220'}</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">Kcal Queimadas</div>
        </div>
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">🔥 13</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">Dias Seguidos</div>
        </div>
      </div>
      <button onclick="closeWorkoutPlayer()" class="btn btn--gold btn--lg" style="padding: 0.875rem 3rem;">Concluir</button>
    </div>
  `;
  showToast("🎉 Treino concluído! +50 XP!");
}

function updateTimerDisplay() {
  const countdownText = document.getElementById('playerCountdownText');
  const circleFill = document.getElementById('playerProgressCircleFill');
  const exercise = currentWorkoutData.exercises[currentExerciseIndex];

  const currentTotal = exercise.duration;
  const timeProgress = (currentTotal - currentSecondsLeft) / currentTotal;

  if (countdownText) {
    countdownText.textContent = currentSecondsLeft + 's';
  }

  if (circleFill) {
    const dasharray = 283; 
    circleFill.setAttribute('stroke-dashoffset', dasharray * (1 - timeProgress));
  }

  const angleDisplay = document.getElementById('gaugeAngleDisplay');
  const tensionProgress = document.getElementById('gaugeTensionProgress');
  const breathStateText = document.getElementById('breathStateText');

  const cycle = (currentSecondsLeft % 6); 
  
  if (currentWorkoutData.type === 'yoga') {
    if (breathStateText) {
      if (cycle >= 3) {
        breathStateText.textContent = "Inalar Profundo";
        breathStateText.style.color = "var(--color-accent-gold)";
      } else {
        breathStateText.textContent = "Exalar com Controle";
        breathStateText.style.color = "rgba(255,255,255,0.7)";
      }
    }
  }

  if (currentWorkoutData.type === 'pilates') {
    if (angleDisplay && tensionProgress) {
      let angle = 180;
      let tension = 15;
      
      if (cycle >= 3) {
        const factor = (cycle - 3) / 3; 
        angle = Math.round(180 - (90 * factor)); 
        tension = Math.round(15 + (70 * factor)); 
      } else {
        const factor = cycle / 3; 
        angle = Math.round(90 + (90 * factor)); 
        tension = Math.round(85 - (70 * factor)); 
      }

      angleDisplay.textContent = angle + '°';
      tensionProgress.style.width = tension + '%';
      
      const tensionValueText = document.getElementById('tensionValueText');
      if (tensionValueText) tensionValueText.textContent = tension + '%';
    }
  }
}

function renderPlayerUI(exercise) {
  const inner = document.querySelector('.video-modal__inner');
  if (!inner) return;

  const isYoga = currentWorkoutData.type === 'yoga';

  inner.innerHTML = `
    <button class="video-modal__close" id="videoModalClose" onclick="closeWorkoutPlayer()">✕</button>
    
    <div style="display: grid; grid-template-columns: 280px 1fr; background: #141211; min-height: 560px; color: #fff; font-family: system-ui, sans-serif;">
      
      <!-- Side Exercise List -->
      <div style="background: #1c1a18; border-right: 1px solid rgba(255,255,255,0.06); padding: var(--space-xl) var(--space-lg); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-accent-gold); margin-bottom: 0.5rem;">Treino</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.125rem; margin-bottom: 1.5rem; color: #fff; font-weight: 400; line-height: 1.3;">${currentWorkoutName}</h3>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${currentWorkoutData.exercises.map((ex, idx) => `
              <div style="display: flex; align-items: center; gap: 10px; padding: 0.625rem; border-radius: var(--radius-md); background: ${idx === currentExerciseIndex ? 'rgba(201,169,110,0.1)' : 'transparent'}; border: 1px solid ${idx === currentExerciseIndex ? 'rgba(201,169,110,0.2)' : 'transparent'};">
                <span style="width: 20px; height: 20px; border-radius: 50%; border: 1px solid ${idx <= currentExerciseIndex ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.2)'}; display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; color: ${idx <= currentExerciseIndex ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.4)'}; background: ${idx < currentExerciseIndex ? 'var(--color-accent-gold)' : 'transparent'}">
                  ${idx < currentExerciseIndex ? '✓' : idx + 1}
                </span>
                <span style="font-size: 0.8125rem; color: ${idx === currentExerciseIndex ? '#fff' : 'rgba(255,255,255,0.5)'}; font-weight: ${idx === currentExerciseIndex ? '500' : '400'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">
                  ${ex.name}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Target Zone & Device connection badges -->
        <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-bottom: 6px;">
            <span>Foco:</span>
            <strong style="color: var(--color-accent-gold); font-weight: 500;">${exercise.target}</strong>
          </div>
          <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.625rem; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
            Treinador Virtual Ativo
          </div>
        </div>
      </div>

      <!-- Main Animation & Timer area -->
      <div style="padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        
        <!-- Premium Pulsing Human Joint Animation & Biofeedback Trackers -->
        <div style="display: grid; grid-template-columns: 1fr 180px; gap: 1rem; align-items: center; min-height: 240px; background: #0b0a09; border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.04); box-shadow: inset 0 8px 32px rgba(0,0,0,0.45); padding: 1rem; position: relative;">
          
          <!-- Animation Canvas -->
          <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            ${renderSVGAnimation(exercise.animation)}
          </div>

          <!-- Real-time BIOFEEDBACK PANEL -->
          <div style="background: rgba(25,23,21,0.65); border: 1px solid rgba(255,255,255,0.05); border-radius: var(--radius-lg); padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.375rem;">Biofeedback</div>
            
            ${isYoga ? `
              <!-- Yoga: Breathing Rhythm Gauge -->
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Guia de Ritmo</div>
                <div id="breathStateText" style="font-family: var(--font-heading); font-size: 0.9375rem; font-weight: 400; color: var(--color-accent-gold);">Inalar</div>
              </div>
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Batimentos</div>
                <div style="font-family: var(--font-heading); font-size: 1.125rem; font-weight: 400; color: #fff;">108 <span style="font-size: 0.6875rem; color: rgba(255,255,255,0.4);">BPM</span></div>
              </div>
            ` : `
              <!-- Pilates: Tension & Joint Angle Gauges -->
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Ângulo da Articulação</div>
                <div id="gaugeAngleDisplay" style="font-family: var(--font-heading); font-size: 1.125rem; font-weight: 400; color: #fff;">180°</div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">
                  <span>Tensão</span>
                  <span id="tensionValueText" style="color: var(--color-accent-gold);">15%</span>
                </div>
                <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;">
                  <div id="gaugeTensionProgress" style="height: 100%; width: 15%; background: var(--color-accent-gold); transition: width 0.15s ease-out; border-radius: 2px;"></div>
                </div>
              </div>
            `}
          </div>

        </div>

        <!-- Exercise Details -->
        <div style="text-align: center; margin-top: 1rem; z-index: 10;">
          <h2 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 0.5rem; color: #fff; font-weight: 400;">
            ${exercise.name}
          </h2>
          <p style="color: rgba(255,255,255,0.75); max-width: 480px; margin: 0 auto; line-height: 1.6; font-size: 0.875rem; min-height: 60px;">
            ${exercise.instructions}
          </p>
        </div>

        <!-- Timer Circle & Player Control Elements -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.25rem;">
          
          <button onclick="navigateWorkout(-1)" style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;" ${currentExerciseIndex === 0 ? 'disabled style="opacity: 0.2; cursor: default;"' : ''}>
            ⏮ Voltar
          </button>

          <div style="display: flex; align-items: center; gap: 1.5rem;">
            
            <!-- Circular Progress SVG -->
            <div style="position: relative; width: 64px; height: 64px;">
              <svg width="64" height="64" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)" stroke-width="4" fill="none" />
                <circle id="playerProgressCircleFill" cx="50" cy="50" r="45" stroke="var(--color-accent-gold)" stroke-width="4" fill="none" 
                  stroke-dasharray="283" stroke-dashoffset="0" stroke-linecap="round" style="transition: stroke-dashoffset 1s linear; transform: rotate(-90deg); transform-origin: 50px 50px;" />
              </svg>
              <div id="playerCountdownText" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.1rem; font-weight: 400; color: #fff;">
                ${currentSecondsLeft}s
              </div>
            </div>

            <!-- Pause / Play controls -->
            <button id="playerPausePlayBtn" onclick="togglePlayerPause()" style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-accent-gold); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; box-shadow: 0 4px 12px rgba(201,169,110,0.3); transition: transform 0.2s;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>

          </div>

          <button onclick="navigateWorkout(1)" style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">
            ${currentExerciseIndex === currentWorkoutData.exercises.length - 1 ? 'Concluir ✓' : 'Avançar ⏭'}
          </button>
        </div>

      </div>
    </div>
  `;
  updateTimerDisplay();
}

window.togglePlayerPause = function() {
  isPlayerPaused = !isPlayerPaused;
  const btn = document.getElementById('playerPausePlayBtn');
  if (btn) {
    if (isPlayerPaused) {
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>';
      btn.style.background = 'rgba(255,255,255,0.15)';
    } else {
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      btn.style.background = 'var(--color-accent-gold)';
    }
  }
};

window.navigateWorkout = function(direction) {
  if (direction === 1) {
    if (currentExerciseIndex < currentWorkoutData.exercises.length - 1) {
      currentExerciseIndex++;
      loadExercise(currentExerciseIndex);
    } else {
      finishWorkout();
    }
  } else if (direction === -1) {
    if (currentExerciseIndex > 0) {
      currentExerciseIndex--;
      loadExercise(currentExerciseIndex);
    }
  }
};

// ==========================================
// VIRTUAL COACH SKELETON ANIMATIONS (STICK PERSON)
// ==========================================
function renderSVGAnimation(type) {
  return `
    <svg width="220" height="220" viewBox="0 0 100 100" style="overflow: visible;">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-accent-gold)" stop-opacity="0.25" />
          <stop offset="100%" stop-color="var(--color-accent-gold)" stop-opacity="0" />
        </radialGradient>
        <filter id="shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
        </filter>
        <style>
          @keyframes breathing-body {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.02) translateY(-1px); }
          }
          @keyframes stretch-child {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(3px, 1px); }
          }
          @keyframes cat-cow-morph {
            0%, 100% { d: path("M32,54 Q50,62 68,54"); } 
            50% { d: path("M32,54 Q50,42 68,54"); } 
          }
          @keyframes cat-cow-head {
            0%, 100% { transform: rotate(-10deg); }
            50% { transform: rotate(15deg); }
          }
          @keyframes downdog-pulse {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-1.5px, -2px); }
          }
          @keyframes warrior-lunge {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(2px) translateX(-1px); }
          }
          @keyframes squatting {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(14px); }
          }
          @keyframes arm-overhead-press {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes walk-lunge {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(10px); }
          }
          @keyframes joint-glow {
            0%, 100% { r: 2px; opacity: 0.6; }
            50% { r: 3.2px; opacity: 1; }
          }
          @keyframes squish-ring {
            0%, 100% { transform: scaleX(1) scaleY(1); }
            50% { transform: scaleX(0.6) scaleY(0.9); }
          }
          @keyframes bridge-lift {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-14px); }
          }
          @keyframes chaturanga-pulse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
          }

          .silhouette-line {
            stroke: #eae5d9;
            stroke-width: 3.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            filter: url(#shadow-filter);
          }
          .silhouette-head {
            fill: #eae5d9;
            filter: url(#shadow-filter);
          }
          .body-joint-glow {
            fill: var(--color-accent-gold);
            animation: joint-glow 2s infinite ease-in-out;
          }
          .elastic-tension-band {
            stroke: var(--color-accent-gold);
            stroke-width: 1.5;
            stroke-dasharray: 2 1;
            fill: none;
            opacity: 0.65;
          }
          .pilates-metal-bar {
            stroke: #eae5d9;
            stroke-width: 4;
            stroke-linecap: round;
          }
          .pilates-foam-ring {
            stroke: var(--color-accent-gold);
            stroke-width: 3.5;
            fill: none;
          }
          .indicator-arrow {
            stroke: var(--color-accent-gold);
            stroke-width: 1.5;
            fill: none;
            marker-end: url(#arrowhead);
          }
        </style>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent-gold)" />
        </marker>
      </defs>

      <circle cx="50" cy="50" r="45" fill="url(#glow)" />
      <line x1="5" y1="80" x2="95" y2="80" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" />

      ${type === 'breath' || type === 'savasana' ? `
        <!-- Breath / Savasana: Minimalist Lying Posture -->
        <g style="transform-origin: 50px 75px; animation: breathing-body 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="22" cy="71" r="4.5" />
          <line class="silhouette-line" x1="27" y1="75" x2="78" y2="75" />
          <path class="silhouette-line" d="M28,75 L45,71 M45,71 L65,75" />
          <circle class="body-joint-glow" cx="28" cy="75" r="2.5" />
          <circle class="body-joint-glow" cx="45" cy="71" r="2.5" />
        </g>
      ` : ''}

      ${type === 'childs-pose' ? `
        <!-- Child's Pose: Realistic Knee Fold and Arm Stretch -->
        <g style="transform-origin: 25px 80px; animation: stretch-child 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="58" cy="74" r="4.5" />
          <path class="silhouette-line" d="M25,80 Q38,63 48,71" />
          <line class="silhouette-line" x1="25" y1="80" x2="35" y2="80" />
          <line class="silhouette-line" x1="48" y1="71" x2="72" y2="80" />
          <circle class="body-joint-glow" cx="25" cy="80" r="2" />
          <circle class="body-joint-glow" cx="48" cy="71" r="2" />
        </g>
      ` : ''}

      ${type === 'cat-cow' ? `
        <!-- Cat-Cow: Curving Spine on Hands & Knees -->
        <g>
          <line class="silhouette-line" x1="32" y1="54" x2="32" y2="80" />
          <line class="silhouette-line" x1="68" y1="54" x2="68" y2="80" />
          <path id="catCowSpine" class="silhouette-line" d="M32,54 Q50,62 68,54" style="animation: cat-cow-morph 5s ease-in-out infinite;" />
          <g style="transform-origin: 32px 54px; animation: cat-cow-head 5s ease-in-out infinite;">
            <circle class="silhouette-head" cx="23" cy="48" r="4.5" />
            <line class="silhouette-line" x1="32" y1="54" x2="25" y2="50" />
          </g>
          <circle class="body-joint-glow" cx="32" cy="54" r="2.5" />
          <circle class="body-joint-glow" cx="68" cy="54" r="2.5" />
        </g>
      ` : ''}

      ${type === 'down-dog' ? `
        <!-- Down-Dog: Realistic Apex Hips and Straight Limbs -->
        <g style="transform-origin: 50px 80px; animation: downdog-pulse 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="31" cy="62" r="4.5" />
          <line class="silhouette-line" x1="36" y1="54" x2="50" y2="35" />
          <line class="silhouette-line" x1="36" y1="54" x2="24" y2="80" />
          <path class="silhouette-line" d="M50,35 L63,57 L74,80" />
          <circle class="body-joint-glow" cx="50" cy="35" r="2.5" />
          <circle class="body-joint-glow" cx="36" cy="54" r="2.5" />
          <circle class="body-joint-glow" cx="63" cy="57" r="2" />
        </g>
      ` : ''}

      ${type === 'vinyasa' ? `
        <!-- Vinyasa / Chaturanga: Lowered Straight Body Plank -->
        <g style="animation: chaturanga-pulse 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="25" cy="55" r="4.5" />
          <path class="silhouette-line" d="M35,60 L55,68 L78,80" />
          <path class="silhouette-line" d="M35,60 L44,68 L36,80" />
          <circle class="body-joint-glow" cx="35" cy="60" r="2" />
          <circle class="body-joint-glow" cx="55" cy="68" r="2" />
          <circle class="body-joint-glow" cx="44" cy="68" r="1.5" />
        </g>
      ` : ''}

      ${type === 'warrior-1' ? `
        <!-- Warrior I: High Lunge and Raised Overhead Arms -->
        <g style="transform-origin: 45px 80px; animation: warrior-lunge 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="45" cy="21" r="4.5" />
          <line class="silhouette-line" x1="45" y1="28" x2="45" y2="50" />
          <line class="silhouette-line" x1="45" y1="28" x2="45" y2="8" />
          <path class="silhouette-line" d="M45,50 L28,55 L28,80" />
          <line class="silhouette-line" x1="45" y1="50" x2="68" y2="80" />
          <circle class="body-joint-glow" cx="45" cy="50" r="2.5" />
          <circle class="body-joint-glow" cx="28" cy="55" r="2" />
          <circle class="body-joint-glow" cx="45" cy="28" r="2" />
        </g>
      ` : ''}

      ${type === 'squat-press' ? `
        <!-- Squat Press: Pilates Bar Squat and Overhead Extension -->
        <g style="transform-origin: 50px 80px; animation: squatting 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="50" cy="22" r="4.5" />
          <line class="silhouette-line" x1="50" y1="28" x2="50" y2="50" />
          <path class="silhouette-line" d="M50,50 L36,62 L36,80" />
          <path class="silhouette-line" d="M50,50 L64,62 L64,80" />
          
          <g style="transform-origin: 50px 30px; animation: arm-overhead-press 4s ease-in-out infinite;">
            <path class="silhouette-line" d="M50,30 L34,22 L24,12" />
            <path class="silhouette-line" d="M50,30 L66,22 L76,12" />
            <line class="pilates-metal-bar" x1="16" y1="12" x2="84" y2="12" />
            <path class="elastic-tension-band" d="M16,12 C16,40 36,75 36,80" />
            <path class="elastic-tension-band" d="M84,12 C84,40 64,75 64,80" />
          </g>
          
          <circle class="body-joint-glow" cx="50" cy="50" r="2.5" />
          <circle class="body-joint-glow" cx="36" cy="62" r="2" />
          <circle class="body-joint-glow" cx="64" cy="62" r="2" />
        </g>
      ` : ''}

      ${type === 'overhead-lunge' ? `
        <!-- Overhead Lunge: Lunge position with raised hands holding bar -->
        <g style="transform-origin: 50px 80px; animation: walk-lunge 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="50" cy="22" r="4.5" />
          <line class="silhouette-line" x1="50" y1="28" x2="50" y2="50" />
          <path class="silhouette-line" d="M50,50 L34,54 L34,80" />
          <path class="silhouette-line" d="M50,50 L64,62 L64,80" />
          <path class="silhouette-line" d="M50,30 L40,14 L30,4" />
          <path class="silhouette-line" d="M50,30 L60,14 L70,4" />
          <line class="pilates-metal-bar" x1="20" y1="4" x2="80" y2="4" />
          <line class="elastic-tension-band" x1="20" y1="4" x2="64" y2="80" />
          <line class="elastic-tension-band" x1="80" y1="4" x2="64" y2="80" />
          <circle class="body-joint-glow" cx="50" cy="50" r="2.5" />
          <circle class="body-joint-glow" cx="34" cy="54" r="2" />
        </g>
      ` : ''}

      ${type === 'thigh-squeeze' ? `
        <!-- Thigh Squeeze: Lying on back squeezing Pilates Ring between knees -->
        <g>
          <circle class="silhouette-head" cx="20" cy="76" r="4.5" />
          <line class="silhouette-line" x1="25" y1="80" x2="55" y2="80" />
          <path class="silhouette-line" d="M55,80 L66,55 L75,80" />
          
          <g style="transform-origin: 66px 55px; animation: squish-ring 3s ease-in-out infinite;">
            <ellipse class="pilates-foam-ring" cx="66" cy="55" rx="10" ry="10" />
            <rect fill="#fff" x="55" y="52" width="2" height="6" rx="1" />
            <rect fill="#fff" x="75" y="52" width="2" height="6" rx="1" />
          </g>
          <circle class="body-joint-glow" cx="55" cy="80" r="2.5" />
          <circle class="body-joint-glow" cx="66" cy="55" r="2" />
        </g>
      ` : ''}

      ${type === 'bridge-squeeze' ? `
        <!-- Bridge Squeeze: Hip Raised Lying Bridge Pose -->
        <g style="transform-origin: 32px 80px; animation: bridge-lift 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="20" cy="76" r="4.5" />
          <path class="silhouette-line" d="M32,80 L52,60 L68,60 L68,80" />
          <circle class="body-joint-glow" cx="52" cy="60" r="2.5" />
          <circle class="body-joint-glow" cx="68" cy="60" r="2" />
        </g>
      ` : ''}

    </svg>
  `;
}

// ==========================================
// CATEGORY FILTERS
// ==========================================
function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const gridItems = document.querySelectorAll('#yogaGrid article, #pilatesGrid article, #libraryGrid article');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.parentElement.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');

      gridItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = '';
          item.classList.add('visible');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// FAQ ACCORDIONS (Subscription Page)
// ==========================================
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const faqItem = q.parentElement;
      const isOpen = faqItem.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      
      if (!isOpen) {
        faqItem.classList.add('active');
      }
    });
  });
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
window.showToast = function(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast__content">
      <span class="toast__icon">✨</span>
      <span class="toast__message">${message}</span>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('active'), 10);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// ==========================================
// PASSWORDLESS AUTH & ONBOARDING SYSTEM
// ==========================================
function initAuth() {
  const userJson = localStorage.getItem('atlas_user');
  const authView = document.getElementById('authView');
  const profileView = document.getElementById('profileView');

  // Update navigation actions globally
  const user = userJson ? JSON.parse(userJson) : null;
  if (user) {
    const navActions = document.querySelector('.nav__actions');
    if (navActions) {
      navActions.innerHTML = `
        <a href="profile.html" class="btn btn--outline btn--sm">Olá, ${user.name}!</a>
        <a href="subscription.html" class="btn btn--primary btn--sm">Premium</a>
      `;
    }
    // Update mobile drawer Profile link
    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
      if (link.getAttribute('href') === 'profile.html') {
        link.innerHTML = `Perfil (${user.name})`;
      }
    });
    // Update index page hero greeting if present
    const heroEyebrowText = document.querySelector('.hero__eyebrow .label-md');
    if (heroEyebrowText) {
      heroEyebrowText.textContent = `Olá, ${user.name}! ✨`;
    }
  } else {
    // Standard nav actions if logged out
    const navActions = document.querySelector('.nav__actions');
    if (navActions) {
      navActions.innerHTML = `
        <a href="profile.html" class="btn btn--outline btn--sm">Sign In</a>
        <a href="subscription.html" class="btn btn--primary btn--sm">Start Free</a>
      `;
    }
  }

  // Handle profile page view switching
  if (authView && profileView) {
    if (user) {
      authView.style.display = 'none';
      profileView.style.display = 'block';

      // Populate user profile info
      const profileName = document.getElementById('profileName');
      const profileGoal = document.getElementById('profileGoal');
      const profileAge = document.getElementById('profileAge');

      if (profileName) profileName.textContent = user.name;
      if (profileGoal) profileGoal.textContent = `Foco: ${user.goal}`;
      if (profileAge) profileAge.textContent = `${user.age} anos`;
    } else {
      profileView.style.display = 'none';
      authView.style.display = 'block';
      document.getElementById('authStep1').style.display = 'block';
      document.getElementById('authStep2').style.display = 'none';
      
      const emailInput = document.getElementById('authEmail');
      if (emailInput) emailInput.value = '';
    }
  }
}

window.handleAuthEmailSubmit = function() {
  const emailInput = document.getElementById('authEmail');
  if (!emailInput) return;

  const email = emailInput.value.trim().toLowerCase();
  if (!email || !email.includes('@')) {
    window.showToast("Por favor, insira um e-mail válido.");
    return;
  }

  const registered = JSON.parse(localStorage.getItem('atlas_registered_users') || '[]');
  const existingUser = registered.find(u => u.email === email);

  if (existingUser) {
    // Directly log in existing user (Passwordless)
    localStorage.setItem('atlas_user', JSON.stringify(existingUser));
    window.showToast(`Bem-vindo(a) de volta, ${existingUser.name}!`);
    initAuth();
  } else {
    // Show step 2 for onboarding new user
    document.getElementById('authStep1').style.display = 'none';
    document.getElementById('authStep2').style.display = 'block';
    
    // Add subtitle notice
    const subtitle = document.getElementById('authSubtitle');
    if (subtitle) {
      subtitle.innerHTML = `E-mail verificado para o produto! <br>Por favor, complete as informações para personalizar seus treinos.`;
    }
    window.showToast("E-mail verificado! Complete seus dados de perfil.");
  }
};

window.handleAuthRegisterSubmit = function() {
  const nameInput = document.getElementById('authName');
  const ageInput = document.getElementById('authAge');
  const goalSelect = document.getElementById('authGoal');
  const levelSelect = document.getElementById('authLevel');
  const emailInput = document.getElementById('authEmail');

  if (!nameInput || !ageInput || !emailInput) return;

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const goal = goalSelect.value;
  const level = levelSelect.value;
  const email = emailInput.value.trim().toLowerCase();

  if (!name || !age) {
    window.showToast("Por favor, preencha todos os campos.");
    return;
  }

  const newUser = {
    email,
    name,
    age,
    goal,
    level
  };

  // Add to registered list
  const registered = JSON.parse(localStorage.getItem('atlas_registered_users') || '[]');
  registered.push(newUser);
  localStorage.setItem('atlas_registered_users', JSON.stringify(registered));

  // Log in
  localStorage.setItem('atlas_user', JSON.stringify(newUser));
  window.showToast("Registro concluído com sucesso!");
  
  // Clear register form
  nameInput.value = '';
  ageInput.value = '';
  
  initAuth();
};

window.handleLogout = function() {
  localStorage.removeItem('atlas_user');
  window.showToast("Você saiu da sua conta.");
  initAuth();
};

