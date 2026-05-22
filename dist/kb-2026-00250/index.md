---
id:"kb-2026-00250"
title:"Entity-Relationship Model"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Fundamentals of Database Systems (7th Ed, Elmasri & Navathe)"
    type:"undefined"
    url:"undefined"
    institution:"Pearson"
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

The Entity-Relationship (ER) Model (Peter Chen, 1976) is a conceptual data modeling technique. Entities (objects: Customer, Order) have attributes and participate in relationships (places, contains). Cardinality: 1:1, 1:N, M:N. ER diagrams guide database schema design before implementation.

## Core Explanation

Entity: real-world object with independent existence. Weak entity: depends on another entity (OrderItem depends on Order). Relationship: association between entities. Cardinality: `Customer --places--< Order`. Crow's Foot notation is common. ER model maps to relational schema: entities → tables, attributes → columns, relationships → foreign keys. M:N relationships need junction table.

## Further Reading

- [Fundamentals of Database Systems (7th Ed, Elmasri & Navathe)](undefined)
