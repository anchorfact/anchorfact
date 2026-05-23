---
id:"kb-2026-00135"
title:"Greedy Algorithms"
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

Greedy algorithms make locally optimal choices hoping for global optimum. Fast but require correctness proof. Examples: Huffman coding, Prim/Kruskal (MST), activity selection, fractional knapsack.

## Core Explanation

Greedy choice property: locally optimal choice leads to globally optimal solution. Proof via exchange argument: any optimal solution can be transformed to include the greedy choice. Prim's: grow MST by adding nearest vertex (O(E log V)). Kruskal's: sort edges, union-find to avoid cycles (O(E log E)).

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
