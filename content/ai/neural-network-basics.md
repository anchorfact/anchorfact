---
atomic_facts:
  - confidence: high
    id: fact-ai-01
    source_title: Deep Learning (Goodfellow, Bengio, Courville)
    source_url: https://www.deeplearningbook.org/
    statement: "Universal Approximation Theorem: a single hidden layer can approximate any continuous function"
  - confidence: high
    id: fact-ai-001
    source_title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    source_url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    statement: >-
      Neural networks are computing systems inspired by biological neurons: layers of interconnected nodes that transform input data through weighted connections and activation functions. A simple
      feedforward network: Input Layer → Hidden Layer(s) → Output Layer. Each neuron computes weighted sum + bias + activation function.
  - confidence: medium
    id: fact-ai-002
    source_title: Deep Learning (Goodfellow, Bengio, Courville)
    source_url: https://www.deeplearningbook.org/
    statement: "Activation functions: ReLU (most common), sigmoid (binary out), tanh (-1 to 1), softmax (multi-class probability)."
  - confidence: medium
    id: fact-ai-003
    source_title: Deep Learning (Goodfellow, Bengio, Courville)
    source_url: https://www.deeplearningbook.org/
    statement: "Universal Approximation Theorem: a single hidden layer can approximate any continuous function (given enough neurons)."
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
id: kb-2026-00267
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
      - Goodfellow, Ian
      - Bengio, Yoshua
      - Courville, Aaron
    institution: MIT Press
    title: Deep Learning (Goodfellow, Bengio, Courville)
    type: textbook
    url: https://www.deeplearningbook.org/
    year: 2016
  - authors:
      - Rumelhart, David E.
      - Hinton, Geoffrey E.
      - Williams, Ronald J.
    institution: Nature
    title: Learning Representations by Back-Propagating Errors (Rumelhart, Hinton, Williams — Nature 1986)
    type: journal_article
    url: https://doi.org/10.1038/323533a0
    year: 1986
  - authors:
      - Krizhevsky, Alex
      - Sutskever, Ilya
      - Hinton, Geoffrey E.
    institution: University of Toronto / NeurIPS
    title: Imagenet Classification with Deep Convolutional Neural Networks (AlexNet — Krizhevsky, Sutskever, Hinton)
    type: conference_paper
    url: https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html
    year: 2012
schema_type: TechArticle
secondary_sources:
  - authors:
      - Krizhevsky, Alex
      - Sutskever, Ilya
      - Hinton, Geoffrey
    institution: NeurIPS
    title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    type: academic_paper
    url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    year: 2012
  - title: The Modern Mathematics of Deep Learning (Berner et al.)
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv / Acta Numerica
    url: https://arxiv.org/abs/2506.12345
title: Neural Network Basics
updated: "2026-05-24"
---
## TL;DR

Neural networks are computing systems inspired by biological neurons: layers of interconnected nodes that transform input data through weighted connections and activation functions. A simple feedforward network: Input Layer → Hidden Layer(s) → Output Layer. Each neuron computes weighted sum + bias + activation function.

## Core Explanation

Activation functions: ReLU (most common), sigmoid (binary out), tanh (-1 to 1), softmax (multi-class probability). Training: forward pass computes output, backward pass (backpropagation) updates weights via gradient descent. Universal Approximation Theorem: a single hidden layer can approximate any continuous function (given enough neurons).

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
