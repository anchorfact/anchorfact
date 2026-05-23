// Safe fix for 4 fragile AI files: manual CRLF frontmatter rebuild
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');

const FILES = ['ai/explainable-ai-xai.md', 'ai/gradient-descent.md', 'ai/rlhf.md', 'ai/tokenization-in-nlp.md'];

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

// AI boost sources for explainable-ai-xai (D3=4)
const XAI_SOURCES = [
  { title: '"Why Should I Trust You?": Explaining the Predictions of Any Classifier (LIME)', type: 'academic_paper', year: 2016, url: 'https://arxiv.org/abs/1602.04938', institution: 'KDD / University of Washington', authors: ['Ribeiro', 'Singh', 'Guestrin'] },
  { title: 'A Unified Approach to Interpreting Model Predictions (SHAP)', type: 'academic_paper', year: 2017, url: 'https://arxiv.org/abs/1705.07874', institution: 'NIPS / University of Washington', authors: ['Lundberg', 'Lee'] },
];

// RLHF sources
const RLHF_SOURCES = [
  { title: 'Deep Reinforcement Learning from Human Preferences', type: 'academic_paper', year: 2017, url: 'https://arxiv.org/abs/1706.03741', institution: 'OpenAI / DeepMind', authors: ['Christiano', 'Leike', 'Brown', 'et al.'] },
  { title: 'Training language models to follow instructions with human feedback (InstructGPT)', type: 'academic_paper', year: 2022, url: 'https://arxiv.org/abs/2203.02155', institution: 'OpenAI', authors: ['Ouyang', 'Wu', 'Jiang', 'et al.'] },
];

const DOMAIN_EXTRAS = {
  'explainable-ai-xai': XAI_SOURCES,
  'rlhf': RLHF_SOURCES,
};

for (const f of FILES) {
  const fp = p.join(ROOT, 'content', f);
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { console.log(`  NO_FM: ${f}`); continue; }

  let fm;
  try { fm = y.load(m[1]); } catch { console.log(`  PARSE_ERR: ${f}`); continue; }
  if (!fm) { console.log(`  NULL_FM: ${f}`); continue; }

  const body = raw.substring(m.index + m[0].length);
  const key = f.split('/')[1].replace('.md', '');
  const extraSources = DOMAIN_EXTRAS[key] || [];

  // Fix types: paper → academic_paper
  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources.filter(s => s && typeof s === 'object') : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources.filter(s => s && typeof s === 'object') : []),
  ];
  for (const src of allSources) {
    if (src.type === 'paper') src.type = 'academic_paper';
    if (!src.type || src.type === 'other') {
      if (src.url && /arxiv|ieeexplore|acm\.org|neurips|icml|iclr/i.test(src.url)) src.type = 'academic_paper';
    }
    if (!src.institution && src.url) {
      if (/arxiv/.test(src.url)) src.institution = 'arXiv';
      else if (/ieeexplore/.test(src.url)) src.institution = 'IEEE';
    }
  }

  // Add extra sources
  if (extraSources.length > 0) {
    const ss = Array.isArray(fm.secondary_sources) ? [...fm.secondary_sources] : [];
    const existingTitles = new Set(allSources.map(s => (s.title || '').toLowerCase().replace(/[^a-z0-9]/g, '')));
    for (const src of extraSources) {
      if (!existingTitles.has(src.title.toLowerCase().replace(/[^a-z0-9]/g, ''))) {
        ss.push(src);
      }
    }
    fm.secondary_sources = ss;
  }

  // Manual CRLF frontmatter rebuild (no y.dump)
  const lines = ['---'];

  if (fm.id) lines.push(`id: "${esc(fm.id)}"`);
  if (fm.title) lines.push(`title: "${esc(fm.title)}"`);
  if (fm.schema_type) lines.push(`schema_type: "${fm.schema_type}"`);
  if (fm.category) lines.push(`category: "${fm.category}"`);
  if (fm.language) lines.push(`language: "${fm.language}"`);
  if (fm.confidence) lines.push(`confidence: "${fm.confidence}"`);
  if (fm.confidence_rationale) lines.push(`confidence_rationale: "${esc(fm.confidence_rationale)}"`);
  if (fm.last_verified) lines.push(`last_verified: "${fm.last_verified}"`);
  if (fm.generation_method) lines.push(`generation_method: "${fm.generation_method}"`);
  if (Array.isArray(fm.ai_models) && fm.ai_models.length) lines.push(`ai_models: [${fm.ai_models.map(m => `"${m}"`).join(', ')}]`);
  if (fm.derived_from_human_seed !== undefined) lines.push(`derived_from_human_seed: ${fm.derived_from_human_seed}`);
  lines.push('');

  // atomic_facts
  const af = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(a => a && a.statement) : [];
  if (af.length > 0) {
    lines.push('atomic_facts:');
    for (const a of af) {
      lines.push(`  - id: "${esc(a.id || '')}"`);
      lines.push(`    statement: "${esc(String(a.statement).substring(0, 350))}"`);
      if (a.source_title) lines.push(`    source_title: "${esc(a.source_title)}"`);
      if (a.source_url) lines.push(`    source_url: "${esc(a.source_url)}"`);
      if (a.source_doi) lines.push(`    source_doi: "${esc(a.source_doi)}"`);
      if (a.confidence) lines.push(`    confidence: "${a.confidence}"`);
    }
    lines.push('');
  }

  if (fm.completeness !== undefined && fm.completeness !== null) {
    lines.push(`completeness: ${fm.completeness}`);
    lines.push('');
  }

  // disputed
  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length) {
    lines.push('disputed_statements:');
    for (const ds of fm.disputed_statements) {
      if (typeof ds === 'object' && ds && ds.statement) {
        lines.push(`  - statement: "${esc(String(ds.statement))}"`);
        if (ds.context) lines.push(`    context: "${esc(ds.context)}"`);
      }
    }
    lines.push('');
  }

  // known_gaps
  if (Array.isArray(fm.known_gaps) && fm.known_gaps.length) {
    lines.push('known_gaps:');
    for (const g of fm.known_gaps) {
      if (typeof g === 'string') lines.push(`  - "${esc(g)}"`);
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
      if (src.authors && Array.isArray(src.authors) && src.authors.length) {
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

  const newContent = lines.join('\r\n') + '\r\n' + body;
  fs.writeFileSync(fp, newContent, 'utf8');
  console.log(`  Fixed: ${f}`);
}
console.log(`Done: ${FILES.length} files`);
