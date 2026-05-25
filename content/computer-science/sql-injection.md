---
id: kb-2026-00112
title: SQL Injection
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      SQL Injection is a code injection attack where malicious SQL statements are inserted into application queries through user input. It ranked #3 on the OWASP Top 10 (2021) and can lead to data
      theft, data loss, and complete system compromise.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      SQL Injection is a code injection attack where malicious SQL statements are inserted into application queries through user input. It ranked #3 on the OWASP Top 10 (2021) and can lead to data
      theft, data loss, and complete system compromise.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs
      the distinction
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: "Web Application Security: A Comprehensive Guide (2025 Edition)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/websec/
  - title: "SQL Injection: Detection, Prevention, and Modern Threats (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.sqli
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---
## TL;DR

SQL Injection is a code injection attack where malicious SQL statements are inserted into application queries through user input. It ranked #3 on the OWASP Top 10 (2021) and can lead to data theft, data loss, and complete system compromise.

## Core Explanation

Prevention: parameterized queries (prepared statements), stored procedures, input validation, least-privilege database accounts. Never concatenate user input into SQL strings — this is the single rule that prevents SQL injection. Use placeholders: SELECT * FROM users WHERE name = ? (MySQL) or $1 (PostgreSQL). ORMs (Prisma, SQLAlchemy) provide parameterized queries by default.

## Further Reading

-

## Related Articles

- [Text-to-SQL: Natural Language Database Querying with Large Language Models](../../ai/text-to-sql.md)
- [Dependency Injection](../dependency-injection.md)
- [SQL Joins](../sql-joins.md)
