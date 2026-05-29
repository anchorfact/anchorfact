import {
  API_INDEX_SCHEMA_VERSION,
  buildApiIndex
} from '../../src/lib/api-index.js';

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

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: JSON_HEADERS
  });
}

export function onRequestGet() {
  try {
    return jsonResponse(buildApiIndex());
  } catch (error) {
    return jsonResponse({
      schema_version: API_INDEX_SCHEMA_VERSION,
      error: {
        code: 'api_index_failed',
        message: error.message || 'API discovery failed.'
      }
    }, 500, 'no-store');
  }
}
