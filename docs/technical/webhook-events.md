# VLN Webhook Events Catalog

**Version:** 1.0.0
**Date:** 2026-02-25
**Format:** JSON
**Delivery:** HTTP POST with HMAC signature
**Retry Policy:** Exponential backoff, max 3 retries

---

## Overview

Webhooks allow external systems to subscribe to VLN events in real-time. Each webhook event includes:

- Event type identifier
- Timestamp (ISO 8601)
- Event ID (for deduplication)
- Payload (event-specific data)
- HMAC signature (for verification)

### Event Processing Flow

```
Event Occurs
    ↓
VLN generates event
    ↓
Sign with HMAC-SHA256
    ↓
Queue for delivery
    ↓
HTTP POST to endpoint
    ↓
Retry if failed (max 3 times)
    ↓
Mark as delivered/failed
```

---

## Event Format

### Standard Event Envelope
```json
{
  "id": "evt_1234567890abcdef",
  "type": "audit.created",
  "timestamp": "2026-02-25T10:30:45.123Z",
  "attempt": 1,
  "data": {
    // Event-specific payload
  }
}
```

### Headers Sent with Webhook
```
X-VLN-Signature: sha256=abcdef1234567890...
X-VLN-Delivery-ID: evt_1234567890abcdef
X-VLN-Timestamp: 1677256245
```

### Signature Verification (Node.js Example)
```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(hmac, signature);
}
```

---

## Audit Events

### audit.created
**When:** User submits new audit request
**Frequency:** Once per submission

```json
{
  "type": "audit.created",
  "data": {
    "auditId": "audit_123",
    "userId": "user_456",
    "projectName": "XYZ Protocol",
    "serviceType": "SMART_CONTRACT_AUDIT",
    "status": "PENDING",
    "priority": "MEDIUM",
    "scope": {
      "contracts": ["0x123..."],
      "lineOfCode": 5000
    },
    "estimatedCost": 25000,
    "createdAt": "2026-02-25T10:00:00Z"
  }
}
```

**Fields:**
- `auditId`: Unique audit identifier
- `userId`: Client user ID
- `projectName`: Project name
- `serviceType`: Type of audit service
- `scope`: Audit scope (JSON structure)
- `estimatedCost`: Cost estimate in cents
- `createdAt`: Creation timestamp

---

### audit.approved
**When:** Audit request approved by team
**Frequency:** Once per approval

```json
{
  "type": "audit.approved",
  "data": {
    "auditId": "audit_123",
    "userId": "user_456",
    "projectName": "XYZ Protocol",
    "status": "APPROVED",
    "finalCost": 25000,
    "assignedResearcherId": "researcher_789",
    "startDate": "2026-02-27T00:00:00Z",
    "targetDate": "2026-03-27T00:00:00Z",
    "approvedAt": "2026-02-26T14:30:00Z"
  }
}
```

**New Fields:**
- `finalCost`: Confirmed cost in cents
- `assignedResearcherId`: Researcher assigned
- `startDate`: Scheduled start
- `targetDate`: Scheduled completion
- `approvedAt`: Approval timestamp

---

### audit.started
**When:** Audit work officially begins
**Frequency:** Once per audit

```json
{
  "type": "audit.started",
  "data": {
    "auditId": "audit_123",
    "userId": "user_456",
    "projectName": "XYZ Protocol",
    "status": "IN_PROGRESS",
    "assignedResearcherId": "researcher_789",
    "startDate": "2026-02-27T08:00:00Z",
    "targetDate": "2026-03-27T00:00:00Z"
  }
}
```

---

### audit.paused
**When:** Audit work paused (optional)
**Frequency:** When paused

```json
{
  "type": "audit.paused",
  "data": {
    "auditId": "audit_123",
    "reason": "Awaiting client response",
    "pausedAt": "2026-03-10T15:00:00Z",
    "expectedResumption": "2026-03-15T08:00:00Z"
  }
}
```

---

### audit.completed
**When:** Audit work finished, report ready
**Frequency:** Once per audit

```json
{
  "type": "audit.completed",
  "data": {
    "auditId": "audit_123",
    "userId": "user_456",
    "projectName": "XYZ Protocol",
    "status": "COMPLETED",
    "completionDate": "2026-03-25T17:00:00Z",
    "findings": {
      "critical": 1,
      "high": 2,
      "medium": 3,
      "low": 2,
      "informational": 5
    },
    "reportId": "report_456",
    "reportUrl": "https://api.vln.gg/reports/report_456/pdf"
  }
}
```

**Fields:**
- `findings`: Breakdown by severity
- `reportId`: Generated report ID
- `reportUrl`: PDF download URL

---

### audit.cancelled
**When:** Audit request cancelled
**Frequency:** When cancelled

```json
{
  "type": "audit.cancelled",
  "data": {
    "auditId": "audit_123",
    "userId": "user_456",
    "reason": "Client request",
    "cancellationDate": "2026-03-01T10:00:00Z",
    "refundAmount": 25000
  }
}
```

---

## Report Events

### report.generated
**When:** Report created (before publication)
**Frequency:** Once per report

```json
{
  "type": "report.generated",
  "data": {
    "reportId": "report_456",
    "auditId": "audit_123",
    "status": "DRAFT",
    "findings": {
      "critical": 1,
      "high": 2,
      "medium": 3,
      "low": 2
    },
    "generatedAt": "2026-03-25T16:00:00Z"
  }
}
```

---

### report.ready
**When:** Report approved and ready for delivery
**Frequency:** Once per report

```json
{
  "type": "report.ready",
  "data": {
    "reportId": "report_456",
    "auditId": "audit_123",
    "userId": "user_456",
    "status": "APPROVED",
    "reportUrl": "https://api.vln.gg/reports/report_456/pdf",
    "htmlUrl": "https://api.vln.gg/reports/report_456/html",
    "readyAt": "2026-03-25T17:00:00Z"
  }
}
```

---

### report.published
**When:** Report delivered to client
**Frequency:** Once per delivery

```json
{
  "type": "report.published",
  "data": {
    "reportId": "report_456",
    "auditId": "audit_123",
    "userId": "user_456",
    "publishedAt": "2026-03-25T18:00:00Z",
    "deliveryMethod": "email",
    "accessToken": "report_access_token_xyz"
  }
}
```

---

## Finding Events

### finding.created
**When:** New security finding added to report
**Frequency:** Per finding

```json
{
  "type": "finding.created",
  "data": {
    "findingId": "finding_001",
    "reportId": "report_456",
    "auditId": "audit_123",
    "title": "Reentrancy Vulnerability",
    "severity": "CRITICAL",
    "category": "REENTRANCY",
    "cwe": "CWE-246",
    "description": "The function does not properly lock state...",
    "createdAt": "2026-03-20T10:00:00Z"
  }
}
```

---

### finding.updated
**When:** Finding status or details changed
**Frequency:** Per update

```json
{
  "type": "finding.updated",
  "data": {
    "findingId": "finding_001",
    "reportId": "report_456",
    "changes": {
      "status": {
        "from": "OPEN",
        "to": "ACKNOWLEDGED"
      },
      "resolution": "Client acknowledged vulnerability"
    },
    "updatedAt": "2026-03-22T14:00:00Z"
  }
}
```

---

### finding.resolved
**When:** Finding marked as resolved
**Frequency:** Per resolution

```json
{
  "type": "finding.resolved",
  "data": {
    "findingId": "finding_001",
    "reportId": "report_456",
    "status": "REMEDIATED",
    "resolution": "Fixed using checks-effects-interactions pattern",
    "resolvedAt": "2026-03-28T11:00:00Z"
  }
}
```

---

## Payment Events

### payment.initiated
**When:** Payment intent created
**Frequency:** Per payment

```json
{
  "type": "payment.initiated",
  "data": {
    "paymentId": "payment_789",
    "auditId": "audit_123",
    "userId": "user_456",
    "amount": 27175,
    "currency": "USD",
    "status": "PENDING",
    "method": "CREDIT_CARD",
    "stripePaymentId": "pi_1234567890",
    "initiatedAt": "2026-02-27T10:00:00Z"
  }
}
```

---

### payment.processing
**When:** Payment being processed
**Frequency:** When processing

```json
{
  "type": "payment.processing",
  "data": {
    "paymentId": "payment_789",
    "auditId": "audit_123",
    "amount": 27175,
    "processingAt": "2026-02-27T10:05:00Z"
  }
}
```

---

### payment.completed
**When:** Payment successfully charged
**Frequency:** Once per successful payment

```json
{
  "type": "payment.completed",
  "data": {
    "paymentId": "payment_789",
    "auditId": "audit_123",
    "userId": "user_456",
    "amount": 27175,
    "currency": "USD",
    "method": "CREDIT_CARD",
    "stripeChargeId": "ch_1234567890",
    "receiptUrl": "https://receipts.stripe.com/...",
    "completedAt": "2026-02-27T10:30:00Z"
  }
}
```

---

### payment.failed
**When:** Payment processing failed
**Frequency:** Per failure attempt

```json
{
  "type": "payment.failed",
  "data": {
    "paymentId": "payment_789",
    "auditId": "audit_123",
    "amount": 27175,
    "reason": "card_declined",
    "failureMessage": "Your card was declined",
    "retryCount": 1,
    "nextRetry": "2026-02-27T14:30:00Z",
    "failedAt": "2026-02-27T10:30:00Z"
  }
}
```

---

### payment.refunded
**When:** Payment refunded
**Frequency:** Per refund

```json
{
  "type": "payment.refunded",
  "data": {
    "paymentId": "payment_789",
    "auditId": "audit_123",
    "originalAmount": 27175,
    "refundAmount": 27175,
    "reason": "Customer request",
    "refundId": "ref_1234567890",
    "refundedAt": "2026-03-01T15:00:00Z"
  }
}
```

---

## Invoice Events

### invoice.created
**When:** Invoice generated
**Frequency:** Once per invoice

```json
{
  "type": "invoice.created",
  "data": {
    "invoiceId": "invoice_456",
    "invoiceNumber": "INV-2026-0001",
    "userId": "user_456",
    "total": 27175,
    "dueDate": "2026-03-27T00:00:00Z",
    "status": "DRAFT",
    "createdAt": "2026-02-27T10:00:00Z"
  }
}
```

---

### invoice.sent
**When:** Invoice emailed to client
**Frequency:** Once per send

```json
{
  "type": "invoice.sent",
  "data": {
    "invoiceId": "invoice_456",
    "invoiceNumber": "INV-2026-0001",
    "userId": "user_456",
    "recipientEmail": "billing@client.com",
    "status": "SENT",
    "sentAt": "2026-02-27T10:30:00Z"
  }
}
```

---

### invoice.viewed
**When:** Client opens/views invoice
**Frequency:** First view only

```json
{
  "type": "invoice.viewed",
  "data": {
    "invoiceId": "invoice_456",
    "invoiceNumber": "INV-2026-0001",
    "userId": "user_456",
    "viewedAt": "2026-02-28T14:00:00Z",
    "viewerIp": "203.0.113.42"
  }
}
```

---

### invoice.paid
**When:** Invoice payment received
**Frequency:** Per payment

```json
{
  "type": "invoice.paid",
  "data": {
    "invoiceId": "invoice_456",
    "invoiceNumber": "INV-2026-0001",
    "userId": "user_456",
    "amount": 27175,
    "paymentId": "payment_789",
    "paidAt": "2026-03-01T10:00:00Z"
  }
}
```

---

### invoice.overdue
**When:** Invoice past due date
**Frequency:** Once per day overdue

```json
{
  "type": "invoice.overdue",
  "data": {
    "invoiceId": "invoice_456",
    "invoiceNumber": "INV-2026-0001",
    "userId": "user_456",
    "amount": 27175,
    "daysOverdue": 5,
    "overdueAt": "2026-04-01T00:00:00Z"
  }
}
```

---

## Team Events

### team.created
**When:** Team created
**Frequency:** Once per team

```json
{
  "type": "team.created",
  "data": {
    "teamId": "team_123",
    "name": "Acme Corp",
    "slug": "acme-corp",
    "leadId": "user_123",
    "createdAt": "2026-02-25T10:00:00Z"
  }
}
```

---

### team.member_invited
**When:** Team member invited
**Frequency:** Per invitation

```json
{
  "type": "team.member_invited",
  "data": {
    "teamId": "team_123",
    "teamName": "Acme Corp",
    "invitedEmail": "member@example.com",
    "role": "MEMBER",
    "invitedBy": "user_123",
    "invitationUrl": "https://vln.gg/join?token=...",
    "expiresAt": "2026-03-27T10:00:00Z",
    "invitedAt": "2026-02-25T10:00:00Z"
  }
}
```

---

### team.member_added
**When:** Team member accepted invitation
**Frequency:** Per acceptance

```json
{
  "type": "team.member_added",
  "data": {
    "teamId": "team_123",
    "memberId": "user_456",
    "memberEmail": "member@example.com",
    "role": "MEMBER",
    "addedAt": "2026-02-26T14:00:00Z"
  }
}
```

---

## System Events

### system.health
**When:** Periodic health check
**Frequency:** Every 5 minutes (if subscribed)

```json
{
  "type": "system.health",
  "data": {
    "status": "operational",
    "timestamp": "2026-02-25T10:00:00Z",
    "metrics": {
      "responseTime": 45,
      "uptime": 99.99
    }
  }
}
```

---

## Webhook Subscription Management

### Subscribe to Events
```bash
POST /webhooks
{
  "url": "https://example.com/webhooks",
  "events": [
    "audit.created",
    "audit.completed",
    "payment.completed",
    "report.ready"
  ]
}
```

### Response
```json
{
  "id": "webhook_123",
  "url": "https://example.com/webhooks",
  "events": [...],
  "secret": "whsec_1234567890abcdef",
  "active": true,
  "createdAt": "2026-02-25T10:00:00Z"
}
```

### Event Filtering
Subscribe to specific event types or all events:
```
["*"]                           # All events
["audit.*"]                     # All audit events
["payment.completed"]           # Specific event
["audit.created", "audit.completed"]  # Multiple specific
```

---

## Retry Policy

### Exponential Backoff
```
Attempt 1: Immediate
Attempt 2: 5 minutes later
Attempt 3: 30 minutes later
Attempt 4: Abandoned
```

### HTTP Status Code Handling
```
2xx: Success (no retry)
3xx: Redirect (retry to new URL)
4xx: Client error (no retry, log)
5xx: Server error (retry with backoff)
Timeout: Retry with backoff
```

### Idempotency
Each event has unique `id` for deduplication:
```
Store event ID → Check if processed
If already processed → Return cached response
If new → Process and cache result
```

---

## Monitoring & Debugging

### Webhook Test
```bash
POST /webhooks/test
{
  "webhookId": "webhook_123",
  "eventType": "audit.created"
}
```

### Delivery Logs
```bash
GET /webhooks/:id/deliveries
?status=failed
?limit=20
```

Response:
```json
{
  "deliveries": [
    {
      "id": "del_456",
      "eventId": "evt_123",
      "status": "failed",
      "statusCode": 500,
      "response": "Internal server error",
      "attempts": 3,
      "lastAttemptAt": "2026-02-25T10:30:00Z"
    }
  ]
}
```

---

## Related Documents

- `api-specification.md` — API endpoints
- `email-templates.md` — Email triggers
- `database-design.md` — Event data models

---

**Last Updated:** 2026-02-25
**Total Event Types:** 25+
**Retry Attempts:** 3 (exponential backoff)
**Signature Method:** HMAC-SHA256
