---
id: "kb-2026-00070"
title: "JSON (JavaScript Object Notation)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on ECMA-404 standard and IETF RFC 8259"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "RFC 8259 — The JavaScript Object Notation (JSON) Data Interchange Format"
    authors: ["Bray, T."]
    type: "standard"
    year: 2017
    url: "https://www.rfc-editor.org/rfc/rfc8259"
    institution: "IETF"
  - title: "ECMA-404 — The JSON Data Interchange Syntax"
    type: "standard"
    year: 2017
    institution: "Ecma International"
completeness: 0.82
ai_citations: {last_citation_check: "2026-05-22"}
---

## TL;DR

JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format standardized as IETF RFC 8259 and ECMA-404. Derived from JavaScript object literal syntax and popularized by Douglas Crockford in the early 2000s, JSON is the dominant data format for web APIs, configuration files, and data storage. Its simplicity — four primitive types (string, number, boolean, null) plus arrays and objects — has made it the universal lingua franca of data exchange on the web.

## Core Types

| Type | Example |
|------|---------|
| String | `"hello"` |
| Number | `42`, `3.14`, `-1.5e10` |
| Boolean | `true`, `false` |
| Null | `null` |
| Array | `[1, "two", true]` |
| Object | `{"key": "value"}` |

**Notably absent**: Date type, integer vs. float distinction, comments, trailing commas.

## Key Extensions

- **JSON Schema**: Schema validation language (IETF draft)
- **JSON-LD**: Linked Data format using JSON (W3C Recommendation)
- **JSON5**: Superset with comments, trailing commas, unquoted keys
- **GeoJSON**: Geographic data format (RFC 7946)
- **NDJSON**: Newline-delimited JSON for streaming

## Further Reading

- [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259): IETF JSON standard
- [JSON.org](https://www.json.org/): Douglas Crockford's JSON page
