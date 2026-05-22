---
id:"kb-2026-00275"
title:"Computer Vision"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Computer Vision: Algorithms and Applications (2nd Ed, Szeliski)"
    type:"book"
    year:2022
    url:"https://szeliski.org/Book/"
    institution:"Springer"
secondary_sources:
  - title: "Computer Vision: Algorithms and Applications (2nd Ed)"
    authors: ["Szeliski"]
    type: "book"
    year: 2022
    url: "https://szeliski.org/Book/"
    institution: "Springer"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Computer Vision enables machines to extract meaning from visual data. Key tasks: image classification (what is this?), object detection (where is it? + bounding box), segmentation (pixel-level labeling), pose estimation, depth estimation, 3D reconstruction. Deep learning (CNN, ViT) dominates since 2012.

## Core Explanation

Object detection: R-CNN family (region proposals), YOLO (single shot, real-time), DETR (Transformer-based). Segmentation: U-Net (biomedical), Mask R-CNN, SAM (Segment Anything Model, Meta 2023). Vision Transformer (ViT, 2020): apply Transformer to image patches — competitive with CNNs. Multimodal: CLIP (OpenAI 2021) learns joint image-text embeddings.

## Further Reading

- [Computer Vision: Algorithms and Applications (2nd Ed, Szeliski)](https://szeliski.org/Book/)
