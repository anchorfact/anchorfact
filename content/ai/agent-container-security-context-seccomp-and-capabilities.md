---
id: agent-container-security-context-seccomp-and-capabilities
title: 'Agent Container Security Context, Seccomp, and Capabilities'
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
  - id: fact-ai-agent-container-security-context-seccomp-and-capabilities-1
    statement: >-
      Kubernetes documentation says a security context defines privilege and
      access control settings for a Pod or Container.
    source_title: Kubernetes Configure a Security Context
    source_url: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
    confidence: medium
  - id: fact-ai-agent-container-security-context-seccomp-and-capabilities-2
    statement: >-
      Kubernetes documentation says Pod-level securityContext settings apply to
      all containers in the Pod.
    source_title: Kubernetes Configure a Security Context
    source_url: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
    confidence: medium
  - id: fact-ai-agent-container-security-context-seccomp-and-capabilities-3
    statement: >-
      Docker documentation describes seccomp as a Linux kernel feature that can
      restrict actions available within a container.
    source_title: Docker Seccomp Security Profiles
    source_url: https://docs.docker.com/engine/security/seccomp/
    confidence: medium
completeness: 0.82
known_gaps:
  - Container security diagnosis depends on orchestrator defaults, runtime class, PodSecurity admission, Linux capabilities, seccomp profile availability, AppArmor or SELinux policy, privileged flags, host mounts, and image entrypoint behavior.
disputed_statements: []
primary_sources:
  - title: Kubernetes Configure a Security Context
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
    institution: Kubernetes
  - title: Docker Seccomp Security Profiles
    type: documentation
    year: 2026
    url: https://docs.docker.com/engine/security/seccomp/
    institution: Docker
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Container security context evidence tells agents whether a failure comes from code, runtime permissions, blocked system calls, or an over-broad privilege setting.

## Core Explanation

Agents often see container failures as permission errors, mount errors, network errors, or unexplained process exits. Security context settings and seccomp profiles can be the root cause even when the application code is unchanged.

Useful evidence includes the Pod spec, container securityContext, effective user and group, capabilities added or dropped, privileged mode, read-only root filesystem, seccomp profile, runtime class, admission policy, and recent deployment changes. Agents should separate least-privilege remediation from broad privilege escalation.

## Source-Mapped Facts

- Kubernetes documentation says a security context defines privilege and access control settings for a Pod or Container. ([source](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/))
- Kubernetes documentation says Pod-level securityContext settings apply to all containers in the Pod. ([source](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/))
- Docker documentation describes seccomp as a Linux kernel feature that can restrict actions available within a container. ([source](https://docs.docker.com/engine/security/seccomp/))

## Further Reading

- [Kubernetes Configure a Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
- [Docker Seccomp Security Profiles](https://docs.docker.com/engine/security/seccomp/)
