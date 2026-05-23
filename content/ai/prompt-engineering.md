---
id:"prompt-engineering"
title:"Prompt Engineering: Techniques for LLM Interaction"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-prompt-engineering-1"
    statement:"Chain-of-thought prompting (Wei et al., 2022) elicits step-by-step reasoning by including \"Let's think step by step\" in prompts, improving LLM accuracy on arithmetic, commonsense, and symbolic reasoning tasks by 10-40% without model modification."
    source_title:"Wei et al., NeurIPS (2022)"
    confidence:"high"
  - id:"af-prompt-engineering-2"
    statement:"Few-shot prompting — providing 2-5 task examples in the prompt without weight updates — enables GPT-3 to perform translation, question answering, and code generation at competitive levels, demonstrating LLMs as meta-learners."
    source_title:"Brown et al., NeurIPS (2020)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
    type:"academic_paper"
    year:2022
    url:"https://arxiv.org/abs/2201.11903"
    institution:"NeurIPS"
  - title:"Language Models are Few-Shot Learners (GPT-3)"
    type:"academic_paper"
    year:2020
    url:"https://arxiv.org/abs/2005.14165"
    institution:"NeurIPS"

known_gaps:
  - "Automated prompt optimization (DSPy)"
  - "Prompt injection security"

disputed_statements:
  - statement:"No major disputed statements identified"

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