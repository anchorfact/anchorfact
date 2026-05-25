#!/usr/bin/env node
/**
 * AnchorFact Source Verification — 来源刚性验证
 * 
 * 扫描 content/ 下所有 Markdown 文件，对每个 primary_source：
 *   - DOI → CrossRef API 验证元数据存在
 *   - arXiv ID → arXiv API 验证
 *   - URL → HTTP HEAD 检查可达性
 * 
 * 输出：verification-report.json（可被 compile.js 和下游系统消费）
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { load } from 'js-yaml';

// ---- Token Bucket (Rate Limiting) ----
const RATE_LIMIT_MS = 200; // CrossRef 建议每秒 ≤ 5 请求

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- CrossRef DOI Verification ----
async function verifyDoi(doi) {
  const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//i, '');
  try {
    const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(cleanDoi)}`, {
      headers: { 'User-Agent': 'AnchorFact/0.1 (mailto:hello@anchorfact.org)' }
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
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'AnchorFact/0.1 (mailto:hello@anchorfact.org)' },
      redirect: 'follow'
    });
    clearTimeout(timeout);
    return {
      verified: res.status >= 200 && res.status < 400,
      status: res.status,
      final_url: res.url
    };
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
  return 'C'; // default
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
// 此公式与 compile.js 中的 computeConfidence 完全相同
function computeConfidence(sources, verificationResults, article) {
  if (!sources || sources.length === 0) {
    return { score: 0, level: 'low', inputs: {} };
  }

  // 1. Source Tier (取最高等级)
  const tierMap = { 'S': 1.0, 'A': 0.9, 'B': 0.6, 'C': 0.3, 'D': 0 };
  const tiers = sources.map(s => tierMap[classifySourceTier(s)] || 0.3);
  const bestTier = Math.max(...tiers);
  const sourceTierScore = bestTier;

  // 2. Source Count
  const count = sources.length;
  const sourceCountScore = count >= 3 ? 1.0 : count >= 2 ? 0.8 : 0.5;

  // 3. Source Verified (DOI 可查 / URL 可达)
  const verifiedCount = verificationResults.filter(r => r.verified).length;
  const verifiedRatio = sources.length > 0 ? verifiedCount / sources.length : 0;
  // 混合：DOI 来源权重更高
  const hasDoiVerified = verificationResults.some(r => r.verified && r.method === 'doi');
  const sourceVerifiedScore = hasDoiVerified ? 1.0 : verifiedRatio >= 0.5 ? 0.7 : verifiedRatio > 0 ? 0.4 : 0;

  // 4. Freshness
  const years = sources.map(s => s.year).filter(Boolean);
  const maxFreshness = years.length > 0 ? computeFreshnessScore({ year: Math.max(...years) }) : 0.5;

  // 5. Decay Factor
  const hasDisputed = article.disputed_statements && article.disputed_statements.length > 0;
  const hasKnownGaps = article.known_gaps && article.known_gaps.length > 0;
  const decayScore = (hasDisputed ? 0.2 : 0) + (hasKnownGaps ? 0.1 : 0);

  const score = parseFloat((
    sourceTierScore * 0.35 +
    sourceCountScore * 0.20 +
    sourceVerifiedScore * 0.25 +
    maxFreshness * 0.10 -
    decayScore * 0.10
  ).toFixed(4));

  const level = score >= 0.85 ? 'high' : score >= 0.60 ? 'medium' : 'low';

  return {
    score,
    level,
    inputs: {
      source_tier: sourceTierScore,
      source_count: sourceCountScore,
      source_verified: sourceVerifiedScore,
      freshness: maxFreshness,
      decay: decayScore
    }
  };
}

// ---- Markdown Parser ----
function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };

  const endIndex = lines.slice(1).findIndex(line => line.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };

  const yamlBlock = lines.slice(1, endIndex + 1).join('\n');
  const body = lines.slice(endIndex + 2).join('\n');

  try {
    const fm = load(yamlBlock) || {};
    return { frontmatter: fm, body };
  } catch (e) {
    console.warn(`⚠ YAML parse error: ${e.message}`);
    return { frontmatter: {}, body: mdContent };
  }
}

// ---- Source Extractor ----
function extractIdentifiers(source) {
  const ids = { doi: null, arxiv: null, url: null };

  if (source.doi) {
    ids.doi = source.doi.startsWith('10.') ? source.doi : source.doi.replace(/^https?:\/\/doi\.org\//i, '');
  }
  if (source.url) {
    const url = source.url;
    if (url.includes('arxiv.org')) {
      const arxivMatch = url.match(/(?:arxiv\.org\/(?:abs|pdf)\/)?(\d{4}\.\d{4,5}(?:v\d+)?)/);
      if (arxivMatch) ids.arxiv = arxivMatch[1];
    } else {
      ids.url = url;
    }
  }

  return ids;
}

// ---- Main: Verify All Sources ----
async function verifySource(source, filePath) {
  const ids = extractIdentifiers(source);
  const results = [];

  if (ids.doi) {
    await sleep(RATE_LIMIT_MS);
    try {
      const result = await verifyDoi(ids.doi);
      results.push({
        method: 'doi',
        identifier: ids.doi,
        verified: result.verified,
        metadata: result.verified ? {
          title: result.title,
          publisher: result.publisher,
          year: result.year
        } : { error: result.error },
        match: result.verified ? (result.title?.toLowerCase().includes(source.title?.toLowerCase()?.slice(0, 30) || '') || false) : false
      });
    } catch (e) {
      results.push({ method: 'doi', identifier: ids.doi, verified: false, metadata: { error: e.message }, match: false });
    }
  }

  if (ids.arxiv) {
    await sleep(RATE_LIMIT_MS);
    try {
      const result = await verifyArxiv(ids.arxiv);
      results.push({
        method: 'arxiv',
        identifier: ids.arxiv,
        verified: result.verified,
        metadata: result.verified ? { title: result.title } : { error: result.error },
        match: result.verified
      });
    } catch (e) {
      results.push({ method: 'arxiv', identifier: ids.arxiv, verified: false, metadata: { error: e.message }, match: false });
    }
  }

  if (ids.url && !ids.doi && !ids.arxiv) {
    await sleep(RATE_LIMIT_MS / 2);
    try {
      const result = await verifyUrl(ids.url);
      results.push({
        method: 'url',
        identifier: ids.url,
        verified: result.verified,
        metadata: { status: result.status, final_url: result.final_url },
        match: result.verified
      });
    } catch (e) {
      results.push({ method: 'url', identifier: ids.url, verified: false, metadata: { error: e.message }, match: false });
    }
  }

  return results;
}

async function verifyArticle(filePath) {
  const mdContent = readFileSync(filePath, 'utf-8');
  const { frontmatter } = splitFrontmatter(mdContent);

  const sources = frontmatter.primary_sources || [];
  const allResults = [];

  for (const source of sources) {
    const results = await verifySource(source, filePath);
    allResults.push({
      source_title: source.title,
      source_type: source.type || 'unknown',
      results,
      all_verified: results.every(r => r.verified)
    });
  }

  return {
    file: filePath,
    article_id: frontmatter.id || null,
    generation_method: frontmatter.generation_method || 'unknown',
    sources_total: sources.length,
    verification_results: allResults,
    sources_verified: allResults.filter(r => r.all_verified).length,
    sources_unreachable: allResults.filter(r => r.results.length > 0 && !r.results.some(res => res.verified)).length
  };
}

async function verifyAll(contentDir) {
  const articles = [];

  function walk(dir) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.md') && !entry.startsWith('_')) {
        articles.push(fullPath);
      }
    }
  }

  if (!existsSync(contentDir)) {
    console.error(`Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  walk(contentDir);
  console.log(`Found ${articles.length} articles to verify\n`);

  const results = [];
  for (let i = 0; i < articles.length; i++) {
    const filePath = articles[i];
    console.log(`[${i + 1}/${articles.length}] Verifying: ${filePath}`);
    try {
      const result = await verifyArticle(filePath);
      results.push(result);

      const verified = result.sources_verified;
      const total = result.sources_total;
      console.log(`  ✓ ${verified}/${total} sources verified, ${result.sources_unreachable} unreachable`);
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}`);
      results.push({
        file: filePath,
        error: e.message,
        sources_total: 0,
        sources_verified: 0,
        sources_unreachable: 0
      });
    }
  }

  return results;
}

// ---- Compute Confidence for Each Article ----
function computeConfidenceForResults(results) {
  return results.map(r => {
    if (r.error) {
      return { ...r, confidence: { score: 0, level: 'low', inputs: {} } };
    }

    const sources = [];
    r.verification_results.forEach(vr => {
      sources.push({
        type: vr.source_type,
        year: vr.results[0]?.metadata?.year || null
      });
    });

    const flatResults = r.verification_results.flatMap(vr => vr.results);
    const confidence = computeConfidence(sources, flatResults, {});

    return { ...r, confidence };
  });
}

// ---- CLI ----
const contentDir = process.argv[2] || join(process.cwd(), 'content');
const outputFile = process.argv[3] || join(process.cwd(), 'verification-report.json');

console.log(`AnchorFact Source Verification`);
console.log(`  Content: ${contentDir}`);
console.log(`  Output:  ${outputFile}\n`);

const start = performance.now();
const results = await verifyAll(contentDir);
const withConfidence = computeConfidenceForResults(results);

const elapsed = (performance.now() - start).toFixed(0);

const summary = {
  generated: new Date().toISOString(),
  total_articles: results.length,
  total_with_errors: results.filter(r => r.error).length,
  average_sources_per_article: results.length > 0
    ? (results.reduce((sum, r) => sum + r.sources_total, 0) / results.length).toFixed(1)
    : 0,
  overall_verification_rate: results.length > 0
    ? (results.reduce((sum, r) => sum + r.sources_verified, 0) / results.reduce((sum, r) => sum + r.sources_total, 0) * 100).toFixed(1) + '%'
    : '0%',
  confidence_distribution: {
    high: withConfidence.filter(r => r.confidence?.level === 'high').length,
    medium: withConfidence.filter(r => r.confidence?.level === 'medium').length,
    low: withConfidence.filter(r => r.confidence?.level === 'low').length
  },
  elapsed_ms: parseInt(elapsed)
};

const report = { summary, articles: withConfidence };
writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log(`\n📋 Verification Report: ${outputFile}`);
console.log(`   Articles: ${summary.total_articles}`);
console.log(`   Sources/article: ${summary.average_sources_per_article}`);
console.log(`   Verify rate: ${summary.overall_verification_rate}`);
console.log(`   Confidence: high=${summary.confidence_distribution.high} medium=${summary.confidence_distribution.medium} low=${summary.confidence_distribution.low}`);
console.log(`   Elapsed: ${elapsed}ms`);
