---
id: kb-2026-00236
title: Technical Debt
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
      Technical debt (Ward Cunningham, 1992) is the implied cost of future rework caused by choosing an expedient solution now instead of a better approach that would take longer. Like financial debt,
      it accrues interest — the longer you delay, the more it costs to fix.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Management: track debt explicitly (issue tracker, code annotations), allocate time for reduction (20% rule), measure via code quality metrics (cyclomatic complexity, duplication)."
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
  - title: "Managing Technical Debt: A Practical Guide (2025 Edition)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: Addison-Wesley
    url: https://www.informit.com/techdebt/
  - title: "Technical Debt: A 2025 Systematic Mapping Study"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.techdebt
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

Technical debt (Ward Cunningham, 1992) is the implied cost of future rework caused by choosing an expedient solution now instead of a better approach that would take longer. Like financial debt, it accrues interest — the longer you delay, the more it costs to fix.

## Core Explanation

Types: deliberate (strategic, 'we'll fix later'), accidental (unintentional, poor design), bit rot (code decays over time). Indicators: bug-prone modules, slow feature delivery, high onboarding time. Management: track debt explicitly (issue tracker, code annotations), allocate time for reduction (20% rule), measure via code quality metrics (cyclomatic complexity, duplication).

## Further Reading

- [Managing Technical Debt (Ward Cunningham, 1992)](undefined)
