---
id: code-unified-diffs-and-patch-application-for-agents
title: 'Code Unified Diffs and Patch Application for Agents'
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
  - id: fact-cs-code-unified-diffs-and-patch-application-for-agents-1
    statement: >-
      Git documentation describes raw and patch output formats for comparing file changes.
    source_title: Git Diff Format
    source_url: https://git-scm.com/docs/diff-format
    confidence: medium
  - id: fact-cs-code-unified-diffs-and-patch-application-for-agents-2
    statement: >-
      Git format-patch documentation describes preparing each commit with its patch in one file
      per commit.
    source_title: Git Format-Patch Documentation
    source_url: https://git-scm.com/docs/git-format-patch
    confidence: medium
  - id: fact-cs-code-unified-diffs-and-patch-application-for-agents-3
    statement: >-
      Git apply documentation describes applying patches to files or to the index.
    source_title: Git Apply Documentation
    source_url: https://git-scm.com/docs/git-apply
    confidence: medium
completeness: 0.83
known_gaps:
  - Patch safety depends on path normalization, context freshness, binary files, rename detection, whitespace policy, generated files, and user-owned local changes.
disputed_statements: []
primary_sources:
  - title: Git Diff Format
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/diff-format
    institution: Git
  - title: Git Format-Patch Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/git-format-patch
    institution: Git
  - title: Git Apply Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/git-apply
    institution: Git
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Unified diffs are the common edit format agents use to explain, review, and apply source-code changes safely.

## Core Explanation

Code agents need to reason about what changed, not just final file contents. Unified diffs expose file paths, hunks, removed lines, added lines, and context lines. That makes them useful for review, patch application, conflict diagnosis, and compact change summaries.

Agents should validate patches before applying them. A patch can target the wrong file, rely on stale context, touch generated output, or overwrite user edits if the working tree is not inspected first.

## Source-Mapped Facts

- Git documentation describes raw and patch output formats for comparing file changes. ([source](https://git-scm.com/docs/diff-format))
- Git format-patch documentation describes preparing each commit with its patch in one file per commit. ([source](https://git-scm.com/docs/git-format-patch))
- Git apply documentation describes applying patches to files or to the index. ([source](https://git-scm.com/docs/git-apply))

## Further Reading

- [Git Diff Format](https://git-scm.com/docs/diff-format)
- [Git Format-Patch Documentation](https://git-scm.com/docs/git-format-patch)
- [Git Apply Documentation](https://git-scm.com/docs/git-apply)
