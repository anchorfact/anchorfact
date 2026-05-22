---
id:"kb-2026-00253"
title:"Event Sourcing"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Event Sourcing (Martin Fowler)"
    type:"undefined"
    url:"undefined"
    institution:"MartinFowler.com"
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

Event Sourcing stores state changes as a sequence of immutable events, rather than storing current state directly. The current state is derived by replaying events. Events are the source of truth — like a bank ledger (transactions), not just the current balance. Benefits: complete audit trail, temporal queries, easy debugging.

## Core Explanation

Event: `OrderPlaced {orderId, items}`, `OrderShipped {orderId, tracking}`, `OrderDelivered {orderId}`. Current state = fold/reduce over events. CQRS (Command Query Responsibility Segregation) pairs naturally with Event Sourcing: Commands write events, Queries read from denormalized projections. Event store: append-only, immutable. Snapshots: periodically save current state to avoid replaying entire history.

## Further Reading

- [Event Sourcing (Martin Fowler)](undefined)
