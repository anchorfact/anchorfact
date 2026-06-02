---
id: code-ci-problem-matchers-and-annotations-for-agents
title: 'Code CI Problem Matchers and Annotations for Agents'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-code-ci-problem-matchers-and-annotations-for-agents-1
    statement: >-
      GitHub Actions runner ADR 0276 says problem matchers can be registered with the
      ::add-matcher::path-to-problem-matcher-config.json command.
    source_title: 'ADR 0276: Problem Matchers'
    source_url: https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md
    confidence: medium
  - id: fact-cs-code-ci-problem-matchers-and-annotations-for-agents-2
    statement: >-
      GitHub Actions runner ADR 0276 maps matched build output into issue properties such as
      file, line, column, severity, code, message, and fromPath.
    source_title: 'ADR 0276: Problem Matchers'
    source_url: https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md
    confidence: medium
  - id: fact-cs-code-ci-problem-matchers-and-annotations-for-agents-3
    statement: >-
      GitHub Actions documentation describes workflow commands that communicate with the runner by
      echoing specially formatted command strings.
    source_title: GitHub Actions Workflow Commands
    source_url: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands
    confidence: medium
completeness: 0.8
known_gaps:
  - CI annotation usefulness depends on path normalization, workspace roots, generated files, line mapping, SARIF uploads, matrix jobs, and whether build output is stable across environments.
disputed_statements: []
primary_sources:
  - title: 'ADR 0276: Problem Matchers'
    type: documentation
    year: 2019
    url: https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md
    institution: GitHub
  - title: GitHub Actions Workflow Commands
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands
    institution: GitHub
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Problem matchers and CI annotations turn raw build logs into file, line, severity, and message records that code agents can act on.

## Core Explanation

Build logs often contain actionable diagnostics buried among thousands of lines. A problem matcher extracts structured fields from tool output, while CI annotation commands let a workflow surface errors and warnings in the code review interface.

Agents should prefer structured annotations, SARIF, or problem-matcher output over plain text when available. They should verify the file path base, line number, column, severity, message, matrix job, and generated-file status before editing code.

## Source-Mapped Facts

- GitHub Actions runner ADR 0276 says problem matchers can be registered with the ::add-matcher::path-to-problem-matcher-config.json command. ([source](https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md))
- GitHub Actions runner ADR 0276 maps matched build output into issue properties such as file, line, column, severity, code, message, and fromPath. ([source](https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md))
- GitHub Actions documentation describes workflow commands that communicate with the runner by echoing specially formatted command strings. ([source](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands))

## Further Reading

- [ADR 0276: Problem Matchers](https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md)
- [GitHub Actions Workflow Commands](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands)
