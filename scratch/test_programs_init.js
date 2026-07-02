const fs = require('fs');
const path = require('path');

// 1. Read programs.html and main.js contents
const html = fs.readFileSync(path.join(__dirname, '../programs.html'), 'utf8');

// 2. Extract reveal cards and their titles from programs.html
const cardRegex = /<div class="reveal"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g;
const cardsData = [];
let match;

// We will parse headings using a simpler regex inside each match
const headingRegex = /<h2 class="heading-lg"[^>]*>(.*?)<\/h2>/;
const badgeRegex = /<span class="label-sm text-muted">(.*?)<\/span>/;
const buttonRegex = /<a href="subscription.html[^>]*>([\s\S]*?)<\/a>/;

// Let's build a mock list of element objects representing cards
const cards = [];
let htmlIndex = 0;

// Simple regex matching to find h2, span, and button
const cardBlocks = html.split('<!-- PROGRAM');
// Skip index 0 (which is before the first program)
for (let i = 1; i < cardBlocks.length; i++) {
  const block = cardBlocks[i];
  const h2Match = block.match(/<h2 class="heading-lg"[^>]*>(.*?)<\/h2>/);
  if (h2Match) {
    const title = h2Match[1].trim();
    const daysMatch = block.match(/(\d+)\s*dias|(\d+)\s*days/i);
    const totalDays = daysMatch ? (daysMatch[1] || daysMatch[2]) : '7';
    
    // Create mock card element
    const mockCard = {
      textContent: block,
      querySelector: (selector) => {
        if (selector === 'h2') {
          return { textContent: title };
        }
        if (selector === 'a[href*="subscription.html"], .btn') {
          return {
            id: '',
            className: 'btn btn--gold',
            removeAttribute: () => {},
            setAttribute: () => {},
            style: {},
            parentElement: {
              insertBefore: (newChild, refChild) => {
                mockCard.injectedChildren.push(newChild);
              }
            }
          };
        }
        if (selector === '.program-progress-grid') {
          return null;
        }
        return null;
      },
      querySelectorAll: (selector) => {
        return [];
      },
      appendChild: (child) => {
        mockCard.injectedChildren.push(child);
      },
      injectedChildren: []
    };
    cards.push(mockCard);
  }
}

console.log(`Parsed ${cards.length} mock cards from programs.html.`);

// 3. Define the main.js variables & functions we want to test
global.window = global;
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.document = {
  head: { appendChild: () => {} },
  addEventListener: () => {},
  querySelector: () => null,
  getElementById: (id) => {
    if (id === 'programsGrid') {
      return {
        querySelectorAll: (selector) => {
          if (selector === '.reveal') return cards;
          return [];
        }
      };
    }
    return null;
  },
  querySelectorAll: (selector) => {
    return [];
  },
  createElement: (tag) => {
    return {
      className: '',
      setAttribute: () => {},
      style: {},
      appendChild: () => {},
      addEventListener: () => {},
      onmouseenter: () => {},
      onmouseleave: () => {},
      innerHTML: ''
    };
  }
};

// Define helpers from main.js
function getProgramId(title) {
  return title.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

global.getProgramId = getProgramId;
global.renderGrid = (grid, programId, totalDays, prefix, currentProgress) => {
  console.log(`   -> renderGrid called for programId: ${programId}, totalDays: ${totalDays}, prefix: ${prefix}`);
};
global.unlockAllPageElements = () => {};
global.removeHomeLinkOnDesktop = () => {};
global.fixLinksDynamically = () => {};

// 4. Load the initProgramProgress function from assets/js/main.js
const mainJsContent = fs.readFileSync(path.join(__dirname, '../assets/js/main.js'), 'utf8');

// We can eval the mainJsContent in this context
eval(mainJsContent);

console.log('Running initProgramProgress()...');
try {
  initProgramProgress();
  console.log('✅ initProgramProgress ran successfully!');
  cards.forEach((c, idx) => {
    const title = c.querySelector('h2').textContent;
    console.log(`Card ${idx + 1}: "${title}"`);
    console.log(`   Injected children:`, c.injectedChildren.map(child => ({
      className: child.className,
      style: child.style
    })));
  });
} catch (e) {
  console.error('❌ initProgramProgress failed:', e);
}
