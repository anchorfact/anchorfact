---
id: kb-2026-00072
title: MongoDB
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: MongoDB Documentation
    type: documentation
    url: https://www.mongodb.com/docs/
    institution: MongoDB, Inc.
  - title: MongoDB GitHub
    type: repository
    url: https://github.com/mongodb/mongo
    institution: GitHub
    stars: 28333
secondary_sources:
  - title: MDN Web Docs — HTTP
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP
    institution: Mozilla
  - title: Pro Git (2nd Ed)
    authors:
      - Chacon
      - Straub
    type: book
    year: 2014
    url: https://git-scm.com/book/en/v2
    institution: Apress
atomic_facts:
  - id: fact-computer-science-01
    statement: MongoDB is a document-oriented NoSQL database first released in 2009 by MongoDB Inc
    source_title: MongoDB Documentation
    source_url: https://www.mongodb.com/docs/
    confidence: medium
  - id: fact-computer-science-002
    statement: Instead of tables and rows, it stores data as JSON-like BSON documents in collections, with a flexible schema.
    confidence: medium
    source_url: https://www.mongodb.com/docs/
    source_title: MongoDB Documentation
  - id: fact-computer-science-003
    statement: As of May 2026, MongoDB has 28,333 GitHub stars and is one of the most popular NoSQL databases, used by companies including Uber, eBay, and Bosch.
    confidence: medium
    source_url: https://github.com/mongodb/mongo
    source_title: MongoDB GitHub
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
ai_citations:
  last_citation_check: "2026-05-22"
---


## TL;DR

MongoDB is a document-oriented NoSQL database first released in 2009 by MongoDB Inc. (formerly 10gen). Instead of tables and rows, it stores data as JSON-like BSON documents in collections, with a flexible schema. As of May 2026, MongoDB has 28,333 GitHub stars and is one of the most popular NoSQL databases, used by companies including Uber, eBay, and Bosch. MongoDB 8.0 (2024) is the current major release.

## Core Concepts

- **Document**: JSON/BSON record — the equivalent of a row in SQL
- **Collection**: Group of documents — the equivalent of a table
- **Indexes**: B-tree, text, geospatial, TTL — same purpose as SQL indexes
- **Aggregation Pipeline**: Multi-stage data processing (filter, group, join, transform)
- **Replica Set**: Primary + secondaries for high availability
- **Sharding**: Horizontal scaling across clusters

## Further Reading

- [MongoDB Docs](https://www.mongodb.com/docs/): Official documentation
- [MongoDB GitHub](https://github.com/mongodb/mongo): Source code (28K+ stars)
