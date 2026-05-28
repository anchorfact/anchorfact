---
id: kb-2026-00109
title: Navigator API
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
  - id: fact-computer-science-navigator-api-001
    statement: >-
      The Navigator interface represents the state and identity of the user agent and is retrieved through
      window.navigator.
    source_title: Navigator - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
    confidence: medium
  - id: fact-computer-science-navigator-api-002
    statement: The HTML Standard defines the Navigator object as part of system state and capabilities exposed to scripts.
    source_title: HTML Standard - The Navigator object
    source_url: https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object
    confidence: medium
  - id: fact-computer-science-navigator-api-003
    statement: >-
      The navigator.geolocation property returns a Geolocation object that allows web content to request device location
      in secure contexts.
    source_title: "Navigator: geolocation property - Web APIs | MDN"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: HTML Standard - The Navigator object
    type: standard
    year: 2026
    url: https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object
    institution: WHATWG
  - title: Navigator - Web APIs | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
    institution: Mozilla
  - title: "Navigator: geolocation property - Web APIs | MDN"
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
    institution: Mozilla
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

The Navigator API exposes browser and device state through `window.navigator`. This repair removes duplicated facts and keeps the article to WHATWG and MDN references.

## Core Explanation

Navigator is a host object for user-agent identity, state, and selected capabilities. Browser APIs such as geolocation, clipboard, and media devices hang off this object only when the platform and permissions allow them.

## Further Reading

- [HTML Standard - The Navigator object](https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object)
- [Navigator - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
- [Navigator: geolocation property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
