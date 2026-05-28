---
id: kb-2026-00220
title: Pathfinding Algorithms in Games
schema_type: TechArticle
category: game-development
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: af-pathfinding-algorithms-in-games-1
    statement: Dijkstra's algorithm solves shortest-path problems on graphs with nonnegative edge weights.
    source_title: A Note on Two Problems in Connexion with Graphs
    source_url: https://doi.org/10.1007/BF01386390
    confidence: medium
  - id: af-pathfinding-algorithms-in-games-2
    statement: A* uses heuristic estimates to guide minimum-cost path search.
    source_title: A Formal Basis for the Heuristic Determination of Minimum Cost Paths
    source_url: https://doi.org/10.1109/TSSC.1968.300136
    confidence: medium
  - id: af-pathfinding-algorithms-in-games-3
    statement: Jump Point Search prunes symmetric paths to speed up pathfinding on uniform-cost grid maps.
    source_title: Online Graph Pruning for Pathfinding on Grid Maps
    source_url: https://ojs.aaai.org/index.php/AAAI/article/view/7994
    confidence: medium
completeness: 0.88
primary_sources:
  - id: ps-pathfinding-algorithms-in-games-1
    title: A Note on Two Problems in Connexion with Graphs
    type: academic_paper
    year: 1959
    institution: Numerische Mathematik
    url: https://doi.org/10.1007/BF01386390
  - id: ps-pathfinding-algorithms-in-games-2
    title: A Formal Basis for the Heuristic Determination of Minimum Cost Paths
    type: academic_paper
    year: 1968
    institution: IEEE
    url: https://doi.org/10.1109/TSSC.1968.300136
  - id: ps-pathfinding-algorithms-in-games-3
    title: Online Graph Pruning for Pathfinding on Grid Maps
    type: conference_paper
    year: 2011
    institution: AAAI
    url: https://ojs.aaai.org/index.php/AAAI/article/view/7994
secondary_sources: []
updated: '2026-05-28'
disputed_statements: []
known_gaps:
  - Dynamic obstacle handling and multi-agent crowd movement
  - Tradeoffs between optimal paths, responsiveness, and designer-authored navigation constraints
---
## TL;DR
Game pathfinding turns maps into graph-search problems. Dijkstra, A*, and grid-specific pruning methods are durable anchors for explaining how agents find routes.

## Core Explanation
Games often represent movement spaces as grids, navigation meshes, waypoints, or graphs. The chosen algorithm must balance optimality, speed, memory, and how often the world changes.

## Detailed Analysis
The repaired article narrows claims to classic shortest-path and heuristic-search sources, with Jump Point Search as a game-relevant grid optimization. It avoids broad claims about all games or all navigation systems.

## Related Articles

- [Deep Reinforcement Learning Algorithms: PPO, SAC, Dreamer, and Decision Transformer](../../ai/deep-reinforcement-learning-algorithms.md)
- [Optimization Algorithms for Deep Learning](../../ai/optimization-algorithms.md)
- [Swarm and Evolutionary Intelligence: Genetic Algorithms, NEAT, and Particle Swarms](../../ai/swarm-evolutionary-intelligence.md)
