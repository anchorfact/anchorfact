---
id:"kb-2026-00205"
title:"Fourier Transform"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
primary_sources:
- title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
---

## TL;DR

The Fourier Transform (Joseph Fourier, 1807) decomposes a signal into its constituent frequencies. It is fundamental to signal processing, image compression (JPEG), audio processing (MP3), and MRI reconstruction. FFT (Fast Fourier Transform, Cooley-Tukey 1965) reduces complexity from O(n²) to O(n log n).

## Core Explanation

Continuous FT: F(ω) = ∫ f(t)e^(-iωt) dt. Discrete FT: X_k = Σ x_n e^(-i2πkn/N). FFT is one of the most important algorithms of the 20th century (Strang). Applications: audio equalization (frequency domain filtering), JPEG compression (DCT, a Fourier variant), MRI (k-space to image space), radio astronomy, quantum mechanics.

## Further Reading

- [undefined](undefined)
