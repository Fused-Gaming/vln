# VLN Docs-Site Design System
## Brand-Aligned Documentation Experience

**Version:** 1.0
**Status:** Design Specification
**Last Updated:** February 2026
**Designer:** VLN Design System
**Audience:** Product team, developers, clients

---

## Design Overview

The VLN docs-site is a **premium, research-lab-aesthetic documentation platform** that maintains brand consistency while prioritizing developer usability, performance, and accessibility.

### Core Design Tenets

1. **Research Lab Aesthetic** - Professional, minimal, technical
2. **Performance First** - Lazy loading, optimized assets, <1s navigation
3. **Accessibility** - WCAG AAA compliant, keyboard-navigable
4. **Developer-Focused** - Syntax highlighting, code copy, dark mode default
5. **Brand Consistency** - Apply VLN colors, typography, spacing throughout

---

## Color Palette

### Primary Colors

```
Background Base      #0a0e0f  Matte Charcoal (from brand)
│
├─ Light variant    #111317  (for card backgrounds)
├─ Dark variant     #050708  (for code blocks)
└─ Overlay           rgba(10, 14, 15, 0.95)
```

### Accent Colors

```
Sage Green          #86d993  Primary interactive, links, highlights
Sky Blue            #7dd3fc  Secondary, code blocks, callouts
Amber               #fbbf24  Warnings, alerts, emphasis
Purple              #c084fc  Premium, decorative accents
```

### Semantic Colors

```
Success             #10b981  Green (for positive states)
Error               #ef4444  Red (for errors)
Warning             #f59e0b  Amber (for warnings)
Info                #3b82f6  Blue (for information)
```

### Text Colors

```
Primary Text        #f5f5f5  Main content, headings
Secondary Text      #b0b0b0  Descriptions, metadata
Tertiary Text       #808080  Disabled, muted
Inverse             #0a0e0f  Text on light backgrounds
```

---

## Typography System

### Font Stack

```css
/* Primary (UI, body) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Code (technical content) */
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Heading Scale

```
Heading 1 (H1)
├─ Size:    2.25rem / 36px
├─ Weight:  600 (semi-bold)
├─ Line:    1.2 (tight)
├─ Color:   #f5f5f5 (Primary text)
└─ Usage:   Page titles, main sections

Heading 2 (H2)
├─ Size:    1.875rem / 30px
├─ Weight:  600
├─ Line:    1.3
├─ Color:   #f5f5f5
├─ Margin:  48px top, 24px bottom
└─ Usage:   Major section breaks

Heading 3 (H3)
├─ Size:    1.5rem / 24px
├─ Weight:  600
├─ Line:    1.4
├─ Color:   #f5f5f5
├─ Margin:  32px top, 16px bottom
└─ Usage:   Subsection headings

Heading 4 (H4)
├─ Size:    1.25rem / 20px
├─ Weight:  600
├─ Line:    1.5
├─ Color:   #b0b0b0
├─ Margin:  24px top, 12px bottom
└─ Usage:   Subsection titles

Heading 5 (H5)
├─ Size:    1rem / 16px
├─ Weight:  600
├─ Line:    1.5
├─ Color:   #b0b0b0
└─ Usage:   Small headings, labels

Body Text
├─ Size:    1rem / 16px
├─ Weight:  400 (regular)
├─ Line:    1.625 (relaxed, 26px)
├─ Color:   #f5f5f5
└─ Usage:   Main content, paragraphs

Small Text
├─ Size:    0.875rem / 14px
├─ Weight:  400
├─ Line:    1.5
├─ Color:   #b0b0b0
└─ Usage:   Metadata, timestamps, labels

Code Inline
├─ Size:    0.875rem / 14px
├─ Weight:  400 (JetBrains Mono)
├─ Bg:      rgba(255, 255, 255, 0.05)
├─ Padding: 2px 4px
└─ Color:   #86d993 (Sage Green)
```

---

## Layout & Spacing

### Container System

```
Page Container
├─ Max width:     1280px
├─ Mobile:        100% - 16px padding (8px each side)
├─ Tablet:        100% - 24px padding
└─ Desktop:       1280px centered

Content Margin
├─ Top:          56px (header space)
├─ Sides:        40px (desktop), 16px (mobile)
└─ Bottom:       64px (footer space)

Sidebar Width
├─ Desktop:      280px
├─ Tablet:       240px (collapsed)
├─ Mobile:       Hidden (drawer)
```

### Spacing Scale

```
0    0px      (none)
1    4px      (minimal)
2    8px      (tight)
3    12px     (comfortable)
4    16px     (standard)
6    24px     (generous)
8    32px     (spacious)
12   48px     (section break)
16   64px     (major break)
```

### Border & Radius

```
Border Radius
├─ Small:    4px   (inputs, buttons)
├─ Medium:   8px   (cards)
├─ Large:    12px  (containers)
└─ Full:     9999px (pills, avatars)

Border Width
├─ Thin:     1px   (dividers)
├─ Medium:   2px   (active states)
└─ Thick:    3px   (focus indicators)

Border Color
├─ Light:    rgba(255, 255, 255, 0.1)
├─ Medium:   rgba(255, 255, 255, 0.2)
└─ Strong:   rgba(255, 255, 255, 0.3)
```

---

## Component Design Patterns

### Navigation Sidebar

```
┌────────────────────────────────┐
│      VLN DOCS                  │  Height: 56px
├────────────────────────────────┤
│ 📚 Getting Started             │
│ ├─ Prerequisites              │  Active item:
│ ├─ Local Setup                │  - Sage green left border (4px)
│ └─ First Deploy               │  - Light background
│                                │  - Bold text
│ 🔧 CI/CD Pipeline             │
│ ├─ Overview                    │  Collapsed sections:
│ ├─ GitHub Actions              │  - ► Icon indicates expandable
│ └─ Triggers                    │
│                                │
│ 🚀 Deployment                  │
│ ├─ Vercel Setup               │
│ └─ Environments               │
│                                │
│ ⚙️ Infrastructure             │
│ ⚠️ Security                    │
│ 🧪 Testing                     │
│ 📊 Monitoring                  │
│                                │
├────────────────────────────────┤
│    Sticky Footer               │
│ 🌙 Dark Mode Toggle            │
│ ⚙️  Settings                    │
│ 🔗 GitHub Link                 │
└────────────────────────────────┘

Sidebar Behavior:
- Desktop (>1024px): Always visible, 280px
- Tablet (768-1024px): Collapsible, 240px default
- Mobile (<768px): Hidden, drawer on hamburger
- Scroll: Sticky header, sidebar scrolls independently
```

### Main Content Area

```
┌─────────────────────────────────────────────────────────────┐
│ docs > devops > ci-cd > github-actions > ci.md             │  Breadcrumbs
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔧 GitHub Actions CI/CD Workflow                         │ H1 + icon
│  ───────────────────────────────────────────────────────── │ Sage line
│  Comprehensive guide to VLN's automated testing and         │ Subtext
│  build pipeline using GitHub Actions.                       │
│                                                              │
│  Last updated: Feb 24, 2026 • 8 min read                  │ Metadata
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📖 Table of Contents                                       │ Right sidebar
│  ├─ Workflow Overview                                       │ (sticky TOC)
│  ├─ Trigger Events                                          │
│  ├─ Job Configuration                                       │
│  └─ Troubleshooting                                         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ## Workflow Overview                                        │
│                                                              │
│  This workflow runs automatically on every push to the      │
│  main and integration/vln branches...                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ bash                                                │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ 1  name: CI/CD Pipeline                             │  │
│  │ 2  on:                                              │  │
│  │ 3    push:                                          │  │
│  │ 4      branches: [main, integration/vln]           │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                              │
│  ℹ️  Pro Tip: Use conditional jobs to skip expensive    │ Info card
│  steps on documentation-only changes.                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Code Block

```
┌─────────────────────────────────────────────────────────┐
│ typescript                      📋 Copy  ⇗ Open in IDE │  Header
├─────────────────────────────────────────────────────────┤
│  1 | export async function GET() {                      │  Line numbers
│  2 |   return NextResponse.json({                       │  Sky blue border
│  3 |     ok: true,                                      │  Syntax highlighting
│  4 |     message: "API ready"                           │  Dark background
│  5 |   })                                               │
│  6 | }                                                  │
└─────────────────────────────────────────────────────────┘

Features:
- Syntax highlighting (all major languages)
- Line numbers
- Copy-to-clipboard button
- File type indicator
- Diff highlighting (for git diffs)
- Line highlighting (yellow background)
- Theme: Dark, matches #050708 background
```

### Callout/Admonition Boxes

```
⚠️  WARNING                                    [Amber #fbbf24]
┌────────────────────────────────────────────────────────┐
│ This will delete all production data. Make sure you    │
│ have a recent backup before proceeding.                 │
└────────────────────────────────────────────────────────┘
Left border: 4px amber, background: rgba(251, 191, 36, 0.1)

ℹ️  INFORMATION                                [Sky Blue #7dd3fc]
┌────────────────────────────────────────────────────────┐
│ You can use environment variables to override this    │
│ setting at runtime.                                    │
└────────────────────────────────────────────────────────┘
Left border: 4px sky blue, background: rgba(125, 211, 252, 0.1)

✅ SUCCESS / TIP                              [Sage Green #86d993]
┌────────────────────────────────────────────────────────┐
│ Congrats! Your deployment is now live. You can view  │
│ it at vln.gg                                          │
└────────────────────────────────────────────────────────┘
Left border: 4px sage, background: rgba(134, 217, 147, 0.1)

🚨 ERROR                                      [Red #ef4444]
┌────────────────────────────────────────────────────────┐
│ Build failed due to TypeScript errors. Check the     │
│ error log above for details.                          │
└────────────────────────────────────────────────────────┘
Left border: 4px red, background: rgba(239, 68, 68, 0.1)
```

### Table Design

```
┌────────────────────────────────────────────────────────┐
│ Feature     │ Free   │ Pro      │ Enterprise           │
├────────────────────────────────────────────────────────┤
│ Builds/mo   │ 50     │ 500      │ Unlimited            │
│ Duration    │ 5m     │ 30m      │ Custom               │
│ Priority    │ Low    │ High     │ Critical             │
├────────────────────────────────────────────────────────┤
│ Support     │ Email  │ Chat 4h  │ Phone 1h             │
│ SLA         │ None   │ 99.5%    │ 99.99%               │
└────────────────────────────────────────────────────────┘

Header background:   rgba(134, 217, 147, 0.1) (Sage, 10% opacity)
Row borders:         1px rgba(255, 255, 255, 0.1)
Alternating rows:    rgba(255, 255, 255, 0.02)
Hover state:         rgba(255, 255, 255, 0.05)
```

### Buttons & Interactive Elements

```
Primary Button (CTA)
┌─────────────────────────┐
│ ▶ Start Free 30-Min Scan│  Background: Sage Green #86d993
└─────────────────────────┘  Text: Matte Charcoal #0a0e0f
  Padding: 12px 24px        Weight: 600
  Radius: 8px               On hover: Glow + scale 1.02
  Box-shadow: 0 0 12px rgba(134, 217, 147, 0.3)

Secondary Button
┌─────────────────┐
│ Learn More      │        Background: Transparent
└─────────────────┘        Border: 2px Sage Green #86d993
  Text: Sage Green          Text: Sage Green
  On hover: Filled with Sage, white text

Tertiary/Link Button
  Read More →             Text: Sage Green
  Underline on hover      No background
  Box-shadow on hover     Smooth transition

Code Copy Button
┌─────┐
│ 📋   │                  Positioned top-right in code block
└─────┘                   Background: rgba(134, 217, 147, 0.2)
  On hover: Sage #86d993
  On click: "Copied!" feedback, 2s duration
```

---

## Animation & Motion

### Principles

- **Subtle & Professional** - No flashy effects
- **Purpose-Driven** - Animations convey meaning
- **Performance-First** - GPU-accelerated, <300ms duration
- **Accessibility** - Respect `prefers-reduced-motion`

### Common Animations

```
Link Hover
├─ Effect:       Underline slides in from left
├─ Duration:     200ms
├─ Easing:       ease-out
└─ Color:        Sage Green #86d993

Button Press
├─ Effect:       Scale 1.02 + subtle glow
├─ Duration:     150ms
├─ Easing:       ease-in-out
└─ Shadow:       0 0 12px rgba(134, 217, 147, 0.3)

Page Transition
├─ Effect:       Fade in + slide down 8px
├─ Duration:     300ms
├─ Easing:       ease-out
└─ Stagger:      100ms between elements

Sidebar Toggle
├─ Effect:       Slide in from left (mobile)
├─ Duration:     250ms
├─ Easing:       ease-out
└─ Backdrop:     Fade in dark overlay

Code Block Highlight
├─ Effect:       Background color flash (yellow)
├─ Duration:     2s
├─ Easing:       ease-out
└─ Use case:     Highlighting changed lines
```

---

## Responsive Design

### Breakpoints

```
Mobile         < 640px   (xs)  - Default, mobile-first
Mobile L       ≥ 640px   (sm)  - Large phones
Tablet         ≥ 768px   (md)  - Tablets, small laptops
Desktop        ≥ 1024px  (lg)  - Desktop, laptops
Desktop XL     ≥ 1280px  (xl)  - Large desktops
Desktop 2XL    ≥ 1536px  (2xl) - Ultra-wide displays
```

### Layout Adjustments

```
Mobile (<768px)
├─ Sidebar:      Hidden (drawer)
├─ TOC:          Hidden (drawer)
├─ Container:    Full width - 16px
├─ Code:         Horizontal scroll
├─ Font:         16px minimum (iOS zoom prevention)
└─ Spacing:      Reduced by 25%

Tablet (768-1024px)
├─ Sidebar:      Collapsible, default open
├─ TOC:          Right sidebar, sticky
├─ Container:    Full width - 24px
├─ Code:         Horizontal scroll
└─ Spacing:      Standard

Desktop (>1024px)
├─ Sidebar:      Always visible, 280px
├─ TOC:          Right sidebar, sticky
├─ Container:    1280px centered
├─ Code:         Full width
└─ Layout:       3-column (sidebar, content, TOC)
```

---

## Accessibility Requirements

### WCAG AAA Compliance

```
Color Contrast
├─ Text to background:    7:1 minimum (AAA)
├─ Interactive elements:  4.5:1 minimum
├─ Borders to background: 3:1 minimum
└─ All colors verified:   WebAIM contrast checker

Focus Indicators
├─ Visible on all interactive elements
├─ Thickness: 2px minimum
├─ Color: Sage Green #86d993
├─ Offset: 2px
└─ Never removed with CSS

Keyboard Navigation
├─ All interactive elements tab-accessible
├─ Tab order: Logical left-to-right, top-to-bottom
├─ Skip links: "Skip to content"
├─ Sidebar: Can navigate with arrow keys
└─ Search: Accessible keyboard shortcut (Cmd+K or Ctrl+K)

Screen Reader Support
├─ Semantic HTML: <nav>, <main>, <article>, <footer>
├─ ARIA labels on all icons
├─ Form labels associated with inputs
├─ List markup for navigation items
├─ Alt text on all images
└─ Table headers marked with <th>

Motion & Animations
├─ Respect prefers-reduced-motion
├─ Provide text alternatives for animated content
├─ No auto-playing content
└─ Motion defaults to 0s if reduced-motion enabled
```

---

## Performance Budgets

### Page Load Targets

```
First Contentful Paint (FCP)    < 1.5s
Largest Contentful Paint (LCP)  < 2.5s
Cumulative Layout Shift (CLS)   < 0.1
Time to Interactive (TTI)       < 3.5s
```

### Asset Budgets

```
JavaScript       < 150 KB (gzipped)
CSS             < 40 KB (gzipped)
Images          < 200 KB (combined, optimized)
Fonts           < 50 KB (system fonts preferred)
```

### Optimization Techniques

```
Images
├─ Format:       WebP with PNG fallback
├─ Sizes:        Responsive srcset
├─ Lazy load:    IntersectionObserver
└─ Compression:  < 100KB per image

Code Splitting
├─ Route-based:  Split at page level
├─ Component:    Split large components
├─ Vendor:       Separate bundles
└─ Async:        Dynamic imports for heavy features

Caching
├─ Static:       1 year (immutable, hashed filenames)
├─ Dynamic:      1 hour (pages, API responses)
├─ Browser:      Service workers for offline access
└─ CDN:          CloudFlare (fast edge caching)
```

---

## Dark Mode & Theme

### Implementation

```
Default:        Dark theme (matches VLN brand)
Toggle:         Available in footer/settings
Storage:        localStorage (user preference)
System:         Respects prefers-color-scheme
Fallback:       Dark if no preference set

Light Mode (Future)
├─ Background:  #ffffff (white)
├─ Text:        #000000 (black)
├─ Accents:     Same (Sage Green, Sky Blue, etc.)
└─ Borders:     rgba(0, 0, 0, 0.1) - light opacity
```

---

## Content Guidelines

### Tone & Voice

- **Professional** - Expert, authoritative, trustworthy
- **Clear** - Jargon explained, no unnecessary complexity
- **Concise** - Short paragraphs, bullet points where possible
- **Helpful** - Anticipate questions, provide examples
- **Web3-Native** - Understand blockchain concepts

### Page Template

```
1. Breadcrumbs (navigation context)
2. Page Title + Icon
3. Tagline (optional)
4. Last Updated + Read Time
5. Table of Contents (for long docs)
6. Introduction (1-2 paragraphs)
7. Main Content (organized with H2/H3)
8. Code Examples (where applicable)
9. Callout Boxes (tips, warnings)
10. Related Resources (links to other docs)
11. FAQ Section (common questions)
12. Contact/Support Info
```

---

## Next Steps

### Phase 1: Build Foundation
- [ ] Create docs app route (`/docs`)
- [ ] Build sidebar navigation component
- [ ] Implement TOC component
- [ ] Create callout/admonition components
- [ ] Set up responsive layout

### Phase 2: Create Content Templates
- [ ] Article template with all components
- [ ] Code block with syntax highlighting
- [ ] Search functionality (Cmd+K)
- [ ] Breadcrumb navigation

### Phase 3: Implement & Test
- [ ] Build first 5 docs pages
- [ ] Accessibility audit (WCAG AAA)
- [ ] Performance testing (Lighthouse > 90)
- [ ] Mobile responsive testing

### Phase 4: Polish & Deploy
- [ ] Design review with brand team
- [ ] User testing with developers
- [ ] Deploy to `/docs` route
- [ ] Monitor analytics & feedback

---

**Version:** 1.0 Final
**Status:** Ready for Implementation
**Last Updated:** February 24, 2026
**Author:** VLN Design Team

