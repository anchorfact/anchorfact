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
  provenance_url: 'https://anchorfact.org/provenance.json',
  article_count: 3,
  records: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      title: '3D Gaussian Splatting',
      url: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
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
      url: 'https://anchorfact.org/science/statistics/index.json',
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
      url: 'https://anchorfact.org/ai/neural-rendering/index.json',
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
  assertEq(missing.status, 400);
  assertEq(missing.payload.error.code, 'missing_or_invalid_query');
  assertEq(missing.payload.machine_recovery.recoverable, true);
  assertEq(missing.payload.machine_recovery.current_endpoint, 'search');
  assert(
    missing.payload.machine_recovery.retry_examples.some(example => example.path.includes('/api/search?q=')),
    'missing search query response should include an executable search retry example'
  );
});

test('rankSearchRecords ranks exact title and keyword matches first', () => {
  const results = rankSearchRecords(fixtureIndex.records, 'gaussian rendering', 2);
  assertEq(results.length, 2);
  assertEq(results[0].canonical_slug, 'ai/gaussian-splatting');
  assert(results[0].score > results[1].score, 'top result should score higher');
  assert(results[0].matched_keywords.includes('gaussian'), 'matched keywords should include gaussian');
});

test('rankSearchRecords favors exact title phrases over narrower title matches', () => {
  const results = rankSearchRecords([
    {
      canonical_slug: 'ai/latent-diffusion-models',
      title: 'Latent Diffusion Models',
      url: 'https://anchorfact.org/ai/latent-diffusion-models/index.json',
      description: 'Diffusion models that operate in latent spaces.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-latent-diffusion'],
      keywords: ['latent', 'diffusion', 'models'],
      routes: {},
      search_text: 'latent diffusion models diffusion models compressed latent spaces'
    },
    {
      canonical_slug: 'ai/diffusion-models',
      title: 'Diffusion Models',
      url: 'https://anchorfact.org/ai/diffusion-models/index.json',
      description: 'The general diffusion model family.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-diffusion'],
      keywords: ['diffusion', 'models'],
      routes: {},
      search_text: 'diffusion models noising denoising generative model family'
    }
  ], 'diffusion models', 2);

  assertEq(results[0].canonical_slug, 'ai/diffusion-models');
});

test('rankSearchRecords ignores generic question words and standalone years', () => {
  const results = rankSearchRecords([
    {
      canonical_slug: 'sports/generic-history',
      title: 'Sports History',
      url: 'https://anchorfact.org/sports/generic-history/index.json',
      description: 'A public sports reference.',
      confidence_level: 'medium',
      source_coverage: { verified: 1, total: 1, ratio: 1 },
      claim_count: 1,
      claim_ids: ['fact-sports'],
      keywords: ['sports'],
      routes: {},
      search_text: 'sports history in the year 2026 with public reference'
    }
  ], 'Who won the NBA Finals in 2026?', 3);

  assertEq(results, []);
});

test('rankSearchRecords does not match query tokens inside longer words', () => {
  const results = rankSearchRecords([
    {
      canonical_slug: 'health/human-anatomy',
      title: 'Human Anatomy',
      url: 'https://anchorfact.org/health/human-anatomy/index.json',
      description: 'Systems, organs, and body structure.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-anatomy'],
      keywords: ['human', 'anatomy', 'organs'],
      routes: {},
      search_text: 'human anatomy systems organs and function'
    }
  ], 'GANs', 3);

  assertEq(results, []);
});

test('rankSearchRecords favors exact acronym matches over generic topical words', () => {
  const results = rankSearchRecords([
    {
      canonical_slug: 'ai/neural-architecture-search',
      title: 'Neural Architecture Search',
      url: 'https://anchorfact.org/ai/neural-architecture-search/index.json',
      description: 'Search methods for model architectures.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-nas'],
      keywords: ['neural', 'architecture', 'search'],
      routes: {},
      search_text: 'neural architecture search methods for machine learning architectures'
    },
    {
      canonical_slug: 'ai/convolutional-neural-networks-cnn',
      title: 'Convolutional Neural Networks (CNN)',
      url: 'https://anchorfact.org/ai/convolutional-neural-networks-cnn/index.json',
      description: 'Convolutional neural networks for visual data.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-cnn'],
      keywords: ['convolutional', 'neural', 'networks', 'cnn'],
      routes: {},
      search_text: 'convolutional neural networks cnn image recognition'
    }
  ], 'CNN architecture', 2);

  assertEq(results[0].canonical_slug, 'ai/convolutional-neural-networks-cnn');
});

test('rankSearchRecords uses canonical slugs as exact topic signals', () => {
  const results = rankSearchRecords([
    {
      canonical_slug: 'ai/object-detection',
      title: 'Object Detection: YOLO, R-CNN, and DETR',
      url: 'https://anchorfact.org/ai/object-detection/index.json',
      description: 'Object detection systems often include R-CNN variants.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-object-detection'],
      keywords: ['object', 'detection', 'cnn'],
      routes: {},
      search_text: 'object detection yolo r cnn detr cnn cnn'
    },
    {
      canonical_slug: 'ai/convolutional-neural-networks-cnn',
      title: 'Convolutional Neural Networks (CNN)',
      url: 'https://anchorfact.org/ai/convolutional-neural-networks-cnn/index.json',
      description: 'Convolutional neural networks for visual data.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-cnn'],
      keywords: ['convolutional', 'neural', 'networks', 'cnn'],
      routes: {},
      search_text: 'convolutional neural networks cnn'
    }
  ], 'CNN', 2);

  assertEq(results[0].canonical_slug, 'ai/convolutional-neural-networks-cnn');
});

test('rankSearchRecords rejects weak-only matches for multi-token queries', () => {
  const records = [
    {
      canonical_slug: 'computer-science/cap-theorem',
      title: 'CAP Theorem',
      url: 'https://anchorfact.org/computer-science/cap-theorem/index.json',
      description: 'The CAP theorem describes distributed system trade-offs.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-cap'],
      keywords: ['cap', 'theorem', 'distributed'],
      routes: {},
      search_text: 'cap theorem distributed systems consistency availability partition tolerance'
    },
    {
      canonical_slug: 'ai/attention-mechanisms-deep-dive',
      title: 'Attention Mechanisms Deep Dive',
      url: 'https://anchorfact.org/ai/attention-mechanisms-deep-dive/index.json',
      description: 'Attention mechanisms and action selection in neural systems.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-attention'],
      keywords: ['attention', 'mechanisms', 'action'],
      routes: {},
      search_text: 'attention mechanisms action selection neural systems'
    },
    {
      canonical_slug: 'health/strength-training',
      title: 'Strength Training',
      url: 'https://anchorfact.org/health/strength-training/index.json',
      description: 'Progressive resistance training and adaptation.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['fact-strength'],
      keywords: ['strength', 'training', 'resistance'],
      routes: {},
      search_text: 'strength training progressive resistance adaptation'
    }
  ];

  assertEq(rankSearchRecords(records, 'Bayes theorem', 3), []);
  assertEq(rankSearchRecords(records, 'CAP theorem', 3)[0].canonical_slug, 'computer-science/cap-theorem');
  assertEq(rankSearchRecords(records, 'antibiotics mechanisms of action', 3), []);
  assertEq(rankSearchRecords(records, 'antibiotic resistance', 3), []);
  assertEq(rankSearchRecords(records, 'diabetes type 2 management', 3), []);
  assertEq(rankSearchRecords(records, 'attention mechanism', 3)[0].canonical_slug, 'ai/attention-mechanisms-deep-dive');
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
  assertEq(payload.provenance_url, fixtureIndex.provenance_url);
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
  assertEq(payload.provenance_url, fixtureIndex.provenance_url);
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
  assertEq(payload.error.code, 'missing_or_invalid_query');
  assertEq(payload.machine_recovery.current_endpoint, 'search');
  assert(
    payload.machine_recovery.next_request.path.includes('/api/context?q='),
    'empty search request should route machines to default context recovery'
  );

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
