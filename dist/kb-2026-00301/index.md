---
id:"kb-2026-00301"
title:"Tauri"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Tauri Documentation"
    type: "documentation"
    year: 2026
    url: "https://v2.tauri.app/"
    institution: "Tauri Programme"
    note: "Lightweight desktop framework: Rust backend, web frontend, smaller bundle than Electron"
secondary_sources:
  - title: "The Rust Programming Language (2nd Edition)"
    authors: ["Klabnik, Steve", "Nichols, Carol"]
    type: "book"
    year: 2023
    url: "https://nostarch.com/rust-programming-language-2nd-edition"
    institution: "No Starch Press"
    note: "Tauri backend is built in Rust — understanding Rust helps understand Tauri's security model"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Tauri (2019) is an Electron alternative: build desktop apps with web frontend + Rust backend. Uses OS native WebView (Edge/WebKit) instead of bundling Chromium — dramatically smaller bundles (<10MB). Tauri 2.0 (2024) added mobile support (iOS/Android), plugin system, and enhanced IPC.

## Core Explanation

Rust backend: system access, file I/O, shell commands — handled in Rust, exposed to web frontend via `invoke()`. Security: strict CSP, no Node.js in webview, fine-grained permissions (Tauri 2.0 capability system). Bundle sizes: 3-10MB vs. Electron's 100MB+. Mobile: Tauri 2.0 supports Android (via WebView) and iOS (via WKWebView).

## Further Reading

- [Tauri Documentation](https://v2.tauri.app/)
