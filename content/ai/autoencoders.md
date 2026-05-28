---
atomic_facts:
  - id: fact-autoencoder-1
    statement: >-
      Variational autoencoders learn probabilistic latent representations by optimizing a variational lower
      bound.
    source_title: Auto-Encoding Variational Bayes
    source_url: https://arxiv.org/abs/1312.6114
    confidence: medium
  - id: fact-autoencoder-2
    statement: >-
      Hinton and Salakhutdinov showed that deep autoencoders could reduce high-dimensional data to compact
      codes and reconstruct the inputs.
    source_title: Reducing the Dimensionality of Data with Neural Networks
    source_url: https://doi.org/10.1126/science.1127647
    source_doi: 10.1126/science.1127647
    confidence: medium
  - id: fact-autoencoder-3
    statement: >-
      Denoising autoencoders train on corrupted inputs and learn representations by reconstructing the
      original clean data.
    source_title: Extracting and Composing Robust Features with Denoising Autoencoders
    source_url: https://doi.org/10.1145/1390156.1390294
    source_doi: 10.1145/1390156.1390294
    confidence: medium
category: ai
completeness: 0.86
confidence: high
conflict_of_interest: none_declared
created_date: "2026-05-22"
data_period: static
derived_from_human_seed: true
disputed_statements: []
generation_method: ai_structured
id: kb-2026-00279
is_live_document: false
known_gaps:
  - Modern masked autoencoders and diffusion-era representation learning are not covered in depth.
language: en
last_verified: "2026-05-28"
primary_sources:
  - title: Auto-Encoding Variational Bayes
    type: conference_paper
    year: 2014
    url: https://arxiv.org/abs/1312.6114
    institution: ICLR / arXiv
    authors:
      - Diederik P. Kingma
      - Max Welling
  - title: Reducing the Dimensionality of Data with Neural Networks
    type: academic_paper
    year: 2006
    url: https://doi.org/10.1126/science.1127647
    doi: 10.1126/science.1127647
    institution: Science
    authors:
      - Geoffrey E. Hinton
      - Ruslan R. Salakhutdinov
  - title: Extracting and Composing Robust Features with Denoising Autoencoders
    type: conference_paper
    year: 2008
    url: https://doi.org/10.1145/1390156.1390294
    doi: 10.1145/1390156.1390294
    institution: ICML
    authors:
      - Pascal Vincent
      - Hugo Larochelle
      - Yoshua Bengio
      - Pierre-Antoine Manzagol
schema_type: TechArticle
secondary_sources: []
title: Autoencoders
updated: "2026-05-28"
---

## TL;DR

Autoencoders learn compressed representations by reconstructing inputs from latent codes. This repair keeps the claims focused on variational, deep, and denoising autoencoders rather than broad self-supervised-learning surveys.

## Core Explanation

The selected sources cover three distinct autoencoder families: probabilistic latent variables, deep dimensionality reduction, and corruption-based denoising objectives. Claims about AI governance or later survey literature were removed from the public evidence surface.

## Further Reading

- [Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114)
- [Reducing the Dimensionality of Data with Neural Networks](https://doi.org/10.1126/science.1127647)
- [Denoising Autoencoders](https://doi.org/10.1145/1390156.1390294)

## Related Articles

- [Representation Learning](../representation-learning.md)
- [Self-Supervised Learning](../self-supervised-learning.md)
