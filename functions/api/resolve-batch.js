import {
  RESOLVE_BATCH_API_SCHEMA_VERSION,
  buildResolveBatchApiPayload,
  parseResolveBatchParams,
  renderResolveBatchMarkdown
} from '../../src/lib/resolve-api.js';

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

function markdownResponse(payload, cacheControl = 'public, max-age=300') {
  return new Response(renderResolveBatchMarkdown(payload), {
    status: 200,
    headers: {
      ...JSON_HEADERS,
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': cacheControl
    }
  });
}

async function loadJson(context, path) {
  const url = new URL(path, context.request.url);
  const response = await context.env.ASSETS.fetch(url);
  if (!response.ok) {
    throw new Error(`${path} fetch failed with HTTP ${response.status}`);
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
  const parsed = parseResolveBatchParams(url);
  if (!parsed.ok) {
    return jsonResponse(parsed.payload, parsed.status, 'no-store');
  }

  try {
    const [manifest, claimsPayload, sourcesPayload, searchIndex] = await Promise.all([
      loadJson(context, '/manifest.json'),
      loadJson(context, '/claims.json'),
      loadJson(context, '/sources.json'),
      loadJson(context, '/search-index.json')
    ]);

    const result = buildResolveBatchApiPayload({
      refs: parsed.refs,
      manifest,
      claimsPayload,
      sourcesPayload,
      searchIndex
    });
    if (parsed.format === 'markdown') {
      return markdownResponse(result.payload);
    }
    return jsonResponse(result.payload, result.status, result.ok ? 'public, max-age=300' : 'no-store');
  } catch (error) {
    return jsonResponse({
      schema_version: RESOLVE_BATCH_API_SCHEMA_VERSION,
      error: {
        code: 'asset_load_failed',
        message: error.message || 'Batch reference resolution failed.'
      }
    }, 502, 'no-store');
  }
}
