// Fix 2 AI files: reload with js-yaml, rewrite with consistent CRLF
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');

const files = ['ai/gradient-descent.md', 'ai/tokenization-in-nlp.md'];

for (const f of files) {
  const fp = p.join(ROOT, 'content', f);
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let fm;
  try { fm = y.load(m[1]); } catch { continue; }
  if (!fm) continue;

  const body = raw.substring(m.index + m[0].length);

  // Manually build clean frontmatter — no blank lines between keys
  const lines = ['---'];

  function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

  // Top-level fields in order
  if (fm.id) lines.push(`id: "${esc(fm.id)}"`);
  if (fm.title) lines.push(`title: "${esc(fm.title)}"`);
  if (fm.schema_type) lines.push(`schema_type: "${fm.schema_type}"`);
  if (fm.category) lines.push(`category: "${fm.category}"`);
  if (fm.language) lines.push(`language: "${fm.language}"`);
  if (fm.confidence) lines.push(`confidence: "${fm.confidence}"`);
  if (fm.confidence_rationale) lines.push(`confidence_rationale: "${esc(fm.confidence_rationale)}"`);
  if (fm.last_verified) lines.push(`last_verified: "${fm.last_verified}"`);
  if (fm.generation_method) lines.push(`generation_method: "${fm.generation_method}"`);
  if (Array.isArray(fm.ai_models) && fm.ai_models.length > 0) {
    lines.push(`ai_models: [${fm.ai_models.map(m => `"${m}"`).join(', ')}]`);
  }
  if (fm.derived_from_human_seed !== undefined) lines.push(`derived_from_human_seed: ${fm.derived_from_human_seed}`);
  lines.push('');

  // atomic_facts
  if (Array.isArray(fm.atomic_facts) && fm.atomic_facts.length > 0) {
    lines.push('atomic_facts:');
    for (const af of fm.atomic_facts) {
      if (!af || !af.statement) continue;
      lines.push(`  - id: "${esc(af.id || '')}"`);
      lines.push(`    statement: "${esc(String(af.statement).substring(0, 350))}"`);
      if (af.source_title) lines.push(`    source_title: "${esc(af.source_title)}"`);
      if (af.source_url) lines.push(`    source_url: "${esc(af.source_url)}"`);
      if (af.source_doi) lines.push(`    source_doi: "${esc(af.source_doi)}"`);
      if (af.confidence) lines.push(`    confidence: "${af.confidence}"`);
    }
    lines.push('');
  }

  if (fm.completeness !== undefined && fm.completeness !== null) {
    lines.push(`completeness: ${fm.completeness}`);
    lines.push('');
  }

  // disputed_statements
  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length > 0) {
    lines.push('disputed_statements:');
    for (const ds of fm.disputed_statements) {
      if (typeof ds === 'object' && ds && ds.statement) {
        lines.push(`  - statement: "${esc(String(ds.statement))}"`);
        if (ds.context) lines.push(`    context: "${esc(ds.context)}"`);
      } else if (typeof ds === 'string') {
        lines.push(`  - "${esc(ds)}"`);
      }
    }
    lines.push('');
  }

  // known_gaps
  if (Array.isArray(fm.known_gaps) && fm.known_gaps.length > 0) {
    lines.push('known_gaps:');
    for (const gap of fm.known_gaps) {
      if (typeof gap === 'string') lines.push(`  - "${esc(gap)}"`);
    }
    lines.push('');
  }

  // Sources
  for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources], ['ai_citations', fm.ai_citations]]) {
    if (!Array.isArray(sources) || sources.length === 0) continue;
    lines.push(`${name}:`);
    for (const src of sources) {
      if (!src || !src.title) continue;
      lines.push(`  - title: "${esc(src.title)}"`);
      if (src.authors && Array.isArray(src.authors) && src.authors.length > 0) {
        lines.push(`    authors: [${src.authors.map(a => `"${esc(a)}"`).join(', ')}]`);
      }
      if (src.type) lines.push(`    type: "${src.type}"`);
      if (src.year) lines.push(`    year: ${src.year}`);
      if (src.doi) lines.push(`    doi: "${esc(src.doi)}"`);
      if (src.url) lines.push(`    url: "${esc(src.url)}"`);
      if (src.institution) lines.push(`    institution: "${esc(src.institution)}"`);
    }
    lines.push('');
  }

  lines.push('---');

  // Join with CRLF
  const newContent = lines.join('\r\n') + '\r\n' + body;
  if (newContent !== raw) {
    fs.writeFileSync(fp, newContent, 'utf8');
    console.log(`  Fixed CRLF: ${f}`);
  } else {
    console.log(`  Unchanged: ${f}`);
  }
}
