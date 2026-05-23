---
id:"latent-diffusion-models"
title:"Diffusion Models in Depth: From DDPM to Stable Diffusion"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
created_date:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
conflict_of_interest:"none_declared"
is_live_document:false
data_period:"static"

atomic_facts:
  - id:"af-latent-diffusion-models-1"
    statement:"Denoising Diffusion Probabilistic Models (DDPM, Ho et al., 2020) formulate generation as iterative denoising: start from pure noise, then predict and remove noise over T=1000 steps, guided by a U-Net trained to predict the noise added at each timestep."
    source_title:"Ho et al., NeurIPS (2020)"
    confidence:"high"
  - id:"af-latent-diffusion-models-2"
    statement:"Latent Diffusion Models (Rombach et al., 2022) shift diffusion to a compressed latent space (autoencoder bottleneck), reducing computation by 10-100x. Stable Diffusion applies this to text-to-image generation, combining a CLIP text encoder with a latent-space U-Net denoiser."
    source_title:"Rombach et al., CVPR (2022)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"Denoising Diffusion Probabilistic Models (DDPM)"
    type:"academic_paper"
    year:2020
    url:"https://arxiv.org/abs/2006.11239"
    institution:"NeurIPS"
  - title:"High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)"
    type:"academic_paper"
    year:2022
    url:"https://arxiv.org/abs/2112.10752"
    institution:"CVPR"

known_gaps:
  - "Diffusion for discrete data (text)"
  - "One-step diffusion distillation for real-time generation"

disputed_statements:
  - statement:"No major disputed statements identified"

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