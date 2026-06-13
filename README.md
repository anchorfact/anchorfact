# AnchorFact

> Machine-readable verified claims for LLM citations.

AnchorFact is an open source knowledge registry for AI systems. Its core unit is not a long article, but a verifiable factual claim connected to traceable sources. Articles are generated as Markdown, JSON-LD, Turtle, and plain text; legacy `index.html` paths are JSON-LD aliases, not human pages. Only entries with real source verification data are promoted into public AI entrypoints.

## Current Direction

AnchorFact is moving from a scale-first knowledge base to a trust-first verified claim registry.

| Area | Policy |
| --- | --- |
| Public AI entrypoints | Only verified, non-placeholder articles appear in `llms.txt`, `sitemap.xml`, and machine discovery artifacts. |
| Draft content | Drafts are retained and compiled, but excluded from public AI entrypoints; noindex status is published through machine headers and status artifacts. |
| Confidence | Estimated confidence can never be `high`; public entries must be based on `verified_sources`. |
| Claims | Public atomic facts with evidence are exported to `/claims.json`. |
| AI routing | `/capabilities.json` maps common AI tasks to the smallest trustworthy endpoint, output format, and fallback artifacts. `/coverage.json` tells agents where AnchorFact coverage is strong, partial, or absent. |
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
EXPECTED_PUBLIC_ARTICLES=1328 EXPECTED_DRAFT_ARTICLES=300 EXPECTED_CLAIMS=4224 npm run smoke:prod
npm run evals:prod
npm run verify:provenance
npm run verify:provenance:signed
```

The smoke test checks the root `/` machine JSON alias, `/index.json`, `/api-access/`, `/robots.txt`, `/sitemap.xml`, `/agent.json`, `/.well-known/anchorfact.json`, `/openapi.json`, `/artifact-summary.json`, `/artifact-shards.json`, `/api-readiness.json`, `/manifest.json`, `/llms.txt`, `/claims.json`, `/topics.json`, `/capabilities.json`, `/content-health.json`, `/coverage.json`, `/examples.json`, `/graph.json`, `/evals.json`, `/mcp.json`, `/api`, `/api/plan`, `/api/evidence`, `/api/context`, `/api/resolve`, `/api/resolve-batch`, `/api/search`, `/api/article`, `/api/claim`, `/api/cite`, `/api/source`, `/search-index.json`, `/sources.json`, `/provenance.json`, `/provenance.sig`, `/drafts.html`, and `/dashboard.html` against the live `https://anchorfact.org` deployment. Omit the expected-count environment variables when checking a future snapshot with different counts.

The provenance verifier fetches `/provenance.json`, recomputes SHA-256 checksums for the core AI entrypoints, checks public/draft/claim counts, confirms official build identity, and verifies the source commit against GitHub.

The AI eval runner fetches `/evals.json` from production and executes the listed golden checks against live JSON, Markdown, and MCP manifest surfaces. It is intended to catch contract drift that a basic endpoint smoke test would not see.

The local usefulness benchmark uses the built `dist/` artifacts to score whether representative AI queries return answer-ready context, citation-ready claims, enough source depth, product/API guidance for AnchorFact usage questions, and explicit external-source fallback for unsupported or time-sensitive requests:

```bash
npm run build
npm run benchmark:ai
```

Treat this as a direction-setting metric. A passing benchmark means the current AI entrypoints are usable and know when not to answer; improvement candidates show which existing public topics or routing policies should be strengthened before broad content expansion.

The local API performance budget uses the same built artifacts to guard the Cloudflare Pages Function hot paths that serve AI agents:

```bash
npm run build
npm run api:perf
```

It measures representative `/api/plan`, `/api/evidence`, `/api/context`, and `/api/resolve-batch` payload assembly and fails if median or p95 timings exceed the checked-in budgets.

The stricter signed check uses the pinned public key in `keys/provenance.pub.pem`:

```bash
npm run verify:provenance:signed
```

## Production Integrity Monitor

The scheduled `Production Integrity` workflow runs daily and can also be started manually from GitHub Actions. It is read-only: it runs production smoke, executes AI evals, requires signed trusted provenance, confirms security response headers, artifact hashes and counts, verifies that signed machine artifacts and API routes stay dynamically revalidated at the Cloudflare edge, and uploads a short integrity report artifact. Non-versioned signed artifacts use `max-age=0, must-revalidate`; durable caching should be added only with versioned artifact URLs or deployment-time cache purging.

For the same local read-only check, run:

```bash
npm run production:integrity
```

## Production Usage Signals

`npm run usage:cloudflare` reads Cloudflare GraphQL analytics and emits a short report that separates product API usage, signed machine artifact reads, AI crawler discovery, synthetic monitor traffic, and security probe noise. It is read-only and requires a local `CLOUDFLARE_API_TOKEN` with `Zone:Read` and `Analytics:Read`; do not commit tokens or generated reports unless a report is intentionally being published for review.

The scheduled `AI Adoption Scorecard` workflow runs daily and can also be started manually from GitHub Actions. It uploads a 1430-minute adoption artifact focused on discovery-to-primary-API adoption, identified AI agents, bot route 5xx/522 failures, top API/machine paths, and scanner noise. Low adoption volume is a product signal, not a CI failure; the workflow fails only on a short-window reliability alert, such as current bot discovery paths returning 5xx/522 or all observed primary API status samples failing.

For the same local read-only scorecard, run:

```bash
npm run usage:adoption
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
| `/` | Root machine JSON alias serving the same compact directory payload as `/index.json`. |
| `/robots.txt` | Public crawler discovery file advertising sitemap, LLM index, agent profile, OpenAPI, MCP, and provenance entrypoints. |
| `/sitemap.xml` | Public-only sitemap for AI and search crawlers; draft routes and directory-style article pages are excluded. |
| `/index.json` | Compact root machine directory with preferred API entrypoints, trust policy, current readiness summary, artifact discovery, and signed provenance pointer. |
| `/agent.json` | AI agent discovery profile with endpoint contracts, citation policy, quick-start answer path, current readiness blocker IDs, and recommended retrieval workflow. |
| `/.well-known/anchorfact.json` | Stable well-known alias for `/agent.json`. |
| `/openapi.json` | OpenAPI 3.1 description of the static read-only machine contract. |
| `/artifact-summary.json` | Signed machine artifact catalog with sizes, budgets, provenance, recommended default calls, and shard registry links. |
| `/artifact-shards.json` | Signed registry of versioned shards for large static artifacts. |
| `/api-readiness.json` | Report-only readiness artifact with subscription gates, core corpus coverage, API citation scorecard, and fallback guardrails. |
| `/llms.txt` | Public verified index for LLM crawlers. |
| `/manifest.json` | Full public/draft index with quality reasons and verification metadata. |
| `/claims.json` | Public verified atomic claims with evidence links. |
| `/topics.json` | Compact public topic coverage map with article, claim, and source counts. |
| `/capabilities.json` | AI task-to-endpoint routing guide with trust requirements, output formats, and fallback artifacts. |
| `/content-health.json` | Signed corpus health summary with public/draft counts, source coverage, claim mapping, draft repair candidates, and trust boundaries. |
| `/coverage.json` | AI coverage and limits guide with topic, confidence, source tier, verification distributions, and the representative query benchmark. |
| `/examples.json` | Executable AI usage examples for dynamic API calls, local MCP workflows, and signed static fallback workflows. |
| `/graph.json` | Signed public graph of topic, article, claim, and source relationships. |
| `/evals.json` | Executable golden integration checks consumed by `npm run evals:prod` and the production integrity monitor. |
| `/mcp.json` | Signed local MCP installation manifest and tool metadata. |
| `/api` | Compact live API discovery endpoint for agents that need the smallest endpoint index before fetching OpenAPI. |
| `/api-access/` | Machine-readable free API access policy with recommended call order, limits, and provenance verification steps. |
| `/api/plan?q=...` | Read-only Cloudflare Pages Function that tells AI agents whether AnchorFact coverage is plausible, which endpoint to call next, or when to fall back to external sources. |
| `/api/evidence?q=...` | Read-only Cloudflare Pages Function for one-call public evidence packs with search hits, article summaries, claims, sources, and citation exports. Add `format=markdown` for answer-ready text context. |
| `/api/context?q=...` | Read-only Cloudflare Pages Function for one-call prompt context with `answer_policy`, `citation_ready_claims`, planning status, fallback guidance, content health summary, evidence packs, and citation guardrails. Add `format=markdown` for prompt-ready text. |
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
| `/drafts.html` | Noindex machine-readable draft status index. |
| `/dashboard.html` | Noindex machine-readable build dashboard. |
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

## API Access

AnchorFact's public API is free and read-only today. It does not require an API key, login, payment, or subscription.

Recommended order for AI integrations:

```bash
curl "https://anchorfact.org/api/context?q=gaussian%20splatting&limit=3&format=markdown"
curl "https://anchorfact.org/api/evidence?q=RLHF&limit=3&format=markdown"
curl "https://anchorfact.org/api/cite?id=f1&format=markdown"
curl "https://anchorfact.org/provenance.json"
```

Use `/api/context` first for answer assembly, `/api/evidence` second for raw source-mapped evidence packs, and `/api/cite` when dereferencing a specific claim. Use `/api/plan` only when coverage is uncertain. Paid beta work is intentionally deferred until the readiness gates are met: 14 days of clean production integrity and audits, at least 90% core query citation readiness, AI primary/discovery ratio at or above 0.2 for 7 days, and real external design-partner demand.

Run the local report-only readiness scorecard with:

```bash
npm run build
npm run api:readiness
```

The public `/api-readiness.json` artifact includes `readiness_blockers`, which lists the remaining automated gate IDs and manual gate IDs that prevent paid-beta readiness while the report remains non-failing and report-only.

After `npm run build`, `npm run readiness:history` automatically reads `dist/api-readiness.json` and `dist/content-health.json` when no current report paths are supplied. It also reads `reports/readiness-history` when that directory already exists, so local window reports include cached history and the latest build signals without writing a new history snapshot.

The scheduled `Readiness Scorecard` workflow combines the daily production integrity snapshot, AI adoption scorecard, local API readiness report, and content health snapshot into one uploaded artifact. It also keeps a cached local history of daily readiness snapshots so the automated gates can be evaluated as windows instead of one-day checks:

```bash
npm run readiness:history -- --history-dir reports/readiness-history --api-readiness-json reports/api-readiness.json --content-health-json reports/content-health.json --save-current --write reports/readiness-window.md --write-json reports/readiness-window.json
```

When real design-partner evidence exists, pass a local reviewed summary into the API readiness report:

```bash
npm run api:readiness -- --design-partners-json reports/design-partners.json
```

The design-partner JSON is a manual validation input, not crawler analytics. The public `/api-readiness.json` artifact publishes only aggregate counts and status, such as external design-partner count and paid-intent signal count; do not publish raw partner names, private notes, or commercial terms.

When API readiness is fed into `npm run readiness:history`, the readiness window report carries those aggregate design-partner counts under `Manual Gates` so paid-beta proof stays visible without treating it as an automated 7-day or 14-day window. The report's `paid_beta_ready` summary is true only when both the automated windows and manual design-partner gate are met, and `readiness_blockers` lists the remaining automated and manual gate IDs.

When content health is excellent and API readiness is clean, do not repair or promote more draft content by default. Content work should resume only when public audit findings, API readiness failures, eval drift, query-routing misses, or production usage signals identify a concrete gap.

## MCP and Local API

The Python MCP server and optional HTTP wrapper are backed by `dist/manifest.json`.
They index public articles only and resolve articles by canonical slug, canonical URL, or JSON-LD `@id`.
The signed `/mcp.json` artifact publishes the local stdio config snippet, HTTP wrapper metadata, and tool schemas for MCP-capable hosts.
The local MCP tools cover query planning, one-call prompt context with corpus health, public article search, article retrieval, single and batch reference resolution, claim citation export, and category counts.

```bash
npm run build
python -m pip install -r src/requirements-mcp.txt
npm run mcp:check
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
| `npm run evals:prod` | Executes live `/evals.json` checks against production AI endpoints and MCP metadata. |
| `npm run benchmark:ai` | Scores built local AI query usefulness across representative context and citation cases. |
| `npm run api:perf` | Enforces a local performance budget for representative AI API payload assembly. |
| `npm run mcp:check` | Verifies the built local MCP data contract, tool catalog, Python dependencies, planner, search, resolver, and citation helpers. |
| `npm run verify:provenance` | Verifies live provenance identity, artifact checksums, counts, source commit, and optional signature. |
| `npm run verify:provenance:signed` | Verifies live provenance with the pinned trusted public key. |
| `npm run production:integrity` | Runs production smoke, AI evals, trusted signed provenance verification, and edge cache-policy checks, then emits an integrity report. |
| `npm run usage:cloudflare` | Reads Cloudflare analytics with a local token and reports API, artifact, AI crawler, monitor, and security-noise usage signals. |
| `npm run usage:adoption` | Reads Cloudflare analytics with a local token and reports the AI adoption scorecard used by the scheduled workflow. |
| `npm run audit-public-sample` | Regenerates the 20-article public content audit report. |
| `npm run audit-public-full` | Fails if any public article has an actionable audit recommendation. |
| `npm run repo:hygiene` | Checks for stale root snapshots, mojibake, old launch metrics, and tracked generated files. |

Only the scripts above should be treated as production workflow entrypoints. Historical batch-generation and enrichment scripts live in `scripts/legacy/` for reference only; do not run them against `content/` without a separate review branch.

## License

Content is CC-BY 4.0. Code is MIT. See `NOTICE.md` for attribution and official-build identity guidance.
