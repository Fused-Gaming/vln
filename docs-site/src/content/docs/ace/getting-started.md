---
title: Getting Started with ACE
description: Installation and setup guide for ACE Blackjack platform
---

# Getting Started with ACE

This guide will walk you through installing and configuring ACE Blackjack for your development environment.

## Prerequisites

Before installing ACE, ensure you have:

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **Redis** >= 7.x (optional, for caching)
- **Docker** (optional, for containerized setup)
- **pnpm** >= 8.x (package manager)

## Installation

### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/Fused-Gaming/ace.git
cd ace

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Configure your environment
nano .env
# Set DATABASE_URL, API_KEY, etc.

# Run database migrations
pnpm migrate

# Start development server
pnpm dev
```

The server will be available at `http://localhost:3000`

### Option 2: Docker Compose

```bash
# Clone and navigate to project
git clone https://github.com/Fused-Gaming/ace.git
cd ace

# Start services with Docker Compose
docker-compose up -d

# Run migrations
docker exec ace-app pnpm migrate

# Check services are running
docker ps | grep ace
```

## Initial Configuration

### Environment Variables

Create `.env` with these required variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ace"

# API Configuration
API_PORT=3000
API_KEY="your-api-key-here"
API_SECRET="your-api-secret-here"

# Game Settings
MIN_BET=10
MAX_BET=10000
CURRENCY="USD"

# Security
JWT_SECRET="your-jwt-secret"
ENCRYPTION_KEY="your-encryption-key"
```

### Database Setup

```bash
# Create database
createdb ace_development

# Run migrations
pnpm migrate

# Seed initial data (optional)
pnpm seed
```

## Your First Game Session

### 1. Create a Game Table

```bash
curl -X POST http://localhost:3000/api/tables \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Table 1",
    "minBet": 10,
    "maxBet": 1000,
    "currency": "USD"
  }'
```

Response:
```json
{
  "id": "tbl_xyz123",
  "name": "Table 1",
  "status": "open",
  "createdAt": "2026-04-28T10:00:00Z"
}
```

### 2. Start a Player Session

```bash
curl -X POST http://localhost:3000/api/sessions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tableId": "tbl_xyz123",
    "playerId": "player_abc456",
    "buyIn": 1000,
    "currency": "USD"
  }'
```

Response:
```json
{
  "sessionId": "sess_def789",
  "tableId": "tbl_xyz123",
  "playerId": "player_abc456",
  "balance": 1000,
  "status": "active"
}
```

### 3. Deal Cards

```bash
curl -X POST http://localhost:3000/api/play \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "sess_def789",
    "action": "deal",
    "betAmount": 100
  }'
```

### 4. Player Action

```bash
curl -X POST http://localhost:3000/api/play \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "sess_def789",
    "action": "hit"
  }'
```

## Verification

Check that everything is working:

```bash
# Health check endpoint
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","version":"1.0.0"}

# API status
curl http://localhost:3000/api/status \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Next Steps

- [Game Mechanics](/docs/ace/game-mechanics) - Learn the rules and mechanics
- [API Reference](/docs/ace/api/overview) - Complete API documentation
- [Integration Guide](/docs/ace/integration) - Server integration patterns
- [Security & RNG](/docs/ace/security) - Understand fairness and validation

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
PORT=3001 pnpm dev
```

### Database Connection Failed
```bash
# Check PostgreSQL is running
psql postgres://user:password@localhost:5432/ace

# Verify DATABASE_URL in .env
```

### API Key Not Working
```bash
# Generate a new API key
pnpm cli:generate-key

# Add to .env
API_KEY="new-key-here"
```

## Getting Help

- **Documentation**: [ACE Overview](/docs/ace)
- **Issues**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- **Support**: security@vln.gg
