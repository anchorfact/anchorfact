---
id: kb-2026-00220
title: Pathfinding Algorithms in Games
schema_type: TechArticle
category: game-development
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
completeness: 0.88
ai_citations: null
primary_sources:
  - title: GDC Vault
    type: conference
    year: 2026
    url: https://www.gdconf.com/
    institution: GDC
secondary_sources:
  - title: GDC Vault
    type: conference
    year: 2026
    url: https://www.gdconf.com/
    institution: GDC
  - title: Game Engine Architecture (Jason Gregory, 3rd Ed)
    type: textbook
    year: 2018
    url: https://www.gameenginebook.com/
    institution: CRC Press
atomic_facts:
  - id: fact-game-development-001
    statement: >-
      Pathfinding finds routes for game characters to navigate environments. A* algorithm (pronounced A-star) is the standard: combines Dijkstra's shortest path with a heuristic guiding search toward
      the goal. Used in virtually every game with NPC movement. NavMesh (navigation mesh) replaces grid-based maps with polygon-based walkable areas.
    confidence: medium
    source_title: GDC Vault
    source_url: https://www.gdconf.com/
  - id: fact-game-development-002
    statement: "Common heuristics: Manhattan distance (grid, 4-directional), Euclidean (any direction), octile (8-directional)."
    confidence: medium
    source_title: GDC Vault
    source_url: https://www.gdconf.com/
---


## TL;DR

Pathfinding finds routes for game characters to navigate environments. A* algorithm (pronounced A-star) is the standard: combines Dijkstra's shortest path with a heuristic guiding search toward the goal. Used in virtually every game with NPC movement. NavMesh (navigation mesh) replaces grid-based maps with polygon-based walkable areas.

## Core Explanation

A*: f(n) = g(n) + h(n). g = cost from start, h = heuristic (estimated cost to goal). Heuristic must be admissible (never overestimate) for optimal path. Common heuristics: Manhattan distance (grid, 4-directional), Euclidean (any direction), octile (8-directional). NavMesh: precompute walkable surfaces, agents use steering behaviors on top. Hierarchical pathfinding for large worlds.

## Further Reading

- [undefined](undefined)
