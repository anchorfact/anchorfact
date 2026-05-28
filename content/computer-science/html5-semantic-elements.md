---
id: kb-2026-00168
title: HTML5 Semantic Elements
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: The HTML Standard defines the main element for the dominant contents of the body of a document.
    source_title: "HTML Standard: the main element"
    source_url: https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element
    confidence: medium
  - id: fact-computer-science-002
    statement: The article element represents a self-contained composition in a document, page, application, or site.
    source_title: "HTML Standard: the article element"
    source_url: https://html.spec.whatwg.org/multipage/sections.html#the-article-element
    confidence: medium
  - id: fact-computer-science-003
    statement: The nav element represents a section of a page that links to other pages or parts within the page.
    source_title: "HTML Standard: the nav element"
    source_url: https://html.spec.whatwg.org/multipage/sections.html#the-nav-element
    confidence: medium
completeness: 0.88
known_gaps:
  - Accessibility behavior across assistive technologies and browser combinations
  - Practical authoring guidance for complex application layouts
disputed_statements: []
primary_sources:
  - title: "HTML Standard: the main element"
    type: standard
    year: 2026
    institution: WHATWG
    url: https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element
  - title: "HTML Standard: the article element"
    type: standard
    year: 2026
    institution: WHATWG
    url: https://html.spec.whatwg.org/multipage/sections.html#the-article-element
  - title: "HTML Standard: the nav element"
    type: standard
    year: 2026
    institution: WHATWG
    url: https://html.spec.whatwg.org/multipage/sections.html#the-nav-element
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
HTML semantic elements give structure and meaning to web documents. Elements such as main, article, nav, header, section, aside, and footer communicate document roles more clearly than generic div elements.

## Core Explanation
Semantic HTML helps browsers, assistive technologies, search systems, and developers understand page structure. The benefit comes from choosing elements according to their specified meaning, not from sprinkling semantic tags around a page mechanically.

## Detailed Analysis
Good markup depends on the content model. main should identify dominant page content, article should be self-contained, and nav should group major navigation links. Accessibility still requires meaningful headings, labels, focus order, and keyboard behavior.

## Further Reading
- HTML Standard: main
- HTML Standard: article
- HTML Standard: nav

## Related Articles

- [AI for Search and Recommendation: Semantic Search, Collaborative Filtering, and Personalization Engines](../../ai/ai-search-recommendation.md)
- [Semantic Web and Ontologies: Knowledge Representation, OWL Reasoning, and Linked Data](../../ai/semantic-web-ontology.md)
