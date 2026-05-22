---
id: "kb-2026-00095"
title: "Same-Origin Policy"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Same-Origin Policy (MDN Web Docs)"
    type: "documentation"
    year: 2024
    url: "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
    institution: "Mozilla"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Same-Origin Policy (SOP) is a critical web security mechanism restricting how documents and scripts from one origin interact with resources from another origin. Origin = protocol + host + port. SOP prevents malicious websites from reading sensitive data from other sites.

## Core Explanation

SOP restricts: DOM access (a page on origin A cannot read origin B's iframe/document content), XMLHttpRequest/Fetch to different origins (unless CORS permits), and cookie/WebStorage access. It does NOT restrict: embedding resources (`<img>`, `<script>`, `<link>`), form submissions, or redirects. SOP is fundamental to browser security and predates CORS.

## Further Reading

- [Same-Origin Policy (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
