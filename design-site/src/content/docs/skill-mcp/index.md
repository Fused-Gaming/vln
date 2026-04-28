---
title: Skill-MCP Tools Design System
description: Skill-MCP - Tool Interface System, Agent Patterns, and Integration Guidelines
---

> Model Context Protocol Tools & Agent Interface Design System

**Last Updated:** April 2026
**Version:** 1.0
**Status:** Active

---

## Skill-MCP Overview

Skill-MCP is VLN's Model Context Protocol (MCP) integration framework providing specialized security tools, analysis agents, and integration patterns. The design system covers tool cards, agent interfaces, skill hierarchies, execution panels, and integration workflows.

## Design Philosophy

1. **Agent-First UX** — Tools designed for AI/LLM consumption and human oversight
2. **Composability** — Skills chain together, each tool is composable
3. **Transparency** — Clear inputs, outputs, side effects, and execution state
4. **Audit Trail** — Every operation logged and reviewable
5. **Safety Gates** — Permission models, rate limits, rollback capabilities

---

## Color Palette

### Tool Categories

| Category | Token | Hex | Usage |
|----------|-------|-----|-------|
| **Analysis** | `--skill-analysis` | `#60a5fa` | Static analysis tools (blue) |
| **Execution** | `--skill-exec` | `#f97316` | Command execution tools (orange) |
| **Data Ops** | `--skill-data` | `#8b5cf6` | Data manipulation tools (purple) |
| **Network** | `--skill-network` | `#10b981` | Network/API tools (emerald) |
| **Security** | `--skill-security` | `#ef4444` | Security-sensitive tools (red) |

### Status Indicators

| State | Token | Hex | Usage |
|-------|-------|-----|-------|
| **Ready** | `--skill-ready` | `#4ade80` | Tool available, permissions granted |
| **Pending** | `--skill-pending` | `#fbbf24` | Awaiting approval, permission check |
| **Running** | `--skill-running` | `#06b6d4` | Actively executing |
| **Error** | `--skill-error` | `#ef4444` | Execution failed, error state |
| **Rate Limited** | `--skill-limited` | `#f97316` | Quota exceeded, wait required |

### VLN Integration

| Element | Token | Hex | Usage |
|---------|-------|-----|-------|
| **Primary Accent** | `--vln-sage` | `#a6c3a7` | Links, completion status |
| **Secondary** | `--vln-bluegray` | `#aab7c8` | Metadata, muted text |

---

## Component Library

### Skill Card

**Purpose:** Browsable skill listing with quick access

**Fields:**
- Skill icon/category color band
- Skill name
- Brief description (1-2 lines)
- Category badge
- Permission status indicator
- Quick action button ("Use", "Setup", "View Docs")

**States:**
- Available (full color)
- Locked (grayed, permission required)
- Rate limited (amber warning)
- Error (red, broken/unavailable)

**Interactions:**
- Hover: Expand to show full description
- Click: Open skill details panel
- Context menu: Quick actions

### Skill Category Panel

**Purpose:** Group related skills by function

**Layout:**
- Category header with icon
- Count of available/locked tools
- Grid of skill cards (3-4 columns on desktop)
- "View All" or "Browse Docs" link

**Categories:**
1. **Code Analysis** — AST, SAST, linting
2. **Smart Contracts** — Solidity analysis, bytecode inspection
3. **Data Processing** — JSON, CSV, ETL operations
4. **Security Scanning** — Vulnerability detection
5. **Network Tools** — API calls, webhooks, DNS
6. **Cryptography** — Hashing, signing, encryption
7. **Reporting** — Document generation, exports

### Tool Input Panel

**Purpose:** Collect parameters for skill execution

**Elements:**
- Input fields (text, textarea, file upload, select, toggle)
- Field validation indicators (live feedback)
- Help text / documentation links
- Example inputs / quick templates
- "Execute", "Save Template", "Cancel" buttons

**Input Types:**
- **Text:** Single line input (API key, URL, path)
- **Textarea:** Multi-line (code snippets, JSON)
- **File Upload:** Binary, text, archives
- **Select:** Dropdown with predefined options
- **Multi-Select:** Checkboxes for multiple items
- **Toggle/Checkbox:** Boolean flags
- **Date/Time:** Calendar picker, duration selector

### Execution Monitor

**Purpose:** Show real-time execution progress

**Sections:**
- Status indicator (spinning icon if running)
- Elapsed time
- Operation description (current step)
- Progress bar (if deterministic)
- Cancel / Stop button
- Log stream (compact view)

**Log Entries:**
- Timestamp (optional, dense mode)
- Level badge (INFO, WARN, ERROR)
- Message text
- Collapsible details/stack traces

### Results Panel

**Purpose:** Display tool execution output

**Layouts:**
1. **Structured Data** — JSON, table, tree view
2. **Code Output** — Syntax highlighted, copyable
3. **Markdown** — Rendered documentation
4. **Raw Text** — Monospace log output
5. **File** — Download links, preview tabs

**Features:**
- Copy to clipboard button
- Export as JSON / CSV / Markdown
- Refresh / re-run button
- Share result (generate link)
- Open in new tab

### Permission Gate

**Purpose:** Display permission requirements before execution

**States:**
- **Granted:** Green checkmark, proceed button
- **Pending Review:** Yellow indicator, "Request Permission" button
- **Denied:** Red, "Why?" link to policy docs
- **Setup Required:** Orange, "Configure" link

**Content:**
- Required scopes/permissions list
- Requested by user/agent
- Risk level indicator (low/medium/high)
- Resource limits (rate limit, timeout)

### Integration Widget

**Purpose:** Show how skills integrate with other services

**Elements:**
- Input connector (from previous skill)
- Output connector (to next skill)
- Passthrough mode indicator
- Chaining rules (what transforms allowed)
- Parameter mapping interface

**Visual:**
- Bezier curve connectors
- Expand/collapse section
- Drag-to-reorder in chains
- Add skill button between items

### Rate Limit Indicator

**Purpose:** Show usage quota status

**Display:**
- Remaining calls / period
- Progress bar (X of Y)
- Time until reset
- Upgrade option (if applicable)

**Colors:**
- Green: >75% available
- Yellow: 25-75% available
- Orange: 10-25% available
- Red: <10% available

### Error Boundary

**Purpose:** Display and handle tool errors

**Elements:**
- Error icon (category-colored)
- Error message (user-friendly)
- Technical details (toggleable)
- Logs/Stack trace (code block)
- Retry / Report issue buttons
- Docs link for common errors

---

## Typography System

| Usage | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| **Category Header** | Inter | 20-24px | Bold 700 | 1.2 |
| **Skill Title** | Inter | 16-18px | SemiBold 600 | 1.3 |
| **Description** | Inter | 14px | Regular 400 | 1.5 |
| **Input Label** | Inter | 12-14px | Medium 500 | 1.4 |
| **Log/Output** | JetBrains Mono | 12px | Regular 400 | 1.6 |
| **Status Text** | Inter | 12px | Medium 500 | 1.4 |

---

## Spacing & Layout

### Card Grid
- **Desktop:** 4 columns (280px cards) + gutters
- **Tablet:** 2-3 columns, responsive gutters
- **Mobile:** 1-2 columns, full width with padding
- **Gutter:** 16px (mobile), 20px (tablet), 24px (desktop)

### Input Layout
- **Label to Input:** 8px vertical
- **Input Height:** 40px (base), 56px (file upload), auto (textarea)
- **Field Gap:** 16px between fields
- **Section Gap:** 24px between sections

### Execution Panel
- **Header Height:** 56px
- **Log Line Height:** 28px
- **Max Height:** 400px (scrollable), 100vh (expanded)
- **Padding:** 16px

### Touch Targets
- **Buttons:** 44x44px minimum
- **Clickable Rows:** 48px height
- **Checkboxes:** 20x20px (target area 44x44px)

---

## Animations

### Skill Reveal
- Duration: 250ms
- Easing: ease-out
- Effect: Slide in from left + fade

### Status Transition
- Duration: 200ms
- Easing: ease-in-out
- Effect: Color change + icon spin (if rotating)

### Log Append
- Duration: 150ms
- Easing: ease-in-out
- Effect: Slide in from top, auto-scroll container

### Progress Update
- Duration: 300ms
- Easing: ease-out
- Effect: Bar fill, number count-up animation

### Error Shake
- Duration: 400ms
- Easing: ease-in-out
- Effect: Horizontal shake (5-10px each direction)

---

## Accessibility

### Keyboard Navigation
- Tab through skills, inputs, buttons
- Arrow keys in lists and dropdowns
- Enter/Space to activate buttons
- Escape to close panels/modals
- Alt+U to focus input panel (quick key)

### Screen Reader
- ARIA labels on all buttons and icons
- Live regions for status updates
- Form input associated with labels
- Error messages linked to inputs
- Role="status" for notifications

### Color & Contrast
- Category colors only supplementary (labels also used)
- Text on colored backgrounds: WCAG AA (4.5:1)
- Icon + text for all states
- High contrast mode supported

### Focus Management
- Visible focus indicators on all interactive elements
- Focus trap in modals
- Auto-focus first input in dialogs
- Focus restore on close

---

## Integration Patterns

### Skill Chaining

Chain multiple skills together:

```
Input → [Analysis Tool] → Output
                           ↓
                      → [Transform]
                           ↓
                      → [Output Tool] → Result
```

**UI Elements:**
- Skill connector lines
- Output type matching (input validation)
- Parameter pass-through fields
- Execution order indicators

### Approval Workflow

For high-risk tools:

```
User → Request → Review Queue → Approved → Execute → Log
         (Agent)     (Human)      (Auto)    (Async)   (Live)
```

**UI:**
- Permission request modal
- Reviewer queue badge
- Execution scheduled notification
- Completion notification

### Template System

Save and reuse skill configurations:

- Named templates (user-created)
- Quick templates (pre-built examples)
- Parameters with defaults
- Share/export templates

---

## Security Considerations

### Input Validation
- Character limits enforced client-side
- Type validation (URLs, IPs, etc.)
- Regex patterns for sensitive inputs
- File type/size restrictions

### Output Sanitization
- Code syntax highlighting without injection risk
- Markdown rendering in safe mode
- File downloads with MIME type checks
- API key masking in logs

### Audit Logging
- Every execution logged with:
  - User/agent identifier
  - Skill name and parameters
  - Execution time (start, duration)
  - Result status (success/fail)
  - Output summary

### Rate Limiting
- Per-skill, per-user quotas
- Graceful degradation (queue vs reject)
- User notification of limits
- Enterprise tier upgrade options

---

## Responsive Breakpoints

| Device | Width | Cards/Row | Input Width | Log Font |
|--------|-------|-----------|-------------|----------|
| **Mobile** | 320-480px | 1 | Full width | 11px |
| **Tablet** | 481-1024px | 2-3 | Full width | 12px |
| **Desktop** | 1025px+ | 4 | 400px max | 12px |

---

## Implementation Guidelines

### Component Library
- Reusable card component with variant props
- Input component factory (type-specific)
- Log stream with virtual scrolling
- Connector/flow diagram library

### State Management
- Tool registry (available skills)
- Execution queue (pending/running)
- Permission cache (granted scopes)
- Template store (saved configurations)

### API Integration
- Skill metadata endpoint
- Execution async API
- Streaming log endpoint (SSE or WebSocket)
- Permission check endpoint

### Testing
- Unit: Input validation, error handling
- Integration: Skill chaining, permission flows
- E2E: Full execution workflows
- Security: Input injection, output sanitization

---

## Related Documentation

- [VLN Design Tokens](/tokens/colors)
- [VLN Accessibility Guidelines](/responsive/accessibility)
- [VLN Brand System](/branding/logo)

---

## Changelog

### v1.0 — April 2026
- Initial Skill-MCP design system
- 15+ component specifications
- Tool category colors and status indicators
- Integration pattern documentation
- Permission and approval workflows
- Template system guidelines
- Accessibility and security guidelines
