const DEFAULT_HEADERS = {
  'User-Agent': 'AnchorFact/0.2 (mailto:hello@anchorfact.org)'
};

function isVerifiedStatus(status) {
  return status >= 200 && status < 400;
}

function summarizeAttempt(attempt) {
  if (!attempt) return null;
  return {
    http_method: attempt.http_method,
    status: attempt.status,
    error: attempt.error,
    error_name: attempt.error_name
  };
}

async function attemptFetch(url, {
  fetchImpl,
  method,
  timeoutMs,
  headers,
  redirect,
  beforeAttempt
}) {
  if (beforeAttempt) await beforeAttempt(method);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetchImpl(url, {
      method,
      signal: controller.signal,
      headers,
      redirect
    });
    return {
      verified: isVerifiedStatus(res.status),
      status: res.status,
      final_url: res.url,
      http_method: method
    };
  } catch (error) {
    return {
      verified: false,
      error: error.message,
      error_name: error.name,
      http_method: method
    };
  } finally {
    clearTimeout(timeout);
  }
}

function shouldFallbackToGet(result) {
  return !result.verified;
}

export async function verifyReachableUrl(url, {
  fetchImpl = fetch,
  timeoutMs = 8000,
  headers = DEFAULT_HEADERS,
  redirect = 'follow',
  beforeAttempt = null
} = {}) {
  const head = await attemptFetch(url, {
    fetchImpl,
    method: 'HEAD',
    timeoutMs,
    headers,
    redirect,
    beforeAttempt
  });

  if (!shouldFallbackToGet(head)) return head;

  const get = await attemptFetch(url, {
    fetchImpl,
    method: 'GET',
    timeoutMs,
    headers,
    redirect,
    beforeAttempt
  });

  return {
    ...get,
    fallback_from: summarizeAttempt(head)
  };
}
