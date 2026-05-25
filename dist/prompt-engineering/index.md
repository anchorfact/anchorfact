---
id: prompt-engineering
title: "Prompt Engineering: Techniques for LLM Interaction"
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
      Chain-of-Thought prompting (Wei et al. 2022, Google, NeurIPS) elicits step-by-step reasoning by adding "Let's think step by step" to prompts, dramatically improving performance on multi-step
      reasoning tasks like math and commonsense QA.
    source_title: Wei, Jason, et al. Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. NeurIPS 2022
    source_url: https://arxiv.org/abs/2201.11903
    confidence: high
  - id: f2
    statement: Tree of Thoughts (Yao et al. 2023, NeurIPS) extends CoT by exploring multiple reasoning paths via BFS/DFS with self-evaluation, achieving 74% on Game of 24 vs 4% with standard prompting.
    source_title: "Yao, Shunyu, et al. Tree of Thoughts: Deliberate Problem Solving with Large Language Models. NeurIPS 2023"
    source_url: https://arxiv.org/abs/2305.10601
    confidence: high
  - id: f3
    statement: >-
      Few-shot prompting (Brown et al. 2020, GPT-3) showed that providing 1-64 input-output examples in the prompt enables LLMs to perform new tasks without any gradient updates, establishing
      in-context learning as a fundamental capability.
    source_title: Brown, Tom B., et al. Language Models are Few-Shot Learners. NeurIPS 2020
    source_url: https://arxiv.org/abs/2005.14165
    confidence: high
completeness: 0.9
known_gaps:
  - Automated prompt optimization (DSPy)
  - Prompt injection security
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2201.11903
    institution: NeurIPS
  - title: Language Models are Few-Shot Learners (GPT-3)
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2005.14165
    institution: NeurIPS
secondary_sources:
  - title: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
    type: conference_paper
    year: 2022
    authors:
      - Wei, Jason
      - Wang, Xuezhi
      - Schuurmans, Dale
      - et al.
    institution: Google Research / NeurIPS
    url: https://arxiv.org/abs/2201.11903
  - title: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models"
    type: conference_paper
    year: 2023
    authors:
      - Yao, Shunyu
      - Yu, Dian
      - Zhao, Jeffrey
      - et al.
    institution: Princeton / Google DeepMind / NeurIPS
    url: https://arxiv.org/abs/2305.10601
  - title: "A Survey on Prompt Engineering: From Few-Shot to Chain-of-Thought to Automatic Prompt Optimization"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
  - title: Large Language Models are Zero-Shot Reasoners (Self-Consistency / Google)
    type: conference_paper
    year: 2022
    authors:
      - Kojima, Takeshi
      - Gu, Shixiang Shane
      - Reid, Machel
      - Matsuo, Yutaka
      - Iwasawa, Yusuke
    institution: University of Tokyo / Google Research / NeurIPS
    url: https://arxiv.org/abs/2205.11916
updated: "2026-05-24"
---
## TL;DR
Prompt engineering is the practice of designing text inputs to elicit desired outputs from language models. It has evolved from simple instruction writing to systematic techniques for reasoning, constraint specification, and multi-step task decomposition.

## Core Explanation
Key techniques: zero-shot (instruction only), few-shot (instruction + examples), chain-of-thought (step-by-step reasoning), tree-of-thoughts (exploring multiple reasoning paths), ReAct (reasoning + action interleaving), and structured output formatting (JSON mode, function calling).

## Detailed Analysis
Prompt templates with variables enable dynamic prompt construction for production applications. Retrieval-augmented generation (RAG) adds context from external knowledge bases. Constitutional AI uses principle-based prompts to steer model behavior toward safety. DSPy (Stanford, 2024) treats prompts as optimizable parameters.

## Further Reading
- OpenAI: Prompt Engineering Guide
- Anthropic: Prompt Library
- Prompting Guide (DAIR.AI)