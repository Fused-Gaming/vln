# 📚 VLN Unified Documentation System

> **Single source of truth with site-specific adaptations. Zero divergence guaranteed.**

---

## Overview

The VLN Documentation System provides a **unified, single-source documentation platform** that automatically syncs to multiple Starlight sites (`design-site` and `docs-site`) without content divergence.

### Key Features

✅ **Single Source of Truth** — All content lives in `docs/_source/`
✅ **Site-Specific Adaptation** — Different frontmatter, sidebars, and presentation per site
✅ **Zero Divergence** — Automatic sync with validation ensures no content drift
✅ **Automated Sync** — Every commit triggers intelligent content distribution
✅ **Smart Routing** — Adapters define path mapping, audience, and metadata
✅ **Merge Aggregation** — Multi-commit branches compile into cohesive summaries

---

## Architecture

```
docs/
├── _source/                    # ⭐ SINGLE SOURCE (commit here)
│   ├── design/                # Visual system docs
│   │   ├── tokens/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ux-flows/
│   ├── technical/             # Developer documentation
│   │   ├── architecture/
│   │   ├── devops/
│   │   ├── getting-started/
│   │   └── guides/
│   ├── api/                   # API reference
│   │   ├── endpoints/
│   │   ├── webhooks/
│   │   ├── authentication/
│   │   └── errors/
│   ├── infrastructure/        # Infrastructure & DevOps
│   │   ├── database/
│   │   ├── caching/
│   │   ├── storage/
│   │   └── networking/
│   ├── security/              # Security & auditing
│   │   ├── threat-modeling/
│   │   ├── audit-methodology/
│   │   └── vulnerability-scoring/
│   └── research/              # Research & analysis
│       ├── rng-analysis/
│       ├── smart-contracts/
│       └── wallet-flows/
│
├── _adapters/                 # 🎯 SITE-SPECIFIC METADATA
│   ├── design-site.adapter.json
│   └── docs-site.adapter.json
│
└── _sync/                     # 🤖 AUTO-GENERATED (never commit)
    ├── design-site/
    ├── docs-site/
    └── sync-metadata.json
```

---

## How It Works

### 1. Write Content (Source Only)

Create documentation in `docs/_source/` using plain Markdown:

```markdown
# Button Component

The VLN button is a versatile control element.

## States
- Default
- Hover
- Active
- Disabled

## Usage
Use buttons for primary actions...
```

**No frontmatter needed** — the adapter system handles it.

### 2. Adapter Configuration

Adapters define how source content maps to each site. Example from `design-site.adapter.json`:

```json
{
  "routes": {
    "design/components/**/*.md": {
      "path": "components/{basename}",
      "sidebar": "design",
      "section": "Components",
      "frontmatter": {
        "audience": ["designers", "developers"],
        "tags": ["component", "ui"]
      }
    }
  }
}
```

### 3. Automatic Sync

When you push to any branch:

```bash
git push origin feature/my-docs
```

The GitHub Actions workflow:
1. ✅ Reads source files from `docs/_source/`
2. ✅ Applies **design-site** adapter → generates `docs/_sync/design-site/`
3. ✅ Applies **docs-site** adapter → generates `docs/_sync/docs-site/`
4. ✅ Validates no divergence between source and synced content
5. ✅ Commits synced content to the branch
6. ✅ Builds both Starlight sites
7. ✅ Creates PR comment with sync status

### 4. Merge Compilation

When merging to `integration/vln` with multiple commits:

```bash
git merge --no-ff feature/audit-docs
```

The bot:
1. Aggregates all commits in the branch
2. Groups by type (features, fixes, docs, refactoring)
3. Extracts related issues and PRs
4. Generates a comprehensive merge summary
5. Adds summary as a merge commit message

---

## Directory Organization

### Design Documentation (`docs/_source/design/`)

Content focused on **visual design, UX, and product**.

```
design/
├── tokens/
│   ├── colors.md
│   ├── typography.md
│   └── spacing.md
├── components/
│   ├── button.md
│   ├── card.md
│   └── form-fields.md
├── pages/
│   ├── homepage.md
│   └── services.md
└── ux-flows/
    └── audit-intake.md
```

**Syncs to:** `design-site/src/content/docs/`

### Technical Documentation (`docs/_source/technical/`)

Content for **developers and architects**.

```
technical/
├── getting-started/
│   ├── setup.md
│   └── project-structure.md
├── architecture/
│   ├── overview.md
│   └── database-schema.md
├── guides/
│   ├── adding-pages.md
│   └── authentication.md
└── devops/
    ├── deployment.md
    └── cicd.md
```

**Syncs to:** `docs-site/src/content/docs/`

### API Reference (`docs/_source/api/`)

**Comprehensive API documentation**.

```
api/
├── endpoints/
│   ├── audit-requests.md
│   └── reports.md
├── authentication/
│   └── api-keys.md
├── webhooks/
│   └── events.md
└── errors/
    └── error-codes.md
```

**Syncs to:** `docs-site/src/content/docs/api/`

### Infrastructure (`docs/_source/infrastructure/`)

**DevOps, databases, networking**.

```
infrastructure/
├── database/
│   └── schema.md
├── caching/
│   └── redis-strategy.md
├── storage/
│   └── file-uploads.md
└── networking/
    └── cdn-configuration.md
```

**Syncs to:** `docs-site/src/content/docs/infrastructure/`

### Security (`docs/_source/security/`)

**Security auditing and threat modeling**.

```
security/
├── threat-modeling/
│   └── overview.md
├── audit-methodology/
│   └── vln-audit-process.md
└── vulnerability-scoring/
    └── scoring-model.md
```

**Syncs to:** `docs-site/src/content/docs/security/`

### Research (`docs/_source/research/`)

**Technical research and analysis**.

```
research/
├── rng-analysis/
│   └── statistical-analysis.md
├── smart-contracts/
│   └── evm-vulnerabilities.md
└── wallet-flows/
    └── risk-modeling.md
```

**Syncs to:** `docs-site/src/content/docs/research/`

---

## Writing Conventions

### File Naming

- Use **kebab-case**: `button-component.md`, `api-keys.md`
- Use **plural for categories**: `endpoints/`, `tokens/`, `guides/`
- Use **descriptive names**: `database-schema.md` not `db.md`

### Frontmatter (Optional)

The adapter system auto-generates frontmatter, but you can override:

```markdown
---
title: Custom Title
description: Custom description
sidebar:
  order: 10
---

# Content here...
```

Adapters **merge** your frontmatter with their defaults.

### Markdown Conventions

1. **Use H2 headers** for sections (H1 is auto-generated from title)
2. **Link cross-site docs** using relative paths:
   ```markdown
   [API Reference](/api/endpoints)
   [Architecture Guide](/architecture/overview)
   ```
3. **Reference commit/PR:** `(See #123 for context)`
4. **Code blocks** with language:
   ````markdown
   ```typescript
   const audit = await client.audits.create({...});
   ```
   ````

---

## Workflow: Adding Documentation

### Step 1: Create Source File

```bash
touch docs/_source/api/endpoints/new-endpoint.md
```

### Step 2: Write Content

```markdown
# New Endpoint

Description of the endpoint...

## Request

## Response

## Examples
```

### Step 3: Push to Feature Branch

```bash
git add docs/_source/
git commit -m "feat(docs): add new endpoint documentation"
git push origin feature/new-endpoint
```

### Step 4: Sync Happens Automatically

- ✅ Adapter system routes content to both sites
- ✅ Frontmatter auto-applied based on scope
- ✅ Validation ensures no divergence
- ✅ PR comment shows status

### Step 5: Merge to Integration

```bash
git checkout integration/vln
git merge --no-ff feature/new-endpoint
```

- ✅ All commits aggregated
- ✅ Merge summary generated
- ✅ Both sites built

---

## Scripts

### Sync Content

Manually trigger content sync:

```bash
node scripts/sync-content.js
```

**What it does:**
- Reads from `docs/_source/`
- Applies adapters
- Writes to `docs/_sync/`
- Validates integrity

### Validate Sync

Check for divergence:

```bash
node scripts/validate-sync.js
```

**What it checks:**
- Source files hash matches synced files
- No orphaned content in actual sites
- No manual edits to synced files

### Compile Merge Summary

Generate merge summary for a branch:

```bash
node scripts/compile-merge-summary.js integration/vln
```

**Output:**
- Aggregated commits by type
- Related issues/PRs extracted
- Statistics included

---

## Preventing Divergence

### How It Works

1. **Validation on Every Sync**
   - Source file hash stored with synced content
   - Any manual edit to synced files detected
   - CI alerts if divergence found

2. **Adapter-Based Routing**
   - Different paths per site = no merge conflicts
   - Metadata centralized in adapter files
   - Changes to adapters version-controlled

3. **Automated Sync Commits**
   - Every push triggers sync
   - Changes are deterministic (same input = same output)
   - Sync commit message references triggering commit

### What to Avoid

❌ **Don't edit content in `design-site/src/content/docs/`** — edit source instead
❌ **Don't edit content in `docs-site/src/content/docs/`** — edit source instead
❌ **Don't manually modify `docs/_sync/`** — it's auto-generated
❌ **Don't change adapter paths without updating source** — causes orphaned files

### If Divergence Occurs

1. **Validation fails in CI** — sync job will alert
2. **Check what diverged:** `node scripts/validate-sync.js`
3. **Fix at source:** Edit `docs/_source/` file
4. **Re-sync:** Push again, bot re-syncs automatically
5. **Verify:** Validation passes on next push

---

## Adapter Configuration

### Structure

```json
{
  "name": "Site Name",
  "description": "Site purpose",
  "targetSite": "site-name",
  "targetPath": "absolute/path/to/site/src/content/docs",
  "contentRoots": ["docs/_source/category1", "docs/_source/category2"],
  "routes": {
    "pattern/**/*.md": {
      "path": "output/path/{basename}",
      "sidebar": "section_name",
      "section": "Section Title",
      "layout": "layout_type",
      "frontmatter": {
        "key": "value"
      }
    }
  },
  "sidebar": { /* Astro config */ },
  "validation": { /* Validation rules */ }
}
```

### Path Patterns

- `{basename}` — Original filename
- `{dirname}` — Original directory structure
- `**` — Recursive wildcard
- `*` — Single directory level

### Layout Types

- `guide` — Standard documentation page
- `component-showcase` — Design component with visuals
- `api-reference` — API endpoint documentation
- `token-reference` — Design tokens (colors, typography, spacing)
- `research-paper` — In-depth technical research
- `flow-diagram` — UX flows and diagrams
- `splash` — Landing/overview pages

---

## CI/CD Integration

### Workflow Triggers

Workflow runs when:
- ✅ Push to any branch with docs changes
- ✅ PR opened/updated to `integration/vln` or `main`
- ✅ Changes to `docs/_source/**` or adapters

### What Happens

1. **Sync Step** (`sync-content`)
   - Content synchronized via adapters
   - Validation checks for divergence
   - Merge summary compiled
   - Changes committed and pushed

2. **Build Step** (`build-starlight-sites`)
   - `pnpm design:build` runs
   - `pnpm docs:build` runs
   - Build artifacts generated

3. **Validation Step** (`validate-documentation`)
   - Markdown link checking
   - Adapter schema validation
   - Config consistency checks

4. **Notify Step** (`notify-on-complete`)
   - PR comment created with status
   - Summary of changes included
   - Team notified via Discord (if configured)

---

## FAQ

**Q: Can I have docs in other places?**
A: Not recommended. All markdown should live in `docs/_source/` for the adapter system to work. Use relative links to reference other docs.

**Q: What if I want different content for design-site vs docs-site?**
A: Use adapters to route different source folders or add frontmatter conditionally. The source remains the same, presentation differs.

**Q: Do I need to update both adapters when adding a new directory?**
A: Only if content should appear on both sites. If it's design-only, update `design-site.adapter.json`. If developer-only, update `docs-site.adapter.json`.

**Q: How often does sync happen?**
A: Every push to any branch. The workflow is quick (< 1 min) because it's deterministic.

**Q: What happens if sync fails?**
A: CI will fail and you'll see details in Actions. Most common causes: missing adapter routes or bad YAML frontmatter.

**Q: Can I manually edit docs-site or design-site content?**
A: You can, but your edits will be overwritten on next sync. The system will alert you if divergence is detected.

---

## Resources

- **Adapter Examples:** `docs/_adapters/`
- **Source Structure:** `docs/_source/`
- **Scripts:** `scripts/sync-*.js`, `scripts/compile-*.js`
- **Workflow:** `.github/workflows/auto-update-docs.yml`
- **Starlight Docs:** https://starlight.astro.build/

---

## Support

For issues with the documentation system:

1. Check CI logs in `.github/workflows/auto-update-docs.yml`
2. Run validation locally: `node scripts/validate-sync.js`
3. Check adapter configuration for typos
4. Review source file frontmatter for conflicts
5. Ask in #documentation channel

🤖 **Documentation Bot** — Managed by VLN DevOps Team
