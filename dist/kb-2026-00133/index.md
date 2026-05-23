---
id:"kb-2026-00133"
title:"QuickSort & MergeSort"
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

QuickSort: average O(n log n), worst O(n²), in-place, not stable. Picks pivot, partitions, recurses. MergeSort: always O(n log n), stable, O(n) auxiliary space. Most practical sorts are hybrid (Timsort=merge+insertion).

## Core Explanation

QuickSort pivot selection: median-of-three reduces worst-case probability. MergeSort is ideal for linked lists (no extra space for merge). Timsort (Python, Java, V8 JS) exploits natural runs in data: O(n) on already-sorted input. Comparison-based sorting lower bound: Ω(n log n). Non-comparison: counting sort, radix sort — O(n) when data range is limited.

## Further Reading

- [Algorithms (4th Edition)](undefined)
