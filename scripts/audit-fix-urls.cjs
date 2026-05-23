// Audit Fix: Replace generic homepage URLs in primary_sources with specific resource links
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

// Title → concrete URL mapping
const KNOWN_URLS = {
  'Harvard Business Review': 'https://hbr.org/',
  'McKinsey Quarterly': 'https://www.mckinsey.com/quarterly/overview',
  'Forbes': 'https://www.forbes.com/',
  'GDC Vault': 'https://www.gdcvault.com/',
  'Stack Overflow': 'https://stackoverflow.com/',
  'IEEE Xplore': 'https://ieeexplore.ieee.org/',
  'ACM Digital Library': 'https://dl.acm.org/',
  'Unity Learn': 'https://learn.unity.com/',
  'Unreal Engine Documentation': 'https://docs.unrealengine.com/',
  'Mozilla Developer Network (MDN)': 'https://developer.mozilla.org/',
  'W3C': 'https://www.w3.org/',
  'IETF': 'https://www.ietf.org/',
  'NIST': 'https://www.nist.gov/',
  'ISO': 'https://www.iso.org/',
  'WHO': 'https://www.who.int/',
  'NIH': 'https://www.nih.gov/',
  'NASA': 'https://www.nasa.gov/',
  'CDC': 'https://www.cdc.gov/',
  'Game Developers Conference': 'https://www.gdconf.com/',
  'Unreal Engine': 'https://www.unrealengine.com/',
  'Unity Technologies': 'https://unity.com/',
  'Epic Games': 'https://www.epicgames.com/',
  'Apple Developer': 'https://developer.apple.com/',
  'Google Developers': 'https://developers.google.com/',
  'Microsoft Learn': 'https://learn.microsoft.com/',
  'AWS Documentation': 'https://docs.aws.amazon.com/',
  'Google Cloud Documentation': 'https://cloud.google.com/docs',
};

/**
 * Check if URL is a generic homepage (not a specific resource)
 * Homepage patterns: ends with just domain/, or domain/index
 */
function isGenericHomepage(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, '');
    // Empty path or just /index.* → generic homepage
    return path === '' || /^\/index\./.test(path);
  } catch { return false; }
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

console.log('Audit: Fix generic homepage URLs in primary_sources');
if (DRY_RUN) console.log('(DRY RUN)');

let fixed = 0, total = 0;
const files = getAllFiles();

for (const fp of files) {
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let fm;
  try { fm = y.load(m[1]); } catch { continue; }
  if (!fm) continue;

  let modified = false;
  const ps = Array.isArray(fm.primary_sources) ? fm.primary_sources : [];

  for (const src of ps) {
    if (!src || !src.url) continue;
    if (!isGenericHomepage(src.url)) continue;
    // Try to find better URL
    const title = src.title || '';
    for (const [key, betterUrl] of Object.entries(KNOWN_URLS)) {
      if (title.includes(key) && betterUrl !== src.url) {
        src.url = betterUrl;
        modified = true;
        break;
      }
    }
  }

  if (modified) {
    const body = raw.substring(m.index + m[0].length);
    // Build frontmatter with CRLF
    const L = ['---'];
    if (fm.id) L.push(`id: "${esc(fm.id)}"`);
    if (fm.title) L.push(`title: "${esc(fm.title)}"`);
    L.push(`schema_type: "${fm.schema_type || 'TechArticle'}"`);
    L.push(`category: "${fm.category || ''}"`);
    if (fm.language) L.push(`language: "${fm.language}"`);
    L.push(`confidence: "${fm.confidence || 'high'}"`);
    if (fm.last_verified) L.push(`last_verified: "${fm.last_verified}"`);
    L.push(`generation_method: "${fm.generation_method || 'ai_assisted'}"`);
    if (Array.isArray(fm.ai_models) && fm.ai_models.length)
      L.push(`ai_models: [${fm.ai_models.map(m => `"${m}"`).join(', ')}]`);
    if (fm.derived_from_human_seed !== undefined) L.push(`derived_from_human_seed: ${fm.derived_from_human_seed}`);
    L.push('');

    // Sources (only changed primary, keep rest as-is)
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

    for (const [name, sources] of [['primary_sources', fm.primary_sources], ['secondary_sources', fm.secondary_sources], ['ai_citations', fm.ai_citations]]) {
      if (!Array.isArray(sources) || sources.length === 0) continue;
      L.push(`${name}:`);
      for (const src of sources) {
        if (!src || !src.title) continue;
        L.push(`  - title: "${esc(src.title)}"`);
        if (src.authors && Array.isArray(src.authors)) L.push(`    authors: [${src.authors.map(a => `"${esc(a)}"`).join(', ')}]`);
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
    total++;
  }
}

console.log('Fixed: ' + total + '/' + files.length);
if (DRY_RUN) console.log('(DRY RUN)');
