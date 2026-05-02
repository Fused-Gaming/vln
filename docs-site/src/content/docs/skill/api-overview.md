---
title: Skill-MCP API Reference
description: Complete API reference for Skill-MCP tools platform
---

# Skill-MCP API Reference

Complete REST API reference for Skill-MCP tools execution and management.

## Authentication

All API requests require Bearer token authentication:

```bash
curl https://skill-mcp.api.vln.gg/api/tools \
  -H "Authorization: Bearer sk_live_YOUR_KEY"
```

## Base URL

```
https://skill-mcp.api.vln.gg/api
```

## Core Endpoints

### Tools API

#### Execute Tool
- **POST** `/tools/execute`
- Execute a tool with parameters

#### List Tools
- **GET** `/tools`
- List all available tools

#### Get Tool Details
- **GET** `/tools/{toolName}`
- Get details about a specific tool

#### Tool History
- **GET** `/tools/{toolName}/history`
- View execution history for a tool

### Resources API

#### List Resources
- **GET** `/resources`
- Get available data resources

#### Get Resource
- **GET** `/resources/{resourceId}`
- Retrieve a specific resource

### Quotas API

#### Check Quotas
- **GET** `/quotas`
- View your remaining quotas and limits

#### Get Usage Stats
- **GET** `/usage`
- Detailed usage statistics

### Executions API

#### Get Execution
- **GET** `/executions/{executionId}`
- Retrieve execution results

#### List Executions
- **GET** `/executions`
- View execution history

## Error Handling

Standard HTTP status codes:
- `200` - Success
- `400` - Bad request / Invalid parameters
- `401` - Unauthorized
- `403` - Forbidden / Insufficient permissions
- `404` - Tool not found
- `429` - Rate limited
- `500` - Server error

### Error Response Format

```json
{
  "error": {
    "code": "TOOL_NOT_FOUND",
    "message": "Tool 'analyze-contract' not found",
    "details": {
      "toolName": "analyze-contract",
      "availableTools": ["analyze-contract", "assess-wallet-risk"]
    }
  }
}
```

## Rate Limiting

Limits vary by API key tier:

| Tier | Requests/Min | Concurrent |
|------|-------------|-----------|
| Free | 100 | 10 |
| Pro | 1000 | 50 |
| Enterprise | Unlimited | 500 |

Check rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1704067200
```

## Request Format

All requests use JSON:

```bash
curl -X POST https://skill-mcp.api.vln.gg/api/tools/execute \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "toolName": "analyze-contract",
    "parameters": {
      "contractAddress": "0x...",
      "chainId": 1
    }
  }'
```

## Response Format

Standard response envelope:

```json
{
  "executionId": "exec_xyz123",
  "tool": "analyze-contract",
  "status": "success",
  "duration": 1234,
  "result": {
    "vulnerabilities": [...],
    "riskScore": 45
  }
}
```

## Pagination

List endpoints support pagination:

```bash
curl "https://skill-mcp.api.vln.gg/api/tools?page=1&limit=50"
```

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

## Tool Categories

See complete tool reference:
- [Security & Analysis Tools](/docs/skill/tools/security)
- [Blockchain Operations Tools](/docs/skill/tools/blockchain)
- [Gaming Analytics Tools](/docs/skill/tools/gaming)
- [Data & Integration Tools](/docs/skill/tools/data)

## SDKs & Client Libraries

### JavaScript/TypeScript
```bash
npm install @vln/skill-mcp
```

```typescript
import { SkillClient } from '@vln/skill-mcp';

const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY
});

const result = await client.tools.execute('analyze-contract', {
  contractAddress: '0x...'
});
```

### Python
```bash
pip install vln-skill-mcp
```

```python
from skill_mcp import SkillClient

client = SkillClient(api_key=os.getenv('SKILL_API_KEY'))

result = client.tools.execute('analyze-contract', {
    'contractAddress': '0x...'
})
```

### Go
```go
import "github.com/Fused-Gaming/skill-mcp-go"

client := skill.NewClient(os.Getenv("SKILL_API_KEY"))
result, err := client.ExecuteTool("analyze-contract", params)
```

## Webhooks

Subscribe to execution events:

```bash
curl -X POST https://skill-mcp.api.vln.gg/api/webhooks \
  -H "Authorization: Bearer sk_live_..." \
  -d '{
    "url": "https://your-app.example.com/webhooks/skill",
    "events": ["execution.success", "execution.failed", "quota.exceeded"]
  }'
```

## API Changelog

- **v1.0.0** (2026-03) - Initial release
- **v1.1.0** (2026-04) - Added custom tools support
- **v1.2.0** (Planned) - Enhanced caching

## Support

- **Tool Issues**: [Tool Reference](/docs/skill/tools)
- **API Questions**: [Integration Guide](/docs/skill/integration)
- **Support**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues) or security@vln.gg
