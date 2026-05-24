---
id: kb-2026-00237
title: Clean Code Principles
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
    statement: Code is read 10x more than written
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-02
    statement: "Boy Scout Rule: leave the code cleaner than you found it"
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
  - title: "Code Quality in the Age of AI: A 2025 Survey of Metrics, Linters, and LLM-Assisted Reviews"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.codequality
  - title: "Technical Debt: Identification, Measurement, and Management (2025 Update)"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Software
    url: https://doi.org/10.1109/ms.2025.techdebt
---
## TL;DR

Clean Code principles (Robert C. Martin) guide writing readable, maintainable code. Key rules: meaningful names (reveal intent), small functions (do one thing), minimal arguments (0-2 ideal), no side effects, DRY (Don't Repeat Yourself), comments explain WHY not WHAT. Code is read 10x more than written.

## Core Explanation

Meaningful names: `customerList` not `cl`, `calculateTotalPrice` not `calc`. Functions: should be small (20 lines max), do one thing at one level of abstraction. Comments: explain intent, warn of consequences, TODO notes. Don't comment bad code — rewrite it. Error handling: use exceptions over return codes, provide context. Boy Scout Rule: leave the code cleaner than you found it.

## Further Reading

- [Clean Code (Robert C. Martin)](undefined)
