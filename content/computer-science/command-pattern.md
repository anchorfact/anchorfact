---
id: kb-2026-00147
title: Command Pattern
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-06-13"
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
      The Command pattern turns a request into a standalone object containing the information needed to execute it, which lets callers parameterize, queue, log, or defer requests.
    source_title: Refactoring.Guru - Command
    source_url: https://refactoring.guru/design-patterns/command
    confidence: medium
  - id: fact-computer-science-002
    statement: >-
      Command implementations commonly expose a shared execution method so an invoker can trigger a command without knowing the receiver's concrete operation.
    source_title: SourceMaking - Command Design Pattern
    source_url: https://sourcemaking.com/design_patterns/command
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      Command Query Responsibility Segregation separates operations that change state from operations that read state; it is related terminology but not the same as the object-level Command pattern.
    source_title: Martin Fowler - CQRS
    source_url: https://martinfowler.com/bliki/CQRS.html
    confidence: medium
completeness: 0.88
known_gaps: []
disputed_statements: []
primary_sources:
  - title: Refactoring.Guru - Command
    type: reference
    year: 2026
    url: https://refactoring.guru/design-patterns/command
    institution: Refactoring.Guru
  - title: SourceMaking - Command Design Pattern
    type: reference
    year: 2026
    url: https://sourcemaking.com/design_patterns/command
    institution: SourceMaking
  - title: Martin Fowler - CQRS
    type: reference_article
    year: 2011
    url: https://martinfowler.com/bliki/CQRS.html
    institution: MartinFowler.com
secondary_sources:
  - title: "Design Patterns: Elements of Reusable Object-Oriented Software"
    type: book
    year: 1994
    authors:
      - Gamma E.
      - Helm R.
      - Johnson R.
      - Vlissides J.
    institution: Addison-Wesley
---
## TL;DR

The Command pattern represents an operation as an object. That lets code pass, queue, store, retry, log, or undo work without tightly coupling the invoker to the object that performs the operation.

## Core Explanation

A command object usually wraps a receiver and the arguments needed for one operation, then exposes a common execution method. The invoker only needs that common interface, so it can trigger a command without depending on the receiver's concrete API.

This indirection is useful when requests need to be treated as data. Text editors can keep commands in an undo stack, job systems can enqueue commands for later execution, and UI controls can be configured with command objects instead of hard-coded callbacks.

CQRS uses the word "command" at an architectural level: writes are separated from reads. That idea can coexist with Command pattern objects, but CQRS is not simply the same design pattern applied at a larger scale.

## Further Reading

- [Refactoring.Guru - Command](https://refactoring.guru/design-patterns/command)
- [SourceMaking - Command Design Pattern](https://sourcemaking.com/design_patterns/command)
- [Martin Fowler - CQRS](https://martinfowler.com/bliki/CQRS.html)

## Related Articles

- [Adapter Pattern](../adapter-pattern.md)
- [Decorator Pattern](../decorator-pattern.md)
- [Factory Method Pattern](../factory-method-pattern.md)
