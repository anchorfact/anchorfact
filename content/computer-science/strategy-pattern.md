---
id:"kb-2026-00144"
title:"Strategy Pattern"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Design Patterns (Gang of Four)"
    type:"undefined"
    url:"undefined"
    institution:"Addison-Wesley"
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

Encapsulates interchangeable algorithms, making them swappable at runtime. Replaces large if-else chains with polymorphism. Example: sorting strategies, payment methods.

## Core Explanation

Context (holds strategy), Strategy (interface), ConcreteStrategies. In functional languages, strategies are just functions — no class hierarchy needed. Key benefit: adding new strategies doesn't modify existing code (Open/Closed Principle).

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
