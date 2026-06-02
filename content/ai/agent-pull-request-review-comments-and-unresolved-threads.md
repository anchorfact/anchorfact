---
id: agent-pull-request-review-comments-and-unresolved-threads
title: 'Agent Pull Request Review Comments and Unresolved Threads'
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
  - id: fact-ai-agent-pull-request-review-comments-and-unresolved-threads-1
    statement: >-
      GitHub documentation says pull request reviewers can comment on changes,
      suggest improvements, approve, or request changes before code is merged.
    source_title: GitHub About Pull Request Reviews
    source_url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
    confidence: medium
  - id: fact-ai-agent-pull-request-review-comments-and-unresolved-threads-2
    statement: >-
      GitHub documentation says review comments can be made on specific lines and
      conversation threads can be marked resolved to track addressed feedback.
    source_title: GitHub About Pull Request Reviews
    source_url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
    confidence: medium
  - id: fact-ai-agent-pull-request-review-comments-and-unresolved-threads-3
    statement: >-
      GitHub's GraphQL API reference includes PullRequestReviewThread as a pull
      request review conversation thread object.
    source_title: GitHub GraphQL API Reference
    source_url: https://docs.github.com/en/graphql/reference
    confidence: medium
completeness: 0.82
known_gaps:
  - Thread resolution state, outdated diff positions, force pushes, review dismissal rules, and repository permissions determine whether an agent can safely act on review feedback.
disputed_statements: []
primary_sources:
  - title: GitHub About Pull Request Reviews
    type: documentation
    year: 2026
    url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
    institution: GitHub
  - title: GitHub GraphQL API Reference
    type: documentation
    year: 2026
    url: https://docs.github.com/en/graphql/reference
    institution: GitHub
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agents fixing pull requests need review comments, requested changes, unresolved threads, and line-level context before deciding what to edit.

## Core Explanation

Pull request review data is a high-frequency agent source because it encodes human intent, blocking feedback, suggested patches, and acceptance criteria. A useful agent should distinguish top-level PR discussion from inline file comments and review submissions.

The agent should preserve thread identity, file path, line range, diff side, outdated status, author, timestamp, and resolution state. It should not treat every comment as an instruction; approvals, requests for changes, resolved threads, and stale comments have different operational meaning.

## Source-Mapped Facts

- GitHub documentation says pull request reviewers can comment on changes, suggest improvements, approve, or request changes before code is merged. ([source](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews))
- GitHub documentation says review comments can be made on specific lines and conversation threads can be marked resolved to track addressed feedback. ([source](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews))
- GitHub's GraphQL API reference includes PullRequestReviewThread as a pull request review conversation thread object. ([source](https://docs.github.com/en/graphql/reference))

## Further Reading

- [GitHub About Pull Request Reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
- [GitHub GraphQL API Reference](https://docs.github.com/en/graphql/reference)
