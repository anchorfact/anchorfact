---
id: kb-2026-00003-clip
title: 'CLIP: Contrastive Language-Image Pre-Training'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-26'
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-clip-1
    statement: CLIP trains image and text encoders with a contrastive objective that brings matching image-text pairs closer and pushes nonmatching pairs apart.
    source_title: Learning Transferable Visual Models From Natural Language Supervision
    source_url: https://arxiv.org/abs/2103.00020
    source_doi: 10.48550/arXiv.2103.00020
    confidence: medium
  - id: fact-ai-clip-2
    statement: Radford et al. reported that CLIP can perform zero-shot image classification by comparing image embeddings with text embeddings of class descriptions.
    source_title: Learning Transferable Visual Models From Natural Language Supervision
    source_url: https://arxiv.org/abs/2103.00020
    source_doi: 10.48550/arXiv.2103.00020
    confidence: medium
  - id: fact-ai-clip-3
    statement: ALIGN also trains visual and language representations with a contrastive loss, using noisy image alt-text pairs at large scale.
    source_title: Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision
    source_url: https://arxiv.org/abs/2102.05918
    source_doi: 10.48550/arXiv.2102.05918
    confidence: medium
  - id: fact-ai-clip-4
    statement: LiT studies contrastive vision-language tuning in which a pretrained image model is locked while the text model is tuned.
    source_title: 'LiT: Zero-Shot Transfer With Locked-image Text Tuning'
    source_url: https://arxiv.org/abs/2111.07991
    source_doi: 10.48550/arXiv.2111.07991
    confidence: medium
completeness: 0.82
known_gaps:
  - This article covers contrastive image-text representation learning, not current multimodal chatbot rankings.
  - Dataset composition, bias, and filtering details require source-specific review before making deployment claims.
disputed_statements: []
primary_sources:
  - title: Learning Transferable Visual Models From Natural Language Supervision
    authors:
      - Radford, Alec
      - Kim, Jong Wook
      - Hallacy, Chris
      - Ramesh, Aditya
      - Goh, Gabriel
      - Agarwal, Sandhini
      - Sastry, Girish
      - Askell, Amanda
      - Mishkin, Pamela
      - Clark, Jack
      - Krueger, Gretchen
      - Sutskever, Ilya
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2103.00020
    doi: 10.48550/arXiv.2103.00020
    institution: OpenAI
  - title: Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision
    authors:
      - Jia, Chao
      - Yang, Yinfei
      - Xia, Ye
      - Chen, Yi-Ting
      - Parekh, Zarana
      - Pham, Hieu
      - Le, Quoc V.
      - Sung, Yun-Hsuan
      - Li, Zhen
      - Duerig, Tom
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2102.05918
    doi: 10.48550/arXiv.2102.05918
    institution: Google Research
  - title: 'LiT: Zero-Shot Transfer With Locked-image Text Tuning'
    authors:
      - Zhai, Xiaohua
      - Wang, Xiao
      - Mustafa, Basil
      - Steiner, Andreas
      - Keysers, Daniel
      - Kolesnikov, Alexander
      - Beyer, Lucas
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2111.07991
    doi: 10.48550/arXiv.2111.07991
    institution: Google Research
---

## TL;DR

CLIP is a vision-language representation model family built around contrastive image-text pretraining. It made image classification and retrieval possible through natural-language labels and prompts rather than a fixed task-specific classifier.

## Core Claims

CLIP learns a shared embedding space for images and text. Matching captions and images are trained to be close together, while mismatched pairs are trained to be farther apart.

The zero-shot classification recipe is simple: encode an image, encode text prompts that describe candidate classes, and choose the class text with the closest embedding. This made CLIP influential as a reusable vision-language backbone.

ALIGN and LiT are useful neighboring references. ALIGN shows a related large-scale noisy text supervision approach; LiT studies a locked-image tuning setup for zero-shot transfer.

## Citation Boundaries

Use this article for stable CLIP-style contrastive pretraining concepts. Do not use it as evidence for current multimodal assistant capabilities, safety behavior, or live image-understanding leaderboard results.

## Further Reading

- [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)
- [Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision](https://arxiv.org/abs/2102.05918)
- [LiT: Zero-Shot Transfer With Locked-image Text Tuning](https://arxiv.org/abs/2111.07991)
