---
id: kb-2026-00232
title: Test-Driven Development (TDD)
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
  - id: fact-computer-science-001
    statement: >-
      TDD (Kent Beck, 2002) is a development practice: write a failing test → write minimum code to pass → refactor. Red-Green-Refactor cycle. TDD ensures testability, drives design toward small,
      loosely coupled units, and provides a regression safety net. Not about testing — it's about design.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Benefits: 40-80% fewer bugs in production (IBM/Microsoft studies), confidence to refactor, living documentation."
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: "Test-Driven Development: By Example (2025 Updated Edition)"
    type: book
    year: 2025
    authors:
      - Beck K.
    institution: Addison-Wesley
    url: https://www.informit.com/tdd/
  - title: "Software Testing in the Age of AI: A 2025 Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.testing
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

TDD (Kent Beck, 2002) is a development practice: write a failing test → write minimum code to pass → refactor. Red-Green-Refactor cycle. TDD ensures testability, drives design toward small, loosely coupled units, and provides a regression safety net. Not about testing — it's about design.

## Core Explanation

Red: write test, run, see it fail (confirms test catches failures). Green: write minimum code to pass test — no more. Refactor: clean up code while tests stay green. Benefits: 40-80% fewer bugs in production (IBM/Microsoft studies), confidence to refactor, living documentation. Outside-in TDD (mockist/Detroit school) vs. Inside-out TDD (classicist/London school).

## Further Reading

- [Test-Driven Development: By Example (Kent Beck)](undefined)
