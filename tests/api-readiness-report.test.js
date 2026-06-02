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

test('core query set defines subscription-readiness probes across paid-use categories', () => {
  assert(CORE_CORPUS_QUERIES.length >= 100, 'core query set should preserve the 100-query foundation');
  assert(CORE_CORPUS_QUERIES.length <= 390, 'core query set should stay inside the expanded readiness-corpus range');
  const categories = new Set(CORE_CORPUS_QUERIES.map(query => query.category));
  for (const category of ['agent_execution_sources', 'agent_rag', 'api_mcp', 'security_governance', 'data_infrastructure', 'llm_evaluation', 'developer_workflows', 'code_intelligence']) {
    assert(categories.has(category), `missing category ${category}`);
  }
  const slugs = CORE_CORPUS_QUERIES.map(query => query.expected_slug);
  assertEq(new Set(slugs).size, slugs.length, 'expected slugs should be unique');
  for (const slug of [
    'ai/agent-execution-knowledge-sources',
    'ai/ai-tool-use-and-function-calling',
    'ai/agent-memory-and-session-state',
    'ai/agent-observability-and-tracing',
    'ai/agent-planning-and-task-decomposition',
    'ai/agent-tool-schema-validation',
    'ai/agent-tool-authorization-and-permissions',
    'ai/agent-human-in-the-loop-approval',
    'ai/agent-runtime-sandboxing',
    'ai/agent-tool-result-provenance',
    'ai/agent-tool-retry-and-idempotency',
    'ai/agent-durable-execution',
    'ai/agent-task-queues-and-background-jobs',
    'ai/agent-tool-rate-limits-and-quotas',
    'ai/browser-automation-for-agents',
    'ai/tool-call-streaming-and-incremental-results',
    'ai/agent-state-machines-and-workflow-graphs',
    'ai/agent-token-budgeting-and-context-accounting',
    'ai/agent-tool-timeouts-and-cancellation',
    'ai/rag-evaluation',
    'ai/hybrid-retrieval-and-reranking',
    'ai/rag-chunking-and-context-window-management',
    'ai/retrieval-query-rewriting',
    'ai/embedding-model-selection-and-vector-distance',
    'ai/retrieval-metadata-filtering',
    'ai/retrieval-indexing-and-document-parsing',
    'ai/sparse-retrieval-and-bm25',
    'ai/reciprocal-rank-fusion',
    'ai/retrieval-caching-and-semantic-cache',
    'ai/rag-query-routing',
    'ai/rag-contextual-compression',
    'ai/rag-query-decomposition',
    'ai/rag-index-freshness-and-reindexing',
    'ai/rag-result-diversity-and-mmr',
    'ai/embedding-model-upgrades-and-reindexing-risk',
    'ai/vector-index-quantization-for-retrieval',
    'ai/cross-encoder-reranking-for-retrieval',
    'ai/retrieval-access-control-and-permission-filtering',
    'ai/prompt-injection-defenses-for-tool-using-agents',
    'ai/llm-as-judge-evaluation',
    'ai/agent-benchmarks',
    'ai/evaluation-datasets-and-golden-tests-for-llms',
    'ai/evaluation-rubrics-and-grader-design',
    'ai/code-generation-evaluation-pass-at-k',
    'ai/online-llm-evaluation-and-feedback-loops',
    'ai/rag-groundedness-and-faithfulness-evaluation',
    'ai/llm-regression-testing',
    'ai/pairwise-llm-evaluation',
    'ai/human-feedback-and-annotation-queues-for-llms',
    'ai/prompt-versioning-and-evaluation-traces',
    'ai/llm-cost-and-latency-evaluation',
    'ai/llm-red-teaming-and-adversarial-evaluation',
    'ai/agent-tool-use-evaluation',
    'ai/evaluation-data-contamination',
    'computer-science/openapi-for-agent-tools',
    'ai/mcp-resources-and-prompts',
    'computer-science/graphql-introspection-for-agent-tools',
    'computer-science/api-pagination-and-rate-limits',
    'computer-science/api-versioning-and-deprecation',
    'computer-science/api-error-models-and-problem-details',
    'computer-science/api-schema-code-generation',
    'computer-science/webhooks-and-event-driven-apis',
    'computer-science/asyncapi-and-event-api-schemas',
    'computer-science/api-health-checks-and-readiness-probes',
    'computer-science/api-contract-testing-and-mock-servers',
    'computer-science/data-catalogs-and-metadata-lineage',
    'computer-science/lakehouse-table-formats',
    'computer-science/schema-evolution-for-data-pipelines',
    'computer-science/data-quality-validation-for-ml-pipelines',
    'computer-science/data-contracts-for-pipelines',
    'computer-science/data-pipeline-orchestration',
    'computer-science/data-freshness-and-slas',
    'computer-science/schema-registry-for-event-streaming',
    'computer-science/openlineage-for-data-pipelines',
    'computer-science/debezium-change-data-capture-for-pipelines',
    'computer-science/streaming-watermarks-and-late-data',
    'computer-science/feature-stores-for-ml-pipelines',
    'ai/hnsw-vector-indexing',
    'ai/rag-citation-and-source-attribution',
    'ai/agent-secret-management-and-credential-isolation',
    'computer-science/oauth-scopes-for-agent-tools',
    'ai/ml-experiment-tracking',
    'computer-science/robots-txt-and-agent-web-access',
    'computer-science/sitemaps-and-structured-data-for-agent-discovery',
    'ai/agent-package-registry-and-version-lookup',
    'ai/agent-error-logs-and-stack-traces',
    'computer-science/api-discovery-and-service-catalogs',
    'ai/agent-release-notes-and-changelog-lookup',
    'ai/agent-status-pages-and-incident-feeds',
    'computer-science/configuration-and-environment-variable-discovery',
    'ai/agent-runbooks-and-incident-response',
    'ai/agent-service-level-objectives-and-error-budgets',
    'ai/agent-feature-flags-and-remote-configuration',
    'ai/agent-ci-logs-and-deployment-history',
    'ai/agent-ticket-and-issue-tracker-lookup',
    'ai/agent-audit-logs-and-activity-feeds',
    'ai/agent-execution-dry-runs-and-plan-previews',
    'ai/agent-service-ownership-and-on-call-schedules',
    'ai/agent-container-image-registry-and-tags',
    'ai/agent-database-migration-history',
    'ai/agent-infrastructure-as-code-state-and-drift',
    'ai/agent-secrets-rotation-and-credential-expiry',
    'ai/agent-cloud-resource-inventory',
    'ai/agent-kubernetes-events-and-pod-health',
    'ai/agent-service-mesh-traffic-policy',
    'ai/agent-message-queue-dead-letter-queues',
    'ai/agent-scheduler-cron-and-workflow-runs',
    'ai/agent-database-query-plans-and-slow-query-logs',
    'ai/agent-error-budget-burn-rate-alerts',
    'ai/agent-feature-store-and-online-offline-consistency',
    'ai/agent-api-rate-limit-headers-and-retry-after',
    'ai/agent-queue-backlog-and-consumer-lag',
    'ai/agent-cdn-cache-headers-and-invalidation',
    'ai/agent-cloud-billing-and-cost-anomaly-signals',
    'ai/agent-iam-policy-simulation-and-access-troubleshooting',
    'ai/agent-dns-records-and-propagation',
    'ai/agent-tls-certificates-and-expiry',
    'ai/agent-database-locks-and-deadlocks',
    'ai/agent-load-balancer-health-checks',
    'ai/agent-webhook-delivery-and-retry-logs',
    'ai/agent-oauth-app-registrations-and-consent',
    'ai/agent-email-authentication-records',
    'ai/agent-codeowners-and-review-rules',
    'ai/agent-cloud-firewall-and-security-group-rules',
    'ai/agent-object-storage-bucket-policies-and-access',
    'ai/agent-saml-sso-and-identity-provider-logs',
    'ai/agent-browser-console-network-and-har-logs',
    'ai/agent-cloud-quotas-and-service-limits',
    'ai/agent-container-logs-exit-codes-and-restarts',
    'ai/agent-ci-cache-and-build-artifacts',
    'ai/agent-environment-variables-and-runtime-configuration',
    'ai/agent-cloud-kms-keys-and-encryption-context',
    'ai/agent-database-connection-pools-and-timeouts',
    'ai/agent-kubernetes-resource-requests-limits-and-oomkills',
    'ai/agent-api-gateway-routes-and-upstream-mapping',
    'computer-science/repository-permissions-and-code-agent-access',
    'ai/agent-checkpointing-and-resumable-workflows',
    'computer-science/code-graphs-and-code-intelligence',
    'computer-science/program-symbols-definitions-and-references',
    'computer-science/abstract-syntax-trees-and-code-navigation',
    'computer-science/control-flow-and-data-flow-analysis',
    'computer-science/call-graphs-and-impact-analysis',
    'computer-science/language-server-protocol-for-code-agents',
    'computer-science/software-bill-of-materials-and-dependency-graphs',
    'computer-science/tree-sitter-parsers-for-code-intelligence',
    'computer-science/package-dependency-resolution-for-code-agents',
    'computer-science/static-analysis-rules-and-codeql',
    'computer-science/test-coverage-for-code-agents',
    'computer-science/mutation-testing-for-code-agents',
    'computer-science/build-graphs-and-incremental-build-systems',
    'computer-science/source-maps-and-stack-trace-deobfuscation',
    'computer-science/debug-symbols-and-symbolication-for-code-agents',
    'computer-science/package-vulnerability-advisories-for-code-agents',
    'computer-science/code-search-indexing-and-trigram-search',
    'ai/vector-index-sharding-and-replication',
    'ai/retrieval-query-logs-and-search-observability',
    'ai/retrieval-feedback-signals-and-click-logs',
    'ai/rag-index-evaluation-with-recall-at-k',
    'ai/retrieval-embedding-drift-and-index-quality',
    'ai/rag-answer-grounding-and-citation-coverage',
    'ai/retrieval-metadata-schema-and-facets',
    'ai/rag-context-window-packing-and-token-budgets',
    'ai/retrieval-query-expansion-and-synonyms',
    'ai/retrieval-evaluation-with-ndcg-and-mrr',
    'ai/retrieval-result-deduplication-and-collapsing',
    'ai/retrieval-snippets-and-highlighted-evidence',
    'ai/retrieval-score-normalization-and-fusion',
    'ai/retrieval-parent-document-and-small-to-big-indexing',
    'ai/retrieval-late-interaction-and-colbert',
    'ai/retrieval-multivector-indexing',
    'ai/retrieval-index-aliases-and-zero-downtime-reindexing',
    'ai/retrieval-federated-search-and-source-routing',
    'ai/retrieval-passage-boundaries-and-overlap-windows',
    'ai/retrieval-evidence-ids-and-citation-stability',
    'ai/llm-sampling-parameters-in-evaluation',
    'ai/llm-evaluation-dataset-versioning',
    'ai/agent-evaluation-harnesses-and-test-runs',
    'ai/llm-evaluation-inter-annotator-agreement',
    'ai/evaluation-sampling-and-confidence-intervals',
    'ai/llm-evaluation-calibration-and-thresholds',
    'ai/llm-evaluation-production-canaries',
    'ai/llm-safety-evaluation-and-policy-test-suites',
    'ai/llm-evaluation-traces-and-feedback-labels',
    'ai/llm-evaluation-ci-gates-and-regression-alerts',
    'ai/llm-production-quality-monitoring-and-drift',
    'ai/llm-evaluation-golden-datasets-and-sampling',
    'ai/llm-evaluation-error-taxonomy-and-failure-labels',
    'ai/llm-evaluation-prompt-versioning-and-experiment-tracking',
    'ai/llm-evaluation-human-review-and-adjudication',
    'ai/llm-evaluation-judge-prompt-rubrics-and-scorecards',
    'ai/llm-evaluation-structured-output-validity',
    'computer-science/api-idempotency-keys',
    'computer-science/distributed-tracing-and-correlation-context',
    'computer-science/api-openapi-breaking-change-detection',
    'computer-science/api-grpc-reflection-and-protobuf-schemas',
    'computer-science/api-http-caching-etags-and-conditional-requests',
    'computer-science/api-json-schema-validation-and-compatibility',
    'computer-science/api-cors-preflight-and-origin-policies',
    'computer-science/api-sunset-and-deprecation-headers',
    'computer-science/api-scim-user-provisioning',
    'computer-science/api-webhook-delivery-idempotency-and-replay',
    'computer-science/api-oidc-discovery-and-jwks',
    'computer-science/api-mutual-tls-client-certificate-authentication',
    'computer-science/api-service-discovery-and-dns-srv-records',
    'computer-science/api-websocket-heartbeats-and-close-codes',
    'computer-science/api-multipart-upload-and-resumable-transfers',
    'computer-science/api-oauth-device-authorization-flow',
    'computer-science/data-backfills-and-replay-pipelines',
    'computer-science/data-retention-and-ttl-policies',
    'computer-science/data-partitioning-and-clustering',
    'computer-science/data-deduplication-and-entity-resolution',
    'computer-science/schema-drift-and-data-observability',
    'computer-science/runtime-feature-detection-and-compatibility',
    'computer-science/api-pagination-cursors-and-continuation-tokens',
    'computer-science/open-telemetry-semantic-conventions',
    'computer-science/api-webhook-signature-verification',
    'computer-science/api-oauth-token-introspection',
    'computer-science/data-lake-object-storage-layouts',
    'computer-science/data-pipeline-checkpointing-and-exactly-once-semantics',
    'computer-science/data-lake-compaction-and-small-files',
    'computer-science/data-warehouse-query-history-and-job-metadata',
    'computer-science/data-sensitive-data-discovery-and-classification',
    'computer-science/data-warehouse-partition-pruning-and-clustering',
    'computer-science/data-materialized-view-refresh-and-staleness',
    'computer-science/data-incremental-models-and-stateful-transforms',
    'computer-science/data-column-level-lineage-and-impact-analysis',
    'computer-science/data-time-travel-and-snapshot-isolation',
    'computer-science/data-iceberg-metadata-tables-and-manifests',
    'computer-science/data-change-data-feed-and-incremental-table-reads',
    'computer-science/data-outbox-pattern-and-change-publishing',
    'computer-science/data-table-maintenance-vacuum-and-retention',
    'computer-science/language-server-protocol-diagnostics-and-code-actions',
    'computer-science/build-graph-and-affected-test-selection-for-code-agents',
    'computer-science/static-analysis-sarif-results-for-code-agents',
    'computer-science/test-coverage-maps-for-code-agents',
    'computer-science/code-codemods-and-ast-transforms-for-agents',
    'computer-science/code-compile-commands-and-language-toolchains',
    'ai/agent-workload-identity-and-service-accounts',
    'ai/agent-object-storage-versioning-and-lifecycle-rules',
    'ai/agent-proxy-and-load-balancer-access-logs',
    'ai/agent-database-schema-introspection-and-system-catalogs',
    'ai/agent-tool-risk-annotations-and-approval-boundaries',
    'ai/rag-connector-sync-state-and-document-loaders',
    'ai/retrieval-relevance-judgments-and-qrels',
    'ai/llm-evaluation-dataset-cards-and-metadata',
    'ai/llm-evaluation-refusal-and-overrefusal-testing',
    'computer-science/api-long-running-operations-and-polling',
    'computer-science/api-batch-requests-and-bulk-operations',
    'computer-science/data-orchestration-assets-and-event-driven-schedules',
    'computer-science/data-cdc-lag-and-replication-slots',
    'computer-science/code-debug-adapter-protocol-for-agents',
    'computer-science/code-semantic-tokens-and-symbol-classification',
    'ai/agent-database-backups-and-point-in-time-restore',
    'ai/agent-cloud-metrics-and-time-series-alerts',
    'ai/agent-container-image-digests-and-attestations',
    'ai/agent-message-visibility-timeouts-and-ack-deadlines',
    'ai/rag-ocr-and-layout-aware-document-parsing',
    'ai/rag-vector-store-snapshots-and-recovery',
    'ai/llm-evaluation-multilingual-and-localization-tests',
    'ai/llm-evaluation-privacy-and-pii-leakage-tests',
    'computer-science/api-server-sent-events-and-streaming-responses',
    'computer-science/api-webhook-event-types-and-versioned-payloads',
    'computer-science/api-circuit-breakers-and-client-side-resilience',
    'computer-science/data-semantic-layer-and-metrics-definitions',
    'computer-science/data-row-level-security-and-policy-tags',
    'computer-science/code-unified-diffs-and-patch-application-for-agents',
    'computer-science/code-git-blame-and-commit-history-for-agents',
    'ai/agent-kubernetes-persistent-volumes-and-storage-classes',
    'ai/agent-kubernetes-network-policies-and-ingress-rules',
    'ai/agent-cache-ttl-evictions-and-hit-rates',
    'ai/rag-document-deletion-and-tombstone-handling',
    'ai/rag-metadata-enrichment-and-entity-extraction',
    'ai/llm-evaluation-hallucination-and-factuality-benchmarks',
    'computer-science/api-delta-sync-and-change-tokens',
    'computer-science/api-field-masks-and-partial-response',
    'computer-science/data-column-masking-and-dynamic-data-masking',
    'computer-science/code-merge-conflicts-and-conflict-markers-for-agents',
    'ai/agent-log-correlation-ids-and-trace-context',
    'ai/agent-message-ordering-and-deduplication',
    'ai/rag-metadata-filters-and-filterable-vector-search',
    'ai/rag-query-rewriting-and-expansion',
    'ai/llm-evaluation-rubrics-and-grading-schemas',
    'ai/agent-api-pagination-cursors-and-page-tokens',
    'computer-science/api-versioning-and-deprecation-policies',
    'computer-science/api-idempotency-keys-and-safe-retries',
    'computer-science/data-quality-expectations-and-validation-rules',
    'computer-science/data-contracts-and-schema-evolution',
    'computer-science/code-tree-sitter-incremental-parsing-for-agents'
  ]) {
    assert(slugs.includes(slug), `missing agent/code-intelligence readiness slug ${slug}`);
  }
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
