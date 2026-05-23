#!/usr/bin/env node
// Remove cross-domain source pollution (RAG paper in non-AI articles)
const fs = require('fs'), path = require('path');

const POLLUTED = [
  'history/pyramids-of-giza.md',
  'history/samurai-history.md',
  'science/animal-behavior.md',
  'science/climate-change.md',
  'science/ocean-life.md',
  'science/renewable-energy.md',
  'arts/ancient-greek-literature.md',
  'arts/jazz-music.md',
  'arts/shakespeare-s-works.md',
  'arts/theater-history.md',
  'business/stock-market-basics.md',
  'computer-science/indexeddb.md',
  'computer-science/navigator-api.md',
  'computer-science/vite.md',
  'computer-science/web-storage-api.md',
  'computer-science/webgl.md',
  'game-development/save-systems-design.md',
];

let cleaned = 0;
const BASE = path.join(__dirname, '..', 'content');

for (const rel of POLLUTED) {
  const fp = path.join(BASE, rel);
  let content = fs.readFileSync(fp, 'utf8');

  // Remove the bogus source entry by finding the "Retrieval-Augmented" line
  // and removing from the "  - title:" line up to (but not including) the next "  - " or non-indented line
  const lines = content.split('\n');
  const newLines = [];
  let skipMode = false;
  
  for (const line of lines) {
    if (line.includes('Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks')) {
      skipMode = true;
      // Remove the preceding "  - title:" line too (go back 1)
      if (newLines.length > 0 && newLines[newLines.length - 1].trim().startsWith('- title:')) {
        newLines.pop();
      }
      continue;
    }
    if (skipMode) {
      // Skip all indented content until next list item or blank line + next section
      if (/^  - /.test(line) || /^\S/.test(line)) {
        skipMode = false;
        newLines.push(line);
      }
      // Otherwise skip
    } else {
      newLines.push(line);
    }
  }
  
  content = newLines.join('\n');
  
  const before = fs.readFileSync(fp, 'utf8');
  if (content !== before) {
    fs.writeFileSync(fp, content, 'utf8');
    cleaned++;
    console.log(`  Cleaned: ${rel}`);
  } else {
    console.log(`  SKIP: ${rel}`);
  }
}

console.log(`\nCleaned ${cleaned}/${POLLUTED.length} articles`);
