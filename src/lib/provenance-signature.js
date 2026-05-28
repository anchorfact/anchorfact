import {
  createHash,
  createPrivateKey,
  createPublicKey,
  sign,
  verify
} from 'crypto';

export const PROVENANCE_SIGNATURE_SCHEMA_VERSION = 'anchorfact.provenance-signature.v1';
export const PROVENANCE_SIGNATURE_ALGORITHM = 'Ed25519';
export const PROVENANCE_SIGNATURE_PATH = '/provenance.sig';

function sha256Base64Url(text) {
  return createHash('sha256')
    .update(Buffer.from(String(text), 'utf8'))
    .digest('base64url');
}

export function sha256Hex(text) {
  return createHash('sha256')
    .update(Buffer.from(String(text), 'utf8'))
    .digest('hex');
}

function normalizePem(value) {
  return String(value || '').trim().replace(/\\n/g, '\n').trim();
}

export function signingPrivateKeyFromEnv(env = process.env) {
  if (env.ANCHORFACT_PROVENANCE_PRIVATE_KEY_PEM) {
    return normalizePem(env.ANCHORFACT_PROVENANCE_PRIVATE_KEY_PEM);
  }
  if (env.ANCHORFACT_PROVENANCE_PRIVATE_KEY_BASE64) {
    return Buffer.from(env.ANCHORFACT_PROVENANCE_PRIVATE_KEY_BASE64.trim(), 'base64').toString('utf8');
  }
  return null;
}

export function trustedPublicKeysFromEnv(env = process.env) {
  const keys = [];
  if (env.ANCHORFACT_PROVENANCE_PUBLIC_KEY_PEM) {
    keys.push(normalizePem(env.ANCHORFACT_PROVENANCE_PUBLIC_KEY_PEM));
  }
  if (env.ANCHORFACT_PROVENANCE_PUBLIC_KEY_BASE64) {
    keys.push(Buffer.from(env.ANCHORFACT_PROVENANCE_PUBLIC_KEY_BASE64.trim(), 'base64').toString('utf8'));
  }
  return keys;
}

export function publicKeyPemFromPrivateKey(privateKeyPem) {
  const privateKey = createPrivateKey(normalizePem(privateKeyPem));
  return createPublicKey(privateKey).export({ type: 'spki', format: 'pem' }).toString();
}

export function publicKeyFingerprint(publicKeyPem) {
  return sha256Hex(normalizePem(publicKeyPem));
}

export function publicKeyId(publicKeyPem) {
  return `ed25519:${publicKeyFingerprint(publicKeyPem).slice(0, 16)}`;
}

export function signingKeyInfoFromEnv(env = process.env) {
  const privateKeyPem = signingPrivateKeyFromEnv(env);
  if (!privateKeyPem) return null;
  const publicKeyPem = publicKeyPemFromPrivateKey(privateKeyPem);
  return {
    privateKeyPem,
    publicKeyPem,
    keyId: publicKeyId(publicKeyPem),
    publicKeySha256: publicKeyFingerprint(publicKeyPem)
  };
}

export function signatureMetadataForKey(signingKey, signatureUrl) {
  if (!signingKey) {
    return {
      status: 'unsigned',
      reason: 'signing_key_unavailable'
    };
  }

  return {
    status: 'signed',
    algorithm: PROVENANCE_SIGNATURE_ALGORITHM,
    key_id: signingKey.keyId,
    public_key_sha256: signingKey.publicKeySha256,
    signature_url: signatureUrl
  };
}

export function signProvenanceText(provenanceText, signingKey, generated) {
  const privateKey = createPrivateKey(normalizePem(signingKey.privateKeyPem));
  const signature = sign(null, Buffer.from(provenanceText, 'utf8'), privateKey);

  return {
    schema_version: PROVENANCE_SIGNATURE_SCHEMA_VERSION,
    algorithm: PROVENANCE_SIGNATURE_ALGORITHM,
    signed_artifact: '/provenance.json',
    payload_sha256: sha256Hex(provenanceText),
    payload_sha256_base64url: sha256Base64Url(provenanceText),
    key_id: signingKey.keyId,
    public_key_sha256: signingKey.publicKeySha256,
    public_key_pem: signingKey.publicKeyPem,
    signature_base64: signature.toString('base64'),
    generated
  };
}

export function verifyProvenanceSignature(provenanceText, signaturePayload, trustedPublicKeys = []) {
  const failures = [];

  if (!signaturePayload || typeof signaturePayload !== 'object') {
    return { ok: false, trusted: false, failures: ['signature payload is missing'] };
  }

  if (signaturePayload.schema_version !== PROVENANCE_SIGNATURE_SCHEMA_VERSION) {
    failures.push(`signature schema_version expected ${PROVENANCE_SIGNATURE_SCHEMA_VERSION}, got ${signaturePayload.schema_version || '(missing)'}`);
  }
  if (signaturePayload.algorithm !== PROVENANCE_SIGNATURE_ALGORITHM) {
    failures.push(`signature algorithm expected ${PROVENANCE_SIGNATURE_ALGORITHM}, got ${signaturePayload.algorithm || '(missing)'}`);
  }
  if (signaturePayload.signed_artifact !== '/provenance.json') {
    failures.push(`signature signed_artifact expected /provenance.json, got ${signaturePayload.signed_artifact || '(missing)'}`);
  }

  const actualPayloadSha = sha256Hex(provenanceText);
  if (signaturePayload.payload_sha256 !== actualPayloadSha) {
    failures.push('signature payload_sha256 mismatch');
  }

  const publicKeyPem = normalizePem(signaturePayload.public_key_pem);
  if (!publicKeyPem) {
    failures.push('signature public_key_pem is missing');
  } else {
    const publicKeySha = publicKeyFingerprint(publicKeyPem);
    if (signaturePayload.public_key_sha256 !== publicKeySha) {
      failures.push('signature public_key_sha256 mismatch');
    }
    if (signaturePayload.key_id !== publicKeyId(publicKeyPem)) {
      failures.push('signature key_id mismatch');
    }
  }

  let cryptographicOk = false;
  if (publicKeyPem && signaturePayload.signature_base64) {
    try {
      cryptographicOk = verify(
        null,
        Buffer.from(provenanceText, 'utf8'),
        createPublicKey(publicKeyPem),
        Buffer.from(signaturePayload.signature_base64, 'base64')
      );
    } catch (error) {
      failures.push(`signature verification error: ${error.message}`);
    }
  } else if (!signaturePayload.signature_base64) {
    failures.push('signature_base64 is missing');
  }

  if (!cryptographicOk) {
    failures.push('signature cryptographic verification failed');
  }

  const trusted = trustedPublicKeys.some(key => publicKeyFingerprint(key) === signaturePayload.public_key_sha256);

  return {
    ok: failures.length === 0,
    trusted,
    key_id: signaturePayload.key_id || null,
    public_key_sha256: signaturePayload.public_key_sha256 || null,
    failures
  };
}
