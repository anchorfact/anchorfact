---
id: "kb-2026-00099"
title: "Web Cryptography API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Web Cryptography API (W3C Recommendation)"
    type: "standard"
    year: 2017
    url: "https://www.w3.org/TR/WebCryptoAPI/"
    institution: "W3C"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Web Cryptography API provides browser-native cryptographic operations — hashing, signing, encryption, key generation — without external libraries. It exposes SubtleCrypto (`crypto.subtle`) for low-level operations and `crypto.getRandomValues()` for cryptographically secure random generation.

## Core Explanation

Supported algorithms: SHA-256/384/512, HMAC, AES-CBC/GCM/CTR, RSA-OAEP/PSS, ECDSA, ECDH, PBKDF2. Key generation uses `crypto.subtle.generateKey()`. Keys can be exported/imported in formats: raw, PKCS#8, SPKI, JWK. The API is Promise-based and runs in a secure context (HTTPS or localhost).

## Further Reading

- [Web Cryptography API (W3C Recommendation)](https://www.w3.org/TR/WebCryptoAPI/)
