---
id: activation-functions
title: Activation Functions in Neural Networks
schema_type: TechArticle
category: ai
language: en
confidence: high
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
    statement: >-
      ReLU (Rectified Linear Unit) is the most widely used activation function in deep learning, addressing the vanishing gradient problem by outputting max(0,x). Introduced by Nair & Hinton (2010)
      and popularized by Krizhevsky et al. (2012) in AlexNet.
    source_title: Nair, Vinod, and Geoffrey E. Hinton. Rectified Linear Units Improve Restricted Boltzmann Machines. ICML 2010
    source_url: https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf
    confidence: high
  - id: fact-af-2
    statement: >-
      GELU (Gaussian Error Linear Unit), introduced by Hendrycks & Gimpel (2016/2020), is the default activation in BERT and GPT models. It weights inputs by their value rather than gating them by
      sign like ReLU.
    source_title: Hendrycks, Dan, and Kevin Gimpel. Gaussian Error Linear Units (GELUs). arXiv 2016
    source_url: https://arxiv.org/abs/1606.08415
    confidence: high
  - id: fact-af-3
    statement: Swish activation (x·σ(x)), discovered by automated search at Google Brain (Ramachandran et al. 2017), consistently outperforms ReLU on deep networks including ImageNet classification.
    source_title: Ramachandran, Prajit, Barret Zoph, and Quoc V. Le. Searching for Activation Functions. ICLR 2018
    source_url: https://arxiv.org/abs/1710.05941
    confidence: high
  - id: fact-af-4
    statement: >-
      Softmax is the standard output activation for multi-class classification, converting logits to probabilities. It is a core component of the attention mechanism in Transformers (Vaswani et al.
      2017).
    source_title: Goodfellow, Ian, Yoshua Bengio, and Aaron Courville. Deep Learning (Chapter 6.2). MIT Press 2016
    source_url: https://www.deeplearningbook.org/contents/mlp.html
    confidence: medium
completeness: 0.9
known_gaps:
  - Learnable activation functions (PReLU, Swish)
  - Activation function search (AutoML)
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Deep Learning (Goodfellow, Bengio, Courville), Ch.6.3
    type: textbook
    year: 2016
    url: https://www.deeplearningbook.org/contents/mlp.html
    institution: MIT Press
  - title: Rectified Linear Units Improve Restricted Boltzmann Machines
    type: academic_paper
    year: 2010
    url: https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf
    institution: ICML
secondary_sources:
  - title: "Activation Functions in Deep Learning: A Comprehensive Survey and Benchmark"
    type: survey_paper
    year: 2022
    authors:
      - Dubey, Shiv Ram
      - Singh, Satish Kumar
      - Chaudhuri, Bidyut Baran
    institution: IIIT / Neurocomputing
    url: https://doi.org/10.1016/j.neucom.2022.06.111
  - title: Searching for Activation Functions (Swish)
    type: conference_paper
    year: 2018
    authors:
      - Ramachandran, Prajit
      - Zoph, Barret
      - Le, Quoc V.
    institution: Google Brain
    url: https://arxiv.org/abs/1710.05941
  - title: Gaussian Error Linear Units (GELUs)
    type: conference_paper
    year: 2020
    authors:
      - Hendrycks, Dan
      - Gimpel, Kevin
    institution: TTIC
    url: https://arxiv.org/abs/1606.08415
  - title: "Deep Learning (Textbook) — Chapter 6.2: Activation Functions"
    type: textbook
    year: 2016
    authors:
      - Goodfellow, Ian
      - Bengio, Yoshua
      - Courville, Aaron
    institution: MIT Press
    url: https://www.deeplearningbook.org/
updated: "2026-05-24"
---
## TL;DR
Activation functions introduce non-linearity into neural networks, enabling them to approximate any function. ReLU dominates hidden layers; softmax is standard for classification outputs.

## Core Explanation
Without non-linearity, stacked linear layers collapse into a single linear transformation. Sigmoid (outputs 0-1) was historically popular but suffers from saturating gradients. Tanh (outputs -1 to 1) is zero-centered but still saturates. ReLU solved the vanishing gradient problem for deep networks.

## Detailed Analysis
Leaky ReLU (small slope for x<0) and ELU address the "dying ReLU" problem where neurons output zero for all inputs. GELU approximates the expected value of stochastic regularization. Swish (f(x)=x·sigmoid(x)), discovered by neural architecture search, outperforms ReLU on deep benchmarks.

## Further Reading
- PyTorch Documentation: Activation Functions
- Distill.pub: Visualizing Activation Functions
- Papers With Code: Activation Functions Benchmark

## Related Articles

- [Kolmogorov-Arnold Networks (KANs): Learnable Activation Functions as MLP Alternatives](../kolmogorov-arnold-networks.md)
- [AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime](../ai-for-fraud-detection.md)
- [Convolutional Neural Networks (CNN)](../convolutional-neural-networks-cnn.md)
