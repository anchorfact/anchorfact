---
id: "kb-2026-00070"
title: "JSON (JavaScript Object Notation)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-json-1"
    statement: "RFC 8259 defines JSON as a lightweight, text-based, language-independent data interchange format."
    source_title: "RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format"
    source_url: "https://www.ietf.org/rfc/rfc8259.txt"
    confidence: "medium"
  - id: "fact-json-2"
    statement: "RFC 8259 says JSON represents four primitive types, strings, numbers, booleans, and null, and two structured types, objects and arrays."
    source_title: "RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format"
    source_url: "https://www.ietf.org/rfc/rfc8259.txt"
    confidence: "medium"
  - id: "fact-json-3"
    statement: "ECMA-404 defines JSON syntax and describes JSON text as a sequence of Unicode code points that conforms to the JSON value grammar."
    source_title: "ECMA-404: The JSON Data Interchange Syntax"
    source_url: "https://ecma-international.org/publications-and-standards/standards/ecma-404/"
    confidence: "medium"

completeness: 0.8

known_gaps:
  - "This compact repair covers the core JSON standard and does not survey JSON extensions such as JSON Schema or JSON-LD."

disputed_statements: []

primary_sources:
  - title: "RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format"
    authors: ["Bray, T."]
    type: "rfc"
    year: 2017
    url: "https://www.ietf.org/rfc/rfc8259.txt"
    institution: "IETF"
  - title: "ECMA-404: The JSON Data Interchange Syntax"
    type: "standard"
    year: 2017
    url: "https://ecma-international.org/publications-and-standards/standards/ecma-404/"
    institution: "Ecma International"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

JSON is a lightweight text format for exchanging structured data. Its grammar is deliberately small: a JSON value can be an object, array, string, number, boolean, or null.

## Core Explanation

JSON is commonly used because its data model is easy for humans to read and easy for programs to parse. Objects hold name/value pairs, arrays hold ordered values, and primitive values cover strings, numbers, booleans, and null.

The standards intentionally define syntax, not application semantics. Dates, comments, trailing commas, object-member uniqueness policies, and schema validation are handled by surrounding formats, parsers, or application conventions.

## Further Reading

- [RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format](https://www.ietf.org/rfc/rfc8259.txt)
- [ECMA-404: The JSON Data Interchange Syntax](https://ecma-international.org/publications-and-standards/standards/ecma-404/)

## Related Articles

- [REST API](../rest-api.md)
- [API Gateway](../api-gateway.md)
