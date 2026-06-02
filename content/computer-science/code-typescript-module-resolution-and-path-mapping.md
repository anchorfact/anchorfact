---
id: code-typescript-module-resolution-and-path-mapping
title: 'Code TypeScript Module Resolution and Path Mapping'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-code-typescript-module-resolution-and-path-mapping-1
    statement: >-
      TypeScript documentation says relative module specifiers are never
      affected by the baseUrl option.
    source_title: TypeScript Modules Reference
    source_url: https://www.typescriptlang.org/docs/handbook/modules/reference
    confidence: medium
  - id: fact-cs-code-typescript-module-resolution-and-path-mapping-2
    statement: >-
      TypeScript documentation says node_modules package lookups are supported
      by all moduleResolution options except classic.
    source_title: TypeScript Modules Reference
    source_url: https://www.typescriptlang.org/docs/handbook/modules/reference
    confidence: medium
  - id: fact-cs-code-typescript-module-resolution-and-path-mapping-3
    statement: >-
      TypeScript TSConfig documentation says paths remap imports to lookup
      locations but do not change how import paths are emitted by tsc.
    source_title: TypeScript TSConfig paths
    source_url: https://www.typescriptlang.org/tsconfig/paths.html
    confidence: medium
completeness: 0.82
known_gaps:
  - TypeScript import diagnosis depends on moduleResolution mode, package exports, paths, baseUrl, project references, runtime bundler aliases, declaration output, symlinks, and editor language service cache.
disputed_statements: []
primary_sources:
  - title: TypeScript Modules Reference
    type: documentation
    year: 2026
    url: https://www.typescriptlang.org/docs/handbook/modules/reference
    institution: Microsoft TypeScript
  - title: TypeScript TSConfig paths
    type: documentation
    year: 2026
    url: https://www.typescriptlang.org/tsconfig/paths.html
    institution: Microsoft TypeScript
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

TypeScript module resolution and path mapping evidence helps code agents separate type-checker lookup success from runtime import success.

## Core Explanation

Agents often see an import path work in the editor but fail in Node, a test runner, or a bundler. TypeScript can be told how to resolve aliases for type checking, but emitted import strings may still need a compatible runtime or bundler configuration.

Useful evidence includes moduleResolution mode, baseUrl, paths, package.json exports, tsconfig inheritance, project references, bundler aliases, test runner resolver settings, and emitted JavaScript. Agents should not assume that a TypeScript path alias changes runtime behavior unless another tool is configured to honor the same mapping.

## Source-Mapped Facts

- TypeScript documentation says relative module specifiers are never affected by the baseUrl option. ([source](https://www.typescriptlang.org/docs/handbook/modules/reference))
- TypeScript documentation says node_modules package lookups are supported by all moduleResolution options except classic. ([source](https://www.typescriptlang.org/docs/handbook/modules/reference))
- TypeScript TSConfig documentation says paths remap imports to lookup locations but do not change how import paths are emitted by tsc. ([source](https://www.typescriptlang.org/tsconfig/paths.html))

## Further Reading

- [TypeScript Modules Reference](https://www.typescriptlang.org/docs/handbook/modules/reference)
- [TypeScript TSConfig paths](https://www.typescriptlang.org/tsconfig/paths.html)
