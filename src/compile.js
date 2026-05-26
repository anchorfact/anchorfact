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
import { computeConfidence, classifySourceTier, computeFreshnessScore } from './lib/confidence.js';

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

// ---- Source Tier / Freshness — imported from lib/confidence.js ----
// (classifySourceTier, computeFreshnessScore are shared)

// (computeFreshnessScore, classifySourceTier, computeConfidence are all imported from lib/confidence.js)

// ---- Compilers ----

function compileJsonLd(frontmatter, body, filePath) {
  const articleId = basename(filePath, '.md'); // slug-based, matches dist directory
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
  const articleId = basename(filePath, '.md'); // slug-based, matches dist directory
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

  // slug-based unique ID (avoids agent-pipeline kb-id collisions)
  const articleId = basename(mdPath, '.md');
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
  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "6c2614afcd75419ba49039a97b7378ab"}'></script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body><article>${body.replace(/\n/g, '<br>\n')}</article></body>
</html>`;
  writeFileSync(join(outDir, 'index.html'), html);

  const isPlaceholder = body.includes('待后续补充') || body.includes('待补充');
  if (isPlaceholder) frontmatter.completeness = Math.min(frontmatter.completeness || 0.5, 0.4); // force low completeness for drafts

  const basisIcon = confidence.inputs.based_on === 'verified_sources' ? '✓' : '?';
  const draftIcon = isPlaceholder ? '📝' : '';
  console.log(`${basisIcon}${draftIcon} Compiled: ${mdPath} → ${outDir}/ (${confidence.level}/${confidence.score}, basis=${confidence.inputs.based_on}${isPlaceholder ? ', DRAFT' : ''})`);
  return { articleId, ...jsonLd, _confidence: confidence, _isPlaceholder: isPlaceholder };
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
  _draftMedium: results.filter(r => r._isPlaceholder && r._confidence?.level === 'medium').length,
  _draftLow: results.filter(r => r._isPlaceholder && r._confidence?.level === 'low').length,
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
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta name="msvalidate.01" content="B9AA7B911CF59012FB84CBDD7470CBA4" />
  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "6c2614afcd75419ba49039a97b7378ab"}'></script>
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
  <div class="card" style="background:#F0FDF4;border-color:#BBF7D0;margin-bottom:16px;">
    <strong style="color:#166534;">✅ Verified Sources in Use</strong><br>
    <span style="font-size:1.1rem;font-weight:700;color:#166534;">${confidenceSummary.basis.verified} articles</span> use real source verification data (CrossRef DOI + arXiv API + HTTP).<br>
    <span style="font-size:0.85rem;color:#64748B;">${confidenceSummary.basis.estimated} articles use estimated confidence — run <code>npm run verify</code> to verify them. Verification report: ${_verificationTimestamp ? new Date(_verificationTimestamp).toISOString().slice(0,10) : 'pending'}</span>
  </div>
  <p>An <strong>AI-structured knowledge base</strong> for LLM citations. Every article is compiled from traceable publications — not written, but <em>integrated</em>. Confidence is computed by a <strong>public formula</strong> with actual source verification data.</p>
  <div class="card">
    <strong>For AIs</strong><br>
    <a href="/llms.txt">llms.txt</a> — site map for LLM crawlers ·
    <a href="/dashboard.html">Dashboard</a> — live stats
  </div>
  <div class="card">
    <strong>Completed Articles (${results.filter(r => !r._isPlaceholder).length})</strong><br>
    <span class="badge-h">high: ${confidenceSummary.high}</span>
    <span class="badge-m">medium: ${confidenceSummary.medium - confidenceSummary._draftMedium}</span>
    <span class="badge-l">low: ${confidenceSummary.low - confidenceSummary._draftLow}</span>
    <br><br>
    ${results.filter(r => !r._isPlaceholder).map(r => {
      const id = r['@id'].split('/').pop();
      const conf = r._confidence;
      return `<span title="confidence: ${conf?.level} (${conf?.score}) [${conf?.inputs?.based_on}]">${conf?.inputs?.based_on === 'verified_sources' ? '✓' : '?'}<a href="/${id}/">${r.headline || id}</a></span>` +
        ` · <a href="/${id}/index.json">JSON-LD</a>` +
        ` · <a href="/${id}/index.txt">TXT</a>`;
    }).join('<br>\n    ')}
  </div>
  ${results.filter(r => r._isPlaceholder).length > 0 ? `
  <div class="card" style="background:#FFFBEB;border-color:#FDE68A;">
    <strong style="color:#92400E;">📝 Draft Articles (${results.filter(r => r._isPlaceholder).length})</strong><br>
    <span style="font-size:0.85rem;color:#92400E;">These articles have outline content and verified sources, but detailed analysis is still being completed.</span><br><br>
    ${results.filter(r => r._isPlaceholder).slice(0,15).map(r => {
      const id = r['@id'].split('/').pop();
      return `<a href="/${id}/" style="color:#B45309;">${r.headline || id}</a>`;
    }).join(' · ')}
    ${results.filter(r => r._isPlaceholder).length > 15 ? ' · <em>and '+(results.filter(r=>r._isPlaceholder).length-15)+' more</em>' : ''}
  </div>` : ''}
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
const headersFile = `# _headers — AnchorFact AI-optimized headers with security hardening
# Security hardening (2026-05-26)
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
/*/index.json
  Access-Control-Allow-Origin: *
  Content-Type: application/ld+json; charset=utf-8
  Cache-Control: public, max-age=86400
/*/index.ttl
  Access-Control-Allow-Origin: *
  Content-Type: text/turtle; charset=utf-8
  Cache-Control: public, max-age=86400
/*/index.md
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
  CDN-Cache-Control: public, max-age=604800
/*/index.html
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
  CDN-Cache-Control: public, max-age=604800
/*/index.json
  CDN-Cache-Control: public, max-age=86400
/*/index.ttl
  CDN-Cache-Control: public, max-age=86400
/*/
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/*/index.txt
  Cache-Control: public, max-age=604800
/
  Cache-Control: public, max-age=3600
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

// Generate dashboard.html
const dashHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>AnchorFact Dashboard</title><meta name="description" content="AnchorFact Live Dashboard"><style>:root{--blue:#2563EB;--green:#16A34A;--yellow:#CA8A04;--red:#DC2626;--bg:#F8FAFC;--card:#FFF;--text:#1E293B;--muted:#64748B;--border:#E2E8F0}*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}.container{max-width:960px;margin:0 auto;padding:24px 20px}h1{color:var(--blue);font-size:1.8rem;margin-bottom:4px}.tagline{color:var(--muted);font-size:.95rem;margin-bottom:24px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}.card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:20px}.card .label{font-size:.8rem;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.card .value{font-size:2rem;font-weight:700}.card .sub{font-size:.8rem;color:var(--muted);margin-top:4px}.bar-container{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:20px;margin-bottom:16px}.bar-row{display:flex;align-items:center;margin:8px 0;gap:12px}.bar-label{width:80px;font-size:.85rem;text-align:right}.bar{height:24px;border-radius:4px;min-width:2px}.bar.h{background:var(--green)}.bar.m{background:var(--yellow)}.bar.l{background:var(--red)}.bar-count{font-size:.8rem;font-weight:600;margin-left:8px}table{width:100%;border-collapse:collapse;font-size:.85rem}th,td{text-align:left;padding:8px 12px;border-bottom:1px solid var(--border)}th{color:var(--muted);font-size:.75rem;text-transform:uppercase}.footer{color:var(--muted);font-size:.8rem;margin-top:32px;text-align:center}a{color:var(--blue)}</style></head><body><div class="container"><h1>⚓ AnchorFact Dashboard</h1><p class="tagline">AI-Native Knowledge Base — Live Stats</p><div class="grid"><div class="card"><div class="label">Total Articles</div><div class="value">${results.length}</div><div class="sub">across 11 domains</div></div><div class="card"><div class="label">High Confidence</div><div class="value" style="color:var(--green)">${confidenceSummary.high}</div><div class="sub">${(confidenceSummary.high/results.length*100).toFixed(1)}% (≥ 0.85)</div></div><div class="card"><div class="label">Medium</div><div class="value" style="color:var(--yellow)">${confidenceSummary.medium}</div><div class="sub">${(confidenceSummary.medium/results.length*100).toFixed(1)}%</div></div><div class="card"><div class="label">Low</div><div class="value" style="color:var(--red)">${confidenceSummary.low}</div><div class="sub">${(confidenceSummary.low/results.length*100).toFixed(1)}%</div></div></div><div class="bar-container"><h3>Confidence Distribution</h3>${(()=>{const m=Math.max(confidenceSummary.high,confidenceSummary.medium,confidenceSummary.low,1);return ['high','medium','low'].map(l=>{const v=confidenceSummary[l];const c=l==='high'?'h':l==='medium'?'m':'l';return '<div class="bar-row"><span class="bar-label">'+l.charAt(0).toUpperCase()+l.slice(1)+'</span><div class="bar '+c+'" style="width:'+(v/m*100)+'%"></div><span class="bar-count">'+v+'</span></div>'}).join('')})()}</div><div class="bar-container"><h3>Trust Formula</h3><table><tr><td style="width:140px">Formula</td><td><code>source_tier × 0.35 + source_count × 0.20 + source_verified × 0.25 + freshness × 0.10 − decay × 0.10</code></td></tr><tr><td>Verified basis</td><td>${confidenceSummary.basis?.verified||0} articles</td></tr><tr><td>Estimated basis</td><td>${confidenceSummary.basis?.estimated||0} articles</td></tr><tr><td>Generated</td><td>${new Date().toISOString()}</td></tr><tr><td>Verification report</td><td>${_verificationTimestamp||'N/A'}</td></tr></table></div><p class="footer"><a href="/">Home</a> · <a href="/llms.txt">llms.txt</a> · <a href="/manifest.json">manifest.json</a> · <a href="https://github.com/anchorfact/anchorfact">GitHub</a> · <a href="/dashboard.html">Refresh</a></p></div></body></html>`;
writeFileSync(join(distDir, 'dashboard.html'), dashHtml);
console.log('✅ dashboard.html generated');

// Generate favicon.svg
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#2563EB"/><text x="16" y="23" text-anchor="middle" font-family="system-ui" font-size="22" font-weight="700" fill="white">⚓</text></svg>`;
writeFileSync(join(distDir, 'favicon.svg'), favicon);
console.log('✅ favicon.svg generated');

