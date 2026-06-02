---
id: retrieval-evidence-ids-and-citation-stability
title: 'Retrieval Evidence IDs and Citation Stability'
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
  - id: fact-ai-retrieval-evidence-ids-and-citation-stability-1
    statement: >-
      W3C Web Annotation Data Model documentation describes Text Quote Selectors as identifying
      a text range by copying it plus prefix and suffix text.
    source_title: W3C Web Annotation Data Model
    source_url: https://www.w3.org/TR/annotation-model/
    confidence: medium
  - id: fact-ai-retrieval-evidence-ids-and-citation-stability-2
    statement: >-
      W3C PROV documentation defines provenance as information about entities, activities, and
      people involved in producing a piece of data or thing.
    source_title: W3C PROV Overview
    source_url: https://www.w3.org/TR/prov-overview/
    confidence: medium
  - id: fact-ai-retrieval-evidence-ids-and-citation-stability-3
    statement: >-
      RFC 3986 defines an identifier as information required to distinguish what is being
      identified from all other things within its identification scope.
    source_title: RFC 3986 Uniform Resource Identifier
    source_url: https://www.rfc-editor.org/info/rfc3986
    confidence: medium
completeness: 0.83
known_gaps:
  - Citation stability depends on canonical URLs, immutable document versions, chunk offsets, content hashes, selectors, redirects, source retention, and index rebuild compatibility.
disputed_statements: []
primary_sources:
  - title: W3C Web Annotation Data Model
    type: standard
    year: 2017
    url: https://www.w3.org/TR/annotation-model/
    institution: W3C
  - title: W3C PROV Overview
    type: standard
    year: 2013
    url: https://www.w3.org/TR/prov-overview/
    institution: W3C
  - title: RFC 3986 Uniform Resource Identifier
    type: standard
    year: 2005
    url: https://www.rfc-editor.org/info/rfc3986
    institution: IETF
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Stable evidence IDs let RAG systems cite the same source passage across reindexing, formatting changes, and answer regeneration.

## Core Explanation

Retrieval evidence should identify both the source resource and the selected passage inside it. A URL alone may not survive content edits, and a raw character offset may become brittle when the page changes. Robust systems combine canonical resource IDs, source version metadata, hashes, text selectors, offsets, and provenance records.

Agents should inspect how evidence IDs are generated, whether chunk IDs are deterministic, whether citations store selectors or only display text, and whether a reindex can preserve old claim-to-source links.

## Source-Mapped Facts

- W3C Web Annotation Data Model documentation describes Text Quote Selectors as identifying a text range by copying it plus prefix and suffix text. ([source](https://www.w3.org/TR/annotation-model/))
- W3C PROV documentation defines provenance as information about entities, activities, and people involved in producing a piece of data or thing. ([source](https://www.w3.org/TR/prov-overview/))
- RFC 3986 defines an identifier as information required to distinguish what is being identified from all other things within its identification scope. ([source](https://www.rfc-editor.org/info/rfc3986))

## Further Reading

- [W3C Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)
- [W3C PROV Overview](https://www.w3.org/TR/prov-overview/)
- [RFC 3986 Uniform Resource Identifier](https://www.rfc-editor.org/info/rfc3986)
