// Fix website article count from 499 to 805
const fs = require('fs');
const path = require('path');

const report = require('../quality-report-all.json');
const actualCount = report.total_articles || 805;

// Build correct output
const out = {
  timestamp: new Date().toISOString(),
  total_articles: actualCount,
  average_score: report.average_score,
  grade_distribution: report.grade_distribution || {},
  domain_averages: report.domain_averages || {}
};

const targets = ['qs_current.json', 'qs_check.json', '.quality-baseline.json'];
const root = path.join(__dirname, '..');

targets.forEach(f => {
  const fp = path.join(root, f);
  fs.writeFileSync(fp, JSON.stringify(out, null, 2) + '\n');
  console.log('Updated ' + f);
});

console.log('All 3 files updated to ' + actualCount + ' total_articles');
