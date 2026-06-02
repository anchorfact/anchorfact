---
id: software-bill-of-materials-and-dependency-graphs
title: 'Software Bill of Materials and Dependency Graphs'
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
  - id: fact-software-bill-of-materials-and-dependency-graphs-1
    statement: >-
      GitHub documentation says the dependency graph summarizes manifest and lock files in a repository plus dependencies submitted through the dependency submission API.
    source_title: About the dependency graph - GitHub Docs
    source_url: https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph
  - id: fact-software-bill-of-materials-and-dependency-graphs-2
    statement: >-
      SPDX documentation says the SPDX specification is an international open standard for software bill of materials information.
    source_title: Specifications - SPDX
    source_url: https://spdx.dev/use/specifications/
  - id: fact-software-bill-of-materials-and-dependency-graphs-3
    statement: >-
      The CycloneDX 1.6 JSON schema defines a machine-readable BOM document schema for CycloneDX bill-of-materials documents.
    source_title: CycloneDX 1.6 JSON Schema
    source_url: https://raw.githubusercontent.com/CycloneDX/specification/master/schema/bom-1.6.schema.json
completeness: 0.84
known_gaps:
  - SBOM completeness depends on build tooling, dependency submission coverage, transitive dependency support, and generated artifact provenance.
disputed_statements: []
primary_sources:
  - title: About the dependency graph - GitHub Docs
    type: documentation
    year: 2026
    url: https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph
    institution: GitHub
  - title: Specifications - SPDX
    type: specification
    year: 2026
    url: https://spdx.dev/use/specifications/
    institution: SPDX
  - title: CycloneDX 1.6 JSON Schema
    type: specification
    year: 2024
    url: https://raw.githubusercontent.com/CycloneDX/specification/master/schema/bom-1.6.schema.json
    institution: CycloneDX
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

A software bill of materials is a machine-readable inventory of software components. A dependency graph connects those components to manifests, versions, packages, transitive paths, and vulnerabilities.

## Core Explanation

Agents that work on repositories often need to answer dependency questions: what package introduced a vulnerable transitive dependency, which manifest controls it, whether a lockfile changed, and what SBOM format can represent the result. Dependency graphs and SBOMs give code agents structured supply-chain context instead of forcing them to infer dependencies from scattered package files.

## Source-Mapped Facts

- GitHub documentation says the dependency graph summarizes manifest and lock files in a repository plus dependencies submitted through the dependency submission API. ([source](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph))
- SPDX documentation says the SPDX specification is an international open standard for software bill of materials information. ([source](https://spdx.dev/use/specifications/))
- The CycloneDX 1.6 JSON schema defines a machine-readable BOM document schema for CycloneDX bill-of-materials documents. ([source](https://raw.githubusercontent.com/CycloneDX/specification/master/schema/bom-1.6.schema.json))

## Further Reading

- [GitHub dependency graph](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph)
- [SPDX specifications](https://spdx.dev/use/specifications/)
- [CycloneDX 1.6 JSON schema](https://raw.githubusercontent.com/CycloneDX/specification/master/schema/bom-1.6.schema.json)
