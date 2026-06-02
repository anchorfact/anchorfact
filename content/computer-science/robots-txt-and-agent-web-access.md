---
id: robots-txt-and-agent-web-access
title: 'Robots.txt and Agent Web Access'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-robots-txt-and-agent-web-access-1
    statement: >-
      RFC 9309 says crawlers should follow at least five consecutive redirects when fetching robots.txt and must follow the rules if the file is reached within those redirects.
    source_title: RFC 9309 - Robots Exclusion Protocol
    source_url: https://datatracker.ietf.org/doc/html/rfc9309
    confidence: medium
  - id: fact-cs-robots-txt-and-agent-web-access-2
    statement: >-
      Google crawling documentation says robots.txt must be placed in the top-level directory of a site and its rules apply only to the host, protocol, and port where it is hosted.
    source_title: How Google Interprets the robots.txt Specification
    source_url: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
    confidence: medium
  - id: fact-cs-robots-txt-and-agent-web-access-3
    statement: >-
      Google Search Central documentation says a robots.txt file tells search engine crawlers which URLs they can access, mainly to avoid overloading a site with requests.
    source_title: Introduction to robots.txt - Google Search Central
    source_url: https://developers.google.com/search/docs/crawling-indexing/robots/intro
    confidence: medium
completeness: 0.83
known_gaps:
  - Robots.txt is a crawl-access convention, not an authentication or authorization system for private data.
disputed_statements: []
primary_sources:
  - title: RFC 9309 - Robots Exclusion Protocol
    type: standard
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9309
    institution: IETF
  - title: How Google Interprets the robots.txt Specification
    type: documentation
    year: 2026
    url: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
    institution: Google
  - title: Introduction to robots.txt - Google Search Central
    type: documentation
    year: 2025
    url: https://developers.google.com/search/docs/crawling-indexing/robots/intro
    institution: Google
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Robots.txt is a public crawl policy file that helps crawlers and web agents decide which URLs they should request from a site.

## Core Explanation

Agent web access needs more than search results. Before fetching or crawling a site, an agent should understand the site's robots policy, the host and protocol scope of that policy, and the difference between crawl guidance and access control.

Robots.txt is useful for respectful crawling and rate management, but it does not secure private data. Sensitive resources still need authentication, authorization, and server-side controls.

## Source-Mapped Facts

- RFC 9309 says crawlers should follow at least five consecutive redirects when fetching robots.txt and must follow the rules if the file is reached within those redirects. ([source](https://datatracker.ietf.org/doc/html/rfc9309))
- Google crawling documentation says robots.txt must be placed in the top-level directory of a site and its rules apply only to the host, protocol, and port where it is hosted. ([source](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec))
- Google Search Central documentation says a robots.txt file tells search engine crawlers which URLs they can access, mainly to avoid overloading a site with requests. ([source](https://developers.google.com/search/docs/crawling-indexing/robots/intro))

## Further Reading

- [RFC 9309: Robots Exclusion Protocol](https://datatracker.ietf.org/doc/html/rfc9309)
- [Google robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)
- [Google Search Central robots.txt guide](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
