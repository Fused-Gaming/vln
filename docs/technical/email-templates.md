# VLN Email Template Registry

**Version:** 1.0.0
**Date:** 2026-02-25
**Provider:** Resend or SendGrid
**Templates:** 12 total

---

## Overview

Email templates for VLN transactional communications. All templates use Handlebars syntax for variable substitution.

### Template Naming Convention
- `{domain}-{event}-{suffix}` (e.g., `auth-welcome-text`)
- Suffixes: `text` (plain text), `html` (HTML version)
- One template pair (text + HTML) per email type

---

## Authentication Email Templates

### 1. Welcome Email
**Trigger:** User account created
**To:** User's registered email
**Template ID:** `auth-welcome`

**Variables:**
```
userName: string             # User's name
email: string                # User's email
loginUrl: string             # Link to login page
companyName: string          # "VLN.gg"
```

**Text Template:**
```
Subject: Welcome to VLN — Advanced Security & Smart Contract Auditing

Hi {{userName}},

Welcome to VLN! We're excited to have you on board.

Your account is now active. You can access the platform at:
{{loginUrl}}

Email: {{email}}

Getting Started:
1. Log in to your dashboard
2. Submit your first audit request
3. Review our service options

Questions? Reply to this email or visit our support center.

Best regards,
The {{companyName}} Team
```

**HTML Template:**
```html
<h1>Welcome to VLN</h1>
<p>Hi {{userName}},</p>
<p>Welcome to VLN! We're excited to have you on board.</p>
<p>Your account is now active. You can access the platform:</p>
<a href="{{loginUrl}}" class="btn btn-primary">Log In</a>
<p><strong>Your email:</strong> {{email}}</p>
<h2>Getting Started</h2>
<ol>
  <li>Log in to your dashboard</li>
  <li>Submit your first audit request</li>
  <li>Review our service options</li>
</ol>
<p>Questions? <a href="mailto:support@vln.gg">Contact us</a></p>
```

---

### 2. Email Verification
**Trigger:** User attempts login with unverified email
**To:** User's registered email
**Template ID:** `auth-verify-email`

**Variables:**
```
userName: string
verificationLink: string      # URL with token
verificationCode: string      # 6-digit code (if link fails)
expiresIn: number            # Seconds (e.g., 3600)
```

**Subject:** Verify Your VLN Email Address

**Content:**
```
Hi {{userName}},

Please verify your email address to continue. This link expires in 1 hour.

Verification Link:
{{verificationLink}}

If the link doesn't work, use this code:
{{verificationCode}}

This link will expire at: [calculated time]

If you didn't create this account, please ignore this email.

Best regards,
VLN Security Team
```

---

### 3. Password Reset
**Trigger:** User requests password reset
**To:** User's registered email
**Template ID:** `auth-password-reset`

**Variables:**
```
userName: string
resetLink: string            # URL with token
resetCode: string            # 6-digit code
expiresIn: number           # Seconds (typically 1800)
ipAddress: string           # For security
```

**Subject:** Reset Your VLN Password

**Content:**
```
Hi {{userName}},

A password reset request was made for your account. This link expires in 30 minutes.

Reset Password:
{{resetLink}}

Verification Code (if link fails):
{{resetCode}}

Request Details:
- IP Address: {{ipAddress}}
- Time: [current time]

Didn't request this? Your account is still secure. Just ignore this email.

Best regards,
VLN Security Team
```

---

### 4. Magic Link Email
**Trigger:** User requests passwordless login
**To:** User's registered email
**Template ID:** `auth-magic-link`

**Variables:**
```
magicLink: string           # URL with token
expiresIn: number          # Seconds (usually 900)
```

**Subject:** Your VLN Login Link

**Content:**
```
Click to log in to VLN:
{{magicLink}}

This link expires in 15 minutes.

Didn't request this? You can safely ignore this email.
Your account remains secure.

VLN Security Team
```

---

### 5. 2FA Setup Confirmation
**Trigger:** User enables two-factor authentication
**To:** User's registered email
**Template ID:** `auth-2fa-enabled`

**Variables:**
```
userName: string
backupCodes: string[]       # Array of backup codes
backupCodesHtml: string     # Pre-formatted HTML
supportEmail: string
```

**Subject:** Two-Factor Authentication Enabled on Your VLN Account

**Content:**
```
Hi {{userName}},

Your account now has two-factor authentication enabled. This makes your account more secure.

Save Your Backup Codes:
Keep these codes safe. You can use them to log in if you lose access to your authenticator app.

{{backupCodesHtml}}

What's Next?
You'll need to enter a code from your authenticator app each time you log in.

Questions?
Contact us at {{supportEmail}}

VLN Security Team
```

---

## Audit Email Templates

### 6. Audit Request Confirmation
**Trigger:** Client submits audit request
**To:** Client email, internal team
**Template ID:** `audit-request-confirmation`

**Variables:**
```
userName: string
projectName: string
auditId: string              # Request ID
serviceType: string          # SMART_CONTRACT_AUDIT, etc
status: string              # PENDING
estimatedCost: number       # In USD
dashboardUrl: string        # Link to view audit
createdAt: string           # ISO timestamp
```

**Subject:** Audit Request Received — {{projectName}}

**Content:**
```
Hi {{userName}},

We've received your audit request for {{projectName}}. Thank you for choosing VLN!

Request Details:
- Audit ID: {{auditId}}
- Type: {{serviceType}}
- Status: {{status}}
- Estimated Cost: ${{estimatedCost}}
- Submitted: {{createdAt}}

Next Steps:
1. Our team will review your request
2. We'll provide a final quote within 24 hours
3. Once approved, work will begin

Track Your Audit:
{{dashboardUrl}}

Questions? Reply to this email.

Best regards,
VLN Audit Team
```

---

### 7. Audit Approved
**Trigger:** Audit request approved by team
**To:** Client email
**Template ID:** `audit-approved`

**Variables:**
```
userName: string
projectName: string
auditId: string
finalCost: number
startDate: string           # ISO timestamp
targetDate: string          # ISO timestamp
assignedResearcher: string  # Researcher name
paymentLink: string         # Link to payment page
```

**Subject:** Your {{projectName}} Audit Is Approved

**Content:**
```
Hi {{userName}},

Great news! Your audit request has been approved and is ready to begin.

Audit Details:
- Project: {{projectName}}
- Audit ID: {{auditId}}
- Assigned Researcher: {{assignedResearcher}}
- Start Date: {{startDate}}
- Target Completion: {{targetDate}}
- Final Cost: ${{finalCost}}

Next Step: Make Payment
{{paymentLink}}

Your audit will begin immediately after payment is received.

Questions? Contact our team: support@vln.gg

Best regards,
VLN Audit Team
```

---

### 8. Audit Started
**Trigger:** Audit work begins
**To:** Client email
**Template ID:** `audit-started`

**Variables:**
```
projectName: string
auditId: string
startDate: string
targetDate: string
researcherEmail: string
communicationGuide: string  # How to communicate
```

**Subject:** {{projectName}} Audit Work Begins

**Content:**
```
Your {{projectName}} audit has officially started!

Details:
- Audit ID: {{auditId}}
- Start Date: {{startDate}}
- Target Completion: {{targetDate}}

Your Lead Researcher:
{{researcherEmail}}

Communication:
{{communicationGuide}}

Timeline:
Your audit typically progresses through these phases:
1. Code Review & Analysis (40%)
2. Testing & Verification (40%)
3. Report Generation (20%)

We'll send you updates as milestones are completed.

VLN Audit Team
```

---

### 9. Audit Completed
**Trigger:** Audit work finished, report ready
**To:** Client email
**Template ID:** `audit-completed`

**Variables:**
```
projectName: string
auditId: string
completionDate: string
findings:
  - critical: number
  - high: number
  - medium: number
  - low: number
reportAccessUrl: string
```

**Subject:** {{projectName}} Audit Complete — Report Ready

**Content:**
```
Hi,

Your {{projectName}} audit is complete!

Summary:
- Audit ID: {{auditId}}
- Completed: {{completionDate}}

Findings:
- Critical: {{findings.critical}}
- High: {{findings.high}}
- Medium: {{findings.medium}}
- Low: {{findings.low}}

Access Your Report:
{{reportAccessUrl}}

Next Steps:
1. Review the full report
2. Address the findings in your code
3. Request follow-up audit when ready

Support:
Questions about findings? Reply to this email.

Best regards,
VLN Audit Team
```

---

## Payment Email Templates

### 10. Invoice Sent
**Trigger:** Invoice generated and sent
**To:** Billing contact
**Template ID:** `payment-invoice-sent`

**Variables:**
```
invoiceNumber: string
total: number
dueDate: string
projectName: string
lineItems: array            # Description, amount pairs
paymentLink: string
paymentMethods: string[]    # Credit card, ACH, Wire, etc
```

**Subject:** Invoice {{invoiceNumber}} — {{total}}

**Content:**
```
Invoice Details:
- Number: {{invoiceNumber}}
- Project: {{projectName}}
- Total: ${{total}}
- Due: {{dueDate}}

Line Items:
{{#each lineItems}}
  {{this.description}} — ${{this.amount}}
{{/each}}

Pay Now:
{{paymentLink}}

Accepted Payment Methods:
{{#each paymentMethods}}
  - {{this}}
{{/each}}

Questions about this invoice? Reply to this email.

VLN Billing Team
```

---

### 11. Payment Received
**Trigger:** Payment successfully processed
**To:** Billing contact
**Template ID:** `payment-received`

**Variables:**
```
projectName: string
amount: number
receiptNumber: string
paymentDate: string
receiptUrl: string          # PDF receipt link
nextAction: string          # What happens next
```

**Subject:** Payment Received — Thank You

**Content:**
```
Thank you! We've received your payment.

Payment Details:
- Project: {{projectName}}
- Amount: ${{amount}}
- Receipt #: {{receiptNumber}}
- Date: {{paymentDate}}

View Receipt:
{{receiptUrl}}

Next Steps:
{{nextAction}}

Questions? Contact billing: billing@vln.gg

VLN Billing Team
```

---

### 12. Payment Failed
**Trigger:** Payment processing failed
**To:** Billing contact
**Template ID:** `payment-failed`

**Variables:**
```
projectName: string
amount: number
failureReason: string       # Card declined, insufficient funds, etc
retryUrl: string            # Link to retry
supportEmail: string
```

**Subject:** Payment Failed — {{projectName}}

**Content:**
```
Your payment for {{projectName}} failed.

Details:
- Project: {{projectName}}
- Amount: ${{amount}}
- Reason: {{failureReason}}

Try Again:
{{retryUrl}}

Common Solutions:
- Check card expiration date
- Verify billing address
- Try a different payment method
- Contact your bank

Need Help?
{{supportEmail}}

VLN Billing Team
```

---

## Email Configuration

### Sender Details
```
From: noreply@vln.gg
Display Name: "VLN Security"
Reply-To: support@vln.gg
```

### Branding
```
Logo: /public/vln-logo-dark.svg
Colors:
  - Primary: #a6c3a7 (Sage Green)
  - Accent: #aab7c8 (Warm Blue-Gray)
  - Background: #0f0f0f (Matte Charcoal)
Footer:
  - Copyright © 2026 VLN.gg
  - Unsubscribe link
  - Privacy policy link
```

### Send Conditions

| Template | When | Retry | Max Attempts |
|----------|------|-------|--------------|
| Welcome | On signup | Immediate | 3 |
| Email Verify | On login unverified | 5 min | 5 |
| Password Reset | On request | Immediate | 3 |
| Magic Link | On request | 1 min | 3 |
| Audit Confirmation | On submission | 2 min | 2 |
| Audit Approved | On approval | Immediate | 2 |
| Payment Received | On success | Immediate | 1 |
| Payment Failed | On failure | 1 hour | 3 |

---

## Unsubscribe & Preferences

### Unsubscribe Link
All marketing emails include:
```
[Unsubscribe from all emails]
Manage email preferences: {{preferencesUrl}}
```

### Preference Center
Users can opt out of:
- Audit updates
- Payment alerts
- Marketing emails
- Daily digest

---

## Handlebars Syntax Examples

### Variables
```
{{userName}}
{{amount}}
```

### Conditionals
```
{{#if critical > 0}}
  Critical findings found: {{critical}}
{{/if}}
```

### Loops
```
{{#each lineItems}}
  {{this.description}} — ${{this.amount}}
{{/each}}
```

### Formatters
```
{{formatDate timestamp}}
{{formatCurrency amount}}
{{capitalize text}}
```

---

## Testing

### Send Test Email
```bash
POST /api/email/test
{
  "to": "test@example.com",
  "template": "auth-welcome",
  "variables": {
    "userName": "Test User",
    "email": "test@example.com",
    "loginUrl": "https://vln.gg/login"
  }
}
```

### Email Inbox for Testing
- Resend: test inbox
- SendGrid: sandbox mode

---

## Monitoring

### Key Metrics
- Delivery rate (target: >99%)
- Open rate (benchmark: 25-35%)
- Click rate (benchmark: 5-10%)
- Bounce rate (target: <2%)
- Complaint rate (target: <0.5%)

### Alerts
- Delivery failures > 5%
- Bounce rate spike
- Complaint threshold exceeded

---

## GDPR Compliance

- All emails include unsubscribe link
- Preference center accessible
- No tracking pixels in transactional emails
- Data retention: 30 days max
- Honor opt-out requests within 24 hours

---

## Related Documents

- `api-specification.md` — Event triggers
- `webhook-events.md` — Webhook data
- `CLAUDE.md` — Brand guidelines

---

**Last Updated:** 2026-02-25
**Service Provider:** Resend (or SendGrid)
**Total Templates:** 12 (6 authentication, 3 audit, 3 payment)
