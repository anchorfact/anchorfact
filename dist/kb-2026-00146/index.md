---
id:"kb-2026-00146"
title:"Adapter Pattern"
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

Converts interface of a class into another interface clients expect. Lets incompatible interfaces work together. Object adapter (composition) preferred over class adapter (inheritance).

## Core Explanation

Example: wrapping a third-party logging library behind your application's Logger interface, enabling easy replacement. Adapter vs. Facade: Adapter changes interface; Facade simplifies a complex subsystem with a new unified interface. Bridge pattern separates abstraction from implementation.

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
