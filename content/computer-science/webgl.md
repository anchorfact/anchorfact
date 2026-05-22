---
id: "kb-2026-00091"
title: "WebGL"
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
  - title: "WebGL 2.0 Specification"
    type: "standard"
    year: 2017
    url: "https://www.khronos.org/registry/webgl/specs/latest/2.0/"
    institution: "Khronos Group"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

WebGL is a JavaScript API for rendering 2D and 3D graphics in browsers, based on OpenGL ES. WebGL 2.0 (2017) supports GLSL ES 3.00 shaders, multiple render targets, and integer-based texture formats. WebGPU (2023+) is its successor.

## Core Explanation

WebGL uses `getContext('webgl2')` on a canvas element. The pipeline: vertex shader processes vertices → rasterization → fragment shader colors pixels. Programs are compiled from GLSL source at runtime. Uniforms, attributes, and textures provide data to shaders. Key libraries: Three.js (high-level 3D), Babylon.js, PlayCanvas.

## Further Reading

- [WebGL 2.0 Specification](https://www.khronos.org/registry/webgl/specs/latest/2.0/)
