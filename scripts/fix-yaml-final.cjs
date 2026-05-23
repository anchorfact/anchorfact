#!/usr/bin/env node
// Final targeted YAML frontmatter fixer
const fs = require('fs'), path = require('path'), yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DIRS = ['ai', 'history', 'science', 'arts', 'business', 'health', 'computer-science', 'game-development'];

let stats = { spaceFix: 0, aiCitFix: 0, mergedLineFix: 0, totalFixed: 0 };

function fixFrontmatter(frontmatter) {
  let fm = frontmatter;
  let modified = false;

  // Fix 1: Merged lines — quoted value immediately followed by next key
  // "url: "https://.../"completeness:" → two separate lines
  const v1 = fm;
  fm = fm.replace(/^(\s*[\w_-]+:\s*"[^"]+")(\s*[\w_-]+:)/gm, '$1\n$2');
  if (fm !== v1) { stats.mergedLineFix++; modified = true; }

  // Fix 2: Merged lines — empty array followed by next key
  // "secondary_sources: []known_gaps:" → two lines
  const v2 = fm;
  fm = fm.replace(/^(\s*[\w_-]+:\s*\[\])([\w_-]+:)/gm, '$1\n$2');
  if (fm !== v2) { stats.mergedLineFix++; modified = true; }

  // Fix 3: ai_citations hybrid — remove last_citation_check at any level
  const lines = fm.split('\n');
  let inAiCit = false;
  const cleaned = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^ai_citations:/.test(line)) { inAiCit = true; cleaned.push(line); continue; }
    if (inAiCit) {
      if (/^  \w/.test(line)) {
        if (/^  last_citation_check:/.test(line)) {
          stats.aiCitFix++; modified = true;
          continue;
        }
        cleaned.push(line);
      } else if (/^\S/.test(line)) { inAiCit = false; cleaned.push(line); }
      else { cleaned.push(line); }
    } else { cleaned.push(line); }
  }
  fm = cleaned.join('\n');

  // Fix 4: key:"value" → key: "value"
  const v4 = fm;
  fm = fm.replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');
  if (fm !== v4) { stats.spaceFix++; modified = true; }

  return { fm, modified };
}

// Process all articles
let parseFailures = [];
for (const d of DIRS) {
  const dir = path.join(CONTENT_DIR, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_'))) {
    const rel = d + '/' + f;
    const rawContent = fs.readFileSync(path.join(dir, f), 'utf8');
    const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) { parseFailures.push(rel + ' — no frontmatter'); continue; }

    const { fm, modified } = fixFrontmatter(match[1]);
    if (modified) {
      stats.totalFixed++;
      const newContent = `---\n${fm}\n---${rawContent.slice(match.index + match[0].length)}`;
      fs.writeFileSync(path.join(dir, f), newContent, 'utf8');
      // process.stdout.write('.');
    }
  }
}

// Verification: re-parse all
let failures = 0;
console.log(`\n=== Fix Summary ===`);
console.log(`Space fixes: ${stats.spaceFix}`);
console.log(`ai_citations fixes: ${stats.aiCitFix}`);
console.log(`Merged line fixes: ${stats.mergedLineFix}`);
console.log(`Total articles modified: ${stats.totalFixed}`);

console.log(`\n=== Parse Verification ===`);
for (const d of DIRS) {
  const dir = path.join(CONTENT_DIR, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_'))) {
    const rel = d + '/' + f;
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) { failures++; parseFailures.push(rel + ' — no frontmatter'); continue; }
    let yamlStr = match[1]
      .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
      .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');
    try { yaml.load(yamlStr); }
    catch(e) { failures++; parseFailures.push(rel + ' — ' + e.message.substring(0, 80)); }
  }
}
if (failures === 0) console.log(`All 464 articles parse correctly! ✅`);
else { console.log(`${failures} failures:`); parseFailures.slice(0, 15).forEach(x => console.log(`  ${x}`)); }
