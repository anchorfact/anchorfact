#!/usr/bin/env node
import {
  buildEvidenceApiPayload,
  parseEvidenceParams,
  renderEvidenceMarkdown
} from '../src/lib/evidence-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/evidence.js';

let passed = 0, failed = 0;
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

const fixtureManifest = {
  schema_version: 'anchorfact.manifest.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  articles: [
    {
      id: 'https://anchorfact.org/kb/ai/gaussian-splatting',
      canonical_slug: 'ai/gaussian-splatting',
      canonical_url: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
      title: '3D Gaussian Splatting',
      description: 'Real-time neural scene rendering.',
      status: 'public',
      confidence_level: 'medium',
      confidence_basis: 'verified_sources',
      confidence_score: 0.82,
      sources_verified: 3,
      sources_total: 3,
      is_draft: false,
      quality_reasons: []
    },
    {
      id: 'https://anchorfact.org/kb/ai/draft-only',
      canonical_slug: 'ai/draft-only',
      canonical_url: 'https://anchorfact.org/ai/draft-only/index.json',
      title: 'Draft Only',
      description: 'Draft-only gaussian note.',
      status: 'draft',
      is_draft: true,
      quality_reasons: ['placeholder_content']
    }
  ]
};

const fixtureClaims = {
  schema_version: 'anchorfact.claims.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  claims: [
    {
      id: 'https://anchorfact.org/fact/f1',
      canonical_slug: 'ai/gaussian-splatting',
      statement: '3D Gaussian Splatting represents scenes as anisotropic Gaussians.',
      confidence: 'medium',
      source_url: 'https://arxiv.org/abs/2308.04079',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering'
    },
    {
      id: 'https://anchorfact.org/fact/f2',
      canonical_slug: 'ai/gaussian-splatting',
      statement: 'NeRF represents scenes as neural radiance fields.',
      confidence: 'medium',
      source_url: 'https://arxiv.org/abs/2003.08934',
      source_title: 'NeRF: Representing Scenes as Neural Radiance Fields'
    },
    {
      id: 'https://anchorfact.org/fact/draft',
      canonical_slug: 'ai/draft-only',
      statement: 'Draft facts must not leak through evidence packs.',
      confidence: 'low',
      source_url: 'https://example.com/draft'
    }
  ]
};

const fixtureSources = {
  schema_version: 'anchorfact.sources.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  sources: [
    {
      id: 'source:gaussian',
      title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      type: 'academic_paper',
      tier: 'A',
      url: 'https://arxiv.org/abs/2308.04079',
      article_count: 1,
      claim_count: 1,
      articles: [
        {
          canonical_slug: 'ai/gaussian-splatting',
          title: '3D Gaussian Splatting',
          url: 'https://anchorfact.org/ai/gaussian-splatting/index.json'
        }
      ]
    },
    {
      id: 'source:draft',
      title: 'Draft Source',
      type: 'article',
      tier: 'C',
      url: 'https://example.com/draft',
      article_count: 1,
      claim_count: 1,
      articles: [
        {
          canonical_slug: 'ai/draft-only',
          title: 'Draft Only',
          url: 'https://anchorfact.org/ai/draft-only/index.json'
        }
      ]
    }
  ]
};

const fixtureSearchIndex = {
  schema_version: 'anchorfact.search-index.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  records: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      title: '3D Gaussian Splatting',
      url: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
      description: 'Real-time neural scene rendering.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      source_tiers: ['A'],
      source_titles: ['3D Gaussian Splatting for Real-Time Radiance Field Rendering'],
      claim_ids: ['https://anchorfact.org/fact/f1', 'https://anchorfact.org/fact/f2'],
      claim_count: 2,
      keywords: ['gaussian', 'splatting'],
      search_text: '3d gaussian splatting neural rendering radiance fields',
      routes: {
        jsonld: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
        markdown: 'https://anchorfact.org/ai/gaussian-splatting/index.md'
      }
    },
    {
      canonical_slug: 'ai/draft-only',
      title: 'Draft Only',
      url: 'https://anchorfact.org/ai/draft-only/index.json',
      description: 'Draft-only gaussian note.',
      confidence_level: 'low',
      source_coverage: { verified: 0, total: 1, ratio: 0 },
      claim_ids: ['https://anchorfact.org/fact/draft'],
      claim_count: 1,
      keywords: ['draft', 'gaussian'],
      search_text: 'draft gaussian placeholder'
    }
  ]
};

function assetEnv(overrides = {}) {
  const payloads = {
    '/manifest.json': fixtureManifest,
    '/claims.json': fixtureClaims,
    '/sources.json': fixtureSources,
    '/search-index.json': fixtureSearchIndex,
    ...overrides
  };
  return {
    ASSETS: {
      fetch: async (url) => {
        const path = new URL(url).pathname;
        if (!payloads[path]) return new Response('missing', { status: 404 });
        return new Response(JSON.stringify(payloads[path]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  };
}

console.log('AnchorFact Evidence API Tests\n');

test('parseEvidenceParams validates query and clamps limit', () => {
  const parsed = parseEvidenceParams(new URL('https://anchorfact.org/api/evidence?query=gaussian&limit=99'));
  assertEq(parsed.ok, true);
  assertEq(parsed.query, 'gaussian');
  assertEq(parsed.limit, 20);
  assertEq(parsed.format, 'json');

  const missing = parseEvidenceParams(new URL('https://anchorfact.org/api/evidence'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.error.code, 'missing_or_invalid_query');
  assertEq(missing.payload.machine_recovery.recoverable, true);
  assert(missing.payload.machine_recovery.next_request.path.includes('/api/context?q='), 'missing query guidance should point agents to context discovery');
  assert(missing.payload.machine_recovery.retry_examples.some(call => call.path.includes('/api/evidence?q=')), 'missing query guidance should include evidence retry example');

  const markdown = parseEvidenceParams(new URL('https://anchorfact.org/api/evidence?q=gaussian&format=md'));
  assertEq(markdown.ok, true);
  assertEq(markdown.format, 'markdown');

  const invalid = parseEvidenceParams(new URL('https://anchorfact.org/api/evidence?q=gaussian&format=xml'));
  assertEq(invalid.ok, false);
  assertEq(invalid.payload.error.code, 'invalid_format');
});

test('buildEvidenceApiPayload returns compact public evidence packs', () => {
  const result = buildEvidenceApiPayload({
    query: 'gaussian splatting',
    limit: 2,
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(result.ok, true);
  assertEq(result.payload.schema_version, 'anchorfact.evidence-api.v1');
  assertEq(result.payload.query, 'gaussian splatting');
  assertEq(result.payload.limit, 2);
  assertEq(result.payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(result.payload.citation_contract.include_original_source_url, true);
  assertEq(result.payload.machine_consumption.large_artifact_policy, 'prefer_query_scoped_apis');
  assert(result.payload.machine_consumption.preferred_query_scoped_apis.some(call => call.path.includes('/api/evidence?q=gaussian+splatting')), 'evidence should advertise query-scoped evidence API');
  assert(result.payload.machine_consumption.static_discovery.some(call => call.path === '/artifact-shards.json'), 'evidence should advertise shard registry for bulk sync');
  assert(result.payload.machine_consumption.avoid_for_single_query.includes('/graph.json'), 'evidence should discourage graph bulk fetch for one query');
  assertEq(result.payload.result_count, 1);
  assertEq(result.payload.packs[0].canonical_slug, 'ai/gaussian-splatting');
  assertEq(result.payload.packs[0].article.status, 'public');
  assertEq(result.payload.packs[0].claim_count, 2);
  assertEq(result.payload.packs[0].citation_exports.length, 2);
  assert(result.payload.packs[0].citation_exports[0].inline.includes('AnchorFact:'), 'pack should expose citation-ready inline text');
  assertEq(result.payload.packs[0].source_count, 1);
  assert(result.payload.packs[0].retrieval.matched_keywords.includes('gaussian'), 'pack should expose matched query keywords');
});

test('renderEvidenceMarkdown returns answer-ready citation context', () => {
  const result = buildEvidenceApiPayload({
    query: 'gaussian splatting',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex,
    generated: '2026-05-29T00:00:00.000Z'
  });
  const markdown = renderEvidenceMarkdown(result.payload);
  assert(markdown.includes('# AnchorFact Evidence Pack: gaussian splatting'), 'markdown should include the query heading');
  assert(markdown.includes('Citation contract:'), 'markdown should include citation contract guidance');
  assert(markdown.includes('/artifact-shards.json'), 'markdown should include machine bulk sync guidance');
  assert(markdown.includes('3D Gaussian Splatting represents scenes'), 'markdown should include claim text');
  assert(markdown.includes('https://arxiv.org/abs/2308.04079'), 'markdown should include source URL');
});

test('buildEvidenceApiPayload hides draft records even if search data is inconsistent', () => {
  const result = buildEvidenceApiPayload({
    query: 'draft gaussian',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex
  });

  assertEq(result.ok, true);
  assert(!result.payload.packs.some(pack => pack.canonical_slug === 'ai/draft-only'), 'draft record leaked through evidence pack');
  assert(!JSON.stringify(result.payload).includes('Draft facts must not leak'), 'draft claim leaked through evidence pack');
});

test('buildEvidenceApiPayload returns empty packs for no query match', () => {
  const result = buildEvidenceApiPayload({
    query: 'nonexistent subject',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex
  });

  assertEq(result.ok, true);
  assertEq(result.payload.result_count, 0);
  assertEq(result.payload.packs, []);
});

test('Pages Function returns CORS JSON evidence packs', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/evidence?q=gaussian&limit=1'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.evidence-api.v1');
  assertEq(payload.result_count, 1);
  assertEq(payload.packs[0].canonical_slug, 'ai/gaussian-splatting');
  assert(payload.packs[0].citation_exports[0].markdown.includes('3D Gaussian Splatting'), 'function response should include markdown citation text');
});

test('Pages Function returns Markdown evidence packs on request', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/evidence?q=gaussian&limit=1&format=markdown'),
    env: assetEnv()
  });
  const text = await response.text();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assert(response.headers.get('Content-Type').includes('text/markdown'), 'markdown response should use text/markdown');
  assert(text.includes('# AnchorFact Evidence Pack: gaussian'), 'markdown response should include heading');
  assert(text.includes('3D Gaussian Splatting represents scenes'), 'markdown response should include claims');
});

test('Pages Function rejects missing queries and asset failures', async () => {
  const missingQuery = await onRequestGet({
    request: new Request('https://anchorfact.org/api/evidence'),
    env: assetEnv()
  });
  const missingPayload = await missingQuery.json();
  assertEq(missingQuery.status, 400);
  assertEq(missingPayload.error.code, 'missing_or_invalid_query');
  assertEq(missingPayload.machine_recovery.current_endpoint, 'evidence');
  assert(missingPayload.machine_recovery.next_request.url.includes('/api/context?q='), 'function 400 should include executable next request');

  const assetFailure = await onRequestGet({
    request: new Request('https://anchorfact.org/api/evidence?q=gaussian'),
    env: assetEnv({ '/sources.json': null })
  });
  const failurePayload = await assetFailure.json();
  assertEq(assetFailure.status, 502);
  assertEq(failurePayload.error.code, 'asset_load_failed');
});

test('Pages Function supports OPTIONS preflight', () => {
  const options = onRequestOptions();
  assertEq(options.status, 204);
  assertEq(options.headers.get('Access-Control-Allow-Methods'), 'GET, OPTIONS');
});

for (const { name, fn } of tests) {
  try {
    await fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
