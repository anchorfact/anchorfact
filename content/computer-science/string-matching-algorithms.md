---
id:"kb-2026-00140"
title:"String Matching Algorithms"
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

String matching finds occurrences of a pattern in text. Naive: O(nm). KMP (Knuth-Morris-Pratt): O(n+m) using prefix function. Boyer-Moore: O(n/m) average, O(nm) worst. Rabin-Karp: O(n+m) average using rolling hash. Real-world text search uses hybrid algorithms.

## Core Explanation

KMP precomputes failure function (longest proper prefix that is also suffix). Boyer-Moore scans pattern right-to-left, skipping characters — fastest in practice for English text. Aho-Corasick extends KMP for multiple pattern matching (used in fgrep, intrusion detection). Suffix arrays/trees enable O(m) substring search with O(n) preprocessing.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
