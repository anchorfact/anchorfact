---
id: latent-diffusion-models
title: "Diffusion Models in Depth: From DDPM to Stable Diffusion"
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-latent-diffusion-1
    statement: DDPMs train denoising models through a diffusion process for image generation.
    source_title: Denoising Diffusion Probabilistic Models
    source_url: https://arxiv.org/abs/2006.11239
    confidence: medium
  - id: fact-latent-diffusion-2
    statement: >-
      Latent diffusion models apply diffusion in the latent space of pretrained autoencoders to
      reduce computational cost.
    source_title: High-Resolution Image Synthesis with Latent Diffusion Models
    source_url: https://arxiv.org/abs/2112.10752
    confidence: medium
  - id: fact-latent-diffusion-3
    statement: >-
      The Stable Diffusion v1 model card documents a latent text-to-image diffusion model released
      with public weights.
    source_title: Stable Diffusion v1-4 Model Card
    source_url: https://huggingface.co/CompVis/stable-diffusion-v1-4
    confidence: medium
completeness: 0.9
primary_sources:
  - title: Denoising Diffusion Probabilistic Models
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2006.11239
    institution: arXiv
  - title: High-Resolution Image Synthesis with Latent Diffusion Models
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2112.10752
    institution: CVPR / arXiv
  - title: Stable Diffusion v1-4 Model Card
    type: industry_whitepaper
    year: 2022
    url: https://huggingface.co/CompVis/stable-diffusion-v1-4
    institution: CompVis / Hugging Face
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Latent diffusion models build on denoising diffusion and run image generation in compressed latent spaces. This repair maps DDPM, LDM, and Stable Diffusion claims to direct sources.

## Core Explanation

The previous entry had weak coverage. This version keeps three model-history facts linked to primary AI papers and model documentation.

## Further Reading

- [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
- [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
- [Stable Diffusion v1-4 Model Card](https://huggingface.co/CompVis/stable-diffusion-v1-4)
