# AnchorFact - Verified Claims for LLM Citations

> Machine-readable verified claims, public confidence metadata, and source-backed article records for AI systems.

AnchorFact is a trust-first knowledge registry for LLM and AI agent consumption. It keeps generated articles in the repository, but only promotes entries with real source verification data into public machine-readable surfaces such as `llms.txt`, `sitemap.xml`, `manifest.json`, and `claims.json`.

## Why This Exists

AI search systems often cite human-oriented pages with inconsistent structure and unclear provenance. AnchorFact flips the unit of value from "many AI-written articles" to "claims and articles with explicit verification metadata."

Each public entry exposes:

- canonical URL and stable route metadata
- confidence level and confidence basis
- source verification coverage
- draft/public status
- machine-readable claims with evidence references when available

## Key Features

- **Trust-first publication model**: public and draft content are separated by a shared quality model.
- **Machine-readable outputs**: HTML, JSON-LD, Turtle, Markdown, plain text, `llms.txt`, `manifest.json`, and `claims.json`.
- **Source verification pipeline**: DOI, arXiv, and URL reachability checks feed the confidence and quality gates.
- **Quality gate**: duplicate routes, missing public verification, placeholder content, and invalid high estimated confidence are blocked before build.
- **Cloudflare Pages deployment**: Pages builds only from the latest trusted snapshot; full verification runs in GitHub Actions.
- **Open license**: MIT code and CC-BY 4.0 content.

## Current Snapshot

| Metric | Value |
| --- | ---: |
| Total articles | 1000 |
| Public eligible articles | 638 |
| Draft articles | 362 |
| Public claims | 1966 |
| Overall source verification rate | 82.7% |
| Average sources per article | 2.4 |

## Links

- Website: [anchorfact.org](https://anchorfact.org)
- Public LLM index: [anchorfact.org/llms.txt](https://anchorfact.org/llms.txt)
- Claims export: [anchorfact.org/claims.json](https://anchorfact.org/claims.json)
- Manifest: [anchorfact.org/manifest.json](https://anchorfact.org/manifest.json)
- GitHub: [github.com/anchorfact/anchorfact](https://github.com/anchorfact/anchorfact)
- Design doc: [DESIGN.md](https://github.com/anchorfact/anchorfact/blob/main/DESIGN.md)
