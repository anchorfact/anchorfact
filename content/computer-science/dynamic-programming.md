---
id: kb-2026-00134
title: Dynamic Programming
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
    statement: "Longest Common Subsequence: O"
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      DP solves problems by breaking them into overlapping subproblems, solving each once (memoization/tabulation). Converts exponential to polynomial time. Requires optimal substructure. Classic:
      Fibonacci, knapsack, LCS, edit distance.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "0/1 Knapsack: max value from n items with weight limit — O(nW) pseudo-polynomial."
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

DP solves problems by breaking them into overlapping subproblems, solving each once (memoization/tabulation). Converts exponential to polynomial time. Requires optimal substructure. Classic: Fibonacci, knapsack, LCS, edit distance.

## Core Explanation

Top-down: recursion + cache (memoization). Bottom-up: iterative table filling (tabulation). 0/1 Knapsack: max value from n items with weight limit — O(nW) pseudo-polynomial. Longest Common Subsequence: O(mn). DP vs. greedy: greedy makes locally optimal choice (may fail globally); DP explores all possibilities via subproblem decomposition.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
