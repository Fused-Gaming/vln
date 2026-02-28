# VLN API Specification

**Version:** 1.0.0
**Format:** OpenAPI 3.1.0
**Date:** 2026-02-25
**Base URL:** `https://api.vln.gg/v1`
**Status:** Specification (Implementation: Phase 2+)

---

## Overview

The VLN API provides programmatic access to audit request management, security consulting, and reporting services. The API is RESTful and returns JSON responses.

### Features
- OAuth2 and API key authentication
- Rate limiting (100 req/min default)
- Webhook delivery for events
- Comprehensive error handling
- ISO 8601 timestamps
- Pagination support

---

## Authentication

### OAuth 2.0 (User Auth)
```
POST /auth/authorize
POST /auth/token
GET  /auth/logout
```

### API Keys (Service Auth)
```
Authorization: Bearer <api_key>
```

### Magic Links (Email Auth)
```
POST /auth/magic-link/send
POST /auth/magic-link/verify
```

### 2FA
```
POST /auth/2fa/setup
POST /auth/2fa/verify
```

---

## Rate Limiting

All API responses include rate limit headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1677456000
```

Exceeded limits return `429 Too Many Requests`.

---

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "User not found",
    "details": {
      "field": "userId",
      "expected": "uuid"
    }
  }
}
```

### Common Error Codes
| Code | Status | Description |
|------|--------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `SERVER_ERROR` | 500 | Internal server error |

---

## Endpoints

### Authentication

#### POST /auth/register
Register new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "CLIENT",
  "createdAt": "2026-02-25T10:00:00Z"
}
```

**Validation:**
- Email must be unique
- Password min 12 characters, must include uppercase, lowercase, number, special char
- Name is optional

---

#### POST /auth/login
Authenticate and receive session token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "ref_token_xyz",
  "expiresIn": 3600,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "role": "CLIENT"
  }
}
```

---

#### POST /auth/logout
Revoke session token.

**Request:**
```
Authorization: Bearer <token>
```

**Response (204):** No content

---

#### POST /auth/magic-link/send
Send magic link for passwordless login.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "Magic link sent to email",
  "expiresIn": 900
}
```

---

#### POST /auth/magic-link/verify
Verify magic link token.

**Request:**
```json
{
  "token": "magic_token_xyz"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "ref_token_xyz",
  "expiresIn": 3600
}
```

---

#### POST /auth/2fa/setup
Initialize two-factor authentication.

**Request:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "secret": "JBSWY3DPEBLW64TMMQXDOYLEHIXQ",
  "qrCode": "data:image/png;base64,..."
}
```

---

#### POST /auth/2fa/verify
Verify 2FA code during login.

**Request:**
```json
{
  "code": "123456"
}
```

**Response (200):**
```json
{
  "verified": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Audit Requests

#### POST /audits/intake
Submit new audit request.

**Request:**
```json
{
  "projectName": "XYZ Protocol",
  "description": "Smart contract security audit",
  "serviceType": "SMART_CONTRACT_AUDIT",
  "scope": {
    "contracts": [
      "0x1234567890123456789012345678901234567890"
    ],
    "lines_of_code": 5000
  },
  "attachments": []
}
```

**Response (201):**
```json
{
  "id": "audit_123",
  "projectName": "XYZ Protocol",
  "status": "PENDING",
  "priority": "MEDIUM",
  "createdAt": "2026-02-25T10:00:00Z",
  "estimatedCost": 25000
}
```

**Validation:**
- projectName required, min 3 chars
- serviceType must be valid enum
- scope required, must be valid JSON

---

#### GET /audits
List audit requests for authenticated user.

**Query Parameters:**
```
?status=IN_PROGRESS
?priority=HIGH
?limit=10
?offset=0
?sortBy=createdAt
?sortOrder=desc
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "audit_123",
      "projectName": "XYZ Protocol",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "createdAt": "2026-02-25T10:00:00Z"
    }
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 42
  }
}
```

---

#### GET /audits/:id
Get specific audit request details.

**Request:**
```
GET /audits/audit_123
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "audit_123",
  "projectName": "XYZ Protocol",
  "description": "Smart contract security audit",
  "serviceType": "SMART_CONTRACT_AUDIT",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "scope": {
    "contracts": ["0x1234..."],
    "lines_of_code": 5000
  },
  "assignedTo": "researcher_456",
  "startDate": "2026-02-27T00:00:00Z",
  "targetDate": "2026-03-27T00:00:00Z",
  "createdAt": "2026-02-25T10:00:00Z",
  "updatedAt": "2026-02-26T15:30:00Z"
}
```

---

#### PATCH /audits/:id
Update audit request (client can only update non-started audits).

**Request:**
```json
{
  "description": "Updated description",
  "scope": {
    "contracts": ["0x1234...", "0x5678..."]
  }
}
```

**Response (200):** Updated audit object

---

#### POST /audits/:id/upload
Upload contract or code files to audit.

**Request:**
```
POST /audits/audit_123/upload
Content-Type: multipart/form-data

file: <binary file data>
```

**Response (201):**
```json
{
  "id": "file_789",
  "filename": "Contract.sol",
  "size": 45678,
  "uploadedAt": "2026-02-25T11:00:00Z"
}
```

**Validation:**
- Max file size: 100MB
- Allowed types: .sol, .ts, .js, .py, .rs, .go
- Virus scan required

---

#### DELETE /audits/:id
Cancel or delete audit request.

**Request:**
```
DELETE /audits/audit_123
Authorization: Bearer <token>
```

**Response (204):** No content

**Note:** Only allowed if status is PENDING or INTAKE

---

### Reports

#### GET /audits/:id/report
Get audit report.

**Request:**
```
GET /audits/audit_123/report
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "report_456",
  "title": "XYZ Protocol Security Audit Report",
  "status": "PUBLISHED",
  "summary": "Audit completed with 3 findings",
  "critical": 0,
  "high": 1,
  "medium": 2,
  "low": 0,
  "publishedAt": "2026-03-27T00:00:00Z",
  "pdfUrl": "https://...",
  "findings": [
    {
      "id": "finding_001",
      "title": "Integer Overflow",
      "severity": "HIGH",
      "category": "ARITHMETIC",
      "status": "OPEN"
    }
  ]
}
```

---

#### GET /audits/:id/report/pdf
Download report as PDF.

**Request:**
```
GET /audits/audit_123/report/pdf
Authorization: Bearer <token>
```

**Response (200):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="report.pdf"

<binary PDF data>
```

---

### Findings

#### GET /audits/:id/findings
List findings for audit.

**Query Parameters:**
```
?severity=HIGH,CRITICAL
?status=OPEN
?limit=20
?offset=0
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "finding_001",
      "title": "Reentrancy Vulnerability",
      "severity": "CRITICAL",
      "category": "REENTRANCY",
      "status": "OPEN",
      "createdAt": "2026-03-15T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 3,
    "limit": 20
  }
}
```

---

#### GET /audits/:id/findings/:finding_id
Get specific finding details.

**Response (200):**
```json
{
  "id": "finding_001",
  "title": "Reentrancy Vulnerability",
  "description": "The function...",
  "impact": "An attacker could...",
  "remediation": "Use checks-effects-interactions pattern",
  "severity": "CRITICAL",
  "category": "REENTRANCY",
  "cwe": "CWE-246",
  "affectedCode": "Line 42-56 in Contract.sol",
  "proof": "POC: A transaction can call back into...",
  "status": "OPEN",
  "createdAt": "2026-03-15T00:00:00Z"
}
```

---

### Payments

#### GET /audits/:id/quote
Get cost estimate/quote for audit.

**Request:**
```
GET /audits/audit_123/quote
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "subtotal": 25000,
  "tax": 2175,
  "total": 27175,
  "currency": "USD",
  "breakdown": {
    "base_audit": 25000,
    "rush_fee": 0
  }
}
```

---

#### POST /payments/intent
Create payment intent for Stripe.

**Request:**
```json
{
  "auditId": "audit_123",
  "amount": 27175,
  "currency": "USD"
}
```

**Response (201):**
```json
{
  "clientSecret": "pi_1234567890_secret_abcdef",
  "paymentId": "payment_789",
  "status": "REQUIRES_PAYMENT_METHOD"
}
```

---

#### POST /payments/confirm
Confirm Stripe payment.

**Request:**
```json
{
  "paymentId": "payment_789",
  "paymentMethodId": "pm_1234567890"
}
```

**Response (200):**
```json
{
  "status": "COMPLETED",
  "receiptUrl": "https://receipts.stripe.com/...",
  "invoiceId": "invoice_456"
}
```

---

#### GET /invoices/:id
Get invoice details.

**Response (200):**
```json
{
  "id": "invoice_456",
  "invoiceNumber": "INV-2026-0001",
  "total": 27175,
  "dueDate": "2026-03-25T00:00:00Z",
  "status": "PAID",
  "paidAt": "2026-02-27T10:30:00Z",
  "lineItems": [
    {
      "description": "Smart Contract Audit - XYZ Protocol",
      "quantity": 1,
      "unitPrice": 25000,
      "total": 25000
    }
  ]
}
```

---

### Notifications

#### GET /notifications
List user notifications.

**Query Parameters:**
```
?read=false
?type=AUDIT_COMPLETED
?limit=20
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "notif_001",
      "type": "AUDIT_COMPLETED",
      "title": "XYZ Protocol audit completed",
      "message": "Your audit request is ready for review",
      "read": false,
      "createdAt": "2026-03-27T00:00:00Z"
    }
  ]
}
```

---

#### POST /notifications/:id/read
Mark notification as read.

**Response (204):** No content

---

#### PATCH /notification-settings
Update notification preferences.

**Request:**
```json
{
  "emailAuditUpdates": true,
  "smsPaymentAlerts": false,
  "dailyDigest": true
}
```

**Response (200):** Updated settings

---

### Teams

#### POST /teams
Create new team.

**Request:**
```json
{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "website": "https://acme.com"
}
```

**Response (201):**
```json
{
  "id": "team_123",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "leadId": "user_123",
  "createdAt": "2026-02-25T10:00:00Z"
}
```

---

#### GET /teams/:id
Get team details.

**Response (200):**
```json
{
  "id": "team_123",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "website": "https://acme.com",
  "members": [
    {
      "id": "user_123",
      "name": "John Doe",
      "role": "ADMIN",
      "joinedAt": "2026-02-25T10:00:00Z"
    }
  ]
}
```

---

#### POST /teams/:id/members
Add team member.

**Request:**
```json
{
  "email": "member@example.com",
  "role": "MEMBER"
}
```

**Response (201):**
```json
{
  "id": "member_456",
  "email": "member@example.com",
  "role": "MEMBER",
  "joinedAt": "2026-02-25T11:00:00Z"
}
```

---

#### DELETE /teams/:id/members/:userId
Remove team member.

**Response (204):** No content

---

### Webhooks

#### POST /webhooks
Register webhook endpoint.

**Request:**
```json
{
  "url": "https://example.com/webhooks",
  "events": ["AUDIT_COMPLETED", "REPORT_READY", "PAYMENT_RECEIVED"]
}
```

**Response (201):**
```json
{
  "id": "webhook_123",
  "url": "https://example.com/webhooks",
  "events": ["AUDIT_COMPLETED", "REPORT_READY", "PAYMENT_RECEIVED"],
  "secret": "whsec_1234567890abcdef",
  "active": true,
  "createdAt": "2026-02-25T10:00:00Z"
}
```

---

#### DELETE /webhooks/:id
Deactivate webhook.

**Response (204):** No content

---

## Webhook Events

### Event Structure
```json
{
  "id": "evt_123",
  "type": "audit.completed",
  "timestamp": "2026-02-25T10:00:00Z",
  "data": {
    "auditId": "audit_123",
    "status": "COMPLETED"
  }
}
```

### Event Types
| Event | Trigger |
|-------|---------|
| `audit.created` | New audit submitted |
| `audit.approved` | Audit approved by team |
| `audit.started` | Audit work begins |
| `audit.completed` | Audit work finished |
| `report.ready` | Report generated |
| `report.published` | Report delivered to client |
| `finding.created` | New finding added |
| `payment.received` | Payment processed |
| `payment.failed` | Payment failed |
| `invoice.sent` | Invoice emailed |
| `team.member_added` | Team member invited |

---

## Pagination

### Query Parameters
```
?limit=20          # Default 20, max 100
?offset=0          # Default 0
?cursor=abc123     # Cursor-based pagination (optional)
```

### Response Structure
```json
{
  "data": [...],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 150,
    "hasMore": true
  }
}
```

---

## Timestamps

All timestamps are ISO 8601 format with UTC timezone:
```
2026-02-25T10:30:45.123Z
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `422` | Validation Error |
| `429` | Too Many Requests |
| `500` | Server Error |

---

## Security

### Headers
- `X-Request-ID` — Unique request identifier
- `X-RateLimit-*` — Rate limit info
- `Strict-Transport-Security` — HTTPS only
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`

### Token Expiration
- Access token: 1 hour
- Refresh token: 30 days
- Magic link: 15 minutes
- Verification token: 24 hours

### HTTPS Required
All API endpoints require HTTPS. HTTP requests are redirected/rejected.

---

## Versioning

The API uses URL-based versioning: `/v1`, `/v2`, etc.

### Deprecation Policy
- Deprecation announced 3 months before
- Migration guide provided
- Old version supported for 6 months
- Sunset date clearly communicated

---

## Rate Limits

### Default Limits
- Authenticated: 100 requests/minute
- Unauthenticated: 10 requests/minute
- Burst: 200 requests/10 seconds

### Endpoint-Specific
- File upload: 10 files/hour
- Payment creation: 5 attempts/hour
- Webhook delivery: 3 retries

---

## Related Documents

- `database-design.md` — Database models
- `email-templates.md` — Email events
- `webhook-events.md` — Webhook details
- `CLAUDE.md` — Project configuration

---

**Last Updated:** 2026-02-25
**Next Update:** 2026-04-01 (Phase 2 implementation)
