import assert from 'assert';
import { verifyArxiv, verifyDoi } from '../src/lib/source-metadata-verifier.js';

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

function stalledFetch() {
  return async (url, init = {}) => new Promise((resolve, reject) => {
    assert(init.signal, 'metadata fetches should pass an AbortSignal');
    init.signal.addEventListener('abort', () => {
      const error = new Error('aborted by timeout');
      error.name = 'AbortError';
      reject(error);
    });
  });
}

console.log('AnchorFact Source Metadata Verifier Tests\n');

await test('verifyDoi aborts stalled CrossRef requests', async () => {
  const result = await verifyDoi('10.1234/stalled', {
    fetchImpl: stalledFetch(),
    timeoutMs: 1
  });

  assert.equal(result.verified, false);
  assert.equal(result.error_name, 'AbortError');
  assert.match(result.error, /aborted/i);
});

await test('verifyArxiv aborts stalled arXiv requests', async () => {
  const result = await verifyArxiv('2401.00001', {
    fetchImpl: stalledFetch(),
    timeoutMs: 1
  });

  assert.equal(result.verified, false);
  assert.equal(result.error_name, 'AbortError');
  assert.match(result.error, /aborted/i);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
