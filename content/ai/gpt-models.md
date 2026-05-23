---
id: "kb-2026-00004"
title: "GPT (Generative Pre-trained Transformer) Model Family"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-01"
    statement: "The GPT model family, developed by OpenAI starting in 2018, represents the lineage of autoregressive language models that scaled from 117M to trillions of parameters, establishing text generation as the primary paradigm for general-purpose AI"
    source_title: "Language Models are Unsupervised Multitask Learners (GPT-2)"
    source_url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
  - id: "fact-ai-001"
    statement: "Each layer applies **masked (causal) self-attention**, where position i can only attend to positions 1 through i — future tokens are explicitly masked."
    source_title: "Improving Language Understanding by Generative Pre-Training (GPT-1)"
    source_url: "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
    confidence: "high"
  - id: "fact-ai-002"
    statement: "This ensures the model cannot \"cheat\" by looking ahead during training, and it is the critical architectural choice that enables coherent text generation."
    source_title: "Improving Language Understanding by Generative Pre-Training (GPT-1)"
    source_url: "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
    confidence: "high"
  - id: "fact-ai-003"
    statement: "The training paradigm evolved through three stages: 1."
    source_title: "Improving Language Understanding by Generative Pre-Training (GPT-1)"
    source_url: "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
    confidence: "high"
  - id: "fact-ai-004"
    statement: "**Pre-train then fine-tune** (GPT-1): Pre-train on unlabeled text, fine-tune on labeled downstream tasks 2."
    source_title: "Improving Language Understanding by Generative Pre-Training (GPT-1)"
    source_url: "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
    confidence: "high"
  - id: "fact-ai-005"
    statement: "**Zero-shot transfer** (GPT-2): Pre-train on a large enough corpus, and the model acquires task-solving capability without any fine-tuning 3."
    source_title: "Language Models are Few-Shot Learners (GPT-3)"
    source_url: "https://arxiv.org/abs/2005.14165"
    source_doi: "10.48550/arXiv.2005.14165"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "GPT-4 architecture details (layer count, hidden dimensions) are not publicly disclosed by OpenAI; MoE estimate (~1.76T total, ~280B active) is based on media and analyst reports, not official documentation"
  - "GPT-5 and GPT-5.2 specifications are based on public announcements and press coverage; technical details are not published"
  - "Training cost estimates are ballpark figures from external analysis, not official OpenAI disclosure"

disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"

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
    authors: ["Brown, Tom B.", "Mann, Benjamin", "Ryder, Nick", "Subbiah, Melanie", "Kaplan, Jared", "Dhariwal, Prafulla", "Neelakantan, Arvind", "Shyam, Pranav", "Sastry, Girish", "Askell, Amanda", "Agarwal, Sandhini", "Herbert-Voss, Ariel", "Krueger, Gretchen", "Henighan, Tom", "Child, Rewon", "Ramesh, Aditya", "Ziegler, Daniel M.", "Wu, Jeffrey", "Winter, Clemens", "Hesse, Christopher", "Chen, Mark", "Sigler, Eric", "Litwin, Mateusz", "Gray, Scott", "Chess, Benjamin", "Clark, Jack", "Berner, Christopher", "McCandlish, Sam", "Radford, Alec", "Sutskever, Ilya", "Amodei, Dario"]
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/2005.14165"
    doi: "10.48550/arXiv.2005.14165"
    institution: "arXiv / Cornell University"
  - title: "GPT-4 Technical Report"

secondary_sources:
  - title: "Training language models to follow instructions with human feedback (InstructGPT)"
    authors: ["Ouyang, Long", "Wu, Jeffrey", "Jiang, Xu", "et al."]
    type: "academic_paper"
    year: 2022
    url: "https://arxiv.org/abs/2203.02155"
    doi: "10.48550/arXiv.2203.02155"
    institution: "Cornell University"

---




## TL;DR

The GPT (Generative Pre-trained Transformer) model family, developed by OpenAI starting in 2018, represents the lineage of autoregressive language models that scaled from 117M to trillions of parameters, establishing text generation as the primary paradigm for general-purpose AI. GPT-1 (June 2018) introduced the Transformer decoder for language modeling; GPT-2 (February 2019, 1.5B parameters) demonstrated zero-shot transfer capabilities that alarmed researchers enough to stagger its release; GPT-3 (May 2020, 175B parameters) established few-shot learning as a viable paradigm and catalyzed the commercial LLM ecosystem; GPT-4 (March 2023, estimated 1.76T parameters with Mixture-of-Experts) introduced multimodal capabilities and near-human performance on professional exams. As of May 2026, the GPT lineage powers ChatGPT, which has over 300 million weekly active users.

## Core Explanation

GPT models are **autoregressive** — they generate text one token at a time, predicting each next token based on all previously generated tokens:

```
P(x₁, x₂, ..., xₖ) = ∏ᵢ₌₁ᵏ P(xᵢ | x₁, ..., xᵢ₋₁)
```

The architecture uses only the Transformer **decoder** (not the encoder, unlike BERT). Each layer applies **masked (causal) self-attention**, where position i can only attend to positions 1 through i — future tokens are explicitly masked. This ensures the model cannot "cheat" by looking ahead during training, and it is the critical architectural choice that enables coherent text generation.

The training paradigm evolved through three stages:
1. **Pre-train then fine-tune** (GPT-1): Pre-train on unlabeled text, fine-tune on labeled downstream tasks
2. **Zero-shot transfer** (GPT-2): Pre-train on a large enough corpus, and the model acquires task-solving capability without any fine-tuning
3. **Few-shot / in-context learning** (GPT-3, GPT-4): Provide a few examples in the prompt; the model adapts without weight updates

## Detailed Analysis

### Architecture Evolution

| Version | Parameters | Layers | d_model | Heads | d_ff | Context | Training Data | Year |
|---------|:--------:|:-----:|:-------:|:----:|:----:|:--------:|--------------|:----:|
| GPT-1 | 117M | 12 | 768 | 12 | 3072 | 512 | BooksCorpus (~5GB) | Jun 2018 |
| GPT-2 | 1.5B | 48 | 1,600 | 25 | 6,400 | 1,024 | WebText (40GB, 8M pages) | Feb 2019 |
| GPT-3 | 175B | 96 | 12,288 | 96 | 49,152 | 2,048 | Common Crawl filtered (570GB) | May 2020 |
| GPT-4 | ~1.76T (MoE est.) | Undisclosed | Undisclosed | Undisclosed | Undisclosed | 8,192–32,768 | Undisclosed | Mar 2023 |

*Note: GPT-4 architecture details are from external analysis (SemiAnalysis, press reports), not official OpenAI disclosure. The MoE design is reported to use 8 experts per layer with top-2 gating, yielding ~280B active parameters per forward pass.*

### Causal Masking Mechanism

The decoder-only design uses a lower-triangular attention mask:

```
Attention mask for sequence of length 5:
  [1 0 0 0 0]    Token 1 can only see itself
  [1 1 0 0 0]    Token 2 can see tokens 1,2
  [1 1 1 0 0]    Token 3 can see tokens 1,2,3
  [1 1 1 1 0]    Token 4 can see tokens 1,2,3,4
  [1 1 1 1 1]    Token 5 can see all previous tokens
```

This is implemented by adding −∞ to the attention scores of masked positions before softmax, effectively zeroing out their contribution.

### Key Innovations Per Version

**GPT-1** (Radford et al., June 2018): The first paper to demonstrate that unsupervised pre-training on a large text corpus (BooksCorpus) with a Transformer decoder could significantly improve supervised fine-tuning performance across diverse NLP tasks. At 117M parameters with a 12-layer decoder-only architecture, it achieved new state-of-the-art on 9 out of 12 tasks studied, including natural language inference, question answering, semantic similarity, and text classification. The key insight: language modeling as pre-training creates a strong general-purpose initialization.

**GPT-2** (Radford et al., February 2019): Scaled the decoder to 1.5B parameters (the largest version, with smaller 117M, 345M, and 762M variants also released) and demonstrated that a language model trained on sufficiently diverse data can perform tasks zero-shot — without any fine-tuning. On the LAMBADA language modeling benchmark, GPT-2 achieved 63.24 perplexity (zero-shot, vs. 99.5 for previous best fine-tuned). On the Children's Book Test, it achieved 93.3% accuracy on common nouns (vs. 92.0% SOTA). OpenAI's decision to initially release only the 117M model, then 345M, and finally the full 1.5B model sparked a public debate about responsible AI release practices that continues to shape the field.

**GPT-3** (Brown et al., May 2020): Scaled to 175B parameters — 100× larger than GPT-2 — with 96 Transformer layers and 96 attention heads. Trained on approximately 570GB of filtered text (Common Crawl + WebText2 + Books + Wikipedia). GPT-3 was the first model to demonstrate that **few-shot learning** — providing a small number of task demonstrations in the prompt — could match or exceed fine-tuned models. It achieved 71.8% on SuperGLUE in the few-shot setting, compared to 89.0 for fine-tuned SOTA — remarkable given zero weight updates. The paper has 31 co-authors and, as of May 2026, over 30,000 citations. Training cost was estimated at $4.6 million for a single run on Microsoft's Azure AI supercomputer (~10,000 V100 GPUs).

**InstructGPT / ChatGPT** (Ouyang et al., 2022): While not a new architecture, this was the critical step that made GPT useful to users. Using RLHF (Reinforcement Learning from Human Feedback), OpenAI aligned GPT-3 with human preferences: human labelers ranked model outputs, a reward model was trained on these rankings, and PPO reinforcement learning optimized the model to produce preferred outputs. The result — ChatGPT (November 2022) — reached 100 million users in 2 months, the fastest product adoption in history.

**GPT-4** (OpenAI, March 2023): A multimodal model accepting both text and image inputs. OpenAI declined to disclose architecture details citing competitive and safety concerns. External analysis indicates it uses a Mixture-of-Experts design with approximately 1.76 trillion total parameters across 8 experts, with ~280 billion active per forward pass. GPT-4 achieved human-level performance on professional exams: 88th percentile on the LSAT, 90th percentile on the Uniform Bar Exam, and a 5 ("extremely well qualified") on AP Calculus BC.

### Computational Scaling

| Model | Training Compute | Estimated Cost | Hardware | 
|-------|:---------------:|:------------:|---------|
| GPT-1 | ~0.1 petaflop/s-days | <$10K | 8 × GPUs |
| GPT-2 | ~10 petaflop/s-days | ~$50K | 32 × TPUv3 |
| GPT-3 | 3,640 petaflop/s-days | ~$4.6M | ~10,000 × V100 |
| GPT-4 | Undisclosed | Est. $100M+ | Est. 25,000 × A100 |

Each generation represented approximately a 100× increase in training compute.

### GPT vs. BERT: The Great 2018 Bifurcation

| Dimension | GPT | BERT |
|-----------|:---:|:----:|
| First paper | Jun 2018 | Oct 2018 |
| Architecture | Decoder-only | Encoder-only |
| Context | Unidirectional (causal) | Bidirectional |
| Core task | Text generation | Text understanding |
| Scaling trajectory | 117M → 1.5B → 175B → trillions | 110M → 340M (plateaued) |
| Commercial impact | ChatGPT, API, ecosystem | Research, transfer learning |

The decoder-only design proved more scalable: as models grew larger, autoregressive models demonstrated that they could perform understanding tasks as well — essentially, a large enough generator can also comprehend. The encoder-only design plateaued at BERT-Large (340M) because bidirectionality, while superior for understanding at smaller scales, does not scale to generation tasks.

## Further Reading

- [GPT-1 Paper](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf): Original GPT (Radford et al., 2018)
- [GPT-2 Paper](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf): Zero-shot transfer at scale (Radford et al., 2019)
- [GPT-3 Paper](https://arxiv.org/abs/2005.14165): Language Models are Few-Shot Learners (Brown et al., 2020, 30K+ citations)
- [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774): OpenAI's report (architecture intentionally undisclosed)
- [InstructGPT Paper](https://arxiv.org/abs/2203.02155): The RLHF paper that made ChatGPT work
