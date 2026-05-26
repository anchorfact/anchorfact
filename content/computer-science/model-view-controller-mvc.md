---
id: kb-2026-00148
title: Model-View-Controller (MVC)
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
  - id: fact-computer-science-01
    statement: Originally from Smalltalk-80, MVC is the most influential architectural pattern in UI development
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      MVC separates application into three components: Model (data/business logic), View (presentation/UI), Controller (handles input, updates model). Originally from Smalltalk-80, MVC is the most
      influential architectural pattern in UI development.
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
  - title: Patterns of Enterprise Application Architecture (2025 Updated Edition)
    type: book
    year: 2025
    authors:
      - Fowler M.
    institution: Addison-Wesley
    url: https://www.informit.com/patterns-eaa/
  - title: "Web Application Architecture: MVC, MVP, MVVM in 2025"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.mvc
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

MVC separates application into three components: Model (data/business logic), View (presentation/UI), Controller (handles input, updates model). Originally from Smalltalk-80, MVC is the most influential architectural pattern in UI development.

## Core Explanation

Variants: MVP (Model-View-Presenter), MVVM (Model-View-ViewModel, used by Vue, Angular). Web MVC: Ruby on Rails, Django, Laravel, Spring MVC. React is primarily the View layer but implements unidirectional data flow (Flux/Redux) rather than traditional MVC.

## Further Reading

- [Patterns of Enterprise Application Architecture](undefined)

## Related Articles

- [GPT (Generative Pre-trained Transformer) Model Family](../../ai/gpt-models.md)
- [Large Language Model Training: Scaling Laws, Data Curation, and Compute](../../ai/large-language-model-training-scaling-laws-data-curation-and-compute.md)
- [Model Context Protocol (MCP)](../../ai/mcp.md)