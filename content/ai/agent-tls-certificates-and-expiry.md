---
id: agent-tls-certificates-and-expiry
title: 'Agent TLS Certificates and Expiry'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-tls-certificates-and-expiry-1
    statement: >-
      Let's Encrypt documentation says its certificates are valid for 90 days.
    source_title: Let's Encrypt FAQ
    source_url: https://letsencrypt.org/docs/faq/
    confidence: medium
  - id: fact-ai-agent-tls-certificates-and-expiry-2
    statement: >-
      AWS Certificate Manager documentation describes managed renewal for eligible ACM certificates.
    source_title: AWS ACM Managed Renewal
    source_url: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
    confidence: medium
  - id: fact-ai-agent-tls-certificates-and-expiry-3
    statement: >-
      Cloudflare documentation describes Universal SSL as providing SSL/TLS certificates for proxied
      domains.
    source_title: Cloudflare Universal SSL
    source_url: https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/
    confidence: medium
completeness: 0.82
known_gaps:
  - Certificate status depends on certificate chain, SAN coverage, renewal automation, DNS validation, load balancer attachment, and client trust stores.
disputed_statements: []
primary_sources:
  - title: Let's Encrypt FAQ
    type: documentation
    year: 2026
    url: https://letsencrypt.org/docs/faq/
    institution: Let's Encrypt
  - title: AWS ACM Managed Renewal
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
    institution: Amazon Web Services
  - title: Cloudflare Universal SSL
    type: documentation
    year: 2026
    url: https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/
    institution: Cloudflare
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

TLS certificate expiry is a high-signal source for agents investigating outages, browser errors, and failed API calls.

## Core Explanation

Expired or misconfigured certificates can make a healthy service unreachable. Agents should check expiration time, issuer, subject alternative names, renewal status, validation method, and where the certificate is attached.

Renewal automation is not proof that a certificate is safe. DNS validation can fail, a certificate can be attached to the wrong listener, and intermediate chain issues can still break clients. A safe diagnosis cites the observed certificate and the managed certificate record.

## Source-Mapped Facts

- Let's Encrypt documentation says its certificates are valid for 90 days. ([source](https://letsencrypt.org/docs/faq/))
- AWS Certificate Manager documentation describes managed renewal for eligible ACM certificates. ([source](https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html))
- Cloudflare documentation describes Universal SSL as providing SSL/TLS certificates for proxied domains. ([source](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/))

## Further Reading

- [Let's Encrypt FAQ](https://letsencrypt.org/docs/faq/)
- [AWS ACM Managed Renewal](https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html)
- [Cloudflare Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/)
