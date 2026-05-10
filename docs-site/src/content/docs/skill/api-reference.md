---
title: "API Reference"
description: "Complete API documentation for all Skill-MCP endpoints and tools"
---

# API Reference

Complete documentation of all Skill-MCP API endpoints, request/response formats, and available tools.

## Base URL

```
https://api.skill.vln.gg/v1
```

All API requests must include authentication:

```
Authorization: Bearer sk_vln_xxxxx
Content-Type: application/json
```

## Core Endpoints

### List Tools

Get a list of all available tools.

**Endpoint:** `GET /tools`

**Query Parameters:**
- `category` (optional) - Filter by category: `security`, `analysis`, `automation`, `integration`, `monitoring`
- `status` (optional) - Filter by status: `ready`, `beta`, `deprecated`
- `search` (optional) - Search tool names and descriptions
- `limit` (optional) - Max results (default 50, max 100)
- `offset` (optional) - Pagination offset (default 0)

**Response:**

```json
{
  "tools": [
    {
      "id": "github-list-prs",
      "name": "GitHub List PRs",
      "category": "integration",
      "description": "List pull requests from a GitHub repository",
      "status": "ready",
      "inputs": {
        "owner": {
          "type": "string",
          "required": true,
          "description": "Repository owner username"
        },
        "repo": {
          "type": "string",
          "required": true,
          "description": "Repository name"
        },
        "state": {
          "type": "string",
          "required": false,
          "enum": ["open", "closed", "all"],
          "default": "open"
        }
      },
      "outputs": {
        "prs": {
          "type": "array",
          "description": "List of pull requests"
        },
        "count": {
          "type": "number",
          "description": "Total PR count"
        }
      },
      "rate_limit": "100 calls/min",
      "timeout": "30s"
    }
  ],
  "total": 28,
  "limit": 50,
  "offset": 0
}
```

### Get Tool Details

Get detailed information about a specific tool.

**Endpoint:** `GET /tools/{tool_id}`

**Path Parameters:**
- `tool_id` - The ID of the tool

**Response:**

```json
{
  "id": "github-list-prs",
  "name": "GitHub List PRs",
  "category": "integration",
  "description": "List pull requests from a GitHub repository",
  "status": "ready",
  "inputs": {
    "owner": {
      "type": "string",
      "required": true,
      "description": "Repository owner"
    },
    "repo": {
      "type": "string",
      "required": true,
      "description": "Repository name"
    },
    "state": {
      "type": "string",
      "required": false,
      "enum": ["open", "closed", "all"],
      "default": "open"
    }
  },
  "outputs": {
    "prs": {
      "type": "array",
      "description": "Pull requests"
    },
    "count": {
      "type": "number",
      "description": "Total count"
    }
  },
  "examples": [
    {
      "name": "List open PRs",
      "input": {
        "owner": "vln",
        "repo": "vln-gg",
        "state": "open"
      },
      "output": {
        "prs": [...],
        "count": 5
      }
    }
  ],
  "rate_limit": "100 calls/min",
  "timeout": "30s",
  "documentation": "https://docs.skill.vln.gg/tools/github-list-prs"
}
```

### Invoke Tool

Execute a tool with the provided inputs.

**Endpoint:** `POST /tools/{tool_id}/invoke`

**Path Parameters:**
- `tool_id` - The tool to invoke

**Query Parameters:**
- `async` (optional) - Execute asynchronously (default false)
- `timeout` (optional) - Max execution time in seconds (default 30, max 300)

**Request Body:**

```json
{
  "owner": "vln",
  "repo": "vln-gg",
  "state": "open"
}
```

**Response (Sync):**

```json
{
  "status": "success",
  "execution_id": "exec_abcd1234",
  "result": {
    "prs": [
      {
        "id": 1,
        "title": "Add feature X",
        "author": "dev1",
        "state": "open"
      }
    ],
    "count": 1
  },
  "timing": {
    "total_ms": 245,
    "execution_ms": 200,
    "processing_ms": 45
  }
}
```

**Response (Async):**

```json
{
  "status": "queued",
  "execution_id": "exec_abcd1234",
  "message": "Tool execution queued. Check status for results.",
  "status_url": "/executions/exec_abcd1234"
}
```

## Execution Management

### Get Execution Status

Check the status and result of a tool execution.

**Endpoint:** `GET /executions/{execution_id}`

**Path Parameters:**
- `execution_id` - The execution ID

**Response:**

```json
{
  "id": "exec_abcd1234",
  "tool_id": "github-list-prs",
  "status": "success",
  "progress": 100,
  "result": {
    "prs": [...],
    "count": 1
  },
  "started_at": "2026-04-28T14:45:00Z",
  "completed_at": "2026-04-28T14:45:00.245Z",
  "duration_ms": 245
}
```

### Cancel Execution

Cancel a running or queued execution.

**Endpoint:** `DELETE /executions/{execution_id}`

**Path Parameters:**
- `execution_id` - The execution ID to cancel

**Response:**

```json
{
  "status": "cancelled",
  "execution_id": "exec_abcd1234",
  "message": "Execution cancelled successfully"
}
```

### List Executions

Get a history of tool executions.

**Endpoint:** `GET /executions`

**Query Parameters:**
- `status` (optional) - Filter by status: `queued`, `running`, `success`, `error`, `cancelled`
- `tool_id` (optional) - Filter by tool
- `limit` (optional) - Max results (default 50, max 100)
- `offset` (optional) - Pagination offset

**Response:**

```json
{
  "executions": [
    {
      "id": "exec_abcd1234",
      "tool_id": "github-list-prs",
      "status": "success",
      "started_at": "2026-04-28T14:45:00Z",
      "completed_at": "2026-04-28T14:45:00.245Z",
      "duration_ms": 245
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

## Authentication

### API Key

Include your API key in the Authorization header:

```
Authorization: Bearer sk_vln_xxxxx
```

### Key Types

**User Keys** - For development and testing
- Format: `sk_user_xxxxx`
- Revoked immediately when regenerated
- Can be deleted anytime

**Service Keys** - For production use
- Format: `sk_svc_xxxxx`
- Long-lived (non-expiring)
- Can be rotated for security

**Temporary Keys** - For time-limited access
- Format: `sk_temp_xxxxx`
- Expires after specified time (max 24 hours)
- Cannot be revoked, only expire

### Managing Keys

**Create Key:**

```
POST /keys
{
  "name": "My Integration",
  "type": "service"
}
```

**List Keys:**

```
GET /keys
```

**Revoke Key:**

```
DELETE /keys/{key_id}
```

## Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "parameter": "error details"
    },
    "suggestion": "How to fix this error",
    "support": "support@skill.vln.gg"
  }
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| UNAUTHORIZED | 401 | Missing or invalid API key |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Tool or execution not found |
| INVALID_REQUEST | 400 | Malformed request |
| RATE_LIMITED | 429 | Too many requests |
| TOOL_TIMEOUT | 504 | Tool execution timeout |
| TOOL_ERROR | 500 | Tool execution error |
| INTERNAL_ERROR | 500 | Server error |

### Retry Logic

Implement exponential backoff for retryable errors:

```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (!error.retryable || i === maxRetries - 1) throw error;
      const delay = Math.pow(2, i) * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

## Rate Limiting

All requests are rate-limited:

- **Standard Tier:** 100 requests/minute
- **Premium Tier:** 1,000 requests/minute
- **Enterprise:** Custom limits

### Rate Limit Headers

Every response includes rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1234567890
```

When rate limited, the response includes:

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests",
    "retry_after": 60
  }
}
```

## Pagination

List endpoints support pagination:

```
GET /tools?limit=20&offset=40
```

**Response:**

```json
{
  "items": [...],
  "total": 100,
  "limit": 20,
  "offset": 40,
  "has_more": true
}
```

## Tool Categories

### Security Tools (28)

Security scanning, vulnerability detection, compliance.

**Tools:**
- `semgrep-scan` - SAST code analysis
- `dependency-check` - Dependency scanning
- `trivy-scan` - Container image scanning
- `secret-scan` - Secret detection
- And 24 more...

### Analysis Tools

Data analysis, reporting, metrics.

**Tools:**
- `code-quality` - Code quality metrics
- `performance-profiling` - Performance analysis
- `log-analysis` - Log aggregation and search
- And more...

### Automation Tools

CI/CD, deployment, infrastructure.

**Tools:**
- `github-workflow` - GitHub Actions
- `docker-build` - Docker image builds
- `kubectl-apply` - Kubernetes deployment
- `lambda-invoke` - AWS Lambda
- And more...

### Integration Tools

Data flow, webhooks, notifications.

**Tools:**
- `github-list-prs` - GitHub PR management
- `slack-notify` - Slack notifications
- `webhook-trigger` - Webhook handlers
- And more...

### Monitoring Tools

Status checks, metrics, alerts.

**Tools:**
- `health-check` - Endpoint monitoring
- `metrics-collect` - Metrics aggregation
- `alert-trigger` - Alert management
- And more...

## Response Schemas

### Success Response

```json
{
  "status": "success",
  "execution_id": "exec_xxx",
  "result": {},
  "timing": {
    "total_ms": 100,
    "execution_ms": 80,
    "processing_ms": 20
  }
}
```

### Error Response

```json
{
  "status": "error",
  "execution_id": "exec_xxx",
  "error": {
    "code": "TOOL_ERROR",
    "message": "Error message"
  }
}
```

## Webhooks (Coming Soon)

Configure webhooks to receive notifications:

```
POST /webhooks
{
  "url": "https://example.com/callback",
  "events": ["execution.completed", "execution.failed"],
  "tool_ids": ["github-list-prs"]
}
```

## SDK Support

Official SDKs available:

- **Node.js** - `@skill-mcp/node`
- **Python** - `skill-mcp`
- **Go** - `github.com/skill-mcp/go-sdk`
- **Ruby** - `skill-mcp`
- **Java** - Coming soon
- **C#** - Coming soon

---

**API Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
