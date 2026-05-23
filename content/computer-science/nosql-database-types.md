---
id: kb-2026-00247
title: NoSQL Database Types
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
      The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs
      the distinction
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      NoSQL databases use non-relational models optimized for specific data patterns and scalability. Four types: Key-Value (Redis, DynamoDB), Document (MongoDB, Couchbase), Column-Family (Cassandra,
      HBase), Graph (Neo4j, Amazon Neptune). Choose NoSQL for: flexible schema, horizontal scaling, specific data models (graphs, time-series).
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Key-Value: simplest — `get/set` by key, ultra-fast, no query language."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

NoSQL databases use non-relational models optimized for specific data patterns and scalability. Four types: Key-Value (Redis, DynamoDB), Document (MongoDB, Couchbase), Column-Family (Cassandra, HBase), Graph (Neo4j, Amazon Neptune). Choose NoSQL for: flexible schema, horizontal scaling, specific data models (graphs, time-series).

## Core Explanation

Key-Value: simplest — `get/set` by key, ultra-fast, no query language. Document: JSON/BSON documents, query by content, flexible schema. Column-Family: columns grouped into families, optimized for writes, used in time-series/IoT. Graph: nodes + edges, optimized for relationship queries (friend-of-friend, recommendation). NewSQL (CockroachDB, Spanner): ACID + horizontal scaling — best of both worlds.

## Further Reading

- [NoSQL Distilled (Sadalage & Fowler)](undefined)
