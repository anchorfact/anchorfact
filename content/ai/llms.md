---
id: "kb-2026-00005"


title: "Large Language Models (LLMs)"
schema_type: "TechArticle"


category: "ai"
language: "en"


confidence: "high"
confidence_rationale: "Based on GPT-3 (Brown et al., 2020), Chinchilla (Hoffmann et al., 2022), Emergent Abilities (Wei et al., 2022), and verified benchmarks from HELM and public leaderboards"


last_verified: "2026-05-22"
generation_method: "human_only"


atomic_facts:
  - id: fact-ai-01
    statement: >-
      Large Language Models are Transformer-based neural networks trained on internet-scale text corpora to predict and
      generate human language
    source_title: Language Models are Few-Shot Learners (GPT-3)
    source_url: https://arxiv.org/abs/2005.14165
    source_doi: 10.48550/arXiv.2005.14165
    confidence: high
  - id: fact-ai-02
    statement: >-
      They exhibit emergent abilities — qualitatively new capabilities that appear abruptly when model size exceeds
      specific thresholds, without being explicitly programmed
    source_title: Emergent Abilities of Large Language Models
    source_url: https://arxiv.org/abs/2206.07682
    source_doi: 10.48550/arXiv.2206.07682
    confidence: high
  - id: fact-ai-03
    statement: >-
      The key insight is scaling: as model size, training data volume, and compute budget increase simultaneously, model
      performance improves predictably — but also acquires qualitatively new capabilities that smaller models simply do
      not possess
    source_title: Training Compute-Optimal Large Language Models (Chinchilla)
    source_url: https://arxiv.org/abs/2203.15556
    source_doi: 10.48550/arXiv.2203.15556
    confidence: high
  
completeness: 0.90
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"

known_gaps:
  - "Benchmark scores are from public leaderboards as of late 2024; newer models may exceed these by the time of reading"
  - "Model parameter counts for frontier models (GPT-4, Gemini, Claude) are estimates from external analysis, not official documentation"
related_entities:
  - "entity:transformer-architecture"
  - "entity:gpt-models"
  - "entity:bert"
  - "entity:rlhf"
  - "entity:mixture-of-experts"
primary_sources:
  - title: "Language Models are Few-Shot Learners (GPT-3)"
    authors: ["Brown, Tom B.", "Mann, Benjamin", "Ryder, Nick", "Kaplan, Jared", et al.]
    type: "academic_paper"


    year: 2020
    doi: "10.48550/arXiv.2005.14165"


    url: "https://arxiv.org/abs/2005.14165"
    institution: "OpenAI"
  - title: "Training Compute-Optimal Large Language Models (Chinchilla)"
    authors: ["Hoffmann, Jordan", "Borgeaud, Sebastian", "Mensch, Arthur", et al.]
    type: "academic_paper"


    year: 2022
    doi: "10.48550/arXiv.2203.15556"


    url: "https://arxiv.org/abs/2203.15556"
    institution: "DeepMind"


    note: "Established the Chinchilla scaling laws: optimal training requires ~20 tokens per parameter"
  - title: "Emergent Abilities of Large Language Models"
    authors: ["Wei, Jason", "Tay, Yi", "Bommasani, Rishi", "Raffel, Colin", "Zoph, Barret", "Borgeaud, Sebastian", "Yogatama, Dani", "Bosma, Maarten", "Zhou, Denny", "Metzler, Donald", "Chi, Ed H.", "Hashimoto, Tatsunori", "Vinyals, Oriol", "Liang, Percy", "Dean, Jeff", "Fedus, William"]
    type: "academic_paper"


    year: 2022
    doi: "10.48550/arXiv.2206.07682"


    url: "https://arxiv.org/abs/2206.07682"
    institution: "Google Research"


    note: "Documented 100+ tasks where LLM capabilities emerge suddenly at specific scale thresholds"
secondary_sources:
  - title: "Stanford CRFM HELM Benchmark"
    type: "benchmark"


    year: 2025
    url: "https://crfm.stanford.edu/helm/"

    institution: "Stanford University"
  - title: "Scaling Laws for Neural Language Models"
    authors: ["Kaplan, Jared", "McCandlish, Sam", "Henighan, Tom", et al.]
    type: "academic_paper"


    year: 2020
    doi: "10.48550/arXiv.2001.08361"


    url: "https://arxiv.org/abs/2001.08361"
    institution: "OpenAI"


    note: "The original scaling laws paper that established the power-law relationship between loss, compute, and model size"
ai_citations:
  - title: "How to Train Really Large Models on Many GPUs?"
    authors: ["Weng, Lilian"]
    type: "blog_post"


    year: 2021
    url: "https://lilianweng.github.io/posts/2021-09-25-train-large/"

    institution: "OpenAI"
  - title: "LLaMA: Open and Efficient Foundation Language Models"
    authors: ["Touvron, Hugo", "Lavril, Thibaut", "Izacard, Gautier", "Martinet, Xavier", "Lachaux, Marie-Anne", "Lacroix, Timothée", "Rozière, Baptiste", "Goyal, Naman", "Hambro, Eric", "Azhar, Faisal", "Rodriguez, Aurelien", "Joulin, Armand", "Grave, Edouard", "Lample, Guillaume"]
    type: "academic_paper"


    year: 2023
    doi: "10.48550/arXiv.2302.13971"


    url: "https://arxiv.org/abs/2302.13971"
    institution: "Meta AI"
  - title: "LLaMA: Open and Efficient Foundation Language Models"
    authors: ["Touvron, Hugo", "Lavril, Thibaut", "Izacard, Gautier", "Martinet, Xavier", "Lachaux, Marie-Anne", "Lacroix, Timothée", "Rozière, Baptiste", "Goyal, Naman", "Hambro, Eric", "Azhar, Faisal", "Rodriguez, Aurelien", "Joulin, Armand", "Grave, Edouard", "Lample, Guillaume"]
    type: "academic_paper"


    year: 2023
    doi: "10.48550/arXiv.2302.13971"


    url: "https://arxiv.org/abs/2302.13971"
    institution: "Meta AI"
  - title: "How to Train Really Large Models on Many GPUs?"
    authors: ["Weng, Lilian"]
    type: "blog_post"


    year: 2021
    url: "https://lilianweng.github.io/posts/2021-09-25-train-large/"

    institution: "OpenAI"
---

## TL;DR

Large Language Models (LLMs) are Transformer-based neural networks trained on internet-scale text corpora (trillions of tokens) to predict and generate human language. They exhibit **emergent abilities** — qualitatively new capabilities (arithmetic, reasoning, coding, translation) that appear abruptly when model size exceeds specific thresholds, without being explicitly programmed. The Chinchilla scaling laws (Hoffmann et al., 2022) established that optimal training requires approximately 20 tokens of training data per model parameter. As of May 2026, frontier LLMs exceed 1 trillion parameters, process 2+ million token context windows, and power products used by over 300 million weekly active users (ChatGPT alone).

## Core Explanation

LLMs are trained in three stages:

1. **Pre-training**: Self-supervised next-token prediction on trillions of tokens from web text, books, academic papers, and code. This phase consumes >99% of total training compute and is the most expensive component.

2. **Supervised Fine-Tuning (SFT) / Instruction Tuning**: The pre-trained model is fine-tuned on human-curated prompt-response pairs (typically tens of thousands of examples). This teaches the model to follow instructions rather than simply complete text.

3. **RLHF (Reinforcement Learning from Human Feedback)** : Human labelers rank model outputs; a reward model is trained on these preferences; PPO reinforcement learning optimizes the LLM to produce outputs that maximize human preference scores. This alignment step makes the model helpful, harmless, and honest.

The key insight is **scaling**: as model size, training data volume, and compute budget increase simultaneously, model performance improves predictably — but also acquires *qualitatively new* capabilities that smaller models simply do not possess.

## Detailed Analysis

### Scaling Laws

**Kaplan et al. (2020, OpenAI)** established the first empirical scaling laws: language modeling loss follows a power-law relationship with model size (N), dataset size (D), and compute (C) individually, with diminishing returns when any dimension is bottlenecked:

```
L(N) ∝ N^(-0.076)
L(D) ∝ D^(-0.095)
L(C_opt) ∝ C^(-0.050)
```

**Chinchilla scaling laws** (Hoffmann et al., 2022, DeepMind) refined this analysis, finding that previous models (including GPT-3) were significantly **undertrained** — they had too many parameters relative to their training data. The Chinchilla optimal: for a given compute budget, parameters and training tokens should scale **equally** — approximately 20 tokens per parameter. This means training a 70B model requires ~1.4 trillion tokens, not the ~300 billion tokens that GPT-3 (175B) was trained on. The 70B Chinchilla model matched or exceeded the performance of the 280B Gopher model despite being 4× smaller, simply because it was trained on 4× more data.

| Model | Parameters | Training Tokens | Tokens/Param | Chinchilla-Optimal? |
|-------|:----------:|:---------------:|:------------:|:-------------------:|
| GPT-3 | 175B | ~300B | ~1.7 | ❌ Massively undertrained |
| Gopher | 280B | ~300B | ~1.1 | ❌ Undertrained |
| Chinchilla | 70B | ~1.4T | ~20 | ✅ Optimal |
| LLaMA 2 70B | 70B | 2T | ~29 | ✅ Slightly overtrained |
| LLaMA 3 70B | 70B | 15T | ~214 | ✅ Deliberately overtrained |

### Emergent Abilities

Wei et al. (2022, Google Research) documented a phenomenon where LLM capabilities appear suddenly at specific scale thresholds — not gradually, but with a phase transition. At 7B parameters, an LLM performs near-random on arithmetic; at 13B, it shows modest improvement; at ~50B, it suddenly achieves >90% accuracy. This pattern repeats across over 100 documented tasks.

| Emergent Capability | Threshold (approx.) | Example |
|--------------------|:-------------------:|---------|
| Arithmetic | ~10B | 3-digit addition suddenly works |
| Translation | ~30B | BLEU scores jump from near-zero |
| Multi-step reasoning | ~50B | Chain-of-thought becomes effective |
| Instruction following | ~100B | Zero-shot task completion |
| Tool use | ~200B | API calling, code execution |

**Important caveat**: Schaeffer et al. (2023) argued that whether emergence appears "abrupt" depends on the choice of metric — continuous metrics (e.g., token-level loss) show smooth improvement, while discontinuous metrics (e.g., exact-match accuracy) create the illusion of sudden jumps. The debate about whether emergence is a fundamental property or a measurement artifact remains active.

### Frontier LLM Landscape (May 2026)

| Family | Developer | Params (Latest) | Context Length | Key Architecture | Open Weights |
|--------|-----------|:--------------:|:-------------:|-----------------|:------------:|
| GPT | OpenAI | Trillions (MoE) | 128K+ | Decoder-only | ❌ |
| Claude | Anthropic | ~1T+ (est.) | 200K+ | Decoder-only | ❌ |
| Gemini | Google DeepMind | Trillions (MoE) | 2M | Decoder-only, natively multimodal | ❌ |
| LLaMA | Meta | 400B+ | 128K | Decoder-only | ✅ |
| Grok | xAI | 300B+ | 128K+ | Decoder-only (MoE) | ✅ (v1) |
| Qwen | Alibaba | 200B+ | 1M | Decoder-only | ✅ |
| DeepSeek | DeepSeek AI | 671B (MoE) | 128K+ | Decoder-only (MoE) | ✅ |
| Mistral | Mistral AI | 100B+ | 128K | Decoder-only | ✅ |

### Applications

LLMs are deployed across virtually every knowledge-work domain:

| Domain | Key Applications | Representative Tools |
|--------|-----------------|---------------------|
| Software Engineering | Code generation, review, debugging, documentation | GitHub Copilot, Cursor, Claude Code |
| Content Creation | Marketing copy, articles, translations | ChatGPT, Claude, Jasper |
| Education | Tutoring, problem solving, essay feedback | Khan Academy AI (Khanmigo), Duolingo Max |
| Healthcare | Clinical summarization, literature analysis | Abridge, Nabla Copilot |
| Legal | Contract review, e-discovery, research | Harvey AI, CoCounsel |
| Scientific Research | Literature review, hypothesis generation | Elicit, Consensus, Microsoft Discovery |

### Key Benchmarks (Late 2024)

| Benchmark | Focus | GPT-4 | Claude 3.5 Sonnet | Gemini 1.5 Pro | LLaMA 3.1 405B |
|-----------|-------|:-----:|:-----------------:|:-------------:|:-------------:|
| MMLU | Multitask knowledge (57 subjects) | 86.4% | 88.7% | 85.9% | 88.6% |
| HumanEval | Python code generation | 87.0% | 92.0% | 83.0% | 89.0% |
| MATH | Mathematical reasoning | 72.2% | 71.1% | 67.7% | 73.8% |
| GPQA | Graduate-level Q&A | 41.4% | 59.4% | 46.2% | 51.1% |

*Note: Frontier models are updated frequently. These scores are from public leaderboards as of November 2024. Consult the HELM benchmark (Stanford CRFM) for continuously updated evaluations.*

### Training Costs

| Model | Parameters | Training Cost (est.) | Year |
|-------|:----------:|:--------------------:|:----:|
| GPT-3 (175B) | 175B | ~$4.6M | 2020 |
| PaLM (540B) | 540B | ~$10M | 2022 |
| GPT-4 | ~1.76T (MoE, est.) | ~$100M+ (est.) | 2023 |
| Gemini Ultra | Trillions (MoE) | ~$150M+ (est.) | 2024 |

Training costs have increased approximately 10× per generation, driven primarily by larger models and datasets.

## Further Reading

- [GPT-3 Paper](https://arxiv.org/abs/2005.14165): Language Models are Few-Shot Learners (30K+ citations)
- [Chinchilla Paper](https://arxiv.org/abs/2203.15556): Training Compute-Optimal LLMs
- [Emergent Abilities Paper](https://arxiv.org/abs/2206.07682): Wei et al., 2022
- [HELM Benchmark](https://crfm.stanford.edu/helm/): Stanford's holistic evaluation framework
