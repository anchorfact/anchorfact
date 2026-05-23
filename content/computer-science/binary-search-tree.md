---
id: "kb-2026-00129"
title: "Binary Search Tree"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "A BST stores keys in left < parent < right order. Average O(log n) operations when balanced, degrade to O(n) if unbalanced. Self-balancing variants: AVL, Red-Black, B-tree. BST is foundation for sorted maps/sets."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Self-balancing: AVL (strict balance, ~1.44 log n height), Red-Black (relaxed, ≤2 log n height, fewer rotations)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"

secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

A BST stores keys in left < parent < right order. Average O(log n) operations when balanced, degrade to O(n) if unbalanced. Self-balancing variants: AVL, Red-Black, B-tree. BST is foundation for sorted maps/sets.

## Core Explanation

Traversals: inorder (sorted), preorder (serialization), postorder (deletion). Self-balancing: AVL (strict balance, ~1.44 log n height), Red-Black (relaxed, ≤2 log n height, fewer rotations). Java TreeMap, C++ std::map use Red-Black trees.

## Further Reading

- [Algorithms (4th Edition)](undefined)
