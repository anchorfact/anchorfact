#!/usr/bin/env node
import {
  buildClaimApiPayload,
  normalizeClaimId,
  parseClaimParams
} from '../src/lib/claim-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/claim.js';

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
      canonical_slug: 'ai/gaussian-splatting',
      canonical_url: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
      title: '3D Gaussian Splatting',
      status: 'public',
      confidence_level: 'medium',
      is_draft: false
    },
    {
      canonical_slug: 'ai/draft-only',
      canonical_url: 'https://anchorfact.org/ai/draft-only/index.json',
      title: 'Draft Only',
      status: 'draft',
      is_draft: true
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
      article: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
      canonical_slug: 'ai/gaussian-splatting',
      title: '3D Gaussian Splatting',
      statement: '3D Gaussian Splatting represents scenes as anisotropic Gaussians.',
      confidence: 'medium',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      source_url: 'https://arxiv.org/abs/2308.04079',
      evidence_match: 'mapped',
      citation: { '@type': 'CreativeWork', sameAs: 'https://arxiv.org/abs/2308.04079' }
    },
    {
      id: 'https://anchorfact.org/fact/draft-1',
      canonical_slug: 'ai/draft-only',
      statement: 'Draft-only claim.',
      confidence: 'low',
      source_title: 'Draft Source',
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
    }
  ]
};

function assetEnv(overrides = {}) {
  const payloads = {
    '/manifest.json': fixtureManifest,
    '/claims.json': fixtureClaims,
    '/sources.json': fixtureSources,
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

console.log('AnchorFact Claim API Tests\n');

test('normalizeClaimId accepts shorthand, fact paths, and full URLs', () => {
  assertEq(normalizeClaimId('f1'), 'https://anchorfact.org/fact/f1');
  assertEq(normalizeClaimId('/fact/f1'), 'https://anchorfact.org/fact/f1');
  assertEq(normalizeClaimId('https://anchorfact.org/fact/f1?utm=x#part'), 'https://anchorfact.org/fact/f1');
  assertEq(normalizeClaimId('https://example.com/fact/f1'), null);
  assertEq(normalizeClaimId('../secret'), null);
});

test('parseClaimParams validates id-like inputs', () => {
  const parsed = parseClaimParams(new URL('https://anchorfact.org/api/claim?id=f1'));
  assertEq(parsed.ok, true);
  assertEq(parsed.claimId, 'https://anchorfact.org/fact/f1');

  const missing = parseClaimParams(new URL('https://anchorfact.org/api/claim'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.error.code, 'missing_or_invalid_claim_id');
  assertEq(missing.payload.machine_recovery.recoverable, true);
  assertEq(missing.payload.machine_recovery.current_endpoint, 'claim');
  assert(
    missing.payload.machine_recovery.retry_examples.some(example => example.path === '/api/claim?id={claim_id}'),
    'missing claim id response should include a templated claim retry example'
  );
});

test('buildClaimApiPayload returns a public claim with article and matching sources', () => {
  const result = buildClaimApiPayload({
    claimId: 'f1',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(result.ok, true);
  assertEq(result.payload.schema_version, 'anchorfact.claim-api.v1');
  assertEq(result.payload.claim_id, 'https://anchorfact.org/fact/f1');
  assertEq(result.payload.claim.statement, '3D Gaussian Splatting represents scenes as anisotropic Gaussians.');
  assertEq(result.payload.citation_contract.include_anchorfact_claim_url, true);
  assert(result.payload.citation_export.inline.includes('AnchorFact: 3D Gaussian Splatting; medium confidence'), 'claim response should include inline citation text');
  assertEq(result.payload.citation_export.source_tier, 'A');
  assertEq(result.payload.article.canonical_slug, 'ai/gaussian-splatting');
  assertEq(result.payload.source_count, 1);
  assertEq(result.payload.sources[0].tier, 'A');
});

test('buildClaimApiPayload hides claims whose article is not public', () => {
  const result = buildClaimApiPayload({
    claimId: 'draft-1',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources
  });

  assertEq(result.ok, false);
  assertEq(result.status, 404);
  assertEq(result.payload.error.code, 'public_article_not_found');
});

test('Pages Function returns CORS JSON claim bundles', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/claim?id=f1'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.claim-api.v1');
  assert(payload.citation_export.markdown.includes('3D Gaussian Splatting represents scenes'), 'function response should include markdown citation text');
  assertEq(payload.source_count, 1);
});

test('Pages Function rejects missing ids, unknown claims, and asset failures', async () => {
  const missingId = await onRequestGet({
    request: new Request('https://anchorfact.org/api/claim'),
    env: assetEnv()
  });
  assertEq(missingId.status, 400);
  const missingIdPayload = await missingId.json();
  assertEq(missingIdPayload.machine_recovery.current_endpoint, 'claim');
  assert(
    missingIdPayload.machine_recovery.next_request.path.includes('/api/context?q='),
    'empty claim request should route machines to default context recovery'
  );

  const missingClaim = await onRequestGet({
    request: new Request('https://anchorfact.org/api/claim?id=nope'),
    env: assetEnv()
  });
  const missingPayload = await missingClaim.json();
  assertEq(missingClaim.status, 404);
  assertEq(missingPayload.error.code, 'public_claim_not_found');

  const assetFailure = await onRequestGet({
    request: new Request('https://anchorfact.org/api/claim?id=f1'),
    env: assetEnv({ '/sources.json': null })
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
