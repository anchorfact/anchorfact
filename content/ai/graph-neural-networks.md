---
id: "graph-neural-networks"
title: "Graph Neural Networks: Message Passing and Applications"
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
  - id: "af-graph-neural-networks-1"
    statement: "Graph Neural Networks (GNNs) learn representations of nodes, edges, or entire graphs through iterative message passing: each node aggregates features from its neighbors, transforms them via a neural network, and updates its own representation."
    source_title: "Kipf & Welling, ICLR (2017) / Hamilton et al., NeurIPS (2017)"
    confidence: "high"
  - id: "af-graph-neural-networks-2"
    statement: "GNNs achieve state-of-the-art on molecular property prediction (QM9, OGB benchmarks), recommendation systems (Pinterest PinSage, deployed at billion-node scale), and knowledge graph reasoning — domains where data is inherently graph-structured."
    source_title: "OGB (Open Graph Benchmark) / PinSage Paper (2018)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Semi-Supervised Classification with Graph Convolutional Networks (GCN)"
    type: "academic_paper"
    year: 2017
    url: "https://arxiv.org/abs/1609.02907"
    institution: "ICLR"
  - title: "Graph Representation Learning (Hamilton)"
    type: "textbook"
    year: 2020
    url: "https://www.cs.mcgill.ca/~wlh/grl_book/"
    institution: "Morgan & Claypool"

known_gaps:
  - "Scalability to billion-node graphs"
  - "Dynamic/temporal graph learning"

disputed_statements:
  - statement: "No major disputed statements identified"

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