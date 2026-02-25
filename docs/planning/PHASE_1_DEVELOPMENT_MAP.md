# VLN Phase 1 Development Map — Parallel Execution Guide
**Date:** 2026-02-25
**Branch Model:** integration-first with modular feature branches
**Approach:** 3 parallel agents with clear dependencies & merge strategy

---

## 🎯 Phase 1 Status & Goals

**Current:** 7/25 tasks complete (28%)
**Target:** 100% Phase 1 completion + Phase 2 v1.1.0 foundation
**Timeline:** ~4 weeks with parallel execution
**Result:** Production-ready distribution layer + auth/intake foundation

---

## 🔀 Branch Architecture

### Primary Branches
```
main (protected)
    └── integration/vln (active integration branch)
            ├── claude/phase1-infra-izYQc (Track A)
            ├── claude/phase2-auth-izYQc (Track B)
            └── claude/infra-planning-izYQc (Track C)
```

### Branch Naming Convention
- **Format:** `claude/<task-name>-izYQc`
- **Suffix:** `-izYQc` = session ID (REQUIRED for push auth)
- **Base:** All branches track from `integration/vln`
- **Merge:** To `integration/vln` after CI/CD passes

---

## 📊 Task Matrix & Dependencies

| Track | Focus | Dependencies | Blocker? | Estimated |
|-------|-------|--------------|----------|-----------|
| **Track A** | Phase 1 Infrastructure | Track C (schema) | No | 14 days |
| **Track B** | Phase 2 Auth & Intake | Track C (schema) | No | 14 days |
| **Track C** | Infrastructure Planning | None | ⚠️ **BLOCKER** | 7 days |

**⚠️ Critical Path:** Track C must complete first to unblock A & B

---

## 🚀 Track A: Phase 1 Infrastructure

**Goal:** Complete 18 remaining v0.11.0 tasks
**Branch:** `claude/phase1-infra-izYQc`
**Depends on:** Track C completion

### Deliverables
1. **Database Layer**
   - [ ] PostgreSQL Prisma schema foundation
   - [ ] Session/JWT token management
   - [ ] Migration setup & versioning

2. **Monitoring & Observability**
   - [ ] Error tracking (Sentry integration)
   - [ ] Performance analytics (Vercel Web Analytics)
   - [ ] Uptime monitoring & alerting setup

3. **Security Pipeline**
   - [ ] npm audit CI/CD automation
   - [ ] Semgrep SAST scanning
   - [ ] Dependency vulnerability scanning
   - [ ] Security scanning documentation

4. **CDN & Performance**
   - [ ] Vercel CDN configuration
   - [ ] Cache invalidation strategy
   - [ ] Performance baseline establishment

### Files to Create/Modify
```
prisma/
  └── schema.prisma (foundation)
app/api/
  ├── auth/session/route.ts (NEW)
  └── health/route.ts (NEW)
middleware.ts (NEW)
.github/workflows/
  ├── security-scan.yml (NEW)
  └── ci.yml (update)
docs/
  ├── technical/database.md (NEW)
  ├── technical/monitoring.md (NEW)
  └── technical/security.md (NEW)
```

### Success Criteria
- ✅ Build passes without warnings
- ✅ All tests pass (>80% coverage)
- ✅ Security scanning logs are clean
- ✅ Monitoring dashboard accessible
- ✅ Session flow tested end-to-end

### Acceptance PR Template
```markdown
## Phase 1 Infrastructure Completion

**Track:** A
**Branches:** integration/vln ← claude/phase1-infra-izYQc

### Deliverables
- [x] PostgreSQL + Prisma schema
- [x] Session management middleware
- [x] Error tracking (Sentry)
- [x] Performance analytics
- [x] Security scanning CI/CD
- [x] Documentation updated

### Test Coverage
- Lines: 85%
- Branches: 72%
- Functions: 80%

### Verification
- [x] `pnpm build` passes
- [x] `pnpm lint` passes
- [x] `pnpm test` passes
- [x] Security scan clean
```

---

## 🚀 Track B: Phase 2 v1.1.0 Auth & Intake

**Goal:** Build authentication system + audit intake form
**Branch:** `claude/phase2-auth-izYQc`
**Depends on:** Track C completion

### Deliverables

1. **Authentication System**
   - [ ] Email/password auth with NextAuth.js
   - [ ] OAuth integration (Google, GitHub)
   - [ ] Magic link authentication
   - [ ] Two-factor authentication (SMS/TOTP)
   - [ ] Session persistence & token refresh

2. **Audit Intake Pipeline**
   - [ ] Audit request form (UI)
   - [ ] Contract file upload & storage
   - [ ] Scope definition wizard
   - [ ] Form validation & error handling
   - [ ] Intake API endpoints (POST /api/audits/intake)

3. **Email Infrastructure**
   - [ ] Transactional email service (Resend/SendGrid)
   - [ ] Welcome email template
   - [ ] Audit confirmation email
   - [ ] Status notification emails
   - [ ] Email verification flow

4. **Internal Tracking**
   - [ ] Internal dashboard stub (view all audits)
   - [ ] Audit status tracking
   - [ ] Request prioritization logic

### Files to Create/Modify
```
app/auth/
  ├── login/page.tsx (NEW)
  ├── register/page.tsx (NEW)
  ├── magic-link/page.tsx (NEW)
  └── 2fa/page.tsx (NEW)
app/api/auth/
  ├── [...nextauth]/route.ts (NEW)
  ├── login/route.ts (NEW)
  ├── register/route.ts (NEW)
  └── verify/route.ts (NEW)
app/api/audits/
  └── intake/route.ts (NEW)
app/internal/
  └── audits/page.tsx (NEW)
components/forms/
  ├── LoginForm.tsx (NEW)
  ├── RegisterForm.tsx (NEW)
  ├── AuditIntakeForm.tsx (NEW)
  └── ScopeWizard.tsx (NEW)
lib/email/
  ├── templates.ts (NEW)
  └── client.ts (NEW)
```

### Success Criteria
- ✅ Build passes without warnings
- ✅ All tests pass (>80% coverage)
- ✅ OAuth flow tested end-to-end
- ✅ Email delivery verified (test inbox)
- ✅ File upload security verified (no code execution)
- ✅ Form validation comprehensive

### Acceptance PR Template
```markdown
## Phase 2 v1.1.0 — Auth & Audit Intake

**Track:** B
**Branches:** integration/vln ← claude/phase2-auth-izYQc

### Deliverables
- [x] NextAuth.js configuration
- [x] Email/password authentication
- [x] OAuth (Google, GitHub)
- [x] Magic links + 2FA
- [x] Audit intake form with file upload
- [x] Scope wizard
- [x] Transactional email service
- [x] Internal audit dashboard

### Security Verification
- [x] No file execution vulnerabilities
- [x] Password hashing (bcrypt)
- [x] CSRF protection enabled
- [x] Rate limiting on auth endpoints
- [x] Session tokens secure

### Test Coverage
- Lines: 82%
- Branches: 71%
- Functions: 79%

### Manual Testing
- [x] Email/password signup works
- [x] OAuth flow completes
- [x] Magic links deliver
- [x] File upload validates
- [x] Form errors display correctly
```

---

## 🚀 Track C: Infrastructure Planning (⚠️ START FIRST)

**Goal:** Design & document all infrastructure contracts
**Branch:** `claude/infra-planning-izYQc`
**Dependencies:** None (this unblocks A & B)

### Deliverables

1. **Complete Prisma Schema**
   - [ ] User & auth models
   - [ ] Audit & request models
   - [ ] Report & findings models
   - [ ] Payment & billing models
   - [ ] Relationships & constraints
   - [ ] Indexes for performance

2. **API Contract Specification**
   - [ ] OpenAPI 3.1 spec (api.json)
   - [ ] Auth endpoints documented
   - [ ] Audit endpoints documented
   - [ ] Client portal API documented
   - [ ] Rate limiting rules
   - [ ] Error response format

3. **Email & Notification Design**
   - [ ] Email template registry
   - [ ] Webhook event catalog
   - [ ] Notification types & triggers
   - [ ] Rate limiting for emails

4. **Architecture Decisions**
   - [ ] Database design doc
   - [ ] Authentication flow diagram
   - [ ] File upload security model
   - [ ] API versioning strategy

### Files to Create/Modify
```
prisma/
  └── schema.prisma (COMPREHENSIVE)
docs/technical/
  ├── api-specification.md (NEW)
  ├── database-design.md (NEW)
  ├── email-templates.md (NEW)
  ├── webhook-events.md (NEW)
  ├── adr-001-auth-strategy.md (NEW)
  └── adr-002-file-storage.md (NEW)
lib/
  └── api-types.ts (NEW - shared types)
```

### Success Criteria
- ✅ Schema covers all Phase 1-3 features
- ✅ API spec is complete & Swagger-compliant
- ✅ Email templates documented
- ✅ No breaking changes from v0.11.0
- ✅ All relationships validated
- ✅ Performance indexes identified

### Acceptance PR Template
```markdown
## Infrastructure Planning & Contracts

**Track:** C
**Branches:** integration/vln ← claude/infra-planning-izYQc

### Deliverables
- [x] Complete Prisma schema (users, audits, payments, reports)
- [x] OpenAPI 3.1 specification
- [x] Email template registry
- [x] Webhook event catalog
- [x] Architecture decision records
- [x] Database design documentation

### Design Validation
- [x] Schema reviewed for correctness
- [x] Relationships validated
- [x] Performance indexes identified
- [x] No circular dependencies
- [x] Consistent naming conventions

### Documentation Quality
- [x] API endpoints documented
- [x] Email types explained
- [x] Webhook payloads defined
- [x] Examples provided for all endpoints
```

---

## 📋 Execution Timeline

### Week 1: Track C (Unblocking)
```
Mon 2/25: Start Track C infrastructure planning
Wed 2/27: Track C 50% complete (schema drafted)
Fri 3/01: Track C complete & merged to integration/vln
```

### Week 2-3: Parallel Tracks A & B
```
Fri 3/01: Start Track A & B simultaneously
       A: Database + sessions + monitoring setup
       B: Auth system + form components
Mon 3/10: Track A 50%, Track B 50%
```

### Week 4: Completion & Integration
```
Mon 3/17: Track A complete, merged
Wed 3/19: Track B complete, merged
Fri 3/22: Phase 1 complete, Phase 2 v1.1.0 foundation ready
```

---

## 🎯 Parallel Agent Prompts

### PROMPT A: Phase 1 Infrastructure Completion
**Use this to launch Track A agent**

```
You are responsible for completing Phase 1 (v0.11.0) infrastructure.

SCOPE:
Your work encompasses 18 remaining Phase 1 tasks grouped into 4 pillars:

1. DATABASE LAYER
   - Create PostgreSQL schema in prisma/schema.prisma
   - Include foundational models: User, Session, Audit, Report
   - Set up migration infrastructure
   - Add proper indexes for performance

2. MONITORING & OBSERVABILITY
   - Integrate Sentry for error tracking
   - Set up Vercel Web Analytics
   - Create monitoring dashboard documentation
   - Add uptime monitoring configuration

3. SECURITY PIPELINE
   - Create .github/workflows/security-scan.yml
   - Automate npm audit in CI/CD
   - Configure Semgrep SAST scanning
   - Add dependency vulnerability scanning
   - Document security processes

4. CDN & PERFORMANCE
   - Configure Vercel CDN settings
   - Define cache invalidation strategy
   - Establish performance baseline (Lighthouse >85)
   - Document performance budget

BRANCH STRATEGY:
- Work on: claude/phase1-infra-izYQc
- Base: integration/vln
- Depends on: Track C (infrastructure planning) must be merged first

DELIVERABLES:
1. prisma/schema.prisma with complete database design
2. middleware.ts for session management
3. app/api/auth/session/route.ts for token validation
4. .github/workflows/security-scan.yml
5. docs/technical/{database,monitoring,security}.md
6. Updated PHASE_TRACKING.md marking Track A complete

FILES TO CREATE:
- prisma/schema.prisma
- app/api/auth/session/route.ts
- app/api/health/route.ts
- middleware.ts
- .github/workflows/security-scan.yml
- docs/technical/database.md
- docs/technical/monitoring.md
- docs/technical/security.md

SUCCESS CRITERIA:
✅ pnpm build passes without warnings
✅ pnpm lint passes
✅ pnpm test passes (>80% coverage)
✅ npm audit runs in CI/CD with no vulnerabilities
✅ Semgrep scan completes
✅ Session middleware tested
✅ All database relationships validated
✅ Performance baseline documented

COMMIT MESSAGE TEMPLATE:
Use conventional commits:
- feat(infra): add PostgreSQL schema and session management
- feat(monitoring): integrate Sentry and analytics
- feat(security): automate npm audit and Semgrep scanning
- docs(technical): database and monitoring documentation

AFTER COMPLETION:
1. Run pnpm build to verify no errors
2. Run pnpm test to verify coverage >80%
3. Commit with conventional message
4. Push to claude/phase1-infra-izYQc with: git push -u origin claude/phase1-infra-izYQc
5. Create PR to integration/vln
```

### PROMPT B: Phase 2 v1.1.0 Authentication & Audit Intake
**Use this to launch Track B agent**

```
You are responsible for implementing Phase 2 v1.1.0 (Operationalize Audits).

SCOPE:
Your work encompasses authentication, audit intake, and email infrastructure:

1. AUTHENTICATION SYSTEM (NextAuth.js)
   - Email/password registration & login
   - OAuth integration (Google, GitHub)
   - Magic link authentication
   - Two-factor authentication (SMS/TOTP)
   - Session management & token refresh
   - Secure password hashing (bcrypt)

2. AUDIT INTAKE PIPELINE
   - Create audit request form (React component)
   - Implement contract file upload & validation
   - Build scope definition wizard
   - Form validation & error handling
   - POST /api/audits/intake endpoint

3. EMAIL INFRASTRUCTURE
   - Set up transactional email service (Resend or SendGrid)
   - Create email templates:
     * Welcome email
     * Audit confirmation
     * Status updates
     * Verification emails
   - Implement email sending logic

4. INTERNAL TRACKING DASHBOARD
   - Create /app/internal/audits/page.tsx
   - Display all audit requests
   - Show audit status and timeline
   - Request prioritization interface

BRANCH STRATEGY:
- Work on: claude/phase2-auth-izYQc
- Base: integration/vln
- Depends on: Track C (infrastructure planning) must be merged first
- Wait for: Track A DB schema before implementing endpoints

DELIVERABLES:
1. NextAuth.js configuration (app/api/auth/[...nextauth]/route.ts)
2. Auth pages: login, register, magic-link, 2fa
3. Auth forms with validation
4. Audit intake form with file upload
5. Scope wizard component
6. POST /api/audits/intake endpoint
7. Email service client & templates
8. Internal audit dashboard
9. Comprehensive tests

FILES TO CREATE:
Auth System:
- app/auth/login/page.tsx
- app/auth/register/page.tsx
- app/auth/magic-link/page.tsx
- app/auth/2fa/page.tsx
- app/api/auth/[...nextauth]/route.ts
- app/api/auth/login/route.ts
- app/api/auth/register/route.ts
- app/api/auth/verify/route.ts

Forms & Components:
- components/forms/LoginForm.tsx
- components/forms/RegisterForm.tsx
- components/forms/AuditIntakeForm.tsx
- components/forms/ScopeWizard.tsx

Email & API:
- app/api/audits/intake/route.ts
- lib/email/client.ts
- lib/email/templates.ts

Dashboard:
- app/internal/audits/page.tsx
- components/internal/AuditList.tsx

Tests:
- __tests__/auth.test.ts
- __tests__/audit-intake.test.ts

SUCCESS CRITERIA:
✅ pnpm build passes without warnings
✅ pnpm lint passes
✅ pnpm test passes (>80% coverage)
✅ Email/password signup flow works end-to-end
✅ OAuth flow tested (Google & GitHub)
✅ Magic link email delivers and validates
✅ 2FA setup and verification works
✅ File upload validates security (no code execution)
✅ Audit intake form submits to database
✅ Internal dashboard displays all audits
✅ All rate limiting in place

SECURITY REQUIREMENTS:
✅ Passwords hashed with bcrypt (min 12 rounds)
✅ CSRF protection enabled
✅ Rate limiting on auth endpoints (5 attempts/min)
✅ File upload validated (whitelist extensions)
✅ File size limits enforced
✅ SQL injection prevention (use Prisma)
✅ XSS protection (React escaping + CSP)
✅ Secure session cookies (HttpOnly, Secure, SameSite)

COMMIT MESSAGE TEMPLATE:
Use conventional commits:
- feat(auth): add email/password authentication with NextAuth
- feat(auth): add OAuth integration (Google, GitHub)
- feat(auth): add magic link and 2FA support
- feat(forms): add audit intake form with file upload
- feat(email): add transactional email service
- feat(internal): add audit request tracking dashboard
- test(auth): comprehensive authentication tests

AFTER COMPLETION:
1. Verify all auth flows work manually
2. Test email delivery (Resend sandbox or test inbox)
3. Verify file upload security
4. Run pnpm build to verify no errors
5. Run pnpm test to verify coverage >80%
6. Commit with conventional message
7. Push to claude/phase2-auth-izYQc with: git push -u origin claude/phase2-auth-izYQc
8. Create PR to integration/vln
```

### PROMPT C: Infrastructure Planning & Contracts
**Use this to launch Track C agent (⚠️ START THIS FIRST)**

```
You are responsible for designing infrastructure contracts & documentation.

SCOPE:
Your work is the foundation for Tracks A & B. Complete this FIRST.

1. COMPLETE PRISMA SCHEMA (prisma/schema.prisma)
   Must include models for:
   - User (auth, profile, roles)
   - Session (JWT, tokens)
   - Audit (requests, scope, metadata)
   - Report (findings, vulnerability details)
   - Payment (invoices, subscriptions, pricing)
   - Relationships between all models
   - Proper indexes for queries
   - Constraints & validations

2. API CONTRACT SPECIFICATION (OpenAPI 3.1)
   - Complete OpenAPI spec in docs/technical/api-specification.md
   - Document endpoints:
     * POST /api/auth/register
     * POST /api/auth/login
     * POST /api/audits/intake
     * GET /api/audits/{id}
     * GET /api/audits (list)
   - Include request/response schemas
   - Error codes and messages
   - Rate limiting rules
   - Pagination strategy

3. EMAIL & NOTIFICATION DESIGN
   - Email template registry in docs/technical/email-templates.md
   - Webhook event catalog in docs/technical/webhook-events.md
   - Templates: welcome, confirmation, status updates, errors

4. ARCHITECTURE DECISIONS
   - ADR-001: Authentication strategy (doc why NextAuth vs Auth0 etc)
   - ADR-002: File storage approach (S3 vs Vercel Blob)
   - ADR-003: Email service (Resend vs SendGrid)
   - ADR-004: Database design patterns
   - ADR-005: API versioning approach

BRANCH STRATEGY:
- Work on: claude/infra-planning-izYQc
- Base: integration/vln
- No dependencies (this unblocks everything)
- Complete this FIRST before A & B start

DELIVERABLES:
1. prisma/schema.prisma (comprehensive, production-ready)
2. docs/technical/database-design.md
3. docs/technical/api-specification.md
4. docs/technical/email-templates.md
5. docs/technical/webhook-events.md
6. docs/technical/adr/
   - adr-001-authentication-strategy.md
   - adr-002-file-storage.md
   - adr-003-email-service.md
   - adr-004-database-design.md
   - adr-005-api-versioning.md
7. lib/api-types.ts (shared TypeScript types)

KEY SCHEMA MODELS:
User:
  - id, email, password_hash, name, role, created_at, updated_at
  - hasMany: Session, AuditRequest, Reports

Session:
  - id, user_id, token, refresh_token, expires_at, created_at

AuditRequest:
  - id, user_id, project_name, description, scope, status, created_at
  - hasMany: Files, Reports

File:
  - id, audit_id, filename, size, storage_path, uploaded_at

Report:
  - id, audit_id, status, findings_count, severity_distribution, created_at

Payment:
  - id, user_id, amount, status, invoice_id, created_at

SUCCESS CRITERIA:
✅ Schema validates in Prisma
✅ All Phase 1-3 features supported
✅ No circular dependencies
✅ Proper indexes for common queries
✅ API spec is Swagger/OpenAPI compliant
✅ Email templates documented with variables
✅ ADRs explain design decisions
✅ No breaking changes from v0.11.0
✅ Consistent naming conventions
✅ All relationships have proper constraints

DESIGN VALIDATION:
✅ Run: npx prisma validate
✅ Schema has proper migrations setup
✅ Cascade delete properly configured
✅ Unique constraints where needed
✅ Indexes on foreign keys

COMMIT MESSAGE TEMPLATE:
Use conventional commits:
- feat(schema): add comprehensive Prisma schema for phases 1-3
- docs(api): add OpenAPI specification
- docs(email): define email template registry
- docs(adr): add architecture decision records
- feat(types): add shared API type definitions

AFTER COMPLETION:
1. Validate schema: npx prisma validate
2. Run pnpm build to verify TypeScript
3. Commit with conventional message
4. Push to claude/infra-planning-izYQc with: git push -u origin claude/infra-planning-izYQc
5. Create PR to integration/vln with tag: [BLOCKER - MERGE FIRST]
```

---

## 🔄 Merge & Integration Strategy

### Critical Path
```
Track C (Infrastructure)
    ↓ (must complete & merge first)
┌───┴────────────────────┐
│                        │
Track A (Infra)    Track B (Auth)
│                        │
└───┬────────────────────┘
    ↓ (both merge to integration/vln)
integration/vln (active)
    ↓ (after testing)
main (production) ← FUTURE RELEASE
```

### Merge Checklist
**Before merging any track to `integration/vln`:**

- [ ] PR based on `integration/vln`
- [ ] Build passes: `pnpm build`
- [ ] Lint passes: `pnpm lint`
- [ ] Tests pass: `pnpm test` (>80% coverage)
- [ ] No security vulnerabilities
- [ ] Conventional commit message
- [ ] Documentation updated
- [ ] No conflicts with other tracks
- [ ] Reviewer approval

### Post-Merge Steps
```bash
# After Track C merges:
git checkout integration/vln
git pull origin integration/vln
git checkout claude/phase1-infra-izYQc
git rebase integration/vln  # Sync with Track C

git checkout claude/phase2-auth-izYQc
git rebase integration/vln  # Sync with Track C
```

---

## 📊 Progress Tracking

### Update PHASE_TRACKING.md After Each Track Completion

**After Track C:**
```markdown
| Phase 1 | Contracts & Planning | ✅ Complete | 25 | 8/25 |
```

**After Track A:**
```markdown
| Phase 1 | Infrastructure | ✅ Complete | 25 | 16/25 |
```

**After Track B:**
```markdown
| Phase 1 | Infrastructure + Auth | ✅ Complete* | 25 | 25/25 |
| Phase 2 | v1.1.0 Foundation | ✅ Ready | 32 | 10/32 |
```

---

## 🎯 Success Metrics

### Code Quality
- Build: ✅ Zero warnings
- Lint: ✅ ESLint passes
- Tests: ✅ >80% coverage
- Security: ✅ No vulnerabilities

### Documentation
- API: ✅ Complete OpenAPI spec
- Database: ✅ Schema documented
- Email: ✅ Templates documented
- Architecture: ✅ ADRs written

### Deliverables
- Track A: ✅ Database + Monitoring complete
- Track B: ✅ Auth + Intake complete
- Track C: ✅ Contracts + Specs complete

---

## 🚀 Quick Start Commands

### Launch Track C First (Infrastructure Planning)
```bash
git fetch origin
git checkout -b claude/infra-planning-izYQc origin/integration/vln
# Start with PROMPT C above
```

### Then Launch Track A (Phase 1 Infrastructure)
```bash
git fetch origin
git checkout -b claude/phase1-infra-izYQc origin/integration/vln
# Start with PROMPT A above
# Wait for Track C to merge first
```

### Then Launch Track B (Phase 2 Auth & Intake)
```bash
git fetch origin
git checkout -b claude/phase2-auth-izYQc origin/integration/vln
# Start with PROMPT B above
# Wait for Track C to merge first
```

---

## 📞 Coordination Checklist

- [ ] Track C starts immediately
- [ ] Track C completes & merges within 7 days
- [ ] Track A & B start after Track C merges
- [ ] Track A & B run in parallel (no blocking)
- [ ] Both A & B complete within 14-21 days
- [ ] Final integration testing before production
- [ ] Update PHASE_TRACKING.md with completion status
- [ ] Tag release v0.11.0 after Phase 1 complete
- [ ] Begin Phase 2 sprint planning

---

## 📝 References

- [PHASE_TRACKING.md](./PHASE_TRACKING.md) — Full roadmap
- [EXECUTION_STRATEGY.md](./EXECUTION_STRATEGY.md) — Strategic rationale
- [CLAUDE.md](../../CLAUDE.md) — Project guidelines
- GitHub Issues: [#64](https://github.com/Fused-Gaming/vln/issues/64)

---

**Next Action:** Launch Track C agent with PROMPT C above.
