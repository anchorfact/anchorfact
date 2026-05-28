---
id: ai-document-understanding
title: >-
  AI Document Understanding: Layout Parsing, Structured Extraction, and Intelligent Document
  Processing
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
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
  - id: af-ai-document-understanding-1
    statement: >-
      LayoutLM jointly models text and two-dimensional layout information from scanned document
      images for document image understanding tasks such as information extraction.
    source_title: "LayoutLM: Pre-training of Text and Layout for Document Image Understanding"
    source_url: https://arxiv.org/abs/1912.13318
    confidence: medium
  - id: af-ai-document-understanding-2
    statement: >-
      Donut introduced an OCR-free document understanding transformer that maps document images
      directly to structured outputs without a separate OCR engine.
    source_title: OCR-free Document Understanding Transformer
    source_url: https://arxiv.org/abs/2111.15664
    confidence: medium
  - id: af-ai-document-understanding-3
    statement: >-
      Amazon Textract is documented as an ML service for extracting text, handwriting, and
      structured data from scanned documents.
    source_title: Amazon Textract Documentation
    source_url: https://docs.aws.amazon.com/textract/
    confidence: medium
primary_sources:
  - id: ps-ai-document-understanding-1
    title: "LayoutLM: Pre-training of Text and Layout for Document Image Understanding"
    type: academic_paper
    year: 2019
    authors:
      - Xu, Yiheng
      - Li, Minghao
      - Cui, Lei
      - et al.
    institution: Microsoft Research / arXiv
    url: https://arxiv.org/abs/1912.13318
  - id: ps-ai-document-understanding-2
    title: OCR-free Document Understanding Transformer
    type: academic_paper
    year: 2021
    authors:
      - Kim, Geewook
      - Hong, Teakgyu
      - Yim, Moonbin
      - et al.
    institution: NAVER CLOVA / arXiv
    url: https://arxiv.org/abs/2111.15664
  - id: ps-ai-document-understanding-3
    title: Amazon Textract Documentation
    type: documentation
    year: 2026
    institution: Amazon Web Services
    url: https://docs.aws.amazon.com/textract/
known_gaps:
  - Handwritten document understanding — cursive handwriting remains challenging
  - Multi-page document reasoning spanning tables, text, and figures across pages
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Document understanding turns scanned pages, forms, and PDFs into machine-readable structure. The field spans layout-aware models, OCR-free vision-language models, and production document extraction services.

## Core Explanation
Traditional pipelines separate layout analysis, OCR, and information extraction. LayoutLM-style models add document geometry to text representations, while Donut-style systems try to predict structured outputs directly from the page image. Commercial document AI services package these capabilities for forms, tables, handwriting, and document text extraction.

## Related Articles

- [AI for Hyperautomation: RPA, Intelligent Document Processing, and Cognitive Workflows](../ai-for-hyperautomation.md)
- [AI for Audio Processing: Speech Recognition, Music Generation, and Sound Understanding](../ai-for-audio-processing-speech-recognition-music-generation-and-sound-understanding.md)
- [AI for Customer Service: Conversational Agents, Ticket Routing, and Intelligent Contact Centers](../ai-customer-service.md)
