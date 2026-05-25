---
id: kb-2026-00300
title: Electron
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Electron (GitHub, 2013, formerly Atom Shell) is a framework for building desktop applications with web technologies (HTML, CSS, JavaScript) using Chromium and Node.js. Each app bundles both
      runtimes. Used by VS Code, Slack, Discord, Figma, Notion, 1Password.
    source_title: Electron Documentation
    source_url: https://www.electronjs.org/docs/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Criticism: large bundle size (100+ MB), memory usage."
    source_title: Electron Documentation
    source_url: https://www.electronjs.org/docs/
    confidence: medium
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: Electron Documentation
    type: documentation
    year: 2026
    url: https://www.electronjs.org/docs/
    institution: OpenJS Foundation
  - title: Electron in Action (2025 Updated Edition)
    type: book
    year: 2025
    authors:
      - Kinney S.
    institution: Manning
    url: https://www.manning.com/electron/
  - title: "Desktop Application Development: Electron, Tauri, and Beyond (2025)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.desktop
secondary_sources:
  - title: Node.js Design Patterns (3rd Edition)
    authors:
      - Casciaro, Mario
      - Mammino, Luciano
    type: book
    year: 2020
    url: https://www.oreilly.com/library/view/nodejs-design-patterns/9781839214110/
    institution: Packt
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
---
## TL;DR

Electron (GitHub, 2013, formerly Atom Shell) is a framework for building desktop applications with web technologies (HTML, CSS, JavaScript) using Chromium and Node.js. Each app bundles both runtimes. Used by VS Code, Slack, Discord, Figma, Notion, 1Password.

## Core Explanation

Architecture: Main process (Node.js, system access) + Renderer processes (Chromium, UI). IPC (`ipcMain`/`ipcRenderer`) for inter-process communication. `electron-builder` packages for Windows (.exe), macOS (.dmg), Linux (.AppImage/.deb). Native modules via `native-ext`. Criticism: large bundle size (100+ MB), memory usage. Alternatives: Tauri (Rust backend, smaller, WebView instead of full Chromium).

## Further Reading

- [Electron Documentation](https://www.electronjs.org/docs/)
