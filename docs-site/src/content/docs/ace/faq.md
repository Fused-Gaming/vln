---
title: ACE FAQ & Troubleshooting
description: Frequently asked questions and troubleshooting guide for ACE Blackjack
---

# ACE FAQ & Troubleshooting

Answers to common questions and solutions for common issues.

## General Questions

### What is ACE?
ACE (Advanced Card Engine) is VLN's enterprise blackjack platform providing cryptographically-secure game mechanics, RNG validation, and secure server-side operations for iGaming.

### What are the minimum system requirements?
- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- Redis 7.x (optional, for caching)
- 2GB RAM minimum
- 10GB disk space

### How much does ACE cost?
Contact sales@vln.gg for pricing. We offer:
- **Development**: Free for testing
- **Production**: Enterprise licensing based on game volume
- **Premium Support**: Available as add-on

### Can I use ACE for my gaming platform?
Yes! ACE supports integration with any gaming platform. We handle all game logic, RNG, and settlement. You manage player accounts and payments.

## Setup & Installation

### Q: I get "DATABASE_URL not set" error
**A:** Make sure you've created `.env` file with DATABASE_URL:

```bash
cp .env.example .env
nano .env
# Set DATABASE_URL="postgresql://user:pass@localhost:5432/ace"
pnpm migrate
```

### Q: How do I run database migrations?
**A:** Use the migration command:

```bash
pnpm migrate          # Run pending migrations
pnpm migrate:status   # Check migration status
pnpm migrate:revert   # Rollback last migration
```

### Q: Can I use MySQL instead of PostgreSQL?
**A:** No, ACE requires PostgreSQL. We use PostgreSQL-specific features for data integrity.

### Q: How do I set up Redis caching?
**A:** Optional but recommended:

```bash
# Install Redis
brew install redis  # macOS
sudo apt-get install redis-server  # Ubuntu

# Configure in .env
REDIS_URL="redis://localhost:6379"

# Restart ACE
pnpm dev
```

## API & Integration

### Q: How do I authenticate API requests?
**A:** Use Bearer token authentication:

```bash
curl -H "Authorization: Bearer sk_live_yourkey" \
  https://ace.api.vln.gg/api/tables
```

### Q: What's the rate limit?
**A:** 
- Standard: 1000 requests/minute
- Premium: 10000 requests/minute
- Check headers for remaining quota

```bash
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1704067200
```

### Q: How do I get a production API key?
**A:** 
1. Log into ACE dashboard
2. Go to Settings → API Keys
3. Click "Generate Production Key"
4. Copy the key (shown only once!)
5. Store securely in environment variables

### Q: Can I rotate API keys?
**A:** Yes! Go to Settings → API Keys → Rotate. Old key becomes invalid immediately.

### Q: What's your API SLA?
**A:** 99.99% uptime SLA with <50ms p99 latency on game operations.

## Game Operations

### Q: How do I create a game table?
**A:** 

```bash
curl -X POST https://ace.api.vln.gg/api/tables \
  -H "Authorization: Bearer sk_live_key" \
  -d '{
    "name": "Table 1",
    "minBet": 10,
    "maxBet": 1000,
    "currency": "USD"
  }'
```

### Q: What happens if a player loses connection mid-game?
**A:** 
- Session remains active for 30 minutes
- Player can reconnect and continue
- Game is settled if no action for 5 minutes

### Q: Can I have multiple games from one session?
**A:** Yes, a session can have multiple games. Each game is independent.

### Q: How do I handle disputed games?
**A:** 
1. Session maintains full game history
2. RNG seed hash is recorded
3. Game can be independently verified
4. Submit dispute with session ID to support@vln.gg

### Q: What's the maximum game time?
**A:** No hard limit, but average game is 2-3 minutes.

## RNG & Fairness

### Q: How do I verify game fairness?
**A:** After settlement, you can verify:

```bash
curl https://ace.api.vln.gg/api/verify \
  -X POST \
  -d '{
    "settlementId": "sett_xyz123",
    "seed": "..." 
  }'
```

### Q: Are you third-party certified?
**A:** Yes! We have:
- ✅ GLI RNG Certification
- ✅ eCOGRA Fair Gaming Certification
- ✅ iTech Labs Audit

[View Certificates](/docs/ace/certificates)

### Q: Can players cheat the RNG?
**A:** No. RNG runs server-side with cryptographic verification. Players cannot influence it.

### Q: Is the RNG mathematically proven fair?
**A:** Yes. We use commitment schemes that allow mathematical proof of fairness independent of our implementation.

## Payments & Wallet

### Q: What payment methods are supported?
**A:** ACE doesn't handle payments directly. You integrate with payment processors and manage player wallets.

### Q: Is ACE PCI compliant?
**A:** Yes, PCI DSS Level 1. We never store payment card data.

### Q: What currencies are supported?
**A:** Any currency you want:
- USD, EUR, GBP, CAD, AUD
- JPY, CNY, INR, etc.
- Crypto: BTC, ETH, USDC, USDT
- Custom currencies

### Q: How do I handle refunds?
**A:** Refunds are handled in the settlement phase. Mark settlement as disputed and manually adjust player balance.

## Compliance & Security

### Q: Is ACE GDPR compliant?
**A:** Yes, fully GDPR compliant. We signed a Data Processing Agreement.

### Q: What data does ACE store?
**A:** Only game-related data:
- Player ID (not personal info)
- Game results and bets
- Session data
- Audit logs

Your platform stores:
- Player accounts
- Payment information
- Personal details

### Q: How long do you retain data?
**A:** 
- Active data: 2 years
- Archive data: 7 years (for compliance)
- Logs: 90 days hot, 7 years cold

### Q: Can I delete a player's data?
**A:** Yes, we support right-to-be-forgotten:

```bash
curl -X DELETE https://ace.api.vln.gg/api/players/player_xyz/data \
  -H "Authorization: Bearer sk_live_key"
```

(Game results retained for 7 years for compliance)

## Troubleshooting

### Q: I get "Invalid API key" error
**A:**
- Check key is correct (copy-paste)
- Verify key hasn't expired
- Generate new key if needed
- Check key is in Authorization header (not body)

### Q: I get "Table not found" error
**A:**
- Verify table ID is correct
- Table must be created first
- Tables are environment-specific (dev vs prod)

### Q: Session is "expired"
**A:**
- Session timeout is 30 minutes of inactivity
- Create new session for player
- All previous session data is preserved

### Q: Game action returns "Invalid bet"
**A:**
- Verify bet amount >= minBet
- Verify bet amount <= maxBet
- Check player has sufficient balance

### Q: I'm getting rate limited
**A:**
- Check X-RateLimit-Remaining header
- Wait until X-RateLimit-Reset time
- Reduce request frequency
- Contact us for higher tier

### Q: Database migration fails
**A:**
```bash
# Check migration status
pnpm migrate:status

# Manually rollback if needed
pnpm migrate:revert --step=1

# Try again
pnpm migrate
```

### Q: High latency in production
**A:**
- Check database is optimized (indexes created)
- Verify sufficient memory/CPU
- Enable Redis caching
- Check network connectivity
- Review slow query logs

### Q: Settlement takes too long
**A:**
- Settlements should complete <100ms
- Check database performance
- Verify RNG isn't bottleneck
- Contact support if persistent

## Performance

### Q: How many concurrent games can I handle?
**A:** Depends on deployment:
- Development: 100-500 concurrent
- Standard deployment: 10,000+ concurrent
- Enterprise deployment: 100,000+ concurrent

### Q: What's the typical latency?
**A:**
- Deal cards: 20-50ms
- Game action (hit/stand): 10-30ms
- Settlement: 20-50ms
- p99 latency: <100ms

### Q: How do I optimize performance?
**A:**
1. Enable Redis caching
2. Increase database connection pool
3. Use CDN for static assets
4. Monitor slow queries
5. Scale horizontally as needed

## Business Questions

### Q: Can I white-label ACE?
**A:** Yes! We offer white-label versions with your branding.

### Q: What's your uptime SLA?
**A:** 99.99% uptime guarantee with service credit for breaches.

### Q: Do you offer custom features?
**A:** Yes, custom development available for enterprise clients.

### Q: What's the roadmap?
**A:** Planned features:
- Multiple deck support
- Side bets
- Live dealer integration
- Mobile native apps

Contact sales for details.

## Getting Help

**Still stuck?**

- 📖 [Read the docs](/docs/ace)
- 🐛 [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- 💬 [Discord Community](https://discord.gg/vln)
- 📧 [Email support](mailto:support@vln.gg)
- 🚨 [Security issues](mailto:security@vln.gg)
