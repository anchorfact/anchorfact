# AnchorFact Notice

AnchorFact is an open source project with separate code and content terms:

- Code is licensed under the MIT License.
- Content is licensed under Creative Commons Attribution 4.0 International (CC-BY-4.0), unless a file states otherwise.

The AnchorFact name, the `anchorfact.org` domain, official build metadata, and project identity labels are used to identify the canonical public service operated from the upstream repository at `https://github.com/anchorfact/anchorfact`.

Forks and redistributed builds may use the open source code and content under their licenses, but should not imply that they are the canonical `anchorfact.org` service or an official AnchorFact build unless they are published by the upstream project. If you publish a fork, keep attribution visible and set build provenance fields to identify your own repository and site.

Public machine-readable outputs include `/manifest.json`, `/claims.json`, and `/provenance.json` so consumers can inspect schema versions, content counts, source repository claims, and artifact checksums. When an Ed25519 signing key is configured for the deployment, `/provenance.sig` provides a detached signature for `/provenance.json`.

The canonical build can be checked with `npm run verify:provenance`, which recomputes published artifact hashes, verifies optional signatures, and verifies the recorded source commit. Forks should publish their own provenance and signing keys instead of copying official-build identity fields.
