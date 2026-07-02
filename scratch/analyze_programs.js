const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'programs.html');
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Let's find every block with class="reveal" and print its title (heading-lg) and duration
  const blocks = content.split(/class="reveal"/g);
  console.log(`Encontrados ${blocks.length - 1} blocos de programa.`);

  blocks.forEach((block, idx) => {
    if (idx === 0) return; // skip header
    const titleMatch = block.match(/<h2 class="heading-lg"[^>]*?>([\s\S]*?)<\/h2>/);
    const durationMatch = block.match(/<span class="label-sm text-muted">([\s\S]*?)<\/span>/) || block.match(/<span class="label-sm text-muted">([\s\S]*?)<\/span>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Sem título';
    const duration = durationMatch ? durationMatch[1].trim() : 'Sem duração';
    
    // Find button inside the block
    const buttonMatch = block.match(/<(button|a)[^>]*?class="[^"]*?btn[^"]*?"[^>]*?>([\s\S]*?)<\/\1>/i) || block.match(/class="btn[^"]*?"[^>]*?>([\s\S]*?)<\/(button|a)>/i);
    const buttonText = buttonMatch ? buttonMatch[0] : 'Sem botão';

    console.log(`Programa ${idx}: Title: "${title}" | Duration: "${duration}" | Button text snippet: "${buttonText.substring(0, 120)}"`);
  });
} else {
  console.log('programs.html não encontrado.');
}
