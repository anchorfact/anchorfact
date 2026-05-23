/**
 * Inject QUALITY_STANDARD v1.0 required fields into all articles
 * - created_date (P0-2)
 * - conflict_of_interest (P0-4)
 * - is_live_document + data_period (P0-5)
 */
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const CONTENT = p.join(__dirname, '..', 'content');
const { writeFileAtomic } = require('./lib/safe-write.cjs');

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

let injected = 0, skipped = 0, total = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = p.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.')) walk(fp);
    else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) {
      total++;
      const raw = fs.readFileSync(fp, 'utf8');
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!m) { console.log('  NO FM: ' + p.relative(CONTENT, fp)); continue; }

      try { 
        const fm = y.load(m[1]);
        if (!fm || typeof fm !== 'object') { skipped++; continue; }
      } catch { skipped++; continue; }

      const fm = y.load(m[1]);
      const body = raw.substring(m.index + m[0].length);
      let modified = false;

      // 1. created_date (P0-2): use last_verified as fallback
      if (!fm.created_date) {
        fm.created_date = fm.last_verified || '2026-01-01';
        modified = true;
      }

      // 2. conflict_of_interest (P0-4)
      if (!fm.conflict_of_interest) {
        fm.conflict_of_interest = 'none_declared';
        modified = true;
      }

      // 3. is_live_document + data_period (P0-5)
      if (fm.is_live_document === undefined) {
        fm.is_live_document = false;
        modified = true;
      }
      if (!fm.data_period) {
        fm.data_period = 'static';
        modified = true;
      }

      if (!modified) { skipped++; continue; }

      // Rebuild frontmatter preserving order
      const FM_ORDER = [
        'id', 'title', 'schema_type', 'category', 'language',
        'confidence', 'last_verified', 'created_date',
        'generation_method', 'ai_models', 'derived_from_human_seed',
        'conflict_of_interest', 'is_live_document', 'data_period',
      ];
      const lines = ['---'];
      for (const key of FM_ORDER) {
        if (fm[key] === undefined || fm[key] === null) continue;
        if (Array.isArray(fm[key])) {
          lines.push(key + ': [' + fm[key].map(v => '"' + esc(String(v)) + '"').join(', ') + ']');
        } else if (typeof fm[key] === 'boolean' || typeof fm[key] === 'number') {
          lines.push(key + ': ' + fm[key]);
        } else {
          lines.push(key + ': "' + esc(String(fm[key])) + '"');
        }
      }
      lines.push('');

      // atomic_facts
      if (Array.isArray(fm.atomic_facts) && fm.atomic_facts.length) {
        lines.push('atomic_facts:');
        for (const af of fm.atomic_facts) {
          if (!af || !af.statement) continue;
          lines.push('  - id: "' + esc(af.id || '') + '"');
          lines.push('    statement: "' + esc(String(af.statement).substring(0, 350)) + '"');
          if (af.source_title) lines.push('    source_title: "' + esc(af.source_title) + '"');
          if (af.source_url) lines.push('    source_url: "' + esc(af.source_url) + '"');
          if (af.source_doi) lines.push('    source_doi: "' + esc(af.source_doi) + '"');
          if (af.confidence) lines.push('    confidence: "' + af.confidence + '"');
        }
        lines.push('');
      }

      if (fm.completeness !== undefined) { lines.push('completeness: ' + fm.completeness); lines.push(''); }

      // known_gaps
      if (Array.isArray(fm.known_gaps) && fm.known_gaps.length) {
        lines.push('known_gaps:');
        for (const g of fm.known_gaps) lines.push('  - "' + esc(String(g)) + '"');
        lines.push('');
      }

      // disputed_statements
      if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length) {
        lines.push('disputed_statements:');
        for (const ds of fm.disputed_statements) {
          lines.push('  - statement: "' + esc(ds.statement || ds) + '"');
        }
        lines.push('');
      }

      // Sources
      for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources]]) {
        if (!Array.isArray(sources) || !sources.length) continue;
        lines.push(name + ':');
        for (const src of sources) {
          if (!src || !src.title) continue;
          lines.push('  - title: "' + esc(src.title) + '"');
          if (src.authors) lines.push('    authors: [' + src.authors.map(a => '"' + esc(a) + '"').join(', ') + ']');
          if (src.type) lines.push('    type: "' + src.type + '"');
          if (src.year) lines.push('    year: ' + src.year);
          if (src.url) lines.push('    url: "' + esc(src.url) + '"');
          if (src.doi) lines.push('    doi: "' + esc(src.doi) + '"');
          if (src.institution) lines.push('    institution: "' + esc(src.institution) + '"');
        }
        lines.push('');
      }
      lines.push('---');
      writeFileAtomic(fp, lines.join('\r\n') + '\r\n' + body);
      injected++;
    }
  }
}

walk(CONTENT);

// Also update validate-content.cjs to check new fields
const vcPath = p.join(__dirname, 'validate-content.cjs');
let vcSrc = fs.readFileSync(vcPath, 'utf8');
if (!vcSrc.includes('created_date')) {
  vcSrc = vcSrc.replace(
    "'confidence', 'last_verified', 'generation_method', 'primary_sources'",
    "'confidence', 'last_verified', 'created_date', 'generation_method', 'primary_sources'"
  );
  // Add check for conflict_of_interest presence
  if (!vcSrc.includes('conflict_of_interest')) {
    vcSrc = vcSrc.replace(
      '// ─── New: Classification aliases',
      "// ── Optional but recommended fields ──\n" +
      "const RECOMMENDED_FIELDS = ['conflict_of_interest', 'is_live_document', 'data_period'];\n\n" +
      '// ─── New: Classification aliases'
    );
    // Add check after other validations
    vcSrc = vcSrc.replace(
      '// ── i18n: language tag validation ──',
      '  // ── Quality Standard v1.0 fields ──\n' +
      '  for (const f of RECOMMENDED_FIELDS) {\n' +
      '    if (fm[f] === undefined || fm[f] === null) add(\'warnings\', rel, `Missing recommended field: ${f}`);\n' +
      '  }\n\n' +
      '  // ── i18n: language tag validation ──'
    );
  }
  fs.writeFileSync(vcPath, vcSrc, 'utf8');
  console.log('validate-content.cjs updated with new field checks');
}

console.log(`\nInjected: ${injected} | Skipped: ${skipped} | Total scanned: ${total}`);
