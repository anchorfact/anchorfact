---
id: kb-2026-00271
title: Generative Adversarial Networks (GAN)
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Generative Adversarial Networks
    authors:
      - Goodfellow, Ian J.
      - Pouget-Abadie, Jean
      - Mirza, Mehdi
      - Xu, Bing
      - Warde-Farley, David
      - Ozair, Sherjil
      - Courville, Aaron
      - Bengio, Yoshua
    type: academic_paper
    year: 2014
    doi: 10.48550/arXiv.1406.2661
    url: https://arxiv.org/abs/1406.2661
    institution: NeurIPS
    note: The original GAN paper. Published at NeurIPS 2014. 50,000+ citations. Introduced the adversarial training framework.
secondary_sources:
  - title: Deep Learning (Goodfellow, Bengio, Courville)
    type: book
    year: 2016
    url: https://www.deeplearningbook.org/
    institution: MIT Press
    note: "Chapter 20: Deep Generative Models — covers GANs, VAEs, and other generative approaches"
completeness: 0.88
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
    confidence: medium
known_gaps:
  - Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
ai_citations:
  - title: "GAN Lab: An Interactive Visualization of GANs"
    authors:
      - Kahng, M.
      - Andrews, N.
      - Kalro, A.
      - Chau, D.H.
    type: interactive
    year: 2018
    url: https://poloclub.github.io/ganlab/
    institution: Georgia Tech
  - title: "GAN Lab: An Interactive Visualization of GANs"
    authors:
      - Kahng, M.
      - Andrews, N.
      - Kalro, A.
      - Chau, D.H.
    type: interactive
    year: 2018
    url: https://poloclub.github.io/ganlab/
    institution: Georgia Tech
atomic_facts:
  - id: fact-ai-001
    statement: >-
      GANs (Goodfellow, 2014) pit two neural networks against each other: Generator creates fake data, Discriminator distinguishes real from fake. Both improve through adversarial training — Generator
      learns to produce increasingly realistic outputs. Used for image generation, style transfer, super-resolution.
    confidence: high
    source_title: Generative Adversarial Networks
    source_url: https://arxiv.org/abs/1406.2661
    source_doi: 10.48550/arXiv.1406.2661
  - id: fact-ai-002
    statement: "Key variants: DCGAN (deep convolutional), StyleGAN (progressive growing, controls style), CycleGAN (unpaired image translation), Pix2Pix (paired)."
    confidence: medium
    source_title: Deep Learning (Goodfellow, Bengio, Courville)
    source_url: https://www.deeplearningbook.org/
  - id: fact-ai-003
    statement: GANs largely superseded by diffusion models (2022+) for image generation, but remain important for other adversarial tasks.
    confidence: high
    source_title: Generative Adversarial Networks
    source_url: https://arxiv.org/abs/1406.2661
    source_doi: 10.48550/arXiv.1406.2661
---


## TL;DR

GANs (Goodfellow, 2014) pit two neural networks against each other: Generator creates fake data, Discriminator distinguishes real from fake. Both improve through adversarial training — Generator learns to produce increasingly realistic outputs. Used for image generation, style transfer, super-resolution.

## Core Explanation

Training instability: if discriminator is too strong, generator learns nothing. Mode collapse: generator produces limited variety. Key variants: DCGAN (deep convolutional), StyleGAN (progressive growing, controls style), CycleGAN (unpaired image translation), Pix2Pix (paired). GANs largely superseded by diffusion models (2022+) for image generation, but remain important for other adversarial tasks.

## Further Reading

- [Generative Adversarial Networks (Goodfellow et al., 2014)](https://arxiv.org/abs/1406.2661)
