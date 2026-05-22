---
id:"kb-2026-00169"
title:"ARIA (Accessible Rich Internet Applications)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"WAI-ARIA 1.2 (W3C Recommendation)"
    type:"standard"
    year:2023
    url:"https://www.w3.org/TR/wai-aria/"
    institution:"W3C"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

ARIA provides attributes that enhance HTML accessibility for assistive technologies (screen readers). It defines roles (`role='button'`), states (`aria-expanded`), and properties (`aria-label`). The first rule of ARIA: don't use ARIA if native HTML already provides the semantics.

## Core Explanation

Key patterns: `aria-label` for accessible names, `aria-labelledby` to reference another element, `aria-describedby` for descriptions, `aria-live` for dynamic content announcements (polite/assertive). `role='alert'` for important notifications. ARIA does NOT change behavior — `role='button'` doesn't add click handling or keyboard interaction.

## Further Reading

- [WAI-ARIA 1.2 (W3C Recommendation)](https://www.w3.org/TR/wai-aria/)
