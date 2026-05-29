import {
  MCP_SCHEMA_VERSION,
  OFFICIAL_SOURCE_REPOSITORY,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';

const MCP_SERVER_NAME = 'anchorfact';

const STDIO_CONFIG = {
  command: 'python',
  args: ['src/mcp_server.py']
};

const HTTP_CONFIG = {
  command: 'python',
  args: ['src/mcp_http.py'],
  base_url: 'http://127.0.0.1:8000'
};

function tool(name, description, inputSchema) {
  return {
    name,
    description,
    input_schema: inputSchema
  };
}

export function buildMcpProfile({
  generated,
  manifest,
  claimsPayload,
  searchIndexPayload,
  sourcesPayload,
  site = OFFICIAL_SITE
}) {
  return {
    schema_version: MCP_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    name: 'io.github.anchorfact/anchorfact',
    display_name: 'AnchorFact',
    description: 'Manifest-backed public article and verified-claims interface for LLM citations.',
    official_site: OFFICIAL_SITE,
    official_source_repository: OFFICIAL_SOURCE_REPOSITORY,
    registry_note: 'This is an AnchorFact install manifest, not an official MCP Registry server.json submission.',
    current_snapshot: {
      public_articles: manifest?.public_article_count ?? null,
      draft_articles: manifest?.draft_article_count ?? null,
      public_claims: claimsPayload?.claim_count ?? null,
      searchable_records: searchIndexPayload?.article_count ?? null,
      unique_sources: sourcesPayload?.source_count ?? null
    },
    data_contract: {
      public_only: true,
      backed_by: '/manifest.json',
      requires_build_before_local_stdio: true,
      draft_entries_excluded: true,
      provenance_url: publicUrl(PROVENANCE_PATH, site)
    },
    installation: {
      requirements: [
        'npm install',
        'npm run build',
        'python -m pip install -r src/requirements-mcp.txt'
      ],
      stdio: {
        transport: 'stdio',
        command: STDIO_CONFIG.command,
        args: STDIO_CONFIG.args,
        config_snippet: {
          mcpServers: {
            [MCP_SERVER_NAME]: {
              ...STDIO_CONFIG,
              description: 'AnchorFact public article and verified-claims interface for LLM citations.'
            }
          }
        }
      },
      local_http_wrapper: {
        transport: 'http',
        command: HTTP_CONFIG.command,
        args: HTTP_CONFIG.args,
        base_url: HTTP_CONFIG.base_url,
        endpoints: {
          health: `${HTTP_CONFIG.base_url}/health`,
          search: `${HTTP_CONFIG.base_url}/search?q={query}`,
          article: `${HTTP_CONFIG.base_url}/article?id={canonical_slug}`,
          cite: `${HTTP_CONFIG.base_url}/cite?id={claim_id}`,
          stats: `${HTTP_CONFIG.base_url}/stats`
        }
      }
    },
    tools: [
      tool('anchorfact_search', 'Search public AnchorFact articles with BM25 ranking.', {
        type: 'object',
        required: ['query'],
        properties: {
          query: { type: 'string', description: 'Natural-language search query.' },
          confidence_min: {
            type: 'string',
            enum: ['high', 'medium', 'low'],
            default: 'medium',
            description: 'Minimum public confidence filter.'
          },
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: 20,
            default: 5,
            description: 'Maximum result count.'
          }
        }
      }),
      tool('anchorfact_get_article', 'Retrieve one public article by canonical slug, canonical URL, or JSON-LD @id.', {
        type: 'object',
        required: ['article_id'],
        properties: {
          article_id: {
            type: 'string',
            description: 'Canonical slug, canonical URL, or JSON-LD @id.'
          }
        }
      }),
      tool('anchorfact_cite_claim', 'Return citation-ready JSON or Markdown for one public AnchorFact claim.', {
        type: 'object',
        required: ['claim_id'],
        properties: {
          claim_id: {
            type: 'string',
            description: 'Claim shorthand, /fact/{id}, or full https://anchorfact.org/fact/{id} URL.'
          },
          format: {
            type: 'string',
            enum: ['json', 'markdown', 'md'],
            default: 'json',
            description: 'Output format.'
          }
        }
      }),
      tool('anchorfact_list_categories', 'List public AnchorFact categories and article counts.', {
        type: 'object',
        properties: {}
      })
    ],
    related_public_artifacts: [
      '/agent.json',
      '/openapi.json',
      '/examples.json',
      '/evals.json',
      '/graph.json',
      '/search-index.json',
      '/sources.json',
      '/claims.json',
      '/provenance.json'
    ]
  };
}
