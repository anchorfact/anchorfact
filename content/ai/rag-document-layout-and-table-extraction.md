---
id: rag-document-layout-and-table-extraction
title: 'RAG Document Layout and Table Extraction'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-rag-document-layout-and-table-extraction-1
    statement: >-
      Microsoft Document Intelligence documentation says the Layout model extracts
      text, tables, selection marks, and structure information from documents.
    source_title: Microsoft Document Intelligence Layout Model
    source_url: https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0
    confidence: medium
  - id: fact-ai-rag-document-layout-and-table-extraction-2
    statement: >-
      Amazon Textract documentation says table extraction returns information
      about tables detected in a document.
    source_title: Amazon Textract Tables
    source_url: https://docs.aws.amazon.com/textract/latest/dg/how-it-works-tables.html
    confidence: medium
  - id: fact-ai-rag-document-layout-and-table-extraction-3
    statement: >-
      Amazon Textract documentation distinguishes table cell blocks from merged
      cell blocks in table extraction output.
    source_title: Amazon Textract Tables
    source_url: https://docs.aws.amazon.com/textract/latest/dg/how-it-works-tables.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Document extraction quality depends on scan quality, OCR language, rotation, layout model version, table structure, merged cells, reading order, captions, footnotes, and whether extraction preserves source coordinates.
disputed_statements: []
primary_sources:
  - title: Microsoft Document Intelligence Layout Model
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0
    institution: Microsoft
  - title: Amazon Textract Tables
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/textract/latest/dg/how-it-works-tables.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG over PDFs and scanned documents needs layout and table evidence, not just plain text chunks.

## Core Explanation

Document RAG often fails when extraction loses reading order, table cells, section headers, captions, or page coordinates. A chunk can be semantically close to the query but still omit the row, column, or heading that makes the answer correct.

Agents should preserve page number, bounding regions, detected tables, cell coordinates, merged cells, headings, and extraction model version. That evidence lets a citation point back to a specific document region instead of a flattened text fragment.

## Source-Mapped Facts

- Microsoft Document Intelligence documentation says the Layout model extracts text, tables, selection marks, and structure information from documents. ([source](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0))
- Amazon Textract documentation says table extraction returns information about tables detected in a document. ([source](https://docs.aws.amazon.com/textract/latest/dg/how-it-works-tables.html))
- Amazon Textract documentation distinguishes table cell blocks from merged cell blocks in table extraction output. ([source](https://docs.aws.amazon.com/textract/latest/dg/how-it-works-tables.html))

## Further Reading

- [Microsoft Document Intelligence Layout Model](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0)
- [Amazon Textract Tables](https://docs.aws.amazon.com/textract/latest/dg/how-it-works-tables.html)
