# VLN Booking & Sales Flow

## Overview
This document outlines the complete user journey for VLN booking and inquiry systems, integrating Calendly embedded flow with custom form fallback.

---

## User Journey Map

```mermaid
journey
    title VLN Booking/Inquiry Journey
    section Landing
      Visit Contact Page: 5: User
      Select Booking Method: 4: User
    section Quick Path (Calendly)
      View Availability: 5: Calendly Widget
      Select Time Slot: 5: User
      Confirm Booking: 5: Calendly
      Receive Confirmation: 4: Email
    section Enterprise Path (Custom Form)
      Fill Project Details: 4: User
      Select Meeting Type: 4: User
      Submit Request: 5: User
      Confirmation Email: 5: Email Service
      Sales Follow-up: 3: Sales Team
    section Follow-up
      Preparation Call: 5: Internal
      Audit/Consultation: 5: Expert
      Report Delivery: 5: Delivery
```

---

## Booking Flow Diagram

```mermaid
graph TD
    A[User Visits /contact] --> B{Select Booking Method}
    B -->|Quick Schedule| C[View Calendly Widget]
    B -->|Custom Request| D[Show Custom Form]
    
    C --> E[Select Available Slot]
    E --> F[Confirm Booking]
    F --> G[POST /api/bookings<br/>via Calendly]
    G --> H[Email Confirmation]
    
    D --> I[Fill Project Info]
    I --> J[Fill Contact Details]
    J --> K[Add Meeting Notes]
    K --> L[Submit Form]
    L --> M[POST /api/bookings]
    M --> N[Email Confirmation]
    
    H --> O[Admin Notification]
    N --> O
    O --> P[Sales Intake]
    P --> Q[Schedule Call]
```

---

## Messaging System Architecture

```mermaid
graph LR
    subgraph Sources
        A["Contact Form"]
        B["Calendly Widget"]
        C["Booking Form"]
    end
    
    subgraph API
        D["POST /api/messages"]
        E["Validation Layer"]
        F["Type: inquiry/booking-follow-up/support"]
    end
    
    subgraph Destinations
        G["Database Storage"]
        H["Email Service"]
        I["CRM Integration"]
        J["Support Ticket"]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
    F --> J
```

---

## Calendly Embed Integration

### Why Calendly JavaScript SDK (Not iFrame)?

1. **Better Tracking**: Full event lifecycle capture
2. **Auto-resize**: Responsive to container width
3. **Pre-fill Support**: Auto-populate user data
4. **Event Hooks**: Trigger actions on booking confirmation
5. **Theme Control**: CSS variable customization

### Configuration

```typescript
// From CalendlyEmbed.tsx
const CALENDLY_URL = "https://calendly.com/hello-jlucus/30min?back=1";

// Theme Variables
--calendly-brand-color: #86d993 (VLN Sage Green)
--calendly-secondary-color: #7dd3fc (VLN Blue-Gray)
--calendly-text-color: #f8f9fa (VLN White)
--calendly-bg-color: #0a0e0f (VLN Background)
```

---

## API Endpoints

### POST /api/bookings
**Custom booking form submissions**
- Request: `BookingRequest` (date, time, notes)
- Response: `BookingResponse` with confirmation
- Validation: Business hours, federal holidays

### POST /api/messages
**General inquiries and follow-ups**
- Request: `MessageRequest` (type, source, content)
- Response: `MessageResponse` with message ID
- Types: inquiry, booking-follow-up, support
- Sources: contact-form, calendly-follow-up, booking-form

---

## Type Definitions

### MessageRequest
```typescript
interface MessageRequest {
  type: "inquiry" | "booking-follow-up" | "support";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source: "contact-form" | "calendly-follow-up" | "booking-form";
}
```

### BookingRequest
```typescript
interface BookingRequest {
  appointmentType: "virtual" | "in-person";
  firstName: string;
  lastName: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24-hour)
  notes: string;
}
```

---

## Contact Page Component Hierarchy

```
ContactContent
├── Header
├── Hero Section
├── Booking Method Toggle
│   ├── "Quick Schedule" (Calendly)
│   └── "Custom Request" (Form)
├── Dynamic Content Section
│   ├── CalendlyEmbed (if method === 'calendly')
│   │   └── Calendly Widget (JavaScript SDK)
│   └── BookingForm (if method === 'form')
│       ├── Appointment Type Selector
│       ├── Name Fields
│       ├── Email Field
│       ├── Date/Time Picker
│       └── Notes Textarea
├── Direct Contact Section
│   ├── Email Card
│   ├── Telegram Card
│   ├── Website Card
│   └── GitHub Card
├── What to Include Section
└── Footer
```

---

## Accessibility Considerations

- ✅ Semantic HTML (main, section, button)
- ✅ ARIA labels on form controls
- ✅ Keyboard navigation support
- ✅ WCAG AA color contrast (Sage #86d993 on dark bg)
- ✅ Focus visible indicators
- ✅ Error messages announced to screen readers

---

## Future Enhancements

1. **Calendly Pre-fill**: Auto-populate user data from form
2. **CRM Integration**: Sync bookings to Salesforce/HubSpot
3. **Email Automation**: Confirmation → reminder → follow-up sequence
4. **Analytics**: Track conversion rates by booking method
5. **A/B Testing**: Compare Calendly vs custom form effectiveness
6. **Multi-language**: Support non-English locales

---

## Deployment Notes

- **Environment Variables**: None required (URL is hardcoded)
- **CSP Headers**: Allow `calendly.com` script and styles
- **Performance**: Calendly SDK loads asynchronously (non-blocking)
- **Fallback**: Custom form works without JavaScript
