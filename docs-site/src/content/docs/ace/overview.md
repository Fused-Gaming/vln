---
title: ACE Blackjack Documentation
description: Advanced Card Engine - Complete documentation for ACE Blackjack platform
---

# ACE Blackjack Documentation

**ACE** – Advanced Card Engine – is VLN's premier blackjack gaming platform providing enterprise-grade game mechanics, RNG validation, and secure server-side operations for iGaming environments.

## What is ACE?

ACE is a high-performance, cryptographically-secure blackjack engine designed for:

- **Enterprise Gaming Platforms** - Fully managed iGaming operations
- **RNG & Game Integrity** - Mathematically provable fairness
- **High-Throughput Operations** - Millions of concurrent players
- **Regulatory Compliance** - Meeting global gaming standards

## Key Features

✅ **True Random Number Generation** - CSPRNG with cryptographic verification  
✅ **Game Rule Flexibility** - Multiple blackjack variants  
✅ **Wallet Integration** - Multi-currency support  
✅ **Real-time Analytics** - Player behavior and game metrics  
✅ **Security First** - Server-side validation, no client-side trust  
✅ **Low Latency** - Optimized for global distribution  

## Quick Start

### Installation & Setup
```bash
# Clone the ACE repository
git clone https://github.com/Fused-Gaming/ace.git
cd ace

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your database and API keys

# Run migrations
pnpm migrate

# Start the server
pnpm dev
```

### Your First Game Session
1. [Create a game table](/docs/ace/api/tables)
2. [Initialize a player session](/docs/ace/api/sessions)
3. [Execute deal and play operations](/docs/ace/game-mechanics/play-flow)
4. [Settle and archive game results](/docs/ace/api/settlements)

## Documentation Map

### 📚 Core Documentation (8 Pages)

1. **[Getting Started](/docs/ace/getting-started)** - Setup and configuration
2. **[Game Mechanics](/docs/ace/game-mechanics)** - Rules, variants, and play flow
3. **[API Reference](/docs/ace/api/overview)** - Complete endpoint documentation
4. **[Integration Guide](/docs/ace/integration)** - Server integration patterns
5. **[Security & RNG](/docs/ace/security)** - Fairness, validation, compliance
6. **[Database Schema](/docs/ace/database)** - Tables, relationships, indexing
7. **[Deployment & Operations](/docs/ace/deployment)** - Production setup and monitoring
8. **[Troubleshooting & FAQ](/docs/ace/faq)** - Common issues and solutions

---

## API Quick Reference

### Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/tables` | POST | Create a new game table |
| `/api/sessions` | POST | Start a player session |
| `/api/play` | POST | Execute game action |
| `/api/settlements` | POST | Settle and record game |
| `/api/analytics` | GET | Retrieve game statistics |

**Full API Reference**: [API Documentation](/docs/ace/api/overview)

---

## Integration Patterns

### Server-Side Integration
```typescript
// Example: Creating a game session
const response = await fetch('https://ace.api.vln.gg/sessions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tableId: 'tbl_xyz123',
    playerId: 'player_abc456',
    buyIn: 1000,
    currency: 'USD'
  })
});

const session = await response.json();
// Use session.id for subsequent operations
```

[View Integration Guide](/docs/ace/integration)

---

## Core Concepts

### Game Flow
ACE uses a standard blackjack flow:
1. **Deal** - Cards dealt to player and dealer
2. **Player Actions** - Hit, Stand, Double, Split, etc.
3. **Dealer Actions** - Automatic based on rules
4. **Settlement** - Winner determined and winnings calculated

### RNG & Fairness
- Cryptographically secure random number generation
- Server-side shuffle with third-party verification
- Provable fairness through commitment schemes

### Wallet Integration
- Multi-currency support (USD, EUR, crypto)
- Atomic transactions with rollback
- Real-time balance updates

[Learn More: Core Concepts](/docs/ace/game-mechanics)

---

## Security & Compliance

- **PCI-DSS Level 1** Compliance
- **GCCC** Gaming Certification
- **RNG Certification** - Third-party audited
- **Player Verification** - KYC/AML integration
- **Fraud Detection** - ML-based anomaly detection

[Security Deep Dive](/docs/ace/security)

---

## Deployment Options

### Cloud Deployment
- **AWS**: ECS + RDS PostgreSQL
- **Google Cloud**: Cloud Run + Cloud SQL
- **Azure**: Container Instances + SQL Database

### Self-Hosted
- Docker container deployment
- PostgreSQL 14+ database
- Redis for session caching

[Deployment Guide](/docs/ace/deployment)

---

## Performance Metrics

- **Throughput**: 100K+ concurrent sessions
- **Latency**: <50ms p99 card operations
- **Uptime**: 99.99% SLA
- **Database**: PostgreSQL optimized queries

---

## FAQ & Troubleshooting

### Common Questions

**Q: How do I verify game fairness?**  
A: See [RNG Verification](/docs/ace/security#rng-verification)

**Q: What are the database requirements?**  
A: See [Database Setup](/docs/ace/database)

**Q: How do I handle player disputes?**  
A: See [Dispute Resolution](/docs/ace/faq#disputes)

[Full FAQ](/docs/ace/faq)

---

## Getting Help

- **Documentation**: You're reading it!
- **API Issues**: [API Reference](/docs/ace/api/overview)
- **Technical Questions**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- **Email Support**: security@vln.gg

---

## Next Steps

Choose your starting point:

- **🚀 [Get Started: Installation](/docs/ace/getting-started)** - Set up ACE locally
- **📖 [Learn Game Mechanics](/docs/ace/game-mechanics)** - Understand how ACE works
- **🔌 [Integrate with Your System](/docs/ace/integration)** - Server integration
- **🔐 [Security & Fairness](/docs/ace/security)** - RNG and compliance details

---

*Last Updated: April 2026 | [View Changelog](/docs/ace/changelog)*
