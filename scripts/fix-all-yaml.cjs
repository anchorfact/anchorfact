// Final comprehensive YAML fix: parse → modify → clean serialize
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const DRY_RUN = process.argv.includes('--dry-run');

// URL → institution mapping
const HOST_TO_INST = {
  'arxiv.org': 'arXiv / Cornell University', 'github.com': 'GitHub',
  'ieee.org': 'IEEE', 'acm.org': 'ACM', 'springer.com': 'Springer',
  'nature.com': 'Springer Nature', 'science.org': 'AAAS',
  'pnas.org': 'National Academy of Sciences', 'cell.com': 'Cell Press',
  'elsevier.com': 'Elsevier', 'wiley.com': 'Wiley', 'plos.org': 'PLOS',
  'frontiersin.org': 'Frontiers', 'mdpi.com': 'MDPI', 'doi.org': 'CrossRef',
  'britannica.com': 'Encyclopaedia Britannica', 'wikipedia.org': 'Wikimedia Foundation',
  'medium.com': 'Medium', 'dev.to': 'DEV Community', 'freecodecamp.org': 'freeCodeCamp',
  'w3.org': 'W3C', 'ietf.org': 'IETF', 'mozilla.org': 'Mozilla Foundation',
  'react.dev': 'Meta / React', 'vuejs.org': 'Vue.js Community', 'angular.io': 'Google / Angular',
  'nodejs.org': 'OpenJS Foundation', 'python.org': 'Python Software Foundation',
  'rust-lang.org': 'Rust Foundation', 'golang.org': 'Google / Go',
  'apache.org': 'Apache Foundation', 'gnu.org': 'Free Software Foundation',
  'docker.com': 'Docker Inc.', 'kubernetes.io': 'CNCF', 'postgresql.org': 'PostgreSQL Global Dev Group',
  'mysql.com': 'Oracle', 'mongodb.com': 'MongoDB Inc.', 'redis.io': 'Redis Ltd.',
  'sqlite.org': 'SQLite Consortium', 'nginx.org': 'F5 / NGINX', 'kernel.org': 'Linux Kernel Organization',
  'mit.edu': 'MIT', 'stanford.edu': 'Stanford University', 'harvard.edu': 'Harvard University',
  'berkeley.edu': 'UC Berkeley', 'cmu.edu': 'Carnegie Mellon University',
  'ox.ac.uk': 'University of Oxford', 'cam.ac.uk': 'University of Cambridge',
  'princeton.edu': 'Princeton University', 'yale.edu': 'Yale University',
  'cornell.edu': 'Cornell University', 'columbia.edu': 'Columbia University',
  'gatech.edu': 'Georgia Tech', 'umich.edu': 'University of Michigan',
  'washington.edu': 'University of Washington', 'toronto.edu': 'University of Toronto',
  'utexas.edu': 'UT Austin', 'illinois.edu': 'UIUC', 'nyu.edu': 'NYU',
  'caltech.edu': 'Caltech', 'jhu.edu': 'Johns Hopkins University',
  'imperial.ac.uk': 'Imperial College London', 'ucsd.edu': 'UC San Diego',
  'purdue.edu': 'Purdue University', 'ethz.ch': 'ETH Zurich',
  'who.int': 'WHO', 'nih.gov': 'NIH', 'nasa.gov': 'NASA', 'noaa.gov': 'NOAA',
  'epa.gov': 'US EPA', 'cdc.gov': 'CDC', 'un.org': 'United Nations',
  'worldbank.org': 'World Bank', 'oecd.org': 'OECD',
  'bbc.com': 'BBC', 'bbc.co.uk': 'BBC', 'reuters.com': 'Reuters',
  'bloomberg.com': 'Bloomberg', 'nytimes.com': 'New York Times',
  'economist.com': 'The Economist', 'theguardian.com': 'The Guardian',
  'nationalgeographic.com': 'National Geographic', 'si.edu': 'Smithsonian Institution',
  'loc.gov': 'Library of Congress', 'coursera.org': 'Coursera', 'edx.org': 'edX',
  'khanacademy.org': 'Khan Academy', 'oreilly.com': "O'Reilly Media",
  'manning.com': 'Manning Publications', 'cambridge.org': 'Cambridge University Press',
  'oup.com': 'Oxford University Press', 'unity.com': 'Unity Technologies',
  'unrealengine.com': 'Epic Games', 'stackoverflow.com': 'Stack Overflow',
  'npmjs.com': 'npm / GitHub', 'pypi.org': 'PyPI',
  'developer.mozilla.org': 'MDN / Mozilla', 'developer.apple.com': 'Apple Inc.',
  'cloud.google.com': 'Google Cloud', 'aws.amazon.com': 'Amazon Web Services',
  'azure.microsoft.com': 'Microsoft Azure', 'docs.microsoft.com': 'Microsoft',
  'learn.microsoft.com': 'Microsoft', 'web.dev': 'Google Chrome',
  'digitalocean.com': 'DigitalOcean', 'atlassian.com': 'Atlassian', 'git-scm.com': 'Git',
  'ubuntu.com': 'Canonical', 'redhat.com': 'Red Hat', 'debian.org': 'Debian',
  'opensource.org': 'OSI', 'towardsdatascience.com': 'Medium / TDS',
  'lilianweng.github.io': 'OpenAI', 'jalammar.github.io': 'Independent',
  'openai.com': 'OpenAI', 'deepmind.google': 'Google DeepMind',
  'ai.meta.com': 'Meta AI', 'research.google': 'Google Research',
};

// URL → type mapping (sorted by specificity)
const URL_TYPE_MAP = [
  { re: /arxiv\.org|doi\.org|ieee\.org|acm\.org|springer\.com|nature\.com|science\.org|pnas\.org|cell\.com|elsevier\.com|wiley\.com|plos\.org|frontiersin\.org|mdpi\.com|thelancet\.com|nejm\.org|sagepub\.com|tandfonline\.com|oup\.com|cambridge\.org|jstor\.org|researchgate\.net|semanticscholar\.org|pubmed|ncbi\.nlm/i, t: 'academic_paper' },
  { re: /\.gov|who\.int|un\.org|oecd\.org|worldbank\.org|imf\.org|europa\.eu|nih\.gov|nasa\.gov|noaa\.gov|epa\.gov|cdc\.gov/i, t: 'official_report' },
  { re: /ietf\.org|rfc-editor|iso\.org|w3\.org|whatwg\.org|ecma-international\.org/i, t: 'standard' },
  { re: /britannica\.com/i, t: 'textbook' },
  { re: /oreilly\.com|manning\.com|packtpub\.com|apress\.com|mitpress\.mit\.edu/i, t: 'technical_book' },
  { re: /reuters\.com|apnews\.com|bloomberg\.com|bbc\.(com|co\.uk)|nytimes\.com|wsj\.com|economist\.com|ft\.com|theguardian\.com/i, t: 'news_article' },
  { re: /openai\.com\/research|blog\.openai|research\.google|deepmind\.google|ai\.meta\.com|amazon\.science|research\.microsoft/i, t: 'technical_report' },
  { re: /khanacademy\.org|coursera\.org|edx\.org|udacity\.com|udemy\.com|pluralsight\.com/i, t: 'course_material' },
  { re: /github\.com/i, t: 'official_documentation' },
  { re: /medium\.com|dev\.to|towardsdatascience\.com|freecodecamp\.org/i, t: 'blog_post' },
  { re: /wikipedia\.org|wikibooks|wikiversity/i, t: 'encyclopedia' },
  { re: /\.edu/i, t: 'course_material' },
  { re: /blog\./i, t: 'blog_post' },
];

function inferInst(url) {
  try { const h = new URL(url).hostname.replace(/^www\./, ''); if (HOST_TO_INST[h]) return HOST_TO_INST[h];
    const parts = h.split('.'); for (let i = 1; i < parts.length - 1; i++) { const parent = parts.slice(i).join('.'); if (HOST_TO_INST[parent]) return HOST_TO_INST[parent]; }
    return null; } catch { return null; }
}
function inferType(url) { for (const r of URL_TYPE_MAP) if (r.re.test(url)) return r.t; return null; }

function getAllArticles() {
  const articles = [];
  const base = p.join(__dirname, '..', 'content');
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = p.join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith('_')) walk(f);
      else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) articles.push(f);
    }
  }
  walk(base);
  return articles;
}

// Parse frontmatter with FIXED dedup
function parseFM(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return [null, null];
  let yamlStr = m[1]
    .replace(/\r\n/g, '\n')
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');

  const seenKeys = new Set();
  let inListEntry = false;
  let listEntryKeys = new Set();
  const lines = yamlStr.split('\n');
  const deduped = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (/^\s{2}- /.test(line)) {
      listEntryKeys = new Set();
      inListEntry = true;
      deduped.unshift(line);
      continue;
    }
    const keyMatch = line.match(/^(\s*)([\w_-]+):/);
    if (keyMatch) {
      const indent = keyMatch[1].length;
      const key = `${indent}:${keyMatch[2]}`;
      if (inListEntry && indent >= 4) {
        if (listEntryKeys.has(key)) continue;
        listEntryKeys.add(key);
      } else {
        if (indent <= 2) inListEntry = false;
        if (seenKeys.has(key)) continue;
        seenKeys.add(key);
      }
    }
    deduped.unshift(line);
  }
  try {
    return [y.load(deduped.join('\n')), m];
  } catch (e) {
    return [null, m];
  }
}

// Serialize a single source entry
function serializeSource(src) {
  const lines = [];
  if (src.title) lines.push(`  - title: "${esc(src.title)}"`);
  else lines.push('  - title: "Untitled"');

  if (src.authors && Array.isArray(src.authors) && src.authors.length > 0) {
    lines.push(`    authors: [${src.authors.map(a => `"${esc(a)}"`).join(', ')}]`);
  }
  if (src.type) lines.push(`    type: "${src.type}"`);
  if (src.year) lines.push(`    year: ${src.year}`);
  if (src.doi) lines.push(`    doi: "${src.doi}"`);
  if (src.url) lines.push(`    url: "${src.url}"`);
  if (src.institution) lines.push(`    institution: "${esc(src.institution)}"`);
  if (src.note) {
    const note = String(src.note).substring(0, 300).replace(/\n/g, ' ');
    lines.push(`    note: "${esc(note)}"`);
  }
  return lines;
}

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Rebuild clean frontmatter
function rebuildFM(fm, body) {
  const out = [];
  out.push('---');

  // Fixed order for top-level fields
  const topFields = [
    ['id', s => `id: "${esc(s)}"`],
    ['title', s => `title: "${esc(s)}"`],
    ['schema_type', s => `schema_type: "${s}"`],
    ['category', s => `category: "${s}"`],
    ['language', s => `language: "${s}"`],
    ['confidence', s => `confidence: "${s}"`],
    ['confidence_rationale', s => `confidence_rationale: "${esc(s)}"`],
    ['last_verified', s => `last_verified: "${s}"`],
    ['generation_method', s => `generation_method: "${s}"`],
  ];

  for (const [key, fmt] of topFields) {
    if (fm[key] !== undefined) out.push(fmt(fm[key]));
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

  // completeness
  if (fm.completeness !== undefined && fm.completeness !== null) {
    out.push(`completeness: ${fm.completeness}`);
  }

  // disputed_statements
  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length > 0) {
    out.push('disputed_statements:');
    for (const ds of fm.disputed_statements) {
      if (typeof ds === 'object' && ds) {
        out.push(`  - statement: "${esc(String(ds.statement || ''))}"`);
        if (ds.context) out.push(`    context: "${esc(ds.context)}"`);
        if (ds.confidence) out.push(`    confidence: "${ds.confidence}"`);
      } else if (typeof ds === 'string') {
        out.push(`  - "${esc(ds)}"`);
      }
    }
    out.push('');
  }

  // known_gaps
  if (Array.isArray(fm.known_gaps) && fm.known_gaps.length > 0) {
    out.push('known_gaps:');
    for (const gap of fm.known_gaps) {
      if (typeof gap === 'string') out.push(`  - "${esc(gap)}"`);
    }
    out.push('');
  }

  // related_entities
  if (Array.isArray(fm.related_entities) && fm.related_entities.length > 0) {
    out.push('related_entities:');
    for (const re of fm.related_entities) {
      if (typeof re === 'string') out.push(`  - "${esc(re)}"`);
    }
    out.push('');
  }

  // Sources
  const sourceSections = [
    ['primary_sources', fm.primary_sources],
    ['secondary_sources', fm.secondary_sources],
    ['ai_citations', fm.ai_citations],
  ];

  for (const [name, sources] of sourceSections) {
    if (!Array.isArray(sources) || sources.length === 0) continue;
    out.push(`${name}:`);
    for (const src of sources) {
      if (typeof src !== 'object' || !src) continue;
      out.push(...serializeSource(src));
    }
    out.push('');
  }

  out.push('---');
  return out.join('\n') + '\n' + body;
}

// Main
const articles = getAllArticles();
let instAdded = 0, typeFixed = 0, totalCleaned = 0;

for (const fp of articles) {
  const raw = fs.readFileSync(fp, 'utf8');
  const [fm, m] = parseFM(raw);
  if (!fm || !m) continue;

  let modified = false;

  // Collect all sources
  const sourceFields = ['primary_sources', 'secondary_sources', 'ai_citations'];
  for (const field of sourceFields) {
    if (!Array.isArray(fm[field])) continue;
    for (const src of fm[field]) {
      if (typeof src !== 'object' || !src) continue;

      // Fix type: if missing or "other", infer from URL
      if ((!src.type || src.type === 'other') && src.url) {
        const newType = inferType(src.url);
        if (newType) { src.type = newType; typeFixed++; modified = true; }
      }

      // Add institution if missing and URL exists
      if (!src.institution && src.url) {
        const inst = inferInst(src.url);
        if (inst) { src.institution = inst; instAdded++; modified = true; }
      }
    }
  }

  // Build body (after frontmatter)
  const bodyStart = m.index + m[0].length;
  const body = raw.substring(bodyStart);

  if (modified && !DRY_RUN) {
    const newContent = rebuildFM(fm, body);
    fs.writeFileSync(fp, newContent, 'utf8');
    totalCleaned++;
  } else if (modified) {
    totalCleaned++;
  }
}

console.log('');
console.log('=== Final YAML Fix ===');
console.log(`  Types fixed: ${typeFixed}`);
console.log(`  Institutions added: ${instAdded}`);
console.log(`  Articles modified: ${totalCleaned}`);
if (DRY_RUN) console.log('  (DRY RUN)');
