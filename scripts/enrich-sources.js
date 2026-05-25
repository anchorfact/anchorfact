#!/usr/bin/env node
/**
 * AnchorFact Source Enrichment — 自动为 low 文章补充 DOI/arXiv 来源
 * 
 * 用法：node scripts/enrich-sources.js [--dry-run] [--limit N] [--domain cs]
 * 
 * 对 low 置信度文章：
 *   1. 从 title 提取搜索关键词
 *   2. 调用 arXiv / CrossRef API 搜索匹配论文
 *   3. 将匹配来源注入到 primary_sources
 *   4. 写回 content/*.md
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { load, dump } from 'js-yaml';

const SLEEP_MS = 3000; // arXiv API 限速

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- 从标题提取搜索关键词 ----
function extractSearchQuery(frontmatter) {
  const title = frontmatter.title || '';
  // 去掉常见后缀，取前 5 个词
  const cleaned = title
    .replace(/[:\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleaned.split(' ').filter(w => w.length > 2).slice(0, 6);
  return words.join(' ');
}

// ---- arXiv API 搜索 ----
async function searchArxiv(query, maxResults = 3) {
  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&max_results=${maxResults}&sortBy=relevance`;
  try {
    const res = await fetch(url);
    if (res.status !== 200) return [];
    const text = await res.text();
    
    const entries = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    while ((match = entryRegex.exec(text)) !== null) {
      const entry = match[1];
      const idMatch = entry.match(/<id>(.*?)<\/id>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const authorMatches = [...entry.matchAll(/<author>[\s\S]*?<name>(.*?)<\/name>[\s\S]*?<\/author>/g)];
      const yearMatch = entry.match(/<published>(\d{4})/);
      const doiMatch = entry.match(/<arxiv:doi[^>]*>(.*?)<\/arxiv:doi>/);
      const linkMatch = entry.match(/<link[^>]*href="([^"]*)"[^>]*\/>/);
      
      if (idMatch && titleMatch) {
        const arxivId = idMatch[1].split('/abs/').pop();
        entries.push({
          title: titleMatch[1].trim().replace(/\s+/g, ' '),
          authors: authorMatches.map(m => m[1].trim()),
          year: yearMatch ? parseInt(yearMatch[1]) : null,
          arxiv_id: arxivId,
          doi: doiMatch ? doiMatch[1].trim() : null,
          url: linkMatch ? linkMatch[1] : `https://arxiv.org/abs/${arxivId}`,
          type: 'academic_paper'
        });
      }
    }
    return entries;
  } catch (e) {
    console.error(`  arXiv search error: ${e.message}`);
    return [];
  }
}

// ---- 判定匹配质量 ----
function scoreMatch(paperTitle, articleTitle) {
  const pt = paperTitle.toLowerCase();
  const at = articleTitle.toLowerCase();
  const atWords = at.split(/\s+/).filter(w => w.length > 3);
  const matchCount = atWords.filter(w => pt.includes(w)).length;
  return matchCount / Math.max(atWords.length, 1);
}

// ---- 更新 frontmatter ----
function enrichFrontmatter(frontmatter, newSources) {
  const sources = frontmatter.primary_sources || [];
  const existingUrls = new Set(sources.map(s => s.url || '').filter(Boolean));
  const existingDois = new Set(sources.map(s => s.doi || '').filter(Boolean));
  
  let added = 0;
  for (const ns of newSources) {
    if (ns.doi && existingDois.has(ns.doi)) continue;
    if (ns.url && existingUrls.has(ns.url)) continue;
    
    sources.push({
      title: ns.title,
      authors: ns.authors,
      year: ns.year,
      doi: ns.doi || undefined,
      url: ns.url,
      type: 'academic_paper',
      institution: 'arXiv'
    });
    if (ns.doi) existingDois.add(ns.doi);
    if (ns.url) existingUrls.add(ns.url);
    added++;
  }
  
  frontmatter.primary_sources = sources;
  // 更新置信度标注
  if (frontmatter.confidence === 'low' || !frontmatter.confidence) {
    const hasDoi = sources.some(s => s.doi);
    frontmatter.confidence = hasDoi ? 'medium' : frontmatter.confidence;
  }
  frontmatter.last_verified = new Date().toISOString().split('T')[0];
  
  return added;
}

// ---- 重写 Markdown 文件的 frontmatter ----
function writeFrontmatter(filePath, frontmatter, body) {
  const yamlStr = dump(frontmatter, { lineWidth: 200, noRefs: true });
  const mdContent = `---\n${yamlStr}---\n\n${body}`;
  writeFileSync(filePath, mdContent, 'utf-8');
}

function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };
  const endIndex = lines.slice(1).findIndex(l => l.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };
  try {
    return {
      frontmatter: load(lines.slice(1, endIndex + 1).join('\n')) || {},
      body: lines.slice(endIndex + 2).join('\n')
    };
  } catch (e) {
    return { frontmatter: {}, body: mdContent };
  }
}

// ---- 判断是否需要 enrich ----
function needsEnrich(article) {
  if (!article.verification_results || article.verification_results.length === 0) return true;
  const verified = article.verification_results.filter(v => v.all_verified).length;
  const ratio = verified / article.verification_results.length;
  return ratio < 0.5;
}

// ---- 从 domains 列表过滤 ----
function filterByDomain(articles, domains) {
  if (!domains || domains.length === 0) return articles;
  return articles.filter(a => {
    const domain = a.file.split(/[\\/]/)[1] || '';
    return domains.includes(domain);
  });
}

// ---- Main ----
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) || 10 : 10;
const domainIdx = args.indexOf('--domain');
const domains = domainIdx >= 0 ? args[domainIdx + 1].split(',') : [];

const reportPath = join(process.cwd(), 'verification-report.json');
const contentDir = join(process.cwd(), 'content');

if (!existsSync(reportPath)) {
  console.error('verification-report.json not found. Run npm run verify first.');
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, 'utf-8'));
let candidates = report.articles.filter(needsEnrich);
candidates = filterByDomain(candidates, domains);
candidates = candidates.slice(0, limit);

console.log(`Source Enrichment — ${dryRun ? 'DRY RUN' : 'LIVE'}`);
console.log(`  Candidates: ${candidates.length} (domains: ${domains.join(',') || 'all'})`);
console.log(`  Dry run: ${dryRun}\n`);

let enriched = 0;
let totalAdded = 0;

for (let i = 0; i < candidates.length; i++) {
  const article = candidates[i];
  const filePath = join(process.cwd(), article.file);
  
  if (!existsSync(filePath)) {
    console.log(`[${i + 1}/${candidates.length}] SKIP — file not found: ${article.file}`);
    continue;
  }
  
  const mdContent = readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = splitFrontmatter(mdContent);
  
  if (!frontmatter.title) {
    console.log(`[${i + 1}/${candidates.length}] SKIP — no title: ${article.file}`);
    continue;
  }
  
  const query = extractSearchQuery(frontmatter);
  console.log(`[${i + 1}/${candidates.length}] Searching: "${query}" ← ${frontmatter.title}`);
  
  await sleep(SLEEP_MS);
  const papers = await searchArxiv(query, 3);
  
  if (papers.length === 0) {
    console.log(`  → No arXiv results found`);
    continue;
  }
  
  // 按匹配度筛选
  const matched = papers
    .map(p => ({ ...p, score: scoreMatch(p.title, frontmatter.title) }))
    .filter(p => p.score > 0.2)  // 至少 20% 关键词匹配
    .slice(0, 2);
  
  if (matched.length === 0) {
    console.log(`  → No good matches (best score: ${papers[0] ? scoreMatch(papers[0].title, frontmatter.title).toFixed(2) : 'N/A'})`);
    continue;
  }
  
  console.log(`  → Found ${matched.length} matches:`);
  matched.forEach(m => {
    const badge = m.doi ? 'DOI' : 'arXiv';
    console.log(`    [${badge}] ${m.title.slice(0, 70)}... (${m.year}, score=${m.score.toFixed(2)})`);
  });
  
  if (!dryRun) {
    const added = enrichFrontmatter(frontmatter, matched);
    writeFrontmatter(filePath, frontmatter, body);
    totalAdded += added;
    enriched++;
    console.log(`  → Added ${added} sources, wrote ${filePath}`);
  } else {
    enriched++;
  }
}

console.log(`\n${dryRun ? '[DRY RUN] ' : ''}Done: enriched ${enriched}/${candidates.length} articles, added ${totalAdded} sources`);
if (dryRun) {
  console.log('Run without --dry-run to apply changes.');
} else {
  console.log('Run npm run verify to refresh verification report.');
}
