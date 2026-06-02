---
id: code-sbom-and-software-supply-chain-inventory
title: 'Code SBOM and Software Supply Chain Inventory'
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
  - id: fact-cs-code-sbom-and-software-supply-chain-inventory-1
    statement: >-
      CycloneDX documentation provides a JSON reference for the CycloneDX 1.6 specification.
    source_title: CycloneDX 1.6 JSON Reference
    source_url: https://cyclonedx.org/docs/1.6/json/
    confidence: medium
  - id: fact-cs-code-sbom-and-software-supply-chain-inventory-2
    statement: >-
      The SPDX 3.0.1 model defines Sbom as a collection of SPDX Elements describing a
      single package.
    source_title: SPDX 3.0.1 Sbom Class
    source_url: https://spdx.github.io/spdx-spec/v3.0.1/model/Software/Classes/Sbom/
    confidence: medium
  - id: fact-cs-code-sbom-and-software-supply-chain-inventory-3
    statement: >-
      GitHub REST API documentation says repository SBOM exports are available in SPDX JSON
      format.
    source_title: GitHub SBOM REST API
    source_url: https://docs.github.com/en/rest/dependency-graph/sboms?apiVersion=2022-11-28
    confidence: medium
completeness: 0.83
known_gaps:
  - SBOM usefulness depends on package manager coverage, transitive dependency capture, build provenance, generated artifacts, container layers, license data, vulnerability matching, and update cadence.
disputed_statements: []
primary_sources:
  - title: CycloneDX 1.6 JSON Reference
    type: standard
    year: 2026
    url: https://cyclonedx.org/docs/1.6/json/
    institution: CycloneDX
  - title: SPDX 3.0.1 Sbom Class
    type: standard
    year: 2026
    url: https://spdx.github.io/spdx-spec/v3.0.1/model/Software/Classes/Sbom/
    institution: SPDX
  - title: GitHub SBOM REST API
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/dependency-graph/sboms?apiVersion=2022-11-28
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

SBOMs and dependency inventory give agents a structured view of what software components are present and where supply-chain risk may enter.

## Core Explanation

Agents answering security, compliance, or upgrade questions need more than package names in one manifest. A software bill of materials can record direct and transitive components, versions, licenses, identifiers, and relationships across a build.

SBOMs are most useful when connected to provenance, vulnerability advisories, dependency graphs, and release artifacts. Agents should check whether the inventory describes source code, built packages, containers, or deployed services before using it as evidence.

## Source-Mapped Facts

- CycloneDX documentation provides a JSON reference for the CycloneDX 1.6 specification. ([source](https://cyclonedx.org/docs/1.6/json/))
- The SPDX 3.0.1 model defines Sbom as a collection of SPDX Elements describing a single package. ([source](https://spdx.github.io/spdx-spec/v3.0.1/model/Software/Classes/Sbom/))
- GitHub REST API documentation says repository SBOM exports are available in SPDX JSON format. ([source](https://docs.github.com/en/rest/dependency-graph/sboms?apiVersion=2022-11-28))

## Further Reading

- [CycloneDX 1.6 JSON Reference](https://cyclonedx.org/docs/1.6/json/)
- [SPDX 3.0.1 Sbom Class](https://spdx.github.io/spdx-spec/v3.0.1/model/Software/Classes/Sbom/)
- [GitHub SBOM REST API](https://docs.github.com/en/rest/dependency-graph/sboms?apiVersion=2022-11-28)
