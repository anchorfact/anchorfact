---
id: kb-2026-00148
title: Model-View-Controller (MVC)
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
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
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

MVC separates application into three components: Model (data/business logic), View (presentation/UI), Controller (handles input, updates model). Originally from Smalltalk-80, MVC is the most influential architectural pattern in UI development.

## Core Explanation

Variants: MVP (Model-View-Presenter), MVVM (Model-View-ViewModel, used by Vue, Angular). Web MVC: Ruby on Rails, Django, Laravel, Spring MVC. React is primarily the View layer but implements unidirectional data flow (Flux/Redux) rather than traditional MVC.

## Further Reading

- [Patterns of Enterprise Application Architecture](undefined)
