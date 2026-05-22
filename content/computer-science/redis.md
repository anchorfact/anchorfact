---
id:"kb-2026-00157"
title:"Redis"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Redis Documentation"
    type:"documentation"
    year:2026
    url:"https://redis.io/docs/"
    institution:"Redis Ltd."
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Redis is an in-memory data structure store used as a database, cache, message broker, and streaming engine. It supports strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes, and streams. Sub-millisecond latency, 100K+ ops/sec on modest hardware.

## Core Explanation

Persistence: RDB (point-in-time snapshots) and AOF (append-only file log). Pub/Sub for messaging. Lua scripting for atomic operations. Redis Sentinel for high availability. Redis Cluster for horizontal sharding (16384 hash slots). Common patterns: session store, rate limiter, leaderboard, distributed lock (Redlock).

## Further Reading

- [Redis Documentation](https://redis.io/docs/)
