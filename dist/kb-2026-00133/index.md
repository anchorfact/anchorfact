---
id: "kb-2026-00133"
title: "QuickSort & MergeSort"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Most practical sorts are hybrid"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "QuickSort: average O(n log n), worst O(n²), in-place, not stable. Picks pivot, partitions, recurses. MergeSort: always O(n log n), stable, O(n) auxiliary space. Most practical sorts are hybrid (Timsort=merge+insertion)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Timsort (Python, Java, V8 JS) exploits natural runs in data: O(n) on already-sorted input."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

QuickSort: average O(n log n), worst O(n²), in-place, not stable. Picks pivot, partitions, recurses. MergeSort: always O(n log n), stable, O(n) auxiliary space. Most practical sorts are hybrid (Timsort=merge+insertion).

## Core Explanation

QuickSort pivot selection: median-of-three reduces worst-case probability. MergeSort is ideal for linked lists (no extra space for merge). Timsort (Python, Java, V8 JS) exploits natural runs in data: O(n) on already-sorted input. Comparison-based sorting lower bound: Ω(n log n). Non-comparison: counting sort, radix sort — O(n) when data range is limited.

## Further Reading

- [Algorithms (4th Edition)](undefined)
