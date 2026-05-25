---
id: image-segmentation
title: "Image Segmentation: From U-Net to SAM"
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
      U-Net (Ronneberger et al. 2015) introduced a symmetric encoder-decoder with skip connections, becoming the de facto standard for biomedical image segmentation and winning multiple ISBI
      challenges.
    source_title: "Ronneberger, Olaf, Philipp Fischer, and Thomas Brox. U-Net: Convolutional Networks for Biomedical Image Segmentation. MICCAI 2015"
    source_url: https://arxiv.org/abs/1505.04597
    confidence: high
  - id: f2
    statement: Segment Anything (SAM, Kirillov et al. 2023, Meta AI) introduced a promptable foundation model for segmentation that can segment any object in any image given a point, box, or mask prompt.
    source_title: Kirillov, Alexander, et al. Segment Anything. ICCV 2023
    source_url: https://arxiv.org/abs/2304.02643
    confidence: high
  - id: f3
    statement: Mask R-CNN (He et al. 2017, Facebook AI) extended Faster R-CNN by adding a parallel mask prediction branch, enabling instance segmentation with minimal overhead and winning the COCO challenge.
    source_title: He, Kaiming, et al. Mask R-CNN. ICCV 2017
    source_url: https://arxiv.org/abs/1703.06870
    confidence: high
completeness: 0.9
known_gaps:
  - Video instance segmentation
  - Panoptic segmentation unified frameworks
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: "U-Net: Convolutional Networks for Biomedical Image Segmentation"
    type: academic_paper
    year: 2015
    url: https://arxiv.org/abs/1505.04597
    institution: MICCAI
  - title: Segment Anything (SAM)
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2304.02643
    institution: ICCV/Meta AI
secondary_sources:
  - title: "Segment Anything (SAM): A Foundational Model for Image Segmentation"
    type: conference_paper
    year: 2023
    authors:
      - Kirillov, Alexander
      - Mintun, Eric
      - Ravi, Nikhila
      - et al.
    institution: Meta AI / ICCV
    url: https://arxiv.org/abs/2304.02643
  - title: Fully Convolutional Networks for Semantic Segmentation (Seminal)
    type: conference_paper
    year: 2015
    authors:
      - Long, Jonathan
      - Shelhamer, Evan
      - Darrell, Trevor
    institution: UC Berkeley / CVPR
    url: https://arxiv.org/abs/1411.4038
  - title: "U-Net: Convolutional Networks for Biomedical Image Segmentation"
    type: conference_paper
    year: 2015
    authors:
      - Ronneberger, Olaf
      - Fischer, Philipp
      - Brox, Thomas
    institution: University of Freiburg / MICCAI
    url: https://arxiv.org/abs/1505.04597
  - title: Mask R-CNN (Seminal Instance Segmentation)
    type: conference_paper
    year: 2017
    authors:
      - He, Kaiming
      - Gkioxari, Georgia
      - Dollár, Piotr
      - Girshick, Ross
    institution: Facebook AI Research / ICCV
    url: https://arxiv.org/abs/1703.06870
updated: "2026-05-24"
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

## Related Articles

- [AI for Land Use Classification: Satellite Image Segmentation, Urban Expansion Mapping, and Agricultural Monitoring](../ai-land-use-classification.md)
- [AI for Customer Analytics: Segmentation, Churn Prediction, and Lifetime Value Modeling](../ai-customer-analytics.md)
- [AI for Remote Sensing: Foundation Models, Satellite Image Analysis, and Earth Observation](../ai-for-remote-sensing.md)
