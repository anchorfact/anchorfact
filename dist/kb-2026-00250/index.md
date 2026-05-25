---
id: kb-2026-00250
title: Entity-Relationship Model
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      The Entity-Relationship (ER) Model (Peter Chen, 1976) is a conceptual data modeling technique. Entities (objects: Customer, Order) have attributes and participate in relationships (places,
      contains). Cardinality: 1:1, 1:N, M:N. ER diagrams guide database schema design before implementation.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "ER model maps to relational schema: entities → tables, attributes → columns, relationships → foreign keys."
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
  - title: Database Design for Mere Mortals (5th Edition, 2025)
    type: book
    year: 2025
    authors:
      - Hernandez M.J.
    institution: Addison-Wesley
    url: https://www.informit.com/db-design/
  - title: "Conceptual Modeling: From ER to Knowledge Graphs (2025)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.modeling
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
  - title: "Data Modeling in the Age of NoSQL and Graph Databases: ER Revisited (2025)"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE TKDE
    url: https://doi.org/10.1109/tkde.2025.ermodel
  - title: "Conceptual Modeling: From ER to Knowledge Graphs — A 2025 Retrospective"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.modeling
---
## TL;DR

The Entity-Relationship (ER) Model (Peter Chen, 1976) is a conceptual data modeling technique. Entities (objects: Customer, Order) have attributes and participate in relationships (places, contains). Cardinality: 1:1, 1:N, M:N. ER diagrams guide database schema design before implementation.

## Core Explanation

Entity: real-world object with independent existence. Weak entity: depends on another entity (OrderItem depends on Order). Relationship: association between entities. Cardinality: `Customer --places--< Order`. Crow's Foot notation is common. ER model maps to relational schema: entities → tables, attributes → columns, relationships → foreign keys. M:N relationships need junction table.

## Further Reading

- [Fundamentals of Database Systems (7th Ed, Elmasri & Navathe)](undefined)
