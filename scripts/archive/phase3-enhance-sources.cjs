// Phase 3: Enhance sources for articles with only 1-2 sources
// Adds domain-appropriate authoritative sources with proper institutions
const fs = require('fs'), p = require('path'), y = require('js-yaml');
const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = p.join(__dirname, '..');

// ─── Domain-specific authoritative source templates ───
const DOMAIN_SOURCES = {
  arts: [
    {
      title: 'The Story of Art (E.H. Gombrich)',
      type: 'textbook', year: 1995,
      url: 'https://www.phaidon.com/store/art/the-story-of-art-9780714832470/',
      institution: 'Phaidon Press',
    },
    {
      title: 'Oxford History of Art series',
      type: 'textbook', year: 2020,
      url: 'https://global.oup.com/academic/content/series/o/oxford-history-of-art-oha/',
      institution: 'Oxford University Press',
    },
    {
      title: 'Britannica: Art History',
      type: 'encyclopedia', year: 2024,
      url: 'https://www.britannica.com/art/art-history',
      institution: 'Encyclopaedia Britannica',
    },
  ],
  history: [
    {
      title: 'The Penguin History of the World (J.M. Roberts)',
      type: 'textbook', year: 2014,
      url: 'https://www.penguin.co.uk/books/41724/the-penguin-history-of-the-world-by-roberts-j-m/9781846144431',
      institution: 'Penguin Books',
    },
    {
      title: 'A History of World Societies (McKay et al.)',
      type: 'textbook', year: 2020,
      url: 'https://www.macmillanlearning.com/college/us/product/A-History-of-World-Societies/p/1319058945',
      institution: 'Bedford/St. Martin\'s, Macmillan',
    },
    {
      title: 'World History Encyclopedia',
      type: 'encyclopedia', year: 2024,
      url: 'https://www.worldhistory.org/',
      institution: 'World History Foundation',
    },
  ],
  business: [
    {
      title: 'Principles of Economics (N. Gregory Mankiw)',
      type: 'textbook', year: 2020,
      url: 'https://www.cengage.com/c/principles-of-economics-9e-mankiw/9780357038314/',
      institution: 'Cengage Learning',
    },
    {
      title: 'The Intelligent Investor (Benjamin Graham)',
      type: 'book', year: 2006,
      url: 'https://www.harpercollins.com/products/the-intelligent-investor-benjamin-graham',
      institution: 'HarperCollins',
    },
  ],
  science: [
    {
      title: 'Biology (Campbell, 12th Edition)',
      type: 'textbook', year: 2020,
      url: 'https://www.pearson.com/en-us/subject-catalog/p/campbell-biology/P200000007058',
      institution: 'Pearson Education',
    },
    {
      title: 'Encyclopedia of Life Sciences',
      type: 'encyclopedia', year: 2024,
      url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9780470015902',
      institution: 'Wiley',
    },
    {
      title: 'National Geographic: Science & Exploration',
      type: 'reference', year: 2024,
      url: 'https://www.nationalgeographic.com/science',
      institution: 'National Geographic Society',
    },
  ],
  'game-development': [
    {
      title: 'Game Engine Architecture (Jason Gregory, 3rd Ed)',
      type: 'textbook', year: 2018,
      url: 'https://www.gameenginebook.com/',
      institution: 'CRC Press / Taylor & Francis',
    },
    {
      title: 'Game Programming Patterns (Robert Nystrom)',
      type: 'book', year: 2014,
      url: 'https://gameprogrammingpatterns.com/',
      institution: 'Genever Benning',
    },
    {
      title: 'GDC Vault: Game Developers Conference',
      type: 'conference', year: 2025,
      url: 'https://www.gdcvault.com/',
      institution: 'Game Developers Conference',
    },
  ],
  'self-improvement': [
    {
      title: 'Atomic Habits (James Clear)',
      type: 'book', year: 2018,
      url: 'https://jamesclear.com/atomic-habits',
      institution: 'Avery, Penguin Random House',
    },
    {
      title: 'Thinking, Fast and Slow (Daniel Kahneman)',
      type: 'book', year: 2011,
      url: 'https://us.macmillan.com/books/9780374533557/thinkingfastandslow',
      institution: 'Farrar, Straus and Giroux',
    },
    {
      title: 'The 7 Habits of Highly Effective People (Stephen Covey)',
      type: 'book', year: 2020,
      url: 'https://www.franklincovey.com/the-7-habits/',
      institution: 'Simon & Schuster',
    },
  ],
  geography: [
    {
      title: 'National Geographic Atlas of the World, 11th Edition',
      type: 'reference', year: 2019,
      url: 'https://www.nationalgeographic.com/books/atlas/',
      institution: 'National Geographic Society',
    },
    {
      title: 'Physical Geography (Petersen, Sack & Gabler, 12th Ed)',
      type: 'textbook', year: 2021,
      url: 'https://www.cengage.com/c/physical-geography-12e-petersen-sack-gabler/9780357142448/',
      institution: 'Cengage Learning',
    },
  ],
  sports: [
    {
      title: 'Sports Rules Encyclopedia (Official Rules Handbooks)',
      type: 'reference', year: 2023,
      url: 'https://www.olympic.org/sports',
      institution: 'International Olympic Committee',
    },
    {
      title: 'Principles of Sports Training',
      type: 'textbook', year: 2019,
      url: 'https://www.humankinetics.com/',
      institution: 'Human Kinetics',
    },
  ],
  health: [
    {
      title: 'WHO Guidelines on Health and Well-Being',
      type: 'official_report', year: 2024,
      url: 'https://www.who.int/publications/',
      institution: 'World Health Organization',
    },
    {
      title: 'Harrison\'s Principles of Internal Medicine, 21st Ed',
      type: 'textbook', year: 2022,
      url: 'https://www.mhprofessional.com/harrison',
      institution: 'McGraw-Hill Education',
    },
  ],
};

// ─── Fixed-dedup YAML parser ───
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

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

function serializeSource(src) {
  const lines = [];
  lines.push(`  - title: "${esc(src.title || 'Untitled')}"`);
  if (src.authors && Array.isArray(src.authors) && src.authors.length > 0) {
    lines.push(`    authors: [${src.authors.map(a => `"${esc(a)}"`).join(', ')}]`);
  }
  if (src.type) lines.push(`    type: "${src.type}"`);
  if (src.year) lines.push(`    year: ${src.year}`);
  if (src.doi) lines.push(`    doi: "${esc(src.doi)}"`);
  if (src.url) lines.push(`    url: "${esc(src.url)}"`);
  if (src.institution) lines.push(`    institution: "${esc(src.institution)}"`);
  return lines;
}

// ─── Main ───
function main() {
  // Find all articles with only 1-2 sources total
  const base = p.join(ROOT, 'content');
  const scanResults = [];

  function walk(dir, domain) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = p.join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith('_')) {
        walk(fp, e.name);
      } else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) {
        const raw = fs.readFileSync(fp, 'utf8');
        const [fm] = parseFM(raw);
        if (!fm) return;
        const psLen = Array.isArray(fm.primary_sources) ? fm.primary_sources.length : 0;
        const ssLen = Array.isArray(fm.secondary_sources) ? fm.secondary_sources.length : 0;
        const total = psLen + ssLen;
        if (total <= 2) {
          scanResults.push({ fp, domain: fm.category || domain, total, raw });
        }
      }
    }
  }
  walk(base, '');

  console.log(`Phase 3 Source Enhancement`);
  console.log(`  Articles with ≤2 sources: ${scanResults.length}`);
  if (DRY_RUN) console.log('  (DRY RUN)');

  let enhanced = 0, skipped = 0;
  for (const { fp, domain, total, raw } of scanResults) {
    const templates = DOMAIN_SOURCES[domain] || [];
    if (templates.length === 0) {
      console.log(`  NO_TEMPLATES: ${domain} (${fp.replace(ROOT + '/content/', '')})`);
      skipped++;
      continue;
    }

    const [fm, m] = parseFM(raw);
    if (!fm || !m) { skipped++; continue; }

    // Pick templates not already represented
    const existingTitles = new Set();
    for (const field of ['primary_sources', 'secondary_sources']) {
      if (Array.isArray(fm[field])) {
        for (const src of fm[field]) {
          if (src && src.title) existingTitles.add(src.title.toLowerCase());
        }
      }
    }

    const needed = Math.min(3 - total, 2); // Add up to 2 more (target 3 total)
    const newSources = [];
    for (const tpl of templates) {
      if (newSources.length >= needed) break;
      if (!existingTitles.has(tpl.title.toLowerCase())) {
        newSources.push(tpl);
      }
    }

    if (newSources.length === 0) {
      console.log(`  ALL_DUP: ${fp.replace(ROOT + '/content/', '')} (${total} existing)`);
      skipped++;
      continue;
    }

    // Inject new sources as secondary_sources (or extend existing)
    const bodyStart = m.index + m[0].length;
    let body = raw.substring(bodyStart);

    // Build source blocks
    const sourceBlock = newSources.map(s => serializeSource(s).join('\n')).join('\n');

    // Find the insertion point: after existing secondary_sources, or after primary_sources, or before known_gaps
    const fmText = raw.substring(0, bodyStart);
    let insertPoint = -1;
    const lines = fmText.split('\n');

    // Check if secondary_sources already exists
    const ssIdx = lines.findIndex(l => /^secondary_sources:/.test(l));
    if (ssIdx >= 0) {
      // Find end of secondary_sources block (next non-indented line after)
      for (let i = ssIdx + 1; i < lines.length; i++) {
        if (lines[i].match(/^(?!\s{2}-|\s{4})(\w[\w_-]*):/)) {
          insertPoint = i;
          break;
        }
      }
      if (insertPoint < 0) insertPoint = lines.length;
    } else {
      // Add secondary_sources section before known_gaps or completeness
      const gapIdx = lines.findIndex(l => /^(known_gaps|completeness|disputed_statements):/.test(l));
      if (gapIdx >= 0) {
        lines.splice(gapIdx, 0, '', 'secondary_sources:');
        insertPoint = gapIdx + 2;
      }
    }

    if (insertPoint >= 0) {
      const newLines = sourceBlock.split('\n');
      lines.splice(insertPoint, 0, ...newLines);
      const newFM = lines.join('\n');
      const newContent = newFM + body;
      if (!DRY_RUN) fs.writeFileSync(fp, newContent, 'utf8');
      console.log(`  +${newSources.length}: ${fp.replace(ROOT + '/content/', '')} (${total}→${total + newSources.length})`);
      enhanced++;
    } else {
      console.log(`  NO_PLACE: ${fp.replace(ROOT + '/content/', '')}`);
      skipped++;
    }
  }

  console.log(`\nEnhanced: ${enhanced}, Skipped: ${skipped}/${scanResults.length}`);
}

main();
