/**
 * Atlas Pilates — Main Application Logic
 * Premium interactive exercise player, timers, beeps, and mobile menu features.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initVideoModal();
  initFilters();
  initFAQ();
  initScrollReveal();
});

// ==========================================
// WORKOUT DATABASE (Simulated Exercises)
// ==========================================
const workoutData = {
  "Sunrise Morning Flow": {
    type: "yoga",
    duration: "30 min",
    exercises: [
      { name: "Child's Pose (Balasana)", duration: 30, instructions: "Relax your hips onto your heels. Extend your arms forward, rest your forehead on the mat. Breathe deeply.", animation: "childs-pose" },
      { name: "Cat-Cow Stretch (Marjaryasana)", duration: 40, instructions: "Inhale: arch your back, drop belly, look up. Exhale: round your spine, tuck chin to chest.", animation: "cat-cow" },
      { name: "Downward Facing Dog (Adho Mukha Svanasana)", duration: 45, instructions: "Lift your hips up and back. Press your palms into the mat, align your spine, pedal your feet.", animation: "down-dog" },
      { name: "Sun Salutation A (Surya Namaskar)", duration: 60, instructions: "Inhale arms up. Exhale fold forward. Inhale halfway lift. Exhale chaturanga. Inhale upward dog. Exhale downward dog.", animation: "vinyasa" },
      { name: "Warrior I (Virabhadrasana I)", duration: 40, instructions: "Step right foot forward. Bend front knee. Inhale arms overhead. Keep hips squared.", animation: "warrior-1" }
    ]
  },
  "Deep Restore & Relax": {
    type: "yoga",
    duration: "45 min",
    exercises: [
      { name: "Deep Belly Breathing", duration: 30, instructions: "Sit comfortably. Place one hand on belly. Inhale deeply, expand belly. Exhale slowly.", animation: "breath" },
      { name: "Sphinx Pose", duration: 40, instructions: "Lie on belly, forearms on mat. Gently lift chest. Keep shoulders away from ears.", animation: "sphinx" },
      { name: "Supported Bridge Pose", duration: 50, instructions: "Lie on back, bend knees. Lift hips, keep neck relaxed. Focus on deep breaths.", animation: "bridge" },
      { name: "Supine Twist", duration: 45, instructions: "Bring knees to chest. Drop knees to right side, look left. Relax your shoulders.", animation: "twist" }
    ]
  },
  "Post-Workout Recovery": {
    type: "yoga",
    duration: "25 min",
    exercises: [
      { name: "Neck & Shoulder Release", duration: 30, instructions: "Gently roll neck. Drop right ear to right shoulder, then switch. Feel shoulders drop.", animation: "neck" },
      { name: "Hamstring Fold", duration: 40, instructions: "Extend one leg. Hinge from hips, reach forward gently. Keep spine long.", animation: "hamstring" },
      { name: "Pigeon Pose", duration: 50, instructions: "Bring right knee forward. Extend left leg back. Sink hips down toward the mat.", animation: "pigeon" },
      { name: "Corpse Pose (Savasana)", duration: 60, instructions: "Lie flat. Let feet fall open, hands face up. Absorb the benefits of your practice.", animation: "savasana" }
    ]
  },
  "Squat & Press": {
    type: "pilates",
    equipment: "Barre",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Barre Squat & Press", duration: 30, instructions: "Hold the Pilates Bar at chest level. Squat down keeping knees behind toes. Stand up and press the bar overhead using the resistance bands.", animation: "squat-press" }
    ]
  },
  "Overhead Lunge": {
    type: "pilates",
    equipment: "Barre",
    sets: 3,
    reps: 10,
    exercises: [
      { name: "Overhead Walking Lunge", duration: 35, instructions: "Press the Pilates Bar overhead. Step forward into a deep lunge. Keep core tight, posture long, and arms locked out.", animation: "overhead-lunge" }
    ]
  },
  "Inner Thigh Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 3,
    reps: 20,
    exercises: [
      { name: "Inner Thigh Ring Squeeze", duration: 30, instructions: "Place the Fusion Ring between inner thighs. Squeeze the ring slowly, hold compression for 1s, release gently.", animation: "thigh-squeeze" }
    ]
  },
  "Bridge & Ring Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 4,
    reps: 12,
    exercises: [
      { name: "Bridge Ring Press", duration: 35, instructions: "Lie on your back with knees bent. Place the Fusion Ring between thighs. Lift your hips into a bridge while squeezing the ring.", animation: "bridge-squeeze" }
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
      // Soft woodblock tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'complete') {
      // Luxury double bell chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    }
  } catch (e) {
    console.log("Audio not supported or blocked by user gesture settings.");
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
  // Map pilates exercises to their details
  launchWorkoutPlayer(name);
};

function launchWorkoutPlayer(name) {
  const modal = document.getElementById('videoModal');
  if (!modal) return;

  currentWorkoutName = name;
  currentWorkoutData = workoutData[name];

  if (!currentWorkoutData) {
    // Fallback if workout metadata is not in our dictionary
    currentWorkoutData = {
      type: "yoga",
      exercises: [
        { name: name, duration: 45, instructions: "Listen to your body. Breathe deeply and maintain control.", animation: "breath" }
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
    
    // Play tick chime for final 3 seconds
    if (currentSecondsLeft > 0 && currentSecondsLeft <= 3) {
      playPremiumChime('tick');
    }

    updateTimerDisplay();

    if (currentSecondsLeft <= 0) {
      clearInterval(currentPlayerInterval);
      playPremiumChime('complete');
      
      // Advance or complete
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
  
  // Show Completion Screen
  inner.innerHTML = `
    <button class="video-modal__close" onclick="closeWorkoutPlayer()">✕</button>
    <div style="padding: 3rem 2rem; background: var(--color-near-black); text-align: center; color: #fff; min-height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <span style="font-size: 4rem; margin-bottom: 1.5rem; animation: float 3s ease-in-out infinite;">✨</span>
      <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-accent-gold);">Workout Complete!</h2>
      <p style="color: rgba(255,255,255,0.6); max-width: 400px; margin-bottom: 2rem; font-size: 0.9375rem;">
        Congratulations! You finished <strong>${currentWorkoutName}</strong>. You're building strength, balance, and control.
      </p>
      <div style="display: flex; gap: 2rem; margin-bottom: 2.5rem; justify-content: center;">
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">+50</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">XP Gained</div>
        </div>
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">${currentWorkoutData.type === 'yoga' ? '180' : '220'}</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">Cal Burned</div>
        </div>
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">🔥 13</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">Day Streak</div>
        </div>
      </div>
      <button onclick="closeWorkoutPlayer()" class="btn btn--gold btn--lg" style="padding: 0.875rem 3rem;">Done</button>
    </div>
  `;
  showToast("🎉 Session completed! +50 XP!");
}

function updateTimerDisplay() {
  const countdownText = document.getElementById('playerCountdownText');
  const circleFill = document.getElementById('playerProgressCircleFill');
  const exercise = currentWorkoutData.exercises[currentExerciseIndex];

  if (countdownText) {
    countdownText.textContent = currentSecondsLeft + 's';
  }

  if (circleFill) {
    const total = exercise.duration;
    const progress = (total - currentSecondsLeft) / total;
    const dasharray = 283; // 2 * PI * r (r=45)
    circleFill.setAttribute('stroke-dashoffset', dasharray * (1 - progress));
  }
}

function renderPlayerUI(exercise) {
  const inner = document.querySelector('.video-modal__inner');
  if (!inner) return;

  // Render Workout Player Layout
  inner.innerHTML = `
    <button class="video-modal__close" id="videoModalClose" onclick="closeWorkoutPlayer()">✕</button>
    
    <div style="display: grid; grid-template-columns: 280px 1fr; background: #161412; min-height: 520px; color: #fff; font-family: system-ui, sans-serif;">
      
      <!-- Side Exercise List -->
      <div style="background: #1e1b19; border-right: 1px solid rgba(255,255,255,0.06); padding: var(--space-xl) var(--space-lg); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-accent-gold); margin-bottom: 0.5rem;">Routine</div>
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

        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4); text-align: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
          Exercise ${currentExerciseIndex + 1} of ${currentWorkoutData.exercises.length}
        </div>
      </div>

      <!-- Main Animation & Timer area -->
      <div style="padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        
        <!-- Premium Pulsing Exercise Animation -->
        <div style="display: flex; justify-content: center; align-items: center; height: 200px; position: relative;">
          ${renderSVGAnimation(exercise.animation)}
        </div>

        <!-- Exercise Details -->
        <div style="text-align: center; margin-top: 1rem; z-index: 10;">
          <h2 style="font-family: var(--font-heading); font-size: 1.625rem; margin-bottom: 0.75rem; color: #fff; font-weight: 400;">
            ${exercise.name}
          </h2>
          <p style="color: rgba(255,255,255,0.7); max-width: 480px; margin: 0 auto; line-height: 1.6; font-size: 0.875rem; min-height: 50px;">
            ${exercise.instructions}
          </p>
        </div>

        <!-- Timer Circle & Player Control Elements -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.5rem;">
          
          <!-- Left: Prev Button -->
          <button onclick="navigateWorkout(-1)" style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;" ${currentExerciseIndex === 0 ? 'disabled style="opacity: 0.2; cursor: default;"' : ''}>
            ⏮ Prev
          </button>

          <!-- Middle: Pause / Time Counter Circle -->
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            
            <!-- Circular Progress SVG -->
            <div style="position: relative; width: 80px; height: 80px;">
              <svg width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)" stroke-width="4" fill="none" />
                <circle id="playerProgressCircleFill" cx="50" cy="50" r="45" stroke="var(--color-accent-gold)" stroke-width="4" fill="none" 
                  stroke-dasharray="283" stroke-dashoffset="0" stroke-linecap="round" style="transition: stroke-dashoffset 1s linear; transform: rotate(-90deg); transform-origin: 50px 50px;" />
              </svg>
              <div id="playerCountdownText" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.25rem; font-weight: 400; color: #fff;">
                ${currentSecondsLeft}s
              </div>
            </div>

            <!-- Pause / Play controls -->
            <button id="playerPausePlayBtn" onclick="togglePlayerPause()" style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-accent-gold); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; box-shadow: 0 4px 12px rgba(201,169,110,0.3); transition: transform 0.2s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>

          </div>

          <!-- Right: Next Button -->
          <button onclick="navigateWorkout(1)" style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">
            ${currentExerciseIndex === currentWorkoutData.exercises.length - 1 ? 'Finish ✓' : 'Next ⏭'}
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
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>';
      btn.style.background = 'rgba(255,255,255,0.15)';
    } else {
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
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
// PREMIUM SVG ANIMATIONS (PULSING LOOPS)
// ==========================================
function renderSVGAnimation(type) {
  // Premium, organic minimalist animations using SVG and CSS keyframe animations
  return `
    <svg width="200" height="200" viewBox="0 0 100 100" style="overflow: visible;">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-accent-gold)" stop-opacity="0.25" />
          <stop offset="100%" stop-color="var(--color-accent-gold)" stop-opacity="0" />
        </radialGradient>
        <style>
          @keyframes pulse-ring {
            0% { transform: scale(0.65); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 0.2; }
            100% { transform: scale(0.65); opacity: 0.8; }
          }
          @keyframes breath-inhale {
            0%, 100% { r: 15; opacity: 0.4; }
            50% { r: 35; opacity: 0.9; }
          }
          @keyframes move-bar {
            0%, 100% { transform: translateY(12px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes press-ring {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(0.7); }
          }
          .anim-ring {
            transform-origin: 50px 50px;
            animation: pulse-ring 4s ease-in-out infinite;
          }
          .anim-breath {
            animation: breath-inhale 5s ease-in-out infinite;
          }
          .anim-bar {
            animation: move-bar 4s ease-in-out infinite;
            transform-origin: 50px 50px;
          }
          .anim-press-ring {
            animation: press-ring 3s ease-in-out infinite;
            transform-origin: 50px 50px;
          }
        </style>
      </defs>
      
      <!-- Background glowing gradient -->
      <circle cx="50" cy="50" r="45" fill="url(#glow)" />
      
      ${type === 'breath' || type === 'childs-pose' || type === 'savasana' ? `
        <!-- Breathing Animation Loop -->
        <circle class="anim-ring" cx="50" cy="50" r="30" fill="none" stroke="rgba(201,169,110,0.15)" stroke-width="1" />
        <circle class="anim-ring" cx="50" cy="50" r="20" fill="none" stroke="rgba(201,169,110,0.25)" stroke-width="1" style="animation-delay: -1s;" />
        <circle class="anim-breath" cx="50" cy="50" r="25" fill="none" stroke="var(--color-accent-gold)" stroke-width="2.5" />
        <circle cx="50" cy="50" r="5" fill="#fff" />
      ` : ''}

      ${type === 'cat-cow' || type === 'vinyasa' || type === 'down-dog' || type === 'warrior-1' || type === 'sphinx' || type === 'pigeon' ? `
        <!-- Flowing Wave / Spine Alignment Loop -->
        <circle class="anim-ring" cx="50" cy="50" r="32" fill="none" stroke="rgba(201,169,110,0.15)" stroke-width="1" />
        <path d="M15 50 Q 32.5 25, 50 50 T 85 50" fill="none" stroke="var(--color-accent-gold)" stroke-width="2" stroke-linecap="round">
          <animate attributeName="d" 
            values="M15 50 Q 32.5 25, 50 50 T 85 50;
                    M15 50 Q 32.5 75, 50 50 T 85 50;
                    M15 50 Q 32.5 25, 50 50 T 85 50" 
            dur="6s" repeatCount="indefinite" />
        </path>
        <circle cx="50" cy="50" r="4" fill="#fff" />
      ` : ''}

      ${type === 'squat-press' || type === 'overhead-lunge' ? `
        <!-- Pilates Bar Movement Simulator -->
        <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(255,255,255,0.15)" stroke-width="3" stroke-linecap="round" />
        <g class="anim-bar">
          <!-- Squat/Press Bar representation -->
          <line x1="15" y1="50" x2="85" y2="50" stroke="var(--color-accent-gold)" stroke-width="4.5" stroke-linecap="round" />
          <circle cx="15" cy="50" r="3.5" fill="#fff" />
          <circle cx="85" cy="50" r="3.5" fill="#fff" />
        </g>
        <circle cx="50" cy="50" r="2" fill="rgba(201,169,110,0.4)" />
      ` : ''}

      ${type === 'thigh-squeeze' || type === 'bridge-squeeze' ? `
        <!-- Pilates Ring Compression Simulator -->
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
        <circle class="anim-press-ring" cx="50" cy="50" r="26" fill="none" stroke="var(--color-accent-gold)" stroke-width="4" />
        <!-- Handles -->
        <rect class="anim-press-ring" x="20" y="44" width="6" height="12" rx="3" fill="#fff" />
        <rect class="anim-press-ring" x="74" y="44" width="6" height="12" rx="3" fill="#fff" />
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
