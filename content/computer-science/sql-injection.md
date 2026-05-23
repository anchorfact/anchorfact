---
id: kb-2026-00112
title: SQL Injection
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
      SQL Injection is a code injection attack where malicious SQL statements are inserted into application queries through user input. It ranked #3 on the OWASP Top 10 (2021) and can lead to data
      theft, data loss, and complete system compromise.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-001
    statement: >-
      SQL Injection is a code injection attack where malicious SQL statements are inserted into application queries through user input. It ranked #3 on the OWASP Top 10 (2021) and can lead to data
      theft, data loss, and complete system compromise.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

SQL Injection is a code injection attack where malicious SQL statements are inserted into application queries through user input. It ranked #3 on the OWASP Top 10 (2021) and can lead to data theft, data loss, and complete system compromise.

## Core Explanation

Prevention: parameterized queries (prepared statements), stored procedures, input validation, least-privilege database accounts. Never concatenate user input into SQL strings — this is the single rule that prevents SQL injection. Use placeholders: SELECT * FROM users WHERE name = ? (MySQL) or $1 (PostgreSQL). ORMs (Prisma, SQLAlchemy) provide parameterized queries by default.

## Further Reading

- [undefined](undefined)
