# Services Page - Navigation & UX Flows

## Service Discovery Flow

```mermaid
graph TD
    A[User Arrives at /services] --> B{Entry Point?}
    B -->|From Homepage| C[Scroll to Anchor]
    B -->|Direct URL| D[View Full Page]
    B -->|From Pricing| E[Compare Services]

    D --> F[See All 5 Services]
    C --> G[Jump to Specific Service]
    E --> F

    F --> H{Interested in Service?}
    H -->|Yes| I[Read Full Description]
    H -->|Not Sure| J[Compare with Others]

    I --> K{Ready to Proceed?}
    K -->|Yes| L[Click Get Started CTA]
    K -->|Need More Info| M[View Pricing]

    J --> N[Scroll Through All Services]
    N --> I

    L --> O[Redirect to Contact]
    M --> P[Navigate to /pricing]

    style L fill:#a6c3a7
    style O fill:#a855f7
```

---

## Service Page Structure

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  [VLN Logo]                    Services    Pricing    Contact    [Get Help]    │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                          Our Services                                           │
│                                                                                 │
│            Comprehensive security solutions for blockchain gaming               │
│                        and DeFi protocols                                       │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                       🔍 Quick Navigation                                       │
│                                                                                 │
│  [Audits] [Pen Testing] [Development] [Design] [VLN University]              │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│  ┌─── Smart Contract Audits ───────────────────────────────────────────────┐  │
│  │                                                                           │  │
│  │  [Shield Icon - Large]                                                   │  │
│  │                                                                           │  │
│  │  Line-by-line code review with military-grade threat analysis           │  │
│  │                                                                           │  │
│  │  ✓ CVSS 3.1 risk scoring                                                │  │
│  │  ✓ Formal verification support                                          │  │
│  │  ✓ Gas optimization review                                              │  │
│  │  ✓ Economic attack modeling                                             │  │
│  │  ✓ Free fix verification                                                │  │
│  │  ✓ Post-audit support                                                   │  │
│  │                                                                           │  │
│  │  Pricing: Starting at $2,000                                             │  │
│  │  Timeline: 3-14 days depending on complexity                             │  │
│  │                                                                           │  │
│  │  ┌────────────────────┐  ┌────────────────────┐                        │  │
│  │  │  Get Started →     │  │  View Pricing →     │                        │  │
│  │  └────────────────────┘  └────────────────────┘                        │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│  ┌─── Penetration Testing ──────────────────────────────────────────────────┐  │
│  │                                                                           │  │
│  │  [Target Icon - Large]                                                   │  │
│  │                                                                           │  │
│  │  Red team simulation and infrastructure hardening                        │  │
│  │                                                                           │  │
│  │  ✓ Smart contract exploit testing                                       │  │
│  │  ✓ Infrastructure security assessment                                   │  │
│  │  ✓ Social engineering evaluation                                        │  │
│  │  ✓ API security testing                                                 │  │
│  │  ✓ Wallet security review                                               │  │
│  │  ✓ Comprehensive report with remediation                                │  │
│  │                                                                           │  │
│  │  Pricing: Starting at $3,500                                             │  │
│  │  Timeline: 1-2 weeks                                                     │  │
│  │                                                                           │  │
│  │  ┌────────────────────┐  ┌────────────────────┐                        │  │
│  │  │  Get Started →     │  │  View Pricing →     │                        │  │
│  │  └────────────────────┘  └────────────────────┘                        │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────┘

  (Pattern repeats for Development, Design, VLN University)
```

---

## Anchor Link Navigation

```mermaid
sequenceDiagram
    actor User
    participant Page
    participant Browser
    participant Anchor

    User->>Page: Clicks "Audits" in nav
    Page->>Browser: Navigate to /services#audits
    Browser->>Anchor: Scroll to #audits section
    Anchor->>Page: Highlight section briefly
    Page->>User: Display focused service
```

---

## Service Comparison Flow

```mermaid
graph LR
    A[View Service 1] --> B{Compare}
    B -->|Scroll Down| C[View Service 2]
    C --> D{Compare}
    D -->|Scroll Down| E[View Service 3]
    E --> F{Decision Made?}
    F -->|Yes| G[Select Service]
    F -->|No| H[Back to Service 1]
    H --> B

    G --> I[Click Get Started]
    I --> J[Contact Form with Pre-filled Service]

    style G fill:#a6c3a7
    style J fill:#a855f7
```

---

## Mobile Service Cards

```
┌────────────────────────┐
│  Smart Contract        │
│  Audits                │
│                        │
│  [Shield Icon]         │
│                        │
│  ✓ Line-by-line review │
│  ✓ CVSS 3.1 scoring    │
│  ✓ Free fix verify     │
│                        │
│  From $2,000           │
│  3-14 days             │
│                        │
│  ┌──────────────────┐  │
│  │  Get Started →   │  │
│  └──────────────────┘  │
│  [View Pricing]        │
└────────────────────────┘

(Swipe up for next service ↑)
```

---

## Service Selection Decision Tree

```mermaid
graph TD
    A[User Needs Security] --> B{What Stage?}

    B -->|Pre-Development| C[Secure Development]
    B -->|Development| D[Want Audit?]
    B -->|Post-Launch| E[Incident Response]

    D -->|Yes| F[Smart Contract Audit]
    D -->|Want More| G[Penetration Testing]

    C --> H{Need Design?}
    H -->|Yes| I[UI/UX Security Design]
    H -->|No| C

    F --> J{Want Ongoing?}
    J -->|Yes| K[Monthly Retainer]
    J -->|No| F

    E --> L[Emergency Response 24/7]

    style F fill:#a6c3a7
    style G fill:#aab7c8
    style I fill:#f59e0b
    style L fill:#ef4444
```

---

## CTA Button States

```mermaid
stateDiagram-v2
    [*] --> Default
    Default --> Hover: Mouse over
    Hover --> Default: Mouse out
    Hover --> Pressed: Click
    Pressed --> Loading: API call
    Loading --> Success: Response 200
    Loading --> Error: Response error
    Success --> [*]: Redirect
    Error --> Default: Show error
```

---

## Sticky Navigation Behavior

```mermaid
graph TD
    A[User Scrolls Page] --> B{Scroll Position?}
    B -->|Top 100px| C[Hide Quick Nav]
    B -->|> 100px| D[Show Sticky Quick Nav]

    D --> E[User Clicks Nav Link]
    E --> F[Smooth Scroll to Section]
    F --> G[Highlight Active Link]

    style D fill:#a6c3a7
    style G fill:#aab7c8
```

---

## Service Card Interaction States

### Default State
```
┌─────────────────────────────────┐
│ [Icon]  Service Name            │
│                                 │
│ Description text...             │
│                                 │
│ Features list                   │
│                                 │
│ [ Get Started → ]               │
└─────────────────────────────────┘
Border: sage/20
Shadow: none
```

### Hover State
```
┌─────────────────────────────────┐
│ [Icon]  Service Name            │←─ Lift 2px
│                                 │
│ Description text...             │
│                                 │
│ Features list                   │
│                                 │
│ [ Get Started → ]               │
└─────────────────────────────────┘
Border: sage/40
Shadow: 0 0 20px sage/40
```

### Active State (Clicked)
```
┌─────────────────────────────────┐
│ [Icon]  Service Name            │
│                                 │
│ Description text...             │
│                                 │
│ Features list                   │
│                                 │
│ [ ⟳ Loading... ]                │
└─────────────────────────────────┘
Border: sage/60
Button: Disabled state
```

---

## Accessibility Navigation

```mermaid
graph LR
    A[Tab] --> B[Service 1 Header]
    B --> C[Service 1 CTA]
    C --> D[Service 1 Pricing Link]
    D --> E[Service 2 Header]
    E --> F[Service 2 CTA]
    F --> G[Service 2 Pricing Link]

    style B fill:#a6c3a7
    style C fill:#aab7c8
    style D fill:#fbbf24
```

**Keyboard Shortcuts:**
- `Tab`: Next focusable element
- `Shift+Tab`: Previous focusable element
- `Enter/Space`: Activate button/link
- `1-5`: Jump to service (with accesskey attribute)

---

## Analytics Tracking

```javascript
// Track service views
gtag('event', 'service_view', {
  service_name: 'Smart Contract Audit',
  scroll_depth: '50%'
});

// Track CTA clicks
gtag('event', 'service_cta_click', {
  service_name: 'Smart Contract Audit',
  cta_type: 'get_started'
});

// Track navigation usage
gtag('event', 'quick_nav_click', {
  target_service: 'Penetration Testing',
  from_position: 'sticky_nav'
});
```

---

## SEO Optimization

### Service Page Structure
- **H1**: "Our Services" (page title)
- **H2**: Each service name (Smart Contract Audits, etc.)
- **H3**: Feature sections within each service
- **Schema Markup**: Service type, offers, pricing

### Meta Tags
```html
<title>Security Services | VLN - Smart Contract Audits & More</title>
<meta name="description" content="Comprehensive blockchain security services: smart contract audits, penetration testing, secure development, and emergency incident response.">
```

---

**Last Updated:** January 2025
**Status:** Implemented ✅
