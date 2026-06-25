/**
 * Atlas Pilates — Main Application Logic
 * Premium interactive exercise player with aesthetic minimalist body silhouettes,
 * real-time biofeedback tension gauges, joint angle trackers, breathing visualizers,
 * and high-end interactive training indicators.
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
      { name: "Child's Pose (Balasana)", duration: 30, instructions: "Relax your hips onto your heels. Extend your arms forward, rest your forehead on the mat. Breathe deeply.", animation: "childs-pose", target: "Spine & Hips" },
      { name: "Cat-Cow Stretch (Marjaryasana)", duration: 40, instructions: "Inhale: arch your back, drop belly, look up. Exhale: round your spine, tuck chin to chest.", animation: "cat-cow", target: "Spine Mobility" },
      { name: "Downward Facing Dog (Adho Mukha Svanasana)", duration: 45, instructions: "Lift your hips up and back. Press your palms into the mat, align your spine, pedal your feet.", animation: "down-dog", target: "Hamstrings & Shoulders" },
      { name: "Sun Salutation A (Surya Namaskar)", duration: 60, instructions: "Inhale arms up. Exhale fold forward. Inhale halfway lift. Exhale chaturanga. Inhale upward dog. Exhale downward dog.", animation: "vinyasa", target: "Full Body Flow" },
      { name: "Warrior I (Virabhadrasana I)", duration: 40, instructions: "Step right foot forward. Bend front knee. Inhale arms overhead. Keep hips squared.", animation: "warrior-1", target: "Quads & Shoulders" }
    ]
  },
  "Deep Restore & Relax": {
    type: "yoga",
    duration: "45 min",
    exercises: [
      { name: "Deep Belly Breathing", duration: 30, instructions: "Sit comfortably. Place one hand on belly. Inhale deeply, expand belly. Exhale slowly.", animation: "breath", target: "Nervous System" },
      { name: "Sphinx Pose", duration: 40, instructions: "Lie on belly, forearms on mat. Gently lift chest. Keep shoulders away from ears.", animation: "sphinx", target: "Lower Back" },
      { name: "Supported Bridge Pose", duration: 50, instructions: "Lie on back, bend knees. Lift hips, keep neck relaxed. Focus on deep breaths.", animation: "bridge", target: "Glutes & Lower Back" },
      { name: "Supine Twist", duration: 45, instructions: "Bring knees to chest. Drop knees to right side, look left. Relax your shoulders.", animation: "twist", target: "Spine Rotation" }
    ]
  },
  "Post-Workout Recovery": {
    type: "yoga",
    duration: "25 min",
    exercises: [
      { name: "Neck & Shoulder Release", duration: 30, instructions: "Gently roll neck. Drop right ear to right shoulder, then switch. Feel shoulders drop.", animation: "neck", target: "Cervical Spine" },
      { name: "Hamstring Fold", duration: 40, instructions: "Extend one leg. Hinge from hips, reach forward gently. Keep spine long.", animation: "hamstring", target: "Posterior Chain" },
      { name: "Pigeon Pose", duration: 50, instructions: "Bring right knee forward. Extend left leg back. Sink hips down toward the mat.", animation: "pigeon", target: "Hip Flexors" },
      { name: "Corpse Pose (Savasana)", duration: 60, instructions: "Lie flat. Let feet fall open, hands face up. Absorb the benefits of your practice.", animation: "savasana", target: "Total Restoration" }
    ]
  },
  "Squat & Press": {
    type: "pilates",
    equipment: "Barre",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Barre Squat & Press", duration: 35, instructions: "Hold the Pilates Bar at chest level. Squat down keeping knees behind toes. Stand up and press the bar overhead using the resistance bands.", animation: "squat-press", target: "Glutes & Shoulders" }
    ]
  },
  "Overhead Lunge": {
    type: "pilates",
    equipment: "Barre",
    sets: 3,
    reps: 10,
    exercises: [
      { name: "Overhead Walking Lunge", duration: 35, instructions: "Press the Pilates Bar overhead. Step forward into a deep lunge. Keep core tight, posture long, and arms locked out.", animation: "overhead-lunge", target: "Quads & Core Stability" }
    ]
  },
  "Inner Thigh Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 3,
    reps: 20,
    exercises: [
      { name: "Inner Thigh Ring Squeeze", duration: 30, instructions: "Place the Fusion Ring between inner thighs. Squeeze the ring slowly, hold compression for 1s, release gently.", animation: "thigh-squeeze", target: "Adductors & Inner Core" }
    ]
  },
  "Bridge & Ring Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 4,
    reps: 12,
    exercises: [
      { name: "Bridge Ring Press", duration: 35, instructions: "Lie on your back with knees bent. Place the Fusion Ring between thighs. Lift your hips into a bridge while squeezing the ring.", animation: "bridge-squeeze", target: "Glutes & Hamstrings" }
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

  // Update dynamic gauge elements
  const currentTotal = exercise.duration;
  const timeProgress = (currentTotal - currentSecondsLeft) / currentTotal;

  if (countdownText) {
    countdownText.textContent = currentSecondsLeft + 's';
  }

  if (circleFill) {
    const dasharray = 283; 
    circleFill.setAttribute('stroke-dashoffset', dasharray * (1 - timeProgress));
  }

  // Update Angle Gauge & Tension indicators dynamically based on time cycles
  const angleDisplay = document.getElementById('gaugeAngleDisplay');
  const tensionProgress = document.getElementById('gaugeTensionProgress');
  const breathStateText = document.getElementById('breathStateText');

  const cycle = (currentSecondsLeft % 6); // 6 second breathing/rep cycle
  
  if (currentWorkoutData.type === 'yoga') {
    if (breathStateText) {
      if (cycle >= 3) {
        breathStateText.textContent = "Inhale Deeply";
        breathStateText.style.color = "var(--color-accent-gold)";
      } else {
        breathStateText.textContent = "Exhale Control";
        breathStateText.style.color = "rgba(255,255,255,0.7)";
      }
    }
  }

  if (currentWorkoutData.type === 'pilates') {
    if (angleDisplay && tensionProgress) {
      // Squatting movement loop
      let angle = 180;
      let tension = 15;
      
      if (cycle >= 3) {
        const factor = (cycle - 3) / 3; // 0 to 1
        angle = Math.round(180 - (90 * factor)); // 180 down to 90
        tension = Math.round(15 + (70 * factor)); // 15% up to 85%
      } else {
        const factor = cycle / 3; // 0 to 1
        angle = Math.round(90 + (90 * factor)); // 90 up to 180
        tension = Math.round(85 - (70 * factor)); // 85% down to 15%
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

        <!-- Target Zone & Device connection badges -->
        <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-bottom: 6px;">
            <span>Target:</span>
            <strong style="color: var(--color-accent-gold); font-weight: 500;">${exercise.target}</strong>
          </div>
          <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.625rem; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
            Coach Mode Active
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
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Pace Guide</div>
                <div id="breathStateText" style="font-family: var(--font-heading); font-size: 0.9375rem; font-weight: 400; color: var(--color-accent-gold);">Inhale</div>
              </div>
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Heart Rate</div>
                <div style="font-family: var(--font-heading); font-size: 1.125rem; font-weight: 400; color: #fff;">108 <span style="font-size: 0.6875rem; color: rgba(255,255,255,0.4);">BPM</span></div>
              </div>
            ` : `
              <!-- Pilates: Tension & Joint Angle Gauges -->
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Joint Angle</div>
                <div id="gaugeAngleDisplay" style="font-family: var(--font-heading); font-size: 1.125rem; font-weight: 400; color: #fff;">180°</div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">
                  <span>Tension</span>
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
          <stop offset="0%" stop-color="var(--color-accent-gold)" stop-opacity="0.25" />
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

          /* Elegant Body Silhouettes */
          .silhouette-part {
            fill: #f5f2eb;
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

      <!-- Ambient Glow background -->
      <circle cx="50" cy="50" r="45" fill="url(#glow)" />

      <!-- Ground/Mat Line -->
      <line x1="5" y1="85" x2="95" y2="85" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" />

      ${type === 'breath' || type === 'savasana' ? `
        <!-- Sitting Silhouette Meditating -->
        <g style="transform-origin: 50px 65px; animation: breathing-body 4s ease-in-out infinite;">
          <!-- Elegant Head & Neck -->
          <circle class="silhouette-part" cx="50" cy="32" r="6" />
          <!-- Torso -->
          <path class="silhouette-part" d="M47,38 Q50,38 53,38 Q54,58 52,65 Q48,58 46,38" />
          <!-- Folded Legs base -->
          <path class="silhouette-part" d="M30,76 C30,68 38,62 50,62 C62,62 70,68 70,76 C70,82 60,82 50,82 C40,82 30,82 30,76 Z" />
          <!-- Hands on knees -->
          <path class="silhouette-part" d="M36,64 Q42,54 48,46 M64,64 Q58,54 52,46" stroke="#eae5d9" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <!-- Glowing core -->
          <circle class="body-joint-glow" cx="50" cy="54" r="3" />
        </g>
      ` : ''}

      ${type === 'childs-pose' ? `
        <!-- Kneeling forward stretch Silhouette -->
        <g style="transform-origin: 20px 82px; animation: stretch-child 4s ease-in-out infinite;">
          <circle class="silhouette-part" cx="24" cy="74" r="5" />
          <!-- Torso and hips folded back -->
          <path class="silhouette-part" d="M22,76 C35,68 45,70 58,80 C60,82 55,83 45,83 C35,83 22,81 22,76 Z" />
          <!-- Arms extending forward -->
          <path class="silhouette-part" d="M25,75 Q50,78 78,82 L78,84 L25,79 Z" />
          <!-- Folded lower legs -->
          <path class="silhouette-part" d="M20,83 C20,78 28,78 35,83 Z" />
        </g>
      ` : ''}

      ${type === 'cat-cow' ? `
        <!-- Quadruped Spine Flexing Silhouette -->
        <g>
          <!-- Back hip support & legs -->
          <path class="silhouette-part" d="M70,60 C70,72 75,76 80,85 L74,85 C68,76 66,72 66,60 Z" />
          <!-- Front arm support -->
          <path class="silhouette-part" d="M28,60 L28,85 L24,85 L24,60 Z" />
          
          <!-- Spine dynamically morphing (flexible body path) -->
          <path class="silhouette-part" id="cowSpineBody" d="M28,60 C40,50 60,50 72,60 C70,64 45,64 28,60 Z" />
          
          <!-- Head alignment -->
          <g style="transform-origin: 28px 60px; animation: cat-cow-head 5s ease-in-out infinite;">
            <circle class="silhouette-part" cx="20" cy="54" r="5" />
            <path class="silhouette-part" d="M20,55 L28,60 L28,63 L20,57 Z" />
          </g>
          <script>
            const body = document.getElementById('cowSpineBody');
            if (body) {
              body.style.animation = "cat-cow-morph 5s ease-in-out infinite";
            }
          </script>
        </g>
      ` : ''}

      ${type === 'down-dog' ? `
        <!-- V-Shape Silhouette -->
        <g style="transform-origin: 50px 50px; animation: downdog-pulse 4s ease-in-out infinite;">
          <circle class="silhouette-part" cx="35" cy="71" r="5" />
          <!-- Front Torso and Arms -->
          <path class="silhouette-part" d="M24,85 L48,46 L52,46 L28,85 Z" />
          <!-- Back Thigh and Calves -->
          <path class="silhouette-part" d="M72,85 L48,46 L52,46 L76,85 Z" />
          <circle class="body-joint-glow" cx="48" cy="46" r="3.5" />
        </g>
      ` : ''}

      ${type === 'warrior-1' ? `
        <!-- Warrior 1 Lunge Silhouette -->
        <g style="transform-origin: 50px 85px; animation: warrior-lunge 4s ease-in-out infinite;">
          <circle class="silhouette-part" cx="48" cy="26" r="5" />
          <!-- Torso -->
          <path class="silhouette-part" d="M45,31 L51,31 L51,56 L45,56 Z" />
          <!-- Raised Arms -->
          <path class="silhouette-part" d="M46,31 L46,12 L50,12 L50,31 Z" />
          <!-- Bent front leg (left) -->
          <path class="silhouette-part" d="M46,56 C40,58 30,60 30,70 L30,85 L34,85 L34,70 C34,64 42,62 48,56 Z" />
          <!-- Stretched back leg (right) -->
          <path class="silhouette-part" d="M48,56 C58,62 70,68 78,85 L74,85 C66,70 56,64 48,56 Z" />
          <circle class="body-joint-glow" cx="32" cy="70" r="3.5" />
        </g>
      ` : ''}

      ${type === 'squat-press' ? `
        <!-- Premium Squat Silhouette with tension bands and bar -->
        <g style="transform-origin: 50px 85px; animation: squatting 4s ease-in-out infinite;">
          <!-- Head -->
          <circle class="silhouette-part" cx="50" cy="30" r="5" />
          <!-- Torso -->
          <path class="silhouette-part" d="M46,35 L54,35 L52,58 L48,58 Z" />
          
          <!-- Hips to Knees (Thighs) -->
          <g style="transform-origin: 50px 58px; animation: thigh-rotation 4s ease-in-out infinite;">
            <path class="silhouette-part" d="M47,56 L33,70 L37,73 L51,59 Z" />
            <!-- Knees to Feet (Calves) -->
            <g style="transform-origin: 36px 70px; animation: calf-rotation 4s ease-in-out infinite;">
              <path class="silhouette-part" d="M33,69 L33,85 L37,85 L37,69 Z" />
            </g>
          </g>

          <g style="transform-origin: 50px 58px; animation: thigh-rotation 4s ease-in-out infinite; transform: scaleX(-1);">
            <path class="silhouette-part" d="M47,56 L33,70 L37,73 L51,59 Z" />
            <g style="transform-origin: 36px 70px; animation: calf-rotation 4s ease-in-out infinite;">
              <path class="silhouette-part" d="M33,69 L33,85 L37,85 L37,69 Z" />
            </g>
          </g>

          <!-- Arms raising bar overhead (Press) -->
          <g style="transform-origin: 50px 38px; animation: arm-overhead-press 4s ease-in-out infinite;">
            <path class="silhouette-part" d="M46,38 L30,34 L30,18 L34,18 L34,34 L50,38 Z" />
            <path class="silhouette-part" d="M54,38 L70,34 L70,18 L66,18 L66,34 L50,38 Z" />
            
            <!-- Pilates Bar -->
            <line class="pilates-metal-bar" x1="20" y1="18" x2="80" y2="18" />
            
            <!-- Dynamic stretching elastic resistance cords connected to feet -->
            <path class="elastic-tension-band" d="M22,18 C22,50 35,80 35,85" />
            <path class="elastic-tension-band" d="M78,18 C78,50 65,80 65,85" />
          </g>

          <!-- Tension Arrows -->
          <path class="indicator-arrow" d="M20,28 L20,12" />
          <path class="indicator-arrow" d="M80,28 L80,12" />
          
          <circle class="body-joint-glow" cx="50" cy="48" r="3.5" />
        </g>
      ` : ''}

      ${type === 'overhead-lunge' ? `
        <!-- Walking Lunge holding Bar overhead -->
        <g style="transform-origin: 50px 85px; animation: walk-lunge 4s ease-in-out infinite;">
          <circle class="silhouette-part" cx="42" cy="30" r="5" />
          <path class="silhouette-part" d="M39,35 L45,35 L45,58 L39,58 Z" />
          
          <!-- Front leg bent deep -->
          <path class="silhouette-part" d="M42,58 L20,62 L24,65 L44,60 Z" />
          <path class="silhouette-part" d="M20,62 L28,85 L32,85 L24,62 Z" />
          
          <!-- Back leg stretched behind -->
          <path class="silhouette-part" d="M42,58 L62,72 L66,74 L44,60 Z" />
          <path class="silhouette-part" d="M62,72 L72,85 L76,85 L66,72 Z" />
          
          <!-- Arms straight holding bar -->
          <path class="silhouette-part" d="M39,35 L39,16 L43,16 L43,35 Z" />
          <line class="pilates-metal-bar" x1="28" y1="16" x2="56" y2="16" />
          
          <!-- Cords stretching back to front foot -->
          <line class="elastic-tension-band" x1="28" y1="16" x2="28" y2="85" />
          <line class="elastic-tension-band" x1="56" y1="16" x2="28" y2="85" />
          
          <circle class="body-joint-glow" cx="22" cy="62" r="3.5" />
        </g>
      ` : ''}

      ${type === 'thigh-squeeze' ? `
        <!-- Thigh squeeze with squishing Fusion Ring -->
        <g style="transform-origin: 50px 50px;">
          <circle class="silhouette-part" cx="50" cy="32" r="5.5" />
          <!-- Torso -->
          <path class="silhouette-part" d="M46,38 L54,38 L52,58 L48,58 Z" />
          
          <g style="animation: legs-squeeze 3s ease-in-out infinite; transform-origin: 50px 58px;">
            <!-- Outer hips to knees and feet -->
            <path class="silhouette-part" d="M48,58 L30,70 L34,73 L50,60 Z" />
            <path class="silhouette-part" d="M52,58 L68,70 L64,73 L50,60 Z" />
            <path class="silhouette-part" d="M30,70 L38,85 L42,85 L34,70 Z" />
            <path class="silhouette-part" d="M68,70 L60,85 L56,85 L64,70 Z" />
            
            <!-- Dynamic squashing Fusion Ring -->
            <ellipse class="pilates-foam-ring" cx="50" cy="70" rx="14" ry="14" style="transform-origin: 50px 70px; animation: squish-ring 3s ease-in-out infinite;" />
            <rect fill="#fff" x="33" y="66" width="3" height="8" rx="1.5" />
            <rect fill="#fff" x="64" y="66" width="3" height="8" rx="1.5" />
            
            <!-- Compression indicators -->
            <path class="indicator-arrow" d="M28,70 L38,70" />
            <path class="indicator-arrow" d="M72,70 L62,70" />
          </g>
        </g>
      ` : ''}

      ${type === 'bridge-squeeze' ? `
        <!-- Bridge Lift Silhouette -->
        <g style="transform-origin: 22px 80px; animation: bridge-lift 4s ease-in-out infinite;">
          <circle class="silhouette-part" cx="22" cy="80" r="5" />
          <!-- Bridge arched torso/pelvis -->
          <path class="silhouette-part" d="M22,80 C36,65 54,65 66,74 L68,78 C54,71 36,71 22,82 Z" />
          <!-- Calf to ground -->
          <path class="silhouette-part" d="M66,74 L80,85 L76,85 L62,74 Z" />
          
          <circle class="body-joint-glow" cx="54" cy="70" r="3.5" />
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
