#!/usr/bin/env node
/**
 * AnchorFact Markdown → JSON-LD Compiler v0.2.1
 * 
 * v0.2.1: 读取 verification-report.json，用真实来源验证结果计算置信度
 * v0.2:   公开置信度公式 + verification 层 + atomic_facts source_ref
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { load } from 'js-yaml';

// ---- Helpers ----

function normalizePath(p) {
  return (p || '').replace(/\\/g, '/');
}

// ---- Verification Report Cache ----

let _verificationMap = null;
let _verificationTimestamp = null;

function loadVerificationReport(reportPath) {
  try {
    if (!existsSync(reportPath)) {
      console.warn('⚠ verification-report.json not found — using estimated confidence');
      return;
    }
    const raw = readFileSync(reportPath, 'utf-8');
    const report = JSON.parse(raw);
    const map = new Map();
    for (const article of report.articles || []) {
      map.set(normalizePath(article.file), article);
    }
    _verificationMap = map;
    _verificationTimestamp = report.summary?.generated || null;
    console.log(`📋 Loaded verification report: ${map.size} articles, generated ${_verificationTimestamp}`);
  } catch (e) {
    console.warn(`⚠ Could not load verification report: ${e.message}`);
    _verificationMap = new Map();
  }
}

function lookupVerificationData(filePath) {
  if (!_verificationMap) return null;
  return _verificationMap.get(normalizePath(filePath)) || null;
}

// ---- YAML Frontmatter Parser ----

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

// ---- Source Tier Classification (Public) ----

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
// 与 verify-sources.js 中的 computeConfidence 完全一致
// v0.2.1: 当 verificationData 存在时，使用真实来源验证结果

function computeConfidence(sources, article, verificationData) {
  if (!sources || sources.length === 0) {
    return { score: 0, level: 'low', inputs: {} };
  }

  const tierMap = { 'S': 1.0, 'A': 0.9, 'B': 0.6, 'C': 0.3, 'D': 0 };
  const tiers = sources.map(s => tierMap[classifySourceTier(s)] || 0.3);
  const bestTier = Math.max(...tiers);

  const count = sources.length;
  const sourceCountScore = count >= 3 ? 1.0 : count >= 2 ? 0.8 : 0.5;

  // source_verified: 优先使用实际验证数据
  const hasDoi = sources.some(s => s.doi);
  const hasDoiVerified = verificationData?.verification_results?.some(vr =>
    vr.results?.some(r => r.method === 'doi' && r.verified)
  );
  let sourceVerifiedScore;
  let scoreBasis = 'estimated';

  if (verificationData && verificationData.sources_total > 0) {
    const vTotal = verificationData.sources_total;
    const vVerified = verificationData.sources_verified || 0;
    const verifiedRatio = vTotal > 0 ? vVerified / vTotal : 0;
    sourceVerifiedScore = hasDoiVerified ? 1.0
      : verifiedRatio >= 0.75 ? 0.9
      : verifiedRatio >= 0.5 ? 0.7
      : verifiedRatio > 0 ? 0.4
      : 0.2;
    scoreBasis = 'verified_sources';
  } else {
    sourceVerifiedScore = hasDoi ? 1.0 : sources.some(s => s.url) ? 0.7 : 0.4;
  }

  const years = sources.map(s => s.year).filter(Boolean);
  const maxFreshness = years.length > 0 ? computeFreshnessScore({ year: Math.max(...years) }) : 0.5;

  const hasDisputed = article.disputed_statements && article.disputed_statements.length > 0;
  const hasKnownGaps = article.known_gaps && article.known_gaps.length > 0;
  const decayScore = (hasDisputed ? 0.2 : 0) + (hasKnownGaps ? 0.1 : 0);

  const score = parseFloat((
    bestTier * 0.35 +
    sourceCountScore * 0.20 +
    sourceVerifiedScore * 0.25 +
    maxFreshness * 0.10 -
    decayScore * 0.10
  ).toFixed(4));

  const level = score >= 0.85 ? 'high' : score >= 0.60 ? 'medium' : 'low';

  return {
    score,
    level,
    formula_version: 'v1.0',
    inputs: {
      source_tier: bestTier,
      source_count: sourceCountScore,
      source_verified: sourceVerifiedScore,
      freshness: maxFreshness,
      decay: decayScore,
      based_on: scoreBasis
    }
  };
}

// ---- Compilers ----

function compileJsonLd(frontmatter, body, filePath) {
  const articleId = frontmatter.id || basename(filePath, '.md');
  const sources = frontmatter.primary_sources || [];
  const vd = lookupVerificationData(filePath);
  const confidence = computeConfidence(sources, frontmatter, vd);

  const verification = {
    "confidence_formula_version": confidence.formula_version,
    "confidence_inputs": confidence.inputs,
    "confidence_level": confidence.level,
    "confidence_score": confidence.score,
    "confidence_basis": confidence.inputs.based_on,
    "sources_total": sources.length
  };

  if (vd) {
    verification.sources_verified = vd.sources_verified;
    verification.sources_unreachable = vd.sources_unreachable;
    verification.verification_timestamp = _verificationTimestamp;
    verification.verification_note = "实际来源验证已执行";
  } else {
    verification.sources_verified = null;
    verification.sources_unreachable = null;
    verification.verification_timestamp = null;
    verification.verification_note = "未运行 verify-sources.js，来源验证状态为估算值";
  }

  verification.sources_tier = sources.map(s => classifySourceTier(s));
  verification.sources_has_doi = sources.some(s => s.doi);
  verification.sources_has_url = sources.some(s => s.url);
  verification.article_has_disputed = !!(frontmatter.disputed_statements && frontmatter.disputed_statements.length > 0);
  verification.article_has_known_gaps = !!(frontmatter.known_gaps && frontmatter.known_gaps.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": frontmatter.schema_type || "Article",
    "@id": `https://anchorfact.org/kb/${articleId}`,
    "headline": frontmatter.title,
    "description": extractTldr(body),
    "dateCreated": frontmatter.created_date || new Date().toISOString(),
    "dateModified": frontmatter.updated || new Date().toISOString(),
    "author": { "@type": "Organization", "name": "AnchorFact" },
    "publisher": { "@type": "Organization", "name": "AnchorFact", "url": "https://anchorfact.org" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "anchorfact:confidence": confidence.level,
    "anchorfact:confidenceScore": confidence.score,
    "anchorfact:generationMethod": frontmatter.generation_method || 'ai_structured',
    "anchorfact:verification": verification,
    "citation": sources.map(s => ({
      "@type": "CreativeWork",
      "name": s.title,
      "author": s.authors?.join(", "),
      "sameAs": s.url || `https://doi.org/${s.doi}`,
      "anchorfact:sourceTier": classifySourceTier(s),
      "anchorfact:year": s.year || null
    }))
  };
}

function compileAtomicFacts(frontmatter) {
  return (frontmatter.atomic_facts || []).map(fact => {
    const factJson = {
      "@context": "https://schema.org",
      "@type": "Claim",
      "@id": `https://anchorfact.org/fact/${fact.id}`,
      "text": fact.statement,
      "anchorfact:confidence": fact.confidence,
      "anchorfact:sourceRef": fact.source_ref || null,
      "anchorfact:sourceExcerpt": fact.source_excerpt || null,
      "anchorfact:verificationMethod": fact.verification_method || null
    };

    if (fact.source_doi) {
      factJson.citation = { "@type": "CreativeWork", "sameAs": `https://doi.org/${fact.source_doi}` };
    } else if (fact.source_url) {
      factJson.citation = { "@type": "CreativeWork", "sameAs": fact.source_url };
    }

    return factJson;
  });
}

function compilePlainText(frontmatter, body, filePath) {
  const vd = lookupVerificationData(filePath);
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter, vd);
  const basis = confidence.inputs.based_on === 'verified_sources' ? '(verified)' : '(estimated)';
  return `# ${frontmatter.title}
Confidence: ${confidence.level} (${confidence.score}) ${basis}
Last verified: ${frontmatter.last_verified || 'N/A'}
Generation: ${frontmatter.generation_method || 'ai_structured'}

${body}
`;
}

function compileTurtle(frontmatter, body, filePath) {
  const articleId = frontmatter.id || basename(filePath, '.md');
  const vd = lookupVerificationData(filePath);
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter, vd);
  const lines = [];

  lines.push(`@prefix schema: <https://schema.org/> .`);
  lines.push(`@prefix af: <https://anchorfact.org/ns#> .`);
  lines.push(``);
  lines.push(`<https://anchorfact.org/kb/${articleId}>`);
  lines.push(`  a schema:${frontmatter.schema_type || "Article"} ;`);
  lines.push(`  schema:headline "${escapeTurtle(frontmatter.title)}" ;`);
  lines.push(`  af:confidence "${confidence.level}" ;`);
  lines.push(`  af:confidenceScore "${confidence.score}" ;`);
  lines.push(`  af:confidenceBasis "${confidence.inputs.based_on || 'estimated'}" ;`);
  lines.push(`  af:generationMethod "${frontmatter.generation_method || 'ai_structured'}" .`);

  if (frontmatter.primary_sources) {
    frontmatter.primary_sources.forEach((s) => {
      lines.push(``);
      lines.push(`<https://anchorfact.org/kb/${articleId}>`);
      lines.push(`  schema:citation <${s.url || `https://doi.org/${s.doi}`}> ;`);
      lines.push(`  af:sourceTier "${classifySourceTier(s)}" .`);
    });
  }

  return lines.join('\n');
}

// ---- Helpers ----

function extractTldr(body) {
  const tldrSection = body.match(/## TL;DR\s*\n+([^\n]+(?:\n[^\n#]+)*)/);
  if (tldrSection) return tldrSection[1].trim().split('\n')[0];
  return body.trim().split('\n')[0]?.replace(/^#+\s*/, '') || '';
}

function escapeTurtle(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// ---- Main ----

function compileFile(mdPath, distDir) {
  const mdContent = readFileSync(mdPath, 'utf-8');
  const { frontmatter, body } = splitFrontmatter(mdContent);

  if (!frontmatter.id && !frontmatter.title) {
    console.warn(`⚠ Skipping ${mdPath}: no frontmatter found`);
    return;
  }

  const articleId = frontmatter.id || basename(mdPath, '.md');
  const outDir = join(distDir, articleId);
  mkdirSync(outDir, { recursive: true });

  // 1. JSON-LD (with verification layer)
  const jsonLd = compileJsonLd(frontmatter, body, mdPath);
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(jsonLd, null, 2));

  // 2. Atomic Facts
  const atomicFacts = compileAtomicFacts(frontmatter);
  if (atomicFacts.length > 0) {
    writeFileSync(join(outDir, 'facts.json'), JSON.stringify(atomicFacts, null, 2));
  }

  // 3. Plain Text
  const plainText = compilePlainText(frontmatter, body, mdPath);
  writeFileSync(join(outDir, 'index.txt'), plainText);

  // 4. RDF/Turtle
  const turtle = compileTurtle(frontmatter, body, mdPath);
  writeFileSync(join(outDir, 'index.ttl'), turtle);

  // 5. Markdown (copy)
  writeFileSync(join(outDir, 'index.md'), mdContent);

  // 6. HTML
  const vd = lookupVerificationData(mdPath);
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter, vd);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${frontmatter.title} — AnchorFact</title>
  <meta name="anchorfact:confidence" content="${confidence.level} (${confidence.score})">
  <meta name="anchorfact:generation" content="${frontmatter.generation_method || 'ai_structured'}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body><article>${body.replace(/\n/g, '<br>\n')}</article></body>
</html>`;
  writeFileSync(join(outDir, 'index.html'), html);

  const basisIcon = confidence.inputs.based_on === 'verified_sources' ? '✓' : '?';
  console.log(`${basisIcon} Compiled: ${mdPath} → ${outDir}/ (${confidence.level}/${confidence.score}, basis=${confidence.inputs.based_on})`);
  return { articleId, ...jsonLd, _confidence: confidence };
}

function compileAll(contentDir, distDir, verificationReportPath) {
  // 先加载验证报告
  const reportPath = verificationReportPath || join(process.cwd(), 'verification-report.json');
  loadVerificationReport(reportPath);

  const results = [];

  function walk(dir) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.md') && !entry.startsWith('_')) {
        const result = compileFile(fullPath, distDir);
        if (result) results.push(result);
      }
    }
  }

  if (!existsSync(contentDir)) {
    console.error(`❌ Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  walk(contentDir);
  return results;
}

// ---- CLI ----

const contentDir = process.argv[2] || join(process.cwd(), 'content');
const distDir = process.argv[3] || join(process.cwd(), 'dist');
const verificationReportPath = process.argv[4] || join(process.cwd(), 'verification-report.json');

console.log(`🔨 AnchorFact Compiler v0.2.1`);
console.log(`   Content: ${contentDir}`);
console.log(`   Output:  ${distDir}`);
if (existsSync(verificationReportPath)) {
  console.log(`   Verify:  ${verificationReportPath}`);
} else {
  console.log(`   Verify:  (not found — estimated confidence)`);
}
console.log('');

const start = performance.now();
const results = compileAll(contentDir, distDir, verificationReportPath);
const elapsed = (performance.now() - start).toFixed(0);

console.log('');
console.log(`📦 Compiled ${results.length} articles in ${elapsed}ms`);

// Confidence Summary
const confidenceSummary = {
  high: results.filter(r => r._confidence?.level === 'high').length,
  medium: results.filter(r => r._confidence?.level === 'medium').length,
  low: results.filter(r => r._confidence?.level === 'low').length,
  basis: {
    verified: results.filter(r => r._confidence?.inputs?.based_on === 'verified_sources').length,
    estimated: results.filter(r => r._confidence?.inputs?.based_on !== 'verified_sources').length
  }
};
console.log(`   Confidence: high=${confidenceSummary.high} medium=${confidenceSummary.medium} low=${confidenceSummary.low}`);
console.log(`   Basis: verified=${confidenceSummary.basis.verified} estimated=${confidenceSummary.basis.estimated}`);

// Emit manifest
const manifest = {
  generated: new Date().toISOString(),
  articles: results.length,
  ids: results.map(r => r['@id']),
  confidence_distribution: confidenceSummary,
  compiler_version: '0.2.1',
  verification_report: _verificationTimestamp ? { timestamp: _verificationTimestamp, articles_verified: _verificationMap?.size || 0 } : null
};
writeFileSync(join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

// Generate root index.html
const articleLinks = results.map(r => {
  const id = r['@id'].split('/').pop();
  const conf = r._confidence;
  const badge = conf?.inputs?.based_on === 'verified_sources' ? '✓' : '';
  return `<span title="confidence: ${conf?.level} (${conf?.score}) [${conf?.inputs?.based_on}]">${badge}` +
    `<a href="/${id}/">${r.headline || id}</a></span>` +
    ` · <a href="/${id}/index.json">JSON-LD</a>` +
    ` · <a href="/${id}/index.txt">TXT</a>` +
    ` · <a href="/${id}/index.ttl">TTL</a>`;
}).join('<br>\n    ');

const rootHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AnchorFact — Anchor AI to Facts</title>
  <meta name="description" content="AnchorFact: AI-structured knowledge base for LLM citations. Confidence based on verified sources.">
  <meta name="msvalidate.01" content="B9AA7B911CF59012FB84CBDD7470CBA4" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://anchorfact.org",
    "name": "AnchorFact",
    "url": "https://anchorfact.org",
    "description": "AI-structured knowledge base for LLM citations. Trust anchored in verifiable sources.",
    "publisher": { "@type": "Organization", "name": "AnchorFact" }
  }
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 760px; margin: 40px auto; padding: 0 20px; color: #1E293B; line-height: 1.6; }
    h1 { color: #2563EB; font-size: 2rem; margin-bottom: 0.25em; }
    p.tagline { color: #64748B; font-size: 1.1rem; margin-bottom: 1em; }
    .meta { color: #94A3B8; font-size: 0.85rem; margin-bottom: 2em; }
    .link-row { margin: 6px 0; }
    .link-row a { color: #2563EB; text-decoration: none; }
    .card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px 20px; margin: 12px 0; }
    .footer { color: #94A3B8; font-size: 0.85rem; margin-top: 3em; }
    .badge-h { background: #DCFCE7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
    .badge-m { background: #FEF9C3; color: #854D0E; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
    .badge-l { background: #FEE2E2; color: #991B1B; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
  </style>
</head>
<body>
  <h1>AnchorFact</h1>
  <p class="tagline">Anchor AI to Facts. Trust anchored in verifiable sources.</p>
  <p class="meta">Confidence based on ${confidenceSummary.basis.verified} verified · ${confidenceSummary.basis.estimated} estimated · ${_verificationTimestamp ? 'report: ' + _verificationTimestamp : 'no verification report'}</p>
  <p>An <strong>AI-structured knowledge base</strong> for LLM citations. Every article is compiled from traceable publications — not written, but <em>integrated</em>. Confidence is computed by a <strong>public formula</strong> with actual source verification data.</p>
  <div class="card">
    <strong>For AIs</strong><br>
    <a href="/llms.txt">llms.txt</a> — site map for LLM crawlers
  </div>
  <div class="card">
    <strong>Knowledge Base (${results.length} articles)</strong><br>
    <span class="badge-h">high: ${confidenceSummary.high}</span>
    <span class="badge-m">medium: ${confidenceSummary.medium}</span>
    <span class="badge-l">low: ${confidenceSummary.low}</span>
    <br><br>
    ${articleLinks}
  </div>
  <div class="card">
    <strong>Project</strong><br>
    <a href="https://github.com/anchorfact/anchorfact">GitHub</a> ·
    <a href="https://github.com/anchorfact/anchorfact/blob/main/DESIGN.md">Design</a> ·
    <a href="/manifest.json">Manifest</a>
  </div>
  <p class="footer">
    Content: CC-BY 4.0 · Code: MIT · Compiler: v0.2.1<br>
    ✓ = confidence from verified sources &nbsp; ? = estimated (re-run verify-sources.js)
  </p>
</body>
</html>`;
writeFileSync(join(distDir, 'index.html'), rootHtml);
console.log('✅ Root index.html generated');

// Generate llms.txt
const llmsTxtEntries = results.map(r => {
  const id = r['@id'].split('/').pop();
  const basis = r._confidence?.inputs?.based_on === 'verified_sources' ? '✓' : '?';
  return `- ${basis} [${r.headline || id}](https://anchorfact.org/${id}/index.md): ${r.description || ''} [${r._confidence?.level}]`;
}).join('\n');

const llmsTxt = `# AnchorFact

> AnchorFact is an AI-structured knowledge base for LLM citations. Confidence is computed by a public formula using actual source verification data (✓) or estimated (?). Content is available in multiple formats.

## Knowledge Base (${results.length} articles)

${llmsTxtEntries}

## API

- [Manifest](https://anchorfact.org/manifest.json): Full article index with confidence distribution
- [JSON-LD endpoint](https://anchorfact.org/kb-2026-00001/index.json): Structured data with verification layer
- [Turtle endpoint](https://anchorfact.org/kb-2026-00001/index.ttl): RDF knowledge graph data

## Legend

- ✓ = confidence from verified sources (run verify-sources.js)
- ? = estimated confidence (verification data not available)

## Optional

- [GitHub Repository](https://github.com/anchorfact/anchorfact): Source code, design docs
`;
writeFileSync(join(distDir, 'llms.txt'), llmsTxt);
console.log('✅ llms.txt generated');

// Generate sitemap.xml and robots.txt
const sitemapUrls = [].concat(
  `<url><loc>https://anchorfact.org/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
  `<url><loc>https://anchorfact.org/llms.txt</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`,
  ...results.flatMap(r => {
    const id = r['@id'].split('/').pop();
    return [
      `<url><loc>https://anchorfact.org/${id}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
      `<url><loc>https://anchorfact.org/${id}/index.md</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
      `<url><loc>https://anchorfact.org/${id}/index.json</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    ];
  })
);
const sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ' + sitemapUrls.join('\n  ') + '\n</urlset>\n';
writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml);
console.log('✅ sitemap.xml generated');

const robotsTxt = `# robots.txt — AnchorFact (maximal AI accessibility)
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /
Crawl-delay: 0

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 0

User-agent: Claude-SearchBot
Allow: /
Crawl-delay: 0

User-agent: Claude-User
Allow: /
Crawl-delay: 0

User-agent: PerplexityBot
Allow: /
Crawl-delay: 0

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Google-Extended
Allow: /
Crawl-delay: 0

Sitemap: https://anchorfact.org/sitemap.xml
`;
writeFileSync(join(distDir, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt generated');

// IndexNow key file
writeFileSync(join(distDir, 'dc8a3c2e1f4b5a7d9e0c8b6f3a5d7e9c.txt'), 'dc8a3c2e1f4b5a7d9e0c8b6f3a5d7e9c');
console.log('✅ IndexNow key generated');

// _headers for AI-optimized HTTP headers (Cloudflare Pages)
const headersFile = `# _headers — AnchorFact AI-optimized headers
/*/index.json
  Access-Control-Allow-Origin: *
  Content-Type: application/ld+json; charset=utf-8
  Cache-Control: public, max-age=86400
/*/index.ttl
  Access-Control-Allow-Origin: *
  Content-Type: text/turtle; charset=utf-8
  Cache-Control: public, max-age=86400
/*/index.md
  Cache-Control: public, max-age=604800
/*/index.txt
  Cache-Control: public, max-age=604800
/llms.txt
  Cache-Control: public, max-age=3600
/manifest.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600
/sitemap.xml
  Content-Type: application/xml; charset=utf-8
  Cache-Control: public, max-age=86400
/robots.txt
  Cache-Control: public, max-age=86400
`;
writeFileSync(join(distDir, '_headers'), headersFile);
console.log('✅ _headers generated');

