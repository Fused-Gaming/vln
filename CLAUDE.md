# **CLAUDE.md**

Guidance for Claude Code (claude.ai/code) when contributing to this repository.

---

# **Project Overview**

This repository hosts the codebase for:

# **VLN.gg – Security & Smart Contract Vulnerability Lab**

*Powered by Fused Gaming*

VLN provides advanced platform security, RNG analysis, wallet-flow risk modeling, and EVM smart contract auditing for high-risk, high-throughput systems.

**Current Status**: MVP (Active build-out)
**Focus**: Enterprise-grade security consulting assets, branded web presence, DevOps automation, and documentation.

---

# **Tech Stack**

**Framework**: Next.js 16 with App Router
**Language**: TypeScript (5.x)
**Styling**: Tailwind CSS
**UI Components**: Shadcn/UI + custom VLN components
**Database**: PostgreSQL via Prisma 7 (active — schema + seed + migrations)
**Authentication**: NextAuth.js (active — credentials + Google + GitHub)
**Payments**: Stripe for booking & retainers (planned)
**Package Manager**: pnpm
**Deployment**: Vercel (Primary), GitHub Actions (CI/CD)
**Blog**: blog.vln.gg subdomain via Next.js middleware routing

---

# **Commands**

```bash
pnpm dev      # Start development server
pnpm build    # Production build – REQUIRED before merging any PR
pnpm start    # Run local production build
pnpm lint     # ESLint checks
pnpm test     # Unit/integration tests
```

### **Database Commands**

```bash
pnpm db:init          # Validate env vars + test PostgreSQL connection (run first)
pnpm db:generate      # Regenerate Prisma client after schema changes
pnpm db:migrate:dev   # Development: create + apply migration files
pnpm db:migrate       # Production: apply existing migration files only
pnpm db:seed          # Seed initial admin user + VLN Research team
pnpm db:reset         # Drop + recreate DB, re-apply all migrations, re-seed
pnpm db:push          # Push schema directly without migration files (prototyping)
pnpm db:studio        # Open Prisma Studio at localhost:5555
```

**Required env vars** (copy `.env.example` → `.env.local`):

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | **Yes** | `postgresql://user:pass@host:5432/dbname` |
| `DATABASE_URL_DIRECT` | No | Non-pooled URL for Prisma CLI when using PgBouncer/Supabase |
| `NEXTAUTH_SECRET` | **Yes** | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Yes** | `http://localhost:3000` (dev) / `https://vln.gg` (prod) |
| `SEED_ADMIN_EMAIL` | No | Initial admin email (default: `admin@vln.gg`) |
| `SEED_ADMIN_PASSWORD` | Yes (prod) | Initial admin password — warns with dev default if unset |

**First-time DB initialization sequence:**

```bash
pnpm db:init           # 1. Validate env + confirm connection
pnpm db:generate       # 2. Generate Prisma client
pnpm db:migrate:dev    # 3. Create and apply migrations (dev)
pnpm db:seed           # 4. Seed admin user + team
```

---

# **Git Workflow (From Fused-Gaming/DevOps)**

VLN follows the Fused Gaming **integration-first branching model**.

### **Primary Branches**

* `main` — Production (protected)
* `integration/vln` — Active integration branch for VLN

### **Feature Workflow**

```bash
git checkout integration/vln
git pull

git checkout -b feature/<short-name>

pnpm build   # MUST pass before PR
```

### **Pull Request Rules**

* **Base branch must be `integration/vln`**
* `main` only receives merges from `integration/vln`
* All PRs must include:

  * Successful build
  * Lint ✓
  * Conventional Commit title

### **Commit Naming**

* `feat(vln): add audit request form`
* `fix(api): correct payload validation`
* `docs: update CLAUDE.md`
* `chore: add CI script`

---

# **Architecture**

```
app/
│   ├── blog/                   # Blog – also served at blog.vln.gg via middleware
│   │   ├── page.tsx            # Blog listing
│   │   ├── sitemap.ts          # blog.vln.gg sitemap
│   │   └── [slug]/             # Individual posts
│   ├── about/                  # About page (team + Brett Johnson keynote card)
│   ├── services/               # iGaming security + audit service pages
│   ├── contact/                # Contact + booking
│   ├── api/
│   │   ├── health/             # GET /api/health — live DB probe + commit log
│   │   ├── blog/rss/           # GET /api/blog/rss — RSS 2.0 feed
│   │   ├── audits/intake/      # POST /api/audits/intake
│   │   ├── bookings/           # POST /api/bookings
│   │   └── auth/               # NextAuth handlers
│   └── layout.tsx
│
components/
│   ├── ui/                     # Shadcn-based components
│   ├── vln/                    # Custom brand components (employee-card, etc.)
│   └── animations/
│
lib/
│   ├── blog/metadata.ts        # BLOG_POSTS[] — single source of truth for RSS, sitemap, homepage
│   ├── prisma.ts               # Prisma client singleton (adapter-pg)
│   ├── auth.ts                 # NextAuth configuration
│   └── api-types.ts            # Shared TypeScript types
│
prisma/
│   ├── schema.prisma           # 25+ models (User, AuditRequest, Report, Finding, …)
│   └── seed.ts                 # Idempotent seed (admin user + VLN Research team)
│
scripts/
│   └── db-init.ts              # Pre-flight env + connection validation
│
prisma.config.ts                # Prisma 7 CLI datasource config (DATABASE_URL)
middleware.ts                   # CORS + security headers + blog.vln.gg subdomain routing
public/
│   └── brett-johnson.jpg       # ← drop headshot here (About keynote card)
docs/
│   ├── design/
│   ├── devops/
│   ├── planning/
│   ├── technical/
│   └── guides/
```

### **blog.vln.gg Subdomain Routing**

The blog runs on the same Vercel deployment as `vln.gg`. Middleware detects the hostname and rewrites:

| Incoming | Rewrites to |
|---|---|
| `blog.vln.gg/` | `/blog` |
| `blog.vln.gg/[slug]` | `/blog/[slug]` |
| `blog.vln.gg/rss.xml` | `/api/blog/rss` |

Add `blog.vln.gg` as a domain alias in the Vercel dashboard (same project). DNS: `CNAME blog → cname.vercel-dns.com`.

---

# **VLN Branding Specs**

*(KEEP colors/fonts exactly as defined in brand kit)*

### **Color Palette**

* **Matte Charcoal** – Background base
* **Sage Green** – Accent 1
* **Warm Blue-Gray** – Accent 2
* **Soft Glow White** – UI highlighting

### **Design Tokens**

```css
--vln-bg: #0f0f0f;
--vln-sage: #a6c3a7;
--vln-bluegray: #aab7c8;
--vln-accent: var(--vln-sage);

--vln-radius: 12px;
--vln-card-lift: 4px;
```

### **Tone**

* High-trust
* Professional
* Research Lab aesthetic
* Zero neon, zero cyberpunk
* Motion used sparingly

---

# **Font System**

* **Primary**: Inter
* **Secondary**: JetBrains Mono (for technical content)

Loaded via Next.js `localFont`.

---

# **Logo System**

**Files:**
`/public/vln-logo-dark.svg`
`/public/vln-logo-light.svg`

Usage example:

```tsx
<Image src="/vln-logo-dark.svg" width={164} height={40} alt="VLN.gg" />
```

---

# **Component Standards**

### Server vs Client

* **Default:** Server Components
* Use `'use client'` ONLY for interactive components

### Accessibility

* WCAG AA contrast
* Keyboard nav required
* ARIA labels required
* No hidden focus indicators

---

# **State Management**

* Native React server components
* Zustand for minor global state (planned)
* No Redux

---

# **Styling Rules**

* Tailwind ONLY
* Components must use design tokens
* All buttons use glow-lift states:

```tsx
"transition-all shadow-[0_0_0_0] hover:shadow-[0_0_8px_#a6c3a7]"
```

---

# **Layout System**

* **Container Max Width:** 1280px
* **Mobile-first**
* **Breakpoints:**

```css
sm: 640px;
md: 768px;
lg: 1024px;
xl: 1280px;
```

---

# **Design System Files**

Everything is defined inside:

```
docs/design/
├── mockups/
├── flows/
├── tokens/
├── STATUS.md
└── README.md
```

Mockups include:

* Home
* Services overview
* Audit intake form
* Technical advisory index
* Report viewer

---

# **DevOps Integration**

*(Adopted from Fused-Gaming/DevOps factory patterns)*

### **GitHub Actions Workflows (`.github/workflows/`)**

* `ci.yml` — Lint, Typecheck, Build
* `deploy.yml` — Deploy main → Vercel
* `preview.yml` — Deploy PR previews
* `security-scan.yml` — SAST & dependency audit

### **Security Tools**

* `npm audit --production`
* Semgrep (planned)
* Supply-chain scanning (future)

### **Performance Budgets**

* Lighthouse score > 85
* LCP < 2.5s
* Bundle size monitored

---

# **Testing Strategy**

* Vitest unit tests
* Playwright E2E
* Required coverage thresholds:

```
Lines: 80%
Branches: 70%
Functions: 75%
```

---

# **Deployment**

* **Platform:** Vercel
* **Production Branch:** `main`
* **Preview Branches:** Any PR → temporary preview environment

**Environment Variables**

```
DATABASE_URL=""
NEXTAUTH_SECRET=""
EMAIL_SERVER=""
EMAIL_FROM=""
STRIPE_KEY=""
```

---

# **Development Guidelines**

### When Adding a New Page

```bash
mkdir -p app/(site)/newpage
touch app/(site)/newpage/page.tsx
```

Rules:

* Export metadata
* Provide mobile layout first
* Use brand color tokens

### When Adding API Routes

```bash
mkdir -p app/api/<endpoint>/route.ts
```

Return typed responses:

```ts
export async function GET() {
  return NextResponse.json({ ok: true })
}
```

### When Installing Dependencies

```bash
pnpm add <package>
pnpm add -D <package>
pnpm build
```

---

# **VLN MVP Tracks**

### **Track 1 — Brand & Web Foundation ✅ Complete**

* ✅ Homepage (hero, stats, services, testimonials, FAQ, blog section)
* ✅ Services pages + San Francisco local page
* ✅ Contact + booking
* ✅ Header + Footer
* ✅ Brand kit application (sage/bluegray/amber/purple tokens)
* ✅ About page (team cards + Brett Johnson keynote speaker card)
* ✅ Blog at `vln.gg/blog` + `blog.vln.gg` subdomain (4 articles, RSS, sitemap)

### **Track 2 — Security Pipeline Buildout ✅ Active**

* ✅ Audit intake API (`/api/audits/intake`)
* ✅ Booking/retainer workflow (`/api/bookings`)
* ✅ Health/status endpoint with live DB probe + commit log (`/api/health`)
* ✅ RSS feed (`/api/blog/rss`)
* 🔄 Advisory index + reports (in progress)

### **Track 3 — CI/CD Automation 🔄 In Progress**

* ✅ GitHub Actions: lint, typecheck, build (`ci.yml`)
* ✅ Security scanning (`security-scan.yml`)
* 🔄 Auto-versioning
* 🔄 Preview deployments

### **Track 4 — Database + Auth ✅ Foundation Complete**

* ✅ Prisma 7 schema (25+ models: User, AuditRequest, Report, Finding, Payment…)
* ✅ `prisma.config.ts` — Prisma 7 CLI datasource config
* ✅ `prisma/seed.ts` — idempotent seed (admin user + VLN Research team)
* ✅ `scripts/db-init.ts` — pre-flight env validation + connection test
* ✅ `package.json` db:* scripts (init, migrate, seed, push, reset, studio)
* ✅ NextAuth (credentials + Google + GitHub)
* 🔄 Client portal UI
* 🔄 Report storage + secure document delivery

---

# **Post-MVP (Deferred)**

* Full client dashboard
* Automated report generator
* Public advisory feed
* Retainer billing automation
* Vulnerability scoring engine based on your internal model

---

# **Identity & Tagline**

**Name:** VLN — Vulnerability Lab Network
**Tagline:** *iGaming Security & Smart Contract Intelligence*
**Mission:** Provide elite, mathematically-rigorous threat modeling and exploit detection for gaming and EVM ecosystems.

---

# **Path Aliases**

```ts
@/components/*
@/lib/*
@/styles/*
@/app/*
```

---

# **Documentation Hub**

Internal docs live at:

```
docs/
  design/
  devops/
  planning/
  technical/
  guides/
```

---

# **Claude Directives**

When Claude modifies or generates code:

1. **Never introduce new dependencies without justification**
2. **Always ensure build passes before producing patch output**
3. **Follow Tailwind + Shadcn conventions**
4. **Use TypeScript strict mode**
5. **Ensure accessibility compliance**
6. **Prefer server components**
7. **Follow integration-first Git branching**
8. **Respect VLN brand colors, fonts, and tones exactly**

---

If you'd like, I can also generate:

✅ **AUTOFIX-CLAUDE.md** – rules for self-correcting Claude patches
✅ **PULL_REQUEST_TEMPLATE.md** – VLN-specific PR format
✅ **SECURITY_POLICY.md** – for disclosures and advisory workflow
✅ **docs/design/tokens/DESIGN_TOKENS.md** – fully built with your palette
✅ A complete **Next.js folder scaffold**

Just say **"Generate the rest"**.
