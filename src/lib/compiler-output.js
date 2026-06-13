import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { buildAgentProfile } from './agent-profile.js';
import { buildApiAccessPolicy } from './api-access.js';
import { buildArtifactSummary } from './artifact-summary.js';
import { writeArtifactShardRegistry } from './artifact-shards.js';
import { buildApiReadinessReport } from './api-readiness.js';
import { publicClaims } from './claims.js';
import { buildOpenApiContract } from './openapi.js';
import { buildSearchIndex } from './search-index.js';
import { buildSourceIndex } from './source-index.js';
import { buildTopicsIndex } from './topics-index.js';
import { buildCapabilitiesIndex } from './capabilities-index.js';
import { buildCoverageIndex } from './coverage-index.js';
import { buildContentHealthIndex } from './content-health-index.js';
import { buildExamplesIndex } from './examples-index.js';
import { buildGraphIndex } from './graph-index.js';
import { buildEvalsIndex } from './evals-index.js';
import { buildMcpProfile } from './mcp-profile.js';
import { buildRootIndex } from './root-index.js';
import { buildManifest, distribution } from './manifest.js';
import {
  CLAIMS_SCHEMA_VERSION,
  DASHBOARD_SCHEMA_VERSION,
  DRAFTS_INDEX_SCHEMA_VERSION,
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

function stringifyJson(data, { pretty = true } = {}) {
  return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
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

  writeFileSync(join(distDir, 'manifest.json'), stringifyJson(manifest, { pretty: false }));
  return manifest;
}

function draftMachineRecord(result, site) {
  const slug = result._quality?.canonicalSlug || result.slug || result.id;
  return {
    id: result.id || slug,
    canonical_slug: slug,
    headline: result.headline || slug,
    status: 'draft',
    excluded_from_public_ai_entrypoints: true,
    confidence: result._confidence?.level || null,
    quality: {
      score: result._quality?.qualityScore ?? null,
      reasons: result._quality?.qualityReasons || [],
      missing_critical: result._quality?.missingCritical || []
    },
    verification: {
      sources_total: result._verificationData?.sources_total ?? 0,
      sources_verified: result._verificationData?.sources_verified ?? 0,
      confidence_score: result._confidence?.score ?? null
    },
    machine_artifacts: {
      jsonld: publicUrl(`/${slug}/index.json`, site),
      markdown: publicUrl(`/${slug}/index.md`, site),
      plain_text: publicUrl(`/${slug}/index.txt`, site),
      turtle: publicUrl(`/${slug}/index.ttl`, site)
    }
  };
}

function writeDraftsIndex(distDir, draftResults, { generated, site }) {
  const payload = {
    schema_version: DRAFTS_INDEX_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    indexing: {
      noindex: true,
      nofollow: true,
      reason: 'Draft status is exposed for machine QA only and is excluded from public AI retrieval entrypoints.'
    },
    status_policy: {
      public_ai_entrypoints_exclude_drafts: true,
      publish_requires_source_verification_and_content_completeness: true,
      use_content_health_for_repair_queue: '/content-health.json'
    },
    counts: {
      draft_articles: draftResults.length
    },
    drafts: draftResults.map(result => draftMachineRecord(result, site))
  };
  writeFileSync(join(distDir, 'drafts.html'), stringifyJson(payload, { pretty: false }));
}

function writeApiAccessPolicy(distDir, apiAccessPolicy) {
  const apiAccessDir = join(distDir, 'api-access');
  mkdirSync(apiAccessDir, { recursive: true });
  writeFileSync(join(apiAccessDir, 'index.html'), stringifyJson(apiAccessPolicy, { pretty: false }));
}

function writeLlmsTxt(distDir, publicResults, claims, verificationTimestamp) {
  const entries = publicResults.map(result => {
    const slug = result._quality.canonicalSlug;
    return `- [${result.headline || slug}](https://anchorfact.org/${slug}/index.md) [${result._confidence.level}; ${result._verificationData?.sources_verified || 0}/${result._verificationData?.sources_total || 0} sources verified]`;
  }).join('\n');

  const llmsTxt = `# AnchorFact

> Machine-readable verified claims for LLM citations. This index only lists public entries with real source verification data. Draft and estimated entries are excluded.

## Recommended AI Entry Points

- Default answer context: https://anchorfact.org/api/context?q={query}
- Evidence pack: https://anchorfact.org/api/evidence?q={query}
- Coverage decision only when unsure: https://anchorfact.org/api/plan?q={query}
- Precise citation: https://anchorfact.org/api/cite?id={claim_id}
- Discovery: https://anchorfact.org/api and https://anchorfact.org/agent.json
- Trust: https://anchorfact.org/provenance.json and https://anchorfact.org/provenance.sig
- Root machine index: https://anchorfact.org/index.json
- Free API access policy: https://anchorfact.org/api-access/
- Artifact sizes and lightweight alternatives: https://anchorfact.org/artifact-summary.json
- Artifact Shards: https://anchorfact.org/artifact-shards.json
- API readiness gates: https://anchorfact.org/api-readiness.json
- Prefer /api/context or /api/evidence before downloading graph.json, search-index.json, claims.json, or the full article list in llms.txt.

## Direct Answer Examples

- Default prompt context: GET https://anchorfact.org/api/context?q=gaussian%20splatting&limit=3&format=markdown
- Raw evidence pack: GET https://anchorfact.org/api/evidence?q=RLHF&limit=3&format=markdown
- Coverage check when unsure: GET https://anchorfact.org/api/plan?q=quantum%20computing&limit=3
- Exact claim citation: GET https://anchorfact.org/api/cite?id=f1&format=markdown

## Public Knowledge Base

- Public verified articles: ${publicResults.length}
- Public verified claims: ${claims.length}
- Verification report: ${verificationTimestamp || 'not available'}

${entries || '_No public verified entries yet._'}

## API

- [Agent Profile](https://anchorfact.org/agent.json): Machine contract and recommended retrieval workflow.
- [Root Machine Index](https://anchorfact.org/index.json): Compact directory for preferred machine entrypoints, trust policy, and signed static artifacts.
- [OpenAPI](https://anchorfact.org/openapi.json): Static read-only endpoint contract for tools.
- [API Index](https://anchorfact.org/api): Compact live API discovery endpoint for agents.
- [API Access](https://anchorfact.org/api-access/): Machine-readable free API access policy with recommended call order, limits, and provenance verification.
- [Artifact Summary](https://anchorfact.org/artifact-summary.json): Lightweight size and purpose map for large static machine artifacts.
- [Artifact Shards](https://anchorfact.org/artifact-shards.json): Signed registry for versioned shards of large static artifacts.
- [API Readiness](https://anchorfact.org/api-readiness.json): Machine-readable subscription-readiness gates, core corpus scorecard, and API citation readiness report.
- [Capabilities](https://anchorfact.org/capabilities.json): AI task-to-endpoint routing guide with trust requirements and fallback artifacts.
- [Content Health](https://anchorfact.org/content-health.json): Signed corpus health summary for AI trust decisions.
- [Coverage](https://anchorfact.org/coverage.json): AI coverage and limits guide with topic, confidence, source tier, and verification distributions.
- [Plan API](https://anchorfact.org/api/plan?q=gaussian): Read-only query planner that recommends AnchorFact next calls or external-source fallback.
- [Evidence API](https://anchorfact.org/api/evidence?q=gaussian): One-call public evidence packs with search hits, article summaries, claims, and sources.
- [Context API](https://anchorfact.org/api/context?q=gaussian): One-call prompt context with planning status, content health, fallback guidance, evidence packs, and citation guardrails.
- [Resolve API](https://anchorfact.org/api/resolve?ref=f1): Read-only resolver for public claim ids, article slugs, source ids, and source URLs.
- [Resolve Batch API](https://anchorfact.org/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079): Read-only batch resolver for multiple mixed public references.
- [Search API](https://anchorfact.org/api/search?q=gaussian): Read-only search over public records.
- [Article API](https://anchorfact.org/api/article?slug=ai/3d-generation-gaussian-splatting): Read-only public article evidence bundles with claims and sources.
- [Citation API](https://anchorfact.org/api/cite?id=f1): Read-only citation-ready payloads for one public atomic claim.
- [Claim API](https://anchorfact.org/api/claim?id=f1): Read-only public atomic claim lookup with article and source context.
- [Source API](https://anchorfact.org/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079): Read-only public source lookup with mapped claims.
- [Manifest](https://anchorfact.org/manifest.json): Full index with public/draft status.
- [Claims](https://anchorfact.org/claims.json): Public verified atomic claims.
- [Topics](https://anchorfact.org/topics.json): Compact topic coverage map with article, claim, and source counts.
- [Examples](https://anchorfact.org/examples.json): Executable AI usage examples for evidence, search, article, claim, source, and static artifact workflows.
- [Graph](https://anchorfact.org/graph.json): Signed public graph of topic, article, claim, and source relationships.
- [Evals](https://anchorfact.org/evals.json): Executable golden integration checks for AI consumers and production smoke.
- [MCP](https://anchorfact.org/mcp.json): Signed local MCP installation manifest and tool metadata.
- [Search Index](https://anchorfact.org/search-index.json): Compact public retrieval records with keywords, claim ids, and source coverage.
- [Sources](https://anchorfact.org/sources.json): Deduplicated public source index with evidence reuse.
- [Provenance](https://anchorfact.org/provenance.json): Build identity and artifact checksums.

## Policy

- Public entries require verified source data.
- Estimated or placeholder entries remain draft-only.
- Consumers should cross-check original sources listed in each JSON-LD record.
`;

  writeFileSync(join(distDir, 'llms.txt'), llmsTxt);
  return llmsTxt;
}

function writeSitemap(distDir, publicResults) {
  const urls = [
    '<url><loc>https://anchorfact.org/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>',
    '<url><loc>https://anchorfact.org/index.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/agent.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/openapi.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/api</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/api-access/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/artifact-summary.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/artifact-shards.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/api-readiness.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/capabilities.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/content-health.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/coverage.json</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/llms.txt</loc><changefreq>daily</changefreq><priority>0.9</priority></url>',
    '<url><loc>https://anchorfact.org/claims.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/topics.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/examples.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/graph.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/evals.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/mcp.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/search-index.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/sources.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    '<url><loc>https://anchorfact.org/provenance.json</loc><changefreq>daily</changefreq><priority>0.8</priority></url>',
    ...publicResults.flatMap(result => {
      const slug = result._quality.canonicalSlug;
      return [
        `<url><loc>https://anchorfact.org/${slug}/index.json</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
        `<url><loc>https://anchorfact.org/${slug}/index.md</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
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
Machine-Index: https://anchorfact.org/index.json
LLMs: https://anchorfact.org/llms.txt
Agent: https://anchorfact.org/agent.json
OpenAPI: https://anchorfact.org/openapi.json
API: https://anchorfact.org/api
API-Access: https://anchorfact.org/api-access/
AI-Context: https://anchorfact.org/api/context?q={query}
AI-Evidence: https://anchorfact.org/api/evidence?q={query}
AI-Cite: https://anchorfact.org/api/cite?id={claim_id}
AI-Plan: https://anchorfact.org/api/plan?q={query}
AI-Plan-Use: coverage_uncertain_only
Large-Artifact-Policy: prefer_api_context_or_evidence
Artifact-Summary: https://anchorfact.org/artifact-summary.json
Artifact-Shards: https://anchorfact.org/artifact-shards.json
API-Readiness: https://anchorfact.org/api-readiness.json
Health: https://anchorfact.org/content-health.json
MCP: https://anchorfact.org/mcp.json
Provenance: https://anchorfact.org/provenance.json
`;
  writeFileSync(join(distDir, 'robots.txt'), robotsTxt);
}

function writeHeaders(distDir) {
  const revalidatedMachineArtifacts = [
    ['/', 'application/json'],
    ['/index.json', 'application/json'],
    ['/agent.json', 'application/json'],
    ['/.well-known/anchorfact.json', 'application/json'],
    ['/openapi.json', 'application/json'],
    ['/api-access/', 'application/json'],
    ['/artifact-summary.json', 'application/json'],
    ['/artifact-shards.json', 'application/json'],
    ['/api-readiness.json', 'application/json'],
    ['/manifest.json', 'application/json'],
    ['/llms.txt', 'text/plain'],
    ['/claims.json', 'application/json'],
    ['/topics.json', 'application/json'],
    ['/capabilities.json', 'application/json'],
    ['/content-health.json', 'application/json'],
    ['/coverage.json', 'application/json'],
    ['/examples.json', 'application/json'],
    ['/graph.json', 'application/json'],
    ['/evals.json', 'application/json'],
    ['/mcp.json', 'application/json'],
    ['/search-index.json', 'application/json'],
    ['/sources.json', 'application/json'],
    ['/provenance.json', 'application/json'],
    ['/provenance.sig', 'application/json']
  ];
  const machineArtifactHeaders = revalidatedMachineArtifacts
    .map(([path, contentType]) => `${path}
  Access-Control-Allow-Origin: *
  Content-Type: ${contentType}; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate`)
    .join('\n\n');
  const noindexMachineArtifacts = [
    '/drafts',
    '/drafts.html',
    '/dashboard.html'
  ];
  const noindexMachineArtifactHeaders = noindexMachineArtifacts
    .map(path => `${path}
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate
  X-Robots-Tag: noindex, nofollow`)
    .join('\n\n');

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

/*/index.html
  Access-Control-Allow-Origin: *
  Content-Type: application/ld+json; charset=utf-8
  Cache-Control: public, max-age=86400
  X-Robots-Tag: noindex, nofollow

/*/index.ttl
  Access-Control-Allow-Origin: *
  Content-Type: text/turtle; charset=utf-8
  Cache-Control: public, max-age=86400

${machineArtifactHeaders}

${noindexMachineArtifactHeaders}

/artifacts/v1/*
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable
`;
  writeFileSync(join(distDir, '_headers'), headersFile);
}

function writeDashboard(distDir, results, publicResults, draftResults, claims, verificationTimestamp, { generated, site }) {
  const publicDist = distribution(publicResults);
  const payload = {
    schema_version: DASHBOARD_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    indexing: {
      noindex: true,
      nofollow: true,
      reason: 'Build dashboard is a machine QA artifact, not a human landing page.'
    },
    counts: {
      total_articles: results.length,
      public_articles: publicResults.length,
      draft_articles: draftResults.length,
      public_claims: claims.length
    },
    public_confidence: publicDist,
    verification_report: {
      generated: verificationTimestamp || null
    },
    entrypoints: {
      root_index: '/index.json',
      api_index: '/api',
      agent_profile: '/agent.json',
      openapi: '/openapi.json',
      api_access_policy: '/api-access/',
      manifest: '/manifest.json',
      claims: '/claims.json',
      content_health: '/content-health.json',
      drafts_index: '/drafts.html',
      provenance: PROVENANCE_PATH
    }
  };
  writeFileSync(join(distDir, 'dashboard.html'), stringifyJson(payload, { pretty: false }));
}

function writeAgentProfile(distDir, profile) {
  const agentText = JSON.stringify(profile, null, 2);
  writeFileSync(join(distDir, 'agent.json'), agentText);
  const wellKnownDir = join(distDir, '.well-known');
  mkdirSync(wellKnownDir, { recursive: true });
  writeFileSync(join(wellKnownDir, 'anchorfact.json'), agentText);
}

function writeRootMachineIndex(distDir, rootIndex) {
  const rootIndexText = stringifyJson(rootIndex, { pretty: false });
  writeFileSync(join(distDir, 'index.json'), rootIndexText);
  writeFileSync(join(distDir, 'index.html'), rootIndexText);
}

function writeArtifactSummary(distDir, summary) {
  writeFileSync(join(distDir, 'artifact-summary.json'), JSON.stringify(summary, null, 2));
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
    stringifyJson(claimsPayload, { pretty: false })
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
    stringifyJson(searchIndexPayload, { pretty: false })
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
    stringifyJson(sourcesPayload, { pretty: false })
  );
  const topicsPayload = buildTopicsIndex({
    generated,
    publicResults,
    claims,
    sourcesPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'topics.json'),
    JSON.stringify(topicsPayload, null, 2)
  );
  const examplesPayload = buildExamplesIndex({
    generated,
    topicsPayload,
    searchIndexPayload,
    claimsPayload,
    sourcesPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'examples.json'),
    JSON.stringify(examplesPayload, null, 2)
  );
  const manifest = writeManifest(distDir, results, publicResults, draftResults, claims, {
    ...options,
    generated,
    build
  });
  const graphPayload = buildGraphIndex({
    generated,
    manifest,
    claimsPayload,
    sourcesPayload,
    topicsPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'graph.json'),
    stringifyJson(graphPayload, { pretty: false })
  );
  const evalsPayload = buildEvalsIndex({
    generated,
    searchIndexPayload,
    claimsPayload,
    sourcesPayload,
    graphPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'evals.json'),
    JSON.stringify(evalsPayload, null, 2)
  );
  const mcpPayload = buildMcpProfile({
    generated,
    manifest,
    claimsPayload,
    searchIndexPayload,
    sourcesPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'mcp.json'),
    JSON.stringify(mcpPayload, null, 2)
  );
  const capabilitiesPayload = buildCapabilitiesIndex({
    generated,
    manifest,
    claimsPayload,
    topicsPayload,
    examplesPayload,
    evalsPayload,
    mcpPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'capabilities.json'),
    JSON.stringify(capabilitiesPayload, null, 2)
  );
  const coveragePayload = buildCoverageIndex({
    generated,
    manifest,
    claimsPayload,
    topicsPayload,
    sourcesPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'coverage.json'),
    JSON.stringify(coveragePayload, null, 2)
  );
  const contentHealthPayload = buildContentHealthIndex({
    generated,
    manifest,
    claimsPayload,
    sourcesPayload,
    site: build.canonical_site
  });
  writeFileSync(
    join(distDir, 'content-health.json'),
    JSON.stringify(contentHealthPayload, null, 2)
  );
  const apiReadinessPayload = buildApiReadinessReport({
    generatedAt: generated,
    site: build.canonical_site,
    artifacts: {
      manifest,
      claimsPayload,
      sourcesPayload,
      searchIndex: searchIndexPayload,
      topicsPayload,
      coveragePayload,
      capabilitiesPayload,
      contentHealthPayload
    }
  });
  writeFileSync(
    join(distDir, 'api-readiness.json'),
    stringifyJson(apiReadinessPayload, { pretty: false })
  );
  writeRootMachineIndex(distDir, buildRootIndex({
    generated,
    site: build.canonical_site,
    publicResults,
    draftResults,
    claims,
    apiReadinessPayload
  }));
  writeAgentProfile(distDir, buildAgentProfile({
    generated,
    manifest,
    claimsPayload,
    searchIndexPayload,
    sourcesPayload,
    topicsPayload,
    capabilitiesPayload,
    contentHealthPayload,
    examplesPayload,
    graphPayload,
    evalsPayload,
    mcpPayload,
    apiReadinessPayload,
    publicResults,
    draftResults,
    verificationTimestamp: options.verificationTimestamp
  }));
  writeApiAccessPolicy(distDir, buildApiAccessPolicy({
    generated,
    site: build.canonical_site,
    publicResults,
    draftResults,
    claims
  }));
  writeDraftsIndex(distDir, draftResults, {
    generated,
    site: build.canonical_site
  });
  const llmsText = writeLlmsTxt(distDir, publicResults, claims, options.verificationTimestamp);
  writeArtifactShardRegistry({
    distDir,
    generated,
    site: build.canonical_site,
    build,
    claimsPayload,
    searchIndexPayload,
    graphPayload,
    llmsText
  });
  writeSitemap(distDir, publicResults);
  writeRobots(distDir);
  writeHeaders(distDir);
  writeDashboard(distDir, results, publicResults, draftResults, claims, options.verificationTimestamp, {
    generated,
    site: build.canonical_site
  });
  writeFavicon(distDir);
  writeArtifactSummary(distDir, buildArtifactSummary({
    generated,
    distDir,
    site: build.canonical_site
  }));
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
