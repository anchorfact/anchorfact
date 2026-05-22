---
id: "kb-2026-00110"
title: "Device Orientation API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "DeviceOrientation Event Specification (W3C)"
    type: "standard"
    year: 2023
    url: "https://www.w3.org/TR/orientation-event/"
    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Device Orientation API provides accelerometer, gyroscope, and magnetometer data from mobile devices via DOM events: `deviceorientation` (rotation around 3 axes) and `devicemotion` (acceleration including gravity).

## Core Explanation

`deviceorientation` event provides `alpha` (z-axis, compass), `beta` (x-axis, tilt), `gamma` (y-axis). `devicemotion` provides `acceleration` (without gravity) and `accelerationIncludingGravity`. Values are in degrees or m/s². iOS 13+ requires user permission (`DeviceOrientationEvent.requestPermission()`). HTTPS required.

## Further Reading

- [DeviceOrientation Event Specification (W3C)](https://www.w3.org/TR/orientation-event/)
