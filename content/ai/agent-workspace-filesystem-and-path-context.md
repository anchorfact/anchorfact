---
id: agent-workspace-filesystem-and-path-context
title: 'Agent Workspace Filesystem and Path Context'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-workspace-filesystem-and-path-context-1
    statement: >-
      GitHub Actions documentation defines GITHUB_WORKSPACE as the default working directory on
      the runner for steps and the default location of the repository.
    source_title: GitHub Actions Variables
    source_url: https://docs.github.com/en/actions/reference/workflows-and-actions/variables
    confidence: medium
  - id: fact-ai-agent-workspace-filesystem-and-path-context-2
    statement: >-
      Docker documentation says bind mounts mount a file or directory from the host machine into a
      container.
    source_title: Docker Bind Mounts
    source_url: https://docs.docker.com/engine/storage/bind-mounts/
    confidence: medium
  - id: fact-ai-agent-workspace-filesystem-and-path-context-3
    statement: >-
      Kubernetes documentation says a volume provides a way for containers in a Pod to access and
      share data through the filesystem.
    source_title: Kubernetes Volumes
    source_url: https://kubernetes.io/docs/concepts/storage/volumes/
    confidence: medium
completeness: 0.83
known_gaps:
  - Workspace interpretation depends on mount mode, container root, symlinks, path separators, ignored files, generated artifacts, and whether the agent is allowed to read or write outside the project directory.
disputed_statements: []
primary_sources:
  - title: GitHub Actions Variables
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/variables
    institution: GitHub
  - title: Docker Bind Mounts
    type: documentation
    year: 2026
    url: https://docs.docker.com/engine/storage/bind-mounts/
    institution: Docker
  - title: Kubernetes Volumes
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/storage/volumes/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agents need explicit workspace and filesystem context before reading files, writing patches, or interpreting paths.

## Core Explanation

A path is only meaningful relative to a runtime boundary. CI runners, local worktrees, containers, and Pods can expose different directory roots and mounted files. Agents should determine the working directory, repository root, mounted paths, read/write permissions, and whether generated artifacts are part of the source tree.

Good workspace evidence includes absolute paths, mount source and target, current working directory, branch or revision, ignored paths, and sandbox policy.

## Source-Mapped Facts

- GitHub Actions documentation defines GITHUB_WORKSPACE as the default working directory on the runner for steps and the default location of the repository. ([source](https://docs.github.com/en/actions/reference/workflows-and-actions/variables))
- Docker documentation says bind mounts mount a file or directory from the host machine into a container. ([source](https://docs.docker.com/engine/storage/bind-mounts/))
- Kubernetes documentation says a volume provides a way for containers in a Pod to access and share data through the filesystem. ([source](https://kubernetes.io/docs/concepts/storage/volumes/))

## Further Reading

- [GitHub Actions Variables](https://docs.github.com/en/actions/reference/workflows-and-actions/variables)
- [Docker Bind Mounts](https://docs.docker.com/engine/storage/bind-mounts/)
- [Kubernetes Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)
