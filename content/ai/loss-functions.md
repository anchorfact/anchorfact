---
id:"loss-functions"
title:"Loss Functions in Machine Learning"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-loss-functions-1"
    statement:"Cross-entropy loss measures the difference between true probability distribution and predicted distribution, and is the standard loss for classification tasks. Binary cross-entropy handles two classes; categorical cross-entropy handles multi-class with softmax."
    source_title:"Bishop, Pattern Recognition and Machine Learning (2006)"
    confidence:"high"
  - id:"af-loss-functions-2"
    statement:"Focal loss (Lin et al., 2017) adds a modulating factor (1 - p_t)^γ to cross-entropy, down-weighting easy examples and focusing training on hard, misclassified samples — crucial for class-imbalanced datasets like object detection."
    source_title:"Lin et al., ICCV (2017)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"Pattern Recognition and Machine Learning (Bishop)"
    type:"textbook"
    year:2006
    url:"https://link.springer.com/book/9780387310732"
    institution:"Springer"
  - title:"Focal Loss for Dense Object Detection"
    type:"academic_paper"
    year:2017
    url:"https://arxiv.org/abs/1708.02002"
    institution:"ICCV"

known_gaps:
  - "Contrastive losses (InfoNCE, SimCLR)"
  - "Perceptual losses for generative models"

disputed_statements:
  - statement:"No major disputed statements identified"

---

## TL;DR
Loss functions quantify the difference between model predictions and ground truth, guiding optimization. Cross-entropy dominates classification; MSE dominates regression; specialized losses handle imbalanced, structured, or adversarial tasks.

## Core Explanation
MSE (mean squared error) penalizes large errors quadratically — sensitive to outliers. MAE (mean absolute error) is more robust but has non-differentiable points. Huber loss combines both. For generative models, GAN losses (adversarial, Wasserstein) and diffusion losses (noise prediction) require task-specific formulations.

## Detailed Analysis
Triplet loss (FaceNet, Schroff et al., 2015) learns embeddings by ensuring anchor-positive distance is less than anchor-negative by a margin. CTC loss (Connectionist Temporal Classification) handles sequence alignment without explicit segmentation — fundamental to speech recognition.

## Further Reading
- PyTorch Loss Functions Documentation
- Papers With Code: Loss Functions
- Keras: Losses Guide