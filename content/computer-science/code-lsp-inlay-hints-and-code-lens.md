---
id: code-lsp-inlay-hints-and-code-lens
title: 'Code LSP Inlay Hints and Code Lens'
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
  - id: fact-cs-code-lsp-inlay-hints-and-code-lens-1
    statement: >-
      The Language Server Protocol 3.17 specification defines an inlay hint
      request named textDocument/inlayHint.
    source_title: Language Server Protocol Specification 3.17
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
    confidence: medium
  - id: fact-cs-code-lsp-inlay-hints-and-code-lens-2
    statement: >-
      The Language Server Protocol 3.17 specification defines a code lens
      request named textDocument/codeLens.
    source_title: Language Server Protocol Specification 3.17
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
    confidence: medium
  - id: fact-cs-code-lsp-inlay-hints-and-code-lens-3
    statement: >-
      The Language Server Protocol overview describes the protocol as allowing a
      development tool to communicate with a language server.
    source_title: Language Server Protocol Overview
    source_url: https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/
    confidence: medium
completeness: 0.82
known_gaps:
  - Useful hints and lenses depend on language-server support, client capability negotiation, workspace indexing, stale diagnostics, and whether commands behind lenses are safe to execute.
disputed_statements: []
primary_sources:
  - title: Language Server Protocol Specification 3.17
    type: standard
    year: 2022
    url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
    institution: Microsoft
  - title: Language Server Protocol Overview
    type: documentation
    year: 2026
    url: https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/
    institution: Microsoft
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

LSP inlay hints and code lenses expose editor-side code intelligence that agents can use as lightweight context before editing.

## Core Explanation

Inlay hints can show inferred parameter names, types, or other inline annotations. Code lenses can expose commands or metadata near source ranges, such as references, tests, implementations, or generated actions.

Agents should treat these signals as context, not ground truth. They should record the language server, client capabilities, requested range, returned command, and whether a lens action is read-only or mutating before using it to modify code.

## Source-Mapped Facts

- The Language Server Protocol 3.17 specification defines an inlay hint request named textDocument/inlayHint. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/))
- The Language Server Protocol 3.17 specification defines a code lens request named textDocument/codeLens. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/))
- The Language Server Protocol overview describes the protocol as allowing a development tool to communicate with a language server. ([source](https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/))

## Further Reading

- [Language Server Protocol Specification 3.17](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
- [Language Server Protocol Overview](https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/)
