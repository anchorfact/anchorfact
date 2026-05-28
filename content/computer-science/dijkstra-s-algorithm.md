---
id: kb-2026-00132
title: Dijkstra's Algorithm
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-dijkstra-1
    statement: >-
      Dijkstra introduced the shortest-path method in the 1959 paper A Note on Two Problems in
      Connexion with Graphs.
    source_title: A Note on Two Problems in Connexion with Graphs
    source_url: https://doi.org/10.1007/BF01386390
    source_doi: 10.1007/BF01386390
    confidence: medium
  - id: fact-dijkstra-2
    statement: >-
      NIST describes Dijkstra algorithm as finding shortest paths from a single source to all
      vertices in a weighted directed graph.
    source_title: 'NIST DADS: Dijkstra Algorithm'
    source_url: https://xlinux.nist.gov/dads/HTML/dijkstraalgo.html
    confidence: medium
  - id: fact-dijkstra-3
    statement: >-
      Princeton Algorithms notes that shortest-path implementations relax edges and can use priority
      queues for Dijkstra shortest paths.
    source_title: 'Princeton Algorithms: Shortest Paths'
    source_url: https://algs4.cs.princeton.edu/44sp/
    confidence: medium
completeness: 0.86
known_gaps:
  - This compact article intentionally covers a small, source-mapped slice of a broader topic.
disputed_statements: []
primary_sources:
  - title: A Note on Two Problems in Connexion with Graphs
    type: academic_paper
    year: 1959
    url: https://doi.org/10.1007/BF01386390
    institution: Numerische Mathematik
    doi: 10.1007/BF01386390
    authors:
      - Dijkstra, E. W.
  - title: 'NIST DADS: Dijkstra Algorithm'
    type: technical_reference
    year: 2026
    url: https://xlinux.nist.gov/dads/HTML/dijkstraalgo.html
    institution: National Institute of Standards and Technology
  - title: 'Princeton Algorithms: Shortest Paths'
    type: course_material
    year: 2019
    url: https://algs4.cs.princeton.edu/44sp/
    institution: Princeton University
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

Dijkstra algorithm computes shortest paths from a source vertex in weighted graphs under its usual nonnegative-weight assumptions.

## Core Explanation

Dijkstra shortest paths are built around repeatedly choosing the nearest unsettled vertex and relaxing outgoing edges. The algorithm is a standard single-source shortest-path method for graphs with nonnegative weights.

## Further Reading

- [A Note on Two Problems in Connexion with Graphs](https://doi.org/10.1007/BF01386390)
- [NIST DADS: Dijkstra Algorithm](https://xlinux.nist.gov/dads/HTML/dijkstraalgo.html)
- [Princeton Algorithms: Shortest Paths](https://algs4.cs.princeton.edu/44sp/)
