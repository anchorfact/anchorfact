---
id: kb-2026-00142
title: Factory Method Pattern
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
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
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
atomic_facts:
  - id: fact-computer-science-001
    statement: Defines an interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: Abstract Factory creates families of related objects (e.g., GUI widgets per platform).
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

Defines an interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses.

## Core Explanation

Creator (abstract with factory method) + ConcreteCreator + Product interface. In modern code, factory functions (plain functions returning objects) often suffice without class hierarchies. Abstract Factory creates families of related objects (e.g., GUI widgets per platform).

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
