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

The canonical production project should also set:

```txt
ANCHORFACT_OFFICIAL_BUILD=true
ANCHORFACT_CANONICAL_SITE=https://anchorfact.org
ANCHORFACT_SOURCE_REPOSITORY=https://github.com/anchorfact/anchorfact
```

Forks should set these values to their own site and repository, or leave `ANCHORFACT_OFFICIAL_BUILD` unset.

Optional provenance signing uses an Ed25519 private key supplied only through deployment secrets:

```txt
ANCHORFACT_PROVENANCE_PRIVATE_KEY_PEM=<secret PEM value>
```

Do not commit signing private keys. When this secret is configured, the build publishes `/provenance.sig`; without it, `/provenance.json` is marked unsigned.

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
EXPECTED_PUBLIC_ARTICLES=555 EXPECTED_DRAFT_ARTICLES=445 EXPECTED_CLAIMS=1685 npm run smoke:prod
npm run verify:provenance
npm run verify:provenance:signed
```

The smoke test checks the homepage, `/agent.json`, `/openapi.json`, `/manifest.json`, `/llms.txt`, `/claims.json`, `/topics.json`, `/examples.json`, `/graph.json`, `/evals.json`, `/mcp.json`, `/api/evidence`, `/api/resolve`, `/api/resolve-batch`, `/api/search`, `/api/article`, `/api/claim`, `/api/cite`, `/api/source`, `/search-index.json`, `/sources.json`, `/provenance.json`, and `/drafts.html` against the live `https://anchorfact.org` deployment. Omit the expected-count environment variables when checking a future snapshot with different counts.

The provenance verifier fetches `/provenance.json`, recomputes SHA-256 checksums for the core AI entrypoints, checks public/draft/claim counts, confirms official build identity, and verifies the source commit against GitHub.

The stricter signed check uses the pinned public key in `keys/provenance.pub.pem`:

```bash
npm run verify:provenance:signed
```

## Production Integrity Monitor

The scheduled `Production Integrity` workflow runs daily and can also be started manually from GitHub Actions. It is read-only: it runs production smoke, requires signed trusted provenance, confirms artifact hashes and counts, and uploads a short integrity report artifact.

For the same local read-only check, run:

```bash
npm run production:integrity
```

## Content Model

Content lives in `content/` as Markdown with YAML frontmatter.

Optional frontmatter fields:

- `slug`: explicit canonical output path.
- `status`: `draft` or `published`. Omit this for automatic quality-based classification.
- `confidence`: `low`, `medium`, or `high`. This is treated as an editorial upper bound on computed confidence.

Atomic facts should include:

- `id`
- `statement`
- one of `source_ref`, `source_url`, or `source_doi`

Only public articles contribute publishable facts to `/claims.json`.

## Build Outputs

| Output | Purpose |
| --- | --- |
| `/agent.json` | AI agent discovery profile with endpoint contracts, citation policy, and recommended retrieval workflow. |
| `/.well-known/anchorfact.json` | Stable well-known alias for `/agent.json`. |
| `/openapi.json` | OpenAPI 3.1 description of the static read-only machine contract. |
| `/llms.txt` | Public verified index for LLM crawlers. |
| `/manifest.json` | Full public/draft index with quality reasons and verification metadata. |
| `/claims.json` | Public verified atomic claims with evidence links. |
| `/topics.json` | Compact public topic coverage map with article, claim, and source counts. |
| `/examples.json` | Executable AI usage examples for dynamic API calls and signed static fallback workflows. |
| `/graph.json` | Signed public graph of topic, article, claim, and source relationships. |
| `/evals.json` | Executable golden integration checks for AI consumers and production smoke. |
| `/mcp.json` | Signed local MCP installation manifest and tool metadata. |
| `/api/evidence?q=...` | Read-only Cloudflare Pages Function for one-call public evidence packs with search hits, article summaries, claims, sources, and citation exports. Add `format=markdown` for answer-ready text context. |
| `/api/resolve?ref=...` | Read-only Cloudflare Pages Function for resolving a public claim id, article slug, source id, or source URL to its matching public API payload. |
| `/api/resolve-batch?ref=...&ref=...` | Read-only Cloudflare Pages Function for resolving up to 20 mixed public references in one call. Add `format=markdown` for compact text output. |
| `/api/search?q=...` | Read-only Cloudflare Pages Function for lightweight public record lookup. |
| `/api/article?slug=...` | Read-only Cloudflare Pages Function for public article evidence bundles with claims and sources. |
| `/api/claim?id=...` | Read-only Cloudflare Pages Function for dereferencing one public atomic claim. |
| `/api/cite?id=...` | Read-only Cloudflare Pages Function for citation-ready JSON or Markdown for one public atomic claim. Add `format=markdown` for direct answer text. |
| `/api/source?id=...` | Read-only Cloudflare Pages Function for dereferencing one public source and its mapped claims. |
| `/search-index.json` | Compact public retrieval index with keywords, claim ids, source coverage, and article routes. |
| `/sources.json` | Deduplicated public source index with source tier, type, article reuse, and claim reuse. |
| `/provenance.json` | Build identity, schema version, content counts, and artifact checksums. |
| `/provenance.sig` | Optional detached Ed25519 signature for `/provenance.json`, emitted only when a signing key is configured. |
| `/drafts.html` | Draft review index, marked `noindex`. |
| `/{slug}/index.json` | JSON-LD article record with confidence and verification layer. |
| `/{slug}/facts.json` | Per-article atomic facts, when present. |

`dist/` is generated output and should not be committed. The published site exposes build provenance so consumers can distinguish the canonical `anchorfact.org` build from forks or stale mirrors.

Consumers can independently verify the live canonical build with:

```bash
npm run verify:provenance
npm run verify:provenance:signed
```

The pinned production provenance public key lives at `keys/provenance.pub.pem`; its SHA-256 fingerprint is `eb2ff7aa5be8441bba29b6e35874ac06b04d944caf0b22be72933d8383bc4968`.

Forks can run the same verifier with `--allow-unofficial --skip-commit` while they establish their own source repository and release identity. Signed forks should use their own signing keys and publish their own public key.

## MCP and Local API

The Python MCP server and optional HTTP wrapper are backed by `dist/manifest.json`.
They index public articles only and resolve articles by canonical slug, canonical URL, or JSON-LD `@id`.
The signed `/mcp.json` artifact publishes the local stdio config snippet, HTTP wrapper metadata, and tool schemas for MCP-capable hosts.
The local MCP tools cover public article search, article retrieval, reference resolution, claim citation export, and category counts.

```bash
python src/mcp_server.py
python src/mcp_http.py
```

Search results use canonical slugs as `id` values and include `canonical_url`, `jsonld_id`, Markdown URL, and JSON-LD URL fields.
Reference resolution mirrors `/api/resolve`; citation results use the same claim-level contract as `/api/cite`.

## Trust Rules

Confidence is computed from source tier, source count, verification coverage, freshness, and decay factors. Source verification is performed by `src/verify-sources.js` through DOI, arXiv, and URL checks. The quality model in `src/lib/article-quality.js` decides whether an article is public or draft.

The quality gate fails when:

- two articles resolve to the same canonical slug
- `status: published` is set but the article is not public eligible
- estimated confidence is ever emitted as `high`

Ordinary draft content is allowed to remain in the repository.

Public hygiene checks are shared by the compiler, quality gate, and audit script through `src/lib/content-hygiene.js`. They flag encoding damage, broken atomic facts, generic homepage sources, weak claim evidence, and placeholder text. `low_verified_coverage` remains an audit marker until a larger review sample justifies making it fatal.

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
| `npm run verify:provenance` | Verifies live provenance identity, artifact checksums, counts, source commit, and optional signature. |
| `npm run verify:provenance:signed` | Verifies live provenance with the pinned trusted public key. |
| `npm run production:integrity` | Runs production smoke plus trusted signed provenance verification and emits an integrity report. |
| `npm run audit-public-sample` | Regenerates the 20-article public content audit report. |
| `npm run audit-public-full` | Fails if any public article has an actionable audit recommendation. |
| `npm run repo:hygiene` | Checks for stale root snapshots, mojibake, old launch metrics, and tracked generated files. |

Only the scripts above should be treated as production workflow entrypoints. Historical batch-generation and enrichment scripts live in `scripts/legacy/` for reference only; do not run them against `content/` without a separate review branch.

## License

Content is CC-BY 4.0. Code is MIT. See `NOTICE.md` for attribution and official-build identity guidance.
