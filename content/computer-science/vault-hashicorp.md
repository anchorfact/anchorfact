---
id: "kb-2026-00317"



title: "Vault (HashiCorp)"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Vault Documentation"
    type: "documentation"



    year: 2026
    url: "https://developer.hashicorp.com/vault/docs"


    institution: "HashiCorp"
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
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

HashiCorp Vault (2015) is a secrets management tool — securely stores and controls access to tokens, passwords, certificates, and API keys. Secrets are encrypted at rest and in transit. Dynamic secrets (on-demand, short-lived) eliminate credential sprawl. Enterprise-grade access control via policies.

## Core Explanation

Secret engines: KV (key-value), AWS (dynamic IAM credentials), PKI (X.509 certificates), database (dynamic DB credentials). Authentication methods: token, Kubernetes, AWS IAM, LDAP, GitHub, OIDC. Policies (HCL): `path 'secret/*' { capabilities = ['read'] }`. Audit logging: track every access. Seal/unseal: Shamir's Secret Sharing for master key.

## Further Reading

- [Vault Documentation](https://developer.hashicorp.com/vault/docs)
