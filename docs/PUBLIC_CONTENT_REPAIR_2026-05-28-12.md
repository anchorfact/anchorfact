# AnchorFact Public Content Repair - 2026-05-28 Batch 12

## Summary

This repair pass executed the first follow-up action from
`docs/SITE_MODULE_QUALITY_AUDIT_2026-05-28.md`: repair the 12 current
`repair_sources` entries from the public content audit.

Scope remained limited to sampled public evidence. No local `verify-full` run
was performed, and generated `dist/` output is excluded from the commit. The
bounded `verification-report.json` update records targeted manual review for the
repaired primary sources only.

Post-repair local build and audit counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1551
- Source verification rate in snapshot: 56.8%
- Manual-reviewed verification entries: 172

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `computer-science/docker-compose` | Replaced duplicate facts and future/fabricated sources with Docker Compose docs and the Compose Specification. | Keep public |
| `computer-science/express-js` | Replaced generic homepage/future sources with Express hello-world, routing, and middleware documentation. | Keep public |
| `computer-science/fastapi` | Replaced future sources with FastAPI tutorial pages for first steps, path parameters, and request bodies. | Keep public |
| `computer-science/flask` | Replaced future sources with Pallets documentation for quickstart, templates, and application setup. | Keep public |
| `computer-science/helm` | Replaced future sources with Helm documentation for usage, charts, and chart templates. | Keep public |
| `computer-science/julia-language` | Replaced future sources with the Julia numerical-computing paper and Julia documentation for methods and JIT. | Keep public |
| `computer-science/monitoring-and-observability` | Replaced future sources with Google SRE and OpenTelemetry signal documentation. | Keep public |
| `computer-science/progressive-web-apps-pwa` | Replaced future sources with MDN PWA, MDN Service Worker, and W3C Web Application Manifest sources. | Keep public |
| `arts/western-ethics-tradition` | Replaced future/mismatched sources with Aristotle, Kant, and Mill primary texts. | Keep public |
| `business/marketing-fundamentals` | Reworked the entry around source-mapped OpenStax marketing strategy, consumer behavior, and digital channel claims. | Keep public |
| `computer-science/cybersecurity-fundamentals` | Replaced source-title drift with NIST SP 800-12, Spafford's Internet Worm analysis, and NIST SP 800-207. | Keep public |
| `game-development/game-audio-systems` | Removed unsupported middleware market-share claims and mapped facts to MIT Press and NASA audio sources. | Keep public |

## Audit Result

`npm run audit-public-sample` passed after the local build and refreshed the
next risk-weighted sample. The repaired Batch 12 entries no longer appear in the
next `repair_sources` set; the audit now reports 12 new `repair_sources` entries
for a future pass.
