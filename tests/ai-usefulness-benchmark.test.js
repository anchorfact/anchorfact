#!/usr/bin/env node
import {
  buildAiUsefulnessBenchmarkReport,
  renderAiUsefulnessBenchmarkMarkdown
} from '../src/lib/ai-usefulness-benchmark.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (error) {
    failed++;
    console.log(`  fail ${name}: ${error.message}`);
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

function fixtureArtifacts() {
  const articles = [
    {
      id: 'article:ai/rag',
      canonical_slug: 'ai/rag',
      canonical_url: 'https://anchorfact.org/ai/rag/',
      title: 'Retrieval Augmented Generation',
      description: 'RAG combines retrieval and generation.',
      status: 'public',
      is_draft: false,
      confidence_level: 'medium',
      confidence_score: 0.7,
      sources_verified: 2,
      sources_total: 2
    },
    {
      id: 'article:business/stock-market-basics',
      canonical_slug: 'business/stock-market-basics',
      canonical_url: 'https://anchorfact.org/business/stock-market-basics/',
      title: 'Stock Market Basics',
      description: 'Stock market basics and indexes.',
      status: 'public',
      is_draft: false,
      confidence_level: 'low',
      confidence_score: 0.42,
      sources_verified: 1,
      sources_total: 1
    }
  ];

  return {
    manifest: {
      article_count: 2,
      public_article_count: 2,
      draft_article_count: 0,
      articles
    },
    claimsPayload: {
      claim_count: 3,
      claims: [
        {
          id: 'https://anchorfact.org/fact/rag1',
          canonical_slug: 'ai/rag',
          statement: 'Retrieval augmented generation combines retrieved passages with generated answers.',
          confidence: 'medium',
          source_url: 'https://example.edu/rag',
          source_title: 'RAG Paper'
        },
        {
          id: 'https://anchorfact.org/fact/rag2',
          canonical_slug: 'ai/rag',
          statement: 'RAG systems can ground generated answers in retrieved context.',
          confidence: 'medium',
          source_url: 'https://example.edu/rag2',
          source_title: 'RAG Survey'
        },
        {
          id: 'https://anchorfact.org/fact/stock1',
          canonical_slug: 'business/stock-market-basics',
          statement: 'Stocks represent ownership shares in companies.',
          confidence: 'low',
          source_url: 'https://example.org/stock',
          source_title: 'Stock Reference'
        }
      ]
    },
    sourcesPayload: {
      sources: [
        {
          id: 'source:rag',
          title: 'RAG Paper',
          url: 'https://example.edu/rag',
          tier: 'A',
          type: 'academic_paper',
          articles: [{ canonical_slug: 'ai/rag' }]
        },
        {
          id: 'source:rag-survey',
          title: 'RAG Survey',
          url: 'https://example.edu/rag2',
          tier: 'A',
          type: 'survey_paper',
          articles: [{ canonical_slug: 'ai/rag' }]
        },
        {
          id: 'source:stock',
          title: 'Stock Reference',
          url: 'https://example.org/stock',
          tier: 'B',
          type: 'reference',
          articles: [{ canonical_slug: 'business/stock-market-basics' }]
        }
      ]
    },
    searchIndex: {
      schema_version: 'anchorfact.search-index.v1',
      generated: '2026-05-30T00:00:00.000Z',
      provenance_url: 'https://anchorfact.org/provenance.json',
      article_count: 2,
      records: [
        {
          canonical_slug: 'ai/rag',
          title: 'Retrieval Augmented Generation',
          url: 'https://anchorfact.org/ai/rag/',
          description: 'Retrieval augmented generation and RAG systems.',
          confidence_level: 'medium',
          source_coverage: { verified: 2, total: 2, ratio: 1 },
          claim_count: 2,
          claim_ids: ['https://anchorfact.org/fact/rag1', 'https://anchorfact.org/fact/rag2'],
          keywords: ['retrieval', 'augmented', 'generation', 'rag'],
          search_text: 'retrieval augmented generation rag systems'
        },
        {
          canonical_slug: 'business/stock-market-basics',
          title: 'Stock Market Basics',
          url: 'https://anchorfact.org/business/stock-market-basics/',
          description: 'Stock market basics and ownership shares.',
          confidence_level: 'low',
          source_coverage: { verified: 1, total: 1, ratio: 1 },
          claim_count: 1,
          claim_ids: ['https://anchorfact.org/fact/stock1'],
          keywords: ['stock', 'market', 'basics'],
          search_text: 'stock market basics ownership shares'
        }
      ]
    },
    topicsPayload: { topics: [] },
    coveragePayload: { topic_coverage: [] },
    capabilitiesPayload: {},
    contentHealthPayload: {}
  };
}

console.log('AnchorFact AI Usefulness Benchmark Tests\n');

test('buildAiUsefulnessBenchmarkReport passes answer-ready cases and surfaces improvement candidates', () => {
  const report = buildAiUsefulnessBenchmarkReport({
    generated: '2026-05-30T00:00:00.000Z',
    artifacts: fixtureArtifacts(),
    cases: [
      {
        id: 'rag_case',
        category: 'core_ai',
        query: 'retrieval augmented generation',
        expected_top_slug: 'ai/rag'
      },
      {
        id: 'stock_case',
        category: 'cross_domain',
        query: 'stock market basics',
        expected_top_slug: 'business/stock-market-basics'
      }
    ]
  });

  assertEq(report.schema_version, 'anchorfact.ai-usefulness-benchmark.v1');
  assertEq(report.ok, true);
  assertEq(report.case_count, 2);
  assertEq(report.passed, 2);
  assertEq(report.failed, 0);
  assert(report.score_100 < 100, 'low-confidence/single-source cases should lower usefulness score');
  assert(report.improvement_candidates.some(item => item.expected_top_slug === 'business/stock-market-basics'), 'low-confidence case should be an improvement candidate');
  assert(report.improvement_candidates[0].signals.includes('low_confidence_top_pack'), 'candidate should explain confidence gap');
  assert(report.improvement_candidates[0].signals.includes('single_source_expected_pack'), 'candidate should explain source depth gap');

  const markdown = renderAiUsefulnessBenchmarkMarkdown(report);
  assert(markdown.includes('AnchorFact AI Usefulness Benchmark - PASS'), 'markdown should show pass');
  assert(markdown.includes('business/stock-market-basics'), 'markdown should include improvement candidate');
});

test('buildAiUsefulnessBenchmarkReport fails when top routing or citation readiness breaks', () => {
  const artifacts = fixtureArtifacts();
  const report = buildAiUsefulnessBenchmarkReport({
    generated: '2026-05-30T00:00:00.000Z',
    artifacts,
    cases: [
      {
        id: 'bad_route',
        category: 'core_ai',
        query: 'retrieval augmented generation',
        expected_top_slug: 'business/stock-market-basics'
      },
      {
        id: 'missing_citation',
        category: 'core_ai',
        query: 'stock market basics',
        expected_top_slug: 'business/stock-market-basics',
        min_citation_ready_claims: 2
      }
    ]
  });

  assertEq(report.ok, false);
  assertEq(report.failed, 2);
  assert(report.cases[0].failures.some(failure => failure.includes('top result')), 'top result drift should fail');
  assert(report.cases[1].failures.some(failure => failure.includes('citation-ready')), 'citation depth gap should fail when minimum is explicit');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
