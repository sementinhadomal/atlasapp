const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('programs.html', 'utf8');
const startMarker = '<div style="display: flex; flex-direction: column; gap: var(--space-2xl);" id="programsGrid">';
const endMarker = '<!-- FOOTER -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

const programsSection = content.substring(startIndex + startMarker.length, endIndex);

const parts = programsSection.split('<!-- PROGRAM ');
if (parts.length > 0) {
  const lastPart = parts[parts.length - 1];
  const closeMatch = lastPart.match(/<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i);
  if (closeMatch) {
    const cleanLastPart = lastPart.substring(0, closeMatch.index + 6);
    console.log('Cleaned last part tail:');
    console.log(cleanLastPart.substring(cleanLastPart.length - 150));
  } else {
    console.log('Close match not found!');
  }
}
