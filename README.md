# AnchorFact

> Machine-readable verified claims for LLM citations.

AnchorFact is an open source knowledge registry for AI systems. Its core unit is not a long article, but a verifiable factual claim connected to traceable sources. Articles are still generated as Markdown, JSON-LD, Turtle, plain text, and HTML, but only entries with real source verification data are promoted into public AI entrypoints.

## Current Direction

AnchorFact is moving from a scale-first knowledge base to a trust-first verified claim registry.

| Area | Policy |
| --- | --- |
| Public AI entrypoints | Only verified, non-placeholder articles appear in `llms.txt`, `sitemap.xml`, and the homepage public list. |
| Draft content | Drafts are retained and compiled, but excluded from AI entrypoints and marked `noindex`. |
| Confidence | Estimated confidence can never be `high`; public entries must be based on `verified_sources`. |
| Claims | Public atomic facts with evidence are exported to `/claims.json`. |
| Routing | Canonical URLs are stable path-derived slugs, with optional `slug` frontmatter override. |

## Quick Start

```bash
npm ci
npm test
npm run verify
npm run quality
npm run build
```

The full pipeline is:

```bash
npm run pipeline
```

This runs source verification, the quality gate, and the compiler.

## Deployment

AnchorFact is deployed as a static Cloudflare Pages site connected to GitHub.

Cloudflare Pages should use:

```txt
Build command: npm run pages:build
Build output directory: dist
Production branch: main
Node.js version: 20 or newer
```

Do not run `npm run verify-full` inside the Cloudflare Pages build. Source verification is intentionally handled by GitHub Actions because it is slower and depends on external DOI, arXiv, and URL checks.

The scheduled `Verification Snapshot` workflow runs weekly and can also be started manually from the GitHub Actions tab. It runs:

```bash
npm ci
npm test
npm run verify-full
npm run quality
npm run build
```

If the generated `verification-report.json` changes, the workflow commits it back to `main`. That commit triggers Cloudflare Pages to rebuild the public site from the latest trusted verification snapshot.

After a production deployment, run:

```bash
EXPECTED_PUBLIC_ARTICLES=573 EXPECTED_DRAFT_ARTICLES=427 EXPECTED_CLAIMS=1715 npm run smoke:prod
```

This checks the homepage, `/manifest.json`, `/llms.txt`, `/claims.json`, and `/drafts.html` against the live `https://anchorfact.org` deployment. Omit the expected-count environment variables when checking a future snapshot with different counts.

## Content Model

Content lives in `content/` as Markdown with YAML frontmatter.

Optional frontmatter fields:

- `slug`: explicit canonical output path.
- `status`: `draft` or `published`. Omit this for automatic quality-based classification.

Atomic facts should include:

- `id`
- `statement`
- one of `source_ref`, `source_url`, or `source_doi`

Only public articles contribute publishable facts to `/claims.json`.

## Build Outputs

| Output | Purpose |
| --- | --- |
| `/llms.txt` | Public verified index for LLM crawlers. |
| `/manifest.json` | Full public/draft index with quality reasons and verification metadata. |
| `/claims.json` | Public verified atomic claims with evidence links. |
| `/drafts.html` | Draft review index, marked `noindex`. |
| `/{slug}/index.json` | JSON-LD article record with confidence and verification layer. |
| `/{slug}/facts.json` | Per-article atomic facts, when present. |

## MCP and Local API

The Python MCP server and optional HTTP wrapper are backed by `dist/manifest.json`.
They index public articles only and resolve articles by canonical slug, canonical URL, or JSON-LD `@id`.

```bash
python src/mcp_server.py
python src/mcp_http.py
```

Search results use canonical slugs as `id` values and include `canonical_url`, `jsonld_id`, Markdown URL, and JSON-LD URL fields.

## Trust Rules

Confidence is computed from source tier, source count, verification coverage, freshness, and decay factors. Source verification is performed by `src/verify-sources.js` through DOI, arXiv, and URL checks. The quality model in `src/lib/article-quality.js` decides whether an article is public or draft.

The quality gate fails when:

- two articles resolve to the same canonical slug
- `status: published` is set but the article is not public eligible
- estimated confidence is ever emitted as `high`

Ordinary draft content is allowed to remain in the repository.

## Project Scripts

| Script | Action |
| --- | --- |
| `npm test` | Runs confidence, article-quality, compiler, and quality-gate tests. |
| `npm run verify` | Incrementally verifies source reachability and writes `verification-report.json`. |
| `npm run verify-full` | Rebuilds `verification-report.json` without using the incremental cache. |
| `npm run quality` | Enforces routing and public eligibility rules. |
| `npm run build` | Compiles content into `dist/`. |
| `npm run pages:build` | Runs quality and build for Cloudflare Pages. |
| `npm run pipeline` | Runs verify, quality, and build. |
| `npm run smoke:prod` | Checks the live production machine-readable endpoints. |

## License

Content is CC-BY 4.0. Code is MIT.
