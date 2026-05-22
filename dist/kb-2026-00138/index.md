---
id:"kb-2026-00138"
title:"Tree Data Structure"
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
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A tree is a hierarchical data structure with a root node and child subtrees. Each node (except root) has exactly one parent. Specialized trees: binary trees (max 2 children), N-ary trees, tries (prefix trees), segment trees (range queries), Fenwick trees (prefix sums).

## Core Explanation

Binary tree properties: max nodes at level l = 2^l, max total nodes = 2^(h+1)-1. Full binary tree: every node has 0 or 2 children. Complete binary tree: all levels filled except possibly last. Perfect binary tree: all levels completely filled. Tries store strings character-by-character for O(k) lookup (k = key length).

## Further Reading

- [Algorithms (4th Edition)](undefined)
