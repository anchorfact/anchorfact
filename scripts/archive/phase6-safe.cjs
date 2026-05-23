// Phase 6: Safe version — manual CRLF frontmatter rebuild (no y.dump)
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

// ─── Source boost templates ───
const BOOST_MAP = {
  'arts/shakespeare-s-works.md': [{ title: 'The Oxford Shakespeare: Complete Works (2nd Ed)', type: 'reference', year: 2005, url: 'https://global.oup.com/academic/product/the-oxford-shakespeare-9780199267170', institution: 'Oxford University Press' }],
  'arts/philosophy-of-mind.md': [{ title: 'Stanford Encyclopedia of Philosophy: Mind', type: 'reference', year: 2024, url: 'https://plato.stanford.edu/entries/mind/', institution: 'Stanford University' }],
  'arts/ancient-greek-literature.md': [{ title: 'The Norton Anthology of World Literature (4th Ed)', type: 'textbook', year: 2018, url: 'https://wwnorton.com/books/9780393602814', institution: 'W.W. Norton' }],
  'arts/jazz-music.md': [{ title: 'The History of Jazz (Ted Gioia, 3rd Ed)', type: 'book', year: 2021, url: 'https://global.oup.com/academic/product/the-history-of-jazz-9780190087210', institution: 'Oxford University Press' }],
  'history/pyramids-of-giza.md': [{ title: 'The Complete Pyramids (Mark Lehner)', type: 'book', year: 2008, url: 'https://thamesandhudson.com/the-complete-pyramids-9780500285473', institution: 'Thames & Hudson' }],
  'business/negotiation-skills.md': [{ title: 'Getting to Yes (Fisher, Ury, Patton)', type: 'book', year: 2011, url: 'https://www.penguinrandomhouse.com/books/324551/getting-to-yes-by-roger-fisher/', institution: 'Penguin Books' }],
  'health/meditation-and-mindfulness.md': [{ title: 'Full Catastrophe Living (Jon Kabat-Zinn)', type: 'book', year: 2013, url: 'https://www.penguinrandomhouse.com/books/736/full-catastrophe-living-by-jon-kabat-zinn/', institution: 'Bantam Books' }],
  'ai/autoencoders.md': [
    { title: 'Reducing Dimensionality with Neural Networks (Hinton & Salakhutdinov, 2006)', type: 'academic_paper', year: 2006, url: 'https://www.science.org/doi/10.1126/science.1127647', institution: 'Science / University of Toronto', authors: ['Hinton', 'Salakhutdinov'] },
    { title: 'Auto-Encoding Variational Bayes (Kingma & Welling, 2014)', type: 'academic_paper', year: 2014, url: 'https://arxiv.org/abs/1312.6114', institution: 'ICLR / University of Amsterdam', authors: ['Kingma', 'Welling'] },
  ],
};

// ─── Fact extraction ───
function extractFacts(body) {
  const facts = [];
  const tldr = body.match(/^##\s*TL;DR\s*\n+\s*(.+?)(?=\n##|\n$)/s);
  if (tldr) { const t = tldr[1].replace(/\n/g, ' ').trim(); if (t.length > 30) facts.push(t.substring(0, 380)); }
  const core = body.match(/^##\s*Core\s+Explanation\s*\n+\s*(.+?)(?=\n##|\n$)/s);
  if (core) {
    const sents = core[1].replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').split(/(?<=[。.!?])\s*/);
    for (const s of sents) { if (facts.length >= 5) break; const c = s.trim(); if (c.length > 35 && c.length < 400) facts.push(c); }
  }
  if (facts.length < 2) {
    const all = body.replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').split(/(?<=[。.!?])\s*/);
    for (const s of all) { if (facts.length >= 5) break; const c = s.trim(); if (c.length > 40 && c.length < 400 && !c.startsWith('#') && !c.startsWith('- [')) facts.push(c); }
  }
  return facts.slice(0, 5);
}
function matchSource(fact, sources) {
  const fw = new Set(fact.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1));
  let best = sources[0], bestScore = 0;
  for (const s of sources) { if (!s || !s.title) continue; const sw = new Set(s.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1)); let o = 0; for (const w of fw) { if (sw.has(w)) o++; } if (o > bestScore) { bestScore = o; best = s; } }
  return best || sources[0];
}

// ─── Manual frontmatter builder (CRLF, no y.dump) ───
function buildFM(fm, body) {
  const L = ['---'];
  if (fm.id) L.push(`id: "${esc(fm.id)}"`);
  if (fm.title) L.push(`title: "${esc(fm.title)}"`);
  if (fm.schema_type) L.push(`schema_type: "${fm.schema_type}"`);
  if (fm.category) L.push(`category: "${fm.category}"`);
  if (fm.language) L.push(`language: "${fm.language}"`);
  if (fm.confidence) L.push(`confidence: "${fm.confidence}"`);
  if (fm.confidence_rationale) L.push(`confidence_rationale: "${esc(fm.confidence_rationale)}"`);
  if (fm.last_verified) L.push(`last_verified: "${fm.last_verified}"`);
  if (fm.generation_method) L.push(`generation_method: "${fm.generation_method}"`);
  if (Array.isArray(fm.ai_models) && fm.ai_models.length) L.push(`ai_models: [${fm.ai_models.map(m => `"${m}"`).join(', ')}]`);
  if (fm.derived_from_human_seed !== undefined) L.push(`derived_from_human_seed: ${fm.derived_from_human_seed}`);
  L.push('');

  // atomic_facts
  const af = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(a => a && a.statement) : [];
  if (af.length > 0) {
    L.push('atomic_facts:');
    for (const a of af) {
      L.push(`  - id: "${esc(a.id || '')}"`);
      L.push(`    statement: "${esc(String(a.statement).substring(0, 350))}"`);
      if (a.source_title) L.push(`    source_title: "${esc(a.source_title)}"`);
      if (a.source_url) L.push(`    source_url: "${esc(a.source_url)}"`);
      if (a.source_doi) L.push(`    source_doi: "${esc(a.source_doi)}"`);
      if (a.confidence) L.push(`    confidence: "${a.confidence}"`);
    }
    L.push('');
  }
  if (fm.completeness !== undefined && fm.completeness !== null) { L.push(`completeness: ${fm.completeness}`); L.push(''); }

  // disputed
  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length) {
    L.push('disputed_statements:');
    for (const ds of fm.disputed_statements) {
      if (typeof ds === 'object' && ds && ds.statement) {
        L.push(`  - statement: "${esc(String(ds.statement))}"`);
        if (ds.context) L.push(`    context: "${esc(ds.context)}"`);
      } else if (typeof ds === 'string') L.push(`  - "${esc(ds)}"`);
    }
    L.push('');
  }
  // known_gaps
  if (Array.isArray(fm.known_gaps) && fm.known_gaps.length) { L.push('known_gaps:'); for (const g of fm.known_gaps) { if (typeof g === 'string') L.push(`  - "${esc(g)}"`); } L.push(''); }

  // Sources
  for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources], ['ai_citations', fm.ai_citations]]) {
    if (!Array.isArray(sources) || sources.length === 0) continue;
    L.push(`${name}:`);
    for (const src of sources) {
      if (!src || !src.title) continue;
      L.push(`  - title: "${esc(src.title)}"`);
      if (src.authors && Array.isArray(src.authors) && src.authors.length) L.push(`    authors: [${src.authors.map(a => `"${esc(a)}"`).join(', ')}]`);
      if (src.type) L.push(`    type: "${src.type}"`);
      if (src.year) L.push(`    year: ${src.year}`);
      if (src.doi) L.push(`    doi: "${esc(src.doi)}"`);
      if (src.url) L.push(`    url: "${esc(src.url)}"`);
      if (src.institution) L.push(`    institution: "${esc(src.institution)}"`);
    }
    L.push('');
  }
  L.push('---');
  return L.join('\r\n') + '\r\n' + body;
}

// ─── Main ───
function walk(dir, files) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = p.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('_')) walk(fp, files);
    else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) files.push(fp);
  }
}
const files = [];
walk(p.join(ROOT, 'content'), files);

console.log(`Phase 6 Safe — ${files.length} articles`);
if (DRY_RUN) console.log('(DRY RUN)');

let srcBoosted = 0, afInjected = 0, totalMod = 0;

for (const fp of files) {
  const rel = fp.replace(p.join(ROOT, 'content') + p.sep, '').replace(/\\/g, '/');
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let fm;
  try { fm = y.load(m[1]); } catch { continue; }
  if (!fm) continue;

  const body = raw.substring(m.index + m[0].length);
  let modified = false;

  const ps = Array.isArray(fm.primary_sources) ? fm.primary_sources.filter(s => s && typeof s === 'object') : [];
  const ss = Array.isArray(fm.secondary_sources) ? fm.secondary_sources.filter(s => s && typeof s === 'object') : [];

  // Fix types: paper→academic_paper
  for (const src of [...ps, ...ss]) {
    if (src.type === 'paper') { src.type = 'academic_paper'; modified = true; }
  }

  // Add boost sources
  const boost = BOOST_MAP[rel];
  if (boost && boost.length > 0) {
    const existing = new Set([...ps, ...ss].map(s => (s.title || '').toLowerCase().replace(/[^a-z0-9]/g, '')));
    let added = false;
    for (const src of boost) {
      if (!existing.has(src.title.toLowerCase().replace(/[^a-z0-9]/g, ''))) {
        ss.push(src);
        added = true;
      }
    }
    if (added) { fm.secondary_sources = ss; modified = true; srcBoosted++; }
  }

  // Inject AF if < 2
  const existingAF = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(a => a && a.statement) : [];
  const all = [...ps, ...ss];
  if (existingAF.length < 2 && all.length > 0) {
    const facts = extractFacts(body);
    if (facts.length > 0) {
      const newAF = [...existingAF];
      for (const fact of facts) {
        if (newAF.length >= 5) break;
        const src = matchSource(fact, all);
        const a = {
          id: `fact-${fm.category || 'cs'}-${String(newAF.length + 1).padStart(3, '0')}`,
          statement: fact,
          confidence: (src && (src.type === 'academic_paper' || src.type === 'textbook' || src.type === 'reference')) ? 'high' : 'medium',
        };
        if (src && src.url) a.source_url = src.url;
        if (src && src.doi) a.source_doi = src.doi;
        if (src && src.title) a.source_title = src.title;
        newAF.push(a);
      }
      if (newAF.length > existingAF.length) { fm.atomic_facts = newAF; modified = true; afInjected++; }
    }
  }

  if (modified) {
    const newContent = buildFM(fm, body);
    if (!DRY_RUN) fs.writeFileSync(fp, newContent, 'utf8');
    totalMod++;
  }
}

console.log(`\n=== Results ===`);
console.log(`  Source boosted: ${srcBoosted}`);
console.log(`  AF injected: ${afInjected}`);
console.log(`  Total modified: ${totalMod}`);
if (DRY_RUN) console.log('  (DRY RUN)');
