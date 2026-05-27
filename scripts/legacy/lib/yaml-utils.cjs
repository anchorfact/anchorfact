// Shared YAML utilities — authoritative parseFrontmatter, esc, buildFM
const y = require('js-yaml');

/**
 * Parse frontmatter with fixed dedup (cross-section pollution prevention).
 * Returns [fm, error] where fm is the parsed object or null.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return [null, 'No frontmatter'];
  let yamlStr = match[1]
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');

  const seenTopKeys = new Set();
  const lines = yamlStr.split('\n');
  const deduped = [];
  let inSection = false;
  let entryKeys = new Set();

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (/^\s{2}- /.test(line)) {
      entryKeys = new Set();
      inSection = true;
      deduped.unshift(line);
      continue;
    }
    const keyMatch = line.match(/^(\s*)([\w_-]+):/);
    if (keyMatch) {
      const indent = keyMatch[1].length;
      const key = `${indent}:${keyMatch[2]}`;
      if (indent <= 2) {
        inSection = false;
        if (seenTopKeys.has(key)) continue;
        seenTopKeys.add(key);
      } else if (inSection) {
        if (entryKeys.has(key)) continue;
        entryKeys.add(key);
      }
    }
    deduped.unshift(line);
  }
  try {
    const fm = y.load(deduped.join('\n'));
    return [fm && typeof fm === 'object' ? fm : null, null];
  } catch (e) {
    return [null, `YAML parse error: ${e.message}`];
  }
}

/** Escape string for YAML double-quoted values */
function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/** Build CRLF frontmatter from parsed fm object + body text */
function buildFM(fm, body) {
  const L = ['---'];
  if (fm.id) L.push(`id: "${esc(fm.id)}"`);
  if (fm.title) L.push(`title: "${esc(fm.title)}"`);
  L.push(`schema_type: "${fm.schema_type || 'TechArticle'}"`);
  L.push(`category: "${fm.category || ''}"`);
  if (fm.language) L.push(`language: "${fm.language}"`);
  L.push(`confidence: "${fm.confidence || 'high'}"`);
  if (fm.confidence_rationale) L.push(`confidence_rationale: "${esc(fm.confidence_rationale)}"`);
  if (fm.last_verified) L.push(`last_verified: "${fm.last_verified}"`);
  L.push(`generation_method: "${fm.generation_method || 'ai_assisted'}"`);
  if (Array.isArray(fm.ai_models) && fm.ai_models.length)
    L.push(`ai_models: [${fm.ai_models.map(m => `"${m}"`).join(', ')}]`);
  if (fm.derived_from_human_seed !== undefined)
    L.push(`derived_from_human_seed: ${fm.derived_from_human_seed}`);
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

  if (fm.completeness !== undefined && fm.completeness !== null)
    L.push(`completeness: ${fm.completeness}`), L.push('');

  // disputed_statements
  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length) {
    L.push('disputed_statements:');
    for (const ds of fm.disputed_statements) {
      if (typeof ds === 'object' && ds && ds.statement)
        L.push(`  - statement: "${esc(String(ds.statement))}"`);
      else if (typeof ds === 'string') L.push(`  - "${esc(ds)}"`);
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
    for (const src of sources) {
      if (!src || !src.title) continue;
      L.push(`  - title: "${esc(src.title)}"`);
      if (src.authors && Array.isArray(src.authors) && src.authors.length)
        L.push(`    authors: [${src.authors.map(a => `"${esc(a)}"`).join(', ')}]`);
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

module.exports = { parseFrontmatter, esc, buildFM };
