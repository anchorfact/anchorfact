---
id: "kb-gd-004"
title: "AI-Generated Game Assets: Workflow, Disclosure, and Provenance"
schema_type: "TechArticle"
category: "game-development"
language: "en"
confidence: "medium"
last_verified: "2026-06-01"
created_date: "2026-04-28"
updated: "2026-06-01"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-gd-ai-assets-001"
    statement: "The latent diffusion model paper describes applying diffusion models in the latent space of pretrained autoencoders."
    source_title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    source_url: "https://arxiv.org/abs/2112.10752"
    confidence: "medium"
  - id: "fact-gd-ai-assets-002"
    statement: "The latent diffusion model paper reports that working in latent space can reduce computational requirements compared with pixel-space diffusion."
    source_title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    source_url: "https://arxiv.org/abs/2112.10752"
    confidence: "medium"
  - id: "fact-gd-ai-assets-003"
    statement: "Unity Asset Store submission guidelines require AI tools and AI-generated content to be disclosed in the AI description field."
    source_title: "Submission Guidelines - Unity Asset Store"
    source_url: "https://assetstore.unity.com/publishing/submission-guidelines"
    confidence: "medium"
  - id: "fact-gd-ai-assets-004"
    statement: "Unity Asset Store submission guidelines require the AI description to explain modifications that add value beyond raw generated output."
    source_title: "Submission Guidelines - Unity Asset Store"
    source_url: "https://assetstore.unity.com/publishing/submission-guidelines"
    confidence: "medium"
  - id: "fact-gd-ai-assets-005"
    statement: "The C2PA specifications define technical standards for certifying the source and history of media content."
    source_title: "C2PA Specifications"
    source_url: "https://spec.c2pa.org/specifications/"
    confidence: "medium"
completeness: 0.80
known_gaps:
  - "This entry does not rank commercial asset-generation tools or assert that a generated asset is legally safe for any specific storefront."
  - "Licensing, model-training provenance, likeness rights, and platform-specific submission rules require project-specific legal and policy review."
disputed_statements: []
primary_sources:
  - title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    authors:
      - "Robin Rombach"
      - "Andreas Blattmann"
      - "Dominik Lorenz"
      - "Patrick Esser"
      - "Bjorn Ommer"
    type: "academic_paper"
    year: 2022
    url: "https://arxiv.org/abs/2112.10752"
    institution: "arXiv"
  - title: "Submission Guidelines - Unity Asset Store"
    type: "documentation"
    year: 2026
    url: "https://assetstore.unity.com/publishing/submission-guidelines"
    institution: "Unity"
  - title: "C2PA Specifications"
    type: "standard"
    year: 2026
    url: "https://spec.c2pa.org/specifications/"
    institution: "Coalition for Content Provenance and Authenticity"
secondary_sources: []
---

## TL;DR

AI-generated game assets should be treated as source material that still needs art direction, technical validation, disclosure, and provenance tracking.

## Core Explanation

Generative image and video models can accelerate concept exploration, sprite drafts, textures, mood boards, and marketing variants. Production use is stricter: teams still need rights review, style consistency, engine import checks, performance budgets, accessibility review, and storefront disclosure where required.

For practical game pipelines, keep a manifest for each generated asset:

- prompt or input reference;
- model or service used;
- human edits and value-added changes;
- license or usage constraint;
- intended game surface;
- provenance or content-credential status;
- reviewer approval before shipping.

## Source-Mapped Facts

- The latent diffusion model paper describes applying diffusion models in the latent space of pretrained autoencoders. ([source](https://arxiv.org/abs/2112.10752))
- The latent diffusion model paper reports that working in latent space can reduce computational requirements compared with pixel-space diffusion. ([source](https://arxiv.org/abs/2112.10752))
- Unity Asset Store submission guidelines require AI tools and AI-generated content to be disclosed in the AI description field. ([source](https://assetstore.unity.com/publishing/submission-guidelines))
- Unity Asset Store submission guidelines require the AI description to explain modifications that add value beyond raw generated output. ([source](https://assetstore.unity.com/publishing/submission-guidelines))
- The C2PA specifications define technical standards for certifying the source and history of media content. ([source](https://spec.c2pa.org/specifications/))

## Further Reading

- [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
- [Submission Guidelines - Unity Asset Store](https://assetstore.unity.com/publishing/submission-guidelines)
- [C2PA Specifications](https://spec.c2pa.org/specifications/)
