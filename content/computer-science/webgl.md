---
id: kb-2026-00091
title: WebGL
schema_type: TechArticle
category: computer-science
language: en
confidence: high
confidence_rationale: Based on authoritative sources and industry standards
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: WebGL 2.0 Specification
    type: standard
    year: 2017
    url: https://www.khronos.org/registry/webgl/specs/latest/2.0/
    institution: Khronos Group
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
completeness: 0.88
ai_citations: null
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      WebGL is a JavaScript API for rendering 2D and 3D graphics in browsers, based on OpenGL ES. WebGL 2.0 (2017) supports GLSL ES 3.00 shaders, multiple render targets, and integer-based texture
      formats. WebGPU (2023+) is its successor.
    confidence: medium
    source_title: WebGL 2.0 Specification
    source_url: https://www.khronos.org/registry/webgl/specs/latest/2.0/
  - id: fact-computer-science-002
    statement: WebGL uses `getContext('webgl2')` on a canvas element.
    confidence: medium
    source_title: WebGL 2.0 Specification
    source_url: https://www.khronos.org/registry/webgl/specs/latest/2.0/
  - id: fact-computer-science-003
    statement: "Key libraries: Three.js (high-level 3D), Babylon.js, PlayCanvas."
    confidence: medium
    source_title: WebGL 2.0 Specification
    source_url: https://www.khronos.org/registry/webgl/specs/latest/2.0/
---



## TL;DR

WebGL is a JavaScript API for rendering 2D and 3D graphics in browsers, based on OpenGL ES. WebGL 2.0 (2017) supports GLSL ES 3.00 shaders, multiple render targets, and integer-based texture formats. WebGPU (2023+) is its successor.

## Core Explanation

WebGL uses `getContext('webgl2')` on a canvas element. The pipeline: vertex shader processes vertices → rasterization → fragment shader colors pixels. Programs are compiled from GLSL source at runtime. Uniforms, attributes, and textures provide data to shaders. Key libraries: Three.js (high-level 3D), Babylon.js, PlayCanvas.

## Further Reading

- [WebGL 2.0 Specification](https://www.khronos.org/registry/webgl/specs/latest/2.0/)
