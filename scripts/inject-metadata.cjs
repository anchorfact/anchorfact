#!/usr/bin/env node
// Inject known_gaps, institution fields, and disputed_statements into articles.
// All injections are context-aware and based on article frontmatter data.

const fs = require('fs'), path = require('path'), yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DIRS = ['ai', 'history', 'science', 'arts', 'business', 'health', 'computer-science', 'game-development'];
const DRY_RUN = process.argv.includes('--dry-run');

// ── Domain-to-hostname institution mapping ──
const INSTITUTION_MAP = {
  'arxiv.org': 'arXiv',
  'github.com': 'GitHub',
  'developer.mozilla.org': 'Mozilla',
  'mdn.dev': 'Mozilla',
  'w3.org': 'W3C',
  'deeplearningbook.org': 'MIT Press',
  'oreilly.com': "O'Reilly Media",
  'manning.com': 'Manning Publications',
  'apress.com': 'Apress',
  'springer.com': 'Springer',
  'nature.com': 'Nature Publishing',
  'science.org': 'Science/AAAS',
  'nejm.org': 'New England Journal of Medicine',
  'thelancet.com': 'The Lancet',
  'ieee.org': 'IEEE',
  'acm.org': 'ACM',
  'nvidia.com': 'NVIDIA',
  'openai.com': 'OpenAI',
  'deepmind.com': 'Google DeepMind',
  'google.com': 'Google',
  'research.google': 'Google Research',
  'anthropic.com': 'Anthropic',
  'meta.com': 'Meta',
  'microsoft.com': 'Microsoft',
  'apple.com': 'Apple',
  'amazon.com': 'Amazon',
  'unity.com': 'Unity Technologies',
  'unrealengine.com': 'Epic Games',
  'godotengine.org': 'Godot Foundation',
  'git-scm.com': 'Git Project',
  'docker.com': 'Docker Inc.',
  'kubernetes.io': 'CNCF',
  'reactjs.org': 'Meta',
  'react.dev': 'Meta',
  'vuejs.org': 'Vue.js Community',
  'angular.io': 'Google',
  'svelte.dev': 'Svelte Contributors',
  'python.org': 'Python Software Foundation',
  'rust-lang.org': 'Rust Foundation',
  'golang.org': 'Google',
  'nodejs.org': 'OpenJS Foundation',
  'postgresql.org': 'PostgreSQL Global Development Group',
  'mysql.com': 'Oracle',
  'mongodb.com': 'MongoDB Inc.',
  'redis.io': 'Redis Ltd.',
  'elastic.co': 'Elastic',
  'stanford.edu': 'Stanford University',
  'mit.edu': 'MIT',
  'berkeley.edu': 'UC Berkeley',
  'harvard.edu': 'Harvard University',
  'cmu.edu': 'Carnegie Mellon University',
  'ox.ac.uk': 'University of Oxford',
  'cam.ac.uk': 'University of Cambridge',
  'ethz.ch': 'ETH Zurich',
  'princeton.edu': 'Princeton University',
  'columbia.edu': 'Columbia University',
  'nyu.edu': 'New York University',
  'washington.edu': 'University of Washington',
  'toronto.edu': 'University of Toronto',
  'unimelb.edu.au': 'University of Melbourne',
  'projectgutenberg.org': 'Project Gutenberg',
  'britannica.com': 'Encyclopaedia Britannica',
  'jstor.org': 'JSTOR',
  'worldbank.org': 'World Bank',
  'imf.org': 'IMF',
  'who.int': 'WHO',
  'nasa.gov': 'NASA',
  'esa.int': 'ESA',
  'noaa.gov': 'NOAA',
  'cdc.gov': 'CDC',
  'nih.gov': 'NIH',
  'europa.eu': 'European Union',
  'un.org': 'United Nations',
  'nobelprize.org': 'Nobel Foundation',
  'coursera.org': 'Coursera',
  'khanacademy.org': 'Khan Academy',
  'loc.gov': 'Library of Congress',
  'si.edu': 'Smithsonian Institution',
  'metmuseum.org': 'Metropolitan Museum of Art',
};

function inferInstitution(url) {
  if (!url) return null;
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    // Direct match
    if (INSTITUTION_MAP[hostname]) return INSTITUTION_MAP[hostname];
    // Subdomain match (e.g., cs.stanford.edu → Stanford)
    for (const [domain, inst] of Object.entries(INSTITUTION_MAP)) {
      if (hostname.endsWith('.' + domain)) return inst;
    }
    // Fallback: use domain name as institution
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const org = parts[parts.length - 2];
      return org.charAt(0).toUpperCase() + org.slice(1);
    }
    return null;
  } catch(e) { return null; }
}

// ── known_gaps generation ──
function generateKnownGaps(fm, rel) {
  const gaps = [];
  const sourceYears = [];
  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : []),
  ].filter(s => typeof s === 'object');
  
  for (const s of allSources) {
    if (s.year) sourceYears.push(Number(s.year));
  }

  const newestYear = sourceYears.length > 0 ? Math.max(...sourceYears) : null;
  const category = (fm.category || '').toLowerCase();

  // Gap 1: Outdated statistics (if newest source is > 2 years old)
  if (newestYear && newestYear < 2024) {
    gaps.push(`Statistics and data cited are from ${newestYear} and earlier; more recent data may have become available since publication`);
  }

  // Gap 2: Rapidly evolving fields
  if (['ai', 'computer-science', 'game-development', 'health'].includes(category)) {
    gaps.push('This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances');
  }

  // Gap 3: General completeness note
  if ((fm.completeness || 0) < 0.9) {
    gaps.push('Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed');
  }

  // Gap 4: Domain-specific gaps
  if (category === 'ai' || category === 'computer-science') {
    if (!sourceYears.some(y => y >= 2025)) {
      gaps.push('Recent developments from 2025-2026 may not be reflected');
    }
  }
  if (category === 'science' && newestYear && newestYear < 2023) {
    gaps.push('Climate and environmental data may have been updated by more recent IPCC or scientific assessments');
  }

  return gaps.length > 0 ? gaps : null;
}

// ── disputed_statements topic map ──
const DISPUTED_TOPICS = {
  'rlhf': [
    { statement: 'The effectiveness and scalability of RLHF as an alignment technique is debated, with alternatives like DPO (Direct Preference Optimization) and Constitutional AI showing competitive results', confidence: 'medium' },
  ],
  'ai-alignment': [
    { statement: 'The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches', confidence: 'medium' },
  ],
  'climate-change': [
    { statement: 'The precise magnitude of climate sensitivity (ECS) ranges from 2°C to 4.5°C across CMIP6 models; exact projections remain a subject of active research', confidence: 'medium' },
  ],
  'cold-war': [
    { statement: 'Historians disagree on whether the Cold War was primarily an ideological struggle, a geopolitical power contest, or both; interpretations vary across revisionist, post-revisionist, and orthodox schools', confidence: 'medium' },
  ],
  'colonialism': [
    { statement: 'The economic impact of colonialism on colonized regions is contested among economic historians; views range from extractive exploitation models to more nuanced assessments of institutional legacy', confidence: 'medium' },
  ],
  'cryptocurrency': [
    { statement: 'The long-term viability and valuation of cryptocurrencies remain highly contested; opinions range from "digital gold" narratives to predictions of zero intrinsic value', confidence: 'medium' },
  ],
  'quantum-computing': [
    { statement: 'The timeline for practical, fault-tolerant quantum computers remains uncertain; estimates range from 5 to 20+ years depending on qubit coherence and error correction breakthroughs', confidence: 'medium' },
  ],
  'nuclear-energy': [
    { statement: 'The role of nuclear energy in decarbonization is contested: proponents cite low-carbon baseload power, while critics highlight waste storage, proliferation risks, and cost overruns', confidence: 'medium' },
  ],
};

function matchDisputedStatements(fm, rel) {
  const title = (fm.title || '').toLowerCase();
  const filePath = rel.toLowerCase();
  
  for (const [topic, statements] of Object.entries(DISPUTED_TOPICS)) {
    const keywords = topic.split('-');
    const matchCount = keywords.filter(kw => title.includes(kw) || filePath.includes(kw)).length;
    if (matchCount >= keywords.length * 0.5) {
      return statements;
    }
  }
  
  // Broader matches
  if (title.includes('gpt') || title.includes('llm') || title.includes('large language')) {
    return [{ statement: 'The scaling laws hypothesis (that larger models consistently improve) is debated; some researchers argue for diminishing returns beyond certain scales, while others point to emergent abilities at scale', confidence: 'medium' }];
  }
  
  return null;
}

// ── Main processing ──
function processArticle(rawContent, rel) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { modified: false };
  
  const frontmatter = match[1];
  const body = rawContent.slice(match.index + match[0].length);
  
  let yamlStr = frontmatter
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');
  
  let fm;
  try { fm = yaml.load(yamlStr); } catch(e) { return { modified: false }; }
  
  const fmLines = frontmatter.split('\n');
  let newLines = [...fmLines];
  let modified = false;
  
  // ── Fix 1: known_gaps ──
  if (!fm.known_gaps || !Array.isArray(fm.known_gaps) || fm.known_gaps.length === 0) {
    const gaps = generateKnownGaps(fm, rel);
    if (gaps && gaps.length > 0) {
      // Find insertion point: after completeness, before related_entities or ai_citations
      let insertAfter = -1;
      const keys = ['completeness:', 'disputed_statements:'];
      for (const key of keys) {
        const idx = newLines.findIndex(l => l.trimStart().startsWith(key));
        if (idx >= 0) { insertAfter = idx; break; }
      }
      if (insertAfter < 0) {
        // Insert before related_entities or ai_citations
        for (const key of ['related_entities:', 'ai_citations:', 'derived_from_human_seed:']) {
          const idx = newLines.findIndex(l => l.trimStart().startsWith(key));
          if (idx >= 0) { insertAfter = idx - 1; break; }
        }
      }
      if (insertAfter < 0) insertAfter = newLines.length - 1;
      
      newLines = [
        ...newLines.slice(0, insertAfter + 1),
        'known_gaps:',
        ...gaps.map(g => `  - "${g}"`),
        ...newLines.slice(insertAfter + 1),
      ];
      modified = true;
    }
  }
  
  // ── Fix 2: Fill missing institution fields ──
  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : []),
  ].filter(s => typeof s === 'object');
  
  let instModified = false;
  for (const src of allSources) {
    if (!src.institution && src.url) {
      const inst = inferInstitution(src.url);
      if (inst) {
        src.institution = inst;
        instModified = true;
      }
    }
  }
  
  if (instModified) {
    // Rebuild sources in YAML
    let yamlLines = newLines.join('\n');
    for (const src of allSources) {
      if (src.institution && src.url) {
        const inst = inferInstitution(src.url);
        if (inst === src.institution) {
          // This was auto-filled, inject it into YAML
          const urlPattern = src.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const urlIdx = yamlLines.indexOf('url: "' + src.url + '"');
          if (urlIdx < 0) continue;
          
          // Check if institution line already exists after this URL
          const afterUrl = yamlLines.substring(urlIdx, urlIdx + 200);
          if (!afterUrl.includes('institution:')) {
            // Find the URL line and add institution after it
            yamlLines = yamlLines.replace(
              new RegExp('(url: "' + urlPattern + '")'),
              '$1\n    institution: "' + src.institution + '"'
            );
          }
        }
      }
    }
    newLines = yamlLines.split('\n');
    modified = true;
  }
  
  // ── Fix 3: disputed_statements ──
  if (!fm.disputed_statements || !Array.isArray(fm.disputed_statements) || fm.disputed_statements.length === 0) {
    const disputes = matchDisputedStatements(fm, rel);
    if (disputes && disputes.length > 0) {
      // Insert before known_gaps or completeness
      let insertAfter = -1;
      for (const key of ['known_gaps:', 'completeness:', 'related_entities:']) {
        const idx = newLines.findIndex(l => l.trimStart().startsWith(key));
        if (idx >= 0) { insertAfter = idx - 1; break; }
      }
      if (insertAfter < 0) {
        for (const key of ['ai_citations:']) {
          const idx = newLines.findIndex(l => l.trimStart().startsWith(key));
          if (idx >= 0) { insertAfter = idx - 1; break; }
        }
      }
      if (insertAfter < 0) insertAfter = newLines.length - 1;
      
      const disputeLines = disputes.map(d =>
        `  - statement: "${d.statement}"\n    confidence: "${d.confidence}"`
      );
      
      newLines = [
        ...newLines.slice(0, insertAfter + 1),
        'disputed_statements:',
        ...disputeLines.join('\n').split('\n').flatMap(l => [l]),
        ...newLines.slice(insertAfter + 1),
      ];
      modified = true;
    }
  }
  
  return { modified, newLines, body };
}

// ── Run ──
let stats = { total: 0, knownGaps: 0, institution: 0, disputed: 0, combined: 0 };

for (const d of DIRS) {
  const dir = path.join(CONTENT_DIR, d);
  if (!fs.existsSync(dir)) continue;
  
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_'))) {
    stats.total++;
    const rel = d + '/' + f;
    const rawContent = fs.readFileSync(path.join(dir, f), 'utf8');
    
    const beforeGaps = rawContent.includes('known_gaps:');
    const beforeInst = rawContent.includes('institution:');
    const beforeDisp = rawContent.includes('disputed_statements:');
    
    const { modified, newLines, body } = processArticle(rawContent, rel);
    
    if (modified) {
      const afterGaps = newLines.join('\n').includes('known_gaps:');
      const afterDisp = newLines.join('\n').includes('disputed_statements:');
      
      if (!beforeGaps && afterGaps) stats.knownGaps++;
      if (!beforeDisp && afterDisp) stats.disputed++;
      stats.combined++;
      
      const newContent = `---\n${newLines.join('\n')}\n---${body}`;
      
      if (DRY_RUN) {
        process.stdout.write('.');
      } else {
        fs.writeFileSync(path.join(dir, f), newContent, 'utf8');
      }
    }
  }
}

console.log(`\n=== Metadata Injection Summary ===`);
console.log(`Total: ${stats.total} | Modified: ${stats.combined}`);
console.log(`  known_gaps injected: ${stats.knownGaps}`);
console.log(`  institution filled: ${stats.institution}`);
console.log(`  disputed_statements: ${stats.disputed}`);
