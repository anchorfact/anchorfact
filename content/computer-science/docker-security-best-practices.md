---
id:"kb-2026-00124"
title:"Docker Security Best Practices"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"Docker Inc."
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Docker containers share the host kernel, making security critical. Best practices: run as non-root user, use minimal base images (distroless, alpine), scan images for vulnerabilities, limit capabilities, use read-only root filesystems, enable seccomp/AppArmor profiles.

## Core Explanation

`USER 1000` in Dockerfile (never run as root). `docker scan` or Trivy for vulnerability scanning. `--read-only` flag makes rootfs immutable. `--cap-drop=ALL --cap-add=NET_BIND_SERVICE` limits Linux capabilities. Docker Bench Security checks against CIS Benchmark. Podman (daemonless, rootless by default) and gVisor (user-space kernel) provide stronger isolation.

## Further Reading

- [undefined](undefined)
