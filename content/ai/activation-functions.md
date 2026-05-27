---
id: activation-functions
title: Activation Functions in Neural Networks
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-af-1
    statement: ReLU outputs max(0, x), creating a simple non-saturating nonlinearity that helped deep neural networks train more effectively.
    source_title: Rectified Linear Units Improve Restricted Boltzmann Machines
    source_url: https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf
    confidence: medium
  - id: fact-af-2
    statement: GELU weights inputs by their value rather than gating purely by sign, using the Gaussian error function in its formulation.
    source_title: Gaussian Error Linear Units (GELUs)
    source_url: https://arxiv.org/abs/1606.08415
    confidence: medium
  - id: fact-af-3
    statement: Swish is an activation function of the form x multiplied by sigmoid(x), proposed through automated search for activation functions.
    source_title: Searching for Activation Functions
    source_url: https://arxiv.org/abs/1710.05941
    confidence: medium
  - id: fact-af-4
    statement: Softmax converts a vector of logits into normalized positive values that sum to one, making it useful for multiclass output distributions.
    source_title: Deep Learning
    source_url: https://www.deeplearningbook.org/contents/mlp.html
    confidence: medium
completeness: 0.9
known_gaps:
  - Learnable activation functions and activation search are covered only at a summary level
primary_sources:
  - title: Deep Learning
    type: textbook
    year: 2016
    authors:
      - Goodfellow, Ian
      - Bengio, Yoshua
      - Courville, Aaron
    institution: MIT Press
    url: https://www.deeplearningbook.org/contents/mlp.html
  - title: Rectified Linear Units Improve Restricted Boltzmann Machines
    type: academic_paper
    year: 2010
    authors:
      - Nair, Vinod
      - Hinton, Geoffrey E.
    institution: ICML
    url: https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf
  - title: Gaussian Error Linear Units (GELUs)
    type: academic_paper
    year: 2016
    authors:
      - Hendrycks, Dan
      - Gimpel, Kevin
    institution: arXiv
    url: https://arxiv.org/abs/1606.08415
  - title: Searching for Activation Functions
    type: academic_paper
    year: 2018
    authors:
      - Ramachandran, Prajit
      - Zoph, Barret
      - Le, Quoc V.
    institution: ICLR
    url: https://arxiv.org/abs/1710.05941
secondary_sources: []
updated: "2026-05-24"
---

## TL;DR

Activation functions introduce nonlinear transformations into neural networks. Without nonlinearities, stacked linear layers collapse into a single linear mapping.

## Core Explanation

ReLU is a simple piecewise-linear activation widely used in hidden layers. GELU and Swish are smoother nonlinearities used in many modern architectures. Softmax is commonly used where a model needs a normalized distribution over classes or tokens.

## Detailed Analysis

The practical choice of activation function depends on architecture, optimization behavior, and output semantics. ReLU variants are simple and fast; GELU and Swish can improve performance in some deep models; softmax is usually reserved for output distributions or attention weights rather than hidden-layer feature extraction.

## Further Reading

- [Deep Learning](https://www.deeplearningbook.org/contents/mlp.html)
- [Rectified Linear Units Improve Restricted Boltzmann Machines](https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf)
- [Gaussian Error Linear Units](https://arxiv.org/abs/1606.08415)
- [Searching for Activation Functions](https://arxiv.org/abs/1710.05941)

## Related Articles

- [Kolmogorov-Arnold Networks (KANs): Learnable Activation Functions as MLP Alternatives](../kolmogorov-arnold-networks.md)
- [AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime](../ai-for-fraud-detection.md)
- [Convolutional Neural Networks (CNN)](../convolutional-neural-networks-cnn.md)
