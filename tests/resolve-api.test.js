#!/usr/bin/env node
import {
  buildResolveApiPayload,
  parseResolveParams
} from '../src/lib/resolve-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/resolve.js';

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
      canonical_url: 'https://anchorfact.org/ai/3d-generation-gaussian-splatting/',
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

test('buildResolveApiPayload wraps not-found errors in the resolver schema', () => {
  const result = resolve('ai/nope');
  assertEq(result.ok, false);
  assertEq(result.status, 404);
  assertEq(result.payload.schema_version, 'anchorfact.resolve-api.v1');
  assertEq(result.payload.error.code, 'reference_not_found');
  assertEq(result.payload.resolved_type, 'article');
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
  assertEq(missing.status, 400);

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
