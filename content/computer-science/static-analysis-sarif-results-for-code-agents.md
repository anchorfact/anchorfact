---
id: static-analysis-sarif-results-for-code-agents
title: 'Static Analysis SARIF Results for Code Agents'
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
  - id: fact-computer-science-static-analysis-sarif-results-for-code-agents-1
    statement: >-
      The SARIF 2.1.0 specification defines a format for the output of static analysis tools.
    source_title: SARIF 2.1.0 Specification
    source_url: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
    confidence: medium
  - id: fact-computer-science-static-analysis-sarif-results-for-code-agents-2
    statement: >-
      GitHub documentation describes uploading SARIF files to show code scanning alerts.
    source_title: GitHub Uploading SARIF Files
    source_url: https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github
    confidence: medium
  - id: fact-computer-science-static-analysis-sarif-results-for-code-agents-3
    statement: >-
      GitHub CodeQL documentation describes SARIF output produced by the CodeQL CLI.
    source_title: CodeQL CLI SARIF Output
    source_url: https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli/sarif-output
    confidence: medium
completeness: 0.84
known_gaps:
  - SARIF usefulness depends on rule metadata, source locations, path normalization, suppression state, baseline comparisons, and whether generated code is excluded.
disputed_statements: []
primary_sources:
  - title: SARIF 2.1.0 Specification
    type: standard
    year: 2020
    url: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
    institution: OASIS
  - title: GitHub Uploading SARIF Files
    type: documentation
    year: 2026
    url: https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github
    institution: GitHub
  - title: CodeQL CLI SARIF Output
    type: documentation
    year: 2026
    url: https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli/sarif-output
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

SARIF files give code agents a structured way to consume static-analysis findings with rules, locations, severities, and fix context.

## Core Explanation

Static-analysis results are more useful when agents can parse them as data instead of scraping console text. SARIF records findings, rule metadata, source locations, fingerprints, and tool output in a portable format.

Agents should preserve SARIF result IDs, rule IDs, file paths, regions, severity, baseline state, and suppressions. A SARIF alert is evidence for review, not automatic proof that a patch is safe.

## Source-Mapped Facts

- The SARIF 2.1.0 specification defines a format for the output of static analysis tools. ([source](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html))
- GitHub documentation describes uploading SARIF files to show code scanning alerts. ([source](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github))
- GitHub CodeQL documentation describes SARIF output produced by the CodeQL CLI. ([source](https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli/sarif-output))

## Further Reading

- [SARIF 2.1.0 Specification](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html)
- [GitHub Uploading SARIF Files](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github)
- [CodeQL CLI SARIF Output](https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli/sarif-output)
