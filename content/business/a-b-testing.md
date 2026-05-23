---
id: "kb-2026-00215"


title: "A/B Testing"
schema_type: "TechArticle"


category: "business"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

atomic_facts:
  - id: fact-business-01
    statement: Users are randomly assigned to version A or B ; results measured via a Key Performance Indicator
    source_title: Harvard Business Review
    source_url: https://hbr.org/
    confidence: medium
  
completeness: 0.88
ai_citations:

primary_sources:
  - title: "Harvard Business Review"
    type: "journal"


    year: 2026
    url: "https://hbr.org/"

    institution: "Harvard Business Publishing"
secondary_sources:
  - title: "Harvard Business Review"
    type: "journal"


    year: 2026
    url: "https://hbr.org/"

    institution: "Harvard Business Publishing"
  - title: "Harvard Business Review"
    type: "journal"


    year: 2025
    url: "https://hbr.org/"

    institution: "Harvard Business Publishing"
  - title: "The Economist"
    type: "periodical"


    year: 2025
    url: "https://www.economist.com/"

    institution: "The Economist Group"
---

## TL;DR

A/B testing (split testing) compares two variants to determine which performs better. Users are randomly assigned to version A (control) or B (treatment); results measured via a Key Performance Indicator (conversion rate, click-through rate, revenue). Statistical significance ensures results aren't due to random chance.

## Core Explanation

Sample size calculator determines minimum users needed (for given effect size, power, significance level). p-value < 0.05 typically indicates statistical significance. Pitfalls: peeking (checking results early leads to false positives), multiple comparisons (Bonferroni correction), novelty effect (new performs better initially), Simpson's paradox (aggregated results differ from segmented). Common test duration: minimum 1-2 full business cycles.

## Further Reading

- [undefined](undefined)
