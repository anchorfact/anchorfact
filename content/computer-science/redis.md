---
id: kb-2026-00157
title: Redis
schema_type: TechArticle
category: computer-science
language: en
confidence: low
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-redis-1
    statement: >-
      Redis is an in-memory data structure store supporting data types such as strings, hashes,
      lists, sets, and sorted sets.
    source_title: Redis data types
    source_url: https://redis.io/docs/latest/develop/data-types/
    confidence: low
  - id: fact-redis-2
    statement: Redis persistence can use RDB snapshots and append-only files.
    source_title: Redis persistence
    source_url: https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/
    confidence: low
  - id: fact-redis-3
    statement: Redis replication lets replica servers maintain copies of data from a primary server.
    source_title: Redis replication
    source_url: https://redis.io/docs/latest/operate/oss_and_stack/management/replication/
    confidence: low
completeness: 0.88
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: Redis data types
    type: course_material
    year: 2025
    url: https://redis.io/docs/latest/develop/data-types/
    institution: Redis
  - title: Redis persistence
    type: course_material
    year: 2025
    url: https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/
    institution: Redis
  - title: Redis replication
    type: course_material
    year: 2025
    url: https://redis.io/docs/latest/operate/oss_and_stack/management/replication/
    institution: Redis
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Redis is an in-memory data store with core data structures, persistence options, and replication features. This repair maps Redis claims to official documentation.

## Core Explanation

The sampled article had low source coverage and generic dispute text. This repaired version keeps three direct Redis documentation claims.

## Further Reading

- [Redis data types](https://redis.io/docs/latest/develop/data-types/)
- [Redis persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)
- [Redis replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)
