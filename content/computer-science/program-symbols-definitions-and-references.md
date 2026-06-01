---
id: program-symbols-definitions-and-references
title: 'Program Symbols, Definitions, and References'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-program-symbols-definitions-and-references-1
    statement: >-
      GitHub documentation describes code navigation as linking definitions for named entities to
      references and references back to definitions.
    source_title: GitHub Navigating Code
    source_url: https://docs.github.com/en/repositories/working-with-files/using-files/navigating-code-on-github
    confidence: medium
  - id: fact-cs-program-symbols-definitions-and-references-2
    statement: >-
      GitHub documentation says its code navigation approach uses tree-sitter to search definitions
      and references across a repository for entities with a given name.
    source_title: GitHub Navigating Code
    source_url: https://docs.github.com/en/repositories/working-with-files/using-files/navigating-code-on-github
    confidence: medium
  - id: fact-cs-program-symbols-definitions-and-references-3
    statement: >-
      The Language Server Protocol defines text document requests for references, document symbols,
      and call hierarchy preparation.
    source_title: Language Server Protocol Specification 3.17
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
    confidence: medium
completeness: 0.82
known_gaps:
  - Symbol resolution can vary by language, build system, generated source, and project configuration.
disputed_statements: []
primary_sources:
  - title: GitHub Navigating Code
    type: documentation
    year: 2026
    url: https://docs.github.com/en/repositories/working-with-files/using-files/navigating-code-on-github
    institution: GitHub
  - title: Language Server Protocol Specification 3.17
    type: standard
    year: 2026
    url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
    institution: Microsoft
  - title: Tree-sitter Code Navigation Systems
    type: documentation
    year: 2026
    url: https://tree-sitter.github.io/tree-sitter/4-code-navigation.html
    institution: Tree-sitter
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Symbols, definitions, and references are the basic lookup units that let agents move from a name in code to the place it is declared, used, and called.

## Core Explanation

For code-aware AI systems, a symbol is more useful than a plain token because it can be attached to a role and a source range. Definition and reference lookup lets an agent answer questions such as "where is this function defined," "who calls this method," and "what changes if this variable's shape changes."

## Source-Mapped Facts

- GitHub documentation describes code navigation as linking definitions for named entities to references and references back to definitions. ([source](https://docs.github.com/en/repositories/working-with-files/using-files/navigating-code-on-github))
- GitHub documentation says its code navigation approach uses tree-sitter to search definitions and references across a repository for entities with a given name. ([source](https://docs.github.com/en/repositories/working-with-files/using-files/navigating-code-on-github))
- The Language Server Protocol defines text document requests for references, document symbols, and call hierarchy preparation. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/))

## Further Reading

- [GitHub Navigating Code](https://docs.github.com/en/repositories/working-with-files/using-files/navigating-code-on-github)
- [Language Server Protocol Specification 3.17](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
- [Tree-sitter Code Navigation Systems](https://tree-sitter.github.io/tree-sitter/4-code-navigation.html)
