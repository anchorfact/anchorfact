---
id: "kb-2026-00275"
title: "Computer Vision"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-001"
    statement: "Computer Vision enables machines to extract meaning from visual data. Key tasks: image classification (what is this?), object detection (where is it? + bounding box), segmentation (pixel-level labeling), pose estimation, depth estimation, 3D reconstruction. Deep learning (CNN, ViT) dominates since 2012."
    source_title: "Computer Vision: Algorithms and Applications (2nd Ed)"
    source_url: "https://szeliski.org/Book/"
    confidence: "high"
  - id: "fact-ai-002"
    statement: "Key tasks: image classification (what is this?"
    source_title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)"
    source_url: "https://arxiv.org/abs/2010.11929"
    confidence: "high"
  - id: "fact-ai-003"
    statement: "+ bounding box), segmentation (pixel-level labeling), pose estimation, depth estimation, 3D reconstruction."
    source_title: "Computer Vision: Algorithms and Applications (2nd Ed)"
    source_url: "https://szeliski.org/Book/"
    confidence: "high"
  - id: "fact-ai-004"
    statement: "Deep learning (CNN, ViT) dominates since 2012."
    source_title: "ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)"
    source_url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html"
    confidence: "high"
  - id: "fact-ai-005"
    statement: "Segmentation: U-Net (biomedical), Mask R-CNN, SAM (Segment Anything Model, Meta 2023)."
    source_title: "Computer Vision: Algorithms and Applications (2nd Ed)"
    source_url: "https://szeliski.org/Book/"
    confidence: "high"

completeness: 0.85

known_gaps:
  - "Statistics and data cited are from 2024 and earlier; more recent developments may have become available since publication"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The relative merits of CNN-based vs Transformer-based vision architectures remain actively debated; ViT models excel with large-scale pretraining while CNNs retain advantages in data-efficient regimes"

primary_sources:
  - title: "Computer Vision: Algorithms and Applications (2nd Ed)"
    authors: ["Szeliski, Richard"]
    type: "textbook"
    year: 2022
    url: "https://szeliski.org/Book/"
    institution: "Springer"
  - title: "ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)"
    authors: ["Krizhevsky", "Sutskever", "Hinton"]
    type: "academic_paper"
    year: 2012
    url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html"
    institution: "NIPS / NeurIPS"

secondary_sources:
  - title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)"
    authors: ["Dosovitskiy", "Beyer", "Kolesnikov", "et al."]
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/2010.11929"
    institution: "Google Research"

---


## TL;DR

Computer Vision enables machines to extract meaning from visual data. Key tasks: image classification (what is this?), object detection (where is it? + bounding box), segmentation (pixel-level labeling), pose estimation, depth estimation, 3D reconstruction. Deep learning (CNN, ViT) dominates since 2012.

## Core Explanation

Object detection: R-CNN family (region proposals), YOLO (single shot, real-time), DETR (Transformer-based). Segmentation: U-Net (biomedical), Mask R-CNN, SAM (Segment Anything Model, Meta 2023). Vision Transformer (ViT, 2020): apply Transformer to image patches — competitive with CNNs. Multimodal: CLIP (OpenAI 2021) learns joint image-text embeddings.

## Further Reading

- [Computer Vision: Algorithms and Applications (2nd Ed, Szeliski)](https://szeliski.org/Book/)
