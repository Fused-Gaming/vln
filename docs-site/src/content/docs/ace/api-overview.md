---
title: ACE API Reference
description: Complete API reference for ACE Blackjack platform
---

# ACE API Reference

Complete documentation for all ACE REST API endpoints.

## Authentication

All API requests require authentication via Bearer token:

```bash
curl https://ace.api.vln.gg/api/tables \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Base URL

```
https://ace.api.vln.gg/api
```

## Core Endpoints

### Tables API

#### Create Table
- **POST** `/tables`
- Creates a new game table with configurable bet limits

#### List Tables
- **GET** `/tables`
- Retrieve all active tables

#### Get Table
- **GET** `/tables/{tableId}`
- Get details for a specific table

### Sessions API

#### Create Session
- **POST** `/sessions`
- Start a new player gaming session

#### Get Session
- **GET** `/sessions/{sessionId}`
- Retrieve session details and player state

#### List Sessions
- **GET** `/sessions`
- List all sessions (paginated)

### Play API

#### Deal Cards
- **POST** `/play/deal`
- Deal cards to player and dealer

#### Player Action
- **POST** `/play/action`
- Execute player action (hit, stand, double, split)

#### Get Hand Status
- **GET** `/play/{sessionId}/hand`
- Retrieve current hand state

### Settlements API

#### Settle Game
- **POST** `/settlements`
- Finalize and settle a game round

#### Get Settlement
- **GET** `/settlements/{settlementId}`
- Retrieve settlement details

## Error Handling

Standard HTTP status codes:
- `200` - Success
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `429` - Rate limited
- `500` - Server error

## Rate Limiting

- **Standard**: 1000 requests/minute per API key
- **Premium**: 10000 requests/minute per API key

Check rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1704067200
```

## Pagination

List endpoints support pagination:

```bash
curl "https://ace.api.vln.gg/api/sessions?page=1&limit=50"
```

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1234,
    "pages": 25
  }
}
```

## Request/Response Format

All requests and responses use JSON.

### Request Example
```bash
curl -X POST https://ace.api.vln.gg/api/sessions \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "tableId": "tbl_xyz123",
    "playerId": "player_abc456",
    "buyIn": 1000,
    "currency": "USD"
  }'
```

### Response Example
```json
{
  "sessionId": "sess_def789",
  "tableId": "tbl_xyz123",
  "playerId": "player_abc456",
  "balance": 1000,
  "status": "active",
  "createdAt": "2026-04-28T10:00:00Z"
}
```

## Full Endpoint Documentation

See detailed documentation for each endpoint group:
- [Tables API](/docs/ace/api/tables)
- [Sessions API](/docs/ace/api/sessions)
- [Play API](/docs/ace/api/play)
- [Settlements API](/docs/ace/api/settlements)
- [Analytics API](/docs/ace/api/analytics)

## SDKs & Client Libraries

### JavaScript/Node.js
```bash
npm install @vln/ace-sdk
```

```typescript
import { AceClient } from '@vln/ace-sdk';

const client = new AceClient({
  apiKey: process.env.ACE_API_KEY
});
```

### Python
```bash
pip install vln-ace
```

```python
from vln_ace import AceClient

client = AceClient(api_key=os.getenv('ACE_API_KEY'))
```

## Webhooks

Subscribe to real-time events:

```bash
curl -X POST https://ace.api.vln.gg/api/webhooks \
  -H "Authorization: Bearer sk_live_..." \
  -d '{
    "url": "https://your-app.example.com/webhooks/ace",
    "events": ["game.dealt", "game.settled", "player.busted"]
  }'
```

## API Changelog

- **v1.0.0** (2026-04) - Initial release
- **v1.1.0** (Planned) - Enhanced analytics

## Support

- **API Issues**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- **Email**: security@vln.gg
