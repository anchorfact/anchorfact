---
id: kb-2026-00149
title: Dependency Injection
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-14'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-dependency-injection-001
    statement: >-
      Martin Fowler presents Dependency Injection as an inversion-of-control pattern for
      separating a component from the code that assembles and supplies its collaborator
      objects.
    source_title: Inversion of Control Containers and the Dependency Injection Pattern
    source_url: https://martinfowler.com/articles/injection.html
    confidence: medium
  - id: fact-dependency-injection-002
    statement: >-
      The Angular documentation describes dependency injection as supplying dependencies
      to a class instead of having that class create the dependencies inside itself.
    source_title: Angular - Dependency Injection Overview
    source_url: https://angular.dev/guide/di
    confidence: medium
  - id: fact-dependency-injection-003
    statement: >-
      Spring Framework documentation identifies constructor-based dependency injection and
      setter-based dependency injection as the two major variants of DI.
    source_title: Spring Framework - Dependency Injection
    source_url: https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html
    confidence: medium
  - id: fact-dependency-injection-004
    statement: >-
      Microsoft Learn describes .NET dependency injection as injecting a registered service
      into a constructor while the framework takes responsibility for creating and disposing
      the dependency instance.
    source_title: Microsoft Learn - Dependency injection in .NET
    source_url: https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/overview
    confidence: medium
completeness: 0.86
known_gaps:
  - >-
    Coverage is conceptual and cross-framework; it does not benchmark containers, compare
    every DI framework, or prescribe one lifetime policy for all applications.
disputed_statements: []
primary_sources:
  - title: Inversion of Control Containers and the Dependency Injection Pattern
    type: reference_article
    year: 2004
    url: https://martinfowler.com/articles/injection.html
    institution: MartinFowler.com
  - title: Angular - Dependency Injection Overview
    type: documentation
    year: 2026
    url: https://angular.dev/guide/di
    institution: Angular
  - title: Spring Framework - Dependency Injection
    type: documentation
    year: 2026
    url: https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html
    institution: Spring
  - title: Microsoft Learn - Dependency injection in .NET
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/overview
    institution: Microsoft
secondary_sources: []
updated: '2026-06-14'
---

## TL;DR

Dependency Injection is a design pattern for supplying an object's collaborators from the
outside instead of letting the object construct or locate them itself. The goal is to keep
the object's core behavior separate from configuration, wiring, lifecycle, and concrete
implementation choices.

## Core Explanation

DI is a practical form of inversion of control. A class declares what it needs, usually as
constructor parameters or writable properties. An assembler, framework, or container then
chooses concrete implementations and supplies them. This keeps component code focused on
its own behavior instead of on object creation and dependency lookup.

Constructor injection is the common default when a dependency is required because the
object can be created only when all mandatory collaborators are available. Setter injection
is useful for optional or late-bound collaborators, but it requires clearer handling of
partially configured objects. Framework containers such as Spring, Angular, and the .NET
DI container add registration, resolution, and lifecycle rules around the same underlying
idea.

DI improves testability when code depends on interfaces or small abstractions: tests can
provide substitute collaborators without changing production code. The tradeoff is that
object wiring moves elsewhere, so configuration errors may appear at startup or resolution
time rather than at the call site.

## Further Reading

- [Inversion of Control Containers and the Dependency Injection Pattern](https://martinfowler.com/articles/injection.html)
- [Angular - Dependency Injection Overview](https://angular.dev/guide/di)
- [Spring Framework - Dependency Injection](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)
- [Microsoft Learn - Dependency injection in .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/overview)

## Related Articles

- [SOLID Principles](solid-principles.md)
- [Factory Method Pattern](factory-method-pattern.md)
- [Adapter Pattern](adapter-pattern.md)
