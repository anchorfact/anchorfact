const DEFAULT_HEADERS = {
  'User-Agent': 'AnchorFact/0.2 (mailto:hello@anchorfact.org)'
};

const DEFAULT_TIMEOUT_MS = 8000;

async function fetchWithTimeout(fetchImpl, url, init = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetchImpl(url, {
      ...init,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

function cleanDoi(value) {
  return String(value || '').replace(/^https?:\/\/doi\.org\//i, '');
}

function cleanArxivId(value) {
  return String(value || '')
    .replace(/^arxiv:/i, '')
    .replace(/^https?:\/\/arxiv\.org\/(abs|pdf)\//i, '');
}

export async function verifyDoi(doi, {
  fetchImpl = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  beforeAttempt = null
} = {}) {
  const identifier = cleanDoi(doi);
  if (beforeAttempt) await beforeAttempt('doi');

  try {
    const res = await fetchWithTimeout(fetchImpl, `https://api.crossref.org/works/${encodeURIComponent(identifier)}`, {
      headers: DEFAULT_HEADERS
    }, timeoutMs);

    if (res.status === 200) {
      const data = await res.json();
      const msg = data.message;
      return {
        verified: true,
        title: msg.title?.[0] || null,
        publisher: msg.publisher || null,
        year: msg.created?.['date-parts']?.[0]?.[0] || msg.issued?.['date-parts']?.[0]?.[0] || null,
        type: msg.type || null
      };
    }
    return { verified: false, error: `CrossRef returned ${res.status}` };
  } catch (error) {
    return { verified: false, error: error.message, error_name: error.name };
  }
}

export async function verifyArxiv(arxivId, {
  fetchImpl = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  beforeAttempt = null
} = {}) {
  const identifier = cleanArxivId(arxivId);
  if (beforeAttempt) await beforeAttempt('arxiv');

  try {
    const res = await fetchWithTimeout(fetchImpl, `https://export.arxiv.org/api/query?id_list=${encodeURIComponent(identifier)}&max_results=1`, {}, timeoutMs);
    if (res.status === 200) {
      const text = await res.text();
      if (text.includes('<title>') && !text.includes('No result')) {
        const titleMatch = text.match(/<title>(.*?)<\/title>/);
        const authorMatches = [...text.matchAll(/<author>[\s\S]*?<name>(.*?)<\/name>[\s\S]*?<\/author>/g)];
        return {
          verified: true,
          title: titleMatch?.[1]?.trim() || null,
          authors: authorMatches.map(m => m[1].trim()),
          arxiv_id: identifier
        };
      }
    }
    return { verified: false, error: `arXiv returned ${res.status}` };
  } catch (error) {
    return { verified: false, error: error.message, error_name: error.name };
  }
}
