---
id: kb-2026-00110
title: Device Orientation API
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
      The W3C Device Orientation and Motion specification defines events for device orientation and
      motion data.
    source_title: Device Orientation and Motion
    source_url: https://www.w3.org/TR/orientation-event/
    confidence: medium
  - id: fact-computer-science-002
    statement: >-
      MDN documents DeviceOrientationEvent as reporting device orientation values including alpha,
      beta, and gamma.
    source_title: DeviceOrientationEvent - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
    confidence: medium
  - id: fact-computer-science-003
    statement: MDN documents DeviceMotionEvent as exposing acceleration and rotation-rate information.
    source_title: DeviceMotionEvent - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    Coverage intentionally narrowed to directly sourced public evidence; adjacent subtopics are not
    exhaustively covered.
disputed_statements: []
primary_sources:
  - title: Device Orientation and Motion
    type: standard
    year: 2025
    url: https://www.w3.org/TR/orientation-event/
    institution: W3C
  - title: DeviceOrientationEvent - Web APIs | MDN
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
    institution: Mozilla
  - title: DeviceMotionEvent - Web APIs | MDN
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
    institution: Mozilla
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR

The Device Orientation API exposes device orientation and motion information to web pages through events. The repaired version removes platform-specific claims and maps the remaining facts to W3C and MDN references.

## Core Explanation

The API surface is event based. DeviceOrientationEvent reports orientation values such as alpha, beta, and gamma, while DeviceMotionEvent reports acceleration and rotation-rate data. Implementations may apply permission, privacy, and secure-context limits.

## Further Reading

- [Device Orientation and Motion](https://www.w3.org/TR/orientation-event/)
- [DeviceOrientationEvent - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)
- [DeviceMotionEvent - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)

## Related Articles

- [API Gateway](../api-gateway.md)
- [Broadcast Channel API](../broadcast-channel-api.md)
- [Canvas API](../canvas-api.md)
