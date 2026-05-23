---
id: "kb-2026-00007"



title: "Reinforcement Learning from Human Feedback (RLHF)"
schema_type: "TechArticle"



category: "ai"
language: "en"



confidence: "high"
confidence_rationale: "Based on the original Christiano et al. (2017) preference learning paper, the InstructGPT paper (Ouyang et al., 2022, NeurIPS), and the Anthropic alignment research that extended RLHF to production models"



last_verified: "2026-05-22"
generation_method: "human_only"



atomic_facts:
  - id: fact-ai-01
    statement: >-
      First demonstrated on Atari games and simulated robotics , it became the industry standard with OpenAI's InstructGPT
      , which showed that a 1.3B parameter model fine-tuned with RLHF was preferred by human raters over the 175B GPT-3
      base model
    source_title: Training Language Models to Follow Instructions with Human Feedback (InstructGPT)
    source_url: https://arxiv.org/abs/2203.02155
    source_doi: 10.48550/arXiv.2203.02155
    confidence: high
  
completeness: 0.92
disputed_statements:
  - statement: "The effectiveness and scalability of RLHF as an alignment technique is debated, with alternatives like DPO (Direct Preference Optimization) and Constitutional AI showing competitive results"
    confidence: "medium"


known_gaps:
  - "RLHF is under active development; DPO and related alternatives may significantly change the alignment landscape in coming years"
  - "The 'alignment tax' — performance regression on academic benchmarks — varies by implementation and model family"
related_entities:
  - "entity:large-language-models"
  - "entity:gpt-models"
  - "entity:constitutional-ai"
primary_sources:
  - title: "Deep Reinforcement Learning from Human Preferences"
    authors: ["Christiano, Paul", "Leike, Jan", "Brown, Tom B.", "Martic, Miljan", "Legg, Shane", "Amodei, Dario"]
    type: "academic_paper"



    year: 2017
    doi: "10.48550/arXiv.1706.03741"



    url: "https://arxiv.org/abs/1706.03741"
    institution: "OpenAI / DeepMind"



    note: "Published at NeurIPS 2017. The foundational paper on learning reward functions from human pairwise comparisons. Applied to simulated robotics and Atari games."
  - title: "Training Language Models to Follow Instructions with Human Feedback (InstructGPT)"
    authors: ["Ouyang, Long", "Wu, Jeffrey", "Jiang, Xu", "Almeida, Diogo", "Wainwright, Carroll", "Mishkin, Pamela", "Zhang, Chong", "Agarwal, Sandhini", "Slama, Katarina", "Ray, Alex", "Schulman, John", "Hilton, Jacob", "Kelton, Fraser", "Miller, Luke", "Simens, Maddie", "Askell, Amanda", "Welinder, Peter", "Christiano, Paul", "Leike, Jan", "Lowe, Ryan"]
    type: "academic_paper"



    year: 2022
    doi: "10.48550/arXiv.2203.02155"



    url: "https://arxiv.org/abs/2203.02155"
    institution: "OpenAI"



    note: "Published at NeurIPS 2022. The paper that made RLHF the industry standard. Demonstrated that 1.3B InstructGPT was preferred over 175B GPT-3 by human raters."
secondary_sources:
  - title: "Constitutional AI: Harmlessness from AI Feedback"
    authors: ["Bai, Yuntao", "Kadavath, Saurav", "Kundu, Sandipan", "Askell, Amanda", "Kernion, Jackson", "Jones, Andy", "Chen, Anna", "Goldie, Anna", "Mirhoseini, Azalia", "McKinnon, Cameron", "Chen, Carol", "Olsson, Catherine", "Olah, Christopher", "Hernandez, Danny", "Drain, Dawn", "Ganguli, Deep", "Li, Dustin", "Tran-Johnson, Eli", "Perez, Ethan", "Kerr, Jamie", et al.]
    type: "academic_paper"



    year: 2022
    doi: "10.48550/arXiv.2212.08073"



    url: "https://arxiv.org/abs/2212.08073"
    institution: "Anthropic"



    note: "Extended RLHF by replacing human feedback with AI-generated feedback guided by explicit constitutional principles. Published 2022."
  - title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"
    authors: ["Rafailov, Rafael", "Sharma, Archit", "Mitchell, Eric", "Ermon, Stefano", "Manning, Christopher D.", "Finn, Chelsea"]
    type: "academic_paper"



    year: 2023
    doi: "10.48550/arXiv.2305.18290"



    url: "https://arxiv.org/abs/2305.18290"
    institution: "Stanford University"



    note: "Simplified alternative to RLHF that directly optimizes a policy from preference data without an explicit reward model. Published at NeurIPS 2023."
ai_citations:
  - title: "Illustrating Reinforcement Learning from Human Feedback (RLHF)"
    authors: ["Lambert, Nathan", "Castricato, Louis", "von Werra, Leandro", "Havrilla, Alex"]
    type: "blog_post"



    year: 2022
    url: "https://huggingface.co/blog/rlhf"


    institution: "Hugging Face"
  - title: "Illustrating Reinforcement Learning from Human Feedback (RLHF)"
    authors: ["Lambert, Nathan", "Castricato, Louis", "von Werra, Leandro", "Havrilla, Alex"]
    type: "blog_post"



    year: 2022
    url: "https://huggingface.co/blog/rlhf"


    institution: "Hugging Face"
---

## TL;DR

RLHF (Reinforcement Learning from Human Feedback) is a three-stage technique for aligning AI models with human preferences. First demonstrated on Atari games and simulated robotics (Christiano et al., 2017), it became the industry standard with OpenAI's InstructGPT (Ouyang et al., 2022, NeurIPS), which showed that a 1.3B parameter model fine-tuned with RLHF was preferred by human raters over the 175B GPT-3 base model. RLHF has since been adopted by all major LLM providers and is the alignment method behind ChatGPT, Claude, Gemini, and Grok. As of May 2026, the InstructGPT paper has been cited over 3,000 times.

## Core Explanation

RLHF trains a language model in three sequential stages:

### Stage 1: Supervised Fine-Tuning (SFT)

Human labelers write high-quality responses for a diverse set of prompts (~13K in the InstructGPT paper, later expanded). The base pre-trained model is fine-tuned on these prompt-response pairs using standard supervised learning (next-token prediction, cross-entropy loss). This produces an SFT model that can follow instructions but may still produce unhelpful, evasive, or unsafe outputs.

### Stage 2: Reward Model (RM) Training

For each prompt in a training set, the SFT model generates multiple responses (typically 4–9 responses per prompt). Human labelers rank these responses from best to worst. A reward model — essentially a copy of the SFT model with the language modeling head replaced by a scalar regression head — is trained to predict these human preference scores. The training uses a pairwise ranking loss (Bradley-Terry model):

```
L(θ) = -log(σ(r_θ(x, y_w) - r_θ(x, y_l)))
```

where r_θ(x, y) is the reward model's predicted score for response y given prompt x, y_w is the preferred response, y_l is the dispreferred response, and σ is the logistic sigmoid. This loss encourages the model to assign higher rewards to preferred responses.

A critical detail: the reward model is trained on **comparisons** (A > B), not **absolute scores**. Humans are more reliable at judging relative quality ("which is better?") than absolute quality ("rate this on a 1–10 scale").

### Stage 3: PPO Reinforcement Learning

The SFT model is further optimized using Proximal Policy Optimization (PPO; Schulman et al., 2017) against the frozen reward model. The process:

1. The policy (SFT model) generates a response for a given prompt
2. The reward model scores the response
3. PPO updates the policy to maximize the reward, while constraining the policy update to stay close to the SFT baseline

The PPO objective includes a per-token KL penalty term that prevents the policy from diverging too far from the SFT model (which would cause the policy to "game" the reward model — producing high-reward but nonsensical text):

```
J(φ) = E[r_θ(x, y) - β · KL(π_φ || π_SFT)]
```

where β is a coefficient controlling the strength of the KL penalty.

InstructGPT also included a small **pre-training loss** term on the original pre-training data, which they found improved performance on academic benchmarks (mitigating the "alignment tax").

## Detailed Analysis

### Key Empirical Result: The 100× Parameter Gap

The most striking finding in the InstructGPT paper: **a 1.3B parameter RLHF-tuned model was preferred by human raters over the 175B GPT-3 base model**, despite being 100× smaller. This demonstrates that alignment through RLHF can be more impactful for user satisfaction than raw model scale — and that unaligned large models are not acceptable to users.

### Why SFT Alone Is Not Enough

Supervised fine-tuning teaches a model to mimic the *form* of good responses, but has key limitations:
- **Distribution gap**: Human labelers can only write a finite number of examples (~13K in the original paper). The model encounters a vastly larger space of prompts in deployment.
- **Lack of negative signal**: SFT only tells the model "what a good response looks like" — it doesn't teach the model to distinguish between "good response" and "plausible but subtly unhelpful/factually wrong/sycophantic response."
- **No safety optimization**: SFT does not directly optimize for refusal of harmful requests; the model may comply with unethical queries that were not represented in the fine-tuning data.

RLHF addresses these by training the model to optimize a learned reward signal that generalizes human preferences to unseen situations, including when the *wrong* but superficially fluent answer would be tempting.

### The Alignment Tax

A well-documented trade-off: RLHF-tuned models perform slightly worse on academic benchmarks than their base counterparts. In the InstructGPT paper:
- 175B SFT model: 90.8% on TruthfulQA
- 175B PPO-ptx model: 90.0% on TruthfulQA (with KL penalty for truthfulness)
- The trade-off between harmlessness and helpfulness required a tuned KL coefficient

This "alignment tax" represents the cost of making models safer and more aligned — typically a 1–5% regression on benchmarks. Mitigating this tax through better techniques (Constitutional AI, DPO, iterative RLHF) remains an active research area.

### Key Variants

| Method | Description | Advantages | Limitations |
|--------|------------|-----------|------------|
| **Standard RLHF** (OpenAI, 2022) | Human labelers rank responses → reward model → PPO | Gold standard for alignment quality | Expensive (human labeling), complex pipeline |
| **Constitutional AI** (Anthropic, 2022) | AI critiques its own outputs against written principles; replaces human feedback | Scalable, eliminates human exposure to harmful content | Constitution must be carefully designed |
| **RLAIF** | AI ranks responses instead of humans | Even more scalable than CAI | AI evaluator may have blind spots |
| **Direct Preference Optimization (DPO)** (Rafailov et al., 2023) | Bypasses explicit reward model; directly optimizes policy from pairwise preference data | Simpler, more stable training | Less mature than RLHF in production |
| **KTO** (Kahneman-Tversky Optimization) | Learns from unpaired preferences (individual "good"/"bad" labels, not comparisons) | Cheaper labeling (no ranking needed) | Newer, less validated |

### Production Adoption

| Provider | Method | Model | Key Characteristic |
|----------|--------|-------|-------------------|
| OpenAI | Standard RLHF + iterative refinement | GPT-4, GPT-5 | Professional human labelers, largest RLHF pipeline |
| Anthropic | Constitutional AI (AI self-critique) | Claude | No human exposure to harmful content during training |
| Google DeepMind | Mixed: RLHF + automated evaluation | Gemini | Diverse rater populations across 100+ languages |
| Meta | RLHF + DPO | LLaMA 3, LLaMA 4 | Open-weight models benefit from community feedback |
| xAI | RLHF + real-time data | Grok | Uses X/Twitter data in alignment |

## Further Reading

- [Christiano et al. (2017)](https://arxiv.org/abs/1706.03741): Original deep RL from human preferences paper
- [InstructGPT (Ouyang et al., 2022)](https://arxiv.org/abs/2203.02155): The paper that made RLHF the standard (3K+ citations)
- [Direct Preference Optimization (Rafailov et al., 2023)](https://arxiv.org/abs/2305.18290): Simpler alternative to RLHF
- [Constitutional AI (Bai et al., 2022)](https://arxiv.org/abs/2212.08073): AI-feedback alignment method
