---
id:"kb-2026-00126"
title:"Array Data Structure"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Introduction to Algorithms (CLRS)"
    type:"undefined"
    url:"undefined"
    institution:"MIT Press"
  - title:"Algorithms (4th Edition)"
    type:"undefined"
    url:"undefined"
    institution:"MIT Press"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

An array is a contiguous block of memory storing elements of the same type, accessible by index in O(1) time. It is the most fundamental data structure. Dynamic arrays (JavaScript Array, C++ vector) use geometric expansion for amortized O(1) append.

## Core Explanation

Key operations: access O(1), search O(n). Dynamic arrays amortize resizing by doubling capacity. Multi-dimensional arrays stored in row-major (C) or column-major (Fortran). Cache locality makes arrays fast — each cache miss loads 64 bytes (16 ints on 64-bit). Drawbacks: fixed size (static) or expensive resize (dynamic).

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
- [Algorithms (4th Edition)](undefined)
