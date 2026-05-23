---
id: kb-2026-00117
title: Hashing Algorithms
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Cryptographic hash functions map arbitrary data to fixed-size digests (fingerprints). Key properties: preimage resistance (cannot reverse), second preimage resistance (cannot find different
      input with same hash), collision resistance (cannot find any two inputs with same hash). SHA-256 (32 bytes) is the current standard; SHA-3 (Keccak) is the next 
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "SHA-2 family: SHA-224, SHA-256, SHA-384, SHA-512 (all considered secure)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: SHA-3 is not a replacement but an alternative with different internal structure (sponge construction).
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-004
    statement: "Password hashing uses specialized functions: bcrypt (adaptive cost), scrypt (memory-hard), Argon2 (winner of PHC, 2015 — memory-hard + side-channel resistant)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

Cryptographic hash functions map arbitrary data to fixed-size digests (fingerprints). Key properties: preimage resistance (cannot reverse), second preimage resistance (cannot find different input with same hash), collision resistance (cannot find any two inputs with same hash). SHA-256 (32 bytes) is the current standard; SHA-3 (Keccak) is the next generation.

## Core Explanation

SHA-1 (broken, 2017 collision demonstrated). MD5 (completely broken). SHA-2 family: SHA-224, SHA-256, SHA-384, SHA-512 (all considered secure). SHA-3 is not a replacement but an alternative with different internal structure (sponge construction). Password hashing uses specialized functions: bcrypt (adaptive cost), scrypt (memory-hard), Argon2 (winner of PHC, 2015 — memory-hard + side-channel resistant).

## Further Reading

- 