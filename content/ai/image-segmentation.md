---
id: "image-segmentation"
title: "Image Segmentation: From U-Net to SAM"
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
  - id: "af-image-segmentation-1"
    statement: "U-Net (Ronneberger et al., 2015), with its symmetric encoder-decoder and skip connections, became the dominant architecture for biomedical image segmentation, winning the ISBI cell tracking challenge by a large margin."
    source_title: "Ronneberger et al., MICCAI (2015)"
    confidence: "high"
  - id: "af-image-segmentation-2"
    statement: "Segment Anything Model (SAM, Kirillov et al., Meta AI, 2023) introduced promptable segmentation — a single model that can segment any object in any image given a point, box, or mask prompt. Trained on the SA-1B dataset of 1.1 billion masks across 11 million images."
    source_title: "Kirillov et al., ICCV (2023)"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "Video instance segmentation"
  - "Panoptic segmentation unified frameworks"

disputed_statements:
  - statement: "No major disputed statements identified"

primary_sources:
  - title: "U-Net: Convolutional Networks for Biomedical Image Segmentation"
    type: "academic_paper"
    year: 2015
    url: "https://arxiv.org/abs/1505.04597"
    institution: "MICCAI"
  - title: "Segment Anything (SAM)"
    type: "academic_paper"
    year: 2023
    url: "https://arxiv.org/abs/2304.02643"
    institution: "ICCV/Meta AI"

---


## TL;DR
Image segmentation partitions images into meaningful regions — semantic (class per pixel), instance (object per pixel), or panoptic (both). U-Net dominates medical imaging; SAM enables general-purpose interactive segmentation.

## Core Explanation
Encoder-decoder architectures: the encoder compresses spatial information into feature maps; the decoder upsamples to pixel-level predictions. Skip connections (U-Net) preserve fine spatial details lost during downsampling. Dilated/atrous convolutions maintain receptive field without resolution loss.

## Detailed Analysis
Mask R-CNN added a small FCN branch to Faster R-CNN for instance mask prediction — the dominant model from 2017-2023. SAM's three-component design: image encoder (ViT), prompt encoder, and mask decoder. The lightning-fast mask decoder enables real-time interactive segmentation after one-time image encoding.

## Further Reading
- Papers With Code: Semantic Segmentation
- Meta AI: SAM Demo & Research
- MONAI: Medical Open Network for AI