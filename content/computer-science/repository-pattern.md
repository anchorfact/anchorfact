---
id: "kb-2026-00150"


title: "Repository Pattern"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:

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

The Repository pattern mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects. It abstracts data access, enabling swapping data sources (database, API, in-memory) without changing business logic.

## Core Explanation

Provides: collection-like interface (add, remove, find), query methods, separation from ORM. Often combined with Unit of Work pattern for transactional consistency. Generic repository: `Repository<T>` with common CRUD. Overuse can lead to anemic domain models — prefer rich domain models with behavior.

## Further Reading

- [Patterns of Enterprise Application Architecture](undefined)
