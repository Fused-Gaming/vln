---
title: Contact Page UX Flow
description: Contact form UX flow, wireframes, form submission states, and validation patterns
---

## ASCII Mockup — Contact Form

```
┌────────────────────────────────────────────────────────────────────────┐
│  [VLN Logo]              Services    Pricing    Contact    [Get Help]  │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                         Get in Touch                                   │
│          Let's discuss how we can secure your smart contracts          │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  Full Name *                                                           │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ John Doe                                                      │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  Email Address *                                                       │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ john@example.com                                             │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  Company / Project Name                                                │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ Acme DeFi Protocol                                           │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  Service Interested In *                                               │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ Smart Contract Audit                                    [▼]  │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  Message *                                                             │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ We're launching a new DeFi protocol and need a              │     │
│  │ comprehensive security audit before mainnet deployment...   │     │
│  │                                                              │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  [ ] Subscribe to VLN security newsletter                              │
│                                                                        │
│  ┌──────────────────────┐                                             │
│  │   Send Message →     │                                             │
│  └──────────────────────┘                                             │
│                                                                        │
│  Response time: Within 24 hours for general inquiries                  │
│                 1–2 hours for emergency requests                       │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                     Alternative Contact Methods                        │
│                                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ [Mail]       │  │ [Telegram]   │  │ [Emergency]  │               │
│  │ Email Us     │  │ Live Chat    │  │ Emergency    │               │
│  │ info@vln.gg  │  │ @vlngg       │  │ emergency@   │               │
│  │              │  │              │  │ vln.gg       │               │
│  │ [Email Now]  │  │ [Open Chat]  │  │ [Contact Now]│               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Form Submission Flow

```
User Lands on Contact
  └→ Source?
       ├─ Direct URL → Empty Form
       └─ CTA with query param → Pre-filled Service Type

  └→ User Fills Form
       └→ Valid Data?
            ├─ No → Show Validation Errors → back to filling
            └─ Yes → Submit to API
                 └→ API Response?
                      ├─ Success → Show Success + Send Confirmation Email
                      └─ Error → Show Error + Offer Retry / Alt Contact
```

---

## Validation States

### Email Field

| Input | Validation | Message |
|-------|------------|---------|
| Empty | Required | "Email is required" |
| Invalid format | Regex | "Invalid email format" |
| Suspicious domain | Warning | "Please use business email" |
| Valid | Accept | — |

### Message Field

| Length | State |
|--------|-------|
| < 10 chars | Error: Too short |
| 10–1000 chars | Valid |
| > 1000 chars | Error: Too long |

---

## Service Selector Pre-fill Logic

Query param → Pre-selected option:

| URL Parameter | Pre-selects |
|---------------|-------------|
| `?service=audits` | Smart Contract Audit |
| `?service=pentest` | Penetration Testing |
| `?service=emergency` | Emergency Response |
| *(none)* | Default: "Select a service" |

---

## Success / Error States

### Success

```
┌─────────────────────────────────────────┐
│  ✓ Message Sent Successfully!           │
│                                         │
│  Thank you for contacting VLN. We've   │
│  received your message and will respond │
│  within 24 hours.                       │
│                                         │
│  A confirmation email has been sent to  │
│  john@example.com                       │
│                                         │
│  [Return to Homepage]  [View Services]  │
└─────────────────────────────────────────┘
```

### Error

```
┌─────────────────────────────────────────┐
│  ✗ Submission Failed                    │
│                                         │
│  We couldn't send your message. Please  │
│  try again or use an alternative        │
│  contact method below.                  │
│                                         │
│  [Try Again]  [Email Us]  [Live Chat]   │
└─────────────────────────────────────────┘
```

---

## Mobile Layout

```
┌────────────────────────┐
│ [☰] [VLN] [Get Help]  │
└────────────────────────┘

┌────────────────────────┐
│    Get in Touch        │
│                        │
│  Full Name *           │
│  ┌──────────────────┐  │
│  │ John Doe         │  │
│  └──────────────────┘  │
│                        │
│  Email *               │
│  ┌──────────────────┐  │
│  │ john@example.com │  │
│  └──────────────────┘  │
│                        │
│  ┌──────────────────┐  │
│  │  Send Message →  │  │
│  └──────────────────┘  │
└────────────────────────┘
```

---

## Accessibility Features

- ✅ Labels associated with all inputs (`htmlFor` + `id`)
- ✅ Required fields: `*` marker + `aria-required="true"`
- ✅ Error messages linked via `aria-describedby`
- ✅ Focus order follows visual layout (top → bottom)
- ✅ Submit disabled until form valid
- ✅ Success/error announced via `role="status" aria-live="polite"`
- ✅ Keyboard submission (Enter on last field)

---

## Performance Considerations

- Client-side validation before API call
- Debounced email format check (300ms)
- Form state persisted in localStorage (auto-save draft)
- Optimistic UI updates
- Rate limiting: 1 submission per minute

---

## Analytics Events

```javascript
gtag('event', 'contact_form_start');
gtag('event', 'contact_form_complete');
gtag('event', 'contact_form_submit_success');
gtag('event', 'contact_form_submit_error');
gtag('event', 'contact_email_click');
gtag('event', 'contact_telegram_click');
gtag('event', 'contact_emergency_click');
```

---

**Last Updated:** January 2025 | **Status:** Implemented ✅
