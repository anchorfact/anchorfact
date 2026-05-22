---
id:"kb-2026-00129"
title:"Binary Search Tree"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Algorithms (4th Edition)"
    type:"undefined"
    url:"undefined"
    institution:"Princeton"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A BST stores keys in left < parent < right order. Average O(log n) operations when balanced, degrade to O(n) if unbalanced. Self-balancing variants: AVL, Red-Black, B-tree. BST is foundation for sorted maps/sets.

## Core Explanation

Traversals: inorder (sorted), preorder (serialization), postorder (deletion). Self-balancing: AVL (strict balance, ~1.44 log n height), Red-Black (relaxed, ≤2 log n height, fewer rotations). Java TreeMap, C++ std::map use Red-Black trees.

## Further Reading

- [Algorithms (4th Edition)](undefined)
