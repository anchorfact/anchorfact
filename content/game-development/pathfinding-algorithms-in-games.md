---
id: "kb-2026-00220"
title: "Pathfinding Algorithms in Games"
schema_type: "TechArticle"
category: "game-development"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true

atomic_facts:
  - id: "fact-game-development-001"
    statement: "Pathfinding finds routes for game characters to navigate environments. A* algorithm (pronounced A-star) is the standard: combines Dijkstra's shortest path with a heuristic guiding search toward the goal. Used in virtually every game with NPC movement. NavMesh (navigation mesh) replaces grid-based maps with polygon-based walkable areas."
    source_url: "https://www.gdconf.com/"
    confidence: "medium"
  - id: "fact-game-development-002"
    statement: "Common heuristics: Manhattan distance (grid, 4-directional), Euclidean (any direction), octile (8-directional)."
    source_url: "https://www.gdconf.com/"
    confidence: "medium"

completeness: 0.88

primary_sources:
  - title: "GDC Vault"
    type: "conference"
    year: 2026
    url: "https://www.gdcvault.com/"
    institution: "GDC"

secondary_sources:
  - title: "GDC Vault"
    type: "conference"
    year: 2026
    url: "https://www.gdconf.com/"
    institution: "GDC"
  - title: "Game Engine Architecture (Jason Gregory, 3rd Ed)"
    type: "textbook"
    year: 2018
    url: "https://www.gameenginebook.com/"
    institution: "CRC Press"

---



## TL;DR

Pathfinding finds routes for game characters to navigate environments. A* algorithm (pronounced A-star) is the standard: combines Dijkstra's shortest path with a heuristic guiding search toward the goal. Used in virtually every game with NPC movement. NavMesh (navigation mesh) replaces grid-based maps with polygon-based walkable areas.

## Core Explanation

A*: f(n) = g(n) + h(n). g = cost from start, h = heuristic (estimated cost to goal). Heuristic must be admissible (never overestimate) for optimal path. Common heuristics: Manhattan distance (grid, 4-directional), Euclidean (any direction), octile (8-directional). NavMesh: precompute walkable surfaces, agents use steering behaviors on top. Hierarchical pathfinding for large worlds.

## Further Reading

- 