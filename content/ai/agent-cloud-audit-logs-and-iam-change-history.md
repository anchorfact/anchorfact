---
id: agent-cloud-audit-logs-and-iam-change-history
title: 'Agent Cloud Audit Logs and IAM Change History'
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
  - id: fact-ai-agent-cloud-audit-logs-and-iam-change-history-1
    statement: >-
      AWS CloudTrail documentation says actions taken by a user, role, or AWS service are recorded
      as events in CloudTrail.
    source_title: AWS CloudTrail User Guide
    source_url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html
    confidence: medium
  - id: fact-ai-agent-cloud-audit-logs-and-iam-change-history-2
    statement: >-
      Google Cloud Audit Logs documentation says Admin Activity audit logs record user-driven API
      calls or other actions that modify resource configuration or metadata.
    source_title: Google Cloud Audit Logs Overview
    source_url: https://docs.cloud.google.com/logging/docs/audit
    confidence: medium
  - id: fact-ai-agent-cloud-audit-logs-and-iam-change-history-3
    statement: >-
      Microsoft Azure Activity Log documentation says Azure retains activity log events for 90 days
      by default before deleting them.
    source_title: Azure Activity Log
    source_url: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log
    confidence: medium
completeness: 0.82
known_gaps:
  - Cloud audit interpretation depends on provider, account scope, organization trails, data-access logging settings, retention, cross-account role assumptions, identity federation, and delayed log delivery.
disputed_statements: []
primary_sources:
  - title: AWS CloudTrail User Guide
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html
    institution: Amazon Web Services
  - title: Google Cloud Audit Logs Overview
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/logging/docs/audit
    institution: Google Cloud
  - title: Azure Activity Log
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log
    institution: Microsoft
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agents that troubleshoot access, deletions, policy drift, or production changes should inspect cloud audit logs before guessing who changed what.

## Core Explanation

Cloud audit logs capture management-plane and, when enabled, data-plane activity. They are often the only reliable way to connect an observed failure to an IAM policy edit, service-account use, role assumption, resource deletion, or console/API action.

An agent should collect provider, account or project, resource scope, principal, event name, timestamp range, request ID, source IP, user agent, status, and retention window. The trace should also note whether data-access logging was enabled, because many high-value reads are not always logged by default.

## Source-Mapped Facts

- AWS CloudTrail documentation says actions taken by a user, role, or AWS service are recorded as events in CloudTrail. ([source](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html))
- Google Cloud Audit Logs documentation says Admin Activity audit logs record user-driven API calls or other actions that modify resource configuration or metadata. ([source](https://docs.cloud.google.com/logging/docs/audit))
- Microsoft Azure Activity Log documentation says Azure retains activity log events for 90 days by default before deleting them. ([source](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log))

## Further Reading

- [AWS CloudTrail User Guide](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)
- [Google Cloud Audit Logs Overview](https://docs.cloud.google.com/logging/docs/audit)
- [Azure Activity Log](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log)
