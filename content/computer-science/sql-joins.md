---
id: kb-2026-00251
title: SQL Joins
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
      The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs
      the distinction
    context: See primary sources for competing interpretations
atomic_facts:
  - id: fact-computer-science-01
    statement: JOINs are the most powerful and frequently misused SQL feature
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      SQL JOINs combine rows from two or more tables based on related columns. Types: INNER JOIN (matching rows only), LEFT JOIN (all left rows + matching right), RIGHT JOIN, FULL OUTER JOIN, CROSS
      JOIN (Cartesian product). Self-join: join table to itself. JOINs are the most powerful and frequently misused SQL feature.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "LEFT JOIN: keeps all left rows, NULL for missing right — used for 'show all customers and their orders if any'."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
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
---


## TL;DR

SQL JOINs combine rows from two or more tables based on related columns. Types: INNER JOIN (matching rows only), LEFT JOIN (all left rows + matching right), RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN (Cartesian product). Self-join: join table to itself. JOINs are the most powerful and frequently misused SQL feature.

## Core Explanation

INNER JOIN: `SELECT * FROM orders JOIN customers ON orders.cust_id = customers.id` — only rows with matches in both. LEFT JOIN: keeps all left rows, NULL for missing right — used for 'show all customers and their orders if any'. JOIN vs. subquery: EXPLAIN ANALYZE to compare — often equivalent, sometimes one is better. JOIN ordering matters: the query optimizer reorders, but hint with proper statistics.

## Further Reading

- [PostgreSQL Documentation — Joins](undefined)
