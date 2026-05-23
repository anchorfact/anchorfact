---
id:"kb-2026-00116"
title:"Public Key Cryptography"
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

Public-key (asymmetric) cryptography uses key pairs: public key (shared freely) and private key (kept secret). It enables encryption (only private key can decrypt), digital signatures (authenticity + integrity), and key exchange (establish shared secrets). RSA (1977), ECC (1985), and Ed25519 (2011) are the dominant algorithms.

## Core Explanation

RSA: security based on difficulty of factoring large numbers. ECC: smaller keys for equivalent security — 256-bit ECC ≈ 3072-bit RSA. Elliptic Curve Diffie-Hellman (ECDH) is the standard key exchange. Key sizes: 2048-bit RSA (minimum), 4096-bit RSA (recommended long-term), 256-bit ECC. Quantum computing threatens both RSA and ECC — NIST is standardizing post-quantum cryptography (2024).

## Further Reading

- [undefined](undefined)
