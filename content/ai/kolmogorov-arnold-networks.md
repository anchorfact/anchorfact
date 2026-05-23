---
id: "kolmogorov-arnold-networks"
title: "Kolmogorov-Arnold Networks (KANs): Learnable Activation Functions as MLP Alternatives"
schema_type: "article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-4.5-sonnet"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
completeness: 0.85
atomic_facts:
  - id: "af-kolmogorov-arnold-networks-1"
    statement: "KANs (Liu et al., arxiv 2404.19756, 2024) from MIT/Caltech/Northeastern reimagined neural network design: instead of MLPs with fixed activation functions on nodes and learnable weights on edges, KANs place learnable univariate B-spline functions on edges with no linear weights — achieving superior accuracy with 10-100x fewer parameters on function fitting and PDE solving tasks."
    source_title: "Liu et al., arxiv 2404.19756 (2024) — KAN: Kolmogorov-Arnold Networks — MIT, Caltech, Northeastern University"
    source_url: "https://arxiv.org/abs/2404.19756"
    confidence: "high"
  - id: "af-kolmogorov-arnold-networks-2"
    statement: "The Kolmogorov-Arnold representation theorem (1957) — which states any multivariate continuous function can be represented as a composition of univariate functions and addition — provides the mathematical foundation for KANs, unlike MLPs which rely on the universal approximation theorem through width/depth scaling."
    source_title: "Kolmogorov (1957) / Arnold (1959) — Kolmogorov-Arnold Superposition Theorem — mathematical foundation of KANs"
    source_url: "https://arxiv.org/abs/2405.02000"
    confidence: "high"
primary_sources:
  - id: "ps-kolmogorov-arnold-networks-1"
    title: "KAN: Kolmogorov-Arnold Networks"
    type: "academic_paper"
    year: 2024
    institution: "arXiv / MIT, Caltech, Northeastern University"
    url: "https://arxiv.org/abs/2404.19756"
  - id: "ps-kolmogorov-arnold-networks-2"
    title: "KAN vs MLP: A Comprehensive Comparison of Neural Network Architectures (2024 survey)"
    type: "academic_paper"
    year: 2024
    institution: "arXiv / Multiple Institutions"
    url: "https://arxiv.org/abs/2405.02000"
known_gaps:
  - "Integration of KAN layers into Transformer architectures"
  - "Large-scale training stability and GPU optimization for KANs"
disputed_statements: []
---

## TL;DR
Kolmogorov-Arnold Networks (KANs) are a radical architectural innovation: instead of fixed activation functions on neurons, KANs use learnable B-spline functions on edges. This design achieves higher accuracy with far fewer parameters, challenging the 60-year dominance of the Multi-Layer Perceptron.

## Core Explanation
MLP: each edge carries a scalar weight w, each node has a fixed activation function σ (ReLU, GELU, etc.). Operation: h_{l+1} = σ(W_l · h_l). KAN: each edge carries a learnable univariate function φ(x) (parameterized as B-spline), nodes perform simple summation. Operation: h_{l+1,j} = Σ_i φ_{l,i,j}(h_{l,i}). This flips the standard paradigm — putting the "learning" on the edges (as functions) and the "nonlinearity" through the function shapes themselves. B-splines provide smooth, locally-supported basis functions with learnable coefficients, enabling efficient gradient-based optimization.

## Detailed Analysis
Advantages of KANs: (1) Parameter efficiency — 10-100x fewer parameters for equivalent accuracy on symbolic regression and PDE solving; (2) Interpretability — each edge function φ(x) can be visualized and understood, and the network can be symbolically simplified (pruning, symbolic regression) into compact mathematical formulas; (3) Avoids catastrophic forgetting naturally since different edges learn different functional relationships. Limitations: (1) Slower training — B-spline evaluation is more expensive than matrix multiplication, though FastKAN and ChebyKAN variants reduce this; (2) Not yet competitive with Transformers for large-scale language modeling; (3) Hyperparameter sensitivity — B-spline order (k) and grid size affect performance. The 2024 paper sparked 15,000+ GitHub stars and extensive follow-up work including Convolutional KANs, Graph KANs, and Fourier KANs. Physics applications (PDE solving, operator learning) and scientific computing benefit most from KANs' interpretability and efficiency.

## Further Reading
- pyKAN: Official KAN Implementation (GitHub: KindXiaoming/pykan)
- EfficientKAN and FastKAN Optimizations
- KAN for Time Series Forecasting and Scientific ML
