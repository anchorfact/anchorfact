import { readFileSync } from 'fs';
const r = JSON.parse(readFileSync('verification-report.json', 'utf-8'));
const nearMedium = [];
r.articles.forEach(a => {
  const vr = a.verification_results || [];
  if (vr.length === 0) return;
  const total = vr.length;
  const verified = vr.filter(v => v.all_verified).length;
  const ratio = verified / total;
  if (ratio > 0 && ratio < 0.5) {
    nearMedium.push({
      file: a.file,
      total,
      verified,
      ratio,
      hasDoi: vr.some(v => v.results && v.results.some(r => r.method === 'doi' && r.verified))
    });
  }
});
nearMedium.sort((a, b) => b.ratio - a.ratio);
console.log('Near-medium (verified>0, ratio<0.5): ' + nearMedium.length);
nearMedium.slice(0, 20).forEach(a => {
  console.log(`  ${a.ratio.toFixed(2)} ${a.verified}/${a.total} DOI=${a.hasDoi} ${a.file}`);
});
const byDomain = {};
nearMedium.forEach(a => {
  const d = a.file.split(/[\\/]/)[1] || '?';
  byDomain[d] = (byDomain[d] || 0) + 1;
});
console.log('\nBy domain:');
Object.entries(byDomain).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([d, c]) => console.log(`  ${d}: ${c}`));
console.log('\nHas DOI verified: ' + nearMedium.filter(a => a.hasDoi).length);
