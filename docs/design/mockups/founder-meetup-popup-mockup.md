# Founder Meetup Popup - ASCII Mockups

## VLN Design System Applied
- **Colors:** Matte Charcoal (#0f0f0f) + Sage Green (#a6c3a7) + Warm Blue-Gray (#aab7c8)
- **Border Radius:** 12px (vln-radius)
- **Motion:** Subtle glow-lift effects on hover
- **Font:** Inter (primary), JetBrains Mono (metadata)
- **Tone:** High-trust, professional, research lab aesthetic

---

## Desktop Layout (500px Modal)

```
┌─────────────────────────────────────────────────────────┐
│                   VLN FOUNDER MEETUP                    │
│                                                    [×]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🔗 VLN FOUNDERS NETWORK                               │
│                                                         │
│  Connect with builders. Every Wednesday.                │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │                                               │     │
│  │  📍 THE CRYBABY                               │     │
│  │     1928 Telegraph Ave                        │     │
│  │     Oakland, CA 94612                         │     │
│  │                                               │     │
│  │  🕐 Every Wednesday                           │     │
│  │     5:00 PM – 7:00 PM                         │     │
│  │                                               │     │
│  │  Join tech founders and builders for:         │     │
│  │  • Direct network access                      │     │
│  │  • Founder peer advisory                      │     │
│  │  • VLN security insights                      │     │
│  │                                               │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  SHARE WITH YOUR NETWORK:                              │
│  [LinkedIn] [Copy Link] [Luma Event]                   │
│                                                         │
│                 ┌──────────────────────┐               │
│                 │ ✨ JOIN VLN NETWORK  │               │
│                 └──────────────────────┘               │
│                    or [DISMISS]                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

HOVER EFFECT:
┌─────────────────────────────────────────────────────────┐
│  [JOIN] button glows with sage-green shadow             │
│  Shadow: 0 0 8px #a6c3a7                               │
│  Border lift effect on interactive elements            │
└─────────────────────────────────────────────────────────┘
```

---

## Mobile Layout (90vw, max 340px)

```
┌─────────────────────────────┐
│  VLN FOUNDER MEETUP     [×]  │
├─────────────────────────────┤
│                             │
│ 🔗 FOUNDERS NETWORK         │
│                             │
│ Connect & Build             │
│                             │
│ ┌─────────────────────────┐ │
│ │ 📍 THE CRYBABY          │ │
│ │  1928 Telegraph Ave     │ │
│ │  Oakland, CA 94612      │ │
│ │                         │ │
│ │ 🕐 Wednesday            │ │
│ │    5-7 PM               │ │
│ │                         │ │
│ │ Join tech leaders       │ │
│ │ • Network               │ │
│ │ • Advisory              │ │
│ │ • Insights              │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ SHARE:                      │
│ [In] [Link] [Luma]          │ │
│                             │
│ ┌──────────────────────────┐│
│ │  ✨ JOIN NETWORK         ││
│ └──────────────────────────┘│
│    or [dismiss]             │
│                             │
└─────────────────────────────┘

ANIMATION SEQUENCE:
Frame 1 (0ms):    opacity: 0, transform: translateY(20px)
Frame 2 (150ms):  opacity: 0.5, transform: translateY(10px)
Frame 3 (300ms):  opacity: 1, transform: translateY(0)
Frame 4 (onward): Stable + hover effects available
```

---

## Component Details & States

### Header with Close Button
```
┌──────────────────────────────────────┐
│ VLN FOUNDER MEETUP              [×]  │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │
│ Tag: 🔗 VLN FOUNDERS NETWORK (sage)  │
└──────────────────────────────────────┘

HOVER STATE (Close Button):
[×] → shadow-[0_0_8px_#a6c3a7]
```

### Event Details Card
```
┌───────────────────────────────────────┐
│                                       │
│  bg: #0f0f0f (vln-bg)                 │
│  border: 1px solid #a6c3a7/30         │
│  radius: 12px                         │
│                                       │
│  📍 THE CRYBABY                       │
│     Typographic: mono (address)       │
│     1928 Telegraph Ave                │
│     Oakland, CA 94612, United States  │
│                                       │
│  🕐 Every Wednesday, 5:00–7:00 PM    │
│     Color: #aab7c8 (bluegray)        │
│                                       │
│  Description (vln-gray):              │
│  "Connect with web3 founders,         │
│   builders, and security leaders..."  │
│                                       │
└───────────────────────────────────────┘

BORDER HOVER:
#a6c3a7/30 → #a6c3a7/60 (200ms ease-out)
```

### Share Buttons Row
```
┌─────────────────────────────────────┐
│ SHARE WITH YOUR NETWORK:            │
│                                     │
│ [LinkedIn]  [Copy Link]  [Luma]    │
│  button-    secondary   button-     │
│  secondary  button      primary     │
│                                     │
│ Spacing: 8px gap                    │
│ Each button: 100-120px width        │
│                                     │
└─────────────────────────────────────┘

BUTTON STATES:
Normal:  shadow-[0_0_0_0]
Hover:   shadow-[0_0_8px_#a6c3a7] (sage for primary)
         shadow-[0_0_8px_#aab7c8] (bluegray for secondary)
```

### Action Buttons
```
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ✨ JOIN VLN NETWORK         │    │
│  │ (button-primary, full-width)│    │
│  └─────────────────────────────┘    │
│                                     │
│    or [dismiss]                     │
│       (text-link, neutral)          │
│                                     │
└─────────────────────────────────────┘

CTA BUTTON:
- bg: #a6c3a7 (sage)
- color: #0f0f0f (charcoal, high contrast)
- hover: shadow-[0_0_8px_#a6c3a7]
- px: 24px, py: 12px
- radius: 12px
- font-weight: 600

DISMISS LINK:
- color: #aab7c8 (bluegray)
- hover: color: #ffffff (white)
- text-decoration: none
```

---

## Full Page Context (Homepage with Popup)

```
┌────────────────────────────────────────────────────────────┐
│                     VLN HEADER                             │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                   [HERO SECTION]                          │
│            "Your Contract Has Bugs"                       │
│      "Let us find them before hackers do"                │
│           [Start Scan] [Emergency Forensics]             │
│                                                            │
│              ┌───────────────────────┐                    │
│              │  FounderMeetup Popup  │                    │
│              │  (Centered Overlay)   │  (overlay z-50)    │
│              │  Modal with backdrop  │                    │
│              └───────────────────────┘                    │
│                                                            │
│              ╔═══════════════════════╗                    │
│              ║ BACKDROP OVERLAY      ║  (bg-black/50)     │
│              ║ (Dark, semi-transparent)║                  │
│              ╚═══════════════════════╝                    │
│                                                            │
│           [Stats Grid Section] (Below)                    │
│           [Service Pillars Section]                       │
│           [Testimonials Section]                          │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                     VLN FOOTER                             │
└────────────────────────────────────────────────────────────┘
```

---

## Design Token Application Table

| Element | Token Applied | Visual | Comments |
|---------|---------------|--------|----------|
| Modal BG | vln-bg | #0f0f0f | Consistent with page |
| Accent Text | vln-sage | #a6c3a7 | Event highlights |
| Secondary Text | vln-bluegray | #aab7c8 | Address, time |
| Primary Button | vln-sage | #a6c3a7 on #0f0f0f | High contrast CTA |
| Border | vln-sage/30 | Semi-transparent | Subtle framing |
| Border Hover | vln-sage/60 | Increased opacity | Interactive feedback |
| Glow Effect | shadow-[0_0_8px_#a6c3a7] | Sage radiance | VLN signature |
| Border Radius | 12px | All interactive elements | vln-radius standard |
| Font Primary | Inter | All body text | VLN brand font |
| Font Mono | JetBrains Mono | Address, technical | Technical credibility |

---

## Responsive Breakpoints

```
Mobile (< 640px):
- Modal width: 90vw (max 340px)
- Padding: 16px
- Font size: 14px (smaller)
- Auto-show delay: 3 seconds
- Stacked layout for share buttons

Tablet (640px - 1024px):
- Modal width: 85vw (max 480px)
- Padding: 20px
- Font size: 15px
- Auto-show delay: 4 seconds
- Row layout for share buttons (2-column)

Desktop (> 1024px):
- Modal width: 500px fixed
- Padding: 24px
- Font size: 16px
- Auto-show delay: 5 seconds
- Row layout for share buttons (3-column)
```

---

## Interaction States Diagram

```
STATE: INITIAL
└─> SHOWN (popup rendered, entrance animation plays)
    ├─> USER DISMISS
    │   └─> DISMISSED (set localStorage, hide popup)
    │       └─> [24-hour cooldown]
    │
    ├─> USER SHARE (LinkedIn)
    │   ├─> [Open LinkedIn share intent]
    │   └─> [Track analytics event]
    │
    ├─> USER COPY LINK
    │   ├─> [Copy to clipboard]
    │   ├─> [Show toast: "Copied!"]
    │   └─> [Track analytics event]
    │
    └─> USER JOIN (Luma)
        ├─> [Open Luma event page]
        └─> [Track conversion event]
        └─> [Log as successful acquisition]
```

