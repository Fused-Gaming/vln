# VLN Webhook Endpoints for PeraltaCC Integration

This document provides the webhook endpoint URLs and configuration for integrating PeraltaCC deployments with VLN notifications.

## Webhook Endpoints

### 1. GitHub Webhook Receiver (Recommended)
**Endpoint:** `POST https://vln.gg/api/webhooks/telegram`

**Purpose:** Receive GitHub webhooks for deployments, pushes, and pull requests

**Headers:**
```
Content-Type: application/json
X-GitHub-Event: [deployment|push|pull_request|deployment_status]
X-Hub-Signature-256: sha256=<HMAC signature> (optional)
```

**Supported Events:**
- `deployment` - Deployment creation
- `deployment_status` - Deployment status updates
- `push` - Code pushes to main/integration branches
- `pull_request` - PR opened, closed, synchronized

**Response:**
```json
{
  "success": true,
  "message": "Notification sent",
  "event": "deployment"
}
```

### 2. Custom Notification API
**Endpoint:** `POST https://vln.gg/api/notifications/telegram`

**Purpose:** Send custom notifications directly from PeraltaCC or external services

**Headers:**
```
Authorization: Bearer <TELEGRAM_API_TOKEN>
Content-Type: application/json
X-Webhook-Secret: <PERALTA_GITHUB_WEBHOOK_SECRET>
```

**Payload:**
```json
{
  "title": "Build Complete",
  "message": "PeraltaCC build #123 passed all tests",
  "type": "success",
  "url": "https://peralta.vln.gg/builds/123",
  "metadata": {
    "build_id": "123",
    "branch": "main"
  }
}
```

**Types:** `success`, `error`, `warning`, `info`, `deployment`

**Response:**
```json
{
  "success": true,
  "message": "Notification sent",
  "messageId": 12345
}
```

### 3. Health Check
**Endpoint:** `GET https://vln.gg/api/webhooks/telegram`

**Response:**
```json
{
  "status": "ok",
  "service": "telegram-webhook-receiver",
  "timestamp": "2026-05-11T16:44:00Z"
}
```

**Endpoint:** `GET https://vln.gg/api/notifications/telegram`

**Response:**
```json
{
  "status": "ok",
  "service": "telegram-notification",
  "configured": true,
  "timestamp": "2026-05-11T16:44:00Z"
}
```

## PeraltaCC Configuration

### Environment Variables Required

```bash
# In PeraltaCC .env or deployment config
VLN_WEBHOOK_URL=https://vln.gg/api/notifications/telegram
VLN_API_TOKEN=<TELEGRAM_API_TOKEN>
VLN_WEBHOOK_SECRET=<PERALTA_GITHUB_WEBHOOK_SECRET>
```

### Integration Steps

1. **Get API Token**
   - Request `TELEGRAM_API_TOKEN` from VLN security team
   - Store in PeraltaCC secrets manager

2. **Configure Webhook Secret**
   - Use `PERALTA_GITHUB_WEBHOOK_SECRET` for request signing
   - Include in `X-Webhook-Secret` header

3. **Send Notifications**
   ```bash
   curl -X POST https://vln.gg/api/notifications/telegram \
     -H "Authorization: Bearer $VLN_API_TOKEN" \
     -H "X-Webhook-Secret: $VLN_WEBHOOK_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "PeraltaCC Deployment",
       "message": "Build #123 deployed to production",
       "type": "success",
       "url": "https://peralta.vln.gg/deployments/123"
     }'
   ```

## Security Considerations

1. **API Token**: Treat as sensitive credential
   - Store in CI/CD secrets manager
   - Rotate every 90 days
   - Never commit to code

2. **Webhook Secret**: Used for request signing
   - Include in all custom notification requests
   - Validates request authenticity
   - Must match `PERALTA_GITHUB_WEBHOOK_SECRET` on VLN server

3. **HTTPS Only**: All endpoints require HTTPS
   - HTTP requests are rejected
   - TLS 1.2 minimum

## Error Codes

| Code | Message | Action |
|------|---------|--------|
| 200 | Success | Notification sent |
| 400 | Invalid payload | Check JSON structure |
| 401 | Missing auth | Add Authorization header |
| 403 | Invalid token | Verify API token |
| 500 | Server error | Retry with exponential backoff |
| 503 | Service unavailable | Try again later |

## Testing

### Test Webhook Receiver
```bash
curl -X POST https://vln.gg/api/webhooks/telegram \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -d '{
    "repository": {
      "name": "peralta-cc",
      "html_url": "https://github.com/fused-gaming/peralta-cc"
    },
    "pusher": {
      "name": "Test User"
    },
    "ref": "refs/heads/main",
    "commits": [{"id": "abc123"}]
  }'
```

### Test Notification API
```bash
curl -X POST https://vln.gg/api/notifications/telegram \
  -H "Authorization: Bearer $TELEGRAM_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notification",
    "message": "This is a test from PeraltaCC",
    "type": "info",
    "url": "https://peralta.vln.gg"
  }'
```

## Support

For issues or questions:
1. Check endpoint health: `GET /api/webhooks/telegram` or `/api/notifications/telegram`
2. Verify environment variables are set correctly
3. Enable debug logging in PeraltaCC
4. Contact VLN security team with request/response details
