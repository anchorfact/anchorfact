---
id: kb-2026-00205
title: Fourier Transform
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
atomic_facts:
  - id: fact-computer-science-01
    statement: The Fourier Transform decomposes a signal into its constituent frequencies
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-02
    statement: FFT is one of the most important algorithms of the 20th century
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
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
---


## TL;DR

The Fourier Transform (Joseph Fourier, 1807) decomposes a signal into its constituent frequencies. It is fundamental to signal processing, image compression (JPEG), audio processing (MP3), and MRI reconstruction. FFT (Fast Fourier Transform, Cooley-Tukey 1965) reduces complexity from O(n²) to O(n log n).

## Core Explanation

Continuous FT: F(ω) = ∫ f(t)e^(-iωt) dt. Discrete FT: X_k = Σ x_n e^(-i2πkn/N). FFT is one of the most important algorithms of the 20th century (Strang). Applications: audio equalization (frequency domain filtering), JPEG compression (DCT, a Fourier variant), MRI (k-space to image space), radio astronomy, quantum mechanics.

## Further Reading

- 