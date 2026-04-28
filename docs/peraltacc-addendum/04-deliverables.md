# 04 — Deliverables

**Document:** VLN-2026-PCC-001-DEL  
**Version:** 1.0.0  
**Status:** Final  
**Date:** 2026-04-28  
**Classification:** Confidential

---

## Deliverable Package Overview

At the conclusion of the engagement, PeraltaCC receives a complete deliverable package. All documents are delivered via a private, encrypted GitHub repository with AES-256 encrypted PDF exports provided on request.

---

## Primary Deliverables

### D1 — Platform Security Audit Report

**Format:** PDF + Markdown  
**Delivery:** End of Week 6  
**Classification:** Confidential

Contents:
- Executive summary (board-level, non-technical)
- Threat model diagram
- Full findings list with CVSS scores
- Per-finding technical writeup (description, impact, PoC, remediation)
- Risk heat map
- Remediation priority matrix
- Appendix: tool output, raw scan results

**Target length:** 40–80 pages depending on finding count

---

### D2 — Smart Contract Audit Report

**Format:** PDF + Markdown  
**Delivery:** End of Week 5  
**Classification:** Confidential

Contents:
- Contract-by-contract coverage summary
- Automated analysis results (deduplicated, false-positive removed)
- Manual audit findings with annotated code snippets
- PoC exploit scripts for Critical and High findings (Foundry format)
- Gas optimization recommendations
- Architecture risk notes

**Target length:** 30–60 pages

---

### D3 — Wallet Flow Risk Model

**Format:** PDF + interactive Dune dashboard (read-only access)  
**Delivery:** End of Week 4  
**Classification:** Confidential

Contents:
- Transaction graph visualization
- Cluster analysis results (sybil candidate list, anonymized)
- Wash-trading signal strength measurement
- Bonus abuse vector enumeration
- Recommended detection thresholds (for integration into fraud monitoring)

---

### D4 — Remediation Tracker

**Format:** GitHub Issues + CSV export  
**Delivery:** With D1 and D2  
**Classification:** Internal

A structured issue tracker pre-populated with all findings, tagged by:
- Severity
- Component
- Remediation complexity estimate
- Recommended fix owner

Designed for direct import into PeraltaCC's engineering workflow.

---

### D5 — Re-test Report (conditional)

**Format:** PDF addendum to D1/D2  
**Delivery:** Within 14 days of remediation submission  
**Scope:** Critical and High findings only

PeraltaCC may submit remediated code for re-test of Critical and High findings within 30 days of initial report delivery. VLN will confirm fix efficacy and issue a re-test addendum.

---

## Delivery Timeline

| Deliverable | Milestone | Date |
|-------------|-----------|------|
| D3 — Wallet Flow Risk Model | End of Phase 3 | 2026-05-30 |
| D2 — Smart Contract Audit Report | End of Phase 4 | 2026-06-13 |
| D1 — Platform Security Audit Report | End of Phase 5 | 2026-06-20 |
| D4 — Remediation Tracker | With D1 | 2026-06-20 |
| D5 — Re-test Report | Post-remediation | TBD (max 2026-07-20) |

---

## Format Specifications

| Format | Tools Used |
|--------|-----------|
| PDF | Pandoc + LaTeX, VLN report template |
| Markdown | CommonMark spec, hosted on docs.vln.gg/peralta |
| Foundry PoC | Solidity test files, runnable with `forge test` |
| Dune Dashboard | SQL-based, read-only sharing link |

---

## Acceptance Criteria

PeraltaCC may reject a deliverable if:
- Required sections are missing
- Findings lack reproduction steps
- CVSS scores are not provided
- Smart contract PoCs do not execute on Foundry mainnet fork

VLN will resolve any deficiencies within **5 business days** of rejection notice.

---

*Document continues in [05 — Timeline](./05-timeline.md)*
