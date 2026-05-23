---
id: "kb-2026-00318"
title: "Packer"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "Packer (HashiCorp, 2013) creates identical machine images for multiple platforms from a single configuration. Define once, build for AWS AMI, Azure VM, GCP image, Docker, VirtualBox. Immutable infrastructure: bake software into image, deploy by launching new instances."
    source_title: "Packer Documentation"
    source_url: "https://developer.hashicorp.com/packer/docs"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Packer (HashiCorp, 2013) creates identical machine images for multiple platforms from a single configuration. Define once, build for AWS AMI, Azure VM, GCP image, Docker, VirtualBox. Immutable infrastructure: bake software into image, deploy by launching new instances."
    source_title: "Packer Documentation"
    source_url: "https://developer.hashicorp.com/packer/docs"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Packer Documentation"
    type: "documentation"
    year: 2026
    url: "https://developer.hashicorp.com/packer/docs"
    institution: "HashiCorp"

secondary_sources:
  - title: "Ansible: Up and Running (3rd Edition)"
    authors: ["Hochstein, Lorin", "Moser, Rene"]
    type: "book"
    year: 2022
    url: "https://www.oreilly.com/library/view/ansible-up-and/9781098109141/"
    institution: "O'Reilly"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---





## TL;DR

Packer (HashiCorp, 2013) creates identical machine images for multiple platforms from a single configuration. Define once, build for AWS AMI, Azure VM, GCP image, Docker, VirtualBox. Immutable infrastructure: bake software into image, deploy by launching new instances.

## Core Explanation

HCL configuration: source block (platform), build block (configuration). Provisioners: shell, Ansible, Chef, Puppet, file. Post-processors: Vagrant, vSphere template, Docker push. `packer init`, `packer validate`, `packer build`. HCP Packer: track image metadata across cloud accounts.

## Further Reading

- [Packer Documentation](https://developer.hashicorp.com/packer/docs)
