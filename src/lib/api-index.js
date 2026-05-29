export const API_INDEX_SCHEMA_VERSION = 'anchorfact.api-index.v1';

const OFFICIAL_SITE = 'https://anchorfact.org';
const PROVENANCE_PATH = '/provenance.json';

function publicUrl(path, site = OFFICIAL_SITE) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${String(site || OFFICIAL_SITE).replace(/\/+$/, '')}${normalizedPath}`;
}

function endpoint(site, id, path, description, query = []) {
  return {
    id,
    method: 'GET',
    path,
    url: publicUrl(path, site),
    query,
    description
  };
}

function staticFallback(site, path, description) {
  return {
    path,
    url: publicUrl(path, site),
    description
  };
}

export function buildApiIndex({
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE
} = {}) {
  return {
    schema_version: API_INDEX_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    name: 'AnchorFact Machine API Index',
    description: 'Compact read-only API discovery for AI agents that need the smallest live endpoint before fetching the full OpenAPI contract.',
    read_only: true,
    recommended_sequence: [
      'Call /api/plan?q={query} first when you are not sure AnchorFact covers a topic.',
      'Call /api/evidence?q={query} when you need answer-ready evidence packs with mapped claims and sources.',
      'Call /api/context?q={query} when you want planning status, fallback guidance, and evidence packs in one prompt-assembly payload.',
      'Call /api/resolve or /api/resolve-batch when you already have AnchorFact claim ids, article slugs, source ids, source URLs, or AnchorFact URLs.',
      'Call /api/cite?id={claim_id} when you need a citation-ready atomic claim.',
      'Verify /provenance.json and /provenance.sig before trusting static artifact hashes or counts.'
    ],
    endpoints: [
      endpoint(site, 'plan', '/api/plan', 'Decide whether AnchorFact coverage is plausible and which endpoint to call next.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum article match count; default 3.' }
      ]),
      endpoint(site, 'evidence', '/api/evidence', 'Return one-call public evidence packs with article summaries, claims, sources, and citation exports.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum evidence pack count; default 5.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ]),
      endpoint(site, 'context', '/api/context', 'Combine coverage planning, fallback guidance, and public evidence packs for prompt assembly.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum evidence pack count; default 3.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ]),
      endpoint(site, 'search', '/api/search', 'Search compact public records by query.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum result count; default 5.' }
      ]),
      endpoint(site, 'article', '/api/article', 'Fetch one public article evidence bundle with claims, sources, and citation exports.', [
        { name: 'slug', required: true, description: 'Canonical public article slug.' }
      ]),
      endpoint(site, 'claim', '/api/claim', 'Dereference one public atomic claim with article and source context.', [
        { name: 'id', required: true, description: 'Public claim id or shorthand id such as f1.' }
      ]),
      endpoint(site, 'cite', '/api/cite', 'Return a citation-ready public atomic claim.', [
        { name: 'id', required: true, description: 'Public claim id or shorthand id such as f1.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ]),
      endpoint(site, 'source', '/api/source', 'Inspect a public source and mapped claims by source id or original URL.', [
        { name: 'id', required: false, description: 'Source id from /sources.json.' },
        { name: 'url', required: false, description: 'Original source URL.' }
      ]),
      endpoint(site, 'resolve', '/api/resolve', 'Resolve one mixed public reference to its matching public payload.', [
        { name: 'ref', required: true, description: 'Claim id, article slug, source id, AnchorFact URL, or original source URL.' }
      ]),
      endpoint(site, 'resolve_batch', '/api/resolve-batch', 'Resolve up to 20 mixed public references in one request.', [
        { name: 'ref', required: true, description: 'Repeat for each reference.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ])
    ],
    static_fallbacks: [
      staticFallback(site, '/agent.json', 'Full AI agent discovery profile and recommended workflow.'),
      staticFallback(site, '/openapi.json', 'Full OpenAPI 3.1 machine contract.'),
      staticFallback(site, '/capabilities.json', 'Task-to-endpoint routing guide.'),
      staticFallback(site, '/content-health.json', 'Signed corpus health summary for AI trust decisions.'),
      staticFallback(site, '/coverage.json', 'Coverage and limits guide for deciding when to fall back to external primary sources.'),
      staticFallback(site, '/examples.json', 'Executable workflow examples.'),
      staticFallback(site, '/evals.json', 'Executable golden checks for this machine contract.'),
      staticFallback(site, '/mcp.json', 'Local MCP installation manifest.'),
      staticFallback(site, '/provenance.json', 'Signed build identity, counts, and static artifact hashes.')
    ]
  };
}
