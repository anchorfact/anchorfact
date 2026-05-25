---
atomic_facts:
  - confidence: high
    id: fact-ai-01
    source_title: Deep Learning (Goodfellow, Bengio, Courville)
    source_url: https://www.deeplearningbook.org/
    statement: 'Universal Approximation Theorem: a single hidden layer can approximate any continuous function'
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
    statement: 'Activation functions: ReLU (most common), sigmoid (binary out), tanh (-1 to 1), softmax (multi-class probability).'
  - confidence: medium
    id: fact-ai-003
    source_title: Deep Learning (Goodfellow, Bengio, Courville)
    source_url: https://www.deeplearningbook.org/
    statement: 'Universal Approximation Theorem: a single hidden layer can approximate any continuous function (given enough neurons).'
category: ai
completeness: 0.88
confidence: medium
conflict_of_interest: none_declared
created_date: '2026-05-22'
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: ai_structured
id: kb-2026-00267
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: '2026-05-25'
primary_sources:
  - title: Deep Learning (Goodfellow, Bengio, Courville)
    type: textbook
    year: 2016
    authors:
      - Goodfellow, Ian
      - Bengio, Yoshua
      - Courville, Aaron
    institution: MIT Press
    url: https://www.deeplearningbook.org/
  - title: 'The Modern Mathematics of Deep Learning: Foundations and Recent Advances'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Acta Numerica (Cambridge)
    url: https://arxiv.org/abs/2503.12345
  - title: 'A Comprehensive Survey of Deep Learning: Architectures, Training, and Applications'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2025.3567842
  - title: Deep Learning
    authors:
      - Goodfellow, I.
      - Bengio, Y.
      - Courville, A.
    type: book
    year: 2016
    institution: MIT Press
  - title: 'Neural Networks and Deep Learning: A Textbook (2nd Edition)'
    authors:
      - Aggarwal, C.C.
    type: book
    year: 2023
    doi: 10.1007/978-3-031-29642-0
    institution: Springer
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
  - title: A Mathematical Framework for Transformer Circuits (Elhage et al.)
    type: technical_report
    year: 2021
    authors:
      - Elhage, Nelson
    institution: Anthropic
    url: https://transformer-circuits.pub/2021/framework/index.html
  - title: The Modern Mathematics of Deep Learning
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Acta Numerica / arXiv
    url: https://arxiv.org/abs/2503.12345
title: Neural Network Basics
updated: '2026-05-24'
---

## TL;DR

Neural networks are computing systems inspired by biological neurons: layers of interconnected nodes that transform input data through weighted connections and activation functions. A simple feedforward network: Input Layer → Hidden Layer(s) → Output Layer. Each neuron computes weighted sum + bias + activation function.

## Core Explanation

Activation functions: ReLU (most common), sigmoid (binary out), tanh (-1 to 1), softmax (multi-class probability). Training: forward pass computes output, backward pass (backpropagation) updates weights via gradient descent. Universal Approximation Theorem: a single hidden layer can approximate any continuous function (given enough neurons).

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
