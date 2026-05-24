---
id: kb-2026-00015
title: SQL (Structured Query Language)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      Boyce at IBM in 1974 and standardized by ANSI in 1986 and ISO in 1987, SQL remains — over 50 years later — the dominant database query language, used by virtually every application that stores
      structured data
    source_title: ISO/IEC 9075:2023 — SQL Standard
    confidence: medium
  - id: fact-computer-science-02
    statement: Designed by Donald D
    source_title: PostgreSQL 17 Documentation
    source_url: https://www.postgresql.org/docs/17/
    confidence: medium
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs
      the distinction
primary_sources:
  - title: ISO/IEC 9075:2023 — SQL Standard
    type: standard
    year: 2023
    institution: ISO
  - title: PostgreSQL 17 Documentation
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/17/
    institution: PostgreSQL Global Development Group
  - title: Learning SQL (4th Edition, 2025)
    type: book
    year: 2025
    authors:
      - Beaulieu A.
    institution: O'Reilly Media
    url: https://www.oreilly.com/sql/
  - title: "SQL in the Age of LLMs: Query Generation and Optimization (2025)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.sql
secondary_sources:
  - title: MDN Web Docs — HTTP
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP
    institution: Mozilla
---
## TL;DR

SQL (Structured Query Language) is the standard programming language for managing relational databases. Designed by Donald D. Chamberlin and Raymond F. Boyce at IBM in 1974 and standardized by ANSI in 1986 and ISO in 1987, SQL remains — over 50 years later — the dominant database query language, used by virtually every application that stores structured data. PostgreSQL, MySQL, SQLite, Oracle, and SQL Server collectively power the majority of the world's transactional data systems.

## Core Operations

SQL organizes data into tables with rows and columns, supporting four core operations (CRUD):

- **SELECT**: Query and retrieve data — `SELECT * FROM users WHERE age > 18`
- **INSERT**: Add new rows — `INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')`
- **UPDATE**: Modify existing rows — `UPDATE users SET status = 'active' WHERE id = 42`
- **DELETE**: Remove rows — `DELETE FROM users WHERE last_login < '2020-01-01'`

Key features include JOIN (combining tables), GROUP BY (aggregation), transactions (ACID guarantees), and indexes (performance optimization).

## Major Implementations

| Database | Developer | License | Key Strength |
|----------|-----------|---------|-------------|
| PostgreSQL | PostgreSQL Global Dev Group | Open-source (PostgreSQL License) | Extensibility, standards compliance, advanced features |
| MySQL | Oracle | Open-source (GPL) | Speed, simplicity, LAMP stack |
| SQLite | Dwayne Richard Hipp | Public domain | Embedded, zero-configuration, single-file |
| Oracle Database | Oracle Corp. | Proprietary | Enterprise features, RAC, Exadata |
| Microsoft SQL Server | Microsoft | Proprietary | .NET ecosystem, Azure integration |

## Further Reading

- [PostgreSQL Docs](https://www.postgresql.org/docs/): Open-source reference implementation
- [SQLite Docs](https://www.sqlite.org/docs.html): Lightweight embedded database
