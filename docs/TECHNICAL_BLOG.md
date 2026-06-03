# How We Built an AI-Native Knowledge Base with Verifiable Trust

> AnchorFact: 1494 articles, 1194 public entries, 3742 public claims, and a public trust model for machine-readable citations.

---

AI search is eating the web. ChatGPT, Perplexity, and Claude now answer questions by citing sources — but those sources were never designed for machine consumption. Wikipedia's editorial model is opaque. Blog posts lack structured metadata. AI-generated content farms have no source traceability at all.

We built **AnchorFact** to solve one specific problem: *How do you make a knowledge base that an LLM can trust, without requiring the LLM to trust you?*

The answer: **make trust machine-verifiable.**

---

## The Trust Problem

When a human reads a Wikipedia article, they can evaluate its quality through social signals: edit history, talk page discussions, citation density. An LLM can't do any of that. It sees flat text — and it hallucinates citations constantly.

AnchorFact approaches this differently. Every article in our knowledge base carries a **verification layer** — structured metadata that answers four questions any downstream system can independently check:

1. **Where did this come from?** — Every source is a DOI paper, ISO/IEC standard, RFC, or institutional publication with a machine-verifiable identifier.
2. **Is the source real?** — We run CrossRef DOI lookups, arXiv API queries, and HTTP reachability checks. If a source can't be verified, the confidence score reflects it.
3. **How fresh is this?** — Source year affects confidence. A 2024 paper carries more weight than a 1958 classic (though the classic isn't penalized — just weighted appropriately).
4. **Is anything disputed?** — If a topic has known gaps or disputed statements, the confidence score takes a deterministic penalty.

---

## The Confidence Formula

Here's the formula we settled on. It's public, deterministic, and any downstream system can replicate it:

```
confidence = source_tier × 0.35
           + source_count × 0.20
           + source_verified × 0.25
           + freshness × 0.10
           - decay × 0.10
```

**Source tier**: S (DOI-verified paper, standard, RFC) = 1.0, A (academic) = 0.9, B (expert blog) = 0.6, C (news, Wikipedia) = 0.3.  
**Source count**: 3+ independent sources = 1.0, 2 = 0.8, 1 = 0.5.  
**Source verified**: All sources reachable via DOI/URL = 1.0, proportion for partial.  
**Freshness**: ≤1 year = 1.0, 3yr = 0.9, 5yr = 0.7, 10yr+ = 0.5.  
**Decay**: disputed statements = -0.2, known gaps = -0.1.

Result: >=0.85 = high confidence, >=0.60 = medium, and lower scores remain low confidence. Public eligibility is decided separately by the quality model: an entry needs real source verification, no fatal hygiene problems, and a stable unique route.

This formula isn't perfect — but it's transparent. An LLM citing AnchorFact doesn't need to "trust" us. It can examine the inputs and decide for itself.

---

## The Pipeline

Our content pipeline runs entirely on AI agents:

1. **Topic selection** → Agent analyzes coverage gaps across 11 domains
2. **Source enrichment** → Auto-searches arXiv/CrossRef for matching papers
3. **Verification** → CrossRef API + arXiv API + HTTP HEAD on every source URL
4. **Compilation** → Markdown → JSON-LD (Schema.org) + Turtle (RDF) + Plain Text + HTML
5. **Deployment** → Cloudflare Pages, auto-deploy on git push

The verification step is incremental. It checks file modification times and only re-verifies changed articles. The current verification snapshot covers 1494 articles and averages 2.6 sources per article. Incremental verification remains fast for unchanged files.

---

## Why MCP Matters

We ship a **Model Context Protocol (MCP) Server** — a Python stdio server that Claude Desktop and other MCP-compatible agents can connect to directly. The server is backed by `dist/manifest.json`, indexes public articles only, and uses canonical slugs rather than legacy flat IDs.

The server now exposes nine focused tools:
- `anchorfact_plan_query` — decide whether AnchorFact has plausible coverage and what to call next
- `anchorfact_search` — BM25 public article search with confidence-aware ranking
- `anchorfact_context` — one-call prompt context with answer policy, evidence packs, citation-ready claims, and corpus health
- `anchorfact_content_health` — machine-readable public/draft/source health and repair-queue summary
- `anchorfact_get_article` — retrieve a public article by canonical slug, canonical URL, or JSON-LD `@id`
- `anchorfact_resolve_reference` — resolve one public claim, article, source id, source URL, or canonical reference
- `anchorfact_resolve_references` — resolve a small batch of mixed public references
- `anchorfact_cite_claim` — return citation-ready JSON or Markdown for one public claim
- `anchorfact_list_categories` — list the public knowledge domains and article counts

This means an AI agent can query AnchorFact the same way it queries a file system or a database — through a structured protocol, not web scraping. The recommended path is narrow on purpose: use `/api/context` or `anchorfact_context` when assembling an answer, then resolve or cite individual claims only when needed.

---

## What We Learned

**1. URL-based sources are unreliable.** About 60% of our initial sources failed HTTP verification — links rot faster than you think. DOI and arXiv identifiers are dramatically more stable. This is why the source tier system weights DOIs at S-tier: they're practical, not just prestigious.

**2. AI-generated content labeling matters.** We initially had 201 articles with `generation_method: human_only` that were actually AI-structured. Fixing this to honest `ai_structured` labeling wasn't just ethical — it was essential for trust. If an LLM discovers a labeling discrepancy, it undermines everything.

**3. The formula is the product.** The confidence formula isn't a feature — it's the entire value proposition. Without it, AnchorFact is just another AI-generated content site. With it, every citation carries verifiable provenance.

**4. Incremental is everything.** A pipeline that takes an hour to run is a pipeline nobody runs. Our incremental verification (mtime-based caching) turned a 67-minute full verify into a sub-second no-op for unchanged files.

---

## What's Next

- **Measure real AI usefulness first** — keep the representative benchmark, live evals, and production integrity green before adding surfaces
- **Promote drafts selectively** — repair only topics that improve likely AI query coverage and still pass the full public audit
- **Protect canonical trust** — make signed provenance, artifact hashes, and the official domain the hard-to-copy part of the project

---

## Links

- [anchorfact.org](https://anchorfact.org)
- [github.com/anchorfact/anchorfact](https://github.com/anchorfact/anchorfact)
- [Live Dashboard](https://anchorfact.org/dashboard.html)

*AnchorFact is MIT licensed (code) and CC-BY 4.0 (content). No ads, no tracking, no API keys required.*
