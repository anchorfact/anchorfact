---
id: accessibility-tree-and-aria-for-ui-agents
title: 'Accessibility Tree and ARIA for UI Agents'
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
  - id: fact-cs-accessibility-tree-and-aria-for-ui-agents-1
    statement: >-
      Chrome DevTools documentation describes inspecting the accessibility tree for a page.
    source_title: Chrome DevTools Accessibility Reference
    source_url: https://developer.chrome.com/docs/devtools/accessibility/reference
    confidence: medium
  - id: fact-cs-accessibility-tree-and-aria-for-ui-agents-2
    statement: >-
      Chrome DevTools Protocol documentation includes an Accessibility domain for exposing the
      accessibility tree.
    source_title: Chrome DevTools Protocol Accessibility Domain
    source_url: https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/
    confidence: medium
  - id: fact-cs-accessibility-tree-and-aria-for-ui-agents-3
    statement: >-
      WAI-ARIA 1.2 defines a way to make web content and web applications more accessible to
      people with disabilities.
    source_title: WAI-ARIA 1.2
    source_url: https://www.w3.org/TR/wai-aria-1.2/
    confidence: medium
completeness: 0.83
known_gaps:
  - UI-agent accessibility evidence depends on browser accessibility mapping, hidden nodes, dynamic ARIA state, focus order, generated labels, shadow DOM, iframes, and whether the automation target matches the user's assistive technology path.
disputed_statements: []
primary_sources:
  - title: Chrome DevTools Accessibility Reference
    type: documentation
    year: 2026
    url: https://developer.chrome.com/docs/devtools/accessibility/reference
    institution: Chrome DevTools
  - title: Chrome DevTools Protocol Accessibility Domain
    type: documentation
    year: 2026
    url: https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/
    institution: Chrome DevTools
  - title: WAI-ARIA 1.2
    type: standard
    year: 2023
    url: https://www.w3.org/TR/wai-aria-1.2/
    institution: W3C
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Accessibility trees give UI agents a semantic view of controls, names, roles, and states that may be more reliable than raw pixels.

## Core Explanation

Agents that inspect web UIs need more than DOM tags. The accessibility tree can expose roles, accessible names, focus state, disabled state, and relationships that affect how users and assistive technologies perceive the page. ARIA can improve or damage that semantic layer depending on whether it is used correctly.

Agents should compare visible UI, DOM structure, and accessibility-tree output before deciding whether a control is reachable or properly labeled.

## Source-Mapped Facts

- Chrome DevTools documentation describes inspecting the accessibility tree for a page. ([source](https://developer.chrome.com/docs/devtools/accessibility/reference))
- Chrome DevTools Protocol documentation includes an Accessibility domain for exposing the accessibility tree. ([source](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/))
- WAI-ARIA 1.2 defines a way to make web content and web applications more accessible to people with disabilities. ([source](https://www.w3.org/TR/wai-aria-1.2/))

## Further Reading

- [Chrome DevTools Accessibility Reference](https://developer.chrome.com/docs/devtools/accessibility/reference)
- [Chrome DevTools Protocol Accessibility Domain](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
