#!/usr/bin/env node
import { loadJsonAsset } from '../functions/_lib/assets.js';
import {
  onRequestGet as onRequestRobotsGet,
  onRequestOptions as onRequestRobotsOptions
} from '../functions/robots.txt.js';

let passed = 0, failed = 0;
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function contextFor(payload) {
  let fetches = 0;
  const env = {
    ASSETS: {
      fetch: async (url) => {
        fetches++;
        return new Response(JSON.stringify({
          ...payload,
          path: new URL(url).pathname
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  };
  return {
    context: {
      request: new Request('https://anchorfact.org/api/evidence'),
      env
    },
    fetchCount: () => fetches
  };
}

console.log('AnchorFact Pages Function Asset Tests\n');

test('loadJsonAsset caches parsed JSON per ASSETS binding', async () => {
  const first = contextFor({ fixture: 'first' });
  const firstPayload = await loadJsonAsset(first.context, '/manifest.json');
  const cachedPayload = await loadJsonAsset(first.context, '/manifest.json');

  assertEq(firstPayload, cachedPayload);
  assertEq(first.fetchCount(), 1, 'same binding should fetch once');

  const second = contextFor({ fixture: 'second' });
  const secondPayload = await loadJsonAsset(second.context, '/manifest.json');
  assertEq(secondPayload.fixture, 'second');
  assertEq(second.fetchCount(), 1, 'different binding should keep an isolated cache');
});

test('robots Pages Function returns crawler discovery with short cache headers', async () => {
  const response = await onRequestRobotsGet();
  const text = await response.text();

  assertEq(response.status, 200);
  assert(response.headers.get('Content-Type').includes('text/plain'), 'robots should be text/plain');
  assert(response.headers.get('Cache-Control').includes('max-age=3600'), 'robots should keep a short cache');
  assert(text.includes('AI-Recovery-Guide: https://anchorfact.org/api'), 'robots should link API recovery guidance');

  const options = onRequestRobotsOptions();
  assertEq(options.status, 204);
  assert(options.headers.get('Access-Control-Allow-Origin') === '*', 'robots OPTIONS should allow CORS');
});

for (const { name, fn } of tests) {
  try {
    await fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
