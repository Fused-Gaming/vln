# Getting Started with VLN.gg

Welcome to the VLN (Vulnerability Lab Network) development documentation. This guide will help you set up your development environment and understand the project structure.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Building for Production](#building-for-production)
6. [Deployment](#deployment)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.x or higher
- **pnpm**: v8.x or higher (recommended package manager)
- **Git**: Latest version
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Installing pnpm

```bash
npm install -g pnpm
```

---

## Quick Start

### 1. Clone the Repository

```bash
git checkout https://github.com/Fused-Gaming/vln.git
cd vln
```

### 2. Install Dependencies

```bash
pnpm install
```

This will:
- Install all npm packages
- Set up Git hooks (if configured)
- Generate the lockfile

### 3. Run Development Server

```bash
pnpm dev
```

The site will be available at `http://localhost:3000`

### 4. Verify Setup

Open your browser and navigate to:
- Homepage: `http://localhost:3000`
- Services: `http://localhost:3000/services`
- Pricing: `http://localhost:3000/pricing`

---

## Project Structure

```
vln/
├── app/                    # Next.js 15 App Router
│   ├── (site)/            # Marketing pages group
│   ├── about/             # About page
│   ├── blog/              # Blog (placeholder)
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── get-help/          # Support page
│   ├── pricing/           # Pricing page
│   ├── privacy/           # Privacy policy
│   ├── refunds/           # Refund policy
│   ├── services/          # Services page
│   ├── terms/             # Terms of service
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   ├── providers.tsx      # React context providers
│   └── sitemap.ts         # Dynamic sitemap
│
├── components/            # React components
│   ├── animations/        # Animation components
│   │   ├── css-fade.tsx
│   │   └── stagger-fade.tsx
│   ├── layout/            # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui/                # UI components
│   │   ├── button.tsx
│   │   ├── cookie-consent.tsx
│   │   └── scroll-to-top.tsx
│   └── vln/               # VLN brand components
│       ├── ic-board-background.tsx
│       ├── stat-card.tsx
│       └── testimonial.tsx
│
├── lib/                   # Utility libraries
│   └── animation-context.tsx
│
├── public/                # Static assets
│   ├── vln-logo-dark.svg
│   └── vln-logo-light.svg
│
├── docs/                  # Documentation
│   ├── design/            # Design documentation
│   └── getting-started/   # This guide
│
├── styles/                # Global styles
│   └── globals.css
│
├── middleware.ts          # Next.js middleware (CORS, security)
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # Lockfile
├── CLAUDE.md              # AI development guidelines
└── ROUTES.md              # Route documentation
```

---

## Development Workflow

### Branching Strategy

VLN follows the **integration-first** branching model:

```
main (production)
  └── integration/vln (active integration)
        ├── feature/your-feature
        ├── fix/bug-fix
        └── docs/documentation
```

#### Creating a Feature Branch

```bash
git checkout integration/vln
git pull
git checkout -b feature/your-feature-name
```

#### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
chore(scope): routine task
style(scope): code formatting
refactor(scope): code refactoring
test(scope): add tests
perf(scope): performance improvement
```

**Examples:**
```bash
git commit -m "feat(pricing): add enterprise tier pricing"
git commit -m "fix(header): resolve mobile menu z-index issue"
git commit -m "docs(api): document authentication endpoints"
```

### Pull Request Process

1. **Create PR** targeting `integration/vln` (not `main`)
2. **Ensure build passes**: `pnpm build`
3. **Lint check**: `pnpm lint`
4. **Write clear PR description** with:
   - What changed
   - Why it changed
   - Testing performed
5. **Request review** from team members
6. **Merge** only after approval

---

## Available Scripts

```bash
# Development
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Run production build locally
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues

# Type checking
pnpm type-check   # TypeScript type checking

# Cleaning
rm -rf .next      # Clear Next.js cache
pnpm install      # Reinstall dependencies
```

---

## Building for Production

### 1. Run Production Build

```bash
pnpm build
```

This will:
- Compile TypeScript
- Run ESLint checks
- Optimize assets
- Generate static pages
- Create production bundle

### 2. Test Production Build Locally

```bash
pnpm start
```

Navigate to `http://localhost:3000` to verify.

### 3. Check Build Output

```
Route (app)                              Size  First Load JS
┌ ○ /                                    10.7 kB         163 kB
├ ○ /about                               5.48 kB         158 kB
├ ○ /services                            5.4 kB          158 kB
└ ○ /pricing                             5.83 kB         158 kB
```

- ✅ All pages should be marked as `○` (Static)
- ✅ First Load JS should be < 200 kB
- ✅ No build errors

---

## Deployment

### Vercel (Primary)

VLN is deployed on Vercel with automatic deployments:

**Production:**
- Branch: `main`
- URL: `https://vln.gg`
- Auto-deploy: ✅

**Integration:**
- Branch: `integration/vln`
- URL: `https://vln-integration.vercel.app`
- Auto-deploy: ✅

**Preview:**
- Every PR gets a unique preview URL
- Format: `https://vln-git-[branch]-fused-gaming.vercel.app`

### Environment Variables

Required for deployment:

```bash
# Cloudflare Analytics
NEXT_PUBLIC_CF_BEACON_TOKEN=565db9149b914dc2aec85b7ac21da3c0

# Database (when implemented)
DATABASE_URL=

# Authentication (when implemented)
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Email (when implemented)
EMAIL_SERVER=
EMAIL_FROM=

# Payments (when implemented)
STRIPE_KEY=
STRIPE_SECRET=
```

### Manual Deployment

If deploying manually:

```bash
# Build
pnpm build

# Deploy to Vercel
vercel --prod

# Or deploy to custom server
npm install -g serve
serve -s out -p 3000
```

---

## Development Tips

### 1. Hot Reload Issues

If changes aren't reflecting:
```bash
rm -rf .next
pnpm dev
```

### 2. TypeScript Errors

```bash
# Check types
pnpm type-check

# VS Code: Reload TypeScript server
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### 3. Tailwind CSS Not Working

```bash
# Restart dev server
# Verify tailwind.config.ts includes correct paths
```

### 4. Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
pnpm dev -- -p 3001
```

---

## Code Style Guidelines

### TypeScript

- Use strict mode
- Prefer `interface` over `type` for object shapes
- Use `const` over `let` when possible
- Avoid `any` types

### React

- Functional components only
- Use `'use client'` only when necessary
- Prefer server components by default
- Use React hooks properly

### Tailwind CSS

- Use design tokens from `tailwind.config.ts`
- Follow mobile-first approach
- Use `@apply` sparingly (prefer utility classes)
- Keep classes organized (layout → spacing → colors → typography)

### File Naming

- Components: PascalCase (`Button.tsx`, `Header.tsx`)
- Utilities: camelCase (`formatDate.ts`, `validateEmail.ts`)
- Pages: lowercase (`about/page.tsx`, `pricing/page.tsx`)

---

## Accessibility Checklist

When developing, ensure:

- ✅ Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Color contrast ≥ 4.5:1
- ✅ Images have alt text
- ✅ Forms have proper labels

---

## Performance Checklist

- ✅ Use Next.js Image component
- ✅ Lazy load below-fold content
- ✅ Minimize client-side JavaScript
- ✅ Use CSS animations over JavaScript
- ✅ Optimize images (WebP, AVIF)
- ✅ Lighthouse score > 85

---

## Troubleshooting

### Build Fails with "Cannot find module"

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### ESLint Errors

```bash
# Auto-fix
pnpm lint:fix

# Or disable specific rule (last resort)
// eslint-disable-next-line rule-name
```

### Type Errors in Dependencies

```bash
# Clear TypeScript cache
rm -rf .next
rm -rf node_modules/.cache
```

---

## Next Steps

- 📖 Read [Component Documentation](../design/components/README.md)
- 🎨 Review [Design System](../design/README.md)
- 🗺️ Check [Route Documentation](../../ROUTES.md)
- 🤖 Follow [AI Guidelines](../../CLAUDE.md)

---

## Getting Help

- **GitHub Issues**: https://github.com/Fused-Gaming/vln/issues
- **Team Contact**: info@vln.gg
- **Emergency Support**: emergency@vln.gg

---

**Last Updated:** January 2025
**Maintainer:** VLN Development Team
