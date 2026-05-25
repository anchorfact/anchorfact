---
id: "kb-2026-00169"
title: "ARIA (Accessible Rich Internet Applications)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "The first rule of ARIA: don't use ARIA if native HTML already provides the semantics"
    source_title: "WAI-ARIA 1.2 (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/wai-aria/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "ARIA provides attributes that enhance HTML accessibility for assistive technologies (screen readers). It defines roles (`role='button'`), states (`aria-expanded`), and properties (`aria-label`). The first rule of ARIA: don't use ARIA if native HTML already provides the semantics."
    source_title: "WAI-ARIA 1.2 (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/wai-aria/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Key patterns: `aria-label` for accessible names, `aria-labelledby` to reference another element, `aria-describedby` for descriptions, `aria-live` for dynamic content announcements (polite/assertive)."
    source_title: "WAI-ARIA 1.2 (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/wai-aria/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "ARIA does NOT change behavior — `role='button'` doesn't add click handling or keyboard interaction."
    source_title: "WAI-ARIA 1.2 (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/wai-aria/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "WAI-ARIA 1.2 (W3C Recommendation)"
    type: "standard"
    year: 2023
    url: "https://www.w3.org/TR/wai-aria/"
    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — ARIA"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA"
    institution: "Mozilla"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

ARIA provides attributes that enhance HTML accessibility for assistive technologies (screen readers). It defines roles (`role='button'`), states (`aria-expanded`), and properties (`aria-label`). The first rule of ARIA: don't use ARIA if native HTML already provides the semantics.

## Core Explanation

Key patterns: `aria-label` for accessible names, `aria-labelledby` to reference another element, `aria-describedby` for descriptions, `aria-live` for dynamic content announcements (polite/assertive). `role='alert'` for important notifications. ARIA does NOT change behavior — `role='button'` doesn't add click handling or keyboard interaction.

## Further Reading

- [WAI-ARIA 1.2 (W3C Recommendation)](https://www.w3.org/TR/wai-aria/)

## Related Articles

- [AI Democratization: Open-Source Models, Low-Code AI, and Accessible Machine Learning](../../ai/ai-for-democratization.md)
- [AI for the Internet of Things: Federated Learning, TinyML, and Intelligent Edge Devices](../../ai/ai-for-iot.md)
- [Graph Neural Networks: Message Passing and Applications](../../ai/graph-neural-networks.md)
