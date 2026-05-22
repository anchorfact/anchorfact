---
id:"kb-2026-00127"
title:"Linked List"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Introduction to Algorithms (CLRS)"
    type:"undefined"
    url:"undefined"
    institution:"MIT Press"
secondary_sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    authors: ["Lewis", "Perez", "Piktus"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.11401"
    url: "https://arxiv.org/abs/2005.11401"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A linked list is a linear collection of nodes, each containing data and a pointer. O(1) insert/delete at known position, O(n) random access. Variants: singly-linked, doubly-linked, circular. Poor cache locality but dynamic sizing is trivial.

## Core Explanation

Singly-linked: data + next pointer. Doubly-linked: data + next + prev. JavaScript doesn't have built-in linked lists — Array is always used due to cache performance. Linked lists shine when frequent insertions/deletions at arbitrary positions are needed and memory is fragmented.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
