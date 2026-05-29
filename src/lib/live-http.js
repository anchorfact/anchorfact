const DEFAULT_MONITOR_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

export function liveFetchHeaders(extraHeaders = {}) {
  return {
    'User-Agent': process.env.ANCHORFACT_MONITOR_USER_AGENT || DEFAULT_MONITOR_USER_AGENT,
    Accept: 'application/json,text/plain,text/html;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    ...extraHeaders
  };
}

export function liveFetchOptions(options = {}) {
  const { headers = {}, ...rest } = options;
  return {
    redirect: 'follow',
    ...rest,
    headers: liveFetchHeaders(headers)
  };
}

export async function fetchLiveText(fetchImpl, url, options = {}) {
  const response = await fetchImpl(url, liveFetchOptions(options));
  const text = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    text
  };
}
