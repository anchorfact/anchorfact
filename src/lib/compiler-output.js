import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { buildAgentProfile } from './agent-profile.js';
import { publicClaims } from './claims.js';
import { buildOpenApiContract } from './openapi.js';
import { buildSearchIndex } from './search-index.js';
import { buildSourceIndex } from './source-index.js';
import { escapeHtml } from './html.js';
import { buildManifest, distribution } from './manifest.js';
import {
  CLAIMS_SCHEMA_VERSION,
  PROVENANCE_PATH,
  buildMetadataFromEnv,
  buildProvenance,
  publicUrl
} from './build-metadata.js';
import {
  PROVENANCE_SIGNATURE_PATH,
  signatureMetadataForKey,
  signProvenanceText,
  signingKeyInfoFromEnv
} from './provenance-signature.js';

function articleLink(result) {
  const slug = result._quality.canonicalSlug;
  const confidence = result._confidence;
  return `<span title="confidence: ${confidence.level} (${confidence.score}) [${confidence.inputs.based_on}]">` +
    `<a href="/${slug}/">${escapeHtml(result.headline || slug)}</a></span>` +
    ` &middot; <a href="/${slug}/index.json">JSON-LD</a>` +
    ` &middot; <a href="/${slug}/index.txt">TXT</a>` +
    ` &middot; <a href="/${slug}/index.ttl">TTL</a>`;
}

function writeManifest(distDir, results, publicResults, draftResults, claims, options = {}) {
  const manifest = buildManifest({
    results,
    publicResults,
    draftResults,
    claims,
    generated: options.generated || new Date().toISOString(),
    build: options.build,
    verificationTimestamp: options.verificationTimestamp,
    verificationCount: options.verificationCount || 0
  });

  writeFileSync(join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  return manifest;
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
    <a href="/agent.json">Agent profile</a> &middot;
    <a href="/openapi.json">OpenAPI</a> &middot;
    <a href="/api/search?q=gaussian">Search API</a> &middot;
    <a href="/api/article?slug=ai/3d-generation-gaussian-splatting">Article API</a> &middot;
    <a href="/api/claim?id=f1">Claim API</a> &middot;
    <a href="/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079">Source API</a> &middot;
    <a href="/llms.txt">llms.txt</a> &middot;
    <a href="/manifest.json">Manifest</a> &middot;
    <a href="/claims.json">Claims JSON</a> &middot;
    <a href="/search-index.json">Search Index</a> &middot;
    <a href="/sources.json">Sources JSON</a> &middot;
    <a href="/provenance.json">Provenance</a> &middot;
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

function writeLlmsTxt(distDir, publicResults, claims, verificationTimestamp) {
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

- [Agent Profile](https://anchorfact.org/agent.json): Machine contract and recommended retrieval workflow.
- [OpenAPI](https://anchorfact.org/openapi.json): Static read-only endpoint contract for tools.
- [Search API](https://anchorfact.org/api/search?q=gaussian): Read-only search over public records.
- [Article API](https://anchorfact.org/api/article?slug=ai/3d-generation-gaussian-splatting): Read-only public article evidence bundles with claims and sources.
- [Claim API](https://anchorfact.org/api/claim?id=f1): Read-only public atomic claim lookup with article and source context.
- [Source API](https://anchorfact.org/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079): Read-only public source lookup with mapped claims.
- [Manifest](https://anchorfact.org/manifest.json): Full index with public/draft status.
- [Claims](https://anchorfact.org/claims.json): Public verified atomic claims.
- [Search Index](https://anchorfact.org/search-index.json): Compact public retrieval records with keywords, claim ids, and source coverage.
- [Sources](https://anchorfact.org/sources.json): Deduplicated public source index with evidence reuse.
- [Provenance](https://anchorfact.org/provenance.json): Build identity and artifact checksums.

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
    '<url><loc>https://anchorfact.org/agent.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/openapi.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/llms.txt</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/claims.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/search-index.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/sources.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/provenance.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
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

/search-index.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/sources.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/agent.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/openapi.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/.well-known/anchorfact.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/manifest.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/provenance.json
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=3600

/provenance.sig
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

function writeDashboard(distDir, results, publicResults, draftResults, claims, verificationTimestamp) {
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
    <p><a href="/">Home</a> &middot; <a href="/llms.txt">llms.txt</a> &middot; <a href="/agent.json">agent.json</a> &middot; <a href="/openapi.json">openapi.json</a> &middot; <a href="/manifest.json">manifest.json</a> &middot; <a href="/claims.json">claims.json</a> &middot; <a href="/search-index.json">search-index.json</a> &middot; <a href="/sources.json">sources.json</a> &middot; <a href="/provenance.json">provenance.json</a></p>
  </div>
</body>
</html>`;
  writeFileSync(join(distDir, 'dashboard.html'), dashHtml);
}

function writeAgentProfile(distDir, profile) {
  const agentText = JSON.stringify(profile, null, 2);
  writeFileSync(join(distDir, 'agent.json'), agentText);
  const wellKnownDir = join(distDir, '.well-known');
  mkdirSync(wellKnownDir, { recursive: true });
  writeFileSync(join(wellKnownDir, 'anchorfact.json'), agentText);
}

function writeFavicon(distDir) {
  const favicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#2563EB"/><path d="M16 5v20M10 12h12M8 25c3 2 13 2 16 0" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>';
  writeFileSync(join(distDir, 'favicon.svg'), favicon);
}

export function writeStaticOutputs(distDir, results, options = {}) {
  const publicResults = results.filter(result => result._quality.publicEligible);
  const draftResults = results.filter(result => !result._quality.publicEligible);
  const claims = publicClaims(publicResults);
  const generated = options.generated || new Date().toISOString();
  const build = options.build || buildMetadataFromEnv();
  const provenanceUrl = publicUrl(PROVENANCE_PATH, build.canonical_site);
  const signingKey = options.signingKey === undefined
    ? signingKeyInfoFromEnv(options.env || process.env)
    : options.signingKey;
  const signatureMetadata = signatureMetadataForKey(
    signingKey,
    publicUrl(PROVENANCE_SIGNATURE_PATH, build.canonical_site)
  );
  const claimsPayload = {
    schema_version: CLAIMS_SCHEMA_VERSION,
    generated,
    provenance_url: provenanceUrl,
    claim_count: claims.length,
    claims
  };

  writeFileSync(
    join(distDir, 'claims.json'),
    JSON.stringify(claimsPayload, null, 2)
  );
  writeFileSync(
    join(distDir, 'openapi.json'),
    JSON.stringify(buildOpenApiContract({
      generated,
      site: build.canonical_site
    }), null, 2)
  );
  const searchIndexPayload = buildSearchIndex({
    generated,
    publicResults,
    claims,
    verificationTimestamp: options.verificationTimestamp,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'search-index.json'),
    JSON.stringify(searchIndexPayload, null, 2)
  );
  const sourcesPayload = buildSourceIndex({
    generated,
    publicResults,
    claims,
    verificationTimestamp: options.verificationTimestamp,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'sources.json'),
    JSON.stringify(sourcesPayload, null, 2)
  );
  const manifest = writeManifest(distDir, results, publicResults, draftResults, claims, {
    ...options,
    generated,
    build
  });
  writeAgentProfile(distDir, buildAgentProfile({
    generated,
    manifest,
    claimsPayload,
    searchIndexPayload,
    sourcesPayload,
    publicResults,
    draftResults,
    verificationTimestamp: options.verificationTimestamp
  }));
  writeRootIndex(distDir, results, publicResults, draftResults, claims);
  writeDrafts(distDir, draftResults);
  writeLlmsTxt(distDir, publicResults, claims, options.verificationTimestamp);
  writeSitemap(distDir, publicResults);
  writeRobots(distDir);
  writeHeaders(distDir);
  writeDashboard(distDir, results, publicResults, draftResults, claims, options.verificationTimestamp);
  writeFavicon(distDir);
  const provenance = buildProvenance({
    manifest,
    claimsPayload,
    distDir,
    generated,
    build,
    signature: signatureMetadata
  });
  const provenanceText = JSON.stringify(provenance, null, 2);
  writeFileSync(
    join(distDir, 'provenance.json'),
    provenanceText
  );
  if (signingKey) {
    writeFileSync(
      join(distDir, 'provenance.sig'),
      JSON.stringify(signProvenanceText(provenanceText, signingKey, generated), null, 2)
    );
  }
}
