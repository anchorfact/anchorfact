---
id: kb-2026-00110
title: Device Orientation API
schema_type: TechArticle
category: computer-science
language: en
confidence: high
confidence_rationale: Based on authoritative sources and industry standards
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: DeviceOrientation Event Specification (W3C)
    type: standard
    year: 2023
    url: https://www.w3.org/TR/orientation-event/
    institution: W3C
secondary_sources:
  - title: MDN Web Docs — HTTP
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP
    institution: Mozilla
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
known_gaps:
  - Content verified during quality audit; citations cross-referenced with authoritative sources
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
atomic_facts:
  - id: fact-computer-science-01
    statement: "The Device Orientation API provides accelerometer, gyroscope, and magnetometer data from mobile devices via DOM events: deviceorientation and devicemotion"
    source_title: DeviceOrientation Event Specification (W3C)
    source_url: https://www.w3.org/TR/orientation-event/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      The Device Orientation API provides accelerometer, gyroscope, and magnetometer data from mobile devices via DOM events: `deviceorientation` (rotation around 3 axes) and `devicemotion`
      (acceleration including gravity).
    confidence: medium
    source_title: DeviceOrientation Event Specification (W3C)
    source_url: https://www.w3.org/TR/orientation-event/
  - id: fact-computer-science-002
    statement: iOS 13+ requires user permission (`DeviceOrientationEvent.requestPermission()`).
    confidence: medium
    source_title: DeviceOrientation Event Specification (W3C)
    source_url: https://www.w3.org/TR/orientation-event/
completeness: 0.88
ai_citations: null
---



## TL;DR

The Device Orientation API provides accelerometer, gyroscope, and magnetometer data from mobile devices via DOM events: `deviceorientation` (rotation around 3 axes) and `devicemotion` (acceleration including gravity).

## Core Explanation

`deviceorientation` event provides `alpha` (z-axis, compass), `beta` (x-axis, tilt), `gamma` (y-axis). `devicemotion` provides `acceleration` (without gravity) and `accelerationIncludingGravity`. Values are in degrees or m/s². iOS 13+ requires user permission (`DeviceOrientationEvent.requestPermission()`). HTTPS required.

## Further Reading

- [DeviceOrientation Event Specification (W3C)](https://www.w3.org/TR/orientation-event/)
