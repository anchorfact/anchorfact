#!/usr/bin/env node
import {
  API_READINESS_SCHEMA_VERSION,
  CORE_CORPUS_QUERIES,
  buildApiReadinessReport,
  evaluateContextReadiness,
  evaluateCoreCorpus,
  renderApiReadinessMarkdown
} from '../src/lib/api-readiness.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  OK ${name}`);
  } catch (error) {
    failed++;
    console.log(`  FAIL ${name}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function fakeArtifacts() {
  const article = {
    id: 'https://anchorfact.org/kb/ai/rag',
    canonical_slug: 'ai/rag',
    canonical_url: 'https://anchorfact.org/ai/rag/',
    title: 'Retrieval-Augmented Generation (RAG)',
    status: 'public',
    is_draft: false,
    confidence_level: 'high',
    confidence_score: 0.95,
    sources_verified: 2,
    sources_total: 2,
    quality_reasons: []
  };
  const claims = [
    {
      id: 'https://anchorfact.org/fact/test-rag-1',
      canonical_slug: 'ai/rag',
      statement: 'RAG combines retrieval with generation.',
      confidence: 'high',
      source_title: 'RAG Paper',
      source_url: 'https://example.com/rag-paper'
    },
    {
      id: 'https://anchorfact.org/fact/test-rag-2',
      canonical_slug: 'ai/rag',
      statement: 'RAG can ground generated answers in retrieved documents.',
      confidence: 'high',
      source_title: 'RAG Paper',
      source_url: 'https://example.com/rag-paper'
    },
    {
      id: 'https://anchorfact.org/fact/test-rag-3',
      canonical_slug: 'ai/rag',
      statement: 'RAG systems need retrieval quality and citation checks.',
      confidence: 'medium',
      source_title: 'Evaluation Paper',
      source_url: 'https://example.com/rag-eval'
    }
  ];
  return {
    manifest: {
      schema_version: 'anchorfact.manifest.v1',
      generated: '2026-06-01T00:00:00.000Z',
      provenance_url: 'https://anchorfact.org/provenance.json',
      articles: [article]
    },
    claimsPayload: {
      schema_version: 'anchorfact.claims.v1',
      generated: '2026-06-01T00:00:00.000Z',
      provenance_url: 'https://anchorfact.org/provenance.json',
      claims
    },
    sourcesPayload: {
      schema_version: 'anchorfact.sources.v1',
      generated: '2026-06-01T00:00:00.000Z',
      provenance_url: 'https://anchorfact.org/provenance.json',
      sources: [
        {
          id: 'source:rag-paper',
          title: 'RAG Paper',
          type: 'academic_paper',
          tier: 'A',
          url: 'https://example.com/rag-paper',
          articles: [{ canonical_slug: 'ai/rag' }]
        },
        {
          id: 'source:rag-eval',
          title: 'Evaluation Paper',
          type: 'academic_paper',
          tier: 'A',
          url: 'https://example.com/rag-eval',
          articles: [{ canonical_slug: 'ai/rag' }]
        }
      ]
    },
    searchIndex: {
      schema_version: 'anchorfact.search-index.v1',
      generated: '2026-06-01T00:00:00.000Z',
      provenance_url: 'https://anchorfact.org/provenance.json',
      records: [
        {
          canonical_slug: 'ai/rag',
          title: 'Retrieval-Augmented Generation (RAG)',
          url: 'https://anchorfact.org/ai/rag/',
          description: 'Retrieval-Augmented Generation combines retrieval with language model generation.',
          confidence_level: 'high',
          source_coverage: { verified: 2, total: 2, ratio: 1 },
          claim_count: 3,
          claim_ids: claims.map(claim => claim.id),
          keywords: ['retrieval', 'augmented', 'generation', 'rag', 'citation', 'evidence'],
          routes: {
            article: '/api/article?slug=ai/rag',
            evidence: '/api/evidence?q=Retrieval-Augmented%20Generation%20(RAG)'
          }
        }
      ]
    },
    topicsPayload: { topics: [] },
    coveragePayload: {},
    capabilitiesPayload: {},
    contentHealthPayload: {
      schema_version: 'anchorfact.content-health.v1',
      generated: '2026-06-01T00:00:00.000Z',
      provenance_url: 'https://anchorfact.org/provenance.json',
      snapshot: {
        public_articles: 1,
        draft_articles: 0,
        public_claims: 3,
        public_sources: 2
      }
    }
  };
}

console.log('AnchorFact API Readiness Report Tests\n');

test('core query set defines 100 subscription-readiness probes across paid-use categories', () => {
  assertEq(CORE_CORPUS_QUERIES.length, 100);
  const categories = new Set(CORE_CORPUS_QUERIES.map(query => query.category));
  for (const category of ['agent_rag', 'api_mcp', 'security_governance', 'data_infrastructure', 'llm_evaluation']) {
    assert(categories.has(category), `missing category ${category}`);
  }
  const slugs = CORE_CORPUS_QUERIES.map(query => query.expected_slug);
  assertEq(new Set(slugs).size, slugs.length, 'expected slugs should be unique');
});

test('core corpus evaluation enforces verified sources and source-mapped atomic facts', () => {
  const artifacts = fakeArtifacts();
  const result = evaluateCoreCorpus({
    ...artifacts,
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }]
  });
  assertEq(result.status, 'met');
  assertEq(result.pass_ratio, 1);

  const weak = structuredClone(artifacts);
  weak.manifest.articles[0].sources_verified = 1;
  weak.claimsPayload.claims = weak.claimsPayload.claims.slice(0, 2);
  const weakResult = evaluateCoreCorpus({
    ...weak,
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }]
  });
  assertEq(weakResult.status, 'below_target');
  assert(weakResult.failures[0].failures.some(item => item.includes('verified_sources')), 'should flag low source coverage');
  assert(weakResult.failures[0].failures.some(item => item.includes('source_mapped_claims')), 'should flag low claim coverage');
});

test('API scorecard checks context, evidence, cite, and unsupported fallback without enforcing CI failure', () => {
  const artifacts = fakeArtifacts();
  const scorecard = evaluateContextReadiness({
    artifacts,
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    generated: '2026-06-01T00:00:00.000Z'
  });
  assertEq(scorecard.status, 'met');
  assertEq(scorecard.rows[0].context.can_answer_with_anchorfact, true);
  assertEq(scorecard.rows[0].evidence.has_source_mapped_citation, true);
  assertEq(scorecard.rows[0].cite.has_source_url, true);
  assertEq(scorecard.fallback.ok, true);

  const broken = structuredClone(artifacts);
  broken.searchIndex.records = [];
  const report = buildApiReadinessReport({
    artifacts: broken,
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    generatedAt: '2026-06-01T00:00:00.000Z'
  });
  assertEq(report.schema_version, API_READINESS_SCHEMA_VERSION);
  assertEq(report.report_only, true);
  assertEq(report.build_should_fail, false);
  assertEq(report.status, 'building_foundation');
  assert(report.api_scorecard.failures.length > 0, 'broken search index should produce API readiness failures');
});

test('renderApiReadinessMarkdown exposes target, gap context, and report-only status', () => {
  const report = buildApiReadinessReport({
    artifacts: fakeArtifacts(),
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    generatedAt: '2026-06-01T00:00:00.000Z'
  });
  const markdown = renderApiReadinessMarkdown(report);
  assert(markdown.includes('AnchorFact API Readiness Report'), 'should render heading');
  assert(markdown.includes('Target ratio: 0.9'), 'should render target ratio');
  assert(markdown.includes('Report-only: true'), 'should render report-only status');
  assert(markdown.includes('Build should fail: false'), 'should state low readiness is not a build blocker');
  assert(markdown.includes('not_provided'), 'should show unprovided production/adoption inputs');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
