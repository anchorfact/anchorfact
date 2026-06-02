---
id: llm-evaluation-run-metadata-and-reproducibility
title: 'LLM Evaluation Run Metadata and Reproducibility'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-run-metadata-and-reproducibility-1
    statement: >-
      MLflow Tracking documentation says its tracking APIs provide functions to track runs and log
      parameters and metrics.
    source_title: MLflow Experiment Tracking
    source_url: https://mlflow.github.io/mlflow-website/docs/latest/ml/tracking/
    confidence: medium
  - id: fact-ai-llm-evaluation-run-metadata-and-reproducibility-2
    statement: >-
      Weights & Biases documentation describes workflows for creating experiments, configuring
      experiments, logging experiment data, and viewing experiment results.
    source_title: Weights & Biases Experiments
    source_url: https://docs.wandb.ai/guides/track/
    confidence: medium
  - id: fact-ai-llm-evaluation-run-metadata-and-reproducibility-3
    statement: >-
      DVC experiment documentation says ML experiments can be saved as they run or after they
      complete, and that DVC can track and compare parameters, metrics, and plots.
    source_title: DVC Experiments
    source_url: https://dvc.org/doc/user-guide/experiment-management
    confidence: medium
completeness: 0.81
known_gaps:
  - LLM reproducibility also depends on provider-side model revisions, nondeterminism, sampling parameters, system prompts, tool schemas, retrieved context, safety filters, and hidden serving changes.
disputed_statements: []
primary_sources:
  - title: MLflow Experiment Tracking
    type: documentation
    year: 2026
    url: https://mlflow.github.io/mlflow-website/docs/latest/ml/tracking/
    institution: MLflow
  - title: Weights & Biases Experiments
    type: documentation
    year: 2026
    url: https://docs.wandb.ai/guides/track/
    institution: Weights & Biases
  - title: DVC Experiments
    type: documentation
    year: 2026
    url: https://dvc.org/doc/user-guide/experiment-management
    institution: DVC
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

An LLM eval result is weak evidence unless the run metadata records exactly what was tested and how the result can be compared later.

## Core Explanation

Evaluation runs should capture model identifier, prompt version, tool schema version, dataset version, randomization settings, retrieval snapshot, grader version, metric definitions, and code commit. Without that metadata, a later regression cannot tell whether quality changed because of the model, prompt, dataset, retriever, or evaluator.

Agents should preserve run IDs and artifact links in issue comments, CI summaries, and experiment dashboards. For online evals, they should also record traffic assignment and guardrail metrics; for offline evals, they should record input hashes and expected-answer versions.

## Source-Mapped Facts

- MLflow Tracking documentation says its tracking APIs provide functions to track runs and log parameters and metrics. ([source](https://mlflow.github.io/mlflow-website/docs/latest/ml/tracking/))
- Weights & Biases documentation describes workflows for creating experiments, configuring experiments, logging experiment data, and viewing experiment results. ([source](https://docs.wandb.ai/guides/track/))
- DVC experiment documentation says ML experiments can be saved as they run or after they complete, and that DVC can track and compare parameters, metrics, and plots. ([source](https://dvc.org/doc/user-guide/experiment-management))

## Further Reading

- [MLflow Experiment Tracking](https://mlflow.github.io/mlflow-website/docs/latest/ml/tracking/)
- [Weights & Biases Experiments](https://docs.wandb.ai/guides/track/)
- [DVC Experiments](https://dvc.org/doc/user-guide/experiment-management)
