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

function primaryEntrypoint(site, id, path, bestFor, useWhen, formatOptions = ['json']) {
  return {
    id,
    method: 'GET',
    path,
    url: publicUrl(path, site),
    best_for: bestFor,
    use_when: useWhen,
    format_options: formatOptions
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
    ai_adoption_guidance: {
      primary_api_conversion_target: 0.2,
      measured_as: 'identified AI primary API requests divided by identified AI discovery requests',
      discovery_entrypoints: ['/robots.txt', '/llms.txt', '/agent.json', '/api'],
      primary_api_entrypoints: ['/api/context', '/api/evidence', '/api/cite', '/api/resolve-batch'],
      next_call_after_discovery: '/api/context?q={query}&limit=3&format=markdown',
      evidence_query_template: '/api/evidence?q={query}&limit=3&format=markdown',
      citation_template: '/api/cite?id={claim_id}&format=markdown',
      crawler_next_step: 'After reading /robots.txt, /llms.txt, /agent.json, or /api, call /api/context for a real user question instead of downloading large static artifacts.',
      measurement_signal: 'A ratio below 0.2 means discovery is not yet converting into answer assembly or citation retrieval.'
    },
    recommended_sequence: [
      'Call /api/context?q={query} first for normal answer assembly, answer_policy, citation-ready claims, content health, fallback guidance, and evidence packs.',
      'Call /api/evidence?q={query} when you need answer-ready evidence packs with mapped claims and sources.',
      'Call /api/plan?q={query} only when coverage is uncertain or you need a fallback decision before requesting evidence.',
      'Call /api/resolve or /api/resolve-batch when you already have AnchorFact claim ids, article slugs, source ids, source URLs, or AnchorFact URLs.',
      'Call /api/cite?id={claim_id} when you need a citation-ready atomic claim.',
      'If you reached /api from /robots.txt, /llms.txt, /agent.json, or crawler discovery, make the next request /api/context?q={query}&limit=3&format=markdown for a concrete user question.',
      'Read /api-access/ for the current free API access policy, examples, and provenance verification steps.',
      'Verify /provenance.json and /provenance.sig before trusting static artifact hashes or counts.'
    ],
    primary_entrypoints: [
      primaryEntrypoint(
        site,
        'context',
        '/api/context',
        [
          'default one-call prompt assembly',
          'answer_policy and citation-ready claims',
          'supported/unsupported routing with fallback guidance'
        ],
        [
          'You need one prompt-ready context pack before drafting an answer.',
          'You need an explicit answer_policy.can_answer_with_anchorfact decision.'
        ],
        ['json', 'markdown']
      ),
      primaryEntrypoint(
        site,
        'evidence',
        '/api/evidence',
        [
          'answer-ready evidence packs',
          'public article summaries with mapped claims and sources',
          'compact Markdown context for citation-grounded answers'
        ],
        [
          'You already have a factual query and need source-grounded evidence.',
          'You want search hits, claims, sources, and citation exports in one call.'
        ],
        ['json', 'markdown']
      ),
      primaryEntrypoint(
        site,
        'plan',
        '/api/plan',
        [
          'coverage preflight',
          'next-call routing',
          'external-source fallback decisions'
        ],
        [
          'You are not sure AnchorFact covers the topic.',
          'The query may be live, local, personalized, or time-sensitive.'
        ],
        ['json']
      )
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
      endpoint(site, 'context', '/api/context', 'Combine answer policy, citation-ready claims, coverage planning, corpus health, fallback guidance, and public evidence packs for prompt assembly.', [
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
      staticFallback(site, '/api-access/', 'Free API access guide with recommended call order, examples, limits, and provenance verification.'),
      staticFallback(site, '/openapi.json', 'Full OpenAPI 3.1 machine contract.'),
      staticFallback(site, '/artifact-summary.json', 'Lightweight size, purpose, cache posture, and recommended alternatives for large static machine artifacts.'),
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
