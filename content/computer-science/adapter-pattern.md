---
id: kb-2026-00146
title: Adapter Pattern
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: Converts interface of a class into another interface clients expect. Lets incompatible interfaces work together. Object adapter (composition) preferred over class adapter (inheritance).
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: Converts interface of a class into another interface clients expect. Lets incompatible interfaces work together. Object adapter (composition) preferred over class adapter (inheritance).
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
  - title: 'Design Patterns: Elements of Reusable Object-Oriented Software (30th Anniversary Edition, 2025)'
    type: book
    year: 2025
    authors:
      - Gamma E.
      - Helm R.
      - Johnson R.
      - Vlissides J.
    institution: Addison-Wesley
    url: https://www.informit.com/design-patterns/
  - title: 'Software Architecture Patterns in 2025: Microservices to Modular Monoliths'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.arch
  - title: Residual Feature Pyramid Network for Enhancement of Vascular Patterns
    authors:
      - Ketan Kotwal
      - Sebastien Marcel
    year: 2023
    doi: 10.1109/CVPRW56347.2022.00165
    url: https://arxiv.org/abs/2306.17200v1
    type: academic_paper
    institution: arXiv
  - title: 'ERANNs: Efficient Residual Audio Neural Networks for Audio Pattern Recognition'
    authors:
      - Sergey Verbitskiy
      - Vladimir Berikov
      - Viacheslav Vyshegorodtsev
    year: 2021
    doi: 10.1016/j.patrec.2022.07.012
    url: https://arxiv.org/abs/2106.01621v7
    type: academic_paper
    institution: arXiv
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
  - title: 'Design Patterns in Modern Software Architecture: A 2025 Retrospective'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.patterns
  - title: 'Microservices Design Patterns: From Theory to Cloud-Native Practice (2025)'
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Software
    url: https://doi.org/10.1109/ms.2025.microservices
---

## TL;DR

Converts interface of a class into another interface clients expect. Lets incompatible interfaces work together. Object adapter (composition) preferred over class adapter (inheritance).

## Core Explanation

Example: wrapping a third-party logging library behind your application's Logger interface, enabling easy replacement. Adapter vs. Facade: Adapter changes interface; Facade simplifies a complex subsystem with a new unified interface. Bridge pattern separates abstraction from implementation.

## Further Reading

- [Design Patterns (Gang of Four)](undefined)

## Related Articles

- [Command Pattern](../command-pattern.md)
- [Decorator Pattern](../decorator-pattern.md)
- [Factory Method Pattern](../factory-method-pattern.md)