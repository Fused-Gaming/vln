# VLN Docs Migration Plan

**Status:** In Progress
**Branch:** `claude/migrate-domain-resources-hGw6X`
**Start Date:** 2026-02-24
**Target Completion:** 2026-03-10

---

## Overview

This document outlines the migration of documentation and design resources from the **Fused-Gaming/DevOps** repository to the **Fused-Gaming/vln** repository using **Astrodocs** (Astro + Starlight).

### Key Goals

✅ Centralize all VLN documentation in the main repository
✅ Create an accessible, professionally-hosted docs site (docs.vln.gg)
✅ Maintain DevOps best practices and patterns
✅ Zero downtime migration
✅ Improve developer onboarding and knowledge sharing

---

## Phase 1: Infrastructure Setup (Completed ✅)

### Completed Tasks
- ✅ Created `/docs-site/` directory with Astro Starlight configuration
- ✅ Set up Astrodocs `astro.config.mjs` with complete sidebar structure
- ✅ Created `package.json` with Astro dependencies
- ✅ Configured TypeScript for Astrodocs (`tsconfig.json`)
- ✅ Applied VLN branding via `/src/styles/custom.css`
- ✅ Created initial content stubs for all documentation sections
- ✅ Added `.gitignore` for Astro build artifacts

### Files Created
```
docs-site/
├── astro.config.mjs               (Starlight config with VLN sidebar)
├── package.json                   (Astro dependencies)
├── tsconfig.json                  (TypeScript configuration)
├── .gitignore
└── src/
    ├── styles/
    │   └── custom.css             (VLN color tokens & branding)
    └── content/docs/
        ├── getting-started/
        │   └── overview.md        (Getting started placeholder)
        ├── design/
        │   └── overview.md        (Design system intro)
        ├── architecture/
        │   └── overview.md        (Architecture intro)
        ├── devops/
        │   └── cicd.md            (CI/CD intro)
        ├── brand/                 (Brand guidelines - empty)
        └── api/                   (API reference - empty)
```

---

## Phase 2: Content Migration from DevOps

### Content Inventory to Migrate

| Source | Destination | Status | Priority |
|--------|---|---|---|
| DevOps `/docs/**/*` | `docs-site/src/content/docs/` | Pending | P1 |
| DevOps design system docs | `docs-site/src/content/docs/design/` | Pending | P1 |
| DevOps CI/CD workflows | `docs-site/src/content/docs/devops/` | Pending | P1 |
| DevOps security patterns | `docs-site/src/content/docs/architecture/` | Pending | P1 |
| DevOps infrastructure templates | `docs-site/src/content/docs/devops/` | Pending | P2 |
| DevOps deployment guides | `docs-site/src/content/docs/devops/` | Pending | P2 |
| DevOps monitoring setup | `docs-site/src/content/docs/devops/monitoring/` | Pending | P2 |
| DevOps brand guidelines | `docs-site/src/content/docs/brand/` | Pending | P2 |

### Migration Strategy

#### Step 1: Fetch DevOps Repository (Requires Access)
```bash
# Add DevOps as a remote
git remote add devops https://github.com/Fused-Gaming/DevOps.git

# Fetch the specific docs directory
git fetch devops --depth=1

# Extract docs files
git show devops/main:docs/ > /dev/null  # Verify structure
```

#### Step 2: Copy and Adapt Content
- Convert DevOps docs to Starlight-compatible markdown
- Update internal links to point to new `/docs-site/` structure
- Preserve metadata (frontmatter, headings, code blocks)
- Add breadcrumbs and navigation links
- Test markdown rendering in Starlight

#### Step 3: Update Sidebar Navigation
Edit `/docs-site/astro.config.mjs` as content is added:
```javascript
sidebar: [
  {
    label: 'DevOps & CI/CD',
    items: [
      // Add items as content is migrated
      { label: 'CI/CD Pipeline', slug: 'devops/cicd' },
      { label: 'Deployment', slug: 'devops/deployment' },
      // ... more items
    ]
  }
]
```

#### Step 4: Validate and Test
- Run `pnpm install` in `/docs-site/`
- Test build: `pnpm build`
- Test dev server: `pnpm dev`
- Verify all links work
- Check responsive design on mobile/tablet

#### Step 5: Deploy to Vercel
Configure Vercel for `/docs-site/` deployment:
```json
{
  "buildCommand": "cd docs-site && pnpm install && pnpm build",
  "outputDirectory": "docs-site/dist",
  "rootDirectory": "."
}
```

---

## Phase 3: Integration with Main Repo

### Root Package.json Updates

Add scripts to manage docs:
```json
{
  "scripts": {
    "docs:dev": "cd docs-site && pnpm dev",
    "docs:build": "cd docs-site && pnpm build",
    "docs:preview": "cd docs-site && pnpm preview",
    "docs:lint": "cd docs-site && pnpm lint"
  }
}
```

### CI/CD Integration

Update `.github/workflows/ci.yml` to build docs:
```yaml
- name: Build Documentation
  run: pnpm docs:build
```

### Deployment Configuration

Create `.github/workflows/deploy-docs.yml`:
```yaml
name: Deploy Documentation

on:
  push:
    branches: [integration/vln, main]
    paths:
      - 'docs-site/**'
      - 'docs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: cd docs-site && pnpm install

      - name: Build documentation
        run: cd docs-site && pnpm build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_DOCS }}
```

---

## Phase 4: Domain & Hosting

### DNS Configuration

Point subdomain to Vercel:
```
docs.vln.gg → docs-vln.vercel.app (CNAME)
```

### Vercel Project Setup

1. Create new Vercel project: "vln-docs"
2. Connect to GitHub: `Fused-Gaming/vln`
3. Set root directory: `docs-site/`
4. Environment variables: None required initially
5. Production branch: `integration/vln` → `main`

---

## Current Blockers & Solutions

### ⚠️ Blocker 1: DevOps Repository Access

**Status:** Pending local proxy authorization
**Solution:**
- Option A: Request access through GitHub
- Option B: Manually copy docs from public GitHub interface
- Option C: Use GitHub API to fetch files

### ⚠️ Blocker 2: Vercel Configuration

**Status:** Not yet configured
**Solution:**
- Set up Vercel project with root directory: `docs-site/`
- Configure environment variables (if needed)
- Test preview deployments

---

## Timeline

| Phase | Task | Owner | Start | End | Status |
|---|---|---|---|---|---|
| 1 | Astrodocs infrastructure | Claude | 2026-02-24 | 2026-02-24 | ✅ Done |
| 2 | Fetch DevOps content | Manual | 2026-02-25 | 2026-02-26 | ⏳ Pending |
| 2 | Copy & adapt docs | Claude | 2026-02-27 | 2026-03-03 | ⏳ Pending |
| 2 | Validate & test | Manual | 2026-03-03 | 2026-03-04 | ⏳ Pending |
| 3 | CI/CD integration | Claude | 2026-03-04 | 2026-03-05 | ⏳ Pending |
| 4 | Vercel & DNS setup | Manual | 2026-03-05 | 2026-03-06 | ⏳ Pending |
| 4 | Final testing | Manual | 2026-03-06 | 2026-03-07 | ⏳ Pending |
| 4 | Launch (production) | Manual | 2026-03-10 | 2026-03-10 | ⏳ Pending |

---

## Documentation Files Structure

### Before (DevOps repo)
```
DevOps/
└── docs/
    ├── design/
    ├── devops/
    ├── architecture/
    ├── planning/
    └── guides/
```

### After (VLN repo)
```
vln/
├── docs/                    (Original VLN docs - kept)
├── docs-site/              (NEW - Astrodocs site)
│   ├── src/
│   │   ├── content/docs/
│   │   │   ├── getting-started/
│   │   │   ├── design/
│   │   │   ├── architecture/
│   │   │   ├── devops/
│   │   │   ├── brand/
│   │   │   └── api/
│   │   └── styles/
│   ├── astro.config.mjs
│   └── package.json
└── .github/
    └── workflows/
        └── deploy-docs.yml  (NEW)
```

---

## Success Criteria

✅ Astrodocs site builds without errors
✅ All pages render correctly with VLN branding
✅ Links are correct and functional
✅ Search functionality works
✅ Mobile responsive design
✅ Site deploys to `docs.vln.gg`
✅ CI/CD integration passes
✅ DevOps content successfully migrated

---

## Next Steps

1. **Gain access to DevOps repository** (manual)
2. **Extract and review DevOps docs** (manual review)
3. **Run Phase 2 content migration** (Claude)
4. **Set up Vercel deployment** (manual)
5. **Configure DNS** (manual)
6. **Launch docs.vln.gg** (manual)

---

## Notes

- All existing VLN docs in `/docs/` remain unchanged
- Astrodocs provides better UX than raw markdown in GitHub
- Multiple doc sources can be managed in single Starlight site
- Easy to add more sections/pages in the future
- Supports versioning if needed (Starlight feature)

---

**Created by:** Claude Code
**Last Updated:** 2026-02-24
**Branch:** `claude/migrate-domain-resources-hGw6X`
