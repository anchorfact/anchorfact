---
id: "kb-2026-00267"
title: "Neural Network Basics"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-01"
    statement: "Universal Approximation Theorem: a single hidden layer can approximate any continuous function"
    source_title: "Deep Learning (Goodfellow, Bengio, Courville)"
    source_url: "https://www.deeplearningbook.org/"
    confidence: "high"
  - id: "fact-ai-001"
    statement: "Neural networks are computing systems inspired by biological neurons: layers of interconnected nodes that transform input data through weighted connections and activation functions. A simple feedforward network: Input Layer → Hidden Layer(s) → Output Layer. Each neuron computes weighted sum + bias + activation function."
    source_title: "ImageNet Classification with Deep Convolutional Networks (AlexNet)"
    source_url: "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"
    confidence: "high"
  - id: "fact-ai-002"
    statement: "Activation functions: ReLU (most common), sigmoid (binary out), tanh (-1 to 1), softmax (multi-class probability)."
    source_title: "Deep Learning (Goodfellow, Bengio, Courville)"
    source_url: "https://www.deeplearningbook.org/"
    confidence: "medium"
  - id: "fact-ai-003"
    statement: "Universal Approximation Theorem: a single hidden layer can approximate any continuous function (given enough neurons)."
    source_title: "Deep Learning (Goodfellow, Bengio, Courville)"
    source_url: "https://www.deeplearningbook.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"

disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"

primary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"

secondary_sources:
  - title: "ImageNet Classification with Deep Convolutional Networks (AlexNet)"
    authors: ["Krizhevsky, Alex", "Sutskever, Ilya", "Hinton, Geoffrey"]
    type: "academic_paper"
    year: 2012
    url: "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"
    institution: "NeurIPS"

---



## TL;DR

Neural networks are computing systems inspired by biological neurons: layers of interconnected nodes that transform input data through weighted connections and activation functions. A simple feedforward network: Input Layer → Hidden Layer(s) → Output Layer. Each neuron computes weighted sum + bias + activation function.

## Core Explanation

Activation functions: ReLU (most common), sigmoid (binary out), tanh (-1 to 1), softmax (multi-class probability). Training: forward pass computes output, backward pass (backpropagation) updates weights via gradient descent. Universal Approximation Theorem: a single hidden layer can approximate any continuous function (given enough neurons).

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
