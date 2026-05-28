---
id: kb-2026-00106
title: Pointer Lock API
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      MDN describes the Pointer Lock API as providing access to raw mouse movement and locking the
      pointer to a target.
    source_title: Pointer Lock API - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
    confidence: medium
  - id: fact-computer-science-002
    statement: MDN documents requestPointerLock() as the element method used to request pointer lock.
    source_title: 'Element: requestPointerLock() method - Web APIs | MDN'
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      The W3C Pointer Lock 2.0 specification defines pointer lock state and pointerlockchange
      behavior.
    source_title: Pointer Lock 2.0
    source_url: https://www.w3.org/TR/pointerlock-2/
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    Coverage intentionally narrowed to directly sourced public evidence; adjacent subtopics are not
    exhaustively covered.
disputed_statements: []
primary_sources:
  - title: Pointer Lock API - Web APIs | MDN
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
    institution: Mozilla
  - title: 'Element: requestPointerLock() method - Web APIs | MDN'
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock
    institution: Mozilla
  - title: Pointer Lock 2.0
    type: standard
    year: 2024
    url: https://www.w3.org/TR/pointerlock-2/
    institution: W3C
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR

The Pointer Lock API lets a web page capture mouse movement through a target element for experiences such as 3D navigation. This repair removes broad claims and relies on MDN and W3C definitions.

## Core Explanation

Pointer lock differs from ordinary pointer events because it can hide the cursor and continue reporting movement deltas without screen-edge limits. The API is requested from an element and reports state through document properties and events.

## Further Reading

- [Pointer Lock API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)
- [Element: requestPointerLock() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock)
- [Pointer Lock 2.0](https://www.w3.org/TR/pointerlock-2/)

## Related Articles

- [API Gateway](../api-gateway.md)
- [Broadcast Channel API](../broadcast-channel-api.md)
- [Canvas API](../canvas-api.md)
