---
title: Services Navigation UX Flow
description: Services page navigation patterns, service discovery flows, and interaction states
---

## Service Discovery Flow

```
User Arrives at /services
  └→ Entry Point?
       ├─ From Homepage → Scroll to Anchor
       ├─ Direct URL → View Full Page
       └─ From Pricing → Compare Services

  └→ View Services
       └→ Interested?
            ├─ Yes → Read Full Description → Ready to Proceed?
            │              ├─ Yes → Click Get Started CTA → /contact (pre-filled)
            │              └─ Need More Info → View Pricing
            └─ Not Sure → Compare with Others → scroll through all services
```

---

## Service Page Structure

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [VLN Logo]              Services    Pricing    Contact    [Get Help]    │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                           Our Services                                   │
│         Comprehensive security solutions for blockchain gaming           │
│                         and DeFi protocols                               │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  [Audits]  [Pen Testing]  [Development]  [Design]  [VLN University]     │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  Smart Contract Audits                                                   │
│  [Shield Icon]                                                           │
│                                                                          │
│  Line-by-line code review with military-grade threat analysis           │
│                                                                          │
│  ✓ CVSS 3.1 risk scoring        ✓ Formal verification                  │
│  ✓ Gas optimization review      ✓ Economic attack modeling              │
│  ✓ Free fix verification        ✓ Post-audit support                   │
│                                                                          │
│  Starting at $2,000 | 3–14 days                                         │
│                                                                          │
│  [Get Started →]  [View Pricing →]                                      │
└──────────────────────────────────────────────────────────────────────────┘

  (Pattern repeats for each service)
```

---

## Services Offered

| Service | Icon | Color | Starting Price | Timeline |
|---------|------|-------|----------------|----------|
| Smart Contract Audits | Shield | Sage | $2,000 | 3–14 days |
| Penetration Testing | Target | Blue | $3,500 | 1–2 weeks |
| Secure Development | Code | Purple | Custom | Custom |
| UI/UX Security Design | Palette | Amber | Custom | Custom |
| VISE Education | BookOpen | Purple | Free–$500 | Self-paced |

---

## Service Card Interaction States

### Default State

```
┌─────────────────────────────────────┐
│ [Icon]  Service Name                │
│                                     │
│ Description text...                 │
│                                     │
│ ✓ Feature 1   ✓ Feature 4          │
│ ✓ Feature 2   ✓ Feature 5          │
│ ✓ Feature 3   ✓ Feature 6          │
│                                     │
│ Price | Timeline                    │
│                                     │
│ [ Get Started → ]                   │
└─────────────────────────────────────┘
Border: vln-sage/20 | Shadow: none
```

### Hover State

```
┌─────────────────────────────────────┐  ↑ lifted 2px
│ [Icon]  Service Name                │
│ ...                                 │
│ [ Get Started → ]                   │
└─────────────────────────────────────┘
Border: vln-sage/40 | Shadow: 0 0 20px sage/40
```

### Active (Loading)

```
┌─────────────────────────────────────┐
│ [Icon]  Service Name                │
│ ...                                 │
│ [ ⟳ Loading... ]                    │
└─────────────────────────────────────┘
Button: Disabled state
```

---

## Sticky Quick Navigation

**Behavior:**
- Hidden when user is within top 100px
- Appears sticky after scrolling past hero
- Active link highlights current section
- Click → smooth scroll to service section

---

## Service Selector Decision Tree

```
User Needs Security
  └→ What Stage?
       ├─ Pre-Development → Secure Development + UI/UX Security Design
       ├─ Development → Smart Contract Audit (→ Penetration Testing for more)
       ├─ Post-Launch → Emergency Response (24/7)
       └─ Ongoing → Monthly Retainer
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
│  3–14 days             │
│                        │
│  ┌──────────────────┐  │
│  │  Get Started →   │  │
│  └──────────────────┘  │
│  [View Pricing]        │
└────────────────────────┘
```

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Next focusable element |
| `Shift+Tab` | Previous focusable element |
| `Enter`/`Space` | Activate button/link |
| `1`–`5` | Jump to service (via `accesskey`) |

---

## Analytics Tracking

```javascript
// Service views
gtag('event', 'service_view', {
  service_name: 'Smart Contract Audit',
  scroll_depth: '50%'
});

// CTA clicks
gtag('event', 'service_cta_click', {
  service_name: 'Smart Contract Audit',
  cta_type: 'get_started'
});

// Quick nav usage
gtag('event', 'quick_nav_click', {
  target_service: 'Penetration Testing',
  from_position: 'sticky_nav'
});
```

---

## SEO Structure

```html
<h1>Our Services</h1>
  <h2>Smart Contract Audits</h2>
    <h3>Features</h3>
    <h3>Pricing</h3>
  <h2>Penetration Testing</h2>
  ...
```

---

**Last Updated:** January 2025 | **Status:** Implemented ✅
