import {
  CITE_API_SCHEMA_VERSION,
  buildCiteApiPayload,
  parseCiteParams,
  renderCitationMarkdown
} from '../../src/lib/cite-api.js';

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
  const parsed = parseCiteParams(url);
  if (!parsed.ok) {
    return jsonResponse(parsed.payload, parsed.status, 'no-store');
  }

  try {
    const [manifest, claimsPayload, sourcesPayload] = await Promise.all([
      loadJson(context, '/manifest.json'),
      loadJson(context, '/claims.json'),
      loadJson(context, '/sources.json')
    ]);

    const result = buildCiteApiPayload({
      claimId: parsed.claimId,
      manifest,
      claimsPayload,
      sourcesPayload
    });
    if (result.ok && parsed.format === 'markdown') {
      return markdownResponse(renderCitationMarkdown(result.payload));
    }
    return jsonResponse(result.payload, result.status, result.ok ? 'public, max-age=300' : 'no-store');
  } catch (error) {
    return jsonResponse({
      schema_version: CITE_API_SCHEMA_VERSION,
      error: {
        code: 'asset_load_failed',
        message: error.message || 'Citation lookup failed.'
      }
    }, 502, 'no-store');
  }
}
