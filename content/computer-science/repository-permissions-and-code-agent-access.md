---
id: repository-permissions-and-code-agent-access
title: 'Repository Permissions and Code Agent Access'
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
  - id: fact-repository-permissions-and-code-agent-access-1
    statement: >-
      GitHub documentation describes organization repository roles such as read, triage, write,
      maintain, and admin.
    source_title: GitHub Repository Roles
    source_url: https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization
    confidence: medium
  - id: fact-repository-permissions-and-code-agent-access-2
    statement: >-
      GitHub Apps documentation describes choosing permissions for a GitHub App when registering it.
    source_title: GitHub App Permissions
    source_url: https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app
    confidence: medium
  - id: fact-repository-permissions-and-code-agent-access-3
    statement: >-
      GitLab permissions documentation describes roles and permissions that control user access to
      GitLab resources.
    source_title: GitLab Permissions
    source_url: https://docs.gitlab.com/user/permissions/
    confidence: medium
completeness: 0.84
known_gaps:
  - Effective access can also depend on branch protection, token scopes, SSO, approval rules, and environment restrictions.
disputed_statements: []
primary_sources:
  - title: GitHub Repository Roles
    type: documentation
    year: 2026
    url: https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization
    institution: GitHub
  - title: GitHub App Permissions
    type: documentation
    year: 2026
    url: https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app
    institution: GitHub
  - title: GitLab Permissions
    type: documentation
    year: 2026
    url: https://docs.gitlab.com/user/permissions/
    institution: GitLab
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Repository permissions define what a code agent can read, edit, review, merge, or administer in a codebase.

## Core Explanation

Code agents need explicit access boundaries. A repository may allow read-only inspection, branch pushes, pull request comments, workflow reruns, or administrative actions. Those capabilities should be granted deliberately rather than inferred from the agent's task.

For safe automation, agents should request the narrowest repository permission that supports the workflow, separate read access from write access, and surface when a task requires a stronger permission than currently available.

## Source-Mapped Facts

- GitHub documentation describes organization repository roles such as read, triage, write, maintain, and admin. ([source](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization))
- GitHub Apps documentation describes choosing permissions for a GitHub App when registering it. ([source](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app))
- GitLab permissions documentation describes roles and permissions that control user access to GitLab resources. ([source](https://docs.gitlab.com/user/permissions/))

## Further Reading

- [GitHub Repository Roles](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
- [GitHub App Permissions](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- [GitLab Permissions](https://docs.gitlab.com/user/permissions/)
