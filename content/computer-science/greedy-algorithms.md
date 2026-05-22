---
id:"kb-2026-00135"
title:"Greedy Algorithms"
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

Greedy algorithms make locally optimal choices hoping for global optimum. Fast but require correctness proof. Examples: Huffman coding, Prim/Kruskal (MST), activity selection, fractional knapsack.

## Core Explanation

Greedy choice property: locally optimal choice leads to globally optimal solution. Proof via exchange argument: any optimal solution can be transformed to include the greedy choice. Prim's: grow MST by adding nearest vertex (O(E log V)). Kruskal's: sort edges, union-find to avoid cycles (O(E log E)).

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
