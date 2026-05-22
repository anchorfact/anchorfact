---
id: "kb-2026-00067"
title: "PostgreSQL"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "PostgreSQL 17 Documentation"
    type: "documentation"
    year: 2026
    url: "https://www.postgresql.org/docs/17/"
  - title: "PostgreSQL GitHub"
    type: "repository"
    url: "https://github.com/postgres/postgres"
    stars: 20982
completeness: 0.85
ai_citations: {last_citation_check: "2026-05-22"}
---

## TL;DR

PostgreSQL is an advanced open-source relational database system with over 35 years of active development. First released in 1989 as POSTGRES at UC Berkeley and renamed PostgreSQL in 1996, it emphasizes extensibility, SQL standards compliance, and reliability. As of May 2026, it has 20,982 GitHub stars and is the preferred database for applications requiring ACID compliance, complex queries, and data integrity. PostgreSQL 17 (2024) is the current stable release; PostgreSQL 18 is in development.

## Core Features

- **ACID compliance**: Full transaction support with MVCC (Multi-Version Concurrency Control)
- **Extensibility**: Custom data types, operators, functions, languages (PL/pgSQL, PL/Python, PL/JavaScript)
- **Full-text search**: Built-in tsvector/tsquery types with GIN indexing
- **JSON/JSONB**: Native JSON support with indexing (GIN, BTREE on JSONB paths)
- **Geospatial**: PostGIS extension — industry standard for GIS data
- **Replication**: Streaming replication, logical replication, native partitioning
- **Foreign Data Wrappers**: Query external data sources (MySQL, MongoDB, REST APIs) as if they were local tables

## Further Reading

- [PostgreSQL Docs](https://www.postgresql.org/docs/17/): Current stable documentation
- [PostgreSQL GitHub](https://github.com/postgres/postgres): Source code (21K+ stars)
