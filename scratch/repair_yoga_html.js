const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'yoga.html');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match each article class="card..." block
  // We can locate each card block and rewrite its header structure
  // Let's do a replace based on cards
  
  // Find all cards by matching: <article class="card reveal" ...>
  // We want to capture the article start, the image, the button, and the card__body start.
  // Example card block:
  // <article class="card reveal" data-category="strength" style="animation-delay:0.2s;" aria-label="Power Vinyasa class - Premium">
  //   <img src="assets/images/yoga.png" alt="Power Vinyasa Flow" loading="lazy" style="filter: brightness(0.7);" />
  //   ...
  //   <button class="card__play-overlay" ...>...</button>
  // </article>
  
  // Let's rewrite the card block replacement to be extremely clean.
  // We match:
  // <article class="card reveal" (attrs1)>
  // (possibly whitespace)
  // (possibly <div class="card__media">)
  // <img (attrs2) />
  // (possibly whitespace)
  // <button (attrs3)>...</button>
  // </div> (if it was there, or maybe not)
  // <div class="card__body">
  
  const cardRegex = /(<article class="card[^>]*?>)[\s\S]*?(<img[^>]*?>)[\s\S]*?(<button[\s\S]*?<\/button>)[\s\S]*?(<div class="card__body">)/g;

  let count = 0;
  content = content.replace(cardRegex, (match, articleTag, imgTag, buttonTag, bodyTag) => {
    count++;
    // Clean up img style filter: brightness(0.7) if present
    let cleanImg = imgTag.replace(/style="filter:\s*brightness\([^)]+\);"/g, '');
    
    // Construct a perfectly structured card media header
    return `${articleTag}
          <div class="card__media">
            ${cleanImg}
            ${buttonTag}
          </div>
          ${bodyTag}`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Reparados ${count} cards em yoga.html`);
} else {
  console.log('yoga.html não encontrado.');
}
