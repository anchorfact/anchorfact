---
id: kb-2026-00301
title: Tauri
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Tauri Documentation
    type: documentation
    year: 2026
    url: https://v2.tauri.app/
    institution: Tauri Programme
    note: "Lightweight desktop framework: Rust backend, web frontend, smaller bundle than Electron"
secondary_sources:
  - title: The Rust Programming Language (2nd Edition)
    authors:
      - Klabnik, Steve
      - Nichols, Carol
    type: book
    year: 2023
    url: https://nostarch.com/rust-programming-language-2nd-edition
    institution: No Starch Press
    note: Tauri backend is built in Rust — understanding Rust helps understand Tauri's security model
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
atomic_facts:
  - id: fact-computer-science-01
    statement: Uses OS native WebView instead of bundling Chromium — dramatically smaller bundles
    source_title: Tauri Documentation
    source_url: https://v2.tauri.app/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      Tauri (2019) is an Electron alternative: build desktop apps with web frontend + Rust backend. Uses OS native WebView (Edge/WebKit) instead of bundling Chromium — dramatically smaller bundles
      (<10MB). Tauri 2.0 (2024) added mobile support (iOS/Android), plugin system, and enhanced IPC.
    confidence: medium
    source_title: Tauri Documentation
    source_url: https://v2.tauri.app/
  - id: fact-computer-science-002
    statement: "Security: strict CSP, no Node.js in webview, fine-grained permissions (Tauri 2.0 capability system)."
    confidence: medium
    source_title: Tauri Documentation
    source_url: https://v2.tauri.app/
  - id: fact-computer-science-003
    statement: "Mobile: Tauri 2.0 supports Android (via WebView) and iOS (via WKWebView)."
    confidence: medium
    source_title: Tauri Documentation
    source_url: https://v2.tauri.app/
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
ai_citations: null
---



## TL;DR

Tauri (2019) is an Electron alternative: build desktop apps with web frontend + Rust backend. Uses OS native WebView (Edge/WebKit) instead of bundling Chromium — dramatically smaller bundles (<10MB). Tauri 2.0 (2024) added mobile support (iOS/Android), plugin system, and enhanced IPC.

## Core Explanation

Rust backend: system access, file I/O, shell commands — handled in Rust, exposed to web frontend via `invoke()`. Security: strict CSP, no Node.js in webview, fine-grained permissions (Tauri 2.0 capability system). Bundle sizes: 3-10MB vs. Electron's 100MB+. Mobile: Tauri 2.0 supports Android (via WebView) and iOS (via WKWebView).

## Further Reading

- [Tauri Documentation](https://v2.tauri.app/)
