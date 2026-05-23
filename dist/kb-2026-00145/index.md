---
id:"kb-2026-00145"
title:"Decorator Pattern"
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

Attaches additional responsibilities dynamically, providing flexible alternative to subclassing. Decorators conform to the same interface, enabling transparent stacking.

## Core Explanation

Example: `new CompressedStream(new EncryptedStream(new FileStream()))`. Python @decorator syntax. ES7 decorators (Stage 3). React HOC (Higher-Order Components) is a decorator pattern applied to components. Middleware pattern (Express, Koa) is a variant.

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
