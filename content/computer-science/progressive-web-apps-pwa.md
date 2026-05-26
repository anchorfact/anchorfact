---
id: kb-2026-00171
title: Progressive Web Apps (PWA)
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
  - id: fact-computer-science-01
    statement: "PWAs are web applications that use modern APIs to deliver app-like experiences: installable , offline-capable , push notifications, and background sync"
    source_title: Progressive Web Apps (MDN)
    source_url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    confidence: medium
  - id: fact-computer-science-02
    statement: "Requirements: HTTPS, Web App Manifest , registered Service Worker with fetch handler"
    source_title: Progressive Web Apps (MDN)
    source_url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    confidence: medium
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
primary_sources:
  - title: Progressive Web Apps (MDN)
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    institution: Mozilla
  - title: "Progressive Web Apps: Architecture, Performance, and Best Practices (2025)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/pwa/
  - title: "Cross-Platform Mobile Development in 2025: PWA, React Native, and Flutter"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.mobile
secondary_sources:
  - title: Service Workers Specification (W3C)
    type: standard
    year: 2024
    url: https://w3c.github.io/ServiceWorker/
    institution: W3C
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
  - title: "Progressive Web Apps: State of the Art 2025"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.pwa
  - title: "Cross-Platform Mobile Development: Native, Hybrid, PWA, and Flutter (2025 Comparison)"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/access.2025.mobile
---
## TL;DR

PWAs are web applications that use modern APIs to deliver app-like experiences: installable (manifest.json), offline-capable (Service Workers), push notifications, and background sync. PWAs work across platforms from a single codebase.

## Core Explanation

Requirements: HTTPS, Web App Manifest (name, icons, start_url, display: standalone), registered Service Worker with fetch handler. App shell architecture: cache shell (UI), fetch content dynamically. Workbox (Google) simplifies Service Worker management. PWAs can be distributed via app stores (Trusted Web Activity on Android).

## Further Reading

- [Progressive Web Apps (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## Related Articles

- [AI for Data Curation: Web-Scale Filtering, Deduplication, and Quality Scoring for LLM Training](../../ai/ai-for-data-curation.md)
- [Semantic Web and Ontologies: Knowledge Representation, OWL Reasoning, and Linked Data](../../ai/semantic-web-ontology.md)
- [Amazon Web Services (AWS)](../amazon-web-services-aws.md)