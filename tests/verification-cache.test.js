import assert from 'assert';
import { isCacheableVerificationResult } from '../src/lib/verification-cache.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  \u2713 ${name}`);
    passed++;
  } catch (error) {
    console.error(`  \u2717 ${name}`);
    console.error(`    ${error.message}`);
    failed++;
  }
}

console.log('AnchorFact Verification Cache Tests\n');

test('successful verification results are cacheable', () => {
  assert.equal(isCacheableVerificationResult({
    sources_total: 3,
    sources_verified: 2,
    sources_unreachable: 1
  }), true);
});

test('articles without sources can be cached as content state', () => {
  assert.equal(isCacheableVerificationResult({
    sources_total: 0,
    sources_verified: 0,
    sources_unreachable: 0
  }), true);
});

test('all-unreachable source checks are retried instead of cached', () => {
  assert.equal(isCacheableVerificationResult({
    sources_total: 2,
    sources_verified: 0,
    sources_unreachable: 2
  }), false);
});

test('errored article verification results are not cacheable', () => {
  assert.equal(isCacheableVerificationResult({
    error: 'fetch failed',
    sources_total: 1,
    sources_verified: 0,
    sources_unreachable: 1
  }), false);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
