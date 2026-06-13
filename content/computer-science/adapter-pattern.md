---
id: kb-2026-00146
title: Adapter Pattern
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-13'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-adapter-pattern-001
    statement: The Adapter pattern converts the interface of one object into another interface that client code expects, allowing otherwise incompatible objects to collaborate.
    source_title: Refactoring.Guru - Adapter
    source_url: https://refactoring.guru/design-patterns/adapter
    confidence: medium
  - id: fact-adapter-pattern-002
    statement: Object adapters wrap an adaptee through composition, while class adapters rely on inheritance and require a language model that can inherit from both the target interface and adaptee.
    source_title: Refactoring.Guru - Adapter
    source_url: https://refactoring.guru/design-patterns/adapter
    confidence: medium
  - id: fact-adapter-pattern-003
    statement: >-
      The adapter pattern is commonly contrasted with Facade: an adapter changes an existing interface to fit a client, while a facade provides a simplified interface to a subsystem.
    source_title: SourceMaking - Adapter Design Pattern
    source_url: https://sourcemaking.com/design_patterns/adapter
    confidence: medium
completeness: 0.9
known_gaps: []
disputed_statements: []
primary_sources:
  - title: Refactoring.Guru - Adapter
    type: reference
    url: https://refactoring.guru/design-patterns/adapter
    institution: Refactoring.Guru
  - title: SourceMaking - Adapter Design Pattern
    type: reference
    url: https://sourcemaking.com/design_patterns/adapter
    institution: SourceMaking
  - title: Head First Design Patterns, 2nd Edition
    type: book
    year: 2020
    authors:
      - Eric Freeman
      - Elisabeth Robson
    institution: "O'Reilly Media"
    url: https://www.oreilly.com/library/view/head-first-design/9781492077992/
secondary_sources:
  - title: Design Patterns - Elements of Reusable Object-Oriented Software
    type: book
    year: 1994
    authors:
      - Erich Gamma
      - Richard Helm
      - Ralph Johnson
      - John Vlissides
    institution: Addison-Wesley
---

## TL;DR

Adapter is a structural design pattern that lets code written for one interface use an object that exposes a different interface. It is most useful at integration boundaries: legacy APIs, third-party libraries, platform abstractions, and code that needs a stable domain interface while an underlying dependency varies.

## Core Explanation

An adapter sits between client code and an adaptee. The client calls the target interface it already understands; the adapter translates that call into the adaptee's interface and returns a compatible result. This keeps the translation logic localized instead of spreading dependency-specific calls throughout the codebase.

There are two common forms. An object adapter uses composition: it stores a reference to the adaptee and delegates translated calls to it. A class adapter uses inheritance, so it is only practical in languages and designs that support the needed inheritance shape. Object adapters are usually easier to compose, test, and replace.

Adapter is related to, but different from, Facade and Bridge. Adapter makes an existing interface usable by a client. Facade offers a simpler interface over a subsystem. Bridge separates an abstraction from its implementation so both can vary independently.

## Further Reading

- [Refactoring.Guru - Adapter](https://refactoring.guru/design-patterns/adapter)
- [SourceMaking - Adapter Design Pattern](https://sourcemaking.com/design_patterns/adapter)
- [Head First Design Patterns, 2nd Edition](https://www.oreilly.com/library/view/head-first-design/9781492077992/)

## Related Articles

- [Command Pattern](../command-pattern.md)
- [Decorator Pattern](../decorator-pattern.md)
- [Factory Method Pattern](../factory-method-pattern.md)
