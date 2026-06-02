---
id: dom-locators-and-accessible-names-for-ui-agents
title: 'DOM Locators and Accessible Names for UI Agents'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-dom-locators-and-accessible-names-for-ui-agents-1
    statement: >-
      Playwright documentation says role locators follow W3C specifications for ARIA role, ARIA
      attributes, and accessible name.
    source_title: Playwright Locators
    source_url: https://playwright.dev/docs/locators
    confidence: medium
  - id: fact-cs-dom-locators-and-accessible-names-for-ui-agents-2
    statement: >-
      W3C Accessible Name and Description Computation describes how user agents determine names and
      descriptions of accessible objects from web content.
    source_title: W3C Accessible Name and Description Computation
    source_url: https://www.w3.org/TR/accname-1.2/
    confidence: medium
  - id: fact-cs-dom-locators-and-accessible-names-for-ui-agents-3
    statement: >-
      WAI-ARIA 1.2 defines roles, states, and properties used to expose accessibility semantics for
      user interface objects.
    source_title: WAI-ARIA 1.2
    source_url: https://www.w3.org/TR/wai-aria-1.2/
    confidence: medium
completeness: 0.83
known_gaps:
  - Locator stability depends on rendered text, localization, shadow DOM, frames, hidden elements, dynamic IDs, accessibility tree timing, and whether the target UI follows semantic HTML and ARIA rules.
disputed_statements: []
primary_sources:
  - title: Playwright Locators
    type: documentation
    year: 2026
    url: https://playwright.dev/docs/locators
    institution: Microsoft Playwright
  - title: W3C Accessible Name and Description Computation
    type: standard
    year: 2026
    url: https://www.w3.org/TR/accname-1.2/
    institution: W3C
  - title: WAI-ARIA 1.2
    type: standard
    year: 2026
    url: https://www.w3.org/TR/wai-aria-1.2/
    institution: W3C
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

UI agents should prefer semantic locators such as role plus accessible name when the page exposes stable accessibility semantics.

## Core Explanation

DOM selectors are brittle when they depend on generated class names or incidental layout. Accessible locators connect the agent's action to the same role and label model that browsers expose to assistive technologies, which makes automation closer to how a user would identify a control.

Agents should still capture fallback evidence: DOM path, frame, shadow root, visible text, role, accessible name, and whether the element is hidden or disabled. If the accessible name is unstable because of localization or missing labels, the agent should report that as a UI quality issue rather than guessing a selector.

## Source-Mapped Facts

- Playwright documentation says role locators follow W3C specifications for ARIA role, ARIA attributes, and accessible name. ([source](https://playwright.dev/docs/locators))
- W3C Accessible Name and Description Computation describes how user agents determine names and descriptions of accessible objects from web content. ([source](https://www.w3.org/TR/accname-1.2/))
- WAI-ARIA 1.2 defines roles, states, and properties used to expose accessibility semantics for user interface objects. ([source](https://www.w3.org/TR/wai-aria-1.2/))

## Further Reading

- [Playwright Locators](https://playwright.dev/docs/locators)
- [W3C Accessible Name and Description Computation](https://www.w3.org/TR/accname-1.2/)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
