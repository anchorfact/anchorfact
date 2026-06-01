---
id: "kb-2026-00001"
title: "Diffusion Models: DDPM, Stable Diffusion, and Score-Based Generative Modeling"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "medium"
last_verified: "2026-06-01"
created_date: "2026-05-26"
updated: "2026-06-01"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-diffusion-001"
    statement: "Denoising Diffusion Probabilistic Models train a model to reverse a gradual noising process."
    source_title: "Denoising Diffusion Probabilistic Models"
    source_url: "https://arxiv.org/abs/2006.11239"
    confidence: "medium"
  - id: "fact-ai-diffusion-002"
    statement: "The DDPM paper connects diffusion probabilistic models with denoising score matching and Langevin dynamics."
    source_title: "Denoising Diffusion Probabilistic Models"
    source_url: "https://arxiv.org/abs/2006.11239"
    confidence: "medium"
  - id: "fact-ai-diffusion-003"
    statement: "Score-Based Generative Modeling through Stochastic Differential Equations presents an SDE that transforms a data distribution to a prior by injecting noise and a reverse-time SDE that removes noise."
    source_title: "Score-Based Generative Modeling through Stochastic Differential Equations"
    source_url: "https://arxiv.org/abs/2011.13456"
    confidence: "medium"
  - id: "fact-ai-diffusion-004"
    statement: "High-Resolution Image Synthesis with Latent Diffusion Models performs diffusion in the latent space of pretrained autoencoders."
    source_title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    source_url: "https://arxiv.org/abs/2112.10752"
    confidence: "medium"
  - id: "fact-ai-diffusion-005"
    statement: "The latent diffusion paper uses cross-attention layers to condition diffusion models on inputs such as text or bounding boxes."
    source_title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    source_url: "https://arxiv.org/abs/2112.10752"
    confidence: "medium"

completeness: 0.82
known_gaps:
  - "This article covers foundational image-generation diffusion papers; video diffusion adds temporal modeling and should be treated in a separate source-mapped article."
  - "Implementation details such as samplers, schedulers, guidance, and model serving are intentionally out of scope."
disputed_statements: []
primary_sources:
  - title: "Denoising Diffusion Probabilistic Models"
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/2006.11239"
    institution: "arXiv"
  - title: "Score-Based Generative Modeling through Stochastic Differential Equations"
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/2011.13456"
    institution: "arXiv"
  - title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    type: "conference_paper"
    year: 2022
    url: "https://arxiv.org/abs/2112.10752"
    institution: "CVPR"
secondary_sources: []
---

## TL;DR

Diffusion models generate data by learning how to reverse a noise-adding process. DDPMs made the denoising formulation influential, score-based SDEs gave a continuous-time view, and latent diffusion moved diffusion into a compressed latent space that made high-resolution conditioned generation more practical.

## Core Explanation

The core idea is to corrupt training examples with noise and train a model to move in the reverse direction. During generation, the model starts from noise and repeatedly denoises toward a sample. This framing is central to modern image and video generation systems, although video generation adds additional temporal consistency and motion constraints beyond the image-only foundations covered here.

Stable Diffusion-style systems are commonly explained through latent diffusion: instead of running the denoising process directly in pixel space, the model works in a learned latent representation and can be conditioned by text through cross-attention.

## Source-Mapped Facts

- Denoising Diffusion Probabilistic Models train a model to reverse a gradual noising process. ([source](https://arxiv.org/abs/2006.11239))
- The DDPM paper connects diffusion probabilistic models with denoising score matching and Langevin dynamics. ([source](https://arxiv.org/abs/2006.11239))
- Score-Based Generative Modeling through Stochastic Differential Equations presents an SDE that transforms a data distribution to a prior by injecting noise and a reverse-time SDE that removes noise. ([source](https://arxiv.org/abs/2011.13456))
- High-Resolution Image Synthesis with Latent Diffusion Models performs diffusion in the latent space of pretrained autoencoders. ([source](https://arxiv.org/abs/2112.10752))
- The latent diffusion paper uses cross-attention layers to condition diffusion models on inputs such as text or bounding boxes. ([source](https://arxiv.org/abs/2112.10752))

## Why This Matters for Video Generation

Video generation systems build on the same denoising intuition but must also preserve motion, identity, scene consistency, and timing. For practitioners, the operational lesson is to separate the foundation from the product surface: diffusion explains the generative mechanism, while video quality depends on temporal architecture, conditioning, data, inference strategy, and evaluation.

## Further Reading

- [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
- [Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456)
- [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)

## Related Articles

- [Diffusion Models in Depth: From DDPM to Stable Diffusion](../latent-diffusion-models.md)
- [AI Art and Creativity: Generative Models and Authorship](../ai-art-and-creativity.md)
- [3D Human Modeling: Parametric Body Models, Mesh Recovery, and Digital Avatars](../3d-human-modeling.md)
