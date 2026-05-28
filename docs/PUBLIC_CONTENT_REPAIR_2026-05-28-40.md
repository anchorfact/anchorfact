# Public Content Repair - 2026-05-28 Pass 40

## Scope

Repaired the latest sampled public evidence targets from `docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md`:

- `computer-science/content-security-policy-csp`
- `computer-science/css-grid`
- `computer-science/device-orientation-api`
- `computer-science/github-actions`
- `computer-science/laravel`
- `computer-science/mongodb`
- `computer-science/nomad-hashicorp`
- `computer-science/page-visibility-api`
- `computer-science/pointer-lock-api`
- `computer-science/ruby-language`

## Changes

- Replaced broad, generic, duplicated, or drift-prone evidence with three precise primary sources per article.
- Reduced each article to three source-mapped atomic facts with `medium` fact confidence.
- Cleared generic dispute statements and secondary-source clutter for this bounded public sample.
- Rewrote affected summaries where old text contained unsupported claims, stale framing, or weak source mapping.
- Updated targeted manual-review metadata in `verification-report.json` without running local `verify-full`.

## Verification Metadata

- Manual-review metadata note: "Fortieth targeted public evidence repair pass; local verify-full was not run for this bounded manual-review update."
- Local `verify-full` was not run.
- `dist/` is regenerated only for local build and audit checks and must not be committed.
