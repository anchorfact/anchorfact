---
id:"kb-2026-00300"
title:"Electron"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Electron Documentation"
    type:"documentation"
    year:2026
    url:"https://www.electronjs.org/docs/"
    institution:"OpenJS Foundation"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Electron (GitHub, 2013, formerly Atom Shell) is a framework for building desktop applications with web technologies (HTML, CSS, JavaScript) using Chromium and Node.js. Each app bundles both runtimes. Used by VS Code, Slack, Discord, Figma, Notion, 1Password.

## Core Explanation

Architecture: Main process (Node.js, system access) + Renderer processes (Chromium, UI). IPC (`ipcMain`/`ipcRenderer`) for inter-process communication. `electron-builder` packages for Windows (.exe), macOS (.dmg), Linux (.AppImage/.deb). Native modules via `native-ext`. Criticism: large bundle size (100+ MB), memory usage. Alternatives: Tauri (Rust backend, smaller, WebView instead of full Chromium).

## Further Reading

- [Electron Documentation](https://www.electronjs.org/docs/)
