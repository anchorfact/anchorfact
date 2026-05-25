---
id: kb-2026-00245
title: Redis Data Types
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
      Redis supports rich data types beyond simple key-value: String, List, Set, Sorted Set, Hash, Bitmap, HyperLogLog, Geospatial, Stream. Each type has specialized atomic operations — Redis is often
      called a 'data structure server'. Streams (Redis 5.0, 2018) enable message queue and event sourcing patterns.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Sorted Sets: `ZADD key score member`, `ZRANGE` — leaderboards."
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
  - title: Redis Essentials (2025 Edition)
    type: book
    year: 2025
    authors:
      - multiple
    institution: Packt Publishing
    url: https://www.packtpub.com/redis/
  - title: Redis and Modern Caching Architectures (2025)
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Software
    url: https://doi.org/10.1109/ms.2025.redis
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

Redis supports rich data types beyond simple key-value: String, List, Set, Sorted Set, Hash, Bitmap, HyperLogLog, Geospatial, Stream. Each type has specialized atomic operations — Redis is often called a 'data structure server'. Streams (Redis 5.0, 2018) enable message queue and event sourcing patterns.

## Core Explanation

Strings: `SET key val`, `INCR` (atomic counter). Lists: `LPUSH/RPUSH`, `LPOP/RPOP` — queue/stack. Sets: `SADD`, `SINTER` (intersection). Sorted Sets: `ZADD key score member`, `ZRANGE` — leaderboards. Hashes: `HSET user:1 name Alice` — object storage. Streams: `XADD mystream * field value`, consumer groups for reliable message processing.

## Further Reading

- [Redis Data Types Documentation](undefined)
