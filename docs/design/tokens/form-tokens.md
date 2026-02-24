# VLN Form Design Tokens

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
--vln-input-line-height: 1.5;       /* Consistent line height */

/* Letter spacing for technical content */
--vln-input-letter-spacing: 0;
```

### Color States

#### Idle State (Default)

```css
--vln-input-bg: #151a1c;                    /* vln-bg-light */
--vln-input-border: #a6c3a7 / 20%;          /* Sage with 20% opacity */
--vln-input-text: #f8f9fa;                  /* vln-white */
--vln-input-placeholder: #94a3b8;           /* vln-gray-dark */

/* Tailwind usage */
className="bg-vln-bg-light border-2 border-vln-sage/20 text-vln-white placeholder-vln-gray-dark"
```

#### Focus State

```css
--vln-input-border-focus: #86d993;          /* Sage (primary) */
--vln-input-shadow-focus: 0 0 0 3px rgba(134, 217, 147, 0.1);

/* Tailwind usage */
className="focus:border-vln-sage focus:ring-0"
```

#### Hover State (Non-focus)

```css
--vln-input-border-hover: #a6c3a7 / 40%;    /* Sage with 40% opacity */

/* Tailwind usage */
className="hover:border-vln-sage/40"
```

### Validation States

#### Success State

```css
--vln-input-border-success: #86d993;        /* Sage green */
--vln-input-bg-success: rgba(134, 217, 147, 0.05);

className="border-vln-sage bg-vln-sage/5"
```

#### Error State

```css
--vln-input-border-error: #ef4444;          /* Red */
--vln-input-bg-error: rgba(239, 68, 68, 0.05);
--vln-input-text-error: #fca5a5;            /* Light red for error messages */

className="border-red-500 bg-red-500/5 focus:border-red-500"
```

#### Warning State

```css
--vln-input-border-warning: #fbbf24;        /* Amber */
--vln-input-bg-warning: rgba(251, 191, 36, 0.05);

className="border-vln-amber bg-vln-amber/5"
```

#### Disabled State

```css
--vln-input-bg-disabled: #0a0e0f;           /* vln-bg, darker */
--vln-input-border-disabled: #94a3b8 / 20%; /* Gray with low opacity */
--vln-input-text-disabled: #94a3b8;         /* Gray-dark */
--vln-input-cursor-disabled: not-allowed;

className="bg-vln-bg border-vln-gray-dark/20 text-vln-gray-dark cursor-not-allowed opacity-50"
```

---

## Label & Hint Text Tokens

### Labels

```css
--vln-label-font-size: 14px;
--vln-label-font-weight: 600;               /* Semi-bold */
--vln-label-letter-spacing: 0.3px;          /* Slight tracking */
--vln-label-color: #f8f9fa;                 /* vln-white */
--vln-label-margin-bottom: 8px;

/* Tailwind usage */
className="block text-sm font-semibold text-vln-white mb-2"
```

### Required Indicator

```css
--vln-required-indicator-color: #86d993;    /* Sage */
--vln-required-indicator-margin: 4px;

/* HTML */
<label>Field Name <span className="text-vln-sage">*</span></label>
```

### Hint Text (Under Input)

```css
--vln-hint-font-size: 12px;
--vln-hint-color: #cbd5e1;                  /* vln-gray */
--vln-hint-margin-top: 8px;

className="text-xs text-vln-gray mt-2"
```

### Error Message Text

```css
--vln-error-font-size: 12px;
--vln-error-color: #fca5a5;                 /* Light red */
--vln-error-margin-top: 6px;
--vln-error-icon-margin: 4px;

className="text-xs text-red-200 mt-1"
```

---

## Button Tokens

### Primary Action (Submit)

```css
--vln-button-primary-bg: #86d993;           /* Sage */
--vln-button-primary-text: #0a0e0f;         /* vln-bg (contrast) */
--vln-button-primary-hover-shadow: 0 0 8px rgba(134, 217, 147, 0.4);
--vln-button-primary-disabled-opacity: 0.5;

/* Tailwind usage */
className="bg-vln-sage text-vln-bg hover:shadow-[0_0_8px_#86d993] disabled:opacity-50"
```

### Secondary Action (Cancel)

```css
--vln-button-secondary-bg: transparent;
--vln-button-secondary-border: #a6c3a7 / 30%;
--vln-button-secondary-text: #f8f9fa;       /* vln-white */
--vln-button-secondary-hover-border: #a6c3a7 / 60%;

className="bg-transparent border-2 border-vln-sage/30 text-vln-white hover:border-vln-sage/60"
```

### Button Size Variants

```css
/* Small buttons */
--vln-button-sm-padding: 8px 16px;
--vln-button-sm-font-size: 12px;

/* Medium buttons (default) */
--vln-button-md-padding: 12px 24px;
--vln-button-md-font-size: 14px;

/* Large buttons */
--vln-button-lg-padding: 16px 32px;
--vln-button-lg-font-size: 16px;

/* Full width (for mobile) */
--vln-button-full-width: 100%;
```

---

## Spacing Tokens (Form Context)

### Vertical Spacing

```css
--vln-form-field-gap: 16px;              /* Between input groups */
--vln-form-row-gap: 16px sm:24px;        /* Between rows on mobile/desktop */
--vln-form-section-gap: 32px;            /* Between form sections */
--vln-form-label-input-gap: 8px;         /* Label to input spacing */
--vln-form-input-hint-gap: 8px;          /* Input to hint text spacing */
--vln-form-input-error-gap: 6px;         /* Input to error message spacing */

/* Tailwind usage */
className="space-y-4"         /* 16px gap */
className="space-y-6"         /* 24px gap */
className="space-y-8"         /* 32px gap */
```

### Horizontal Spacing

```css
--vln-form-padding-mobile: 16px;         /* Form padding on mobile */
--vln-form-padding-tablet: 24px;         /* Form padding on tablet+ */
--vln-form-max-width: 600px;             /* Max width for single-column forms */
--vln-form-max-width-wide: 900px;        /* Max width for two-column forms */
```

---

## Select/Dropdown Tokens

### Dropdown Container

```css
--vln-dropdown-bg: #151a1c;              /* vln-bg-light */
--vln-dropdown-border: #a6c3a7 / 20%;
--vln-dropdown-border-radius: 12px;
--vln-dropdown-padding: 12px 16px;
--vln-dropdown-max-height: 240px;        /* Scrollable after this */
--vln-dropdown-z-index: 50;              /* Above modals would be higher */

className="max-h-60 overflow-y-auto"
```

### Option Item

```css
--vln-option-padding: 12px 16px;
--vln-option-hover-bg: #1f2527;          /* vln-bg-lighter */
--vln-option-selected-bg: #a6c3a7 / 20%; /* Subtle sage tint */
--vln-option-selected-text: #86d993;     /* Sage */
--vln-option-disabled-opacity: 0.4;
```

---

## Checkbox & Radio Tokens

### Checkbox Container

```css
--vln-checkbox-size: 20px;
--vln-checkbox-border: 2px;
--vln-checkbox-border-radius: 4px;
--vln-checkbox-border-color: #a6c3a7 / 30%;
--vln-checkbox-checked-bg: #86d993;      /* Sage */
--vln-checkbox-focus-ring: 0 0 0 3px rgba(134, 217, 147, 0.1);

className="w-5 h-5 border-2 border-vln-sage/30 rounded checked:bg-vln-sage"
```

### Radio Button

```css
--vln-radio-size: 20px;
--vln-radio-border: 2px;
--vln-radio-border-radius: 50%;
--vln-radio-dot-size: 8px;
--vln-radio-border-color: #a6c3a7 / 30%;
--vln-radio-checked-border-color: #86d993;

className="w-5 h-5 border-2 border-vln-sage/30 rounded-full checked:border-vln-sage"
```

---

## Textarea Tokens

```css
--vln-textarea-min-height: 120px;
--vln-textarea-max-height: 400px;
--vln-textarea-resize: vertical;          /* Only vertical resizing */
--vln-textarea-padding: 12px 16px;
--vln-textarea-line-height: 1.5;

/* Tailwind usage */
className="min-h-[120px] max-h-[400px] resize-y p-3"
```

---

## Date/Time Picker Tokens

### Date Picker

```css
--vln-datepicker-grid-gap: 4px;          /* Gap between day cells */
--vln-datepicker-cell-padding: 8px;      /* Padding in day cells */
--vln-datepicker-cell-size: 36px;        /* Square size for day buttons */
--vln-datepicker-max-width: 320px;       /* Calendar width */
--vln-datepicker-animation-duration: 200ms;

/* Disabled day styling */
--vln-datepicker-disabled-opacity: 0.4;
--vln-datepicker-disabled-cursor: not-allowed;

/* Selected day styling */
--vln-datepicker-selected-bg: #86d993;   /* Sage */
--vln-datepicker-selected-text: #0a0e0f; /* vln-bg for contrast */

/* Today indicator */
--vln-datepicker-today-border: 2px solid #86d993;
```

### Time Picker

```css
--vln-timepicker-slot-size: 44px;        /* Size of time slots */
--vln-timepicker-grid-cols-mobile: 3;    /* 3 columns on mobile */
--vln-timepicker-grid-cols-desktop: 4;   /* 4 columns on desktop */
--vln-timepicker-max-height: 240px;      /* Scrollable height */
--vln-timepicker-padding: 12px;

className="grid-cols-3 sm:grid-cols-4 gap-1"
```

---

## Validation & Error States

### Error Banner

```css
--vln-error-banner-bg: rgba(239, 68, 68, 0.1);    /* Red with transparency */
--vln-error-banner-border: #ef4444;
--vln-error-banner-padding: 12px 16px;
--vln-error-banner-border-radius: 12px;
--vln-error-banner-icon-color: #ef4444;
--vln-error-banner-text-color: #fca5a5;

className="bg-red-500/10 border border-red-500 rounded-vln p-3"
```

### Success Banner

```css
--vln-success-banner-bg: rgba(134, 217, 147, 0.1);  /* Sage with transparency */
--vln-success-banner-border: #86d993;
--vln-success-banner-padding: 12px 16px;
--vln-success-banner-border-radius: 12px;
--vln-success-banner-icon-color: #86d993;
--vln-success-banner-text-color: #cbd5e1;

className="bg-vln-sage/10 border border-vln-sage rounded-vln p-3"
```

### Warning Banner

```css
--vln-warning-banner-bg: rgba(251, 191, 36, 0.1);  /* Amber with transparency */
--vln-warning-banner-border: #fbbf24;
--vln-warning-banner-icon-color: #fbbf24;
--vln-warning-banner-text-color: #fcd34d;
```

---

## Focus & Accessibility States

### Focus Ring

```css
--vln-focus-ring-width: 2px;
--vln-focus-ring-offset: 2px;
--vln-focus-ring-color: #86d993;         /* Sage */

/* For inputs */
className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vln-sage"

/* For form elements */
className="focus:border-vln-sage focus:ring-0"
```

### Tab Order

```css
/* Inputs should maintain natural tab order */
/* Labels should be properly associated with inputs */
/* Buttons should be keyboard accessible */

/* HTML pattern */
<label htmlFor="input-id">Label</label>
<input id="input-id" type="text" />

/* Tab index: use 0 or negative, avoid positive values */
className="focus:outline-none"  /* Remove default outline, use ring instead */
```

---

## Responsive Design Breakpoints

```css
/* Mobile-first approach */

/* Small (sm): 640px */
@media (min-width: 640px) {
  --vln-form-padding: 24px;
}

/* Medium (md): 768px */
@media (min-width: 768px) {
  --vln-form-padding: 32px;
  /* Two-column layout becomes available */
}

/* Large (lg): 1024px */
@media (min-width: 1024px) {
  --vln-form-padding: 40px;
  /* Wider spacing and larger elements */
}

/* XL (xl): 1280px */
@media (min-width: 1280px) {
  --vln-form-max-width: 1200px;
}
```

---

## Animation Tokens

### Input Focus Animation

```css
--vln-input-transition: border-color 200ms ease-out, box-shadow 200ms ease-out;

className="transition-all"
```

### Button Hover/Active

```css
--vln-button-transition: background-color 200ms ease-out, box-shadow 200ms ease-out, transform 100ms ease-out;
--vln-button-active-transform: scale(0.98);

className="transition-all active:scale-98"
```

### Dropdown Expand/Collapse

```css
--vln-dropdown-animation-duration: 200ms;
--vln-dropdown-animation-timing: ease-out;

/* Use CSS transitions, not animations */
className="transition-all duration-200"
```

### Loading State

```css
--vln-loading-spinner-color: #86d993;    /* Sage */
--vln-loading-spinner-size: 16px;
--vln-loading-animation-duration: 1s;

className="animate-spin"
```

---

## Form Layout Patterns

### Single Column (Mobile)

```css
--vln-form-single-column-gap: 16px;
--vln-form-single-column-padding: 16px;

/* Tailwind */
className="space-y-4"  /* 16px gap */
```

### Two Column (Tablet+)

```css
--vln-form-two-column-gap: 16px 24px;    /* row gap, column gap */

/* Tailwind */
className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
```

### Form with Side Panel

```css
--vln-form-panel-gap: 32px;
--vln-form-width: 66.66%;                /* 2/3 width */
--vln-panel-width: 33.33%;               /* 1/3 width */
```

---

## Accessibility Checklist

- ✅ All inputs have associated labels
- ✅ Required fields marked with `*` and `aria-required="true"`
- ✅ Error messages linked to inputs with `aria-describedby`
- ✅ Focus states clearly visible (minimum 2px border or ring)
- ✅ Keyboard navigation fully supported
- ✅ Color not the only indicator (use icons + text for validation)
- ✅ Minimum touch target size: 44x44px
- ✅ Contrast ratios meet WCAG AAA (7:1 for body text)
- ✅ Form sections can be announced by screen readers
- ✅ Success/error messages announced with `role="status" aria-live="polite"`

---

## Usage Examples

### Basic Input Field

```tsx
<div>
  <label htmlFor="name" className="block text-sm font-semibold text-vln-white mb-2">
    Full Name <span className="text-vln-sage">*</span>
  </label>
  <input
    id="name"
    type="text"
    className="w-full px-4 py-3 bg-vln-bg-light border-2 border-vln-sage/20 rounded-vln text-vln-white placeholder-vln-gray-dark transition-all focus:border-vln-sage"
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
    className="w-full px-4 py-3 bg-vln-bg-light border-2 border-red-500 rounded-vln text-vln-white focus:border-red-500"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-xs text-red-200 mt-1">Invalid email format</p>
</div>
```

### Date Picker with Calendar

```tsx
<div>
  <label className="block text-sm font-semibold text-vln-white mb-2">
    Select Date <span className="text-vln-sage">*</span>
  </label>
  <DatePicker
    value={date}
    onChange={setDate}
    excludeDates={holidays}
    excludeWeekends={true}
  />
  <p className="text-xs text-vln-gray mt-2">Monday–Friday, excluding holidays</p>
</div>
```

---

## Implementation Notes

### Performance

- Use CSS transitions (200ms standard duration) instead of JavaScript animations
- Debounce input validation (300ms delay)
- Lazy-load date pickers on focus
- Minimize re-renders with proper React key management

### Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Mobile browsers (iOS Safari 13+, Chrome Android)
- Graceful degradation for older browsers
- No IE 11 support required

### Dark Mode

VLN operates in dark mode exclusively. All tokens are pre-set for dark backgrounds. No need for dark mode media queries.

---

## Quick Reference Table

| Token | Value | Use Case | Responsive |
|-------|-------|----------|-----------|
| Input height | 44px | All text inputs | No |
| Label margin | 8px | Space between label and input | No |
| Field gap | 16px | Space between form fields | Yes |
| Border color (idle) | sage/20% | Default input border | No |
| Border color (focus) | sage | Input focus state | No |
| Error text | red-200 | Error messages | No |
| Button padding | 12-16px | Button sizing | Yes |
| Button font size | 14-16px | Button text | Yes |
| Max width (form) | 600px | Single-column form | Yes |
| Padding (mobile) | 16px | Form container padding | Yes |
| Padding (desktop) | 32px | Form container padding | Yes |

---

**Last Updated:** February 2025
**Status:** Active
**Version:** 1.0.0

---

## Related Documents

- [Color System](./colors.md)
- [Component Guidelines](../components/README.md)
- [UX Flows - Contact](../ux-flows/contact-flow.md)
- [Accessibility Guidelines](../components/accessibility.md)
