#!/usr/bin/env node
/**
 * AnchorFact Quality Scoring Engine
 *
 * Computes a 0-100 quality score per article across 4 dimensions,
 * implementing the comprehensive quality assessment standard.
 *
 * Dimensions:
 *   D1: Technical Foundation  (max 30 points)
 *   D2: Content Quality       (max 30 points)
 *   D3: Source Authority      (max 25 points)
 *   D4: Assessment Readiness  (max 15 points)
 *
 * Usage:
 *   node scripts/quality-score.cjs                  # score all articles
 *   node scripts/quality-score.cjs --json           # JSON output
 *   node scripts/quality-score.cjs --report         # full report
 *   node scripts/quality-score.cjs --domain ai      # single domain
 *   node scripts/quality-score.cjs --compare HEAD~1 # vs prev commit
 *
 * Exit: 0 = pass (avg ≥ 70), 1 = warning (avg ≥ 60), 2 = fail
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const NOW = new Date();

// ─── Source Tier Weights ────────────────────────────────────────
const SOURCE_TIER_SCORE = {
  'academic_paper':         10,  // S: peer-reviewed
  'peer_reviewed':          10,
  'journal':                 9,  // Journal publication (near-academic)
  'conference':              9,  // Conference proceedings
  'survey_paper':           10,  // Literature survey / review
  'textbook':                8,  // A: authoritative textbook
  'reference':               7,  // Reference work
  'literature':              7,  // Classic literature (primary source)
  'knowledge_base':          5,  // Curated knowledge base
  'official_report':         7,  // B: government/org report
  'technical_report':        7,
  'report':                  6,  // Generic report
  'standard':                8,  // Industry standard (IETF, ISO, etc.)
  'rulebook':                7,  // Official rules / regulations
  'course_material':         6,  // University course
  'official_documentation':  7,
  'documentation':           6,
  'repository':              5,  // Code repository / data source
  'database':                5,  // Structured database
  'data_source':             5,
  'technical_book':          8,
  'book':                    6,
  'paper':                  10,  // Alias for academic_paper (phase3-7 fix scripts handle this)
  'preprint':               10,  // arXiv / preprint servers
  'thesis':                 10,  // PhD/Master thesis
  'dissertation':           10,  // Doctoral dissertation
  'patent':                  8,  // Granted patent
  'whitepaper':              7,  // Industry whitepaper
  'book_chapter':            6,  // Chapter in edited volume
  'specification':           8,  // Technical specification
  'manual':                  6,  // User/technical manual
  'benchmark':               6,  // Benchmark dataset/paper
  'framework':               5,  // Software framework
  'blog_post':               4,  // C: personal/company blog
  'tutorial':                4,
  'news_article':            4,
  'announcement':            4,  // Official announcement
  'article':                 4,  // Generic article
  'comparison':              4,  // Comparison article
  'tracker':                 4,  // Issue tracker
  'periodical':              5,  // Periodical publication
  'encyclopedia':            3,  // D: tertiary source
  'website':                 3,
  'wiki':                    1,  // E: wiki (Wikipedia)
  'other':                   3,
};

// ─── Helpers ────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return [null, 'No frontmatter'];
  let yamlStr = match[1]
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');
  // Deduplicate keys (skip list item interior — each `  - ` entry is independent)
  // Global dedup only for top-level keys (indent <= 2).
  // List-item keys (indent >= 4) are deduped per-entry via listEntryKeys.
  // This prevents cross-section pollution (e.g. secondary_sources fields
  // blocking primary_sources fields with the same indent:key).
  const seenTopKeys = new Set();
  const lines = yamlStr.split('\n');
  const deduped = [];
  let inSection = false;   // true when inside source list (primary_sources, secondary_sources)
  let entryKeys = new Set(); // per-entry dedup within current source section

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    // Source list item marker: reset per-entry dedup
    if (/^\s{2}- /.test(line)) {
      entryKeys = new Set();
      inSection = true;
      deduped.unshift(line);
      continue;
    }
    const keyMatch = line.match(/^(\s*)([\w_-]+):/);
    if (keyMatch) {
      const indent = keyMatch[1].length;
      const key = `${indent}:${keyMatch[2]}`;
      if (indent <= 2) {
        // Top-level or section header — global dedup + exit section
        inSection = false;
        if (seenTopKeys.has(key)) continue;
        seenTopKeys.add(key);
      } else if (inSection) {
        // Inside a source list entry — dedup within this entry only
        if (entryKeys.has(key)) continue;
        entryKeys.add(key);
      }
      // else: indent>=4 but NOT inSection — always keep (never globally dedup)
    }
    deduped.unshift(line);
  }
  try {
    const fm = require('js-yaml').load(deduped.join('\n'));
    return [fm && typeof fm === 'object' ? fm : null, null];
  } catch (e) {
    return [null, `YAML parse error: ${e.message}`];
  }
}

function getAllSources(fm) {
  const ps = Array.isArray(fm.primary_sources) ? fm.primary_sources : [];
  const ss = Array.isArray(fm.secondary_sources) ? fm.secondary_sources : [];
  return [...ps, ...ss];
}

function getSourcesOfType(fm, type) {
  const field = type === 'primary' ? 'primary_sources' : 'secondary_sources';
  return Array.isArray(fm[field]) ? fm[field] : [];
}

function pluralSources(fm) {
  return getAllSources(fm).filter(s => typeof s === 'object' && s !== null);
}

function hasUrlOrDoi(src) {
  return !!(src.url || src.doi);
}

// ─── Scoring Functions ──────────────────────────────────────────

/**
 * D1.1 Structure completeness (max 8 points)
 */
function scoreStructure(content) {
  const checks = [
    /^##\s*TL[;]?DR/im,
    /^##\s*Core Explanation/im,
    /^##\s*Detailed Analysis/im,
    /^##\s*Further Reading/im,
  ];
  const count = checks.filter(r => r.test(content)).length;
  if (count === 4) return 8;
  if (count === 3) return 5;
  if (count === 2) return 2;
  return 0;
}

/**
 * D1.2 Source count (max 8 points)
 */
function scoreSourceCount(fm) {
  const total = pluralSources(fm).length;
  if (total >= 3) return 8;
  if (total >= 2) return 5;
  if (total >= 1) return 2;
  return 0;
}

/**
 * D1.3 Source verifiability — URL/DOI coverage (max 6 points)
 */
function scoreVerifiability(fm) {
  const primary = getSourcesOfType(fm, 'primary').filter(s => typeof s === 'object');
  if (primary.length === 0) return 0;
  const withUrl = primary.filter(hasUrlOrDoi).length;
  const ratio = withUrl / primary.length;
  if (ratio >= 1) return 6;
  if (ratio >= 0.5) return 3;
  return 1;
}

/**
 * D1.4 Confidence grading validity (max 4 points)
 */
function scoreConfidence(fm) {
  const valid = ['high', 'medium', 'low', 'disputed'];
  return valid.includes(fm.confidence) ? 4 : 0;
}

/**
 * D1.5 AI transparency (max 4 points)
 */
function scoreAiTransparency(fm) {
  const valid = ['human_only', 'ai_assisted', 'ai_generated_reviewed'];
  if (!fm.generation_method) return 0;
  if (fm.generation_method === 'ai_generated') return 0; // blocked content
  return valid.includes(fm.generation_method) ? 4 : 2;
}

/**
 * D2.1 Freshness — last_verified age (max 10 points)
 */
function scoreFreshness(fm) {
  const lv = fm.last_verified;
  if (!lv) return 0;
  const d = new Date(lv);
  if (isNaN(d.getTime())) return 0;
  const monthsOld = (NOW - d) / (1000 * 60 * 60 * 24 * 30.4375);
  if (monthsOld <= 3) return 10;
  if (monthsOld <= 6) return 7;
  if (monthsOld <= 12) return 4;
  if (monthsOld <= 24) return 1;
  return 0;
}

/**
 * D2.2 Completeness score (max 5 points)
 */
function scoreCompleteness(fm) {
  const c = fm.completeness;
  if (c === undefined || c === null || typeof c !== 'number') return 0;
  if (c >= 0.9) return 5;
  if (c >= 0.8) return 3;
  if (c >= 0.6) return 1;
  return 0;
}

/**
 * D2.3 Accuracy indicators — atomic_facts with source references (max 5 points)
 */
function scoreAccuracy(fm) {
  const facts = Array.isArray(fm.atomic_facts) ? fm.atomic_facts : [];
  if (facts.length === 0) return 0;
  const cited = facts.filter(f =>
    typeof f === 'object' && (f.source_doi || f.source_url)
  ).length;
  if (cited >= 3) return 5;
  if (cited >= 1) return 3;
  return 0;
}

/**
 * D2.4 Classification correctness (max 5 points)
 */
function scoreClassification(fm, filepath) {
  const dirName = path.relative(CONTENT_DIR, filepath).split(path.sep)[0].toLowerCase();
  const fmCat = (fm.category || '').toLowerCase();
  if (!fmCat) return 0;
  // Exact match or startsWith (e.g., "ai" matches "ai/machine-learning")
  if (fmCat === dirName || fmCat.startsWith(dirName + '/') || fmCat.startsWith(dirName + '-')) {
    return 5;
  }
  // Acceptable aliases
  const aliases = {
    'computer-science': ['cs', 'computer_science', 'compsci'],
    'game-development': ['gamedev', 'game_dev', 'game'],
    'self-improvement': ['self_improvement', 'selfhelp', 'productivity'],
  };
  if (aliases[dirName] && aliases[dirName].includes(fmCat)) return 5;
  return 0;
}

/**
 * D2.5 No banned sources / Wikipedia check (max 5 points)
 */
function scoreNoWikipedia(fm) {
  const all = getAllSources(fm);
  for (const src of all) {
    if (typeof src !== 'object') continue;
    if (src.url && /wikipedia\.org/i.test(src.url)) return 0;
    if (src.title && /wikipedia/i.test(src.title)) return 0;
    if ((src.type || '').toLowerCase() === 'wiki') return 0;
  }
  return 5;
}

/**
 * D3.1 Primary source tier average (max 10 points)
 */
function scoreSourceTier(fm) {
  const primary = getSourcesOfType(fm, 'primary').filter(s => typeof s === 'object');
  if (primary.length === 0) return 0;
  let totalScore = 0;
  let count = 0;
  for (const src of primary) {
    const type = (src.type || 'other').toLowerCase().replace(/[^a-z_]/g, '_');
    const tierScore = SOURCE_TIER_SCORE[type] || SOURCE_TIER_SCORE['other'];
    totalScore += Math.min(tierScore, 10); // cap at 10 each
    count++;
  }
  const avg = totalScore / count;
  // Map average tier (1-10) to output points (0-10)
  return Math.round(Math.max(0, (avg / 10) * 10));
}

/**
 * D3.2 Secondary source relevance (max 5 points)
 */
function scoreSecondaryRelevance(fm) {
  const ss = getSourcesOfType(fm, 'secondary').filter(s => typeof s === 'object');
  if (ss.length === 0) return 0; // fine if primary sources are sufficient
  // Check they're not cross-domain polluted (at least some have institutions)
  const withInstitution = ss.filter(s => s.institution).length;
  const withAuthor = ss.filter(s => {
    const authors = s.authors || s.author;
    return Array.isArray(authors) ? authors.length > 0 : !!authors;
  }).length;
  const qualified = Math.max(withInstitution, withAuthor);
  const ratio = qualified / ss.length;
  if (ratio >= 0.8) return 5;
  if (ratio >= 0.5) return 3;
  return 1;
}

/**
 * D3.3 Source recency — average year within 5 years (max 5 points)
 */
function scoreSourceRecency(fm) {
  const all = getAllSources(fm).filter(s => typeof s === 'object' && s.year);
  if (all.length === 0) return 0;
  const currentYear = NOW.getFullYear();
  let totalAge = 0;
  let count = 0;
  for (const src of all) {
    if (typeof src.year !== 'number') continue;
    totalAge += currentYear - src.year;
    count++;
  }
  if (count === 0) return 0;
  const avgAge = totalAge / count;
  if (avgAge <= 5) return 5;
  if (avgAge <= 10) return 3;
  if (avgAge <= 20) return 1;
  return 0;
}

/**
 * D3.4 Source institution diversity (max 5 points)
 */
function scoreInstitutionDiversity(fm) {
  const all = getAllSources(fm).filter(s => typeof s === 'object');
  const institutions = new Set();
  for (const src of all) {
    if (src.institution) institutions.add(src.institution.toLowerCase().trim());
  }
  if (institutions.size >= 3) return 5;
  if (institutions.size === 2) return 2;
  if (institutions.size === 1) return 1;
  return 0;
}

/**
 * D4.1 Atomic facts with independent IDs & source refs (max 5 points)
 */
function scoreAtomicFactsDetail(fm) {
  const facts = Array.isArray(fm.atomic_facts) ? fm.atomic_facts : [];
  if (facts.length === 0) return 0;
  const detailed = facts.filter(f =>
    typeof f === 'object' && f.id && (f.source_doi || f.source_url) && f.statement
  ).length;
  if (detailed >= 3) return 5;
  if (detailed >= 1) return 3;
  return 0;
}

/**
 * D4.2 Known gaps documented (max 5 points)
 */
function scoreKnownGaps(fm) {
  const gaps = fm.known_gaps;
  if (!gaps) return 0;
  if (Array.isArray(gaps) && gaps.length > 0 && gaps.some(g => typeof g === 'string' && g.trim())) return 5;
  return 0;
}

/**
 * D4.3 Disputed statements handled (max 5 points)
 */
function scoreDisputedHandling(fm) {
  if (!fm.disputed_statements) return 0;
  if (Array.isArray(fm.disputed_statements) && fm.disputed_statements.length > 0) return 5;
  return 0;
}

// ─── Main Scoring Engine ────────────────────────────────────────

function scoreArticle(filepath, content) {
  const rel = path.relative(CONTENT_DIR, filepath);
  const [fm, parseErr] = parseFrontmatter(content);

  if (!fm) {
    return {
      file: rel,
      id: 'PARSE_ERROR',
      domain: rel.split(path.sep)[0],
      error: parseErr,
      total: 0,
      dimensions: {
        D1_technical: 0, D2_quality: 0, D3_authority: 0, D4_readiness: 0,
      },
      breakdown: { error: parseErr },
      grade: 'F',
    };
  }

  // ── D1: Technical Foundation (30) ──
  const d1_1 = scoreStructure(content);
  const d1_2 = scoreSourceCount(fm);
  const d1_3 = scoreVerifiability(fm);
  const d1_4 = scoreConfidence(fm);
  const d1_5 = scoreAiTransparency(fm);
  const d1_total = d1_1 + d1_2 + d1_3 + d1_4 + d1_5;

  // ── D2: Content Quality (30) ──
  const d2_1 = scoreFreshness(fm);
  const d2_2 = scoreCompleteness(fm);
  const d2_3 = scoreAccuracy(fm);
  const d2_4 = scoreClassification(fm, filepath);
  const d2_5 = scoreNoWikipedia(fm);
  const d2_total = d2_1 + d2_2 + d2_3 + d2_4 + d2_5;

  // ── D3: Source Authority (25) ──
  const d3_1 = scoreSourceTier(fm);
  const d3_2 = scoreSecondaryRelevance(fm);
  const d3_3 = scoreSourceRecency(fm);
  const d3_4 = scoreInstitutionDiversity(fm);
  const d3_total = d3_1 + d3_2 + d3_3 + d3_4;

  // ── D4: Assessment Readiness (15) ──
  const d4_1 = scoreAtomicFactsDetail(fm);
  const d4_2 = scoreKnownGaps(fm);
  const d4_3 = scoreDisputedHandling(fm);
  const d4_total = d4_1 + d4_2 + d4_3;

  const total = d1_total + d2_total + d3_total + d4_total;

  // Letter grade
  let grade;
  if (total >= 90) grade = 'A';
  else if (total >= 80) grade = 'B';
  else if (total >= 70) grade = 'C';
  else if (total >= 60) grade = 'D';
  else grade = 'F';

  return {
    file: rel,
    id: fm.id || 'MISSING',
    domain: rel.split(path.sep)[0],
    total,
    grade,
    dimensions: {
      D1_technical: d1_total,
      D2_quality: d2_total,
      D3_authority: d3_total,
      D4_readiness: d4_total,
    },
    breakdown: {
      d1_1_structure: d1_1,
      d1_2_source_count: d1_2,
      d1_3_verifiability: d1_3,
      d1_4_confidence: d1_4,
      d1_5_ai_transparency: d1_5,
      d2_1_freshness: d2_1,
      d2_2_completeness: d2_2,
      d2_3_accuracy: d2_3,
      d2_4_classification: d2_4,
      d2_5_no_wikipedia: d2_5,
      d3_1_source_tier: d3_1,
      d3_2_secondary_relevance: d3_2,
      d3_3_source_recency: d3_3,
      d3_4_institution_diversity: d3_4,
      d4_1_atomic_facts: d4_1,
      d4_2_known_gaps: d4_2,
      d4_3_disputed: d4_3,
    },
  };
}

// ─── Collect Articles ───────────────────────────────────────────

function collectArticles(domainFilter) {
  const articles = [];
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith('_')) walk(f);
      else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) {
        const c = fs.readFileSync(f, 'utf-8');
        if (domainFilter) {
          const d = path.relative(CONTENT_DIR, f).split(path.sep)[0];
          if (d !== domainFilter) continue;
        }
        articles.push({ filepath: f, content: c });
      }
    }
  }
  walk(CONTENT_DIR);
  return articles;
}

// ─── Report Generators ──────────────────────────────────────────

function printTextReport(scores) {
  const lines = [];
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('  AnchorFact Quality Score Report');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');

  // Overall stats
  const total = scores.length;
  const avgScore = scores.reduce((s, a) => s + a.total, 0) / total;
  const gradeDist = {};
  for (const s of scores) { gradeDist[s.grade] = (gradeDist[s.grade] || 0) + 1; }

  lines.push(`  Total articles:   ${total}`);
  lines.push(`  Average score:    ${avgScore.toFixed(1)} / 100`);
  lines.push(`  Grade distribution: ${Object.entries(gradeDist).sort().map(([k,v]) => `${k}:${v}`).join(', ')}`);
  lines.push('');

  // Dimension averages
  lines.push('  ── Dimension Averages ──');
  const dimAvgs = { D1: 0, D2: 0, D3: 0, D4: 0 };
  for (const s of scores) {
    dimAvgs.D1 += s.dimensions.D1_technical;
    dimAvgs.D2 += s.dimensions.D2_quality;
    dimAvgs.D3 += s.dimensions.D3_authority;
    dimAvgs.D4 += s.dimensions.D4_readiness;
  }
  lines.push(`  D1 Technical Foundation:  ${(dimAvgs.D1 / total).toFixed(1)} / 30`);
  lines.push(`  D2 Content Quality:       ${(dimAvgs.D2 / total).toFixed(1)} / 30`);
  lines.push(`  D3 Source Authority:      ${(dimAvgs.D3 / total).toFixed(1)} / 25`);
  lines.push(`  D4 Assessment Readiness:  ${(dimAvgs.D4 / total).toFixed(1)} / 15`);
  lines.push('');

  // Per-domain averages
  lines.push('  ── Domain Averages ──');
  const domainScores = {};
  for (const s of scores) {
    const d = s.domain;
    if (!domainScores[d]) domainScores[d] = { sum: 0, count: 0 };
    domainScores[d].sum += s.total;
    domainScores[d].count++;
  }
  for (const [d, v] of Object.entries(domainScores).sort()) {
    lines.push(`  ${d.padEnd(20)} ${v.count} articles, avg ${(v.sum/v.count).toFixed(1)}`);
  }
  lines.push('');

  // Top 10
  lines.push('  ── Top 10 Articles ──');
  const top10 = [...scores].sort((a, b) => b.total - a.total).slice(0, 10);
  for (const s of top10) {
    lines.push(`  [${s.grade}] ${s.total.toString().padStart(3)}  ${s.file}`);
  }
  lines.push('');

  // Bottom 10 (only if they have scores > 0)
  const bottom = [...scores].filter(s => s.total > 0).sort((a, b) => a.total - b.total).slice(0, 10);
  if (bottom.length > 0) {
    lines.push('  ── Bottom 10 Articles ──');
    for (const s of bottom) {
      const dims = s.dimensions;
      lines.push(`  [${s.grade}] ${s.total.toString().padStart(3)}  ${s.file}  (D1:${dims.D1_technical} D2:${dims.D2_quality} D3:${dims.D3_authority} D4:${dims.D4_readiness})`);
    }
  }

  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');

  // Quality tier assessment
  const passRate = scores.filter(s => s.total >= 60).length / total * 100;
  lines.push(`  Pass rate (≥60):   ${passRate.toFixed(1)}%`);
  const goodRate = scores.filter(s => s.total >= 70).length / total * 100;
  lines.push(`  Good rate (≥70):   ${goodRate.toFixed(1)}%`);
  const excellentRate = scores.filter(s => s.total >= 80).length / total * 100;
  lines.push(`  Excellent (≥80):   ${excellentRate.toFixed(1)}%`);

  // Common weak spots
  lines.push('');
  lines.push('  ── Common Weak Spots ──');
  const breakdownTotals = {};
  for (const s of scores) {
    if (!s.breakdown || s.breakdown.error) continue;
    for (const [k, v] of Object.entries(s.breakdown)) {
      if (!breakdownTotals[k]) breakdownTotals[k] = { sum: 0, count: 0, max: 0, label: k };
      breakdownTotals[k].sum += v;
      breakdownTotals[k].count++;
    }
  }
  // Get max possible for each from first article with that field
  const maxPossible = {
    d1_1_structure: 8, d1_2_source_count: 8, d1_3_verifiability: 6, d1_4_confidence: 4, d1_5_ai_transparency: 4,
    d2_1_freshness: 10, d2_2_completeness: 5, d2_3_accuracy: 5, d2_4_classification: 5, d2_5_no_wikipedia: 5,
    d3_1_source_tier: 10, d3_2_secondary_relevance: 5, d3_3_source_recency: 5, d3_4_institution_diversity: 5,
    d4_1_atomic_facts: 5, d4_2_known_gaps: 5, d4_3_disputed: 5,
  };
  const pctByField = Object.entries(breakdownTotals)
    .map(([k, v]) => ({
      field: k,
      avg: v.sum / v.count,
      max: maxPossible[k] || 5,
      pct: ((v.sum / v.count) / (maxPossible[k] || 5) * 100),
    }))
    .sort((a, b) => a.pct - b.pct);
  for (const f of pctByField.slice(0, 5)) {
    lines.push(`  ${f.field.padEnd(28)} ${f.avg.toFixed(1)}/${f.max} (${f.pct.toFixed(0)}%)`);
  }

  console.log(lines.join('\n'));
}

function printJsonReport(scores) {
  const summary = {
    timestamp: new Date().toISOString(),
    total_articles: scores.length,
    average_score: +(scores.reduce((s, a) => s + a.total, 0) / scores.length).toFixed(1),
    grade_distribution: {},
    domain_averages: {},
    dimension_averages: {},
    top_10: [],
    bottom_10: [],
    articles: scores,
  };

  for (const s of scores) {
    summary.grade_distribution[s.grade] = (summary.grade_distribution[s.grade] || 0) + 1;
  }

  const domainScores = {};
  for (const s of scores) {
    const d = s.domain;
    if (!domainScores[d]) domainScores[d] = { sum: 0, count: 0 };
    domainScores[d].sum += s.total;
    domainScores[d].count++;
  }
  for (const [d, v] of Object.entries(domainScores)) {
    summary.domain_averages[d] = {
      count: v.count,
      average: +(v.sum / v.count).toFixed(1),
    };
  }

  const dims = ['D1_technical', 'D2_quality', 'D3_authority', 'D4_readiness'];
  for (const dim of dims) {
    const avg = scores.reduce((s, a) => s + a.dimensions[dim], 0) / scores.length;
    summary.dimension_averages[dim] = +avg.toFixed(1);
  }

  summary.top_10 = [...scores].sort((a, b) => b.total - a.total).slice(0, 10);
  summary.bottom_10 = [...scores].filter(s => s.total > 0).sort((a, b) => a.total - b.total).slice(0, 10);

  console.log(JSON.stringify(summary, null, 2));
}

// ─── Main ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
const useJson = args.includes('--json');
const useReport = args.includes('--report');
const domainArg = args.indexOf('--domain');
const domainFilter = domainArg >= 0 ? args[domainArg + 1] : null;

const articles = collectArticles(domainFilter);
console.error(`Scoring ${articles.length} articles...`);

const scores = articles.map(a => scoreArticle(a.filepath, a.content));

if (useJson) {
  printJsonReport(scores);
} else {
  printTextReport(scores);
}

// Exit code based on average
const avgScore = scores.reduce((s, a) => s + a.total, 0) / scores.length;
if (avgScore >= 70) process.exit(0);
else if (avgScore >= 60) process.exit(1);
else process.exit(2);
