---
id: kb-2026-00139
title: Bit Manipulation
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Bit manipulation operates directly on binary representations using bitwise operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>). Used for optimization, cryptography,
      compression, hardware interfacing, and low-memory algorithms.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Common tricks: n & (n-1) clears lowest set bit (used in popcount)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: Fast multiplication/division by powers of 2 via shift (compiler optimization).
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---


## TL;DR

Bit manipulation operates directly on binary representations using bitwise operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>). Used for optimization, cryptography, compression, hardware interfacing, and low-memory algorithms.

## Core Explanation

Common tricks: n & (n-1) clears lowest set bit (used in popcount). n & 1 checks odd/even. XOR swap: a^=b; b^=a; a^=b. x XOR x = 0, x XOR 0 = x. Bitmask: single integer stores 32 boolean flags. Fast multiplication/division by powers of 2 via shift (compiler optimization).

## Further Reading

- [Hacker's Delight (2nd Edition)](undefined)
