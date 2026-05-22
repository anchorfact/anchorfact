---
id:"kb-2026-00316"
title:"Grafana"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Grafana Documentation"
    type: "documentation"
    year: 2026
    url: "https://grafana.com/docs/"
    institution: "Grafana Labs"
    note: "Open observability platform: dashboards, alerting, Loki (logs), Mimir (metrics), Tempo (traces)"
secondary_sources:
  - title: "Site Reliability Engineering (Google)"
    authors: ["Beyer, Betsy", "Jones, Chris", "Petoff, Jennifer", "Murphy, Niall Richard"]
    type: "book"
    year: 2016
    url: "https://sre.google/books/"
    institution: "O'Reilly"
    note: "The four golden signals of monitoring — the foundation Grafana helps visualize"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Grafana (2014, Torkel Odegaard) is the leading open-source observability platform for dashboards, alerting, and data visualization. It queries 30+ data sources (Prometheus, Elasticsearch, InfluxDB, PostgreSQL). Grafana 10 (2023) introduced Scenes (dashboard as code) and Correlations.

## Core Explanation

Dashboards: panels (graph, stat, table, heatmap, geo), variables (dynamic filtering), annotations (event markers). Alerting: unified UI with Prometheus Alertmanager integration. Explore: ad-hoc query interface. Loki: Grafana's log aggregation system (Prometheus for logs). Tempo: distributed tracing. Grafana Cloud: managed observability stack (free tier: 10K metrics, 50GB logs).

## Further Reading

- [Grafana Documentation](https://grafana.com/docs/)
