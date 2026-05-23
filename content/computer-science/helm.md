---
id: "kb-2026-00314"


title: "Helm"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Helm Documentation"
    type: "documentation"


    year: 2026
    url: "https://helm.sh/docs/"

    institution: "CNCF"
    note: "Kubernetes package manager: charts, templates, values.yaml, hooks, repositories, Helm Hub"


secondary_sources:
  - title: "Kubernetes in Action (2nd Edition)"
    authors: ["Luksa, Marko"]
    type: "book"


    year: 2023
    url: "https://www.manning.com/books/kubernetes-in-action-second-edition"

    institution: "Manning"
    note: "Helm is the de facto package manager for Kubernetes — understanding K8s resource model is essential"


completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations:
---

## TL;DR

Helm (Deis, 2015, graduated CNCF) is the Kubernetes package manager — 'apt/yum for K8s'. Charts package Kubernetes resources (Deployments, Services, ConfigMaps) with templating (Go templates) and values. Helm 3 (2019) removed Tiller (server component) for improved security.

## Core Explanation

Chart structure: `Chart.yaml` (metadata), `values.yaml` (defaults), `templates/` (Kubernetes YAML with Go templates). `helm install myapp ./chart --set image.tag=v2`. `helm upgrade` for rolling updates. Repositories: `helm repo add stable https://charts.helm.sh/stable`. Helmfile: declarative Helm chart management. Hooks: pre/post install/upgrade/delete.

## Further Reading

- [Helm Documentation](https://helm.sh/docs/)
