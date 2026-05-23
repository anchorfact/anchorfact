---
id: kb-2026-00300
title: Electron
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Electron Documentation
    type: documentation
    year: 2026
    url: https://www.electronjs.org/docs/
    institution: OpenJS Foundation
    note: "Desktop apps with web tech: Chromium + Node.js. Used by VS Code, Slack, Discord."
secondary_sources:
  - title: Node.js Design Patterns (3rd Edition)
    authors:
      - Casciaro, Mario
      - Mammino, Luciano
    type: book
    year: 2020
    url: https://www.oreilly.com/library/view/nodejs-design-patterns/9781839214110/
    institution: Packt
    note: Electron apps use Node.js for system access — Node patterns are fundamental to Electron development
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Electron (GitHub, 2013, formerly Atom Shell) is a framework for building desktop applications with web technologies (HTML, CSS, JavaScript) using Chromium and Node.js. Each app bundles both
      runtimes. Used by VS Code, Slack, Discord, Figma, Notion, 1Password.
    confidence: medium
    source_title: Electron Documentation
    source_url: https://www.electronjs.org/docs/
  - id: fact-computer-science-002
    statement: "Criticism: large bundle size (100+ MB), memory usage."
    confidence: medium
    source_title: Electron Documentation
    source_url: https://www.electronjs.org/docs/
---


## TL;DR

Electron (GitHub, 2013, formerly Atom Shell) is a framework for building desktop applications with web technologies (HTML, CSS, JavaScript) using Chromium and Node.js. Each app bundles both runtimes. Used by VS Code, Slack, Discord, Figma, Notion, 1Password.

## Core Explanation

Architecture: Main process (Node.js, system access) + Renderer processes (Chromium, UI). IPC (`ipcMain`/`ipcRenderer`) for inter-process communication. `electron-builder` packages for Windows (.exe), macOS (.dmg), Linux (.AppImage/.deb). Native modules via `native-ext`. Criticism: large bundle size (100+ MB), memory usage. Alternatives: Tauri (Rust backend, smaller, WebView instead of full Chromium).

## Further Reading

- [Electron Documentation](https://www.electronjs.org/docs/)
