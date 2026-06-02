---
id: code-merge-conflicts-and-conflict-markers-for-agents
title: 'Code Merge Conflicts and Conflict Markers for Agents'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-code-merge-conflicts-and-conflict-markers-for-agents-1
    statement: >-
      Git merge documentation describes git merge as joining two or more development histories
      together.
    source_title: Git Merge Documentation
    source_url: https://git-scm.com/docs/git-merge
    confidence: medium
  - id: fact-cs-code-merge-conflicts-and-conflict-markers-for-agents-2
    statement: >-
      Git rerere documentation describes reusing recorded resolutions of conflicted merges.
    source_title: Git Rerere Documentation
    source_url: https://git-scm.com/docs/git-rerere
    confidence: medium
  - id: fact-cs-code-merge-conflicts-and-conflict-markers-for-agents-3
    statement: >-
      Git merge-file documentation describes incorporating changes from two files that both
      modified a common original file.
    source_title: Git Merge-File Documentation
    source_url: https://git-scm.com/docs/git-merge-file
    confidence: medium
completeness: 0.83
known_gaps:
  - Conflict resolution still requires semantic review, tests, generated-file awareness, branch intent, and protection for user-owned local changes.
disputed_statements: []
primary_sources:
  - title: Git Merge Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/git-merge
    institution: Git
  - title: Git Rerere Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/git-rerere
    institution: Git
  - title: Git Merge-File Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/git-merge-file
    institution: Git
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Merge conflicts are structured evidence that two histories changed overlapping code, and agents must resolve them with both textual and semantic context.

## Core Explanation

Conflict markers show competing edits, but they do not explain intent. Agents should inspect the base version, both sides, commit history, tests, and ownership before choosing a resolution. Automatically picking one side can silently drop behavior.

Recorded conflict resolutions can help repeated merges, but they are not a substitute for review. Agents should run relevant tests and show a focused diff after resolving conflicts.

## Source-Mapped Facts

- Git merge documentation describes git merge as joining two or more development histories together. ([source](https://git-scm.com/docs/git-merge))
- Git rerere documentation describes reusing recorded resolutions of conflicted merges. ([source](https://git-scm.com/docs/git-rerere))
- Git merge-file documentation describes incorporating changes from two files that both modified a common original file. ([source](https://git-scm.com/docs/git-merge-file))

## Further Reading

- [Git Merge Documentation](https://git-scm.com/docs/git-merge)
- [Git Rerere Documentation](https://git-scm.com/docs/git-rerere)
- [Git Merge-File Documentation](https://git-scm.com/docs/git-merge-file)
