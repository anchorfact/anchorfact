---
id:"long-context-models"
title:"Long-Context Language Models: Beyond 1M Tokens"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-long-context-models-1"
    statement:"Claude (Anthropic) supports 200K token context windows (approximately 150,000 words or 500 pages), enabling processing of entire books, codebases, or full legal documents in a single prompt."
    source_title:"Anthropic: Claude Model Card (2024)"
    confidence:"high"
  - id:"af-long-context-models-2"
    statement:"Gemini 1.5 Pro (Google, February 2024) demonstrated near-perfect retrieval (>99%) across 1M token context windows, proving that long-context models can reliably use information throughout the entire input."
    source_title:"Gemini 1.5 Technical Report (2024)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context"
    type:"academic_paper"
    year:2024
    url:"https://arxiv.org/abs/2403.05530"
    institution:"Google DeepMind"
  - title:"RULER: What's the Real Context Size of Your Long-Context Language Models?"
    type:"academic_paper"
    year:2024
    url:"https://arxiv.org/abs/2405.07704"
    institution:"NeurIPS"

known_gaps:
  - "Needle-in-haystack limitations"
  - "Long-context inference cost optimization"

disputed_statements:
  - statement:"No major disputed statements identified"

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