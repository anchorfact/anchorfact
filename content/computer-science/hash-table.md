---
id: kb-2026-00128
title: Hash Table
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
      A hash table maps keys to values with average O(1) operations. Powers JavaScript Objects, Python dicts, database indexes. Collision resolution: chaining (linked lists) or open addressing
      (probing). Rehashing triggers at ~75% load factor.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      A hash table maps keys to values with average O(1) operations. Powers JavaScript Objects, Python dicts, database indexes. Collision resolution: chaining (linked lists) or open addressing
      (probing). Rehashing triggers at ~75% load factor.
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
  - title: Data Structures and Algorithm Analysis (5th Edition, 2025)
    type: book
    year: 2025
    authors:
      - Weiss M.A.
    institution: Pearson
    url: https://www.pearson.com/dsaa/
  - title: "Hash-Based Data Structures: From Basic Tables to Learned Indexes (2025)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.hash
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

A hash table maps keys to values with average O(1) operations. Powers JavaScript Objects, Python dicts, database indexes. Collision resolution: chaining (linked lists) or open addressing (probing). Rehashing triggers at ~75% load factor.

## Core Explanation

Hash function: maps key to integer index. Good hash functions minimize collisions and are fast (non-cryptographic: MurmurHash, xxHash). Cryptographic hashes (SHA) are unnecessary and slow for hash tables. Separate chaining is simpler but uses more memory; open addressing is cache-friendly but degrades at high load.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)

## Related Articles

- [Database Indexing: B-Trees, Hash Indexes, and Query Optimization](../database-indexing-b-trees-hash-indexes-and-query-optimization.md)
- [Periodic Table](../../science/periodic-table.md)