#!/usr/bin/env node
import {
  buildSearchApiPayload,
  parseSearchParams,
  rankSearchRecords
} from '../src/lib/search-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/search.js';

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

const fixtureIndex = {
  schema_version: 'anchorfact.search-index.v1',
  generated: '2026-05-29T00:00:00.000Z',
  article_count: 3,
  records: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      title: '3D Gaussian Splatting',
      url: 'https://anchorfact.org/ai/gaussian-splatting/',
      description: 'Real-time neural scene rendering.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-1', 'fact-2'],
      keywords: ['gaussian', 'splatting', 'rendering'],
      routes: { jsonld: 'https://anchorfact.org/ai/gaussian-splatting/index.json' },
      search_text: '3d gaussian splatting neural rendering real time radiance field'
    },
    {
      canonical_slug: 'science/statistics',
      title: 'Statistics Fundamentals',
      url: 'https://anchorfact.org/science/statistics/',
      description: 'Probability, inference, and uncertainty.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 3, ratio: 0.667 },
      claim_count: 2,
      claim_ids: ['fact-3'],
      keywords: ['statistics', 'probability'],
      routes: { jsonld: 'https://anchorfact.org/science/statistics/index.json' },
      search_text: 'statistics probability inference uncertainty'
    },
    {
      canonical_slug: 'ai/neural-rendering',
      title: 'Neural Rendering',
      url: 'https://anchorfact.org/ai/neural-rendering/',
      description: 'Rendering with learned representations.',
      confidence_level: 'high',
      source_coverage: { verified: 4, total: 4, ratio: 1 },
      claim_count: 4,
      claim_ids: ['fact-4'],
      keywords: ['neural', 'rendering'],
      routes: { jsonld: 'https://anchorfact.org/ai/neural-rendering/index.json' },
      search_text: 'neural rendering radiance fields'
    }
  ]
};

console.log('AnchorFact Search API Tests\n');

test('parseSearchParams validates query and clamps limit', () => {
  const parsed = parseSearchParams(new URL('https://anchorfact.org/api/search?q=gaussian&limit=99'));
  assertEq(parsed.ok, true);
  assertEq(parsed.query, 'gaussian');
  assertEq(parsed.limit, 20);

  const missing = parseSearchParams(new URL('https://anchorfact.org/api/search'));
  assertEq(missing.ok, false);
  assert(missing.error.includes('q'), 'missing query should mention q');
});

test('rankSearchRecords ranks exact title and keyword matches first', () => {
  const results = rankSearchRecords(fixtureIndex.records, 'gaussian rendering', 2);
  assertEq(results.length, 2);
  assertEq(results[0].canonical_slug, 'ai/gaussian-splatting');
  assert(results[0].score > results[1].score, 'top result should score higher');
  assert(results[0].matched_keywords.includes('gaussian'), 'matched keywords should include gaussian');
});

test('buildSearchApiPayload returns compact agent-friendly results', () => {
  const payload = buildSearchApiPayload({
    query: 'gaussian radiance',
    limit: 2,
    searchIndex: fixtureIndex,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(payload.schema_version, 'anchorfact.search-api.v1');
  assertEq(payload.query, 'gaussian radiance');
  assertEq(payload.limit, 2);
  assertEq(payload.source_index_generated, fixtureIndex.generated);
  assertEq(payload.results[0].canonical_slug, 'ai/gaussian-splatting');
  assert(payload.results[0].claim_ids.includes('fact-1'), 'result should carry claim ids');
  assert(payload.results[0].routes.jsonld.endsWith('/index.json'), 'result should carry route hints');
});

test('Pages Function returns CORS JSON from the static search index', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/search?q=gaussian&limit=1'),
    env: {
      ASSETS: {
        fetch: async () => new Response(JSON.stringify(fixtureIndex), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.result_count, 1);
  assertEq(payload.results[0].canonical_slug, 'ai/gaussian-splatting');
});

test('Pages Function rejects empty queries and supports OPTIONS', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/search'),
    env: { ASSETS: { fetch: async () => new Response('{}') } }
  });
  const payload = await response.json();
  assertEq(response.status, 400);
  assert(payload.error.includes('q'), 'empty query error should mention q');

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
