---
title: Deliverables
description: Complete list of audit reports, artifacts, and delivery schedule for the PeraltaCC security engagement.
sidebar:
  order: 5
lastUpdated: true
---

# Deliverables

**Reference:** VLN-2026-PCC-001-DEL | **Version:** 1.0.0

---

## Deliverable Package

| ID | Deliverable | Format | Delivery |
|----|-------------|--------|---------|
| D1 | Platform Security Audit Report | PDF + Markdown | End of Week 6 |
| D2 | Smart Contract Audit Report | PDF + Markdown | End of Week 5 |
| D3 | Wallet Flow Risk Model | PDF + Dune dashboard | End of Week 3 |
| D4 | Remediation Tracker | GitHub Issues + CSV | With D1 |
| D5 | Re-test Report (conditional) | PDF addendum | Post-remediation |

---

## D1 — Platform Security Audit Report

**Contents:**
- Executive summary (board-level, non-technical)
- Threat model diagram
- Full findings list with CVSS scores
- Per-finding technical writeup (description, impact, PoC, remediation)
- Risk heat map
- Remediation priority matrix
- Appendix: tool output, raw scan results

**Target length:** 40–80 pages

---

## D2 — Smart Contract Audit Report

**Contents:**
- Contract-by-contract coverage summary
- Automated analysis results (deduplicated)
- Manual audit findings with annotated code snippets
- PoC exploit scripts for Critical/High findings (Foundry format)
- Gas optimization recommendations

**Target length:** 30–60 pages

---

## D3 — Wallet Flow Risk Model

**Contents:**
- Transaction graph visualization
- Cluster analysis results (sybil candidates, anonymized)
- Wash-trading signal strength measurement
- Bonus abuse vector enumeration
- Recommended detection thresholds

**Format:** PDF + interactive Dune dashboard (read-only access)

---

## D4 — Remediation Tracker

Pre-populated GitHub Issues tagged by severity, component, remediation complexity, and recommended fix owner. Designed for direct import into PeraltaCC's engineering workflow.

---

## D5 — Re-test Report

PeraltaCC may submit remediated code for re-test of Critical and High findings within 30 days of initial delivery. VLN confirms fix efficacy and issues a signed addendum.

---

## Delivery Timeline

| Deliverable | Date |
|-------------|------|
| D3 — Wallet Flow Risk Model | 2026-05-30 |
| D2 — Smart Contract Audit Report | 2026-06-13 |
| D1 — Platform Security Audit Report | 2026-06-20 |
| D4 — Remediation Tracker | 2026-06-20 |
| D5 — Re-test Report | TBD (max 2026-07-20) |

---

## Acceptance Criteria

PeraltaCC may reject a deliverable if required sections are missing, findings lack reproduction steps, or CVSS scores are absent. VLN resolves deficiencies within **5 business days** of rejection notice.

---

*Next: [Timeline](/peralta/timeline)*
