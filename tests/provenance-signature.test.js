#!/usr/bin/env node
import { generateKeyPairSync } from 'crypto';
import {
  PROVENANCE_SIGNATURE_ALGORITHM,
  PROVENANCE_SIGNATURE_SCHEMA_VERSION,
  publicKeyFingerprint,
  publicKeyId,
  publicKeyPemFromPrivateKey,
  signProvenanceText,
  signingKeyInfoFromEnv,
  trustedPublicKeysFromEnv,
  verifyProvenanceSignature
} from '../src/lib/provenance-signature.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function fixtureKeyPair() {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  return {
    privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
    publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }).toString()
  };
}

console.log('AnchorFact Provenance Signature Tests\n');

test('signProvenanceText creates a verifiable detached signature', () => {
  const { privateKeyPem, publicKeyPem } = fixtureKeyPair();
  const signingKey = {
    privateKeyPem,
    publicKeyPem,
    keyId: publicKeyId(publicKeyPem),
    publicKeySha256: publicKeyFingerprint(publicKeyPem)
  };
  const provenanceText = JSON.stringify({ schema_version: 'anchorfact.provenance.v1' }, null, 2);
  const signature = signProvenanceText(provenanceText, signingKey, '2026-05-29T00:00:00.000Z');

  assertEq(signature.schema_version, PROVENANCE_SIGNATURE_SCHEMA_VERSION);
  assertEq(signature.algorithm, PROVENANCE_SIGNATURE_ALGORITHM);
  assertEq(signature.key_id, signingKey.keyId);

  const verified = verifyProvenanceSignature(provenanceText, signature, [publicKeyPem]);
  assertEq(verified.ok, true);
  assertEq(verified.trusted, true);
  assertEq(verified.failures, []);
});

test('verifyProvenanceSignature rejects tampered payloads', () => {
  const { privateKeyPem, publicKeyPem } = fixtureKeyPair();
  const signingKey = {
    privateKeyPem,
    publicKeyPem,
    keyId: publicKeyId(publicKeyPem),
    publicKeySha256: publicKeyFingerprint(publicKeyPem)
  };
  const signature = signProvenanceText('original', signingKey, '2026-05-29T00:00:00.000Z');
  const verified = verifyProvenanceSignature('tampered', signature, [publicKeyPem]);
  assertEq(verified.ok, false);
  assert(verified.failures.some(failure => failure.includes('payload_sha256 mismatch')), 'payload hash mismatch should be reported');
});

test('signing key and trusted keys load from escaped PEM environment values', () => {
  const { privateKeyPem, publicKeyPem } = fixtureKeyPair();
  const env = {
    ANCHORFACT_PROVENANCE_PRIVATE_KEY_PEM: privateKeyPem.replace(/\n/g, '\\n'),
    ANCHORFACT_PROVENANCE_PUBLIC_KEY_PEM: publicKeyPem.replace(/\n/g, '\\n')
  };
  const signingKey = signingKeyInfoFromEnv(env);
  const trustedKeys = trustedPublicKeysFromEnv(env);
  assertEq(signingKey.publicKeySha256, publicKeyFingerprint(publicKeyPem));
  assertEq(trustedKeys[0], publicKeyPem.trim());
  assertEq(publicKeyPemFromPrivateKey(privateKeyPem).trim(), publicKeyPem.trim());
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
