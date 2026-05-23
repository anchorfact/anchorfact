---
id: "kb-2026-00242"
title: "ACID Transactions"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "ACID (Atomicity, Consistency, Isolation, Durability) are the four properties guaranteeing reliable database transactions. Atomicity: all-or-nothing — either all operations complete or none. Consistency: transaction brings database from one valid state to another. Isolation: concurrent transactions appear sequential. Durability: committed data survi"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Isolation levels (weaker to stronger): Read Uncommitted, Read Committed, Repeatable Read, Serializable."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Serializable via: 2PL (Two-Phase Locking) or SSI (Serializable Snapshot Isolation, PostgreSQL)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

ACID (Atomicity, Consistency, Isolation, Durability) are the four properties guaranteeing reliable database transactions. Atomicity: all-or-nothing — either all operations complete or none. Consistency: transaction brings database from one valid state to another. Isolation: concurrent transactions appear sequential. Durability: committed data survives crashes.

## Core Explanation

Isolation levels (weaker to stronger): Read Uncommitted, Read Committed, Repeatable Read, Serializable. Phenomena prevented: dirty reads, non-repeatable reads, phantom reads. PostgreSQL default: Read Committed. Serializable via: 2PL (Two-Phase Locking) or SSI (Serializable Snapshot Isolation, PostgreSQL). CAP theorem: in a distributed system, you can only have two of: Consistency, Availability, Partition tolerance.

## Further Reading

- [Principles of Transaction Processing (Bernstein & Newcomer)](undefined)
