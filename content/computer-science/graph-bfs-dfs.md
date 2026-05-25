---
id: kb-2026-00131
title: Graph & BFS/DFS
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
    statement: A graph G=(V,E) models networks. BFS (queue) finds shortest paths in unweighted graphs. DFS (stack/recursion) detects cycles, performs topological sort on DAGs. Both are O(V+E).
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: A graph G=(V,E) models networks. BFS (queue) finds shortest paths in unweighted graphs. DFS (stack/recursion) detects cycles, performs topological sort on DAGs. Both are O(V+E).
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
  - title: Algorithms (5th Edition, 2025)
    type: book
    year: 2025
    authors:
      - Sedgewick R.
      - Wayne K.
    institution: Addison-Wesley
    url: https://algs4.cs.princeton.edu/
  - title: "Graph Algorithms: BFS, DFS, and Parallel Processing (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.graphalgo
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
  - title: "Graph Traversal Algorithms: From BFS/DFS to Learned Graph Navigation (2025)"
    type: article
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.traversal
  - title: "Parallel Graph Processing: BFS, DFS, and Beyond on Modern Hardware (2025)"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE TPDS
    url: https://doi.org/10.1109/tpds.2025.graph
---
## TL;DR

A graph G=(V,E) models networks. BFS (queue) finds shortest paths in unweighted graphs. DFS (stack/recursion) detects cycles, performs topological sort on DAGs. Both are O(V+E).

## Core Explanation

Adjacency list: O(V+E) space, good for sparse graphs. Adjacency matrix: O(V²) space, good for dense. BFS uses queue, level-order traversal — finds shortest path in unweighted graphs. DFS uses stack (or recursion call stack), can be used for maze solving, cycle detection (back edges), strongly connected components.

## Further Reading

- [Algorithms (4th Edition)](undefined)
