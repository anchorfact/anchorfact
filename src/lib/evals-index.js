import {
  API_INDEX_SCHEMA_VERSION,
  API_READINESS_SCHEMA_VERSION,
  CITE_API_SCHEMA_VERSION,
  CLAIM_API_SCHEMA_VERSION,
  CONTEXT_API_SCHEMA_VERSION,
  CONTENT_HEALTH_SCHEMA_VERSION,
  COVERAGE_SCHEMA_VERSION,
  EVALS_SCHEMA_VERSION,
  EVIDENCE_API_SCHEMA_VERSION,
  GRAPH_SCHEMA_VERSION,
  MCP_SCHEMA_VERSION,
  OFFICIAL_SITE,
  OPENAPI_SCHEMA_VERSION,
  PLAN_API_SCHEMA_VERSION,
  PROVENANCE_PATH,
  PROVENANCE_SCHEMA_VERSION,
  RESOLVE_BATCH_API_SCHEMA_VERSION,
  RESOLVE_API_SCHEMA_VERSION,
  SOURCE_API_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';
import { QUERY_BENCHMARK_CASES } from './query-benchmark.js';

const PREFERRED_SLUG = 'ai/3d-generation-gaussian-splatting';
const UNSUPPORTED_QUERY = 'lunar dentistry';

function queryPath(path, params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== null && item !== undefined && String(item).trim()) {
          search.append(key, String(item));
        }
      }
    } else if (value !== null && value !== undefined && String(value).trim()) {
      search.set(key, String(value));
    }
  }
  return `${path}?${search.toString()}`;
}

function call(path, site) {
  return {
    method: 'GET',
    path,
    url: publicUrl(path, site)
  };
}

function benchmarkEvalCase(evalCase, site) {
  if (evalCase.expected_top_slug) {
    return {
      id: evalCase.id,
      intent: `Confirm the high-intent AI query "${evalCase.query}" resolves first to the intended evidence pack.`,
      call: call(queryPath('/api/evidence', { q: evalCase.query, limit: 3 }), site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: EVIDENCE_API_SCHEMA_VERSION,
        top_canonical_slug: evalCase.expected_top_slug,
        contains_canonical_slug: evalCase.expected_top_slug,
        min_packs: 1,
        min_claims_per_matching_pack: evalCase.min_citation_ready_claims ?? 1,
        min_sources_per_matching_pack: evalCase.min_sources_per_expected_pack ?? 1
      }
    };
  }

  const expectedCanAnswer = evalCase.expected_can_answer !== undefined
    ? evalCase.expected_can_answer === true
    : true;
  const expectedShouldUse = evalCase.expected_should_use_anchorfact !== undefined
    ? evalCase.expected_should_use_anchorfact === true
    : evalCase.expected_coverage_status !== 'unsupported';
  const expected = {
    status: 200,
    content_type: 'application/json',
    schema_version: CONTEXT_API_SCHEMA_VERSION,
    coverage_status: evalCase.expected_coverage_status || undefined,
    should_use_anchorfact: expectedShouldUse,
    answer_policy_can_answer: expectedCanAnswer,
    answer_policy_mode: evalCase.expected_answer_mode || undefined,
    min_citation_ready_claims: evalCase.min_citation_ready_claims ?? 0
  };

  if (!expectedCanAnswer) {
    expected.max_citation_ready_claims = 0;
    expected.fallback_guidance_contains = 'external primary';
  } else if (evalCase.expected_answer_mode === 'api_guidance') {
    expected.max_citation_ready_claims = 0;
    expected.recommended_call_contains = '/api/cite';
  }
  if (Array.isArray(evalCase.expected_unsupported_reasons)) {
    expected.unsupported_intent_reasons = evalCase.expected_unsupported_reasons;
  }

  return {
    id: evalCase.id,
    intent: `Confirm the AI query "${evalCase.query}" receives the intended context answer policy.`,
    call: call(queryPath('/api/context', { q: evalCase.query, limit: 3 }), site),
    expected
  };
}

function claimShortId(claimId) {
  if (!claimId) return null;
  try {
    const url = new URL(claimId);
    return url.pathname.split('/').filter(Boolean).pop() || claimId;
  } catch {
    return String(claimId).split('/').filter(Boolean).pop() || claimId;
  }
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '').toLowerCase();
}

function choosePrimaryRecord(records) {
  return records.find(record => record.canonical_slug === PREFERRED_SLUG)
    || records.find(record => Array.isArray(record.claim_ids) && record.claim_ids.length > 0)
    || records[0]
    || null;
}

function queryForRecord(record) {
  const keywords = Array.isArray(record?.keywords) ? record.keywords : [];
  const query = keywords.filter(Boolean).slice(0, 2).join(' ');
  if (query) return query;
  return String(record?.title || record?.canonical_slug || '').split(/\s+/).slice(0, 3).join(' ');
}

function chooseClaim(claims, record) {
  const claimIds = new Set(record?.claim_ids || []);
  return claims.find(claim => claimIds.has(claim.id))
    || claims.find(claim => claim.canonical_slug === record?.canonical_slug)
    || claims[0]
    || null;
}

function chooseSource(sources, claim, record) {
  const claimUrl = normalizeUrl(claim?.source_url);
  const claimTitle = normalizeText(claim?.source_title);
  const recordSlug = record?.canonical_slug;

  return sources.find(source => {
    const linkedToRecord = (source?.articles || []).some(article => article?.canonical_slug === recordSlug);
    if (!linkedToRecord) return false;
    return (claimUrl && normalizeUrl(source.url) === claimUrl)
      || (claimTitle && normalizeText(source.title) === claimTitle);
  })
    || sources.find(source => (source?.articles || []).some(article => article?.canonical_slug === recordSlug))
    || sources[0]
    || null;
}

function sourceLookupPath(source) {
  if (!source) return null;
  if (source.url) return queryPath('/api/source', { url: source.url });
  return queryPath('/api/source', { id: source.id });
}

function graphHasEdgeType(graphPayload, type) {
  return (graphPayload?.edges || []).some(edge => edge?.type === type);
}

function sourceTierCount(sourcesPayload, tier) {
  const wanted = String(tier || '').toUpperCase();
  return (sourcesPayload?.sources || [])
    .filter(source => String(source?.tier || '').toUpperCase() === wanted)
    .length;
}

export function buildEvalsIndex({
  generated,
  searchIndexPayload,
  claimsPayload,
  sourcesPayload,
  graphPayload,
  site = OFFICIAL_SITE
}) {
  const records = searchIndexPayload?.records || [];
  const claims = claimsPayload?.claims || [];
  const sources = sourcesPayload?.sources || [];
  const record = choosePrimaryRecord(records);

  if (!record) {
    return {
      schema_version: EVALS_SCHEMA_VERSION,
      generated,
      provenance_url: publicUrl(PROVENANCE_PATH, site),
      eval_count: 0,
      evals: []
    };
  }

  const query = queryForRecord(record);
  const claim = chooseClaim(claims, record);
  const source = chooseSource(sources, claim, record);
  const claimLookupId = claimShortId(claim?.id);
  const sourcePath = sourceLookupPath(source);
  const planPath = queryPath('/api/plan', { q: query, limit: 3 });
  const unsupportedPlanPath = queryPath('/api/plan', { q: UNSUPPORTED_QUERY, limit: 3 });
  const evidencePath = queryPath('/api/evidence', { q: query, limit: 3 });
  const contextPath = queryPath('/api/context', { q: query, limit: 3 });
  const unsupportedEvidencePath = queryPath('/api/evidence', { q: UNSUPPORTED_QUERY, limit: 3 });
  const unsupportedContextPath = queryPath('/api/context', { q: UNSUPPORTED_QUERY, limit: 3 });
  const markdownPath = queryPath('/api/evidence', { q: query, limit: 1, format: 'markdown' });
  const resolvePath = queryPath('/api/resolve', { ref: claimLookupId });
  const resolveBatchPath = queryPath('/api/resolve-batch', { ref: [claimLookupId, source.url || source.id].filter(Boolean) });
  const claimPath = queryPath('/api/claim', { id: claimLookupId });
  const citePath = queryPath('/api/cite', { id: claimLookupId });

  const evals = [
    {
      id: 'api_discovery',
      intent: 'Confirm the compact live API index tells AI agents which read-only endpoints are available.',
      call: call('/api', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: API_INDEX_SCHEMA_VERSION,
        required_paths: [
          '/api/context',
          '/api/evidence',
          '/api/plan',
          '/api/search',
          '/api/article',
          '/api/claim',
          '/api/cite',
          '/api/source',
          '/api/resolve',
          '/api/resolve-batch'
        ],
        required_primary_entrypoint_ids: ['context', 'evidence', 'plan']
      }
    },
    {
      id: 'llms_txt_primary_entrypoints',
      intent: 'Confirm llms.txt gives first-time AI crawlers the primary context, evidence, and coverage entrypoints before the article index.',
      call: call('/llms.txt', site),
      expected: {
        status: 200,
        content_type: 'text/plain',
        contains_text: [
          'Recommended AI Entry Points',
          '/api/context?q={query}',
          '/api/evidence?q={query}',
          '/api/plan?q={query}',
          '/artifact-summary.json',
          '/artifact-shards.json',
          '/api-readiness.json'
        ]
      }
    },
    {
      id: 'robots_txt_ai_entrypoints',
      intent: 'Confirm robots.txt exposes non-breaking AI hint fields for the primary read-only entrypoints.',
      call: call('/robots.txt', site),
      expected: {
        status: 200,
        content_type: 'text/plain',
        contains_text: [
          'AI-Context',
          'AI-Evidence',
          'Artifact-Summary',
          'Artifact-Shards',
          'API-Readiness'
        ]
      }
    },
    {
      id: 'openapi_context_contract',
      intent: 'Confirm OpenAPI describes the context answer policy and compact citation claim contract.',
      call: call('/openapi.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: null,
        openapi_schema_version: OPENAPI_SCHEMA_VERSION,
        required_schema_properties: {
          ContextApiResponse: [
            'answer_policy',
            'machine_consumption',
            'citation_ready_claims',
            'evidence_pack_count'
          ],
          EvidenceApiResponse: [
            'citation_contract',
            'machine_consumption',
            'packs'
          ],
          MachineConsumptionGuidance: [
            'large_artifact_policy',
            'preferred_query_scoped_apis',
            'static_discovery',
            'avoid_for_single_query',
            'bulk_sync_policy'
          ],
          AnswerPolicy: [
            'can_answer_with_anchorfact',
            'answer_mode',
            'required_action',
            'guardrails'
          ],
          CitationReadyClaim: [
            'claim_id',
            'statement',
            'source_url',
            'cite_api_path',
            'citation_markdown'
          ]
        }
      }
    },
    {
      id: 'query_plan',
      intent: 'Confirm the query planner routes a covered public query to the right next AnchorFact calls.',
      call: call(planPath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: PLAN_API_SCHEMA_VERSION,
        coverage_status: 'supported',
        should_use_anchorfact: true,
        contains_canonical_slug: record.canonical_slug,
        recommended_call_contains: '/api/evidence'
      }
    },
    {
      id: 'unsupported_query_plan',
      intent: 'Confirm the query planner tells agents not to cite AnchorFact for a fixed no-coverage query.',
      call: call(unsupportedPlanPath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: PLAN_API_SCHEMA_VERSION,
        coverage_status: 'unsupported',
        should_use_anchorfact: false,
        recommended_call_contains: '/coverage.json',
        fallback_guidance_contains: 'external primary'
      }
    },
    {
      id: 'evidence_pack_json',
      intent: 'Confirm the one-call evidence API returns source-grounded JSON for a canonical public query.',
      call: call(evidencePath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: EVIDENCE_API_SCHEMA_VERSION,
        contains_canonical_slug: record.canonical_slug,
        min_packs: 1,
        min_claims_per_matching_pack: 1,
        min_sources_per_matching_pack: 1
      }
    },
    ...QUERY_BENCHMARK_CASES.map(evalCase => benchmarkEvalCase(evalCase, site)),
    {
      id: 'context_pack_json',
      intent: 'Confirm the context API combines planning status, fallback guidance, and source-grounded evidence packs.',
      call: call(contextPath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: CONTEXT_API_SCHEMA_VERSION,
        coverage_status: 'supported',
        should_use_anchorfact: true,
        contains_canonical_slug: record.canonical_slug,
        recommended_call_contains: '/api/evidence',
        answer_policy_can_answer: true,
        min_citation_ready_claims: 1,
        min_content_health_public_articles: Math.max(1, searchIndexPayload?.article_count || 0),
        content_health_trust_boundary: 'draft_entries_excluded_from_ai_entrypoints'
      }
    },
    {
      id: 'unsupported_query_evidence',
      intent: 'Confirm the one-call evidence API returns an explicit empty result for the same no-coverage query.',
      call: call(unsupportedEvidencePath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: EVIDENCE_API_SCHEMA_VERSION,
        result_count: 0
      }
    },
    {
      id: 'unsupported_context_pack_json',
      intent: 'Confirm the context API gives explicit non-citation policy for a fixed no-coverage query.',
      call: call(unsupportedContextPath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: CONTEXT_API_SCHEMA_VERSION,
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
      id: 'evidence_pack_markdown',
      intent: 'Confirm answer-ready Markdown evidence packs stay available for prompt assembly.',
      call: call(markdownPath, site),
      expected: {
        status: 200,
        content_type: 'text/markdown',
        contains_text: [
          'AnchorFact Evidence Pack',
          'Citation contract:'
        ]
      }
    },
    {
      id: 'claim_dereference',
      intent: 'Confirm a public atomic claim can be dereferenced with article and source context.',
      call: call(claimPath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: CLAIM_API_SCHEMA_VERSION,
        claim_id: claim?.id || null,
        canonical_slug: record.canonical_slug,
        min_sources: 1
      }
    },
    {
      id: 'reference_resolver',
      intent: 'Confirm an arbitrary public AnchorFact reference resolves to the matching API payload.',
      call: call(resolvePath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: RESOLVE_API_SCHEMA_VERSION,
        resolved_type: 'claim',
        canonical_ref: claim?.id || null,
        result_schema_version: CLAIM_API_SCHEMA_VERSION
      }
    },
    {
      id: 'batch_reference_resolver',
      intent: 'Confirm several mixed public AnchorFact references resolve in one request.',
      call: call(resolveBatchPath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: RESOLVE_BATCH_API_SCHEMA_VERSION,
        reference_count: 2,
        ok_count_min: 2,
        error_count: 0
      }
    },
    {
      id: 'citation_export',
      intent: 'Confirm one public atomic claim can be returned as a citation-ready payload.',
      call: call(citePath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: CITE_API_SCHEMA_VERSION,
        claim_id: claim?.id || null,
        canonical_slug: record.canonical_slug,
        citation_export_contains: [
          'AnchorFact:',
          claim?.source_url || source?.url || ''
        ].filter(Boolean)
      }
    },
    {
      id: 'source_reuse_lookup',
      intent: 'Confirm a public source lookup returns mapped public claims for reuse-aware citation.',
      call: call(sourcePath || '/sources.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: sourcePath ? SOURCE_API_SCHEMA_VERSION : null,
        source_id: source?.id || null,
        contains_claim_id: claim?.id || null,
        min_claims: sourcePath ? 1 : null
      }
    },
    {
      id: 'graph_relationships',
      intent: 'Confirm the signed graph exposes article-to-claim and claim-to-source traversal edges.',
      call: call('/graph.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: GRAPH_SCHEMA_VERSION,
        min_nodes: Math.max(1, graphPayload?.node_count || 0),
        min_edges: Math.max(1, graphPayload?.edge_count || 0),
        required_edge_types: [
          'article_has_claim',
          'claim_supported_by_source'
        ],
        currently_present: {
          article_has_claim: graphHasEdgeType(graphPayload, 'article_has_claim'),
          claim_supported_by_source: graphHasEdgeType(graphPayload, 'claim_supported_by_source')
        }
      }
    },
    {
      id: 'content_health_summary',
      intent: 'Confirm the signed content health artifact exposes public/draft counts, AI guidance, and trust boundaries.',
      call: call('/content-health.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: CONTENT_HEALTH_SCHEMA_VERSION,
        min_public_articles: Math.max(1, searchIndexPayload?.article_count || 0),
        min_public_claims: Math.max(1, claimsPayload?.claim_count || 0),
        machine_guidance_contains: '/api/context',
        trust_boundary: 'draft_entries_excluded_from_ai_entrypoints',
        min_repair_queue_candidates: 1,
        min_repair_queue_next_batch: 1,
        repair_queue_policy_contains: ['AI-agent utility', 'repair_complexity'],
        max_public_source_tier_c: sourceTierCount(sourcesPayload, 'C')
      }
    },
    {
      id: 'coverage_query_benchmark_catalog',
      intent: 'Confirm the signed coverage artifact exposes the representative AI query benchmark used to steer future content work.',
      call: call('/coverage.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: COVERAGE_SCHEMA_VERSION,
        min_query_benchmark_cases: QUERY_BENCHMARK_CASES.length,
        required_query_benchmark_slugs: QUERY_BENCHMARK_CASES
          .map(item => item.expected_top_slug)
          .filter(Boolean),
        query_benchmark_pass_gate_contains: '/evals.json'
      }
    },
    {
      id: 'api_readiness_summary',
      intent: 'Confirm the signed readiness artifact exposes subscription gates and API citation scorecards without becoming a build blocker.',
      call: call('/api-readiness.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: API_READINESS_SCHEMA_VERSION,
        report_only: true,
        subscription_ready: false,
        status_in: [
          'building_foundation',
          'foundation_ready_pending_14_day_and_partner_signals'
        ],
        readiness_gate_ids: [
          'production_integrity_14_day',
          'public_audit_14_day',
          'core_query_context_ratio',
          'ai_primary_discovery_ratio_7_day',
          'design_partners'
        ]
      }
    },
    {
      id: 'mcp_tool_catalog',
      intent: 'Confirm the signed MCP profile declares local tools needed for planning, prompt context, search, retrieval, resolution, and citation.',
      call: call('/mcp.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: MCP_SCHEMA_VERSION,
        required_tools: [
          'anchorfact_plan_query',
          'anchorfact_search',
          'anchorfact_context',
          'anchorfact_content_health',
          'anchorfact_get_article',
          'anchorfact_resolve_reference',
          'anchorfact_resolve_references',
          'anchorfact_cite_claim',
          'anchorfact_list_categories'
        ]
      }
    },
    {
      id: 'signed_provenance_static_artifacts',
      intent: 'Confirm static artifacts needed by AI consumers remain hash-covered by provenance.',
      call: call('/provenance.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: PROVENANCE_SCHEMA_VERSION,
        required_artifacts: [
          'agent_json',
          'openapi_json',
          'manifest_json',
          'claims_json',
          'topics_json',
          'capabilities_json',
          'content_health_json',
          'coverage_json',
          'examples_json',
          'graph_json',
          'evals_json',
          'mcp_json',
          'artifact_summary_json',
          'artifact_shards_json',
          'api_readiness_json',
          'search_index_json',
          'sources_json',
          'llms_txt'
        ]
      }
    }
  ];

  return {
    schema_version: EVALS_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    eval_count: evals.length,
    evals
  };
}
