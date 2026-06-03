---
id: code-codeql-databases-and-query-packs
title: 'Code CodeQL Databases and Query Packs'
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
  - id: fact-cs-code-codeql-databases-and-query-packs-1
    statement: >-
      CodeQL documentation says CodeQL first extracts a relational
      representation of each source file in the codebase to create a database.
    source_title: About CodeQL
    source_url: https://codeql.github.com/docs/codeql-overview/about-codeql/
    confidence: medium
  - id: fact-cs-code-codeql-databases-and-query-packs-2
    statement: >-
      GitHub Docs says query packs contain pre-compiled queries that can be
      evaluated on a CodeQL database.
    source_title: CodeQL Query Packs
    source_url: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-query-packs
    confidence: medium
  - id: fact-cs-code-codeql-databases-and-query-packs-3
    statement: >-
      GitHub Docs says codeql database analyze runs queries against a CodeQL
      database and produces results such as SARIF.
    source_title: codeql database analyze
    source_url: https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli-manual/database-analyze
    confidence: medium
completeness: 0.82
known_gaps:
  - CodeQL analysis evidence depends on language extractor, build command, source root, generated code inclusion, query suite or pack version, model packs, SARIF category, database cleanup, dependency resolution, code scanning upload settings, and whether alerts are interpreted with the same commit and source paths.
disputed_statements: []
primary_sources:
  - title: About CodeQL
    type: documentation
    year: 2026
    url: https://codeql.github.com/docs/codeql-overview/about-codeql/
    institution: CodeQL
  - title: CodeQL Query Packs
    type: documentation
    year: 2026
    url: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-query-packs
    institution: GitHub Docs
  - title: codeql database analyze
    type: documentation
    year: 2026
    url: https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli-manual/database-analyze
    institution: GitHub Docs
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

CodeQL databases and query packs give coding agents structured security evidence that is more precise than grep over source text.

## Core Explanation

Agents that triage static-analysis findings need to know what code was extracted, which language database was built, which query pack ran, and how results were exported. Otherwise, the agent may treat missing alerts as proof of safety or compare SARIF generated from different commits, query versions, or build commands.

Useful evidence includes source root, language, build command, extractor logs, CodeQL database path, query pack name and version, query suite, SARIF output, alert locations, data-flow paths, and any excluded generated or vendored code.

## Source-Mapped Facts

- CodeQL documentation says CodeQL first extracts a relational representation of each source file in the codebase to create a database. ([source](https://codeql.github.com/docs/codeql-overview/about-codeql/))
- GitHub Docs says query packs contain pre-compiled queries that can be evaluated on a CodeQL database. ([source](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-query-packs))
- GitHub Docs says codeql database analyze runs queries against a CodeQL database and produces results such as SARIF. ([source](https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli-manual/database-analyze))

## Further Reading

- [About CodeQL](https://codeql.github.com/docs/codeql-overview/about-codeql/)
- [CodeQL Query Packs](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-query-packs)
- [codeql database analyze](https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli-manual/database-analyze)
