---
title: "Tool Card Component"
description: "Clickable card component for displaying individual tools with status and interactivity"
---

# Tool Card Component

The Tool Card is the fundamental building block for displaying tools in the Skill-MCP platform. Each card represents a single tool with its icon, name, description, and current status.

## Component Overview

The Tool Card is designed to be visually distinctive while maintaining consistency across the platform. It provides immediate visual feedback and is optimized for both desktop and mobile interactions.

## Specifications

### Dimensions
- **Width:** 320px (responsive, scales down to 100% on mobile)
- **Height:** 200px
- **Border Radius:** 12px
- **Padding:** 16px
- **Gap between cards:** 16px

### Visual Properties
- **Background:** #1a1a1a (surface-secondary)
- **Border:** 1px solid #2a2a2a
- **Default Shadow:** 0 2px 8px rgba(0, 0, 0, 0.3)
- **Hover Shadow:** 0 4px 16px rgba(0, 0, 0, 0.4)
- **Focus Outline:** 2px solid #a6c3a7

## Component States

### 1. Default State
The standard appearance when no interaction is occurring.

```
┌─────────────────────────────┐
│ [Icon] Tool Name      [●]   │  
│                             │  
│ Description text that can   │  
│ span multiple lines with    │  
│ proper text wrapping        │  
│                             │  
│ [View Details →]           │  
└─────────────────────────────┘
```

- **Icon:** 24px, colored per category
- **Title:** 20px, 700 weight, text-white
- **Status Dot:** 8px diameter, colored per status
- **Description:** 14px, text-vln-bluegray, max 2 lines
- **Action Link:** "View Details →" in sage color

### 2. Hover State
Activated when user hovers over the card (desktop).

- **Scale:** 1.02 (slight enlargement)
- **Shadow:** Increases to 0 4px 16px
- **Border:** Changes to 1px solid #a6c3a7 (sage)
- **Action Link:** Bold, slightly brighter
- **Transition:** 150ms ease-out

### 3. Focus State
Activated when card receives keyboard focus.

- **Outline:** 2px solid #a6c3a7
- **Outline Offset:** 2px
- **Shadow:** Increases to 0 4px 16px

### 4. Active State
When card is selected or opened.

- **Background:** #252525 (darker)
- **Border:** 2px solid #a6c3a7
- **Shadow:** 0 8px 24px rgba(166, 195, 167, 0.15)
- **Status Indicator:** More prominent

### 5. Disabled State
When tool is unavailable or disabled.

- **Opacity:** 0.6
- **Cursor:** not-allowed
- **Border Color:** #555555
- **Text Color:** #777777
- **Pointer Events:** None

## Status Indicators

The colored dot in the top-right corner indicates tool status:

### Status Colors

| Status | Color | Meaning |
|--------|-------|---------|
| Ready | #a6c3a7 (Sage) | Tool is ready to use |
| Running | #4ecdc4 (Teal) | Tool is currently executing |
| Error | #ff6b6b (Red) | Tool encountered an error |
| Disabled | #555555 (Gray) | Tool is unavailable |
| Warning | #ffd93d (Yellow) | Tool needs attention |

### Status Dot Animation

- **Ready State:** Static dot
- **Running State:** Pulsing animation (1000ms, ease-in-out)
- **Error State:** Slow pulse with red glow
- **Disabled State:** No animation, reduced opacity

```css
@keyframes statusPulse {
  0% { opacity: 1; box-shadow: 0 0 0 0 rgba(166, 195, 167, 0.7); }
  50% { box-shadow: 0 0 0 8px rgba(166, 195, 167, 0); }
  100% { opacity: 1; box-shadow: 0 0 0 0 rgba(166, 195, 167, 0); }
}
```

## Category Color Coding

The card border and icon are colored based on tool category:

```
Security Tools:     #ff6b6b (red)
Analysis Tools:     #4ecdc4 (teal)
Automation Tools:   #95e1d3 (mint)
Integration Tools:  #f8b195 (orange)
Monitoring Tools:   #a6c3a7 (sage)
```

The category color is used for:
- Icon color (24px)
- Border on hover
- Status indicator background

## Layout Structure

```
┌─────────────────────────────────────┐
│  [16px padding]                     │
│                                     │
│  [Icon] Title          [Status Dot] │ [44px height header]
│  24px   20px/700       8px diameter │
│                                     │
│  [16px vertical space]              │
│                                     │
│  Description text goes here         │ [3 lines max]
│  spanning multiple lines with       │
│  proper wrapping and ellipsis       │
│                                     │
│  [16px vertical space]              │
│                                     │
│  [View Details →]                   │ [44px height action]
│  sage color, 14px/500               │
│                                     │
│  [16px padding]                     │
└─────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (1024px+)
- **Width:** 320px fixed
- **Height:** 200px fixed
- **Hover effects:** Full scale and shadow animations
- **Spacing:** 16px gaps

### Tablet (640px - 1024px)
- **Width:** 100% of 2-column layout
- **Height:** Scales proportionally
- **Hover effects:** Subtle shadow increase (touch-friendly)
- **Spacing:** 16px gaps

### Mobile (< 640px)
- **Width:** 100% of container
- **Height:** Auto (slightly taller for touch)
- **Hover effects:** None (touch interactions only)
- **Padding:** 16px top/bottom for touch targets
- **Spacing:** 12px gaps (reduced)

## Accessibility

### Keyboard Navigation
```
Tab:    Move focus to next card
Shift+Tab: Move focus to previous card
Enter:  Open tool details
Space:  Open tool details (alternative)
Escape: Close details if modal
```

### Screen Reader Support
```jsx
<div
  role="button"
  aria-label="Security Scanner tool, ready status"
  aria-describedby="tool-description"
  tabIndex={0}
  onClick={handleOpen}
/>
```

### Focus Indicators
- **Outline:** 2px solid #a6c3a7
- **Outline Offset:** 2px
- **Always visible:** Yes
- **High contrast:** 4.5:1 ratio maintained

## Interactive Examples

### Basic Tool Card

```jsx
<ToolCard
  id="security-scanner"
  name="Security Scanner"
  category="security"
  description="Automated security vulnerability scanning and reporting"
  icon={<SecurityIcon />}
  status="ready"
  onClick={() => openTool('security-scanner')}
/>
```

### Tool Card - Running

```jsx
<ToolCard
  id="github-sync"
  name="GitHub PR Sync"
  category="integration"
  description="Synchronize PR data from GitHub to internal systems"
  icon={<GithubIcon />}
  status="running"
  onClick={() => openTool('github-sync')}
/>
```

### Tool Card - Error

```jsx
<ToolCard
  id="docker-build"
  name="Docker Build"
  category="automation"
  description="Build and push Docker images to registry"
  icon={<DockerIcon />}
  status="error"
  errorMessage="Connection timeout"
  onClick={() => openTool('docker-build')}
/>
```

### Tool Card - Disabled

```jsx
<ToolCard
  id="datadog-monitor"
  name="Datadog Monitor"
  category="monitoring"
  description="Real-time monitoring and alerting"
  icon={<MonitoringIcon />}
  status="disabled"
  disabledReason="Coming in 2.0"
  onClick={() => {}}
/>
```

## Animation Timing

```css
/* Hover/Focus transition */
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Shadow animation */
transition: box-shadow 150ms ease-out;

/* Scale animation */
transition: transform 150ms ease-out;

/* Color animation */
transition: border-color 150ms ease-out, color 150ms ease-out;
```

## Spacing Grid

- **Internal Padding:** 16px
- **Icon Size:** 24px
- **Title Space Below Icon:** 8px
- **Description Space Below Title:** 16px
- **Footer Space Above Action:** 8px
- **Action Link Height:** 20px (including padding)

## Component Properties

### TypeScript Interface

```typescript
interface ToolCardProps {
  id: string;
  name: string;
  category: 'security' | 'analysis' | 'automation' | 'integration' | 'monitoring';
  description: string;
  icon: React.ReactNode;
  status: 'ready' | 'running' | 'error' | 'disabled' | 'warning';
  errorMessage?: string;
  disabledReason?: string;
  onClick: () => void;
  onHover?: (hovered: boolean) => void;
  selected?: boolean;
  testId?: string;
}
```

## Best Practices

### Do's
- ✅ Use consistent category colors
- ✅ Keep descriptions concise (2 lines max)
- ✅ Show status with animated dots
- ✅ Provide keyboard navigation
- ✅ Maintain 44px minimum touch target
- ✅ Use descriptive tool names

### Don'ts
- ❌ Truncate descriptions without ellipsis
- ❌ Remove focus indicators
- ❌ Use color alone for status (add icon/text)
- ❌ Disable hover on mobile
- ❌ Make touch targets smaller than 44px
- ❌ Nest interactive elements

## Design Tokens

```css
/* Tool Card Tokens */
--tool-card-width: 320px;
--tool-card-height: 200px;
--tool-card-padding: 16px;
--tool-card-border-radius: 12px;
--tool-card-border: 1px solid #2a2a2a;
--tool-card-background: #1a1a1a;
--tool-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
--tool-card-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.4);
--tool-card-focus-outline: 2px solid #a6c3a7;
--tool-card-transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Status Indicators */
--status-ready: #a6c3a7;
--status-running: #4ecdc4;
--status-error: #ff6b6b;
--status-disabled: #555555;
--status-warning: #ffd93d;
--status-dot-size: 8px;
```

## Testing Checklist

- [ ] Component renders without errors
- [ ] All status states display correctly
- [ ] Hover animations smooth and responsive
- [ ] Focus outline always visible
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Mobile touch targets sized correctly (44px)
- [ ] Category colors applied correctly
- [ ] Status dot animations smooth
- [ ] Description truncates properly
- [ ] Accessibility audit passes (axe-core)
- [ ] Screen reader announces status
- [ ] Contrast ratios meet WCAG AA
- [ ] Responsive layout at all breakpoints

---

**Component Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
