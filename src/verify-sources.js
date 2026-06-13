#!/usr/bin/env node
/**
 * AnchorFact Source Verification v0.2
 *   - 并行化：文章内来源并行 + 文章间并发度 5
 *   - 全局 rate limiter：每秒最多 5 个外部 API 请求
 *   - 输出：verification-report.json
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { load } from 'js-yaml';
import { computeConfidence, classifySourceTier, computeFreshnessScore } from './lib/confidence.js';
import { shouldReuseCachedVerificationResult } from './lib/verification-cache.js';
import { verifyArxiv as verifyArxivMetadata, verifyDoi as verifyDoiMetadata } from './lib/source-metadata-verifier.js';
import { verifyReachableUrl } from './lib/source-url-verifier.js';

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

async function verifyDoi(doi) {
  return verifyDoiMetadata(doi, { beforeAttempt: rateLimit });
}

async function verifyArxiv(arxivId) {
  return verifyArxivMetadata(arxivId, { beforeAttempt: rateLimit });
}

// ---- URL Reachability Check ----
async function verifyUrl(url) {
  return verifyReachableUrl(url, { beforeAttempt: rateLimit });
}

// ---- Source Tier / Freshness — imported from lib/confidence.js ----
// (classifySourceTier, computeFreshnessScore, computeConfidence are shared)

// Verify-specific confidence calculation (uses verificationResults from report)
function computeConfidenceLocal(sources, verificationResults, article) {
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
        metadata: {
          status: r.status,
          final_url: r.final_url,
          http_method: r.http_method,
          fallback_from: r.fallback_from,
          error: r.error
        },
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
    file: normalizePathForVerify(filePath),
    article_id: frontmatter.id || null,
    generation_method: frontmatter.generation_method || 'unknown',
    sources_total: sources.length,
    verification_results: vr,
    sources_verified: vr.filter(v => v.all_verified).length,
    sources_unreachable: vr.filter(v => v.results.length > 0 && !v.results.some(r => r.verified)).length
  };
}

// ---- Verify All (parallel: batch concurrency) ----
const CONCURRENCY = 3;

async function verifyAll(contentDir, oldReportPath, options = {}) {
  const articles = [];
  const targetFiles = new Set((options.targetFiles || []).flatMap(path => {
    const normalized = normalizePathForVerify(path);
    return [normalized, normalizePathForVerify(resolve(path))];
  }));
  const isTargetedRun = targetFiles.size > 0;

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

  // ---- 增量模式加载旧报告 ----
  let oldMap = new Map();
  let oldArticles = [];
  let lastGenerated = null;
  if (oldReportPath && existsSync(oldReportPath)) {
    try {
      const old = JSON.parse(readFileSync(oldReportPath, 'utf-8'));
      oldArticles = old.articles || [];
      lastGenerated = old.summary?.generated ? new Date(old.summary.generated) : null;
      for (const a of oldArticles) {
        oldMap.set(normalizePathForVerify(a.file), a);
      }
    } catch (e) { /* ignore corrupted cache */ }
  }

  const freshArticles = [];
  const cachedResults = [];

  for (const fp of articles) {
    const norm = normalizePathForVerify(fp);
    const cached = oldMap.get(norm);
    const isTargetFile = isTargetedRun
      && (targetFiles.has(norm) || targetFiles.has(normalizePathForVerify(resolve(fp))));
    let fileModifiedAfterReport = true;
    try {
      fileModifiedAfterReport = !lastGenerated || statSync(fp).mtime > lastGenerated;
    } catch (e) { /* re-verify */ }

    if (shouldReuseCachedVerificationResult({
      cached,
      isTargetedRun,
      isTargetFile,
      fileModifiedAfterReport
    })) {
      cachedResults.push(cached);
      continue;
    }

    if (isTargetedRun && !isTargetFile) continue;
    freshArticles.push(fp);
  }

  const fresh = freshArticles.length;
  const cached = cachedResults.length;
  const targetText = isTargetedRun ? `, ${targetFiles.size / 2} target file(s)` : '';
  console.log(`Found ${articles.length} articles: ${fresh} to verify, ${cached} cached${targetText} (concurrency=${CONCURRENCY})\n`);

  let done = 0;
  const freshResults = new Array(freshArticles.length);

  const tasks = freshArticles.map((filePath, i) => async () => {
    try {
      const result = await verifyArticle(filePath);
      freshResults[i] = result;
      done++;
      if (fresh > 0 && (done % 20 === 0 || done === fresh)) {
        const pct = Math.round(done / fresh * 100);
        console.log(`[${done}/${fresh}] ${pct}% — ${filePath}: ${result.sources_verified}/${result.sources_total} verified`);
      }
      return result;
    } catch (e) {
      done++;
      freshResults[i] = { file: filePath, error: e.message, sources_total: 0, sources_verified: 0, sources_unreachable: 0 };
      return freshResults[i];
    }
  });

  await runWithConcurrency(tasks, CONCURRENCY);
  const cachedByFile = new Map(cachedResults.map(result => [normalizePathForVerify(result.file), result]));
  const freshByFile = new Map(freshResults.filter(Boolean).map(result => [normalizePathForVerify(result.file), result]));

  if (isTargetedRun && oldArticles.length > 0) {
    const replaced = new Set();
    const ordered = oldArticles.map(result => {
      const key = normalizePathForVerify(result.file);
      const fresh = freshByFile.get(key);
      if (fresh) {
        replaced.add(key);
        return fresh;
      }
      return result;
    });
    for (const [key, result] of freshByFile) {
      if (!replaced.has(key)) ordered.push(result);
    }
    return ordered;
  }

  return articles
    .map(filePath => freshByFile.get(normalizePathForVerify(filePath)) || cachedByFile.get(normalizePathForVerify(filePath)))
    .filter(Boolean);
}

function normalizePathForVerify(p) {
  return (p || '').replace(/\\/g, '/');
}

// ---- CLI ----
function parseArgs(argv) {
  const args = {
    incremental: false,
    targetFiles: [],
    positional: []
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--incremental' || arg === '-i') {
      args.incremental = true;
    } else if (arg === '--file') {
      const file = argv[++index];
      if (file) args.targetFiles.push(file);
    } else if (!arg.startsWith('-')) {
      args.positional.push(arg);
    }
  }

  return args;
}

const cliArgs = parseArgs(process.argv.slice(2));
const incremental = cliArgs.incremental;
// 过滤掉 flag 参数，取位置参数
const contentDir = cliArgs.positional[0] || join(process.cwd(), 'content');
const outputFile = cliArgs.positional[1] || join(process.cwd(), 'verification-report.json');

const mode = incremental ? 'incremental' : 'full';
const oldReport = incremental ? outputFile : null;
console.log(`AnchorFact Source Verification v0.3`);
console.log(`  Mode: ${mode.toUpperCase()}`);
console.log(`  Content: ${contentDir}`);
console.log(`  Output:  ${outputFile}`);
console.log(`  Concurrency: ${CONCURRENCY}\n`);
if (cliArgs.targetFiles.length > 0) {
  console.log(`  Target files: ${cliArgs.targetFiles.join(', ')}\n`);
}

const start = performance.now();
const results = await verifyAll(contentDir, oldReport, { targetFiles: cliArgs.targetFiles });
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
writeFileSync(outputFile, `${JSON.stringify(report, null, 2)}\n`);

console.log(`\n📋 Verification Report: ${outputFile}`);
console.log(`   Articles: ${summary.total_articles}`);
console.log(`   Sources/article: ${summary.average_sources_per_article}`);
console.log(`   Verify rate: ${summary.overall_verification_rate}`);
console.log(`   Elapsed: ${summary.elapsed_sec}s (${summary.concurrency}x concurrency)`);
