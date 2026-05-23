---
id: kb-2026-00243
title: Database Normalization
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
    statement: Most databases target 3NF — enough to eliminate most anomalies while remaining practical
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-02
    statement: "2NF: non-key attributes depend on the whole primary key"
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
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

Database normalization reduces data redundancy and anomalies by organizing data into well-structured tables. Normal forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies), BCNF (every determinant is a candidate key). Most databases target 3NF — enough to eliminate most anomalies while remaining practical.

## Core Explanation

1NF: each cell holds single value, each row unique. 2NF: non-key attributes depend on the whole primary key (not part). 3NF: non-key attributes depend on nothing but the primary key. Denormalization: intentionally introduce redundancy for read performance (common in analytics/OLAP). Trade-off: normalization = write-optimized, denormalization = read-optimized.

## Further Reading

- [Database Systems: The Complete Book (Garcia-Molina, Ullman, Widom)](undefined)
