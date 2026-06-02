---
id: semantic-code-search-and-code-indexing
title: 'Semantic Code Search and Code Indexing'
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
  - id: fact-semantic-code-search-and-code-indexing-1
    statement: >-
      Sourcegraph documentation describes code search as a way to search across repositories and code hosts.
    source_title: Sourcegraph Code Search
    source_url: https://sourcegraph.com/docs/code-search
  - id: fact-semantic-code-search-and-code-indexing-2
    statement: >-
      Sourcegraph precise code navigation documentation says precise code navigation uses the language-agnostic SCIP code intelligence protocol.
    source_title: Sourcegraph Precise Code Navigation
    source_url: https://sourcegraph.com/docs/code-navigation/precise-code-navigation
  - id: fact-semantic-code-search-and-code-indexing-3
    statement: >-
      Tree-sitter documentation describes code navigation systems that use syntax queries to find definitions and references in source code.
    source_title: Tree-sitter Code Navigation
    source_url: https://tree-sitter.github.io/tree-sitter/4-code-navigation.html
completeness: 0.84
known_gaps:
  - Search quality depends on indexing freshness, generated code handling, language support, repository permissions, and build-aware symbol data.
disputed_statements: []
primary_sources:
  - title: Sourcegraph Code Search
    type: documentation
    year: 2026
    url: https://sourcegraph.com/docs/code-search
    institution: Sourcegraph
  - title: Sourcegraph Precise Code Navigation
    type: documentation
    year: 2026
    url: https://sourcegraph.com/docs/code-navigation/precise-code-navigation
    institution: Sourcegraph
  - title: Tree-sitter Code Navigation
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

Semantic code search combines text search, symbol indexes, syntax-aware parsing, and sometimes embeddings to help agents and developers locate code by meaning, definition, reference, or behavior.

## Core Explanation

Code agents need more than lexical grep for large repositories. Text search finds literal strings; syntax-aware indexes identify symbols and references; precise indexes connect cross-file and cross-package definitions. Semantic retrieval can help with natural-language intent, but it should be paired with exact code navigation when edits depend on identifiers, call sites, or type boundaries.

## Source-Mapped Facts

- Sourcegraph documentation describes code search as a way to search across repositories and code hosts. ([source](https://sourcegraph.com/docs/code-search))
- Sourcegraph precise code navigation documentation says precise code navigation uses the language-agnostic SCIP code intelligence protocol. ([source](https://sourcegraph.com/docs/code-navigation/precise-code-navigation))
- Tree-sitter documentation describes code navigation systems that use syntax queries to find definitions and references in source code. ([source](https://tree-sitter.github.io/tree-sitter/4-code-navigation.html))

## Further Reading

- [Sourcegraph Code Search](https://sourcegraph.com/docs/code-search)
- [Sourcegraph Precise Code Navigation](https://sourcegraph.com/docs/code-navigation/precise-code-navigation)
- [Tree-sitter Code Navigation](https://tree-sitter.github.io/tree-sitter/4-code-navigation.html)
