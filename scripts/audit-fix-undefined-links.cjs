// Audit Fix: Remove [undefined](undefined) broken markdown links
const fs = require('fs'), p = require('path');
const ROOT = p.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

function getAllFiles() {
  const files = [];
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = p.join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith('_')) walk(fp);
      else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) files.push(fp);
    }
  }
  walk(p.join(ROOT, 'content'));
  return files;
}

console.log('Audit: Fix [undefined](undefined) broken markdown links');
if (DRY_RUN) console.log('(DRY RUN)');

let fixed = 0, total = 0;
const files = getAllFiles();

for (const fp of files) {
  const raw = fs.readFileSync(fp, 'utf8');
  
  // Pattern 1: [undefined](undefined) — completely broken
  let modified = raw.replace(/\[undefined\]\(undefined\)\s*/g, '');
  
  // Pattern 2: empty link []() — empty link text with empty URL
  modified = modified.replace(/\[\]\(\)\s*/g, '');

  if (modified !== raw) {
    total++;
    if (!DRY_RUN) {
      fs.writeFileSync(fp, modified, 'utf8');
      fixed++;
    } else {
      fixed++;
    }
  }
}

console.log('Fixed: ' + fixed + '/' + files.length + ' files');
if (DRY_RUN) console.log('(DRY RUN)');
