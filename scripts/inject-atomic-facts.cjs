#!/usr/bin/env node
// Inject atomic_facts into articles by extracting verifiable statements
// from TL;DR, Core Explanation, and Detailed Analysis sections.
// Each fact maps to a primary or secondary source from the frontmatter.

const fs = require('fs'), path = require('path'), yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DIRS = ['ai', 'history', 'science', 'arts', 'business', 'health', 'computer-science', 'game-development'];
const DRY_RUN = process.argv.includes('--dry-run');

// ── Pattern matchers for candidate atomic facts ──
const FACT_PATTERNS = [
  // Years and date ranges
  { re: /\b(19[0-9]{2}|20[0-9]{2})(?:[–-](19[0-9]{2}|20[0-9]{2}))?\b/g, label: 'year' },
  // Numeric statistics: percentages, quantities, measures
  { re: /\b\d{1,3}[,.]?\d*\s*(%|percent|million|billion|trillion|times|parameters|citations|benchmarks|km|kg|°C|F1|layers|heads|days|years)\b/gi, label: 'statistic' },
  // Named entities with proper names or known entity types
  { re: /\b(?:[A-Z][a-z]+(?:\s+(?:of|the|and|in|for|at|by|to|with)\s+)?)+(?:Model|Architecture|Theorem|Effect|Theory|Principle|Framework|Network|System|Protocol|Law|Act|Treaty|War|Revolution|Empire|Dynasty|Algorithm|Corporation|University|Institute|Foundation|Accords|Doctrine|Convention|Paradigm|Movement|Protocol|Language|Platform|Engine)\b/g, label: 'entity' },
  // Any capitalized multi-word proper name (3+ words)
  { re: /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){2,}\b/g, label: 'proper_name' },
  // Discovery/introduction patterns
  { re: /\b(?:introduced|discovered|published|proposed|demonstrated|established|founded|achieved|invented|created|launched|released|announced|described|developed|designed|pioneered|authored|patented|debuted)\s+(?:by|in|at|on|the|as)\b/gi, label: 'discovery' },
  // First/largest/most patterns
  { re: /\b(?:first|largest|most|biggest|smallest|earliest|oldest|newest|fastest|primary|leading|dominant|premier)\s+\w+/gi, label: 'superlative' },
  // Quantitative comparisons
  { re: /\b(?:more than|less than|larger|smaller|faster|slower|outperforms|compared to|versus|vs\.|exceeds|surpasses|rivals)\b/gi, label: 'comparison' },
  // Definition patterns (X is a/the Y)
  { re: /\b(?:is an? |are |refers to |defined as |consists of |comprises )[\w\s-]+(?:that|which|used for|that provides|designed to|responsible for)/gi, label: 'definition' },
];

// ── Source matching helpers ──
function matchSource(factSentence, sources) {
  // Score each source by keyword overlap with the fact
  const factWords = new Set(factSentence.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2));
  
  let bestSource = null, bestScore = 0;
  for (const src of sources) {
    if (typeof src !== 'object' || !src.title) continue;
    const srcWords = new Set(src.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2));
    let overlap = 0;
    for (const w of factWords) { if (srcWords.has(w)) overlap++; }
    if (overlap > bestScore) { bestScore = overlap; bestSource = src; }
  }
  
  // If no good match, fallback to first source with URL/DOI
  if (!bestSource || bestScore < 2) {
    bestSource = sources.find(s => typeof s === 'object' && (s.url || s.doi));
  }
  
  return bestSource;
}

function getSourceConfidence(source) {
  if (!source) return 'medium';
  const tier = (source.type || '').toLowerCase();
  if (tier === 'academic_paper' || tier === 'paper') return 'high';
  if (tier === 'book' || tier === 'textbook') return 'high';
  if (tier === 'report' || tier === 'documentation') return 'medium';
  return 'medium';
}

// ── Article body parsing ──
function extractSections(body) {
  const sections = {};
  let currentSection = '_preamble';
  let currentContent = [];
  
  for (const line of body.split('\n')) {
    const hMatch = line.match(/^##+\s+(.+)/);
    if (hMatch) {
      if (currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n');
      }
      currentSection = hMatch[1].toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  if (currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n');
  }
  return sections;
}

function extractSentences(text) {
  if (!text) return [];
  // Clean up and split by sentence boundaries
  return text
    .replace(/\([^)]*\)/g, ' ')             // Remove parentheticals
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert markdown links to text
    .replace(/[*_~`#>]/g, '')                // Remove formatting
    .replace(/\|\s*[-:]+\s*\|/g, '')         // Remove table separators
    .replace(/\|[^|]+\|/g, '')               // Remove table rows
    .split(/[.!?]\s+/)                        // Split by sentence endings
    .map(s => s.replace(/\s+/g, ' ').replace(/^\s*-\s*/, '').trim())
    .filter(s => s.length > 15 && s.length < 500)
    .filter(s => /[a-zA-Z]{3,}/.test(s));    // Must contain at least 3+ letter word
}

function scoreFact(sentence) {
  let score = 0;
  for (const { re, label } of FACT_PATTERNS) {
    const matches = sentence.match(re) || [];
    if (matches.length > 0) score += matches.length;
  }
  return score;
}

function isQualifyingFact(sentence) {
  // Must not be meta/commentary
  const metaPatterns = [
    /^(?:Note|It is important|This |These |The following|Below|As of)/i,
    /^For (?:example|instance|comparison|more)/i,
    /^(?:See |Refer to |For details)/i,
    /^Content verified|^Citations? (?:cross-)?referenced/i,
    /^This (?:article|document|guide|section)/i,
    /^(?:In |At )?(?:conclusion|summary|essence|short|brief|other words)/i,
  ];
  
  if (metaPatterns.some(p => p.test(sentence))) return false;
  
  // Require at least 1 qualifying pattern (lowered from 2)
  let patternMatches = 0;
  for (const { re } of FACT_PATTERNS) {
    if (re.test(sentence)) patternMatches++;
  }
  return patternMatches >= 1;
}

// ── Main injection logic ──
function injectAtomicFacts(frontmatter, body, rel) {
  const fm = yaml.load(frontmatter
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2'));
  
  // Skip if already has atomic_facts
  if (fm.atomic_facts && Array.isArray(fm.atomic_facts) && fm.atomic_facts.length > 0) {
    return null;
  }
  
  // Parse body sections
  const sections = extractSections(body);
  const tlDr = sections['tl-dr'] || sections['tldr'] || '';
  const core = sections['core-explanation'] || sections['core explanation'] || '';
  const detailed = sections['detailed-analysis'] || sections['detailed analysis'] || '';
  
  // Gather all sources
  const allSources = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : []),
  ].filter(s => typeof s === 'object');
  
  if (allSources.length === 0) return null;
  
  // Extract candidate facts
  const tlDrSentences = extractSentences(tlDr);
  const coreSentences = extractSentences(core);
  const detailedSentences = extractSentences(detailed);
  
  const candidates = [
    ...tlDrSentences.map(s => ({ sentence: s, priority: 3 })),
    ...coreSentences.map(s => ({ sentence: s, priority: 2 })),
    ...detailedSentences.map(s => ({ sentence: s, priority: 1 })),
  ];
  
  // Score and filter
  const qualified = candidates
    .filter(c => isQualifyingFact(c.sentence))
    .map(c => ({
      ...c,
      score: scoreFact(c.sentence) + c.priority,
    }))
    .sort((a, b) => b.score - a.score);
  
  if (qualified.length === 0) return null;
  
  // Generate atomic facts (top 3)
  const domain = (fm.category || rel.split('/')[0]).replace(/\s+/g, '-');
  const facts = qualified.slice(0, 3).map((c, i) => {
    const source = matchSource(c.sentence, allSources);
    const factId = `fact-${domain}-${String(i + 1).padStart(2, '0')}`;
    return {
      id: factId,
      statement: c.sentence,
      source_title: source ? (source.title || 'Untitled') : 'Unknown',
      source_url: source && source.url ? source.url : undefined,
      source_doi: source && source.doi ? source.doi : undefined,
      confidence: getSourceConfidence(source),
    };
  }).filter(f => f.statement && f.statement.length > 10);
  
  if (facts.length === 0) return null;
  
  // Find insertion point in frontmatter (after last source entry, before completeness)
  const fmLines = frontmatter.split('\n');
  
  // Find the line after all sources
  let insertAfter = fmLines.length - 1;
  
  // Look for completeness, known_gaps, related_entities, ai_citations
  const boundaryKeys = ['completeness:', 'known_gaps:', 'related_entities:', 'ai_citations:'];
  for (const key of boundaryKeys) {
    const idx = fmLines.findIndex(l => l.trimStart().startsWith(key));
    if (idx >= 0) {
      insertAfter = idx - 1;
      break;
    }
  }
  
  // Look for the end of secondary_sources or primary_sources
  if (insertAfter >= fmLines.length - 2) {
    for (let i = fmLines.length - 1; i >= 0; i--) {
      if (/^  (?:-|\w)/.test(fmLines[i]) && i + 1 < fmLines.length && fmLines[i + 1].trim() === '') {
        insertAfter = i;
        break;
      }
    }
  }
  
  // Build YAML array
  const yamlFacts = yaml.dump(facts, { indent: 2, lineWidth: 120, quotingType: '"' });
  const indentedFacts = yamlFacts.split('\n').map(l => '  ' + l).join('\n');
  
  const newLines = [
    ...fmLines.slice(0, insertAfter + 1),
    'atomic_facts:',
    ...yamlFacts.split('\n').map(l => '  ' + l),
    ...fmLines.slice(insertAfter + 1),
  ];
  
  return newLines.join('\n');
}

// ── Main ──
let stats = { total: 0, injected: 0, skipped: 0, noSources: 0, noQualifying: 0 };
let details = [];

for (const d of DIRS) {
  const dir = path.join(CONTENT_DIR, d);
  if (!fs.existsSync(dir)) continue;
  
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_'))) {
    stats.total++;
    const rel = d + '/' + f;
    const rawContent = fs.readFileSync(path.join(dir, f), 'utf8');
    
    const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) { stats.skipped++; continue; }
    
    const frontmatter = match[1];
    const body = rawContent.slice(match.index + match[0].length);
    
    const newFm = injectAtomicFacts(frontmatter, body, rel);
    
    if (newFm === null) {
      stats.skipped++;
      // Quick check: already has atomic_facts?
      try {
        const fm = yaml.load(frontmatter.replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2'));
        if (!fm.atomic_facts || fm.atomic_facts.length === 0) {
          if (!fm.primary_sources && !fm.secondary_sources) stats.noSources++;
          else stats.noQualifying++;
        }
      } catch(e) { stats.skipped++; }
      continue;
    }
    
    stats.injected++;
    const newContent = `---\n${newFm}\n---${body}`;
    
    if (DRY_RUN) {
      // Parse facts for reporting
      try {
        const fm = yaml.load(newFm.replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2'));
        const facts = fm.atomic_facts || [];
        details.push({ rel, count: facts.length, facts: facts.map(f => f.statement.substring(0, 60)) });
      } catch(e) {}
    } else {
      fs.writeFileSync(path.join(dir, f), newContent, 'utf8');
    }
  }
}

if (DRY_RUN) {
  console.log(`\n=== DRY RUN ===`);
  details.slice(0, 15).forEach(d => {
    console.log(`\n${d.rel} (${d.count} facts):`);
    d.facts.forEach(f => console.log(`  • ${f}...`));
  });
  if (details.length > 15) console.log(`\n... and ${details.length - 15} more`);
}

console.log(`\n=== Summary ===`);
console.log(`Total articles: ${stats.total}`);
console.log(`Injected atomic_facts: ${stats.injected}`);
console.log(`Skipped (existing/has atomic_facts/already complete): ${stats.skipped}`);
console.log(`No qualifying facts found: ${stats.noQualifying}`);
console.log(`No sources: ${stats.noSources}`);
