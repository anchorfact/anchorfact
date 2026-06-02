---
id: agent-cdn-cache-headers-and-invalidation
title: 'Agent CDN Cache Headers and Invalidation'
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
  - id: fact-ai-agent-cdn-cache-headers-and-invalidation-1
    statement: >-
      RFC 9111 defines Cache-Control as a header field used to list cache directives in HTTP
      requests and responses.
    source_title: RFC 9111 HTTP Caching
    source_url: https://datatracker.ietf.org/doc/html/rfc9111
    confidence: medium
  - id: fact-ai-agent-cdn-cache-headers-and-invalidation-2
    statement: >-
      Cloudflare documentation describes purging cache as removing cached resources from Cloudflare's
      cache.
    source_title: Cloudflare Purge Cache
    source_url: https://developers.cloudflare.com/cache/how-to/purge-cache/
    confidence: medium
  - id: fact-ai-agent-cdn-cache-headers-and-invalidation-3
    statement: >-
      Amazon CloudFront documentation says invalidation can remove files from edge caches before
      they expire.
    source_title: Amazon CloudFront Invalidation
    source_url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html
    confidence: medium
completeness: 0.84
known_gaps:
  - CDN behavior depends on provider-specific cache keys, tiered cache, origin headers, stale settings, and purge propagation.
disputed_statements: []
primary_sources:
  - title: RFC 9111 HTTP Caching
    type: standard
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9111
    institution: IETF
  - title: Cloudflare Purge Cache
    type: documentation
    year: 2026
    url: https://developers.cloudflare.com/cache/how-to/purge-cache/
    institution: Cloudflare
  - title: Amazon CloudFront Invalidation
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

CDN cache headers and invalidation records help agents distinguish origin bugs from stale edge responses.

## Core Explanation

When users see stale or inconsistent responses, an agent needs to inspect Cache-Control directives, validators, CDN cache status, and purge history before changing application code. A cached object can outlive the deployment that generated it, and purge operations may target URLs, tags, hosts, or paths depending on the provider.

Agents should name the cache layer they are reasoning about. Browser caches, CDN edge caches, reverse proxies, and application caches can all have different freshness rules and invalidation paths.

## Source-Mapped Facts

- RFC 9111 defines Cache-Control as a header field used to list cache directives in HTTP requests and responses. ([source](https://datatracker.ietf.org/doc/html/rfc9111))
- Cloudflare documentation describes purging cache as removing cached resources from Cloudflare's cache. ([source](https://developers.cloudflare.com/cache/how-to/purge-cache/))
- Amazon CloudFront documentation says invalidation can remove files from edge caches before they expire. ([source](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html))

## Further Reading

- [RFC 9111 HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)
- [Cloudflare Purge Cache](https://developers.cloudflare.com/cache/how-to/purge-cache/)
- [Amazon CloudFront Invalidation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
