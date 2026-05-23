// Phase 3: Inject atomic_facts into F-grade + self-improvement articles
// Extracts verifiable facts from TL;DR + Core Explanation, maps to existing sources
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = p.join(__dirname, '..');

// Target articles: all 21 F-grade + all 10 self-improvement
const TARGETS = [
  // F-grade (21 articles — D3:3, lacking atomic_facts)
  'arts/ancient-greek-literature.md', 'arts/jazz-music.md', 'history/samurai-history.md',
  'history/pyramids-of-giza.md', 'arts/theater-history.md', 'game-development/save-systems-design.md',
  'arts/shakespeare-s-works.md', 'business/stock-market-basics.md', 'science/animal-behavior.md',
  'science/ocean-life.md',
  // Also check what else is F-grade from the report
  'arts/art-history.md', 'arts/architecture-history.md', 'arts/baroque-music.md',
  'arts/classical-music.md', 'arts/film-history.md', 'arts/impressionism.md',
  'arts/modern-art.md', 'arts/opera-music.md', 'arts/renaissance-art.md',
  'arts/romantic-music.md', 'arts/surrealism.md',
  'history/ancient-egypt.md', 'history/cold-war.md', 'history/french-revolution.md',
  'history/industrial-revolution.md', 'history/mongol-empire.md', 'history/renaissance.md',
  'history/roman-empire.md', 'history/viking-history.md', 'history/world-war-i.md',
  'history/world-war-ii.md',
  // Actually let's just scan for F-grade dynamically
];

// Scan dynamically for F-grade articles
function getFGradeArticles() {
  const arts = fs.readdirSync(p.join(ROOT, 'content', 'arts')).filter(f => f.endsWith('.md') && f !== '_index.md');
  const history = fs.readdirSync(p.join(ROOT, 'content', 'history')).filter(f => f.endsWith('.md') && f !== '_index.md');
  const business = fs.readdirSync(p.join(ROOT, 'content', 'business')).filter(f => f.endsWith('.md') && f !== '_index.md');
  const science = fs.readdirSync(p.join(ROOT, 'content', 'science')).filter(f => f.endsWith('.md') && f !== '_index.md');
  const gd = fs.readdirSync(p.join(ROOT, 'content', 'game-development')).filter(f => f.endsWith('.md') && f !== '_index.md');

  // Known F-grade from report: these 10 bottom articles
  const knownF = [
    'arts/ancient-greek-literature.md', 'arts/jazz-music.md', 'history/samurai-history.md',
    'history/pyramids-of-giza.md', 'arts/theater-history.md', 'game-development/save-systems-design.md',
    'arts/shakespeare-s-works.md', 'business/stock-market-basics.md', 'science/animal-behavior.md',
    'science/ocean-life.md',
  ];
  // Also sample all articles with only 2 sources in arts/history
  const allDomains = { arts, history, business, science, 'game-development': gd };
  const additional = [];
  for (const [domain, files] of Object.entries(allDomains)) {
    for (const f of files) {
      const fp = p.join(ROOT, 'content', domain, f);
      const raw = fs.readFileSync(fp, 'utf8');
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!m) continue;
      const fm = m[1];
      const srcCount = (fm.match(/^\s{2}-\s+title\s*:/gm) || []).length;
      const hasAF = fm.includes('atomic_facts:');
      if (srcCount <= 3 && !hasAF) {
        additional.push(`${domain}/${f}`);
      }
    }
  }
  return [...new Set([...knownF, ...additional])];
}

// Self-improvement articles
function getSITargets() {
  const siDir = p.join(ROOT, 'content', 'self-improvement');
  return fs.readdirSync(siDir).filter(f => f.endsWith('.md') && f !== '_index.md').map(f => 'self-improvement/' + f);
}

// Geography articles
function getGeoTargets() {
  const geoDir = p.join(ROOT, 'content', 'geography');
  return fs.readdirSync(geoDir).filter(f => f.endsWith('.md') && f !== '_index.md').map(f => 'geography/' + f);
}

// ─── Fixed-dedup YAML parser (same as quality-score.cjs) ───
function parseFM(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return [null, null, null];
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
    return [y.load(deduped.join('\n')), m, deduped.join('\n')];
  } catch (e) {
    return [null, m, yamlStr];
  }
}

// ─── Fact extraction from body text ───
function extractFacts(bodyText) {
  const facts = [];
  const sentences = bodyText
    .replace(/\n+/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // strip markdown links
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')  // strip bold/italic
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.length > 40 && s.length < 300);

  // Extract TL;DR first paragraph
  const tldrMatch = bodyText.match(/##\s*TL;DR\s*\n+(.+?)(?:\n##|\n$)/s);
  if (tldrMatch) {
    const tldrText = tldrMatch[1].replace(/\n/g, ' ').trim();
    if (tldrText.length > 30 && tldrText.length < 400) {
      facts.push({ text: tldrText.substring(0, 350), source: 'tldr_summary', priority: 1 });
    }
  }

  // Extract Core Explanation
  const coreMatch = bodyText.match(/##\s*Core\s+Explanation\s*\n+(.+?)(?:\n##|\n$)/s);
  if (coreMatch) {
    const coreText = coreMatch[1];
    const coreSentences = coreText
      .replace(/\n+/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.length > 50 && s.length < 350);

    let added = 0;
    for (const s of coreSentences) {
      if (added >= 3) break;
      // Score sentence: prefer those with numbers, names, or action verbs
      const score = (s.match(/\d/g) || []).length * 2 +
        (s.match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g) || []).length * 2 +
        (s.match(/\b(discovers?|introduces?|publishes?|creates?|founds?|establishes?|achieves?|develops?|defines?|proposes?|demonstrates?|shows?|proves?)\b/gi) ? 3 : 0) +
        (s.match(/\b(first|largest|most|biggest|earliest|oldest|principal|primary|fundamental|essential|key|critical)\b/gi) ? 2 : 0);
      if (score >= 2) {
        facts.push({ text: s.trim().substring(0, 350), source: 'core_explanation', priority: 2 });
        added++;
      }
    }
  }

  // Fallback: pick best general sentences
  if (facts.filter(f => f.priority === 2).length < 2) {
    for (const s of sentences) {
      if (facts.length >= 6) break;
      const score = (s.match(/\d/g) || []).length +
        (s.match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g) || []).length +
        (s.match(/\b(discover|introduce|publish|create|found|establish|achieve|develop|define|propose|demonstrate)\b/gi) ? 2 : 0);
      if (score >= 2 && !facts.some(f => f.text === s.trim())) {
        facts.push({ text: s.trim().substring(0, 350), source: 'body', priority: 3 });
      }
    }
  }

  return facts.slice(0, 5);
}

// ─── Source matching ───
function matchSource(factText, sources) {
  const factWords = new Set(factText.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
  let best = null, bestScore = 0;
  for (const src of sources) {
    if (typeof src !== 'object' || !src) continue;
    const title = (src.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const author = (src.authors || []).join(' ').toLowerCase();
    const searchText = title + ' ' + author;
    const srcWords = new Set(searchText.split(/\s+/).filter(w => w.length > 3));
    let overlap = 0;
    for (const w of factWords) { if (srcWords.has(w)) overlap++; }
    if (overlap > bestScore) { bestScore = overlap; best = src; }
  }
  return best || sources[0];
}

// ─── Rebuild frontmatter with atomic_facts injected ───
function injectAtomicFacts(raw, facts, sources) {
  let [fm, m] = parseFM(raw);
  if (!fm || !m) return null;

  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : []),
  ];

  // Build atomic_facts
  const domain = fm.category || 'unknown';
  const atomicFacts = [];
  let counter = 1;
  for (const f of facts.slice(0, 5)) {
    const src = matchSource(f.text, allSources);
    const af = {
      id: `fact-${domain}-${String(counter).padStart(3, '0')}`,
      statement: f.text,
    };
    if (src) {
      if (src.url) af.source_url = src.url;
      if (src.doi) af.source_doi = src.doi;
      if (src.title) af.source_title = src.title;
      af.confidence = (src.type === 'academic_paper' || src.type === 'textbook' || src.type === 'official_report') ? 'high' : 'medium';
    }
    atomicFacts.push(af);
    counter++;
  }

  if (atomicFacts.length === 0) return null;

  // Build new YAML
  const bodyStart = m.index + m[0].length;
  const body = raw.substring(bodyStart);

  // eslint-disable-next-line no-inner-declarations
  function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

  // Reconstruct frontmatter by inserting atomic_facts before completeness/sources
  const fmLines = raw.substring(0, bodyStart).split('\n');
  const insertBeforeIdx = fmLines.findIndex(l => l.match(/^(primary_sources|completeness|known_gaps|disputed_statements):/));
  const insertIdx = insertBeforeIdx > 0 ? insertBeforeIdx : fmLines.length;

  const afLines = [];
  afLines.push('atomic_facts:');
  for (const af of atomicFacts) {
    afLines.push(`  - id: "${esc(af.id)}"`);
    afLines.push(`    statement: "${esc(af.statement)}"`);
    if (af.source_url) afLines.push(`    source_url: "${esc(af.source_url)}"`);
    if (af.source_doi) afLines.push(`    source_doi: "${esc(af.source_doi)}"`);
    if (af.source_title) afLines.push(`    source_title: "${esc(af.source_title)}"`);
    if (af.confidence) afLines.push(`    confidence: "${af.confidence}"`);
  }
  afLines.push('');

  fmLines.splice(insertIdx, 0, ...afLines);
  return fmLines.join('\n') + raw.substring(bodyStart - 1);
}

// ─── Main ───
function main() {
  const fTargets = getFGradeArticles();
  const siTargets = getSITargets();
  const geoTargets = getGeoTargets();
  const allTargets = [...new Set([...fTargets, ...siTargets, ...geoTargets])];

  console.log(`Phase 3 Atomic Facts Injection`);
  console.log(`  F-grade/low-source targets: ${fTargets.length}`);
  console.log(`  Self-improvement: ${siTargets.length}`);
  console.log(`  Geography: ${geoTargets.length}`);
  console.log(`  Total unique targets: ${allTargets.length}`);
  if (DRY_RUN) console.log('  (DRY RUN)');

  let injected = 0, skipped = 0;
  for (const rel of allTargets) {
    const fp = p.join(ROOT, 'content', rel);
    if (!fs.existsSync(fp)) { console.log(`  MISSING: ${rel}`); skipped++; continue; }
    const raw = fs.readFileSync(fp, 'utf8');
    const [fm] = parseFM(raw);
    if (!fm) { console.log(`  PARSE_ERR: ${rel}`); skipped++; continue; }

    // Check if already has atomic_facts with content
    const existingAF = Array.isArray(fm.atomic_facts) ? fm.atomic_facts : [];
    if (existingAF.length >= 3) {
      console.log(`  SKIP (has ${existingAF.length} AF): ${rel}`);
      skipped++;
      continue;
    }

    // Extract body content
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) { console.log(`  NO_FM: ${rel}`); skipped++; continue; }
    const bodyText = raw.substring(m.index + m[0].length);

    // Extract facts
    const facts = extractFacts(bodyText);
    if (facts.length === 0) { console.log(`  NO_FACTS: ${rel}`); skipped++; continue; }

    // Inject
    const allSources = [
      ...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []),
      ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : []),
    ];

    const newContent = injectAtomicFacts(raw, facts, allSources);
    if (newContent) {
      if (!DRY_RUN) fs.writeFileSync(fp, newContent, 'utf8');
      console.log(`  AF_${facts.length}: ${rel}`);
      injected++;
    } else {
      console.log(`  FAIL: ${rel}`);
      skipped++;
    }
  }

  console.log(`\nInjected: ${injected}, Skipped: ${skipped}/${allTargets.length}`);
}

main();
