#!/usr/bin/env node
import {
  buildResolveBatchApiPayload,
  buildResolveApiPayload,
  parseResolveBatchParams,
  parseResolveParams,
  renderResolveBatchMarkdown
} from '../src/lib/resolve-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/resolve.js';
import {
  onRequestGet as onRequestGetBatch,
  onRequestOptions as onRequestOptionsBatch
} from '../functions/api/resolve-batch.js';

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
  provenance_url: 'https://anchorfact.org/provenance.json',
  generated: '2026-05-29T00:00:00.000Z',
  articles: [
    {
      canonical_slug: 'ai/3d-generation-gaussian-splatting',
      canonical_url: 'https://anchorfact.org/ai/3d-generation-gaussian-splatting/index.json',
      title: '3D Gaussian Splatting',
      status: 'public',
      is_draft: false,
      confidence_level: 'medium'
    }
  ]
};

const fixtureClaims = {
  schema_version: 'anchorfact.claims.v1',
  provenance_url: 'https://anchorfact.org/provenance.json',
  generated: '2026-05-29T00:00:00.000Z',
  claims: [
    {
      id: 'https://anchorfact.org/fact/f1',
      canonical_slug: 'ai/3d-generation-gaussian-splatting',
      statement: '3D Gaussian Splatting represents scenes as anisotropic Gaussians.',
      confidence: 'medium',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      source_url: 'https://arxiv.org/abs/2308.04079'
    }
  ]
};

const fixtureSources = {
  schema_version: 'anchorfact.sources.v1',
  provenance_url: 'https://anchorfact.org/provenance.json',
  generated: '2026-05-29T00:00:00.000Z',
  sources: [
    {
      id: 'source:gaussian',
      title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      url: 'https://arxiv.org/abs/2308.04079',
      tier: 'A',
      type: 'academic_paper',
      articles: [
        {
          canonical_slug: 'ai/3d-generation-gaussian-splatting',
          title: '3D Gaussian Splatting'
        }
      ]
    }
  ]
};

const fixtureSearchIndex = {
  schema_version: 'anchorfact.search-index.v1',
  provenance_url: 'https://anchorfact.org/provenance.json',
  generated: '2026-05-29T00:00:00.000Z',
  records: [
    {
      canonical_slug: 'ai/3d-generation-gaussian-splatting',
      description: 'Gaussian splatting fixture.',
      routes: {
        jsonld: 'https://anchorfact.org/ai/3d-generation-gaussian-splatting/index.json'
      }
    }
  ]
};

function assetEnv(overrides = {}) {
  const assets = {
    '/manifest.json': fixtureManifest,
    '/claims.json': fixtureClaims,
    '/sources.json': fixtureSources,
    '/search-index.json': fixtureSearchIndex,
    ...overrides
  };
  return {
    ASSETS: {
      async fetch(url) {
        const path = new URL(url).pathname;
        if (!(path in assets) || assets[path] === null) {
          return new Response('not found', { status: 404 });
        }
        return new Response(JSON.stringify(assets[path]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  };
}

function resolve(ref) {
  return buildResolveApiPayload({
    ref,
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex,
    generated: '2026-05-29T00:00:00.000Z'
  });
}

console.log('AnchorFact Resolve API Tests\n');

test('parseResolveParams accepts the generic ref parameter', () => {
  const parsed = parseResolveParams(new URL('https://anchorfact.org/api/resolve?ref=f1'));
  assertEq(parsed.ok, true);
  assertEq(parsed.ref, 'f1');

  const missing = parseResolveParams(new URL('https://anchorfact.org/api/resolve'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.machine_recovery.recoverable, true);
  assertEq(missing.payload.machine_recovery.current_endpoint, 'resolve');
  assert(missing.payload.machine_recovery.retry_examples.some(call => call.path.includes('/api/resolve?ref=')), 'resolve guidance should include a ref retry example');
});

test('buildResolveApiPayload resolves claim shorthand to the claim API payload', () => {
  const result = resolve('f1');
  assertEq(result.ok, true);
  assertEq(result.payload.schema_version, 'anchorfact.resolve-api.v1');
  assertEq(result.payload.resolved_type, 'claim');
  assertEq(result.payload.canonical_ref, 'https://anchorfact.org/fact/f1');
  assertEq(result.payload.result_schema_version, 'anchorfact.claim-api.v1');
  assertEq(result.payload.result.claim_id, 'https://anchorfact.org/fact/f1');
  assert(result.payload.links.cite_api.includes('/api/cite?id='), 'claim resolver should link citation API');
});

test('buildResolveApiPayload resolves article slugs and JSON-LD ids', () => {
  const slug = resolve('ai/3d-generation-gaussian-splatting');
  assertEq(slug.payload.resolved_type, 'article');
  assertEq(slug.payload.result_schema_version, 'anchorfact.article-api.v1');
  assertEq(slug.payload.result.canonical_slug, 'ai/3d-generation-gaussian-splatting');

  const jsonld = resolve('https://anchorfact.org/kb/ai/3d-generation-gaussian-splatting');
  assertEq(jsonld.payload.resolved_type, 'article');
  assertEq(jsonld.payload.result.canonical_slug, 'ai/3d-generation-gaussian-splatting');

  const htmlAlias = resolve('https://anchorfact.org/ai/3d-generation-gaussian-splatting/index.html');
  assertEq(htmlAlias.payload.resolved_type, 'article');
  assertEq(htmlAlias.payload.result.canonical_slug, 'ai/3d-generation-gaussian-splatting');

  const turtle = resolve('https://anchorfact.org/ai/3d-generation-gaussian-splatting/index.ttl');
  assertEq(turtle.payload.resolved_type, 'article');
  assertEq(turtle.payload.result.canonical_slug, 'ai/3d-generation-gaussian-splatting');
});

test('buildResolveApiPayload resolves public source ids and source URLs', () => {
  const byId = resolve('source:gaussian');
  assertEq(byId.payload.resolved_type, 'source');
  assertEq(byId.payload.result_schema_version, 'anchorfact.source-api.v1');
  assertEq(byId.payload.result.source_id, 'source:gaussian');

  const byUrl = resolve('https://arxiv.org/abs/2308.04079');
  assertEq(byUrl.payload.resolved_type, 'source');
  assertEq(byUrl.payload.result.source_id, 'source:gaussian');
});

test('parseResolveBatchParams accepts repeated ref parameters and validates limits', () => {
  const parsed = parseResolveBatchParams(new URL('https://anchorfact.org/api/resolve-batch?ref=f1&ref=source%3Agaussian&format=md'));
  assertEq(parsed.ok, true);
  assertEq(parsed.refs, ['f1', 'source:gaussian']);
  assertEq(parsed.format, 'markdown');

  const missing = parseResolveBatchParams(new URL('https://anchorfact.org/api/resolve-batch'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.machine_recovery.recoverable, true);
  assertEq(missing.payload.machine_recovery.current_endpoint, 'resolve-batch');
  assert(missing.payload.machine_recovery.next_request.path.includes('/api/context?q='), 'batch guidance should start from context discovery');
  assert(missing.payload.machine_recovery.retry_examples.some(call => call.path.includes('/api/resolve-batch?ref=')), 'batch guidance should include repeated ref retry example');

  const tooManyUrl = new URL('https://anchorfact.org/api/resolve-batch');
  for (let i = 0; i < 21; i++) tooManyUrl.searchParams.append('ref', `f${i}`);
  const tooMany = parseResolveBatchParams(tooManyUrl);
  assertEq(tooMany.ok, false);
  assertEq(tooMany.payload.error.code, 'too_many_references');
});

test('buildResolveBatchApiPayload resolves mixed references and preserves item statuses', () => {
  const result = buildResolveBatchApiPayload({
    refs: ['f1', 'source:gaussian', 'ai/nope'],
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex,
    generated: '2026-05-29T00:00:00.000Z'
  });
  assertEq(result.ok, true);
  assertEq(result.payload.schema_version, 'anchorfact.resolve-batch-api.v1');
  assertEq(result.payload.reference_count, 3);
  assertEq(result.payload.ok_count, 2);
  assertEq(result.payload.error_count, 1);
  assertEq(result.payload.results[0].resolved_type, 'claim');
  assertEq(result.payload.results[1].resolved_type, 'source');
  assertEq(result.payload.results[2].ok, false);
  assertEq(result.payload.results[2].error.code, 'reference_not_found');

  const markdown = renderResolveBatchMarkdown(result.payload);
  assert(markdown.includes('# AnchorFact Resolve Batch'), 'batch markdown should include heading');
  assert(markdown.includes('f1: claim'), 'batch markdown should include claim item');
});

test('buildResolveApiPayload wraps not-found errors in the resolver schema', () => {
  const result = resolve('ai/nope');
  assertEq(result.ok, false);
  assertEq(result.status, 404);
  assertEq(result.payload.schema_version, 'anchorfact.resolve-api.v1');
  assertEq(result.payload.error.code, 'reference_not_found');
  assertEq(result.payload.resolved_type, 'article');
});

test('Pages Function returns JSON and Markdown batch resolver payloads', async () => {
  const response = await onRequestGetBatch({
    request: new Request('https://anchorfact.org/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.resolve-batch-api.v1');
  assertEq(payload.ok_count, 2);
  assertEq(payload.results.map(item => item.resolved_type), ['claim', 'source']);

  const markdown = await onRequestGetBatch({
    request: new Request('https://anchorfact.org/api/resolve-batch?ref=f1&format=markdown'),
    env: assetEnv()
  });
  const text = await markdown.text();
  assertEq(markdown.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert(text.includes('# AnchorFact Resolve Batch'), 'markdown response should include heading');
});

test('Pages Function returns CORS JSON resolver payloads', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/resolve?ref=f1'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.resolve-api.v1');
  assertEq(payload.resolved_type, 'claim');
  assertEq(payload.result.claim_id, 'https://anchorfact.org/fact/f1');
});

test('Pages Function rejects missing refs and asset failures', async () => {
  const missing = await onRequestGet({
    request: new Request('https://anchorfact.org/api/resolve'),
    env: assetEnv()
  });
  const missingPayload = await missing.json();
  assertEq(missing.status, 400);
  assertEq(missingPayload.machine_recovery.current_endpoint, 'resolve');

  const assetFailure = await onRequestGet({
    request: new Request('https://anchorfact.org/api/resolve?ref=f1'),
    env: assetEnv({ '/claims.json': null })
  });
  assertEq(assetFailure.status, 502);
});

test('Pages Function supports OPTIONS preflight', () => {
  const response = onRequestOptions();
  assertEq(response.status, 204);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');

  const batchResponse = onRequestOptionsBatch();
  assertEq(batchResponse.status, 204);
  assertEq(batchResponse.headers.get('Access-Control-Allow-Origin'), '*');
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
