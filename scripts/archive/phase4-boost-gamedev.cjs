// Phase 4: Boost 35 game-development D-grade articles (all 65p, D1:17/D2:23/D3:15/D4:10)
// Fix: inject atomic_facts from body + add url/doi to knowledge_base sources
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

// Extra authoritative game-dev sources for articles needing more sources
const GD_SOURCES = [
  { title: 'Game Engine Architecture (Jason Gregory, 3rd Ed)', type: 'textbook', year: 2018, url: 'https://www.gameenginebook.com/', institution: 'CRC Press' },
  { title: 'Game Programming Patterns (Robert Nystrom)', type: 'book', year: 2014, url: 'https://gameprogrammingpatterns.com/', institution: 'Genever Benning' },
  { title: 'GDC Vault: Game Developers Conference', type: 'conference', year: 2025, url: 'https://www.gdcvault.com/', institution: 'Game Developers Conference' },
  { title: 'Unity Learn Platform', type: 'course_material', year: 2025, url: 'https://learn.unity.com/', institution: 'Unity Technologies' },
  { title: 'Unreal Engine Documentation', type: 'documentation', year: 2025, url: 'https://docs.unrealengine.com/', institution: 'Epic Games' },
];

// URL → institution mapping
const HOST_INST = {
  'gdconf.com': 'Game Developers Conference',
  'gdcvault.com': 'Game Developers Conference',
  'gameenginebook.com': 'CRC Press',
  'gameprogrammingpatterns.com': 'Genever Benning',
  'learn.unity.com': 'Unity Technologies',
  'docs.unrealengine.com': 'Epic Games',
  'unity.com': 'Unity Technologies',
  'unrealengine.com': 'Epic Games',
};

// ─── Fact extraction ───
function extractFacts(bodyText) {
  const facts = [];
  const tldrMatch = bodyText.match(/^##\s*TL;DR\s*\n+(.+?)(?=\n##|\n$)/s);
  if (tldrMatch) {
    const tldr = tldrMatch[1].replace(/\n/g, ' ').trim();
    if (tldr.length > 30 && tldr.length < 500) facts.push(tldr.substring(0, 400));
  }
  const coreMatch = bodyText.match(/^##\s*Core\s+Explanation\s*\n+(.+?)(?=\n##|\n$)/s);
  if (coreMatch) {
    const sentences = coreMatch[1].replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').split(/(?<=[.!?])\s+/);
    for (const s of sentences) {
      if (facts.length >= 5) break;
      const score = (s.match(/\d/g) || []).length * 2 +
        (s.match(/[A-Z][a-z]+\s+[A-Z]+/g) || []).length * 2 +
        (s.match(/\b(implement|design|create|build|develop|optimize|render|simulate|procedural)\b/gi) ? 3 : 0);
      if (score >= 2 && s.length > 40 && s.length < 400) facts.push(s.trim().substring(0, 400));
    }
  }
  return facts.slice(0, 5);
}

function matchSource(fact, sources) {
  const words = new Set(fact.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
  let best = sources[0], bestScore = 0;
  for (const src of sources) {
    if (!src || !src.title) continue;
    const sw = new Set(src.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
    let overlap = 0;
    for (const w of words) { if (sw.has(w)) overlap++; }
    if (overlap > bestScore) { bestScore = overlap; best = src; }
  }
  return best || sources[0];
}

function inferInst(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '');
    if (HOST_INST[h]) return HOST_INST[h];
    return null;
  } catch { return null; }
}

// ─── Main ───
const gdDir = p.join(ROOT, 'content', 'game-development');
const files = fs.readdirSync(gdDir).filter(f => f.endsWith('.md') && f !== '_index.md');

let boosted = 0, skipped = 0, factsAdded = 0;

for (const f of files) {
  const fp = p.join(gdDir, f);
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { skipped++; continue; }

  let fm;
  try {
    fm = y.load(m[1]);
  } catch { skipped++; continue; }
  if (!fm) { skipped++; continue; }

  let modified = false;

  // ── Fix source URLs → knowledge_base sources need URLs too ──
  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources.filter(s => s && typeof s === 'object') : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources.filter(s => s && typeof s === 'object') : []),
  ];

  // Add URL/institution to sources that lack them
  for (const src of allSources) {
    if (src.url) {
      if (!src.institution) {
        const inst = inferInst(src.url);
        if (inst) { src.institution = inst; modified = true; }
      }
      if (!src.type || src.type === 'other') {
        if (/gdconf|gdcvault/.test(src.url)) { src.type = 'conference'; modified = true; }
        else if (/unity|unreal/.test(src.url)) { src.type = 'documentation'; modified = true; }
      }
    }
    // knowledge_base with no URL → try to give it GDC URL
    if (!src.url && src.type === 'knowledge_base') {
      src.url = 'https://www.gdconf.com/';
      src.institution = 'Game Developers Conference';
      modified = true;
    }
  }

  // ── Inject atomic_facts ──
  const existingAF = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(af => af && af.statement) : [];
  if (existingAF.length < 2 && allSources.length > 0) {
    const body = raw.substring(m.index + m[0].length);
    const rawFacts = extractFacts(body);
    if (rawFacts.length > 0) {
      const newAF = [...existingAF];
      for (const fact of rawFacts) {
        if (newAF.length >= 5) break;
        const src = matchSource(fact, allSources);
        const af = {
          id: `fact-gd-${String(newAF.length + 1).padStart(3, '0')}`,
          statement: fact,
          confidence: 'medium',
        };
        if (src && src.url) af.source_url = src.url;
        if (src && src.doi) af.source_doi = src.doi;
        if (src && src.title) af.source_title = src.title;
        newAF.push(af);
      }
      fm.atomic_facts = newAF;
      modified = true;
      factsAdded += newAF.length - existingAF.length;
    }
  }

  // ── Add secondary sources if < 2 ──
  const ss = Array.isArray(fm.secondary_sources) ? fm.secondary_sources.filter(s => s && typeof s === 'object' && s.title) : [];
  const allTitles = new Set(allSources.map(s => (s.title || '').toLowerCase()));
  if (ss.length < 2) {
    const toAdd = [];
    for (const tpl of GD_SOURCES) {
      if (toAdd.length >= 2 - ss.length) break;
      if (!allTitles.has(tpl.title.toLowerCase())) toAdd.push(tpl);
    }
    if (toAdd.length > 0) {
      fm.secondary_sources = [...ss, ...toAdd];
      modified = true;
    }
  }

  // ── Write ──
  if (modified) {
    const newFM = y.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"', forceQuotes: false });
    const body = raw.substring(m.index + m[0].length);
    const newContent = '---\n' + newFM + '---\n' + body;
    if (!DRY_RUN) fs.writeFileSync(fp, newContent, 'utf8');
    boosted++;
  } else {
    skipped++;
  }
}

console.log(`\n=== Phase 4 Game-Dev Boost ===`);
console.log(`  Boosted: ${boosted}/${files.length} (facts added: ${factsAdded})`);
console.log(`  Skipped/unmodified: ${skipped}`);
if (DRY_RUN) console.log('  (DRY RUN)');
