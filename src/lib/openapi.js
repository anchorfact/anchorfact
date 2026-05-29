import {
  AGENT_PROFILE_SCHEMA_VERSION,
  ARTICLE_API_SCHEMA_VERSION,
  CLAIM_API_SCHEMA_VERSION,
  CLAIMS_SCHEMA_VERSION,
  COMPILER_VERSION,
  EVALS_SCHEMA_VERSION,
  EVIDENCE_API_SCHEMA_VERSION,
  EXAMPLES_SCHEMA_VERSION,
  GRAPH_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  MCP_SCHEMA_VERSION,
  OFFICIAL_SITE,
  OPENAPI_SCHEMA_VERSION,
  PROVENANCE_PATH,
  PROVENANCE_SCHEMA_VERSION,
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
      '/manifest.json': getJson('Public and draft article manifest', 'Manifest'),
      '/claims.json': getJson('Public verified atomic claims', 'Claims'),
      '/topics.json': getJson('Public topic coverage map', 'Topics'),
      '/examples.json': getJson('Executable AI usage examples', 'Examples'),
      '/graph.json': getJson('Public knowledge graph', 'Graph'),
      '/evals.json': getJson('Executable AI integration checks', 'Evals'),
      '/mcp.json': getJson('Local MCP installation manifest', 'McpProfile'),
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
        AgentProfile: schemaVersioned('Agent profile', AGENT_PROFILE_SCHEMA_VERSION),
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
