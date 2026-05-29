import {
  CITE_API_SCHEMA_VERSION,
  CLAIM_API_SCHEMA_VERSION,
  EVALS_SCHEMA_VERSION,
  EVIDENCE_API_SCHEMA_VERSION,
  GRAPH_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  PROVENANCE_SCHEMA_VERSION,
  SOURCE_API_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

const PREFERRED_SLUG = 'ai/3d-generation-gaussian-splatting';

function queryPath(path, params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && String(value).trim()) {
      search.set(key, String(value));
    }
  }
  return `${path}?${search.toString()}`;
}

function call(path, site) {
  return {
    method: 'GET',
    path,
    url: publicUrl(path, site)
  };
}

function claimShortId(claimId) {
  if (!claimId) return null;
  try {
    const url = new URL(claimId);
    return url.pathname.split('/').filter(Boolean).pop() || claimId;
  } catch {
    return String(claimId).split('/').filter(Boolean).pop() || claimId;
  }
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '').toLowerCase();
}

function choosePrimaryRecord(records) {
  return records.find(record => record.canonical_slug === PREFERRED_SLUG)
    || records.find(record => Array.isArray(record.claim_ids) && record.claim_ids.length > 0)
    || records[0]
    || null;
}

function queryForRecord(record) {
  const keywords = Array.isArray(record?.keywords) ? record.keywords : [];
  const query = keywords.filter(Boolean).slice(0, 2).join(' ');
  if (query) return query;
  return String(record?.title || record?.canonical_slug || '').split(/\s+/).slice(0, 3).join(' ');
}

function chooseClaim(claims, record) {
  const claimIds = new Set(record?.claim_ids || []);
  return claims.find(claim => claimIds.has(claim.id))
    || claims.find(claim => claim.canonical_slug === record?.canonical_slug)
    || claims[0]
    || null;
}

function chooseSource(sources, claim, record) {
  const claimUrl = normalizeUrl(claim?.source_url);
  const claimTitle = normalizeText(claim?.source_title);
  const recordSlug = record?.canonical_slug;

  return sources.find(source => {
    const linkedToRecord = (source?.articles || []).some(article => article?.canonical_slug === recordSlug);
    if (!linkedToRecord) return false;
    return (claimUrl && normalizeUrl(source.url) === claimUrl)
      || (claimTitle && normalizeText(source.title) === claimTitle);
  })
    || sources.find(source => (source?.articles || []).some(article => article?.canonical_slug === recordSlug))
    || sources[0]
    || null;
}

function sourceLookupPath(source) {
  if (!source) return null;
  if (source.url) return queryPath('/api/source', { url: source.url });
  return queryPath('/api/source', { id: source.id });
}

function graphHasEdgeType(graphPayload, type) {
  return (graphPayload?.edges || []).some(edge => edge?.type === type);
}

export function buildEvalsIndex({
  generated,
  searchIndexPayload,
  claimsPayload,
  sourcesPayload,
  graphPayload,
  site = OFFICIAL_SITE
}) {
  const records = searchIndexPayload?.records || [];
  const claims = claimsPayload?.claims || [];
  const sources = sourcesPayload?.sources || [];
  const record = choosePrimaryRecord(records);

  if (!record) {
    return {
      schema_version: EVALS_SCHEMA_VERSION,
      generated,
      provenance_url: publicUrl(PROVENANCE_PATH, site),
      eval_count: 0,
      evals: []
    };
  }

  const query = queryForRecord(record);
  const claim = chooseClaim(claims, record);
  const source = chooseSource(sources, claim, record);
  const claimLookupId = claimShortId(claim?.id);
  const sourcePath = sourceLookupPath(source);
  const evidencePath = queryPath('/api/evidence', { q: query, limit: 3 });
  const markdownPath = queryPath('/api/evidence', { q: query, limit: 1, format: 'markdown' });
  const claimPath = queryPath('/api/claim', { id: claimLookupId });
  const citePath = queryPath('/api/cite', { id: claimLookupId });

  const evals = [
    {
      id: 'evidence_pack_json',
      intent: 'Confirm the one-call evidence API returns source-grounded JSON for a canonical public query.',
      call: call(evidencePath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: EVIDENCE_API_SCHEMA_VERSION,
        contains_canonical_slug: record.canonical_slug,
        min_packs: 1,
        min_claims_per_matching_pack: 1,
        min_sources_per_matching_pack: 1
      }
    },
    {
      id: 'evidence_pack_markdown',
      intent: 'Confirm answer-ready Markdown evidence packs stay available for prompt assembly.',
      call: call(markdownPath, site),
      expected: {
        status: 200,
        content_type: 'text/markdown',
        contains_text: [
          'AnchorFact Evidence Pack',
          'Citation contract:'
        ]
      }
    },
    {
      id: 'claim_dereference',
      intent: 'Confirm a public atomic claim can be dereferenced with article and source context.',
      call: call(claimPath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: CLAIM_API_SCHEMA_VERSION,
        claim_id: claim?.id || null,
        canonical_slug: record.canonical_slug,
        min_sources: 1
      }
    },
    {
      id: 'citation_export',
      intent: 'Confirm one public atomic claim can be returned as a citation-ready payload.',
      call: call(citePath, site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: CITE_API_SCHEMA_VERSION,
        claim_id: claim?.id || null,
        canonical_slug: record.canonical_slug,
        citation_export_contains: [
          'AnchorFact:',
          claim?.source_url || source?.url || ''
        ].filter(Boolean)
      }
    },
    {
      id: 'source_reuse_lookup',
      intent: 'Confirm a public source lookup returns mapped public claims for reuse-aware citation.',
      call: call(sourcePath || '/sources.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: sourcePath ? SOURCE_API_SCHEMA_VERSION : null,
        source_id: source?.id || null,
        contains_claim_id: claim?.id || null,
        min_claims: sourcePath ? 1 : null
      }
    },
    {
      id: 'graph_relationships',
      intent: 'Confirm the signed graph exposes article-to-claim and claim-to-source traversal edges.',
      call: call('/graph.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: GRAPH_SCHEMA_VERSION,
        min_nodes: Math.max(1, graphPayload?.node_count || 0),
        min_edges: Math.max(1, graphPayload?.edge_count || 0),
        required_edge_types: [
          'article_has_claim',
          'claim_supported_by_source'
        ],
        currently_present: {
          article_has_claim: graphHasEdgeType(graphPayload, 'article_has_claim'),
          claim_supported_by_source: graphHasEdgeType(graphPayload, 'claim_supported_by_source')
        }
      }
    },
    {
      id: 'signed_provenance_static_artifacts',
      intent: 'Confirm static artifacts needed by AI consumers remain hash-covered by provenance.',
      call: call('/provenance.json', site),
      expected: {
        status: 200,
        content_type: 'application/json',
        schema_version: PROVENANCE_SCHEMA_VERSION,
        required_artifacts: [
          'agent_json',
          'openapi_json',
          'manifest_json',
          'claims_json',
          'topics_json',
          'examples_json',
          'graph_json',
          'evals_json',
          'mcp_json',
          'search_index_json',
          'sources_json',
          'llms_txt'
        ]
      }
    }
  ];

  return {
    schema_version: EVALS_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    eval_count: evals.length,
    evals
  };
}
