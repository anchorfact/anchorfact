---
id:"kb-2026-00132"
title:"Dijkstra's Algorithm"
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

Dijkstra (1956) finds shortest paths from a source vertex to all others in graphs with non-negative weights. O((V+E) log V) with binary heap. Does not work with negative weights — use Bellman-Ford.

## Core Explanation

Algorithm: maintain distance array (∞ initially), extract min from priority queue, relax neighbors (update if shorter path found via current vertex). Bellman-Ford handles negative weights (O(VE), detects negative cycles). A* algorithm extends Dijkstra with a heuristic for goal-directed search.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
