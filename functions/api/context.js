import {
  CONTEXT_API_SCHEMA_VERSION,
  buildContextApiPayload,
  parseContextParams,
  renderContextMarkdown
} from '../../src/lib/context-api.js';
import { loadJsonAsset } from '../_lib/assets.js';

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

function markdownResponse(text, cacheControl = 'public, max-age=300') {
  return new Response(text, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': cacheControl
    }
  });
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: JSON_HEADERS
  });
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const parsed = parseContextParams(url);
  if (!parsed.ok) {
    return jsonResponse(parsed.payload, parsed.status, 'no-store');
  }

  try {
    const [
      manifest,
      claimsPayload,
      sourcesPayload,
      searchIndex,
      topicsPayload,
      coveragePayload,
      capabilitiesPayload,
      contentHealthPayload
    ] = await Promise.all([
      loadJsonAsset(context, '/manifest.json'),
      loadJsonAsset(context, '/claims.json'),
      loadJsonAsset(context, '/sources.json'),
      loadJsonAsset(context, '/search-index.json'),
      loadJsonAsset(context, '/topics.json'),
      loadJsonAsset(context, '/coverage.json'),
      loadJsonAsset(context, '/capabilities.json'),
      loadJsonAsset(context, '/content-health.json')
    ]);

    const result = buildContextApiPayload({
      query: parsed.query,
      limit: parsed.limit,
      manifest,
      claimsPayload,
      sourcesPayload,
      searchIndex,
      topicsPayload,
      coveragePayload,
      capabilitiesPayload,
      contentHealthPayload
    });

    if (result.ok && parsed.format === 'markdown') {
      return markdownResponse(renderContextMarkdown(result.payload));
    }
    return jsonResponse(result.payload, result.status, result.ok ? 'public, max-age=300' : 'no-store');
  } catch (error) {
    return jsonResponse({
      schema_version: CONTEXT_API_SCHEMA_VERSION,
      error: {
        code: 'asset_load_failed',
        message: error.message || 'Context assembly failed.'
      }
    }, 502, 'no-store');
  }
}
