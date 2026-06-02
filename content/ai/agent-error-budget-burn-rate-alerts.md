---
id: agent-error-budget-burn-rate-alerts
title: 'Agent Error Budget Burn Rate Alerts'
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
  - id: fact-ai-agent-error-budget-burn-rate-alerts-1
    statement: >-
      The Google SRE Workbook describes burn rate as how fast a service consumes its error budget
      relative to its SLO.
    source_title: Google SRE Workbook Alerting on SLOs
    source_url: https://sre.google/workbook/alerting-on-slos/
    confidence: medium
  - id: fact-ai-agent-error-budget-burn-rate-alerts-2
    statement: >-
      Google Cloud documentation describes burn-rate alerting as alerting when an SLO's error budget
      is consumed too quickly.
    source_title: Google Cloud Alerting on Burn Rate
    source_url: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate
    confidence: medium
  - id: fact-ai-agent-error-budget-burn-rate-alerts-3
    statement: >-
      Grafana Cloud SLO documentation describes burn-rate notifications as alerts based on how fast
      error budget is consumed.
    source_title: Grafana Cloud Burn Rate Notifications
    source_url: https://grafana.com/docs/grafana-cloud/alerting-and-irm/slo/set-up/configure-burn-rate-notifications/
    confidence: medium
completeness: 0.83
known_gaps:
  - Burn-rate windows, alert thresholds, and paging policy depend on the service SLO and operational tolerance for noise.
disputed_statements: []
primary_sources:
  - title: Google SRE Workbook Alerting on SLOs
    type: documentation
    year: 2026
    url: https://sre.google/workbook/alerting-on-slos/
    institution: Google SRE
  - title: Google Cloud Alerting on Burn Rate
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate
    institution: Google Cloud
  - title: Grafana Cloud Burn Rate Notifications
    type: documentation
    year: 2026
    url: https://grafana.com/docs/grafana-cloud/alerting-and-irm/slo/set-up/configure-burn-rate-notifications/
    institution: Grafana
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Burn-rate alerts tell agents whether a reliability problem is consuming the service's error budget quickly enough to justify escalation.

## Core Explanation

An error budget turns reliability into a finite allowance. Burn rate measures how quickly that allowance is being spent. For agents, this signal is more actionable than a raw error count because it ties operational urgency to an SLO.

An agent that sees a high burn rate should prefer low-risk mitigations, explicit escalation, and rollback-friendly changes. A low burn rate does not prove a system is healthy, but it can keep automation from overreacting to isolated noise.

## Source-Mapped Facts

- The Google SRE Workbook describes burn rate as how fast a service consumes its error budget relative to its SLO. ([source](https://sre.google/workbook/alerting-on-slos/))
- Google Cloud documentation describes burn-rate alerting as alerting when an SLO's error budget is consumed too quickly. ([source](https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate))
- Grafana Cloud SLO documentation describes burn-rate notifications as alerts based on how fast error budget is consumed. ([source](https://grafana.com/docs/grafana-cloud/alerting-and-irm/slo/set-up/configure-burn-rate-notifications/))

## Further Reading

- [Google SRE Workbook Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)
- [Google Cloud Alerting on Burn Rate](https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate)
- [Grafana Cloud Burn Rate Notifications](https://grafana.com/docs/grafana-cloud/alerting-and-irm/slo/set-up/configure-burn-rate-notifications/)
