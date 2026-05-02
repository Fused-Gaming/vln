---
title: Skill-MCP FAQ & Troubleshooting
description: Frequently asked questions and troubleshooting guide for Skill-MCP tools
---

# Skill-MCP FAQ & Troubleshooting

Common questions and solutions for Skill-MCP.

## General Questions

### What is Skill-MCP?
Skill-MCP is VLN's implementation of the Model Context Protocol (MCP) providing 50+ tools for smart contract analysis, gaming analytics, blockchain operations, and data integration.

### How many tools are available?
Currently 50+ tools across 4 categories:
- Security & Analysis (15 tools)
- Blockchain Operations (12 tools)
- Gaming Analytics (10 tools)
- Data & Integration (13 tools)

### What languages are supported?
- JavaScript/TypeScript (native)
- Python (full SDK)
- Go (Go SDK)
- REST API (all languages)

### What's the pricing model?
- Free tier: 100 requests/minute, 10 concurrent
- Pro: 1000 requests/minute, 50 concurrent
- Enterprise: Unlimited with custom SLA

Contact sales@vln.gg for details.

## Setup & Installation

### Q: How do I install Skill-MCP?

**JavaScript:**
```bash
npm install @vln/skill-mcp
```

**Python:**
```bash
pip install vln-skill-mcp
```

**Go:**
```bash
go get github.com/Fused-Gaming/skill-mcp-go
```

### Q: I get "No API key provided" error
**A:** Set environment variable:

```bash
export SKILL_API_KEY="sk_live_xxxxx"
```

Or pass directly to client:
```typescript
const client = new SkillClient({
  apiKey: 'sk_live_xxxxx'
});
```

### Q: Where do I get an API key?
**A:**
1. Visit https://skill-mcp.vln.gg/dashboard
2. Click "API Keys"
3. Generate new key
4. Copy and store securely

### Q: Can I use the same key for dev and production?
**A:** Not recommended. Generate separate keys:
- `sk_test_...` for development
- `sk_live_...` for production

### Q: How do I rotate API keys?
**A:** In dashboard:
1. Go to API Keys
2. Click "Rotate" on existing key
3. Old key becomes invalid immediately
4. Update all applications

## Tool Usage

### Q: How do I list available tools?
**A:**

**JavaScript:**
```typescript
const tools = await client.tools.list();
tools.forEach(tool => console.log(tool.name));
```

**Python:**
```python
tools = client.tools.list()
for tool in tools:
    print(tool['name'])
```

**REST API:**
```bash
curl https://skill-mcp.api.vln.gg/api/tools \
  -H "Authorization: Bearer sk_live_..."
```

### Q: What does the "analyze-contract" tool do?
**A:** Scans a smart contract for security vulnerabilities:

```typescript
const analysis = await client.tools.execute('analyze-contract', {
  contractAddress: '0x...',
  chainId: 1
});

// Returns:
// - vulnerabilities array
// - riskScore (0-100)
// - recommendations
```

### Q: How long do tool executions take?
**A:** Typical execution times:
- analyze-contract: 2-5 seconds
- assess-wallet-risk: 1-2 seconds
- fetch-market-data: 500ms-1s
- Check tool documentation for specifics

### Q: Can I execute multiple tools concurrently?
**A:** Yes, up to your concurrency limit:

**JavaScript:**
```typescript
const results = await Promise.all([
  client.tools.execute('analyze-contract', params1),
  client.tools.execute('assess-wallet-risk', params2),
  client.tools.execute('fetch-market-data', params3)
]);
```

### Q: What if a tool returns an error?
**A:** Handle errors gracefully:

```typescript
try {
  const result = await client.tools.execute('analyze-contract', {
    contractAddress: address
  });
} catch (error) {
  if (error.code === 'INVALID_PARAMS') {
    console.error('Invalid parameters:', error.details);
  } else if (error.code === 'RATE_LIMITED') {
    // Wait and retry
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Rate Limiting & Quotas

### Q: How do I check my quota?
**A:**

```typescript
const quotas = await client.quotas.get();
console.log(`Remaining: ${quotas.remaining} / ${quotas.limit}`);
```

### Q: What happens if I exceed my quota?
**A:** You'll get a 429 error:

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Quota exceeded",
    "retryAfter": 60
  }
}
```

### Q: Can I request a higher quota?
**A:** Yes! Email sales@vln.gg with:
- Current usage
- Projected needs
- Use case description

### Q: Are there per-minute and per-day limits?
**A:** Yes:
- Free: 100 req/min, 10,000 req/day
- Pro: 1000 req/min, 1M req/day
- Enterprise: Custom limits

### Q: How do I avoid rate limiting?
**A:**
1. Batch operations when possible
2. Cache results (10+ minute TTL)
3. Implement exponential backoff
4. Monitor quota usage
5. Upgrade tier if needed

## API & Integration

### Q: Do you have a REST API?
**A:** Yes! Full REST API:

```bash
curl -X POST https://skill-mcp.api.vln.gg/api/tools/execute \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "toolName": "analyze-contract",
    "parameters": {
      "contractAddress": "0x..."
    }
  }'
```

### Q: Can I use Skill-MCP with my LLM/AI?
**A:** Yes! Skill-MCP is designed for LLM integration. Tools work seamlessly with:
- Claude API
- OpenAI API
- Custom AI systems

### Q: How do I integrate with FastAPI?
**A:**

```python
from fastapi import FastAPI
from skill_mcp import SkillClient

app = FastAPI()
skill = SkillClient(api_key='sk_live_...')

@app.post("/analyze")
async def analyze(address: str):
    return await skill.tools.execute('analyze-contract', {
        'contractAddress': address
    })
```

### Q: Can I use webhooks?
**A:** Yes, for event-driven integration:

```bash
curl -X POST https://skill-mcp.api.vln.gg/api/webhooks \
  -H "Authorization: Bearer sk_live_..." \
  -d '{
    "url": "https://your-app.com/webhooks/skill",
    "events": ["execution.success", "execution.failed"]
  }'
```

## Troubleshooting

### Q: I get "Tool not found" error
**A:**
1. Check tool name is correct
2. List available tools to verify
3. Some tools may require additional setup

### Q: Execution times out
**A:**
1. Check tool documentation for timeout
2. Try with simpler parameters
3. Contact support if persistent

### Q: I keep getting "Invalid address" error
**A:**
- Verify address format (must be 0x + 40 hex chars)
- Check for extra spaces
- Ensure address is checksummed correctly

```typescript
// Correct format
'0x1234567890123456789012345678901234567890'

// Wrong formats
'0x12345678901234567890123456789012345678'  // Too short
'12345678901234567890123456789012345678'    // Missing 0x
```

### Q: Results are cached, how do I force refresh?
**A:**
- Cache TTL is 10 minutes
- Results are automatically refreshed after TTL
- For immediate refresh, include `skipCache: true`:

```typescript
const result = await client.tools.execute('analyze-contract', {
  contractAddress: address,
  skipCache: true  // Force fresh analysis
});
```

### Q: Tool execution is slow
**A:**
1. Check typical execution time in docs
2. Verify network connectivity
3. Check current API load (dashboard)
4. Try again in a few minutes
5. Contact support if consistently slow

### Q: How do I debug tool execution?
**A:** Enable debug logging:

```typescript
const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY,
  debug: true  // Enable verbose logging
});
```

## Custom Tools

### Q: Can I create custom tools?
**A:** Yes! Custom tools are available for Pro/Enterprise:

1. Request custom tool development
2. Provide tool specification
3. VLN develops and deploys
4. Access via standard API

Contact sales@vln.gg for details.

### Q: How do I use a custom tool?
**A:** Same as built-in tools:

```typescript
const result = await client.tools.execute('custom-my-tool', params);
```

## Data & Privacy

### Q: What data do you store?
**A:**
- Execution history (30 days)
- Quotas and usage (forever)
- API keys (hashed)
- Logs for debugging (30 days)

### Q: Is my data encrypted?
**A:** Yes:
- In transit: TLS 1.3
- At rest: AES-256-GCM
- No plaintext logs

### Q: Can I delete my execution history?
**A:** Contact privacy@vln.gg with request.

### Q: Is Skill-MCP GDPR compliant?
**A:** Yes, fully GDPR compliant with DPA.

## Performance & Limits

### Q: What's the maximum request size?
**A:** 1MB per request

### Q: What's the maximum response size?
**A:** 10MB per response

### Q: Can I process large datasets?
**A:** For bulk processing:
1. Batch requests (10-100 per batch)
2. Implement pagination
3. Use webhook callbacks
4. Contact sales for bulk pricing

## Getting Help

**Need assistance?**

- 📖 [Tool Reference](/docs/skill/tools)
- 📚 [Integration Guide](/docs/skill/integration)
- 🐛 [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- 💬 [Discord](https://discord.gg/vln)
- 📧 [support@vln.gg](mailto:support@vln.gg)
- 🚨 [security@vln.gg](mailto:security@vln.gg)
