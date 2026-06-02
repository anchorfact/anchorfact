import { buildCiteApiPayload } from './cite-api.js';
import { buildContextApiPayload } from './context-api.js';
import { buildEvidenceApiPayload } from './evidence-api.js';

export const API_READINESS_SCHEMA_VERSION = 'anchorfact.api-readiness.v1';
export const API_READINESS_TARGET_RATIO = 0.9;

export const CORE_CORPUS_QUERIES = [
  ['agent_execution_sources', 'ai/agent-execution-knowledge-sources', 'Agent Execution Knowledge Sources: What AI Agents Need to Look Up'],
  ['agent_execution_sources', 'computer-science/robots-txt-and-agent-web-access', 'Robots.txt and Agent Web Access'],
  ['agent_execution_sources', 'computer-science/sitemaps-and-structured-data-for-agent-discovery', 'Sitemaps and Structured Data for Agent Discovery'],
  ['agent_execution_sources', 'ai/agent-package-registry-and-version-lookup', 'Agent Package Registry and Version Lookup'],
  ['agent_execution_sources', 'ai/agent-error-logs-and-stack-traces', 'Agent Error Logs and Stack Traces'],
  ['agent_execution_sources', 'computer-science/api-discovery-and-service-catalogs', 'API Discovery and Service Catalogs'],
  ['agent_execution_sources', 'ai/agent-release-notes-and-changelog-lookup', 'Agent Release Notes and Changelog Lookup'],
  ['agent_execution_sources', 'ai/agent-status-pages-and-incident-feeds', 'Agent Status Pages and Incident Feeds'],
  ['agent_execution_sources', 'computer-science/configuration-and-environment-variable-discovery', 'Configuration and Environment Variable Discovery'],
  ['agent_execution_sources', 'ai/agent-runbooks-and-incident-response', 'Agent Runbooks and Incident Response'],
  ['agent_execution_sources', 'ai/agent-incident-postmortems-and-root-cause-analysis', 'Agent Incident Postmortems and Root-Cause Analysis'],
  ['agent_execution_sources', 'ai/agent-pull-request-review-comments-and-unresolved-threads', 'Agent Pull Request Review Comments and Unresolved Threads'],
  ['agent_execution_sources', 'ai/agent-service-level-objectives-and-error-budgets', 'Agent Service Level Objectives and Error Budgets'],
  ['agent_execution_sources', 'ai/agent-feature-flags-and-remote-configuration', 'Agent Feature Flags and Remote Configuration'],
  ['agent_execution_sources', 'ai/agent-ci-logs-and-deployment-history', 'Agent CI Logs and Deployment History'],
  ['agent_execution_sources', 'ai/agent-ticket-and-issue-tracker-lookup', 'Agent Ticket and Issue Tracker Lookup'],
  ['agent_execution_sources', 'ai/agent-audit-logs-and-activity-feeds', 'Agent Audit Logs and Activity Feeds'],
  ['agent_execution_sources', 'ai/agent-execution-dry-runs-and-plan-previews', 'Agent Execution Dry Runs and Plan Previews'],
  ['agent_execution_sources', 'ai/agent-service-ownership-and-on-call-schedules', 'Agent Service Ownership and On-Call Schedules'],
  ['agent_execution_sources', 'ai/agent-container-image-registry-and-tags', 'Agent Container Image Registry and Tags'],
  ['agent_execution_sources', 'ai/agent-database-migration-history', 'Agent Database Migration History'],
  ['agent_execution_sources', 'ai/agent-infrastructure-as-code-state-and-drift', 'Agent Infrastructure-as-Code State and Drift'],
  ['agent_execution_sources', 'ai/agent-secrets-rotation-and-credential-expiry', 'Agent Secrets Rotation and Credential Expiry'],
  ['agent_execution_sources', 'ai/agent-cloud-resource-inventory', 'Agent Cloud Resource Inventory'],
  ['agent_execution_sources', 'ai/agent-kubernetes-events-and-pod-health', 'Agent Kubernetes Events and Pod Health'],
  ['agent_execution_sources', 'ai/agent-service-mesh-traffic-policy', 'Agent Service Mesh Traffic Policy'],
  ['agent_execution_sources', 'ai/agent-message-queue-dead-letter-queues', 'Agent Message Queue Dead-Letter Queues'],
  ['agent_execution_sources', 'ai/agent-scheduler-cron-and-workflow-runs', 'Agent Scheduler Cron and Workflow Runs'],
  ['agent_execution_sources', 'ai/agent-database-query-plans-and-slow-query-logs', 'Agent Database Query Plans and Slow Query Logs'],
  ['agent_execution_sources', 'ai/agent-error-budget-burn-rate-alerts', 'Agent Error Budget Burn Rate Alerts'],
  ['agent_execution_sources', 'ai/agent-feature-store-and-online-offline-consistency', 'Agent Feature Store and Online-Offline Consistency'],
  ['agent_execution_sources', 'ai/agent-api-rate-limit-headers-and-retry-after', 'Agent API Rate-Limit Headers and Retry-After'],
  ['agent_execution_sources', 'ai/agent-queue-backlog-and-consumer-lag', 'Agent Queue Backlog and Consumer Lag'],
  ['agent_execution_sources', 'ai/agent-cdn-cache-headers-and-invalidation', 'Agent CDN Cache Headers and Invalidation'],
  ['agent_execution_sources', 'ai/agent-cloud-billing-and-cost-anomaly-signals', 'Agent Cloud Billing and Cost Anomaly Signals'],
  ['agent_execution_sources', 'ai/agent-iam-policy-simulation-and-access-troubleshooting', 'Agent IAM Policy Simulation and Access Troubleshooting'],
  ['agent_execution_sources', 'ai/agent-cloud-audit-logs-and-iam-change-history', 'Agent Cloud Audit Logs and IAM Change History'],
  ['agent_execution_sources', 'ai/agent-dns-records-and-propagation', 'Agent DNS Records and Propagation'],
  ['agent_execution_sources', 'ai/agent-tls-certificates-and-expiry', 'Agent TLS Certificates and Expiry'],
  ['agent_execution_sources', 'ai/agent-database-locks-and-deadlocks', 'Agent Database Locks and Deadlocks'],
  ['agent_execution_sources', 'ai/agent-load-balancer-health-checks', 'Agent Load Balancer Health Checks'],
  ['agent_execution_sources', 'ai/agent-webhook-delivery-and-retry-logs', 'Agent Webhook Delivery and Retry Logs'],
  ['agent_execution_sources', 'ai/agent-oauth-app-registrations-and-consent', 'Agent OAuth App Registrations and Consent'],
  ['agent_execution_sources', 'ai/agent-email-authentication-records', 'Agent Email Authentication Records'],
  ['agent_execution_sources', 'ai/agent-codeowners-and-review-rules', 'Agent CODEOWNERS and Review Rules'],
  ['agent_execution_sources', 'ai/agent-cloud-firewall-and-security-group-rules', 'Agent Cloud Firewall and Security Group Rules'],
  ['agent_execution_sources', 'ai/agent-object-storage-bucket-policies-and-access', 'Agent Object Storage Bucket Policies and Access'],
  ['agent_execution_sources', 'ai/agent-saml-sso-and-identity-provider-logs', 'Agent SAML SSO and Identity Provider Logs'],
  ['agent_execution_sources', 'ai/agent-browser-console-network-and-har-logs', 'Agent Browser Console, Network, and HAR Logs'],
  ['agent_execution_sources', 'ai/agent-browser-cookies-storage-and-session-state', 'Agent Browser Cookies, Storage, and Session State'],
  ['agent_execution_sources', 'ai/agent-browser-traces-and-playwright-test-artifacts', 'Agent Browser Traces and Playwright Test Artifacts'],
  ['agent_execution_sources', 'ai/agent-cloud-quotas-and-service-limits', 'Agent Cloud Quotas and Service Limits'],
  ['agent_execution_sources', 'ai/agent-container-logs-exit-codes-and-restarts', 'Agent Container Logs, Exit Codes, and Restarts'],
  ['agent_execution_sources', 'ai/agent-ci-cache-and-build-artifacts', 'Agent CI Cache and Build Artifacts'],
  ['agent_execution_sources', 'ai/agent-deployment-rollouts-and-rollback-history', 'Agent Deployment Rollouts and Rollback History'],
  ['agent_execution_sources', 'ai/agent-environment-variables-and-runtime-configuration', 'Agent Environment Variables and Runtime Configuration'],
  ['agent_execution_sources', 'ai/agent-cloud-kms-keys-and-encryption-context', 'Agent Cloud KMS Keys and Encryption Context'],
  ['agent_execution_sources', 'ai/agent-database-connection-pools-and-timeouts', 'Agent Database Connection Pools and Timeouts'],
  ['agent_execution_sources', 'ai/agent-kubernetes-resource-requests-limits-and-oomkills', 'Agent Kubernetes Resource Requests, Limits, and OOMKills'],
  ['agent_execution_sources', 'ai/agent-api-gateway-routes-and-upstream-mapping', 'Agent API Gateway Routes and Upstream Mapping'],
  ['agent_execution_sources', 'ai/agent-workload-identity-and-service-accounts', 'Agent Workload Identity and Service Accounts'],
  ['agent_execution_sources', 'ai/agent-object-storage-versioning-and-lifecycle-rules', 'Agent Object Storage Versioning and Lifecycle Rules'],
  ['agent_execution_sources', 'ai/agent-proxy-and-load-balancer-access-logs', 'Agent Proxy and Load Balancer Access Logs'],
  ['agent_execution_sources', 'ai/agent-database-schema-introspection-and-system-catalogs', 'Agent Database Schema Introspection and System Catalogs'],
  ['agent_execution_sources', 'ai/agent-database-backups-and-point-in-time-restore', 'Agent Database Backups and Point-in-Time Restore'],
  ['agent_execution_sources', 'ai/agent-cloud-metrics-and-time-series-alerts', 'Agent Cloud Metrics and Time-Series Alerts'],
  ['agent_execution_sources', 'ai/agent-container-image-digests-and-attestations', 'Agent Container Image Digests and Attestations'],
  ['agent_execution_sources', 'ai/agent-message-visibility-timeouts-and-ack-deadlines', 'Agent Message Visibility Timeouts and Ack Deadlines'],
  ['agent_execution_sources', 'ai/agent-kubernetes-persistent-volumes-and-storage-classes', 'Agent Kubernetes Persistent Volumes and Storage Classes'],
  ['agent_execution_sources', 'ai/agent-kubernetes-network-policies-and-ingress-rules', 'Agent Kubernetes Network Policies and Ingress Rules'],
  ['agent_execution_sources', 'ai/agent-cache-ttl-evictions-and-hit-rates', 'Agent Cache TTL, Evictions, and Hit Rates'],
  ['agent_execution_sources', 'ai/agent-log-correlation-ids-and-trace-context', 'Agent Log Correlation IDs and Trace Context'],
  ['agent_execution_sources', 'ai/agent-event-logs-and-state-replay', 'Agent Event Logs and State Replay'],
  ['agent_execution_sources', 'ai/agent-message-ordering-and-deduplication', 'Agent Message Ordering and Deduplication'],
  ['agent_execution_sources', 'ai/agent-api-error-responses-and-error-models', 'Agent API Error Responses and Error Models'],
  ['agent_execution_sources', 'ai/agent-api-authentication-schemes-and-bearer-tokens', 'Agent API Authentication Schemes and Bearer Tokens'],
  ['agent_execution_sources', 'ai/agent-run-heartbeats-and-lease-renewal', 'Agent Run Heartbeats and Lease Renewal'],
  ['agent_execution_sources', 'ai/agent-workspace-filesystem-and-path-context', 'Agent Workspace Filesystem and Path Context'],
  ['agent_execution_sources', 'ai/agent-terminal-output-and-exit-status', 'Agent Terminal Output and Exit Status'],

  ['agent_rag', 'ai/advanced-rag-techniques', 'Advanced RAG: From Naive Retrieval to Agentic RAG'],
  ['agent_rag', 'ai/rag', 'Retrieval-Augmented Generation (RAG)'],
  ['agent_rag', 'ai/rag-evaluation', 'RAG Evaluation'],
  ['agent_rag', 'ai/hybrid-retrieval-and-reranking', 'Hybrid Retrieval and Reranking'],
  ['agent_rag', 'ai/rag-chunking-and-context-window-management', 'RAG Chunking and Context Window Management'],
  ['agent_rag', 'ai/retrieval-query-rewriting', 'Retrieval Query Rewriting'],
  ['agent_rag', 'ai/rag-hypothetical-document-embeddings-hyde', 'RAG Hypothetical Document Embeddings HyDE'],
  ['agent_rag', 'ai/embedding-model-selection-and-vector-distance', 'Embedding Model Selection and Vector Distance'],
  ['agent_rag', 'ai/dense-retrieval-bi-encoders-and-dual-encoders', 'Dense Retrieval, Bi-Encoders, and Dual Encoders'],
  ['agent_rag', 'ai/retrieval-metadata-filtering', 'Retrieval Metadata Filtering'],
  ['agent_rag', 'ai/retrieval-indexing-and-document-parsing', 'Retrieval Indexing and Document Parsing'],
  ['agent_rag', 'ai/sparse-retrieval-and-bm25', 'Sparse Retrieval and BM25'],
  ['agent_rag', 'ai/retrieval-sparse-vectors-and-learned-sparse-retrieval', 'Retrieval Sparse Vectors and Learned Sparse Retrieval'],
  ['agent_rag', 'ai/reciprocal-rank-fusion', 'Reciprocal Rank Fusion'],
  ['agent_rag', 'ai/hnsw-vector-indexing', 'HNSW Vector Indexing'],
  ['agent_rag', 'ai/rag-citation-and-source-attribution', 'RAG Citation and Source Attribution'],
  ['agent_rag', 'ai/retrieval-caching-and-semantic-cache', 'Retrieval Caching and Semantic Cache'],
  ['agent_rag', 'ai/rag-query-routing', 'RAG Query Routing'],
  ['agent_rag', 'ai/rag-contextual-compression', 'RAG Contextual Compression'],
  ['agent_rag', 'ai/rag-query-decomposition', 'RAG Query Decomposition'],
  ['agent_rag', 'ai/rag-index-freshness-and-reindexing', 'RAG Index Freshness and Reindexing'],
  ['agent_rag', 'ai/rag-result-diversity-and-mmr', 'RAG Result Diversity and MMR'],
  ['agent_rag', 'ai/embedding-model-upgrades-and-reindexing-risk', 'Embedding Model Upgrades and Reindexing Risk'],
  ['agent_rag', 'ai/vector-index-quantization-for-retrieval', 'Vector Index Quantization for Retrieval'],
  ['agent_rag', 'ai/vector-index-parameters-and-recall-latency-tuning', 'Vector Index Parameters and Recall-Latency Tuning'],
  ['agent_rag', 'ai/cross-encoder-reranking-for-retrieval', 'Cross-Encoder Reranking for Retrieval'],
  ['agent_rag', 'ai/retrieval-access-control-and-permission-filtering', 'Retrieval Access Control and Permission Filtering'],
  ['agent_rag', 'ai/retrieval-payload-indexes-and-filter-performance', 'Retrieval metadata indexes and filter performance'],
  ['agent_rag', 'ai/retrieval-score-thresholds-and-no-answer-fallbacks', 'Vector retrieval thresholds and low-evidence fallback'],
  ['agent_rag', 'ai/retrieval-inverted-index-analyzers-and-token-filters', 'Retrieval Inverted Index Analyzers and Token Filters'],
  ['agent_rag', 'ai/vector-index-sharding-and-replication', 'Vector Index Sharding and Replication'],
  ['agent_rag', 'ai/retrieval-query-logs-and-search-observability', 'Retrieval Query Logs and Search Observability'],
  ['agent_rag', 'ai/retrieval-feedback-signals-and-click-logs', 'Retrieval Feedback Signals and Click Logs'],
  ['agent_rag', 'ai/rag-index-evaluation-with-recall-at-k', 'RAG Index Evaluation with Recall@k'],
  ['agent_rag', 'ai/retrieval-embedding-drift-and-index-quality', 'Retrieval Embedding Drift and Index Quality'],
  ['agent_rag', 'ai/rag-answer-grounding-and-citation-coverage', 'RAG Answer Grounding and Citation Coverage'],
  ['agent_rag', 'ai/retrieval-metadata-schema-and-facets', 'Retrieval Metadata Schema and Facets'],
  ['agent_rag', 'ai/rag-context-window-packing-and-token-budgets', 'RAG Context Window Packing and Token Budgets'],
  ['agent_rag', 'ai/retrieval-query-expansion-and-synonyms', 'Retrieval Query Expansion and Synonyms'],
  ['agent_rag', 'ai/retrieval-evaluation-with-ndcg-and-mrr', 'Retrieval Evaluation with nDCG and MRR'],
  ['agent_rag', 'ai/retrieval-result-deduplication-and-collapsing', 'Retrieval Result Deduplication and Collapsing'],
  ['agent_rag', 'ai/retrieval-snippets-and-highlighted-evidence', 'Retrieval Snippets and Highlighted Evidence'],
  ['agent_rag', 'ai/retrieval-score-normalization-and-fusion', 'Retrieval Normalization and Fusion'],
  ['agent_rag', 'ai/retrieval-parent-document-and-small-to-big-indexing', 'Retrieval Parent Document and Small-to-Big Indexing'],
  ['agent_rag', 'ai/retrieval-late-interaction-and-colbert', 'Retrieval Late Interaction and ColBERT'],
  ['agent_rag', 'ai/retrieval-multivector-indexing', 'Retrieval Multivector Indexing'],
  ['agent_rag', 'ai/retrieval-index-aliases-and-zero-downtime-reindexing', 'Retrieval Index Aliases and Zero-Downtime Reindexing'],
  ['agent_rag', 'ai/retrieval-federated-search-and-source-routing', 'Retrieval Federated Search and Source Routing'],
  ['agent_rag', 'ai/retrieval-passage-boundaries-and-overlap-windows', 'Retrieval Passage Boundaries and Overlap Windows'],
  ['agent_rag', 'ai/retrieval-evidence-ids-and-citation-stability', 'Retrieval Evidence IDs and Citation Stability'],
  ['agent_rag', 'ai/rag-connector-sync-state-and-document-loaders', 'RAG Connector Sync State and Document Loaders'],
  ['agent_rag', 'ai/retrieval-relevance-judgments-and-qrels', 'Retrieval Relevance Judgments and Qrels'],
  ['agent_rag', 'ai/rag-ocr-and-layout-aware-document-parsing', 'RAG OCR and Layout-Aware Document Parsing'],
  ['agent_rag', 'ai/rag-vector-store-snapshots-and-recovery', 'RAG Vector Store Snapshots and Recovery'],
  ['agent_rag', 'ai/rag-document-deletion-and-tombstone-handling', 'RAG Document Deletion and Tombstone Handling'],
  ['agent_rag', 'ai/rag-metadata-enrichment-and-entity-extraction', 'RAG Metadata Enrichment and Entity Extraction'],
  ['agent_rag', 'ai/rag-metadata-filters-and-filterable-vector-search', 'RAG Metadata Filters and Filterable Vector Search'],
  ['agent_rag', 'ai/rag-query-rewriting-and-expansion', 'RAG Query Rewriting and Expansion'],
  ['agent_rag', 'ai/rag-citation-spans-and-source-attribution', 'RAG Citation Spans and Source Attribution'],
  ['agent_rag', 'ai/rag-embedding-dimensions-and-index-compatibility', 'RAG Embedding Dimensions and Index Compatibility'],
  ['agent_rag', 'ai/rag-chunking-strategies-and-token-aware-splitting', 'RAG Chunking Strategies and Token-Aware Splitting'],
  ['agent_rag', 'ai/rag-reranker-score-calibration-and-thresholds', 'RAG reranker ranks documents according to relevance to a query'],
  ['agent_rag', 'ai/rag-long-context-reordering-and-lost-in-the-middle', 'RAG long-context reordering lost in the middle position bias'],
  ['agent_rag', 'ai/rag-incremental-indexing-and-vector-upserts', 'RAG Incremental Indexing and Vector Upserts'],
  ['agent_rag', 'ai/vector-store-namespaces-and-tenant-isolation', 'Vector Store Namespaces and Tenant Isolation'],
  ['agent_rag', 'ai/graphrag', 'GraphRAG'],
  ['agent_rag', 'ai/vector-databases', 'Vector Databases: Approximate Nearest Neighbor Search, Embedding Storage, and Retrieval at Scale'],
  ['agent_rag', 'ai/multimodal-search', 'Multimodal Search: Cross-Modal Retrieval, Product Search, and Multimodal Embeddings'],
  ['agent_rag', 'ai/semantic-web-ontology', 'Semantic Web and Ontologies: Knowledge Representation, OWL Reasoning, and Linked Data'],
  ['agent_rag', 'ai/graph-neural-networks', 'Graph Neural Networks: Message Passing and Applications'],
  ['agent_rag', 'ai/information-extraction', 'Information Extraction: NER, Relation Extraction, and LLM-Powered IE'],
  ['agent_rag', 'ai/knowledge-distillation', 'Knowledge Distillation'],
  ['agent_rag', 'ai/neurosymbolic-ai', 'Neuro-Symbolic AI: Bridging Learning and Reasoning'],

  ['api_mcp', 'ai/mcp', 'Model Context Protocol (MCP)'],
  ['api_mcp', 'ai/ai-tool-use-and-function-calling', 'AI Tool Use and Function Calling'],
  ['api_mcp', 'ai/agent-memory-and-session-state', 'Agent Memory and Session State'],
  ['api_mcp', 'ai/agent-observability-and-tracing', 'Agent Observability and Tracing'],
  ['api_mcp', 'ai/agent-planning-and-task-decomposition', 'Agent Planning and Task Decomposition'],
  ['api_mcp', 'ai/agent-tool-schema-validation', 'Agent Tool Schema Validation'],
  ['api_mcp', 'ai/agent-tool-authorization-and-permissions', 'Agent Tool Authorization and Permissions'],
  ['api_mcp', 'ai/agent-human-in-the-loop-approval', 'Agent Human-in-the-Loop Approval'],
  ['api_mcp', 'ai/agent-runtime-sandboxing', 'Agent Runtime Sandboxing'],
  ['api_mcp', 'ai/agent-tool-result-provenance', 'Agent Tool Result Provenance'],
  ['api_mcp', 'ai/agent-tool-retry-and-idempotency', 'Agent Tool Retry and Idempotency'],
  ['api_mcp', 'ai/agent-durable-execution', 'Agent Durable Execution'],
  ['api_mcp', 'ai/agent-task-queues-and-background-jobs', 'Agent Task Queues and Background Jobs'],
  ['api_mcp', 'ai/agent-tool-rate-limits-and-quotas', 'Agent Tool Rate Limits and Quotas'],
  ['api_mcp', 'ai/browser-automation-for-agents', 'Browser Automation for Agents'],
  ['api_mcp', 'ai/browser-devtools-protocol-for-agents', 'Browser DevTools Protocol for Agents'],
  ['api_mcp', 'ai/tool-call-streaming-and-incremental-results', 'Tool Call Streaming and Incremental Results'],
  ['api_mcp', 'ai/agent-checkpointing-and-resumable-workflows', 'Agent Checkpointing and Resumable Workflows'],
  ['api_mcp', 'ai/agent-state-machines-and-workflow-graphs', 'Agent State Machines and Workflow Graphs'],
  ['api_mcp', 'ai/agent-token-budgeting-and-context-accounting', 'Agent Token Budgeting and Context Accounting'],
  ['api_mcp', 'ai/agent-context-compaction-and-summarization', 'Agent context compaction by summarizing earlier messages'],
  ['api_mcp', 'ai/agent-tool-timeouts-and-cancellation', 'Agent Tool Timeouts and Cancellation'],
  ['api_mcp', 'ai/mcp-resources-and-prompts', 'MCP Resources and Prompts'],
  ['api_mcp', 'computer-science/openapi-for-agent-tools', 'OpenAPI for Agent Tools'],
  ['api_mcp', 'computer-science/openapi-operation-ids-and-links-for-agent-navigation', 'OpenAPI Operation IDs and Links for Agent Navigation'],
  ['api_mcp', 'computer-science/openapi-security-schemes-and-oauth-scopes-for-agents', 'OpenAPI Security Schemes and OAuth Scopes for Agents'],
  ['api_mcp', 'computer-science/openapi-examples-and-schema-examples-for-agents', 'OpenAPI Examples and Schema Examples for Agents'],
  ['api_mcp', 'computer-science/graphql-introspection-for-agent-tools', 'GraphQL Introspection for Agent Tools'],
  ['api_mcp', 'ai/ai-agents', 'AI Agents: Tool-Using Model Systems'],
  ['api_mcp', 'ai/agentic-ai', 'Agentic AI: Autonomous Agent Architectures, Planning, and Tool-Integrated Reasoning'],
  ['api_mcp', 'ai/ai-agent-frameworks', 'AI Agent Frameworks: LangChain, AutoGen, and CrewAI'],
  ['api_mcp', 'ai/ai-personal-assistants', 'AI Personal Assistants: Tool Use, Memory Boundaries, and Safe Task Automation'],
  ['api_mcp', 'ai/ai-customer-service', 'AI for Customer Service: Conversational Agents, Retrieval Grounding, and Agent Assist'],
  ['api_mcp', 'ai/ai-team-collaboration', 'AI for Team Collaboration: Meeting Recaps, Shared Context, and Knowledge Workflows'],
  ['api_mcp', 'ai/ai-remote-work', 'AI for Remote Work: Meeting Recaps, Workspace Search, and Async Coordination'],
  ['api_mcp', 'ai/ai-coding-assistants', 'AI Coding Assistants: Copilot, SWE-bench, and Agentic Tools'],
  ['api_mcp', 'ai/ai-static-analysis', 'AI for Static Analysis: Automated Bug Detection, Code Review, and Vulnerability Scanning'],

  ['security_governance', 'ai/ai-red-teaming-and-safety', 'AI Red Teaming: Security Testing for Language Models'],
  ['security_governance', 'ai/prompt-injection-defenses-for-tool-using-agents', 'Prompt Injection Defenses for Tool-Using Agents'],
  ['security_governance', 'ai/agent-secret-management-and-credential-isolation', 'Agent Secret Management and Credential Isolation'],
  ['security_governance', 'ai/agent-secret-scanning-and-output-redaction', 'Agent Secret Scanning and Output Redaction'],
  ['security_governance', 'ai/agent-tool-risk-annotations-and-approval-boundaries', 'Agent Tool Risk Annotations and Approval Boundaries'],
  ['security_governance', 'computer-science/oauth-scopes-for-agent-tools', 'OAuth Scopes for Agent Tools'],
  ['security_governance', 'computer-science/repository-permissions-and-code-agent-access', 'Repository Permissions and Code Agent Access'],
  ['security_governance', 'ai/ai-governance-and-policy', 'AI Governance: Risk Frameworks, Audits, and International Cooperation'],
  ['security_governance', 'ai/ai-in-cybersecurity', 'AI in Cybersecurity: Threat Detection and LLM-Powered Defense'],
  ['security_governance', 'ai/ai-for-network-security', 'AI for Network Security: Intelligent Firewalls, DDoS Mitigation, and Zero-Trust Architectures'],
  ['security_governance', 'ai/adversarial-machine-learning', 'Adversarial Machine Learning'],
  ['security_governance', 'ai/ai-content-moderation-platforms', 'AI Content Moderation Platforms: Large-Scale Safety Systems, Policy Engines, and Multilingual Review'],
  ['security_governance', 'ai/ai-content-authenticity', 'AI Content Authenticity: Watermarking and Detection'],
  ['security_governance', 'ai/ai-identity-verification', 'AI Identity Verification: Document Authentication, Liveness Detection, and KYC Compliance'],
  ['security_governance', 'ai/ai-smart-contract-audit', 'AI Smart Contract Auditing: Vulnerability Detection, Formal Verification, and Blockchain Security'],
  ['security_governance', 'ai/ai-for-fraud-detection', 'AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime'],

  ['data_infrastructure', 'ai/data-centric-ai', 'Data-Centric AI: The Systematic Engineering of Training Data'],
  ['data_infrastructure', 'ai/data-governance', 'AI Data Governance: Metadata Management, Data Catalogs, and AI-Ready Data Quality'],
  ['data_infrastructure', 'computer-science/data-catalogs-and-metadata-lineage', 'Data Catalogs and Metadata Lineage'],
  ['data_infrastructure', 'computer-science/data-mesh-domain-ownership-and-data-products', 'Data Mesh Domain Ownership and Data Products'],
  ['data_infrastructure', 'computer-science/lakehouse-table-formats', 'Lakehouse Table Formats'],
  ['data_infrastructure', 'computer-science/schema-evolution-for-data-pipelines', 'Schema Evolution for Data Pipelines'],
  ['data_infrastructure', 'computer-science/data-quality-validation-for-ml-pipelines', 'Data Quality Validation for ML Pipelines'],
  ['data_infrastructure', 'computer-science/data-contracts-for-pipelines', 'Data Contracts for Pipelines'],
  ['data_infrastructure', 'computer-science/data-pipeline-orchestration', 'Data Pipeline Orchestration'],
  ['data_infrastructure', 'computer-science/data-airflow-datasets-and-data-aware-scheduling', 'Data Airflow Datasets and Data-Aware Scheduling'],
  ['data_infrastructure', 'computer-science/data-airflow-deferrable-operators-and-triggerer', 'Data Airflow Deferrable Operators and Triggerer'],
  ['data_infrastructure', 'computer-science/data-backfills-and-replay-pipelines', 'Data Backfills and Replay Pipelines'],
  ['data_infrastructure', 'computer-science/data-retention-and-ttl-policies', 'Data Retention and TTL Policies'],
  ['data_infrastructure', 'computer-science/data-partitioning-and-clustering', 'Data Partitioning and Clustering'],
  ['data_infrastructure', 'computer-science/data-partition-pruning-and-query-scanning', 'Data Partition Pruning and Query Scanning'],
  ['data_infrastructure', 'computer-science/data-column-pruning-and-file-statistics', 'Data Column Pruning and File Statistics'],
  ['data_infrastructure', 'computer-science/data-delta-lake-transaction-log-and-checkpoints', 'Data Delta Lake Transaction Log and Checkpoints'],
  ['data_infrastructure', 'computer-science/data-hudi-timeline-and-incremental-queries', 'Data Hudi Timeline and Incremental Queries'],
  ['data_infrastructure', 'computer-science/data-deduplication-and-entity-resolution', 'Data Deduplication and Entity Resolution'],
  ['data_infrastructure', 'computer-science/schema-drift-and-data-observability', 'Schema Drift and Data Observability'],
  ['data_infrastructure', 'computer-science/data-freshness-and-slas', 'Data Freshness and SLAs'],
  ['data_infrastructure', 'computer-science/schema-registry-for-event-streaming', 'Schema Registry for Event Streaming'],
  ['data_infrastructure', 'computer-science/openlineage-for-data-pipelines', 'OpenLineage for Data Pipelines'],
  ['data_infrastructure', 'computer-science/debezium-change-data-capture-for-pipelines', 'Debezium Change Data Capture for Pipelines'],
  ['data_infrastructure', 'computer-science/streaming-watermarks-and-late-data', 'Streaming Watermarks and Late Data'],
  ['data_infrastructure', 'computer-science/feature-stores-for-ml-pipelines', 'Feature Stores for ML Pipelines'],
  ['data_infrastructure', 'computer-science/data-lake-object-storage-layouts', 'Data Lake Object Storage Layouts'],
  ['data_infrastructure', 'computer-science/data-pipeline-checkpointing-and-exactly-once-semantics', 'Data Pipeline Checkpointing and Exactly-Once Semantics'],
  ['data_infrastructure', 'computer-science/data-lake-compaction-and-small-files', 'Data Lake Compaction and Small Files'],
  ['data_infrastructure', 'computer-science/data-warehouse-query-history-and-job-metadata', 'Data Warehouse Query History and Job Metadata'],
  ['data_infrastructure', 'computer-science/data-sensitive-data-discovery-and-classification', 'Data Sensitive Data Discovery and Classification'],
  ['data_infrastructure', 'computer-science/data-warehouse-partition-pruning-and-clustering', 'Data Warehouse Partition Pruning and Clustering'],
  ['data_infrastructure', 'computer-science/data-materialized-view-refresh-and-staleness', 'Data Materialized View Refresh and Staleness'],
  ['data_infrastructure', 'computer-science/data-incremental-models-and-stateful-transforms', 'Data Incremental Models and Stateful Transforms'],
  ['data_infrastructure', 'computer-science/data-column-level-lineage-and-impact-analysis', 'Data Column-Level Lineage and Impact Analysis'],
  ['data_infrastructure', 'computer-science/data-time-travel-and-snapshot-isolation', 'Data Time Travel and Snapshot Isolation'],
  ['data_infrastructure', 'computer-science/data-iceberg-metadata-tables-and-manifests', 'Data Iceberg Metadata Tables and Manifests'],
  ['data_infrastructure', 'computer-science/data-iceberg-partition-evolution-and-hidden-partitioning', 'Data Iceberg Partition Evolution and Hidden Partitioning'],
  ['data_infrastructure', 'computer-science/data-iceberg-snapshot-expiration-and-orphan-files', 'Data Iceberg Snapshot Expiration and Orphan Files'],
  ['data_infrastructure', 'computer-science/data-change-data-feed-and-incremental-table-reads', 'Data Change Data Feed and Incremental Table Reads'],
  ['data_infrastructure', 'computer-science/data-outbox-pattern-and-change-publishing', 'Data Outbox Pattern and Change Publishing'],
  ['data_infrastructure', 'computer-science/data-table-maintenance-vacuum-and-retention', 'Data Table Maintenance, Vacuum, and Retention'],
  ['data_infrastructure', 'computer-science/data-orchestration-assets-and-event-driven-schedules', 'Data Orchestration Assets and Event-Driven Schedules'],
  ['data_infrastructure', 'computer-science/data-cdc-lag-and-replication-slots', 'Data CDC Lag and Replication Slots'],
  ['data_infrastructure', 'computer-science/data-semantic-layer-and-metrics-definitions', 'Data Semantic Layer and Metrics Definitions'],
  ['data_infrastructure', 'computer-science/data-row-level-security-and-policy-tags', 'Data Row-Level Security and Policy Tags'],
  ['data_infrastructure', 'computer-science/data-policy-tags-and-sensitive-column-governance', 'Data Policy Tags and Sensitive Column Governance'],
  ['data_infrastructure', 'computer-science/data-column-masking-and-dynamic-data-masking', 'Data Column Masking and Dynamic Data Masking'],
  ['data_infrastructure', 'computer-science/data-quality-expectations-and-validation-rules', 'Data Quality Expectations and Validation Rules'],
  ['data_infrastructure', 'computer-science/data-contracts-and-schema-evolution', 'Data Contracts and Schema Evolution'],
  ['data_infrastructure', 'computer-science/data-freshness-slas-and-lateness-windows', 'Data Freshness SLAs and Lateness Windows'],
  ['data_infrastructure', 'computer-science/data-observability-anomaly-detection-and-incidents', 'Data Observability, Anomaly Detection, and Incidents'],
  ['data_infrastructure', 'computer-science/data-profiling-and-column-statistics', 'Data Profiling and Column Statistics'],
  ['data_infrastructure', 'computer-science/data-access-audit-logs-and-query-history', 'Data Access Audit Logs and Query History'],
  ['data_infrastructure', 'computer-science/data-dbt-source-freshness-and-sources-json', 'Data dbt Source Freshness and sources.json'],
  ['data_infrastructure', 'ai/data-preprocessing', 'Data Preprocessing'],
  ['data_infrastructure', 'ai/ai-for-data-curation', 'AI for Data Curation: Web-Scale Filtering, Deduplication, and Quality Scoring for LLM Training'],
  ['data_infrastructure', 'ai/ai-training-data-curation', 'AI Training Data Curation: Quality at Scale'],
  ['data_infrastructure', 'ai/synthetic-data-training', 'Synthetic Data in AI Training'],
  ['data_infrastructure', 'ai/ai-for-tabular-data', 'AI for Tabular Data: Synthetic Generation, Diffusion Models, and Privacy-Preserving Structured Data'],
  ['data_infrastructure', 'ai/learned-database-systems', 'Learned Database Systems: AI-Driven Query Optimization, Learned Indexes, and Cardinality Estimation'],
  ['data_infrastructure', 'ai/text-to-sql', 'Text-to-SQL: Natural Language Database Querying with Large Language Models'],
  ['data_infrastructure', 'ai/federated-learning', 'Federated Learning'],

  ['llm_evaluation', 'ai/ai-benchmarks-and-evaluation', 'AI Benchmarks: MMLU, SWE-bench, and How We Measure Intelligence'],
  ['llm_evaluation', 'ai/llm-as-judge-evaluation', 'LLM-as-Judge Evaluation'],
  ['llm_evaluation', 'ai/llm-evaluation-judge-bias-and-randomization', 'LLM Evaluation Judge Bias and Randomization'],
  ['llm_evaluation', 'ai/agent-benchmarks', 'Agent Benchmarks'],
  ['llm_evaluation', 'ai/evaluation-datasets-and-golden-tests-for-llms', 'Evaluation Datasets and Golden Tests for LLMs'],
  ['llm_evaluation', 'ai/evaluation-rubrics-and-grader-design', 'Evaluation Rubrics and Grader Design'],
  ['llm_evaluation', 'ai/llm-evaluation-assertions-and-test-cases', 'LLM Evaluation Assertions and Test Cases'],
  ['llm_evaluation', 'ai/code-generation-evaluation-pass-at-k', 'Code Generation Evaluation with pass@k'],
  ['llm_evaluation', 'ai/ml-experiment-tracking', 'ML Experiment Tracking'],
  ['llm_evaluation', 'ai/online-llm-evaluation-and-feedback-loops', 'Online LLM Evaluation and Feedback Loops'],
  ['llm_evaluation', 'ai/rag-groundedness-and-faithfulness-evaluation', 'RAG Groundedness and Faithfulness Evaluation'],
  ['llm_evaluation', 'ai/llm-regression-testing', 'LLM Regression Testing'],
  ['llm_evaluation', 'ai/pairwise-llm-evaluation', 'Pairwise LLM Evaluation'],
  ['llm_evaluation', 'ai/human-feedback-and-annotation-queues-for-llms', 'Human Feedback and Annotation Queues for LLMs'],
  ['llm_evaluation', 'ai/prompt-versioning-and-evaluation-traces', 'Prompt Versioning and Evaluation Traces'],
  ['llm_evaluation', 'ai/llm-cost-and-latency-evaluation', 'LLM Cost and Latency Evaluation'],
  ['llm_evaluation', 'ai/llm-sampling-parameters-in-evaluation', 'LLM Sampling Parameters in Evaluation'],
  ['llm_evaluation', 'ai/llm-evaluation-dataset-versioning', 'LLM Evaluation Dataset Versioning'],
  ['llm_evaluation', 'ai/agent-evaluation-harnesses-and-test-runs', 'Agent Evaluation Harnesses and Test Runs'],
  ['llm_evaluation', 'ai/llm-evaluation-inter-annotator-agreement', 'LLM Evaluation Inter-Annotator Agreement'],
  ['llm_evaluation', 'ai/evaluation-sampling-and-confidence-intervals', 'Evaluation Sampling and Confidence Intervals'],
  ['llm_evaluation', 'ai/llm-evaluation-statistical-power-and-minimum-detectable-effects', 'LLM Evaluation Statistical Power and Minimum Detectable Effects'],
  ['llm_evaluation', 'ai/llm-evaluation-ab-tests-and-online-experiments', 'LLM Evaluation A/B Tests and Online Experiments'],
  ['llm_evaluation', 'ai/llm-evaluation-run-metadata-and-reproducibility', 'LLM Evaluation Run Metadata and Reproducibility'],
  ['llm_evaluation', 'ai/llm-evaluation-calibration-and-thresholds', 'LLM Evaluation Calibration and Thresholds'],
  ['llm_evaluation', 'ai/llm-evaluation-production-canaries', 'LLM Evaluation Production Canaries'],
  ['llm_evaluation', 'ai/llm-safety-evaluation-and-policy-test-suites', 'LLM Safety Evaluation and Policy Test Suites'],
  ['llm_evaluation', 'ai/llm-evaluation-traces-and-feedback-labels', 'LLM Evaluation Traces and Feedback Labels'],
  ['llm_evaluation', 'ai/llm-evaluation-ci-gates-and-regression-alerts', 'LLM Evaluation CI Gates and Regression Alerts'],
  ['llm_evaluation', 'ai/llm-production-quality-monitoring-and-drift', 'LLM Production Quality Monitoring and Drift'],
  ['llm_evaluation', 'ai/llm-evaluation-golden-datasets-and-sampling', 'LLM Evaluation Golden Datasets and Sampling'],
  ['llm_evaluation', 'ai/llm-evaluation-error-taxonomy-and-failure-labels', 'LLM Evaluation Error Taxonomy and Failure Labels'],
  ['llm_evaluation', 'ai/llm-evaluation-prompt-versioning-and-experiment-tracking', 'LLM Evaluation Prompt Versioning and Experiment Tracking'],
  ['llm_evaluation', 'ai/llm-evaluation-human-review-and-adjudication', 'LLM Evaluation Human Review and Adjudication'],
  ['llm_evaluation', 'ai/llm-evaluation-judge-prompt-rubrics-and-scorecards', 'LLM Evaluation Judge Prompt Rubrics and Scorecards'],
  ['llm_evaluation', 'ai/llm-evaluation-structured-output-validity', 'LLM Evaluation Structured Output Validity'],
  ['llm_evaluation', 'ai/llm-evaluation-dataset-cards-and-metadata', 'LLM Evaluation Dataset Cards and Metadata'],
  ['llm_evaluation', 'ai/llm-evaluation-refusal-and-overrefusal-testing', 'LLM Evaluation Refusal and Overrefusal Testing'],
  ['llm_evaluation', 'ai/llm-evaluation-multilingual-and-localization-tests', 'LLM Evaluation Multilingual and Localization Tests'],
  ['llm_evaluation', 'ai/llm-evaluation-privacy-and-pii-leakage-tests', 'LLM Evaluation Privacy and PII Leakage Tests'],
  ['llm_evaluation', 'ai/llm-evaluation-hallucination-and-factuality-benchmarks', 'LLM Evaluation Hallucination and Factuality Benchmarks'],
  ['llm_evaluation', 'ai/llm-evaluation-rubrics-and-grading-schemas', 'LLM Evaluation Rubrics and Grading Schemas'],
  ['llm_evaluation', 'ai/llm-evaluation-golden-datasets-and-regression-tests', 'LLM Evaluation Golden Datasets and Regression Tests'],
  ['llm_evaluation', 'ai/llm-evaluation-metric-templates-and-scorecards', 'LLM Evaluation Metric Templates and Scorecards'],
  ['llm_evaluation', 'ai/agent-trajectory-evaluation-and-step-level-traces', 'Agent trajectory evaluation sequence of messages and tool calls'],
  ['llm_evaluation', 'ai/llm-evaluation-benchmark-harnesses-and-task-registries', 'LLM Evaluation Benchmark Harnesses and Task Registries'],
  ['llm_evaluation', 'ai/llm-red-teaming-and-adversarial-evaluation', 'LLM Red Teaming and Adversarial Evaluation'],
  ['llm_evaluation', 'ai/agent-tool-use-evaluation', 'Agent Tool Use Evaluation'],
  ['llm_evaluation', 'ai/llm-evaluation-tool-call-accuracy-and-argument-validation', 'LLM Evaluation Tool-Call Accuracy and Argument Validation'],
  ['llm_evaluation', 'ai/evaluation-data-contamination', 'Evaluation Data Contamination'],
  ['llm_evaluation', 'ai/model-evaluation-metrics', 'Model Evaluation Metrics'],
  ['llm_evaluation', 'ai/long-context-models', 'Long-Context Language Models: Memory, Retrieval, and Evaluation'],
  ['llm_evaluation', 'ai/reasoning-models', 'AI Reasoning Models: Test-Time Compute and RL Training'],
  ['llm_evaluation', 'ai/test-time-compute-scaling', 'Test-Time Compute Scaling: Spending More Inference on Harder Reasoning'],
  ['llm_evaluation', 'ai/program-synthesis-verification', 'Program Synthesis and Formal Verification: Neural Theorem Proving with LLMs'],
  ['llm_evaluation', 'ai/causal-inference-ai', 'Causal AI: From Correlation to Causation with do-Calculus'],
  ['llm_evaluation', 'ai/few-shot-learning', 'Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation'],
  ['llm_evaluation', 'ai/cognitive-architectures', 'Cognitive Architectures: ACT-R, Soar, and Computational Models of Human-Like Reasoning'],
  ['llm_evaluation', 'ai/language-modeling-theory', 'Language Modeling Theory: Prediction, Perplexity, and Scaling Laws'],

  ['llm_platform', 'ai/llms', 'Large Language Models (LLMs)'],
  ['llm_platform', 'ai/gpt-models', 'GPT (Generative Pre-trained Transformer) Model Family'],
  ['llm_platform', 'ai/large-language-model-training-scaling-laws-data-curation-and-compute', 'Large Language Model Training: Scaling Laws, Data Curation, and Compute'],
  ['llm_platform', 'ai/llm-inference-optimization', 'LLM Inference Optimization: From FlashAttention to Speculative Decoding'],
  ['llm_platform', 'ai/mlops-llmops', 'MLOps and LLMOps: Production AI Engineering, Observability, and Platform Architecture'],
  ['llm_platform', 'ai/transformer', 'Transformer Architecture: Attention, Parallel Sequence Modeling, and LLM Foundations'],
  ['llm_platform', 'ai/transformer-architecture-variants', 'Transformer Variants: From Encoder-Decoder to State Space Models'],
  ['llm_platform', 'ai/attention-mechanisms-deep-dive', 'Attention Mechanisms: Scaled Dot-Product to FlashAttention'],
  ['llm_platform', 'ai/tokenization-in-nlp', 'Tokenization in NLP'],
  ['llm_platform', 'ai/prompt-engineering', 'Prompt Engineering and Chain-of-Thought Prompting'],

  ['llm_training', 'ai/post-training-alignment', 'Post-Training Alignment: RLHF, DPO, and Constitutional AI'],
  ['llm_training', 'ai/rlhf', 'Reinforcement Learning from Human Feedback (RLHF)'],
  ['llm_training', 'ai/parameter-efficient-fine-tuning', 'Parameter-Efficient Fine-Tuning for Language Models (PEFT)'],
  ['llm_training', 'ai/lora', 'LoRA (Low-Rank Adaptation)'],
  ['llm_training', 'ai/lora-low-rank-adaptation-of-large-language-models', 'LoRA: Low-Rank Adaptation of Large Language Models'],
  ['llm_training', 'ai/model-compression', 'Model Compression: Pruning, Quantization, and Distillation'],
  ['llm_training', 'ai/distributed-training-systems', 'Distributed Training: FSDP, DeepSpeed, and Scaling Laws'],
  ['llm_training', 'ai/activation-functions', 'Activation Functions in Neural Networks'],
  ['llm_training', 'ai/loss-functions', 'Loss Functions in Machine Learning'],
  ['llm_training', 'ai/backpropagation', 'Backpropagation: The Engine of Neural Network Learning'],

  ['developer_workflows', 'ai/ai-for-software-testing', 'AI for Software Testing: Automated Test Generation, Fuzzing, and Quality Assurance'],
  ['developer_workflows', 'ai/ai-code-translation', 'AI for Code Translation: Language Migration, Legacy Modernization, and Transpilation'],
  ['developer_workflows', 'ai/ai-document-understanding', 'AI Document Understanding: Layout Parsing, Structured Extraction, and Intelligent Document Processing'],
  ['developer_workflows', 'ai/ai-document-digitization', 'AI for Document Digitization: Historical Archives, Handwriting Recognition, and Mass Digitization'],
  ['developer_workflows', 'ai/ai-for-hyperautomation', 'AI for Hyperautomation: RPA, Process Mining, and Workflow Automation'],
  ['developer_workflows', 'ai/ai-for-legal', 'AI for Legal: Contract Analysis, Legal Reasoning, and Regulatory Compliance'],
  ['developer_workflows', 'ai/ai-ip-patents', 'AI for Intellectual Property: Patent Search, Prior Art Analysis, and Trademark Intelligence'],
  ['developer_workflows', 'ai/ai-call-center', 'AI for Call Centers: Speech Analytics, Agent Assist, and Quality Review'],
  ['developer_workflows', 'ai/ai-employee-experience', 'AI for Employee Experience: HRM Workflows, Learning Support, and Governance'],
  ['developer_workflows', 'ai/ai-for-iot', 'AI for the Internet of Things: Federated Learning, TinyML, and Intelligent Edge Devices'],
  ['developer_workflows', 'computer-science/api-pagination-and-rate-limits', 'API Pagination and Rate Limits'],
  ['developer_workflows', 'computer-science/api-versioning-and-deprecation', 'API Versioning and Deprecation'],
  ['developer_workflows', 'computer-science/api-error-models-and-problem-details', 'API Error Models and Problem Details'],
  ['developer_workflows', 'computer-science/api-schema-code-generation', 'API Schema Code Generation'],
  ['developer_workflows', 'computer-science/webhooks-and-event-driven-apis', 'Webhooks and Event-Driven APIs'],
  ['developer_workflows', 'computer-science/api-openapi-callbacks-and-webhook-definitions', 'API OpenAPI Callbacks and Webhook Definitions'],
  ['developer_workflows', 'computer-science/api-openapi-servers-and-environment-selection-for-agents', 'API OpenAPI Servers and Environment Selection for Agents'],
  ['developer_workflows', 'computer-science/asyncapi-and-event-api-schemas', 'AsyncAPI and Event API Schemas'],
  ['developer_workflows', 'computer-science/api-health-checks-and-readiness-probes', 'API Health Checks and Readiness Probes'],
  ['developer_workflows', 'computer-science/api-contract-testing-and-mock-servers', 'API Contract Testing and Mock Servers'],
  ['developer_workflows', 'computer-science/api-idempotency-keys', 'API Idempotency Keys'],
  ['developer_workflows', 'computer-science/distributed-tracing-and-correlation-context', 'Distributed Tracing and Correlation Context'],
  ['developer_workflows', 'computer-science/runtime-feature-detection-and-compatibility', 'Runtime Feature Detection and Compatibility'],
  ['developer_workflows', 'computer-science/api-pagination-cursors-and-continuation-tokens', 'API Pagination Cursors and Continuation Tokens'],
  ['developer_workflows', 'computer-science/open-telemetry-semantic-conventions', 'OpenTelemetry Semantic Conventions'],
  ['developer_workflows', 'computer-science/api-webhook-signature-verification', 'API Webhook Signature Verification'],
  ['developer_workflows', 'computer-science/api-oauth-token-introspection', 'API OAuth Token Introspection'],
  ['developer_workflows', 'computer-science/api-openapi-breaking-change-detection', 'API OpenAPI Breaking Change Detection'],
  ['developer_workflows', 'computer-science/api-grpc-reflection-and-protobuf-schemas', 'API gRPC Reflection and Protobuf Schemas'],
  ['developer_workflows', 'computer-science/api-http-caching-etags-and-conditional-requests', 'API HTTP Caching, ETags, and Conditional Requests'],
  ['developer_workflows', 'computer-science/api-json-schema-validation-and-compatibility', 'API JSON Schema Validation and Compatibility'],
  ['developer_workflows', 'computer-science/api-cors-preflight-and-origin-policies', 'API CORS Preflight and Origin Policies'],
  ['developer_workflows', 'computer-science/api-sunset-and-deprecation-headers', 'API Sunset and Deprecation Headers'],
  ['developer_workflows', 'computer-science/api-scim-user-provisioning', 'API SCIM User Provisioning'],
  ['developer_workflows', 'computer-science/api-webhook-delivery-idempotency-and-replay', 'API Webhook Delivery Idempotency and Replay'],
  ['developer_workflows', 'computer-science/api-oidc-discovery-and-jwks', 'API OIDC Discovery and JWKS'],
  ['developer_workflows', 'computer-science/api-mutual-tls-client-certificate-authentication', 'API Mutual TLS Client Certificate Authentication'],
  ['developer_workflows', 'computer-science/api-service-discovery-and-dns-srv-records', 'API Service Discovery and DNS SRV Records'],
  ['developer_workflows', 'computer-science/api-websocket-heartbeats-and-close-codes', 'API WebSocket Heartbeats and Close Codes'],
  ['developer_workflows', 'computer-science/api-multipart-upload-and-resumable-transfers', 'API Multipart Upload and Resumable Transfers'],
  ['developer_workflows', 'computer-science/api-oauth-device-authorization-flow', 'API OAuth Device Authorization Flow'],
  ['developer_workflows', 'computer-science/api-long-running-operations-and-polling', 'API Long-Running Operations and Polling'],
  ['developer_workflows', 'computer-science/api-batch-requests-and-bulk-operations', 'API Batch Requests and Bulk Operations'],
  ['developer_workflows', 'computer-science/api-server-sent-events-and-streaming-responses', 'API Server-Sent Events and Streaming Responses'],
  ['developer_workflows', 'computer-science/api-webhook-event-types-and-versioned-payloads', 'API Webhook Event Types and Versioned Payloads'],
  ['developer_workflows', 'computer-science/api-circuit-breakers-and-client-side-resilience', 'API Circuit Breakers and Client-Side Resilience'],
  ['developer_workflows', 'computer-science/api-delta-sync-and-change-tokens', 'API Delta Sync and Change Tokens'],
  ['developer_workflows', 'computer-science/api-field-masks-and-partial-response', 'API Field Masks and Partial Response'],
  ['developer_workflows', 'ai/agent-api-pagination-cursors-and-page-tokens', 'Agent API Pagination, Cursors, and Page Tokens'],
  ['developer_workflows', 'computer-science/api-versioning-and-deprecation-policies', 'API Versioning and Deprecation Policies'],
  ['developer_workflows', 'computer-science/api-idempotency-keys-and-safe-retries', 'API Idempotency Keys and Safe Retries'],
  ['developer_workflows', 'computer-science/api-retry-backoff-and-client-rate-control', 'API Retry Backoff and Client Rate Control'],
  ['developer_workflows', 'computer-science/api-json-patch-and-merge-patch', 'API JSON Patch and Merge Patch'],
  ['developer_workflows', 'computer-science/dev-containers-and-reproducible-agent-workspaces', 'Dev Containers and Reproducible Agent Workspaces'],
  ['developer_workflows', 'computer-science/api-webhook-signature-verification-and-replay-protection', 'API Webhook Signature Verification and Replay Protection'],
  ['developer_workflows', 'computer-science/api-conditional-requests-etags-and-cache-validation', 'API Conditional Requests, ETags, and Cache Validation'],
  ['developer_workflows', 'computer-science/api-cors-preflight-and-browser-agent-requests', 'API CORS Preflight and Browser Agent Requests'],
  ['developer_workflows', 'computer-science/api-request-signing-and-hmac-authentication', 'API request signing HMAC HTTP message signatures'],
  ['developer_workflows', 'computer-science/api-resource-names-and-canonical-identifiers-for-agents', 'API Resource Names and Canonical Identifiers for Agents'],
  ['developer_workflows', 'computer-science/api-graphql-persisted-queries-and-operation-safelists', 'API GraphQL Persisted Queries and Operation Safelists'],
  ['developer_workflows', 'computer-science/api-graphql-operation-names-and-variables-for-agents', 'API GraphQL Operation Names and Variables for Agents'],
  ['developer_workflows', 'computer-science/api-openapi-discriminators-and-polymorphic-schemas', 'API OpenAPI Discriminators and Polymorphic Schemas'],
  ['developer_workflows', 'computer-science/accessibility-tree-and-aria-for-ui-agents', 'Accessibility Tree and ARIA for UI Agents'],
  ['developer_workflows', 'computer-science/dom-locators-and-accessible-names-for-ui-agents', 'DOM Locators and Accessible Names for UI Agents'],

  ['code_intelligence', 'computer-science/code-graphs-and-code-intelligence', 'Code Graphs and Code Intelligence'],
  ['code_intelligence', 'computer-science/program-symbols-definitions-and-references', 'Program Symbols, Definitions, and References'],
  ['code_intelligence', 'computer-science/abstract-syntax-trees-and-code-navigation', 'Abstract Syntax Trees and Code Navigation'],
  ['code_intelligence', 'computer-science/control-flow-and-data-flow-analysis', 'Control-Flow and Data-Flow Analysis'],
  ['code_intelligence', 'computer-science/call-graphs-and-impact-analysis', 'Call Graphs and Impact Analysis'],
  ['code_intelligence', 'computer-science/language-server-protocol-for-code-agents', 'Language Server Protocol for Code Agents'],
  ['code_intelligence', 'computer-science/code-language-server-hover-signature-and-completion-context', 'Code Language Server Hover, Signature, and Completion Context'],
  ['code_intelligence', 'computer-science/code-lsp-inlay-hints-and-code-lens', 'Code LSP Inlay Hints and Code Lens'],
  ['code_intelligence', 'computer-science/code-index-formats-lsif-and-scip', 'LSIF and SCIP code intelligence index formats'],
  ['code_intelligence', 'computer-science/software-bill-of-materials-and-dependency-graphs', 'Software Bill of Materials and Dependency Graphs'],
  ['code_intelligence', 'computer-science/package-lockfiles-and-reproducible-installs', 'Package Lockfiles and Reproducible Installs'],
  ['code_intelligence', 'computer-science/semantic-versioning-and-version-constraints', 'Semantic Versioning and Version Constraints'],
  ['code_intelligence', 'computer-science/tree-sitter-parsers-for-code-intelligence', 'Tree-sitter Parsers for Code Intelligence'],
  ['code_intelligence', 'computer-science/package-manager-workspaces-and-monorepo-dependencies', 'Package Manager Workspaces and Monorepo Dependencies'],
  ['code_intelligence', 'computer-science/package-dependency-resolution-for-code-agents', 'Package Dependency Resolution for Code Agents'],
  ['code_intelligence', 'computer-science/static-analysis-rules-and-codeql', 'Static Analysis Rules and CodeQL'],
  ['code_intelligence', 'computer-science/test-coverage-for-code-agents', 'Test Coverage for Code Agents'],
  ['code_intelligence', 'computer-science/code-junit-xml-test-reports-and-ci-failure-context', 'Code JUnit XML Test Reports and CI Failure Context'],
  ['code_intelligence', 'computer-science/mutation-testing-for-code-agents', 'Mutation Testing for Code Agents'],
  ['code_intelligence', 'computer-science/build-graphs-and-incremental-build-systems', 'Build Graphs and Incremental Build Systems'],
  ['code_intelligence', 'computer-science/source-maps-and-stack-trace-deobfuscation', 'Source Maps and Stack Trace Deobfuscation'],
  ['code_intelligence', 'computer-science/debug-symbols-and-symbolication-for-code-agents', 'Debug Symbols and Symbolication for Code Agents'],
  ['code_intelligence', 'computer-science/package-vulnerability-advisories-for-code-agents', 'Package Vulnerability Advisories for Code Agents'],
  ['code_intelligence', 'computer-science/code-search-indexing-and-trigram-search', 'Code Search Indexing and Trigram Search'],
  ['code_intelligence', 'computer-science/code-search-query-syntax-for-repository-agents', 'Code Search Query Syntax for Repository Agents'],
  ['code_intelligence', 'computer-science/language-server-protocol-diagnostics-and-code-actions', 'Language Server Protocol Diagnostics and Code Actions'],
  ['code_intelligence', 'computer-science/build-graph-and-affected-test-selection-for-code-agents', 'Build Graph and Affected Test Selection for Code Agents'],
  ['code_intelligence', 'computer-science/static-analysis-sarif-results-for-code-agents', 'Static Analysis SARIF Results for Code Agents'],
  ['code_intelligence', 'computer-science/code-ci-problem-matchers-and-annotations-for-agents', 'Code CI Problem Matchers and Annotations for Agents'],
  ['code_intelligence', 'computer-science/test-coverage-maps-for-code-agents', 'Test Coverage Maps for Code Agents'],
  ['code_intelligence', 'computer-science/code-codemods-and-ast-transforms-for-agents', 'Code Codemods and AST Transforms for Agents'],
  ['code_intelligence', 'computer-science/code-compile-commands-and-language-toolchains', 'Code Compile Commands and Language Toolchains'],
  ['code_intelligence', 'computer-science/code-debug-adapter-protocol-for-agents', 'Code Debug Adapter Protocol for Agents'],
  ['code_intelligence', 'computer-science/code-semantic-tokens-and-symbol-classification', 'Code Semantic Tokens and Symbol Classification'],
  ['code_intelligence', 'computer-science/lsp-rename-and-workspace-edits-for-code-agents', 'LSP Rename and Workspace Edits for Code Agents'],
  ['code_intelligence', 'computer-science/code-unified-diffs-and-patch-application-for-agents', 'Code Unified Diffs and Patch Application for Agents'],
  ['code_intelligence', 'computer-science/code-git-blame-and-commit-history-for-agents', 'Code Git Blame and Commit History for Agents'],
  ['code_intelligence', 'computer-science/code-merge-conflicts-and-conflict-markers-for-agents', 'Code Merge Conflicts and Conflict Markers for Agents'],
  ['code_intelligence', 'computer-science/code-tree-sitter-incremental-parsing-for-agents', 'Code Tree-sitter Incremental Parsing for Agents'],
  ['code_intelligence', 'computer-science/code-static-analysis-rules-and-semgrep-patterns', 'Code Static Analysis Rules and Semgrep Patterns'],
  ['code_intelligence', 'computer-science/code-dependency-graphs-and-vulnerability-advisories', 'Code Dependency Graphs and Vulnerability Advisories'],
  ['code_intelligence', 'computer-science/code-sbom-and-software-supply-chain-inventory', 'Code SBOM and Software Supply Chain Inventory'],
  ['code_intelligence', 'computer-science/code-license-compliance-and-dependency-metadata', 'Code License Compliance and Dependency Metadata'],
  ['code_intelligence', 'computer-science/code-generated-files-and-vendored-code-detection', 'Code Generated Files and Vendored Code Detection'],
  ['code_intelligence', 'computer-science/code-search-pathspecs-and-ignore-files-for-agents', 'Code Search Pathspecs and Ignore Files for Agents'],

  ['retrieval_search', 'ai/ai-search-engines', 'AI-Powered Search: Perplexity, Google AI Overviews, and the Future'],
  ['retrieval_search', 'ai/ai-search-recommendation', 'AI for Search and Recommendation: Semantic Search, Collaborative Filtering, and Personalization Engines'],
  ['retrieval_search', 'ai/recommender-systems', 'Recommender Systems: Graph Neural Collaborative Filtering and LLM-Based Recommendation'],
  ['retrieval_search', 'ai/text-classification', 'Text Classification: Zero-Shot, Few-Shot, and LLM-Based Document Categorization'],
  ['retrieval_search', 'ai/text-summarization', 'Text Summarization: From Extractive Methods to Abstractive LLM-Based Summarization'],
  ['retrieval_search', 'ai/nlp-advanced-techniques', 'Advanced NLP: Tokenization, Embeddings, and Decoding'],
  ['retrieval_search', 'ai/bert', 'BERT (Bidirectional Encoder Representations from Transformers)'],
  ['retrieval_search', 'ai/machine-translation', 'Machine Translation: Neural MT, LLM-Based Translation, and Multilingual Quality at Scale'],
  ['retrieval_search', 'ai/ai-language-translation-interpretation', 'AI Language Translation and Interpretation: LLM-Based Translation, Simultaneous Interpretation, and Quality Estimation'],
  ['retrieval_search', 'ai/clip-contrastive-language-image-pre-training', 'CLIP: Contrastive Language-Image Pre-Training'],

  ['foundation_models', 'ai/multimodal-ai-vision-language-models-from-clip-to-gpt-4v', 'Multimodal AI: Vision-Language Models from CLIP to GPT-4V'],
  ['foundation_models', 'ai/ai-content-creation', 'AI for Content Creation: Generative Writing, Image Synthesis, and Video Workflows'],
  ['foundation_models', 'ai/ai-for-visualization', 'AI for Data Visualization'],
  ['foundation_models', 'ai/vision-transformers', 'Vision Transformers: ViT, Swin, and DINOv2'],
  ['foundation_models', 'ai/video-understanding', 'Video Understanding: Action Recognition, Temporal Action Detection, and Video-Language Models'],
  ['foundation_models', 'ai/visual-question-answering', 'Visual Question Answering: Vision-Language Models for Image Understanding and Reasoning'],
  ['foundation_models', 'ai/world-models-video-prediction', 'World Models: Video Prediction, Physical Reasoning, and Interactive AI'],
  ['foundation_models', 'ai/ai-for-science', 'AI for Science: AlphaFold and AI-Driven Discovery'],
  ['foundation_models', 'ai/ai-for-weather-forecasting', 'AI for Weather Forecasting: Data-Driven Numerical Weather Prediction and Nowcasting'],
  ['foundation_models', 'ai/ai-hardware-accelerators', 'AI Hardware: NVIDIA H100/B200, TPUs, and Cerebras']
].map(([category, expected_slug, query], index) => ({
  id: `core_${String(index + 1).padStart(3, '0')}`,
  category,
  expected_slug,
  query
}));

export const UNSUPPORTED_FALLBACK_QUERY = 'What is the live stock price of OpenAI today?';

const BLOCKED_QUALITY_REASONS = new Set([
  'generic_source_homepage',
  'placeholder_content',
  'broken_atomic_fact',
  'claim_evidence_weak',
  'missing_source_url',
  'missing_atomic_facts'
]);

const HIGH_RISK_UNSUPPORTED_CLAIM_PATTERN = /\b(?:price|pricing|market share|revenue|latest|today|currently|as of|announced|released)\b/i;

function ratio(part, total, digits = 4) {
  if (!total) return 0;
  return Number((Number(part || 0) / Number(total || 0)).toFixed(digits));
}

function articleBySlug(manifest, slug) {
  return (manifest?.articles || []).find(article => article?.canonical_slug === slug) || null;
}

function claimsForSlug(claimsPayload, slug) {
  return (claimsPayload?.claims || []).filter(claim => claim?.canonical_slug === slug);
}

function sourcesForSlug(sourcesPayload, slug) {
  return (sourcesPayload?.sources || []).filter(source =>
    (source?.articles || []).some(article => article?.canonical_slug === slug)
  );
}

function queryDefinitions(querySet = CORE_CORPUS_QUERIES) {
  return querySet.map((item, index) => ({
    id: item.id || `query_${String(index + 1).padStart(3, '0')}`,
    category: item.category || 'custom',
    expected_slug: item.expected_slug || item.slug || null,
    query: item.query || item.title || String(item.expected_slug || item.slug || '')
  }));
}

function hasExpectedSlug(payload, expectedSlug) {
  if (!expectedSlug) return true;
  const matchedSlugs = [
    ...(payload?.matched_articles || []).map(article => article?.canonical_slug),
    ...(payload?.evidence_packs || []).map(pack => pack?.canonical_slug),
    ...(payload?.packs || []).map(pack => pack?.canonical_slug)
  ].filter(Boolean);
  return matchedSlugs.includes(expectedSlug);
}

function firstSourceMappedCitationFromEvidence(payload) {
  for (const pack of payload?.packs || []) {
    for (const citation of pack?.citation_exports || []) {
      if (citation?.claim_id && citation?.source_url) return citation;
    }
  }
  return null;
}

function firstSourceMappedCitationFromContext(payload) {
  return (payload?.citation_ready_claims || []).find(citation =>
    citation?.claim_id && citation?.source_url
  ) || null;
}

function summarizeRows(rows) {
  const passed = rows.filter(row => row.ok).length;
  return {
    count: rows.length,
    passed,
    failed: rows.length - passed,
    pass_ratio: ratio(passed, rows.length)
  };
}

export function evaluateCoreCorpus({
  manifest,
  claimsPayload,
  sourcesPayload = null,
  querySet = CORE_CORPUS_QUERIES
} = {}) {
  const rows = queryDefinitions(querySet).map(query => {
    const article = articleBySlug(manifest, query.expected_slug);
    const claims = claimsForSlug(claimsPayload, query.expected_slug);
    const mappedSources = sourcesForSlug(sourcesPayload, query.expected_slug);
    const qualityReasons = article?.quality_reasons || [];
    const blockedReasons = qualityReasons.filter(reason => BLOCKED_QUALITY_REASONS.has(reason));
    const unsupportedClaimFlags = claims.filter(claim =>
      HIGH_RISK_UNSUPPORTED_CLAIM_PATTERN.test(claim?.statement || '')
      && !claim?.source_url
    );
    const verifiedSources = Number(article?.sources_verified ?? mappedSources.length ?? 0);
    const failures = [
      !article ? 'missing_public_article' : null,
      article && article.status !== 'public' ? `status_${article.status || 'unknown'}` : null,
      article && article.is_draft === true ? 'is_draft' : null,
      verifiedSources < 2 ? `verified_sources_${verifiedSources}_below_2` : null,
      claims.length < 3 ? `source_mapped_claims_${claims.length}_below_3` : null,
      blockedReasons.length > 0 ? `blocked_quality_reasons:${blockedReasons.join(',')}` : null,
      unsupportedClaimFlags.length > 0 ? `unsupported_current_or_pricing_claims:${unsupportedClaimFlags.length}` : null
    ].filter(Boolean);

    return {
      id: query.id,
      category: query.category,
      query: query.query,
      expected_slug: query.expected_slug,
      title: article?.title || null,
      ok: failures.length === 0,
      status: article?.status || 'missing',
      verified_sources: verifiedSources,
      source_mapped_claims: claims.length,
      mapped_sources: mappedSources.length,
      failures
    };
  });

  const summary = summarizeRows(rows);
  return {
    ...summary,
    target_ratio: API_READINESS_TARGET_RATIO,
    status: summary.pass_ratio >= API_READINESS_TARGET_RATIO ? 'met' : 'below_target',
    rows,
    failures: rows.filter(row => !row.ok)
  };
}

export function evaluateReadinessQuery({ query, artifacts, generated }) {
  const failures = [];
  const contextResult = buildContextApiPayload({
    query: query.query,
    limit: 3,
    generated,
    ...artifacts
  });
  const contextPayload = contextResult.payload || {};
  const contextCitation = firstSourceMappedCitationFromContext(contextPayload);

  if (!contextResult.ok || contextResult.status !== 200) failures.push('context_non_200');
  if (contextPayload.answer_policy?.can_answer_with_anchorfact !== true) failures.push('context_cannot_answer');
  if (!contextCitation) failures.push('context_missing_source_mapped_citation');
  if (!hasExpectedSlug(contextPayload, query.expected_slug)) failures.push('context_expected_slug_not_matched');

  const evidenceResult = buildEvidenceApiPayload({
    query: query.query,
    limit: 3,
    generated,
    manifest: artifacts.manifest,
    claimsPayload: artifacts.claimsPayload,
    sourcesPayload: artifacts.sourcesPayload,
    searchIndex: artifacts.searchIndex,
    rankedResults: contextPayload.matched_articles || null
  });
  const evidencePayload = evidenceResult.payload || {};
  const evidenceCitation = firstSourceMappedCitationFromEvidence(evidencePayload);
  if (!evidenceResult.ok || evidenceResult.status !== 200) failures.push('evidence_non_200');
  if (!Array.isArray(evidencePayload.packs) || evidencePayload.packs.length === 0) failures.push('evidence_no_packs');
  if (!evidenceCitation) failures.push('evidence_missing_source_mapped_citation');
  if (!hasExpectedSlug(evidencePayload, query.expected_slug)) failures.push('evidence_expected_slug_not_matched');

  const claimId = contextCitation?.claim_id || evidenceCitation?.claim_id || null;
  const citeResult = claimId
    ? buildCiteApiPayload({
        claimId,
        generated,
        manifest: artifacts.manifest,
        claimsPayload: artifacts.claimsPayload,
        sourcesPayload: artifacts.sourcesPayload
      })
    : null;
  const citePayload = citeResult?.payload || {};
  const citeSourceUrl = citePayload.citation_export?.source_url || citePayload.source?.url || null;
  if (!claimId) failures.push('cite_no_claim_id_from_context_or_evidence');
  if (claimId && (!citeResult?.ok || citeResult.status !== 200)) failures.push('cite_non_200');
  if (claimId && !citeSourceUrl) failures.push('cite_missing_source_url');

  return {
    id: query.id,
    category: query.category,
    query: query.query,
    expected_slug: query.expected_slug,
    ok: failures.length === 0,
    context: {
      status: contextResult.status,
      coverage_status: contextPayload.coverage_status || null,
      can_answer_with_anchorfact: contextPayload.answer_policy?.can_answer_with_anchorfact ?? null,
      citation_ready_claims: Array.isArray(contextPayload.citation_ready_claims)
        ? contextPayload.citation_ready_claims.length
        : 0,
      top_slug: contextPayload.matched_articles?.[0]?.canonical_slug || contextPayload.evidence_packs?.[0]?.canonical_slug || null
    },
    evidence: {
      status: evidenceResult.status,
      packs: Array.isArray(evidencePayload.packs) ? evidencePayload.packs.length : 0,
      has_source_mapped_citation: Boolean(evidenceCitation),
      top_slug: evidencePayload.packs?.[0]?.canonical_slug || null
    },
    cite: {
      status: citeResult?.status || null,
      claim_id: claimId,
      has_source_url: Boolean(citeSourceUrl)
    },
    failures
  };
}

export function evaluateUnsupportedFallback({
  artifacts,
  query = UNSUPPORTED_FALLBACK_QUERY,
  generated = new Date().toISOString()
} = {}) {
  const result = buildContextApiPayload({
    query,
    limit: 3,
    generated,
    ...artifacts
  });
  const payload = result.payload || {};
  const canAnswer = payload.answer_policy?.can_answer_with_anchorfact === true;
  const mode = payload.answer_policy?.answer_mode || null;
  const ok = result.status === 200
    && canAnswer === false
    && mode === 'external_sources_required';
  return {
    query,
    ok,
    status: result.status,
    coverage_status: payload.coverage_status || null,
    answer_mode: mode,
    can_answer_with_anchorfact: canAnswer,
    failures: ok ? [] : ['unsupported_query_did_not_require_external_sources']
  };
}

export function evaluateContextReadiness({
  artifacts,
  querySet = CORE_CORPUS_QUERIES,
  generated = new Date().toISOString(),
  targetRatio = API_READINESS_TARGET_RATIO
} = {}) {
  const rows = queryDefinitions(querySet).map(query => evaluateReadinessQuery({
    query,
    artifacts,
    generated
  }));
  const summary = summarizeRows(rows);
  const fallback = evaluateUnsupportedFallback({ artifacts, generated });
  return {
    ...summary,
    target_ratio: targetRatio,
    status: summary.pass_ratio >= targetRatio && fallback.ok ? 'met' : 'below_target',
    rows,
    fallback,
    failures: rows.filter(row => !row.ok)
  };
}

export function buildApiReadinessReport({
  artifacts,
  querySet = CORE_CORPUS_QUERIES,
  generatedAt = new Date().toISOString(),
  apiPerformanceReport = null,
  adoptionScorecard = null,
  productionIntegrity = null,
  targetRatio = API_READINESS_TARGET_RATIO
} = {}) {
  const coreCorpus = evaluateCoreCorpus({
    manifest: artifacts?.manifest,
    claimsPayload: artifacts?.claimsPayload,
    sourcesPayload: artifacts?.sourcesPayload,
    querySet
  });
  const contextScorecard = evaluateContextReadiness({
    artifacts,
    querySet,
    generated: generatedAt,
    targetRatio
  });
  const localReady = coreCorpus.pass_ratio >= targetRatio
    && contextScorecard.pass_ratio >= targetRatio
    && contextScorecard.fallback.ok === true;
  const performanceOk = apiPerformanceReport ? apiPerformanceReport.ok === true : null;
  const artifactBudgetOk = apiPerformanceReport?.artifact_size_budget
    ? apiPerformanceReport.artifact_size_budget.ok === true
    : null;

  return {
    schema_version: API_READINESS_SCHEMA_VERSION,
    generated: generatedAt,
    report_only: true,
    build_should_fail: false,
    target_ratio: targetRatio,
    status: localReady
      ? 'foundation_ready_pending_14_day_and_partner_signals'
      : 'building_foundation',
    subscription_ready: false,
    readiness_gates: [
      {
        id: 'production_integrity_14_day',
        target: '14 consecutive days production:integrity passing and AI eval 100%',
        status: productionIntegrity?.status || 'not_measured_in_this_report'
      },
      {
        id: 'public_audit_14_day',
        target: '14 consecutive days with 0 move_to_draft / repair_sources public audit findings',
        status: 'not_measured_in_this_report'
      },
      {
        id: 'core_query_context_ratio',
        target: `>=${targetRatio} /api/context citation-ready coverage`,
        status: contextScorecard.pass_ratio >= targetRatio ? 'met' : 'below_target',
        current_ratio: contextScorecard.pass_ratio
      },
      {
        id: 'ai_primary_discovery_ratio_7_day',
        target: '>=0.2 AI primary/discovery ratio for 7 consecutive days',
        status: adoptionScorecard?.identified_ai_primary_to_discovery_target_status || 'not_measured_in_this_report',
        current_ratio: adoptionScorecard?.identified_ai_primary_to_discovery_current_ratio ?? null
      },
      {
        id: 'design_partners',
        target: '>=3 real external design partners and >=1 paid-intent signal',
        status: 'manual_validation_required'
      }
    ],
    core_corpus: coreCorpus,
    api_scorecard: contextScorecard,
    api_performance: apiPerformanceReport
      ? {
          ok: apiPerformanceReport.ok,
          case_count: apiPerformanceReport.case_count,
          passed: apiPerformanceReport.passed,
          failed: apiPerformanceReport.failed,
          artifact_size_budget_ok: artifactBudgetOk,
          failures: apiPerformanceReport.failures || []
        }
      : { status: 'not_provided' },
    production_health: productionIntegrity || { status: 'not_provided' },
    adoption_signal: adoptionScorecard || { status: 'not_provided' },
    next_actions: [
      'Repair core corpus rows whose failures mention missing_public_article, low verified_sources, or low source_mapped_claims.',
      'For API rows below target, tune article titles/keywords only after confirming source-mapped claims are correct.',
      'Keep the free API and no-key public discovery surface until all readiness gates are met for the defined windows.',
      'Start paid beta work only after design partner and paid-intent signals are real, not inferred from crawler traffic.'
    ]
  };
}

export function renderApiReadinessMarkdown(report) {
  const lines = [];
  lines.push(`# AnchorFact API Readiness Report`);
  lines.push('');
  lines.push(`Generated: ${report.generated}`);
  lines.push(`Schema: ${report.schema_version}`);
  lines.push(`Status: ${report.status}`);
  lines.push(`Report-only: ${report.report_only}`);
  lines.push(`Build should fail: ${report.build_should_fail}`);
  lines.push('');
  lines.push(`## Scorecard`);
  lines.push('');
  lines.push(`- Target ratio: ${report.target_ratio}`);
  lines.push(`- Core corpus: ${report.core_corpus.passed}/${report.core_corpus.count} (${report.core_corpus.pass_ratio})`);
  lines.push(`- API citation readiness: ${report.api_scorecard.passed}/${report.api_scorecard.count} (${report.api_scorecard.pass_ratio})`);
  lines.push(`- Unsupported fallback: ${report.api_scorecard.fallback.ok ? 'pass' : 'fail'} (${report.api_scorecard.fallback.answer_mode || 'unknown'})`);
  lines.push(`- API performance: ${report.api_performance.status || (report.api_performance.ok ? 'pass' : 'fail')}`);
  lines.push(`- Artifact budget: ${report.api_performance.artifact_size_budget_ok ?? 'not_provided'}`);
  lines.push(`- Production health: ${report.production_health.status || 'not_provided'}`);
  lines.push(`- Adoption signal: ${report.adoption_signal.status || report.adoption_signal.identified_ai_primary_to_discovery_target_status || 'not_provided'}`);
  lines.push('');
  lines.push(`## Readiness Gates`);
  lines.push('');
  for (const gate of report.readiness_gates) {
    const current = gate.current_ratio === undefined ? '' : `; current=${gate.current_ratio}`;
    lines.push(`- ${gate.id}: ${gate.status} (${gate.target}${current})`);
  }
  lines.push('');
  lines.push(`## Core Corpus Failures`);
  lines.push('');
  const coreFailures = report.core_corpus.failures.slice(0, 20);
  if (coreFailures.length === 0) {
    lines.push('- None.');
  } else {
    for (const row of coreFailures) {
      lines.push(`- ${row.expected_slug}: ${row.failures.join(', ')}`);
    }
  }
  lines.push('');
  lines.push(`## API Query Failures`);
  lines.push('');
  const apiFailures = report.api_scorecard.failures.slice(0, 20);
  if (apiFailures.length === 0) {
    lines.push('- None.');
  } else {
    for (const row of apiFailures) {
      lines.push(`- ${row.expected_slug}: ${row.failures.join(', ')} (top context=${row.context.top_slug || 'none'}, top evidence=${row.evidence.top_slug || 'none'})`);
    }
  }
  lines.push('');
  lines.push(`## Next Actions`);
  lines.push('');
  for (const action of report.next_actions) lines.push(`- ${action}`);
  lines.push('');
  return `${lines.join('\n')}\n`;
}
