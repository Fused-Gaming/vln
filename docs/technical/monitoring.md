# VLN Monitoring & Observability

**Version:** 1.0.0
**Date:** 2026-02-25
**Status:** Phase 1 - Infrastructure Setup
**Tools:** Sentry, Vercel Analytics, Custom Dashboards

---

## Overview

VLN uses a multi-layered monitoring approach to ensure platform reliability, security, and performance.

### Monitoring Stack

| Component | Tool | Purpose |
|-----------|------|---------|
| **Error Tracking** | Sentry | Real-time error notifications & root cause analysis |
| **Performance Metrics** | Vercel Analytics | LCP, CLS, FCP monitoring |
| **Health Checks** | `/api/health` | Uptime monitoring & alerting |
| **Request Logging** | Next.js Logs | Request tracing & debugging |
| **Security Events** | SecurityAuditLog | Authentication, authorization, and security events |
| **Activity Audit Trail** | ActivityLog (DB) | All user and system actions |

---

## Health Check Endpoint

The `/api/health` endpoint provides system status for monitoring tools.

### Endpoint

```http
GET /api/health
```

### Response

```json
{
  "status": "healthy",
  "timestamp": "2026-02-25T10:30:45.123Z",
  "version": "0.11.0",
  "environment": "production",
  "uptime": 3600.5,
  "requestId": "uuid-1234",
  "checks": {
    "database": "ok",
    "api": "ok"
  }
}
```

### Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | Healthy | All systems operational |
| 503 | Unhealthy | One or more systems down |

### Integration with Monitoring Services

#### Uptime Monitoring (Recommended Services)

```bash
# Monitor every 5 minutes
curl https://vln.gg/api/health

# Or use:
# - Pingdom
# - UptimeRobot
# - Betterstack
# - Checkly
```

---

## Error Tracking (Sentry)

### Setup

1. **Create Sentry Account**
   - Sign up at https://sentry.io
   - Create new project for VLN
   - Select "Next.js" as platform

2. **Configure Environment**
   ```bash
   SENTRY_DSN=https://your_key@sentry.io/project_id
   ```

3. **Initialize in Application**

   ```typescript
   // sentry.edge.config.ts
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
     debug: process.env.NODE_ENV === 'development',
   });
   ```

### Error Reporting

#### Client-Side Errors

```typescript
import * as Sentry from "@sentry/nextjs";

try {
  // Your code
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      component: 'AuditForm',
      action: 'submit',
    },
  });
}
```

#### Server-Side Errors

```typescript
import * as Sentry from "@sentry/nextjs";

export async function GET(request: NextRequest) {
  try {
    const data = await fetchData();
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        endpoint: '/api/audits',
        method: 'GET',
      },
    });

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### Alert Rules

Configure Sentry alerts for:

- **Critical Errors**: Immediate Slack notification
- **High Error Rate**: Alert if error rate exceeds 5%
- **Performance Degradation**: Alert if response time > 2s
- **Security Events**: Alert on auth failures, suspicious access

---

## Performance Analytics (Vercel Analytics)

### Core Web Vitals Monitoring

| Metric | Target | Tool |
|--------|--------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Vercel Analytics |
| **FID** (First Input Delay) | < 100ms | Vercel Analytics |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Vercel Analytics |

### Setup

```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Dashboard Access

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Settings**: Project > Analytics
- **Metrics Available**:
  - Page load times
  - Route performance
  - User geography
  - Browser/device breakdown

---

## Request Logging

### Request ID Tracking

Every request includes a unique identifier for tracing:

```typescript
// Added by middleware
x-request-id: "uuid-1234-5678"

// Log format
[2026-02-25 10:30:45] [uuid-1234-5678] POST /api/audits 200 45ms
```

### Accessing Logs

```bash
# Local development
pnpm dev | grep "x-request-id"

# Vercel
vercel logs --follow

# Docker logs
docker logs vln-app-container
```

---

## Security Audit Logging

### Tracked Events

```typescript
enum SecurityAuditLogAction {
  LOGIN = "LOGIN",
  LOGIN_FAILED = "LOGIN_FAILED",
  LOGOUT = "LOGOUT",
  PASSWORD_CHANGED = "PASSWORD_CHANGED",
  PASSWORD_RESET_REQUESTED = "PASSWORD_RESET_REQUESTED",
  TWO_FACTOR_ENABLED = "TWO_FACTOR_ENABLED",
  TWO_FACTOR_DISABLED = "TWO_FACTOR_DISABLED",
  OAUTH_LOGIN = "OAUTH_LOGIN",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  DATA_EXPORT = "DATA_EXPORT",
  DATA_DELETE = "DATA_DELETE",
  ADMIN_ACTION = "ADMIN_ACTION",
}
```

### Example: Logging Failed Login

```typescript
import { prisma } from '@/lib/prisma';

async function handleLoginFailure(email: string, ipAddress: string) {
  await prisma.securityAuditLog.create({
    data: {
      action: 'LOGIN_FAILED',
      severity: 'warning',
      details: `Failed login attempt for ${email}`,
      ipAddress,
    },
  });
}
```

### Viewing Security Logs

```typescript
// Query security logs
const recentFailures = await prisma.securityAuditLog.findMany({
  where: {
    action: 'LOGIN_FAILED',
    createdAt: {
      gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24h
    },
  },
  orderBy: { createdAt: 'desc' },
});
```

---

## Activity Audit Trail

### Tracking Changes

All significant database changes are logged to `ActivityLog`:

```typescript
// Example: Creating an audit request
const audit = await prisma.auditRequest.create({
  data: { /* ... */ },
});

// Automatically log
await prisma.activityLog.create({
  data: {
    userId: currentUserId,
    auditId: audit.id,
    action: 'created',
    entity: 'AuditRequest',
    entityId: audit.id,
    newValues: audit,
    ipAddress: request.headers.get('x-forwarded-for'),
    userAgent: request.headers.get('user-agent'),
  },
});
```

### Querying Activity Logs

```typescript
// Get all actions on a specific audit
const auditHistory = await prisma.activityLog.findMany({
  where: { auditId: 'audit_123' },
  orderBy: { createdAt: 'desc' },
  include: { user: true },
});

// Get user's recent actions
const userActions = await prisma.activityLog.findMany({
  where: { userId: 'user_456' },
  take: 50,
  orderBy: { createdAt: 'desc' },
});
```

---

## Performance Optimization Monitoring

### Lighthouse Scores

Target metrics:

- **Performance**: > 85
- **Accessibility**: > 90
- **Best Practices**: > 90
- **SEO**: > 90

### Monitoring in CI/CD

```bash
# Using Lighthouse CLI
pnpm exec lighthouse https://vln.gg --output-path=./lighthouse.json

# Or with Vercel Integration
# Automatically runs on each deployment
```

---

## Alerting Strategy

### Alert Levels

| Level | Threshold | Response |
|-------|-----------|----------|
| **Critical** | Downtime, security breach | Immediate team notification |
| **High** | Error rate > 5%, latency > 3s | Urgent review required |
| **Medium** | Error rate > 1%, latency > 2s | Monitor and investigate |
| **Low** | Performance degradation | Log and review daily |

### Notification Channels

```typescript
// Configure in Sentry
Sentry.init({
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.OnUncaughtException(),
  ],
});

// Slack Integration
// Settings > Integrations > Slack
```

---

## Dashboard Setup

### Key Dashboards

#### 1. Operations Dashboard (Daily Check)

```markdown
- [ ] Uptime (health check)
- [ ] Error rate (Sentry)
- [ ] Response time (Vercel Analytics)
- [ ] Request volume (logs)
- [ ] Recent incidents (Sentry)
```

#### 2. Performance Dashboard

- LCP, FID, CLS trends
- Lighthouse scores
- Route-specific performance
- Device/browser breakdown

#### 3. Security Dashboard

- Failed login attempts
- Permission denials
- Data access events
- API key usage

---

## Best Practices

✅ **DO:**
- Set up alerts for critical issues
- Review logs weekly
- Monitor performance trends
- Test alerting regularly
- Document incident responses

❌ **DON'T:**
- Ignore error spikes
- Leave default Sentry settings
- Log sensitive data (passwords, tokens)
- Alert too frequently (alert fatigue)
- Forget to test log access

---

## Troubleshooting

### Sentry Not Capturing Errors

```typescript
// Ensure DSN is set
console.log(process.env.SENTRY_DSN);

// Initialize early in app
// sentry.edge.config.ts should run before app code

// Check Sentry dashboard for org/project settings
```

### High Memory Usage

```bash
# Check Node process
ps aux | grep node

# Enable profiling
NODE_OPTIONS=--prof pnpm start

# Analyze profile
node --prof-process isolate-*.log > profile.txt
```

### Missing Logs

```bash
# Verify log streaming is enabled
# Vercel > Project Settings > Logs

# Check local logs
# .next/server/logs/edge-runtime.log
```

---

## Related Documentation

- [Health Check API](../api-specification.md#health-check)
- [Security Policy](../../SECURITY.md)
- [Database Design](./database-design.md)
- [API Specification](./api-specification.md)
- [Sentry Documentation](https://docs.sentry.io)
- [Vercel Analytics](https://vercel.com/analytics)

---

**Last Updated:** 2026-02-25
**Next Review:** 2026-04-01 (Phase 2 implementation)
