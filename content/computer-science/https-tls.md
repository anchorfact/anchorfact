---
id:"kb-2026-00111"
title:"HTTPS/TLS"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
primary_sources:
- title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
---

## TL;DR

HTTPS (HTTP over TLS) encrypts HTTP traffic between client and server, providing confidentiality (encryption), integrity (tamper detection), and authentication (server identity via certificates). TLS 1.3 (RFC 8446, 2018) reduced the handshake from 2-RTT to 1-RTT (0-RTT on resumption) and removed obsolete algorithms.

## Core Explanation

TLS handshake: ClientHello → ServerHello + Certificate → Key exchange (ECDHE) → Finished. Certificates (X.509) are issued by Certificate Authorities (CAs) and contain the domain name, public key, validity period. Modern TLS 1.3 supports only AEAD ciphers (AES-GCM, ChaCha20-Poly1305). HSTS (`Strict-Transport-Security` header) forces HTTPS usage.

## Further Reading

- [undefined](undefined)
