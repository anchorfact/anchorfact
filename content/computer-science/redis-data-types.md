---
id: "kb-2026-00245"


title: "Redis Data Types"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:

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

Redis supports rich data types beyond simple key-value: String, List, Set, Sorted Set, Hash, Bitmap, HyperLogLog, Geospatial, Stream. Each type has specialized atomic operations — Redis is often called a 'data structure server'. Streams (Redis 5.0, 2018) enable message queue and event sourcing patterns.

## Core Explanation

Strings: `SET key val`, `INCR` (atomic counter). Lists: `LPUSH/RPUSH`, `LPOP/RPOP` — queue/stack. Sets: `SADD`, `SINTER` (intersection). Sorted Sets: `ZADD key score member`, `ZRANGE` — leaderboards. Hashes: `HSET user:1 name Alice` — object storage. Streams: `XADD mystream * field value`, consumer groups for reliable message processing.

## Further Reading

- [Redis Data Types Documentation](undefined)
