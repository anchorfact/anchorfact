---
id:"kb-2026-00136"
title:"Time Complexity (Big O)"
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

Big O describes upper bound of algorithm complexity as input size n grows. Common classes: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential.

## Core Explanation

Related: Ω (lower bound), Θ (tight bound). Amortized analysis: average over sequence of operations (e.g., dynamic array append is amortized O(1)). Master theorem solves divide-and-conquer recurrences T(n)=aT(n/b)+f(n). Space complexity matters too — quicksort is O(log n) space (recursion stack), mergesort is O(n) (auxiliary array).

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
