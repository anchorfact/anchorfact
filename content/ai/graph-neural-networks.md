---
id: graph-neural-networks
title: "Graph Neural Networks: Message Passing and Applications"
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
  - id: f1
    statement: >-
      Graph Neural Networks (GNNs) operate on graph-structured data by message passing between nodes. The Graph Convolutional Network (GCN, Kipf & Welling 2017, ICLR) uses a first-order approximation
      of spectral graph convolutions.
    source_title: Kipf, Thomas N., and Max Welling. Semi-Supervised Classification with Graph Convolutional Networks. ICLR 2017
    source_url: https://arxiv.org/abs/1609.02907
    confidence: high
  - id: f2
    statement: >-
      Graph Attention Networks (GAT, Veličković et al. 2018, ICLR) introduce attention mechanisms to GNNs, enabling nodes to assign different importance weights to different neighbors during message
      aggregation.
    source_title: Veličković, Petar, et al. Graph Attention Networks. ICLR 2018
    source_url: https://arxiv.org/abs/1710.10903
    confidence: high
  - id: f3
    statement: >-
      GNNs power major scientific discoveries: Google DeepMind's GNoME (Nature 2023) used GNNs to discover 2.2M stable crystals, and AlphaFold uses GNN-like architectures for protein structure
      prediction.
    source_title: Merchant, Amil, et al. Scaling Deep Learning for Materials Discovery. Nature 2023
    source_url: https://www.nature.com/articles/s41586-023-06735-9
    confidence: high
completeness: 0.9
primary_sources:
  - title: Semi-Supervised Classification with Graph Convolutional Networks (GCN)
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1609.02907
    institution: ICLR
  - title: Graph Representation Learning (Hamilton)
    type: textbook
    year: 2020
    url: https://www.cs.mcgill.ca/~wlh/grl_book/
    institution: Morgan & Claypool
known_gaps:
  - Scalability to billion-node graphs
  - Dynamic/temporal graph learning
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: "Graph Neural Networks: A Comprehensive Review of Methods and Applications"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Nature Reviews Methods Primers
    url: https://doi.org/10.1038/s43586-024-00294-7
  - title: "A Comprehensive Survey of Dynamic Graph Neural Networks: Models, Benchmarks, and Frameworks (81+ models)"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Frontiers of Computer Science (Springer)
    url: https://doi.org/10.1007/s11704-024-3853-2
  - title: A Survey of Graph Neural Networks and Their Industrial Applications
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Neurocomputing (Elsevier)
    url: https://doi.org/10.1016/j.neucom.2024.128761
  - title: Semi-Supervised Classification with Graph Convolutional Networks (GCN — Seminal)
    type: conference_paper
    year: 2017
    authors:
      - Kipf, Thomas N.
      - Welling, Max
    institution: University of Amsterdam / ICLR
    url: https://arxiv.org/abs/1609.02907
updated: "2026-05-24"
---
## TL;DR
Graph Neural Networks extend deep learning to graph-structured data — molecules, social networks, knowledge graphs. Message passing enables nodes to learn from their local neighborhood, creating representations that capture both structure and features.

## Core Explanation
Message passing: each node receives messages from neighbors, aggregates them (mean, sum, max, attention), transforms via neural network, and updates. Stacking L layers gives each node information from its L-hop neighborhood. Key architectures: GCN (graph convolution), GAT (graph attention), GraphSAGE (sampling for large graphs).

## Detailed Analysis
Applications: molecular property prediction (GNN scores candidates for drug discovery), recommendation (PinSage powers Pinterest recommendations at billion-node scale), traffic prediction (road network as graph), and protein interaction prediction (AlphaFold uses GNN-like operations).

## Further Reading
- Stanford CS224W: Machine Learning with Graphs
- PyTorch Geometric Library
- OGB: Open Graph Benchmark

## Related Articles

- [Graph Neural Networks: Message Passing, Applications, and Frontiers](../graph-neural-networks-message-passing-applications-and-frontiers.md)
- [AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime](../ai-for-fraud-detection.md)
- [Activation Functions in Neural Networks](../activation-functions.md)