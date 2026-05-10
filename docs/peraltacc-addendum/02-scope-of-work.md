# 02 — Scope of Work

**Document:** VLN-2026-PCC-001-SOW  
**Version:** 1.0.0  
**Status:** Final  
**Date:** 2026-04-28  
**Classification:** Confidential

---

## Engagement Boundaries

This document defines the precise scope of VLN's engagement with PeraltaCC. Any testing activity outside this scope requires written approval from both parties before commencement.

---

## In-Scope Systems

### 1. Platform Infrastructure

| System | Description | Access Method |
|--------|-------------|---------------|
| API Gateway | REST API serving client and admin endpoints | Black-box + code review |
| Authentication Service | Session, JWT, OAuth2 flows | White-box |
| Admin Panel | Internal management interface | Black-box authenticated |
| Webhook System | Outbound event delivery | Black-box |
| Rate Limiting Layer | Traffic shaping and abuse prevention | Black-box |

### 2. RNG Subsystem

| Component | Description | Access Method |
|-----------|-------------|---------------|
| RNG Seed Generator | Entropy source and seeding mechanism | White-box |
| Outcome Calculation Engine | Game result computation logic | White-box |
| Result Verification API | Provably-fair verification endpoint | Black-box |
| On-chain Commit-Reveal | VRF or commit-reveal scheme | White-box (Solidity) |

### 3. Wallet & Financial Flows

| Component | Description | Access Method |
|-----------|-------------|---------------|
| Deposit Flow | On-chain detection to credit | Transaction trace |
| Withdrawal Flow | Request to on-chain settlement | Transaction trace |
| Balance Ledger | Internal balance tracking | White-box |
| Bonus & Promotion Engine | Credit issuance logic | White-box |
| Affiliate Tracking | Commission calculation | White-box |

### 4. Smart Contracts (EVM)

| Contract | Description | Network |
|----------|-------------|---------|
| GameController.sol | Core game orchestration | Mainnet + Testnet |
| VaultManager.sol | Fund custody and settlement | Mainnet |
| RewardDistributor.sol | Bonus and jackpot distribution | Mainnet |
| ProxyAdmin.sol | Upgrade authority contract | Mainnet |
| Oracle Integration | VRF / price feed consumption | Mainnet |

---

## Explicitly Out of Scope

The following are **excluded** from this engagement. Testing these areas without written approval is a material breach of the engagement agreement:

- Production database content / player PII
- Third-party payment processor infrastructure (not operated by PeraltaCC)
- Fiat payment rails
- Social engineering / phishing of PeraltaCC staff
- DDoS or volumetric load testing
- Smart contracts not listed in Section 4 above
- Third-party smart contracts (liquidity pools, DEX routers) unless explicitly added

---

## Testing Environment

| Environment | Purpose | Data |
|-------------|---------|------|
| Staging (`staging.peraltacc.gg`) | Primary testing environment | Synthetic |
| Testnet (Sepolia) | Smart contract testing | Testnet ETH |
| Production | Read-only observation only | Real (view calls only) |

**No destructive testing will be performed on production systems.**

---

## Access Requirements

VLN requires the following access provisioned by PeraltaCC before engagement commencement:

```
[ ] Staging environment credentials (admin and player roles)
[ ] Source code repository read access (private GitHub repo)
[ ] Smart contract source code + deployment scripts
[ ] Architecture diagrams and system documentation
[ ] VPN / allowlisted IP for staging API access
[ ] Point-of-contact for emergency stop protocol
```

---

## Rules of Engagement

1. **Testing window:** Monday–Friday, 09:00–18:00 UTC (outside peak hours)
2. **Emergency stop:** Any finding of imminent exploit risk → immediate notification to designated contact
3. **Data handling:** All client data destroyed within 30 days of report delivery
4. **Disclosure:** Coordinated disclosure with 90-day window; no public disclosure without PeraltaCC approval
5. **Credentials:** All test accounts and API keys rotated immediately after engagement

---

*Document continues in [03 — Methodology](./03-methodology.md)*
