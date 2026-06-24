import { buildRobotsTxt } from '../src/lib/robots-txt.js';

const TEXT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
};

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: TEXT_HEADERS
  });
}

export function onRequestGet() {
  return new Response(buildRobotsTxt(), {
    status: 200,
    headers: TEXT_HEADERS
  });
}
