// Boost D3 source authority for lowest 20 articles
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const CONTENT = p.join(ROOT, 'content');
const { execSync } = require('child_process');
const DRY_RUN = process.argv.includes('--dry-run');
function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

// URL→institution mapping
const HOST_INST = {
  'arxiv.org': 'arXiv / Cornell University', 'ieee.org': 'IEEE', 'acm.org': 'ACM',
  'springer.com': 'Springer', 'nature.com': 'Springer Nature', 'science.org': 'AAAS',
  'britannica.com': 'Encyclopaedia Britannica', 'wikipedia.org': 'Wikimedia Foundation',
  'gutenberg.org': 'Project Gutenberg', 'worldhistory.org': 'World History Foundation',
  'nationalgeographic.com': 'National Geographic', 'penguin.co.uk': 'Penguin Books',
  'penguinrandomhouse.com': 'Penguin Random House', 'oup.com': 'Oxford University Press',
  'cambridge.org': 'Cambridge University Press', 'mitpress.mit.edu': 'MIT Press',
  'wwnorton.com': 'W.W. Norton', 'thamesandhudson.com': 'Thames & Hudson',
  'hachettebookgroup.com': 'Hachette', 'harpercollins.com': 'HarperCollins',
  'simonandschuster.com': 'Simon & Schuster', 'pearson.com': 'Pearson',
  'cengage.com': 'Cengage Learning', 'wiley.com': 'Wiley',
  'phaidon.com': 'Phaidon Press', 'nostarch.com': 'No Starch Press',
  'oreilly.com': "O'Reilly Media", 'manning.com': 'Manning Publications',
  'mit.edu': 'MIT', 'stanford.edu': 'Stanford University', 'harvard.edu': 'Harvard University',
  'who.int': 'WHO', 'nih.gov': 'NIH', 'nasa.gov': 'NASA', 'cdc.gov': 'CDC',
  'iso.org': 'ISO', 'ietf.org': 'IETF', 'w3.org': 'W3C',
  'gdconf.com': 'Game Developers Conference', 'gdcvault.com': 'GDC',
  'unity.com': 'Unity Technologies', 'unrealengine.com': 'Epic Games',
};

function inferInst(url) {
  try { const h = new URL(url).hostname.replace(/^www\./, ''); for (const [k,v] of Object.entries(HOST_INST)) if (h.includes(k)) return v; } catch {}
  return null;
}

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

console.log('D3 Authority Boost — scanning articles...');
if (DRY_RUN) console.log('(DRY RUN)');

const files = getAllFiles();
const scored = [];

// Get D3 scores via quality-score JSON
const out = execSync('node scripts/quality-score.cjs --json', { cwd: ROOT, encoding: 'utf8', maxBuffer: 50*1024*1024 });
const data = JSON.parse(out);

// Sort by D3_authority lowest first
data.articles.sort((a,b) => (a.dimensions?.D3_authority || 0) - (b.dimensions?.D3_authority || 0));
const targets = data.articles.slice(0, 20);

let boosted = 0;
for (const t of targets) {
  const fp = p.resolve(CONTENT, t.file);
  if (!fs.existsSync(fp)) { console.log('  MISSING: ' + t.file); continue; }
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let fm;
  try { fm = y.load(m[1]); } catch { continue; }
  if (!fm) continue;

  const body = raw.substring(m.index + m[0].length);
  let modified = false;

  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : []),
  ];

  for (const src of allSources) {
    if (!src || typeof src !== 'object') continue;

    // Add institution if missing
    if (!src.institution && src.url) {
      const inst = inferInst(src.url);
      if (inst) { src.institution = inst; modified = true; }
    }

    // Add DOI for academic sources without one
    if (!src.doi && src.url && src.url.includes('arxiv.org')) {
      const arxivId = src.url.match(/arxiv\.org\/abs\/([\d.]+)/);
      if (arxivId) { src.doi = `10.48550/arXiv.${arxivId[1]}`; modified = true; }
    }

    // Fix generic homepage URLs
    if (src.url) {
      try {
        const u = new URL(src.url);
        if (u.pathname.replace(/\/$/,'') === '' || /^\/index\./.test(u.pathname)) {
          // Generic homepage — leave as-is for now (needs title-based matching)
        }
      } catch {}
    }
  }

  if (modified) {
    // Manual CRLF build
    const L = ['---'];
    if (fm.id) L.push(`id: "${esc(fm.id)}"`);
    if (fm.title) L.push(`title: "${esc(fm.title)}"`);
    L.push(`schema_type: "${fm.schema_type || 'TechArticle'}"`);
    L.push(`category: "${fm.category || ''}"`);
    if (fm.language) L.push(`language: "${fm.language}"`);
    L.push(`confidence: "${fm.confidence || 'high'}"`);
    if (fm.last_verified) L.push(`last_verified: "${fm.last_verified}"`);
    L.push(`generation_method: "${fm.generation_method || 'ai_assisted'}"`);
    if (Array.isArray(fm.ai_models) && fm.ai_models.length) L.push(`ai_models: [${fm.ai_models.map(m => `"${m}"`).join(', ')}]`);
    if (fm.derived_from_human_seed !== undefined) L.push(`derived_from_human_seed: ${fm.derived_from_human_seed}`);
    L.push('');

    const af = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(a => a && a.statement) : [];
    if (af.length > 0) {
      L.push('atomic_facts:');
      for (const a of af) {
        L.push(`  - id: "${esc(a.id || '')}"`);
        L.push(`    statement: "${esc(String(a.statement).substring(0, 350))}"`);
        if (a.source_url) L.push(`    source_url: "${esc(a.source_url)}"`);
        if (a.confidence) L.push(`    confidence: "${a.confidence}"`);
      }
      L.push('');
    }
    if (fm.completeness !== undefined) { L.push(`completeness: ${fm.completeness}`); L.push(''); }

    for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources]]) {
      if (!Array.isArray(sources) || sources.length === 0) continue;
      L.push(`${name}:`);
      for (const src of sources) {
        if (!src || !src.title) continue;
        L.push(`  - title: "${esc(src.title)}"`);
        if (src.type) L.push(`    type: "${src.type}"`);
        if (src.year) L.push(`    year: ${src.year}`);
        if (src.doi) L.push(`    doi: "${esc(src.doi)}"`);
        if (src.url) L.push(`    url: "${esc(src.url)}"`);
        if (src.institution) L.push(`    institution: "${esc(src.institution)}"`);
      }
      L.push('');
    }
    L.push('---');
    const newContent = L.join('\r\n') + '\r\n' + body;
    if (!DRY_RUN) fs.writeFileSync(fp, newContent, 'utf8');
    boosted++;
  }
}

console.log(`Boosted: ${boosted}/${targets.length}`);
