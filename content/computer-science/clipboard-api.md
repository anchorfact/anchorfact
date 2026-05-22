---
id: "kb-2026-00101"
title: "Clipboard API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Clipboard API and Events (W3C)"
    type: "standard"
    year: 2024
    url: "https://www.w3.org/TR/clipboard-apis/"
    institution: "W3C"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Clipboard API (`navigator.clipboard`) provides asynchronous read/write access to the system clipboard from web pages. It replaces `document.execCommand('copy')` with a Promise-based, secure (requires Permissions API) approach supporting text, HTML, images (PNG/SVG), and custom formats.

## Core Explanation

`navigator.clipboard.writeText('text')` and `readText()` for plain text. `write()` and `read()` for ClipboardItem objects with multiple MIME types. Clipboard access must be triggered by user gesture (click, keypress). The Permissions API controls read access: `navigator.permissions.query({ name: 'clipboard-read' })`.

## Further Reading

- [Clipboard API and Events (W3C)](https://www.w3.org/TR/clipboard-apis/)
