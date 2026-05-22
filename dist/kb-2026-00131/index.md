---
id:"kb-2026-00131"
title:"Graph & BFS/DFS"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Algorithms (4th Edition)"
    type:"undefined"
    url:"undefined"
    institution:"Princeton"
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

A graph G=(V,E) models networks. BFS (queue) finds shortest paths in unweighted graphs. DFS (stack/recursion) detects cycles, performs topological sort on DAGs. Both are O(V+E).

## Core Explanation

Adjacency list: O(V+E) space, good for sparse graphs. Adjacency matrix: O(V²) space, good for dense. BFS uses queue, level-order traversal — finds shortest path in unweighted graphs. DFS uses stack (or recursion call stack), can be used for maze solving, cycle detection (back edges), strongly connected components.

## Further Reading

- [Algorithms (4th Edition)](undefined)
