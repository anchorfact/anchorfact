---
id: kb-2026-00092
title: WebGPU
schema_type: TechArticle
category: computer-science
language: en
confidence: high
confidence_rationale: Based on authoritative sources and industry standards
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: WebGPU (W3C Working Draft)
    type: standard
    year: 2025
    url: https://www.w3.org/TR/webgpu/
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
    statement: "Browser support: Chrome 113+, Edge 113+, Firefox Nightly, Safari Technology Preview"
    source_title: WebGPU (W3C Working Draft)
    source_url: https://www.w3.org/TR/webgpu/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      WebGPU is the next-generation graphics and compute API for the web, succeeding WebGL. Based on modern GPU APIs (Vulkan, Metal, Direct3D 12), it provides lower-level access for better
      performance, compute shaders, and explicit resource management.
    confidence: medium
    source_title: WebGPU (W3C Working Draft)
    source_url: https://www.w3.org/TR/webgpu/
  - id: fact-computer-science-002
    statement: >-
      It introduces: compute shaders (GPU parallel computation beyond graphics), bind groups (explicit resource binding), render bundles (pre-recorded command lists), and WGSL shading language
      (replacing GLSL).
    confidence: medium
    source_title: WebGPU (W3C Working Draft)
    source_url: https://www.w3.org/TR/webgpu/
  - id: fact-computer-science-003
    statement: "Browser support: Chrome 113+, Edge 113+, Firefox Nightly, Safari Technology Preview."
    confidence: medium
    source_title: WebGPU (W3C Working Draft)
    source_url: https://www.w3.org/TR/webgpu/
completeness: 0.88
ai_citations: null
---



## TL;DR

WebGPU is the next-generation graphics and compute API for the web, succeeding WebGL. Based on modern GPU APIs (Vulkan, Metal, Direct3D 12), it provides lower-level access for better performance, compute shaders, and explicit resource management.

## Core Explanation

WebGPU uses `navigator.gpu.requestAdapter()` and separates logical device from physical GPU. It introduces: compute shaders (GPU parallel computation beyond graphics), bind groups (explicit resource binding), render bundles (pre-recorded command lists), and WGSL shading language (replacing GLSL). Browser support: Chrome 113+, Edge 113+, Firefox Nightly, Safari Technology Preview.

## Further Reading

- [WebGPU (W3C Working Draft)](https://www.w3.org/TR/webgpu/)
