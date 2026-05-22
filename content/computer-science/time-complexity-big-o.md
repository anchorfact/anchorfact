---
id:"kb-2026-00136"
title:"Time Complexity (Big O)"
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
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Big O describes upper bound of algorithm complexity as input size n grows. Common classes: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential.

## Core Explanation

Related: Ω (lower bound), Θ (tight bound). Amortized analysis: average over sequence of operations (e.g., dynamic array append is amortized O(1)). Master theorem solves divide-and-conquer recurrences T(n)=aT(n/b)+f(n). Space complexity matters too — quicksort is O(log n) space (recursion stack), mergesort is O(n) (auxiliary array).

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
