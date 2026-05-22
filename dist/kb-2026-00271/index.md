---
id:"kb-2026-00271"
title:"Generative Adversarial Networks (GAN)"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Generative Adversarial Networks (Goodfellow et al., 2014)"
    type:"paper"
    year:2014
    url:"https://arxiv.org/abs/1406.2661"
    institution:"NeurIPS"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

GANs (Goodfellow, 2014) pit two neural networks against each other: Generator creates fake data, Discriminator distinguishes real from fake. Both improve through adversarial training — Generator learns to produce increasingly realistic outputs. Used for image generation, style transfer, super-resolution.

## Core Explanation

Training instability: if discriminator is too strong, generator learns nothing. Mode collapse: generator produces limited variety. Key variants: DCGAN (deep convolutional), StyleGAN (progressive growing, controls style), CycleGAN (unpaired image translation), Pix2Pix (paired). GANs largely superseded by diffusion models (2022+) for image generation, but remain important for other adversarial tasks.

## Further Reading

- [Generative Adversarial Networks (Goodfellow et al., 2014)](https://arxiv.org/abs/1406.2661)
