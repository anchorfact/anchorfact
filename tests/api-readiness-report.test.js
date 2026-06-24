#!/usr/bin/env node
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  API_READINESS_SCHEMA_VERSION,
  CORE_CORPUS_QUERIES,
  buildApiReadinessReport,
  evaluateContextReadiness,
  evaluateCoreCorpus,
  renderApiReadinessMarkdown
} from '../src/lib/api-readiness.js';
import { CORE_CORPUS_QUERIES as QUERY_SET_CORPUS } from '../src/lib/api-readiness-query-set.js';
import { evaluateContextReadiness as evaluateContextReadinessFromRunner } from '../src/lib/api-readiness-evaluator.js';
import { renderApiReadinessMarkdown as renderApiReadinessMarkdownFromRenderer } from '../src/lib/api-readiness-renderer.js';
import {
  normalizeAdoptionScorecard,
  normalizeDesignPartnerSignal,
  normalizeProductionIntegrity,
  readOptionalRuntimeJson
} from '../scripts/api-readiness-report.js';

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
    canonical_url: 'https://anchorfact.org/ai/rag/index.json',
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
          url: 'https://anchorfact.org/ai/rag/index.json',
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
      public_audit: { actionable_count: 0 },
      project_readiness: {
        signals: { public_audit_actionable_count: 0 }
      },
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

test('api-readiness modules expose query set, runner, and renderer boundaries', () => {
  assert(QUERY_SET_CORPUS === CORE_CORPUS_QUERIES, 'compat facade should re-export the query set module corpus');
  assert(
    evaluateContextReadinessFromRunner === evaluateContextReadiness,
    'compat facade should re-export the evaluator module runner'
  );
  assert(
    renderApiReadinessMarkdownFromRenderer === renderApiReadinessMarkdown,
    'compat facade should re-export the renderer module function'
  );
});

test('core query set defines subscription-readiness probes across paid-use categories', () => {
  assert(CORE_CORPUS_QUERIES.length >= 100, 'core query set should preserve the 100-query foundation');
  assert(CORE_CORPUS_QUERIES.length <= 695, 'core query set should stay inside the continued readiness-corpus range');
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
    'ai/agent-linux-network-sockets-and-listening-ports',
    'ai/agent-linux-routing-tables-and-ip-route-lookup',
    'ai/agent-linux-process-environment-and-procfs-environ',
    'ai/agent-linux-packet-capture-and-tcpdump-filters',
    'ai/agent-github-actions-artifact-attestations-and-provenance',
    'ai/agent-github-actions-environment-files-and-step-outputs',
    'ai/agent-github-actions-cache-keys-and-restore-keys',
    'ai/rag-evaluation',
    'ai/hybrid-retrieval-and-reranking',
    'ai/rag-chunking-and-context-window-management',
    'ai/retrieval-query-rewriting',
    'ai/rag-hypothetical-document-embeddings-hyde',
    'ai/embedding-model-selection-and-vector-distance',
    'ai/retrieval-metadata-filtering',
    'ai/retrieval-indexing-and-document-parsing',
    'ai/sparse-retrieval-and-bm25',
    'ai/retrieval-sparse-vectors-and-learned-sparse-retrieval',
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
    'ai/retrieval-field-boosting-and-multi-match-search',
    'ai/retrieval-lucene-segments-refresh-and-near-real-time-search',
    'ai/retrieval-score-explanations-and-term-vectors',
    'ai/retrieval-chromadb-collections-and-persistent-clients',
    'ai/retrieval-pgvector-hnsw-and-ivfflat-indexes',
    'ai/retrieval-elasticsearch-knn-vector-search-and-filters',
    'ai/retrieval-redis-vector-search-and-hnsw-indexes',
    'ai/retrieval-faiss-index-types-and-nprobe-tuning',
    'ai/retrieval-weaviate-hybrid-search-and-fusion-strategies',
    'ai/retrieval-pinecone-metadata-filter-expressions',
    'ai/prompt-injection-defenses-for-tool-using-agents',
    'ai/llm-as-judge-evaluation',
    'ai/llm-evaluation-judge-bias-and-randomization',
    'ai/llm-evaluation-arena-style-pairwise-ranking',
    'ai/agent-benchmarks',
    'ai/evaluation-datasets-and-golden-tests-for-llms',
    'ai/evaluation-rubrics-and-grader-design',
    'ai/llm-evaluation-ifeval-instruction-following-benchmarks',
    'ai/llm-evaluation-berkeley-function-calling-leaderboard',
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
    'ai/llm-evaluation-tool-call-accuracy-and-argument-validation',
    'ai/agent-parallel-tool-calls-and-dependency-ordering',
    'ai/agent-output-validation-and-repair-loops',
    'ai/llm-evaluation-mteb-embedding-retrieval-benchmarks',
    'ai/llm-evaluation-promptfoo-test-cases-and-assertions',
    'ai/llm-evaluation-deepeval-test-cases-and-metrics',
    'ai/llm-evaluation-inspect-ai-tasks-and-scorers',
    'ai/llm-evaluation-phoenix-datasets-and-experiments',
    'ai/llm-evaluation-weave-evaluations-and-scorers',
    'ai/llm-evaluation-langfuse-datasets-experiments-and-scores',
    'ai/evaluation-data-contamination',
    'computer-science/openapi-for-agent-tools',
    'computer-science/api-a2a-agent-card-and-skills',
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
    'computer-science/api-prefer-header-return-minimal-and-respond-async',
    'computer-science/api-websocket-subprotocol-negotiation-for-agents',
    'computer-science/api-json-rpc-request-ids-and-error-objects',
    'computer-science/api-json-schema-dialects-and-vocabularies',
    'computer-science/api-json-schema-additionalproperties-and-unevaluatedproperties',
    'computer-science/api-json-schema-ref-and-dynamic-anchors',
    'computer-science/api-http-message-signatures-and-signature-input',
    'computer-science/api-openapi-request-body-media-types-and-encoding',
    'computer-science/api-cloudevents-http-binding-and-content-modes',
    'computer-science/api-http-range-requests-and-content-range',
    'computer-science/data-catalogs-and-metadata-lineage',
    'computer-science/lakehouse-table-formats',
    'computer-science/schema-evolution-for-data-pipelines',
    'computer-science/data-quality-validation-for-ml-pipelines',
    'computer-science/data-contracts-for-pipelines',
    'computer-science/data-pipeline-orchestration',
    'computer-science/data-airflow-datasets-and-data-aware-scheduling',
    'computer-science/data-airflow-deferrable-operators-and-triggerer',
    'computer-science/data-freshness-and-slas',
    'computer-science/schema-registry-for-event-streaming',
    'computer-science/openlineage-for-data-pipelines',
    'computer-science/debezium-change-data-capture-for-pipelines',
    'computer-science/data-kafka-consumer-group-offsets-and-rebalancing',
    'computer-science/data-kafka-log-compaction-and-tombstones',
    'computer-science/streaming-watermarks-and-late-data',
    'computer-science/data-flink-checkpoints-and-savepoints',
    'computer-science/feature-stores-for-ml-pipelines',
    'computer-science/data-avro-schema-resolution-and-object-container-files',
    'computer-science/data-orc-stripes-and-column-statistics',
    'computer-science/data-parquet-page-indexes-and-bloom-filters',
    'computer-science/data-iceberg-delete-files-and-row-level-deletes',
    'computer-science/data-snowflake-access-history-and-object-lineage',
    'computer-science/data-postgresql-pg-stat-statements-and-query-fingerprints',
    'computer-science/data-postgresql-row-level-security-policies',
    'computer-science/data-postgresql-logical-replication-publications-and-slots',
    'computer-science/dev-docker-buildkit-cache-and-secret-mounts',
    'computer-science/dev-kubernetes-server-side-apply-and-managed-fields',
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
    'ai/agent-incident-postmortems-and-root-cause-analysis',
    'ai/agent-pull-request-review-comments-and-unresolved-threads',
    'ai/agent-service-level-objectives-and-error-budgets',
    'ai/agent-feature-flags-and-remote-configuration',
    'ai/agent-ci-logs-and-deployment-history',
    'ai/agent-ticket-and-issue-tracker-lookup',
    'ai/agent-audit-logs-and-activity-feeds',
    'ai/agent-cloudwatch-logs-insights-and-log-groups',
    'ai/agent-datadog-log-explorer-and-monitor-alerts',
    'ai/agent-cloudflare-pages-deployments-and-build-logs',
    'ai/agent-cloudflare-workers-tail-logs-and-source-maps',
    'ai/agent-cloudflare-graphql-analytics-and-traffic-scorecards',
    'ai/agent-execution-dry-runs-and-plan-previews',
    'ai/agent-service-ownership-and-on-call-schedules',
    'ai/agent-container-image-registry-and-tags',
    'ai/agent-docker-build-cache-and-layer-invalidation',
    'ai/agent-container-security-context-seccomp-and-capabilities',
    'ai/agent-database-migration-history',
    'ai/agent-infrastructure-as-code-state-and-drift',
    'ai/agent-terraform-plan-output-and-resource-addresses',
    'ai/agent-secrets-rotation-and-credential-expiry',
    'ai/agent-cloud-resource-inventory',
    'ai/agent-kubernetes-events-and-pod-health',
    'ai/agent-kubernetes-horizontal-pod-autoscaler-and-scale-events',
    'ai/agent-kubernetes-pod-disruption-budgets-and-evictions',
    'ai/agent-kubernetes-probes-and-readiness-gates',
    'ai/agent-kubernetes-ephemeral-containers-and-debugging',
    'ai/agent-kubernetes-rbac-and-subjectaccessreviews',
    'ai/agent-kubernetes-init-containers-and-sidecar-containers',
    'ai/agent-kubernetes-owner-references-and-replicaset-lineage',
    'ai/agent-helm-release-history-and-values-overrides',
    'ai/agent-argocd-application-sync-and-health-status',
    'ai/agent-github-actions-run-attempts-and-job-summaries',
    'ai/agent-github-actions-environments-and-deployment-review',
    'ai/agent-github-check-runs-and-commit-statuses',
    'ai/agent-gitlab-ci-job-artifacts-and-logs',
    'ai/agent-service-mesh-traffic-policy',
    'ai/agent-message-queue-dead-letter-queues',
    'ai/agent-scheduler-cron-and-workflow-runs',
    'ai/agent-database-query-plans-and-slow-query-logs',
    'ai/agent-error-budget-burn-rate-alerts',
    'ai/agent-feature-store-and-online-offline-consistency',
    'ai/agent-api-rate-limit-headers-and-retry-after',
    'ai/agent-prometheus-promql-and-alert-labels',
    'ai/agent-grafana-loki-logql-and-alert-rules',
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
    'ai/agent-github-merge-queue-and-auto-merge-state',
    'ai/agent-cloud-firewall-and-security-group-rules',
    'ai/agent-object-storage-bucket-policies-and-access',
    'ai/agent-saml-sso-and-identity-provider-logs',
    'ai/agent-browser-console-network-and-har-logs',
    'ai/agent-browser-traces-and-playwright-test-artifacts',
    'ai/agent-cloud-quotas-and-service-limits',
    'ai/agent-container-logs-exit-codes-and-restarts',
    'ai/agent-ci-cache-and-build-artifacts',
    'ai/agent-deployment-rollouts-and-rollback-history',
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
    'computer-science/code-language-server-hover-signature-and-completion-context',
    'computer-science/code-lsp-inlay-hints-and-code-lens',
    'computer-science/code-lsp-workspace-symbols-and-reference-providers',
    'computer-science/code-ctags-symbol-indexes-for-repository-agents',
    'computer-science/software-bill-of-materials-and-dependency-graphs',
    'computer-science/tree-sitter-parsers-for-code-intelligence',
    'computer-science/package-dependency-resolution-for-code-agents',
    'computer-science/static-analysis-rules-and-codeql',
    'computer-science/test-coverage-for-code-agents',
    'computer-science/code-junit-xml-test-reports-and-ci-failure-context',
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
    'ai/retrieval-hybrid-search-score-weighting-and-alpha',
    'ai/retrieval-semantic-ranker-captions-and-answers',
    'ai/retrieval-chromadb-where-filters-and-query-results',
    'ai/retrieval-lancedb-hybrid-search-and-full-text-indexes',
    'ai/retrieval-parent-document-and-small-to-big-indexing',
    'ai/retrieval-late-interaction-and-colbert',
    'ai/retrieval-multivector-indexing',
    'ai/retrieval-index-aliases-and-zero-downtime-reindexing',
    'ai/retrieval-elasticsearch-retrievers-and-rrf',
    'ai/retrieval-federated-search-and-source-routing',
    'ai/retrieval-passage-boundaries-and-overlap-windows',
    'ai/retrieval-evidence-ids-and-citation-stability',
    'ai/retrieval-document-versioning-and-source-snapshots',
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
    'ai/llm-evaluation-slice-based-regression-analysis',
    'ai/llm-production-quality-monitoring-and-drift',
    'ai/llm-evaluation-golden-datasets-and-sampling',
    'ai/llm-evaluation-error-taxonomy-and-failure-labels',
    'ai/llm-evaluation-prompt-versioning-and-experiment-tracking',
    'ai/llm-evaluation-human-review-and-adjudication',
    'ai/llm-evaluation-judge-prompt-rubrics-and-scorecards',
    'ai/llm-evaluation-structured-output-validity',
    'ai/llm-evaluation-braintrust-experiments-datasets-and-scorers',
    'ai/llm-evaluation-opik-traces-datasets-and-experiments',
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
    'computer-science/api-graphql-response-errors-and-nullability',
    'computer-science/data-lake-object-storage-layouts',
    'computer-science/data-pipeline-checkpointing-and-exactly-once-semantics',
    'computer-science/data-lake-compaction-and-small-files',
    'computer-science/data-warehouse-query-history-and-job-metadata',
    'computer-science/data-bigquery-information-schema-jobs-and-query-history',
    'computer-science/data-sensitive-data-discovery-and-classification',
    'computer-science/data-warehouse-partition-pruning-and-clustering',
    'computer-science/data-materialized-view-refresh-and-staleness',
    'computer-science/data-incremental-models-and-stateful-transforms',
    'computer-science/data-column-level-lineage-and-impact-analysis',
    'computer-science/data-time-travel-and-snapshot-isolation',
    'computer-science/data-iceberg-metadata-tables-and-manifests',
    'computer-science/data-clickhouse-query-log-and-query-thread-log',
    'computer-science/data-iceberg-partition-evolution-and-hidden-partitioning',
    'computer-science/data-iceberg-snapshot-expiration-and-orphan-files',
    'computer-science/data-change-data-feed-and-incremental-table-reads',
    'computer-science/data-outbox-pattern-and-change-publishing',
    'computer-science/data-table-maintenance-vacuum-and-retention',
    'computer-science/language-server-protocol-diagnostics-and-code-actions',
    'computer-science/build-graph-and-affected-test-selection-for-code-agents',
    'computer-science/static-analysis-sarif-results-for-code-agents',
    'computer-science/code-ci-problem-matchers-and-annotations-for-agents',
    'computer-science/test-coverage-maps-for-code-agents',
    'computer-science/code-codemods-and-ast-transforms-for-agents',
    'computer-science/code-compile-commands-and-language-toolchains',
    'computer-science/code-bazel-build-event-protocol-for-agents',
    'computer-science/code-bazel-query-and-cquery-dependency-analysis',
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
    'computer-science/code-textmate-grammars-and-syntax-token-scopes',
    'computer-science/code-typescript-project-references-and-incremental-builds',
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
    'ai/agent-opentelemetry-baggage-and-context-propagation',
    'ai/agent-opentelemetry-collector-pipelines-and-exporters',
    'ai/agent-metrics-cardinality-and-label-explosion',
    'ai/agent-message-ordering-and-deduplication',
    'ai/rag-metadata-filters-and-filterable-vector-search',
    'ai/rag-query-rewriting-and-expansion',
    'ai/llm-evaluation-assertions-and-test-cases',
    'ai/llm-evaluation-rubrics-and-grading-schemas',
    'ai/agent-api-pagination-cursors-and-page-tokens',
    'computer-science/api-versioning-and-deprecation-policies',
    'computer-science/api-idempotency-keys-and-safe-retries',
    'computer-science/data-quality-expectations-and-validation-rules',
    'computer-science/data-contracts-and-schema-evolution',
    'computer-science/code-tree-sitter-incremental-parsing-for-agents',
    'ai/agent-api-error-responses-and-error-models',
    'computer-science/api-webhook-signature-verification-and-replay-protection',
    'ai/rag-citation-spans-and-source-attribution',
    'ai/rag-embedding-dimensions-and-index-compatibility',
    'ai/llm-evaluation-golden-datasets-and-regression-tests',
    'computer-science/data-freshness-slas-and-lateness-windows',
    'computer-science/code-static-analysis-rules-and-semgrep-patterns',
    'computer-science/code-dependency-graphs-and-vulnerability-advisories',
    'ai/agent-api-authentication-schemes-and-bearer-tokens',
    'computer-science/api-conditional-requests-etags-and-cache-validation',
    'computer-science/api-cors-preflight-and-browser-agent-requests',
    'ai/rag-chunking-strategies-and-token-aware-splitting',
    'ai/rag-reranker-score-calibration-and-thresholds',
    'ai/llm-evaluation-metric-templates-and-scorecards',
    'ai/llm-evaluation-exact-match-fuzzy-match-and-code-graders',
    'computer-science/data-observability-anomaly-detection-and-incidents',
    'computer-science/code-sbom-and-software-supply-chain-inventory',
    'ai/agent-context-compaction-and-summarization',
    'ai/agent-run-heartbeats-and-lease-renewal',
    'ai/rag-long-context-reordering-and-lost-in-the-middle',
    'ai/agent-trajectory-evaluation-and-step-level-traces',
    'computer-science/api-request-signing-and-hmac-authentication',
    'computer-science/data-mesh-domain-ownership-and-data-products',
    'computer-science/code-index-formats-lsif-and-scip',
    'ai/dense-retrieval-bi-encoders-and-dual-encoders',
    'ai/agent-workspace-filesystem-and-path-context',
    'ai/agent-terminal-output-and-exit-status',
    'ai/agent-cli-help-output-and-man-pages',
    'ai/agent-kubernetes-custom-resources-and-finalizers',
    'ai/agent-redis-slowlog-and-keyspace-notifications',
    'ai/agent-opentelemetry-tail-sampling-and-trace-retention',
    'ai/agent-systemd-journald-and-unit-state',
    'ai/agent-kubernetes-api-resources-and-discovery',
    'ai/agent-postgresql-pg-stat-activity-and-query-cancellation',
    'ai/agent-linux-disk-space-inodes-and-filesystem-pressure',
    'ai/agent-linux-open-files-and-process-inspection',
    'ai/agent-linux-dns-resolution-and-name-service-switch',
    'ai/agent-linux-cgroups-and-pressure-stall-information',
    'ai/browser-devtools-protocol-for-agents',
    'computer-science/accessibility-tree-and-aria-for-ui-agents',
    'computer-science/package-lockfiles-and-reproducible-installs',
    'computer-science/semantic-versioning-and-version-constraints',
    'computer-science/data-profiling-and-column-statistics',
    'computer-science/data-access-audit-logs-and-query-history',
    'computer-science/data-dbt-source-freshness-and-sources-json',
    'computer-science/data-dbt-exposures-and-downstream-dependencies',
    'computer-science/data-great-expectations-validation-definitions-and-checkpoints',
    'computer-science/data-dbt-artifacts-manifest-catalog-and-run-results',
    'computer-science/data-schema-registry-subjects-and-compatibility',
    'ai/agent-browser-cookies-storage-and-session-state',
    'computer-science/dom-locators-and-accessible-names-for-ui-agents',
    'ai/rag-incremental-indexing-and-vector-upserts',
    'ai/rag-document-content-hashes-and-reindex-triggers',
    'ai/rag-document-layout-and-table-extraction',
    'ai/vector-store-namespaces-and-tenant-isolation',
    'ai/retrieval-elasticsearch-point-in-time-and-search-after',
    'ai/retrieval-milvus-collections-and-vector-indexes',
    'ai/retrieval-milvus-partitions-and-consistency-levels',
    'ai/retrieval-opensearch-neural-search-and-search-pipelines',
    'ai/retrieval-opensearch-profile-and-explain-debugging',
    'ai/retrieval-azure-ai-search-indexers-and-data-sources',
    'ai/retrieval-azure-ai-search-vector-filter-modes',
    'ai/retrieval-weaviate-collection-schema-and-vectorizer-config',
    'ai/retrieval-qdrant-collections-and-payload-indexes',
    'ai/retrieval-pinecone-indexes-and-namespaces',
    'ai/retrieval-vespa-nearest-neighbor-and-weakand',
    'ai/retrieval-vespa-rank-profiles-and-phased-ranking',
    'ai/llm-evaluation-benchmark-harnesses-and-task-registries',
    'ai/llm-evaluation-helm-scenarios-and-metrics',
    'ai/llm-evaluation-osworld-computer-use-benchmarks',
    'ai/llm-evaluation-webarena-web-agent-benchmarks',
    'ai/llm-evaluation-swe-bench-verified-code-agent-benchmarks',
    'ai/llm-evaluation-mle-bench-machine-learning-engineering',
    'ai/llm-evaluation-lm-eval-harness-task-yaml',
    'ai/llm-evaluation-tau-bench-tool-agent-benchmarks',
    'ai/llm-evaluation-gaia-assistant-benchmark',
    'ai/llm-evaluation-terminal-bench-command-line-agent-benchmarks',
    'ai/llm-evaluation-aider-polyglot-code-benchmark',
    'computer-science/openapi-operation-ids-and-links-for-agent-navigation',
    'computer-science/data-policy-tags-and-sensitive-column-governance',
    'computer-science/data-iceberg-branches-tags-and-write-audit-publish',
    'computer-science/package-manager-workspaces-and-monorepo-dependencies',
    'ai/agent-event-logs-and-state-replay',
    'ai/vector-index-parameters-and-recall-latency-tuning',
    'ai/llm-evaluation-statistical-power-and-minimum-detectable-effects',
    'computer-science/openapi-security-schemes-and-oauth-scopes-for-agents',
    'computer-science/api-resource-names-and-canonical-identifiers-for-agents',
    'computer-science/api-graphql-persisted-queries-and-operation-safelists',
    'computer-science/api-graphql-operation-names-and-variables-for-agents',
    'computer-science/api-graphql-query-cost-and-depth-limits',
    'computer-science/api-graphql-federation-and-subgraph-schemas',
    'computer-science/api-openapi-discriminators-and-polymorphic-schemas',
    'computer-science/api-openapi-parameter-serialization-style-and-explode',
    'computer-science/api-openapi-arazzo-workflows-and-overlays',
    'computer-science/api-grpc-health-checking-for-agent-clients',
    'computer-science/api-protobuf-field-presence-and-unknown-fields',
    'computer-science/api-protobuf-json-mapping-and-field-names',
    'computer-science/api-oauth-token-revocation-and-refresh-tokens',
    'computer-science/api-grpc-status-codes-and-error-details',
    'computer-science/api-grpc-deadlines-and-cancellation',
    'computer-science/api-mcp-sampling-and-elicitation',
    'computer-science/api-mcp-roots-and-resource-discovery',
    'computer-science/api-mcp-cancellation-and-progress-notifications',
    'computer-science/api-mcp-tools-list-and-call-results',
    'computer-science/api-graphql-defer-stream-and-incremental-delivery',
    'computer-science/api-asyncapi-channels-operations-and-messages',
    'computer-science/api-content-negotiation-and-media-types-for-agents',
    'computer-science/data-partition-pruning-and-query-scanning',
    'computer-science/data-bigquery-job-statistics-and-query-plans',
    'computer-science/data-parquet-row-groups-and-statistics',
    'computer-science/data-lake-file-skipping-and-data-skipping-indexes',
    'computer-science/data-airflow-task-instances-and-xcom',
    'computer-science/data-spark-adaptive-query-execution-and-explain-plans',
    'computer-science/data-trino-explain-plans-and-cost-estimates',
    'computer-science/data-clickhouse-mergetree-parts-and-mutations',
    'computer-science/data-databricks-unity-catalog-lineage-and-permissions',
    'computer-science/data-snowflake-streams-and-tasks-change-processing',
    'computer-science/data-duckdb-query-profiling-and-explain-plans',
    'computer-science/data-redshift-system-tables-and-query-monitoring',
    'computer-science/code-search-query-syntax-for-repository-agents',
    'computer-science/code-typescript-module-resolution-and-path-mapping',
    'computer-science/code-git-submodules-and-sparse-checkout-for-agents',
    'computer-science/code-package-url-and-cpe-identifiers',
    'computer-science/code-git-worktrees-and-detached-head-state-for-agents',
    'computer-science/lsp-rename-and-workspace-edits-for-code-agents',
    'ai/agent-secret-scanning-and-output-redaction',
    'ai/retrieval-payload-indexes-and-filter-performance',
    'ai/retrieval-inverted-index-analyzers-and-token-filters',
    'ai/llm-evaluation-ab-tests-and-online-experiments',
    'computer-science/openapi-examples-and-schema-examples-for-agents',
    'computer-science/api-openapi-callbacks-and-webhook-definitions',
    'computer-science/api-openapi-servers-and-environment-selection-for-agents',
    'computer-science/api-retry-backoff-and-client-rate-control',
    'computer-science/data-column-pruning-and-file-statistics',
    'computer-science/code-license-compliance-and-dependency-metadata',
    'computer-science/code-generated-files-and-vendored-code-detection',
    'computer-science/code-snapshot-testing-and-golden-files-for-agents',
    'computer-science/code-codeql-databases-and-query-packs',
    'computer-science/code-sarif-baseline-state-and-result-fingerprints',
    'ai/agent-cloud-audit-logs-and-iam-change-history',
    'ai/retrieval-score-thresholds-and-no-answer-fallbacks',
    'ai/llm-evaluation-run-metadata-and-reproducibility',
    'computer-science/api-json-patch-and-merge-patch',
    'computer-science/data-delta-lake-transaction-log-and-checkpoints',
    'computer-science/data-delta-lake-merge-and-upserts',
    'computer-science/data-hudi-timeline-and-incremental-queries',
    'computer-science/data-apache-arrow-columnar-interchange',
    'computer-science/data-airbyte-connector-state-and-incremental-syncs',
    'computer-science/data-prefect-states-retries-and-flow-run-artifacts',
    'computer-science/data-kafka-connect-connector-status-and-task-errors',
    'computer-science/data-kafka-connect-error-tolerance-and-dead-letter-queues',
    'computer-science/dev-containers-and-reproducible-agent-workspaces',
    'ai/agent-github-actions-token-permissions-and-secrets',
    'ai/agent-github-actions-concurrency-and-cancelled-runs',
    'ai/agent-github-actions-reusable-workflows-and-call-chain',
    'ai/agent-github-actions-self-hosted-runner-labels-and-groups',
    'ai/agent-github-actions-matrix-strategy-and-fail-fast',
    'ai/agent-kubernetes-jobs-backoff-and-completion',
    'ai/agent-github-actions-workflow-artifacts-and-retention',
    'ai/agent-github-actions-oidc-claims-and-cloud-trust',
    'computer-science/data-airflow-pools-priority-weights-and-queued-tasks',
    'computer-science/data-dbt-snapshots-and-slowly-changing-dimensions',
    'computer-science/data-dbt-tests-severity-and-store-failures',
    'computer-science/dev-docker-compose-healthchecks-and-dependencies',
    'computer-science/code-search-pathspecs-and-ignore-files-for-agents',
    'computer-science/code-taint-tracking-and-data-flow-security-for-agents'
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
  assertEq(report.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(report.report_only, true);
  assertEq(report.build_should_fail, false);
  assertEq(report.status, 'building_foundation');
  assert(report.api_scorecard.failures.length > 0, 'broken search index should produce API readiness failures');
});

test('readiness next actions follow current gaps instead of defaulting to corpus repair', () => {
  const report = buildApiReadinessReport({
    artifacts: fakeArtifacts(),
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    generatedAt: '2026-06-01T00:00:00.000Z'
  });

  assertEq(report.status, 'foundation_ready_pending_14_day_and_partner_signals');
  assertEq(report.core_corpus.failures.length, 0);
  assertEq(report.api_scorecard.failures.length, 0);
  const publicAuditGate = report.readiness_gates.find(gate => gate.id === 'public_audit_14_day');
  assertEq(publicAuditGate.current_actionable_count, 0);
  assert(report.readiness_blockers.automated_gate_ids.includes('production_integrity_14_day'), 'should expose production integrity blocker');
  assert(report.readiness_blockers.automated_gate_ids.includes('public_audit_14_day'), 'should expose public audit window blocker');
  assert(report.readiness_blockers.automated_gate_ids.includes('ai_primary_discovery_ratio_7_day'), 'should expose AI adoption blocker');
  assert(!report.readiness_blockers.automated_gate_ids.includes('core_query_context_ratio'), 'met core context gate should not block');
  assertEq(report.readiness_blockers.manual_gate_ids, ['design_partners']);
  const productionRequirement = report.readiness_blockers.evidence_requirements.find(item => item.id === 'production_integrity_14_day');
  assert(productionRequirement.command.includes('production:integrity'), 'production blocker should publish the required evidence command');
  assertEq(productionRequirement.gate_type, 'automated_window');
  assertEq(productionRequirement.required_days, 14);
  assert(productionRequirement.required_fields.includes('ok'), 'production blocker should require the production integrity ok field');
  assert(productionRequirement.required_fields.includes('commit_sha'), 'production blocker should require the deployed commit_sha field');
  assert(productionRequirement.required_fields.includes('source_commit_sha'), 'production blocker should require the source_commit_sha field');
  assert(!productionRequirement.required_fields.includes('deployed_commit'), 'production blocker should not require stale deployed_commit field');
  const adoptionRequirement = report.readiness_blockers.evidence_requirements.find(item => item.id === 'ai_primary_discovery_ratio_7_day');
  assertEq(adoptionRequirement.runtime_input_id, 'ai_adoption');
  assertEq(adoptionRequirement.preferred_measurement_scope, 'interactive_ai');
  const designRequirement = report.readiness_blockers.evidence_requirements.find(item => item.id === 'design_partners');
  assertEq(designRequirement.gate_type, 'manual_validation');
  assertEq(designRequirement.manual_validation, true);
  assert(designRequirement.required_fields.includes('external_design_partner_count'), 'design blocker should name partner-count evidence');
  assert(!report.next_actions.some(action => action.includes('Repair core corpus')), 'should not recommend corpus repair without corpus failures');
  assert(!report.next_actions.some(action => action.includes('tune article titles')), 'should not recommend API tuning without API failures');
  assert(report.next_actions.some(action => action.includes('production:integrity')), 'should recommend production integrity measurement');
  assert(report.next_actions.some(action => action.includes('public audit')), 'should recommend public audit window measurement');
  assert(report.next_actions.some(action => action.includes('AI primary/discovery')), 'should recommend AI usage measurement');
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
  assert(markdown.includes('Readiness blockers:'), 'should render readiness blocker summary');
  assert(markdown.includes('## Blocker Evidence'), 'should render blocker evidence section');
  assert(markdown.includes('production_integrity_14_day: npm run production:integrity'), 'should render production evidence command');
  assert(markdown.includes('design_partners: npm run api:readiness'), 'should render manual evidence command');
  assert(markdown.includes('not_provided'), 'should show unprovided production/adoption inputs');
  assert(markdown.includes('current_actionable=0'), 'should render current public audit actionable count');
  assert(!markdown.includes('current=null'), 'should omit null current gate values');
});

test('api readiness publishes a runtime signal contract for static builds', () => {
  const report = buildApiReadinessReport({
    artifacts: fakeArtifacts(),
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    generatedAt: '2026-06-01T00:00:00.000Z'
  });
  const contract = report.runtime_signal_contract;
  const productionInput = contract.runtime_inputs.find(input => input.id === 'production_integrity');
  const adoptionInput = contract.runtime_inputs.find(input => input.id === 'ai_adoption');
  const markdown = renderApiReadinessMarkdown(report);

  assertEq(contract.static_artifact, true);
  assertEq(contract.status_when_missing, 'not_provided');
  assert(contract.workflow.includes('.github/workflows/readiness-scorecard.yml'), 'contract should point at the readiness workflow');
  assert(contract.scorecard_command.includes('--adoption-json'), 'contract should describe the runtime scorecard command');
  assert(contract.history_command.includes('--save-current'), 'contract should describe readiness history persistence');
  assert(productionInput.required_fields.includes('ok'), 'contract should require production integrity ok result');
  assert(productionInput.required_fields.includes('commit_sha'), 'contract should require deployed commit_sha');
  assert(productionInput.required_fields.includes('source_commit_sha'), 'contract should require source_commit_sha');
  assert(!productionInput.required_fields.includes('deployed_commit'), 'contract should not require stale deployed_commit');
  assertEq(adoptionInput.preferred_measurement_scope, 'interactive_ai');
  assert(adoptionInput.required_fields.includes('interactive_ai_primary_to_discovery_ratio'), 'contract should require interactive AI ratio');
  assert(adoptionInput.required_fields.includes('crawler_ai_primary_to_discovery_ratio'), 'contract should preserve crawler context');
  assert(markdown.includes('## Runtime Signals'), 'markdown should render runtime signal contract');
  assert(markdown.includes('preferred scope: interactive_ai'), 'markdown should render preferred adoption scope');
  assert(markdown.includes('readiness-scorecard.yml'), 'markdown should render workflow path');
});

test('runtime scorecard inputs normalize Cloudflare adoption and production integrity reports', () => {
  const adoption = normalizeAdoptionScorecard({
    window: {
      since: '2026-06-02T00:00:00.000Z',
      until: '2026-06-03T00:00:00.000Z'
    },
    source: {
      provider: 'cloudflare_graphql_analytics',
      zone_name: 'anchorfact.org'
    },
    adoption_scorecard: {
      discovery_entrypoint_requests: 155,
      primary_api_requests: 310,
      identified_ai_requests: 60,
      identified_ai_discovery_requests: 20,
      identified_ai_primary_api_requests: 1,
      identified_ai_api_access_page_requests: 4,
      identified_ai_developer_docs_requests: 14,
      identified_ai_core_api_requests: 1,
      identified_ai_primary_to_discovery_ratio: 0.05,
      identified_ai_primary_to_discovery_target_ratio: 0.2,
      identified_ai_primary_to_discovery_gap_to_target: 0.15,
      identified_ai_primary_to_discovery_target_status: 'below_target',
      bot_route_5xx_or_522_requests: 0,
      scanner_or_probe_requests: 3,
      scanner_or_probe_share: 0.03
    }
  });
  const productionIntegrity = normalizeProductionIntegrity({
    status: 'pass',
    commit: 'abc123'
  });
  const report = buildApiReadinessReport({
    artifacts: fakeArtifacts(),
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    adoptionScorecard: adoption,
    productionIntegrity,
    generatedAt: '2026-06-03T00:00:00.000Z'
  });

  assertEq(adoption.status, 'below_target');
  assertEq(adoption.identified_ai_primary_to_discovery_current_ratio, 0.05);
  assertEq(adoption.identified_ai_primary_to_discovery_target.status, 'below_target');
  assertEq(productionIntegrity.status, 'pass');
  assertEq(normalizeProductionIntegrity({ ok: false }).status, 'fail');
  assertEq(report.production_health.status, 'pass');
  assertEq(report.adoption_signal.status, 'below_target');
  const adoptionGate = report.readiness_gates.find(gate => gate.id === 'ai_primary_discovery_ratio_7_day');
  assertEq(adoptionGate.status, 'below_target');
  assertEq(adoptionGate.current_ratio, 0.05);

  const markdown = renderApiReadinessMarkdown(report);
  assert(markdown.includes('Production health: pass'), 'should render production integrity status');
  assert(markdown.includes('Adoption signal: below_target'), 'should render adoption status');
  assert(markdown.includes('current=0.05'), 'should render current adoption ratio');
});

test('readiness gate prefers interactive AI adoption while preserving crawler context', () => {
  const adoption = normalizeAdoptionScorecard({
    adoption_scorecard: {
      discovery_entrypoint_requests: 1081,
      primary_api_requests: 1290,
      identified_ai_requests: 86,
      identified_ai_discovery_requests: 47,
      identified_ai_primary_api_requests: 3,
      identified_ai_primary_to_discovery_ratio: 0.06,
      identified_ai_primary_to_discovery_target_status: 'below_target',
      interactive_ai_discovery_requests: 12,
      interactive_ai_primary_api_requests: 3,
      interactive_ai_primary_to_discovery_ratio: 0.25,
      interactive_ai_primary_to_discovery_target_status: 'met',
      crawler_ai_discovery_requests: 35,
      crawler_ai_primary_api_requests: 1,
      crawler_ai_primary_to_discovery_ratio: 0.03
    }
  });
  const report = buildApiReadinessReport({
    artifacts: fakeArtifacts(),
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    adoptionScorecard: adoption,
    generatedAt: '2026-06-24T00:00:00.000Z'
  });
  const adoptionGate = report.readiness_gates.find(gate => gate.id === 'ai_primary_discovery_ratio_7_day');
  const markdown = renderApiReadinessMarkdown(report);

  assertEq(adoption.interactive_ai_primary_to_discovery_current_ratio, 0.25);
  assertEq(adoption.interactive_ai_primary_to_discovery_target.status, 'met');
  assertEq(adoptionGate.status, 'met');
  assertEq(adoptionGate.measurement_scope, 'interactive_ai');
  assertEq(adoptionGate.current_ratio, 0.25);
  assertEq(adoptionGate.current_identified_ratio, 0.06);
  assertEq(adoptionGate.current_interactive_ratio, 0.25);
  assertEq(adoptionGate.current_crawler_ratio, 0.03);
  assert(!report.readiness_blockers.automated_gate_ids.includes('ai_primary_discovery_ratio_7_day'), 'met interactive AI adoption should clear the adoption blocker');
  assert(!report.next_actions.some(action => action.includes('Measure AI primary/discovery')), 'met interactive adoption should not request more generic AI adoption measurement');
  assert(markdown.includes('scope=interactive_ai'), 'should render adoption measurement scope');
  assert(markdown.includes('interactive=0.25'), 'should render interactive ratio context');
  assert(markdown.includes('crawler=0.03'), 'should render crawler ratio context');
});

test('design partner signal gates paid-beta readiness without leaking partner details', () => {
  const designPartnerSignal = normalizeDesignPartnerSignal({
    source: {
      provider: 'manual_review',
      reviewed_at: '2026-06-13'
    },
    design_partner_signal: {
      partners: [
        { name: 'Example Partner A', external: true, evidence: 'discovery_call' },
        { name: 'Example Partner B', external: true, evidence: 'pilot_feedback' },
        { name: 'Example Partner C', external: true, evidence: 'integration_request' }
      ],
      paid_intent_signals: [
        { name: 'Example Partner A', evidence: 'budget_owner_confirmed' }
      ]
    }
  });
  const report = buildApiReadinessReport({
    artifacts: fakeArtifacts(),
    querySet: [{ id: 'rag', category: 'agent_rag', expected_slug: 'ai/rag', query: 'Retrieval-Augmented Generation (RAG)' }],
    designPartnerSignal,
    generatedAt: '2026-06-13T00:00:00.000Z'
  });
  const designPartnerGate = report.readiness_gates.find(gate => gate.id === 'design_partners');
  const markdown = renderApiReadinessMarkdown(report);

  assertEq(designPartnerSignal.status, 'met');
  assertEq(designPartnerSignal.external_design_partner_count, 3);
  assertEq(designPartnerSignal.paid_intent_signal_count, 1);
  assertEq(designPartnerGate.status, 'met');
  assertEq(designPartnerGate.current_partner_count, 3);
  assertEq(designPartnerGate.current_paid_intent_count, 1);
  assertEq(report.readiness_blockers.manual_gate_ids, []);
  assert(!report.readiness_blockers.gate_ids.includes('design_partners'), 'met design gate should not block readiness');
  assertEq(report.design_partner_signal.status, 'met');
  assert(!JSON.stringify(report.design_partner_signal).includes('Example Partner'), 'public report should not leak raw partner names');
  assert(!report.next_actions.some(action => action.includes('design partner and paid-intent')), 'met design signals should not ask for design partner proof');
  assert(markdown.includes('Design partner signal: met'), 'should render design partner status');
  assert(markdown.includes('current_partners=3'), 'should render current design partner count');
  assert(markdown.includes('current_paid_intent=1'), 'should render current paid intent count');

  const understatedTargets = normalizeDesignPartnerSignal({
    required_partner_count: 1,
    required_paid_intent_count: 0,
    partners: [{ name: 'Example Partner A', external: true }],
    paid_intent_signals: []
  });
  assertEq(understatedTargets.required_external_design_partner_count, 3);
  assertEq(understatedTargets.required_paid_intent_signal_count, 1);
  assertEq(understatedTargets.status, 'below_target');
});

test('optional runtime JSON inputs tolerate missing files but not invalid JSON', () => {
  const root = mkdtempSync(join(tmpdir(), 'anchorfact-api-readiness-'));
  try {
    assertEq(readOptionalRuntimeJson(join(root, 'missing.json'), 'adoption scorecard'), null);

    const invalidPath = join(root, 'invalid.json');
    writeFileSync(invalidPath, '{');
    let errorMessage = '';
    try {
      readOptionalRuntimeJson(invalidPath, 'adoption scorecard');
    } catch (error) {
      errorMessage = error.message;
    }
    assert(errorMessage.includes('Unable to read adoption scorecard JSON'), 'invalid JSON should still fail loudly');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
