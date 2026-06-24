import {
  API_CALL_GUIDANCE,
  buildErrorRecoveryDiscoveryGuidance
} from './api-machine-guidance.js';

export const API_INDEX_SCHEMA_VERSION = 'anchorfact.api-index.v1';

const OFFICIAL_SITE = 'https://anchorfact.org';
const PROVENANCE_PATH = '/provenance.json';

function publicUrl(path, site = OFFICIAL_SITE) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${String(site || OFFICIAL_SITE).replace(/\/+$/, '')}${normalizedPath}`;
}

function endpoint(site, id, path, description, query = [], options = {}) {
  return {
    id,
    method: 'GET',
    path,
    url: publicUrl(path, site),
    query,
    description,
    ...options
  };
}

function staticFallback(site, path, description, mediaType = 'application/json') {
  return {
    path,
    url: publicUrl(path, site),
    media_type: mediaType,
    description
  };
}

function primaryEntrypoint(site, id, path, bestFor, useWhen, formatOptions = ['json'], minimumValidPath = null) {
  return {
    id,
    method: 'GET',
    path,
    url: publicUrl(path, site),
    minimum_valid_path: minimumValidPath,
    minimum_valid_url: minimumValidPath ? publicUrl(minimumValidPath, site) : null,
    best_for: bestFor,
    use_when: useWhen,
    format_options: formatOptions
  };
}

function publicApiCall(call, site) {
  return {
    ...call,
    method: 'GET',
    url: publicUrl(call.path, site)
  };
}

export function buildApiIndex({
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE
} = {}) {
  const minimumValidPrimaryCalls = API_CALL_GUIDANCE.minimum_valid_primary_calls.map(call => publicApiCall(call, site));
  const nextRequestAfterDiscovery = minimumValidPrimaryCalls.find(call => call.id === 'context') || minimumValidPrimaryCalls[0] || null;

  return {
    schema_version: API_INDEX_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    name: 'AnchorFact Machine API Index',
    description: 'Compact read-only API discovery for AI agents that need the smallest live endpoint before fetching the full OpenAPI contract.',
    read_only: true,
    quick_start: {
      purpose: 'Copy one valid primary API request before trying bare endpoint paths.',
      default_answer_path: '/api/context?q={query}',
      next_request_after_discovery: nextRequestAfterDiscovery,
      minimum_valid_primary_calls: minimumValidPrimaryCalls,
      parameter_error_prevention: {
        ...API_CALL_GUIDANCE.parameter_error_prevention
      },
      example_calls: [
        publicApiCall({ id: 'context_example', path: '/api/context?q=gaussian%20splatting&limit=3&format=markdown', required_parameter: 'q' }, site),
        publicApiCall({ id: 'evidence_example', path: '/api/evidence?q=RLHF&limit=3&format=markdown', required_parameter: 'q' }, site)
      ]
    },
    ai_adoption_guidance: {
      primary_api_conversion_target: 0.2,
      measured_as: 'identified AI primary API requests divided by identified AI discovery requests',
      discovery_entrypoints: ['/robots.txt', '/llms.txt', '/agent.json', '/api'],
      primary_api_entrypoints: ['/api/context', '/api/evidence', '/api/cite', '/api/resolve-batch'],
      next_call_after_discovery: '/api/context?q={query}&limit=3&format=markdown',
      next_request_after_discovery: nextRequestAfterDiscovery,
      minimum_valid_primary_calls: minimumValidPrimaryCalls,
      parameter_error_prevention: {
        ...API_CALL_GUIDANCE.parameter_error_prevention
      },
      evidence_query_template: '/api/evidence?q={query}&limit=3&format=markdown',
      citation_template: '/api/cite?id={claim_id}&format=markdown',
      crawler_next_step: 'After reading /robots.txt, /llms.txt, /agent.json, or /api, call /api/context for a real user question instead of downloading large static artifacts.',
      measurement_signal: 'A ratio below 0.2 means discovery is not yet converting into answer assembly or citation retrieval.'
    },
    error_recovery_guidance: buildErrorRecoveryDiscoveryGuidance({ site }),
    readiness_guidance: {
      status_endpoint: '/api-readiness.json',
      report_only_until_gates_met: true,
      default_access_until_ready: 'free_no_key_read_only',
      subscription_ready_requires: [
        'production_integrity_14_day',
        'public_audit_14_day',
        'core_query_context_ratio',
        'ai_primary_discovery_ratio_7_day',
        'design_partners'
      ],
      start_paid_beta_only_after: 'All automated readiness windows pass and external design partner plus paid-intent signals are real.'
    },
    recommended_sequence: [
      'Call /api/context?q={query} first for normal answer assembly, answer_policy, citation-ready claims, content health, fallback guidance, and evidence packs.',
      'Call /api/evidence?q={query} when you need answer-ready evidence packs with mapped claims and sources.',
      'Call /api/plan?q={query} only when coverage is uncertain or you need a fallback decision before requesting evidence.',
      'Call /api/resolve or /api/resolve-batch when you already have AnchorFact claim ids, article slugs, source ids, source URLs, or AnchorFact URLs.',
      'Call /api/cite?id={claim_id} when you need a citation-ready atomic claim.',
      'If you reached /api from /robots.txt, /llms.txt, /agent.json, or crawler discovery, make the next request /api/context?q={query}&limit=3&format=markdown for a concrete user question.',
      'Read /api-access/ for the current machine-readable free API access policy, call order, and provenance verification steps.',
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
        ['json', 'markdown'],
        '/api/context?q={query}&limit=3&format=markdown'
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
        ['json', 'markdown'],
        '/api/evidence?q={query}&limit=3&format=markdown'
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
        ['json'],
        '/api/plan?q={query}&limit=3'
      )
    ],
    endpoints: [
      endpoint(site, 'plan', '/api/plan', 'Decide whether AnchorFact coverage is plausible and which endpoint to call next.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum article match count; default 3.' }
      ], {
        minimum_valid_paths: ['/api/plan?q={query}&limit=3'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'evidence', '/api/evidence', 'Return one-call public evidence packs with article summaries, claims, sources, and citation exports.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum evidence pack count; default 5.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ], {
        minimum_valid_paths: ['/api/evidence?q={query}&limit=3&format=markdown'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'context', '/api/context', 'Combine answer policy, citation-ready claims, coverage planning, corpus health, fallback guidance, and public evidence packs for prompt assembly.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum evidence pack count; default 3.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ], {
        minimum_valid_paths: ['/api/context?q={query}&limit=3&format=markdown'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'search', '/api/search', 'Search compact public records by query.', [
        { name: 'q', required: true, description: 'Natural-language query.' },
        { name: 'limit', required: false, description: 'Maximum result count; default 5.' }
      ], {
        minimum_valid_paths: ['/api/search?q={query}&limit=5'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'article', '/api/article', 'Fetch one public article evidence bundle with claims, sources, and citation exports.', [
        { name: 'slug', required: true, description: 'Canonical public article slug.' }
      ], {
        minimum_valid_paths: ['/api/article?slug={canonical_slug}'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'claim', '/api/claim', 'Dereference one public atomic claim with article and source context.', [
        { name: 'id', required: true, description: 'Public claim id or shorthand id such as f1.' }
      ], {
        minimum_valid_paths: ['/api/claim?id={claim_id}'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'cite', '/api/cite', 'Return a citation-ready public atomic claim.', [
        { name: 'id', required: true, description: 'Public claim id or shorthand id such as f1.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ], {
        minimum_valid_paths: ['/api/cite?id={claim_id}&format=markdown'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'source', '/api/source', 'Inspect a public source and mapped claims by source id or original URL.', [
        { name: 'id', required: false, description: 'Source id from /sources.json.' },
        { name: 'url', required: false, description: 'Original source URL.' }
      ], {
        minimum_valid_paths: ['/api/source?id={source_id}', '/api/source?url={source_url}'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'resolve', '/api/resolve', 'Resolve one mixed public reference to its matching public payload.', [
        { name: 'ref', required: true, description: 'Claim id, article slug, source id, AnchorFact URL, or original source URL.' }
      ], {
        minimum_valid_paths: ['/api/resolve?ref={claim_id}'],
        bare_path_returns_recoverable_400: true
      }),
      endpoint(site, 'resolve_batch', '/api/resolve-batch', 'Resolve up to 20 mixed public references in one request.', [
        { name: 'ref', required: true, description: 'Repeat for each reference.' },
        { name: 'format', required: false, description: 'json, markdown, or md.' }
      ], {
        minimum_valid_paths: ['/api/resolve-batch?ref={claim_id}&ref={source_id}', '/api/resolve-batch?ref={claim_id}&ref={source_id}&format=markdown'],
        bare_path_returns_recoverable_400: true
      })
    ],
    static_fallbacks: [
      staticFallback(site, '/index.json', 'Compact root machine directory for preferred entrypoints, trust policy, and signed artifacts.'),
      staticFallback(site, '/agent.json', 'Full AI agent discovery profile and recommended workflow.'),
      staticFallback(site, '/api-access/', 'Machine-readable free API access policy with recommended call order, limits, and provenance verification.'),
      staticFallback(site, '/openapi.json', 'Full OpenAPI 3.1 machine contract.'),
      staticFallback(site, '/artifact-summary.json', 'Lightweight size, purpose, cache posture, and recommended alternatives for large static machine artifacts.'),
      staticFallback(site, '/artifact-shards.json', 'Signed registry of versioned shards for large static artifacts.'),
      staticFallback(site, '/api-readiness.json', 'Subscription-readiness gates, core corpus scorecard, and API citation readiness report.'),
      staticFallback(site, '/capabilities.json', 'Task-to-endpoint routing guide.'),
      staticFallback(site, '/content-health.json', 'Signed corpus health summary for AI trust decisions and source-ready/source acquisition draft repair queues.'),
      staticFallback(site, '/coverage.json', 'Coverage and limits guide for deciding when to fall back to external primary sources.'),
      staticFallback(site, '/examples.json', 'Executable workflow examples.'),
      staticFallback(site, '/evals.json', 'Executable golden checks for this machine contract.'),
      staticFallback(site, '/mcp.json', 'Local MCP installation manifest.'),
      staticFallback(site, '/provenance.json', 'Signed build identity, counts, and static artifact hashes.')
    ]
  };
}
