---
id:"kb-2026-00318"
title:"Packer"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Packer Documentation"
    type:"documentation"
    year:2026
    url:"https://developer.hashicorp.com/packer/docs"
    institution:"HashiCorp"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Packer (HashiCorp, 2013) creates identical machine images for multiple platforms from a single configuration. Define once, build for AWS AMI, Azure VM, GCP image, Docker, VirtualBox. Immutable infrastructure: bake software into image, deploy by launching new instances.

## Core Explanation

HCL configuration: source block (platform), build block (configuration). Provisioners: shell, Ansible, Chef, Puppet, file. Post-processors: Vagrant, vSphere template, Docker push. `packer init`, `packer validate`, `packer build`. HCP Packer: track image metadata across cloud accounts.

## Further Reading

- [Packer Documentation](https://developer.hashicorp.com/packer/docs)
