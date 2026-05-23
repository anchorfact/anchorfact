---
id:"kb-2026-00117"
title:"Hashing Algorithms"
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

Cryptographic hash functions map arbitrary data to fixed-size digests (fingerprints). Key properties: preimage resistance (cannot reverse), second preimage resistance (cannot find different input with same hash), collision resistance (cannot find any two inputs with same hash). SHA-256 (32 bytes) is the current standard; SHA-3 (Keccak) is the next generation.

## Core Explanation

SHA-1 (broken, 2017 collision demonstrated). MD5 (completely broken). SHA-2 family: SHA-224, SHA-256, SHA-384, SHA-512 (all considered secure). SHA-3 is not a replacement but an alternative with different internal structure (sponge construction). Password hashing uses specialized functions: bcrypt (adaptive cost), scrypt (memory-hard), Argon2 (winner of PHC, 2015 — memory-hard + side-channel resistant).

## Further Reading

- [undefined](undefined)
