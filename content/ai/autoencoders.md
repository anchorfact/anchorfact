---
atomic_facts:
  - id: f1
    statement: >-
      Variational Autoencoders (Kingma & Welling 2014) learn a probabilistic latent space by maximizing the Evidence Lower Bound (ELBO), enabling both reconstruction and generation from continuous
      latent representations.
    source_title: Kingma, Diederik P., and Max Welling. Auto-Encoding Variational Bayes. ICLR 2014
    source_url: https://arxiv.org/abs/1312.6114
    confidence: high
  - id: f2
    statement: Hinton & Salakhutdinov (2006, Science) demonstrated that deep autoencoders could learn low-dimensional representations by pretraining layer by layer, sparking the deep learning renaissance.
    source_title: Hinton, Geoffrey E., and Ruslan R. Salakhutdinov. Reducing the Dimensionality of Data with Neural Networks. Science 313(5786):504-507, 2006
    source_url: https://doi.org/10.1126/science.1127647
    confidence: high
  - id: f3
    statement: Denoising autoencoders (Vincent et al. 2008) learn robust representations by reconstructing clean inputs from corrupted versions, forcing the model to capture the underlying data manifold.
    source_title: Vincent, Pascal, et al. Extracting and Composing Robust Features with Denoising Autoencoders. ICML 2008
    source_url: https://doi.org/10.1145/1390156.1390294
    confidence: high
category: ai
completeness: 0.88
confidence: high
conflict_of_interest: none_declared
created_date: "2026-05-22"
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: human_only
id: kb-2026-00279
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Kingma, Diederik P.
      - Welling, Max
    institution: University of Amsterdam / ICLR
    title: Auto-Encoding Variational Bayes (VAE — Kingma & Welling)
    type: conference_paper
    url: https://arxiv.org/abs/1312.6114
    year: 2014
  - authors:
      - Hinton, Geoffrey E.
      - Salakhutdinov, Ruslan R.
    institution: University of Toronto / Science
    title: Reducing the Dimensionality of Data with Neural Networks (Hinton & Salakhutdinov — Autoencoder Breakthrough)
    type: journal_article
    url: https://doi.org/10.1126/science.1127647
    year: 2006
  - authors:
      - Goodfellow, Ian
      - Bengio, Yoshua
      - Courville, Aaron
    institution: MIT Press
    title: Deep Learning (Goodfellow, Bengio, Courville — Chapter 14 Autoencoders)
    type: textbook
    url: https://www.deeplearningbook.org/contents/autoencoders.html
    year: 2016
schema_type: TechArticle
secondary_sources:
  - authors:
      - Kingma, Diederik P.
      - Welling, Max
    doi: 10.48550/arXiv.1312.6114
    institution: University of Amsterdam
    title: Auto-Encoding Variational Bayes (VAE Paper)
    type: academic_paper
    url: https://arxiv.org/abs/1312.6114
    year: 2013
  - authors:
      - Hinton
      - Salakhutdinov
    institution: Science / University of Toronto
    title: Reducing Dimensionality with Neural Networks (Hinton & Salakhutdinov, 2006)
    type: academic_paper
    url: https://www.science.org/doi/10.1126/science.1127647
    year: 2006
  - authors:
      - Kingma
      - Welling
    institution: ICLR / University of Amsterdam
    title: Auto-Encoding Variational Bayes (Kingma & Welling, 2014)
    type: academic_paper
    url: https://arxiv.org/abs/1312.6114
    year: 2014
title: Autoencoders
updated: "2026-05-24"
---
## TL;DR

Autoencoders are unsupervised neural networks that learn compressed representations by reconstructing input: Encoder → compressed latent space → Decoder → reconstruction. They learn the most salient features by forcing data through a bottleneck. Applications: dimensionality reduction, denoising, anomaly detection.

## Core Explanation

Basic autoencoder: input = output, loss = reconstruction error (MSE). Denoising autoencoder: corrupt input (add noise), train to reconstruct clean output — learns robust features. Variational Autoencoder (VAE, Kingma & Welling 2013): probabilistic encoder outputs distribution parameters (μ, σ), enabling generation by sampling latent space. VAE-generated images are smoother but blurrier than GANs.

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
