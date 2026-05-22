---
id:"kb-2026-00133"
title:"QuickSort & MergeSort"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Algorithms (4th Edition)"
    type:"undefined"
    url:"undefined"
    institution:"Princeton"
secondary_sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    authors: ["Lewis", "Perez", "Piktus"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.11401"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "Fluent Python (2nd Ed)"
    authors: ["Ramalho"]
    type: "book"
    year: 2021
    url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

QuickSort: average O(n log n), worst O(n²), in-place, not stable. Picks pivot, partitions, recurses. MergeSort: always O(n log n), stable, O(n) auxiliary space. Most practical sorts are hybrid (Timsort=merge+insertion).

## Core Explanation

QuickSort pivot selection: median-of-three reduces worst-case probability. MergeSort is ideal for linked lists (no extra space for merge). Timsort (Python, Java, V8 JS) exploits natural runs in data: O(n) on already-sorted input. Comparison-based sorting lower bound: Ω(n log n). Non-comparison: counting sort, radix sort — O(n) when data range is limited.

## Further Reading

- [Algorithms (4th Edition)](undefined)
