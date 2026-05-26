---
id: latent-diffusion-models
title: "Diffusion Models in Depth: From DDPM to Stable Diffusion"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: >-
      Latent Diffusion Models (Rombach et al. 2022, CVPR) perform the diffusion process in a compressed latent space learned by a VAE, dramatically reducing computational cost while enabling
      high-resolution image generation (Stable Diffusion).
    source_title: Rombach, Robin, et al. High-Resolution Image Synthesis with Latent Diffusion Models. CVPR 2022
    source_url: https://arxiv.org/abs/2112.10752
    confidence: high
  - id: f2
    statement: >-
      Denoising Diffusion Probabilistic Models (DDPM, Ho et al. 2020, NeurIPS) established the modern diffusion framework: a forward process gradually adds noise, and a learned reverse process
      denoises to generate samples.
    source_title: Ho, Jonathan, Ajay Jain, and Pieter Abbeel. Denoising Diffusion Probabilistic Models. NeurIPS 2020
    source_url: https://arxiv.org/abs/2006.11239
    confidence: high
  - id: f3
    statement: >-
      Score-based generative modeling (Song et al. 2021, ICLR) unifies diffusion models and score matching via stochastic differential equations, enabling flexible sampling schedules and controllable
      generation.
    source_title: Song, Yang, et al. Score-Based Generative Modeling through Stochastic Differential Equations. ICLR 2021
    source_url: https://arxiv.org/abs/2011.13456
    confidence: high
completeness: 0.9
primary_sources:
  - title: Denoising Diffusion Probabilistic Models (DDPM)
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2006.11239
    institution: NeurIPS
  - title: High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2112.10752
    institution: CVPR
known_gaps:
  - Diffusion for discrete data (text)
  - One-step diffusion distillation for real-time generation
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)
    type: conference_paper
    year: 2022
    authors:
      - Rombach, Robin
      - Blattmann, Andreas
      - Lorenz, Dominik
      - Esser, Patrick
      - Ommer, Björn
    institution: LMU Munich / Stability AI / CVPR
    url: https://arxiv.org/abs/2112.10752
  - title: Denoising Diffusion Probabilistic Models (DDPM — Ho et al.)
    type: conference_paper
    year: 2020
    authors:
      - Ho, Jonathan
      - Jain, Ajay
      - Abbeel, Pieter
    institution: UC Berkeley / NeurIPS
    url: https://arxiv.org/abs/2006.11239
  - title: "A Survey on Generative Diffusion Models: Theory, Applications, and Future Directions"
    type: survey_paper
    year: 2024
    authors:
      - Yang, Ling
      - Zhang, Zhilong
      - Song, Yang
      - et al.
    institution: IEEE TKDE
    url: https://doi.org/10.1109/TKDE.2024.3361474
  - title: Score-Based Generative Modeling through Stochastic Differential Equations
    type: conference_paper
    year: 2021
    authors:
      - Song, Yang
      - Sohl-Dickstein, Jascha
      - Kingma, Diederik P.
      - et al.
    institution: Stanford / Google Brain / ICLR
    url: https://arxiv.org/abs/2011.13456
updated: "2026-05-24"
---
## TL;DR
Diffusion models have replaced GANs as the dominant generative modeling paradigm. By learning to reverse a noise-adding process, they produce state-of-the-art image, video, 3D, and audio generation.

## Core Explanation
Forward process: gradually add Gaussian noise to data over T steps (no learnable parameters). Reverse process: train neural network to predict noise at each step, then remove it — equivalent to learning the score function (gradient of log probability) via score matching. At inference, start from pure noise and iteratively denoise.

## Detailed Analysis
Classifier-free guidance scales the difference between conditional and unconditional predictions to control generation-fidelity tradeoff. DDIM enables deterministic sampling in fewer steps. Latent diffusion runs diffusion in a 1/8-resolution latent space. SDXL (2023) scales to 1024×1024 native resolution.

## Further Reading
- Lilian Weng: What Are Diffusion Models?
- Hugging Face Diffusers Library
- Fast.ai: Diffusion Models from Scratch

## Related Articles

- [Diffusion Models: DDPM, Stable Diffusion, and Score-Based Generative Modeling](../diffusion-models-ddpm-stable-diffusion-and-score-based-generative-modeling.md)
- [AI for Protein Design: Diffusion Models, Sequence Generation, and Functional Optimization](../ai-for-protein-design-diffusion-models-sequence-generation-and-functional-optimization.md)
- [AI for Tabular Data: Synthetic Generation, Diffusion Models, and Privacy-Preserving Structured Data](../ai-for-tabular-data.md)