---
id:"kb-2026-00112"
title:"SQL Injection"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"OWASP"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

SQL Injection is a code injection attack where malicious SQL statements are inserted into application queries through user input. It ranked #3 on the OWASP Top 10 (2021) and can lead to data theft, data loss, and complete system compromise.

## Core Explanation

Prevention: parameterized queries (prepared statements), stored procedures, input validation, least-privilege database accounts. Never concatenate user input into SQL strings — this is the single rule that prevents SQL injection. Use placeholders: SELECT * FROM users WHERE name = ? (MySQL) or $1 (PostgreSQL). ORMs (Prisma, SQLAlchemy) provide parameterized queries by default.

## Further Reading

- [undefined](undefined)
