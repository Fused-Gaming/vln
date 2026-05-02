# 05 — Timeline

**Document:** VLN-2026-PCC-001-TL  
**Version:** 1.0.0  
**Status:** Final  
**Date:** 2026-04-28  
**Classification:** Confidential

---

## Engagement Calendar

**Start Date:** 2026-05-12 (pending contract execution and access provisioning)  
**End Date:** 2026-06-20 (primary engagement)  
**Re-test Window:** 2026-06-20 – 2026-07-20 (conditional)  
**Total Duration:** 6 weeks

---

## Phase Timeline

```
WEEK  DATE RANGE     PHASE                  MILESTONE
────  ───────────    ─────────────────────  ─────────────────────────────
  1   05-12/05-16   Discovery              Threat model complete
  2   05-19/05-23   Platform Testing       API & auth coverage
  3   05-26/05-30   Platform + Wallets     Wallet flow model delivered
  4   06-02/06-06   Smart Contracts (I)    Automated analysis complete
  5   06-09/06-13   Smart Contracts (II)   SC report delivered
  6   06-16/06-20   Reporting              Final platform report delivered
```

---

## Detailed Week-by-Week Plan

### Week 1 — Discovery (05-12 to 05-16)

| Day | Activity |
|-----|----------|
| Mon 05-12 | Kickoff call, access provisioning verification, environment setup |
| Tue 05-13 | Architecture documentation review, dependency inventory |
| Wed 05-14 | STRIDE threat modeling session (2h call with PeraltaCC engineering) |
| Thu 05-15 | Attack surface enumeration, risk register creation |
| Fri 05-16 | Week 1 status report, Phase 2 attack plan finalization |

### Week 2 — API & Platform Testing (05-19 to 05-23)

| Day | Activity |
|-----|----------|
| Mon 05-19 | Authentication testing (JWT, OAuth, session) |
| Tue 05-20 | Authorization and IDOR testing |
| Wed 05-21 | Input validation and injection testing |
| Thu 05-22 | Rate limiting and abuse prevention |
| Fri 05-23 | RNG subsystem initial review |

### Week 3 — RNG + Wallet Flow (05-26 to 05-30)

| Day | Activity |
|-----|----------|
| Mon 05-26 | RNG entropy and seed analysis |
| Tue 05-27 | Outcome statistical sampling |
| Wed 05-28 | Transaction graph construction |
| Thu 05-29 | Cluster analysis and sybil modeling |
| **Fri 05-30** | **Wallet Flow Risk Model (D3) delivered** |

### Week 4 — Smart Contracts: Automated Analysis (06-02 to 06-06)

| Day | Activity |
|-----|----------|
| Mon 06-02 | Slither + Semgrep automated sweep |
| Tue 06-03 | Echidna fuzzing setup and execution |
| Wed 06-04 | Manticore symbolic execution on critical paths |
| Thu 06-05 | Result triage, false-positive removal |
| Fri 06-06 | Automated findings documented; manual review begins |

### Week 5 — Smart Contracts: Manual Review + PoC (06-09 to 06-13)

| Day | Activity |
|-----|----------|
| Mon 06-09 | Access control + upgrade mechanism review |
| Tue 06-10 | Reentrancy + flash loan surface analysis |
| Wed 06-11 | Oracle dependency and MEV exposure |
| Thu 06-12 | PoC development for Critical/High findings |
| **Fri 06-13** | **Smart Contract Audit Report (D2) delivered** |

### Week 6 — Final Reporting (06-16 to 06-20)

| Day | Activity |
|-----|----------|
| Mon 06-16 | Platform report draft — executive and findings sections |
| Tue 06-17 | Risk heat map, remediation matrix, appendices |
| Wed 06-18 | Internal QA review |
| Thu 06-19 | Draft submitted to PeraltaCC for review |
| **Fri 06-20** | **Platform Security Audit Report (D1) + Remediation Tracker (D4) delivered** |

---

## Milestone Summary

| # | Milestone | Date | Owner |
|---|-----------|------|-------|
| M1 | Engagement kickoff | 2026-05-12 | Both |
| M2 | Access provisioned and verified | 2026-05-12 | PeraltaCC |
| M3 | Threat model complete | 2026-05-16 | VLN |
| M4 | Wallet Flow Risk Model delivered | 2026-05-30 | VLN |
| M5 | SC automated analysis complete | 2026-06-06 | VLN |
| M6 | Smart Contract Audit Report delivered | 2026-06-13 | VLN |
| M7 | Platform Security Audit Report delivered | 2026-06-20 | VLN |
| M8 | Remediation window opens | 2026-06-20 | PeraltaCC |
| M9 | Re-test request deadline | 2026-07-06 | PeraltaCC |
| M10 | Re-test report delivered (conditional) | 2026-07-20 | VLN |

---

## Dependencies & Risks

| Risk | Likelihood | Mitigation |
|------|------------|-----------|
| Access provisioning delayed | Medium | Begin architecture review with available docs |
| Staging environment instability | Low | Request dedicated test instance |
| Critical finding requiring emergency stop | Low | Defined escalation path in RoE |
| Scope expansion during engagement | Medium | Change order process with 3-day notice |

---

*Document continues in [06 — Pricing & Retainer](./06-pricing.md)*
