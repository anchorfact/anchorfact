import { buildRobotsTxt } from '../src/lib/robots-txt.js';

const TEXT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Cloudflare-CDN-Cache-Control': 'no-store'
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
