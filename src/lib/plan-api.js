import { rankSearchRecords } from './search-api.js';
import {
  hasStrongMatchedToken,
  normalizeQueryText,
  queryTokens,
  textTokens
} from './query-text.js';
import { buildMachineRecoveryGuidance } from './api-machine-guidance.js';

export const PLAN_API_SCHEMA_VERSION = 'anchorfact.plan-api.v1';

const OFFICIAL_SITE = 'https://anchorfact.org';
const PROVENANCE_PATH = '/provenance.json';
const MIN_LIMIT = 1;
const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 10;

function publicUrl(path, site = OFFICIAL_SITE) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${String(site || OFFICIAL_SITE).replace(/\/+$/, '')}${normalizedPath}`;
}

function clampLimit(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, parsed));
}

function queryPath(path, params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && String(value).trim()) {
      search.set(key, String(value));
    }
  }
  return `${path}?${search.toString()}`;
}

function call(path, purpose, site) {
  return {
    method: 'GET',
    path,
    url: publicUrl(path, site),
    purpose
  };
}

function errorPayload(code, message, machineRecovery = null) {
  const payload = {
    schema_version: PLAN_API_SCHEMA_VERSION,
    error: { code, message }
  };
  if (machineRecovery) payload.machine_recovery = machineRecovery;
  return payload;
}

export function parsePlanParams(url) {
  const query = (url.searchParams.get('q') || url.searchParams.get('query') || '').trim();
  if (!query) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_query',
        'Provide a natural-language query with ?q=... or ?query=....',
        buildMachineRecoveryGuidance({
          currentEndpoint: 'plan',
          reason: 'missing_required_query'
        })
      )
    };
  }

  return {
    ok: true,
    query,
    limit: clampLimit(url.searchParams.get('limit'))
  };
}

function scoreTopic(topic, query, tokens) {
  const phrase = normalizeQueryText(query);
  const idTokens = textTokens(topic.id);
  const titleTokens = textTokens(topic.title);
  const articleTokens = textTokens((topic.top_articles || [])
    .map(article => `${article.title || ''} ${article.canonical_slug || ''}`)
    .join(' '));
  const idText = idTokens.join(' ');
  const titleText = titleTokens.join(' ');
  const articleSet = new Set(articleTokens);
  let score = 0;
  const matchedKeywords = new Set();
  const matchedQueryTokens = new Set();

  if (phrase && ` ${titleText} `.includes(` ${phrase} `)) score += 8;
  if (phrase && idText === phrase) score += 6;
  for (const token of tokens) {
    if (idTokens.includes(token) || titleTokens.includes(token)) {
      score += 3;
      matchedKeywords.add(token);
      matchedQueryTokens.add(token);
    }
    if (articleSet.has(token)) {
      score += 1;
      matchedKeywords.add(token);
      matchedQueryTokens.add(token);
    }
  }

  return {
    score,
    matched_keywords: [...matchedKeywords].sort(),
    matched_query_tokens: matchedQueryTokens
  };
}

function unsupportedIntentReasons(query) {
  const normalized = normalizeQueryText(query);
  const reasons = [];
  const hasLiveTimeMarker = /\b(?:today|tonight|tomorrow|yesterday|now|current|latest|recent|this week|this month)\b/.test(normalized);
  const asksLiveWeather = /\bweather\b/.test(normalized)
    && (hasLiveTimeMarker || /\bweather (?:forecast|in|near|for)\b/.test(normalized));

  if (/\b(?:near me|nearby|closest|directions|opening hours|for me|my location)\b/.test(normalized)
    || /\blocal (?:restaurants?|venues?|business(?:es)?|listings?|stores?|shops?|services?|events?)\b/.test(normalized)
    || /\bbest restaurants?\b/.test(normalized)) {
    reasons.push('local_or_personalized');
  }

  if (hasLiveTimeMarker
    || asksLiveWeather
    || implicitLiveFactIntent(normalized)
    || /\b(?:score|scores|standings|schedule|stock price|exchange rate)\b/.test(normalized)
    || /\bwho won\b/.test(normalized)
    || /\b20(?:2[5-9]|[3-9]\d)\b/.test(normalized)) {
    reasons.push('live_or_time_sensitive');
  }

  if (highStakesPersonalAdviceIntent(normalized)) {
    reasons.push('high_stakes_personal_advice');
  }

  if (harmfulOperationalRequestIntent(normalized)) {
    reasons.push('harmful_operational_request');
  }

  return [...new Set(reasons)];
}

function highStakesPersonalAdviceIntent(normalized) {
  const personalAdvicePattern = /\b(?:should|can|could|would|do|does|need|must)\s+(?:i|we)\b|\b(?:for me|my|me|myself|our)\b/;
  const directAdvicePattern = /\b(?:diagnose|treat|treatment|management|guidelines?|dosage|dose|prescribe|take|sue|lawsuit|appeal|buy|sell|invest|retire|retirement)\b/;
  const medicationDomain = /\b(?:aspirin|ibuprofen|acetaminophen|metformin|semaglutide|insulin|antibiotic|antibiotics|antidepressant|antidepressants|ssri|ssris|opioid|opioids|blood thinner|blood thinners|medication|medicine|prescription)\b/;
  const medicationSafetyLookup = /\b(?:safe|safety|side effects?|withdrawal|contraindications?|interactions?|during pregnancy|while pregnant|pregnan(?:t|cy)|dosage|dose|stop(?:ping)?|taper(?:ing)?)\b/;
  const medicalDomain = /\b(?:aspirin|ibuprofen|acetaminophen|metformin|semaglutide|insulin|antibiotic|antibiotics|antidepressant|antidepressants|ssri|ssris|opioid|opioids|blood thinner|blood thinners|chest pain|symptoms?|diagnos(?:e|is)|treat(?:ment)?|dosage|dose|medication|medicine|prescription|diabetes|hypertension|depression|anxiety|suicid(?:e|al)|cancer|doctor|hospital|pain|pregnan(?:t|cy)|infection|blood pressure)\b/.test(normalized);
  const legalDomain = /\b(?:sue|lawsuit|eviction|landlord|tenant|contract|court|custody|divorce|immigration|criminal|lawyer|attorney|legal advice)\b/.test(normalized);
  const financialDomain = /\b(?:invest|investment|buy|sell|stock|stocks|crypto|bitcoin|portfolio|loan|mortgage|tax|retire|retirement|insurance)\b/.test(normalized);
  const highStakesDomain = medicalDomain || legalDomain || financialDomain;
  const highRiskMedicationLookup = medicationDomain.test(normalized) && medicationSafetyLookup.test(normalized);
  return highRiskMedicationLookup || (highStakesDomain && (personalAdvicePattern.test(normalized) || directAdvicePattern.test(normalized)));
}

function harmfulOperationalRequestIntent(normalized) {
  const harmfulAction = /\b(?:write|create|make|build|generate|template|payload|bypass|exploit|attack|steal|commit|evade|fake|construct|design)\b/.test(normalized);
  const broadHowTo = /\bhow to\b/.test(normalized);
  const defensiveIntent = /\b(?:prevent(?:ion)?|defen[sc]e|defend|protect|mitigat(?:e|ion)|detect(?:ion)?|monitor(?:ing)?|incident response|awareness|training|secure|security|report|recognize|analysis|forensics|education(?:al)?)\b/.test(normalized);
  const cyberAbuse = /\b(?:ransomware|malware|phishing|credential theft|keylogger|exploit|payload|bypass authentication|hack(?:ing)?|ddos|sql injection attack)\b/.test(normalized);
  const weaponAbuse = /\b(?:pipe bomb|bomb|explosive|weapon design|nuclear weapon|bioweapon)\b/.test(normalized);
  const fraudAbuse = /\b(?:tax fraud|fraud|scam|money laundering|identity theft|credit card theft)\b/.test(normalized);
  return (cyberAbuse || weaponAbuse || fraudAbuse) && (harmfulAction || (broadHowTo && !defensiveIntent));
}

function implicitLiveFactIntent(normalized) {
  const staticWeatherKnowledge = /\b(?:weather forecasting|weather prediction|meteorolog(?:y|ical)|climate|atmospheric|forecasting model)\b/.test(normalized);
  const weatherLookup = /\bweather\b/.test(normalized) && !staticWeatherKnowledge;
  const staticTemperatureKnowledge = /\b(?:thermodynamics|thermal|physics|temperature scale|celsius|fahrenheit|kelvin|heat transfer|absolute zero)\b/.test(normalized);
  const temperatureLookup = /\btemperature\b/.test(normalized) && !staticTemperatureKnowledge;
  const staticTimeKnowledge = /\b(?:time management|time series|geological time|spacetime|runtime|time complexity)\b/.test(normalized);
  const timeLookup = /\b(?:what time is it|local time|time in|time at|time for)\b/.test(normalized) && !staticTimeKnowledge;
  const flightLookup = /\b(?:flight status|flight tracker|flight delay|flight delays|arrival time|departure time|boarding gate|gate number)\b/.test(normalized);
  const currentRoleLookup = /\b(?:(?:who is|who s|name|current)\s+)?(?:the\s+)?(?:ceo|chief executive|president|prime minister|mayor|governor|chair|chairperson|leader|director)\s+(?:of|for)\b/.test(normalized);
  const historicalContext = /\b(?:was|were|former|during|history|historical|ancient|medieval|renaissance|napoleonic|revolution|war|century|1[5-9]\d{2}|20[01]\d)\b/.test(normalized);
  const productPricingLookup =
    /\b(?:pricing|prices?|costs?|plans?|free tier|paid tier|subscription)\b/.test(normalized)
    && /\b(?:openai|chatgpt|claude|anthropic|cloudflare|api|apis|workers?|pages|vercel|aws|azure|google cloud|gcp)\b/.test(normalized);
  const financialRateOrPredictionLookup =
    (
      /\b(?:rates?|price prediction|prediction|forecast|forecasting)\b/.test(normalized)
      && /\b(?:mortgage|interest|loan|bitcoin|crypto|stock|stocks|market|exchange rate|currency)\b/.test(normalized)
    )
    || /\b(?:mortgage rates?|interest rates?|exchange rates?)\b/.test(normalized);
  const staticSoftwareVersionKnowledge = /\b(?:software versioning|semantic versioning|version control|api versioning|event loop|architecture|basics|fundamentals)\b/.test(normalized);
  const softwareCurrentVersionLookup =
    /\b(?:version|versions|lts|release date|released|compatibility|compatible)\b/.test(normalized)
    && /\b(?:node js|nodejs|python|cuda|postgresql|postgres|npm|react|typescript|go|rust|java|linux|ubuntu|debian)\b/.test(normalized)
    && !staticSoftwareVersionKnowledge;
  return weatherLookup
    || temperatureLookup
    || timeLookup
    || flightLookup
    || productPricingLookup
    || financialRateOrPredictionLookup
    || softwareCurrentVersionLookup
    || (currentRoleLookup && !historicalContext);
}

function siteHelpIntent(query) {
  const normalized = normalizeQueryText(query);
  if (!/\banchorfact\b/.test(normalized)) return false;
  return /\b(?:api|apis|endpoint|endpoints|cite|citation|claim|claims|source|sources|provenance|signature|openapi|mcp|context|evidence|resolve|verify|use|usage)\b/.test(normalized);
}

function topicEntrypoint(topic) {
  return topic.best_entrypoint
    || queryPath('/api/evidence', { q: topic.title || topic.id, limit: DEFAULT_LIMIT });
}

function rankedTopics(topics, query, limit) {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];
  return (topics || [])
    .map(topic => ({ topic, score: scoreTopic(topic, query, tokens) }))
    .filter(entry => entry.score.score > 0 && hasStrongMatchedToken(tokens, entry.score.matched_query_tokens))
    .sort((a, b) =>
      b.score.score - a.score.score
      || (b.topic.article_count || 0) - (a.topic.article_count || 0)
      || String(a.topic.id).localeCompare(String(b.topic.id))
    )
    .slice(0, limit)
    .map(entry => ({
      id: entry.topic.id,
      title: entry.topic.title,
      article_count: entry.topic.article_count || 0,
      claim_count: entry.topic.claim_count || 0,
      source_count: entry.topic.source_count || 0,
      best_entrypoint: topicEntrypoint(entry.topic),
      score: entry.score.score,
      matched_keywords: entry.score.matched_keywords
    }));
}

function compactArticle(result) {
  return {
    canonical_slug: result.canonical_slug,
    title: result.title,
    url: result.url,
    confidence_level: result.confidence_level,
    source_coverage: result.source_coverage || null,
    claim_count: result.claim_count || 0,
    claim_ids: (result.claim_ids || []).slice(0, 3),
    routes: result.routes || {},
    score: result.score,
    matched_keywords: result.matched_keywords || []
  };
}

function coverageStatus(articleMatches, topicMatches) {
  if (articleMatches.length > 0) return 'supported';
  if (topicMatches.length > 0) return 'topic_supported';
  return 'unsupported';
}

function confidenceFor(status, articleMatches) {
  if (status === 'site_help') return 'high';
  if (status === 'unsupported') return 'low';
  if (status === 'topic_supported') return 'medium';
  const topScore = Number(articleMatches[0]?.score || 0);
  return topScore >= 12 ? 'high' : 'medium';
}

function recommendedCalls({ status, query, limit, articleMatches, topicMatches, site }) {
  if (status === 'site_help') {
    const normalized = normalizeQueryText(query);
    const calls = [
      call('/api', 'Discover AnchorFact machine API endpoints and response contracts.', site),
      call('/openapi.json', 'Inspect the formal OpenAPI schema for programmatic integration.', site)
    ];
    if (/\b(?:cite|citation|claim|claims|resolve)\b/.test(normalized)) {
      calls.push(
        call('/api/cite?id=f1', 'Example citation export; replace f1 with the target AnchorFact claim id.', site),
        call('/api/claim?id=f1', 'Example claim dereference; replace f1 with the target AnchorFact claim id.', site),
        call('/api/resolve?ref=f1', 'Resolve a claim, article, or source reference before citing it.', site)
      );
    } else {
      calls.push(
        call(queryPath('/api/context', { q: 'gaussian splatting', limit }), 'Example answer-ready context payload for a content query.', site),
        call(queryPath('/api/evidence', { q: 'gaussian splatting', limit }), 'Example source-grounded evidence packs for a content query.', site),
        call(queryPath('/api/search', { q: 'gaussian splatting', limit }), 'Example search results for public AnchorFact records.', site)
      );
    }
    calls.push(call('/provenance.json', 'Verify the signed production artifact set before trusting static artifact hashes.', site));
    return calls;
  }

  if (status === 'unsupported') {
    return [
      call('/coverage.json', 'Inspect AnchorFact topic limits before relying on this query.', site),
      call(queryPath('/api/search', { q: query, limit }), 'Optional broad check; do not cite if this also returns no public records.', site)
    ];
  }

  const calls = [
    call(queryPath('/api/evidence', { q: query, limit }), 'Fetch source-grounded evidence packs for the planned query.', site)
  ];
  const topArticle = articleMatches[0];
  if (topArticle?.canonical_slug) {
    calls.push(call(
      queryPath('/api/article', { slug: topArticle.canonical_slug }),
      'Inspect the highest ranked public article with claims and sources.',
      site
    ));
  }
  const firstClaim = topArticle?.claim_ids?.[0];
  if (firstClaim) {
    calls.push(call(
      queryPath('/api/cite', { id: firstClaim }),
      'Retrieve citation-ready text for the strongest candidate claim.',
      site
    ));
  }
  if (topicMatches[0]?.best_entrypoint && topicMatches[0].best_entrypoint !== calls[0].path) {
    calls.push(call(
      topicMatches[0].best_entrypoint,
      'Compare against the nearest topic-level evidence entrypoint.',
      site
    ));
  }
  calls.push(call('/provenance.json', 'Verify the signed production artifact set before trusting static artifact hashes.', site));
  return calls;
}

function fallbackGuidance(status, intentReasons = []) {
  if (status === 'site_help') {
    return [
      'This is an AnchorFact usage query; use API discovery and recommended_next_calls instead of searching public content articles.',
      'For citation tasks, dereference a specific claim with /api/cite or /api/claim before quoting AnchorFact.',
      'For answer tasks, call /api/context or /api/evidence with the real content query and cite only returned public claims.'
    ];
  }

  if (status === 'unsupported') {
    const guidance = [];
    if (intentReasons.includes('local_or_personalized')) {
      guidance.push('AnchorFact is not a live local directory or personalized recommendation source; use current local listings or official venue sources.');
    }
    if (intentReasons.includes('live_or_time_sensitive')) {
      guidance.push('AnchorFact is not a live news, sports, market, weather, or current-results source; use current authoritative sources.');
    }
    if (intentReasons.includes('high_stakes_personal_advice')) {
      guidance.push('AnchorFact is not a medical, legal, or financial professional advice source; use qualified professional guidance or current authoritative sources.');
    }
    if (intentReasons.includes('harmful_operational_request')) {
      guidance.push('AnchorFact does not support harmful operational requests for abuse, weapons, fraud, or intrusion; use defensive, educational, or authoritative safety resources instead.');
    }
    return [
      ...guidance,
      'AnchorFact has no clear public coverage for this query.',
      'Use external primary or authoritative sources instead of stretching nearby AnchorFact records.',
      'Do not cite AnchorFact unless a later search or evidence call returns a public source-mapped claim.'
    ];
  }
  return [
    'If /api/evidence returns zero packs, treat the query as unsupported and use external primary sources.',
    'Before citing, dereference the selected claim with /api/cite or /api/claim and include the original source URL.',
    'Use AnchorFact claims as scoped evidence, not as a complete replacement for original-source review.'
  ];
}

export function buildPlanApiPayload({
  query,
  limit = DEFAULT_LIMIT,
  searchIndex,
  topicsPayload,
  coveragePayload,
  capabilitiesPayload,
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE
}) {
  const normalizedQuery = String(query || '').trim();
  const normalizedLimit = clampLimit(limit);
  const intentReasons = unsupportedIntentReasons(normalizedQuery);
  const intentUnsupported = intentReasons.length > 0;
  const isSiteHelp = siteHelpIntent(normalizedQuery);
  const articleMatches = intentUnsupported || isSiteHelp
    ? []
    : rankSearchRecords(searchIndex?.records || [], normalizedQuery, normalizedLimit).map(compactArticle);
  const topics = coveragePayload?.topic_coverage || topicsPayload?.topics || [];
  const topicMatches = intentUnsupported || isSiteHelp
    ? []
    : rankedTopics(topics, normalizedQuery, Math.min(5, normalizedLimit + 2));
  const status = isSiteHelp ? 'site_help' : coverageStatus(articleMatches, topicMatches);

  return {
    schema_version: PLAN_API_SCHEMA_VERSION,
    generated,
    provenance_url: searchIndex?.provenance_url
      || coveragePayload?.provenance_url
      || topicsPayload?.provenance_url
      || publicUrl(PROVENANCE_PATH, site),
    query: normalizedQuery,
    limit: normalizedLimit,
    coverage_status: status,
    should_use_anchorfact: status !== 'unsupported',
    query_intent: isSiteHelp ? 'site_help' : 'content',
    unsupported_intent_reasons: intentReasons,
    confidence: confidenceFor(status, articleMatches),
    source_index_generated: searchIndex?.generated || null,
    coverage_generated: coveragePayload?.generated || null,
    capabilities_generated: capabilitiesPayload?.generated || null,
    matched_topics: topicMatches,
    matched_articles: articleMatches,
    recommended_next_calls: recommendedCalls({
      status,
      query: normalizedQuery,
      limit: normalizedLimit,
      articleMatches,
      topicMatches,
      site
    }),
    fallback_guidance: fallbackGuidance(status, intentReasons),
    trust_requirements: [
      'Use only public records returned by AnchorFact endpoints.',
      'Verify /provenance.json and /provenance.sig with the pinned public key before relying on artifact hashes.',
      'When coverage_status is unsupported, use external primary sources instead of citing AnchorFact.'
    ]
  };
}
