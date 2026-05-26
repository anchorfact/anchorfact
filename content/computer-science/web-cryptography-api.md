---
id: "kb-2026-00099"
title: "Web Cryptography API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "The Web Cryptography API provides browser-native cryptographic operations — hashing, signing, encryption, key generation — without external libraries"
    source_title: "Web Cryptography API (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/WebCryptoAPI/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "The Web Cryptography API provides browser-native cryptographic operations — hashing, signing, encryption, key generation — without external libraries. It exposes SubtleCrypto (`crypto.subtle`) for low-level operations and `crypto.getRandomValues()` for cryptographically secure random generation."
    source_title: "Web Cryptography API (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/WebCryptoAPI/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Supported algorithms: SHA-256/384/512, HMAC, AES-CBC/GCM/CTR, RSA-OAEP/PSS, ECDSA, ECDH, PBKDF2."
    source_title: "Web Cryptography API (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/WebCryptoAPI/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Keys can be exported/imported in formats: raw, PKCS#8, SPKI, JWK."
    source_title: "Web Cryptography API (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/WebCryptoAPI/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Web Cryptography API (W3C Recommendation)"
    type: "standard"
    year: 2017
    url: "https://www.w3.org/TR/WebCryptoAPI/"
    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

The Web Cryptography API provides browser-native cryptographic operations — hashing, signing, encryption, key generation — without external libraries. It exposes SubtleCrypto (`crypto.subtle`) for low-level operations and `crypto.getRandomValues()` for cryptographically secure random generation.

## Core Explanation

Supported algorithms: SHA-256/384/512, HMAC, AES-CBC/GCM/CTR, RSA-OAEP/PSS, ECDSA, ECDH, PBKDF2. Key generation uses `crypto.subtle.generateKey()`. Keys can be exported/imported in formats: raw, PKCS#8, SPKI, JWK. The API is Promise-based and runs in a secure context (HTTPS or localhost).

## Further Reading

- [Web Cryptography API (W3C Recommendation)](https://www.w3.org/TR/WebCryptoAPI/)

## Related Articles

- [Web Storage API](../web-storage-api.md)
- [WebGPU: Next-Generation Web Graphics and Compute API](../webgpu-next-generation-web-graphics-and-compute-api.md)
- [AI for Data Curation: Web-Scale Filtering, Deduplication, and Quality Scoring for LLM Training](../../ai/ai-for-data-curation.md)