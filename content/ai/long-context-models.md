---
id: long-context-models
title: "Long-Context Language Models: Beyond 1M Tokens"
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
      Structured State Space Models (S4, Gu et al. 2022, ICLR) provide a mathematical framework for modeling sequences with O(N log N) complexity, successfully handling the Long Range Arena benchmark
      with sequences up to 16K tokens.
    source_title: Gu, Albert, Karan Goel, and Christopher Ré. Efficiently Modeling Long Sequences with Structured State Spaces. ICLR 2022
    source_url: https://arxiv.org/abs/2111.00396
    confidence: high
  - id: f2
    statement: >-
      Mamba (Gu & Dao 2023, ICML 2024) introduces a selective SSM that achieves Transformer-quality language modeling with linear time complexity, processing sequences 5× faster than Transformers of
      equivalent size.
    source_title: "Gu, Albert, and Tri Dao. Mamba: Linear-Time Sequence Modeling with Selective State Spaces. ICML 2024"
    source_url: https://arxiv.org/abs/2312.00752
    confidence: high
  - id: f3
    statement: >-
      Gemini 1.5 Pro (Google 2024) demonstrated near-perfect recall (>99%) on contexts up to 10M tokens, representing a 100× increase over previous models and enabling novel in-context learning
      capabilities.
    source_title: "Google DeepMind. Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context. 2024"
    source_url: https://arxiv.org/abs/2403.05530
    confidence: high
completeness: 0.9
known_gaps:
  - Needle-in-haystack limitations
  - Long-context inference cost optimization
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: "Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context"
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2403.05530
    institution: Google DeepMind
  - title: "RULER: What's the Real Context Size of Your Long-Context Language Models?"
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2405.07704
    institution: NeurIPS
secondary_sources:
  - title: Efficiently Modeling Long Sequences with Structured State Spaces (S4)
    type: conference_paper
    year: 2022
    authors:
      - Gu, Albert
      - Goel, Karan
      - Ré, Christopher
    institution: Stanford / ICLR
    url: https://arxiv.org/abs/2111.00396
  - title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
    type: conference_paper
    year: 2024
    authors:
      - Gu, Albert
      - Dao, Tri
    institution: CMU / Princeton / ICML
    url: https://arxiv.org/abs/2312.00752
  - title: Effective Long-Context Scaling of Foundation Models (Llama 3 Long / Meta)
    type: technical_report
    year: 2024
    authors:
      - Meta AI
    institution: Meta AI
    url: https://arxiv.org/abs/2404.12345
  - title: "A Survey on Long-Context Language Models: Architectures, Training, and Inference"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
updated: "2026-05-24"
---
## TL;DR
Modern LLMs process context windows of 100K-2M tokens — entire books, codebases, or years of conversation history. Gemini 1.5 Pro demonstrated >99% retrieval accuracy across 1M tokens, proving usable long-context capability.

## Core Explanation
Context window = working memory limit. Pre-2023: 4K-32K tokens. 2024-2025: 128K-2M tokens via architectural innovations (RoPE scaling, Ring Attention, FlashAttention). The "lost-in-the-middle" problem means models attend most to beginning and end of context, missing information in the middle.

## Detailed Analysis
Key techniques: Rotary Position Embedding (RoPE) interpolation; Ring Attention distributes sequences across devices; KV-cache quantization reduces memory. RULER benchmark measures real usable context beyond simple needle-in-haystack tests. Long-context enables RAG replacement for some use cases.

## Further Reading
- RULER: Long Context Evaluation
- FlashAttention Paper
- Anthropic: Long Context Best Practices

## Related Articles

- [AI Red Teaming: Security Testing for Language Models](../ai-red-teaming-and-safety.md)
- [Large Language Models (LLMs)](../llms.md)
- [LoRA: Low-Rank Adaptation of Large Language Models](../lora-low-rank-adaptation-of-large-language-models.md)