---
id: agent-workload-identity-and-service-accounts
title: 'Agent Workload Identity and Service Accounts'
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
  - id: fact-ai-agent-workload-identity-and-service-accounts-1
    statement: >-
      Kubernetes documentation describes service accounts as identities for processes that
      run in Pods.
    source_title: Kubernetes Service Accounts
    source_url: https://kubernetes.io/docs/concepts/security/service-accounts/
    confidence: medium
  - id: fact-ai-agent-workload-identity-and-service-accounts-2
    statement: >-
      Amazon EKS documentation describes IAM roles for service accounts as a way to associate
      an IAM role with a Kubernetes service account.
    source_title: Amazon EKS IAM Roles for Service Accounts
    source_url: https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html
    confidence: medium
  - id: fact-ai-agent-workload-identity-and-service-accounts-3
    statement: >-
      Google Cloud documentation says Workload Identity Federation lets workloads access
      Google Cloud resources without using service account keys.
    source_title: Google Cloud Workload Identity Federation
    source_url: https://docs.cloud.google.com/iam/docs/workload-identity-federation
    confidence: medium
completeness: 0.83
known_gaps:
  - Workload identity troubleshooting also depends on token audience, trust policy conditions, namespace bindings, projected tokens, and cloud audit events.
disputed_statements: []
primary_sources:
  - title: Kubernetes Service Accounts
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/security/service-accounts/
    institution: Kubernetes
  - title: Amazon EKS IAM Roles for Service Accounts
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html
    institution: Amazon Web Services
  - title: Google Cloud Workload Identity Federation
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/iam/docs/workload-identity-federation
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Workload identity gives an agent a concrete chain from a running process to a cloud principal, so access decisions can be traced without copying long-lived keys.

## Core Explanation

Agents that change infrastructure or debug cloud access need more than a username. They need the workload identity that a process actually used at runtime: Kubernetes service account, namespace, projected token, cloud trust policy, IAM role, and audit log principal.

Service-account mapping is especially important for agent safety. A tool can look harmless at the prompt layer while still running with an overbroad workload identity. The evidence set should show the bound service account and the cloud role before an agent proposes privilege changes.

## Source-Mapped Facts

- Kubernetes documentation describes service accounts as identities for processes that run in Pods. ([source](https://kubernetes.io/docs/concepts/security/service-accounts/))
- Amazon EKS documentation describes IAM roles for service accounts as a way to associate an IAM role with a Kubernetes service account. ([source](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html))
- Google Cloud documentation says Workload Identity Federation lets workloads access Google Cloud resources without using service account keys. ([source](https://docs.cloud.google.com/iam/docs/workload-identity-federation))

## Further Reading

- [Kubernetes Service Accounts](https://kubernetes.io/docs/concepts/security/service-accounts/)
- [Amazon EKS IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
- [Google Cloud Workload Identity Federation](https://docs.cloud.google.com/iam/docs/workload-identity-federation)
