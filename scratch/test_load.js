const fs = require('fs');
const path = require('path');

// Mock a global browser window & document environment
global.window = global;
global.document = {
  addEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: () => null,
  createElement: () => ({ style: {}, setAttribute: () => {} }),
  head: { appendChild: () => {} }
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.navigator = {
  userAgent: 'node'
};

try {
  // Load main.js to see if it executes without syntax/runtime errors at root level
  require('../assets/js/main.js');
  console.log('✅ main.js parsed and executed root-level code successfully!');
} catch (e) {
  console.error('❌ main.js failed to execute root-level code:');
  console.error(e);
}
