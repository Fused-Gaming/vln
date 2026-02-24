# VLN Monorepo Structure

This document describes the monorepo layout, build organization, and rules for managing multiple projects within the Fused-Gaming/vln repository.

---

## Repository Layout

```
vln/
├── .github/                          # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml                    # Main CI pipeline (Next.js)
│   │   ├── deploy-docs.yml           # Docs deployment (Astro)
│   │   └── auto-update-docs.yml
│   └── scripts/
│
├── app/                              # Next.js App Router (Main website)
│   ├── (site)/                       # Public pages
│   ├── api/                          # API routes
│   └── layout.tsx
│
├── components/                       # React components (Next.js)
│   ├── ui/                           # Shadcn/UI components
│   ├── vln/                          # Custom VLN components
│   └── icons/
│
├── lib/                              # TypeScript utilities
│   ├── utils/
│   ├── validation/
│   └── email/
│
├── public/                           # Static assets (Next.js)
│   ├── vln-logo-dark.svg
│   ├── vln-logo-light.svg
│   └── ...
│
├── docs/                             # Reference documentation (Markdown)
│   ├── design/
│   ├── devops/
│   ├── architecture/
│   ├── planning/
│   └── prompts/
│
├── docs-site/                        # 🆕 Astro documentation site
│   ├── src/
│   │   ├── content/docs/             # Source of truth for all docs
│   │   │   ├── getting-started/
│   │   │   ├── design/
│   │   │   ├── architecture/
│   │   │   ├── devops/
│   │   │   ├── brand/
│   │   │   └── api/
│   │   ├── layouts/
│   │   ├── components/
│   │   ├── styles/custom.css         # VLN branding
│   │   └── content.config.ts
│   ├── astro.config.mjs              # Astro configuration
│   ├── tailwind.config.mjs           # Tailwind for docs
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   ├── package.json
│   ├── .gitignore
│   └── dist/                         # Built output (gitignored)
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Next.js tests, build
│   │   └── deploy-docs.yml           # Astro docs build & deploy
│   └── ...
│
├── scripts/                          # Build and automation scripts
│   ├── generate-favicons.js          # Next.js favicon generation
│   └── ...
│
├── __tests__/                        # Next.js unit tests
├── .eslintrc.json                    # Global ESLint config
├── .prettierrc.json                  # Global Prettier config
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # Global TypeScript config
├── tailwind.config.ts                # Global Tailwind (Next.js only)
├── pnpm-workspace.yaml               # pnpm monorepo config
├── pnpm-lock.yaml                    # Workspace lock file
│
├── package.json                      # Root workspace package
├── CLAUDE.md                         # AI development guidelines
├── MONOREPO_STRUCTURE.md             # This file
├── DOCS_MIGRATION_PLAN.md            # Docs migration tracking
├── ROADMAP.md
├── README.md
├── CHANGELOG.md
└── CONTRIBUTING.md
```

---

## Workspace Configuration

### pnpm Workspaces

The repository uses **pnpm monorepo** with two packages:

```yaml
# pnpm-workspace.yaml
packages:
  - '.'              # vln-website (Next.js main app)
  - 'docs-site'      # vln-docs-site (Astro docs)
```

### Package Metadata

**Root Package:**
- Name: `vln-website`
- Type: Next.js 15 (React SSR + API Routes)
- Output: `.next/` (development), `.next/` (production)
- Deploy target: Vercel (main domain: vln.gg)

**Docs Package:**
- Name: `vln-docs-site`
- Type: Astro 5 (Static site generation)
- Output: `docs-site/dist/`
- Deploy target: Vercel (subdomain: docs.vln.gg)

---

## Build Organization Rules

### Rule 1: Separate Build Commands by Project

**Next.js (Main Site):**
```bash
pnpm dev                # Runs: next dev
pnpm build              # Runs: next build (in ./.next/)
pnpm start              # Runs: next start (production server)
```

**Astro (Docs Site):**
```bash
pnpm docs:dev           # Runs: cd docs-site && pnpm dev
pnpm docs:build         # Runs: cd docs-site && pnpm build (in ./docs-site/dist/)
pnpm docs:preview       # Runs: cd docs-site && pnpm preview
```

### Rule 2: No Cross-Folder Build Conflicts

Each project has **isolated build outputs**:

| Project | Output Directory | Git-Ignored | Deploy |
|---------|---|---|---|
| Next.js | `./.next/` | ✅ | Vercel (main) |
| Astro | `./docs-site/dist/` | ✅ | Vercel (docs) |

**``.gitignore` entries:**
```bash
# Next.js
.next/
.turbo/
dist/

# Astro (docs-site)
docs-site/dist/
docs-site/.astro/

# Shared
node_modules/
pnpm-store/
.pnpm/
```

### Rule 3: CI/CD Pipeline Isolation

**GitHub Actions workflows must specify which project they build:**

```yaml
# .github/workflows/ci.yml (Next.js)
- name: Build Next.js
  run: pnpm build

# .github/workflows/deploy-docs.yml (Astro)
- name: Build Documentation
  run: pnpm docs:build
```

**Avoid:**
```bash
# ❌ Don't: This would build both projects
pnpm monorepo:build
```

### Rule 4: Dependency Isolation

Each package has its own `package.json`:

- **Root dependencies:** Only shared utilities (TypeScript, ESLint)
- **Next.js dependencies:** React, Next.js, Shadcn/UI, Tailwind
- **Astro dependencies:** Astro, Starlight, Astro integrations

**Install dependencies for specific package:**
```bash
pnpm --filter vln-docs-site add @astrojs/react
```

### Rule 5: Linting and Type Checking

**Global eslint** (covers both projects):
```bash
pnpm lint                # Runs from root
```

**Project-specific:**
```bash
pnpm docs:lint          # Runs eslint in docs-site/
```

---

## Development Workflow

### Starting Development

**Option 1: Work on main site**
```bash
pnpm dev                 # Next.js on http://localhost:3000
```

**Option 2: Work on docs**
```bash
pnpm docs:dev            # Astro on http://localhost:4321
```

**Option 3: Work on both (two terminals)**
```bash
# Terminal 1
pnpm dev

# Terminal 2
pnpm docs:dev
```

### Building for Production

**Build both projects:**
```bash
pnpm build               # Next.js
pnpm docs:build          # Astro (runs separately)
```

**Or individually:**
```bash
pnpm build               # Main site only
pnpm docs:build          # Docs only
```

### Running Tests

**Next.js tests only:**
```bash
pnpm test
```

**All workspace tests:**
```bash
pnpm monorepo:test       # Runs tests in both packages
```

---

## Deployment Strategy

### Vercel Projects

**Two separate Vercel projects:**

1. **vln-gg** (Main site)
   - Root directory: `.` (or auto-detect)
   - Build command: `pnpm build`
   - Output directory: `.next/`
   - Production branch: `main`
   - Preview branch: `integration/vln`
   - Domain: `vln.gg`

2. **vln-docs** (Documentation)
   - Root directory: `docs-site/`
   - Build command: `pnpm install && pnpm build`
   - Output directory: `dist/`
   - Production branch: `main`
   - Preview branch: `integration/vln`
   - Domain: `docs.vln.gg`

### Environment-Specific Configuration

**`.env.local`** (Next.js):
```env
NEXT_PUBLIC_API_URL=https://vln.gg/api
STRIPE_PUBLIC_KEY=pk_...
DATABASE_URL=postgresql://...
```

**No `.env` needed** for Astro docs (static site).

---

## Adding New Projects to the Monorepo

### Step 1: Create Project Directory
```bash
mkdir new-project
cd new-project
npm init -y
```

### Step 2: Update pnpm-workspace.yaml
```yaml
packages:
  - '.'
  - 'docs-site'
  - 'new-project'    # ← Add here
```

### Step 3: Update Root package.json Scripts
```json
{
  "scripts": {
    "new-project:dev": "cd new-project && pnpm dev",
    "new-project:build": "cd new-project && pnpm build"
  }
}
```

### Step 4: Add to CI/CD
Create `.github/workflows/deploy-new-project.yml` with appropriate build steps.

---

## Troubleshooting

### Issue: "Command failed in filter" for docs-site

**Solution:** Use explicit filter syntax:
```bash
pnpm --filter=vln-docs-site build
```

### Issue: Tailwind styles not applying in docs

**Check:** `docs-site/tailwind.config.mjs` has correct content paths:
```javascript
content: [
  './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  './node_modules/@astrojs/starlight/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
]
```

### Issue: Node modules are huge

**This is pnpm's symlink design.** It's safe and optimizes disk usage.

To see actual size:
```bash
du -sh node_modules
du -sh .pnpm-store
```

---

## Best Practices

✅ **DO:**
- Keep build outputs in separate directories
- Isolate dependencies by package
- Use monorepo:* commands for cross-project operations
- Document project-specific setup in each package's README
- Run linting in CI before building

❌ **DON'T:**
- Mix Next.js and Astro build outputs
- Share node_modules between packages (pnpm handles this)
- Commit `.next/`, `dist/`, or other build outputs
- Reference Astro config from Next.js or vice versa
- Assume global tools are available (use pnpm script aliases)

---

## References

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Astro Deployment](https://docs.astro.build/en/guides/deploy/)
- [Vercel Multi-Project Setup](https://vercel.com/docs/concepts/git/monorepos)

---

**Last Updated:** 2026-02-24
**Maintained By:** Claude Code
