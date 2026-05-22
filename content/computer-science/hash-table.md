---
id:"kb-2026-00128"
title:"Hash Table"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Introduction to Algorithms (CLRS)"
    type:"undefined"
    url:"undefined"
    institution:"MIT Press"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A hash table maps keys to values with average O(1) operations. Powers JavaScript Objects, Python dicts, database indexes. Collision resolution: chaining (linked lists) or open addressing (probing). Rehashing triggers at ~75% load factor.

## Core Explanation

Hash function: maps key to integer index. Good hash functions minimize collisions and are fast (non-cryptographic: MurmurHash, xxHash). Cryptographic hashes (SHA) are unnecessary and slow for hash tables. Separate chaining is simpler but uses more memory; open addressing is cache-friendly but degrades at high load.

## Further Reading

- [Introduction to Algorithms (CLRS)](undefined)
