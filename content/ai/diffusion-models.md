---
id: "kb-2026-00009"
title: "Diffusion Models"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
confidence_rationale: "Based on Ho et al. (2020) DDPM and Song et al. (2021) papers"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Denoising Diffusion Probabilistic Models (DDPM)"
    authors: ["Ho, Jonathan", "Jain, Ajay", "Abbeel, Pieter"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2006.11239"
    url: "https://arxiv.org/abs/2006.11239"
  - title: "High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)"
    authors: ["Rombach, Robin", "Blattmann, Andreas", "Lorenz, Dominik", "Esser, Patrick", "Ommer, Björn"]
    type: "academic_paper"
    year: 2022
    doi: "10.48550/arXiv.2112.10752"
    url: "https://arxiv.org/abs/2112.10752"
completeness: 0.85
related_entities:
  - "entity:generative-ai"
  - "entity:computer-vision"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

Diffusion models are a class of generative models that create data (images, audio, video) by learning to reverse a gradual noising process. Starting from pure random noise, they iteratively denoise toward a coherent output. Popularized by DDPM (Ho et al., 2020, over 15,000 citations on Google Scholar as of 2026), diffusion models power major image generation systems including Stable Diffusion, DALL·E 3, Midjourney, and Imagen. They have surpassed GANs as the dominant paradigm for high-quality image generation.

## Core Explanation

Diffusion models work in two phases:

1. **Forward Process (Training)** : Take a real image and gradually add Gaussian noise over T timesteps until it becomes pure noise. The model learns to predict the noise added at each step — essentially learning how data is destroyed.

2. **Reverse Process (Generation)** : Start with pure random noise and iteratively remove predicted noise over T steps. Each step produces a slightly less noisy version, eventually converging to a coherent image.

The key insight is that both processes are Markov chains — each step depends only on the previous one. The training objective is simple: predict the noise that was added. This simplicity, combined with stable training dynamics (unlike GANs), makes diffusion models practical for production.

## Detailed Analysis

### Why Diffusion Superseded GANs

GANs require adversarial training — a generator and discriminator competing, which is notoriously unstable and prone to mode collapse. Diffusion models avoid this entirely:
- **Stable training**: Direct likelihood-based objective, no adversarial dynamics
- **Better mode coverage**: Diffusion naturally covers the full data distribution
- **Higher quality at scale**: Diffusion quality improves predictably with more compute

### Latent Diffusion Models (Stable Diffusion)

The original DDPM operates in pixel space, which is computationally expensive for high-resolution images. Latent Diffusion Models (Rombach et al., 2022), the architecture behind Stable Diffusion, solve this by:

1. Using a VAE to compress images into a lower-dimensional latent space
2. Running the diffusion process in latent space (much cheaper)
3. Adding text conditioning via cross-attention with CLIP text embeddings

This reduced the computational cost by orders of magnitude, enabling consumer-grade GPU image generation. Stable Diffusion was trained on LAION-5B, a dataset of 5 billion image-text pairs, and released as open-source in 2022.

### Major Implementations

| System | Developer | Key Innovation | Year |
|--------|-----------|---------------|:----:|
| DALL·E 2 | OpenAI | CLIP-guided diffusion | 2022 |
| Stable Diffusion | Stability AI / CompVis | Latent diffusion, open-source | 2022 |
| Midjourney | Midjourney Inc. | Proprietary training, aesthetic tuning | 2022 |
| Imagen | Google | Large frozen text encoders (T5) | 2022 |
| DALL·E 3 | OpenAI | Captioner-to-image pipeline | 2023 |
| Sora | OpenAI | Video diffusion (spacetime patches) | 2024 |

### Beyond Images

Diffusion models have expanded beyond image generation:
- **Video**: Sora (OpenAI, 2024), Runway Gen-2 — generate temporally coherent video
- **Audio**: AudioLDM, MusicGen — text-to-audio generation
- **3D**: DreamFusion, Zero123 — text-to-3D generation
- **Biology**: AlphaFold 3 uses a diffusion module for protein structure prediction
- **Motion**: Human motion generation, robot trajectory planning

## Further Reading

- [DDPM Paper](https://arxiv.org/abs/2006.11239): Original diffusion models paper
- [Stable Diffusion Paper](https://arxiv.org/abs/2112.10752): Latent diffusion for efficient image generation
- [Lilian Weng's Diffusion Blog](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/): Excellent technical overview
