#!/usr/bin/env node
import { renderAiEvalsMarkdown, runAiEvals } from '../scripts/run-ai-evals.js';

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

function jsonResponse(payload, contentType = 'application/json; charset=utf-8', status = 200) {
  return {
    status,
    headers: new Map([['content-type', contentType]]),
    async text() {
      return typeof payload === 'string' ? payload : JSON.stringify(payload);
    }
  };
}

function fetchFixture(routes) {
  return async (url) => {
    const route = `${url.pathname}${url.search}`;
    if (!routes[route]) {
      return jsonResponse({ error: 'missing fixture' }, 'application/json; charset=utf-8', 404);
    }
    return routes[route];
  };
}

console.log('AnchorFact AI Evals Runner Tests\n');

test('runAiEvals executes JSON, Markdown, MCP, and provenance eval expectations', async () => {
  const report = await runAiEvals({
    baseUrl: 'https://anchorfact.org',
    generatedAt: '2026-05-29T00:00:00.000Z',
    fetchImpl: fetchFixture({
      '/evals.json': jsonResponse({
        evals: [
          {
            id: 'api_discovery',
            call: { method: 'GET', path: '/api' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.api-index.v1',
              required_paths: ['/api/plan', '/api/evidence', '/api/context']
            }
          },
          {
            id: 'query_plan',
            call: { method: 'GET', path: '/api/plan?q=gaussian&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.plan-api.v1',
              coverage_status: 'supported',
              should_use_anchorfact: true,
              contains_canonical_slug: 'ai/3d-generation-gaussian-splatting',
              recommended_call_contains: '/api/evidence'
            }
          },
          {
            id: 'openapi_context_contract',
            call: { method: 'GET', path: '/openapi.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              openapi_schema_version: 'anchorfact.openapi.v1',
              required_schema_properties: {
                ContextApiResponse: ['answer_policy', 'citation_ready_claims'],
                AnswerPolicy: ['can_answer_with_anchorfact', 'answer_mode'],
                CitationReadyClaim: ['claim_id', 'source_url', 'cite_api_path']
              }
            }
          },
          {
            id: 'unsupported_query_plan',
            call: { method: 'GET', path: '/api/plan?q=lunar+dentistry&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.plan-api.v1',
              coverage_status: 'unsupported',
              should_use_anchorfact: false,
              recommended_call_contains: '/coverage.json',
              fallback_guidance_contains: 'external primary'
            }
          },
          {
            id: 'context_pack_json',
            call: { method: 'GET', path: '/api/context?q=gaussian&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.context-api.v1',
              coverage_status: 'supported',
              should_use_anchorfact: true,
              contains_canonical_slug: 'ai/3d-generation-gaussian-splatting',
              recommended_call_contains: '/api/evidence',
              answer_policy_can_answer: true,
              min_citation_ready_claims: 1,
              min_content_health_public_articles: 1,
              content_health_trust_boundary: 'draft_entries_excluded_from_ai_entrypoints'
            }
          },
          {
            id: 'unsupported_context_pack_json',
            call: { method: 'GET', path: '/api/context?q=lunar+dentistry&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.context-api.v1',
              coverage_status: 'unsupported',
              should_use_anchorfact: false,
              answer_policy_can_answer: false,
              min_citation_ready_claims: 0,
              max_citation_ready_claims: 0,
              content_health_trust_boundary: 'draft_entries_excluded_from_ai_entrypoints',
              fallback_guidance_contains: 'external primary'
            }
          },
          {
            id: 'unsupported_query_evidence',
            call: { method: 'GET', path: '/api/evidence?q=lunar+dentistry&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.evidence-api.v1',
              result_count: 0
            }
          },
          {
            id: 'evidence_markdown',
            call: { method: 'GET', path: '/api/evidence?q=gaussian&format=markdown' },
            expected: {
              status: 200,
              content_type: 'text/markdown',
              contains_text: ['AnchorFact Evidence Pack']
            }
          },
          {
            id: 'mcp_tool_catalog',
            call: { method: 'GET', path: '/mcp.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.mcp.v1',
              required_tools: ['anchorfact_plan_query', 'anchorfact_content_health', 'anchorfact_cite_claim']
            }
          },
          {
            id: 'content_health_summary',
            call: { method: 'GET', path: '/content-health.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.content-health.v1',
              min_public_articles: 1,
              min_public_claims: 1,
              machine_guidance_contains: '/api/context',
              trust_boundary: 'draft_entries_excluded_from_ai_entrypoints',
              min_repair_queue_candidates: 1,
              min_repair_queue_next_batch: 1,
              repair_queue_policy_contains: 'repair_complexity',
              max_public_source_tier_c: 0
            }
          },
          {
            id: 'coverage_query_benchmark_catalog',
            call: { method: 'GET', path: '/coverage.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.coverage.v1',
              min_query_benchmark_cases: 2,
              required_query_benchmark_slugs: ['ai/rlhf', 'science/climate-change'],
              query_benchmark_pass_gate_contains: '/evals.json'
            }
          },
          {
            id: 'signed_provenance_static_artifacts',
            call: { method: 'GET', path: '/provenance.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.provenance.v1',
              required_artifacts: ['evals_json', 'mcp_json']
            }
          }
        ]
      }),
      '/api': jsonResponse({
        schema_version: 'anchorfact.api-index.v1',
        endpoints: [{ path: '/api/plan' }, { path: '/api/evidence' }, { path: '/api/context' }]
      }),
      '/openapi.json': jsonResponse({
        openapi: '3.1.0',
        'x-anchorfact-schema-version': 'anchorfact.openapi.v1',
        components: {
          schemas: {
            ContextApiResponse: {
              properties: {
                answer_policy: {},
                citation_ready_claims: {}
              }
            },
            AnswerPolicy: {
              properties: {
                can_answer_with_anchorfact: {},
                answer_mode: {}
              }
            },
            CitationReadyClaim: {
              properties: {
                claim_id: {},
                source_url: {},
                cite_api_path: {}
              }
            }
          }
        }
      }),
      '/api/plan?q=gaussian&limit=3': jsonResponse({
        schema_version: 'anchorfact.plan-api.v1',
        coverage_status: 'supported',
        should_use_anchorfact: true,
        matched_articles: [{ canonical_slug: 'ai/3d-generation-gaussian-splatting' }],
        recommended_next_calls: [{ path: '/api/evidence?q=gaussian&limit=3' }]
      }),
      '/api/plan?q=lunar+dentistry&limit=3': jsonResponse({
        schema_version: 'anchorfact.plan-api.v1',
        coverage_status: 'unsupported',
        should_use_anchorfact: false,
        recommended_next_calls: [{ path: '/coverage.json' }],
        fallback_guidance: ['Use external primary sources instead of citing AnchorFact.']
      }),
      '/api/evidence?q=lunar+dentistry&limit=3': jsonResponse({
        schema_version: 'anchorfact.evidence-api.v1',
        result_count: 0,
        packs: []
      }),
      '/api/context?q=gaussian&limit=3': jsonResponse({
        schema_version: 'anchorfact.context-api.v1',
        coverage_status: 'supported',
        should_use_anchorfact: true,
        answer_policy: { can_answer_with_anchorfact: true },
        citation_ready_claims: [{ claim_id: 'https://anchorfact.org/fact/f1' }],
        recommended_next_calls: [{ path: '/api/evidence?q=gaussian&limit=3' }],
        content_health: {
          snapshot: { public_articles: 555, public_claims: 1685 },
          trust_boundaries: { draft_entries_excluded_from_ai_entrypoints: true }
        },
        evidence_packs: [{ canonical_slug: 'ai/3d-generation-gaussian-splatting' }]
      }),
      '/api/context?q=lunar+dentistry&limit=3': jsonResponse({
        schema_version: 'anchorfact.context-api.v1',
        coverage_status: 'unsupported',
        should_use_anchorfact: false,
        answer_policy: { can_answer_with_anchorfact: false },
        citation_ready_claims: [],
        fallback_guidance: ['Use external primary sources instead of citing AnchorFact.'],
        content_health: {
          snapshot: { public_articles: 555, public_claims: 1685 },
          trust_boundaries: { draft_entries_excluded_from_ai_entrypoints: true }
        },
        evidence_packs: []
      }),
      '/api/evidence?q=gaussian&format=markdown': jsonResponse('# AnchorFact Evidence Pack', 'text/markdown; charset=utf-8'),
      '/mcp.json': jsonResponse({
        schema_version: 'anchorfact.mcp.v1',
        tools: [
          { name: 'anchorfact_plan_query' },
          { name: 'anchorfact_content_health' },
          { name: 'anchorfact_cite_claim' }
        ]
      }),
      '/content-health.json': jsonResponse({
        schema_version: 'anchorfact.content-health.v1',
        snapshot: { public_articles: 555, public_claims: 1685 },
        public: { sources: { tier_distribution: { A: 1, B: 1, S: 1 } } },
        draft: {
          repair_queue: {
            candidate_count: 1,
            next_batch: [{ canonical_slug: 'ai/draft-a' }],
            selection_policy: ['Prioritize lower repair_complexity values first.']
          }
        },
        machine_guidance: ['Use /api/context?q={query} for prompt assembly.'],
        trust_boundaries: { draft_entries_excluded_from_ai_entrypoints: true }
      }),
      '/coverage.json': jsonResponse({
        schema_version: 'anchorfact.coverage.v1',
        query_benchmark: {
          case_count: 2,
          pass_gate: 'All benchmark cases must pass through /evals.json and npm run evals:prod.',
          cases: [
            { expected_top_slug: 'ai/rlhf' },
            { expected_top_slug: 'science/climate-change' }
          ]
        }
      }),
      '/provenance.json': jsonResponse({
        schema_version: 'anchorfact.provenance.v1',
        artifacts: {
          evals_json: { sha256: 'a'.repeat(64) },
          mcp_json: { sha256: 'b'.repeat(64) }
        }
      })
    })
  });

  if (!report.ok) console.log(JSON.stringify(report, null, 2));
  assertEq(report.ok, true);
  assertEq(report.eval_count, 12);
  assertEq(report.passed, 12);
  assertEq(report.failed, 0);
  const markdown = renderAiEvalsMarkdown(report);
  assert(markdown.includes('AnchorFact AI Evals - PASS'), 'markdown should show pass');
});

test('runAiEvals reports expectation failures', async () => {
  const report = await runAiEvals({
    baseUrl: 'https://anchorfact.org',
    generatedAt: '2026-05-29T00:00:00.000Z',
    fetchImpl: fetchFixture({
      '/evals.json': jsonResponse({
        evals: [
          {
            id: 'mcp_tool_catalog',
            call: { method: 'GET', path: '/mcp.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.mcp.v1',
              required_tools: ['anchorfact_plan_query']
            }
          },
          {
            id: 'unsupported_query_plan',
            call: { method: 'GET', path: '/api/plan?q=lunar+dentistry&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.plan-api.v1',
              fallback_guidance_contains: 'external primary'
            }
          },
          {
            id: 'unsupported_query_evidence',
            call: { method: 'GET', path: '/api/evidence?q=lunar+dentistry&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.evidence-api.v1',
              result_count: 0
            }
          },
          {
            id: 'content_health_summary',
            call: { method: 'GET', path: '/content-health.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.content-health.v1',
              min_repair_queue_candidates: 1,
              min_repair_queue_next_batch: 1,
              repair_queue_policy_contains: 'repair_complexity',
              max_public_source_tier_c: 0
            }
          },
          {
            id: 'coverage_query_benchmark_catalog',
            call: { method: 'GET', path: '/coverage.json' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.coverage.v1',
              min_query_benchmark_cases: 2,
              required_query_benchmark_slugs: ['ai/rlhf'],
              query_benchmark_pass_gate_contains: '/evals.json'
            }
          }
        ]
      }),
      '/mcp.json': jsonResponse({
        schema_version: 'anchorfact.mcp.v1',
        tools: []
      }),
      '/api/plan?q=lunar+dentistry&limit=3': jsonResponse({
        schema_version: 'anchorfact.plan-api.v1',
        fallback_guidance: ['No local coverage.']
      }),
      '/api/evidence?q=lunar+dentistry&limit=3': jsonResponse({
        schema_version: 'anchorfact.evidence-api.v1',
        result_count: 1
      }),
      '/content-health.json': jsonResponse({
        schema_version: 'anchorfact.content-health.v1',
        public: { sources: { tier_distribution: { C: 2 } } },
        draft: {
          repair_queue: {
            candidate_count: 0,
            next_batch: [],
            selection_policy: ['No stable policy yet.']
          }
        }
      }),
      '/coverage.json': jsonResponse({
        schema_version: 'anchorfact.coverage.v1',
        query_benchmark: {
          case_count: 1,
          pass_gate: 'Manual only.',
          cases: [{ expected_top_slug: 'ai/not-rlhf' }]
        }
      })
    })
  });

  assertEq(report.ok, false);
  assertEq(report.failed, 5);
  assert(report.results[0].failures.some(failure => failure.includes('anchorfact_plan_query')), 'missing tool should be reported');
  assert(report.results[1].failures.some(failure => failure.includes('external primary')), 'fallback guidance mismatch should be reported');
  assert(report.results[2].failures.some(failure => failure.includes('result_count')), 'result_count mismatch should be reported');
  assert(report.results[3].failures.some(failure => failure.includes('repair queue')), 'repair queue mismatch should be reported');
  assert(report.results[3].failures.some(failure => failure.includes('C-tier source')), 'C-tier source drift should be reported');
  assert(report.results[4].failures.some(failure => failure.includes('query benchmark')), 'query benchmark mismatch should be reported');
});

test('runAiEvals reports top-ranked canonical slug drift for query routing evals', async () => {
  const report = await runAiEvals({
    baseUrl: 'https://anchorfact.org',
    generatedAt: '2026-05-29T00:00:00.000Z',
    fetchImpl: fetchFixture({
      '/evals.json': jsonResponse({
        evals: [
          {
            id: 'ai_query_routing_rlhf',
            call: { method: 'GET', path: '/api/evidence?q=RLHF&limit=3' },
            expected: {
              status: 200,
              content_type: 'application/json',
              schema_version: 'anchorfact.evidence-api.v1',
              top_canonical_slug: 'ai/rlhf'
            }
          }
        ]
      }),
      '/api/evidence?q=RLHF&limit=3': jsonResponse({
        schema_version: 'anchorfact.evidence-api.v1',
        result_count: 1,
        packs: [{ canonical_slug: 'ai/constitutional-ai' }]
      })
    })
  });

  assertEq(report.ok, false);
  assertEq(report.failed, 1);
  assert(report.results[0].failures.some(failure => failure.includes('top canonical slug')), 'top slug drift should be reported');
});

test('runAiEvals retries transient empty eval route bodies', async () => {
  let claimCalls = 0;
  const report = await runAiEvals({
    baseUrl: 'https://anchorfact.org',
    generatedAt: '2026-05-29T00:00:00.000Z',
    routeRetryDelayMs: 0,
    fetchImpl: async (url) => {
      const route = `${url.pathname}${url.search}`;
      if (route === '/evals.json') {
        return jsonResponse({
          evals: [
            {
              id: 'claim_dereference',
              call: { method: 'GET', path: '/api/claim?id=f1' },
              expected: {
                status: 200,
                content_type: 'application/json',
                schema_version: 'anchorfact.claim-api.v1',
                claim_id: 'https://anchorfact.org/fact/f1'
              }
            }
          ]
        });
      }
      if (route === '/api/claim?id=f1') {
        claimCalls++;
        return claimCalls === 1
          ? jsonResponse('', 'application/json; charset=utf-8', 200)
          : jsonResponse({
              schema_version: 'anchorfact.claim-api.v1',
              claim_id: 'https://anchorfact.org/fact/f1'
            });
      }
      return jsonResponse({ error: 'missing fixture' }, 'application/json; charset=utf-8', 404);
    }
  });

  assertEq(report.ok, true);
  assertEq(report.passed, 1);
  assertEq(claimCalls, 2);
});

test('runAiEvals retries transient 5xx eval route responses', async () => {
  let evidenceCalls = 0;
  const report = await runAiEvals({
    baseUrl: 'https://anchorfact.org',
    generatedAt: '2026-05-29T00:00:00.000Z',
    routeRetryDelayMs: 0,
    fetchImpl: async (url) => {
      const route = `${url.pathname}${url.search}`;
      if (route === '/evals.json') {
        return jsonResponse({
          evals: [
            {
              id: 'ai_query_routing_rlhf',
              call: { method: 'GET', path: '/api/evidence?q=RLHF&limit=3' },
              expected: {
                status: 200,
                content_type: 'application/json',
                schema_version: 'anchorfact.evidence-api.v1',
                top_canonical_slug: 'ai/rlhf'
              }
            }
          ]
        });
      }
      if (route === '/api/evidence?q=RLHF&limit=3') {
        evidenceCalls++;
        return evidenceCalls === 1
          ? jsonResponse({ error: 'temporary edge failure' }, 'application/json; charset=utf-8', 503)
          : jsonResponse({
              schema_version: 'anchorfact.evidence-api.v1',
              packs: [{ canonical_slug: 'ai/rlhf' }]
            });
      }
      return jsonResponse({ error: 'missing fixture' }, 'application/json; charset=utf-8', 404);
    }
  });

  assertEq(report.ok, true);
  assertEq(report.passed, 1);
  assertEq(evidenceCalls, 2);
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
