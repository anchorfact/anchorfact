// Audit Fix: Inject ai_models: ["claude-opus"] for ai_assisted articles missing the field
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }
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

console.log('Audit: Inject ai_models for articles missing the field');
if (DRY_RUN) console.log('(DRY RUN)');

let injected = 0, skipped = 0;
const files = getAllFiles();

for (const fp of files) {
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let fm;
  try { fm = y.load(m[1]); } catch { continue; }
  if (!fm) continue;

  // Only fix ai_assisted articles that lack ai_models
  if (fm.generation_method !== 'ai_assisted') continue;
  if (Array.isArray(fm.ai_models) && fm.ai_models.length > 0) { skipped++; continue; }

  // Get body
  const body = raw.substring(m.index + m[0].length);

  // Build frontmatter with ai_models injected
  const L = ['---'];
  L.push('id: "' + esc(fm.id || '') + '"');
  L.push('title: "' + esc(fm.title || '') + '"');
  L.push('schema_type: "' + (fm.schema_type || 'TechArticle') + '"');
  L.push('category: "' + (fm.category || '') + '"');
  L.push('language: "' + (fm.language || 'en') + '"');
  L.push('confidence: "' + (fm.confidence || 'high') + '"');
  if (fm.confidence_rationale) L.push('confidence_rationale: "' + esc(fm.confidence_rationale) + '"');
  L.push('last_verified: "' + (fm.last_verified || '') + '"');
  L.push('generation_method: "ai_assisted"');
  L.push('ai_models: ["claude-opus"]');
  if (fm.derived_from_human_seed !== undefined) L.push('derived_from_human_seed: ' + fm.derived_from_human_seed);
  L.push('');

  // atomic_facts
  const af = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(a => a && a.statement) : [];
  if (af.length > 0) {
    L.push('atomic_facts:');
    for (const a of af) {
      L.push('  - id: "' + esc(a.id || '') + '"');
      L.push('    statement: "' + esc(String(a.statement).substring(0, 350)) + '"');
      if (a.source_title) L.push('    source_title: "' + esc(a.source_title) + '"');
      if (a.source_url) L.push('    source_url: "' + esc(a.source_url) + '"');
      if (a.source_doi) L.push('    source_doi: "' + esc(a.source_doi) + '"');
      if (a.confidence) L.push('    confidence: "' + a.confidence + '"');
    }
    L.push('');
  }

  if (fm.completeness !== undefined) { L.push('completeness: ' + fm.completeness); L.push(''); }

  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length) {
    L.push('disputed_statements:');
    for (const ds of fm.disputed_statements) {
      if (ds && ds.statement) L.push('  - statement: "' + esc(ds.statement) + '"');
    }
    L.push('');
  }

  if (Array.isArray(fm.known_gaps) && fm.known_gaps.length) {
    L.push('known_gaps:');
    for (const g of fm.known_gaps) { if (typeof g === 'string') L.push('  - "' + esc(g) + '"'); }
    L.push('');
  }

  for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources], ['ai_citations', fm.ai_citations]]) {
    if (!Array.isArray(sources) || sources.length === 0) continue;
    L.push(name + ':');
    for (const src of sources) {
      if (!src || !src.title) continue;
      L.push('  - title: "' + esc(src.title) + '"');
      if (src.authors && Array.isArray(src.authors)) L.push('    authors: [' + src.authors.map(a => '"' + esc(a) + '"').join(', ') + ']');
      if (src.type) L.push('    type: "' + src.type + '"');
      if (src.year) L.push('    year: ' + src.year);
      if (src.doi) L.push('    doi: "' + esc(src.doi) + '"');
      if (src.url) L.push('    url: "' + esc(src.url) + '"');
      if (src.institution) L.push('    institution: "' + esc(src.institution) + '"');
    }
    L.push('');
  }

  L.push('---');
  const newContent = L.join('\r\n') + '\r\n' + body;

  if (!DRY_RUN) fs.writeFileSync(fp, newContent, 'utf8');
  injected++;
}

console.log('Injected: ' + injected + ' | Skipped (already has): ' + skipped);
