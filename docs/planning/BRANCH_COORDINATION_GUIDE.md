# VLN Branch Coordination Guide

**Quick reference for parallel development workflow**

---

## 🎯 Current State (2026-02-25)

```
Branches:
  - main (protected)
  - integration/vln (active)
  - claude/phase-one-roadmap-izYQc (current - planning phase)

Starting Point:
  All new branches derived from: integration/vln
```

---

## 🚀 Launch Sequence

### Phase: Track C (Infrastructure Planning) — Days 1-7
**Priority:** ⚠️ **BLOCKER - START THIS FIRST**

```bash
# Step 1: Create Track C branch
git fetch origin
git checkout -b claude/infra-planning-izYQc origin/integration/vln

# Step 2: Execute Track C work (see PHASE_1_DEVELOPMENT_MAP.md PROMPT C)
# - Complete prisma/schema.prisma
# - Write API specification
# - Document email templates
# - Create ADRs

# Step 3: Merge to integration/vln
git push -u origin claude/infra-planning-izYQc
# Open PR to integration/vln
# Tag: [PRIORITY] Infrastructure Contracts
```

**Timeline:**
- Day 1-2: Schema design
- Day 3-4: API spec + email templates
- Day 5-6: ADRs + validation
- Day 7: Merge to integration/vln

**Blocker:** Track A & B cannot start until Track C merges ⚠️

---

### Phase: Track A + B (Parallel) — Days 8-21
**Can start simultaneously AFTER Track C merges**

```bash
# Track A: Phase 1 Infrastructure
git fetch origin integration/vln
git checkout -b claude/phase1-infra-izYQc origin/integration/vln

# Track B: Phase 2 Auth & Intake
git fetch origin integration/vln
git checkout -b claude/phase2-auth-izYQc origin/integration/vln
```

**Timeline (Parallel):**
- Day 8-10: Database setup (A) + Auth foundation (B)
- Day 11-14: Monitoring (A) + Forms & Upload (B)
- Day 15-18: Security scanning (A) + Email service (B)
- Day 19-21: Testing & cleanup on both
- Day 22: Both merge to integration/vln

---

## 📊 Branch Status Matrix

```
Branch                          Status      Base              Age     Merge Target
─────────────────────────────── ─────────── ─────────────── ─────── ───────────────
integration/vln                 ACTIVE      main            stable  main (future)
├─ claude/infra-planning-izYQc  READY       integration/vln  NEW     integration/vln ⚠️
├─ claude/phase1-infra-izYQc    PENDING     integration/vln  TBD     integration/vln
└─ claude/phase2-auth-izYQc     PENDING     integration/vln  TBD     integration/vln
```

**Legend:**
- `⚠️` = Blocking other work (highest priority)
- `READY` = Can start immediately
- `PENDING` = Waiting for dependencies
- `ACTIVE` = Primary integration branch
- `NEW` = Freshly created

---

## 🔀 Dependency Graph

```
                      ┌─────────────────────┐
                      │  Track C (Priority) │
                      │ Infra Planning      │
                      │ Days 1-7            │
                      └──────────┬──────────┘
                                 │ (must merge first)
                ┌────────────────┼────────────────┐
                │                │                │
           ┌────▼─────┐    ┌────▼─────┐    ┌────▼──────┐
           │ Track A   │    │ Track B   │    │ (Optional)│
           │ Phase 1   │    │ Phase 2   │    │           │
           │ Infra     │    │ Auth/Form │    │           │
           │ Days 8-21 │    │ Days 8-21 │    │           │
           └────┬─────┘    └────┬─────┘    └────┬───────┘
                │                │              │
                └────────────┬───┴──────────────┘
                             │
                    ┌────────▼─────────┐
                    │ integration/vln   │
                    │ (All merged here) │
                    └───────────────────┘
```

**Critical:** Track C gates Track A & B

---

## 📋 Daily Workflow for Each Track

### Track C (Infrastructure Planning)
**Each day during Days 1-7:**

```bash
# Morning: Update from main repo
git fetch origin
git pull origin integration/vln

# Work on assigned deliverables
# - prisma/schema.prisma
# - docs/technical/api-specification.md
# - docs/technical/email-templates.md
# - docs/technical/webhook-events.md
# - docs/technical/adr/*.md

# Evening: Commit progress
git add .
git commit -m "feat(schema): add user and audit models"
git push origin claude/infra-planning-izYQc

# When complete: Create PR to integration/vln
```

### Track A (Phase 1 Infrastructure)
**Each day during Days 8-21 (after Track C merges):**

```bash
# Morning: Sync with Track C
git fetch origin
git pull origin integration/vln

# Work on assigned deliverables
# - app/api/auth/session/route.ts
# - middleware.ts
# - .github/workflows/security-scan.yml
# - docs/technical/monitoring.md

# Afternoon: Run tests
pnpm test

# Evening: Commit progress
git add .
git commit -m "feat(infra): add database session middleware"
git push origin claude/phase1-infra-izYQc

# When complete: Create PR to integration/vln
```

### Track B (Phase 2 Auth & Intake)
**Each day during Days 8-21 (after Track C merges):**

```bash
# Morning: Sync with Track C
git fetch origin
git pull origin integration/vln

# Work on assigned deliverables
# - app/auth/login/page.tsx
# - app/api/auth/[...nextauth]/route.ts
# - components/forms/AuditIntakeForm.tsx
# - lib/email/templates.ts

# Afternoon: Test auth flows
pnpm test

# Evening: Commit progress
git add .
git commit -m "feat(auth): add email/password authentication"
git push origin claude/phase2-auth-izYQc

# When complete: Create PR to integration/vln
```

---

## ✅ Merge Checklist (Before Each PR)

**Required for ALL merges to integration/vln:**

```bash
# 1. Final sync with main branch
git fetch origin
git pull origin integration/vln

# 2. Verify build
pnpm build
# ✅ Must pass without warnings

# 3. Verify lint
pnpm lint
# ✅ Must pass

# 4. Verify tests
pnpm test
# ✅ Must pass with >80% coverage

# 5. Check for conflicts
# git merge integration/vln --no-commit (to verify no conflicts)

# 6. Verify security
npm audit --production
# ✅ No vulnerabilities

# 7. Create PR with conventional commit title
# Example: "feat(schema): add audit request and report models"

# 8. Verify CI passes on GitHub
# - Wait for GitHub Actions to pass
# - Get code review
# - Merge when ready
```

---

## 🔄 Post-Merge Sync Steps

**After Track C merges (before A & B start):**

```bash
# For both Track A and Track B leads:
git fetch origin
git checkout claude/phase1-infra-izYQc  # or phase2-auth-izYQc
git rebase origin/integration/vln

# Resolve any conflicts if needed
# Then continue work
```

**After Track A merges:**

```bash
# For Track B lead (to pick up DB schema):
git fetch origin
git rebase origin/integration/vln
# This brings in the schema changes for Track A
```

---

## 🚨 Conflict Resolution

**If conflicts occur during rebase:**

```bash
# 1. Identify conflict files
git status

# 2. Resolve conflicts manually
#    - Open conflicted files
#    - Choose correct version or merge both
#    - Save files

# 3. Continue rebase
git add .
git rebase --continue

# 4. If needed, abort and restart
git rebase --abort
# Then: git pull origin integration/vln
#       git merge --squash your-feature
```

---

## 📞 Communication Checklist

**Daily standup topics:**

- [ ] Track C: What % complete? Any blockers?
- [ ] Track A: DB setup on track? Monitoring progress?
- [ ] Track B: Auth flows working? File upload tests passing?
- [ ] Dependencies: Any integration issues between tracks?
- [ ] Merge conflicts: Any manual resolution needed?
- [ ] Timeline: Still on schedule for Days 1-21?

---

## 🎯 Success Criteria (By Track)

### Track C Complete ✅
- [ ] prisma/schema.prisma validates
- [ ] OpenAPI spec is complete
- [ ] Email templates documented
- [ ] All ADRs written
- [ ] Merged to integration/vln
- [ ] No blocking issues for A & B

### Track A Complete ✅
- [ ] Database migrations working
- [ ] Session middleware active
- [ ] Monitoring dashboard functional
- [ ] Security scanning CI/CD active
- [ ] pnpm build passes
- [ ] pnpm test >80% coverage
- [ ] Merged to integration/vln

### Track B Complete ✅
- [ ] Email/password auth functional
- [ ] OAuth flows tested
- [ ] Audit intake form submits
- [ ] File upload validated
- [ ] Email service delivering
- [ ] pnpm build passes
- [ ] pnpm test >80% coverage
- [ ] Merged to integration/vln

---

## 🔗 Quick Links

- [PHASE_1_DEVELOPMENT_MAP.md](./PHASE_1_DEVELOPMENT_MAP.md) — Full execution guide with prompts
- [PHASE_TRACKING.md](./PHASE_TRACKING.md) — Phase overview & status
- [EXECUTION_STRATEGY.md](./EXECUTION_STRATEGY.md) — Strategic rationale
- [CLAUDE.md](../../CLAUDE.md) — Project guidelines

---

**Status:** Ready to launch Track C
**Next Action:** Execute Track C using PROMPT C from PHASE_1_DEVELOPMENT_MAP.md
