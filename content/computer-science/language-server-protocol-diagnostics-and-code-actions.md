---
id: language-server-protocol-diagnostics-and-code-actions
title: 'Language Server Protocol Diagnostics and Code Actions'
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
  - id: fact-computer-science-language-server-protocol-diagnostics-and-code-actions-1
    statement: >-
      The Language Server Protocol defines textDocument/publishDiagnostics as a notification for
      reporting validation results.
    source_title: LSP Publish Diagnostics
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_publishDiagnostics
    confidence: medium
  - id: fact-computer-science-language-server-protocol-diagnostics-and-code-actions-2
    statement: >-
      The Language Server Protocol defines textDocument/codeAction as a request for commands for a
      given text document and range.
    source_title: LSP Code Action Request
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_codeAction
    confidence: medium
  - id: fact-computer-science-language-server-protocol-diagnostics-and-code-actions-3
    statement: >-
      The Language Server Protocol defines diagnostics as objects representing problems such as
      errors or warnings.
    source_title: LSP Diagnostic Type
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#diagnostic
    confidence: medium
completeness: 0.83
known_gaps:
  - Diagnostic and code-action quality depends on language server support, project configuration, build state, generated files, and whether edits are workspace-wide.
disputed_statements: []
primary_sources:
  - title: LSP Publish Diagnostics
    type: standard
    year: 2023
    url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_publishDiagnostics
    institution: Microsoft
  - title: LSP Code Action Request
    type: standard
    year: 2023
    url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_codeAction
    institution: Microsoft
  - title: LSP Diagnostic Type
    type: standard
    year: 2023
    url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#diagnostic
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LSP diagnostics and code actions give code agents structured compiler-like feedback and candidate fixes instead of relying only on text search.

## Core Explanation

Diagnostics tell an editor or agent what problems a language server sees in a file. Code actions can propose fixes, refactors, imports, or commands associated with a diagnostic or range. Together they are a lower-level code-intelligence surface for safe edits.

Agents should treat code actions as suggestions, not automatic truth. A quick fix can edit multiple files, change imports, or rely on stale project state, so the agent still needs tests and diff review.

## Source-Mapped Facts

- The Language Server Protocol defines textDocument/publishDiagnostics as a notification for reporting validation results. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_publishDiagnostics))
- The Language Server Protocol defines textDocument/codeAction as a request for commands for a given text document and range. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_codeAction))
- The Language Server Protocol defines diagnostics as objects representing problems such as errors or warnings. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#diagnostic))

## Further Reading

- [LSP Publish Diagnostics](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_publishDiagnostics)
- [LSP Code Action Request](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_codeAction)
- [LSP Diagnostic Type](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#diagnostic)
