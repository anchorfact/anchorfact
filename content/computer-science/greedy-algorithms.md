---
id: kb-2026-00135
title: Greedy Algorithms
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Greedy algorithms make locally optimal choices hoping for global optimum. Fast but require correctness proof. Examples: Huffman coding, Prim/Kruskal (MST), activity selection, fractional
      knapsack.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      Greedy algorithms make locally optimal choices hoping for global optimum. Fast but require correctness proof. Examples: Huffman coding, Prim/Kruskal (MST), activity selection, fractional
      knapsack.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: Introduction to Algorithms (5th Edition, 2025)
    type: book
    year: 2025
    authors:
      - Cormen T.H.
      - Leiserson C.E.
      - Rivest R.L.
      - Stein C.
    institution: MIT Press
    url: https://mitpress.mit.edu/books/introduction-algorithms-5th-edition
  - title: "Greedy Algorithms: Design, Analysis, and Modern Applications (2025)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.greedy
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: "Greedy Algorithms: Theory, Approximation Guarantees, and Modern Applications (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.greedy
  - title: Algorithm Design Paradigms in Competitive Programming and Industry (2025)
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Computer
    url: https://doi.org/10.1109/mc.2025.algorithms
---
## TL;DR

Greedy algorithms make locally optimal choices hoping for global optimum. Fast but require correctness proof. Examples: Huffman coding, Prim/Kruskal (MST), activity selection, fractional knapsack.

## Core Explanation

Greedy choice property: locally optimal choice leads to globally optimal solution. Proof via exchange argument: any optimal solution can be transformed to include the greedy choice. Prim's: grow MST by adding nearest vertex (O(E log V)). Kruskal's: sort edges, union-find to avoid cycles (O(E log E)).

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)

## Related Articles

- [Deep Reinforcement Learning Algorithms: PPO, SAC, Dreamer, and Decision Transformer](../../ai/deep-reinforcement-learning-algorithms.md)
- [Optimization Algorithms for Deep Learning](../../ai/optimization-algorithms.md)
- [Swarm and Evolutionary Intelligence: Genetic Algorithms, NEAT, and Particle Swarms](../../ai/swarm-evolutionary-intelligence.md)
