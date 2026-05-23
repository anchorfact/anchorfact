---
id: "kb-2026-00252"


title: "Database Indexing"
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

atomic_facts:
  - id: fact-computer-science-01
    statement: Database indexes are data structures that speed up data retrieval — like a book's index
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
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

Database indexes are data structures that speed up data retrieval — like a book's index. Common types: B-tree (default, range queries, sorting), Hash (equality only), GIN (full-text, arrays, JSONB in PostgreSQL), GiST (geometric, full-text), BRIN (block range, large append-only tables). Without index: sequential scan (read every row).

## Core Explanation

B-tree: O(log n) lookups, supports =, <, >, BETWEEN, ORDER BY. Multi-column index: order matters — (a, b) supports a=1 AND b=2, a=1 only, but NOT b=2 only. Partial index: index subset of rows — WHERE active = true. Covering index: includes all columns needed by query — index-only scan (fastest). Index maintenance cost: writes slow down because indexes must update. Monitor unused indexes and remove them.

## Further Reading

- [SQL Performance Explained (Markus Winand)](undefined)
