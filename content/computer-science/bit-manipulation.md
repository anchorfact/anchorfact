---
id:"kb-2026-00139"
title:"Bit Manipulation"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Hacker's Delight (2nd Edition)"
    type:"undefined"
    url:"undefined"
    institution:"Addison-Wesley"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Bit manipulation operates directly on binary representations using bitwise operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>). Used for optimization, cryptography, compression, hardware interfacing, and low-memory algorithms.

## Core Explanation

Common tricks: n & (n-1) clears lowest set bit (used in popcount). n & 1 checks odd/even. XOR swap: a^=b; b^=a; a^=b. x XOR x = 0, x XOR 0 = x. Bitmask: single integer stores 32 boolean flags. Fast multiplication/division by powers of 2 via shift (compiler optimization).

## Further Reading

- [Hacker's Delight (2nd Edition)](undefined)
