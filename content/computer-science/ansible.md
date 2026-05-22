---
id:"kb-2026-00313"
title:"Ansible"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed:true
primary_sources:
  - title:"Ansible Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.ansible.com/"
    institution:"Red Hat"
secondary_sources:
  - title: "Ansible: Up and Running (3rd Ed)"
    authors: ["Hochstein", "Moser"]
    type: "book"
    year: 2022
    url: "https://www.oreilly.com/library/view/ansible-up-and/9781098109141/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Ansible (Michael DeHaan, 2012, acquired by Red Hat 2015) is an agentless IT automation tool for configuration management, deployment, and orchestration. Uses YAML playbooks and SSH — no agent to install on target machines. Idempotent: running same playbook multiple times produces same result.

## Core Explanation

Playbook: YAML file defining hosts + tasks. Modules: `apt`, `yum`, `copy`, `template`, `service`, `docker_container`. Inventory: defines target hosts (static file or dynamic from cloud). Roles: reusable, organized playbook components. `ansible-vault` encrypts sensitive data. Tower/AWX: web UI + REST API. Galaxy: community role library.

## Further Reading

- [Ansible Documentation](https://docs.ansible.com/)
