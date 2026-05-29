import {
  buildSearchApiPayload,
  parseSearchParams
} from '../../src/lib/search-api.js';

const JSON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8'
};

function jsonResponse(payload, status = 200, cacheControl = 'public, max-age=300') {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      ...JSON_HEADERS,
      'Cache-Control': cacheControl
    }
  });
}

async function loadSearchIndex(context) {
  const url = new URL('/search-index.json', context.request.url);
  const response = await context.env.ASSETS.fetch(url);
  if (!response.ok) {
    throw new Error(`/search-index.json fetch failed with HTTP ${response.status}`);
  }
  return response.json();
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: JSON_HEADERS
  });
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const parsed = parseSearchParams(url);
  if (!parsed.ok) {
    return jsonResponse({
      schema_version: 'anchorfact.search-api.v1',
      error: parsed.error
    }, parsed.status, 'no-store');
  }

  try {
    const searchIndex = await loadSearchIndex(context);
    return jsonResponse(buildSearchApiPayload({
      query: parsed.query,
      limit: parsed.limit,
      searchIndex
    }));
  } catch (error) {
    return jsonResponse({
      schema_version: 'anchorfact.search-api.v1',
      error: error.message || 'Search failed.'
    }, 502, 'no-store');
  }
}
