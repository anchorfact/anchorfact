---
id:"kb-2026-00242"
title:"ACID Transactions"
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

ACID (Atomicity, Consistency, Isolation, Durability) are the four properties guaranteeing reliable database transactions. Atomicity: all-or-nothing — either all operations complete or none. Consistency: transaction brings database from one valid state to another. Isolation: concurrent transactions appear sequential. Durability: committed data survives crashes.

## Core Explanation

Isolation levels (weaker to stronger): Read Uncommitted, Read Committed, Repeatable Read, Serializable. Phenomena prevented: dirty reads, non-repeatable reads, phantom reads. PostgreSQL default: Read Committed. Serializable via: 2PL (Two-Phase Locking) or SSI (Serializable Snapshot Isolation, PostgreSQL). CAP theorem: in a distributed system, you can only have two of: Consistency, Availability, Partition tolerance.

## Further Reading

- [Principles of Transaction Processing (Bernstein & Newcomer)](undefined)
