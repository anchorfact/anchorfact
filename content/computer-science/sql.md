---
id: "kb-2026-00015"
title: "SQL (Structured Query Language)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on ISO/IEC 9075 standard and PostgreSQL/MySQL documentation"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "ISO/IEC 9075:2023 — SQL Standard"
    type: "standard"
    year: 2023
    institution: "ISO"
  - title: "PostgreSQL 17 Documentation"
    type: "documentation"
    year: 2026
    url: "https://www.postgresql.org/docs/17/"
completeness: 0.88
related_entities:
  - "entity:databases"
ai_citations:
  last_citation_check: "2026-05-22"
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
