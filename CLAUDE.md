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

**Framework**: Next.js 15 with App Router
**Language**: TypeScript (5.x)
**Styling**: Tailwind CSS
**UI Components**: Shadcn/UI + custom VLN components
**Database**: PostgreSQL via Prisma (planned)
**Authentication**: NextAuth.js (planned)
**Payments**: Stripe for booking & retainers (planned)
**Package Manager**: pnpm
**Deployment**: Vercel (Primary), GitHub Actions (CI/CD)

---

# **Commands**

```bash
pnpm dev      # Start development server
pnpm build    # Production build – REQUIRED before merging any PR
pnpm start    # Run local production build
pnpm lint     # ESLint checks
pnpm test     # Unit/integration tests
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
│   ├── (site)/                 # Marketing, landing pages
│   ├── services/               # iGaming security + audit service pages
│   ├── contact/                # Contact + booking
│   ├── api/                    # Serverless API endpoints
│   └── layout.tsx
│
components/
│   ├── ui/                     # Shadcn-based components
│   ├── vln/                    # Custom brand components
│   └── icons/
│
lib/
│   ├── utils/
│   ├── validation/
│   └── email/
│
public/
docs/
│   ├── design/
│   ├── devops/
│   ├── planning/
│   ├── technical/
│   └── guides/
```

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

### **Track 1 — Brand & Web Foundation (You Are Here)**

* Homepage
* Services pages
* Contact
* Header + Footer
* Brand kit application

### **Track 2 — Security Pipeline Buildout**

* Audit intake API
* Booking/retainer workflow
* Advisory index + reports

### **Track 3 — CI/CD Automation**

* Auto-versioning
* Security scanning
* Preview deployments

### **Track 4 — Database + Auth (Future)**

* Client portal
* Report storage
* Secure client document delivery

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
