#!/usr/bin/env node
import {
  buildContextApiPayload,
  parseContextParams,
  renderContextMarkdown
} from '../src/lib/context-api.js';
import { onRequestGet, onRequestOptions } from '../functions/api/context.js';

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

const manifest = {
  schema_version: 'anchorfact.manifest.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  articles: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      canonical_url: 'https://anchorfact.org/ai/gaussian-splatting/',
      title: '3D Gaussian Splatting',
      description: 'Real-time neural scene rendering.',
      status: 'public',
      confidence_level: 'medium',
      confidence_score: 0.82,
      sources_verified: 1,
      sources_total: 1,
      is_draft: false
    },
    {
      canonical_slug: 'ai/draft-only',
      title: 'Draft Only',
      status: 'draft',
      is_draft: true
    }
  ]
};

const claimsPayload = {
  schema_version: 'anchorfact.claims.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  claims: [
    {
      id: 'https://anchorfact.org/fact/f1',
      canonical_slug: 'ai/gaussian-splatting',
      statement: '3D Gaussian Splatting represents scenes as optimized 3D Gaussian primitives.',
      confidence: 'medium',
      source_url: 'https://arxiv.org/abs/2308.04079',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering'
    },
    {
      id: 'https://anchorfact.org/fact/draft',
      canonical_slug: 'ai/draft-only',
      statement: 'Draft facts must not be returned.',
      confidence: 'low',
      source_url: 'https://example.com/draft'
    }
  ]
};

const sourcesPayload = {
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
      articles: [{ canonical_slug: 'ai/gaussian-splatting', title: '3D Gaussian Splatting' }]
    },
    {
      id: 'source:draft',
      title: 'Draft Source',
      type: 'article',
      tier: 'C',
      url: 'https://example.com/draft',
      articles: [{ canonical_slug: 'ai/draft-only', title: 'Draft Only' }]
    }
  ]
};

const searchIndex = {
  schema_version: 'anchorfact.search-index.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  records: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      title: '3D Gaussian Splatting',
      url: 'https://anchorfact.org/ai/gaussian-splatting/',
      description: 'Real-time neural scene rendering.',
      confidence_level: 'medium',
      source_coverage: { verified: 1, total: 1, ratio: 1 },
      claim_ids: ['https://anchorfact.org/fact/f1'],
      claim_count: 1,
      keywords: ['gaussian', 'splatting'],
      search_text: 'gaussian splatting radiance field rendering',
      routes: { jsonld: 'https://anchorfact.org/ai/gaussian-splatting/index.json' }
    },
    {
      canonical_slug: 'ai/draft-only',
      title: 'Draft Only',
      url: 'https://anchorfact.org/ai/draft-only/',
      confidence_level: 'low',
      claim_ids: ['https://anchorfact.org/fact/draft'],
      claim_count: 1,
      keywords: ['draft', 'gaussian'],
      search_text: 'draft gaussian placeholder'
    }
  ]
};

const topicsPayload = {
  schema_version: 'anchorfact.topics.v1',
  generated: '2026-05-29T00:00:00.000Z',
  topic_count: 1,
  topics: [
    { id: 'ai', title: 'AI', article_count: 1, claim_count: 1, source_count: 1 }
  ]
};

const coveragePayload = {
  schema_version: 'anchorfact.coverage.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  topic_coverage: [
    { id: 'ai', title: 'AI', article_count: 1, claim_count: 1, source_count: 1 }
  ]
};

const capabilitiesPayload = {
  schema_version: 'anchorfact.capabilities.v1',
  generated: '2026-05-29T00:00:00.000Z',
  capability_count: 1,
  capabilities: []
};

const contentHealthPayload = {
  schema_version: 'anchorfact.content-health.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  snapshot: {
    public_articles: 1,
    draft_articles: 1,
    public_claims: 1
  },
  public: {
    source_coverage: { full: 1, partial: 0, zero: 0 },
    claim_mapping: { total: 1, mapped: 1, ratio: 1 }
  },
  machine_guidance: ['Use /api/context?q={query} for prompt assembly.'],
  trust_boundaries: {
    draft_entries_excluded_from_ai_entrypoints: true,
    original_sources_remain_authoritative: true
  }
};

function payloadArgs(overrides = {}) {
  return {
    query: 'gaussian splatting',
    limit: 2,
    manifest,
    claimsPayload,
    sourcesPayload,
    searchIndex,
    topicsPayload,
    coveragePayload,
    capabilitiesPayload,
    contentHealthPayload,
    generated: '2026-05-29T00:00:00.000Z',
    ...overrides
  };
}

function assetEnv(overrides = {}) {
  const payloads = {
    '/manifest.json': manifest,
    '/claims.json': claimsPayload,
    '/sources.json': sourcesPayload,
    '/search-index.json': searchIndex,
    '/topics.json': topicsPayload,
    '/coverage.json': coveragePayload,
    '/capabilities.json': capabilitiesPayload,
    '/content-health.json': contentHealthPayload,
    ...overrides
  };
  return {
    ASSETS: {
      fetch: async (url) => {
        const payload = payloads[new URL(url).pathname];
        return new Response(payload ? JSON.stringify(payload) : 'missing', {
          status: payload ? 200 : 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  };
}

console.log('AnchorFact Context API Tests\n');

test('parseContextParams validates query, limit, and format', () => {
  const parsed = parseContextParams(new URL('https://anchorfact.org/api/context?query=gaussian&limit=99&format=md'));
  assertEq(parsed.ok, true);
  assertEq(parsed.query, 'gaussian');
  assertEq(parsed.limit, 20);
  assertEq(parsed.format, 'markdown');

  const missing = parseContextParams(new URL('https://anchorfact.org/api/context'));
  assertEq(missing.ok, false);
  assertEq(missing.status, 400);
  assertEq(missing.payload.error.code, 'missing_or_invalid_query');
});

test('buildContextApiPayload combines planning and public evidence packs', () => {
  const result = buildContextApiPayload(payloadArgs());

  assertEq(result.ok, true);
  assertEq(result.status, 200);
  assertEq(result.payload.schema_version, 'anchorfact.context-api.v1');
  assertEq(result.payload.coverage_status, 'supported');
  assertEq(result.payload.should_use_anchorfact, true);
  assertEq(result.payload.answer_policy.can_answer_with_anchorfact, true);
  assertEq(result.payload.answer_policy.answer_mode, 'answer_with_citations');
  assertEq(result.payload.evidence_pack_count, 1);
  assertEq(result.payload.citation_ready_claims.length, 1);
  assertEq(result.payload.citation_ready_claims[0].claim_id, 'https://anchorfact.org/fact/f1');
  assertEq(result.payload.citation_ready_claims[0].cite_api_path, '/api/cite?id=f1');
  assertEq(result.payload.content_health.snapshot.public_articles, 1);
  assertEq(result.payload.content_health.public_claim_mapping.mapped, 1);
  assertEq(result.payload.content_health.trust_boundaries.draft_entries_excluded_from_ai_entrypoints, true);
  assert(result.payload.recommended_next_calls.some(call => call.path.includes('/api/evidence')), 'context should include evidence next call');
  assert(result.payload.evidence_packs[0].canonical_slug === 'ai/gaussian-splatting', 'context should include public evidence pack');
  assert(!JSON.stringify(result.payload).includes('Draft facts must not be returned'), 'context should exclude draft claims');
});

test('buildContextApiPayload keeps unsupported queries explicit and non-citable', () => {
  const result = buildContextApiPayload(payloadArgs({ query: 'lunar dentistry' }));

  assertEq(result.payload.coverage_status, 'unsupported');
  assertEq(result.payload.should_use_anchorfact, false);
  assertEq(result.payload.answer_policy.can_answer_with_anchorfact, false);
  assertEq(result.payload.answer_policy.answer_mode, 'external_sources_required');
  assertEq(result.payload.answer_policy.max_claims_to_cite, 0);
  assertEq(result.payload.citation_ready_claims, []);
  assertEq(result.payload.evidence_pack_count, 0);
  assert(result.payload.fallback_guidance.some(item => item.includes('external primary')), 'unsupported context should direct agents to external primary sources');
});

test('buildContextApiPayload suppresses lexical evidence for live unsupported intents', () => {
  const result = buildContextApiPayload(payloadArgs({ query: 'What is 3D Gaussian Splatting today?' }));

  assertEq(result.payload.coverage_status, 'unsupported');
  assertEq(result.payload.should_use_anchorfact, false);
  assertEq(result.payload.answer_policy.can_answer_with_anchorfact, false);
  assertEq(result.payload.answer_policy.answer_mode, 'external_sources_required');
  assertEq(result.payload.evidence_pack_count, 0);
  assertEq(result.payload.evidence_packs, []);
  assertEq(result.payload.citation_ready_claims, []);
  assert(result.payload.fallback_guidance.some(item => item.includes('current')), 'live query should explain current-source fallback');
});

test('buildContextApiPayload gives API guidance for AnchorFact usage questions', () => {
  const result = buildContextApiPayload(payloadArgs({ query: 'how to cite a Gaussian claim from AnchorFact' }));

  assertEq(result.payload.coverage_status, 'site_help');
  assertEq(result.payload.should_use_anchorfact, true);
  assertEq(result.payload.query_intent, 'site_help');
  assertEq(result.payload.answer_policy.can_answer_with_anchorfact, true);
  assertEq(result.payload.answer_policy.answer_mode, 'api_guidance');
  assertEq(result.payload.evidence_pack_count, 0);
  assertEq(result.payload.evidence_packs, []);
  assertEq(result.payload.citation_ready_claims, []);
  assert(result.payload.recommended_next_calls.some(call => call.path.includes('/api/cite')), 'site help should recommend citation endpoint');
});

test('renderContextMarkdown returns answer-ready context with guardrails', () => {
  const result = buildContextApiPayload(payloadArgs());
  const markdown = renderContextMarkdown(result.payload);

  assert(markdown.includes('AnchorFact Context'), 'markdown should identify context payload');
  assert(markdown.includes('Coverage status: supported'), 'markdown should include coverage status');
  assert(markdown.includes('Answer Policy'), 'markdown should include answer policy');
  assert(markdown.includes('Can answer with AnchorFact: yes'), 'markdown should include answerability');
  assert(markdown.includes('Citation Ready Claims'), 'markdown should include compact citation claims');
  assert(markdown.includes('Corpus Health'), 'markdown should include corpus health summary');
  assert(markdown.includes('Public claims: 1'), 'markdown should include public claim count');
  assert(markdown.includes('Citation contract:'), 'markdown should include citation contract');
  assert(markdown.includes('3D Gaussian Splatting'), 'markdown should include evidence pack');
});

test('Pages Function returns JSON and Markdown context', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/context?q=gaussian&limit=1'),
    env: assetEnv()
  });
  const payload = await response.json();
  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(payload.schema_version, 'anchorfact.context-api.v1');
  assertEq(payload.evidence_pack_count, 1);
  assertEq(payload.content_health.snapshot.public_articles, 1);

  const markdown = await onRequestGet({
    request: new Request('https://anchorfact.org/api/context?q=gaussian&format=markdown'),
    env: assetEnv()
  });
  assertEq(markdown.status, 200);
  assert(markdown.headers.get('Content-Type').includes('text/markdown'), 'markdown response should use text/markdown');
  assert((await markdown.text()).includes('AnchorFact Context'), 'markdown response should include context heading');
});

test('Pages Function rejects bad requests and supports OPTIONS', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api/context'),
    env: assetEnv()
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
if (failed) process.exit(1);
