---
title: Getting Started with Skill-MCP
description: Installation and setup guide for Skill-MCP tools platform
---

# Getting Started with Skill-MCP

This guide will walk you through installing and setting up Skill-MCP in your environment.

## Prerequisites

Before installing Skill-MCP, ensure you have:

- **Node.js** >= 18.x or **Python** >= 3.9
- **API Key** from VLN (contact security@vln.gg)
- **Package Manager** (pnpm, npm, or pip)
- **Git** for repository access
- **Docker** (optional, for containerized setup)

## Installation

### Option 1: Node.js/TypeScript

```bash
# Install via npm
npm install @vln/skill-mcp

# Or with pnpm
pnpm add @vln/skill-mcp

# Or with yarn
yarn add @vln/skill-mcp
```

### Option 2: Python

```bash
# Install via pip
pip install vln-skill-mcp

# Upgrade existing installation
pip install --upgrade vln-skill-mcp
```

### Option 3: From Source

```bash
# Clone the repository
git clone https://github.com/Fused-Gaming/skill-mcp.git
cd skill-mcp

# Install dependencies
pnpm install

# Build the project
pnpm build

# Install locally
pnpm link
```

## Configuration

### Get Your API Key

1. Visit https://skill-mcp.vln.gg/dashboard
2. Navigate to **API Keys**
3. Click **Generate New Key**
4. Copy the key (you'll only see it once!)

### Set Environment Variables

```bash
# .env file
SKILL_API_KEY="sk_live_xxxxxxxxxxxxx"
SKILL_API_URL="https://skill-mcp.api.vln.gg"

# Optional: Enable debug logging
SKILL_DEBUG="true"
```

### Initialize Client

#### JavaScript/TypeScript
```typescript
import { SkillClient } from '@vln/skill-mcp';

const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY,
  baseUrl: process.env.SKILL_API_URL
});
```

#### Python
```python
from skill_mcp import SkillClient

client = SkillClient(
    api_key=os.getenv('SKILL_API_KEY'),
    base_url=os.getenv('SKILL_API_URL')
)
```

## Your First Tool Execution

### Execute a Simple Tool

#### JavaScript
```typescript
// List available tools
const tools = await client.tools.list();
console.log(`Available tools: ${tools.length}`);

// Execute a tool
const result = await client.tools.execute('analyze-contract', {
  contractAddress: '0x1234567890123456789012345678901234567890',
  chainId: 1
});

console.log(`Vulnerabilities found: ${result.vulnerabilities.length}`);
```

#### Python
```python
# List available tools
tools = client.tools.list()
print(f"Available tools: {len(tools)}")

# Execute a tool
result = client.tools.execute('analyze-contract', {
    'contractAddress': '0x1234567890123456789012345678901234567890',
    'chainId': 1
})

print(f"Vulnerabilities found: {len(result['vulnerabilities'])}")
```

#### REST API
```bash
# List tools
curl https://skill-mcp.api.vln.gg/api/tools \
  -H "Authorization: Bearer sk_live_..."

# Execute a tool
curl -X POST https://skill-mcp.api.vln.gg/api/tools/execute \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "toolName": "analyze-contract",
    "parameters": {
      "contractAddress": "0x1234567890123456789012345678901234567890",
      "chainId": 1
    }
  }'
```

## Common Use Cases

### Smart Contract Analysis
```typescript
const result = await client.tools.execute('analyze-contract', {
  contractAddress: '0x...',
  chainId: 1,
  includeGasAnalysis: true
});

result.vulnerabilities.forEach(vuln => {
  console.log(`${vuln.type}: ${vuln.description}`);
});
```

### Wallet Risk Assessment
```typescript
const risk = await client.tools.execute('assess-wallet-risk', {
  walletAddress: '0x...',
  timeWindow: '30d'
});

console.log(`Risk Score: ${risk.riskScore} (${risk.riskLevel})`);
```

### Market Data Fetching
```typescript
const market = await client.tools.execute('fetch-market-data', {
  symbol: 'ETH/USD',
  interval: '1h'
});

console.log(`Price: $${market.price}, Volume: ${market.volume}`);
```

## Verification

Check that everything is working:

```bash
# List available tools
curl https://skill-mcp.api.vln.gg/api/tools \
  -H "Authorization: Bearer sk_live_..."

# Get tool details
curl https://skill-mcp.api.vln.gg/api/tools/analyze-contract \
  -H "Authorization: Bearer sk_live_..."

# Check usage quotas
curl https://skill-mcp.api.vln.gg/api/quotas \
  -H "Authorization: Bearer sk_live_..."
```

## Best Practices

### 1. Error Handling
```typescript
try {
  const result = await client.tools.execute('analyze-contract', params);
} catch (error) {
  if (error.code === 'RATE_LIMITED') {
    console.log('Rate limited, retrying in 60s');
    await new Promise(resolve => setTimeout(resolve, 60000));
  } else {
    console.error('Tool execution failed:', error.message);
  }
}
```

### 2. Caching Results
```typescript
const cache = new Map();

async function analyzeWithCache(address) {
  if (cache.has(address)) {
    return cache.get(address);
  }
  
  const result = await client.tools.execute('analyze-contract', {
    contractAddress: address
  });
  
  cache.set(address, result);
  return result;
}
```

### 3. Rate Limiting
```typescript
// Check quotas before executing
const quotas = await client.quotas.get();
if (quotas.remaining < 10) {
  console.log('Approaching quota limit');
}
```

## Dashboard & Monitoring

Visit **https://skill-mcp.vln.gg/dashboard** to:
- View execution history
- Monitor API usage
- Manage API keys
- Check rate limits
- View tool documentation

## Troubleshooting

### Authentication Failed
```
Error: Invalid API key
```
- Verify SKILL_API_KEY is set correctly
- Check API key hasn't expired
- Generate a new key if needed

### Rate Limited
```
Error: Too many requests (429)
```
- Wait before retrying (see Retry-After header)
- Check quota usage in dashboard
- Upgrade plan if needed

### Tool Not Found
```
Error: Tool 'my-tool' not found
```
- Verify tool name is correct
- List available tools: `client.tools.list()`
- Check tool documentation

## Next Steps

- [Tool Reference](/docs/skill/tools) - All available tools
- [Integration Guide](/docs/skill/integration) - Framework integration
- [Best Practices](/docs/skill/best-practices) - Design patterns
- [API Reference](/docs/skill/api) - Complete API docs
- [Custom Tools](/docs/skill/custom-tools) - Build your own tools

## Getting Help

- **Documentation**: [Skill-MCP Overview](/docs/skill)
- **Issues**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- **Support**: security@vln.gg
