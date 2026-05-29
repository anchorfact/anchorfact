const QUERY_STOPWORDS = new Set([
  'a',
  'about',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'best',
  'by',
  'can',
  'did',
  'do',
  'does',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'me',
  'my',
  'near',
  'now',
  'of',
  'on',
  'or',
  'should',
  'the',
  'this',
  'to',
  'was',
  'were',
  'what',
  'when',
  'where',
  'which',
  'who',
  'why',
  'with'
]);

const STANDALONE_YEAR = /^(?:1[6-9]\d{2}|20\d{2}|21\d{2})$/;

export function normalizeQueryText(value) {
  return String(value || '')
    .replace(/[^a-z0-9]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function queryTokens(value, options = {}) {
  const includeYears = options.includeYears === true;
  return normalizeQueryText(value)
    .split(' ')
    .filter(token =>
      token.length >= 2
      && !QUERY_STOPWORDS.has(token)
      && (includeYears || !STANDALONE_YEAR.test(token))
    );
}
