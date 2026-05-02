---
title: Methodology
description: VLN testing frameworks, toolchain, phase-by-phase approach, and severity model for the PeraltaCC security engagement.
sidebar:
  order: 4
lastUpdated: true
---

# Methodology

**Reference:** VLN-2026-PCC-001-METH | **Version:** 1.0.0

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

Architecture review, attack surface enumeration, STRIDE threat modeling, dependency inventory, and risk register creation.

**Output:** Threat model document + prioritized attack plan

---

## Phase 2 — Platform Security Testing

### API & Authentication
- Authentication bypass: JWT forgery, session fixation, OAuth redirect abuse
- Authorization: IDOR, privilege escalation, tenant isolation
- Input validation: SQL, NoSQL, command, template injection
- Rate limiting bypass: IP rotation, distributed patterns
- Mass assignment and parameter pollution

### RNG Subsystem
- Entropy source quality assessment
- Seed exposure window measurement
- Statistical bias analysis on recorded outcomes
- Commit-reveal scheme integrity verification

---

## Phase 3 — Wallet Flow Risk Modeling

- Transaction graph construction from on-chain and off-chain data
- Cluster analysis for sybil account identification
- Wash-trading signal strength measurement
- Bonus abuse vector enumeration and modeling
- Financial logic: rounding errors, race conditions, stacking exploits

---

## Phase 4 — Smart Contract Audit

### Automated Analysis Tools

| Tool | Purpose |
|------|---------|
| Slither | Static analysis, known vulnerability patterns |
| Echidna | Property-based fuzzing |
| Manticore | Symbolic execution for complex logic |
| Foundry (forge test) | Unit test coverage gaps |
| 4naly3er | Gas optimization and logic review |

### Manual Review Focus Areas
- Reentrancy (cross-function, cross-contract, cross-chain)
- Access control — role assignments, ownership transfer
- Upgrade mechanism — proxy correctness, storage slot collisions
- Oracle dependencies — price manipulation, stale data
- Flash loan attack surfaces
- MEV and front-running exposure
- Gas griefing — unbounded loops, denial-of-service

### PoC Development
For all Critical and High findings, VLN delivers:
- Annotated exploit code (Foundry test or standalone script)
- Step-by-step reproduction instructions
- Impact quantification (max extractable value, blast radius)

---

## Severity Model

| Severity | CVSS Range | Description |
|----------|------------|-------------|
| **Critical** | 9.0–10.0 | Immediate financial loss, complete platform compromise |
| **High** | 7.0–8.9 | Significant financial risk or data exposure |
| **Medium** | 4.0–6.9 | Requires chaining or specific conditions |
| **Low** | 0.1–3.9 | Defense-in-depth improvements |
| **Informational** | N/A | Best practice recommendations |

---

## Toolchain

```
Static Analysis:    Slither, Semgrep, CodeQL
Fuzzing:            Echidna, Foundry (fuzz tests)
Dynamic Testing:    Burp Suite Pro, custom scripts
Chain Analysis:     Etherscan, Tenderly, Dune Analytics
Symbolic Exec:      Manticore, Hevm
Dependency Audit:   pnpm audit, safety (Python)
```

---

*Next: [Deliverables](/peralta/deliverables)*
