---
id:"kb-2026-00271"
title:"Generative Adversarial Networks (GAN)"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Generative Adversarial Networks"
    authors: ["Goodfellow, Ian J.", "Pouget-Abadie, Jean", "Mirza, Mehdi", "Xu, Bing", "Warde-Farley, David", "Ozair, Sherjil", "Courville, Aaron", "Bengio, Yoshua"]
    type: "academic_paper"
    year: 2014
    doi: "10.48550/arXiv.1406.2661"
    url: "https://arxiv.org/abs/1406.2661"
    institution: "NeurIPS"
    note: "The original GAN paper. Published at NeurIPS 2014. 50,000+ citations. Introduced the adversarial training framework."
secondary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"
    note: "Chapter 20: Deep Generative Models — covers GANs, VAEs, and other generative approaches"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
  - title: "GAN Lab: An Interactive Visualization of GANs"
    authors: ["Kahng, M.", "Andrews, N.", "Kalro, A.", "Chau, D.H."]
    type: "interactive"
    year: 2018
    url: "https://poloclub.github.io/ganlab/"
    institution: "Georgia Tech"
  - title: "GAN Lab: An Interactive Visualization of GANs"
    authors: ["Kahng, M.", "Andrews, N.", "Kalro, A.", "Chau, D.H."]
    type: "interactive"
    year: 2018
    url: "https://poloclub.github.io/ganlab/"
    institution: "Georgia Tech"
---

## TL;DR

GANs (Goodfellow, 2014) pit two neural networks against each other: Generator creates fake data, Discriminator distinguishes real from fake. Both improve through adversarial training — Generator learns to produce increasingly realistic outputs. Used for image generation, style transfer, super-resolution.

## Core Explanation

Training instability: if discriminator is too strong, generator learns nothing. Mode collapse: generator produces limited variety. Key variants: DCGAN (deep convolutional), StyleGAN (progressive growing, controls style), CycleGAN (unpaired image translation), Pix2Pix (paired). GANs largely superseded by diffusion models (2022+) for image generation, but remain important for other adversarial tasks.

## Further Reading

- [Generative Adversarial Networks (Goodfellow et al., 2014)](https://arxiv.org/abs/1406.2661)
