---
title: "MCP Protocol Specification"
description: "Model Context Protocol (MCP) implementation details for Skill-MCP"
---

# MCP Protocol Specification

Complete technical specification of the Model Context Protocol (MCP) implementation used by Skill-MCP.

## Protocol Overview

The Model Context Protocol (MCP) is a standardized interface for integrating tools and services. Skill-MCP implements MCP v1.0 over HTTP/2 with JSON request/response encoding.

## Request Format

### HTTP Method
All tool invocations use `POST` requests to `/v1/tools/{tool_id}/invoke`

### Headers

**Required:**
```
Authorization: Bearer sk_vln_xxxxx
Content-Type: application/json
Content-Length: {size}
```

**Optional:**
```
X-Request-ID: {unique-request-id}    # For tracking
X-Idempotency-Key: {key}             # For retry safety
User-Agent: {client-name}/{version}  # Client identification
```

### Request Body

All requests follow this schema:

```json
{
  "tool_id": "string",
  "inputs": {
    "param1": "value1",
    "param2": "value2"
  },
  "options": {
    "timeout": 30,
    "async": false,
    "cache": true
  }
}
```

**Field Descriptions:**
- `tool_id` - The ID of the tool to invoke
- `inputs` - Tool-specific input parameters (object)
- `options` - Execution options (all optional):
  - `timeout` - Max execution time (seconds, default 30, max 300)
  - `async` - Execute asynchronously if true
  - `cache` - Use cached result if available (default true)

### Input Validation

Each tool defines its own input schema:

```json
{
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
    }
  }
}
```

**Validation Rules:**
- Required fields must be present
- Type validation is performed
- Unknown fields are ignored
- Special characters are escaped

## Response Format

### Success Response

```json
{
  "status": "success",
  "execution_id": "exec_abc123",
  "result": {
    "prs": [...],
    "count": 5
  },
  "timing": {
    "total_ms": 245,
    "execution_ms": 200,
    "processing_ms": 45
  },
  "cache": {
    "hit": false,
    "ttl": 3600
  }
}
```

**Response Fields:**
- `status` - Always "success" for successful execution
- `execution_id` - Unique identifier for this execution
- `result` - Tool-specific output data
- `timing` - Execution timing breakdown
  - `total_ms` - Total request time
  - `execution_ms` - Tool execution time
  - `processing_ms` - API processing time
- `cache` - Cache hit information (optional)
  - `hit` - Boolean indicating cache hit
  - `ttl` - Cache time-to-live in seconds

### Error Response

```json
{
  "status": "error",
  "execution_id": "exec_abc123",
  "error": {
    "code": "INVALID_INPUT",
    "message": "Missing required parameter: owner",
    "details": {
      "parameter": "owner",
      "expected": "string"
    },
    "suggestion": "Provide the 'owner' parameter",
    "retryable": false
  }
}
```

**Error Fields:**
- `code` - Machine-readable error code
- `message` - Human-readable error message
- `details` - Additional error context
- `suggestion` - Suggested action to resolve
- `retryable` - Whether request can be retried

### Async Response

```json
{
  "status": "queued",
  "execution_id": "exec_abc123",
  "message": "Tool execution queued",
  "status_url": "/v1/executions/exec_abc123"
}
```

**For Async Execution:**
- `status` - "queued" or "processing"
- `execution_id` - Use to check status later
- `status_url` - Endpoint to poll for results

## HTTP Status Codes

### 2xx Success
- **200 OK** - Successful execution
- **202 Accepted** - Async execution accepted and queued

### 4xx Client Errors
- **400 Bad Request** - Malformed request or invalid input
- **401 Unauthorized** - Missing or invalid API key
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Tool or execution not found
- **429 Too Many Requests** - Rate limited

### 5xx Server Errors
- **500 Internal Server Error** - Unexpected server error
- **502 Bad Gateway** - Service temporarily unavailable
- **503 Service Unavailable** - Service under maintenance
- **504 Gateway Timeout** - Tool execution timeout

## Rate Limiting

### Rate Limit Headers

Every response includes rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1234567890
X-RateLimit-Retry-After: 60
```

**Meaning:**
- `Limit` - Total requests per minute
- `Remaining` - Requests left in current window
- `Reset` - Unix timestamp when limit resets
- `Retry-After` - Seconds to wait before retry (on 429)

### Rate Limit Strategy

Rate limits are:
- Per API key (not per user or IP)
- Per minute window
- Rolling window (not fixed hour)
- Shared across all tools

**Tier Limits:**
- **Free:** 100 req/min
- **Pro:** 1,000 req/min
- **Enterprise:** Custom

### Handling Rate Limits

```javascript
if (response.status === 429) {
  const retryAfter = parseInt(
    response.headers['x-ratelimit-retry-after']
  );
  
  await sleep(retryAfter * 1000);
  return retryRequest();
}
```

## Authentication

### API Key Format

```
sk_{type}_{random_32_chars}
```

**Types:**
- `user_` - Personal development keys
- `svc_` - Service/production keys
- `temp_` - Temporary time-limited keys

### Authentication Header

Include API key in Authorization header:

```
Authorization: Bearer sk_svc_abc123xyz
```

### Key Rotation

Keys should be rotated periodically:

1. Generate new key
2. Deploy to staging
3. Test integration
4. Deploy to production
5. Wait 24 hours
6. Revoke old key

## Caching

### Cache Headers

Responses include cache directives:

```
Cache-Control: public, max-age=3600
ETag: "abc123"
Last-Modified: Wed, 28 Apr 2026 14:45:00 GMT
```

### Cache Keys

Cache keys are determined by:
- Tool ID
- Sorted input parameters
- API key (separate cache per key)

**Example:**
```
cache:github-list-prs:owner=vln:repo=vln-gg:state=open
```

### Cache Invalidation

Cache is invalidated when:
- TTL expires
- Tool configuration changes
- Manual invalidation request

### Disabling Cache

```bash
curl -X POST ... \
  -H "Cache-Control: no-cache" \
  -d '{"options": {"cache": false}}'
```

## Pagination

List endpoints support pagination:

### Request

```bash
GET /v1/tools?limit=20&offset=40
```

### Response

```json
{
  "items": [...],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 40,
    "has_more": true
  }
}
```

### Cursor-Based Pagination

For large datasets, use cursor pagination:

```bash
GET /v1/executions?after=cursor123&limit=50
```

```json
{
  "items": [...],
  "pagination": {
    "after": "cursor456",
    "has_more": true
  }
}
```

## Webhooks (Future)

Webhook payload format (coming in 2.0):

```json
{
  "event": "execution.completed",
  "timestamp": "2026-04-28T14:45:00Z",
  "data": {
    "execution_id": "exec_abc123",
    "tool_id": "github-list-prs",
    "status": "success",
    "result": {...}
  },
  "signature": "sha256=..."
}
```

**Signature Verification:**
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return hash === signature;
}
```

## Connection Management

### Keep-Alive

HTTP/2 connections are kept alive with:
- Connection: keep-alive (HTTP/1.1 fallback)
- HTTP/2 PING frames
- Default timeout: 60 seconds

### Connection Pooling

Use connection pooling for better performance:

```javascript
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10
});
```

### Timeout Configuration

```javascript
const timeouts = {
  connect: 5000,      // 5 seconds to connect
  socket: 30000,      // 30 seconds per request
  request: 30000,     // 30 seconds end-to-end
  tool: 30            // 30 seconds tool execution
};
```

## Compression

### Request Compression

Compress large request bodies:

```
Content-Encoding: gzip
```

### Response Compression

Responses are compressed when:
- Response size > 1KB
- Client supports compression
- Content-Type supports compression

## Security

### TLS/SSL

All requests must use HTTPS/TLS 1.2+

```
https://api.skill.vln.gg/v1/...
```

### Header Security

Additional security headers:

```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

### Request Signing (Future)

For additional security (v2.0):

```
X-Signature: sha256={timestamp}.{hmac}
X-Timestamp: 1234567890
```

## Versioning

### Version Header

Current API version:

```
API-Version: 1.0
```

### Version Support

- **v1.0** - Current (2026-04-28+)
- **v0.9** - Deprecated (sunset 2026-09-28)

### Migration Path

When upgrading versions, clients should:
1. Use `API-Version` header
2. Test against new version
3. Update client library
4. Deploy with gradual rollout

## OpenAPI Specification

Full OpenAPI 3.0 specification available:

```yaml
openapi: 3.0.0
info:
  title: Skill-MCP API
  version: 1.0.0
servers:
  - url: https://api.skill.vln.gg/v1
paths:
  /tools:
    get:
      summary: List tools
      responses:
        '200':
          description: Success
  /tools/{tool_id}/invoke:
    post:
      summary: Invoke tool
      parameters:
        - name: tool_id
          in: path
          required: true
      requestBody:
        required: true
      responses:
        '200':
          description: Success
```

[Download OpenAPI spec](https://api.skill.vln.gg/openapi.json)

---

**Specification Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
