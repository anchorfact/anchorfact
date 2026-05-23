---
id: "kb-2026-00099"



title: "Web Cryptography API"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"



last_verified: "2026-05-22"
generation_method: "human_only"



derived_from_human_seed: true
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
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      The Web Cryptography API provides browser-native cryptographic operations — hashing, signing, encryption, key
      generation — without external libraries
    source_title: Web Cryptography API (W3C Recommendation)
    source_url: https://www.w3.org/TR/WebCryptoAPI/
    confidence: medium
  
completeness: 0.88
ai_citations:
---

## TL;DR

The Web Cryptography API provides browser-native cryptographic operations — hashing, signing, encryption, key generation — without external libraries. It exposes SubtleCrypto (`crypto.subtle`) for low-level operations and `crypto.getRandomValues()` for cryptographically secure random generation.

## Core Explanation

Supported algorithms: SHA-256/384/512, HMAC, AES-CBC/GCM/CTR, RSA-OAEP/PSS, ECDSA, ECDH, PBKDF2. Key generation uses `crypto.subtle.generateKey()`. Keys can be exported/imported in formats: raw, PKCS#8, SPKI, JWK. The API is Promise-based and runs in a secure context (HTTPS or localhost).

## Further Reading

- [Web Cryptography API (W3C Recommendation)](https://www.w3.org/TR/WebCryptoAPI/)
