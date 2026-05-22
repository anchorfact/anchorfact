---
id: "kb-2026-00004"
title: "GPT (Generative Pre-trained Transformer) Model Family"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
confidence_rationale: "Based on the original GPT paper (Radford et al., 2018) and subsequent architecture papers, cross-validated with multiple sources"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Improving Language Understanding by Generative Pre-Training (GPT-1)"
    authors: ["Radford, Alec", "Narasimhan, Karthik", "Salimans, Tim", "Sutskever, Ilya"]
    type: "academic_paper"
    year: 2018
    url: "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
    institution: "OpenAI"
  - title: "Language Models are Unsupervised Multitask Learners (GPT-2)"
    authors: ["Radford, Alec", "Wu, Jeffrey", "Child, Rewon", "Luan, David", "Amodei, Dario", "Sutskever, Ilya"]
    type: "academic_paper"
    year: 2019
    url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
    institution: "OpenAI"
  - title: "Language Models are Few-Shot Learners (GPT-3)"
    authors: ["Brown, Tom B.", "Mann, Benjamin", "Ryder, Nick", "Subbiah, Melanie", et al.]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.14165"
    url: "https://arxiv.org/abs/2005.14165"
    institution: "OpenAI"
secondary_sources:
  - title: "HuggingFace GPT-2 Documentation"
    type: "documentation"
    url: "https://huggingface.co/docs/transformers/model_doc/gpt2"
completeness: 0.85
known_gaps:
  - "GPT-4 and later versions have limited public architecture documentation"
related_entities:
  - "entity:transformer-architecture"
  - "entity:bert"
  - "entity:large-language-models"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The GPT (Generative Pre-trained Transformer) model family, developed by OpenAI, represents a lineage of autoregressive language models that progressively scaled from 117M to trillions of parameters. GPT-1 (2018) introduced the "pre-train then fine-tune" paradigm using the Transformer decoder; GPT-2 (2019) demonstrated emergent zero-shot capabilities at 1.5B parameters; GPT-3 (2020) established few-shot learning as a viable paradigm at 175B parameters and was trained on approximately 570GB of filtered text. As of 2026, the GPT family has become a cornerstone of modern AI, with GPT-5.2 reaching trillions of parameters.

## Core Explanation

GPT models are autoregressive — they generate text one token at a time, predicting each next token based on all previous tokens in the sequence. The architecture uses only the Transformer decoder, unlike BERT which uses only the encoder. This decoder-only design is crucial: it enables the model to generate coherent text rather than just classify or extract information.

The training process has two stages:
1. **Pre-training (unsupervised)** : Train on a massive corpus of text to predict the next token
2. **Fine-tuning (supervised)** : Adapt to specific tasks using labeled data. As models grew larger, prompt-based few-shot learning increasingly replaced fine-tuning.

The scaling trajectory has been remarkable: GPT-1 (117M parameters, 2018) → GPT-2 (1.5B, 2019) → GPT-3 (175B, 2020) → GPT-4 (estimated 1.76T, 2023) → GPT-5 (2025) → GPT-5.2 (2026). Each scaling step unlocked qualitatively new capabilities.

## Detailed Analysis

### Architecture Evolution

| Version | Parameters | Layers | Hidden Size | Heads | Training Data | Year |
|---------|:--------:|:-----:|:----------:|:----:|--------------|:----:|
| GPT-1 | 117M | 12 | 768 | 12 | BooksCorpus (4.6GB) | 2018 |
| GPT-2 | 1.5B | 48 | 1,600 | 25 | WebText (40GB) | 2019 |
| GPT-3 | 175B | 96 | 12,288 | 96 | Common Crawl filtered (570GB) | 2020 |
| GPT-4 | ~1.76T (est.) | — | — | — | Undisclosed | 2023 |

### Autoregressive Generation

GPT generates text using left-to-right autoregressive prediction:
```
P(x) = ∏ P(x_i | x_1, ..., x_{i-1})
```

Each token is predicted conditioned on all previous tokens. The model uses masked self-attention (causal masking) to prevent attending to future tokens. This contrasts with BERT's bidirectional attention, which enables deeper comprehension but prevents unconstrained text generation.

### Key Innovations Per Version

**GPT-1** (2018): First to demonstrate that unsupervised pre-training on large text corpora could significantly improve supervised fine-tuning performance across diverse NLP tasks. It used a 12-layer decoder-only Transformer with 117M parameters, trained on BooksCorpus. The "pre-train then fine-tune" paradigm was validated across natural language inference, question answering, semantic similarity, and text classification tasks.

**GPT-2** (2019): Showed that language models can perform tasks without explicit fine-tuning — "zero-shot transfer." The model was trained on WebText, a curated dataset of 8 million web pages. GPT-2's release was initially withheld due to concerns about misuse, prompting widespread discussion about AI safety and responsible release practices.

**GPT-3** (2020): Demonstrated that few-shot learning (providing a few examples in the prompt) could match or exceed fine-tuned models on many tasks. At 175B parameters, it was the largest dense language model at the time by a wide margin. GPT-3 popularized "prompt engineering" as a discipline and catalyzed the commercial LLM ecosystem. Training cost was estimated at $4.6 million for a single run.

**GPT-4** (2023): Introduced multimodal capabilities (text + image input) and significantly improved reasoning, coding, and instruction following. OpenAI described it as a "multimodal model" but did not release detailed architecture specifications. It reportedly uses a mixture-of-experts (MoE) architecture.

### Computational Scaling

Training GPT-3 required approximately 3,640 petaflop/s-days of compute, using Microsoft's Azure AI supercomputer with 10,000+ V100 GPUs. This represents roughly a 1,000x increase from GPT-1.

## Further Reading

- [GPT-1 Paper](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf): Original GPT by Radford et al.
- [GPT-3 Paper](https://arxiv.org/abs/2005.14165): Language Models are Few-Shot Learners
- [HuggingFace GPT-2](https://huggingface.co/docs/transformers/model_doc/gpt2): Open-source implementation
