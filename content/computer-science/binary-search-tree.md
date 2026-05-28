---
id: kb-2026-00129
title: Binary Search Tree
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
  - id: fact-binary-search-tree-1
    statement: >-
      NIST defines a binary search tree as a binary tree in which each node key is greater than keys
      in the left subtree and less than keys in the right subtree.
    source_title: 'NIST DADS: Binary Search Tree'
    source_url: https://xlinux.nist.gov/dads/HTML/binarySearchTree.html
    confidence: medium
  - id: fact-binary-search-tree-2
    statement: >-
      Princeton Algorithms explains that BST search recursively follows the appropriate subtree
      after comparing the search key with the root key.
    source_title: 'Princeton Algorithms: Binary Search Trees'
    source_url: https://algs4.cs.princeton.edu/32bst/
    confidence: medium
  - id: fact-binary-search-tree-3
    statement: >-
      Princeton Algorithms states that red-black BST operations take logarithmic time in the worst
      case.
    source_title: 'Princeton Algorithms: Balanced Search Trees'
    source_url: https://algs4.cs.princeton.edu/33balanced/
    confidence: medium
completeness: 0.86
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: 'NIST DADS: Binary Search Tree'
    type: technical_reference
    year: 2026
    url: https://xlinux.nist.gov/dads/HTML/binarySearchTree.html
    institution: National Institute of Standards and Technology
  - title: 'Princeton Algorithms: Binary Search Trees'
    type: course_material
    year: 2019
    url: https://algs4.cs.princeton.edu/32bst/
    institution: Princeton University
  - title: 'Princeton Algorithms: Balanced Search Trees'
    type: course_material
    year: 2019
    url: https://algs4.cs.princeton.edu/33balanced/
    institution: Princeton University
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

A binary search tree stores ordered keys so search can branch left or right after comparing against each node.

## Core Explanation

This repair removes generic ACM and future survey entries, then narrows public claims to NIST and Princeton algorithm references.

## Further Reading

- [NIST DADS: Binary Search Tree](https://xlinux.nist.gov/dads/HTML/binarySearchTree.html)
- [Princeton Algorithms: Binary Search Trees](https://algs4.cs.princeton.edu/32bst/)
- [Princeton Algorithms: Balanced Search Trees](https://algs4.cs.princeton.edu/33balanced/)
