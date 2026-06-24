---
id: kb-2026-00128
title: Hash Table
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-24'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - gpt-5-codex
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-hash-table-001
    statement: >-
      Hashing stores and retrieves records by search key, and a well-tuned hash system can support insert, delete, and search operations in constant time.
    source_title: OpenDSA - Introduction to Hashing
    source_url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashIntro.html
    confidence: medium
  - id: fact-hash-table-002
    statement: >-
      Hash tables need a collision resolution policy because collisions are unavoidable in practical hash functions.
    source_title: OpenDSA - Open Hashing
    source_url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/OpenHash.html
    confidence: medium
  - id: fact-hash-table-003
    statement: >-
      Separate chaining stores colliding records outside the main table by treating each hash-table slot as the head of a linked list.
    source_title: OpenDSA - Open Hashing
    source_url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/OpenHash.html
    confidence: medium
  - id: fact-hash-table-004
    statement: >-
      Closed hashing stores records directly in the table and uses the same collision resolution policy during insertion and search.
    source_title: OpenDSA - Bucket Hashing
    source_url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/BucketHash.html
    confidence: medium
  - id: fact-hash-table-005
    statement: >-
      Probe-based closed hashing searches a sequence of candidate slots when a record's home position is already occupied.
    source_title: OpenDSA - Collision Resolution
    source_url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashCSimple.html
    confidence: medium
completeness: 0.9
known_gaps: []
disputed_statements: []
primary_sources:
  - title: OpenDSA - Introduction to Hashing
    type: open_textbook_chapter
    url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashIntro.html
    institution: OpenDSA Project
  - title: OpenDSA - Open Hashing
    type: open_textbook_chapter
    url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/OpenHash.html
    institution: OpenDSA Project
  - title: OpenDSA - Bucket Hashing
    type: open_textbook_chapter
    url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/BucketHash.html
    institution: OpenDSA Project
  - title: OpenDSA - Collision Resolution
    type: open_textbook_chapter
    url: https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashCSimple.html
    institution: OpenDSA Project
secondary_sources: []
updated: '2026-06-24'
---

## TL;DR

A hash table stores records by computing a table position from each record's search key. When the hash function and collision policy are well matched to the workload, lookup, insert, and delete operations can run in expected constant time.

## Core Explanation

The core idea is to replace ordered search with direct addressing through a hash function. The hash function maps a key to a home position in an array of slots. If no other record occupies that position, the operation is straightforward.

Collisions happen when two keys map to the same table position, so every practical hash table needs a collision policy. Separate chaining keeps colliding records outside the main array, commonly by making each slot the head of a linked list. Closed hashing, also called open addressing, keeps records in the table and follows a probe sequence when the home slot is occupied.

Hash tables are best for exact-key lookup where ordering is not the main requirement. They are less suitable when the application needs sorted traversal, range queries, or predictable worst-case latency without additional controls.

## Source-Mapped Facts

- Hashing stores and retrieves records by search key, and a well-tuned hash system can support insert, delete, and search operations in constant time. ([source](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashIntro.html))
- Hash tables need a collision resolution policy because collisions are unavoidable in practical hash functions. ([source](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/OpenHash.html))
- Separate chaining stores colliding records outside the main table by treating each hash-table slot as the head of a linked list. ([source](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/OpenHash.html))
- Closed hashing stores records directly in the table and uses the same collision resolution policy during insertion and search. ([source](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/BucketHash.html))
- Probe-based closed hashing searches a sequence of candidate slots when a record's home position is already occupied. ([source](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashCSimple.html))

## Further Reading

- [OpenDSA - Introduction to Hashing](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashIntro.html)
- [OpenDSA - Open Hashing](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/OpenHash.html)
- [OpenDSA - Collision Resolution](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/HashCSimple.html)

## Related Articles

- [Database Indexing: B-Trees, Hash Indexes, and Query Optimization](database-indexing-b-trees-hash-indexes-and-query-optimization.md)
- [Hashing Algorithms](hashing-algorithms.md)
- [Time Complexity (Big O)](time-complexity-big-o.md)
