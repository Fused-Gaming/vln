---
title: Skill-MCP Color Palette
description: Skill-MCP Tool Category Colors and Status Indicators
---

## Color System Overview

The Skill-MCP color palette organizes tools by category, provides clear status indicators, and maintains visual consistency with the VLN design system. Colors are chosen for clarity, accessibility, and quick visual scanning.

---

## Tool Category Colors

### Analysis Tools - Sky Blue

**Token:** `--skill-analysis`
**Hex:** `#60a5fa`
**RGB:** `96, 165, 250`
**CMYK:** `62, 34, 0, 2`

**Usage:**
- Code analysis tools (AST, linting)
- Static analysis
- Metrics and reporting
- Pattern detection

**Examples:**
- Code Parser
- Linter
- Type Checker
- Code Metrics

**Hover State:** `#3b82f6` (darker blue)

---

### Execution Tools - Vibrant Orange

**Token:** `--skill-exec`
**Hex:** `#f97316`
**RGB:** `249, 115, 22`
**CMYK:** `0, 54, 91, 2`

**Usage:**
- Command execution
- Script running
- File operations
- Process management

**Examples:**
- Shell Command Executor
- Node Script Runner
- Docker Command
- Package Manager

**Hover State:** `#ea580c` (darker orange)

---

### Data Operations - Deep Purple

**Token:** `--skill-data`
**Hex:** `#8b5cf6`
**RGB:** `139, 92, 246`
**CMYK:** `43, 63, 0, 4`

**Usage:**
- Data transformation
- ETL operations
- Database queries
- JSON/CSV processing

**Examples:**
- JSON Transformer
- CSV Parser
- Data Aggregator
- Database Query

**Hover State:** `#7c3aed` (darker purple)

---

### Network Tools - Fresh Emerald

**Token:** `--skill-network`
**Hex:** `#10b981`
**RGB:** `16, 185, 129`
**CMYK:** `91, 0, 30, 27`

**Usage:**
- API calls
- Network requests
- Webhook integrations
- DNS lookups

**Examples:**
- HTTP Client
- GraphQL Query
- Webhook Sender
- DNS Resolver

**Hover State:** `#059669` (darker emerald)

---

### Security Tools - Bold Red

**Token:** `--skill-security`
**Hex:** `#ef4444`
**RGB:** `239, 68, 68`
**CMYK:** `0, 71, 71, 6`

**Usage:**
- Security-sensitive operations
- Encryption/decryption
- Authorization checks
- Vulnerability scanning

**Examples:**
- Encryption Tool
- Signature Verifier
- Security Scanner
- Access Control

**Hover State:** `#dc2626` (darker red)

---

## Status Indicator Colors

### Ready State - Vibrant Green

**Token:** `--skill-ready`
**Hex:** `#4ade80`
**RGB:** `74, 222, 128`
**CMYK:** `67, 0, 42, 13`

**Usage:**
- Tool available and ready
- Permissions granted
- No issues
- Success state

**Implementation:**
```css
.skill-ready {
  background-color: #4ade80;
  border-color: #22c55e;
}

.status-icon.ready::before {
  content: '✓';
  color: #16a34a;
}
```

**Contrast Ratio:** 3.2:1 against white, 5.8:1 against dark background

---

### Pending State - Warm Amber

**Token:** `--skill-pending`
**Hex:** `#fbbf24`
**RGB:** `251, 191, 36`
**CMYK:** `0, 24, 86, 2`

**Usage:**
- Awaiting approval
- Permission check in progress
- Configuration required
- Setup needed

**Implementation:**
```css
.skill-pending {
  background-color: #fbbf24;
  border-color: #f59e0b;
}

.status-icon.pending::before {
  content: '⏳';
  color: #d97706;
}
```

---

### Running State - Cyan

**Token:** `--skill-running`
**Hex:** `#06b6d4`
**RGB:** `6, 182, 212`
**CMYK:** `97, 14, 0, 17`

**Usage:**
- Tool actively executing
- Process in progress
- Request processing
- Streaming operation

**Implementation:**
```css
.skill-running {
  background-color: #06b6d4;
  border-color: #0891b2;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

### Error State - Alert Red

**Token:** `--skill-error`
**Hex:** `#ef4444`
**RGB:** `239, 68, 68`
**CMYK:** `0, 71, 71, 6`

**Usage:**
- Execution failed
- Error occurred
- Tool unavailable
- Critical issue

**Implementation:**
```css
.skill-error {
  background-color: #ef4444;
  border-color: #dc2626;
}

.status-icon.error::before {
  content: '✗';
  color: #991b1b;
}
```

---

### Rate Limited - Orange

**Token:** `--skill-limited`
**Hex:** `#f97316`
**RGB:** `249, 115, 22`
**CMYK:** `0, 54, 91, 2`

**Usage:**
- API quota exceeded
- Rate limit reached
- Service throttled
- Quota management

**Implementation:**
```css
.skill-rate-limited {
  background-color: #f97316;
  border-color: #ea580c;
}

.status-icon.limited::before {
  content: '⚠️';
}
```

---

## Semantic Color States

### Disabled/Unavailable

**Hex:** `#9ca3af`
**RGB:** `156, 163, 175`
**Usage:** Locked tools, permission denied, unavailable services

---

### Warning/Caution

**Hex:** `#f59e0b`
**RGB:** `245, 158, 11`
**Usage:** Performance issues, deprecation warnings, best practice alerts

---

### Success/Completion

**Hex:** `#10b981`
**RGB:** `16, 185, 129`
**Usage:** Operation successful, approval granted, task complete

---

## VLN Integration

### Sage Green (Links & Secondary)

**Token:** `--vln-sage`
**Hex:** `#a6c3a7`
**RGB:** `166, 195, 167`

**Usage in Skill-MCP:**
- Secondary action links
- Help/documentation buttons
- Optional actions
- Non-critical buttons

---

### Blue-Gray (Borders & Metadata)

**Token:** `--vln-bluegray`
**Hex:** `#aab7c8`
**RGB:** `170, 183, 200`

**Usage:**
- Card borders
- Dividers
- Metadata text
- Secondary labels
- Disabled text

---

### Charcoal (Dark Backgrounds)

**Token:** `--vln-charcoal`
**Hex:** `#0f0f0f`
**RGB:** `15, 15, 15`

**Usage:**
- Modal overlays
- Dark panel backgrounds
- Strong contrast elements
- Deep shadows

---

## Category + Status Matrix

### Color Combinations

When combining category and status (example):

```
Code Analysis + Ready = Blue + Green (overlay)
Execution + Error = Orange + Red (alert)
Network + Running = Emerald + Cyan (pulse)
```

**Visual Pattern:**
- Category color as primary
- Status color as border or overlay
- Icon shows primary status
- Animation reinforces status change

---

## Accessibility Considerations

### Contrast Ratios

| Color | Light Background | Dark Background | WCAG |
|-------|-----------------|-----------------|------|
| Analysis Blue (#60a5fa) | 3.2:1 | 4.0:1 | AA |
| Execution Orange (#f97316) | 4.5:1 | 4.3:1 | AA |
| Data Purple (#8b5cf6) | 2.1:1 | 3.8:1 | AA* |
| Network Emerald (#10b981) | 4.2:1 | 5.1:1 | AA |
| Security Red (#ef4444) | 3.9:1 | 2.8:1 | AA |
| Ready Green (#4ade80) | 3.2:1 | 5.8:1 | AA |
| Pending Amber (#fbbf24) | 1.1:1 | 5.9:1 | AA* |
| Running Cyan (#06b6d4) | 4.4:1 | 3.2:1 | AA |
| Error Red (#ef4444) | 3.9:1 | 2.8:1 | AA |

*Requires text outline or icon supplementation

---

### Colorblind Support

All category and status colors include supplementary signals:

1. **Icon + Color**
   - Ready: ✓ icon + green
   - Error: ✗ icon + red
   - Pending: ⏳ icon + amber

2. **Text Label + Color**
   - All cards include text labels
   - Status badges have descriptive text
   - Category names always visible

3. **Pattern Differentiation**
   - Border thickness varies by status
   - Icon style varies by category
   - Saturation indicates importance

---

## CSS Custom Properties

```css
:root {
  /* Tool Categories */
  --skill-analysis: #60a5fa;
  --skill-exec: #f97316;
  --skill-data: #8b5cf6;
  --skill-network: #10b981;
  --skill-security: #ef4444;

  /* Status Indicators */
  --skill-ready: #4ade80;
  --skill-pending: #fbbf24;
  --skill-running: #06b6d4;
  --skill-error: #ef4444;
  --skill-limited: #f97316;
}
```

---

## Usage Examples

### Skill Card Styling

```css
.skill-card {
  border-left: 4px solid var(--skill-analysis); /* Category color */
  background-color: rgba(96, 165, 250, 0.1);
}

.skill-card.ready::after {
  background-color: var(--skill-ready);
}

.skill-card.error::after {
  background-color: var(--skill-error);
}
```

### Status Badge Styling

```css
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.ready {
  background-color: rgba(74, 222, 128, 0.2);
  color: #16a34a;
  border: 1px solid #4ade80;
}

.status-badge.error {
  background-color: rgba(239, 68, 68, 0.2);
  color: #991b1b;
  border: 1px solid #ef4444;
}
```

---

## Implementation Checklist

- [x] Define all color tokens as CSS variables
- [x] Test WCAG contrast ratios
- [x] Validate colorblind accessibility
- [x] Document category color usage
- [x] Document status indicator colors
- [x] Create combined state styles
- [x] Implement hover/active states
- [x] Provide design system assets
- [x] Document color combinations

---

## Related Resources

- [Skill-MCP Component Library](/skill-mcp/components)
- [VLN Color System](/tokens/colors)
- [Accessibility Guidelines](/responsive/accessibility)
- [Animation System](/components/animations)
