#!/usr/bin/env node
// Fill missing institution fields in source entries from URL hostnames

const fs = require('fs'), path = require('path'), yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DIRS = ['ai', 'history', 'science', 'arts', 'business', 'health', 'computer-science', 'game-development'];
const DRY_RUN = process.argv.includes('--dry-run');

const INST_MAP = {
  'arxiv.org': 'arXiv',
  'github.com': 'GitHub',
  'developer.mozilla.org': 'Mozilla',
  'deeplearningbook.org': 'MIT Press',
  'oreilly.com': "O'Reilly Media",
  'manning.com': 'Manning Publications',
  'apress.com': 'Apress',
  'springer.com': 'Springer',
  'nature.com': 'Nature Publishing',
  'science.org': 'Science/AAAS',
  'ieee.org': 'IEEE',
  'acm.org': 'ACM',
  'nvidia.com': 'NVIDIA',
  'openai.com': 'OpenAI',
  'deepmind.google': 'Google DeepMind',
  'ai.google': 'Google AI',
  'research.google': 'Google Research',
  'googleblog.com': 'Google',
  'anthropic.com': 'Anthropic',
  'meta.com': 'Meta',
  'microsoft.com': 'Microsoft',
  'apple.com': 'Apple',
  'unity.com': 'Unity Technologies',
  'unrealengine.com': 'Epic Games',
  'godotengine.org': 'Godot Foundation',
  'git-scm.com': 'Git Project',
  'docker.com': 'Docker Inc.',
  'kubernetes.io': 'CNCF',
  'react.dev': 'Meta',
  'vuejs.org': 'Vue.js Community',
  'svelte.dev': 'Svelte Contributors',
  'python.org': 'Python Software Foundation',
  'rust-lang.org': 'Rust Foundation',
  'golang.org': 'Google',
  'nodejs.org': 'OpenJS Foundation',
  'postgresql.org': 'PostgreSQL Global Development Group',
  'mongodb.com': 'MongoDB Inc.',
  'redis.io': 'Redis Ltd.',
  'elastic.co': 'Elastic',
  'stanford.edu': 'Stanford University',
  'mit.edu': 'MIT',
  'berkeley.edu': 'UC Berkeley',
  'harvard.edu': 'Harvard University',
  'cmu.edu': 'Carnegie Mellon University',
  'ox.ac.uk': 'University of Oxford',
  'cam.ac.uk': 'University of Cambridge',
  'princeton.edu': 'Princeton University',
  'nyu.edu': 'New York University',
  'toronto.edu': 'University of Toronto',
  'projectgutenberg.org': 'Project Gutenberg',
  'britannica.com': 'Encyclopaedia Britannica',
  'jstor.org': 'JSTOR',
  'nasa.gov': 'NASA',
  'esa.int': 'ESA',
  'noaa.gov': 'NOAA',
  'cdc.gov': 'CDC',
  'nih.gov': 'NIH',
  'who.int': 'WHO',
  'worldbank.org': 'World Bank',
  'imf.org': 'IMF',
  'un.org': 'United Nations',
  'nobelprize.org': 'Nobel Foundation',
  'loc.gov': 'Library of Congress',
  'si.edu': 'Smithsonian Institution',
  'metmuseum.org': 'Metropolitan Museum of Art',
  'wwnorton.com': 'W.W. Norton',
  'penguinrandomhouse.com': 'Penguin Random House',
  'harpercollins.com': 'HarperCollins',
  'simonandschuster.com': 'Simon & Schuster',
};

function infer(url) {
  if (!url) return null;
  try {
    let hostname = new URL(url).hostname.replace(/^www\./, '');
    if (INST_MAP[hostname]) return INST_MAP[hostname];
    for (const [d, inst] of Object.entries(INST_MAP)) {
      if (hostname.endsWith('.' + d)) return inst;
    }
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const org = parts[parts.length - 2];
      return org.charAt(0).toUpperCase() + org.slice(1);
    }
    return null;
  } catch(e) { return null; }
}

let stats = { total: 0, fixed: 0, filled: 0 };

for (const d of DIRS) {
  const dir = path.join(CONTENT_DIR, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_'))) {
    stats.total++;
    const rel = d + '/' + f;
    let rawContent = fs.readFileSync(path.join(dir, f), 'utf8');
    let modified = false;
    
    // Smart injection: find URL lines, check if institution already exists within 
    // the same source entry (within 6 lines after URL), inject if missing.
    const lines = rawContent.split('\n');
    const newLines = [];
    let pendingInst = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const urlMatch = line.match(/^    url: "(https?:[^"]+)"/);
      
      if (urlMatch && pendingInst === null) {
        const inst = infer(urlMatch[1]);
        if (inst) {
          // Look ahead up to 6 lines for an existing institution:
          let hasInst = false;
          for (let j = 1; j <= 6 && i + j < lines.length; j++) {
            if (/^    institution:/.test(lines[i + j])) { hasInst = true; break; }
            if (/^  - |^\S/.test(lines[i + j])) break; // end of entry
          }
          if (!hasInst) {
            pendingInst = inst;
          }
        }
      }
      
      newLines.push(line);
      
      // If we have a pending institution and the next line is NOT indented content
      if (pendingInst && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const isIndented = /^    \w/.test(nextLine);
        const isNextSourceEntry = /^  - /.test(nextLine);
        const isNextSection = /^\S/.test(nextLine);
        
        if (isNextSection || isNextSourceEntry || (!isIndented && nextLine.trim() === '')) {
          newLines.push(`    institution: "${pendingInst}"`);
          stats.filled++;
          modified = true;
          pendingInst = null;
        }
      }
    }
    // Flush any remaining
    if (pendingInst) {
      newLines.push(`    institution: "${pendingInst}"`);
      stats.filled++;
      modified = true;
    }
    
    const result = newLines.join('\n');
    
    if (modified && !DRY_RUN) {
      fs.writeFileSync(path.join(dir, f), result, 'utf8');
    }
    
    if (modified) stats.fixed++;
  }
}

console.log(`\n=== Institution Injection Summary ===`);
console.log(`Articles scanned: ${stats.total}`);
console.log(`Articles modified: ${stats.fixed}`);
console.log(`Institution fields filled: ${stats.filled}`);
if (DRY_RUN) console.log(`(DRY RUN — no changes written)`);
