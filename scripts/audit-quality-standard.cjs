/**
 * Quality Standard v1.0 Compliance Audit
 * Cross-references every article against the 13 sub-standards in QUALITY_STANDARD.md
 *
 * Output: per-article pass/fail report + aggregate compliance rate
 */
const fs = require('fs'), p = require('path');
const { execSync } = require('child_process');
const ROOT = p.join(__dirname, '..');
const CONTENT = p.join(ROOT, 'content');

// Get scored articles
const raw = execSync('node scripts/quality-score.cjs --json', {
  cwd: ROOT, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024
});
const data = JSON.parse(raw);

const CHECKS = {
  '1.1-source-authority': (a) => {
    const ps = a.breakdown?.d3_1_source_tier;
    return ps >= 5 ? 'PASS' : ps >= 3 ? 'WARN' : 'FAIL';
  },
  '1.2-verifiability': (a) => {
    const d13 = a.breakdown?.d1_3_verifiability;
    return d13 >= 4 ? 'PASS' : d13 >= 2 ? 'WARN' : 'FAIL';
  },
  '1.3-confidence-label': (a) => {
    // confidence field checked by D1.4
    return (a.breakdown?.d1_4_confidence || 0) >= 3 ? 'PASS' : 'WARN';
  },
  '2.1-fact-opinion-separation': (a) => {
    // Check if disputed_statements exist (proxy for acknowledging opinions)
    return (a.breakdown?.d4_3_disputed || 0) >= 3 ? 'PASS' : 'WARN';
  },
  '2.2-conflict-of-interest': (a) => 'NOT_COVERED',
  '2.3-dispute-presentation': (a) => {
    return (a.breakdown?.d4_3_disputed || 0) >= 5 ? 'PASS' : 'WARN';
  },
  '3.1-time-stamping': (a) => {
    const d21 = a.breakdown?.d2_1_freshness;
    return d21 >= 7 ? 'PASS' : d21 >= 4 ? 'WARN' : 'FAIL';
  },
  '3.2-dynamic-fact-handling': (a) => 'NOT_COVERED',
  '4.1-core-elements': (a) => {
    const d11 = a.breakdown?.d1_1_structure;
    return d11 >= 6 ? 'PASS' : d11 >= 4 ? 'WARN' : 'FAIL';
  },
  '4.2-structured-format': (a) => {
    return a.error ? 'FAIL' : 'PASS';
  },
  '5.1-classification': (a) => {
    return (a.breakdown?.d2_4_classification || 0) >= 5 ? 'PASS' : 'FAIL';
  },
  '5.2-machine-parsable': (a) => {
    return a.error ? 'FAIL' : 'PASS';
  },
};

const results = {};
let total = 0;
for (const art of data.articles) {
  if (!art.breakdown || art.breakdown.error) continue;
  total++;
  const file = art.file;
  for (const [ck, fn] of Object.entries(CHECKS)) {
    const r = fn(art);
    if (!results[ck]) results[ck] = { PASS: 0, WARN: 0, FAIL: 0, NOT_COVERED: 0 };
    results[ck][r]++;
  }
}

console.log(`Quality Standard v1.0 Compliance — ${total} articles\n`);
console.log('Standard'.padEnd(38) + '  PASS   WARN   FAIL   NOT_COVERED');
console.log('-'.repeat(75));
for (const [ck, r] of Object.entries(results)) {
  const label = ck.replace(/-/g, ' ');
  console.log(label.padEnd(38) +
    `  ${String(r.PASS).padStart(5)}  ${String(r.WARN||0).padStart(5)}  ${String(r.FAIL||0).padStart(5)}  ${String(r.NOT_COVERED||0).padStart(12)}`);
}

// Summary
const passTotal = Object.values(results).reduce((s, r) => s + r.PASS, 0);
const totalChecks = total * Object.keys(CHECKS).length;
console.log(`\nOverall: ${passTotal}/${totalChecks} PASS (${(passTotal/totalChecks*100).toFixed(1)}%)`);

// Top 3 gaps
const gaps = Object.entries(results)
  .filter(([, r]) => r.NOT_COVERED > 0 || r.FAIL > 0)
  .sort((a, b) => ((b[1].NOT_COVERED||0)+(b[1].FAIL||0)) - ((a[1].NOT_COVERED||0)+(a[1].FAIL||0)))
  .slice(0, 5);
console.log('\nTop gaps to address:');
gaps.forEach(([ck, r]) => {
  const total = r.NOT_COVERED + r.FAIL + (r.WARN || 0);
  console.log(`  ${ck}: ${total} NOT_COVERED/FAIL (${(total/data.total_articles*100).toFixed(1)}%)`);
});
