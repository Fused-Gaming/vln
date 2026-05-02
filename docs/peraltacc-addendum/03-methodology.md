# 03 — Methodology

**Document:** VLN-2026-PCC-001-METH  
**Version:** 1.0.0  
**Status:** Final  
**Date:** 2026-04-28  
**Classification:** Confidential

---

## Overview

VLN employs a hybrid methodology combining manual security research, automated static and dynamic analysis, and probabilistic modeling. Our approach is designed to surface vulnerabilities that neither automated scanners nor isolated code review can detect in isolation.

---

## Framework Stack

| Layer | Standard / Framework | Application |
|-------|---------------------|-------------|
| Platform Security | OWASP Testing Guide v4.2 | API, auth, session |
| Smart Contracts | SWC Registry + SCSVS | Solidity vulnerability classes |
| Threat Modeling | STRIDE + Attack Trees | Architecture-level |
| Vulnerability Scoring | CVSS v3.1 + VLN Severity Model | All findings |
| RNG Analysis | VLN Statistical Analysis Protocol v2 | Entropy & outcome bias |
| Wallet Flow | VLN Risk Graph Model v1 | Transaction graph analysis |

---

## Phase 1 — Discovery & Threat Modeling

**Duration:** Week 1  
**Objective:** Build complete threat model before active testing begins

Activities:
- Architecture review and system documentation ingestion
- Attack surface enumeration (APIs, contracts, web interfaces)
- STRIDE threat modeling against all in-scope components
- Dependency inventory and known CVE mapping
- Initial risk register creation

**Output:** Threat model document + prioritized attack plan

---

## Phase 2 — Platform Security Testing

**Duration:** Weeks 2–3  
**Objective:** Active vulnerability identification across platform

### API & Authentication Testing
- Authentication bypass attempts (JWT forgery, session fixation, OAuth redirect abuse)
- Authorization testing (IDOR, privilege escalation, tenant isolation)
- Input validation (injection classes: SQL, NoSQL, command, template)
- Rate limiting bypass (IP rotation, distributed request patterns)
- Mass assignment and parameter pollution

### RNG Subsystem Analysis
- Entropy source quality assessment
- Seed exposure window measurement (time between seed generation and outcome reveal)
- Statistical bias analysis on large sample of recorded outcomes
- Commit-reveal scheme integrity verification
- Oracle manipulation feasibility

### Session & State Management
- Session token entropy measurement
- Token binding verification (IP, device fingerprint)
- Concurrent session behavior
- Logout invalidation completeness

---

## Phase 3 — Wallet Flow Risk Modeling

**Duration:** Week 3 (concurrent with Phase 2)  
**Objective:** Statistical analysis of financial flow patterns

### Transaction Graph Analysis
- Build directed transaction graph from on-chain and off-chain data
- Identify clustering patterns indicative of sybil accounts
- Measure wash-trading signal strength
- Model bonus abuse vectors (multi-account, referral exploitation)

### Financial Logic Review
- Deposit detection race conditions
- Withdrawal request manipulation
- Precision/rounding errors in balance calculations
- Bonus stacking and combinatorial exploit modeling

---

## Phase 4 — Smart Contract Audit

**Duration:** Weeks 4–5  
**Objective:** Comprehensive Solidity review with PoC development for critical findings

### Automated Analysis
| Tool | Purpose |
|------|---------|
| Slither | Static analysis, known vulnerability patterns |
| Echidna | Property-based fuzzing |
| Manticore | Symbolic execution for complex logic |
| Foundry (forge test) | Unit test coverage gaps |
| 4naly3er | Gas optimization and logic review |

### Manual Review Areas
- Reentrancy (cross-function, cross-contract, cross-chain)
- Integer overflow/underflow in unchecked blocks
- Access control — role assignments, constructor initialization, ownership transfer
- Upgrade mechanism — proxy pattern correctness, storage slot collisions
- Oracle dependencies — price manipulation, stale data, sandwich attack exposure
- Flash loan attack surfaces — single-block manipulations
- Front-running — MEV exposure on settlement transactions
- Gas griefing — unbounded loops, denial-of-service via gas exhaustion

### PoC Development
For all Critical and High findings, VLN will develop:
- Annotated exploit code (Foundry test or standalone script)
- Step-by-step reproduction instructions
- Impact quantification (max extractable value, blast radius)

---

## Phase 5 — Reporting

**Duration:** Week 6  
**Objective:** Structured, actionable report delivery

### Finding Severity Model

| Severity | CVSS Range | Description |
|----------|------------|-------------|
| Critical | 9.0–10.0 | Immediate financial loss, complete platform compromise |
| High | 7.0–8.9 | Significant financial risk or data exposure |
| Medium | 4.0–6.9 | Requires chaining or specific conditions |
| Low | 0.1–3.9 | Defense-in-depth improvements |
| Informational | N/A | Best practice recommendations |

### Finding Report Structure
Each finding includes:
1. **Title** — Concise, descriptive
2. **Severity** — CVSS score + VLN classification
3. **Location** — File, line number, endpoint, or contract address
4. **Description** — Technical explanation
5. **Impact** — What an attacker achieves
6. **Proof of Concept** — Reproduction steps or exploit code
7. **Recommendation** — Specific remediation guidance
8. **References** — SWC, OWASP, CWE identifiers

---

## Toolchain

```
Static Analysis:    Slither, Semgrep, CodeQL
Fuzzing:            Echidna, Foundry (fuzz tests)
Dynamic Testing:    Burp Suite Pro, custom scripts
Chain Analysis:     Etherscan, Tenderly, Dune Analytics
Symbolic Exec:      Manticore, Hevm
Network Analysis:   Wireshark, mitmproxy
Dependency Audit:   pnpm audit, npm audit, safety (Python)
```

---

*Document continues in [04 — Deliverables](./04-deliverables.md)*
