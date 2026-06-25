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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'complete') {
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
        
        <!-- Premium Pulsing Human Joint Animation -->
        <div style="display: flex; justify-content: center; align-items: center; height: 220px; position: relative; background: rgba(0,0,0,0.15); border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.04);">
          ${renderSVGAnimation(exercise.animation)}
        </div>

        <!-- Exercise Details -->
        <div style="text-align: center; margin-top: 1rem; z-index: 10;">
          <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff; font-weight: 400;">
            ${exercise.name}
          </h2>
          <p style="color: rgba(255,255,255,0.7); max-width: 480px; margin: 0 auto; line-height: 1.6; font-size: 0.875rem; min-height: 50px;">
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
            <div style="position: relative; width: 70px; height: 70px;">
              <svg width="70" height="70" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)" stroke-width="4" fill="none" />
                <circle id="playerProgressCircleFill" cx="50" cy="50" r="45" stroke="var(--color-accent-gold)" stroke-width="4" fill="none" 
                  stroke-dasharray="283" stroke-dashoffset="0" stroke-linecap="round" style="transition: stroke-dashoffset 1s linear; transform: rotate(-90deg); transform-origin: 50px 50px;" />
              </svg>
              <div id="playerCountdownText" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.125rem; font-weight: 400; color: #fff;">
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
          <stop offset="0%" stop-color="var(--color-accent-gold)" stop-opacity="0.12" />
          <stop offset="100%" stop-color="var(--color-accent-gold)" stop-opacity="0" />
        </radialGradient>
        <style>
          /* CSS Keyframes for Person Joints */
          @keyframes breathing-chest {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @keyframes childs-pose-stretch {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(3px, 1px); }
          }
          @keyframes cat-cow-spine {
            0%, 100% { d: path("M20,60 Q35,50 50,60 T80,60"); } /* cat arch */
            50% { d: path("M20,60 Q35,72 50,60 T80,60"); } /* cow dip */
          }
          @keyframes downdog-pulse {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-3px, -3px); }
          }
          @keyframes warrior-lunge {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
          }
          @keyframes squatting {
            0%, 100% { transform: translateY(0px) scaleY(1); }
            50% { transform: translateY(22px) scaleY(0.72); }
          }
          @keyframes arm-overhead {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-130deg); }
          }
          @keyframes lunge-depth {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(15px); }
          }
          @keyframes legs-squeeze {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(0.5); }
          }
          @keyframes bridge-lift {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
          }

          /* Joint Classes */
          .person-body { stroke: #fff; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; fill: none; }
          .person-head { fill: #fff; }
          .gold-accent { stroke: var(--color-accent-gold); stroke-width: 1.5; fill: none; }
          .equipment-bar { stroke: var(--color-accent-gold); stroke-width: 3.5; stroke-linecap: round; }
          .equipment-ring { stroke: var(--color-accent-gold); stroke-width: 2.5; fill: none; }
        </style>
      </defs>

      <!-- Ambient Glow background -->
      <circle cx="50" cy="50" r="45" fill="url(#glow)" />

      <!-- Floor / Ground Line -->
      <line x1="5" y1="85" x2="95" y2="85" stroke="rgba(255,255,255,0.08)" stroke-width="2" />

      ${type === 'breath' || type === 'savasana' ? `
        <!-- Sitting / Lying Breath simulator -->
        <g style="transform-origin: 50px 65px; animation: breathing-chest 4s ease-in-out infinite;">
          <!-- Cross-legged Pose -->
          <circle class="person-head" cx="50" cy="35" r="5" />
          <path class="person-body" d="M50,40 L50,65 M50,65 L35,80 L65,80 Z" />
          <path class="person-body" d="M50,48 L35,55 M50,48 L65,55" />
          <circle cx="50" cy="50" r="16" stroke="var(--color-accent-gold)" stroke-width="1.5" stroke-dasharray="4 4" fill="none">
            <animate attributeName="r" values="8;20;8" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.1;0.8" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      ` : ''}

      ${type === 'childs-pose' ? `
        <!-- Kneeling Forward Fold Person -->
        <g style="transform-origin: 20px 80px; animation: childs-pose-stretch 4s ease-in-out infinite;">
          <circle class="person-head" cx="22" cy="74" r="4.5" />
          <!-- Arms stretched flat -->
          <path class="person-body" d="M40,82 L75,82" />
          <!-- Torso flat down -->
          <path class="person-body" d="M22,74 Q40,68 55,80" />
          <!-- Folded legs -->
          <path class="person-body" d="M20,82 L38,82 L30,76 L20,82" />
        </g>
      ` : ''}

      ${type === 'cat-cow' ? `
        <!-- On all fours, spinal morphing -->
        <g>
          <circle class="person-head" cx="20" cy="46" r="4.5" />
          <!-- Back / Spine arching (using animated path d attribute) -->
          <path class="person-body" id="spinePath" d="M20,50 Q45,35 70,50" />
          <script>
            // Ensure runtime morphing for cow/cat
            const spine = document.getElementById('spinePath');
            if(spine) {
              spine.style.animation = "cat-cow-spine 5s ease-in-out infinite";
            }
          </script>
          <!-- Front hands and back knees -->
          <path class="person-body" d="M25,50 L25,85 M70,50 L70,85" />
          <path class="person-body" d="M70,85 L85,85" />
        </g>
      ` : ''}

      ${type === 'down-dog' ? `
        <!-- Inverted V-Shape Dog Pose -->
        <g style="transform-origin: 50px 50px; animation: downdog-pulse 4s ease-in-out infinite;">
          <circle class="person-head" cx="36" cy="74" r="4.5" />
          <!-- Hands to Hip -->
          <path class="person-body" d="M30,82 L50,45" />
          <!-- Feet to Hip -->
          <path class="person-body" d="M70,82 L50,45" />
          <!-- Spine / Head alignment -->
          <path class="person-body" d="M36,74 L50,45" />
        </g>
      ` : ''}

      ${type === 'warrior-1' ? `
        <!-- Warrior standing stretch lunge -->
        <g style="transform-origin: 50px 85px; animation: warrior-lunge 4s ease-in-out infinite;">
          <circle class="person-head" cx="50" cy="28" r="4.5" />
          <!-- Arms pointing straight overhead -->
          <path class="person-body" d="M50,33 L50,15" />
          <!-- Upright Spine -->
          <path class="person-body" d="M50,33 L50,55" />
          <!-- Bent front leg (left) -->
          <path class="person-body" d="M50,55 L32,62 L32,85" />
          <!-- Stretched back leg (right) -->
          <path class="person-body" d="M50,55 L72,70 L80,85" />
        </g>
      ` : ''}

      ${type === 'squat-press' ? `
        <!-- Squat and press simulator -->
        <g style="transform-origin: 50px 85px; animation: squatting 4s ease-in-out infinite;">
          <circle class="person-head" cx="50" cy="28" r="4.5" />
          <!-- Body Spine -->
          <path class="person-body" d="M50,33 L50,58" />
          <!-- Legs (Knees bend outward) -->
          <path class="person-body" d="M50,58 L36,70 L25,85 M50,58 L64,70 L75,85" />
          
          <!-- Arms moving overhead (Press) -->
          <g style="transform-origin: 50px 36px; animation: arm-overhead 4s ease-in-out infinite;">
            <path class="person-body" d="M50,36 L32,32 L32,18 M50,36 L68,32 L68,18" />
            <!-- Pilates Bar -->
            <line class="equipment-bar" x1="24" y1="18" x2="76" y2="18" />
          </g>
        </g>
      ` : ''}

      ${type === 'overhead-lunge' ? `
        <!-- Walking Lunge Simulator -->
        <g style="transform-origin: 50px 85px; animation: lunge-depth 4s ease-in-out infinite;">
          <circle class="person-head" cx="45" cy="30" r="4.5" />
          <!-- Spine -->
          <path class="person-body" d="M45,35 L45,60" />
          <!-- Front leg bent deep -->
          <path class="person-body" d="M45,60 L24,64 L30,85" />
          <!-- Back leg stretched back, knee near floor -->
          <path class="person-body" d="M45,60 L65,72 L75,85" />
          <!-- Arms straight up holding Bar -->
          <path class="person-body" d="M45,35 L45,15" />
          <line class="equipment-bar" x1="30" y1="15" x2="60" y2="15" />
        </g>
      ` : ''}

      ${type === 'thigh-squeeze' ? `
        <!-- Sitting Thigh Squeeze with Ring -->
        <g style="transform-origin: 50px 50px;">
          <!-- Front view legs squeezing -->
          <circle class="person-head" cx="50" cy="30" r="4.5" />
          <path class="person-body" d="M50,35 L50,55" />
          <g style="animation: legs-squeeze 3s ease-in-out infinite; transform-origin: 50px 55px;">
            <!-- Outer hips to knees and feet -->
            <path class="person-body" d="M50,55 L32,68 L40,85 M50,55 L68,68 L60,85" />
            <!-- Fusion Ring between knees -->
            <circle class="equipment-ring" cx="50" cy="68" r="10" />
            <rect fill="#fff" x="38" y="65" width="2" height="6" />
            <rect fill="#fff" x="60" y="65" width="2" height="6" />
          </g>
        </g>
      ` : ''}

      ${type === 'bridge-squeeze' ? `
        <!-- Bridge Hip Lift Simulator -->
        <g style="transform-origin: 30px 80px; animation: bridge-lift 4s ease-in-out infinite;">
          <!-- Shoulders/Head flat on floor -->
          <circle class="person-head" cx="20" cy="80" r="4.5" />
          <!-- Hips lifting up -->
          <path class="person-body" d="M20,80 Q45,62 65,72" />
          <!-- Bent legs to floor -->
          <path class="person-body" d="M65,72 L80,85" />
          <!-- Arms flat -->
          <path class="person-body" d="M20,85 L50,85" />
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
