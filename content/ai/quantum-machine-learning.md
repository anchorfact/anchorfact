---
id: "quantum-machine-learning"
title: "Quantum Machine Learning: Tensor Networks, QNNs, and Error Mitigation"
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
  - id: "af-quantum-machine-learning-1"
    statement: "Machine learning for quantum error mitigation (Nature, 2024) demonstrated that classical ML models can extend the practical reach of noisy quantum computers — reducing error mitigation overhead on 100-qubit experiments, a critical enabler for near-term quantum advantage."
    source_title: "Kim et al., Nature Machine Intelligence (2024)"
    source_url: "https://www.nature.com/articles/s42256-024-00927-2"
    confidence: "high"
  - id: "af-quantum-machine-learning-2"
    statement: "Tensor networks — originally developed for quantum many-body physics — serve as efficient ML parameterizations: matrix product states (MPS) for 1D, projected entangled pair states (PEPS) for 2D data. They naturally handle exponential-dimension spaces while maintaining polynomial trainable parameters."
    source_title: "Tensor Networks for ML, Proc. Royal Society A (2023)"
    source_url: "https://doi.org/10.1098/rspa.2023.0218"
    confidence: "high"
primary_sources:
  - id: "ps-quantum-machine-learning-1"
    title: "Machine learning for practical quantum error mitigation"
    type: "academic_paper"
    year: 2024
    institution: "Nature (IBM Research)"
    url: "https://www.nature.com/articles/s42256-024-00927-2"
  - id: "ps-quantum-machine-learning-2"
    title: "Tensor networks for quantum machine learning"
    type: "academic_paper"
    year: 2023
    institution: "Proceedings of the Royal Society A"
    url: "https://doi.org/10.1098/rspa.2023.0218"
known_gaps:
  - "Practical quantum advantage in ML tasks"
  - "Scalable quantum neural network training"
disputed_statements: []
---

## TL;DR
Quantum Machine Learning sits at the intersection of quantum computing and AI. Current research focuses on quantum error mitigation via ML, tensor network-inspired architectures, and quantum kernel methods — practical applications on noisy intermediate-scale quantum (NISQ) devices.

## Core Explanation
QML approaches: (1) Variational quantum circuits (VQC) — trainable parameterized quantum gates optimized classically; (2) Quantum kernel methods — quantum circuits compute kernel functions that may be classically intractable; (3) Tensor network ML — classical methods inspired by quantum formalism that compress high-dimensional data efficiently. The hybrid classical-quantum paradigm dominates: quantum subroutines embedded in classical pipelines.

## Detailed Analysis
Quantum error mitigation (QEM) represents the most practical QML success to date: neural networks learn to correct measurement errors without full quantum error correction (which requires thousands of physical qubits per logical qubit). IBM has demonstrated ML-QEM on 100-qubit experiments. Tensor networks bridge classical ML and quantum computing — MPS, PEPS, MERA provide interpretable, compression-efficient architectures.

## Further Reading
- IBM Qiskit Machine Learning
- PennyLane (Xanadu) Tutorials
- TensorNetwork.org
