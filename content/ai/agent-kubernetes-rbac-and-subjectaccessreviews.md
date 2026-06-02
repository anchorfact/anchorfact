---
id: agent-kubernetes-rbac-and-subjectaccessreviews
title: 'Agent Kubernetes RBAC and SubjectAccessReviews'
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
  - id: fact-ai-agent-kubernetes-rbac-and-subjectaccessreviews-1
    statement: >-
      Kubernetes documentation says RBAC uses the rbac.authorization.k8s.io API
      group to drive authorization decisions.
    source_title: Kubernetes RBAC
    source_url: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
    confidence: medium
  - id: fact-ai-agent-kubernetes-rbac-and-subjectaccessreviews-2
    statement: >-
      Kubernetes documentation says a Role sets permissions within a particular
      namespace, while a ClusterRole is a non-namespaced resource.
    source_title: Kubernetes RBAC
    source_url: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
    confidence: medium
  - id: fact-ai-agent-kubernetes-rbac-and-subjectaccessreviews-3
    statement: >-
      Kubernetes authorization documentation describes SubjectAccessReview as an
      API check for whether a user or group can perform an action.
    source_title: Kubernetes Authorization
    source_url: https://kubernetes.io/docs/reference/access-authn-authz/authorization/
    confidence: medium
completeness: 0.82
known_gaps:
  - RBAC diagnosis depends on user identity, service account token audience, namespace, RoleBinding and ClusterRoleBinding subjects, aggregated ClusterRoles, impersonation flags, admission control, and the exact verb/resource/subresource tuple.
disputed_statements: []
primary_sources:
  - title: Kubernetes RBAC
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
    institution: Kubernetes
  - title: Kubernetes Authorization
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/reference/access-authn-authz/authorization/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

RBAC and SubjectAccessReview evidence tells agents whether a Kubernetes failure is an application bug, a namespace-scoped permission issue, or a cluster-wide authorization boundary.

## Core Explanation

Kubernetes access errors are easy for agents to misread as missing resources or broken manifests. RBAC separates verbs, resources, subresources, API groups, namespaces, subjects, and bindings, so an agent needs the complete authorization tuple before proposing a fix.

SubjectAccessReview-style checks are useful because they ask the authorization system directly whether a principal can perform a specific action. Agents should gather the service account, namespace, requested verb, API group, resource, subresource, RoleBindings, ClusterRoleBindings, and any impersonation flags before editing policy.

## Source-Mapped Facts

- Kubernetes documentation says RBAC uses the rbac.authorization.k8s.io API group to drive authorization decisions. ([source](https://kubernetes.io/docs/reference/access-authn-authz/rbac/))
- Kubernetes documentation says a Role sets permissions within a particular namespace, while a ClusterRole is a non-namespaced resource. ([source](https://kubernetes.io/docs/reference/access-authn-authz/rbac/))
- Kubernetes authorization documentation describes SubjectAccessReview as an API check for whether a user or group can perform an action. ([source](https://kubernetes.io/docs/reference/access-authn-authz/authorization/))

## Further Reading

- [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Kubernetes Authorization](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
