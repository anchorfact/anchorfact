---
id: swarm-evolutionary-intelligence
title: 'Swarm and Evolutionary Intelligence: Genetic Algorithms, NEAT, and Particle Swarms'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-swarm-evolutionary-intelligence-1
    statement: Particle swarm optimization models a population of candidate solutions that update positions using individual and social information.
    source_title: Particle swarm optimization
    source_url: https://doi.org/10.1109/ICNN.1995.488968
    confidence: medium
  - id: af-swarm-evolutionary-intelligence-2
    statement: Ant Colony System applies cooperative ant-inspired search to the traveling salesman problem.
    source_title: 'Ant Colony System: A Cooperative Learning Approach to the Traveling Salesman Problem'
    source_url: https://doi.org/10.1109/4235.585892
    confidence: medium
  - id: af-swarm-evolutionary-intelligence-3
    statement: Genetic algorithms use evolutionary operators such as selection, crossover, and mutation to search candidate solutions.
    source_title: A genetic algorithm tutorial
    source_url: https://doi.org/10.1007/BF00175354
    confidence: medium
primary_sources:
  - id: ps-swarm-evolutionary-intelligence-1
    title: Particle swarm optimization
    type: conference_paper
    year: 1995
    institution: IEEE
    url: https://doi.org/10.1109/ICNN.1995.488968
  - id: ps-swarm-evolutionary-intelligence-2
    title: 'Ant Colony System: A Cooperative Learning Approach to the Traveling Salesman Problem'
    type: academic_paper
    year: 1997
    institution: IEEE
    url: https://doi.org/10.1109/4235.585892
  - id: ps-swarm-evolutionary-intelligence-3
    title: A genetic algorithm tutorial
    type: academic_paper
    year: 1994
    institution: Statistics and Computing
    url: https://doi.org/10.1007/BF00175354
known_gaps:
  - Benchmark sensitivity and reproducibility across optimization problems
  - Hybridization with gradient-based or model-based search methods
disputed_statements: []
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Swarm and evolutionary intelligence describes optimization methods inspired by social behavior and evolution. Strong claims should identify the algorithm family instead of treating all bio-inspired search as one technique.

## Core Explanation
Particle swarms, ant-colony methods, and genetic algorithms all search over candidate solutions, but they differ in representation, update rules, and how they use population-level information.

## Detailed Analysis
The repaired article uses classic PSO, ant-colony, and genetic-algorithm sources and avoids broad claims that these methods are always superior to conventional optimization.

## Related Articles

- [AI Benchmarks: MMLU, SWE-bench, and How We Measure Intelligence](../ai-benchmarks-and-evaluation.md)
- [AI and Blockchain: Decentralized Intelligence, Smart Contracts, and Crypto-Economic Systems](../ai-blockchain.md)
- [AI for Drone Autonomy: Autonomous Navigation, Swarm Coordination, and Aerial Robotics](../ai-drone-autonomy.md)
