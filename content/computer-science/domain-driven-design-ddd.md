---
id: "kb-2026-00233"



title: "Domain-Driven Design (DDD)"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"


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

Domain-Driven Design (Eric Evans, 2003) focuses software design on the core business domain, with a shared language (Ubiquitous Language) between developers and domain experts. The code models the business, using the same terms. DDD is not about technology patterns — it's about understanding the problem deeply.

## Core Explanation

Ubiquitous Language: same terms in code, conversation, and documentation. Bounded Context: each subdomain has its own model (Sales ≠ Support). Entities: objects with identity (User, Order). Value Objects: immutable, defined by attributes (Money, Address). Aggregates: cluster of objects treated as single unit (Order + OrderItems). Domain Events: record significant business occurrences.

## Further Reading

- [Domain-Driven Design (Eric Evans)](undefined)
