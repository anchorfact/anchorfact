---
id: swarm-evolutionary-intelligence
title: "Swarm and Evolutionary Intelligence: Genetic Algorithms, NEAT, and Particle Swarms"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
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
    statement: >-
      NEAT (NeuroEvolution of Augmenting Topologies, Stanley & Miikkulainen, 2002) evolves both weights and network architecture simultaneously — starting from minimal networks and complexifying
      through speciation, achieving competitive results on reinforcement learning benchmarks without backpropagation.
    source_title: Stanley & Miikkulainen, Evolutionary Computation (2002)
    source_url: https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
    confidence: high
  - id: af-swarm-evolutionary-intelligence-2
    statement: >-
      Particle Swarm Optimization (Kennedy & Eberhart, 1995) is inspired by bird flocking and fish schooling — particles adjust their position based on personal best and swarm best, with few
      hyperparameters and strong global search capability for non-differentiable optimization.
    source_title: Kennedy & Eberhart, IEEE ICNN (1995)
    source_url: https://ieeexplore.ieee.org/document/10243027
    confidence: high
primary_sources:
  - id: ps-swarm-evolutionary-intelligence-1
    title: Evolving Neural Networks through Augmenting Topologies (NEAT)
    type: academic_paper
    year: 2002
    institution: Evolutionary Computation (MIT Press)
    url: https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
  - id: ps-swarm-evolutionary-intelligence-2
    title: "Particle Swarm Optimization: A Comprehensive Survey"
    type: academic_paper
    year: 2024
    institution: IEEE Access
    url: https://ieeexplore.ieee.org/document/10243027
known_gaps:
  - Evolutionary algorithms for large-scale deep learning
  - Multi-objective optimization in high dimensions
disputed_statements: []
secondary_sources:
  - title: "Swarm Intelligence: A Survey of Model Classification and Applications"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Chinese Journal of Aeronautics
    url: https://doi.org/10.1016/j.cja.2024.03.019
  - title: "Swarm Learning: A Survey of Concepts, Applications, and Trends"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv
    url: https://arxiv.org/abs/2405.00556
  - title: "Evolutionary Computation: A Unified Approach"
    type: textbook
    year: 2022
    authors:
      - De Jong, Kenneth A.
    institution: MIT Press
    url: https://mitpress.mit.edu/9780262046817/
  - title: Particle Swarm Optimization (Original PSO Paper)
    type: conference_paper
    year: 1995
    authors:
      - Kennedy, James
      - Eberhart, Russell
    institution: IEEE ICNN
    url: https://doi.org/10.1109/ICNN.1995.488968
  - title: "Swarm Intelligence and Deep Learning: A Comprehensive Survey of Recent Advances"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Swarm and Evolutionary Computation (Elsevier)
    url: https://doi.org/10.1016/j.swevo.2025.101789
updated: "2026-05-24"
---
## TL;DR
Evolutionary computation draws inspiration from biological evolution — mutation, crossover, selection — to optimize without gradients. NEAT evolves neural architectures; PSO mimics swarm behavior; genetic algorithms solve combinatorial problems.

## Core Explanation
Genetic Algorithm loop: (1) initialize population of candidate solutions; (2) evaluate fitness of each; (3) select parents (tournament, roulette); (4) crossover (combine parent genes); (5) mutate (random perturbation); (6) replace population and repeat. Advantages: gradient-free, naturally parallel, well-suited for multi-objective optimization and discrete search spaces.

## Detailed Analysis
NEAT innovations: (1) historical markings track gene origin for meaningful crossover; (2) speciation protects structural innovation by grouping similar networks; (3) minimal initialization then complexification avoids bloated architectures. Modern applications: neural architecture search (regularized evolution), hyperparameter optimization, game playing (NEAT for Atari). OpenAI used evolution strategies (ES) as alternative to RL for Mujoco locomotion — simpler, more parallelizable.

## Further Reading
- NEAT-Python Library
- OpenAI: Evolution Strategies as a Scalable Alternative to RL
- DEAP: Distributed Evolutionary Algorithms in Python
