---
id: agent-github-actions-artifact-attestations-and-provenance
title: 'Agent GitHub Actions Artifact Attestations and Provenance'
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
  - id: fact-ai-agent-github-actions-artifact-attestations-and-provenance-1
    statement: >-
      GitHub Docs says artifact attestations increase supply-chain security by
      establishing where and how software was built.
    source_title: GitHub Artifact Attestations for Builds
    source_url: https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds
    confidence: medium
  - id: fact-ai-agent-github-actions-artifact-attestations-and-provenance-2
    statement: >-
      GitHub Docs says generating an artifact attestation requires appropriate
      workflow permissions and a workflow step that uses the attest action.
    source_title: GitHub Artifact Attestations for Builds
    source_url: https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds
    confidence: medium
  - id: fact-ai-agent-github-actions-artifact-attestations-and-provenance-3
    statement: >-
      GitHub Docs says generated artifact attestations establish build
      provenance and can be viewed in the repository Actions tab.
    source_title: GitHub Artifact Attestations for Builds
    source_url: https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds
    confidence: medium
  - id: fact-ai-agent-github-actions-artifact-attestations-and-provenance-4
    statement: >-
      GitHub Docs says binary artifact attestations can be verified with the
      GitHub CLI gh attestation verify command and a repository argument.
    source_title: GitHub Artifact Attestations for Builds
    source_url: https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds
    confidence: medium
  - id: fact-ai-agent-github-actions-artifact-attestations-and-provenance-5
    statement: >-
      The actions/attest-build-provenance repository describes the action as
      generating build provenance attestations for workflow artifacts.
    source_title: actions/attest-build-provenance
    source_url: https://github.com/actions/attest-build-provenance
    confidence: medium
completeness: 0.82
known_gaps:
  - Attestation diagnosis depends on subject path or image name, repository identity, workflow permissions, OIDC token issuance, builder identity, signing policy, artifact digest, reusable workflows, private-repository visibility, and whether verification was run online or offline.
disputed_statements: []
primary_sources:
  - title: GitHub Artifact Attestations for Builds
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds
    institution: GitHub
  - title: actions/attest-build-provenance
    type: source_repository
    year: 2026
    url: https://github.com/actions/attest-build-provenance
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub artifact attestations give agents provenance evidence for build outputs, so a binary, container image, or release bundle can be checked against the workflow that produced it.

## Core Explanation

Build logs can show that a job ran, but they do not by themselves prove that a downloaded artifact came from the expected workflow and source revision. Artifact attestations add a provenance object that an agent can verify before trusting a build output as deployment evidence.

Agents should collect the subject path or image name, digest, repository, run URL, workflow permissions, OIDC status, builder identity, and verification command output. A failed attestation check should be treated as a supply-chain signal, not just a missing CI artifact.

## Source-Mapped Facts

- GitHub Docs says artifact attestations increase supply-chain security by establishing where and how software was built. ([source](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds))
- GitHub Docs says generating an artifact attestation requires appropriate workflow permissions and a workflow step that uses the attest action. ([source](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds))
- GitHub Docs says generated artifact attestations establish build provenance and can be viewed in the repository Actions tab. ([source](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds))
- GitHub Docs says binary artifact attestations can be verified with the GitHub CLI gh attestation verify command and a repository argument. ([source](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds))
- The actions/attest-build-provenance repository describes the action as generating build provenance attestations for workflow artifacts. ([source](https://github.com/actions/attest-build-provenance))

## Further Reading

- [GitHub Artifact Attestations for Builds](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds)
- [actions/attest-build-provenance](https://github.com/actions/attest-build-provenance)
