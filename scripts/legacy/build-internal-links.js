#!/usr/bin/env node
/**
 * 为所有文章自动添加内部链接（Related Articles）
 * 基于标题关键词重叠选择 top-3 相关文章
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, relative } from 'path';
import { load, dump } from 'js-yaml';

const CONTENT_DIR = 'content';

// 收集所有文章
const articles = [];
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const fp = join(dir, e);
    if (statSync(fp).isDirectory()) walk(fp);
    else if (e.endsWith('.md') && !e.startsWith('_') && !e.startsWith('draft') && !dir.includes('drafts')) {
      try {
        const md = readFileSync(fp, 'utf-8');
        const lines = md.split('\n');
        if (lines[0]?.trim() !== '---') return;
        const end = lines.slice(1).findIndex(l => l.trim() === '---');
        if (end === -1) return;
        const fm = load(lines.slice(1, end + 1).join('\n')) || {};
        const title = fm.title || basename(fp, '.md');
        const domain = dir.split(/[\\/]/)[1] || '';
        articles.push({ file: fp, title, domain, frontmatter: fm });
      } catch (e) { /* skip */ }
    }
  }
}
walk(CONTENT_DIR);

console.log(`Found ${articles.length} articles`);

// 计算关键词向量
function keywordVector(title) {
  const words = title.toLowerCase()
    .replace(/[:\-–—,()]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['for', 'and', 'the', 'with', 'from', 'what', 'that', 'this', 'into'].includes(w));
  return new Set(words);
}

const vectors = articles.map(a => keywordVector(a.title));

// 每篇文章选 top-3
let linked = 0;
const skipPattern = /## Related Articles[\s\S]*$/;

for (let i = 0; i < articles.length; i++) {
  const a = articles[i];
  const va = vectors[i];

  // 计算所有其他文章的相似度
  const scores = [];
  for (let j = 0; j < articles.length; j++) {
    if (i === j) continue;
    const vb = vectors[j];
    let overlap = 0;
    for (const w of va) {
      if (vb.has(w)) overlap++;
    }
    if (overlap > 0) {
      scores.push({ idx: j, score: overlap });
    }
  }

  scores.sort((a, b) => b.score - a.score);
  const top3 = scores.slice(0, 3);

  if (top3.length === 0) continue;

  // 生成 Related Articles 段落
  const links = top3.map(s => {
    const b = articles[s.idx];
    const relPath = relative(a.file, b.file).replace(/\\/g, '/');
    return `- [${b.title}](${relPath})`;
  }).join('\n');

  const section = `\n\n## Related Articles\n\n${links}\n`;

  // 读取当前文件，检查是否已有 Related Articles
  const md = readFileSync(a.file, 'utf-8');
  if (skipPattern.test(md)) {
    // 已有，替换
    const updated = md.replace(skipPattern, section.trim());
    writeFileSync(a.file, updated, 'utf-8');
    linked++;
    continue;
  }

  // 追加
  writeFileSync(a.file, md.trimEnd() + section, 'utf-8');
  linked++;

  if (linked % 100 === 0) {
    console.log(`  ${linked}/${articles.length} articles linked`);
  }
}

console.log(`Done: ${linked}/${articles.length} articles with internal links`);
