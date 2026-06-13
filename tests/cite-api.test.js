#!/usr/bin/env node
import {
  buildCiteApiPayload,
  parseCiteParams,
  renderCitationMarkdown
} from '../src/lib/cite-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/cite.js';

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

function assetEnv(overrides = {}) {
  const assets = {
    '/manifest.json': fixtureManifest,
    '/claims.json': fixtureClaims,
    '/sources.json': fixtureSources,
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

console.log('AnchorFact Cite API Tests\n');

test('parseCiteParams validates claim id and markdown format', () => {
  const parsed = parseCiteParams(new URL('https://anchorfact.org/api/cite?id=f1&format=md'));
  assertEq(parsed.ok, true);
  assertEq(parsed.claimId, 'https://anchorfact.org/fact/f1');
  assertEq(parsed.format, 'markdown');

  const missing = parseCiteParams(new URL('https://anchorfact.org/api/cite'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
});

test('buildCiteApiPayload returns a compact citation response', () => {
  const result = buildCiteApiPayload({
    claimId: 'f1',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(result.ok, true);
  assertEq(result.payload.schema_version, 'anchorfact.cite-api.v1');
  assertEq(result.payload.claim_id, 'https://anchorfact.org/fact/f1');
  assertEq(result.payload.citation_contract.include_anchorfact_claim_url, true);
  assert(result.payload.citation_export.inline.includes('AnchorFact:'), 'citation response should include inline citation text');
  assertEq(result.payload.source.id, 'source:gaussian');
});

test('renderCitationMarkdown returns answer-ready citation text', () => {
  const result = buildCiteApiPayload({
    claimId: 'f1',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    generated: '2026-05-29T00:00:00.000Z'
  });
  const markdown = renderCitationMarkdown(result.payload);
  assert(markdown.includes('# AnchorFact Citation'), 'markdown should include heading');
  assert(markdown.includes('https://anchorfact.org/fact/f1'), 'markdown should include claim URL');
  assert(markdown.includes('https://arxiv.org/abs/2308.04079'), 'markdown should include source URL');
});

test('Pages Function returns CORS JSON citation payloads', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/cite?id=f1'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.cite-api.v1');
  assert(payload.citation_export.markdown.includes('3D Gaussian Splatting represents scenes'), 'function response should include markdown citation text');
});

test('Pages Function returns Markdown citations on request', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/cite?id=f1&format=markdown'),
    env: assetEnv()
  });
  const text = await response.text();
  assertEq(response.status, 200);
  assert(response.headers.get('Content-Type').includes('text/markdown'), 'markdown response should use text/markdown');
  assert(text.includes('# AnchorFact Citation'), 'markdown response should include heading');
});

test('Pages Function rejects missing ids and asset failures', async () => {
  const missing = await onRequestGet({
    request: new Request('https://anchorfact.org/api/cite'),
    env: assetEnv()
  });
  assertEq(missing.status, 400);

  const assetFailure = await onRequestGet({
    request: new Request('https://anchorfact.org/api/cite?id=f1'),
    env: assetEnv({ '/sources.json': null })
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
