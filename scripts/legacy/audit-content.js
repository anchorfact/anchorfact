#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

let total = 0, missingTitle = 0, emptySources = 0, humanOnly = 0, aiLabels = 0, brokenFm = 0;
function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.md') && !e.startsWith('_')) {
      total++;
      try {
        const c = readFileSync(p, 'utf-8');
        const l = c.split('\n');
        if (l[0]?.trim() !== '---') { brokenFm++; continue }
        const ei = l.slice(1).findIndex(x => x.trim() === '---');
        if (ei === -1) { brokenFm++; continue }
        const fm = l.slice(1, ei + 1).join('\n');
        if (!fm.includes('title:')) missingTitle++;
        if (fm.includes('primary_sources: []') || fm.includes("primary_sources: []") || !fm.includes('primary_sources:')) emptySources++;
        if (fm.includes('human_only')) humanOnly++;
        if (fm.includes('ai_structured')) aiLabels++;
      } catch (x) { brokenFm++; }
    }
  }
}
walk('content');
console.log('Articles:', total);
console.log('Broken frontmatter:', brokenFm);
console.log('Missing title:', missingTitle);
console.log('Empty sources:', emptySources);
console.log('Label ai_structured:', aiLabels);
console.log('Label human_only:', humanOnly);
console.log('Compliance rate:', ((total - brokenFm - missingTitle - humanOnly) / total * 100).toFixed(1) + '%');
