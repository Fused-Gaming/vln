# ADR-003: Email Service Provider

**Date:** 2026-02-25
**Status:** Accepted
**Context:** VLN needs reliable transactional email for verification, notifications, and reports.

---

## Decision

**Selected: Resend** with SendGrid as fallback

### Comparison

| Factor | Resend | SendGrid | Mailgun |
|--------|--------|----------|---------|
| Cost | $100/month | $80/month | $35/month |
| Deliverability | ✅ 99.95% | ✅ 99.95% | ✅ 99% |
| Setup Time | ✅ <1hr | 2-3hrs | 1-2hrs |
| Documentation | ✅ Excellent | Good | Good |
| React Support | ✅ Yes | No | No |
| Developer UX | ✅ Excellent | Good | Good |

### Why Resend?

1. **React Email Integration**
   - Write emails as React components
   - Type-safe templates
   - Simpler than handlebars

2. **Excellent Docs**
   - Fast to implement
   - Clear examples
   - React-native

3. **Competitive Pricing**
   - $100/month plan
   - 50K emails/month
   - Covers phase 1-2 needs

4. **Team Support**
   - Great support
   - Active development
   - Growing ecosystem

---

## Implementation

### Email Templates (React Components)

```tsx
// emails/WelcomeEmail.tsx
import { Html, Body, Text, Link } from '@react-email/components';

export const WelcomeEmail = ({ userName, loginUrl }) => (
  <Html>
    <Body>
      <Text>Welcome {userName}!</Text>
      <Link href={loginUrl}>Login to VLN</Link>
    </Body>
  </Html>
);
```

### Sending Emails

```typescript
import { Resend } from 'resend';
import { WelcomeEmail } from './emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcome(email: string, userName: string) {
  await resend.emails.send({
    from: 'noreply@vln.gg',
    to: email,
    subject: 'Welcome to VLN',
    react: <WelcomeEmail userName={userName} loginUrl="..." />,
  });
}
```

---

## Email Types & Volumes

| Type | Per Month | Example |
|------|-----------|---------|
| Auth (welcome, verify) | 500 | Verification links |
| Audit notifications | 1000 | Status updates |
| Payment alerts | 300 | Invoices, receipts |
| Reports | 200 | Report ready notices |
| **Total** | **~2000** | Well within limits |

---

## Fallback Strategy

If Resend fails:
1. Queue email for retry (exponential backoff)
2. Fallback to SendGrid (secondary provider)
3. Alert team if both fail
4. Manual retry available

```typescript
async function sendEmail(email: string, template: EmailTemplate) {
  try {
    return await resend.send(email, template);
  } catch (error) {
    try {
      return await sendgrid.send(email, template);
    } catch (fallbackError) {
      // Queue for manual retry
      await queueEmailRetry(email, template);
      throw fallbackError;
    }
  }
}
```

---

## Configuration

```env
# Resend
RESEND_API_KEY=re_xxxxxx

# SendGrid (fallback)
SENDGRID_API_KEY=SG.xxxxxx

# Email config
EMAIL_FROM=noreply@vln.gg
EMAIL_FROM_NAME=VLN Security
```

---

## DNS Setup

Required for email authentication:
- **SPF:** Verifies sender
- **DKIM:** Signs emails
- **DMARC:** Policy enforcement

All handled by Resend dashboard.

---

## Metrics to Monitor

- Delivery rate (target: >99%)
- Bounce rate (target: <2%)
- Open rate (typical: 25-35%)
- Click rate (typical: 5-10%)
- Complaint rate (target: <0.5%)

---

## Cost Breakdown

- **Resend:** $100/month (50K emails)
- **SendGrid:** $80/month (backup)
- **Total:** ~$100/month

Cost per email: **$0.002** at 50K/month

---

**Related Decisions:**
- ADR-001: Auth (verification emails)
- Email templates in `email-templates.md`

---

**References:**
- https://resend.com
- https://react.email
- https://sendgrid.com
