---
id: agent-github-actions-cache-keys-and-restore-keys
title: 'Agent GitHub Actions Cache Keys and Restore Keys'
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
  - id: fact-ai-agent-github-actions-cache-keys-and-restore-keys-1
    statement: >-
      GitHub Actions dependency caching documentation says the cache action
      first searches for an exact match to the provided key.
    source_title: GitHub Actions Dependency Caching
    source_url: https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching
    confidence: medium
  - id: fact-ai-agent-github-actions-cache-keys-and-restore-keys-2
    statement: >-
      GitHub Actions dependency caching documentation says restore-keys are
      checked sequentially for partial matches when no exact cache match exists.
    source_title: GitHub Actions Dependency Caching
    source_url: https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching
    confidence: medium
  - id: fact-ai-agent-github-actions-cache-keys-and-restore-keys-3
    statement: >-
      GitHub Actions dependency caching documentation says an exact match to the
      provided key is considered a cache hit.
    source_title: GitHub Actions Dependency Caching
    source_url: https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching
    confidence: medium
  - id: fact-ai-agent-github-actions-cache-keys-and-restore-keys-4
    statement: >-
      GitHub Actions dependency caching documentation says users cannot change
      the contents of an existing cache and should create a new cache with a new
      key instead.
    source_title: GitHub Actions Dependency Caching
    source_url: https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching
    confidence: medium
  - id: fact-ai-agent-github-actions-cache-keys-and-restore-keys-5
    statement: >-
      The actions/cache repository describes the action as caching dependencies
      and build outputs in GitHub Actions.
    source_title: actions/cache Repository
    source_url: https://github.com/actions/cache
    confidence: medium
completeness: 0.84
known_gaps:
  - GitHub Actions cache diagnosis depends on key construction, restore-key order, path globs, runner OS, branch scope, cache version, package-manager lockfiles, cache eviction, workflow permissions, and whether a cache hit still contains stale dependency artifacts.
disputed_statements: []
primary_sources:
  - title: GitHub Actions Dependency Caching
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching
    institution: GitHub
  - title: actions/cache Repository
    type: source_repository
    year: 2026
    url: https://github.com/actions/cache
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub Actions cache key evidence helps agents decide whether a slow or stale CI run came from a cache miss, a partial restore, or an immutable cache that needs a new key.

## Core Explanation

CI cache failures often look like package-manager failures. A workflow can restore a partial cache through `restore-keys`, miss an exact key, or keep using an old cache because existing cache contents are immutable.

Agents should collect the cache action version, `key`, `restore-keys`, `path`, branch, runner OS, lockfile hash, cache hit output, and dependency install logs. A cache hit is not proof that the cache is correct; it only proves that the lookup matched the cache key.

## Source-Mapped Facts

- GitHub Actions dependency caching documentation says the cache action first searches for an exact match to the provided key. ([source](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching))
- GitHub Actions dependency caching documentation says restore-keys are checked sequentially for partial matches when no exact cache match exists. ([source](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching))
- GitHub Actions dependency caching documentation says an exact match to the provided key is considered a cache hit. ([source](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching))
- GitHub Actions dependency caching documentation says users cannot change the contents of an existing cache and should create a new cache with a new key instead. ([source](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching))
- The actions/cache repository describes the action as caching dependencies and build outputs in GitHub Actions. ([source](https://github.com/actions/cache))

## Further Reading

- [GitHub Actions Dependency Caching](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching)
- [actions/cache Repository](https://github.com/actions/cache)
