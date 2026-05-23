---
id:"foundation-models"
title:"Foundation Models: Paradigm Shift in AI"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-foundation-models-1"
    statement:"Foundation models — large models pretrained on broad data that can be adapted to many downstream tasks — were named and defined by the Stanford Center for Research on Foundation Models (Bommasani et al., 2021), encompassing GPT-3, BERT, CLIP, DALL-E, and Codex."
    source_title:"Bommasani et al., Stanford CRFM (2021)"
    confidence:"high"
  - id:"af-foundation-models-2"
    statement:"Scaling laws (Kaplan et al., OpenAI, 2020) empirically demonstrate that language model loss decreases predictably with model size, dataset size, and compute — each following a power-law relationship that has held across eight orders of magnitude."
    source_title:"Kaplan et al., NeurIPS (2020)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"On the Opportunities and Risks of Foundation Models"
    type:"academic_paper"
    year:2021
    url:"https://arxiv.org/abs/2108.07258"
    institution:"Stanford CRFM"
  - title:"Scaling Laws for Neural Language Models"
    type:"academic_paper"
    year:2020
    url:"https://arxiv.org/abs/2001.08361"
    institution:"NeurIPS"

known_gaps:
  - "Multilingual foundation model equity"
  - "Foundation models for scientific discovery"

disputed_statements:
  - statement:"No major disputed statements identified"

---

## TL;DR
Foundation models represent a paradigm shift — pretrain once on massive data, then adapt to thousands of downstream tasks via fine-tuning, prompting, or in-context learning.

## Core Explanation
Emergent abilities: capabilities that appear only at sufficient scale — chain-of-thought reasoning, instruction following, theory of mind, and tool use. These were NOT explicitly trained for; they emerged as model size crossed thresholds. Chinchilla scaling laws (Hoffmann et al., 2022) showed that for a given compute budget, model size and training tokens should scale equally.

## Detailed Analysis
The foundation model ecosystem: closed (GPT-4, Claude, Gemini), open-weight (Llama, Mistral, Qwen, DeepSeek), and fully open (OLMo, Pythia). Fine-tuning approaches include full fine-tuning, parameter-efficient methods (LoRA, QLoRA), and instruction tuning. The ecosystem increasingly demands transparency in training data composition.

## Further Reading
- Stanford CRFM: Foundation Model Research
- Hugging Face: Open LLM Leaderboard
- Epoch AI: Compute Trends