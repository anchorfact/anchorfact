---
id:"kb-2026-00142"
title:"Factory Method Pattern"
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

Defines an interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses.

## Core Explanation

Creator (abstract with factory method) + ConcreteCreator + Product interface. In modern code, factory functions (plain functions returning objects) often suffice without class hierarchies. Abstract Factory creates families of related objects (e.g., GUI widgets per platform).

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
