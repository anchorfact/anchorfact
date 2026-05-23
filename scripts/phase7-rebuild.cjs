// Phase 7: Rebuild 8 D-grade files — normalize YAML format (LF→CRLF, quotes, structure)
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

const D_FILES = [
  'computer-science/c-language.md',
  'computer-science/functional-programming.md',
  'computer-science/progressive-web-apps-pwa.md',
  'history/pyramids-of-giza.md',
  'arts/shakespeare-s-works.md',
  'arts/philosophy-of-mind.md',
  'business/negotiation-skills.md',
  'health/meditation-and-mindfulness.md',
];

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

  // disputed_statements
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
  if (Array.isArray(fm.known_gaps) && fm.known_gaps.length) {
    L.push('known_gaps:');
    for (const g of fm.known_gaps) { if (typeof g === 'string') L.push(`  - "${esc(g)}"`); }
    L.push('');
  }

  // Sources
  for (const [name, sources] of [
    ['primary_sources', fm.primary_sources],
    ['secondary_sources', fm.secondary_sources],
    ['ai_citations', fm.ai_citations],
  ]) {
    if (!Array.isArray(sources) || sources.length === 0) continue;
    L.push(`${name}:`);
    let seen = new Set();
    for (const src of sources) {
      if (!src || !src.title) continue;
      // Deduplicate within section
      const t = src.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(t)) continue;
      seen.add(t);

      L.push(`  - title: "${esc(src.title)}"`);
      if (src.authors && Array.isArray(src.authors) && src.authors.length) {
        L.push(`    authors: [${src.authors.map(a => `"${esc(a)}"`).join(', ')}]`);
      }
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

// Parse with LF normalization
function parseSafe(raw) {
  // Normalize to LF first for parsing
  const normalized = raw.replace(/\r\n/g, '\n');
  const m = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return [null, null, null];

  // Get body with original line endings
  const bodyStart = raw.indexOf('\n---', m.index + 4) + 4;
  const body = raw.substring(bodyStart);

  let yamlStr = m[1];
  try {
    return [y.load(yamlStr), body, m];
  } catch {
    // Fix common issues
    yamlStr = yamlStr
      .replace(/^([\w_-]+):(\S)/gm, '$1: $2')  // add space after colon
      .replace(/\n{3,}/g, '\n\n');               // collapse blanks
    try {
      return [y.load(yamlStr), body, m];
    } catch (e) {
      console.log('  Parse failed for line ' + (e.mark?.line || '?') + ': ' + e.message.substring(0, 60));
      return [null, null, null];
    }
  }
}

console.log('Phase 7 — Rebuild 8 D-grade files');

let fixed = 0;
for (const rel of D_FILES) {
  const fp = p.join(ROOT, 'content', rel);
  const raw = fs.readFileSync(fp, 'utf8');
  const [fm, body] = parseSafe(raw);
  if (!fm) { console.log(`  SKIP: ${rel}`); continue; }

  // Fix structural issues
  // ai_citations should not contain last_citation_check
  if (fm.ai_citations && typeof fm.ai_citations === 'object' && !Array.isArray(fm.ai_citations)) {
    fm.ai_citations = Array.isArray(fm.ai_citations) ? fm.ai_citations : 
      (fm.ai_citations.last_citation_check ? fm.ai_citations : []);
  }
  if (Array.isArray(fm.ai_citations)) {
    fm.ai_citations = fm.ai_citations.filter(s => s && typeof s === 'object' && s.title);
  }

  // Fix source types: unmapped → proper
  for (const field of ['primary_sources', 'secondary_sources', 'ai_citations']) {
    if (!Array.isArray(fm[field])) continue;
    for (const src of fm[field]) {
      if (!src) continue;
      if (!src.type || src.type === 'other') {
        if (src.url) {
          if (/arxiv|ieee|acm|springer|nature\.com|science\.org/i.test(src.url)) src.type = 'academic_paper';
          else if (/britannica/.test(src.url)) src.type = 'encyclopedia';
          else if (/gutenberg/.test(src.url)) src.type = 'literature';
          else if (/oup\.com|oxford|penguin|wwnorton|thamesandhudson|harpercollins|simonandschuster/.test(src.url)) src.type = 'book';
          else if (/stanford\.edu\/entries/.test(src.url)) src.type = 'reference';
          else src.type = 'reference';
        } else {
          src.type = 'reference';
        }
      }
    }
  }

  // Remove last_citation_check from ai_citations (move to top-level if needed)
  if (fm.ai_citations && Array.isArray(fm.ai_citations)) {
    fm.ai_citations = fm.ai_citations.filter(s => typeof s === 'object' && s.title);
  }

  const newContent = buildFM(fm, body);
  fs.writeFileSync(fp, newContent, 'utf8');
  console.log(`  Fixed: ${rel}`);
  fixed++;
}

console.log(`\nFixed ${fixed}/${D_FILES.length}`);
