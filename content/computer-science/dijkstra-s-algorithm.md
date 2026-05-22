---
id:"kb-2026-00132"
title:"Dijkstra's Algorithm"
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

Dijkstra (1956) finds shortest paths from a source vertex to all others in graphs with non-negative weights. O((V+E) log V) with binary heap. Does not work with negative weights — use Bellman-Ford.

## Core Explanation

Algorithm: maintain distance array (∞ initially), extract min from priority queue, relax neighbors (update if shorter path found via current vertex). Bellman-Ford handles negative weights (O(VE), detects negative cycles). A* algorithm extends Dijkstra with a heuristic for goal-directed search.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
