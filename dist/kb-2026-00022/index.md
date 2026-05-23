---
id: "kb-2026-00022"
title: "TypeScript"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on official TypeScript documentation, GitHub repository data, and Stack Overflow surveys"
last_verified: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "TypeScript Documentation"
    type: "documentation"
    year: 2026
    url: "https://www.typescriptlang.org/docs/"
    institution: "Microsoft"
  - title: "TypeScript GitHub Repository"
    type: "repository"
    url: "https://github.com/microsoft/TypeScript"
    institution: "Microsoft"
  - title: "Stack Overflow Developer Survey 2024"
    type: "survey"
    year: 2024
    url: "https://survey.stackoverflow.co/2024/"
secondary_sources:
  - title: "Effective TypeScript (2nd Ed)"
    authors: ["Vanderkam"]
    type: "book"
    year: 2024
    url: "https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/"
    institution: "O'Reilly"
completeness: 0.85
related_entities:
  - "entity:javascript"
  - "entity:programming-languages"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

TypeScript is a strongly-typed superset of JavaScript developed by Microsoft, first released in October 2012 by Anders Hejlsberg (creator of C# and Turbo Pascal). It adds optional static type checking to JavaScript while compiling to plain JavaScript. TypeScript was the 4th most popular programming language in the 2024 Stack Overflow Developer Survey and is used by over 80% of professional web developers. Its type system enables IDE autocompletion, refactoring, and early error detection — making large-scale JavaScript codebases maintainable.

## Core Explanation

TypeScript's type system is structural (not nominal), meaning types are compatible based on their shape rather than their name. Key type features include:

- **Interfaces and Type Aliases**: Define the shape of objects and functions
- **Generics**: Parameterized types enabling reusable, type-safe abstractions
- **Union and Intersection Types**: Combine types (`A | B`, `A & B`)
- **Literal Types**: Specific string/number values as types (`"GET" | "POST"`)
- **Conditional Types**: Types that depend on other types (`T extends U ? X : Y`)
- **Template Literal Types**: String manipulation at the type level
- **Mapped Types**: Transform existing types (`Partial<T>`, `Readonly<T>`, `Pick<T, K>`)
- **Type Narrowing**: Control flow analysis that refines types based on runtime checks
- **`satisfies` Operator** (TS 4.9+): Validate type without widening

TypeScript compiles to any JavaScript target (ES3 through ESNext) through the `tsc` compiler, or is stripped at build time by tools like esbuild and swc for faster development workflows.

## Key Milestones

| Version | Date | Key Feature |
|---------|------|------------|
| 0.8 | Oct 2012 | Initial public release by Anders Hejlsberg |
| 2.0 | Sep 2016 | Non-nullable types, control flow analysis |
| 2.8 | Mar 2018 | Conditional types |
| 3.0 | Jul 2018 | Project references, unknown type |
| 4.0 | Aug 2020 | Variadic tuple types, labeled tuples |
| 4.1 | Nov 2020 | Template literal types, recursive conditional types |
| 5.0 | Mar 2023 | Decorators (standardized), const type parameters |
| 5.5 | Jun 2024 | Inferred type predicates, isolated declarations |
| 5.7 | Nov 2024 | `--rewriteImportExtensions`, never-narrowing improvements |

## Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/): Official documentation
- [TypeScript GitHub](https://github.com/microsoft/TypeScript): Source code and issues
