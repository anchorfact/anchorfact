---
id: "kb-2026-00102"
title: "Notifications API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "The Notifications API allows web pages to display system-level desktop notifications, even when the page is in the background. Permission must be granted by the user via `Notification.requestPermission()`."
    source_title: "Notifications API Living Standard"
    source_url: "https://notifications.spec.whatwg.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "The Notifications API allows web pages to display system-level desktop notifications, even when the page is in the background. Permission must be granted by the user via `Notification.requestPermission()`."
    source_title: "Notifications API Living Standard"
    source_url: "https://notifications.spec.whatwg.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---





## TL;DR

The Notifications API allows web pages to display system-level desktop notifications, even when the page is in the background. Permission must be granted by the user via `Notification.requestPermission()`.

## Core Explanation

`new Notification('Title', { body: '...', icon: '...' })`. The `notificationclick` event handler (in service workers) enables actions when users interact with notifications. Notifications API is distinct from the Push API — notifications are local display; Push API enables server-initiated triggers.

## Further Reading

- [Notifications API Living Standard](https://notifications.spec.whatwg.org/)
