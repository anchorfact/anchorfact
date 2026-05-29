---
id: kb-2026-00009
title: Diffusion Models
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-29'
created_date: '2026-05-22'
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-diffusion-1
    statement: Denoising Diffusion Probabilistic Models train a model to reverse a gradual noising process and demonstrated high-quality image synthesis with that approach.
    source_title: Denoising Diffusion Probabilistic Models
    source_url: https://arxiv.org/abs/2006.11239
    source_doi: 10.48550/arXiv.2006.11239
    confidence: medium
  - id: fact-ai-diffusion-2
    statement: Latent Diffusion Models apply diffusion in a compressed latent space, reducing the computational cost of high-resolution image synthesis while retaining generation quality.
    source_title: High-Resolution Image Synthesis with Latent Diffusion Models
    source_url: https://arxiv.org/abs/2112.10752
    source_doi: 10.48550/arXiv.2112.10752
    confidence: medium
  - id: fact-ai-diffusion-3
    statement: Score-Based Generative Modeling through Stochastic Differential Equations provides a continuous-time framework that connects score-based generative models and diffusion processes.
    source_title: Score-Based Generative Modeling through Stochastic Differential Equations
    source_url: https://arxiv.org/abs/2011.13456
    source_doi: 10.48550/arXiv.2011.13456
    confidence: medium
completeness: 0.84
known_gaps:
  - Sampling acceleration, consistency models, and product-specific image systems deserve separate entries.
  - This article is about the model family, not current image-generator quality rankings.
disputed_statements: []
primary_sources:
  - title: Denoising Diffusion Probabilistic Models
    authors:
      - Ho, Jonathan
      - Jain, Ajay
      - Abbeel, Pieter
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2006.11239
    doi: 10.48550/arXiv.2006.11239
    institution: UC Berkeley
  - title: High-Resolution Image Synthesis with Latent Diffusion Models
    authors:
      - Rombach, Robin
      - Blattmann, Andreas
      - Lorenz, Dominik
      - Esser, Patrick
      - Ommer, Bjorn
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2112.10752
    doi: 10.48550/arXiv.2112.10752
    institution: LMU Munich / RunwayML
  - title: Score-Based Generative Modeling through Stochastic Differential Equations
    authors:
      - Song, Yang
      - Sohl-Dickstein, Jascha
      - Kingma, Diederik P.
      - Kumar, Abhishek
      - Ermon, Stefano
      - Poole, Ben
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2011.13456
    doi: 10.48550/arXiv.2011.13456
    institution: Stanford University / Google Brain
---

## TL;DR

Diffusion models generate data by learning to reverse a noising process. The central idea is to corrupt training examples with noise, then train a model to denoise step by step. Later variants made the approach practical for high-resolution generation by moving the process into latent spaces or by framing it with score-based stochastic differential equations.

## Core Claims

DDPM made diffusion practical as a generative-model recipe: add noise during training, learn the reverse process, then generate from noise by iteratively denoising.

Latent diffusion changes the operating space. Instead of running every denoising step directly over pixels, it works over compressed latent representations and then decodes the final latent back into an image.

Score-based SDE work gives a broader mathematical view of the family, connecting diffusion-like sampling with score functions and continuous-time stochastic processes.

## Citation Boundaries

Use this article for stable model-family facts. Do not use it as evidence for the current best image, video, audio, or 3D generation system; those comparisons change quickly and require current evaluations.

## Further Reading

- [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
- [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
- [Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456)
