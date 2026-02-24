---
title: CI/CD Pipeline
description: Continuous Integration and Deployment Setup
---

VLN uses GitHub Actions for automated testing, linting, and deployment across all environments.

## Pipeline Stages

1. **Lint & Type Check** — ESLint, TypeScript compiler
2. **Build** — Next.js production build
3. **Security Audit** — npm audit, secret scanning
4. **Test** — Vitest unit tests, Playwright E2E tests
5. **Deploy** — Vercel production or preview deployment

## Key Workflows

- `ci.yml` — Main CI pipeline (lint, typecheck, build)
- `deploy.yml` — Automatic deploy to Vercel on main push
- `preview.yml` — PR preview environment deployment
- `security-scan.yml` — SAST and dependency scanning

## Performance Budgets

- Lighthouse score > 85
- LCP < 2.5s
- Bundle size monitored

*Detailed CI/CD configuration and best practices are being migrated from the DevOps repository.*
