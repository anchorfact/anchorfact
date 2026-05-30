import {
  PLAN_API_SCHEMA_VERSION,
  buildPlanApiPayload,
  parsePlanParams
} from '../../src/lib/plan-api.js';
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

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const parsed = parsePlanParams(url);
  if (!parsed.ok) {
    return jsonResponse(parsed.payload, parsed.status, 'no-store');
  }

  try {
    const [searchIndex, topicsPayload, coveragePayload, capabilitiesPayload] = await Promise.all([
      loadJsonAsset(context, '/search-index.json'),
      loadJsonAsset(context, '/topics.json'),
      loadJsonAsset(context, '/coverage.json'),
      loadJsonAsset(context, '/capabilities.json')
    ]);

    return jsonResponse(buildPlanApiPayload({
      query: parsed.query,
      limit: parsed.limit,
      searchIndex,
      topicsPayload,
      coveragePayload,
      capabilitiesPayload
    }));
  } catch (error) {
    return jsonResponse({
      schema_version: PLAN_API_SCHEMA_VERSION,
      error: {
        code: 'asset_load_failed',
        message: error.message || 'Query planning failed.'
      }
    }, 502, 'no-store');
  }
}
