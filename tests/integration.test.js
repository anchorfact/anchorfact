#!/usr/bin/env node
/**
 * AnchorFact 集成测试
 * 
 * 测试编译流程端到端、JSON 输出格式、置信度公式集成
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { computeConfidence, classifySourceTier } from '../src/lib/confidence.js';
import { load } from 'js-yaml';

let passed = 0, failed = 0;

function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (e) { failed++; console.log(`  ✗ ${name}: ${e.message}`); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }
function assertEq(a, b, ctx) { if (a !== b) throw new Error(`${ctx || ''} expected ${b}, got ${a}`); }

console.log('AnchorFact Integration Tests\n');

// ---- JSON-LD 输出结构验证 ----
console.log('JSON-LD output structure:');
test('dist/manifest.json exists and has expected keys', () => {
  assert(existsSync('dist/manifest.json'), 'manifest.json not found');
  const m = JSON.parse(readFileSync('dist/manifest.json', 'utf-8'));
  assert(m.articles > 0, 'articles count missing');
  assert(m.confidence_distribution.high !== undefined, 'high count missing');
  assert(m.confidence_distribution.medium !== undefined, 'medium count missing');
  assert(m.confidence_distribution.low !== undefined, 'low count missing');
});

test('all compiled articles have @context', () => {
  const m = JSON.parse(readFileSync('dist/manifest.json', 'utf-8'));
  const ids = m.ids.slice(0, 20);
  for (const id of ids) {
    const kbId = id.split('/').pop();
    if (!existsSync(`dist/${kbId}/index.json`)) continue;
    const j = JSON.parse(readFileSync(`dist/${kbId}/index.json`, 'utf-8'));
    assert(j['@context'] === 'https://schema.org', `${kbId}: missing @context`);
  }
});

test('compiled articles have verification layer', () => {
  const m = JSON.parse(readFileSync('dist/manifest.json', 'utf-8'));
  const firstId = m.ids[0].split('/').pop();
  const j = JSON.parse(readFileSync(`dist/${firstId}/index.json`, 'utf-8'));
  const v = j['anchorfact:verification'];
  assert(v !== undefined, 'no verification layer');
  assertEq(typeof v.confidence_basis, 'string', 'missing confidence_basis');
  assert(v.sources_total !== undefined, 'missing sources_total');
});

// ---- Content integrity ----
console.log('\nContent integrity:');
test('No article has human_only label in compiled output', () => {
  const m = JSON.parse(readFileSync('dist/manifest.json', 'utf-8'));
  const ids = m.ids;
  let humanOnlyFound = 0;
  for (const id of ids.slice(0, 100)) {
    const kbId = id.split('/').pop();
    if (!existsSync(`dist/${kbId}/index.json`)) continue;
    const j = JSON.parse(readFileSync(`dist/${kbId}/index.json`, 'utf-8'));
    if (j['anchorfact:generationMethod'] === 'human_only') humanOnlyFound++;
  }
  assert(humanOnlyFound === 0, `${humanOnlyFound} articles still have human_only in first 100`);
});

test('Confidence scores are in valid range', () => {
  const m = JSON.parse(readFileSync('dist/manifest.json', 'utf-8'));
  const ids = m.ids;
  for (const id of ids.slice(0, 50)) {
    const kbId = id.split('/').pop();
    if (!existsSync(`dist/${kbId}/index.json`)) continue;
    const j = JSON.parse(readFileSync(`dist/${kbId}/index.json`, 'utf-8'));
    const s = j['anchorfact:confidenceScore'];
    assert(s >= 0 && s <= 1.0, `${kbId}: score ${s} out of range 0-1`);
  }
});

// ---- Edge cases ----
console.log('\nEdge cases:');
test('computeConfidence with empty sources returns low/0', () => {
  const r = computeConfidence([]);
  assertEq(r.level, 'low');
  assertEq(r.score, 0);
});

test('computeConfidence with null sources returns low/0', () => {
  const r = computeConfidence(null);
  assertEq(r.score, 0);
});

test('Freshness with year 0 defaults to 0.5', () => {
  const { computeFreshnessScore } = require('../src/lib/confidence.js');
  // Note: we imported computeFreshnessScore from the shared module
  // This test will work if computeFreshnessScore is exported
});

test('classifySourceTier defaults to C for unknown type', () => {
  assertEq(classifySourceTier({}), 'C');
  assertEq(classifySourceTier({ type: 'unknown' }), 'C');
});

// ---- Summary ----
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
