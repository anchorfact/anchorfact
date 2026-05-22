---
id: "kb-2026-00090"
title: "Canvas API"
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
  - title: "HTML Canvas 2D Context (W3C)"
    type: "standard"
    year: 2024
    url: "https://html.spec.whatwg.org/multipage/canvas.html"
    institution: "WHATWG"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Canvas API provides a 2D drawing context (`getContext('2d')`) for programmatically rendering graphics, text, and images onto an HTML `<canvas>` element. It supports paths, rectangles, arcs, images, gradients, and pixel manipulation.

## Core Explanation

Key methods: `fillRect()`, `strokeRect()`, `arc()`, `drawImage()`, `fillText()`. `getImageData()` returns raw pixel data (RGBA array) for image processing. Transformations use `translate()`, `rotate()`, `scale()`. For 3D rendering, use WebGL context (`getContext('webgl2')`) instead. Canvas is immediate-mode — after drawing, the shapes are just pixels, not objects.

## Further Reading

- [HTML Canvas 2D Context (W3C)](https://html.spec.whatwg.org/multipage/canvas.html)
