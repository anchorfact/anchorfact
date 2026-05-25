---
id: "kb-2026-00252"
title: "Database Indexing"
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
  - id: "fact-computer-science-01"
    statement: "Database indexes are data structures that speed up data retrieval — like a book's index"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Database indexes are data structures that speed up data retrieval — like a book's index. Common types: B-tree (default, range queries, sorting), Hash (equality only), GIN (full-text, arrays, JSONB in PostgreSQL), GiST (geometric, full-text), BRIN (block range, large append-only tables). Without index: sequential scan (read every row)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Multi-column index: order matters — (a, b) supports a=1 AND b=2, a=1 only, but NOT b=2 only."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs the distinction"

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

Database indexes are data structures that speed up data retrieval — like a book's index. Common types: B-tree (default, range queries, sorting), Hash (equality only), GIN (full-text, arrays, JSONB in PostgreSQL), GiST (geometric, full-text), BRIN (block range, large append-only tables). Without index: sequential scan (read every row).

## Core Explanation

B-tree: O(log n) lookups, supports =, <, >, BETWEEN, ORDER BY. Multi-column index: order matters — (a, b) supports a=1 AND b=2, a=1 only, but NOT b=2 only. Partial index: index subset of rows — WHERE active = true. Covering index: includes all columns needed by query — index-only scan (fastest). Index maintenance cost: writes slow down because indexes must update. Monitor unused indexes and remove them.

## Further Reading

- [SQL Performance Explained (Markus Winand)](undefined)

## Related Articles

- [Learned Database Systems: AI-Driven Query Optimization, Learned Indexes, and Cardinality Estimation](../../ai/learned-database-systems.md)
- [Text-to-SQL: Natural Language Database Querying with Large Language Models](../../ai/text-to-sql.md)
- [Database Normalization](../database-normalization.md)
