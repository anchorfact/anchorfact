---
id: kb-2026-00242
title: ACID Transactions
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
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      ACID (Atomicity, Consistency, Isolation, Durability) are the four properties guaranteeing reliable database transactions. Atomicity: all-or-nothing — either all operations complete or none.
      Consistency: transaction brings database from one valid state to another. Isolation: concurrent transactions appear sequential. Durability: committed data survi
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Isolation levels (weaker to stronger): Read Uncommitted, Read Committed, Repeatable Read, Serializable."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: "Serializable via: 2PL (Two-Phase Locking) or SSI (Serializable Snapshot Isolation, PostgreSQL)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---


## TL;DR

ACID (Atomicity, Consistency, Isolation, Durability) are the four properties guaranteeing reliable database transactions. Atomicity: all-or-nothing — either all operations complete or none. Consistency: transaction brings database from one valid state to another. Isolation: concurrent transactions appear sequential. Durability: committed data survives crashes.

## Core Explanation

Isolation levels (weaker to stronger): Read Uncommitted, Read Committed, Repeatable Read, Serializable. Phenomena prevented: dirty reads, non-repeatable reads, phantom reads. PostgreSQL default: Read Committed. Serializable via: 2PL (Two-Phase Locking) or SSI (Serializable Snapshot Isolation, PostgreSQL). CAP theorem: in a distributed system, you can only have two of: Consistency, Availability, Partition tolerance.

## Further Reading

- [Principles of Transaction Processing (Bernstein & Newcomer)](undefined)
