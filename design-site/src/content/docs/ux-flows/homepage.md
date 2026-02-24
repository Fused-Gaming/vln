---
title: Homepage UX Flow
description: VLN Homepage user experience flows, interaction patterns, and conversion funnel
---

## Purpose

Document the UX flows, interaction patterns, and conversion funnels for the VLN homepage — the primary entry point for all visitors.

---

## Primary User Journeys

### Journey 1: Cold Visitor → Free Scan Request

```
Landing
  └→ Hero (read headline + subheadline)
    └→ Trust badges (47 vulns, $5.2M, 0 hacks)
      └→ Primary CTA: "Start Free 30-Min Scan"
        └→ /contact (booking form)
          └→ Form submission
            └→ Confirmation email
```

**Conversion Rate Target:** 12–15%

---

### Journey 2: Warm Visitor → Service Comparison

```
Landing
  └→ Hero (skim)
    └→ Stats Grid (scroll)
      └→ Service Pillars (compare options)
        └→ Comparison Table (deep comparison)
          └→ Pricing Section
            └→ CTA: "Start Free 30-Min Scan"
```

---

### Journey 3: Emergency (Post-Exploit)

```
Landing
  └→ Hero: Secondary CTA "24/7 Emergency Forensics"
    └→ /contact (emergency form)
      └→ Immediate response
```

**Target:** < 2 clicks from landing to contact

---

### Journey 4: Research → Trust Building

```
Landing
  └→ Stats Grid
    └→ Testimonials
      └→ Comparison Table
        └→ FAQ (objection handling)
          └→ Guarantee Section
            └→ Final CTA
```

---

## Section-by-Section Interaction Patterns

### Hero Section

**Primary interaction:** CTA button click
**Scroll trigger:** PCB trace animation begins on page load
**Animation sequence:**
1. Headline fades in (0ms delay)
2. Subheadline fades in (200ms)
3. Description fades in (400ms)
4. CTA buttons fade in (600ms)
5. Trust badges fade in (800ms)

---

### Stats Grid

**Primary interaction:** Scroll to trigger counters
**Pattern:** 8 cards animate in sequentially (100ms stagger)
**Counter behavior:** Numbers count up from 0 over 2 seconds

```
Scroll into view → IntersectionObserver fires
  → StaggerFade triggers
    → Counter animation starts
      → Stats reach final value
```

---

### Service Pillars

**Primary interaction:** Card hover → glow effect + lift
**Secondary:** CTA button click per service

**Hover state:**
```
Card hover → border-vln-sage/40
           → shadow-vln-glow
           → -translate-y-1
```

**Mobile behavior:** Stack vertically (no hover states)

---

### Urgency Banner

**Primary interaction:** "Book Your Slot Now" CTA
**Availability:** Updates monthly (manual or CMS-driven future)
**Progress bar:** Visual urgency (10 of 13 filled)

---

### Testimonials

**Primary interaction:** "View All 47 Reviews" link
**Display:** 3 testimonials, static (no carousel on desktop)
**Mobile:** Scrollable horizontal on smallest viewports

---

### FAQ Section

**Primary interaction:** Accordion expand/collapse
**Animation:** Max-height transition (200ms)
**State:** Chevron rotates 180° when open

```
Click FAQ item
  → ChevronDown rotates
  → Content expands (max-height transition)
  → Other items remain collapsed
```

---

### Guarantee Section

**Primary interaction:** "Start Your Free Scan" CTA
**Design intent:** Risk reversal, confidence building
**Visual:** ShieldCheck icon (sage, 8×8) above headline

---

### Final CTA

**Primary interaction:** Both CTAs (same as hero)
**Design intent:** Last conversion opportunity before footer
**Background:** Gradient overlay on dark background

---

## Micro-Interactions

### Glow Lift (All CTAs and Cards)

```css
/* Base state */
transition-all shadow-[0_0_0_0_rgba(166,195,167,0)]

/* Hover state */
shadow-[0_0_8px_#a6c3a7]
```

### Button Active State

```css
transform: scale(0.98);
transition: transform 100ms ease-out;
```

### FAQ Chevron

```css
/* Closed */
transform: rotate(0deg);

/* Open */
transform: rotate(180deg);
transition: transform 300ms ease-out;
```

---

## Scroll Behavior

**Smooth scrolling:** Enabled via `scroll-behavior: smooth`
**Scroll-to-top:** Floating button appears after 300px scroll
**Navigation anchors:** All section CTAs scroll to contact form

---

## Mobile UX Differences

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Hero CTAs | Side by side | Stacked |
| Trust badges | 3 inline | 2×2 grid |
| Stats grid | 4 columns | 2 columns |
| Service pillars | 4 columns | 1 column |
| Testimonials | 3 side by side | Scroll |
| Comparison table | Full | Horizontal scroll |

---

## Accessibility Flow

1. Skip-to-content link at top
2. Logical heading hierarchy (H1 → H2 → H3)
3. All CTAs keyboard accessible
4. FAQ accordion keyboard operable
5. Focus indicator visible on all interactive elements
6. Screen reader: Section headings announced

---

## Analytics Events to Track

| Event | Trigger | Category |
|-------|---------|----------|
| `cta_click_hero_primary` | Hero "Start Free Scan" | Primary conversion |
| `cta_click_hero_emergency` | Hero "24/7 Forensics" | Emergency |
| `service_card_click` | Service pillar CTA | Secondary |
| `faq_expand` | FAQ accordion open | Engagement |
| `scroll_depth_50` | 50% scroll | Engagement |
| `scroll_depth_100` | 100% scroll | Engagement |
| `testimonial_view` | Testimonial section visible | Trust |
| `final_cta_click` | Bottom CTA | Conversion |
