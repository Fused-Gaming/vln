---
title: Form Design Tokens
description: Comprehensive guide for form styling, input components, and validation states following VLN brand guidelines
---

> Comprehensive guide for form styling, input components, and validation states following VLN brand guidelines.

---

## Overview

Form components are critical to VLN's booking and contact flows. This document defines all design tokens, spacing, colors, and interactive states for consistent form styling across the platform.

---

## Input Field Tokens

### Base Input Styling

```css
/* Input dimensions and padding */
--vln-input-height: 44px;           /* Standard input height */
--vln-input-padding-x: 16px;        /* Horizontal padding */
--vln-input-padding-y: 12px;        /* Vertical padding */
--vln-input-border-width: 2px;      /* Input border thickness */
--vln-input-border-radius: 12px;    /* Matches --vln-radius */

/* Font sizing for inputs */
--vln-input-font-size: 16px;        /* Prevents zoom on mobile */
--vln-input-font-weight: 500;       /* Semi-bold for readability */
--vln-input-line-height: 1.5;
--vln-input-letter-spacing: 0;
```

### Color States

#### Idle (Default)

```tsx
className="bg-vln-bg-light border-2 border-vln-sage/20 text-vln-white placeholder-vln-gray-dark"
```

#### Focus

```tsx
className="focus:border-vln-sage focus:ring-0"
// Shadow: 0 0 0 3px rgba(134, 217, 147, 0.1)
```

#### Hover

```tsx
className="hover:border-vln-sage/40"
```

### Validation States

| State | Border | Background | Text |
|-------|--------|------------|------|
| **Success** | `border-vln-sage` | `bg-vln-sage/5` | — |
| **Error** | `border-red-500` | `bg-red-500/5` | `text-red-200` |
| **Warning** | `border-vln-amber` | `bg-vln-amber/5` | — |
| **Disabled** | `border-vln-gray-dark/20` | `bg-vln-bg` | `text-vln-gray-dark` |

---

## Label & Hint Text Tokens

### Labels

```tsx
className="block text-sm font-semibold text-vln-white mb-2"
```

### Required Indicator

```tsx
<label>Field Name <span className="text-vln-sage">*</span></label>
```

### Hint Text

```tsx
className="text-xs text-vln-gray mt-2"
```

### Error Message

```tsx
className="text-xs text-red-200 mt-1"
```

---

## Button Tokens

### Primary (Submit)

```tsx
className="bg-vln-sage text-vln-bg hover:shadow-[0_0_8px_#86d993] disabled:opacity-50"
```

### Secondary (Cancel)

```tsx
className="bg-transparent border-2 border-vln-sage/30 text-vln-white hover:border-vln-sage/60"
```

### Button Sizes

| Size | Padding | Font Size |
|------|---------|-----------|
| Small | `8px 16px` | `12px` |
| Medium (default) | `12px 24px` | `14px` |
| Large | `16px 32px` | `16px` |

---

## Spacing Tokens (Form Context)

```css
--vln-form-field-gap: 16px;         /* Between input groups */
--vln-form-row-gap: 16px sm:24px;   /* Between rows */
--vln-form-section-gap: 32px;       /* Between form sections */
--vln-form-label-input-gap: 8px;    /* Label to input */
--vln-form-max-width: 600px;        /* Single-column forms */
--vln-form-max-width-wide: 900px;   /* Two-column forms */
```

---

## Select/Dropdown Tokens

```css
--vln-dropdown-bg: #151a1c;
--vln-dropdown-border: rgba(166, 195, 167, 0.2);
--vln-dropdown-border-radius: 12px;
--vln-dropdown-max-height: 240px;
--vln-option-hover-bg: #1f2527;
--vln-option-selected-bg: rgba(166, 195, 167, 0.2);
--vln-option-selected-text: #86d993;
```

---

## Checkbox & Radio Tokens

```tsx
// Checkbox
className="w-5 h-5 border-2 border-vln-sage/30 rounded checked:bg-vln-sage"

// Radio
className="w-5 h-5 border-2 border-vln-sage/30 rounded-full checked:border-vln-sage"
```

---

## Textarea Tokens

```tsx
className="min-h-[120px] max-h-[400px] resize-y p-3"
```

---

## Date/Time Picker Tokens

### Date Picker

```css
--vln-datepicker-cell-size: 36px;
--vln-datepicker-max-width: 320px;
--vln-datepicker-selected-bg: #86d993;
--vln-datepicker-selected-text: #0a0e0f;
--vln-datepicker-today-border: 2px solid #86d993;
```

### Time Picker

```tsx
className="grid-cols-3 sm:grid-cols-4 gap-1"
// --vln-timepicker-slot-size: 44px
// --vln-timepicker-max-height: 240px
```

---

## Validation Banners

### Error Banner

```tsx
className="bg-red-500/10 border border-red-500 rounded-vln p-3"
```

### Success Banner

```tsx
className="bg-vln-sage/10 border border-vln-sage rounded-vln p-3"
```

### Warning Banner

```tsx
className="bg-vln-amber/10 border border-vln-amber rounded-vln p-3"
```

---

## Focus & Accessibility

```tsx
// Inputs
className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vln-sage"

// Form elements
className="focus:border-vln-sage focus:ring-0"
```

### Tab Order
- Inputs maintain natural tab order
- Labels properly associated with inputs
- All buttons keyboard accessible
- Avoid positive `tabIndex` values

---

## Animation Tokens

| Animation | Duration | Timing |
|-----------|----------|--------|
| Input focus | 200ms | ease-out |
| Button hover/active | 200ms | ease-out |
| Dropdown expand | 200ms | ease-out |
| Loading spinner | 1s | linear |

---

## Form Layout Patterns

### Single Column (Mobile)

```tsx
className="space-y-4"
```

### Two Column (Tablet+)

```tsx
className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
```

---

## Accessibility Checklist

- ✅ All inputs have associated labels
- ✅ Required fields marked with `*` and `aria-required="true"`
- ✅ Error messages linked with `aria-describedby`
- ✅ Focus states clearly visible (2px border or ring)
- ✅ Keyboard navigation fully supported
- ✅ Color not the only indicator (icons + text)
- ✅ Minimum touch target size: 44×44px
- ✅ WCAG AAA contrast (7:1 for body text)
- ✅ Success/error announced with `role="status" aria-live="polite"`

---

## Usage Examples

### Basic Input

```tsx
<div>
  <label htmlFor="name" className="block text-sm font-semibold text-vln-white mb-2">
    Full Name <span className="text-vln-sage">*</span>
  </label>
  <input
    id="name"
    type="text"
    className="w-full px-4 py-3 bg-vln-bg-light border-2 border-vln-sage/20 rounded-vln
               text-vln-white placeholder-vln-gray-dark transition-all focus:border-vln-sage"
    placeholder="John Doe"
    aria-required="true"
  />
  <p className="text-xs text-vln-gray mt-2">Full name as it appears in your account</p>
</div>
```

### Input with Error

```tsx
<div>
  <label className="block text-sm font-semibold text-vln-white mb-2">
    Email <span className="text-vln-sage">*</span>
  </label>
  <input
    type="email"
    className="w-full px-4 py-3 bg-vln-bg-light border-2 border-red-500 rounded-vln
               text-vln-white focus:border-red-500"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-xs text-red-200 mt-1">Invalid email format</p>
</div>
```

---

## Quick Reference Table

| Token | Value | Responsive |
|-------|-------|-----------|
| Input height | 44px | No |
| Label margin | 8px | No |
| Field gap | 16px | Yes |
| Border color (idle) | sage/20% | No |
| Border color (focus) | sage | No |
| Error text | red-200 | No |
| Max width (form) | 600px | Yes |
| Padding (mobile) | 16px | Yes |
| Padding (desktop) | 32px | Yes |

---

**Last Updated:** February 2026 | **Version:** 1.0.0

---

## Related Documents

- [Color System](/tokens/colors)
- [UX Flows — Contact](/ux-flows/contact-flow)
