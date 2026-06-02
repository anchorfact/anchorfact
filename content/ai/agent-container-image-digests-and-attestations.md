---
id: agent-container-image-digests-and-attestations
title: 'Agent Container Image Digests and Attestations'
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
  - id: fact-ai-agent-container-image-digests-and-attestations-1
    statement: >-
      The OCI Image Specification defines descriptors that include a media type, digest, and
      size for referenced content.
    source_title: OCI Image Descriptor Specification
    source_url: https://specs.opencontainers.org/image-spec/descriptor/
    confidence: medium
  - id: fact-ai-agent-container-image-digests-and-attestations-2
    statement: >-
      Sigstore Cosign documentation describes signing and verifying container images and other
      OCI artifacts.
    source_title: Sigstore Cosign Signing Overview
    source_url: https://docs.sigstore.dev/cosign/signing/overview/
    confidence: medium
  - id: fact-ai-agent-container-image-digests-and-attestations-3
    statement: >-
      The SLSA provenance specification describes provenance as information about how an
      artifact was produced.
    source_title: SLSA Provenance Specification
    source_url: https://slsa.dev/spec/v1.0/provenance
    confidence: medium
completeness: 0.83
known_gaps:
  - Supply-chain trust depends on registry policy, signing key identity, transparency logs, builder isolation, SBOM coverage, and whether deployments pin image digests rather than mutable tags.
disputed_statements: []
primary_sources:
  - title: OCI Image Descriptor Specification
    type: standard
    year: 2026
    url: https://specs.opencontainers.org/image-spec/descriptor/
    institution: Open Container Initiative
  - title: Sigstore Cosign Signing Overview
    type: documentation
    year: 2026
    url: https://docs.sigstore.dev/cosign/signing/overview/
    institution: Sigstore
  - title: SLSA Provenance Specification
    type: standard
    year: 2026
    url: https://slsa.dev/spec/v1.0/provenance
    institution: SLSA
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Image digests and attestations let agents reason about the exact artifact that ran, who built it, and whether it matches deployment policy.

## Core Explanation

Container tags are convenient labels, but tags can move. Agents that investigate a deployment should collect image digest, registry, manifest metadata, signature status, provenance statement, builder identity, source repository, commit SHA, and policy decision.

Attestations do not automatically make an image safe. They provide evidence that can be checked against policy: trusted builder, expected source, build parameters, dependency metadata, and signature identity.

## Source-Mapped Facts

- The OCI Image Specification defines descriptors that include a media type, digest, and size for referenced content. ([source](https://specs.opencontainers.org/image-spec/descriptor/))
- Sigstore Cosign documentation describes signing and verifying container images and other OCI artifacts. ([source](https://docs.sigstore.dev/cosign/signing/overview/))
- The SLSA provenance specification describes provenance as information about how an artifact was produced. ([source](https://slsa.dev/spec/v1.0/provenance))

## Further Reading

- [OCI Image Descriptor Specification](https://specs.opencontainers.org/image-spec/descriptor/)
- [Sigstore Cosign Signing Overview](https://docs.sigstore.dev/cosign/signing/overview/)
- [SLSA Provenance Specification](https://slsa.dev/spec/v1.0/provenance)
