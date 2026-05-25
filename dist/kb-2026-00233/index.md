---
id: "kb-2026-00233"
title: "Domain-Driven Design (DDD)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "Domain-Driven Design (Eric Evans, 2003) focuses software design on the core business domain, with a shared language (Ubiquitous Language) between developers and domain experts. The code models the business, using the same terms. DDD is not about technology patterns — it's about understanding the problem deeply."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Ubiquitous Language: same terms in code, conversation, and documentation."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Bounded Context: each subdomain has its own model (Sales ≠ Support)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-004"
    statement: "Value Objects: immutable, defined by attributes (Money, Address)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-005"
    statement: "Domain Events: record significant business occurrences."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Domain-Driven Design (Eric Evans, 2003) focuses software design on the core business domain, with a shared language (Ubiquitous Language) between developers and domain experts. The code models the business, using the same terms. DDD is not about technology patterns — it's about understanding the problem deeply.

## Core Explanation

Ubiquitous Language: same terms in code, conversation, and documentation. Bounded Context: each subdomain has its own model (Sales ≠ Support). Entities: objects with identity (User, Order). Value Objects: immutable, defined by attributes (Money, Address). Aggregates: cluster of objects treated as single unit (Order + OrderItems). Domain Events: record significant business occurrences.

## Further Reading

- [Domain-Driven Design (Eric Evans)](undefined)
