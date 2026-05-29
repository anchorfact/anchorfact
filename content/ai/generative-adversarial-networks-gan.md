---
id: kb-2026-00271
title: Generative Adversarial Networks (GANs)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-29'
created_date: '2026-05-22'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-gan-1
    statement: Generative Adversarial Networks train a generator and a discriminator in an adversarial process for estimating generative models.
    source_title: Generative Adversarial Networks
    source_url: https://arxiv.org/abs/1406.2661
    source_doi: 10.48550/arXiv.1406.2661
    confidence: medium
  - id: fact-ai-gan-2
    statement: DCGAN showed that deep convolutional generative adversarial networks can learn reusable visual representations from image data.
    source_title: Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks
    source_url: https://arxiv.org/abs/1511.06434
    source_doi: 10.48550/arXiv.1511.06434
    confidence: medium
  - id: fact-ai-gan-3
    statement: Wasserstein GAN proposes using the Earth Mover distance objective to improve the stability and interpretability of GAN training.
    source_title: Wasserstein GAN
    source_url: https://arxiv.org/abs/1701.07875
    source_doi: 10.48550/arXiv.1701.07875
    confidence: medium
  - id: fact-ai-gan-4
    statement: Progressive Growing of GANs trains generator and discriminator networks by gradually increasing image resolution during training.
    source_title: Progressive Growing of GANs for Improved Quality, Stability, and Variation
    source_url: https://arxiv.org/abs/1710.10196
    source_doi: 10.48550/arXiv.1710.10196
    confidence: medium
completeness: 0.84
known_gaps:
  - This article covers foundational GAN mechanisms and major training variants, not current image-generation product rankings.
  - Application-specific GAN variants such as CycleGAN, StyleGAN, and Pix2Pix deserve separate focused treatment.
disputed_statements: []
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
    url: https://arxiv.org/abs/1406.2661
    doi: 10.48550/arXiv.1406.2661
    institution: NeurIPS
  - title: Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks
    authors:
      - Radford, Alec
      - Metz, Luke
      - Chintala, Soumith
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1511.06434
    doi: 10.48550/arXiv.1511.06434
    institution: ICLR
  - title: Wasserstein GAN
    authors:
      - Arjovsky, Martin
      - Chintala, Soumith
      - Bottou, Leon
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1701.07875
    doi: 10.48550/arXiv.1701.07875
    institution: ICML
  - title: Progressive Growing of GANs for Improved Quality, Stability, and Variation
    authors:
      - Karras, Tero
      - Aila, Timo
      - Laine, Samuli
      - Lehtinen, Jaakko
    type: academic_paper
    year: 2018
    url: https://arxiv.org/abs/1710.10196
    doi: 10.48550/arXiv.1710.10196
    institution: NVIDIA / ICLR
---

## TL;DR

Generative adversarial networks train two models together: a generator that creates samples and a discriminator that tries to distinguish generated samples from real data. The adversarial setup made GANs influential for image generation and representation learning, while later work focused heavily on stability, architecture, and high-resolution training.

## Core Claims

The original GAN framework is a two-player training setup for generative modeling. The generator learns to produce samples; the discriminator learns to classify real versus generated samples; training pushes both models through the adversarial objective.

DCGAN showed that convolutional GAN architectures could learn useful visual representations, making GANs more practical for image-focused unsupervised learning.

Wasserstein GAN changed the training objective to improve stability and make the training signal more meaningful. Progressive growing changed the training schedule by starting at low resolution and adding layers as resolution increases.

## Citation Boundaries

Use this article for foundational GAN mechanisms and training variants. For current best-in-class image generation, compare against diffusion and flow-based systems with current evaluations.

## Further Reading

- [Generative Adversarial Networks](https://arxiv.org/abs/1406.2661)
- [Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks](https://arxiv.org/abs/1511.06434)
- [Wasserstein GAN](https://arxiv.org/abs/1701.07875)
- [Progressive Growing of GANs for Improved Quality, Stability, and Variation](https://arxiv.org/abs/1710.10196)
