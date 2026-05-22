---
id:"kb-2026-00220"
title:"Pathfinding Algorithms in Games"
schema_type:"TechArticle"
category:"game-development"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"Charles River Media"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Pathfinding finds routes for game characters to navigate environments. A* algorithm (pronounced A-star) is the standard: combines Dijkstra's shortest path with a heuristic guiding search toward the goal. Used in virtually every game with NPC movement. NavMesh (navigation mesh) replaces grid-based maps with polygon-based walkable areas.

## Core Explanation

A*: f(n) = g(n) + h(n). g = cost from start, h = heuristic (estimated cost to goal). Heuristic must be admissible (never overestimate) for optimal path. Common heuristics: Manhattan distance (grid, 4-directional), Euclidean (any direction), octile (8-directional). NavMesh: precompute walkable surfaces, agents use steering behaviors on top. Hierarchical pathfinding for large worlds.

## Further Reading

- [undefined](undefined)
