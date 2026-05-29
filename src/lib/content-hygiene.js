const PLACEHOLDER_PATTERNS = [
  /\u5bf0\u546d\u6097\u7f01\ue161\u02c9\u934f/,
  /\u5bf0\u5470\u02c9\u934f/,
  /\u9350\u546d\ue190\u9352\u6fc8\ue7c8/,
  /\u7487\ufe3e\u7c8f\u9352\u55d8\u703d/,
  /\u5185\u5BB9\u521D\u7A3F/,
  /\[[^\]]*(?:\u8BE6\u7EC6\u5206\u6790|\u8A73\u7D30\u5206\u6790|\u5F85\u8865\u5145|\u540E\u7EED\u8865\u5145|\u5F8C\u7E8C\u88DC\u5145|placeholder)[^\]]*\]/i,
  /\[(?:to be completed|todo|tbd|\u5F85|\u540E\u7EED|\u5F8C\u7E8C|\u88DC\u5145|\u8865\u5145)[^\]]*\]/i,
  /detailed analysis is still being completed/i,
  /\bTODO\b/i
];

const MOJIBAKE_PATTERNS = [
  /\uFFFD/,
  /\u00E9[\u0090-\u00BF]/,
  /(?:\u9225|\u937A|\u95C6|\u9359|\u9471|\u951B|\u9E93|\u7EFE)[\s\S]{0,20}(?:\uFFFD|\u20AC|\?)/,
  /[\u9225\u922B\u9239\u951B\u8133\u941C][\s\S]{0,80}[\u9225\u922B\u9239\u951B\u8133\u941C\u20AC]/,
  /(?:\u20AC|\uFFFD).{0,12}(?:\u20AC|\uFFFD)/
];

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeUrl(value) {
  return normalizeText(value).replace(/\/+$/g, '');
}

function normalizeDoi(value) {
  return normalizeText(value)
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '');
}

export function hasMojibakeText(value) {
  const text = String(value || '');
  return MOJIBAKE_PATTERNS.some(pattern => pattern.test(text));
}

export function hasPlaceholderText(body, frontmatter = {}) {
  const knownGaps = Array.isArray(frontmatter.known_gaps)
    ? frontmatter.known_gaps.join('\n')
    : '';
  const text = `${body || ''}\n${knownGaps}`;
  return PLACEHOLDER_PATTERNS.some(pattern => pattern.test(text));
}

export function isHomepageUrl(value) {
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/g, '');
    return path === '';
  } catch {
    return false;
  }
}

function sourceKey(source) {
  const title = normalizeText(source?.title);
  const locator = normalizeUrl(source?.url || (source?.doi ? `doi:${normalizeDoi(source.doi)}` : ''));
  return title || locator ? `${title}|${locator}` : '';
}

function sourceEvidenceIndex(frontmatter = {}) {
  const sources = [
    ...(Array.isArray(frontmatter.primary_sources) ? frontmatter.primary_sources : []),
    ...(Array.isArray(frontmatter.secondary_sources) ? frontmatter.secondary_sources : [])
  ];
  const titles = new Set();
  const urls = new Set();
  const dois = new Set();

  for (const source of sources) {
    if (source?.title) titles.add(normalizeText(source.title));
    if (source?.url) urls.add(normalizeUrl(source.url));
    if (source?.doi) {
      const doi = normalizeDoi(source.doi);
      dois.add(doi);
      urls.add(`https://doi.org/${doi}`);
    }
  }

  return { sources, titles, urls, dois };
}

export function isBrokenAtomicFact(fact = {}) {
  const statement = String(fact.statement || '').trim();
  if (!statement || statement.length < 10) return true;
  if (hasMojibakeText(statement)) return true;
  if (/[\(:;,]\s*$/.test(statement)) return true;
  if (/\barXiv:\d{4}\.\s*$/i.test(statement)) return true;
  if (/```|\n\s*#{2,}|\|\s*-{3,}/.test(statement)) return true;
  return false;
}

export function factHasEvidence(fact = {}) {
  return !!(fact.source_ref || fact.source_url || fact.source_doi);
}

export function factEvidenceMapsToSources(fact = {}, frontmatter = {}) {
  const index = sourceEvidenceIndex(frontmatter);
  if (fact.source_url && index.urls.has(normalizeUrl(fact.source_url))) return true;
  if (fact.source_doi && index.dois.has(normalizeDoi(fact.source_doi))) return true;
  if (fact.source_title && index.titles.has(normalizeText(fact.source_title))) return true;
  if (fact.source_ref) return true;
  return false;
}

export function analyzeAtomicFacts(frontmatter = {}) {
  const facts = Array.isArray(frontmatter.atomic_facts) ? frontmatter.atomic_facts : [];
  let broken = 0;
  let missingEvidence = 0;
  let weakEvidence = 0;

  for (const fact of facts) {
    if (isBrokenAtomicFact(fact)) broken++;
    if (!factHasEvidence(fact)) missingEvidence++;
    if (factHasEvidence(fact) && !factEvidenceMapsToSources(fact, frontmatter)) weakEvidence++;
  }

  return {
    total: facts.length,
    broken,
    missingEvidence,
    weakEvidence,
    brokenRatio: facts.length ? broken / facts.length : 0
  };
}

export function collectContentHygieneFlags(content = {}, currentYear = new Date().getFullYear()) {
  const flags = new Set();
  const frontmatter = content.frontmatter || {};
  const body = content.body || '';
  const rawText = `${JSON.stringify(frontmatter)}\n${body}`;
  const atomicFacts = analyzeAtomicFacts(frontmatter);

  if (hasMojibakeText(rawText)) flags.add('encoding_mojibake');
  if (hasPlaceholderText(body, frontmatter)) flags.add('placeholder_text');
  if (atomicFacts.broken > 0) flags.add('broken_atomic_fact');
  if (atomicFacts.weakEvidence > 0) flags.add('claim_evidence_weak');

  const index = sourceEvidenceIndex(frontmatter);
  const sourceKeys = index.sources.map(sourceKey).filter(Boolean);
  if (new Set(sourceKeys).size < sourceKeys.length) flags.add('duplicate_sources');
  if (index.sources.some(source => source.url && isHomepageUrl(source.url) && !source.doi)) {
    flags.add('generic_source_homepage');
  }
  if (index.sources.some(source => Number(source.year) > currentYear)) flags.add('future_source_year');

  const disputes = Array.isArray(frontmatter.disputed_statements) ? frontmatter.disputed_statements : [];
  if (disputes.some(item => {
    const statement = normalizeText(item?.statement || item);
    return !item?.source_url && /subject to ongoing scholarly debate|multiple schools of thought|interpretation and significance|no scientific consensus/.test(statement);
  })) {
    flags.add('generic_dispute_statement');
  }

  return [...flags].sort();
}

export function publicFatalHygieneReasons(frontmatter = {}, body = '') {
  const flags = collectContentHygieneFlags({ frontmatter, body });
  const atomicFacts = analyzeAtomicFacts(frontmatter);
  const fatal = [];

  if (flags.includes('encoding_mojibake')) fatal.push('encoding_mojibake');
  if (flags.includes('placeholder_text')) fatal.push('placeholder_text');
  if (atomicFacts.total > 0 && atomicFacts.brokenRatio >= 0.5) fatal.push('broken_atomic_fact');

  return fatal;
}
