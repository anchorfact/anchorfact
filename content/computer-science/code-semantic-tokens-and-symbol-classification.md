---
id: code-semantic-tokens-and-symbol-classification
title: 'Code Semantic Tokens and Symbol Classification'
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
  - id: fact-cs-code-semantic-tokens-and-symbol-classification-1
    statement: >-
      The Language Server Protocol specification defines semantic tokens for semantic
      highlighting of source code.
    source_title: Language Server Protocol Semantic Tokens
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#semanticTokens
    confidence: medium
  - id: fact-cs-code-semantic-tokens-and-symbol-classification-2
    statement: >-
      Tree-sitter documentation describes syntax highlighting with queries that assign capture
      names to syntax nodes.
    source_title: Tree-sitter Syntax Highlighting
    source_url: https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html
    confidence: medium
  - id: fact-cs-code-semantic-tokens-and-symbol-classification-3
    statement: >-
      Pygments documentation describes token types as a hierarchy used by lexers and formatters.
    source_title: Pygments Token Types
    source_url: https://pygments.org/docs/tokens/
    confidence: medium
completeness: 0.83
known_gaps:
  - Token classification can differ by language server, parser grammar, generated code, macro expansion, and editor theme conventions.
disputed_statements: []
primary_sources:
  - title: Language Server Protocol Semantic Tokens
    type: standard
    year: 2026
    url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#semanticTokens
    institution: Microsoft
  - title: Tree-sitter Syntax Highlighting
    type: documentation
    year: 2026
    url: https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html
    institution: Tree-sitter
  - title: Pygments Token Types
    type: documentation
    year: 2026
    url: https://pygments.org/docs/tokens/
    institution: Pygments
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Semantic tokens classify code beyond raw text, helping agents distinguish variables, types, functions, keywords, parameters, properties, and modifiers.

## Core Explanation

Plain tokenization can tell an agent where words and punctuation are. Semantic classification tells the agent what those tokens mean in a language-aware context. That distinction improves code navigation, review, rename planning, and explanation because identifiers with the same spelling can play different roles.

Semantic tokens are not a replacement for full type checking or symbol indexes. They are a compact layer that can enrich code search, highlighting, chunking, and local reasoning when deeper build-aware analysis is unavailable.

## Source-Mapped Facts

- The Language Server Protocol specification defines semantic tokens for semantic highlighting of source code. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#semanticTokens))
- Tree-sitter documentation describes syntax highlighting with queries that assign capture names to syntax nodes. ([source](https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html))
- Pygments documentation describes token types as a hierarchy used by lexers and formatters. ([source](https://pygments.org/docs/tokens/))

## Further Reading

- [Language Server Protocol Semantic Tokens](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#semanticTokens)
- [Tree-sitter Syntax Highlighting](https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html)
- [Pygments Token Types](https://pygments.org/docs/tokens/)
