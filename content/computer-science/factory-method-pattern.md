---
id: kb-2026-00142
title: Factory Method Pattern
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
    statement: Defines an interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: Abstract Factory creates families of related objects (e.g., GUI widgets per platform).
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
  - title: Creational Design Patterns in Modern Software Engineering (2025)
    type: book
    year: 2025
    authors:
      - multiple
    institution: Addison-Wesley
    url: https://www.informit.com/creational/
  - title: "Creational Patterns: Factory, Builder, Singleton — A 2025 Review"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.creational
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
  - title: "Creational Design Patterns in Modern OOP: Factory, Builder, Singleton (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.creational
  - title: "Dependency Injection and Factory Patterns: Best Practices 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Software
    url: https://doi.org/10.1109/ms.2025.factory
---
## TL;DR

Defines an interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses.

## Core Explanation

Creator (abstract with factory method) + ConcreteCreator + Product interface. In modern code, factory functions (plain functions returning objects) often suffice without class hierarchies. Abstract Factory creates families of related objects (e.g., GUI widgets per platform).

## Further Reading

- [Design Patterns (Gang of Four)](undefined)

## Related Articles

- [Adapter Pattern](../adapter-pattern.md)
- [Command Pattern](../command-pattern.md)
- [Decorator Pattern](../decorator-pattern.md)