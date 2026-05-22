---
id:"kb-2026-00170"
title:"Web Performance Optimization"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Web Vitals (Google)"
    type:"documentation"
    year:2024
    url:"https://web.dev/vitals/"
    institution:"Google"
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

Web performance optimization reduces page load time and improves user experience. Core Web Vitals: LCP (Largest Contentful Paint, <2.5s), INP (Interaction to Next Paint, <200ms, replaces FID in 2024), CLS (Cumulative Layout Shift, <0.1). These metrics directly affect Google search rankings.

## Core Explanation

Optimization techniques: code splitting (dynamic imports), tree shaking (remove unused code), image optimization (WebP/AVIF, srcset, lazy loading), font optimization (font-display: swap, subsetting), CDN, compression (Brotli), caching (Cache-Control headers), critical CSS inlining. Lighthouse and PageSpeed Insights measure and guide improvements.

## Further Reading

- [Web Vitals (Google)](https://web.dev/vitals/)
