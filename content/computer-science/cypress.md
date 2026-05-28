---
id: kb-2026-00179
title: Cypress
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: af-computer-science-cypress-1
    statement: >-
      Cypress is a JavaScript testing tool focused on tests that run in a real browser for modern
      web applications.
    source_title: Why Cypress?
    source_url: https://docs.cypress.io/app/get-started/why-cypress
    confidence: medium
  - id: af-computer-science-cypress-2
    statement: >-
      Cypress retries queries and assertions automatically until they pass or time out, reducing the
      need for fixed waits.
    source_title: Retry-ability
    source_url: https://docs.cypress.io/app/core-concepts/retry-ability
    confidence: medium
  - id: af-computer-science-cypress-3
    statement: >-
      Cypress can observe, stub, and assert network traffic in tests with commands such as
      cy.intercept().
    source_title: Network Requests
    source_url: https://docs.cypress.io/app/guides/network-requests
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    This field is under active research and rapid development; some conclusions may evolve with new
    evidence or technological advances
  - >-
    Certain sub-topics are covered at a general level; specialized edge cases and nuanced
    applications may not be fully addressed
disputed_statements: []
primary_sources:
  - id: ps-cypress-1
    title: Why Cypress?
    type: official_documentation
    year: 2026
    institution: Cypress.io
    url: https://docs.cypress.io/app/get-started/why-cypress
  - id: ps-cypress-2
    title: Retry-ability
    type: official_documentation
    year: 2026
    institution: Cypress.io
    url: https://docs.cypress.io/app/core-concepts/retry-ability
  - id: ps-cypress-3
    title: Network Requests
    type: official_documentation
    year: 2026
    institution: Cypress.io
    url: https://docs.cypress.io/app/guides/network-requests
secondary_sources: []
updated: "2026-05-28"
---




## TL;DR

Cypress is a JavaScript end-to-end testing framework that runs directly in the browser, providing real-time reloading, automatic waiting, and time-travel debugging. It competes with Selenium and Playwright. Cypress runs in the same event loop as the application.

## Core Explanation

Key features: automatic retries and waiting (no `sleep()`), screenshots and videos of test runs, component testing (Cypress 10+, mounts React/Vue components), network stubbing (`cy.intercept()`). No multi-tab or multi-browser support (this is by design — Cypress runs in a single browser instance). Playwright (Microsoft) is the main alternative with multi-browser support.

## Further Reading

- [Cypress Documentation](https://docs.cypress.io/)
