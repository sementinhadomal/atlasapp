/**
 * Atlas Pilates — Main Application Logic
 * Premium interactive exercise player with lifelike skeletal human animations,
 * joint highlighting, elastic cords for the Pilates Bar, and squashing Pilates Rings.
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
    console.log("Audio settings blocked.");
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
    const dasharray = 283; 
    circleFill.setAttribute('stroke-dashoffset', dasharray * (1 - progress));
  }
}

function renderPlayerUI(exercise) {
  const inner = document.querySelector('.video-modal__inner');
  if (!inner) return;

  inner.innerHTML = `
    <button class="video-modal__close" id="videoModalClose" onclick="closeWorkoutPlayer()">✕</button>
    
    <div style="display: grid; grid-template-columns: 280px 1fr; background: #161412; min-height: 540px; color: #fff; font-family: system-ui, sans-serif;">
      
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
        
        <!-- Premium Pulsing Human Joint Animation -->
        <div style="display: flex; justify-content: center; align-items: center; height: 240px; position: relative; background: #0f0d0c; border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.04); box-shadow: inset 0 8px 32px rgba(0,0,0,0.4);">
          ${renderSVGAnimation(exercise.animation)}
        </div>

        <!-- Exercise Details -->
        <div style="text-align: center; margin-top: 1rem; z-index: 10;">
          <h2 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.5rem; color: #fff; font-weight: 400;">
            ${exercise.name}
          </h2>
          <p style="color: rgba(255,255,255,0.65); max-width: 480px; margin: 0 auto; line-height: 1.6; font-size: 0.85rem; min-height: 50px;">
            ${exercise.instructions}
          </p>
        </div>

        <!-- Timer Circle & Player Control Elements -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.25rem;">
          
          <button onclick="navigateWorkout(-1)" style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;" ${currentExerciseIndex === 0 ? 'disabled style="opacity: 0.2; cursor: default;"' : ''}>
            ⏮ Prev
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
          <stop offset="0%" stop-color="var(--color-accent-gold)" stop-opacity="0.18" />
          <stop offset="100%" stop-color="var(--color-accent-gold)" stop-opacity="0" />
        </radialGradient>
        <filter id="shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
        </filter>
        <style>
          /* CSS Keyframes for Person Joints */
          @keyframes breathing-body {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.03) translateY(-1px); }
          }
          @keyframes stretch-child {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(4px, 2px); }
          }
          @keyframes cat-cow-morph {
            0%, 100% { d: path("M20,62 Q35,52 50,62 T80,62"); } /* cat arch */
            50% { d: path("M20,62 Q35,74 50,62 T80,62"); } /* cow dip */
          }
          @keyframes cat-cow-head {
            0%, 100% { transform: translate(0, 3px); }
            50% { transform: translate(0, -3px); }
          }
          @keyframes downdog-pulse {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-2px, -3px); }
          }
          @keyframes warrior-lunge {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(2px); }
          }
          @keyframes squatting {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
          }
          @keyframes thigh-rotation {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(24deg); }
          }
          @keyframes calf-rotation {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-45deg); }
          }
          @keyframes arm-overhead-press {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            50% { transform: rotate(-120deg) translateY(-8px); }
          }
          @keyframes walk-lunge {
            0%, 100% { transform: translateY(0px) translateX(0); }
            50% { transform: translateY(14px) translateX(-4px); }
          }
          @keyframes joint-glow {
            0%, 100% { r: 2px; opacity: 0.6; }
            50% { r: 3.5px; opacity: 1; }
          }
          @keyframes squish-ring {
            0%, 100% { transform: scaleX(1) scaleY(1); }
            50% { transform: scaleX(0.55) scaleY(0.9); }
          }
          @keyframes bridge-lift {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-18px); }
          }

          /* Body Styles - Thick Curved Capsules */
          .limb {
            stroke: #eae5d9;
            stroke-width: 4.5;
            stroke-linecap: round;
            fill: none;
            filter: url(#shadow-filter);
          }
          .torso {
            stroke: #eae5d9;
            stroke-width: 7;
            stroke-linecap: round;
            fill: none;
          }
          .head {
            fill: #eae5d9;
            stroke: none;
          }
          .joint-dot {
            fill: var(--color-accent-gold);
            animation: joint-glow 2s infinite ease-in-out;
          }
          .elastic-cord {
            stroke: rgba(201, 169, 110, 0.4);
            stroke-width: 1.5;
            stroke-dasharray: 2 2;
            fill: none;
          }
          .bar {
            stroke: var(--color-accent-gold);
            stroke-width: 3.5;
            stroke-linecap: round;
          }
        </style>
      </defs>

      <!-- Ambient Glow background -->
      <circle cx="50" cy="50" r="45" fill="url(#glow)" />

      <!-- Floor / Ground Line -->
      <line x1="5" y1="85" x2="95" y2="85" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" />

      ${type === 'breath' || type === 'savasana' ? `
        <!-- Sitting Meditative Breathe -->
        <g style="transform-origin: 50px 65px; animation: breathing-body 4s ease-in-out infinite;">
          <circle class="head" cx="50" cy="35" r="5.5" />
          <line class="torso" x1="50" y1="40" x2="50" y2="60" />
          <!-- Crossed thighs -->
          <path class="limb" d="M48,60 C38,62 30,70 30,78 Q50,82 70,78 C70,70 62,62 52,60" stroke-width="5" />
          <path class="limb" d="M50,44 L38,55 L50,62 M50,44 L62,55 L50,62" />
          
          <!-- Core activation glow -->
          <circle class="joint-dot" cx="50" cy="52" r="3" />
        </g>
      ` : ''}

      ${type === 'childs-pose' ? `
        <!-- Stretch Yoga Childs Pose -->
        <g style="transform-origin: 20px 80px; animation: stretch-child 4s ease-in-out infinite;">
          <circle class="head" cx="24" cy="74" r="5" />
          <!-- Torso flat down -->
          <path class="torso" d="M24,74 C36,70 48,74 60,82" />
          <!-- Folded legs -->
          <path class="limb" d="M22,82 L38,82 L32,76 L22,82" />
          <!-- Stretched Arms -->
          <path class="limb" d="M28,74 L60,80 L76,82" />
        </g>
      ` : ''}

      ${type === 'cat-cow' ? `
        <!-- All fours flexible spine -->
        <g>
          <!-- Front arm support -->
          <line class="limb" x1="28" y1="60" x2="28" y2="85" />
          <!-- Back legs support -->
          <path class="limb" d="M72,60 L72,75 L82,85" />
          
          <!-- Spine morphing -->
          <path class="torso" id="cowSpine" d="M28,60 Q50,50 72,60" />
          
          <g style="transform-origin: 28px 60px; animation: cat-cow-head 5s ease-in-out infinite;">
            <circle class="head" cx="20" cy="54" r="5" />
            <line class="limb" x1="20" y1="54" x2="28" y2="60" />
          </g>
          <script>
            const spine = document.getElementById('cowSpine');
            if (spine) spine.style.animation = "cat-cow-morph 5s ease-in-out infinite";
          </script>
        </g>
      ` : ''}

      ${type === 'down-dog' ? `
        <!-- V-Shape Inverted Down Dog -->
        <g style="transform-origin: 50px 50px; animation: downdog-pulse 4s ease-in-out infinite;">
          <circle class="head" cx="35" cy="72" r="5" />
          <!-- Arms to Hips -->
          <line class="limb" x1="26" y1="85" x2="48" y2="46" />
          <!-- Legs to Hips -->
          <path class="limb" d="M74" />
          <line class="limb" x1="72" y1="85" x2="48" y2="46" />
          <!-- Spine torso -->
          <line class="torso" x1="38" y1="68" x2="48" y2="46" />
          <!-- Highlighted stretching joints -->
          <circle class="joint-dot" cx="48" cy="46" r="3" />
        </g>
      ` : ''}

      ${type === 'warrior-1' ? `
        <!-- Warrior 1 Lunge -->
        <g style="transform-origin: 50px 85px; animation: warrior-lunge 4s ease-in-out infinite;">
          <circle class="head" cx="48" cy="26" r="5" />
          <line class="torso" x1="48" y1="31" x2="48" y2="56" />
          <!-- Raised Arms -->
          <path class="limb" d="M48,34 L48,12" />
          <!-- Bent front thigh (left) -->
          <path class="limb" d="M48,56 L30,62 L30,85" />
          <!-- Stretched back thigh (right) -->
          <path class="limb" d="M48,56 L70,70 L78,85" />
          <!-- Knee active joint glow -->
          <circle class="joint-dot" cx="30" cy="62" r="3.5" />
        </g>
      ` : ''}

      ${type === 'squat-press' ? `
        <!-- Realistic squat with elastic cords & bar -->
        <g style="transform-origin: 50px 85px; animation: squatting 4s ease-in-out infinite;">
          <circle class="head" cx="50" cy="30" r="5" />
          <line class="torso" x1="50" y1="35" x2="50" y2="58" />
          
          <!-- Hips to Knees (Thighs) -->
          <g style="transform-origin: 50px 58px; animation: thigh-rotation 4s ease-in-out infinite;">
            <line class="limb" x1="50" y1="58" x2="36" y2="70" />
            <!-- Knees to Feet (Calves) -->
            <g style="transform-origin: 36px 70px; animation: calf-rotation 4s ease-in-out infinite;">
              <line class="limb" x1="36" y1="70" x2="36" y2="85" />
            </g>
          </g>

          <g style="transform-origin: 50px 58px; animation: thigh-rotation 4s ease-in-out infinite; transform: scaleX(-1);">
            <line class="limb" x1="50" y1="58" x2="36" y2="70" />
            <g style="transform-origin: 36px 70px; animation: calf-rotation 4s ease-in-out infinite;">
              <line class="limb" x1="36" y1="70" x2="36" y2="85" />
            </g>
          </g>

          <!-- Arms raising bar overhead -->
          <g style="transform-origin: 50px 38px; animation: arm-overhead-press 4s ease-in-out infinite;">
            <path class="limb" d="M50,38 L32,34 L32,18" />
            <path class="limb" d="M50,38 L68,34 L68,18" />
            
            <!-- Pilates Bar -->
            <line class="bar" x1="22" y1="18" x2="78" y2="18" />
            
            <!-- Elastic Resistance Cords connected to feet -->
            <path class="elastic-cord" d="M22,18 C22,50 36,80 36,85" />
            <path class="elastic-cord" d="M78,18 C78,50 64,80 64,85" />
          </g>

          <!-- Core activation joint -->
          <circle class="joint-dot" cx="50" cy="48" r="3.5" />
        </g>
      ` : ''}

      ${type === 'overhead-lunge' ? `
        <!-- Walking Lunge holding Bar overhead -->
        <g style="transform-origin: 50px 85px; animation: walk-lunge 4s ease-in-out infinite;">
          <circle class="head" cx="42" cy="30" r="5" />
          <line class="torso" x1="42" y1="35" x2="42" y2="58" />
          
          <!-- Front leg bent deep -->
          <path class="limb" d="M42,58 L20,62 L28,85" />
          <!-- Back leg stretched behind -->
          <path class="limb" d="M42,58 L62,72 L72,85" />
          
          <!-- Arms straight holding bar -->
          <path class="limb" d="M42,35 L42,16 M42,35 L42,16" stroke-width="5" />
          <line class="bar" x1="28" y1="16" x2="56" y2="16" />
          
          <!-- Cords stretching back to front foot -->
          <line class="elastic-cord" x1="28" y1="16" x2="28" y2="85" />
          <line class="elastic-cord" x1="56" y1="16" x2="28" y2="85" />
          
          <circle class="joint-dot" cx="20" cy="62" r="3.5" />
        </g>
      ` : ''}

      ${type === 'thigh-squeeze' ? `
        <!-- Supine View Thigh squeeze with squishing Ring -->
        <g style="transform-origin: 50px 50px;">
          <circle class="head" cx="50" cy="32" r="5.5" />
          <line class="torso" x1="50" y1="38" x2="50" y2="58" />
          
          <g style="animation: legs-squeeze 3s ease-in-out infinite; transform-origin: 50px 58px;">
            <!-- Legs pressing inward -->
            <path class="limb" d="M50,58 L32,70 L40,85" />
            <path class="limb" d="M50,58 L68,70 L60,85" />
            
            <!-- Dynamic squashing Fusion Ring -->
            <ellipse class="equipment-ring" cx="50" cy="70" rx="14" ry="14" style="transform-origin: 50px 70px; animation: squish-ring 3s ease-in-out infinite;" />
            <rect fill="#fff" x="34" y="66" width="3" height="8" rx="1.5" />
            <rect fill="#fff" x="63" y="66" width="3" height="8" rx="1.5" />
          </g>
          <!-- Adductor activation indicators -->
          <circle class="joint-dot" cx="44" cy="64" r="2.5" />
          <circle class="joint-dot" cx="56" cy="64" r="2.5" />
        </g>
      ` : ''}

      ${type === 'bridge-squeeze' ? `
        <!-- Glute Bridge with Ring squeeze -->
        <g style="transform-origin: 20px 80px; animation: bridge-lift 4s ease-in-out infinite;">
          <!-- Head/Shoulders stable -->
          <circle class="head" cx="22" cy="80" r="5" />
          <!-- Torso lifting into bridge -->
          <path class="torso" d="M22,80 C36,68 54,68 66,74" stroke-width="7.5" />
          <!-- Bent leg to ground -->
          <path class="limb" d="M66,74 L80,85" />
          
          <!-- Highlighted active muscles (Glutes/Core) -->
          <circle class="joint-dot" cx="54" cy="70" r="3.5" />
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
