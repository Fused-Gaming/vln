# VLN.gg

> **iGaming Security & Smart Contract Intelligence**

Enterprise-grade security consulting, RNG analysis, wallet-flow risk modeling, and EVM smart contract auditing for high-risk, high-throughput gaming systems.

**Powered by Fused Gaming**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-MVP-yellow.svg)]()

---

## Overview

**VLN** (Vulnerability Lab Network) provides elite, mathematically-rigorous threat modeling and exploit detection for gaming and EVM ecosystems. Our platform delivers advanced security services specifically tailored for iGaming platforms, DeFi protocols, and blockchain-based gaming infrastructure.

### Core Services

- **Platform Security Audits** — Comprehensive application security assessments
- **RNG Analysis** — Statistical validation and cryptographic review of random number generators
- **Wallet Flow Risk Modeling** — Transaction pattern analysis and fraud detection
- **EVM Smart Contract Auditing** — Solidity/Vyper security audits with formal verification
- **Technical Advisory** — Ongoing security consultation and threat intelligence

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 with App Router |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS |
| **UI Components** | Shadcn/UI + Custom VLN Components |
| **Database** | PostgreSQL via Prisma *(planned)* |
| **Authentication** | NextAuth.js *(planned)* |
| **Payments** | Stripe *(planned)* |
| **Package Manager** | pnpm |
| **Deployment** | Vercel (Primary), GitHub Actions (CI/CD) |

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or higher
- **pnpm** 8.0 or higher
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Fused-Gaming/vln.git
cd vln

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Production build (required before PR merge)
pnpm start    # Run production build locally
pnpm lint     # Run ESLint checks
pnpm test     # Run unit and integration tests
```

---

## Project Structure

```
vln/
├── app/                      # Next.js App Router
│   ├── (site)/              # Marketing and landing pages
│   ├── services/            # Service offering pages
│   ├── contact/             # Contact and booking
│   ├── api/                 # Serverless API endpoints
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # Shadcn-based components
│   ├── vln/                 # Custom VLN brand components
│   └── icons/               # Icon components
├── lib/
│   ├── utils/               # Utility functions
│   ├── validation/          # Input validation
│   └── email/               # Email utilities
├── public/                  # Static assets
├── docs/                    # Project documentation
│   ├── design/             # Design specs and mockups
│   ├── devops/             # DevOps configurations
│   ├── planning/           # Project planning
│   ├── technical/          # Technical documentation
│   └── guides/             # Usage guides
├── .github/
│   └── workflows/          # CI/CD workflows
└── tests/                   # Test files
```

---

## Development Workflow

VLN follows the **Fused Gaming integration-first branching model**.

### Branch Structure

- `main` — Production (protected)
- `integration/vln` — Active integration branch

### Creating a Feature Branch

```bash
# Start from integration branch
git checkout integration/vln
git pull origin integration/vln

# Create feature branch
git checkout -b feature/<short-name>

# Make changes and commit
git add .
git commit -m "feat(vln): add feature description"

# Ensure build passes
pnpm build

# Push and create PR
git push -u origin feature/<short-name>
```

### Pull Request Requirements

- **Base branch:** `integration/vln` (NOT `main`)
- Successful build (`pnpm build` passes)
- Lint checks pass (`pnpm lint`)
- Conventional commit title
- Tests pass (when applicable)

### Commit Convention

We use Conventional Commits:

```
feat(scope): add new feature
fix(scope): bug fix
docs: documentation update
chore: maintenance tasks
test: add/update tests
refactor: code refactoring
style: formatting changes
perf: performance improvements
```

**Examples:**
- `feat(vln): add audit request form`
- `fix(api): correct payload validation`
- `docs: update README installation steps`

---

## Documentation

Comprehensive documentation is available in the [`docs/`](docs/) directory:

- **[CLAUDE.md](CLAUDE.md)** — AI assistance guidelines for this project
- **[BRANDING.md](BRANDING.md)** — VLN brand guidelines and design system
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Contribution guidelines
- **[SECURITY.md](SECURITY.md)** — Security policy and vulnerability reporting
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — Community standards
- **[CHANGELOG.md](CHANGELOG.md)** — Version history

---

## Design System

VLN uses a carefully crafted design system optimized for high-trust, professional security consulting.

### Color Palette

```css
--vln-bg: #0f0f0f;           /* Matte Charcoal */
--vln-sage: #a6c3a7;          /* Sage Green (Accent 1) */
--vln-bluegray: #aab7c8;      /* Warm Blue-Gray (Accent 2) */
--vln-accent: var(--vln-sage);
--vln-glow: #a6c3a7;          /* Soft glow effect */
```

### Typography

- **Primary:** Inter
- **Monospace:** JetBrains Mono (for code/technical content)

### Design Principles

- High-trust, professional aesthetic
- Research lab feel (no neon/cyberpunk)
- Accessibility-first (WCAG AA compliance)
- Motion used sparingly for clarity

For complete design specifications, see [BRANDING.md](BRANDING.md).

---

## MVP Roadmap

### Track 1: Brand & Web Foundation (Current)
- [x] Brand identity and design system
- [x] Documentation framework
- [ ] Homepage
- [ ] Services pages
- [ ] Contact and booking interface
- [ ] Header and footer components

### Track 2: Security Pipeline
- [ ] Audit intake API
- [ ] Booking/retainer workflow
- [ ] Advisory index
- [ ] Report delivery system

### Track 3: CI/CD Automation
- [ ] Automated testing pipeline
- [ ] Security scanning (SAST, dependency audits)
- [ ] Preview deployments
- [ ] Auto-versioning

### Track 4: Database & Authentication
- [ ] Client portal
- [ ] Report storage
- [ ] Secure document delivery
- [ ] User authentication system

---

## Testing

VLN maintains rigorous testing standards:

### Coverage Requirements

```
Lines:      80%
Branches:   70%
Functions:  75%
```

### Testing Tools

- **Unit Tests:** Vitest
- **E2E Tests:** Playwright
- **Linting:** ESLint with TypeScript
- **Type Checking:** TypeScript strict mode

Run tests:

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Generate coverage report
pnpm test:e2e          # End-to-end tests
```

---

## Deployment

### Production

- **Platform:** Vercel
- **Branch:** `main`
- **Domain:** vln.gg (configured in Vercel)

### Preview Environments

Pull requests automatically deploy preview environments for testing.

### Environment Variables

Required environment variables (see `.env.example`):

```env
DATABASE_URL=""
NEXTAUTH_SECRET=""
EMAIL_SERVER=""
EMAIL_FROM=""
STRIPE_KEY=""
```

---

## Security

VLN takes security seriously. For our security policy and vulnerability reporting process, see [SECURITY.md](SECURITY.md).

### Responsible Disclosure

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security findings to: **security@vln.gg**
3. Include detailed reproduction steps
4. Allow 90 days for response and remediation

---

## Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Pull request process
- Coding standards
- Testing requirements

---

## Community & Support

- **Website:** [vln.gg](https://vln.gg)
- **Documentation:** [docs/](docs/)
- **Issues:** [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)

---

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

```
Copyright 2025 Fused Gaming

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```

---

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)

---

**VLN.gg** — *Elite security for the next generation of gaming infrastructure.*
