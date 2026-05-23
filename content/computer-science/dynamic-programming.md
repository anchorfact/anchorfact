---
id:"kb-2026-00134"
title:"Dynamic Programming"
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

DP solves problems by breaking them into overlapping subproblems, solving each once (memoization/tabulation). Converts exponential to polynomial time. Requires optimal substructure. Classic: Fibonacci, knapsack, LCS, edit distance.

## Core Explanation

Top-down: recursion + cache (memoization). Bottom-up: iterative table filling (tabulation). 0/1 Knapsack: max value from n items with weight limit — O(nW) pseudo-polynomial. Longest Common Subsequence: O(mn). DP vs. greedy: greedy makes locally optimal choice (may fail globally); DP explores all possibilities via subproblem decomposition.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
