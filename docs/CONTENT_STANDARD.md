# AnchorFact Content Standard

This standard defines the shape of content that can safely become public.

## Frontmatter

Required fields:

```yaml
id: stable-id
title: Article Title
schema_type: TechArticle
category: domain-or-folder
language: en
primary_sources:
  - title: Specific source title
    type: academic_paper
    year: 2026
    url: https://example.com/specific-source
generation_method: ai_structured
created_date: "2026-05-27"
last_verified: "2026-05-27"
```

Optional fields:

- `slug`: explicit canonical slug. Use only when the path-derived slug is wrong.
- `status`: `draft` or `published`. Omit this for automatic classification.
- `confidence`: `low`, `medium`, or `high`. This acts as an editorial upper bound.
- `known_gaps`: concrete limitations, not placeholder text.
- `disputed_statements`: specific disputes with evidence.
- `atomic_facts`: short evidence-linked claims.

## Article Body

Each article should contain:

- `## TL;DR`: one concise factual summary.
- `## Core Explanation` or equivalent body section.
- `## Further Reading` when additional sources are useful.

Avoid marketing language, unsupported superlatives, vague disputes, and placeholder text.

## Atomic Facts

Use atomic facts only for claims that can be checked directly.

```yaml
atomic_facts:
  - id: fact-example-001
    statement: A specific factual statement.
    source_title: Specific source title
    source_url: https://example.com/specific-source
    confidence: medium
```

Do not put paragraphs, Markdown tables, headings, or code fences inside `statement`. If a claim needs more than one sentence, split it or leave it out of `atomic_facts`.

## Sources

Sources should point to specific evidence pages, papers, reports, standards, or official documents. A homepage can be listed only when it is the canonical source for the claim; otherwise it is flagged as `generic_source_homepage`.

Preferred source types:

- `academic_paper`
- `standard`
- `government_report`
- `official_report`
- `textbook`
- `industry_whitepaper`

Common aliases such as `technical_documentation`, `official_documentation`, `government_document`, `museum_reference`, `reference_article`, `technical_specification`, `scientific_report`, `regulatory_report`, `design_guideline`, and `conference_keynote` are normalized to the closest preferred type during confidence scoring. Truly unknown source types remain lower-tier until they are reviewed and added deliberately.

## Publication Workflow

1. Add or edit Markdown content.
2. Run `npm run verify` or rely on the scheduled GitHub Actions verification snapshot.
3. Run `npm run quality`.
4. Run `npm run build`.
5. Review `manifest.json` quality reasons before treating an article as public.

Do not bulk-promote content. Public status should be earned by verification and clean structure.
