---
id: model-compression
title: "Model Compression: Pruning, Quantization, and Distillation"
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
      Knowledge Distillation (Hinton, Vinyals, Dean 2015, Google) transfers knowledge from a large teacher model to a smaller student by training on soft targets (probability distributions) rather
      than hard labels.
    source_title: Hinton, Geoffrey, Oriol Vinyals, and Jeff Dean. Distilling the Knowledge in a Neural Network. NeurIPS Workshop 2015
    source_url: https://arxiv.org/abs/1503.02531
    confidence: high
  - id: f2
    statement: >-
      The Lottery Ticket Hypothesis (Frankle & Carbin 2019, MIT) showed that dense, randomly-initialized networks contain sparse subnetworks that can be trained in isolation to match the full
      network's accuracy.
    source_title: Frankle, Jonathan, and Michael Carbin. The Lottery Ticket Hypothesis. ICLR 2019 Best Paper
    source_url: https://arxiv.org/abs/1803.03635
    confidence: high
  - id: f3
    statement: >-
      Deep Compression (Han et al. 2016, Stanford/NVIDIA) combined pruning, trained quantization, and Huffman coding to reduce model size by 35-49× without accuracy loss, establishing the compression
      pipeline used in TinyML.
    source_title: Han, Song, Huizi Mao, and William J. Dally. Deep Compression. ICLR 2016
    source_url: https://arxiv.org/abs/1510.00149
    confidence: high
completeness: 0.9
known_gaps:
  - Dynamic sparse training
  - Compression for diffusion models
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: A White Paper on Neural Network Quantization
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2106.08295
    institution: JMLR
  - title: "The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks"
    type: academic_paper
    year: 2019
    url: https://arxiv.org/abs/1803.03635
    institution: ICLR
secondary_sources:
  - title: "Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding"
    type: conference_paper
    year: 2016
    authors:
      - Han, Song
      - Mao, Huizi
      - Dally, William J.
    institution: Stanford / NVIDIA / ICLR
    url: https://arxiv.org/abs/1510.00149
  - title: A Survey of Model Compression and Acceleration for Deep Neural Networks
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE Signal Processing Magazine
    url: https://doi.org/10.1109/MSP.2024.3406987
  - title: Distilling the Knowledge in a Neural Network (Knowledge Distillation)
    type: workshop
    year: 2015
    authors:
      - Hinton, Geoffrey
      - Vinyals, Oriol
      - Dean, Jeff
    institution: Google / NeurIPS Workshop
    url: https://arxiv.org/abs/1503.02531
  - title: "The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks"
    type: conference_paper
    year: 2019
    authors:
      - Frankle, Jonathan
      - Carbin, Michael
    institution: MIT / ICLR Best Paper
    url: https://arxiv.org/abs/1803.03635
updated: "2026-05-24"
---
## TL;DR
Model compression reduces inference cost for deployment on resource-constrained devices. The three pillars — pruning, quantization, and distillation — can be combined for 10x+ compression with minimal accuracy loss.

## Core Explanation
Pruning removes weights (unstructured) or entire neurons/channels (structured) based on magnitude or gradient criteria. Quantization converts floating-point weights to lower precision (INT8, INT4). Knowledge distillation trains a small student model to mimic a large teacher.

## Detailed Analysis
Post-training quantization (PTQ): calibrate on representative data, no retraining. Quantization-aware training (QAT): simulate quantization during training for higher accuracy. GPTQ and AWQ enable 4-bit quantization of LLMs. DistilBERT achieves 97% of BERT's performance with 40% fewer parameters via distillation.

## Further Reading
- PyTorch: Quantization Tutorial
- Hugging Face Optimum
- Papers With Code: Model Compression