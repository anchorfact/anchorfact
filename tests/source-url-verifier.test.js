import assert from 'assert';
import { verifyReachableUrl } from '../src/lib/source-url-verifier.js';

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  \u2713 ${name}`);
    passed++;
  } catch (error) {
    console.error(`  \u2717 ${name}`);
    console.error(`    ${error.message}`);
    failed++;
  }
}

console.log('AnchorFact Source URL Verifier Tests\n');

await test('returns HEAD result when HEAD succeeds', async () => {
  const calls = [];
  const result = await verifyReachableUrl('https://docs.example.com/page', {
    fetchImpl: async (url, init) => {
      calls.push(init.method);
      return { status: 200, url };
    }
  });

  assert.deepEqual(calls, ['HEAD']);
  assert.equal(result.verified, true);
  assert.equal(result.http_method, 'HEAD');
  assert.equal(result.status, 200);
});

await test('falls back to GET when HEAD aborts', async () => {
  const calls = [];
  const result = await verifyReachableUrl('https://docs.example.com/page', {
    fetchImpl: async (url, init) => {
      calls.push(init.method);
      if (init.method === 'HEAD') {
        const error = new Error('This operation was aborted');
        error.name = 'AbortError';
        throw error;
      }
      return { status: 200, url };
    }
  });

  assert.deepEqual(calls, ['HEAD', 'GET']);
  assert.equal(result.verified, true);
  assert.equal(result.http_method, 'GET');
  assert.equal(result.status, 200);
  assert.equal(result.fallback_from.http_method, 'HEAD');
  assert.equal(result.fallback_from.error_name, 'AbortError');
});

await test('keeps failure details when both attempts fail', async () => {
  const result = await verifyReachableUrl('https://docs.example.com/missing', {
    fetchImpl: async (url, init) => ({ status: init.method === 'HEAD' ? 405 : 404, url })
  });

  assert.equal(result.verified, false);
  assert.equal(result.http_method, 'GET');
  assert.equal(result.status, 404);
  assert.equal(result.fallback_from.status, 405);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
