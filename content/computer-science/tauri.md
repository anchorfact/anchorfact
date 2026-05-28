---
id: kb-2026-00301
title: Tauri
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Tauri architecture documentation describes Tauri apps as combining Rust tools with HTML
      rendered in a WebView.
    source_title: Tauri Architecture
    source_url: https://v2.tauri.app/concept/architecture/
    confidence: medium
  - id: fact-computer-science-002
    statement: Tauri process-model documentation distinguishes the core process from WebView processes.
    source_title: Process Model
    source_url: https://v2.tauri.app/concept/process-model/
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      Tauri security documentation describes security as a framework concern for controlling access
      between webview code and system capabilities.
    source_title: Security
    source_url: https://v2.tauri.app/security/
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    This field is under active research and rapid development; some conclusions may evolve with new
    evidence or technological advances
  - >-
    Certain sub-topics are covered at a general level; specialized edge cases and nuanced
    applications may not be fully addressed
disputed_statements: []
primary_sources:
  - id: ps-tauri-1
    title: Tauri Architecture
    type: documentation
    year: 2026
    institution: Tauri
    url: https://v2.tauri.app/concept/architecture/
  - id: ps-tauri-2
    title: Process Model
    type: documentation
    year: 2026
    institution: Tauri
    url: https://v2.tauri.app/concept/process-model/
  - id: ps-tauri-3
    title: Security
    type: documentation
    year: 2026
    institution: Tauri
    url: https://v2.tauri.app/security/
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Tauri is a framework for building native desktop and mobile apps with a web frontend and a Rust-based backend. Public claims should map to Tauri's own architecture, process model, and security documentation.

## Core Explanation
Tauri apps render HTML, CSS, and JavaScript in a system WebView while using Rust for native-side application logic. The split between core and WebView processes is central to the architecture, and permissions/security controls govern what the webview side can ask the native side to do.

## Related Articles

- [Rust Programming Language](../rust-programming-language.md)
- [Desktop Application Development](../desktop-application-development.md)
- [WebView](../webview.md)
