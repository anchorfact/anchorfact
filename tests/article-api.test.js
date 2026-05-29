#!/usr/bin/env node
import {
  buildArticleApiPayload,
  normalizeArticleSlug,
  parseArticleParams
} from '../src/lib/article-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/article.js';

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
      canonical_url: 'https://anchorfact.org/ai/gaussian-splatting/',
      title: '3D Gaussian Splatting',
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
      canonical_url: 'https://anchorfact.org/ai/draft-only/',
      title: 'Draft Only',
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
      source_url: 'https://arxiv.org/abs/2308.04079'
    },
    {
      id: 'https://anchorfact.org/fact/f2',
      canonical_slug: 'ai/gaussian-splatting',
      statement: 'NeRF represents scenes as neural radiance fields.',
      confidence: 'medium',
      source_url: 'https://arxiv.org/abs/2003.08934'
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
          url: 'https://anchorfact.org/ai/gaussian-splatting/'
        }
      ]
    }
  ]
};

const fixtureSearchIndex = {
  schema_version: 'anchorfact.search-index.v1',
  generated: '2026-05-29T00:00:00.000Z',
  records: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      title: '3D Gaussian Splatting',
      url: 'https://anchorfact.org/ai/gaussian-splatting/',
      description: 'Real-time neural scene rendering.',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      source_tiers: ['A'],
      source_titles: ['3D Gaussian Splatting for Real-Time Radiance Field Rendering'],
      claim_ids: ['https://anchorfact.org/fact/f1', 'https://anchorfact.org/fact/f2'],
      claim_count: 2,
      keywords: ['gaussian', 'splatting'],
      routes: {
        jsonld: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
        markdown: 'https://anchorfact.org/ai/gaussian-splatting/index.md'
      }
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

console.log('AnchorFact Article API Tests\n');

test('normalizeArticleSlug accepts slugs, URLs, and article route files', () => {
  assertEq(normalizeArticleSlug(' /AI/Gaussian-Splatting/index.json '), 'ai/gaussian-splatting');
  assertEq(normalizeArticleSlug('https://anchorfact.org/ai/gaussian-splatting/index.md'), 'ai/gaussian-splatting');
  assertEq(normalizeArticleSlug('../secret'), null);
  assertEq(normalizeArticleSlug('bad slug'), null);
});

test('parseArticleParams validates slug-like inputs', () => {
  const parsed = parseArticleParams(new URL('https://anchorfact.org/api/article?slug=ai/gaussian-splatting'));
  assertEq(parsed.ok, true);
  assertEq(parsed.slug, 'ai/gaussian-splatting');

  const missing = parseArticleParams(new URL('https://anchorfact.org/api/article'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.error.code, 'missing_or_invalid_slug');
});

test('buildArticleApiPayload returns public article claims and sources', () => {
  const result = buildArticleApiPayload({
    slug: 'ai/gaussian-splatting',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(result.ok, true);
  assertEq(result.payload.schema_version, 'anchorfact.article-api.v1');
  assertEq(result.payload.canonical_slug, 'ai/gaussian-splatting');
  assertEq(result.payload.article.title, '3D Gaussian Splatting');
  assertEq(result.payload.citation_contract.prefer_claim_level_citations, true);
  assertEq(result.payload.claim_count, 2);
  assertEq(result.payload.citation_exports.length, 2);
  assert(result.payload.citation_exports[0].inline.includes('AnchorFact:'), 'article response should include citation-ready text');
  assertEq(result.payload.source_count, 1);
  assertEq(result.payload.retrieval.routes.markdown, 'https://anchorfact.org/ai/gaussian-splatting/index.md');
});

test('buildArticleApiPayload hides draft records from the public API', () => {
  const result = buildArticleApiPayload({
    slug: 'ai/draft-only',
    manifest: fixtureManifest,
    claimsPayload: fixtureClaims,
    sourcesPayload: fixtureSources,
    searchIndex: fixtureSearchIndex
  });

  assertEq(result.ok, false);
  assertEq(result.status, 404);
  assertEq(result.payload.error.code, 'public_article_not_found');
});

test('Pages Function returns CORS JSON evidence bundles', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/article?slug=ai/gaussian-splatting'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.article-api.v1');
  assertEq(payload.claim_count, 2);
  assertEq(payload.citation_exports.length, 2);
  assertEq(payload.source_count, 1);
});

test('Pages Function rejects missing slugs, missing public articles, and asset failures', async () => {
  const missingSlug = await onRequestGet({
    request: new Request('https://anchorfact.org/api/article'),
    env: assetEnv()
  });
  assertEq(missingSlug.status, 400);

  const missingArticle = await onRequestGet({
    request: new Request('https://anchorfact.org/api/article?slug=ai/nope'),
    env: assetEnv()
  });
  const missingPayload = await missingArticle.json();
  assertEq(missingArticle.status, 404);
  assertEq(missingPayload.error.code, 'public_article_not_found');

  const assetFailure = await onRequestGet({
    request: new Request('https://anchorfact.org/api/article?slug=ai/gaussian-splatting'),
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
