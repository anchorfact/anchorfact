---
id: kb-2026-00142
title: Factory Method Pattern
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-24'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - gpt-5-codex
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-factory-method-001
    statement: >-
      Refactoring.Guru describes Factory Method as a creational design pattern
      that provides an interface for creating objects in a superclass while
      letting subclasses alter the type of objects created.
    source_title: Refactoring.Guru - Factory Method
    source_url: https://refactoring.guru/design-patterns/factory-method
    confidence: medium
  - id: fact-factory-method-002
    statement: >-
      SourceMaking states that Factory Method defines an interface for creating an
      object but lets subclasses decide which class to instantiate.
    source_title: SourceMaking - Factory Method Design Pattern
    source_url: https://sourcemaking.com/design_patterns/factory_method
    confidence: medium
  - id: fact-factory-method-003
    statement: >-
      SourceMaking states that Factory Method lets a class defer instantiation to
      subclasses.
    source_title: SourceMaking - Factory Method Design Pattern
    source_url: https://sourcemaking.com/design_patterns/factory_method
    confidence: medium
  - id: fact-factory-method-004
    statement: >-
      Refactoring.Guru distinguishes Abstract Factory from Factory Method by
      describing Abstract Factory as a creational pattern for producing families of
      related objects without specifying their concrete classes.
    source_title: Refactoring.Guru - Abstract Factory
    source_url: https://refactoring.guru/design-patterns/abstract-factory
    confidence: medium
  - id: fact-factory-method-005
    statement: >-
      InformIT's listing for Design Patterns: Elements of Reusable
      Object-Oriented Software describes the book as a catalog of 23 patterns for
      flexible, reusable object-oriented designs.
    source_title: 'Design Patterns: Elements of Reusable Object-Oriented Software'
    source_url: https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    This repair covers the classic intent, creator/subclass boundary, Abstract
    Factory distinction, and GoF catalog context; it does not compare language-specific
    factory functions, dependency-injection containers, or framework conventions.
disputed_statements: []
primary_sources:
  - title: Refactoring.Guru - Factory Method
    type: reference
    year: 2026
    url: https://refactoring.guru/design-patterns/factory-method
    institution: Refactoring.Guru
  - title: SourceMaking - Factory Method Design Pattern
    type: reference
    year: 2026
    url: https://sourcemaking.com/design_patterns/factory_method
    institution: SourceMaking
  - title: Refactoring.Guru - Abstract Factory
    type: reference
    year: 2026
    url: https://refactoring.guru/design-patterns/abstract-factory
    institution: Refactoring.Guru
  - title: 'Design Patterns: Elements of Reusable Object-Oriented Software'
    type: book
    year: 1994
    authors:
      - Gamma E.
      - Helm R.
      - Johnson R.
      - Vlissides J.
    institution: Addison-Wesley
    url: https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610
secondary_sources: []
updated: '2026-06-24'
---

## TL;DR

Factory Method is a creational design pattern for moving object creation behind a
method that subclasses can override. The client works through the product interface,
while each concrete creator decides which concrete product to build.

## Core Explanation

The pattern is useful when a base workflow knows it needs a product but should not
hard-code the concrete product class. A creator exposes a factory method, concrete
creators override it, and the rest of the workflow can keep using the shared product
interface.

Factory Method is narrower than a generic "factory" helper. The classic form uses
subclassing to vary construction, while many modern codebases also use factory
functions or dependency injection when inheritance would add unnecessary structure.

Abstract Factory is related but solves a larger coordination problem: it creates
families of related products without tying client code to concrete classes. Factory
Method usually controls one product-creation decision inside a creator hierarchy.

## Source-Mapped Facts

- Refactoring.Guru describes Factory Method as a creational design pattern that provides an interface for creating objects in a superclass while letting subclasses alter the type of objects created. ([source](https://refactoring.guru/design-patterns/factory-method))
- SourceMaking states that Factory Method defines an interface for creating an object but lets subclasses decide which class to instantiate. ([source](https://sourcemaking.com/design_patterns/factory_method))
- SourceMaking states that Factory Method lets a class defer instantiation to subclasses. ([source](https://sourcemaking.com/design_patterns/factory_method))
- Refactoring.Guru distinguishes Abstract Factory from Factory Method by describing Abstract Factory as a creational pattern for producing families of related objects without specifying their concrete classes. ([source](https://refactoring.guru/design-patterns/abstract-factory))
- InformIT's listing for Design Patterns: Elements of Reusable Object-Oriented Software describes the book as a catalog of 23 patterns for flexible, reusable object-oriented designs. ([source](https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610))

## Further Reading

- [Refactoring.Guru - Factory Method](https://refactoring.guru/design-patterns/factory-method)
- [SourceMaking - Factory Method Design Pattern](https://sourcemaking.com/design_patterns/factory_method)
- [Refactoring.Guru - Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610)

## Related Articles

- [Adapter Pattern](adapter-pattern.md)
- [Command Pattern](command-pattern.md)
- [Decorator Pattern](decorator-pattern.md)
