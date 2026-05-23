---
id: "model-compression"
title: "Model Compression: Pruning, Quantization, and Distillation"
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
  - id: "af-model-compression-1"
    statement: "Quantization reduces model size by representing weights and activations with fewer bits — INT8 quantization reduces model size by 4x compared to FP32 with minimal accuracy loss (<0.5%) when using calibration and per-channel scaling."
    source_title: "Nagel et al., JMLR (2021)"
    confidence: "high"
  - id: "af-model-compression-2"
    statement: "Lottery Ticket Hypothesis (Frankle & Carbin, 2019): dense, randomly-initialized networks contain sparse subnetworks (\"winning tickets\") that, when trained in isolation, can match the full network's accuracy."
    source_title: "Frankle & Carbin, ICLR (2019)"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "Dynamic sparse training"
  - "Compression for diffusion models"

disputed_statements:
  - statement: "No major disputed statements identified"

primary_sources:
  - title: "A White Paper on Neural Network Quantization"
    type: "academic_paper"
    year: 2021
    url: "https://arxiv.org/abs/2106.08295"
    institution: "JMLR"
  - title: "The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks"
    type: "academic_paper"
    year: 2019
    url: "https://arxiv.org/abs/1803.03635"
    institution: "ICLR"

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