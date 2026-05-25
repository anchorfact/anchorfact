---
id: kb-2026-00247
title: NoSQL Database Types
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
      NoSQL databases use non-relational models optimized for specific data patterns and scalability. Four types: Key-Value (Redis, DynamoDB), Document (MongoDB, Couchbase), Column-Family (Cassandra,
      HBase), Graph (Neo4j, Amazon Neptune). Choose NoSQL for: flexible schema, horizontal scaling, specific data models (graphs, time-series).
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Key-Value: simplest — `get/set` by key, ultra-fast, no query language."
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs
      the distinction
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: "NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence (2025 Updated)"
    type: book
    year: 2025
    authors:
      - Sadalage P.J.
      - Fowler M.
    institution: Addison-Wesley
    url: https://www.informit.com/nosql/
  - title: "NoSQL vs NewSQL: Database Systems Survey 2025"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.nosql
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
---
## TL;DR

NoSQL databases use non-relational models optimized for specific data patterns and scalability. Four types: Key-Value (Redis, DynamoDB), Document (MongoDB, Couchbase), Column-Family (Cassandra, HBase), Graph (Neo4j, Amazon Neptune). Choose NoSQL for: flexible schema, horizontal scaling, specific data models (graphs, time-series).

## Core Explanation

Key-Value: simplest — `get/set` by key, ultra-fast, no query language. Document: JSON/BSON documents, query by content, flexible schema. Column-Family: columns grouped into families, optimized for writes, used in time-series/IoT. Graph: nodes + edges, optimized for relationship queries (friend-of-friend, recommendation). NewSQL (CockroachDB, Spanner): ACID + horizontal scaling — best of both worlds.

## Further Reading

- [NoSQL Distilled (Sadalage & Fowler)](undefined)
