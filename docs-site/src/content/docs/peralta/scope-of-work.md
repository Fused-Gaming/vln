---
title: Scope of Work
description: In-scope systems, exclusions, testing environment, access requirements, and rules of engagement for the PeraltaCC security audit.
sidebar:
  order: 3
lastUpdated: true
---

# Scope of Work

**Reference:** VLN-2026-PCC-001-SOW | **Version:** 1.0.0

---

## In-Scope Systems

### Platform Infrastructure

| System | Description | Access Method |
|--------|-------------|---------------|
| API Gateway | REST API serving client and admin endpoints | Black-box + code review |
| Authentication Service | Session, JWT, OAuth2 flows | White-box |
| Admin Panel | Internal management interface | Black-box authenticated |
| Webhook System | Outbound event delivery | Black-box |
| Rate Limiting Layer | Traffic shaping and abuse prevention | Black-box |

### RNG Subsystem

| Component | Description | Access Method |
|-----------|-------------|---------------|
| RNG Seed Generator | Entropy source and seeding mechanism | White-box |
| Outcome Calculation Engine | Game result computation logic | White-box |
| Result Verification API | Provably-fair verification endpoint | Black-box |
| On-chain Commit-Reveal | VRF or commit-reveal scheme | White-box (Solidity) |

### Wallet & Financial Flows

| Component | Description | Access Method |
|-----------|-------------|---------------|
| Deposit Flow | On-chain detection to credit | Transaction trace |
| Withdrawal Flow | Request to on-chain settlement | Transaction trace |
| Balance Ledger | Internal balance tracking | White-box |
| Bonus & Promotion Engine | Credit issuance logic | White-box |

### Smart Contracts (EVM)

| Contract | Description | Network |
|----------|-------------|---------|
| GameController.sol | Core game orchestration | Mainnet + Testnet |
| VaultManager.sol | Fund custody and settlement | Mainnet |
| RewardDistributor.sol | Bonus and jackpot distribution | Mainnet |
| ProxyAdmin.sol | Upgrade authority contract | Mainnet |
| Oracle Integration | VRF / price feed consumption | Mainnet |

---

## Explicitly Out of Scope

- Production database content / player PII
- Third-party payment processor infrastructure
- Social engineering / phishing of PeraltaCC staff
- DDoS or volumetric load testing
- Smart contracts not listed above
- Third-party smart contracts (DEX routers, liquidity pools)

---

## Testing Environments

| Environment | Purpose | Data |
|-------------|---------|------|
| Staging | Primary testing environment | Synthetic |
| Testnet (Sepolia) | Smart contract testing | Testnet ETH |
| Production | Read-only observation only | Real (view calls only) |

**No destructive testing on production systems.**

---

## Rules of Engagement

1. Testing window: Monday–Friday, 09:00–18:00 UTC
2. Emergency stop: Immediate notification for any imminent exploit risk
3. Data handling: All client data destroyed within 30 days of report delivery
4. Disclosure: Coordinated 90-day window; no public disclosure without approval
5. Credentials: All test accounts rotated immediately after engagement

---

*Next: [Methodology](/peralta/methodology)*
