#!/usr/bin/env node
/**
 * AnchorFact Source Verification v0.2
 *   - 并行化：文章内来源并行 + 文章间并发度 5
 *   - 全局 rate limiter：每秒最多 5 个外部 API 请求
 *   - 输出：verification-report.json
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

// ---- Rate Limiter ----
const RATE_LIMIT_MS = 200; // 每秒 ≤ 5 请求
let _lastRequestTime = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function rateLimit() {
  const now = Date.now();
  const elapsed = now - _lastRequestTime;
  if (elapsed < RATE_LIMIT_MS) {
    await sleep(RATE_LIMIT_MS - elapsed);
  }
  _lastRequestTime = Date.now();
}

// ---- Concurrency Helper ----
async function runWithConcurrency(tasks, limit) {
  const results = new Array(tasks.length);
  const executing = new Set();

  for (let i = 0; i < tasks.length; i++) {
    const p = tasks[i]().then(r => { executing.delete(p); results[i] = r; return r; });
    executing.add(p);
    if (executing.size >= limit) await Promise.race(executing);
  }
  await Promise.all(executing);
  return results;
}

// ---- CrossRef DOI Verification ----
async function verifyDoi(doi) {
  const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//i, '');
  await rateLimit();
  try {
    const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(cleanDoi)}`, {
      headers: { 'User-Agent': 'AnchorFact/0.2 (mailto:hello@anchorfact.org)' }
    });
    if (res.status === 200) {
      const data = await res.json();
      const msg = data.message;
      return {
        verified: true,
        title: msg.title?.[0] || null,
        publisher: msg.publisher || null,
        year: msg.created?.['date-parts']?.[0]?.[0] || msg.issued?.['date-parts']?.[0]?.[0] || null,
        type: msg.type || null
      };
    }
    return { verified: false, error: `CrossRef returned ${res.status}` };
  } catch (e) {
    return { verified: false, error: e.message };
  }
}

// ---- arXiv ID Verification ----
async function verifyArxiv(arxivId) {
  const cleanId = arxivId.replace(/^arxiv:/i, '').replace(/^https?:\/\/arxiv\.org\/(abs|pdf)\//i, '');
  await rateLimit();
  try {
    const res = await fetch(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(cleanId)}&max_results=1`);
    if (res.status === 200) {
      const text = await res.text();
      if (text.includes('<title>') && !text.includes('No result')) {
        const titleMatch = text.match(/<title>(.*?)<\/title>/);
        const authorMatches = [...text.matchAll(/<author>[\s\S]*?<name>(.*?)<\/name>[\s\S]*?<\/author>/g)];
        return {
          verified: true,
          title: titleMatch?.[1]?.trim() || null,
          authors: authorMatches.map(m => m[1].trim()),
          arxiv_id: cleanId
        };
      }
    }
    return { verified: false, error: `arXiv returned ${res.status}` };
  } catch (e) {
    return { verified: false, error: e.message };
  }
}

// ---- URL Reachability Check ----
async function verifyUrl(url) {
  await rateLimit();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'AnchorFact/0.2 (mailto:hello@anchorfact.org)' },
      redirect: 'follow'
    });
    clearTimeout(timeout);
    return { verified: res.status >= 200 && res.status < 400, status: res.status, final_url: res.url };
  } catch (e) {
    return { verified: false, error: e.message };
  }
}

// ---- Source Tier Classification ----
function classifySourceTier(source) {
  if (source.doi) return 'S';
  if (source.type === 'standard') return 'S';
  if (source.type === 'patent' || source.type === 'rfc') return 'S';
  if (source.type === 'academic_paper' || source.type === 'course_material') return 'A';
  if (source.type === 'government_report' || source.type === 'industry_whitepaper') return 'A';
  if (source.type === 'blog_post' && source.institution) return 'B';
  if (source.type === 'blog_post') return 'B';
  return 'C';
}

// ---- Freshness Score ----
function computeFreshnessScore(source) {
  const year = source.year || 0;
  if (!year) return 0.5;
  const ageYears = new Date().getFullYear() - year;
  if (ageYears <= 1) return 1.0;
  if (ageYears <= 3) return 0.9;
  if (ageYears <= 5) return 0.7;
  if (ageYears <= 10) return 0.5;
  return 0.3;
}

// ---- Confidence Formula (Public, Deterministic) ----
function computeConfidence(sources, verificationResults, article) {
  if (!sources || sources.length === 0) return { score: 0, level: 'low', inputs: {} };

  const tierMap = { 'S': 1.0, 'A': 0.9, 'B': 0.6, 'C': 0.3, 'D': 0 };
  const tiers = sources.map(s => tierMap[classifySourceTier(s)] || 0.3);
  const bestTier = Math.max(...tiers);

  const count = sources.length;
  const sourceCountScore = count >= 3 ? 1.0 : count >= 2 ? 0.8 : 0.5;

  const verifiedCount = verificationResults.filter(r => r.verified).length;
  const verifiedRatio = sources.length > 0 ? verifiedCount / sources.length : 0;
  const hasDoiVerified = verificationResults.some(r => r.verified && r.method === 'doi');
  const sourceVerifiedScore = hasDoiVerified ? 1.0 : verifiedRatio >= 0.5 ? 0.7 : verifiedRatio > 0 ? 0.4 : 0;

  const years = sources.map(s => s.year).filter(Boolean);
  const maxFreshness = years.length > 0 ? computeFreshnessScore({ year: Math.max(...years) }) : 0.5;

  const hasDisputed = article.disputed_statements && article.disputed_statements.length > 0;
  const hasKnownGaps = article.known_gaps && article.known_gaps.length > 0;
  const decayScore = (hasDisputed ? 0.2 : 0) + (hasKnownGaps ? 0.1 : 0);

  const score = parseFloat((
    bestTier * 0.35 + sourceCountScore * 0.20 + sourceVerifiedScore * 0.25 + maxFreshness * 0.10 - decayScore * 0.10
  ).toFixed(4));

  return { score, level: score >= 0.85 ? 'high' : score >= 0.60 ? 'medium' : 'low', inputs: {} };
}

// ---- Markdown Parser ----
function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };
  const endIndex = lines.slice(1).findIndex(l => l.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };
  try {
    return { frontmatter: load(lines.slice(1, endIndex + 1).join('\n')) || {}, body: lines.slice(endIndex + 2).join('\n') };
  } catch (e) {
    return { frontmatter: {}, body: mdContent };
  }
}

// ---- Source Identifier Extractor ----
function extractIdentifiers(source) {
  const ids = { doi: null, arxiv: null, url: null };
  if (source.doi) {
    ids.doi = source.doi.startsWith('10.') ? source.doi : source.doi.replace(/^https?:\/\/doi\.org\//i, '');
  }
  if (source.url) {
    if (source.url.includes('arxiv.org')) {
      const m = source.url.match(/(?:arxiv\.org\/(?:abs|pdf)\/)?(\d{4}\.\d{4,5}(?:v\d+)?)/);
      if (m) ids.arxiv = m[1];
    } else {
      ids.url = source.url;
    }
  }
  return ids;
}

// ---- Verify One Source ----
async function verifySource(source) {
  const ids = extractIdentifiers(source);
  const results = [];

  if (ids.doi) {
    try {
      const r = await verifyDoi(ids.doi);
      results.push({
        method: 'doi', identifier: ids.doi, verified: r.verified,
        metadata: r.verified ? { title: r.title, publisher: r.publisher, year: r.year } : { error: r.error },
        match: r.verified ? (r.title?.toLowerCase().includes(source.title?.toLowerCase()?.slice(0, 30) || '') || false) : false
      });
    } catch (e) {
      results.push({ method: 'doi', identifier: ids.doi, verified: false, metadata: { error: e.message }, match: false });
    }
  }
  if (ids.arxiv) {
    try {
      const r = await verifyArxiv(ids.arxiv);
      results.push({
        method: 'arxiv', identifier: ids.arxiv, verified: r.verified,
        metadata: r.verified ? { title: r.title } : { error: r.error },
        match: r.verified
      });
    } catch (e) {
      results.push({ method: 'arxiv', identifier: ids.arxiv, verified: false, metadata: { error: e.message }, match: false });
    }
  }
  if (ids.url && !ids.doi && !ids.arxiv) {
    try {
      const r = await verifyUrl(ids.url);
      results.push({
        method: 'url', identifier: ids.url, verified: r.verified,
        metadata: { status: r.status, final_url: r.final_url },
        match: r.verified
      });
    } catch (e) {
      results.push({ method: 'url', identifier: ids.url, verified: false, metadata: { error: e.message }, match: false });
    }
  }

  return results;
}

// ---- Verify One Article (sources verified in parallel) ----
async function verifyArticle(filePath) {
  const mdContent = readFileSync(filePath, 'utf-8');
  const { frontmatter } = splitFrontmatter(mdContent);
  const sources = frontmatter.primary_sources || [];

  // 并行验证一篇的所有来源
  const allResults = await Promise.all(sources.map(s => verifySource(s)));

  const vr = allResults.map((results, i) => ({
    source_title: sources[i]?.title || 'unknown',
    source_type: sources[i]?.type || 'unknown',
    results,
    all_verified: results.length > 0 && results.every(r => r.verified)
  }));

  return {
    file: filePath,
    article_id: frontmatter.id || null,
    generation_method: frontmatter.generation_method || 'unknown',
    sources_total: sources.length,
    verification_results: vr,
    sources_verified: vr.filter(v => v.all_verified).length,
    sources_unreachable: vr.filter(v => v.results.length > 0 && !v.results.some(r => r.verified)).length
  };
}

// ---- Verify All (parallel: batch concurrency) ----
const CONCURRENCY = 5;

async function verifyAll(contentDir) {
  const articles = [];

  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) walk(fullPath);
      else if (entry.endsWith('.md') && !entry.startsWith('_')) articles.push(fullPath);
    }
  }

  if (!existsSync(contentDir)) {
    console.error(`❌ Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  walk(contentDir);
  console.log(`Found ${articles.length} articles to verify (concurrency=${CONCURRENCY})\n`);

  let done = 0;
  const results = new Array(articles.length);

  const tasks = articles.map((filePath, i) => async () => {
    try {
      const result = await verifyArticle(filePath);
      results[i] = result;
      done++;
      const pct = Math.round(done / articles.length * 100);
      if (done % 50 === 0 || done === articles.length) {
        console.log(`[${done}/${articles.length}] ${pct}% — ${filePath}: ${result.sources_verified}/${result.sources_total} verified`);
      }
      return result;
    } catch (e) {
      done++;
      results[i] = { file: filePath, error: e.message, sources_total: 0, sources_verified: 0, sources_unreachable: 0 };
      return results[i];
    }
  });

  await runWithConcurrency(tasks, CONCURRENCY);
  return results.filter(Boolean);
}

// ---- CLI ----
const contentDir = process.argv[2] || join(process.cwd(), 'content');
const outputFile = process.argv[3] || join(process.cwd(), 'verification-report.json');

console.log(`AnchorFact Source Verification v0.2`);
console.log(`  Content: ${contentDir}`);
console.log(`  Output:  ${outputFile}`);
console.log(`  Concurrency: ${CONCURRENCY}\n`);

const start = performance.now();
const results = await verifyAll(contentDir);
const elapsed = (performance.now() - start).toFixed(0);

const totalSources = results.reduce((s, r) => s + r.sources_total, 0);
const totalVerified = results.reduce((s, r) => s + r.sources_verified, 0);

const summary = {
  generated: new Date().toISOString(),
  total_articles: results.length,
  total_with_errors: results.filter(r => r.error).length,
  average_sources_per_article: (totalSources / Math.max(results.length, 1)).toFixed(1),
  overall_verification_rate: totalSources > 0 ? (totalVerified / totalSources * 100).toFixed(1) + '%' : '0%',
  elapsed_ms: parseInt(elapsed),
  elapsed_sec: (elapsed / 1000).toFixed(1),
  concurrency: CONCURRENCY
};

const report = { summary, articles: results };
writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log(`\n📋 Verification Report: ${outputFile}`);
console.log(`   Articles: ${summary.total_articles}`);
console.log(`   Sources/article: ${summary.average_sources_per_article}`);
console.log(`   Verify rate: ${summary.overall_verification_rate}`);
console.log(`   Elapsed: ${summary.elapsed_sec}s (${summary.concurrency}x concurrency)`);
