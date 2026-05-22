---
id:"kb-2026-00140"
title:"String Matching Algorithms"
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

String matching finds occurrences of a pattern in text. Naive: O(nm). KMP (Knuth-Morris-Pratt): O(n+m) using prefix function. Boyer-Moore: O(n/m) average, O(nm) worst. Rabin-Karp: O(n+m) average using rolling hash. Real-world text search uses hybrid algorithms.

## Core Explanation

KMP precomputes failure function (longest proper prefix that is also suffix). Boyer-Moore scans pattern right-to-left, skipping characters — fastest in practice for English text. Aho-Corasick extends KMP for multiple pattern matching (used in fgrep, intrusion detection). Suffix arrays/trees enable O(m) substring search with O(n) preprocessing.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
