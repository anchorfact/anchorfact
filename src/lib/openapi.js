import {
  AGENT_PROFILE_SCHEMA_VERSION,
  API_INDEX_SCHEMA_VERSION,
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
      '/agent.json': getJson('AI agent discovery profile', 'AgentProfile'),
      '/.well-known/anchorfact.json': getJson('Well-known alias for the AI agent discovery profile', 'AgentProfile'),
      '/openapi.json': getJson('This OpenAPI machine contract', 'OpenApiContract'),
      '/api': getJson('Compact live API discovery index', 'ApiIndex'),
      '/artifact-summary.json': getJson('Lightweight static artifact size and alternative-call summary', 'ArtifactSummary'),
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
        AgentProfile: schemaVersioned('Agent profile', AGENT_PROFILE_SCHEMA_VERSION, {
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
          recommended_sequence: { type: 'array', items: { type: 'string' } },
          primary_entrypoints: { type: 'array', items: { type: 'object' } },
          endpoints: { type: 'array', items: { type: 'object' } },
          static_fallbacks: { type: 'array', items: { type: 'object' } }
        }),
        ArtifactSummary: schemaVersioned('Artifact summary', ARTIFACT_SUMMARY_SCHEMA_VERSION, {
          total_bytes: { type: 'integer' },
          artifact_growth_policy: { type: 'object' },
          recommended_default_calls: { type: 'array', items: { type: 'object' } },
          artifacts: { type: 'array', items: { type: 'object' } }
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
          draft: { type: 'object' },
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
          citation_ready_claims: {
            type: 'array',
            items: { $ref: '#/components/schemas/CitationReadyClaim' }
          },
          evidence_pack_count: { type: 'integer' },
          evidence_packs: { type: 'array', items: { type: 'object' } },
          content_health: { type: ['object', 'null'] },
          recommended_next_calls: { type: 'array', items: { type: 'object' } },
          fallback_guidance: { type: 'array', items: { type: 'string' } }
        }),
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
            }
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
