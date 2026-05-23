---
id: "kb-2026-00009"
title: "Diffusion Models"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
confidence_rationale: "Based on DDPM (Ho et al., 2020, 15,000+ citations), Stable Diffusion/LDM (Rombach et al., 2022), and Score-Based SDE (Song et al., 2021), all published at top ML venues (NeurIPS, CVPR)"
last_verified: "2026-05-22"
generation_method: "human_only"
completeness: 0.90
known_gaps:
  - "DDIM, Consistency Models, and other sampling acceleration techniques deserve separate treatment"
related_entities:
  - "entity:generative-ai"
  - "entity:computer-vision"
  - "entity:gan"
primary_sources:
  - title: "Denoising Diffusion Probabilistic Models (DDPM)"
    authors: ["Ho, Jonathan", "Jain, Ajay", "Abbeel, Pieter"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2006.11239"
    url: "https://arxiv.org/abs/2006.11239"
    institution: "UC Berkeley"
    note: "Published at NeurIPS 2020. As of May 2026: 15,000+ citations. The foundational paper that made diffusion models practical for image generation."
  - title: "High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)"
    authors: ["Rombach, Robin", "Blattmann, Andreas", "Lorenz, Dominik", "Esser, Patrick", "Ommer, Björn"]
    type: "academic_paper"
    year: 2022
    doi: "10.48550/arXiv.2112.10752"
    url: "https://arxiv.org/abs/2112.10752"
    institution: "LMU Munich / RunwayML"
    note: "Published at CVPR 2022. Made high-resolution diffusion practical by operating in compressed latent space. Foundation of Stable Diffusion."
  - title: "Score-Based Generative Modeling through Stochastic Differential Equations"
    authors: ["Song, Yang", "Sohl-Dickstein, Jascha", "Kingma, Diederik P.", "Kumar, Abhishek", "Ermon, Stefano", "Poole, Ben"]
    type: "academic_paper"
    year: 2021
    doi: "10.48550/arXiv.2011.13456"
    url: "https://arxiv.org/abs/2011.13456"
    institution: "Stanford University / Google Brain"
    note: "Published at ICLR 2021. Unified DDPM and score-based models under the SDE framework, enabling faster sampling and likelihood computation."
secondary_sources:
  - title: "Sora Technical Report"
    type: "technical_report"
    year: 2024
    url: "https://openai.com/index/sora/"
    institution: "OpenAI"
ai_citations:
  last_citation_check: "2026-05-22"
  - title: "What are Diffusion Models?"
    authors: ["Weng, Lilian"]
    type: "blog_post"
    year: 2021
    url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/"
    institution: "OpenAI"
  - title: "The Annotated Diffusion Model"
    authors: ["Rogozhnikov, Alex"]
    type: "blog_post"
    year: 2022
    url: "https://huggingface.co/blog/annotated-diffusion"
    institution: "Hugging Face"
  - title: "The Annotated Diffusion Model"
    authors: ["Rogozhnikov, Alex"]
    type: "blog_post"
    year: 2022
    url: "https://huggingface.co/blog/annotated-diffusion"
    institution: "Hugging Face"
  - title: "What are Diffusion Models?"
    authors: ["Weng, Lilian"]
    type: "blog_post"
    year: 2021
    url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/"
    institution: "OpenAI"
---

## TL;DR

Diffusion models are generative models that create data (images, video, audio, 3D) by learning to reverse a gradual noise-adding process. Starting from pure random noise, they iteratively denoise toward a coherent output. Popularized by DDPM (Ho et al., 2020, UC Berkeley, 15,000+ citations on Google Scholar as of May 2026) and made practical by Stable Diffusion / Latent Diffusion Models (Rombach et al., 2022), diffusion has surpassed GANs as the dominant paradigm for high-quality image generation and has expanded to video (Sora), audio (AudioLDM), 3D (DreamFusion), and biology (AlphaFold 3).

## Core Explanation

Diffusion models work in two phases:

### Forward Process (Training)

Starting from a real data point x₀ (an image), Gaussian noise is gradually added over T timesteps according to a predefined variance schedule β₁, ..., β_T:

```
q(x_t | x_{t-1}) = N(x_t; √(1-β_t)·x_{t-1}, β_t·I)
```

After T steps (typically T=1000), x_T is pure isotropic Gaussian noise. The model learns to predict the noise that was added at each step ε_θ(x_t, t) — essentially learning to reverse the destruction process:

```
L = E_{x₀,ε,t}[||ε - ε_θ(x_t, t)||²]
```

This is remarkably simple: the training objective is just a noise prediction regression. No adversarial dynamics, no mode collapse — just predicting which Gaussian noise was added at each step.

### Reverse Process (Generation)

Starting from pure noise x_T ~ N(0, I), the model iteratively removes predicted noise:

```
x_{t-1} = (1/√(1-β_t)) · (x_t - (β_t/√(1-ᾱ_t))·ε_θ(x_t, t)) + σ_t·z
```

Over T steps (or fewer using accelerated samplers like DDIM), this converges to a realistic data point. The process is a Markov chain: each step depends only on the previous state and the current timestep embedding.

## Detailed Analysis

### Why Diffusion Superseded GANs

| Property | GANs | Diffusion Models |
|----------|:----:|:----------------:|
| Training stability | Unstable (adversarial game) | Stable (simple regression loss) |
| Mode coverage | Prone to mode collapse | Naturally covers full data distribution |
| Sample diversity | Can be limited | High diversity |
| Quality at scale | Excellent (StyleGAN) | Excellent, scales predictably |
| Training/inference speed | Fast inference, slow training | Fast training, slow inference (mitigated by DDIM, LCM) |
| Controllability | Limited (requires conditional GAN) | Excellent (cross-attention conditioning) |

The training stability advantage is decisive: GANs require careful balancing of generator and discriminator — if either becomes too strong, training collapses. Diffusion models avoid this entirely by framing generation as a denoising problem with a simple regression objective.

### Latent Diffusion Models (Stable Diffusion)

The original DDPM operates in pixel space, which is computationally prohibitive for high resolution. For a 1024×1024×3 image:
- Pixel-space diffusion: 3.1M dimensions per step × 1000 steps = enormous
- Latent diffusion (LDM): compress to 64×64×4 latent space via VAE → 16K dimensions

This 200× compression reduces training time from GPU-weeks to GPU-hours while improving quality. The VAE encoder E maps images to latent codes; diffusion happens entirely in latent space; the VAE decoder D reconstructs the final image. Text conditioning is added via cross-attention with CLIP text embeddings at each U-Net layer.

Stable Diffusion was trained on **LAION-5B**, a dataset of 5.85 billion image-text pairs scraped from the web, and released as open-source in August 2022 by Stability AI, RunwayML, and the CompVis group at LMU Munich. It democratized image generation: previous systems (DALL·E 2) required API access; Stable Diffusion ran on a consumer GPU.

### Major Implementations Timeline

| System | Developer | Release | Key Innovation |
|--------|-----------|:------:|---------------|
| DDPM | Ho et al. (UC Berkeley) | Jun 2020 | Proved diffusion can generate high-quality images |
| DALL·E 2 | OpenAI | Apr 2022 | CLIP-guided diffusion + inpainting |
| Stable Diffusion | Stability AI / CompVis | Aug 2022 | Latent diffusion, open-source, consumer GPU |
| Midjourney | Midjourney Inc. | Jul 2022 | Proprietary aesthetic tuning, Discord-native |
| Imagen | Google | May 2022 | Large frozen T5 text encoders for conditioning |
| DALL·E 3 | OpenAI | Oct 2023 | Captioner-to-image pipeline (GPT-4V integrated) |
| SDXL | Stability AI | Jul 2023 | 2.6B params, improved composition |
| Sora | OpenAI | Feb 2024 | Video diffusion via spacetime patches |
| Stable Diffusion 3 | Stability AI | Feb 2024 | MMDiT architecture (joint image-text transformer) |
| Flux | Black Forest Labs | Aug 2024 | Flow matching, 12B params, state-of-art quality |

### Beyond Images

| Domain | Representative Work | Key Approach |
|--------|-------------------|-------------|
| **Video** | Sora (OpenAI, 2024), Runway Gen-3 | Treats video as 3D grid of spacetime patches |
| **Audio** | AudioLDM (2023), MusicGen (Meta, 2023) | Latent diffusion on mel-spectrograms; text-to-music |
| **3D** | DreamFusion (Google, 2022), Zero123 (2023) | Score Distillation Sampling; multi-view diffusion |
| **Biology** | AlphaFold 3 (DeepMind, 2024) | Diffusion module for protein-ligand structure prediction |
| **Motion** | MDM (2023), MotionDiffuse (2023) | Human motion generation for animation and robotics |

## Further Reading

- [DDPM Paper](https://arxiv.org/abs/2006.11239): Original diffusion models paper (15K+ citations)
- [Stable Diffusion / LDM](https://arxiv.org/abs/2112.10752): Latent diffusion for efficient generation
- [Score-Based SDE](https://arxiv.org/abs/2011.13456): Unified framework for diffusion and score-based models
