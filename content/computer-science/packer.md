---
id: "kb-2026-00318"



title: "Packer"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Packer Documentation"
    type: "documentation"



    year: 2026
    url: "https://developer.hashicorp.com/packer/docs"


    institution: "HashiCorp"
    note: "Machine image builder: HCL templates, multi-cloud, provisioners, post-processors"



secondary_sources:
  - title: "Ansible: Up and Running (3rd Edition)"
    authors: ["Hochstein, Lorin", "Moser, Rene"]
    type: "book"



    year: 2022
    url: "https://www.oreilly.com/library/view/ansible-up-and/9781098109141/"


    institution: "O'Reilly"
    note: "Packer and Ansible commonly paired — Packer builds images, Ansible provisions them"



completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

Packer (HashiCorp, 2013) creates identical machine images for multiple platforms from a single configuration. Define once, build for AWS AMI, Azure VM, GCP image, Docker, VirtualBox. Immutable infrastructure: bake software into image, deploy by launching new instances.

## Core Explanation

HCL configuration: source block (platform), build block (configuration). Provisioners: shell, Ansible, Chef, Puppet, file. Post-processors: Vagrant, vSphere template, Docker push. `packer init`, `packer validate`, `packer build`. HCP Packer: track image metadata across cloud accounts.

## Further Reading

- [Packer Documentation](https://developer.hashicorp.com/packer/docs)
