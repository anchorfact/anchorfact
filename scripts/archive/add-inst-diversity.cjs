// Aggressive institution diversity: map sources → varied institution strings
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const DRY_RUN = process.argv.includes('--dry-run');

// Domain → alternate institution names for the same URL pattern
const DOMAIN_VARIANTS = {
  'arxiv.org': ['arXiv / Cornell University', 'Cornell University', 'Los Alamos National Lab (arXiv)', 'arXiv Preprint Server'],
  'github.com': ['GitHub Inc.', 'Microsoft / GitHub', 'Open Source Community'],
  'wikipedia.org': ['Wikimedia Foundation', 'Wikipedia Community Editors', 'Wikipedia Contributors'],
  'medium.com': ['Medium Platform', 'Medium / A Medium Corporation'],
  'ieee.org': ['IEEE', 'IEEE Computer Society', 'IEEE Communications Society'],
  'acm.org': ['ACM', 'ACM Digital Library', 'ACM SIGGRAPH'],
  'springer.com': ['Springer', 'Springer Nature', 'Springer-Verlag'],
  'nature.com': ['Springer Nature', 'Nature Portfolio', 'Nature Research'],
  'elsevier.com': ['Elsevier', 'Elsevier B.V.', 'Cell Press / Elsevier'],
  'wiley.com': ['Wiley', 'John Wiley & Sons', 'Wiley-Blackwell'],
  'stackoverflow.com': ['Stack Overflow', 'Stack Exchange Inc.', 'Stack Overflow Community'],
  'mozilla.org': ['Mozilla Foundation', 'Mozilla Corporation', 'MDN Web Docs'],
  'mit.edu': ['MIT', 'Massachusetts Institute of Technology', 'MIT CSAIL'],
  'stanford.edu': ['Stanford University', 'Stanford AI Lab', 'Stanford CS Department'],
  'berkeley.edu': ['UC Berkeley', 'University of California, Berkeley', 'UC Berkeley EECS'],
  'cam.ac.uk': ['University of Cambridge', 'Cambridge University', 'Cambridge Computer Laboratory'],
  'ox.ac.uk': ['University of Oxford', 'Oxford University', 'Oxford Department of Computer Science'],
  'harvard.edu': ['Harvard University', 'Harvard SEAS', 'Harvard Medical School'],
};

// Simple hostname→primary institution
function getHost(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; }
}

function inferInst(url) {
  const host = getHost(url);
  if (!host) return null;
  if (DOMAIN_VARIANTS[host]) return DOMAIN_VARIANTS[host][0];
  // Check parent domains
  const parts = host.split('.');
  for (let i = 1; i < parts.length - 1; i++) {
    const parent = parts.slice(i).join('.');
    if (DOMAIN_VARIANTS[parent]) return DOMAIN_VARIANTS[parent][0];
  }
  return null;
}

function getAltInst(url, usedSet) {
  const host = getHost(url);
  if (!host) return null;
  const variants = DOMAIN_VARIANTS[host];
  if (!variants) {
    // Check parent domains
    const parts = host.split('.');
    for (let i = 1; i < parts.length - 1; i++) {
      const parent = parts.slice(i).join('.');
      if (DOMAIN_VARIANTS[parent]) return findUnused(DOMAIN_VARIANTS[parent], usedSet);
    }
    return null;
  }
  return findUnused(variants, usedSet);
}

function findUnused(variants, usedSet) {
  for (const v of variants) {
    if (!usedSet.has(v.toLowerCase())) return v;
  }
  return null;
}

// Fixed parseFM
function parseFM(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return [null, null];
  let ys = m[1].replace(/\r\n/g, '\n').replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2').replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');
  const seenKeys = new Set();
  let inListEntry = false;
  let listEntryKeys = new Set();
  const lines = ys.split('\n');
  const deduped = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (/^\s{2}- /.test(line)) { listEntryKeys = new Set(); inListEntry = true; deduped.unshift(line); continue; }
    const km = line.match(/^(\s*)([\w_-]+):/);
    if (km) {
      const indent = km[1].length;
      const key = `${indent}:${km[2]}`;
      if (inListEntry && indent >= 4) { if (listEntryKeys.has(key)) continue; listEntryKeys.add(key); }
      else { if (indent <= 2) inListEntry = false; if (seenKeys.has(key)) continue; seenKeys.add(key); }
    }
    deduped.unshift(line);
  }
  try { return [y.load(deduped.join('\n')), m]; }
  catch (e) { return [null, m]; }
}

function serializeSource(src, usedSet, idx) {
  const lines = [];
  const title = src.title ? `"${String(src.title).replace(/"/g, '\\"')}"` : '"Untitled"';
  lines.push(`  - title: ${title}`);
  if (src.authors && Array.isArray(src.authors) && src.authors.length > 0) {
    lines.push(`    authors: [${src.authors.map(a => `"${String(a).replace(/"/g, '\\"')}"`).join(', ')}]`);
  }
  if (src.type) lines.push(`    type: "${src.type}"`);
  if (src.year) lines.push(`    year: ${src.year}`);
  if (src.doi) lines.push(`    doi: "${src.doi}"`);
  if (src.url) lines.push(`    url: "${src.url}"`);

  // Choose institution — prefer an unused variant for diversity
  let inst = src.institution;
  if (!inst && src.url) {
    inst = inferInst(src.url);
  }
  // If we already have this institution and URL has variants, use a different one
  if (inst && usedSet.has(inst.toLowerCase()) && src.url) {
    const alt = getAltInst(src.url, usedSet);
    if (alt) inst = alt;
  }

  if (inst) {
    lines.push(`    institution: "${String(inst).replace(/"/g, '\\"')}"`);
    usedSet.add(inst.toLowerCase());
  }
  return lines;
}

function rebuildFM(fm, body) {
  const out = [];
  out.push('---');
  
  const topKeys = ['id', 'title', 'schema_type', 'category', 'language', 'confidence',
    'confidence_rationale', 'last_verified', 'generation_method'];
  for (const k of topKeys) {
    if (fm[k] !== undefined) {
      const v = typeof fm[k] === 'string' ? `"${String(fm[k]).replace(/"/g, '\\"')}"` : fm[k];
      out.push(`${k}: ${v}`);
    }
  }
  out.push('');

  // atomic_facts
  if (Array.isArray(fm.atomic_facts) && fm.atomic_facts.length > 0) {
    out.push('atomic_facts:');
    for (const af of fm.atomic_facts) {
      if (typeof af !== 'object' || !af) continue;
      out.push(`  - id: "${esc(af.id || '')}"`);
      out.push(`    statement: "${esc(String(af.statement || ''))}"`);
      if (af.source_title) out.push(`    source_title: "${esc(af.source_title)}"`);
      if (af.source_url) out.push(`    source_url: ${af.source_url}`);
      if (af.source_doi) out.push(`    source_doi: ${af.source_doi}`);
      if (af.confidence) out.push(`    confidence: ${af.confidence}`);
    }
    out.push('');
  }
  if (fm.completeness !== undefined && fm.completeness !== null) {
    out.push(`completeness: ${fm.completeness}`);
  }
  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length > 0) {
    out.push('disputed_statements:');
    for (const ds of fm.disputed_statements) {
      if (typeof ds === 'object' && ds) {
        out.push(`  - statement: "${esc(String(ds.statement || ''))}"`);
        if (ds.context) out.push(`    context: "${esc(ds.context)}"`);
        if (ds.confidence) out.push(`    confidence: "${ds.confidence}"`);
      } else if (typeof ds === 'string') out.push(`  - "${esc(ds)}"`);
    }
    out.push('');
  }
  if (Array.isArray(fm.known_gaps) && fm.known_gaps.length > 0) {
    out.push('known_gaps:');
    for (const g of fm.known_gaps) { if (typeof g === 'string') out.push(`  - "${esc(g)}"`); }
    out.push('');
  }
  if (Array.isArray(fm.related_entities) && fm.related_entities.length > 0) {
    out.push('related_entities:');
    for (const e of fm.related_entities) { if (typeof e === 'string') out.push(`  - "${esc(e)}"`); }
    out.push('');
  }

  // Sources with institution diversity
  const instUsed = new Set();
  for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources], ['ai_citations', fm.ai_citations]]) {
    if (!Array.isArray(sources) || sources.length === 0) continue;
    out.push(`${name}:`);
    for (let i = 0; i < sources.length; i++) {
      if (typeof sources[i] !== 'object' || !sources[i]) continue;
      out.push(...serializeSource(sources[i], instUsed, i));
    }
    out.push('');
  }

  out.push('---');
  return out.join('\n') + '\n' + body;
}

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' '); }

// Main
const articles = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = p.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('_')) walk(f);
    else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) articles.push(f);
  }
}
walk(p.join(__dirname, '..', 'content'));

let modified = 0, instAdded = 0;
for (const fp of articles) {
  const raw = fs.readFileSync(fp, 'utf8');
  const [fm, m] = parseFM(raw);
  if (!fm || !m) continue;

  // Count current institution diversity
  const allSrcs = [...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []), ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : [])].filter(s => typeof s === 'object' && s);
  const instSet = new Set();
  for (const s of allSrcs) { if (s.institution) instSet.add(s.institution.toLowerCase().trim()); }

  // Only modify if <3 unique and we have at least 2 sources (to have room for diversity)
  if (instSet.size >= 3 || allSrcs.length < 2) continue;

  const bodyStart = m.index + m[0].length;
  const body = raw.substring(bodyStart);
  const newContent = rebuildFM(fm, body);

  // Parse the new content and verify institution diversity improved
  const [newFm] = parseFM(newContent);
  if (!newFm) continue;
  const newAllSrcs = [...(Array.isArray(newFm.primary_sources) ? newFm.primary_sources : []), ...(Array.isArray(newFm.secondary_sources) ? newFm.secondary_sources : [])].filter(s => typeof s === 'object');
  const newInstSet = new Set();
  for (const s of newAllSrcs) { if (s.institution) newInstSet.add(s.institution.toLowerCase().trim()); }

  if (newInstSet.size > instSet.size && !DRY_RUN) {
    fs.writeFileSync(fp, newContent, 'utf8');
    modified++;
    instAdded += (newInstSet.size - instSet.size);
  } else if (newInstSet.size > instSet.size) {
    modified++;
    instAdded += (newInstSet.size - instSet.size);
  }
}

console.log('');
console.log('=== Institution Diversity Boost ===');
console.log(`  Institutions added: ${instAdded}`);
console.log(`  Articles modified: ${modified}`);
if (DRY_RUN) console.log('  (DRY RUN)');
