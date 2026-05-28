---
id: kb-2026-00318
title: Packer
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-packer-001
    statement: HashiCorp Packer creates identical machine images for multiple platforms from a single source configuration.
    source_title: Packer documentation | Packer | HashiCorp Developer
    source_url: https://developer.hashicorp.com/packer/docs
    confidence: medium
  - id: fact-computer-science-packer-002
    statement: >-
      Packer templates are configuration files that define which plugins to use, how to configure them, and the order in
      which to run them.
    source_title: Packer templates reference overview | Packer | HashiCorp Developer
    source_url: https://developer.hashicorp.com/packer/docs/templates
    confidence: medium
  - id: fact-computer-science-packer-003
    statement: >-
      The Packer build block specifies which builders run, how to provision them, and any post-processing actions for
      resulting artifacts.
    source_title: build block reference | Packer | HashiCorp Developer
    source_url: https://developer.hashicorp.com/packer/docs/templates/hcl_templates/blocks/build
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: Packer documentation | Packer | HashiCorp Developer
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/packer/docs
    institution: HashiCorp
  - title: Packer templates reference overview | Packer | HashiCorp Developer
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/packer/docs/templates
    institution: HashiCorp
  - title: build block reference | Packer | HashiCorp Developer
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/packer/docs/templates/hcl_templates/blocks/build
    institution: HashiCorp
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Packer builds machine images from source configuration. This repair removes duplicated claims and keeps the article to HashiCorp documentation about images, templates, and build blocks.

## Core Explanation

Packer templates describe the plugins and build workflow for creating images. In HCL templates, source and build blocks separate builder configuration from the build steps, provisioners, and post-processing actions.

## Further Reading

- [Packer documentation | Packer | HashiCorp Developer](https://developer.hashicorp.com/packer/docs)
- [Packer templates reference overview | Packer | HashiCorp Developer](https://developer.hashicorp.com/packer/docs/templates)
- [build block reference | Packer | HashiCorp Developer](https://developer.hashicorp.com/packer/docs/templates/hcl_templates/blocks/build)
