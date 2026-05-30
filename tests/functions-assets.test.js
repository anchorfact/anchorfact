#!/usr/bin/env node
import { loadJsonAsset } from '../functions/_lib/assets.js';

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
