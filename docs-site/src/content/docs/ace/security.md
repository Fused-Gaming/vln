---
title: ACE Security & RNG Verification
description: Security architecture, RNG validation, and fairness verification for ACE Blackjack
---

# ACE Security & RNG Verification

This document covers ACE's security architecture, RNG implementation, fairness verification, and compliance framework.

## Security Overview

ACE implements a defense-in-depth security model:

```
Layer 1: Network Security (TLS, DDoS protection)
    ↓
Layer 2: API Security (Authentication, rate limiting)
    ↓
Layer 3: Application Security (Input validation, authorization)
    ↓
Layer 4: Data Security (Encryption, access control)
    ↓
Layer 5: RNG Security (Cryptographic verification)
```

## RNG (Random Number Generator)

### Cryptographically Secure Implementation

ACE uses **CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)**:

- **Algorithm**: ChaCha20 with OpenSSL backend
- **Entropy Source**: /dev/urandom on Linux, CryptoAPI on Windows
- **Seeding**: High-entropy seeds with system time + hardware entropy
- **Verification**: Regular third-party audits

### RNG Flow

```
Player initiates deal
    ↓
Gather entropy from multiple sources
    ↓
Seed CSPRNG with entropy
    ↓
Generate card indices (0-51 for 52-card deck)
    ↓
Shuffle deck using Fisher-Yates algorithm
    ↓
Deal cards from shuffled deck
    ↓
Record seed hash for verification
```

### Verifiable Randomness

Players can verify game fairness:

```typescript
// After game settlement
const gameResult = await ace.settlements.get(settlementId);

// Verify RNG seed hash
const verified = await ace.verify.seed(
  gameResult.seedHash,
  gameResult.cards
);

if (verified) {
  console.log('Game fairness verified ✓');
}
```

## Fairness Verification

### Commitment Scheme

ACE uses a cryptographic commitment scheme:

1. **Commit Phase**: Before game starts, generate and commit to card deck
   ```
   seed = generateSeed()
   seedHash = SHA-256(seed + salt)
   // Send seedHash to player
   ```

2. **Reveal Phase**: After game ends, reveal seed
   ```
   // Player can verify:
   SHA-256(seed + salt) == seedHash
   // and cards match seed
   ```

3. **Verification**: Player independently verifies cards
   ```
   cards = generateCards(seed)
   if cards == actualCards:
     console.log('Game was fair ✓')
   ```

### Third-Party Certification

- **GLI (Gaming Standards Association)** - RNG certification
- **eCOGRA** - Fair gaming certification
- **iTech Labs** - Independent testing and certification

**Current Status**: All certifications valid and current

[View Certificate](/docs/ace/certificates)

## Compliance Framework

### PCI DSS Level 1
- **Requirement**: Highest level of card data security
- **Status**: Compliant
- **Audit**: Annual third-party assessment

### GCCC (Gaming Commission of Compliance Canada)
- **Requirement**: Canadian gaming standards
- **Status**: Compliant
- **License**: GCCC-2026-ACE-001

### GDPR
- **Requirement**: Player data privacy and protection
- **Status**: Fully compliant
- **DPA**: Signed Data Processing Agreement

### CCPA
- **Requirement**: California Consumer Privacy Act
- **Status**: Compliant
- **Right to deletion**: Fully supported

## Encryption

### Transport Security

**TLS 1.3** for all network communications:

```bash
# Verify TLS version
openssl s_client -connect ace.api.vln.gg:443 -tls1_3

# Expected: TLSv1.3
```

### Data Encryption at Rest

- **Database**: AES-256-GCM encryption
- **S3 Storage**: S3-managed server-side encryption
- **Backups**: Encrypted with AWS KMS
- **Key Rotation**: Every 90 days

### Key Management

- **AWS KMS** or **Cloud KMS** for key management
- **HSM** (Hardware Security Module) for production keys
- **Automatic key rotation** enabled
- **Access logs** for all key operations

## Authentication & Authorization

### API Authentication

All API requests require Bearer token:

```bash
Authorization: Bearer sk_live_xxxxxxxxxxxxx
```

### Token Generation

```typescript
// Generate API key
const key = await ace.keys.generate({
  name: 'Production API Key',
  permissions: ['tables:read', 'sessions:create'],
  expiresIn: '90d'
});

// Rotate key
await ace.keys.rotate(keyId);
```

### Permission Model

- **tables:read** - View table information
- **tables:write** - Create and modify tables
- **sessions:create** - Start player sessions
- **play:execute** - Execute game actions
- **settlements:view** - View game results
- **analytics:read** - Access analytics data

## Session Security

### Session Management

```typescript
// Session token issued on login
const session = {
  sessionId: 'sess_xyz123',
  playerId: 'player_abc456',
  expiresAt: 1704067200,
  maxInactivity: 1800 // 30 minutes
};
```

### Session Validation

- **IP Validation**: Optional IP restriction
- **Device Fingerprinting**: Detect suspicious access
- **Rate Limiting**: Prevent brute force attacks
- **Timeout**: Auto-logout after inactivity

## Payment Security

### PCI Compliance

- **Level 1**: Highest security standard
- **Never store** credit card data
- **Tokenization** for repeated transactions
- **3D Secure** for card verification

### Wallet System

ACE uses a secure wallet system:

```typescript
// Add funds to wallet
const wallet = await ace.wallet.deposit({
  playerId: 'player_abc456',
  amount: 1000,
  currency: 'USD',
  paymentMethod: 'card_xyz123'
});

// All transactions tracked and audited
```

## Fraud Detection

### Machine Learning Detection

ACE monitors for suspicious patterns:

- **Unusual win rates** - Statistically unlikely sequences
- **Betting patterns** - Abnormal bet sizing
- **Speed patterns** - Unusually fast play
- **Device changes** - Unexpected device switches
- **Location anomalies** - Impossible geographic jumps

### Real-Time Alerts

Suspicious activity triggers automatic actions:

```
Suspicious pattern detected
    ↓
Increment risk score
    ↓
If score > threshold:
  ├─ Flag account for review
  ├─ Enable enhanced verification
  ├─ Alert compliance team
  └─ Log for audit trail
```

## Audit Logging

### Complete Audit Trail

All critical operations logged:

```typescript
// Audit log entry
{
  timestamp: '2026-04-28T10:00:00Z',
  event: 'game.settled',
  playerId: 'player_abc456',
  amount: 100,
  result: 'win',
  details: {
    playerHand: '19',
    dealerHand: '17',
    payout: 100
  }
}
```

### Log Retention

- **Active logs**: Searchable for 90 days
- **Archive logs**: S3 with long-term retention
- **Immutable**: Write-once storage
- **Compliance**: Meets 7-year retention requirement

## Incident Response

### Security Incident Process

1. **Detection**: Automated monitoring or manual report
2. **Containment**: Isolate affected systems
3. **Investigation**: Root cause analysis
4. **Notification**: Inform affected users within 72 hours
5. **Resolution**: Fix vulnerability and deploy patch
6. **Post-incident**: Review and improve security

### Reporting Vulnerabilities

Found a security issue?

1. **Do not** publicly disclose
2. Email: security@vln.gg
3. Include reproduction steps
4. Allow 90 days for remediation
5. Receive acknowledgment within 24 hours

[Security Policy](/docs/ace/security-policy)

## DDoS Protection

### Protection Layers

- **CloudFlare**: DDoS mitigation at edge
- **AWS Shield**: Network-layer protection
- **Rate limiting**: Per-IP and per-account limits
- **WAF rules**: Application-layer protection

### Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| /api/sessions | 100 | 1 hour |
| /api/play | 1000 | 1 hour |
| /api/settlements | 100 | 1 hour |

## Security Testing

### Regular Testing

- **Penetration Testing**: Quarterly by third party
- **Vulnerability Scanning**: Weekly automated scans
- **Code Review**: Every pull request
- **Dependency Audit**: Daily security updates
- **Load Testing**: Monthly performance validation

### Test Results

Latest security audit: April 2026  
Status: ✅ All findings remediated

[View Full Audit Report](/docs/ace/audit-report-2026-q2)

## Next Steps

- [Compliance Framework](/docs/ace/compliance)
- [API Security](/docs/ace/api-overview#authentication)
- [Incident Response Plan](/docs/ace/incident-response)
- [Audit Logging](/docs/ace/audit-logging)

## Contact Security Team

- **Email**: security@vln.gg
- **Response Time**: <24 hours
- **Escalation**: Available 24/7
