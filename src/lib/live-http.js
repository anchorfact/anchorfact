const DEFAULT_MONITOR_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 250;
const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

export function liveFetchHeaders(extraHeaders = {}) {
  return {
    'User-Agent': process.env.ANCHORFACT_MONITOR_USER_AGENT || DEFAULT_MONITOR_USER_AGENT,
    Accept: 'application/json,text/plain,text/html;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    ...extraHeaders
  };
}

export function liveFetchOptions(options = {}) {
  const {
    headers = {},
    retries: _retries,
    retryDelayMs: _retryDelayMs,
    retryStatuses: _retryStatuses,
    ...rest
  } = options;
  return {
    redirect: 'follow',
    ...rest,
    headers: liveFetchHeaders(headers)
  };
}

function sleep(ms) {
  return ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve();
}

function errorMessage(error) {
  return error?.cause?.message || error?.message || String(error);
}

function headersObject(headers) {
  return headers?.entries ? Object.fromEntries(headers.entries()) : {};
}

export async function fetchLiveText(fetchImpl, url, options = {}) {
  const {
    retries = DEFAULT_RETRIES,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
    retryStatuses = RETRYABLE_STATUSES
  } = options;
  const maxAttempts = Math.max(1, Number(retries) + 1);
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetchImpl(url, liveFetchOptions(options));
      const text = await response.text();
      const retryableStatus = retryStatuses.has?.(response.status) || retryStatuses.includes?.(response.status);
      if (retryableStatus && attempt < maxAttempts) {
        await sleep(retryDelayMs * attempt);
        continue;
      }
      return {
        ok: response.ok,
        status: response.status,
        contentType: response.headers?.get?.('content-type') || '',
        headers: headersObject(response.headers),
        finalUrl: response.url || String(url),
        text
      };
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await sleep(retryDelayMs * attempt);
        continue;
      }
    }
  }

  return {
    ok: false,
    status: 0,
    contentType: '',
    headers: {},
    finalUrl: String(url),
    text: '',
    error: errorMessage(lastError)
  };
}
