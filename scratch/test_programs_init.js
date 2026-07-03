const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const jsContent = fs.readFileSync(path.join(projectDir, 'assets/js/main.js'), 'utf8');

// Lightweight browser environment mock
const mockDocument = {
  getElementById: (id) => {
    console.log(`[Mock DOM] getElementById called for: ${id}`);
    if (id === 'toastContainer' || id === 'videoModal') {
      return {
        appendChild: () => {},
        classList: { add: (cls) => console.log(`[Mock DOM] Added class "${cls}" to modal`) },
        style: {}
      };
    }
    return {
      parentElement: {
        insertBefore: (grid, sibling) => console.log(`[Mock DOM] Inserted grid before actions container`),
        querySelectorAll: () => []
      }
    };
  },
  querySelectorAll: (selector) => {
    console.log(`[Mock DOM] querySelectorAll called for: ${selector}`);
    if (selector === '.reveal') {
      return [
        {
          textContent: "Core Reset 7 Days",
          querySelector: (sel) => {
            if (sel === 'h2') return { textContent: "Core Reset" };
            return null;
          },
          appendChild: () => {}
        },
        {
          textContent: "Body Sculptor 14 Days",
          querySelector: (sel) => {
            if (sel === 'h2') return { textContent: "Body Sculptor" };
            return null;
          },
          appendChild: () => {}
        }
      ];
    }
    return [];
  },
  createElement: (tag) => {
    return {
      style: {},
      setAttribute: (k, v) => console.log(`[Mock DOM] Created element attr: ${k} = ${v}`),
      appendChild: () => {},
      addEventListener: () => {}
    };
  },
  addEventListener: () => {}
};

global.window = {
  location: { href: '' },
  showToast: (msg) => console.log(`[Mock Toast] ${msg}`),
  addEventListener: () => {}
};
global.document = mockDocument;
global.localStorage = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null
};

// Evaluate the javascript file
try {
  eval(jsContent);
  console.log("main.js evaluated successfully.");

  // Test generateWorkoutMix
  if (typeof window.generateWorkoutMix === 'function') {
    const mix = window.generateWorkoutMix('body-sculptor', 'Body Sculptor', 1, 35);
    console.log("generateWorkoutMix ran successfully! Exercise count:", mix.exercises.length);
    console.log("First exercise duration:", mix.exercises[0].duration, "seconds");
  } else {
    console.error("generateWorkoutMix is not defined!");
  }

  // Test startProgram
  if (typeof window.startProgram === 'function') {
    window.startProgram('Body Sculptor', 14);
    console.log("startProgram('Body Sculptor', 14) completed successfully!");
  } else {
    console.error("startProgram is not defined!");
  }
} catch (err) {
  console.error("Test failed with error:", err.stack);
}
