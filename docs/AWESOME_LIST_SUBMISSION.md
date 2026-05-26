# AnchorFact — AI-Native Knowledge Base

> Anchor AI to Facts. 876 articles. Public confidence formula. MCP Server included.

AnchorFact is an **AI-structured knowledge base designed for LLM and AI Agent consumption**. Unlike Wikipedia (human editors, opaque trust) or AI-generated content farms (no source traceability), AnchorFact anchors every statement in **machine-verifiable sources** (DOI papers, ISO/IEC standards, RFCs) and computes confidence via a **public, deterministic formula** that any downstream system can independently verify.

## Why This Exists

AI search engines (ChatGPT, Perplexity, Claude) cite sources designed for humans — Wikipedia, blog posts, news articles. Extraction errors are common. Structure is inconsistent. Trust is opaque.

AnchorFact flips this: every article is compiled from traceable publications. Confidence = `source_tier × 0.35 + source_count × 0.20 + source_verified × 0.25 + freshness × 0.10 − decay × 0.10`. No black-box AI scoring. No human editorial judgment. You can replicate the calculation yourself.

## Key Features

- **876 articles** across 11 domains (AI, computer science, history, science, geography, sports, self-improvement, etc.)
- **Public confidence formula** — deterministic, verifiable, reproducible
- **5 output formats**: JSON-LD (Schema.org), Turtle (RDF), Markdown, Plain Text, HTML
- **Source verification pipeline**: CrossRef DOI + arXiv API + HTTP reachability, incremental mode (<1s for unchanged files)
- **MCP Server** (Python): BM25 search + structured article retrieval for Claude Desktop / AI agents
- **CI/CD**: GitHub Actions every 6h, auto-deploy to Cloudflare Pages
- **llms.txt**, sitemap.xml, CORS headers, IndexNow — AI-crawler optimized
- **MIT licensed** (code), CC-BY 4.0 (content)

## Quick Facts

| Metric | Value |
|--------|-------|
| Articles | 876 |
| High confidence (≥0.85) | 104 |
| Avg sources/article | 2.5 |
| DOI-verified sources | ~90 |
| Source verification rate | ~40% |
| Core tests | 19/19 passing |

## Links

- **Website**: [anchorfact.org](https://anchorfact.org)
- **Dashboard**: [anchorfact.org/dashboard.html](https://anchorfact.org/dashboard.html)
- **GitHub**: [github.com/anchorfact/anchorfact](https://github.com/anchorfact/anchorfact)
- **Design doc**: [DESIGN.md](https://github.com/anchorfact/anchorfact/blob/main/DESIGN.md)
