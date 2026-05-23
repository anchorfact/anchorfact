---
id: "kb-2026-00126"


title: "Array Data Structure"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

atomic_facts:
  - id: fact-computer-science-01
    statement: It is the most fundamental data structure
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
completeness: 0.88
ai_citations:

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

An array is a contiguous block of memory storing elements of the same type, accessible by index in O(1) time. It is the most fundamental data structure. Dynamic arrays (JavaScript Array, C++ vector) use geometric expansion for amortized O(1) append.

## Core Explanation

Key operations: access O(1), search O(n). Dynamic arrays amortize resizing by doubling capacity. Multi-dimensional arrays stored in row-major (C) or column-major (Fortran). Cache locality makes arrays fast — each cache miss loads 64 bytes (16 ints on 64-bit). Drawbacks: fixed size (static) or expensive resize (dynamic).

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
- [Algorithms (4th Edition)](undefined)
