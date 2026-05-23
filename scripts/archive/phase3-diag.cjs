// Phase 3 diagnostic — identify exact weak spots
const { execSync } = require('child_process');
const path = require('path');
const ROOT = path.join(__dirname, '..');

console.log('Running quality-score...');
const out = execSync('node scripts/quality-score.cjs --json', { cwd: ROOT, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
const data = JSON.parse(out);

console.log('=== F-grade articles (', data.articles.filter(a => a.grade === 'F').length, ') ===');
for (const a of data.articles.filter(a => a.grade === 'F')) {
  console.log(`  [F] ${a.score}p  ${a.domain}/${a.title}  D1:${a.dimensions?.d1_technical_foundation||'?'} D2:${a.dimensions?.d2_content_quality||'?'} D3:${a.dimensions?.d3_source_authority||'?'} D4:${a.dimensions?.d4_assessment_readiness||'?'}`);
}

console.log('\n=== Self-improvement domain ===');
for (const a of data.articles.filter(a => a.domain === 'self-improvement')) {
  console.log(`  [${a.grade}] ${a.score}p  ${a.title}  D1:${a.dimensions?.d1_technical_foundation||'?'} D2:${a.dimensions?.d2_content_quality||'?'} D3:${a.dimensions?.d3_source_authority||'?'} D4:${a.dimensions?.d4_assessment_readiness||'?'}`);
}

console.log('\n=== Geography domain ===');
for (const a of data.articles.filter(a => a.domain === 'geography')) {
  console.log(`  [${a.grade}] ${a.score}p  ${a.title}  D1:${a.dimensions?.d1_technical_foundation||'?'} D2:${a.dimensions?.d2_content_quality||'?'} D3:${a.dimensions?.d3_source_authority||'?'} D4:${a.dimensions?.d4_assessment_readiness||'?'}`);
}

// Bottom 30 by D3
const byD3 = [...data.articles].sort((a,b) => (a.dimensions?.d3_source_authority||0) - (b.dimensions?.d3_source_authority||0));
console.log('\n=== Bottom 30 by D3 Source Authority ===');
for (const a of byD3.slice(0,30)) {
  console.log(`  D3:${a.dimensions?.d3_source_authority}  ${a.score}p  [${a.grade}]  ${a.domain}/${a.title}`);
}

// Count D3=3 articles
const d3low = data.articles.filter(a => (a.dimensions?.d3_source_authority||0) <= 3);
console.log('\n=== Articles with D3 <= 3:', d3low.length, '===');
for (const a of d3low.slice(0,20)) {
  console.log(`  D3:${a.dimensions?.d3_source_authority}  ${a.score}p  ${a.domain}/${a.title}`);
}
