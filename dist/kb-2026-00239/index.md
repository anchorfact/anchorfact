---
id: kb-2026-00239
title: SOLID Principles
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
      SOLID (Robert C. Martin, 2000s) is five principles for object-oriented design: S (Single Responsibility), O (Open/Closed), L (Liskov Substitution), I (Interface Segregation), D (Dependency
      Inversion). SOLID makes code more maintainable, testable, and flexible.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      SOLID (Robert C. Martin, 2000s) is five principles for object-oriented design: S (Single Responsibility), O (Open/Closed), L (Liskov Substitution), I (Interface Segregation), D (Dependency
      Inversion). SOLID makes code more maintainable, testable, and flexible.
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
  - title: "Clean Architecture: A Craftsman's Guide (2025 Updated)"
    type: book
    year: 2025
    authors:
      - Martin R.C.
    institution: Prentice Hall
    url: https://www.informit.com/clean-architecture/
  - title: SOLID Principles in the Age of AI-Assisted Development (2025)
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.solid
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

SOLID (Robert C. Martin, 2000s) is five principles for object-oriented design: S (Single Responsibility), O (Open/Closed), L (Liskov Substitution), I (Interface Segregation), D (Dependency Inversion). SOLID makes code more maintainable, testable, and flexible.

## Core Explanation

SRP: a class should have one reason to change. OCP: open for extension, closed for modification — add behavior without changing existing code. LSP: subtypes must be substitutable for base types. ISP: many specific interfaces better than one general interface. DIP: depend on abstractions, not concretions — high-level modules shouldn't depend on low-level details.

## Further Reading

- [Agile Software Development (Robert C. Martin)](undefined)
