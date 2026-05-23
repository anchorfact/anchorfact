#!/usr/bin/env node
/**
 * AnchorFact Quality Comparison Tool
 *
 * Compares quality scores between two versions (commits/branches)
 * to track quality improvement/regression over time.
 *
 * Usage:
 *   node scripts/compare-quality.cjs HEAD~1     # compare with prev commit
 *   node scripts/compare-quality.cjs HEAD~5     # compare 5 commits back
 *   node scripts/compare-quality.cjs abc123     # compare with specific commit
 *   node scripts/compare-quality.cjs --save     # save current baseline
 *   node scripts/compare-quality.cjs --diff     # show diff against saved baseline
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_DIR = path.join(__dirname, '..');
const BASELINE_FILE = path.join(REPO_DIR, '.quality-baseline.json');
const SCORER = path.join(__dirname, 'quality-score.cjs');

// ─── Helpers ────────────────────────────────────────────────────

function getCurrentScores() {
  try {
    const output = execSync(`node "${SCORER}" --json`, {
      cwd: REPO_DIR,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000,
    });
    // Parse the stderr-then-stdout output
    const jsonMatch = output.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(output);
  } catch (e) {
    // Check if there's stdout even on error
    if (e.stdout) {
      const jsonMatch = e.stdout.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }
    console.error(`Failed to get scores: ${e.message}`);
    return null;
  }
}

function getScoresAtRef(ref) {
  try {
    // Use git show to get the scorer script at that ref
    const scorerExists = execSync(`git cat-file -e ${ref}:scripts/quality-score.cjs 2>/dev/null`, {
      cwd: REPO_DIR, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'],
    });
    // scorer exists
  } catch {
    console.log(`Note: quality-score.cjs didn't exist at ref ${ref}. Using current scorer on old content.`);
  }

  // Get the content directory at that ref
  const tempDir = path.join(REPO_DIR, '.temp-compare');
  try {
    // Save current content
    execSync(`git stash push -- content/ 2>/dev/null || true`, { cwd: REPO_DIR, stdio: 'ignore' });
    // Checkout content from ref
    execSync(`git checkout ${ref} -- content/ 2>/dev/null`, { cwd: REPO_DIR, stdio: 'ignore' });
    // Score
    const scores = getCurrentScores();
    // Restore
    execSync(`git checkout HEAD -- content/ 2>/dev/null`, { cwd: REPO_DIR, stdio: 'ignore' });
    execSync(`git stash pop 2>/dev/null || true`, { cwd: REPO_DIR, stdio: 'ignore' });
    return scores;
  } catch (e) {
    console.error(`Failed to compare: ${e.message}`);
    // Restore
    try { execSync(`git checkout HEAD -- content/ 2>/dev/null`, { cwd: REPO_DIR, stdio: 'ignore' }); } catch {}
    try { execSync(`git stash pop 2>/dev/null || true`, { cwd: REPO_DIR, stdio: 'ignore' }); } catch {}
    return null;
  }
}

// ─── Compare ────────────────────────────────────────────────────

function compare(previous, current) {
  if (!previous || !current) {
    console.log('Could not get scores for comparison.');
    return;
  }

  const prevAvg = previous.average_score;
  const currAvg = current.average_score;
  const delta = currAvg - prevAvg;
  const pctChange = prevAvg > 0 ? ((delta / prevAvg) * 100).toFixed(1) : 'N/A';

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  AnchorFact Quality Comparison Report');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`  Previous:  ${previous.timestamp || 'baseline'}  (${previous.total_articles} articles)`);
  console.log(`  Current:   ${current.timestamp}  (${current.total_articles} articles)`);
  console.log('');
  console.log(`  ── Overall ──`);
  console.log(`  Average score:  ${prevAvg.toFixed(1)} → ${currAvg.toFixed(1)}  (${delta >= 0 ? '+' : ''}${delta.toFixed(1)})`);
  console.log(`  Change:         ${pctChange}%`);
  console.log('');

  // Grade distribution comparison
  console.log(`  ── Grade Distribution ──`);
  const grades = ['A', 'B', 'C', 'D', 'F'];
  for (const g of grades) {
    const prevCount = previous.grade_distribution[g] || 0;
    const currCount = current.grade_distribution[g] || 0;
    const d = currCount - prevCount;
    const arrow = d > 0 ? '↑' : d < 0 ? '↓' : ' ';
    console.log(`  ${g}: ${String(prevCount).padStart(4)} → ${String(currCount).padStart(4)}  (${d >= 0 ? '+' : ''}${d})`);
  }
  console.log('');

  // Dimension comparison
  console.log(`  ── Dimension Averages ──`);
  const dimLabels = {
    'D1_technical': 'D1 Technical Foundation (30)',
    'D2_quality': 'D2 Content Quality (30)',
    'D3_authority': 'D3 Source Authority (25)',
    'D4_readiness': 'D4 Assessment Readiness (15)',
  };
  for (const [dim, label] of Object.entries(dimLabels)) {
    const prevDim = (previous.dimension_averages || {})[dim] || 0;
    const currDim = (current.dimension_averages || {})[dim] || 0;
    const d = currDim - prevDim;
    const arrow = d > 0 ? '▲' : d < 0 ? '▼' : ' ';
    console.log(`  ${label.padEnd(38)} ${prevDim.toFixed(2)} → ${currDim.toFixed(2)}  ${arrow} ${d >= 0 ? '+' : ''}${d.toFixed(2)}`);
  }
  console.log('');

  // Domain comparison
  console.log(`  ── Domain Comparison ──`);
  const allDomains = new Set([
    ...Object.keys(previous.domain_averages || {}),
    ...Object.keys(current.domain_averages || {}),
  ]);
  for (const d of [...allDomains].sort()) {
    const prevDom = (previous.domain_averages || {})[d];
    const currDom = (current.domain_averages || {})[d];
    const prevA = prevDom ? prevDom.average : 0;
    const currA = currDom ? currDom.average : 0;
    const prevC = prevDom ? prevDom.count : 0;
    const currC = currDom ? currDom.count : 0;
    const deltaD = currA - prevA;
    const arrow = deltaD > 0 ? '▲' : deltaD < 0 ? '▼' : ' ';
    console.log(`  ${d.padEnd(20)} ${prevA.toFixed(1)} → ${currA.toFixed(1)}  ${arrow} ${deltaD >= 0 ? '+' : ''}${deltaD.toFixed(1)}  (${prevC}→${currC} articles)`);
  }
  console.log('');

  // Regressions (articles that got worse)
  if (previous.articles && current.articles) {
    const prevMap = {};
    for (const a of previous.articles) prevMap[a.file || a.id] = a;
    const regressions = [];
    const improvements = [];

    for (const a of current.articles) {
      const prev = prevMap[a.file || a.id];
      if (!prev) continue;
      const d = a.total - prev.total;
      if (d < 0) regressions.push({ ...a, delta: d });
      else if (d > 0) improvements.push({ ...a, delta: d });
    }

    if (regressions.length > 0) {
      console.log(`  ── Regressions (${regressions.length}) ──`);
      for (const r of regressions.sort((a, b) => a.delta - b.delta).slice(0, 5)) {
        console.log(`  ${r.delta.toString().padStart(4)}  ${r.file}`);
      }
      console.log('');
    }

    if (improvements.length > 0) {
      console.log(`  ── Improvements (${improvements.length}) ──`);
      for (const imp of improvements.sort((a, b) => b.delta - a.delta).slice(0, 5)) {
        console.log(`  +${imp.delta.toString().padStart(3)}  ${imp.file}`);
      }
      console.log('');
    }
  }

  console.log('═══════════════════════════════════════════════════════════');
}

// ─── Save Baseline ──────────────────────────────────────────────

function saveBaseline() {
  const scores = getCurrentScores();
  if (!scores) { process.exit(1); }
  scores.timestamp = new Date().toISOString();
  scores.description = 'Quality baseline snapshot';
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(scores, null, 2), 'utf-8');
  console.log(`Baseline saved to ${BASELINE_FILE}`);
  console.log(`  ${scores.total_articles} articles, average score: ${scores.average_score}`);
}

// ─── Main ───────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--save')) {
  saveBaseline();
  process.exit(0);
}

if (args.includes('--diff')) {
  // Compare against saved baseline
  const baseline = fs.existsSync(BASELINE_FILE)
    ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'))
    : null;
  if (!baseline) {
    console.log('No baseline found. Run --save first.');
    process.exit(1);
  }
  const current = getCurrentScores();
  compare(baseline, current);
  process.exit(0);
}

// Compare against a git ref
const ref = args.find(a => !a.startsWith('--'));
if (ref) {
  console.log(`Comparing against ${ref}...`);
  const previous = getScoresAtRef(ref);
  const current = getCurrentScores();
  compare(previous, current);
  process.exit(0);
}

// Default: show current scores
const current = getCurrentScores();
if (current) {
  console.log(`Current quality: avg ${current.average_score}/100, ${current.total_articles} articles`);
}
