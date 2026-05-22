---
id:"kb-2026-00179"
title:"Cypress"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Cypress Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.cypress.io/"
    institution:"Cypress.io"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "React Documentation"
    type: "documentation"
    year: 2026
    url: "https://react.dev/reference/react"
    institution: "Meta"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Cypress is a JavaScript end-to-end testing framework that runs directly in the browser, providing real-time reloading, automatic waiting, and time-travel debugging. It competes with Selenium and Playwright. Cypress runs in the same event loop as the application.

## Core Explanation

Key features: automatic retries and waiting (no `sleep()`), screenshots and videos of test runs, component testing (Cypress 10+, mounts React/Vue components), network stubbing (`cy.intercept()`). No multi-tab or multi-browser support (this is by design — Cypress runs in a single browser instance). Playwright (Microsoft) is the main alternative with multi-browser support.

## Further Reading

- [Cypress Documentation](https://docs.cypress.io/)
