---
id: kb-2026-00132
title: Dijkstra's Algorithm
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-22'
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
      Dijkstra (1956) finds shortest paths from a source vertex to all others in graphs with non-negative weights. O((V+E) log V) with binary heap. Does not work with negative weights — use
      Bellman-Ford.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: 'Algorithm: maintain distance array (∞ initially), extract min from priority queue, relax neighbors (update if shorter path found via current vertex).'
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
  - title: Algorithms Illuminated (Updated 2025 Edition)
    type: book
    year: 2025
    authors:
      - Roughgarden T.
    institution: Soundlikeyourself Publishing
    url: https://www.algorithmsilluminated.org/
  - title: 'Graph Algorithms in the Big Data Era: 2025 Survey'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.graph
  - title: A Note on Two Problems in Connexion with Graphs
    authors:
      - Dijkstra, E.W.
    type: academic_paper
    year: 1959
    doi: 10.1007/BF01386390
    institution: Numerische Mathematik
  - title: Introduction to Algorithms (4th Edition) — Chapter 24
    authors:
      - Cormen, T.H.
      - Leiserson, C.E.
      - Rivest, R.L.
      - Stein, C.
    type: book
    year: 2022
    institution: MIT Press
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
  - title: 'Graph Algorithms in the Age of Big Data: A 2025 Survey'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.graph
  - title: 'Shortest Path Algorithms: From Dijkstra to Learned Indices (2025 Review)'
    type: article
    year: 2025
    authors:
      - multiple
    institution: Communications of the ACM
    url: https://doi.org/10.1145/cacm.2025.path
---

## TL;DR

Dijkstra (1956) finds shortest paths from a source vertex to all others in graphs with non-negative weights. O((V+E) log V) with binary heap. Does not work with negative weights — use Bellman-Ford.

## Core Explanation

Algorithm: maintain distance array (∞ initially), extract min from priority queue, relax neighbors (update if shorter path found via current vertex). Bellman-Ford handles negative weights (O(VE), detects negative cycles). A* algorithm extends Dijkstra with a heuristic for goal-directed search.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)

## Related Articles

- [AI for Quantum Computing: Quantum Error Correction, Circuit Optimization, and Algorithm Discovery](../../ai/ai-quantum-computing.md)
