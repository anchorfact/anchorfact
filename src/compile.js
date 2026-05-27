#!/usr/bin/env node
/**
 * AnchorFact Markdown -> JSON-LD Compiler v0.3
 *
 * Trust-first compiler:
 * - stable path-derived canonical slugs
 * - public vs draft quality model
 * - public-only llms.txt and sitemap.xml
 * - root claims.json for verified public atomic facts
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { computeConfidence, classifySourceTier } from './lib/confidence.js';
import { evaluateArticleQuality, normalizePath } from './lib/article-quality.js';
import { factEvidenceMapsToSources, isBrokenAtomicFact } from './lib/content-hygiene.js';
import { publicClaims } from './lib/claims.js';
import { compileHtml, escapeHtml, escapeTurtle } from './lib/html.js';
import { buildManifest, distribution } from './lib/manifest.js';

let verificationMap = null;
let verificationTimestamp = null;

function loadVerificationReport(reportPath) {
  if (!existsSync(reportPath)) {
    console.warn('verification-report.json not found; all articles will be treated as estimated/draft.');
    verificationMap = new Map();
    return;
  }

  try {
    const report = JSON.parse(readFileSync(reportPath, 'utf-8'));
    verificationMap = new Map();
    for (const article of report.articles || []) {
      verificationMap.set(normalizePath(article.file), article);
    }
    verificationTimestamp = report.summary?.generated || null;
    console.log(`Loaded verification report: ${verificationMap.size} articles`);
  } catch (error) {
    console.warn(`Could not load verification report: ${error.message}`);
    verificationMap = new Map();
  }
}

function lookupVerificationData(filePath) {
  if (!verificationMap) return null;
  return verificationMap.get(normalizePath(filePath)) || null;
}

function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };

  const endIndex = lines.slice(1).findIndex(line => line.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };

  const yamlBlock = lines.slice(1, endIndex + 1).join('\n');
  const body = lines.slice(endIndex + 2).join('\n');

  try {
    return { frontmatter: load(yamlBlock) || {}, body };
  } catch (error) {
    console.warn(`YAML parse error: ${error.message}`);
    return { frontmatter: {}, body: mdContent };
  }
}

function extractTldr(body) {
  const tldrSection = body.match(/## TL;DR\s*\n+([^\n]+(?:\n[^\n#]+)*)/);
  if (tldrSection) return tldrSection[1].trim().split('\n')[0];
  return body.trim().split('\n')[0]?.replace(/^#+\s*/, '') || '';
}

function compileJsonLd(frontmatter, body, filePath, quality, confidence, verificationData) {
  const sources = frontmatter.primary_sources || [];
  const verification = {
    confidence_formula_version: confidence.formula_version,
    confidence_inputs: confidence.inputs,
    confidence_level: confidence.level,
    confidence_score: confidence.score,
    confidence_basis: confidence.inputs.based_on,
    sources_total: sources.length,
    sources_verified: verificationData?.sources_verified ?? null,
    sources_unreachable: verificationData?.sources_unreachable ?? null,
    verification_timestamp: verificationData ? verificationTimestamp : null,
    verification_note: verificationData ? 'actual source verification executed' : 'estimated; verification report not available',
    sources_tier: sources.map(source => classifySourceTier(source)),
    sources_has_doi: sources.some(source => source.doi),
    sources_has_url: sources.some(source => source.url),
    article_has_disputed: !!(frontmatter.disputed_statements && frontmatter.disputed_statements.length > 0),
    article_has_known_gaps: !!(frontmatter.known_gaps && frontmatter.known_gaps.length > 0)
  };

  return {
    '@context': 'https://schema.org',
    '@type': frontmatter.schema_type || 'Article',
    '@id': `https://anchorfact.org/kb/${quality.canonicalSlug}`,
    url: quality.canonicalUrl,
    headline: frontmatter.title,
    description: extractTldr(body),
    dateCreated: frontmatter.created_date || new Date().toISOString(),
    dateModified: frontmatter.updated || new Date().toISOString(),
    author: { '@type': 'Organization', name: 'AnchorFact' },
    publisher: { '@type': 'Organization', name: 'AnchorFact', url: 'https://anchorfact.org' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    'anchorfact:status': quality.status,
    'anchorfact:confidence': confidence.level,
    'anchorfact:confidenceScore': confidence.score,
    'anchorfact:generationMethod': frontmatter.generation_method || 'ai_structured',
    'anchorfact:qualityReasons': quality.qualityReasons,
    'anchorfact:verification': verification,
    citation: sources.map(source => ({
      '@type': 'CreativeWork',
      name: source.title,
      author: source.authors?.join(', '),
      sameAs: source.url || (source.doi ? `https://doi.org/${source.doi}` : undefined),
      'anchorfact:sourceTier': classifySourceTier(source),
      'anchorfact:year': source.year || null
    }))
  };
}

function compileAtomicFacts(frontmatter, quality) {
  return (frontmatter.atomic_facts || []).map((fact, index) => {
    const id = fact.id || `${quality.canonicalSlug.replace(/\//g, '-')}-fact-${index + 1}`;
    const factQualityReasons = [];
    if (isBrokenAtomicFact(fact)) factQualityReasons.push('broken_atomic_fact');
    const evidenceMatch = factEvidenceMapsToSources(fact, frontmatter) ? 'mapped' : 'weak';
    const factJson = {
      '@context': 'https://schema.org',
      '@type': 'Claim',
      '@id': `https://anchorfact.org/fact/${id}`,
      text: fact.statement,
      'anchorfact:article': quality.canonicalUrl,
      'anchorfact:status': quality.status,
      'anchorfact:confidence': fact.confidence || null,
      'anchorfact:sourceRef': fact.source_ref || null,
      'anchorfact:sourceTitle': fact.source_title || null,
      'anchorfact:sourceExcerpt': fact.source_excerpt || null,
      'anchorfact:verificationMethod': fact.verification_method || null,
      'anchorfact:evidenceMatch': evidenceMatch,
      'anchorfact:qualityReasons': factQualityReasons
    };

    if (fact.source_doi) {
      factJson.citation = { '@type': 'CreativeWork', sameAs: `https://doi.org/${fact.source_doi}` };
    } else if (fact.source_url) {
      factJson.citation = { '@type': 'CreativeWork', sameAs: fact.source_url };
    }

    return factJson;
  });
}

function compilePlainText(frontmatter, body, quality, confidence) {
  const basis = confidence.inputs.based_on === 'verified_sources' ? '(verified)' : '(estimated)';
  return `# ${frontmatter.title}
Status: ${quality.status}
Confidence: ${confidence.level} (${confidence.score}) ${basis}
Last verified: ${frontmatter.last_verified || 'N/A'}
Generation: ${frontmatter.generation_method || 'ai_structured'}

${body}
`;
}

function compileTurtle(frontmatter, quality, confidence) {
  const lines = [
    '@prefix schema: <https://schema.org/> .',
    '@prefix af: <https://anchorfact.org/ns#> .',
    '',
    `<https://anchorfact.org/kb/${quality.canonicalSlug}>`,
    `  a schema:${frontmatter.schema_type || 'Article'} ;`,
    `  schema:headline "${escapeTurtle(frontmatter.title)}" ;`,
    `  schema:url <${quality.canonicalUrl}> ;`,
    `  af:status "${quality.status}" ;`,
    `  af:confidence "${confidence.level}" ;`,
    `  af:confidenceScore "${confidence.score}" ;`,
    `  af:confidenceBasis "${confidence.inputs.based_on || 'estimated'}" ;`,
    `  af:generationMethod "${frontmatter.generation_method || 'ai_structured'}" .`
  ];

  for (const source of frontmatter.primary_sources || []) {
    const sourceUrl = source.url || (source.doi ? `https://doi.org/${source.doi}` : null);
    if (!sourceUrl) continue;
    lines.push('');
    lines.push(`<https://anchorfact.org/kb/${quality.canonicalSlug}>`);
    lines.push(`  schema:citation <${sourceUrl}> ;`);
    lines.push(`  af:sourceTier "${classifySourceTier(source)}" .`);
  }

  return lines.join('\n');
}

function compileFile(mdPath, contentDir, distDir) {
  const mdContent = readFileSync(mdPath, 'utf-8');
  const { frontmatter, body } = splitFrontmatter(mdContent);

  if (!frontmatter.id && !frontmatter.title) {
    console.warn(`Skipping ${mdPath}: no frontmatter found`);
    return null;
  }

  const verificationData = lookupVerificationData(mdPath);
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter, verificationData);
  const quality = evaluateArticleQuality({
    frontmatter,
    body,
    filePath: mdPath,
    contentDir,
    verificationData,
    confidence
  });

  const outDir = join(distDir, ...quality.canonicalSlug.split('/'));
  mkdirSync(outDir, { recursive: true });

  const jsonLd = compileJsonLd(frontmatter, body, mdPath, quality, confidence, verificationData);
  const atomicFacts = compileAtomicFacts(frontmatter, quality);

  writeFileSync(join(outDir, 'index.json'), JSON.stringify(jsonLd, null, 2));
  writeFileSync(join(outDir, 'index.txt'), compilePlainText(frontmatter, body, quality, confidence));
  writeFileSync(join(outDir, 'index.ttl'), compileTurtle(frontmatter, quality, confidence));
  writeFileSync(join(outDir, 'index.md'), mdContent);
  writeFileSync(join(outDir, 'index.html'), compileHtml(frontmatter, body, quality, confidence, jsonLd));
  if (atomicFacts.length > 0) {
    writeFileSync(join(outDir, 'facts.json'), JSON.stringify(atomicFacts, null, 2));
  }

  console.log(`${quality.publicEligible ? 'P' : 'D'} ${mdPath} -> ${quality.canonicalSlug} (${confidence.level}/${confidence.score}, ${confidence.inputs.based_on})`);
  return {
    articleId: quality.canonicalSlug,
    file: normalizePath(mdPath),
    ...jsonLd,
    _quality: quality,
    _confidence: confidence,
    _verificationData: verificationData,
    _atomicFacts: atomicFacts
  };
}

function walkMarkdown(contentDir) {
  const files = [];

  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.md') && !entry.startsWith('_')) {
        files.push(fullPath);
      }
    }
  }

  walk(contentDir);
  return files;
}

function compileAll(contentDir, distDir, verificationReportPath) {
  const reportPath = verificationReportPath || join(process.cwd(), 'verification-report.json');
  loadVerificationReport(reportPath);

  if (!existsSync(contentDir)) {
    console.error(`Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  return walkMarkdown(contentDir)
    .map(file => compileFile(file, contentDir, distDir))
    .filter(Boolean);
}

function articleLink(result) {
  const slug = result._quality.canonicalSlug;
  const confidence = result._confidence;
  return `<span title="confidence: ${confidence.level} (${confidence.score}) [${confidence.inputs.based_on}]">` +
    `<a href="/${slug}/">${escapeHtml(result.headline || slug)}</a></span>` +
    ` &middot; <a href="/${slug}/index.json">JSON-LD</a>` +
    ` &middot; <a href="/${slug}/index.txt">TXT</a>` +
    ` &middot; <a href="/${slug}/index.ttl">TTL</a>`;
}

function writeManifest(distDir, results, publicResults, draftResults, claims) {
  const manifest = buildManifest({
    results,
    publicResults,
    draftResults,
    claims,
    generated: new Date().toISOString(),
    verificationTimestamp,
    verificationCount: verificationMap?.size || 0
  });

  writeFileSync(join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

function writeRootIndex(distDir, results, publicResults, draftResults, claims) {
  const publicDist = distribution(publicResults);
  const rootHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AnchorFact - Verified claims for LLM citations</title>
  <meta name="description" content="Machine-readable verified claims and articles for LLM citations.">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta name="msvalidate.01" content="B9AA7B911CF59012FB84CBDD7470CBA4">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"WebSite","@id":"https://anchorfact.org","name":"AnchorFact","url":"https://anchorfact.org","description":"Machine-readable verified claims for LLM citations.","publisher":{"@type":"Organization","name":"AnchorFact"}}
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 860px; margin: 40px auto; padding: 0 20px; color: #1E293B; line-height: 1.6; }
    h1 { color: #2563EB; font-size: 2rem; margin-bottom: 0.25em; }
    .tagline { color: #64748B; font-size: 1.1rem; margin-bottom: 1em; }
    .card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px 20px; margin: 12px 0; }
    .footer { color: #64748B; font-size: 0.85rem; margin-top: 3em; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; margin-right: 4px; }
    .h { background: #DCFCE7; color: #166534; }
    .m { background: #FEF9C3; color: #854D0E; }
    .l { background: #FEE2E2; color: #991B1B; }
    a { color: #2563EB; text-decoration: none; }
  </style>
</head>
<body>
  <h1>AnchorFact</h1>
  <p class="tagline">Machine-readable verified claims for LLM citations.</p>
  <div class="card" style="background:#F8FAFC;">
    <strong>Trust-first status</strong><br>
    <strong>${publicResults.length}</strong> public verified articles &middot;
    <strong>${claims.length}</strong> public verified claims &middot;
    <strong>${draftResults.length}</strong> drafts excluded from AI entrypoints.
    <br><span style="font-size:0.9rem;color:#64748B;">Public articles require real source verification data and no placeholder content.</span>
  </div>
  <div class="card">
    <strong>For AIs</strong><br>
    <a href="/llms.txt">llms.txt</a> &middot;
    <a href="/manifest.json">Manifest</a> &middot;
    <a href="/claims.json">Claims JSON</a> &middot;
    <a href="/dashboard.html">Dashboard</a>
  </div>
  <div class="card">
    <strong>Public Verified Articles (${publicResults.length})</strong><br>
    <span class="badge h">high: ${publicDist.high}</span>
    <span class="badge m">medium: ${publicDist.medium}</span>
    <span class="badge l">low: ${publicDist.low}</span>
    <br><br>
    ${publicResults.length ? publicResults.map(articleLink).join('<br>\n    ') : '<em>No public verified articles yet. Run verification and promote validated articles.</em>'}
  </div>
  <div class="card">
    <strong>Drafts</strong><br>
    ${draftResults.length} articles are retained but excluded from llms.txt and sitemap until they pass verification.
    <a href="/drafts.html">Review drafts</a>.
  </div>
  <div class="card">
    <strong>Project</strong><br>
    <a href="https://github.com/anchorfact/anchorfact">GitHub</a> &middot;
    <a href="https://github.com/anchorfact/anchorfact/blob/main/DESIGN.md">Design</a>
  </div>
  <p class="footer">Content: CC-BY 4.0 &middot; Code: MIT &middot; Compiler: v0.3.0</p>
</body>
</html>`;
  writeFileSync(join(distDir, 'index.html'), rootHtml);
}

function writeDrafts(distDir, draftResults) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow">
  <title>AnchorFact Drafts</title>
</head>
<body>
  <h1>Draft Articles</h1>
  <p>Drafts are excluded from public AI entrypoints until they pass source verification and content completeness checks.</p>
  <ul>
    ${draftResults.map(result => `<li><a href="/${result._quality.canonicalSlug}/">${escapeHtml(result.headline)}</a> - ${result._quality.qualityReasons.map(escapeHtml).join(', ')}</li>`).join('\n    ')}
  </ul>
</body>
</html>`;
  writeFileSync(join(distDir, 'drafts.html'), html);
}

function writeLlmsTxt(distDir, publicResults, claims) {
  const entries = publicResults.map(result => {
    const slug = result._quality.canonicalSlug;
    return `- [${result.headline || slug}](https://anchorfact.org/${slug}/index.md): ${result.description || ''} [${result._confidence.level}; ${result._verificationData?.sources_verified || 0}/${result._verificationData?.sources_total || 0} sources verified]`;
  }).join('\n');

  const llmsTxt = `# AnchorFact

> Machine-readable verified claims for LLM citations. This index only lists public entries with real source verification data. Draft and estimated entries are excluded.

## Public Knowledge Base

- Public verified articles: ${publicResults.length}
- Public verified claims: ${claims.length}
- Verification report: ${verificationTimestamp || 'not available'}

${entries || '_No public verified entries yet._'}

## API

- [Manifest](https://anchorfact.org/manifest.json): Full index with public/draft status.
- [Claims](https://anchorfact.org/claims.json): Public verified atomic claims.

## Policy

- Public entries require verified source data.
- Estimated or placeholder entries remain draft-only.
- Consumers should cross-check original sources listed in each JSON-LD record.
`;

  writeFileSync(join(distDir, 'llms.txt'), llmsTxt);
}

function writeSitemap(distDir, publicResults) {
  const urls = [
    '<url><loc>https://anchorfact.org/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>',
    '<url><loc>https://anchorfact.org/llms.txt</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/claims.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    ...publicResults.flatMap(result => {
      const slug = result._quality.canonicalSlug;
      return [
        `<url><loc>https://anchorfact.org/${slug}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
        `<url><loc>https://anchorfact.org/${slug}/index.md</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
        `<url><loc>https://anchorfact.org/${slug}/index.json</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      ];
    })
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n  ')}
</urlset>
`;
  writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml);
}

function writeRobots(distDir) {
  const robotsTxt = `# robots.txt - AnchorFact
User-agent: *
Allow: /

Sitemap: https://anchorfact.org/sitemap.xml
`;
  writeFileSync(join(distDir, 'robots.txt'), robotsTxt);
}

function writeHeaders(distDir) {
  const headersFile = `# _headers - AnchorFact AI-optimized headers with security hardening
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

/claims.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/manifest.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/drafts
  X-Robots-Tag: noindex, nofollow

/drafts.html
  X-Robots-Tag: noindex, nofollow
`;
  writeFileSync(join(distDir, '_headers'), headersFile);
}

function writeDashboard(distDir, results, publicResults, draftResults, claims) {
  const publicDist = distribution(publicResults);
  const dashHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AnchorFact Dashboard</title>
  <style>
    body{font-family:system-ui,sans-serif;background:#F8FAFC;color:#1E293B;line-height:1.6}
    .container{max-width:960px;margin:0 auto;padding:24px 20px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
    .card{background:white;border:1px solid #E2E8F0;border-radius:8px;padding:20px}
    .label{font-size:.8rem;color:#64748B;text-transform:uppercase}.value{font-size:2rem;font-weight:700}
    a{color:#2563EB}
  </style>
</head>
<body>
  <div class="container">
    <h1>AnchorFact Dashboard</h1>
    <p>Machine-readable verified claims for LLM citations.</p>
    <div class="grid">
      <div class="card"><div class="label">Total Articles</div><div class="value">${results.length}</div></div>
      <div class="card"><div class="label">Public Verified</div><div class="value">${publicResults.length}</div></div>
      <div class="card"><div class="label">Drafts</div><div class="value">${draftResults.length}</div></div>
      <div class="card"><div class="label">Public Claims</div><div class="value">${claims.length}</div></div>
    </div>
    <div class="card" style="margin-top:16px">
      <h2>Public Confidence</h2>
      <p>High: ${publicDist.high} &middot; Medium: ${publicDist.medium} &middot; Low: ${publicDist.low}</p>
      <p>Verification report: ${verificationTimestamp || 'not available'}</p>
    </div>
    <p><a href="/">Home</a> &middot; <a href="/llms.txt">llms.txt</a> &middot; <a href="/manifest.json">manifest.json</a> &middot; <a href="/claims.json">claims.json</a></p>
  </div>
</body>
</html>`;
  writeFileSync(join(distDir, 'dashboard.html'), dashHtml);
}

function writeFavicon(distDir) {
  const favicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#2563EB"/><path d="M16 5v20M10 12h12M8 25c3 2 13 2 16 0" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>';
  writeFileSync(join(distDir, 'favicon.svg'), favicon);
}

function writeStaticOutputs(distDir, results) {
  const publicResults = results.filter(result => result._quality.publicEligible);
  const draftResults = results.filter(result => !result._quality.publicEligible);
  const claims = publicClaims(publicResults);

  writeFileSync(
    join(distDir, 'claims.json'),
    JSON.stringify({ generated: new Date().toISOString(), claim_count: claims.length, claims }, null, 2)
  );
  writeManifest(distDir, results, publicResults, draftResults, claims);
  writeRootIndex(distDir, results, publicResults, draftResults, claims);
  writeDrafts(distDir, draftResults);
  writeLlmsTxt(distDir, publicResults, claims);
  writeSitemap(distDir, publicResults);
  writeRobots(distDir);
  writeHeaders(distDir);
  writeDashboard(distDir, results, publicResults, draftResults, claims);
  writeFavicon(distDir);
}

const contentDir = process.argv[2] || join(process.cwd(), 'content');
const distDir = process.argv[3] || join(process.cwd(), 'dist');
const verificationReportPath = process.argv[4] || join(process.cwd(), 'verification-report.json');

console.log('AnchorFact Compiler v0.3.0');
console.log(`  Content: ${contentDir}`);
console.log(`  Output:  ${distDir}`);
console.log(`  Verify:  ${existsSync(verificationReportPath) ? verificationReportPath : '(not found)'}`);

const start = performance.now();
const results = compileAll(contentDir, distDir, verificationReportPath);
writeStaticOutputs(distDir, results);
const elapsed = (performance.now() - start).toFixed(0);

const publicCount = results.filter(result => result._quality.publicEligible).length;
const draftCount = results.length - publicCount;
console.log(`Compiled ${results.length} articles in ${elapsed}ms`);
console.log(`Public=${publicCount} Draft=${draftCount}`);
