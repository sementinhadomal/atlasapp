const fs = require('fs');
const html = fs.readFileSync('programs.html', 'utf8');

// Find all matches of class="reveal" or class="... reveal ..."
const regex = /class="[^"]*reveal[^"]*"/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  count++;
  // print surrounding text (first 100 characters after match)
  const index = match.index;
  const snippet = html.substring(index, index + 250);
  console.log(`Match ${count} at index ${index}:`);
  console.log(snippet.trim());
  console.log('----------------------------------------------------');
}
