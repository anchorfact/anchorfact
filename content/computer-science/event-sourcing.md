---
id: kb-2026-00253
title: Event Sourcing
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Event Sourcing stores state changes as a sequence of immutable events, rather than storing current state directly. The current state is derived by replaying events. Events are the source of
      truth — like a bank ledger (transactions), not just the current balance. Benefits: complete audit trail, temporal queries, easy debugging.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "CQRS (Command Query Responsibility Segregation) pairs naturally with Event Sourcing: Commands write events, Queries read from denormalized projections."
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: Event-Driven Architecture in Practice (2025 Edition)
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/eda/
  - title: "Event Sourcing and CQRS: A 2025 Systematic Mapping"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.es
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: "Event Sourcing and CQRS: A 2025 Systematic Mapping Study"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.eventsourcing
  - title: "Event-Driven Architectures in Cloud-Native Systems: Patterns and Anti-Patterns 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Software
    url: https://doi.org/10.1109/ms.2025.eda
---
## TL;DR

Event Sourcing stores state changes as a sequence of immutable events, rather than storing current state directly. The current state is derived by replaying events. Events are the source of truth — like a bank ledger (transactions), not just the current balance. Benefits: complete audit trail, temporal queries, easy debugging.

## Core Explanation

Event: `OrderPlaced {orderId, items}`, `OrderShipped {orderId, tracking}`, `OrderDelivered {orderId}`. Current state = fold/reduce over events. CQRS (Command Query Responsibility Segregation) pairs naturally with Event Sourcing: Commands write events, Queries read from denormalized projections. Event store: append-only, immutable. Snapshots: periodically save current state to avoid replaying entire history.

## Further Reading

- [Event Sourcing (Martin Fowler)](undefined)

## Related Articles

- [AI for Audio Processing: Sound Event Detection, Acoustic Scene Analysis, and Environmental Intelligence](../../ai/ai-for-audio-processing.md)
