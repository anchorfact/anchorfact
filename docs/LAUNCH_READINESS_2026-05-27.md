# AnchorFact Launch Readiness - 2026-05-27

## Status

Production is live on the apex domain.

- `anchorfact.org` is reachable and serving the trusted Cloudflare Pages build.
- Cloudflare Pages should run only `npm run pages:build`.
- Full source verification stays in GitHub Actions under `Verification Snapshot`, weekly and manual.
- Verification-report-only commits with `[skip ci]` may show `No deployment available`; that is expected when a later normal commit deploys the trusted report.
- `www.anchorfact.org` remains optional until its Cloudflare Pages custom domain and DNS route are active.

## Production Smoke Test

Run command:

```bash
EXPECTED_PUBLIC_ARTICLES=643 EXPECTED_DRAFT_ARTICLES=357 EXPECTED_CLAIMS=1984 npm run smoke:prod
```

The smoke test checks:

- `/`
- `/manifest.json`
- `/llms.txt`
- `/claims.json`
- `/drafts.html`
- a representative public article JSON-LD endpoint
- key Cloudflare Pages headers from `_headers`

Current trusted counts:

| Metric | Expected |
| --- | ---: |
| Public articles | 643 |
| Draft articles | 357 |
| Public claims | 1984 |
| Draft index `noindex` | yes |

## Deployment Split

Current split is correct and should stay in place:

- Cloudflare Pages builds from the latest committed verification snapshot.
- `pages:build` runs `quality` plus `build`; it does not perform full source verification.
- Full verification remains in GitHub Actions to avoid slow and network-heavy Pages builds.
- Legacy one-off content scripts are archived under `scripts/legacy/` and are not production workflow entrypoints.

## Next Review Focus

- Keep the full public audit gate at `keep_public` only.
- Use `npm run audit-public-full` for CI gating and `npm run audit-public-sample` for human review.
- Do not tighten public rules globally until sampled source-title and claim-evidence failures justify it.
