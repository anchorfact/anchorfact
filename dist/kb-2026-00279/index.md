---
id:"kb-2026-00279"
title:"Autoencoders"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"
    note: "Chapter 14: Autoencoders — the canonical reference"
secondary_sources:
  - title: "Auto-Encoding Variational Bayes (VAE Paper)"
    authors: ["Kingma, Diederik P.", "Welling, Max"]
    type: "academic_paper"
    year: 2013
    doi: "10.48550/arXiv.1312.6114"
    url: "https://arxiv.org/abs/1312.6114"
    institution: "University of Amsterdam"
    note: "Introduced Variational Autoencoders — 30,000+ citations. Published at ICLR 2014."
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
