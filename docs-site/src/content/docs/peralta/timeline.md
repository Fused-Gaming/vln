---
title: Timeline
description: Six-week phased engagement calendar with week-by-week activities and milestone dates for the PeraltaCC security audit.
sidebar:
  order: 6
lastUpdated: true
---

# Timeline

**Reference:** VLN-2026-PCC-001-TL | **Start:** 2026-05-12 | **End:** 2026-06-20

---

## Engagement Calendar

| Week | Dates | Phase | Milestone |
|------|-------|-------|-----------|
| 1 | 05-12 – 05-16 | Discovery | Threat model complete |
| 2 | 05-19 – 05-23 | Platform Testing | API & auth coverage |
| 3 | 05-26 – 05-30 | Platform + Wallets | **D3: Wallet Flow Model delivered** |
| 4 | 06-02 – 06-06 | Smart Contracts (I) | Automated analysis complete |
| 5 | 06-09 – 06-13 | Smart Contracts (II) | **D2: SC Audit Report delivered** |
| 6 | 06-16 – 06-20 | Reporting | **D1 + D4: Final reports delivered** |

---

## Week-by-Week Detail

### Week 1 — Discovery

- Kickoff call, access provisioning verification
- Architecture documentation review
- STRIDE threat modeling session (2h call)
- Attack surface enumeration, risk register

### Week 2 — API & Platform Testing

- Authentication (JWT, OAuth, session)
- Authorization and IDOR
- Input validation and injection
- Rate limiting and abuse prevention
- RNG subsystem initial review

### Week 3 — RNG + Wallet Flow

- RNG entropy and seed analysis
- Outcome statistical sampling
- Transaction graph construction
- Cluster analysis and sybil modeling
- **Wallet Flow Risk Model (D3) delivered — 2026-05-30**

### Week 4 — Smart Contracts: Automated Analysis

- Slither + Semgrep automated sweep
- Echidna fuzzing setup and execution
- Manticore symbolic execution
- Result triage, false-positive removal

### Week 5 — Smart Contracts: Manual Review + PoC

- Access control + upgrade mechanism review
- Reentrancy + flash loan surface analysis
- Oracle dependency and MEV exposure
- PoC development for Critical/High findings
- **Smart Contract Audit Report (D2) delivered — 2026-06-13**

### Week 6 — Final Reporting

- Platform report: executive and findings sections
- Risk heat map, remediation matrix
- Internal QA review
- Draft submitted for PeraltaCC review
- **Platform Security Audit Report (D1) + Remediation Tracker (D4) — 2026-06-20**

---

## Milestone Summary

| # | Milestone | Date | Owner |
|---|-----------|------|-------|
| M1 | Engagement kickoff | 2026-05-12 | Both |
| M2 | Access provisioned | 2026-05-12 | PeraltaCC |
| M3 | Threat model complete | 2026-05-16 | VLN |
| M4 | Wallet Flow Model delivered | 2026-05-30 | VLN |
| M5 | SC automated analysis complete | 2026-06-06 | VLN |
| M6 | SC Audit Report delivered | 2026-06-13 | VLN |
| M7 | Platform Audit Report delivered | 2026-06-20 | VLN |
| M8 | Re-test request deadline | 2026-07-06 | PeraltaCC |
| M9 | Re-test report (conditional) | 2026-07-20 | VLN |

---

*Next: [Pricing & Retainer](/peralta/pricing)*
