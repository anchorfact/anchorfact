---
id: ai-for-genomics
title: "AI for Genomics: Single-Cell Foundation Models and RNA Biology"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-ai-for-genomics-1
    statement: >-
      Nature Experimental & Molecular Medicine (2025) published a comprehensive review of single-cell foundation models — large pretrained models (scGPT, scBERT, Geneformer) trained on massive
      single-cell RNA-sequencing datasets from millions of cells across diverse tissues and species — showing that these models capture universal gene expression patterns and enable zero-shot cell
      type annotation, perturbation response prediction, and cross-species transfer learning.
    source_title: Nature Experimental & Molecular Medicine (2025) — Single-cell foundation models review — doi:10.1038/s12276-025-01547-5
    source_url: https://www.nature.com/articles/s12276-025-01547-5
    confidence: high
  - id: af-ai-for-genomics-2
    statement: >-
      T&F RNA Biology (March 2026) published a landmark review documenting AI foundation models for RNA biology — showing that models pretrained on RNA sequences predict secondary structure,
      RNA-protein interactions, and alternative splicing with accuracy rivaling experimental methods, while generating functional RNA sequences de novo.
    source_title: Taylor & Francis RNA Biology (2026) — AI foundation models for RNA biology — doi:10.1080/15476286.2026.2650517
    source_url: https://www.tandfonline.com/doi/full/10.1080/15476286.2026.2650517
    confidence: high
primary_sources:
  - id: ps-ai-for-genomics-1
    title: "Single-cell foundation models: bringing artificial intelligence to single-cell biology"
    type: academic_paper
    year: 2025
    institution: Nature Experimental & Molecular Medicine
    doi: 10.1038/s12276-025-01547-5
    url: https://www.nature.com/articles/s12276-025-01547-5
  - id: ps-ai-for-genomics-2
    title: AI foundation models for RNA biology
    type: academic_paper
    year: 2026
    institution: Taylor & Francis RNA Biology
    doi: 10.1080/15476286.2026.2650517
    url: https://www.tandfonline.com/doi/full/10.1080/15476286.2026.2650517
known_gaps:
  - Integrating multi-omics data (proteomics, metabolomics) into unified genomic foundation models
  - Clinical translation of genomic AI predictions into diagnostic tools
disputed_statements: []
secondary_sources:
  - title: "AlphaFold 3: Accurate Structure Prediction of Biomolecular Interactions (DeepMind)"
    type: journal_article
    year: 2024
    authors:
      - Abramson, Josh
      - Adler, Jonas
      - Dunger, Jack
      - et al.
    institution: Google DeepMind / Nature
    url: https://www.nature.com/articles/s41586-024-07487-w
  - title: Effective Gene Expression Prediction from Sequence by Integrating Long-Range Interactions (Enformer)
    type: journal_article
    year: 2021
    authors:
      - Avsec, Žiga
      - Agarwal, Vikram
      - Visentin, Daniel
      - et al.
    institution: Google DeepMind / Nature Methods
    url: https://doi.org/10.1038/s41592-021-01252-x
  - title: "Deep Learning in Genomics: A Comprehensive Survey and Outlook"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Nature Reviews Genetics
    url: https://doi.org/10.1038/s41576-024-00712-6
  - title: "Large Language Models in Genomics: From DNA Language Modeling to Protein Design"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Genome Biology (BioMed Central)
    url: https://doi.org/10.1186/s13059-025-03456-7
updated: "2026-05-24"
---
## TL;DR
AI foundation models trained on massive genomic datasets — from single-cell RNA sequencing of millions of cells to full RNA transcriptomes — are revolutionizing genomics. These models learn universal biological representations, enabling zero-shot cell typing, perturbation prediction, and de novo RNA design that were previously impossible without labor-intensive experiments.

## Core Explanation
Single-cell genomics generates high-dimensional data: gene expression profiles for individual cells (20,000+ genes × millions of cells). Traditional analysis clusters cells by expression similarity and manually annotates cell types. AI foundation models (scGPT, scBERT, Geneformer, scFoundation) pretrain on massive scRNA-seq compendia using transformer architectures with gene-as-token representations. Key capabilities: (1) Cell type annotation — zero-shot classification of novel cell populations without labeled training data; (2) Perturbation prediction — predict how gene expression changes when specific genes are knocked out or drugs are applied; (3) Cross-species transfer — apply knowledge from mouse to human cell atlases; (4) Gene program discovery — identify co-regulated gene modules across conditions.

## Detailed Analysis
scGPT (2023, Toronto) uses a generative pretraining objective — masking gene expression values and predicting them from context, analogous to BERT's masked language modeling. scBERT adapts the BERT architecture with gene-specific tokenization. Geneformer (Theodoris et al., 2023, Nature) demonstrated that pretraining on 30M single-cell transcriptomes enables context-aware gene network predictions. ESM-2 and ESM-3 (Meta/EvolutionaryScale, 2023-2024) extended the paradigm to protein sequences, generating functional proteins at scale. RNA foundation models (2026) integrate sequence, secondary structure, and experimental binding data, predicting RNA-small molecule interactions critical for RNA-targeted therapeutics. Key infrastructure: the Human Cell Atlas (HCA), Tabula Sapiens, and CELLxGENE provide the training data; BioLLM (2025, ScienceDirect) standardizes single-cell analysis pipelines. Critical challenge: batch effects across labs and sequencing platforms degrade model generalization; specialized normalization and harmonization methods remain active research areas.

## Further Reading
- Geneformer: Transfer Learning for Gene Networks (Theodoris et al., Nature 2023)
- scGPT GitHub: bowang-lab/scGPT
- HCA: Human Cell Atlas Data Portal

## Related Articles

- [AI for Remote Sensing: Foundation Models, Satellite Image Analysis, and Earth Observation](../ai-for-remote-sensing.md)
- [Foundation Models: Paradigm Shift in AI](../foundation-models.md)
- [Multi-Omics Integration: AI-Driven Systems Biology from Genomics to Proteomics](../multi-omics-integration.md)