---
id: "kb-2026-00105"
title: "Fullscreen API"
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
  - title: "Fullscreen API Standard"
    type: "standard"
    year: 2024
    url: "https://fullscreen.spec.whatwg.org/"
    institution: "WHATWG"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Fullscreen API enables web content to request presentation in full-screen mode (`element.requestFullscreen()`), hiding browser UI. User gesture is required, and `document.exitFullscreen()` restores normal view.

## Core Explanation

`document.fullscreenElement` checks current fullscreen element. CSS pseudo-classes: `:fullscreen` styles the fullscreen element, `::backdrop` styles the background. Keyboard access is restricted in fullscreen (no Esc to exit for all keys — only Esc exits by spec). The API is available only in secure contexts.

## Further Reading

- [Fullscreen API Standard](https://fullscreen.spec.whatwg.org/)
