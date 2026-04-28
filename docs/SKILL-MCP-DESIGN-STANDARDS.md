# Skill-MCP Tools Design Standards

Complete design system and standards for Skill-MCP integration tools and widgets.

---

## 🎯 Design Philosophy

### 1. **Tool Discoverability**
Each tool should be immediately identifiable and accessible:
- Clear naming and descriptions
- Visual icons and color coding
- Organized by category and function
- Search and filter capabilities

### 2. **Consistent Integration**
All tools follow unified patterns:
- Standardized component interfaces
- Consistent control layouts
- Predictable state management
- Unified error handling

### 3. **Power User Friendly**
Support both casual and advanced usage:
- Simple, intuitive defaults
- Advanced configuration options
- Keyboard shortcuts
- Batch operations support

### 4. **Real-Time Feedback**
Immediate visual response to all interactions:
- Tool status indicators
- Progress displays
- Error messages with solutions
- Success confirmations

---

## 🎨 Color Palette

### Primary Colors
```css
/* VLN Core */
--vln-charcoal: #0f0f0f;     /* Background */
--vln-sage: #a6c3a7;          /* Primary accent */
--vln-bluegray: #aab7c8;       /* Secondary accent */

/* Tool Categories */
--tool-security: #ff6b6b;      /* Security tools (red) */
--tool-analysis: #4ecdc4;      /* Analysis tools (teal) */
--tool-automation: #95e1d3;    /* Automation tools (mint) */
--tool-integration: #f8b195;   /* Integration tools (orange) */
--tool-monitoring: #a6c3a7;    /* Monitoring tools (sage) */
```

### Status Colors
```css
--status-active: #a6c3a7;      /* Tool active */
--status-idle: #555555;        /* Tool idle */
--status-error: #ff6b6b;       /* Tool error */
--status-warning: #ffd93d;     /* Tool warning */
--status-success: #a6c3a7;     /* Operation success */
```

---

## 📐 Typography

### Font System
```
Primary: Inter (sans-serif)
- Headlines: 700 weight
- Body: 400 weight
- Controls: 500 weight

Monospace: JetBrains Mono
- Tool names, IDs, values, code
```

### Type Scale
```
Tool Title: 20px / 700 / 1.2
Description: 14px / 400 / 1.5
Control Label: 14px / 500 / 1.4
Control Value: 13px / 400 / 1.4 (monospace)
Status Text: 12px / 400 / 1.3
```

---

## 🎮 Component Library

### 1. **Tool Card**
```tsx
<ToolCard
  id="security-scanner"
  name="Security Scanner"
  category="security"
  description="Automated security vulnerability scanning"
  icon={<SecurityIcon />}
  status="ready"    // "ready", "running", "error", "disabled"
  onClick={handler}
/>
```

**Design Specifications:**
- Size: 320px width, 200px height (responsive)
- Background: surface-secondary (#1a1a1a)
- Border: 1px solid #2a2a2a
- Border radius: 12px
- Padding: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.3)
- Hover: shadow increase, scale 1.02

**Layout:**
```
┌─────────────────────────────┐
│ [Icon] Tool Name      [•]   │  (• = status dot)
│                             │
│ Description text that can   │
│ span multiple lines with    │
│ proper text wrapping        │
│                             │
│ [View Details →]           │
└─────────────────────────────┘
```

### 2. **Control Panel**
```tsx
<ControlPanel
  tool={toolConfig}
  controls={[
    { type: "toggle", label: "Enable", key: "enabled" },
    { type: "select", label: "Mode", key: "mode", options: [...] },
    { type: "input", label: "Threads", key: "threads" }
  ]}
  onUpdate={handler}
/>
```

**Design Specifications:**
- Width: 100% (responsive)
- Background: surface-secondary (#1a1a1a)
- Border radius: 8px
- Padding: 16px
- Spacing between controls: 16px

**Control Types:**
```
Toggle Switch:    ○──●  (20px height, smooth animation)
Select Dropdown:  [Option ▼]  (44px height minimum)
Text Input:       [Input field]  (44px height, monospace font)
Slider:           ━━━●━━━  (smooth drag, tooltips)
Checkbox Group:   [☑] Option A  [☐] Option B
Radio Buttons:    [●] Option A  [○] Option B
```

### 3. **Status Display**
```tsx
<StatusDisplay
  tool={toolName}
  status="running"    // "idle", "running", "error", "success"
  progress={45}       // 0-100
  message="Scanning..."
/>
```

**Design Specifications:**
```
┌─────────────────────────────┐
│ Tool: Security Scanner      │
│ Status: ● Running           │
│ Progress: [████░░░░░] 45%  │
│ Message: Scanning files...  │
└─────────────────────────────┘
```

- Status dot: 8px diameter, animated pulse for running
- Progress bar: Height 4px, rounded ends
- Message: 12px text, secondary color
- Animation: Smooth transitions (150-200ms)

### 4. **Integration Widget**
```tsx
<IntegrationWidget
  sourceTool="analyzer"
  targetTool="reporter"
  dataFlow="analysis-results"
  status="connected"
/>
```

**Design Specifications:**
```
┌──────────────┐       ┌──────────────┐
│  Analyzer    │  ───→ │   Reporter   │
│    Tool      │       │     Tool     │
└──────────────┘       └──────────────┘
  Source Tool         Target Tool
      ↓ Analysis Results ↓
  Status: Connected / Flow Active
```

- Tool boxes: 120px × 80px, rounded corners
- Connection line: 2px, animated flow indicator
- Data label: below connection line, 12px text
- Status indicator: color-coded dot + text

### 5. **Tool Dashboard**
```tsx
<ToolDashboard
  tools={[tool1, tool2, tool3]}
  view="grid"    // "grid", "list", "kanban"
  filters={activeFilters}
/>
```

**Grid View:**
- 3 columns on desktop (1024px+)
- 2 columns on tablet (768px)
- 1 column on mobile (< 768px)
- Gap: 16px between cards
- Responsive scaling

**List View:**
```
┌─────────────────────────────────────────┐
│ [Icon] Tool Name    Ready  [⋮]         │
│       Description text spanning...      │
├─────────────────────────────────────────┤
│ [Icon] Another Tool Error  [⋮]         │
│       Description text spanning...      │
└─────────────────────────────────────────┘
```

**Kanban View:**
```
┌─────────────┬─────────────┬─────────────┐
│   Ready     │   Running   │   Error     │
├─────────────┼─────────────┼─────────────┤
│ ┌─────────┐ │ ┌─────────┐ │ ┌─────────┐ │
│ │ Tool 1  │ │ │ Tool 3  │ │ │ Tool 5  │ │
│ └─────────┘ │ └─────────┘ │ └─────────┘ │
│ ┌─────────┐ │             │             │
│ │ Tool 2  │ │             │             │
│ └─────────┘ │             │             │
└─────────────┴─────────────┴─────────────┘
```

---

## ✨ Animation Standards

### Micro-Interactions
```
Tool Card Hover:     Scale 1.02, shadow increase (150ms ease-out)
Control Change:      Smooth transition (200ms ease-in-out)
Status Update:       Fade transition (300ms ease-out)
Progress Animation:  Smooth fill (variable speed)
Status Dot Pulse:    1000ms repeat (ease-in-out)
```

### Transitions
```
Tool Addition:       Slide in + fade (400ms ease-out)
Tool Removal:        Slide out + fade (300ms ease-in)
Modal Entrance:      Scale + fade (300ms ease-out)
Data Loading:        Skeleton screens + fade (200ms)
```

---

## 🔗 Interaction Patterns

### Tool Selection
```
1. User clicks tool card
2. Card highlights (outline or shadow change)
3. Control panel slides in from right (250ms)
4. Controls populate with current settings
5. User can modify and save
```

### Workflow Integration
```
1. Select source tool (A)
2. Select target tool (B)
3. Connection line appears (animated)
4. Configuration options for data flow
5. Activate connection (confirms with animation)
6. Data flows from A → B (visual indicator)
```

### Error Recovery
```
1. Tool error occurs
2. Status changes to error (red)
3. Error message appears with solution
4. Retry button prominently displayed
5. On retry, status shows "recovering"
6. Returns to ready on success
```

---

## 📏 Layout Grid

### Desktop Layout (1024px+)
```
+───────────────────────────────────────+
│ [Filters] [Search]        [Add Tool] │
+───────────────────────────────────────+
│ Tool Card  │ Tool Card  │ Tool Card  │
├────────────┼────────────┼────────────┤
│ Tool Card  │ Tool Card  │ Tool Card  │
├────────────┼────────────┼────────────┤
│ Tool Card  │ Tool Card  │ Tool Card  │
└───────────────────────────────────────┘
```

### Mobile Layout (< 768px)
```
+─────────────────────────+
│ [Menu] [Search] [Add]   │
+─────────────────────────+
│     Tool Card           │
├─────────────────────────┤
│     Tool Card           │
├─────────────────────────┤
│     Tool Card           │
└─────────────────────────+
```

---

## 📐 Spacing System

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
```

**Application:**
- Tool cards: 16px padding, 16px gap
- Control panels: 16px padding, 16px control spacing
- Sections: 24px-32px margin
- Mobile: 16px padding

---

## 🎨 Category Color Coding

```
Security Tools:     #ff6b6b (red)      [Security icon]
Analysis Tools:     #4ecdc4 (teal)     [Analytics icon]
Automation Tools:   #95e1d3 (mint)     [Automation icon]
Integration Tools:  #f8b195 (orange)   [Integration icon]
Monitoring Tools:   #a6c3a7 (sage)     [Monitoring icon]
```

Each category has:
- Primary color (card border/icon)
- Secondary color (lighter shade for backgrounds)
- Associated icon
- Consistent naming convention

---

## ♿ Accessibility Standards

### WCAG AA Compliance

**Keyboard Navigation:**
- Tab through tool cards
- Enter to open tool
- Escape to close panels
- Arrow keys to navigate lists
- Visible focus indicators (outline)

**Screen Reader Support:**
- Semantic HTML structure
- aria-label for icons
- aria-live for status updates
- Form labels properly associated
- List markup for tool collections

**Visual Accessibility:**
- Color contrast: 4.5:1 minimum
- Focus indicators: always visible
- Text sizing: 14px minimum
- Touch targets: 44px minimum
- No color-only communication

---

## 🧪 Testing Specifications

### Responsive Testing
```
Mobile:    375px (iPhone SE)
Tablet:    768px (iPad)
Desktop:   1024px, 1440px (laptops)
Wide:      1920px (large monitors)
```

### Interaction Testing
```
- Tool card click response (< 100ms)
- Control panel slide animation (smooth)
- Data flow visualization (continuous)
- Status updates (immediate feedback)
- Error recovery flows
```

### Accessibility Testing
```
- axe-core scan (WCAG AA)
- Keyboard navigation test
- Screen reader test
- Color contrast verification
- Focus indicator visibility
```

---

## 📋 Component Checklist

- [ ] Tool card component (clickable, state aware)
- [ ] Control panel (all control types)
- [ ] Status display (animated pulse)
- [ ] Integration widget (connection visualization)
- [ ] Tool dashboard (multiple views)
- [ ] Category color coding applied
- [ ] Animations and transitions smooth
- [ ] Keyboard navigation complete
- [ ] Screen reader support verified
- [ ] Mobile responsive layout
- [ ] Accessibility standards met
- [ ] Error states handled
- [ ] Loading states shown
- [ ] Touch targets sized correctly
- [ ] Color contrast verified

---

**Design System Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
