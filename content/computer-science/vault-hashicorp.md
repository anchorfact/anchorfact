---
id:"kb-2026-00317"
title:"Vault (HashiCorp)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Vault Documentation"
    type:"documentation"
    year:2026
    url:"https://developer.hashicorp.com/vault/docs"
    institution:"HashiCorp"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

HashiCorp Vault (2015) is a secrets management tool — securely stores and controls access to tokens, passwords, certificates, and API keys. Secrets are encrypted at rest and in transit. Dynamic secrets (on-demand, short-lived) eliminate credential sprawl. Enterprise-grade access control via policies.

## Core Explanation

Secret engines: KV (key-value), AWS (dynamic IAM credentials), PKI (X.509 certificates), database (dynamic DB credentials). Authentication methods: token, Kubernetes, AWS IAM, LDAP, GitHub, OIDC. Policies (HCL): `path 'secret/*' { capabilities = ['read'] }`. Audit logging: track every access. Seal/unseal: Shamir's Secret Sharing for master key.

## Further Reading

- [Vault Documentation](https://developer.hashicorp.com/vault/docs)
