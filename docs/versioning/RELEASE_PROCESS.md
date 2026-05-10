# Documentation Release Process

**Version:** 1.0.0  
**Status:** Active  
**Last Updated:** 2026-04-28

---

## Overview

This document defines the step-by-step process for releasing a new version of VLN documentation. All documentation releases are tied to platform version releases and follow the same branching model.

---

## Release Checklist

### Phase 1 — Pre-Release (Feature Branch)

```
[ ] All new documentation written in docs-site/src/content/docs/
[ ] All pages include required frontmatter (title, description, sidebar.order)
[ ] Internal links verified (no broken /peralta/... or /getting-started/... links)
[ ] pnpm build passes from docs-site/ directory
[ ] Spelling and grammar checked
[ ] Sensitive information removed (no API keys, secrets, client PII)
```

### Phase 2 — PR Review (integration/vln)

```
[ ] PR title follows convention: docs(vln): describe the change
[ ] PR base branch is integration/vln
[ ] CI passes (lint, build, validate)
[ ] At least one review from team member
[ ] VERSION_MANIFEST.json updated
[ ] CHANGELOG.md entry added under [Unreleased]
```

### Phase 3 — Release (main)

```
[ ] Merge integration/vln → main via PR
[ ] Promote [Unreleased] to [x.y.z] with today's date in CHANGELOG.md
[ ] Create git tag: git tag -a v0.12.0 -m "docs: release v0.12.0"
[ ] Push tag: git push origin v0.12.0
[ ] Verify Vercel deployment at docs.vln.gg
[ ] Verify sidebar navigation renders correctly
[ ] Verify all new pages load without 404
```

---

## Version Bump Commands

Use the docs versioning script to automate manifest updates:

```bash
# Bump minor version (new features/sections)
bash scripts/version-docs.sh bump minor

# Bump patch version (fixes/corrections)
bash scripts/version-docs.sh bump patch

# Validate all frontmatter
bash scripts/version-docs.sh validate

# Print current version
bash scripts/version-docs.sh status
```

---

## Branching Model

```
main ──────────────────────────────────────── [stable docs]
         ↑
integration/vln ───────────────────────────── [preview docs]
         ↑
feature/your-feature ──────────────────────── [draft docs]
```

1. All doc work happens on `feature/*` branches
2. Merge feature → `integration/vln` for preview
3. Merge `integration/vln` → `main` for production release

---

## Rollback Procedure

If a documentation release introduces a regression:

1. Revert the merge commit on `main`:
   ```bash
   git revert -m 1 <merge-commit-sha>
   git push origin main
   ```
2. Vercel will automatically re-deploy the reverted state
3. Open a new PR with the fix on `integration/vln`
4. Do **not** amend history on `main`

---

## Hotfix Process

For urgent corrections to production docs:

```bash
# Branch from main
git checkout main
git pull
git checkout -b hotfix/fix-broken-link

# Make the fix
# ...

# PR directly to main with label: hotfix
# Merge after single review
# Backport to integration/vln immediately after
```

---

## Deployment

| Branch | Deployment Target | URL |
|--------|-------------------|-----|
| `main` | Production | https://docs.vln.gg |
| `integration/vln` | Staging | https://docs-preview.vln.gg |
| `feature/*` | PR Preview | Vercel ephemeral URL |

---

## Related Documents

- [VERSIONING_SPEC.md](./VERSIONING_SPEC.md) — The full versioning specification
- [CHANGELOG_FORMAT.md](./CHANGELOG_FORMAT.md) — How to write changelog entries
- [VERSION_MANIFEST.json](./VERSION_MANIFEST.json) — Authoritative version registry
