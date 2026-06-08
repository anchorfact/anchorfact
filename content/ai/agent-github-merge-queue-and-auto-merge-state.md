---
id: agent-github-merge-queue-and-auto-merge-state
title: 'Agent GitHub Merge Queue and Auto-Merge State'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-github-merge-queue-and-auto-merge-state-1
    statement: >-
      GitHub auto-merge documentation says a pull request with auto-merge enabled will merge automatically when required reviews are met and required status checks pass.
    source_title: GitHub Automatically Merging a Pull Request
    source_url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request
    confidence: medium
  - id: fact-ai-agent-github-merge-queue-and-auto-merge-state-2
    statement: >-
      GitHub auto-merge documentation says auto-merge is disabled if someone without write permission pushes new changes to the pull request head branch or switches the base branch.
    source_title: GitHub Automatically Merging a Pull Request
    source_url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request
    confidence: medium
  - id: fact-ai-agent-github-merge-queue-and-auto-merge-state-3
    statement: >-
      GitHub merge queue documentation says CI must trigger and report on merge group events when a merge queue is required.
    source_title: GitHub Managing a Merge Queue
    source_url: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue
    confidence: medium
  - id: fact-ai-agent-github-merge-queue-and-auto-merge-state-4
    statement: >-
      GitHub merge queue documentation says the merge queue creates temporary branches with a special prefix to validate pull request changes.
    source_title: GitHub Managing a Merge Queue
    source_url: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue
    confidence: medium
completeness: 0.84
known_gaps:
  - Merge queue and auto-merge behavior depends on repository plan, branch protection rules, rulesets, required check names, permissions, queue position, merge method, reruns, skipped checks, and whether CI handles the merge_group event.
disputed_statements: []
primary_sources:
  - title: GitHub Automatically Merging a Pull Request
    type: documentation
    year: 2026
    url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request
    institution: GitHub
  - title: GitHub Managing a Merge Queue
    type: documentation
    year: 2026
    url: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue
    institution: GitHub
  - title: GitHub Actions merge_group Event
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#merge_group
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub merge queue and auto-merge state tell agents whether a pull request is waiting on policy, queue validation, permissions, or missing merge-group CI rather than a code defect.

## Core Explanation

An agent should treat "not mergeable" as a state to diagnose, not a reason to edit code blindly. Auto-merge may be waiting for reviews or status checks, while merge queue may create a temporary merge group SHA whose checks differ from the pull request head SHA.

Useful evidence includes base branch, queue position, merge method, merge-group branch or SHA, required check names, auto-merge enabled state, last actor who pushed to the head branch, repository write permission, and whether workflows include the `merge_group` trigger required for queued validation.

## Source-Mapped Facts

- GitHub auto-merge documentation says a pull request with auto-merge enabled will merge automatically when required reviews are met and required status checks pass. ([source](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request))
- GitHub auto-merge documentation says auto-merge is disabled if someone without write permission pushes new changes to the pull request head branch or switches the base branch. ([source](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request))
- GitHub merge queue documentation says CI must trigger and report on merge group events when a merge queue is required. ([source](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue))
- GitHub merge queue documentation says the merge queue creates temporary branches with a special prefix to validate pull request changes. ([source](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue))

## Further Reading

- [GitHub Automatically Merging a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
- [GitHub Managing a Merge Queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitHub Actions merge_group Event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#merge_group)
