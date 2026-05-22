---
id:"kb-2026-00205"
title:"Fourier Transform"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"McGraw-Hill"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

The Fourier Transform (Joseph Fourier, 1807) decomposes a signal into its constituent frequencies. It is fundamental to signal processing, image compression (JPEG), audio processing (MP3), and MRI reconstruction. FFT (Fast Fourier Transform, Cooley-Tukey 1965) reduces complexity from O(n²) to O(n log n).

## Core Explanation

Continuous FT: F(ω) = ∫ f(t)e^(-iωt) dt. Discrete FT: X_k = Σ x_n e^(-i2πkn/N). FFT is one of the most important algorithms of the 20th century (Strang). Applications: audio equalization (frequency domain filtering), JPEG compression (DCT, a Fourier variant), MRI (k-space to image space), radio astronomy, quantum mechanics.

## Further Reading

- [undefined](undefined)
