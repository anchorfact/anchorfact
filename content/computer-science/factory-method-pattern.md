---
id:"kb-2026-00142"
title:"Factory Method Pattern"
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

Defines an interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses.

## Core Explanation

Creator (abstract with factory method) + ConcreteCreator + Product interface. In modern code, factory functions (plain functions returning objects) often suffice without class hierarchies. Abstract Factory creates families of related objects (e.g., GUI widgets per platform).

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
