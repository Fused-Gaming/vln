---
title: ACE Integration Guide
description: Server-side integration patterns and best practices for ACE Blackjack
---

# ACE Integration Guide

This guide covers server-side integration patterns for integrating ACE Blackjack into your gaming platform.

## Integration Architecture

### Standard Integration Flow

```
Your Platform
    ↓
ACE API Gateway
    ↓
Game Service
    ↓
Database / RNG / Settlement
    ↓
Response
```

## Server-Side Integration

### 1. Authentication Setup

Generate an API key for your platform:

```bash
# In your ACE admin panel
Settings → API Keys → Generate New Key

# Copy and secure the key
export ACE_API_KEY="sk_live_xxxxxxxxxxxxx"
```

### 2. Initialize Client Library

#### Node.js
```typescript
import { AceClient } from '@vln/ace-sdk';

const ace = new AceClient({
  apiKey: process.env.ACE_API_KEY,
  baseUrl: process.env.ACE_API_URL || 'https://ace.api.vln.gg'
});
```

#### Python
```python
from vln_ace import AceClient

ace = AceClient(
    api_key=os.getenv('ACE_API_KEY'),
    base_url=os.getenv('ACE_API_URL', 'https://ace.api.vln.gg')
)
```

### 3. Create Game Tables

```typescript
// Create a new game table with limits
const table = await ace.tables.create({
  name: 'High Roller Table',
  minBet: 100,
  maxBet: 10000,
  currency: 'USD',
  maxPlayers: 7
});

console.log(`Table created: ${table.id}`);
```

### 4. Initiate Player Sessions

```typescript
// Start a gaming session for a player
const session = await ace.sessions.create({
  tableId: table.id,
  playerId: 'player_12345',
  buyIn: 5000,
  currency: 'USD'
});

// Store session ID for this player
playerState.sessionId = session.id;
playerState.balance = session.balance;
```

### 5. Execute Game Actions

```typescript
// Player places a bet
const bet = await ace.play.bet({
  sessionId: session.id,
  amount: 100
});

// Deal cards
const hand = await ace.play.deal({
  sessionId: session.id
});

console.log(`Player: ${hand.playerCards}`);
console.log(`Dealer: ${hand.dealerCards}`);

// Player hits
const newCard = await ace.play.hit({
  sessionId: session.id
});

// Player stands
const settlement = await ace.play.stand({
  sessionId: session.id
});
```

### 6. Handle Settlements

```typescript
// Settlement is automatically processed
const settlement = await ace.settlements.get(settlement.id);

console.log(`Player hand: ${settlement.playerHand.value}`);
console.log(`Dealer hand: ${settlement.dealerHand.value}`);
console.log(`Result: ${settlement.result}`); // win | loss | push
console.log(`Payout: ${settlement.payout}`);
```

## Error Handling

Implement comprehensive error handling:

```typescript
try {
  const result = await ace.play.hit({ sessionId });
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    // Player doesn't have enough balance
    showError('Insufficient balance for this bet');
  } else if (error.code === 'INVALID_SESSION') {
    // Session expired or invalid
    showError('Session expired, please login again');
  } else if (error.code === 'RATE_LIMITED') {
    // Rate limit exceeded
    await sleep(5000);
    // Retry operation
  } else {
    // Generic error
    console.error('Game error:', error);
  }
}
```

## Webhook Integration

### Subscribe to Events

```bash
curl -X POST https://ace.api.vln.gg/api/webhooks \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-platform.com/webhooks/ace",
    "events": [
      "game.dealt",
      "game.settled",
      "player.busted",
      "session.closed"
    ]
  }'
```

### Handle Webhook Payloads

```typescript
// Your webhook endpoint
app.post('/webhooks/ace', (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'game.dealt':
      console.log(`Game dealt for session ${event.data.sessionId}`);
      break;
      
    case 'game.settled':
      console.log(`Game settled: ${event.data.result}`);
      updatePlayerBalance(event.data.playerId, event.data.newBalance);
      break;
      
    case 'player.busted':
      console.log(`Player busted: ${event.data.playerId}`);
      break;
      
    case 'session.closed':
      cleanupPlayerSession(event.data.sessionId);
      break;
  }
  
  res.status(200).json({ ok: true });
});
```

## Best Practices

### 1. Session Management
```typescript
// Don't create new session per request
// Reuse session until explicitly closed
const session = await ace.sessions.get(sessionId);
if (session.status === 'expired') {
  // Create new session
  const newSession = await ace.sessions.create({...});
}
```

### 2. Error Recovery
```typescript
// Implement retry logic with exponential backoff
async function executeWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

### 3. Balance Verification
```typescript
// Always verify balance before critical operations
const session = await ace.sessions.get(sessionId);
if (session.balance < betAmount) {
  throw new Error('Insufficient balance');
}
```

### 4. Audit Logging
```typescript
// Log all critical game events
logger.info('Game action', {
  playerId: player.id,
  action: 'hit',
  sessionId: session.id,
  amount: bet.amount,
  timestamp: new Date().toISOString()
});
```

## Performance Optimization

### Caching
```typescript
// Cache table configuration
const tableCache = new Map();

async function getTable(tableId) {
  if (tableCache.has(tableId)) {
    return tableCache.get(tableId);
  }
  
  const table = await ace.tables.get(tableId);
  tableCache.set(tableId, table);
  return table;
}
```

### Batch Operations
```typescript
// Process multiple operations concurrently
const results = await Promise.all([
  ace.play.hit({ sessionId }),
  ace.analytics.getPlayerStats({ playerId }),
  ace.settlements.list({ sessionId })
]);
```

## Security Considerations

### 1. API Key Protection
- Never commit API keys to version control
- Store in environment variables or secrets manager
- Rotate keys regularly
- Use separate keys for dev/staging/prod

### 2. Request Validation
```typescript
// Validate all input
const bet = {
  amount: Math.max(table.minBet, Math.min(amount, table.maxBet))
};
```

### 3. HTTPS Only
```typescript
// Always use HTTPS for production
baseUrl: 'https://ace.api.vln.gg'
```

## Compliance

### PCI DSS Compliance
- Never store payment card data
- Use ACE's wallet system for fund management
- Ensure HTTPS for all transactions

### Gaming Compliance
- Maintain audit logs of all games
- Verify RNG compliance
- Document player age verification

## Testing

### Unit Tests
```typescript
import { describe, it, expect } from 'vitest';

describe('ACE Integration', () => {
  it('should create a session', async () => {
    const session = await ace.sessions.create({
      tableId: 'tbl_test',
      playerId: 'player_test',
      buyIn: 1000
    });
    
    expect(session.id).toBeDefined();
    expect(session.balance).toBe(1000);
  });
});
```

### Integration Tests
```typescript
it('should complete a full game flow', async () => {
  // Create session
  const session = await ace.sessions.create({...});
  
  // Deal
  const hand = await ace.play.deal({...});
  expect(hand.playerCards).toHaveLength(2);
  
  // Action
  const hit = await ace.play.hit({...});
  
  // Settle
  const settlement = await ace.play.stand({...});
  expect(settlement.result).toBeDefined();
});
```

## Next Steps

- [API Reference](/docs/ace/api-overview) - Complete API documentation
- [Security & RNG](/docs/ace/security) - Fairness and security details
- [Troubleshooting](/docs/ace/faq) - Common issues
