---
id: "kb-2026-00179"


title: "Cypress"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Cypress Documentation"
    type: "documentation"


    year: 2026
    url: "https://docs.cypress.io/"

    institution: "Cypress.io"
    note: "E2E testing framework: real-time reload, time-travel debugging, automatic waiting, component testing"


secondary_sources:
  - title: "Testing JavaScript Applications"
    authors: ["da Costa, Lucas"]
    type: "book"


    year: 2021
    url: "https://www.manning.com/books/testing-javascript-applications"

    institution: "Manning"
    note: "Comprehensive guide to JS testing patterns including E2E, integration, and unit testing"


atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      Cypress is a JavaScript end-to-end testing framework that runs directly in the browser, providing real-time
      reloading, automatic waiting, and time-travel debugging
    source_title: Testing JavaScript Applications
    source_url: https://www.manning.com/books/testing-javascript-applications
    confidence: high
  
completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations:
---

## TL;DR

Cypress is a JavaScript end-to-end testing framework that runs directly in the browser, providing real-time reloading, automatic waiting, and time-travel debugging. It competes with Selenium and Playwright. Cypress runs in the same event loop as the application.

## Core Explanation

Key features: automatic retries and waiting (no `sleep()`), screenshots and videos of test runs, component testing (Cypress 10+, mounts React/Vue components), network stubbing (`cy.intercept()`). No multi-tab or multi-browser support (this is by design — Cypress runs in a single browser instance). Playwright (Microsoft) is the main alternative with multi-browser support.

## Further Reading

- [Cypress Documentation](https://docs.cypress.io/)
