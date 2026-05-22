---
id:"kb-2026-00137"
title:"Recursion"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Structure and Interpretation of Computer Programs (SICP)"
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

Recursion is a technique where a function calls itself to solve smaller instances of the same problem. It requires a base case (termination) and recursive case (problem reduction). Recursion elegantly models tree traversal, divide-and-conquer, and backtracking.

## Core Explanation

Tail recursion: recursive call is the last operation — compilers can optimize to iteration (no stack growth). JavaScript engines (Safari JSC only) support TCO. Recursion depth limited by call stack (~10K in browsers). Recursion can always be converted to iteration (using explicit stack), and vice versa.

## Further Reading

- [Structure and Interpretation of Computer Programs (SICP)](undefined)
