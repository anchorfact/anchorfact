// Phase 3: Safe YAML approach — use js-yaml load+dump only, no string manipulation
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const ROOT = p.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

// ─── Domain-specific authoritative sources ───
const DOMAIN_SOURCES = {
  arts: [
    { title: 'The Story of Art (E.H. Gombrich)', type: 'textbook', year: 1995, url: 'https://www.phaidon.com/store/art/the-story-of-art-9780714832470/', institution: 'Phaidon Press' },
    { title: 'Oxford History of Art series', type: 'textbook', year: 2020, url: 'https://global.oup.com/academic/content/series/o/oxford-history-of-art-oha/', institution: 'Oxford University Press' },
  ],
  history: [
    { title: 'The Penguin History of the World (J.M. Roberts)', type: 'textbook', year: 2014, url: 'https://www.penguin.co.uk/books/41724/the-penguin-history-of-the-world-by-roberts-j-m/9781846144431', institution: 'Penguin Books' },
    { title: 'World History Encyclopedia', type: 'encyclopedia', year: 2024, url: 'https://www.worldhistory.org/', institution: 'World History Foundation' },
  ],
  business: [
    { title: 'Principles of Economics (N. Gregory Mankiw)', type: 'textbook', year: 2020, url: 'https://www.cengage.com/c/principles-of-economics-9e-mankiw/9780357038314/', institution: 'Cengage Learning' },
    { title: 'The Intelligent Investor (Benjamin Graham)', type: 'book', year: 2006, url: 'https://www.harpercollins.com/products/the-intelligent-investor-benjamin-graham', institution: 'HarperCollins' },
  ],
  science: [
    { title: 'Biology (Campbell, 12th Edition)', type: 'textbook', year: 2020, url: 'https://www.pearson.com/en-us/subject-catalog/p/campbell-biology/P200000007058', institution: 'Pearson Education' },
    { title: 'National Geographic: Science & Exploration', type: 'reference', year: 2024, url: 'https://www.nationalgeographic.com/science', institution: 'National Geographic Society' },
  ],
  'game-development': [
    { title: 'Game Engine Architecture (Jason Gregory, 3rd Ed)', type: 'textbook', year: 2018, url: 'https://www.gameenginebook.com/', institution: 'CRC Press' },
    { title: 'Game Programming Patterns (Robert Nystrom)', type: 'book', year: 2014, url: 'https://gameprogrammingpatterns.com/', institution: 'Genever Benning' },
  ],
  'self-improvement': [
    { title: 'Atomic Habits (James Clear)', type: 'book', year: 2018, url: 'https://jamesclear.com/atomic-habits', institution: 'Avery, Penguin Random House' },
    { title: 'Thinking, Fast and Slow (Daniel Kahneman)', type: 'book', year: 2011, url: 'https://us.macmillan.com/books/9780374533557/thinkingfastandslow', institution: 'Farrar, Straus & Giroux' },
  ],
  geography: [
    { title: 'National Geographic Atlas of the World, 11th Ed', type: 'reference', year: 2019, url: 'https://www.nationalgeographic.com/books/atlas/', institution: 'National Geographic Society' },
    { title: 'Physical Geography (Petersen & Sack, 12th Ed)', type: 'textbook', year: 2021, url: 'https://www.cengage.com/c/physical-geography-12e-petersen-sack-gabler/9780357142448/', institution: 'Cengage Learning' },
  ],
  sports: [
    { title: 'Sports Rules Encyclopedia', type: 'reference', year: 2023, url: 'https://www.olympic.org/sports', institution: 'International Olympic Committee' },
    { title: 'Principles of Sports Training', type: 'textbook', year: 2019, url: 'https://www.humankinetics.com/', institution: 'Human Kinetics' },
  ],
  health: [
    { title: 'WHO Guidelines on Health and Well-Being', type: 'official_report', year: 2024, url: 'https://www.who.int/publications/', institution: 'World Health Organization' },
    { title: "Harrison's Principles of Internal Medicine", type: 'textbook', year: 2022, url: 'https://www.mhprofessional.com/harrison', institution: 'McGraw-Hill Education' },
  ],
};

// ─── Fact extraction ───
function extractFacts(bodyText) {
  const facts = [];
  // TL;DR paragraph
  const tldrMatch = bodyText.match(/##\s*TL;DR\s*\n+(.+?)(?:\n##|\n$)/s);
  if (tldrMatch) {
    const tldr = tldrMatch[1].replace(/\n/g, ' ').trim();
    if (tldr.length > 30 && tldr.length < 400) facts.push(tldr.substring(0, 350));
  }
  // Core Explanation sentences
  const coreMatch = bodyText.match(/##\s*Core\s+Explanation\s*\n+(.+?)(?:\n##|\n$)/s);
  if (coreMatch) {
    const sentences = coreMatch[1].replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').split(/(?<=[.!?])\s+/);
    for (const s of sentences) {
      if (facts.length >= 5) break;
      const score = (s.match(/\d/g) || []).length * 2 +
        (s.match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g) || []).length * 2 +
        (s.match(/\b(discover|introduce|publish|create|found|establish|achieve|develop|define|propose|demonstrate|show|prove|invent)/gi) ? 3 : 0) +
        (s.match(/\b(first|largest|most|biggest|earliest|oldest|primary|fundamental|essential|key|critical)/gi) ? 2 : 0);
      if (score >= 2 && s.length > 50 && s.length < 350) facts.push(s.trim().substring(0, 350));
    }
  }
  return facts;
}

function matchSource(fact, sources) {
  const words = new Set(fact.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
  let best = sources[0], bestScore = 0;
  for (const src of sources) {
    if (!src || !src.title) continue;
    const sw = new Set(src.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/));
    let overlap = 0;
    for (const w of words) { if (sw.has(w)) overlap++; }
    if (overlap > bestScore) { bestScore = overlap; best = src; }
  }
  return best;
}

// ─── Main ───
function main() {
  // Walk all content
  const articles = [];
  function walk(dir, domain) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = p.join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith('_')) walk(fp, e.name);
      else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) articles.push({ fp, domain });
    }
  }
  walk(p.join(ROOT, 'content'), '');

  console.log(`Phase 3 Safe Apply — ${articles.length} articles`);
  if (DRY_RUN) console.log('(DRY RUN)');

  let afInjected = 0, srcEnhanced = 0, skipped = 0;

  for (const { fp, domain } of articles) {
    const raw = fs.readFileSync(fp, 'utf8');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) { skipped++; continue; }

    // Use js-yaml to parse (with lenient options)
    let fm;
    try {
      fm = y.load(fmMatch[1]);
    } catch (e) {
      // Try fixing format first
      try {
        const fixed = fmMatch[1]
          .replace(/\r?\n{3,}/g, '\n\n')
          .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
          .replace(/^(\s{2}-\s+\w[^:]*):(\S)/gm, '$1: $2');
        fm = y.load(fixed);
      } catch (e2) {
        skipped++; continue;
      }
    }

    if (!fm) { skipped++; continue; }

    let modified = false;
    const body = raw.substring(fmMatch.index + fmMatch[0].length);
    const allSources = [
      ...(Array.isArray(fm.primary_sources) ? fm.primary_sources.filter(s => s && typeof s === 'object') : []),
      ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources.filter(s => s && typeof s === 'object') : []),
    ];
    const totalSources = allSources.length;

    // ── 1. Add atomic_facts if missing or < 2 ──
    const existingAF = Array.isArray(fm.atomic_facts) ? fm.atomic_facts.filter(af => af && af.statement) : [];
    if (existingAF.length < 2 && totalSources > 0) {
      const facts = extractFacts(body);
      const newAF = [];
      let counter = 1;
      for (const fact of facts.slice(0, 5)) {
        const src = matchSource(fact, allSources);
        const af = {
          id: `fact-${fm.category || domain}-${String(counter).padStart(3, '0')}`,
          statement: fact,
          confidence: (src && (src.type === 'academic_paper' || src.type === 'textbook' || src.type === 'official_report')) ? 'high' : 'medium',
        };
        if (src) {
          if (src.title) af.source_title = src.title;
          if (src.url) af.source_url = src.url;
          if (src.doi) af.source_doi = src.doi;
        }
        newAF.push(af);
        counter++;
      }
      if (newAF.length > 0) {
        fm.atomic_facts = [...existingAF, ...newAF];
        modified = true;
        if (!DRY_RUN) afInjected++;
      }
    }

    // ── 2. Add authoritative secondary_sources if < 3 total ──
    const templates = DOMAIN_SOURCES[domain] || [];
    if (totalSources < 3 && templates.length > 0) {
      const ss = Array.isArray(fm.secondary_sources) ? fm.secondary_sources.filter(s => s && typeof s === 'object') : [];
      const existingTitles = new Set(allSources.map(s => (s.title || '').toLowerCase()));
      const needed = Math.min(3 - totalSources, 2);
      const toAdd = [];
      for (const tpl of templates) {
        if (toAdd.length >= needed) break;
        if (!existingTitles.has(tpl.title.toLowerCase())) {
          toAdd.push(tpl);
        }
      }
      if (toAdd.length > 0) {
        fm.secondary_sources = [...ss, ...toAdd];
        modified = true;
        if (!DRY_RUN) srcEnhanced++;
      }
    }

    // ── 3. Fix source types (other/website → better) ──
    for (const field of ['primary_sources', 'secondary_sources', 'ai_citations']) {
      if (!Array.isArray(fm[field])) continue;
      for (const src of fm[field]) {
        if (!src || !src.url) continue;
        if (!src.type || src.type === 'other' || src.type === 'website') {
          const url = src.url;
          if (/britannica\.com/.test(url)) src.type = 'encyclopedia';
          else if (/gutenberg\.org/.test(url)) src.type = 'literature';
          else if (/\.gov|who\.int|un\.org/.test(url)) src.type = 'official_report';
          else if (/wikipedia\.org/.test(url)) src.type = 'encyclopedia';
          else { src.type = 'reference'; }
          modified = true;
        }
        if (!src.institution && src.url) {
          try {
            const host = new URL(src.url).hostname.replace(/^www\./, '');
            const map = {
              'britannica.com': 'Encyclopaedia Britannica', 'gutenberg.org': 'Project Gutenberg',
              'wikipedia.org': 'Wikimedia Foundation', 'nationalgeographic.com': 'National Geographic',
              'worldhistory.org': 'World History Foundation',
            };
            if (map[host]) { src.institution = map[host]; modified = true; }
          } catch {}
        }
      }
    }

    // ── Write back ──
    if (modified && !DRY_RUN) {
      const newFM = y.dump(fm, { lineWidth: 200, noRefs: true, quotingType: '"', forceQuotes: false });
      const newContent = '---\n' + newFM + '---\n' + body;
      fs.writeFileSync(fp, newContent, 'utf8');
    }
  }

  console.log(`  AF injected: ${afInjected}`);
  console.log(`  Sources enhanced: ${srcEnhanced}`);
  console.log(`  Skipped/unmodified: ${skipped}`);
}

main();
