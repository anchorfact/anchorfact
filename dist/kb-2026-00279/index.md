---
id:"kb-2026-00279"
title:"Autoencoders"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Deep Learning (Goodfellow, Bengio, Courville)"
    type:"book"
    year:2016
    url:"https://www.deeplearningbook.org/"
    institution:"MIT Press"
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

Autoencoders are unsupervised neural networks that learn compressed representations by reconstructing input: Encoder → compressed latent space → Decoder → reconstruction. They learn the most salient features by forcing data through a bottleneck. Applications: dimensionality reduction, denoising, anomaly detection.

## Core Explanation

Basic autoencoder: input = output, loss = reconstruction error (MSE). Denoising autoencoder: corrupt input (add noise), train to reconstruct clean output — learns robust features. Variational Autoencoder (VAE, Kingma & Welling 2013): probabilistic encoder outputs distribution parameters (μ, σ), enabling generation by sampling latent space. VAE-generated images are smoother but blurrier than GANs.

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
