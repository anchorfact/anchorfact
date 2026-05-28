---
id: kb-2026-00092
title: WebGPU
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
      The W3C WebGPU specification defines interfaces for web applications to perform rendering and
      computation on graphics processing units.
    source_title: WebGPU
    source_url: https://www.w3.org/TR/webgpu/
    confidence: medium
  - id: fact-computer-science-002
    statement: WGSL is the shading language specified for WebGPU shader programs.
    source_title: WebGPU Shading Language
    source_url: https://www.w3.org/TR/WGSL/
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      MDN documents the browser-facing WebGPU flow through navigator.gpu, requestAdapter(), and
      GPUAdapter.requestDevice().
    source_title: WebGPU API - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    Coverage intentionally narrowed to directly sourced public evidence; adjacent subtopics are not
    exhaustively covered.
disputed_statements: []
primary_sources:
  - title: WebGPU
    type: standard
    year: 2026
    url: https://www.w3.org/TR/webgpu/
    institution: W3C
  - title: WebGPU Shading Language
    type: standard
    year: 2026
    url: https://www.w3.org/TR/WGSL/
    institution: W3C
  - title: WebGPU API - Web APIs | MDN
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
    institution: Mozilla
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR

WebGPU is a web platform API for GPU-backed rendering and general-purpose computation. The public article is now limited to the standard API shape, the WGSL shader language, and the browser-facing request flow documented by W3C and MDN.

## Core Explanation

The safe public summary is that WebGPU gives web applications structured access to GPU devices through adapters, devices, queues, command encoders, and shader modules. WGSL is the shading language specified for WebGPU programs, and browser code begins by requesting an adapter and then a device before submitting GPU work.

## Further Reading

- [WebGPU](https://www.w3.org/TR/webgpu/)
- [WebGPU Shading Language](https://www.w3.org/TR/WGSL/)
- [WebGPU API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Related Articles

- [WebGPU: Next-Generation Web Graphics and Compute API](../webgpu-next-generation-web-graphics-and-compute-api.md)
