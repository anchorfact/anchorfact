import {
  EXAMPLES_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';

const PREFERRED_SLUG = 'ai/3d-generation-gaussian-splatting';

function queryPath(path, params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== null && item !== undefined && String(item).trim()) {
          search.append(key, String(item));
        }
      }
    } else if (value !== null && value !== undefined && String(value).trim()) {
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

function topicIdForRecord(record) {
  return String(record?.canonical_slug || '').split('/')[0] || null;
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

function claimShortId(claimId) {
  if (!claimId) return null;
  try {
    const url = new URL(claimId);
    const lastPathPart = url.pathname.split('/').filter(Boolean).pop();
    return lastPathPart || claimId;
  } catch {
    const lastPathPart = String(claimId).split('/').filter(Boolean).pop();
    return lastPathPart || claimId;
  }
}

function normalizedUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '').toLowerCase();
}

function chooseClaim(claims, record) {
  const claimIds = new Set(record?.claim_ids || []);
  return claims.find(claim => claimIds.has(claim.id))
    || claims.find(claim => claim.canonical_slug === record?.canonical_slug)
    || claims[0]
    || null;
}

function chooseSource(sources, claim) {
  if (!claim) return sources[0] || null;
  const claimUrl = normalizedUrl(claim.source_url);
  return sources.find(source => claimUrl && normalizedUrl(source.url) === claimUrl)
    || sources.find(source => source.title === claim.source_title)
    || sources[0]
    || null;
}

function sourceLookupPath(source) {
  if (!source) return null;
  if (source.url) return queryPath('/api/source', { url: source.url });
  return queryPath('/api/source', { id: source.id });
}

function articleAnchor(record) {
  return {
    canonical_slug: record.canonical_slug,
    title: record.title,
    confidence_level: record.confidence_level,
    claim_count: record.claim_count,
    source_count: record.source_count
  };
}

function claimAnchor(claim) {
  return claim ? {
    id: claim.id,
    lookup_id: claimShortId(claim.id),
    statement: claim.statement,
    confidence: claim.confidence,
    source_url: claim.source_url || null
  } : null;
}

function sourceAnchor(source) {
  return source ? {
    id: source.id,
    title: source.title,
    url: source.url || null,
    tier: source.tier,
    type: source.type,
    article_count: source.article_count,
    claim_count: source.claim_count
  } : null;
}

export function buildExamplesIndex({
  generated,
  topicsPayload,
  searchIndexPayload,
  claimsPayload,
  sourcesPayload,
  site = OFFICIAL_SITE
}) {
  const records = searchIndexPayload?.records || [];
  const claims = claimsPayload?.claims || [];
  const sources = sourcesPayload?.sources || [];
  const topics = topicsPayload?.topics || [];
  const record = choosePrimaryRecord(records);

  if (!record) {
    return {
      schema_version: EXAMPLES_SCHEMA_VERSION,
      generated,
      provenance_url: publicUrl(PROVENANCE_PATH, site),
      example_count: 0,
      examples: []
    };
  }

  const query = queryForRecord(record);
  const topicId = topicIdForRecord(record);
  const topic = topics.find(candidate => candidate.id === topicId) || null;
  const claim = chooseClaim(claims, record);
  const source = chooseSource(sources, claim);
  const evidencePath = queryPath('/api/evidence', { q: query, limit: 3 });
  const evidenceMarkdownPath = queryPath('/api/evidence', { q: query, limit: 3, format: 'markdown' });
  const searchPath = queryPath('/api/search', { q: query, limit: 3 });
  const resolveClaimPath = queryPath('/api/resolve', { ref: claimShortId(claim?.id) });
  const mixedReferences = [claimShortId(claim?.id), source?.url || source?.id, record.canonical_slug].filter(Boolean);
  const resolveBatchPath = queryPath('/api/resolve-batch', { ref: mixedReferences });
  const resolveBatchMarkdownPath = queryPath('/api/resolve-batch', { ref: mixedReferences.slice(0, 2), format: 'markdown' });
  const articlePath = queryPath('/api/article', { slug: record.canonical_slug });
  const claimPath = queryPath('/api/claim', { id: claimShortId(claim?.id) });
  const citePath = queryPath('/api/cite', { id: claimShortId(claim?.id) });
  const sourcePath = sourceLookupPath(source);

  const examples = [
    {
      id: 'one_call_evidence_pack',
      intent: 'Fetch a compact source-grounded evidence pack for a natural-language question in one HTTP call.',
      user_question: `What can AnchorFact verify about ${query}?`,
      topic: topicId,
      workflow: [
        { step: 1, call: call(evidencePath, site), use: 'Read public article summaries, matched claims, and mapped sources before answering.' },
        { step: 2, call: call(evidenceMarkdownPath, site), use: 'Fetch answer-ready Markdown context when a model prompt prefers text over JSON.' }
      ],
      expected_anchor: {
        topic: topic ? { id: topic.id, title: topic.title, article_count: topic.article_count } : null,
        article: articleAnchor(record),
        claim: claimAnchor(claim),
        source: sourceAnchor(source)
      }
    },
    {
      id: 'search_to_article_evidence',
      intent: 'Find public records for a natural-language question, then fetch a source-mapped article evidence bundle before answering.',
      user_question: `What verified claims does AnchorFact have about ${query}?`,
      topic: topicId,
      workflow: [
        { step: 1, call: call('/topics.json', site), use: 'Check whether the topic has public coverage.' },
        { step: 2, call: call(searchPath, site), use: 'Shortlist public records by query relevance.' },
        { step: 3, call: call(articlePath, site), use: 'Read the article evidence bundle and cite only mapped public claims.' }
      ],
      expected_anchor: {
        topic: topic ? { id: topic.id, title: topic.title, article_count: topic.article_count } : null,
        article: articleAnchor(record)
      }
    },
    {
      id: 'claim_dereference',
      intent: 'Dereference one atomic claim before using it in an answer.',
      workflow: [
        { step: 1, call: call(resolveClaimPath, site), use: 'Resolve a claim shorthand or URL when the reference type is uncertain.' },
        { step: 2, call: call(claimPath, site), use: 'Fetch the exact public claim, its article context, and matching source.' },
        { step: 3, call: call(citePath, site), use: 'Fetch the citation-ready payload for direct use in an answer.' },
        { step: 4, call: call(articlePath, site), use: 'Inspect neighboring source-mapped claims from the same article when context matters.' }
      ],
      expected_anchor: {
        article: articleAnchor(record),
        claim: claimAnchor(claim)
      }
    },
    {
      id: 'mixed_reference_resolution',
      intent: 'Resolve several claim, source, and article references in one request before choosing follow-up APIs.',
      workflow: [
        { step: 1, call: call(resolveBatchPath, site), use: 'Resolve mixed public references and inspect each item status without doing several round trips.' },
        { step: 2, call: call(resolveBatchMarkdownPath, site), use: 'Fetch compact text output when a prompt only needs a resolution summary.' },
        { step: 3, call: call(citePath, site), use: 'Fetch citation-ready claim output only for resolved claim references that will be cited.' }
      ],
      expected_anchor: {
        article: articleAnchor(record),
        claim: claimAnchor(claim),
        source: sourceAnchor(source)
      }
    },
    {
      id: 'source_reuse_lookup',
      intent: 'Inspect a source and see which public claims and articles reuse it.',
      workflow: sourcePath ? [
        { step: 1, call: call(sourcePath, site), use: 'Fetch source metadata plus mapped public claims.' },
        { step: 2, call: call('/sources.json', site), use: 'Use the signed static source index when many source lookups are needed.' }
      ] : [
        { step: 1, call: call('/sources.json', site), use: 'Inspect the signed static source index.' }
      ],
      expected_anchor: {
        source: sourceAnchor(source),
        claim: claimAnchor(claim)
      }
    },
    {
      id: 'static_fallback',
      intent: 'Use only signed static artifacts when dynamic Functions calls are unavailable.',
      workflow: [
        { step: 1, call: call('/provenance.json', site), use: 'Verify artifact hashes and signed provenance first.' },
        { step: 2, call: call('/search-index.json', site), use: 'Find candidate public articles and claim ids offline.' },
        { step: 3, call: call('/claims.json', site), use: 'Resolve claim statements and source URLs by claim id.' },
        { step: 4, call: call('/sources.json', site), use: 'Resolve source tier, type, and reuse data.' }
      ],
      expected_anchor: {
        article: articleAnchor(record),
        claim: claimAnchor(claim),
        source: sourceAnchor(source)
      }
    }
  ];

  return {
    schema_version: EXAMPLES_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    example_count: examples.length,
    examples
  };
}
