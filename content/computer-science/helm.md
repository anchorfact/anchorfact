---
id:"kb-2026-00314"
title:"Helm"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Helm Documentation"
    type:"documentation"
    year:2026
    url:"https://helm.sh/docs/"
    institution:"CNCF"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Helm (Deis, 2015, graduated CNCF) is the Kubernetes package manager — 'apt/yum for K8s'. Charts package Kubernetes resources (Deployments, Services, ConfigMaps) with templating (Go templates) and values. Helm 3 (2019) removed Tiller (server component) for improved security.

## Core Explanation

Chart structure: `Chart.yaml` (metadata), `values.yaml` (defaults), `templates/` (Kubernetes YAML with Go templates). `helm install myapp ./chart --set image.tag=v2`. `helm upgrade` for rolling updates. Repositories: `helm repo add stable https://charts.helm.sh/stable`. Helmfile: declarative Helm chart management. Hooks: pre/post install/upgrade/delete.

## Further Reading

- [Helm Documentation](https://helm.sh/docs/)
