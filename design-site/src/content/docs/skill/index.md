---
title: "Skill-MCP Design System"
description: "Complete design system and component library for Skill-MCP tool integration platform"
---

# Skill-MCP Design System

Welcome to the complete design system for **skill.vln.gg** – the unified Model Context Protocol (MCP) platform for tool orchestration and integration.

## What is Skill-MCP?

Skill-MCP is a centralized platform that integrates 28+ DevOps, security, and data tools through a standardized Model Context Protocol interface. This design system provides all the components, patterns, and specifications needed to build and extend the platform.

## Design Philosophy

Our design is built on four core principles:

### 1. Tool Discoverability
Every tool is immediately identifiable with clear naming, visual icons, category-based organization, and powerful search/filter capabilities.

### 2. Consistent Integration
All tools follow unified patterns with standardized component interfaces, predictable state management, and consistent error handling.

### 3. Power User Friendly
Support both casual users and power developers with intuitive defaults, advanced configuration options, keyboard shortcuts, and batch operations.

### 4. Real-Time Feedback
Immediate visual response to all interactions with status indicators, progress displays, solution-focused error messages, and success confirmations.

## Color System

### Primary Brand Colors
- **Matte Charcoal** (#0f0f0f) – Background base
- **Sage Green** (#a6c3a7) – Primary accent
- **Warm Blue-Gray** (#aab7c8) – Secondary accent
- **Soft Glow White** – UI highlighting

### Tool Category Colors
Each tool category has a distinctive color for quick visual identification:

- **Security Tools** (#ff6b6b) – Red accent
- **Analysis Tools** (#4ecdc4) – Teal accent
- **Automation Tools** (#95e1d3) – Mint accent
- **Integration Tools** (#f8b195) – Orange accent
- **Monitoring Tools** (#a6c3a7) – Sage accent

### Status Colors
- **Active** (#a6c3a7) – Tool running normally
- **Idle** (#555555) – Waiting for input
- **Error** (#ff6b6b) – Something went wrong
- **Warning** (#ffd93d) – Caution needed
- **Success** (#a6c3a7) – Operation completed

## Typography

### Font Family
- **Primary:** Inter (sans-serif) for all UI text
- **Monospace:** JetBrains Mono for technical content, tool IDs, and code examples

### Type Scale
- **Tool Title:** 20px, 700 weight, 1.2 line height
- **Description:** 14px, 400 weight, 1.5 line height
- **Control Label:** 14px, 500 weight, 1.4 line height
- **Control Value:** 13px, 400 weight, 1.4 line height (monospace)
- **Status Text:** 12px, 400 weight, 1.3 line height

## Core Components

This design system includes five essential components:

### 1. **Tool Card**
Clickable card representing a single tool with icon, name, description, and status indicator.

- **Dimensions:** 320px width, 200px height (responsive)
- **Status:** Ready, Running, Error, Disabled
- **Interactions:** Hover scale (1.02), Click to open details

[View Component Details](/design/skill/components/tool-card)

### 2. **Control Panel**
Unified interface for configuring tool behavior with multiple control types.

- **Control Types:** Toggle switches, dropdowns, text inputs, sliders, checkboxes, radio buttons
- **Responsive:** Full width with 16px padding
- **Spacing:** 16px between controls

[View Component Details](/design/skill/components/control-panel)

### 3. **Status Display**
Real-time status indicator showing tool state, progress, and messages.

- **Status States:** Idle, Running, Error, Success
- **Progress Bar:** 0-100% with smooth animation
- **Animations:** Pulse effect for running state

[View Component Details](/design/skill/components/status-display)

### 4. **Integration Widget**
Visual representation of tool-to-tool data flows and connections.

- **Layout:** Source tool → Connection line → Target tool
- **Data Labels:** Shows data flowing through connection
- **Status:** Connected, Disconnected, Error states

[View Component Details](/design/skill/components/integration-widget)

### 5. **Tool Dashboard**
Multi-view display of all available tools with search and filtering.

- **Views:** Grid (3 columns), List, Kanban (by status)
- **Responsive:** Auto-adapts to screen size
- **Filtering:** By category, status, search term

[View Component Details](/design/skill/components/tool-dashboard)

## Interaction Patterns

### Pattern: Tool Selection
1. User clicks tool card
2. Card highlights with border/shadow change
3. Control panel slides in from right (250ms animation)
4. Controls populate with current tool settings
5. User modifies settings and saves

[View Full Pattern](/design/skill/patterns/tool-selection)

### Pattern: Workflow Integration
1. Select source tool
2. Select target tool
3. Connection line appears (animated)
4. Configure data flow options
5. Activate connection with confirmation animation
6. Watch data flow from source to target

[View Full Pattern](/design/skill/patterns/workflow-integration)

### Pattern: Error Recovery
1. Tool error occurs
2. Status changes to error (red)
3. Error message appears with solution
4. Retry button prominently displayed
5. Status shows "recovering" during retry
6. Returns to ready on success, or shows new error

[View Full Pattern](/design/skill/patterns/error-recovery)

## Animation Standards

All animations follow these timing and easing guidelines:

- **Tool Card Hover:** Scale 1.02, shadow increase (150ms ease-out)
- **Control Change:** Smooth transition (200ms ease-in-out)
- **Status Update:** Fade transition (300ms ease-out)
- **Progress Animation:** Smooth fill (variable speed)
- **Status Dot Pulse:** 1000ms repeat (ease-in-out)
- **Tool Addition:** Slide in + fade (400ms ease-out)
- **Tool Removal:** Slide out + fade (300ms ease-in)

## Spacing System

```css
--space-xs: 4px;      /* Micro spacing */
--space-sm: 8px;      /* Small spacing */
--space-md: 16px;     /* Medium spacing */
--space-lg: 24px;     /* Large spacing */
--space-xl: 32px;     /* Extra large spacing */
```

**Application:**
- Tool cards: 16px padding, 16px gap between cards
- Control panels: 16px padding, 16px between controls
- Sections: 24px-32px margin
- Mobile devices: Consistent 16px padding

## Responsive Design

### Breakpoints
- **Mobile:** < 640px (single column, 16px padding)
- **Tablet:** 640px - 1024px (2 columns, 16px gap)
- **Desktop:** 1024px - 1440px (3 columns, 16px gap)
- **Wide:** 1440px+ (3 columns, 24px gap)

## Accessibility

All components meet WCAG AA standards:

- **Keyboard Navigation:** Tab through tools, Enter to open, Escape to close
- **Screen Readers:** Semantic HTML, ARIA labels, live regions for updates
- **Focus Indicators:** Always visible with 2px outline
- **Color Contrast:** Minimum 4.5:1 ratio
- **Touch Targets:** Minimum 44px size
- **Text Sizing:** Minimum 14px for readability

[View Accessibility Guidelines](/design/skill/accessibility)

## Getting Started

### For Designers
1. Review the color system and typography
2. Explore each component with interactive examples
3. Study the interaction patterns
4. Use the design tokens in your design tool

### For Developers
1. Start with the component library
2. Review code examples and integration patterns
3. Study responsive breakpoints and spacing
4. Check accessibility requirements

[Browse All Components](/design/skill/components)

---

**Design System Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
