---
id: "kb-2026-00092"
title: "WebGPU"
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
  - title: "WebGPU (W3C Working Draft)"
    type: "standard"
    year: 2025
    url: "https://www.w3.org/TR/webgpu/"
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

WebGPU is the next-generation graphics and compute API for the web, succeeding WebGL. Based on modern GPU APIs (Vulkan, Metal, Direct3D 12), it provides lower-level access for better performance, compute shaders, and explicit resource management.

## Core Explanation

WebGPU uses `navigator.gpu.requestAdapter()` and separates logical device from physical GPU. It introduces: compute shaders (GPU parallel computation beyond graphics), bind groups (explicit resource binding), render bundles (pre-recorded command lists), and WGSL shading language (replacing GLSL). Browser support: Chrome 113+, Edge 113+, Firefox Nightly, Safari Technology Preview.

## Further Reading

- [WebGPU (W3C Working Draft)](https://www.w3.org/TR/webgpu/)
