---
id: code-git-worktrees-and-detached-head-state-for-agents
title: 'Code Git Worktrees and Detached HEAD State for Agents'
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
  - id: fact-cs-code-git-worktrees-and-detached-head-state-for-agents-1
    statement: >-
      Git worktree documentation describes git worktree as managing multiple
      working trees attached to the same repository.
    source_title: Git Worktree Documentation
    source_url: https://git-scm.com/docs/git-worktree
    confidence: medium
  - id: fact-cs-code-git-worktrees-and-detached-head-state-for-agents-2
    statement: >-
      Git worktree documentation says a repository has one main working tree
      and zero or more linked working trees.
    source_title: Git Worktree Documentation
    source_url: https://git-scm.com/docs/git-worktree
    confidence: medium
  - id: fact-cs-code-git-worktrees-and-detached-head-state-for-agents-3
    statement: >-
      Git checkout documentation describes detached HEAD state as HEAD referring
      directly to a commit rather than to a branch.
    source_title: Git Checkout Documentation
    source_url: https://git-scm.com/docs/git-checkout
    confidence: medium
completeness: 0.82
known_gaps:
  - Repository-agent state depends on main versus linked worktree, branch checkout rules, detached HEAD, sparse checkout, submodules, untracked files, ignored files, hooks, alternate object stores, and CI checkout depth.
disputed_statements: []
primary_sources:
  - title: Git Worktree Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/git-worktree
    institution: Git
  - title: Git Checkout Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/git-checkout
    institution: Git
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Git worktree and detached-HEAD evidence helps code agents avoid editing the wrong checkout or losing commits off a branch.

## Core Explanation

Agents often operate in generated workspaces, linked worktrees, or CI checkouts. A path can look like a normal repository while its branch state, HEAD state, and main-worktree relationship differ from the user's primary checkout.

Agents should record repository root, worktree list, current branch, HEAD commit, detached-HEAD status, upstream branch, sparse-checkout state, and untracked changes before committing, rebasing, or applying patches.

## Source-Mapped Facts

- Git worktree documentation describes git worktree as managing multiple working trees attached to the same repository. ([source](https://git-scm.com/docs/git-worktree))
- Git worktree documentation says a repository has one main working tree and zero or more linked working trees. ([source](https://git-scm.com/docs/git-worktree))
- Git checkout documentation describes detached HEAD state as HEAD referring directly to a commit rather than to a branch. ([source](https://git-scm.com/docs/git-checkout))

## Further Reading

- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Git Checkout Documentation](https://git-scm.com/docs/git-checkout)
