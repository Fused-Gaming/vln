---
title: Skill-MCP Component Library
description: Skill-MCP Tool Component Previews and Integration Examples
---

## Component Previews

This section showcases key components of the Skill-MCP tools interface design system.

### 1. Skill Card

A browsable card representing an available tool or skill.

```
╔════════════════════════════════╗
║ 📊 [Analysis]                  ║
║                                ║
║ AST Parser Tool                ║
║ Parse JavaScript/TypeScript    ║
║ code into Abstract Syntax Tree ║
║                                ║
║ Status: ✓ Ready                ║
║         [Use Tool]             ║
╚════════════════════════════════╝
```

**States:**
- **Available:** Full color, clickable, glow effect
- **Locked:** Grayed out, shows permission lock icon
- **Rate Limited:** Amber warning badge, "Quota Exceeded" label
- **Error:** Red background, error icon, "Unavailable" label

**Information:**
- Category badge with color (top-left)
- Tool name (large, bold)
- Description (1-2 lines)
- Status indicator with icon
- Action button ("Use", "Setup", "View Docs")

**Color Scheme:**
- Available: Full palette color
- Locked: 50% opacity + lock icon
- Error: #ef4444 with error icon
- Success: #4ade80 with checkmark

---

### 2. Skill Category Panel

Groups related skills by function.

```
┌─────────────────────────────────────┐
│ 📊 Code Analysis                [3/5]│
├─────────────────────────────────────┤
│
│ ┌──────────────┐ ┌──────────────┐   │
│ │ AST Parser   │ │ Linter       │   │
│ │ [Ready]      │ │ [Ready]      │   │
│ │ [Use Tool]   │ │ [Use Tool]   │   │
│ └──────────────┘ └──────────────┘   │
│
│ ┌──────────────┐ ┌──────────────┐   │
│ │ Type Checker │ │ Formatter    │   │
│ │ [Ready]      │ │ [Locked]     │   │
│ │ [Use Tool]   │ │ [Setup]      │   │
│ └──────────────┘ └──────────────┘   │
│
│ ┌──────────────┐                    │
│ │ Test Runner  │                    │
│ │ [Error]      │                    │
│ │ [Retry]      │                    │
│ └──────────────┘                    │
│
│ [View All →]                        │
└─────────────────────────────────────┘
```

**Layout:**
- Category header with icon + count (available/total)
- Grid of skill cards (3-4 columns on desktop, 2 on tablet, 1 on mobile)
- Optional "View All" link at bottom

**Responsive:**
- Desktop: 4 columns, 280px cards
- Tablet: 2-3 columns, flexible
- Mobile: 1-2 columns, full width

---

### 3. Tool Input Panel

Form interface for collecting tool parameters.

```
┌─────────────────────────────────────┐
│ AST Parser Tool                     │
├─────────────────────────────────────┤
│                                     │
│ Language *                          │
│ [Select] ▼                          │
│ TypeScript, JavaScript, Python      │
│                                     │
│ Code Input *                        │
│ ┌───────────────────────────────┐   │
│ │ function hello() {            │   │
│ │   console.log('world');       │   │
│ │ }                             │   │
│ └───────────────────────────────┘   │
│ Max 10MB                            │
│                                     │
│ ☑ Include Comments                  │
│                                     │
│ Example: [Load Example]             │
│                                     │
│         [Execute] [Clear] [Cancel]  │
└─────────────────────────────────────┘
```

**Input Types:**
- **Text Input:** Single line (40px height)
- **Textarea:** Multi-line (flexible height, min 100px)
- **File Upload:** Drag-drop or click (120px height)
- **Select:** Dropdown (40px height)
- **Multi-Select:** Checkboxes (28px per item)
- **Toggle:** Checkbox (20x20px, 44x44px touch target)
- **Date/Time:** Calendar picker (40px)

**Features:**
- Field labels with required indicator (*)
- Helper text / description below field
- Live validation feedback
- Example values in placeholder
- Error messages in red text
- Character count for constrained fields
- Quick template buttons

---

### 4. Execution Monitor

Real-time display of tool execution progress.

```
┌─────────────────────────────────────┐
│ ⏱️ AST Parser Tool | Elapsed: 0.34s │
├─────────────────────────────────────┤
│ Status: Parsing code (step 3 of 5)  │
│                                     │
│ Progress: ████████░░░░░░░░░░░░ 60%  │
│                                     │
│ [Cancel] [Minimize]                 │
├─────────────────────────────────────┤
│ Logs:                               │
│ 2026-04-28 14:23:45 [INFO]         │
│ Parsing TypeScript code...         │
│                                     │
│ 2026-04-28 14:23:45 [INFO]         │
│ Identified 12 functions            │
│                                     │
│ 2026-04-28 14:23:46 [WARN]         │
│ Deprecated syntax found            │
│                                     │
│ [⋮ More] [Copy All] [Download]     │
└─────────────────────────────────────┘
```

**Header Information:**
- Tool icon/name
- Elapsed time (live counter)
- Status message (current operation)
- Progress bar (if deterministic)

**Log Display:**
- Timestamp (optional, compact)
- Log level badge (INFO, WARN, ERROR)
- Message text
- Clickable for details/stack trace
- Color-coded by level:
  - INFO: Blue (#60a5fa)
  - WARN: Amber (#fbbf24)
  - ERROR: Red (#ef4444)

**Actions:**
- Cancel execution
- Minimize panel
- Copy logs to clipboard
- Download logs as file
- Refresh/retry after error

---

### 5. Results Panel

Display tool output in structured format.

```
Table Format:
┌─────────────────────────────────────┐
│ Results: AST Parser Output          │
├──────────────┬──────────────────────┤
│ Function     │ Type                 │
├──────────────┼──────────────────────┤
│ hello        │ Function Declaration │
│ world        │ Variable Declaration │
│ stringify    │ Function Expression  │
└──────────────┴──────────────────────┘

JSON Format:
{
  "functions": [
    { "name": "hello", "line": 1 },
    { "name": "world", "line": 3 }
  ],
  "variables": 12,
  "complexity": "medium"
}

[Copy] [Export as CSV] [Export as JSON] [Share]
```

**Supported Formats:**
- **Structured Data:** JSON, Table, Tree View
- **Code Output:** Syntax highlighted, copyable
- **Markdown:** Rendered documentation
- **Raw Text:** Monospace log output
- **File:** Download links with preview

**Features:**
- Format selector (tabs or dropdown)
- Copy to clipboard button
- Export options (CSV, JSON, Markdown, TXT)
- Share result (generates shareable link)
- Open in new tab
- Pagination for large datasets

---

### 6. Permission Gate

Display permission requirements before execution.

```
╔═════════════════════════════════════╗
║ ⚠️ Permission Required              ║
╠═════════════════════════════════════╣
║                                     ║
║ Tool: Shell Command Executor        ║
║ Requested by: User / Agent          ║
║ Risk Level: HIGH                    ║
║                                     ║
║ Required Permissions:               ║
║ ✓ system:execute:commands           ║
║ ✓ system:read:filesystem            ║
║ ✓ system:write:logs                 ║
║                                     ║
║ Resource Limits:                    ║
║ • Timeout: 30 seconds               ║
║ • Memory: 512MB                     ║
║ • Rate Limit: 10 calls/min          ║
║                                     ║
║ [Request Permission] [Deny] [Info] ║
╚═════════════════════════════════════╝
```

**States:**
- **Granted:** Green checkmark, "Proceed" button enabled
- **Pending:** Amber indicator, "Request Permission" button
- **Denied:** Red X, "Why?" link to policy
- **Setup Required:** Orange, "Configure" link

**Content:**
- Required scopes/permissions list
- Requested by (user/agent/system)
- Risk level (low/medium/high)
- Resource limits (timeout, memory, rate)
- Link to privacy policy / docs

---

### 7. Integration Widget

Show how skills chain together in workflows.

```
Input Data
    │
    ▼
┌─────────────────────────────────────┐
│ 1. Parse Code                       │
│    [AST Parser]                     │
│    Output: AST Tree                 │
└─────────────────────────────────────┘
    │
    ├────→ [Error] ──→ Retry / Skip
    │
    ▼
┌─────────────────────────────────────┐
│ 2. Analyze AST                      │
│    [Code Analyzer]                  │
│    Input: AST Tree                  │
│    Output: Metrics JSON             │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ 3. Generate Report                  │
│    [Report Generator]               │
│    Input: Metrics JSON              │
│    Output: PDF Report               │
└─────────────────────────────────────┘
    │
    ▼
Final Output: PDF Report
```

**Visual Elements:**
- Tool boxes with names + icons
- Bezier curve connectors between tools
- Input/output labels on connections
- Error path branching (optional)
- Parameter mapping visible

**Interactions:**
- Drag-to-reorder tools
- Click tool to configure inputs
- Add tool button between items
- Expand/collapse sections
- Preview final output

---

### 8. Rate Limit Indicator

Show API quota usage and limits.

```
┌─────────────────────────────────────┐
│ API Quota Usage                     │
├─────────────────────────────────────┤
│ Code Analysis Tool                  │
│ ████████████░░░░░░░░░░░░░░░░ 45%   │
│ 45 / 100 calls remaining            │
│ Resets in: 2 days, 14 hours        │
│                                     │
│ Data Processing Tool                │
│ ██████░░░░░░░░░░░░░░░░░░░░░░░░░ 8% │
│ 8 / 1000 calls remaining            │
│ Resets in: 29 days                 │
│                                     │
│ [Upgrade Plan] [View Details]       │
└─────────────────────────────────────┘
```

**Color Coding:**
- Green (>75%): Full bar, no warning
- Yellow (25-75%): Partially filled
- Orange (10-25%): High usage warning
- Red (<10%): Critical, upgrade recommended

**Information:**
- Tool name
- Usage progress bar
- Remaining calls / total calls
- Time until reset
- Link to upgrade / manage subscription

---

### 9. Error Boundary

Handle and display tool errors gracefully.

```
╔═════════════════════════════════════╗
║ ❌ Execution Failed                  ║
╠═════════════════════════════════════╣
║                                     ║
║ Tool: AST Parser Tool               ║
║ Error: Syntax Error in Input Code   ║
║                                     ║
║ [Details ▼]                         ║
║                                     ║
║ SyntaxError: Unexpected token       ║
║   at Parser.parse (parser.js:145)   ║
║   at parseAST (ast.js:12)           ║
║   at executeSkill (index.js:89)     ║
║                                     ║
║ [Retry] [Report Issue] [View Docs]  ║
╚═════════════════════════════════════╝
```

**Error States:**
- **Syntax Error:** Input validation issue
- **Permission Denied:** Insufficient permissions
- **Rate Limited:** Quota exceeded
- **Network Error:** Connectivity issue
- **Timeout:** Execution took too long
- **Unknown Error:** Generic failure

**Content:**
- Error title (human-readable)
- Error message
- Technical details (toggleable)
- Stack trace (code block)
- Action buttons:
  - Retry (re-execute)
  - Report issue (opens form)
  - View docs (link to help)

---

### 10. Tool Usage Statistics

Display metrics for tool usage and performance.

```
┌─────────────────────────────────────┐
│ Code Analysis Tool - Statistics     │
├─────────────────────────────────────┤
│                                     │
│ Total Executions: 247               │
│ Success Rate: 96.8%                 │
│ Average Duration: 1.23 seconds      │
│ Peak Usage: Tuesday, 2:30 PM        │
│                                     │
│ Recent Errors:                      │
│ • Syntax Error: 3 times             │
│ • Rate Limited: 1 time              │
│ • Network Error: 1 time             │
│                                     │
│ [Export Stats] [Reset] [Details]    │
└─────────────────────────────────────┘
```

**Metrics:**
- Total executions (count)
- Success/failure rate (percentage)
- Average duration (seconds/ms)
- Peak usage time
- Recent errors (list)
- Cost (if applicable)

---

## Design Tokens Reference

### Tool Category Colors
```css
--skill-analysis: #60a5fa;       /* Blue */
--skill-exec: #f97316;           /* Orange */
--skill-data: #8b5cf6;           /* Purple */
--skill-network: #10b981;        /* Emerald */
--skill-security: #ef4444;       /* Red */
```

### Status Indicators
```css
--skill-ready: #4ade80;          /* Green */
--skill-pending: #fbbf24;        /* Amber */
--skill-running: #06b6d4;        /* Cyan */
--skill-error: #ef4444;          /* Red */
--skill-limited: #f97316;        /* Orange */
```

### Typography
```css
/* Tool/Category Names */
font-size: 16-18px;
font-weight: 600;
font-family: 'Inter', sans-serif;

/* Descriptions */
font-size: 14px;
font-weight: 400;
line-height: 1.5;

/* Code/Logs */
font-family: 'JetBrains Mono', monospace;
font-size: 12px;
```

### Spacing
```css
/* Card Grid */
--card-width: 280px (desktop);
--gutter: 16px (mobile), 24px (desktop);

/* Input Fields */
--input-height: 40px (base);
--field-gap: 16px;
--label-gap: 8px;

/* Log Entries */
--log-height: 24px (compact);
--log-padding: 8px vertical, 12px horizontal;
```

---

## Component Checklist

- [x] Skill card with states
- [x] Category panel grouping
- [x] Input form with multiple field types
- [x] Execution monitor with progress
- [x] Results display (multiple formats)
- [x] Permission gate with approval flow
- [x] Integration widget for chaining
- [x] Rate limit indicator
- [x] Error boundary and handling
- [x] Usage statistics dashboard
- [x] Responsive mobile layouts
- [x] Accessibility (keyboard nav, screen readers)

---

## Implementation Notes

### Performance
- Virtual scrolling for large skill lists
- Lazy-load component details on demand
- WebSocket for live log streaming
- Debounce input validation
- Memoize tool cards to prevent rerenders

### Accessibility
- All buttons keyboard accessible
- ARIA labels on icons and status badges
- Form inputs associated with labels
- Error messages linked to fields
- Live regions for status updates

### Testing
- Unit tests: Input validation, error handling
- Integration tests: Tool execution workflows
- E2E tests: Full skill usage flows
- Accessibility tests: axe, manual testing
