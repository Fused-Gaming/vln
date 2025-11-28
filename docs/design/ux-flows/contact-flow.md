# Contact Page - UX Flow & Mockups

## ASCII Mockup - Contact Form

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  [VLN Logo]                    Services    Pricing    Contact    [Get Help]    │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                          Get in Touch                                           │
│                                                                                 │
│            Let's discuss how we can secure your smart contracts                │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │                        CONTACT FORM                                  │    │
│  │                                                                       │    │
│  │  Full Name *                                                         │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │ John Doe                                                     │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                       │    │
│  │  Email Address *                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │ john@example.com                                             │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                       │    │
│  │  Company / Project Name                                              │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │ Acme DeFi Protocol                                           │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                       │    │
│  │  Service Interested In *                                             │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │ Smart Contract Audit                                    [▼] │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                       │    │
│  │  Message *                                                           │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │ We're launching a new DeFi protocol and need a             │    │    │
│  │  │ comprehensive security audit before mainnet deployment...   │    │    │
│  │  │                                                              │    │    │
│  │  │                                                              │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                       │    │
│  │  [ ] Subscribe to VLN security newsletter                            │    │
│  │                                                                       │    │
│  │  ┌──────────────────────────┐                                       │    │
│  │  │      Send Message →      │                                       │    │
│  │  └──────────────────────────┘                                       │    │
│  │                                                                       │    │
│  │  Response time: Within 24 hours for general inquiries                │    │
│  │                 1-2 hours for emergency requests                     │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                                                                                │
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│                           Alternative Contact Methods                          │
│                                                                                │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│   │ [Mail Icon]      │  │ [Telegram Icon]  │  │ [Emergency Icon] │          │
│   │                  │  │                  │  │                  │          │
│   │ Email Us         │  │ Live Chat        │  │ Emergency        │          │
│   │ info@vln.gg      │  │ @vlngg           │  │ emergency@vln.gg │          │
│   │                  │  │                  │  │ 24/7 Response    │          │
│   │ [Email Now →]    │  │ [Open Chat →]    │  │ [Contact Now →]  │          │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                                │
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│  RESOURCES        SERVICES           LEGAL          CONNECT                   │
│  About Us         Audits             Terms          [GitHub] [LinkedIn]       │
│  Get Help         Pen Test           Privacy        [Twitter] [Discord]       │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## User Journey Map

```mermaid
journey
    title Contact Page User Journey
    section Discovery
      Land on contact page: 5: User
      Read intro text: 4: User
      Scan form fields: 3: User
    section Consideration
      Review required fields: 3: User
      Check alternative contact methods: 4: User
      Decide on contact method: 4: User
    section Action
      Fill out form: 3: User
      Review entered information: 4: User
      Submit form: 5: User
    section Response
      See success message: 5: User
      Receive confirmation email: 5: User
      Wait for team response: 3: User
```

---

## Form Submission Flow

```mermaid
graph TD
    A[User Lands on Contact] --> B{Source?}
    B -->|Direct URL| C[Empty Form]
    B -->|CTA with query param| D[Pre-filled Service Type]

    C --> E[User Fills Form]
    D --> E

    E --> F{Valid Data?}
    F -->|No| G[Show Validation Errors]
    G --> E

    F -->|Yes| H[Submit to API]
    H --> I{API Response?}

    I -->|Success| J[Show Success Message]
    I -->|Error| K[Show Error Message]

    J --> L[Send Confirmation Email]
    J --> M[Notify Team via Slack/Email]

    K --> N[Offer Retry or Alternative Contact]

    L --> O[User Receives Confirmation]
    M --> P[Team Reviews Request]
    P --> Q[Team Responds within SLA]

    style J fill:#a6c3a7
    style K fill:#f59e0b
    style Q fill:#a855f7
```

---

## Validation Flow

```mermaid
stateDiagram-v2
    [*] --> FormEmpty
    FormEmpty --> FillingForm: User types
    FillingForm --> ValidationCheck: On blur/submit

    ValidationCheck --> FieldValid: Passes rules
    ValidationCheck --> FieldInvalid: Fails rules

    FieldValid --> FillingForm: Continue
    FieldInvalid --> ShowError: Display message
    ShowError --> FillingForm: User corrects

    FillingForm --> AllFieldsValid: All required filled
    AllFieldsValid --> SubmitEnabled: Enable submit button
    SubmitEnabled --> Submitting: User clicks submit
    Submitting --> Success: 200 OK
    Submitting --> Error: 4xx/5xx
    Success --> [*]
    Error --> ShowError
```

---

## Field Validations

### Email Field
```mermaid
graph LR
    A[Email Input] --> B{Format Valid?}
    B -->|No| C[Show: Invalid email format]
    B -->|Yes| D{Domain Check?}
    D -->|Suspicious| E[Warn: Please use business email]
    D -->|Valid| F[Accept]

    style C fill:#f59e0b
    style E fill:#fbbf24
    style F fill:#a6c3a7
```

### Message Field
```mermaid
graph LR
    A[Message Input] --> B{Length Check}
    B -->|< 10 chars| C[Error: Too short]
    B -->|10-1000 chars| D[Valid]
    B -->|> 1000 chars| E[Error: Too long]

    style C fill:#f59e0b
    style D fill:#a6c3a7
    style E fill:#f59e0b
```

---

## Service Selector Pre-fill Logic

```mermaid
graph TD
    A[User Clicks CTA] --> B{URL Query Param?}
    B -->|service=audits| C[Pre-select: Smart Contract Audit]
    B -->|service=pentest| D[Pre-select: Penetration Testing]
    B -->|service=emergency| E[Pre-select: Emergency Response]
    B -->|No param| F[Default: Select a service]

    C --> G[Focus on Name Field]
    D --> G
    E --> G
    F --> G

    style E fill:#f59e0b
```

---

## Success/Error States

### Success Message
```
┌─────────────────────────────────────────────┐
│  ✓ Message Sent Successfully!              │
│                                             │
│  Thank you for contacting VLN. We've       │
│  received your message and will respond    │
│  within 24 hours.                          │
│                                             │
│  A confirmation email has been sent to     │
│  john@example.com                          │
│                                             │
│  [Return to Homepage]  [View Our Services] │
└─────────────────────────────────────────────┘
```

### Error Message
```
┌─────────────────────────────────────────────┐
│  ✗ Submission Failed                        │
│                                             │
│  We couldn't send your message. Please     │
│  try again or use an alternative contact   │
│  method below.                             │
│                                             │
│  [Try Again]  [Email Us]  [Live Chat]      │
└─────────────────────────────────────────────┘
```

---

## Mobile Optimization

```
┌────────────────────────┐
│ [☰] [VLN] [Get Help]  │
└────────────────────────┘

┌────────────────────────┐
│    Get in Touch        │
│                        │
│  Let's discuss how we  │
│  can secure your       │
│  smart contracts       │
└────────────────────────┘

┌────────────────────────┐
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
│  (Scroll for more)     │
│                        │
│  ┌──────────────────┐  │
│  │  Send Message →  │  │
│  └──────────────────┘  │
└────────────────────────┘
```

---

## Accessibility Features

- ✅ Labels associated with inputs
- ✅ Required fields marked with asterisk + aria-required
- ✅ Error messages linked to fields with aria-describedby
- ✅ Focus order follows visual layout
- ✅ Submit button disabled until form valid
- ✅ Success/error messages announced to screen readers
- ✅ Keyboard submission (Enter key)

---

## Performance Considerations

- Client-side validation before API call
- Debounced email format check
- Form state persisted in localStorage (auto-save draft)
- Optimistic UI updates
- Rate limiting (1 submission per minute)

---

## Analytics Events

```javascript
// Track form interactions
gtag('event', 'contact_form_start');
gtag('event', 'contact_form_complete');
gtag('event', 'contact_form_submit_success');
gtag('event', 'contact_form_submit_error');

// Track alternative contact methods
gtag('event', 'contact_email_click');
gtag('event', 'contact_telegram_click');
gtag('event', 'contact_emergency_click');
```

---

**Last Updated:** January 2025
**Status:** Implemented ✅
