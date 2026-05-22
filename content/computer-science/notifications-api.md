---
id: "kb-2026-00102"
title: "Notifications API"
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
  - title: "Notifications API Living Standard"
    type: "standard"
    year: 2025
    url: "https://notifications.spec.whatwg.org/"
    institution: "WHATWG"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Notifications API allows web pages to display system-level desktop notifications, even when the page is in the background. Permission must be granted by the user via `Notification.requestPermission()`.

## Core Explanation

`new Notification('Title', { body: '...', icon: '...' })`. The `notificationclick` event handler (in service workers) enables actions when users interact with notifications. Notifications API is distinct from the Push API — notifications are local display; Push API enables server-initiated triggers.

## Further Reading

- [Notifications API Living Standard](https://notifications.spec.whatwg.org/)
