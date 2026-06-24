#!/usr/bin/env node
import {
  buildSourceApiPayload,
  normalizeSourceId,
  normalizeSourceUrl,
  parseSourceParams
} from '../src/lib/source-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/source.js';

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
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      source_url: 'https://arxiv.org/abs/2308.04079',
      confidence: 'medium'
    },
    {
      id: 'https://anchorfact.org/fact/other',
      canonical_slug: 'ai/other',
      statement: 'Unrelated claim.',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      source_url: 'https://arxiv.org/abs/2308.04079',
      confidence: 'medium'
    }
  ]
};

function assetEnv(overrides = {}) {
  const payloads = {
    '/sources.json': fixtureSources,
    '/claims.json': fixtureClaims,
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

console.log('AnchorFact Source API Tests\n');

test('normalizers accept source ids and canonical HTTP URLs', () => {
  assertEq(normalizeSourceId('source:gaussian'), 'source:gaussian');
  assertEq(normalizeSourceId('gaussian'), null);
  assertEq(normalizeSourceUrl('https://arxiv.org/abs/2308.04079?utm=x#top'), 'https://arxiv.org/abs/2308.04079');
  assertEq(normalizeSourceUrl('javascript:alert(1)'), null);
});

test('parseSourceParams validates id or url inputs', () => {
  const byId = parseSourceParams(new URL('https://anchorfact.org/api/source?id=source:gaussian'));
  assertEq(byId.ok, true);
  assertEq(byId.sourceId, 'source:gaussian');

  const byUrl = parseSourceParams(new URL('https://anchorfact.org/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079'));
  assertEq(byUrl.ok, true);
  assertEq(byUrl.sourceUrl, 'https://arxiv.org/abs/2308.04079');

  const missing = parseSourceParams(new URL('https://anchorfact.org/api/source'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.machine_recovery.recoverable, true);
  assertEq(missing.payload.machine_recovery.current_endpoint, 'source');
  assert(missing.payload.machine_recovery.next_request.path.includes('/api/context?q='), 'source lookup guidance should send agents to context discovery first');
  assert(missing.payload.machine_recovery.retry_examples.some(call => call.path.includes('/api/source?id=')), 'source guidance should include id retry example');
});

test('buildSourceApiPayload returns source and mapped public claims', () => {
  const result = buildSourceApiPayload({
    sourceId: 'source:gaussian',
    sourcesPayload: fixtureSources,
    claimsPayload: fixtureClaims,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(result.ok, true);
  assertEq(result.payload.schema_version, 'anchorfact.source-api.v1');
  assertEq(result.payload.source_id, 'source:gaussian');
  assertEq(result.payload.source.tier, 'A');
  assertEq(result.payload.claim_count, 1);
  assertEq(result.payload.claims[0].id, 'https://anchorfact.org/fact/f1');
});

test('buildSourceApiPayload can look up by source URL and returns 404 for misses', () => {
  const byUrl = buildSourceApiPayload({
    sourceUrl: 'https://arxiv.org/abs/2308.04079',
    sourcesPayload: fixtureSources,
    claimsPayload: fixtureClaims
  });
  assertEq(byUrl.ok, true);
  assertEq(byUrl.payload.source_id, 'source:gaussian');

  const missing = buildSourceApiPayload({
    sourceId: 'source:nope',
    sourcesPayload: fixtureSources,
    claimsPayload: fixtureClaims
  });
  assertEq(missing.ok, false);
  assertEq(missing.status, 404);
  assertEq(missing.payload.error.code, 'public_source_not_found');
});

test('Pages Function returns CORS JSON source bundles', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/source?id=source:gaussian'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.source-api.v1');
  assertEq(payload.claim_count, 1);
});

test('Pages Function rejects bad lookups, unknown sources, and asset failures', async () => {
  const badLookup = await onRequestGet({
    request: new Request('https://anchorfact.org/api/source'),
    env: assetEnv()
  });
  const badLookupPayload = await badLookup.json();
  assertEq(badLookup.status, 400);
  assertEq(badLookupPayload.machine_recovery.current_endpoint, 'source');

  const missingSource = await onRequestGet({
    request: new Request('https://anchorfact.org/api/source?id=source:nope'),
    env: assetEnv()
  });
  assertEq(missingSource.status, 404);

  const assetFailure = await onRequestGet({
    request: new Request('https://anchorfact.org/api/source?id=source:gaussian'),
    env: assetEnv({ '/claims.json': null })
  });
  assertEq(assetFailure.status, 502);
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
