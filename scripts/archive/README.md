# Archive Scripts

These scripts were used during the AnchorFact quality improvement journey (Phases 1-7) and are **no longer needed** for normal operations. They are preserved for historical reference only.

## Phase Scripts (sequential quality improvement, Mar-May 2026)

| Script | Phase | Purpose | Prerequisite | Status |
|--------|-------|---------|-------------|--------|
| `phase2-fix.cjs` | P2 | Bulk inject disputed_statements + institution diversity + source tier upgrades | Content at ~60 avg | Replaced by `audit-*.cjs` |
| `phase3-atomic-facts.cjs` | P3 | Inject atomic_facts from body extraction | Content at ~68 avg | Replaced by `phase3-safe-apply.cjs` |
| `phase3-diag.cjs` | P3 | Diagnostic scanner for Phase 3 planning | - | One-shot diagnostic |
| `phase3-enhance-sources.cjs` | P3 | Add domain-authoritative sources | Content at ~68 avg | Replaced by `audit-boost-d3.cjs` |
| `phase3-handfix.cjs` | P3 | Manual fix for 3 corrupted YAML files | - | One-shot fix |
| `phase3-safe-apply.cjs` | P3 | Safe YAML atomic_facts + source injection | Content at ~68 avg | Superseded by Phase 4-5 |
| `phase4-boost-gamedev.cjs` | P4 | Bulk fix 35 game-development D-grade articles | Content at ~73 avg | One-shot domain fix |
| `phase4-crlf-fix.cjs` | P4 | CRLF line ending normalization | - | One-shot format fix |
| `phase4-final-fix.cjs` | P4 | Final game-dev AF injection + AI file rebuild | Content at ~74 avg | One-shot cleanup |
| `phase4-fix-remaining.cjs` | P4 | Rebuild 3 remaining F-grade files | Content at ~74 avg | One-shot cleanup |
| `phase4-rebuild-ai.cjs` | P4 | Full frontmatter rebuild for 6 AI files | score=0 AI files | One-shot rebuild |
| `phase5-final-push.cjs` | P5 | Targeted D3=4 AI files + AF=0 articles | Content at ~75 avg | One-shot push |
| `phase5-safe4.cjs` | P5 | Manual CRLF rebuild for 4 fragile AI files | - | One-shot fix |
| `phase6-safe.cjs` | P6 | Source tier boost + AF injection for 11 D-grade | Content at ~76 avg | One-shot cleanup |
| `phase7-rebuild.cjs` | P7 | YAML format normalization for 8 D-grade | Content at ~76 avg | One-shot format fix |

## Utility Scripts (single-purpose, now obsolete)

| Script | Purpose | Reason Obsolete |
|--------|---------|-----------------|
| `add-inst-diversity.cjs` | Add varied institution names per source | Superseded by `audit-boost-d3.cjs` |
| `clean-bogus-sources.cjs` | Remove bogus sources from batch generation | Bogus sources already cleaned |
| `clean-cross-domain.cjs` | Remove cross-domain RAG paper pollution | Pollution already removed |
| `fix-all-yaml.cjs` | Parse-modify-serialize YAML pipeline | Superseded by `lib/yaml-utils.cjs` |
| `fix-yaml-final.cjs` | YAML format fixer (early version) | Superseded by `lib/yaml-utils.cjs` |

## Generation Scripts (content batch-generation, archive/)

These were used during initial content generation and are in the separate `archive/archive/` subfolder:

| Script | Purpose |
|--------|---------|
| `gen-mega.cjs` ~ `gen-mega9.cjs` | Batch content generators (9 variants) |
| `enhance-gold.cjs` | Golden seed content enhancer |
| `fix-undefined.cjs`, `fix-undefined2.cjs` | Undefined value fixers |
| `generate.cjs`, `generate-all.cjs`, `generate-batch2.cjs` | Various generation scripts |

## Important

- **Do NOT run** any of these scripts against current content — they were designed for specific historical states and will likely corrupt data if re-executed
- The safe, reusable equivalents live in `scripts/lib/` (yaml-utils.cjs, utils.cjs, tier-config.cjs) and `scripts/audit-*.cjs`
- For current quality operations use: `quality-score.cjs`, `validate-content.cjs`, `audit-inject-ai-models.cjs`, `audit-fix-urls.cjs`
