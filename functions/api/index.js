import {
  API_INDEX_SCHEMA_VERSION,
  buildApiIndex
} from '../../src/lib/api-index.js';
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

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: JSON_HEADERS
  });
}

async function loadApiReadinessPayload(context) {
  if (!context?.env?.ASSETS) return null;
  return loadJsonAsset(context, '/api-readiness.json');
}

export async function onRequestGet(context = {}) {
  try {
    const apiReadinessPayload = await loadApiReadinessPayload(context);
    return jsonResponse(buildApiIndex({ apiReadinessPayload }));
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
