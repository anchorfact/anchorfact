/**
 * Clean bogus cross-domain secondary_sources
 * Removes tech-specific sources (MDN HTTP, ACM DL, BERT paper, Pro Git, etc.)
 * from non-technical domain articles where they don't belong.
 */
const fs = require('fs');
const path = require('path');

// ── Bogus detection patterns ──
// Each pattern has: re (regex to match source title), excludeDomains (keep these domains)
const BOGUS_PATTERNS = [
  // Group 1: Pure web/tech docs that don't belong in non-tech domains
  {
    re: /MDN Web Docs.*HTTP/i,
    label: 'MDN HTTP docs',
    exclude: ['ai', 'computer-science']
  },
  {
    re: /MDN Web Docs/i,
    label: 'MDN Web Docs (general)',
    exclude: ['ai', 'computer-science']
  },
  {
    re: /RESTful Web APIs/i,
    label: 'RESTful Web APIs book',
    exclude: ['ai', 'computer-science']
  },
  {
    re: /ACM Digital Library/i,
    label: 'ACM Digital Library placeholder',
    exclude: ['ai', 'computer-science']
  },
  {
    re: /IEEE Xplore/i,
    label: 'IEEE Xplore placeholder',
    exclude: ['ai', 'computer-science']
  },

  // Group 2: AI/ML specific papers
  {
    re: /BERT:\s*Pre-training/i,
    label: 'BERT paper',
    exclude: ['ai', 'computer-science', 'game-development']
  },
  {
    re: /Attention Is All You Need/i,
    label: 'Transformer paper',
    exclude: ['ai', 'computer-science', 'game-development']
  },
  {
    re: /GPT-4 Technical Report/i,
    label: 'GPT-4 paper',
    exclude: ['ai', 'computer-science', 'game-development']
  },
  {
    re: /GANs?\s*(in|:)/i,
    label: 'GAN paper',
    exclude: ['ai', 'computer-science', 'game-development']
  },

  // Group 3: Dev tools / programming books
  {
    re: /Pro Git[,\s]/i,
    label: 'Pro Git book',
    exclude: ['computer-science', 'game-development']
  },
  {
    re: /^Pro Git$/i,
    label: 'Pro Git book (exact)',
    exclude: ['computer-science', 'game-development']
  },
  {
    re: /Clean Code[:\s]/i,
    label: 'Clean Code book',
    exclude: ['computer-science', 'game-development']
  },
  {
    re: /Design Patterns.*(GoF|Gamma)/i,
    label: 'GoF Design Patterns',
    exclude: ['computer-science', 'game-development']
  },

  // Group 4: CS-specific papers/books that don't belong anywhere else
  {
    re: /The C Programming Language/i,
    label: 'K&R C book',
    exclude: ['computer-science']
  },
  {
    re: /Structure and Interpretation of Computer Programs/i,
    label: 'SICP book',
    exclude: ['computer-science']
  },
  {
    re: /Introduction to Algorithms/i,
    label: 'CLRS book',
    exclude: ['computer-science']
  },

  // Group 5: Generic/batch-generated placeholders
  {
    re: /arXiv preprint/i,
    label: 'arXiv placeholder',
    exclude: ['ai', 'computer-science', 'science']
  },
];

// Domains to always skip (never clean)
const PRESERVE_DOMAINS = [];

// Track domain from file path
function getDomain(filePath) {
  const rel = path.relative('content', filePath);
  return rel.split(path.sep)[0];
}

// Parse frontmatter (same logic as validate-content.cjs)
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return [null, null, 'No frontmatter'];

  let yamlStr = match[1]
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');

  // Dedup keys
  const seenKeys = new Set();
  const lines = yamlStr.split('\n');
  const deduped = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const km = lines[i].match(/^(\s*)([\w_-]+):/);
    if (km) {
      const k = km[1].length + ':' + km[2];
      if (seenKeys.has(k)) continue;
      seenKeys.add(k);
    }
    deduped.unshift(lines[i]);
  }
  yamlStr = deduped.join('\n');

  return [match, yamlStr, null];
}

// Check if a source is bogus for a given domain
function isBogus(source, domain) {
  const title = (typeof source === 'object' && source !== null)
    ? (source.title || '')
    : (typeof source === 'string' ? source : '');

  if (!title) return null;

  for (const pattern of BOGUS_PATTERNS) {
    if (pattern.re.test(title)) {
      if (!pattern.exclude.includes(domain)) {
        return pattern.label;
      }
    }
  }
  return null;
}

// Check if secondary_sources YAML block needs rewriting
// Returns [newBlock, removalCount] or null if no changes
function cleanSecondarySources(fmBlock, domain) {
  // Find the secondary_sources section
  const ssMatch = fmBlock.match(/^secondary_sources:\s*\n([\s\S]*?)(?=^\w+:|\Z)/m);
  if (!ssMatch) return null;

  const ssLines = ssMatch[0].split('\n');
  const prefix = ssLines[0]; // "secondary_sources:" line
  const restLines = ssLines.slice(1);

  // Parse individual sources
  let removed = 0;
  const keptLines = [];
  let currentEntry = [];

  for (let i = 0; i < restLines.length; i++) {
    const line = restLines[i];
    const isNewEntry = /^\s*-\s/.test(line);

    if (isNewEntry && currentEntry.length > 0) {
      // Process previous entry
      if (shouldKeepEntry(currentEntry, domain)) {
        keptLines.push(...currentEntry);
      } else {
        removed++;
      }
      currentEntry = [line];
    } else {
      currentEntry.push(line);
    }
  }

  // Process last entry
  if (currentEntry.length > 0) {
    if (shouldKeepEntry(currentEntry, domain)) {
      keptLines.push(...currentEntry);
    } else {
      removed++;
    }
  }

  if (removed === 0) return null;

  if (keptLines.length === 0) {
    // No entries left — keep the key with empty list
    keptLines.push('  []');
  }

  const newBlock = [prefix, ...keptLines].join('\n');
  const newFm = fmBlock.replace(ssMatch[0], newBlock);
  return [newFm, removed];
}

function shouldKeepEntry(lines, domain) {
  // Reconstruct title from the entry lines
  const fullText = lines.join(' ');
  const titleMatch = fullText.match(/title:\s*"?([^"]+)"?/i);
  if (!titleMatch) return true; // keep if can't determine

  const title = titleMatch[1].trim();
  for (const pattern of BOGUS_PATTERNS) {
    if (pattern.re.test(title) && !pattern.exclude.includes(domain)) {
      return false;
    }
  }
  return true;
}

// ── Main ──
function walkContent() {
  const contentDir = 'content';
  const domains = fs.readdirSync(contentDir).filter(d =>
    fs.statSync(path.join(contentDir, d)).isDirectory() && !d.startsWith('_')
  );

  let totalFiles = 0;
  let cleaned = 0;
  let totalRemovals = 0;
  const byDomain = {};

  for (const domain of domains) {
    const dir = path.join(contentDir, domain);
    if (!byDomain[domain]) byDomain[domain] = { files: 0, cleaned: 0, removals: 0 };

    const files = fs.readdirSync(dir).filter(f =>
      f.endsWith('.md') && !f.startsWith('_')
    );

    for (const file of files) {
      const fp = path.join(dir, file);
      const raw = fs.readFileSync(fp, 'utf8');
      totalFiles++;

      // Parse frontmatter
      const [match] = parseFrontmatter(raw);
      if (!match) continue;

      const fmBlock = match[0];
      const result = cleanSecondarySources(fmBlock, domain);

      if (result) {
        const [newBlock, removed] = result;
        let newContent = raw.replace(fmBlock, newBlock);
        // Fix: if we replaced with secondary_sources:  [] (empty), make sure format is valid
        newContent = newContent.replace(/secondary_sources:\s*\n\s*\[\]/, 'secondary_sources: []');
        fs.writeFileSync(fp, newContent, 'utf8');
        cleaned++;
        totalRemovals += removed;
        byDomain[domain].cleaned++;
        byDomain[domain].removals += removed;
        console.log(`  [${domain}] ${file}: removed ${removed} bogus source(s)`);
      }
      byDomain[domain].files++;
    }
  }

  // Summary
  console.log('\n=== CLEANUP SUMMARY ===');
  console.log(`Total files scanned: ${totalFiles}`);
  console.log(`Files cleaned:      ${cleaned} (${(cleaned / totalFiles * 100).toFixed(1)}%)`);
  console.log(`Total removals:     ${totalRemovals}`);
  console.log('');
  for (const d of Object.keys(byDomain).sort()) {
    const s = byDomain[d];
    if (s.cleaned > 0) {
      console.log(`  ${d.padEnd(20)} files=${s.files.toString().padStart(3)}  cleaned=${s.cleaned.toString().padStart(3)}  removed=${s.removals.toString().padStart(3)}`);
    }
  }
}

walkContent();
