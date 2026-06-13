#!/usr/bin/env node
import {
  buildPlanApiPayload,
  parsePlanParams
} from '../src/lib/plan-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/plan.js';

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

const searchIndex = {
  schema_version: 'anchorfact.search-index.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  article_count: 13,
  records: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      title: '3D Gaussian Splatting',
      url: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
      description: 'Real-time neural scene rendering.',
      confidence_level: 'medium',
      source_coverage: { verified: 3, total: 3, ratio: 1 },
      claim_count: 3,
      claim_ids: ['https://anchorfact.org/fact/f1', 'https://anchorfact.org/fact/f2'],
      keywords: ['gaussian', 'splatting', 'rendering'],
      routes: { jsonld: 'https://anchorfact.org/ai/gaussian-splatting/index.json' },
      search_text: '3d gaussian splatting neural rendering real time radiance field'
    },
    {
      canonical_slug: 'business/restaurant-technology',
      title: 'Restaurant Technology',
      url: 'https://anchorfact.org/business/restaurant-technology/index.json',
      description: 'Digital systems used by restaurants.',
      confidence_level: 'medium',
      source_coverage: { verified: 1, total: 1, ratio: 1 },
      claim_count: 1,
      claim_ids: ['https://anchorfact.org/fact/f4'],
      keywords: ['restaurant', 'restaurants', 'technology'],
      routes: { jsonld: 'https://anchorfact.org/business/restaurant-technology/index.json' },
      search_text: 'restaurant restaurants technology reservations delivery systems'
    },
    {
      canonical_slug: 'ai/ai-for-weather-forecasting',
      title: 'AI for Weather Forecasting',
      url: 'https://anchorfact.org/ai/ai-for-weather-forecasting/index.json',
      description: 'Machine learning systems for meteorological forecasting.',
      confidence_level: 'medium',
      source_coverage: { verified: 1, total: 1, ratio: 1 },
      claim_count: 1,
      claim_ids: ['https://anchorfact.org/fact/f5'],
      keywords: ['weather', 'forecasting', 'meteorology'],
      routes: { jsonld: 'https://anchorfact.org/ai/ai-for-weather-forecasting/index.json' },
      search_text: 'weather forecasting meteorology machine learning'
    },
    {
      canonical_slug: 'self-improvement/time-management',
      title: 'Time Management',
      url: 'https://anchorfact.org/self-improvement/time-management/index.json',
      description: 'Static time-management methods for planning and prioritization.',
      confidence_level: 'medium',
      source_coverage: { verified: 1, total: 1, ratio: 1 },
      claim_count: 1,
      claim_ids: ['https://anchorfact.org/fact/f9'],
      keywords: ['time', 'management', 'planning'],
      routes: { jsonld: 'https://anchorfact.org/self-improvement/time-management/index.json' },
      search_text: 'time management planning prioritization productivity'
    },
    {
      canonical_slug: 'health/medication-safety',
      title: 'Medication Safety',
      url: 'https://anchorfact.org/health/medication-safety/index.json',
      description: 'Educational medication safety reference.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f6'],
      keywords: ['aspirin', 'medication', 'safety'],
      routes: { jsonld: 'https://anchorfact.org/health/medication-safety/index.json' },
      search_text: 'aspirin medication safety chest pain symptoms treatment'
    },
    {
      canonical_slug: 'computer-science/sql-injection',
      title: 'SQL Injection Prevention',
      url: 'https://anchorfact.org/computer-science/sql-injection/index.json',
      description: 'Educational secure coding reference for SQL injection prevention.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f7'],
      keywords: ['sql', 'injection', 'prevention', 'payload'],
      routes: { jsonld: 'https://anchorfact.org/computer-science/sql-injection/index.json' },
      search_text: 'sql injection prevention attack payload parameterized queries secure coding'
    },
    {
      canonical_slug: 'computer-science/phishing-awareness',
      title: 'Phishing Awareness',
      url: 'https://anchorfact.org/computer-science/phishing-awareness/index.json',
      description: 'Educational reference for recognizing and preventing phishing.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f8'],
      keywords: ['phishing', 'prevention', 'awareness'],
      routes: { jsonld: 'https://anchorfact.org/computer-science/phishing-awareness/index.json' },
      search_text: 'phishing prevention awareness training recognize report secure email'
    },
    {
      canonical_slug: 'science/statistics',
      title: 'Statistics Fundamentals',
      url: 'https://anchorfact.org/science/statistics/index.json',
      description: 'Probability, inference, and uncertainty.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 3, ratio: 0.667 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f3'],
      keywords: ['statistics', 'probability'],
      routes: { jsonld: 'https://anchorfact.org/science/statistics/index.json' },
      search_text: 'statistics probability inference uncertainty'
    },
    {
      canonical_slug: 'computer-science/api-rate-limiting',
      title: 'API Rate Limiting',
      url: 'https://anchorfact.org/computer-science/api-rate-limiting/index.json',
      description: 'Stable API throttling and quota-control patterns.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f10'],
      keywords: ['api', 'rate', 'limiting', 'throttling'],
      routes: { jsonld: 'https://anchorfact.org/computer-science/api-rate-limiting/index.json' },
      search_text: 'api rate limiting throttling quota control'
    },
    {
      canonical_slug: 'computer-science/software-versioning',
      title: 'Software Versioning Basics',
      url: 'https://anchorfact.org/computer-science/software-versioning/index.json',
      description: 'Stable semantic versioning and release numbering concepts.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f11'],
      keywords: ['software', 'versioning', 'basics', 'semantic'],
      routes: { jsonld: 'https://anchorfact.org/computer-science/software-versioning/index.json' },
      search_text: 'software versioning basics semantic versioning release numbering'
    },
    {
      canonical_slug: 'business/stock-market-basics',
      title: 'Stock Market Basics',
      url: 'https://anchorfact.org/business/stock-market-basics/index.json',
      description: 'Foundational market structure and exchange concepts.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f12'],
      keywords: ['stock', 'market', 'basics'],
      routes: { jsonld: 'https://anchorfact.org/business/stock-market-basics/index.json' },
      search_text: 'stock market basics exchanges shares equity investing education'
    },
    {
      canonical_slug: 'business/cryptocurrency',
      title: 'Cryptocurrency',
      url: 'https://anchorfact.org/business/cryptocurrency/index.json',
      description: 'Foundational cryptocurrency concepts.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f13'],
      keywords: ['bitcoin', 'cryptocurrency', 'explained'],
      routes: { jsonld: 'https://anchorfact.org/business/cryptocurrency/index.json' },
      search_text: 'bitcoin explained cryptocurrency blockchain digital assets'
    },
    {
      canonical_slug: 'computer-science/nodejs',
      title: 'Node.js',
      url: 'https://anchorfact.org/computer-science/nodejs/index.json',
      description: 'Stable Node.js runtime architecture concepts.',
      confidence_level: 'medium',
      source_coverage: { verified: 2, total: 2, ratio: 1 },
      claim_count: 2,
      claim_ids: ['https://anchorfact.org/fact/f14'],
      keywords: ['nodejs', 'node', 'event', 'loop'],
      routes: { jsonld: 'https://anchorfact.org/computer-science/nodejs/index.json' },
      search_text: 'nodejs node js event loop runtime architecture'
    }
  ]
};

const topicsPayload = {
  schema_version: 'anchorfact.topics.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  topic_count: 2,
  topics: [
    {
      id: 'ai',
      title: 'AI',
      article_count: 1,
      claim_count: 3,
      source_count: 3,
      top_articles: [
        { canonical_slug: 'ai/gaussian-splatting', title: '3D Gaussian Splatting' }
      ]
    },
    {
      id: 'science',
      title: 'Science',
      article_count: 1,
      claim_count: 2,
      source_count: 2,
      top_articles: [
        { canonical_slug: 'science/statistics', title: 'Statistics Fundamentals' }
      ]
    }
  ]
};

const coveragePayload = {
  schema_version: 'anchorfact.coverage.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  topic_coverage: [
    {
      id: 'ai',
      title: 'AI',
      article_count: 1,
      claim_count: 3,
      source_count: 3,
      best_entrypoint: '/api/evidence?q=AI&limit=3'
    },
    {
      id: 'science',
      title: 'Science',
      article_count: 1,
      claim_count: 2,
      source_count: 2,
      best_entrypoint: '/api/evidence?q=Science&limit=3'
    }
  ]
};

const capabilitiesPayload = {
  schema_version: 'anchorfact.capabilities.v1',
  generated: '2026-05-29T00:00:00.000Z',
  capability_count: 8,
  capabilities: []
};

console.log('AnchorFact Plan API Tests\n');

test('parsePlanParams validates query and clamps limit', () => {
  const parsed = parsePlanParams(new URL('https://anchorfact.org/api/plan?q=gaussian&limit=99'));
  assertEq(parsed.ok, true);
  assertEq(parsed.query, 'gaussian');
  assertEq(parsed.limit, 10);

  const missing = parsePlanParams(new URL('https://anchorfact.org/api/plan'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.error.code, 'missing_or_invalid_query');
});

test('buildPlanApiPayload recommends AnchorFact calls for supported queries', () => {
  const payload = buildPlanApiPayload({
    query: 'gaussian rendering',
    limit: 2,
    searchIndex,
    topicsPayload,
    coveragePayload,
    capabilitiesPayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(payload.schema_version, 'anchorfact.plan-api.v1');
  assertEq(payload.coverage_status, 'supported');
  assertEq(payload.should_use_anchorfact, true);
  assertEq(payload.matched_articles[0].canonical_slug, 'ai/gaussian-splatting');
  assert(payload.recommended_next_calls.some(item => item.path.includes('/api/evidence?q=gaussian+rendering&limit=2')), 'plan should route to evidence API');
  assert(payload.recommended_next_calls.some(item => item.path.includes('/api/article?slug=ai%2Fgaussian-splatting')), 'plan should include article inspection');
  assert(payload.recommended_next_calls.some(item => item.path.includes('/api/cite?id=https%3A%2F%2Fanchorfact.org%2Ffact%2Ff1')), 'plan should include citation lookup');
  assert(payload.trust_requirements.some(item => item.includes('pinned public key')), 'plan should carry trust requirements');
});

test('buildPlanApiPayload warns agents away from unsupported queries', () => {
  const payload = buildPlanApiPayload({
    query: 'local restaurant opening hours',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(payload.coverage_status, 'unsupported');
  assertEq(payload.should_use_anchorfact, false);
  assertEq(payload.matched_articles, []);
  assert(payload.fallback_guidance.some(item => item.includes('external primary')), 'unsupported plan should recommend external sources');
  assert(payload.recommended_next_calls.some(item => item.path.includes('/coverage.json')), 'unsupported plan should point to coverage limits');
});

test('buildPlanApiPayload rejects live, local, and time-sensitive questions even with lexical matches', () => {
  const localPayload = buildPlanApiPayload({
    query: 'best restaurants near me',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(localPayload.coverage_status, 'unsupported');
  assertEq(localPayload.should_use_anchorfact, false);
  assertEq(localPayload.matched_articles, []);
  assert(localPayload.unsupported_intent_reasons.includes('local_or_personalized'), 'local query should carry an intent reason');
  assert(localPayload.fallback_guidance.some(item => item.includes('local')), 'local query should explain external/local fallback');

  const livePayload = buildPlanApiPayload({
    query: 'Who won the NBA Finals in 2026?',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(livePayload.coverage_status, 'unsupported');
  assertEq(livePayload.should_use_anchorfact, false);
  assert(livePayload.unsupported_intent_reasons.includes('live_or_time_sensitive'), 'live query should carry an intent reason');
  assert(livePayload.fallback_guidance.some(item => item.includes('current')), 'live query should explain current-source fallback');

  for (const query of [
    'weather Paris',
    'temperature in Paris',
    'time in Tokyo',
    'flight status AA100',
    'who is the CEO of OpenAI',
    'president of France',
    'OpenAI API pricing',
    'ChatGPT API price',
    'Cloudflare pricing',
    'mortgage rates',
    'Bitcoin price prediction',
    'Node.js LTS version',
    'Python version release date',
    'CUDA version compatibility'
  ]) {
    const implicitLivePayload = buildPlanApiPayload({
      query,
      searchIndex,
      topicsPayload,
      coveragePayload,
      generated: '2026-05-29T00:00:00.000Z'
    });
    assertEq(implicitLivePayload.coverage_status, 'unsupported', query);
    assertEq(implicitLivePayload.should_use_anchorfact, false, query);
    assertEq(implicitLivePayload.matched_articles, [], query);
    assert(implicitLivePayload.unsupported_intent_reasons.includes('live_or_time_sensitive'), `${query} should carry a live/current intent reason`);
  }

  for (const query of [
    'weather forecasting',
    'time management',
    'API rate limiting',
    'software versioning basics',
    'stock market basics',
    'Bitcoin explained',
    'Node.js event loop'
  ]) {
    const staticPayload = buildPlanApiPayload({
      query,
      searchIndex,
      topicsPayload,
      coveragePayload,
      generated: '2026-05-29T00:00:00.000Z'
    });
    assertEq(staticPayload.coverage_status, 'supported', query);
    assertEq(staticPayload.should_use_anchorfact, true, query);
    assertEq(staticPayload.unsupported_intent_reasons, [], query);
  }
});

test('buildPlanApiPayload rejects high-stakes personal advice even with lexical matches', () => {
  const payload = buildPlanApiPayload({
    query: 'should I take aspirin for chest pain',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(payload.coverage_status, 'unsupported');
  assertEq(payload.should_use_anchorfact, false);
  assertEq(payload.matched_articles, []);
  assert(payload.unsupported_intent_reasons.includes('high_stakes_personal_advice'), 'personal medical advice should carry a high-stakes reason');
  assert(payload.fallback_guidance.some(item => item.includes('professional')), 'high-stakes advice should direct agents to authoritative professional sources');

  for (const query of [
    'can I stop taking antidepressants',
    'is semaglutide safe for me',
    'SSRI side effects',
    'semaglutide side effects',
    'metformin during pregnancy',
    'diabetes type 2 management',
    'medication safety'
  ]) {
    const medicationPayload = buildPlanApiPayload({
      query,
      searchIndex,
      topicsPayload,
      coveragePayload,
      generated: '2026-05-29T00:00:00.000Z'
    });
    assertEq(medicationPayload.coverage_status, 'unsupported', query);
    assertEq(medicationPayload.should_use_anchorfact, false, query);
    assertEq(medicationPayload.matched_articles, [], query);
    assert(medicationPayload.unsupported_intent_reasons.includes('high_stakes_personal_advice'), `${query} should carry a high-stakes reason`);
  }

  const educational = buildPlanApiPayload({
    query: 'mental health basics',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });
  assertEq(educational.coverage_status, 'supported');
  assertEq(educational.should_use_anchorfact, true);
  assertEq(educational.unsupported_intent_reasons, []);
});

test('buildPlanApiPayload rejects harmful operational requests without blocking defensive education', () => {
  const payload = buildPlanApiPayload({
    query: 'sql injection attack payload',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(payload.coverage_status, 'unsupported');
  assertEq(payload.should_use_anchorfact, false);
  assertEq(payload.matched_articles, []);
  assert(payload.unsupported_intent_reasons.includes('harmful_operational_request'), 'attack payload request should carry a harmful-operation reason');
  assert(payload.fallback_guidance.some(item => item.includes('harmful operational')), 'harmful requests should explain why AnchorFact will not cite them');

  const defensive = buildPlanApiPayload({
    query: 'sql injection prevention',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(defensive.coverage_status, 'supported');
  assertEq(defensive.should_use_anchorfact, true);
  assertEq(defensive.unsupported_intent_reasons, []);
  assertEq(defensive.matched_articles[0].canonical_slug, 'computer-science/sql-injection');

  const defensiveHowTo = buildPlanApiPayload({
    query: 'how to prevent phishing',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(defensiveHowTo.coverage_status, 'supported');
  assertEq(defensiveHowTo.should_use_anchorfact, true);
  assertEq(defensiveHowTo.unsupported_intent_reasons, []);
  assertEq(defensiveHowTo.matched_articles[0].canonical_slug, 'computer-science/phishing-awareness');
});

test('buildPlanApiPayload keeps static educational weather queries supported', () => {
  const payload = buildPlanApiPayload({
    query: 'weather forecasting',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(payload.coverage_status, 'supported');
  assertEq(payload.should_use_anchorfact, true);
  assertEq(payload.unsupported_intent_reasons, []);
  assertEq(payload.matched_articles[0].canonical_slug, 'ai/ai-for-weather-forecasting');
});

test('buildPlanApiPayload routes AnchorFact usage questions to API guidance', () => {
  const payload = buildPlanApiPayload({
    query: 'how to cite a Gaussian claim from AnchorFact',
    searchIndex,
    topicsPayload,
    coveragePayload,
    generated: '2026-05-29T00:00:00.000Z'
  });

  assertEq(payload.coverage_status, 'site_help');
  assertEq(payload.should_use_anchorfact, true);
  assertEq(payload.query_intent, 'site_help');
  assertEq(payload.matched_articles, []);
  assert(payload.recommended_next_calls.some(item => item.path === '/api'), 'site help should point to API discovery');
  assert(payload.recommended_next_calls.some(item => item.path.includes('/api/cite')), 'citation help should point to /api/cite');
  assert(payload.fallback_guidance.some(item => item.includes('usage')), 'site help should explain usage guidance');
});

test('Pages Function returns CORS JSON from static artifacts', async () => {
  const assets = {
    '/search-index.json': searchIndex,
    '/topics.json': topicsPayload,
    '/coverage.json': coveragePayload,
    '/capabilities.json': capabilitiesPayload
  };
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/plan?q=gaussian&limit=1'),
    env: {
      ASSETS: {
        fetch: async url => {
          const payload = assets[new URL(url).pathname];
          return new Response(JSON.stringify(payload || {}), {
            status: payload ? 200 : 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.plan-api.v1');
  assertEq(payload.coverage_status, 'supported');
  assertEq(payload.matched_articles[0].canonical_slug, 'ai/gaussian-splatting');
});

test('Pages Function rejects empty queries and supports OPTIONS', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/plan'),
    env: { ASSETS: { fetch: async () => new Response('{}') } }
  });
  const payload = await response.json();
  assertEq(response.status, 400);
  assertEq(payload.error.code, 'missing_or_invalid_query');

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
