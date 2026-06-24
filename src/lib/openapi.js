import {
  AGENT_PROFILE_SCHEMA_VERSION,
  API_ACCESS_SCHEMA_VERSION,
  API_INDEX_SCHEMA_VERSION,
  API_READINESS_SCHEMA_VERSION,
  ARTIFACT_SHARDS_SCHEMA_VERSION,
  ARTIFACT_SHARD_SCHEMA_VERSION,
  ARTIFACT_SUMMARY_SCHEMA_VERSION,
  ARTICLE_API_SCHEMA_VERSION,
  CAPABILITIES_SCHEMA_VERSION,
  CITE_API_SCHEMA_VERSION,
  CLAIM_API_SCHEMA_VERSION,
  CLAIMS_SCHEMA_VERSION,
  COMPILER_VERSION,
  CONTEXT_API_SCHEMA_VERSION,
  CONTENT_HEALTH_SCHEMA_VERSION,
  COVERAGE_SCHEMA_VERSION,
  DASHBOARD_SCHEMA_VERSION,
  DRAFTS_INDEX_SCHEMA_VERSION,
  EVALS_SCHEMA_VERSION,
  EVIDENCE_API_SCHEMA_VERSION,
  EXAMPLES_SCHEMA_VERSION,
  GRAPH_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  MCP_SCHEMA_VERSION,
  OFFICIAL_SITE,
  OPENAPI_SCHEMA_VERSION,
  PLAN_API_SCHEMA_VERSION,
  PROVENANCE_PATH,
  PROVENANCE_SCHEMA_VERSION,
  RESOLVE_BATCH_API_SCHEMA_VERSION,
  RESOLVE_API_SCHEMA_VERSION,
  ROOT_INDEX_SCHEMA_VERSION,
  SEARCH_API_SCHEMA_VERSION,
  SEARCH_INDEX_SCHEMA_VERSION,
  SOURCE_API_SCHEMA_VERSION,
  SOURCES_SCHEMA_VERSION,
  TOPICS_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

function jsonResponse(schemaRef) {
  return {
    description: 'OK',
    content: {
      'application/json': {
        schema: { $ref: `#/components/schemas/${schemaRef}` }
      }
    }
  };
}

function textResponse(mediaType) {
  return {
    description: 'OK',
    content: {
      [mediaType]: {
        schema: { type: 'string' }
      }
    }
  };
}

function getJson(summary, schemaRef) {
  return {
    get: {
      summary,
      responses: {
        200: jsonResponse(schemaRef)
      }
    }
  };
}

function schemaVersioned(name, schemaVersion, extra = {}) {
  return {
    type: 'object',
    description: `${name} payload.`,
    required: ['schema_version'],
    properties: {
      schema_version: { const: schemaVersion },
      generated: { type: 'string', format: 'date-time' },
      provenance_url: { type: 'string', format: 'uri' },
      ...extra
    },
    additionalProperties: true
  };
}

export function buildOpenApiContract({
  generated,
  site = OFFICIAL_SITE
} = {}) {
  return {
    openapi: '3.1.0',
    info: {
      title: 'AnchorFact Machine API',
      version: COMPILER_VERSION,
      description: 'Read-only static machine contract for AnchorFact verified claims, retrieval indexes, sources, and signed provenance.',
      license: {
        name: 'MIT code / CC-BY-4.0 content',
        url: 'https://github.com/anchorfact/anchorfact/blob/main/LICENSE'
      }
    },
    servers: [{ url: site }],
    'x-anchorfact-schema-version': OPENAPI_SCHEMA_VERSION,
    'x-generated': generated || null,
    'x-provenance-url': publicUrl(PROVENANCE_PATH, site),
    paths: {
      '/': getJson('Root machine index alias for /index.json', 'RootIndex'),
      '/index.json': getJson('Root machine index for preferred entrypoints and signed artifact discovery', 'RootIndex'),
      '/agent.json': getJson('AI agent discovery profile', 'AgentProfile'),
      '/.well-known/anchorfact.json': getJson('Well-known alias for the AI agent discovery profile', 'AgentProfile'),
      '/openapi.json': getJson('This OpenAPI machine contract', 'OpenApiContract'),
      '/api': getJson('Compact live API discovery index', 'ApiIndex'),
      '/api-access/': getJson('Machine-readable free API access policy and recommended call order', 'ApiAccess'),
      '/drafts.html': getJson('Noindex machine-readable draft status index', 'DraftsIndex'),
      '/dashboard.html': getJson('Noindex machine-readable build dashboard', 'Dashboard'),
      '/artifact-summary.json': getJson('Lightweight static artifact size and alternative-call summary', 'ArtifactSummary'),
      '/artifact-shards.json': getJson('Signed versioned shard registry for large static artifacts', 'ArtifactShards'),
      '/api-readiness.json': getJson('Machine-readable API readiness gates and scorecard', 'ApiReadiness'),
      '/404.html': getJson('Machine-readable JSON 404 fallback for unknown routes', 'NotFoundResponse'),
      '/manifest.json': getJson('Public and draft article manifest', 'Manifest'),
      '/claims.json': getJson('Public verified atomic claims', 'Claims'),
      '/topics.json': getJson('Public topic coverage map', 'Topics'),
      '/capabilities.json': getJson('AI capability router', 'Capabilities'),
      '/content-health.json': getJson('Signed corpus health summary', 'ContentHealth'),
      '/coverage.json': getJson('AI coverage and limits guide', 'Coverage'),
      '/examples.json': getJson('Executable AI usage examples', 'Examples'),
      '/graph.json': getJson('Public knowledge graph', 'Graph'),
      '/evals.json': getJson('Executable AI integration checks', 'Evals'),
      '/mcp.json': getJson('Local MCP installation manifest', 'McpProfile'),
      '/api/plan': {
        get: {
          summary: 'Read-only AI query planner for AnchorFact coverage and next calls',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Natural-language query to plan against AnchorFact public coverage.'
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 10, default: 3 },
              description: 'Maximum article match count to include in the plan.'
            }
          ],
          responses: {
            200: jsonResponse('PlanApiResponse'),
            400: jsonResponse('ApiError')
          }
        }
      },
      '/api/evidence': {
        get: {
          summary: 'Read-only public query evidence packs',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Natural-language query.'
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 20, default: 5 },
              description: 'Maximum evidence pack count.'
            },
            {
              name: 'format',
              in: 'query',
              required: false,
              schema: { enum: ['json', 'markdown', 'md'], default: 'json' },
              description: 'Response format. JSON is the default; markdown returns answer-ready context text.'
            }
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/EvidenceApiResponse' }
                },
                'text/markdown': {
                  schema: { type: 'string' }
                }
              }
            },
            400: jsonResponse('ApiError')
          }
        }
      },
      '/api/context': {
        get: {
          summary: 'Read-only AI prompt context with planning status, content health, and evidence packs',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Natural-language query.'
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 20, default: 3 },
              description: 'Maximum evidence pack count.'
            },
            {
              name: 'format',
              in: 'query',
              required: false,
              schema: { enum: ['json', 'markdown', 'md'], default: 'json' },
              description: 'Response format. JSON is the default; markdown returns prompt-ready context text.'
            }
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ContextApiResponse' }
                },
                'text/markdown': {
                  schema: { type: 'string' }
                }
              }
            },
            400: jsonResponse('ApiError'),
            502: jsonResponse('ApiError')
          }
        }
      },
      '/api/search': {
        get: {
          summary: 'Read-only search over public AnchorFact records',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Natural-language query.'
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 20, default: 5 },
              description: 'Maximum result count.'
            }
          ],
          responses: { 200: jsonResponse('SearchApiResponse') }
        }
      },
      '/api/resolve': {
        get: {
          summary: 'Read-only resolver for public AnchorFact references',
          parameters: [
            {
              name: 'ref',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Claim id, article slug, source id, AnchorFact URL, or original source URL.'
            }
          ],
          responses: {
            200: jsonResponse('ResolveApiResponse'),
            400: jsonResponse('ApiError'),
            404: jsonResponse('ApiError')
          }
        }
      },
      '/api/resolve-batch': {
        get: {
          summary: 'Read-only batch resolver for public AnchorFact references',
          parameters: [
            {
              name: 'ref',
              in: 'query',
              required: true,
              schema: { type: 'array', items: { type: 'string', minLength: 1 }, maxItems: 20 },
              style: 'form',
              explode: true,
              description: 'Repeat this parameter for each claim id, article slug, source id, AnchorFact URL, or original source URL.'
            },
            {
              name: 'format',
              in: 'query',
              required: false,
              schema: { enum: ['json', 'markdown', 'md'], default: 'json' },
              description: 'Response format. JSON is the default; markdown returns a compact resolution summary.'
            }
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ResolveBatchApiResponse' }
                },
                'text/markdown': {
                  schema: { type: 'string' }
                }
              }
            },
            400: jsonResponse('ApiError'),
            502: jsonResponse('ApiError')
          }
        }
      },
      '/api/article': {
        get: {
          summary: 'Read-only public article evidence bundle',
          parameters: [
            {
              name: 'slug',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Canonical public article slug, such as ai/3d-generation-gaussian-splatting.'
            }
          ],
          responses: {
            200: jsonResponse('ArticleApiResponse'),
            400: jsonResponse('ApiError'),
            404: jsonResponse('ApiError')
          }
        }
      },
      '/api/claim': {
        get: {
          summary: 'Read-only public atomic claim lookup',
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Public claim id, such as https://anchorfact.org/fact/f1. Shorthand ids such as f1 are also accepted.'
            }
          ],
          responses: {
            200: jsonResponse('ClaimApiResponse'),
            400: jsonResponse('ApiError'),
            404: jsonResponse('ApiError')
          }
        }
      },
      '/api/cite': {
        get: {
          summary: 'Read-only citation export for one public atomic claim',
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Public claim id, such as https://anchorfact.org/fact/f1. Shorthand ids such as f1 are also accepted.'
            },
            {
              name: 'format',
              in: 'query',
              required: false,
              schema: { enum: ['json', 'markdown', 'md'], default: 'json' },
              description: 'Response format. JSON is the default; markdown returns answer-ready citation text.'
            }
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CiteApiResponse' }
                },
                'text/markdown': {
                  schema: { type: 'string' }
                }
              }
            },
            400: jsonResponse('ApiError'),
            404: jsonResponse('ApiError')
          }
        }
      },
      '/api/source': {
        get: {
          summary: 'Read-only public source lookup',
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Source id from /sources.json, /api/article, or /api/claim, such as source:58200638706697c4.'
            },
            {
              name: 'url',
              in: 'query',
              required: false,
              schema: { type: 'string', format: 'uri' },
              description: 'Original source URL. Either id or url is required.'
            }
          ],
          responses: {
            200: jsonResponse('SourceApiResponse'),
            400: jsonResponse('ApiError'),
            404: jsonResponse('ApiError')
          }
        }
      },
      '/search-index.json': getJson('Compact public retrieval index', 'SearchIndex'),
      '/sources.json': getJson('Deduplicated public source index', 'Sources'),
      '/provenance.json': getJson('Signed build provenance and artifact hashes', 'Provenance'),
      '/provenance.sig': getJson('Detached provenance signature', 'ProvenanceSignature'),
      '/llms.txt': {
        get: {
          summary: 'LLM crawler index',
          responses: { 200: textResponse('text/plain') }
        }
      },
      '/{canonical_slug}/index.json': {
        get: {
          summary: 'Per-article JSON-LD record',
          parameters: [
            {
              name: 'canonical_slug',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Canonical public article slug, such as ai/transformer.'
            }
          ],
          responses: { 200: jsonResponse('ArticleJsonLd') }
        }
      },
      '/{canonical_slug}/index.html': {
        get: {
          summary: 'Legacy per-article path that aliases the JSON-LD record',
          parameters: [
            {
              name: 'canonical_slug',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Canonical public article slug, such as ai/transformer.'
            }
          ],
          responses: { 200: jsonResponse('ArticleJsonLd') }
        }
      },
      '/{canonical_slug}/index.md': {
        get: {
          summary: 'Per-article Markdown',
          parameters: [
            { name: 'canonical_slug', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: { 200: textResponse('text/markdown') }
        }
      },
      '/{canonical_slug}/index.txt': {
        get: {
          summary: 'Per-article plain text',
          parameters: [
            { name: 'canonical_slug', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: { 200: textResponse('text/plain') }
        }
      },
      '/{canonical_slug}/index.ttl': {
        get: {
          summary: 'Per-article Turtle RDF',
          parameters: [
            { name: 'canonical_slug', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: { 200: textResponse('text/turtle') }
        }
      }
    },
    components: {
      schemas: {
        OpenApiContract: {
          type: 'object',
          required: ['openapi', 'info', 'paths'],
          properties: {
            openapi: { const: '3.1.0' },
            info: { type: 'object' },
            paths: { type: 'object' }
          },
          additionalProperties: true
        },
        RootIndex: schemaVersioned('Root machine index', ROOT_INDEX_SCHEMA_VERSION, {
          official_site: { type: 'string', format: 'uri' },
          default_answer_path: { const: '/api/context?q={query}' },
          preferred_machine_entrypoints: { type: 'array', items: { type: 'object' } },
          discovery: { type: 'object' },
          counts: {
            type: 'object',
            properties: {
              public_articles: { type: 'integer' },
              draft_articles: { type: 'integer' },
              public_claims: { type: 'integer' }
            },
            additionalProperties: true
          },
          api_readiness_summary: {
            type: 'object',
            properties: {
              path: { const: '/api-readiness.json' },
              status: { type: ['string', 'null'] },
              subscription_ready: { type: ['boolean', 'null'] },
              report_only: { type: ['boolean', 'null'] },
              blocker_ids: { type: 'array', items: { type: 'string' } },
              automated_blocker_ids: { type: 'array', items: { type: 'string' } },
              manual_blocker_ids: { type: 'array', items: { type: 'string' } }
            },
            additionalProperties: true
          },
          error_recovery_guidance: { type: 'object' },
          trust_policy: { type: 'object' },
          bulk_sync_policy: { type: 'object' },
          static_artifacts: { type: 'array', items: { type: 'string' } }
        }),
        AgentProfile: schemaVersioned('Agent profile', AGENT_PROFILE_SCHEMA_VERSION, {
          current_snapshot: {
            type: 'object',
            properties: {
              api_readiness_blocker_ids: { type: 'array', items: { type: 'string' } },
              api_readiness_automated_blocker_ids: { type: 'array', items: { type: 'string' } },
              api_readiness_manual_blocker_ids: { type: 'array', items: { type: 'string' } }
            },
            additionalProperties: true
          },
          quick_start: { $ref: '#/components/schemas/AgentQuickStart' }
        }),
        AgentQuickStart: {
          type: 'object',
          description: 'Smallest stable decision contract for AI consumers choosing an AnchorFact answer path.',
          required: ['default_answer_path', 'default_answer_mode', 'citation_path', 'trust_check', 'fallback_policy'],
          properties: {
            purpose: { type: 'string' },
            default_answer_path: { const: '/api/context?q={query}' },
            default_answer_mode: { enum: ['answer_with_citations'] },
            local_mcp_answer_tool: { const: 'anchorfact_context' },
            citation_path: { const: '/api/cite?id={claim_id}' },
            primary_api_conversion: {
              type: 'object',
              properties: {
                target_ratio: { type: 'number' },
                measured_as: { type: 'string' },
                discovery_entrypoints: { type: 'array', items: { type: 'string' } },
                primary_entrypoints: { type: 'array', items: { type: 'string' } },
                next_call_after_discovery: { type: 'string' },
                guidance: { type: 'string' }
              },
              additionalProperties: true
            },
            trust_check: {
              type: 'object',
              properties: {
                path: { const: '/provenance.json' },
                signature_path: { const: '/provenance.sig' },
                require_trusted_signature: { type: 'boolean' },
                pinned_public_key_path: { type: 'string' }
              },
              additionalProperties: true
            },
            fallback_policy: {
              type: 'object',
              properties: {
                unsupported_answer_mode: { enum: ['external_sources_required'] },
                use_external_sources_when: { type: 'array', items: { type: 'string' } }
              },
              additionalProperties: true
            },
            steps: { type: 'array', items: { type: 'object' } },
            do_not_use: { type: 'array', items: { type: 'string' } }
          },
          additionalProperties: true
        },
        ApiIndex: schemaVersioned('API index', API_INDEX_SCHEMA_VERSION, {
          read_only: { type: 'boolean' },
          ai_adoption_guidance: { type: 'object' },
          error_recovery_guidance: {
            type: 'object',
            properties: {
              recoverable_400_field: { const: 'machine_recovery' },
              default_recovery_path: { const: '/api/context?q={query}&limit=3' },
              default_recovery_url: { type: 'string' },
              observed_recoverable_endpoints: { type: 'array', items: { type: 'string' } },
              retry_example_paths: { type: 'array', items: { type: 'string' } },
              policy: { type: 'string' }
            },
            additionalProperties: true
          },
          readiness_guidance: {
            type: 'object',
            properties: {
              status_endpoint: { const: '/api-readiness.json' },
              report_only_until_gates_met: { type: 'boolean' },
              default_access_until_ready: { type: 'string' },
              subscription_ready_requires: { type: 'array', items: { type: 'string' } },
              start_paid_beta_only_after: { type: 'string' }
            },
            additionalProperties: true
          },
          recommended_sequence: { type: 'array', items: { type: 'string' } },
          primary_entrypoints: { type: 'array', items: { type: 'object' } },
          endpoints: { type: 'array', items: { type: 'object' } },
          static_fallbacks: { type: 'array', items: { type: 'object' } }
        }),
        ApiAccess: schemaVersioned('API access policy', API_ACCESS_SCHEMA_VERSION, {
          access_policy: { type: 'object' },
          readiness_policy: {
            type: 'object',
            properties: {
              status_endpoint: { const: '/api-readiness.json' },
              current_mode: { type: 'string' },
              report_only_until_gates_met: { type: 'boolean' },
              paid_beta_requires: { type: 'array', items: { type: 'string' } },
              blocker_source: { type: 'string' },
              manual_validation_required: { type: 'array', items: { type: 'string' } }
            },
            additionalProperties: true
          },
          counts: { type: 'object' },
          recommended_call_order: { type: 'array', items: { type: 'object' } },
          answer_policy_path: { const: '/api/context?q={query}' },
          unsupported_answer_mode: { enum: ['external_sources_required'] },
          trust_check: { type: 'object' },
          related_machine_contracts: { type: 'array', items: { type: 'string' } }
        }),
        DraftsIndex: schemaVersioned('Draft status index', DRAFTS_INDEX_SCHEMA_VERSION, {
          indexing: { type: 'object' },
          counts: { type: 'object' },
          status_policy: { type: 'object' },
          drafts: { type: 'array', items: { type: 'object' } }
        }),
        Dashboard: schemaVersioned('Build dashboard', DASHBOARD_SCHEMA_VERSION, {
          indexing: { type: 'object' },
          counts: { type: 'object' },
          public_confidence: { type: 'object' },
          verification_report: { type: 'object' },
          entrypoints: { type: 'object' }
        }),
        ArtifactSummary: schemaVersioned('Artifact summary', ARTIFACT_SUMMARY_SCHEMA_VERSION, {
          total_bytes: { type: 'integer' },
          artifact_growth_policy: { type: 'object' },
          recommended_default_calls: { type: 'array', items: { type: 'object' } },
          artifacts: { type: 'array', items: { type: 'object' } }
        }),
        ArtifactShards: schemaVersioned('Artifact shard registry', ARTIFACT_SHARDS_SCHEMA_VERSION, {
          version: { type: 'string' },
          default_for_agents: { type: 'string' },
          compatibility: { type: 'object' },
          large_artifact_strategy: { type: 'object' },
          artifacts: { type: 'array', items: { type: 'object' } }
        }),
        ApiReadiness: schemaVersioned('API readiness', API_READINESS_SCHEMA_VERSION, {
          report_only: { type: 'boolean' },
          build_should_fail: { type: 'boolean' },
          target_ratio: { type: 'number' },
          status: { type: 'string' },
          subscription_ready: { type: 'boolean' },
          readiness_gates: { type: 'array', items: { type: 'object' } },
          readiness_blockers: {
            type: 'object',
            properties: {
              gate_ids: { type: 'array', items: { type: 'string' } },
              automated_gate_ids: { type: 'array', items: { type: 'string' } },
              manual_gate_ids: { type: 'array', items: { type: 'string' } }
            }
          },
          core_corpus: { type: 'object' },
          api_scorecard: { type: 'object' },
          api_performance: { type: 'object' },
          production_health: { type: 'object' },
          adoption_signal: { type: 'object' },
          design_partner_signal: { type: 'object' }
        }),
        ArtifactShard: schemaVersioned('Artifact shard', ARTIFACT_SHARD_SCHEMA_VERSION, {
          artifact_id: { type: 'string' },
          source_path: { type: 'string' },
          collection: { type: 'string' },
          item_kind: { type: 'string' },
          shard_index: { type: 'integer' },
          shard_count: { type: 'integer' },
          item_count: { type: 'integer' }
        }),
        Manifest: schemaVersioned('Manifest', MANIFEST_SCHEMA_VERSION, {
          article_count: { type: 'integer' },
          public_article_count: { type: 'integer' },
          draft_article_count: { type: 'integer' },
          articles: { type: 'array', items: { type: 'object' } }
        }),
        Claims: schemaVersioned('Claims', CLAIMS_SCHEMA_VERSION, {
          claim_count: { type: 'integer' },
          claims: { type: 'array', items: { type: 'object' } }
        }),
        Topics: schemaVersioned('Topics', TOPICS_SCHEMA_VERSION, {
          topic_count: { type: 'integer' },
          public_article_count: { type: 'integer' },
          public_claim_count: { type: 'integer' },
          topics: { type: 'array', items: { type: 'object' } }
        }),
        Capabilities: schemaVersioned('Capabilities', CAPABILITIES_SCHEMA_VERSION, {
          capability_count: { type: 'integer' },
          default_sequence: { type: 'array', items: { type: 'string' } },
          selection_rules: { type: 'array', items: { type: 'object' } },
          capabilities: { type: 'array', items: { type: 'object' } }
        }),
        Coverage: schemaVersioned('Coverage', COVERAGE_SCHEMA_VERSION, {
          coverage_summary: { type: 'object' },
          topic_coverage: { type: 'array', items: { type: 'object' } },
          best_entrypoints: { type: 'object' },
          recommended_decision_flow: { type: 'array', items: { type: 'object' } },
          coverage_limits: { type: 'array', items: { type: 'object' } }
        }),
        ContentHealth: schemaVersioned('Content health', CONTENT_HEALTH_SCHEMA_VERSION, {
          snapshot: { type: 'object' },
          public: { type: 'object' },
          draft: {
            type: 'object',
            properties: {
              repair_candidate_count: { type: 'integer' },
              source_ready_repair_candidate_count: { type: 'integer' },
              source_acquisition_candidate_count: { type: 'integer' },
              repair_excluded_count: { type: 'integer' },
              strict_review_candidate_count: { type: 'integer' },
              repair_candidates: { type: 'array', items: { type: 'object' } },
              source_ready_repair_candidates: { type: 'array', items: { type: 'object' } },
              source_acquisition_candidates: { type: 'array', items: { type: 'object' } },
              strict_review_candidates: { type: 'array', items: { type: 'object' } },
              repair_queue: {
                type: 'object',
                properties: {
                  candidate_count: { type: 'integer' },
                  source_ready_candidate_count: { type: 'integer' },
                  source_acquisition_candidate_count: { type: 'integer' },
                  excluded_count: { type: 'integer' },
                  strict_review_count: { type: 'integer' },
                  next_batch_size: { type: 'integer' },
                  next_batch: { type: 'array', items: { type: 'object' } },
                  source_ready_next_batch_size: { type: 'integer' },
                  source_ready_next_batch: { type: 'array', items: { type: 'object' } },
                  source_acquisition_next_batch_size: { type: 'integer' },
                  source_acquisition_next_batch: { type: 'array', items: { type: 'object' } },
                  strict_review_next_batch: { type: 'array', items: { type: 'object' } },
                  selection_policy: { type: 'array', items: { type: 'string' } },
                  complexity_distribution: { type: 'array', items: { type: 'object' } },
                  category_distribution: { type: 'array', items: { type: 'object' } },
                  quality_reason_distribution: { type: 'array', items: { type: 'object' } },
                  exclusion_reason_distribution: { type: 'array', items: { type: 'object' } },
                  strict_review_reason_distribution: { type: 'array', items: { type: 'object' } }
                },
                additionalProperties: true
              }
            },
            additionalProperties: true
          },
          machine_guidance: { type: 'array', items: { type: 'string' } },
          trust_boundaries: { type: 'object' }
        }),
        Examples: schemaVersioned('Examples', EXAMPLES_SCHEMA_VERSION, {
          example_count: { type: 'integer' },
          examples: { type: 'array', items: { type: 'object' } }
        }),
        Graph: schemaVersioned('Graph', GRAPH_SCHEMA_VERSION, {
          public_article_count: { type: 'integer' },
          public_claim_count: { type: 'integer' },
          source_count: { type: 'integer' },
          topic_count: { type: 'integer' },
          node_count: { type: 'integer' },
          edge_count: { type: 'integer' },
          nodes: { type: 'array', items: { type: 'object' } },
          edges: { type: 'array', items: { type: 'object' } }
        }),
        Evals: schemaVersioned('Evals', EVALS_SCHEMA_VERSION, {
          eval_count: { type: 'integer' },
          evals: { type: 'array', items: { type: 'object' } }
        }),
        McpProfile: schemaVersioned('MCP profile', MCP_SCHEMA_VERSION, {
          name: { type: 'string' },
          installation: { type: 'object' },
          tools: { type: 'array', items: { type: 'object' } }
        }),
        SearchIndex: schemaVersioned('Search index', SEARCH_INDEX_SCHEMA_VERSION, {
          article_count: { type: 'integer' },
          public_claim_count: { type: 'integer' },
          records: { type: 'array', items: { type: 'object' } }
        }),
        SearchApiResponse: schemaVersioned('Search API response', SEARCH_API_SCHEMA_VERSION, {
          query: { type: 'string' },
          limit: { type: 'integer' },
          result_count: { type: 'integer' },
          source_index_generated: { type: ['string', 'null'], format: 'date-time' },
          results: { type: 'array', items: { type: 'object' } }
        }),
        PlanApiResponse: schemaVersioned('Plan API response', PLAN_API_SCHEMA_VERSION, {
          query: { type: 'string' },
          limit: { type: 'integer' },
          coverage_status: { enum: ['supported', 'topic_supported', 'unsupported', 'site_help'] },
          should_use_anchorfact: { type: 'boolean' },
          query_intent: { enum: ['content', 'site_help'] },
          unsupported_intent_reasons: {
            type: 'array',
            items: { enum: ['local_or_personalized', 'live_or_time_sensitive'] }
          },
          confidence: { enum: ['high', 'medium', 'low'] },
          matched_topics: { type: 'array', items: { type: 'object' } },
          matched_articles: { type: 'array', items: { type: 'object' } },
          recommended_next_calls: { type: 'array', items: { type: 'object' } },
          fallback_guidance: { type: 'array', items: { type: 'string' } }
        }),
        EvidenceApiResponse: schemaVersioned('Evidence API response', EVIDENCE_API_SCHEMA_VERSION, {
          query: { type: 'string' },
          limit: { type: 'integer' },
          result_count: { type: 'integer' },
          citation_contract: { type: 'object' },
          machine_consumption: { $ref: '#/components/schemas/MachineConsumptionGuidance' },
          search_index_generated: { type: ['string', 'null'], format: 'date-time' },
          manifest_generated: { type: ['string', 'null'], format: 'date-time' },
          claims_generated: { type: ['string', 'null'], format: 'date-time' },
          source_index_generated: { type: ['string', 'null'], format: 'date-time' },
          packs: { type: 'array', items: { type: 'object' } }
        }),
        ContextApiResponse: schemaVersioned('Context API response', CONTEXT_API_SCHEMA_VERSION, {
          query: { type: 'string' },
          limit: { type: 'integer' },
          coverage_status: { enum: ['supported', 'topic_supported', 'unsupported', 'site_help'] },
          should_use_anchorfact: { type: 'boolean' },
          query_intent: { enum: ['content', 'site_help'] },
          unsupported_intent_reasons: {
            type: 'array',
            items: { enum: ['local_or_personalized', 'live_or_time_sensitive'] }
          },
          answer_policy: { $ref: '#/components/schemas/AnswerPolicy' },
          machine_consumption: { $ref: '#/components/schemas/MachineConsumptionGuidance' },
          citation_ready_claims: {
            type: 'array',
            items: { $ref: '#/components/schemas/CitationReadyClaim' }
          },
          evidence_pack_count: { type: 'integer' },
          evidence_packs: { type: 'array', items: { type: 'object' } },
          content_health: { $ref: '#/components/schemas/ContextApiContentHealth' },
          recommended_next_calls: { type: 'array', items: { type: 'object' } },
          fallback_guidance: { type: 'array', items: { type: 'string' } }
        }),
        ContextApiContentHealth: {
          type: ['object', 'null'],
          description: 'Compact content-health summary embedded in /api/context without draft entry details.',
          properties: {
            schema_version: { type: ['string', 'null'] },
            generated: { type: ['string', 'null'] },
            provenance_url: { type: ['string', 'null'], format: 'uri' },
            url: { type: 'string', format: 'uri' },
            snapshot: { type: 'object' },
            public_source_coverage: { type: ['object', 'null'] },
            public_claim_mapping: { type: ['object', 'null'] },
            draft_repair_queue: {
              type: ['object', 'null'],
              properties: {
                candidate_count: { type: ['integer', 'null'] },
                source_ready_candidate_count: { type: ['integer', 'null'] },
                source_acquisition_candidate_count: { type: ['integer', 'null'] },
                excluded_count: { type: ['integer', 'null'] },
                strict_review_count: { type: ['integer', 'null'] },
                next_batch_size: { type: ['integer', 'null'] },
                source_ready_next_batch_size: { type: ['integer', 'null'] },
                source_acquisition_next_batch_size: { type: ['integer', 'null'] }
              },
              additionalProperties: false
            },
            trust_boundaries: { type: 'object' },
            machine_guidance: { type: 'array', items: { type: 'string' } }
          },
          additionalProperties: true
        },
        MachineConsumptionGuidance: {
          type: 'object',
          description: 'Crawler and agent guidance for using query-scoped APIs before bulk static artifact downloads.',
          required: [
            'large_artifact_policy',
            'preferred_query_scoped_apis',
            'static_discovery',
            'avoid_for_single_query',
            'bulk_sync_policy'
          ],
          properties: {
            large_artifact_policy: { enum: ['prefer_query_scoped_apis'] },
            current_endpoint: { type: ['string', 'null'] },
            preferred_query_scoped_apis: { type: 'array', items: { type: 'object' } },
            static_discovery: { type: 'array', items: { type: 'object' } },
            avoid_for_single_query: { type: 'array', items: { type: 'string' } },
            bulk_sync_policy: { type: 'string' }
          },
          additionalProperties: false
        },
        MachineRecoveryGuidance: {
          type: 'object',
          description: 'Machine-readable recovery hint returned with recoverable 400 errors so agents can retry with valid parameters.',
          required: [
            'recoverable',
            'current_endpoint',
            'reason',
            'first_step',
            'next_request',
            'retry_examples'
          ],
          properties: {
            recoverable: { const: true },
            current_endpoint: { type: ['string', 'null'] },
            reason: { type: 'string' },
            first_step: { type: 'string' },
            next_request: { type: 'object' },
            valid_parameters: { type: 'array', items: { type: 'string' } },
            retry_examples: { type: 'array', items: { type: 'object' } }
          },
          additionalProperties: false
        },
        AnswerPolicy: {
          type: 'object',
          description: 'Machine decision telling agents whether AnchorFact can support a cited answer for the current query.',
          required: [
            'can_answer_with_anchorfact',
            'answer_mode',
            'max_claims_to_cite',
            'required_action',
            'guardrails'
          ],
          properties: {
            can_answer_with_anchorfact: { type: 'boolean' },
            answer_mode: { enum: ['answer_with_citations', 'external_sources_required', 'api_guidance'] },
            max_claims_to_cite: { type: 'integer', minimum: 0 },
            required_action: { type: 'string' },
            unsupported_reason: { type: ['string', 'null'] },
            guardrails: { type: 'array', items: { type: 'string' } }
          },
          additionalProperties: false
        },
        CitationReadyClaim: {
          type: 'object',
          description: 'Compact claim-level citation candidate extracted from context evidence packs.',
          required: [
            'rank',
            'claim_id',
            'statement',
            'confidence',
            'canonical_slug',
            'source_url',
            'cite_api_path'
          ],
          properties: {
            rank: { type: 'integer', minimum: 1 },
            claim_id: { type: 'string', format: 'uri' },
            statement: { type: ['string', 'null'] },
            confidence: { enum: ['high', 'medium', 'low', null] },
            canonical_slug: { type: ['string', 'null'] },
            article_title: { type: ['string', 'null'] },
            article_url: { type: ['string', 'null'], format: 'uri' },
            source_title: { type: ['string', 'null'] },
            source_url: { type: ['string', 'null'], format: 'uri' },
            source_tier: { enum: ['S', 'A', 'B', 'C', null] },
            source_type: { type: ['string', 'null'] },
            anchorfact_url: { type: ['string', 'null'], format: 'uri' },
            cite_api_path: { type: ['string', 'null'] },
            cite_api_url: { type: ['string', 'null'], format: 'uri' },
            citation_markdown: { type: ['string', 'null'] }
          },
          additionalProperties: false
        },
        ResolveApiResponse: schemaVersioned('Resolve API response', RESOLVE_API_SCHEMA_VERSION, {
          ref: { type: 'string' },
          resolved_type: { enum: ['article', 'claim', 'source'] },
          canonical_ref: { type: 'string' },
          result_schema_version: { type: 'string' },
          links: { type: 'object' },
          result: { type: 'object' }
        }),
        ResolveBatchApiResponse: schemaVersioned('Resolve batch API response', RESOLVE_BATCH_API_SCHEMA_VERSION, {
          reference_count: { type: 'integer' },
          ok_count: { type: 'integer' },
          error_count: { type: 'integer' },
          results: { type: 'array', items: { type: 'object' } }
        }),
        ArticleApiResponse: schemaVersioned('Article API response', ARTICLE_API_SCHEMA_VERSION, {
          canonical_slug: { type: 'string' },
          article: { type: 'object' },
          retrieval: { type: ['object', 'null'] },
          citation_contract: { type: 'object' },
          claim_count: { type: 'integer' },
          claims: { type: 'array', items: { type: 'object' } },
          citation_exports: { type: 'array', items: { type: 'object' } },
          source_count: { type: 'integer' },
          sources: { type: 'array', items: { type: 'object' } }
        }),
        ClaimApiResponse: schemaVersioned('Claim API response', CLAIM_API_SCHEMA_VERSION, {
          claim_id: { type: 'string', format: 'uri' },
          canonical_slug: { type: 'string' },
          claim: { type: 'object' },
          citation_contract: { type: 'object' },
          citation_export: { type: 'object' },
          article: { type: 'object' },
          source_count: { type: 'integer' },
          sources: { type: 'array', items: { type: 'object' } }
        }),
        CiteApiResponse: schemaVersioned('Citation API response', CITE_API_SCHEMA_VERSION, {
          claim_id: { type: 'string', format: 'uri' },
          canonical_slug: { type: 'string' },
          citation_contract: { type: 'object' },
          citation_export: { type: 'object' },
          claim: { type: 'object' },
          article: { type: 'object' },
          source: { type: ['object', 'null'] }
        }),
        SourceApiResponse: schemaVersioned('Source API response', SOURCE_API_SCHEMA_VERSION, {
          source_id: { type: 'string' },
          source_url: { type: ['string', 'null'], format: 'uri' },
          source: { type: 'object' },
          claim_count: { type: 'integer' },
          claims: { type: 'array', items: { type: 'object' } }
        }),
        ApiError: {
          type: 'object',
          required: ['schema_version', 'error'],
          properties: {
            schema_version: { type: 'string' },
            error: {
              type: 'object',
              required: ['code', 'message'],
              properties: {
                code: { type: 'string' },
                message: { type: 'string' }
              },
              additionalProperties: true
            },
            machine_recovery: { $ref: '#/components/schemas/MachineRecoveryGuidance' }
          },
          additionalProperties: true
        },
        NotFoundResponse: {
          type: 'object',
          description: 'Machine-readable JSON 404 payload served by Cloudflare Pages for unknown routes.',
          required: ['schema_version', 'status', 'error', 'fallback_policy', 'machine_entrypoints'],
          properties: {
            schema_version: { const: 'anchorfact.not-found.v1' },
            generated: { type: 'string', format: 'date-time' },
            status: { const: 404 },
            error: {
              type: 'object',
              required: ['code', 'message'],
              properties: {
                code: { const: 'not_found' },
                message: { type: 'string' }
              },
              additionalProperties: true
            },
            fallback_policy: {
              type: 'object',
              required: ['no_spa_fallback'],
              properties: {
                no_spa_fallback: { const: true },
                reason: { type: 'string' }
              },
              additionalProperties: true
            },
            machine_entrypoints: { type: 'array', items: { type: 'string' } },
            official_site: { type: 'string', format: 'uri' }
          },
          additionalProperties: true
        },
        Sources: schemaVersioned('Sources', SOURCES_SCHEMA_VERSION, {
          source_count: { type: 'integer' },
          sources: { type: 'array', items: { type: 'object' } }
        }),
        Provenance: schemaVersioned('Provenance', PROVENANCE_SCHEMA_VERSION, {
          artifacts: { type: 'object' },
          signature: { type: 'object' }
        }),
        ProvenanceSignature: schemaVersioned('Provenance signature', 'anchorfact.provenance-signature.v1'),
        ArticleJsonLd: {
          type: 'object',
          required: ['@context', '@type', '@id', 'url', 'headline', 'anchorfact:status'],
          properties: {
            '@context': { const: 'https://schema.org' },
            '@type': { type: 'string' },
            '@id': { type: 'string' },
            url: { type: 'string', format: 'uri' },
            headline: { type: 'string' },
            'anchorfact:status': { enum: ['public', 'draft'] },
            'anchorfact:confidence': { enum: ['low', 'medium', 'high'] },
            'anchorfact:verification': { type: 'object' },
            citation: { type: 'array', items: { type: 'object' } }
          },
          additionalProperties: true
        }
      }
    }
  };
}
