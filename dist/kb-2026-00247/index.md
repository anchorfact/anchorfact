---
id:"kb-2026-00247"
title:"NoSQL Database Types"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
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

NoSQL databases use non-relational models optimized for specific data patterns and scalability. Four types: Key-Value (Redis, DynamoDB), Document (MongoDB, Couchbase), Column-Family (Cassandra, HBase), Graph (Neo4j, Amazon Neptune). Choose NoSQL for: flexible schema, horizontal scaling, specific data models (graphs, time-series).

## Core Explanation

Key-Value: simplest — `get/set` by key, ultra-fast, no query language. Document: JSON/BSON documents, query by content, flexible schema. Column-Family: columns grouped into families, optimized for writes, used in time-series/IoT. Graph: nodes + edges, optimized for relationship queries (friend-of-friend, recommendation). NewSQL (CockroachDB, Spanner): ACID + horizontal scaling — best of both worlds.

## Further Reading

- [NoSQL Distilled (Sadalage & Fowler)](undefined)
