# AnchorFact Launch Readiness - 2026-05-27

## Status

Production is live on the apex domain.

- Latest confirmed production commit: `bd8af3e6`.
- `anchorfact.org` is reachable and serving the trusted build.
- `www.anchorfact.org` is not production-ready yet. Public smoke returned Cloudflare `522`, so treat `www` as pending until the Pages custom domain and DNS route are Active.
- The `6f69cc8b` run with `No deployment available` is expected because that commit only updated `verification-report.json` with `[skip ci]`. The later `bd8af3e6` deployment includes that report.

## Production Smoke Test

Run command:

```bash
EXPECTED_PUBLIC_ARTICLES=573 EXPECTED_DRAFT_ARTICLES=427 EXPECTED_CLAIMS=1715 npm run smoke:prod
```

Manual network check from the local workstation:

| URL | HTTP | Final URL | Notes |
| --- | ---: | --- | --- |
| `https://anchorfact.org/` | 200 | `https://anchorfact.org/` | Homepage live |
| `https://anchorfact.org/manifest.json` | 200 | `https://anchorfact.org/manifest.json` | Valid JSON |
| `https://anchorfact.org/llms.txt` | 200 | `https://anchorfact.org/llms.txt` | Non-empty public index |
| `https://anchorfact.org/claims.json` | 200 | `https://anchorfact.org/claims.json` | Valid JSON |
| `https://anchorfact.org/drafts.html` | 200 | `https://anchorfact.org/drafts` | Redirects to extensionless route |
| `https://www.anchorfact.org/` | 522 | `https://www.anchorfact.org/` | Optional domain pending |

Production counts:

| Metric | Expected | Observed |
| --- | ---: | ---: |
| Public articles | 573 | 573 |
| Draft articles | 427 | 427 |
| Public claims | 1715 | 1715 |
| `llms.txt` size | non-empty | 244870 chars |
| Draft index `noindex` | yes | yes |

## Deployment Split

Current split is correct and should stay in place:

- Cloudflare Pages runs only `npm run pages:build`.
- `pages:build` runs `quality` plus `build`; it does not perform full source verification.
- Full verification remains in GitHub Actions under `Verification Snapshot`, weekly and manual.
- Legacy `Quality Pipeline` is now manual-only and uses Node 24 actions to avoid the Node 20 runtime warning.

## Public Sample Audit

Sample method: deterministic round-robin across first-level URL groups from the 573 public entries.

Automated pre-checks:

- Article is public and indexable, without `noindex`.
- JSON-LD headline matches manifest title.
- Article has citations and at least one verified source.
- Public claims count is exported through `claims.json`.
- `review` means the article is public but has `partial_source_verification`, so it should receive human source-content review before tightening rules.

| # | Domain | Article | Confidence | Sources | Claims | Automated result |
| --- | --- | --- | --- | --- | ---: | --- |
| 1 | ai | [3D Generation and Gaussian Splatting: From NeRF to Real-Time Rendering](https://anchorfact.org/ai/3d-generation-gaussian-splatting/) | medium/verified_sources | 2/2 | 3 | pass |
| 2 | arts | [Aesthetics](https://anchorfact.org/arts/aesthetics/) | low/verified_sources | 2/6 | 3 | review |
| 3 | business | [A/B Testing](https://anchorfact.org/business/a-b-testing/) | low/verified_sources | 1/1 | 4 | pass |
| 4 | computer-science | [Amazon Web Services (AWS)](https://anchorfact.org/computer-science/amazon-web-services-aws/) | high/verified_sources | 3/5 | 2 | review |
| 5 | game-development | [游戏可访问性设计指南](https://anchorfact.org/game-development/accessibility-guide/) | low/verified_sources | 1/1 | 5 | pass |
| 6 | geography | [African Geography](https://anchorfact.org/geography/african-geography/) | low/verified_sources | 1/1 | 5 | pass |
| 7 | health | [Addiction Science](https://anchorfact.org/health/addiction-science/) | low/verified_sources | 1/1 | 4 | pass |
| 8 | history | [Age of Exploration](https://anchorfact.org/history/age-of-exploration/) | low/verified_sources | 1/7 | 5 | review |
| 9 | science | [Astronomy and Cosmology: From Solar System to the Universe](https://anchorfact.org/science/astronomy-and-cosmology/) | low/verified_sources | 1/4 | 3 | review |
| 10 | self-improvement | [Active Listening](https://anchorfact.org/self-improvement/active-listening/) | high/verified_sources | 1/9 | 2 | review |
| 11 | sports | [Basketball Fundamentals](https://anchorfact.org/sports/basketball-fundamentals/) | low/verified_sources | 1/1 | 3 | pass |
| 12 | ai | [3D Human Modeling: Parametric Body Models, Mesh Recovery, and Digital Avatars](https://anchorfact.org/ai/3d-human-modeling/) | medium/verified_sources | 2/2 | 2 | pass |
| 13 | arts | [Ancient Greek Literature](https://anchorfact.org/arts/ancient-greek-literature/) | low/verified_sources | 2/4 | 3 | review |
| 14 | business | [Amazon FBA (Fulfillment by Amazon)](https://anchorfact.org/business/amazon-fba-fulfillment-by-amazon/) | low/verified_sources | 1/1 | 4 | pass |
| 15 | computer-science | [Angular](https://anchorfact.org/computer-science/angular/) | low/verified_sources | 1/1 | 5 | pass |
| 16 | game-development | [AI Agent 游戏开发工具](https://anchorfact.org/game-development/agent-tools/) | low/verified_sources | 1/1 | 5 | pass |
| 17 | geography | [Asian Geography](https://anchorfact.org/geography/asian-geography/) | low/verified_sources | 1/2 | 5 | review |
| 18 | health | [Chronic Disease Prevention Strategies](https://anchorfact.org/health/chronic-disease-prevention/) | medium/verified_sources | 2/4 | 3 | review |
| 19 | history | [American Revolution](https://anchorfact.org/history/american-revolution/) | low/verified_sources | 3/8 | 3 | review |
| 20 | science | [Big Bang Theory](https://anchorfact.org/science/big-bang-theory/) | high/verified_sources | 3/7 | 3 | review |

## Findings

- The launch is good enough to keep public. Main production routes are healthy and the public/draft/claim counts match the trusted verification snapshot.
- `www.anchorfact.org` should either be added as a Pages custom domain and marked Active, or intentionally redirected/left unused. Do not promote `www` until it stops returning `522`.
- The next content-quality pass should focus on high-confidence entries with partial coverage. Current manifest has 58 public high-confidence articles with partial source verification, including 19 high-confidence articles below 50% verified source coverage.
- Do not tighten public rules globally yet. First review the 20 sampled entries for source-title match, claim evidence match, and title/summary accuracy, then decide whether to require a higher verified source coverage threshold for `high` confidence.
