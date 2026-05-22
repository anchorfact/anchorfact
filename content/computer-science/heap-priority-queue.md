---
id:"kb-2026-00130"
title:"Heap / Priority Queue"
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

A heap is a complete binary tree with the heap property (parent ≤ children for min-heap). O(1) peek, O(log n) insert/extract. Array-based representation: children of i are 2i+1, 2i+2.

## Core Explanation

Binary heap is the most common implementation. Heapify (construction): O(n) bottom-up. Heapsort: build heap + n extractions = O(n log n) in-place. Priority queues in Dijkstra, job scheduling, event simulation. Fibonacci heap achieves O(1) insert, amortized O(log n) extract.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
