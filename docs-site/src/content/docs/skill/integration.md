---
title: Skill-MCP Integration Guide
description: Framework integration patterns and best practices for Skill-MCP tools
---

# Skill-MCP Integration Guide

This guide covers integration patterns for using Skill-MCP tools in your applications.

## Language-Specific Setup

### JavaScript/TypeScript

#### Installation
```bash
npm install @vln/skill-mcp
# or
pnpm add @vln/skill-mcp
```

#### Basic Setup
```typescript
import { SkillClient } from '@vln/skill-mcp';

const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY,
  baseUrl: 'https://skill-mcp.api.vln.gg',
  debug: process.env.NODE_ENV === 'development'
});

export default client;
```

### Python

#### Installation
```bash
pip install vln-skill-mcp
```

#### Basic Setup
```python
from skill_mcp import SkillClient
import os

client = SkillClient(
    api_key=os.getenv('SKILL_API_KEY'),
    base_url='https://skill-mcp.api.vln.gg',
    debug=os.getenv('DEBUG', False)
)
```

### Go

#### Installation
```bash
go get github.com/Fused-Gaming/skill-mcp-go
```

#### Basic Setup
```go
package main

import (
    "github.com/Fused-Gaming/skill-mcp-go"
)

func init() {
    client := skill.NewClient(os.Getenv("SKILL_API_KEY"))
}
```

## Framework Integration

### Express.js / Node.js

```typescript
import express from 'express';
import { SkillClient } from '@vln/skill-mcp';

const app = express();
const skillClient = new SkillClient({
  apiKey: process.env.SKILL_API_KEY
});

// Middleware to attach client
app.use((req, res, next) => {
  req.skill = skillClient;
  next();
});

// Route to analyze a contract
app.post('/api/analyze-contract', async (req, res) => {
  try {
    const result = await req.skill.tools.execute('analyze-contract', {
      contractAddress: req.body.address,
      chainId: req.body.chainId
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Django / Python

```python
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from skill_mcp import SkillClient

skill_client = SkillClient(api_key=os.getenv('SKILL_API_KEY'))

@require_http_methods(["POST"])
def analyze_contract(request):
    import json
    data = json.loads(request.body)
    
    try:
        result = skill_client.tools.execute('analyze-contract', {
            'contractAddress': data['address'],
            'chainId': data['chainId']
        })
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
```

### FastAPI / Python

```python
from fastapi import FastAPI, HTTPException
from skill_mcp import SkillClient

app = FastAPI()
skill = SkillClient(api_key=os.getenv('SKILL_API_KEY'))

@app.post("/api/analyze-contract")
async def analyze_contract(address: str, chain_id: int):
    try:
        result = await skill.tools.execute('analyze-contract', {
            'contractAddress': address,
            'chainId': chain_id
        })
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## Common Use Cases

### 1. Smart Contract Analysis

```typescript
// Analyze a contract for vulnerabilities
async function analyzeContract(address: string, chainId: number) {
  const analysis = await client.tools.execute('analyze-contract', {
    contractAddress: address,
    chainId: chainId
  });
  
  return {
    vulnerabilities: analysis.vulnerabilities,
    riskScore: analysis.riskScore,
    recommendations: analysis.recommendations
  };
}
```

### 2. Wallet Risk Assessment

```python
# Assess wallet risk profile
def assess_wallet(address: str, time_window: str = '30d'):
    risk = client.tools.execute('assess-wallet-risk', {
        'walletAddress': address,
        'timeWindow': time_window
    })
    
    return {
        'riskLevel': risk['riskLevel'],  # low, medium, high
        'score': risk['riskScore'],
        'factors': risk['riskFactors']
    }
```

### 3. Market Data Fetching

```typescript
// Fetch real-time market data
async function getMarketData(symbol: string, interval: string = '1h') {
  const data = await client.tools.execute('fetch-market-data', {
    symbol: symbol,
    interval: interval
  });
  
  return {
    price: data.price,
    volume: data.volume,
    change24h: data.change24h,
    timestamp: data.timestamp
  };
}
```

### 4. Player Analytics

```typescript
// Analyze player behavior patterns
async function analyzePlayer(playerId: string) {
  const analysis = await client.tools.execute('analyze-player-behavior', {
    playerId: playerId,
    timeWindow: '7d'
  });
  
  return {
    avgSessionLength: analysis.avgSessionLength,
    winRate: analysis.winRate,
    suspiciousPatterns: analysis.suspiciousPatterns
  };
}
```

## Error Handling

### Comprehensive Error Management

```typescript
async function executeToolWithErrorHandling(toolName: string, params: any) {
  try {
    return await client.tools.execute(toolName, params);
  } catch (error) {
    if (error.code === 'RATE_LIMITED') {
      const retryAfter = error.retryAfter || 60;
      console.log(`Rate limited. Retrying in ${retryAfter}s`);
      await sleep(retryAfter * 1000);
      return executeToolWithErrorHandling(toolName, params);
    }
    
    if (error.code === 'INVALID_PARAMS') {
      console.error('Invalid parameters:', error.details);
      throw new Error(`Invalid parameters for ${toolName}`);
    }
    
    if (error.code === 'TOOL_NOT_FOUND') {
      console.error(`Tool ${toolName} not found`);
      throw new Error(`Tool not available: ${toolName}`);
    }
    
    // Generic error
    console.error('Tool execution failed:', error);
    throw error;
  }
}
```

## Caching & Performance

### Result Caching

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minute TTL

async function getContractAnalysisCached(address: string) {
  const cacheKey = `analysis:${address}`;
  
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  
  // Fetch from API
  const result = await client.tools.execute('analyze-contract', {
    contractAddress: address,
    chainId: 1
  });
  
  // Store in cache
  cache.set(cacheKey, result);
  return result;
}
```

### Batch Operations

```typescript
// Process multiple tools concurrently
async function analyzeMultipleContracts(addresses: string[]) {
  const promises = addresses.map(addr =>
    client.tools.execute('analyze-contract', {
      contractAddress: addr,
      chainId: 1
    })
  );
  
  return Promise.all(promises);
}
```

## Rate Limiting

### Monitor Quotas

```typescript
async function checkQuotas() {
  const quotas = await client.quotas.get();
  
  return {
    remaining: quotas.remaining,
    limit: quotas.limit,
    resetAt: quotas.resetAt,
    percentUsed: (quotas.used / quotas.limit) * 100
  };
}

// Check before executing expensive operations
async function executeIfCapacity(toolName: string, params: any) {
  const quotas = await checkQuotas();
  
  if (quotas.percentUsed > 80) {
    throw new Error('Approaching quota limit');
  }
  
  return client.tools.execute(toolName, params);
}
```

## Logging & Monitoring

### Structured Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'skill-mcp.log' })
  ]
});

async function executeWithLogging(toolName: string, params: any) {
  const startTime = Date.now();
  
  try {
    const result = await client.tools.execute(toolName, params);
    
    logger.info('Tool executed successfully', {
      tool: toolName,
      duration: Date.now() - startTime,
      params: params
    });
    
    return result;
  } catch (error) {
    logger.error('Tool execution failed', {
      tool: toolName,
      error: error.message,
      duration: Date.now() - startTime
    });
    throw error;
  }
}
```

## Testing

### Unit Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { SkillClient } from '@vln/skill-mcp';

describe('Skill-MCP Integration', () => {
  let client: SkillClient;
  
  beforeEach(() => {
    client = new SkillClient({
      apiKey: process.env.SKILL_API_KEY
    });
  });
  
  it('should list available tools', async () => {
    const tools = await client.tools.list();
    expect(tools.length).toBeGreaterThan(0);
  });
  
  it('should execute analyze-contract tool', async () => {
    const result = await client.tools.execute('analyze-contract', {
      contractAddress: '0x1234567890123456789012345678901234567890',
      chainId: 1
    });
    
    expect(result).toHaveProperty('vulnerabilities');
    expect(result).toHaveProperty('riskScore');
  });
});
```

### Integration Tests

```typescript
it('should handle rate limiting gracefully', async () => {
  const quotas = await client.quotas.get();
  
  if (quotas.remaining < 5) {
    expect(() => client.tools.execute('expensive-tool', {}))
      .toThrow('Rate limited');
  }
});
```

## Security Best Practices

### 1. API Key Management
```typescript
// Use environment variables
const apiKey = process.env.SKILL_API_KEY;
if (!apiKey) {
  throw new Error('SKILL_API_KEY not configured');
}

const client = new SkillClient({ apiKey });
```

### 2. Input Validation
```typescript
// Validate addresses before execution
function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

async function analyzeContractSafe(address: string) {
  if (!validateAddress(address)) {
    throw new Error('Invalid contract address');
  }
  return client.tools.execute('analyze-contract', {
    contractAddress: address
  });
}
```

### 3. HTTPS Only
```typescript
const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY,
  baseUrl: 'https://skill-mcp.api.vln.gg' // Always HTTPS
});
```

## Next Steps

- [Tool Reference](/docs/skill/tools) - Explore all tools
- [API Reference](/docs/skill/api-overview) - Complete API docs
- [Best Practices](/docs/skill/best-practices) - Design patterns
- [Troubleshooting](/docs/skill/faq) - Common issues
