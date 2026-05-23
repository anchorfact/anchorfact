---
id: "kb-2026-00070"
title: "JSON (JavaScript Object Notation)"
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
    statement: "Derived from JavaScript object literal syntax and popularized by Douglas Crockford in the early 2000s, JSON is the dominant data format for web APIs, configuration files, and data storage"
    source_title: "RFC 8259 — The JavaScript Object Notation (JSON) Data Interchange Format"
    source_url: "https://www.rfc-editor.org/rfc/rfc8259"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Derived from JavaScript object literal syntax and popularized by Douglas Crockford in the early 2000s, JSON is the dominant data format for web APIs, configuration files, and data storage."
    source_title: "RFC 8259 — The JavaScript Object Notation (JSON) Data Interchange Format"
    source_url: "https://www.rfc-editor.org/rfc/rfc8259"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Its simplicity — four primitive types (string, number, boolean, null) plus arrays and objects — has made it the universal lingua franca of data exchange on the web."
    source_title: "RFC 8259 — The JavaScript Object Notation (JSON) Data Interchange Format"
    source_url: "https://www.rfc-editor.org/rfc/rfc8259"
    confidence: "medium"
  - id: "fact-computer-science-004"
    statement: "5e10` | | Boolean | `true`, `false` | | Null | `null` | | Array | `[1, \"two\", true]` | | Object | `{\"key\": \"value\"}` |  **Notably absent**: Date type, integer vs."
    source_title: "RFC 8259 — The JavaScript Object Notation (JSON) Data Interchange Format"
    source_url: "https://www.rfc-editor.org/rfc/rfc8259"
    confidence: "medium"
  - id: "fact-computer-science-005"
    statement: "float distinction, comments, trailing commas."
    source_title: "RFC 8259 — The JavaScript Object Notation (JSON) Data Interchange Format"
    source_url: "https://www.rfc-editor.org/rfc/rfc8259"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The productivity impact of static typing in dynamic languages is contested: TypeScript advocates cite error reduction, while skeptics argue the overhead outweighs benefits for smaller projects"

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

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"

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
