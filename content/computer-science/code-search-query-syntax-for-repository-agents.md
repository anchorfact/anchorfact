---
id: code-search-query-syntax-for-repository-agents
title: 'Code Search Query Syntax for Repository Agents'
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
  - id: fact-cs-code-search-query-syntax-for-repository-agents-1
    statement: >-
      GitHub documentation says code search supports specialized code qualifiers, regular
      expressions, and boolean operations.
    source_title: GitHub Code Search Syntax
    source_url: https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax
    confidence: medium
  - id: fact-cs-code-search-query-syntax-for-repository-agents-2
    statement: >-
      Sourcegraph documentation describes queries as strings containing search patterns and search
      keywords.
    source_title: Sourcegraph Search Query Syntax
    source_url: https://sourcegraph.com/docs/code-search/queries
    confidence: medium
  - id: fact-cs-code-search-query-syntax-for-repository-agents-3
    statement: >-
      GitLab documentation describes advanced search as supporting filtering by scope, project, and
      group.
    source_title: GitLab Advanced Search
    source_url: https://docs.gitlab.com/user/search/advanced_search/
    confidence: medium
completeness: 0.8
known_gaps:
  - Repository search behavior depends on index freshness, vendored/generated-file handling, symbol extraction, regex dialect, case sensitivity, permissions, monorepo boundaries, and whether search results include references or only definitions.
disputed_statements: []
primary_sources:
  - title: GitHub Code Search Syntax
    type: documentation
    year: 2026
    url: https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax
    institution: GitHub
  - title: Sourcegraph Search Query Syntax
    type: documentation
    year: 2026
    url: https://sourcegraph.com/docs/code-search/queries
    institution: Sourcegraph
  - title: GitLab Advanced Search
    type: documentation
    year: 2026
    url: https://docs.gitlab.com/user/search/advanced_search/
    institution: GitLab
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Code agents need repository-search syntax literacy so they can narrow evidence instead of scanning every match by hand.

## Core Explanation

Code search tools expose qualifiers for repository, path, language, symbols, content, booleans, and regular expressions. Agents that know those operators can find definitions, call sites, generated files, tests, migrations, and config references faster and with fewer false positives.

Search queries should be logged with tool name, scope, branch or revision, filters, and result count. That makes a later reviewer able to distinguish "not found" from "not searched in the right place."

## Source-Mapped Facts

- GitHub documentation says code search supports specialized code qualifiers, regular expressions, and boolean operations. ([source](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax))
- Sourcegraph documentation describes queries as strings containing search patterns and search keywords. ([source](https://sourcegraph.com/docs/code-search/queries))
- GitLab documentation describes advanced search as supporting filtering by scope, project, and group. ([source](https://docs.gitlab.com/user/search/advanced_search/))

## Further Reading

- [GitHub Code Search Syntax](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax)
- [Sourcegraph Search Query Syntax](https://sourcegraph.com/docs/code-search/queries)
- [GitLab Advanced Search](https://docs.gitlab.com/user/search/advanced_search/)
