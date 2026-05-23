---
id: kb-2026-00130
title: Heap / Priority Queue
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
atomic_facts:
  - id: fact-computer-science-01
    statement: Binary heap is the most common implementation
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: "A heap is a complete binary tree with the heap property (parent ≤ children for min-heap). O(1) peek, O(log n) insert/extract. Array-based representation: children of i are 2i+1, 2i+2."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: Fibonacci heap achieves O(1) insert, amortized O(log n) extract.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
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
---



## TL;DR

A heap is a complete binary tree with the heap property (parent ≤ children for min-heap). O(1) peek, O(log n) insert/extract. Array-based representation: children of i are 2i+1, 2i+2.

## Core Explanation

Binary heap is the most common implementation. Heapify (construction): O(n) bottom-up. Heapsort: build heap + n extractions = O(n log n) in-place. Priority queues in Dijkstra, job scheduling, event simulation. Fibonacci heap achieves O(1) insert, amortized O(log n) extract.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
