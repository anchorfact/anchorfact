---
id:"kb-2026-00127"
title:"Linked List"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
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
---

## TL;DR

A linked list is a linear collection of nodes, each containing data and a pointer. O(1) insert/delete at known position, O(n) random access. Variants: singly-linked, doubly-linked, circular. Poor cache locality but dynamic sizing is trivial.

## Core Explanation

Singly-linked: data + next pointer. Doubly-linked: data + next + prev. JavaScript doesn't have built-in linked lists — Array is always used due to cache performance. Linked lists shine when frequent insertions/deletions at arbitrary positions are needed and memory is fragmented.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
