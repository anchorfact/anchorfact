// Phase 4 Final Fix: rebuild remaining 2 AI files + inject atomic_facts into game-dev
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

// ─── 1. Rebuild 2 remaining AI files with clean YAML ───
const AI2_FIX = [
  { file: 'ai/gradient-descent.md', key: 'gradient-descent' },
  { file: 'ai/tokenization-in-nlp.md', key: 'tokenization-in-nlp' },
];

for (const { file } of AI2_FIX) {
  const fp = p.join(ROOT, 'content', file);
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let fm;
  try { fm = y.load(m[1]); } catch {}
  if (!fm) continue;

  const body = raw.substring(m.index + m[0].length);
  const newFM = y.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"', forceQuotes: false });
  const newContent = '---\n' + newFM + '---\n' + body;

  if (!DRY_RUN) {
    fs.writeFileSync(fp, newContent, 'utf8');
    console.log(`  Rebuilt YAML: ${file}`);
  }
}

// ─── 2. Inject atomic_facts into game-development D-grade cluster ───
// These files have Chinese TL;DR/Core Explanation — extract from body
function extractFactsChinese(body) {
  const facts = [];
  // Try English headers first
  let tldrMatch = body.match(/^##\s*TL;DR\s*\n+(.+?)(?=\n##|\n$)/s);
  if (!tldrMatch) {
    // Try without any header — first paragraph
    const lines = body.trim().split('\n');
    let firstPara = '';
    for (const l of lines) {
      if (l.startsWith('#') && firstPara.length > 0) break;
      if (l.trim()) firstPara += l.trim() + ' ';
    }
    if (firstPara.length > 40) facts.push(firstPara.substring(0, 400));
  } else {
    facts.push(tldrMatch[1].replace(/\n/g, ' ').trim().substring(0, 400));
  }

  // Core Explanation
  let coreMatch = body.match(/^##\s*Core\s+Explanation\s*\n+(.+?)(?=\n##|\n$)/s);
  if (coreMatch) {
    const text = coreMatch[1].replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    const sentences = text.split(/(?<=[。.!?])\s*/);
    for (const s of sentences) {
      if (facts.length >= 5) break;
      const clean = s.trim();
      if (clean.length > 30 && clean.length < 400) facts.push(clean);
    }
  }

  // Fallback: extract key sentences from body
  if (facts.length < 2) {
    const allSentences = body.replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').split(/(?<=[。.!?])\s*/);
    for (const s of allSentences) {
      if (facts.length >= 5) break;
      const clean = s.trim();
      if (clean.length > 40 && clean.length < 400 && !clean.startsWith('#') && !clean.startsWith('- [')) {
        facts.push(clean);
      }
    }
  }
  return facts.slice(0, 5);
}

function matchSource(fact, sources) {
  const words = new Set(fact.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff\s]/g, ' ').split(/\s+/).filter(w => w.length > 1));
  let best = sources[0], bestScore = 0;
  for (const src of sources) {
    if (!src || !src.title) continue;
    const sw = new Set(src.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff\s]/g, ' ').split(/\s+/).filter(w => w.length > 1));
    let overlap = 0;
    for (const w of words) { if (sw.has(w)) overlap++; }
    if (overlap > bestScore) { bestScore = overlap; best = src; }
  }
  return best || sources[0];
}

// Inject atomic_facts into all game-dev D-grade (65p) articles
const gdDir = p.join(ROOT, 'content', 'game-development');
const files = fs.readdirSync(gdDir).filter(f => f.endsWith('.md') && f !== '_index.md');

let injected = 0;
for (const f of files) {
  const fp = p.join(gdDir, f);
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let fm;
  try { fm = y.load(m[1]); } catch { continue; }
  if (!fm) continue;

  const existingAF = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(af => af && af.statement) : [];
  if (existingAF.length >= 2) continue; // Already has enough

  const body = raw.substring(m.index + m[0].length);
  const facts = extractFactsChinese(body);
  if (facts.length === 0) continue;

  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources.filter(s => s && typeof s === 'object') : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources.filter(s => s && typeof s === 'object') : []),
    ...(Array.isArray(fm.ai_citations) ? fm.ai_citations.filter(s => s && typeof s === 'object') : []),
  ];

  const newAF = [...existingAF];
  for (const fact of facts) {
    if (newAF.length >= 5) break;
    const src = matchSource(fact, allSources);
    const af = {
      id: `fact-gd-${String(newAF.length + 1).padStart(3, '0')}`,
      statement: fact.substring(0, 350),
      confidence: 'medium',
    };
    if (src && src.url) af.source_url = src.url;
    if (src && src.doi) af.source_doi = src.doi;
    if (src && src.title) af.source_title = src.title;
    newAF.push(af);
  }

  if (newAF.length > existingAF.length) {
    fm.atomic_facts = newAF;
    const newFM = y.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"', forceQuotes: false });
    const newContent = '---\n' + newFM + '---\n' + body;
    if (!DRY_RUN) fs.writeFileSync(fp, newContent, 'utf8');
    console.log(`  AF_${newAF.length - existingAF.length}: game-development/${f}`);
    injected++;
  }
}

console.log(`\n=== Phase 4 Final Fix ===`);
console.log(`  GD articles injected with AF: ${injected}`);
if (DRY_RUN) console.log('  (DRY RUN)');
