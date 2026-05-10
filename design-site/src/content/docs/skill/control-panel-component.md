---
title: "Control Panel Component"
description: "Unified interface for configuring tool behavior with multiple control types"
---

# Control Panel Component

The Control Panel provides a unified, consistent interface for configuring tool behavior. It supports multiple input types and adapts to different tool requirements while maintaining a consistent visual and interaction pattern.

## Component Overview

The Control Panel is the primary interface for tool configuration. It displays all available controls for a selected tool, handles validation, and manages state changes. The component is fully responsive and accessible.

## Specifications

### Layout
- **Width:** 100% (responsive, max 600px on desktop)
- **Background:** #1a1a1a (surface-secondary)
- **Border Radius:** 8px
- **Padding:** 16px
- **Spacing Between Controls:** 16px
- **Border:** 1px solid #2a2a2a

### Visual Properties
- **Section Header:** 14px, 500 weight, sage color
- **Control Labels:** 14px, 500 weight, white
- **Control Values:** 13px, 400 weight, monospace
- **Helper Text:** 12px, 400 weight, bluegray
- **Error Messages:** 12px, 400 weight, red (#ff6b6b)

## Control Types

### 1. Toggle Switch

Binary on/off control for boolean settings.

```
┌─────────────────────────────────┐
│ Enable Feature        ○──●      │
│ Toggle control for active...    │
└─────────────────────────────────┘
```

**Specifications:**
- **Size:** 44px width × 20px height
- **Off State:** Circular knob left, background #555555
- **On State:** Circular knob right, background #a6c3a7
- **Animation:** Smooth slide (200ms ease-in-out)
- **Focus:** 2px outline around toggle

**Interactive States:**
- **Default:** Smooth transition on/off
- **Hover:** Subtle shadow increase
- **Focus:** Outline visible
- **Disabled:** Opacity 0.5, cursor not-allowed

### 2. Select Dropdown

Single selection from predefined options.

```
┌─────────────────────────────────┐
│ Environment     [Production ▼]  │
│ Choose deployment environment    │
│                                 │
│ Options shown on click:         │
│ • Development                   │
│ • Staging                       │
│ • Production                    │
└─────────────────────────────────┘
```

**Specifications:**
- **Height:** 44px minimum
- **Padding:** 12px left, 12px right
- **Border:** 1px solid #2a2a2a
- **Border Radius:** 6px
- **Background:** #252525
- **Text:** 14px, monospace for values
- **Chevron:** 16px, sage color
- **Dropdown Animation:** Fade in (150ms)

**States:**
- **Closed:** Shows selected value
- **Open:** Displays all options with hover highlights
- **Selected:** Background color #a6c3a7/10
- **Hover:** Background color #2a2a2a
- **Disabled:** Opacity 0.5, gray text

### 3. Text Input

Single-line or multi-line text entry.

```
┌─────────────────────────────────┐
│ API Key                         │
│ [sk_vln_xxxxxxxxxxxxx        ]  │
│ Paste your API key here         │
└─────────────────────────────────┘
```

**Specifications:**
- **Height:** 44px (single-line)
- **Height:** 120px (multi-line)
- **Padding:** 12px
- **Border:** 1px solid #2a2a2a
- **Border Radius:** 6px
- **Font:** JetBrains Mono, 13px
- **Background:** #252525
- **Text Color:** white
- **Placeholder:** #777777

**States:**
- **Default:** Normal appearance
- **Focus:** Border #a6c3a7, outline 2px
- **Filled:** White text
- **Error:** Border #ff6b6b, error message below
- **Disabled:** Background #1a1a1a, opacity 0.5
- **Hint Text:** 12px, bluegray, below input

### 4. Slider

Numeric value selection with visual range.

```
┌─────────────────────────────────┐
│ Timeout (seconds)       45      │
│ ━━━━━━━●━━━━━━━━━━ (Range: 0-100)
│ Adjust request timeout in sec   │
└─────────────────────────────────┘
```

**Specifications:**
- **Track Height:** 4px
- **Track Color:** #2a2a2a
- **Active Track:** #a6c3a7
- **Thumb Diameter:** 16px
- **Thumb Color:** #a6c3a7
- **Thumb Shadow:** 0 2px 4px rgba(0, 0, 0, 0.3)
- **Value Display:** Right-aligned, monospace
- **Tooltip:** Shows value on drag (12px)

**Behavior:**
- **Drag:** Smooth value update, tooltip visible
- **Click Track:** Jump to position
- **Keyboard:** Arrow keys ±1, Shift+Arrow ±10
- **Animation:** Smooth value transitions (100ms)

### 5. Checkbox Group

Multiple selection from related options.

```
┌─────────────────────────────────┐
│ Features                        │
│ ☑ Enable Caching               │
│ ☐ Enable Compression           │
│ ☑ Enable Monitoring            │
│ Select features to enable       │
└─────────────────────────────────┘
```

**Specifications:**
- **Checkbox Size:** 20px × 20px
- **Border:** 2px solid #2a2a2a
- **Checked Background:** #a6c3a7
- **Checked Mark:** white, 14px
- **Label:** 14px, 12px margin left
- **Group Spacing:** 12px between items
- **Focus Outline:** 2px around checkbox

**States:**
- **Unchecked:** Empty box, border gray
- **Checked:** Background sage, white checkmark
- **Focus:** Outline visible
- **Hover:** Border brightens slightly
- **Disabled:** Opacity 0.5, cursor not-allowed

### 6. Radio Buttons

Single selection from mutually exclusive options.

```
┌─────────────────────────────────┐
│ Scan Mode                       │
│ ● Deep Scan                     │
│ ○ Quick Scan                    │
│ ○ Custom Scan                   │
│ Choose scanning depth           │
└─────────────────────────────────┘
```

**Specifications:**
- **Radio Button Size:** 20px × 20px
- **Outer Circle:** 2px border, #2a2a2a
- **Inner Dot:** 10px diameter, centered
- **Checked Dot:** #a6c3a7
- **Label:** 14px, 12px margin left
- **Group Spacing:** 12px between items
- **Focus Outline:** 2px around button

**States:**
- **Unchecked:** Empty circle
- **Checked:** Filled center dot
- **Focus:** Outline visible
- **Hover:** Border brightens
- **Disabled:** Opacity 0.5

## Control Panel Layout

### Basic Structure

```
┌────────────────────────────────────┐
│ [16px padding]                     │
│                                    │
│ Section: Basic Configuration       │ [section header]
│                                    │
│ [Control Type 1]                   │
│                                    │
│ [16px spacing]                     │
│                                    │
│ [Control Type 2]                   │
│                                    │
│ [16px spacing]                     │
│                                    │
│ Section: Advanced Options          │ [section header]
│                                    │
│ [Control Type 3]                   │
│                                    │
│ [16px spacing]                     │
│                                    │
│ [Cancel] [Save Changes]            │ [action buttons]
│                                    │
│ [16px padding]                     │
└────────────────────────────────────┘
```

### Control Sections

Controls are grouped logically by section:

```typescript
interface ControlSection {
  title: string;
  description?: string;
  controls: Control[];
  collapsible?: boolean;
}
```

**Section Styling:**
- **Header:** 14px, 500 weight, sage color
- **Description:** 12px, bluegray (optional)
- **Top Margin:** 24px (first section 0px)
- **Bottom Margin:** 16px

### Form Actions

Bottom of panel includes action buttons:

```
[Cancel]  [Save Changes]
```

- **Cancel Button:** Gray outline, returns to previous state
- **Save Button:** Sage background, applies changes
- **Spacing:** 8px gap between buttons
- **Width:** Full width on mobile, fixed on desktop
- **Height:** 44px minimum
- **Animation:** Scale on hover, disabled appearance when loading

## Responsive Behavior

### Desktop (1024px+)
- **Width:** 400-600px fixed
- **Position:** Slide-in from right
- **Display:** Full visibility
- **Animations:** All transitions enabled

### Tablet (640px - 1024px)
- **Width:** 100% - 32px (16px margins)
- **Position:** Slide-in from bottom or right
- **Display:** Full visibility, slightly smaller
- **Animations:** Optimized transitions

### Mobile (< 640px)
- **Width:** 100% (no margins, full screen)
- **Position:** Slide-in from bottom (sheet)
- **Display:** Scrollable if needed
- **Animations:** Reduced animations (performance)
- **Touch:** Larger controls (44px minimum)

## Validation and Error Handling

### Validation Rules

```typescript
interface ValidationRule {
  type: 'required' | 'pattern' | 'min' | 'max' | 'custom';
  message: string;
  validate: (value: any) => boolean;
}
```

### Error Display

When validation fails:
1. Input border turns red (#ff6b6b)
2. Error message appears below input (12px, red)
3. Save button becomes disabled
4. Field receives focus (keyboard accessible)

```
[Control Label]
[Input with red border]
✕ Error message describing issue
```

### Error Messages
- **Required:** "This field is required"
- **Pattern:** "Format is invalid, expected: xxx"
- **Min/Max:** "Value must be between X and Y"
- **Custom:** Tool-specific error message

## State Management

### Control States

```typescript
interface ControlState {
  value: any;
  isValid: boolean;
  isDirty: boolean;
  isFocused: boolean;
  isLoading?: boolean;
  error?: string;
}
```

### State Transitions

```
Default → Focus → Edit → Blur
   ↓                      ↓
Invalid (with error) → Valid → Ready to Save
```

## Accessibility

### Keyboard Navigation

```
Tab:        Move to next control
Shift+Tab:  Move to previous control
Enter:      Activate button, submit dropdown
Space:      Toggle checkbox/radio, toggle switch
Arrow Keys: Navigate dropdowns, adjust sliders
Escape:     Close dropdown, cancel changes
```

### Screen Reader Support

```jsx
<fieldset>
  <legend>Configuration Section</legend>
  <label htmlFor="control-id">Control Label</label>
  <input
    id="control-id"
    aria-label="Control Label"
    aria-describedby="control-help"
    aria-invalid={hasError}
    aria-errormessage="error-id"
  />
  <span id="control-help">Helper text</span>
  <span id="error-id" role="alert">Error message</span>
</fieldset>
```

### WCAG Compliance
- ✅ All controls keyboard accessible
- ✅ Form labels associated
- ✅ Error messages announced
- ✅ Focus indicators always visible
- ✅ Color contrast 4.5:1 minimum
- ✅ Touch targets 44px minimum

## Interactive Examples

### Basic Configuration Panel

```jsx
<ControlPanel
  tool="security-scanner"
  controls={[
    {
      type: "toggle",
      label: "Enable Scanning",
      key: "enabled",
      value: true
    },
    {
      type: "select",
      label: "Scan Mode",
      key: "mode",
      value: "deep",
      options: [
        { label: "Quick", value: "quick" },
        { label: "Deep", value: "deep" },
        { label: "Custom", value: "custom" }
      ]
    },
    {
      type: "slider",
      label: "Timeout (seconds)",
      key: "timeout",
      value: 45,
      min: 10,
      max: 300
    }
  ]}
  onSave={handleSave}
/>
```

### Advanced Configuration Panel

```jsx
<ControlPanel
  tool="github-integration"
  sections={[
    {
      title: "Connection",
      controls: [
        {
          type: "input",
          label: "API Token",
          key: "token",
          value: "",
          type: "password",
          required: true
        }
      ]
    },
    {
      title: "Sync Settings",
      controls: [
        {
          type: "checkbox-group",
          label: "Sync Options",
          key: "syncOptions",
          value: ["pull-requests", "issues"],
          options: [
            { label: "Pull Requests", value: "pull-requests" },
            { label: "Issues", value: "issues" },
            { label: "Comments", value: "comments" }
          ]
        }
      ]
    }
  ]}
  onSave={handleSave}
/>
```

## Design Tokens

```css
/* Control Panel Base */
--control-panel-background: #1a1a1a;
--control-panel-border: 1px solid #2a2a2a;
--control-panel-padding: 16px;
--control-panel-radius: 8px;
--control-panel-gap: 16px;

/* Control Styling */
--control-height: 44px;
--control-padding: 12px;
--control-border-radius: 6px;
--control-border: 1px solid #2a2a2a;
--control-background: #252525;
--control-label-color: white;
--control-hint-color: #aab7c8;
--control-error-color: #ff6b6b;

/* Interactive Colors */
--control-focus-outline: 2px solid #a6c3a7;
--control-active-color: #a6c3a7;
--control-hover-background: #2a2a2a;
--control-disabled-opacity: 0.5;
```

## Testing Checklist

- [ ] All control types render correctly
- [ ] Keyboard navigation works (Tab, Enter, Space, Arrows)
- [ ] Form validation works and shows errors
- [ ] Save/Cancel buttons functional
- [ ] State persists correctly
- [ ] Responsive layout at all breakpoints
- [ ] Accessibility audit passes (axe-core)
- [ ] Screen reader announces all controls
- [ ] Focus indicators visible
- [ ] Mobile touch targets 44px+
- [ ] Error messages clear and actionable
- [ ] Disabled state styling correct
- [ ] Animations smooth (60fps)

---

**Component Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
