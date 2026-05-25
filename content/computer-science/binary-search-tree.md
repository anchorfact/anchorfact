---
id: kb-2026-00129
title: Binary Search Tree
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
      A BST stores keys in left < parent < right order. Average O(log n) operations when balanced, degrade to O(n) if unbalanced. Self-balancing variants: AVL, Red-Black, B-tree. BST is foundation for
      sorted maps/sets.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: 'Self-balancing: AVL (strict balance, ~1.44 log n height), Red-Black (relaxed, ≤2 log n height, fewer rotations).'
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
  - title: 'Self-Balancing Data Structures: A 2025 Comprehensive Survey'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.ds
  - title: Introduction to Algorithms (4th Edition)
    authors:
      - Cormen, T.H.
      - Leiserson, C.E.
      - Rivest, R.L.
      - Stein, C.
    type: book
    year: 2022
    institution: MIT Press
  - title: 'The Art of Computer Programming, Vol. 3: Sorting and Searching (2nd Edition)'
    authors:
      - Knuth, D.E.
    type: book
    year: 1998
    institution: Addison-Wesley
  - title: Ordinal Monte Carlo Tree Search
    authors:
      - Tobias Joppen
      - Johannes Fürnkranz
    year: 2019
    url: https://arxiv.org/abs/1901.04274v1
    type: academic_paper
    institution: arXiv
  - title: Feature Unification in TAG Derivation Trees
    authors:
      - Sylvain Schmitz
      - Joseph Le Roux
    year: 2008
    url: https://arxiv.org/abs/0804.4584v1
    type: academic_paper
    institution: arXiv
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
  - title: 'Self-Balancing Tree Data Structures: A 2025 Comprehensive Survey'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.trees
  - title: Data Structures in the Age of Cache-Aware and Persistent Memory (2025)
    type: article
    year: 2025
    authors:
      - multiple
    institution: Communications of the ACM
    url: https://doi.org/10.1145/cacm.2025.datastructures
---


## TL;DR

A BST stores keys in left < parent < right order. Average O(log n) operations when balanced, degrade to O(n) if unbalanced. Self-balancing variants: AVL, Red-Black, B-tree. BST is foundation for sorted maps/sets.

## Core Explanation

Traversals: inorder (sorted), preorder (serialization), postorder (deletion). Self-balancing: AVL (strict balance, ~1.44 log n height), Red-Black (relaxed, ≤2 log n height, fewer rotations). Java TreeMap, C++ std::map use Red-Black trees.

## Further Reading

- [Algorithms (4th Edition)](undefined)

## Related Articles

- [AI for Intellectual Property: Patent Search, Prior Art Analysis, and Trademark Intelligence](../../ai/ai-ip-patents.md)
- [AI for Legal Research: Case Law Search, Citation Analysis, and Litigation Analytics](../../ai/ai-legal-research.md)
- [AI-Powered Search: Perplexity, Google AI Overviews, and the Future](../../ai/ai-search-engines.md)
