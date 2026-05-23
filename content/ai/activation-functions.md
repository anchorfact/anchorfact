---
id: "activation-functions"
title: "Activation Functions in Neural Networks"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-activation-functions-1"
    statement: "ReLU (Rectified Linear Unit, f(x)=max(0,x)), proposed by Nair and Hinton (2010), is the default activation for hidden layers in modern neural networks because its constant gradient (1 for x>0) avoids vanishing gradients."
    source_title: "Nair & Hinton, ICML (2010)"
    confidence: "high"
  - id: "af-activation-functions-2"
    statement: "GELU (Gaussian Error Linear Unit), used in GPT and BERT, weights inputs by their cumulative Gaussian probability rather than thresholding at zero, providing smoother gradients than ReLU."
    source_title: "Hendrycks & Gimpel, arXiv (2016)"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "Learnable activation functions (PReLU, Swish)"
  - "Activation function search (AutoML)"

disputed_statements:
  - statement: "No major disputed statements identified"

primary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville), Ch.6.3"
    type: "textbook"
    year: 2016
    url: "https://www.deeplearningbook.org/contents/mlp.html"
    institution: "MIT Press"
  - title: "Rectified Linear Units Improve Restricted Boltzmann Machines"
    type: "academic_paper"
    year: 2010
    url: "https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf"
    institution: "ICML"

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