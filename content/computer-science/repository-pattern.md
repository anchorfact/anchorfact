---
id:"kb-2026-00150"
title:"Repository Pattern"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Patterns of Enterprise Application Architecture"
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

The Repository pattern mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects. It abstracts data access, enabling swapping data sources (database, API, in-memory) without changing business logic.

## Core Explanation

Provides: collection-like interface (add, remove, find), query methods, separation from ORM. Often combined with Unit of Work pattern for transactional consistency. Generic repository: `Repository<T>` with common CRUD. Overuse can lead to anemic domain models — prefer rich domain models with behavior.

## Further Reading

- [Patterns of Enterprise Application Architecture](undefined)
