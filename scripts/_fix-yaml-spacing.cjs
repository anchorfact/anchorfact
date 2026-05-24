#!/usr/bin/env node
// Fix YAML: add space after "id:" and "title:" where missing
const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('_')) walk(p);
    else if (entry.name.endsWith('.md')) {
      const content = fs.readFileSync(p, 'utf-8');
      let changed = false;
      // Fix all YAML lines with missing space after colon
      // Pattern: key:value (no space) → key: value
      let fixed = content.replace(/^([ \w_-]+):([^\s"])/gm, '$1: $2');
      fixed = fixed.replace(/^([ \w_-]+):(")/gm, '$1: $2');
      if (fixed !== content) changed = true;
      if (changed) {
        fs.writeFileSync(p, fixed, 'utf-8');
        console.log('FIXED:', path.relative(process.cwd(), p));
      }
    }
  }
}

walk(path.join(__dirname, '..', 'content'));
console.log('DONE');
