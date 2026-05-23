// Manual fix for 3 stubborn YAML files + Rust book removal
const fs = require('fs'), p = require('path');

const ROOT = p.join(__dirname, '..', 'content');

// Fix productivity-systems: remove Rust book, fix ai_citations, fix indentation
(function fixProductivity() {
  const fp = p.join(ROOT, 'self-improvement', 'productivity-systems.md');
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { console.log('  NO FM: productivity-systems'); return; }

  const lines = raw.split('\n');
  const fmEndIdx = lines.findIndex((l, i) => i > 0 && l.trim() === '---' && i > 2);

  // Extract frontmatter and body
  const fmLines = lines.slice(1, fmEndIdx);
  const bodyLines = lines.slice(fmEndIdx + 1);

  // Rebuild frontmatter
  const newFM = [
    'id: "kb-2026-00382"',
    'title: "Productivity Systems"',
    'schema_type: "TechArticle"',
    'category: "self-improvement"',
    'language: "en"',
    'confidence: "high"',
    'last_verified: "2026-05-22"',
    'generation_method: "ai_assisted"',
    'ai_models: ["claude-opus"]',
    'derived_from_human_seed: true',
    'primary_sources:',
    '  - title: "Getting Things Done (David Allen)"',
    '    type: "book"',
    '    year: 2001',
    '    url: "https://gettingthingsdone.com/"',
    '    institution: "Penguin"',
    // REMOVE the Rust book entirely — it's cross-domain pollution
    'secondary_sources:',
    '  - title: "Deep Work: Rules for Focused Success in a Distracted World"',
    '    type: "book"',
    '    year: 2016',
    '    url: "https://www.hachettebookgroup.com/titles/cal-newport/deep-work/9781455586691/"',
    '    institution: "Cal Newport, Grand Central"',
    'completeness: 0.88',
    'known_gaps:',
    '  - "Statistics and data cited are from 2020 and earlier; more recent data may have become available since publication"',
    '  - "Productivity methodologies are highly individual; what works for one person may not work for another"',
    'disputed_statements:',
    '  - statement: "The effectiveness of time management and productivity techniques varies significantly by individual and context; no single system is universally optimal"',
    '    context: "See primary sources for competing approaches"',
    'ai_citations:',
    '  - title: "Atomic Habits (James Clear)"',
    '    type: "book"',
    '    year: 2018',
    '    institution: "Avery, Penguin Random House"',
    '',
  ];

  const newContent = '---\n' + newFM.join('\n') + '---\n' + bodyLines.join('\n');
  fs.writeFileSync(fp, newContent, 'utf8');
  console.log('  Fixed: self-improvement/productivity-systems.md (removed Rust book, fixed YAML)');
})();

// Fix geography/arctic-and-antarctic.md
(function fixArctic() {
  const fp = p.join(ROOT, 'geography', 'arctic-and-antarctic.md');
  const raw = fs.readFileSync(fp, 'utf8');
  // Already partially fixed, just verify
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (m) {
    // Check for squashed keys still
    const fm = m[1];
    let newFM = fm
      .replace(/^(\s{2}-\s+title):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}type):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}year):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}url):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}institution):(\S)/gm, '$1: $2');
    if (newFM !== fm) {
      const newRaw = raw.replace(m[1], newFM);
      fs.writeFileSync(fp, newRaw, 'utf8');
      console.log('  Fixed: geography/arctic-and-antarctic.md');
    } else {
      console.log('  Already OK: geography/arctic-and-antarctic.md');
    }
  }
})();

// Fix geography/asian-geography.md
(function fixAsian() {
  const fp = p.join(ROOT, 'geography', 'asian-geography.md');
  const raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (m) {
    const fm = m[1];
    let newFM = fm
      .replace(/^(\s{2}-\s+title):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}type):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}year):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}url):(\S)/gm, '$1: $2')
      .replace(/^(\s{4}institution):(\S)/gm, '$1: $2');
    if (newFM !== fm) {
      const newRaw = raw.replace(m[1], newFM);
      fs.writeFileSync(fp, newRaw, 'utf8');
      console.log('  Fixed: geography/asian-geography.md');
    } else {
      console.log('  Already OK: geography/asian-geography.md');
    }
  }
})();
