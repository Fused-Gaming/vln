# Founder Meetup Popup - UX Flow & Architecture

## Overview
A non-intrusive modal popup that appears on the homepage to invite founders to join VLN at the weekly meetup in Oakland. The popup emphasizes networking and connection opportunities for founder community.

---

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Visits vln.gg                       │
│                      (Homepage Load)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │   Check localStorage for dismissal   │
        │   (24-hour dismissal period)         │
        └──────────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
          YES (Dismissed)        NO (Show)
                │                     │
                ▼                     ▼
          [Hidden]          ┌─────────────────────┐
                            │ Animate Popup Entry │
                            │ (Fade + Slide-up)   │
                            └────────┬────────────┘
                                     │
                ┌────────────────────┴────────────────────┐
                │                                         │
                ▼                                         ▼
        ┌──────────────────┐                   ┌──────────────────┐
        │  User Interaction│                   │    Auto-Popup    │
        │  - Close (X)     │                   │   Appears after   │
        │  - View Details  │                   │   3 sec (mobile)  │
        │  - Join on Luma  │                   │   5 sec (desktop) │
        └────────┬─────────┘                   └──────────────────┘
                 │
        ┌────────┴────────┬──────────────┐
        │                 │              │
        ▼                 ▼              ▼
    [Dismiss]      [View Details]  [Join Meetup]
        │                 │              │
        ▼                 ▼              ▼
   [Save to         [Expand modal]  [Redirect to Luma]
    localStorage]   [Show full      [Analytics event]
    [Analytics]      details]
                    [Social share
                     buttons]

```

---

## Component Hierarchy

```
HomePage (page.tsx)
├── Providers
│   └── FounderMeetupProvider
│       └── FounderMeetupPopup
│           ├── PopupHeader
│           ├── PopupContent
│           ├── EventDetails (location, time, description)
│           ├── SocialShareButtons
│           │   ├── LinkedInShare
│           │   ├── LumaShare
│           │   └── CopyLink
│           └── PopupActions
│               ├── JoinButton (CTA)
│               └── CloseButton
```

---

## State Management

### FounderMeetupStore (Zustand)
```typescript
{
  isOpen: boolean
  hasSeenPopup: boolean
  dismissedUntil: timestamp | null
  eventDetails: {
    venue: string
    address: string
    city: string
    time: string
    dayOfWeek: string
    lumaEventUrl: string
    linkedInUrl: string
  }
  analytics: {
    impressions: number
    clicks: number
    conversions: number
  }
}
```

---

## API Integration Points

### GET /api/events/meetup
Returns current meetup details (venue, address, time, links)

### POST /api/events/meetup/analytics
Logs user interactions (popup view, close, click, conversion)

### GET /api/events/meetup/og
Returns Open Graph metadata for social sharing

---

## Animation Specifications

### Entrance Animation (Mobile: 3s, Desktop: 5s delay)
```css
Fade In: opacity 0 → 1 (300ms ease-out)
Slide Up: transform translate(0, 20px) → translate(0, 0) (300ms ease-out)
```

### Hover Effects
```css
Button Glow: shadow [0_0_0_0] → shadow [0_0_8px_#a6c3a7] (200ms)
Border Lift: border-vln-sage/20 → border-vln-sage/40 (200ms)
```

---

## Event Details

**Venue:** The Crybaby (Craft Cocktail Bar)
**Address:** 1928 Telegraph Ave, Oakland, CA 94612
**Recurring:** Every Wednesday
**Time:** 5:00 PM – 7:00 PM PT
**Target Audience:** Tech founders, startup founders, blockchain founders
**Purpose:** Community networking, founder connections, VLN brand awareness

---

## Dismissal & Persistence

- **localStorage key:** `vln_founder_meetup_dismissed`
- **Dismissal duration:** 24 hours from close action
- **Reset:** Daily at midnight PT or on new session after 24hrs
- **Never show again:** Not implemented (users can always re-engage within 24hr period)

---

## Social Sharing Metadata

### Open Graph (og:*)
- og:title: "Join VLN Founders Network - Every Wednesday in Oakland"
- og:description: "Connect with founders and builders at The Crybaby. Weekly meetup for tech leadership and networking."
- og:image: `/og-images/founder-meetup.png` (generated dynamically)
- og:url: `https://vln.gg/?ref=founder-meetup`

### Twitter (twitter:*)
- twitter:card: "summary_large_image"
- twitter:title: Same as og:title
- twitter:description: Same as og:description

---

## Design Tokens Applied

```css
/* Background & Colors */
--vln-bg: #0f0f0f (modal background)
--vln-sage: #a6c3a7 (accent buttons, borders)
--vln-bluegray: #aab7c8 (secondary text)
--vln-white: #ffffff (primary text)
--vln-bg-light: rgba(255,255,255,0.05) (card backgrounds)

/* Spacing & Radius */
--vln-radius: 12px (border-radius)
--vln-card-lift: 4px (shadow elevation)

/* Fonts */
font-family: "Inter" (body)
font-family: "JetBrains Mono" (technical/metadata)
```

---

## Performance Metrics

- **Modal render time:** < 50ms
- **Animation duration:** 300ms (fade + slide)
- **Delay before auto-show:** 3s (mobile) / 5s (desktop)
- **localStorage operations:** < 5ms
- **API call latency:** < 200ms (with caching)
- **Total bundle impact:** < 15KB gzipped

---

## Security Considerations

1. **XSS Prevention:** All user-generated content sanitized via DOMPurify
2. **CSRF Protection:** API endpoints use Next.js CSRF middleware
3. **Rate Limiting:** Analytics endpoint limited to 10 req/sec per IP
4. **Data Privacy:** No PII stored; only aggregated analytics logged
5. **Link Validation:** Luma and LinkedIn URLs hardcoded, not user-supplied

---

## Mobile Responsiveness

| Device | Modal Width | Padding | Font Size | Auto-show Delay |
|--------|-------------|---------|-----------|-----------------|
| Mobile | 90vw (max 340px) | 16px | 16px | 3s |
| Tablet | 85vw (max 480px) | 20px | 16px | 4s |
| Desktop | 500px fixed | 24px | 16px | 5s |

