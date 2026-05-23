---
id: kb-2026-00250
title: Entity-Relationship Model
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      The Entity-Relationship (ER) Model (Peter Chen, 1976) is a conceptual data modeling technique. Entities (objects: Customer, Order) have attributes and participate in relationships (places,
      contains). Cardinality: 1:1, 1:N, M:N. ER diagrams guide database schema design before implementation.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "ER model maps to relational schema: entities → tables, attributes → columns, relationships → foreign keys."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---


## TL;DR

The Entity-Relationship (ER) Model (Peter Chen, 1976) is a conceptual data modeling technique. Entities (objects: Customer, Order) have attributes and participate in relationships (places, contains). Cardinality: 1:1, 1:N, M:N. ER diagrams guide database schema design before implementation.

## Core Explanation

Entity: real-world object with independent existence. Weak entity: depends on another entity (OrderItem depends on Order). Relationship: association between entities. Cardinality: `Customer --places--< Order`. Crow's Foot notation is common. ER model maps to relational schema: entities → tables, attributes → columns, relationships → foreign keys. M:N relationships need junction table.

## Further Reading

- [Fundamentals of Database Systems (7th Ed, Elmasri & Navathe)](undefined)
