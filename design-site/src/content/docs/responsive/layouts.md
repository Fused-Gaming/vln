---
title: Layout Patterns
description: VLN responsive layout patterns — dashboard, card grids, sidebar, and container templates
---

> Migrated from Fused-Gaming/DevOps design-standards

---

## Standard Container

Max-width 1280px, centered, responsive padding:

```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {/* Page content */}
</div>
```

---

## Layout Patterns

### 1. Full-Width Section

```tsx
<section className="w-full py-12 sm:py-16 lg:py-24">
  <div className="container mx-auto px-4 sm:px-6">
    {/* Section content */}
  </div>
</section>
```

---

### 2. Card Grid

Responsive grid that scales from 1 → 2 → 3 columns:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
      {/* Card content */}
    </div>
  ))}
</div>
```

**Variations:**

```tsx
// 4-column stats grid
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

// 2-column (content + sidebar)
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">Main</div>
  <div>Sidebar</div>
</div>
```

---

### 3. Dashboard Layout (Sidebar + Main)

Stacks vertically on mobile, horizontal on tablet+:

```tsx
<div className="flex flex-col md:flex-row min-h-screen">
  <aside className="w-full md:w-64 shrink-0 bg-vln-bg-light border-r border-vln-sage/20">
    {/* Sidebar navigation */}
  </aside>
  <main className="flex-1 min-w-0 p-6">
    {/* Page content */}
  </main>
</div>
```

---

### 4. Split Layout (50/50 or 60/40)

Used for hero variants, OG image previews, feature sections:

```tsx
// Equal split
<div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
  <div className="flex-1">Left content</div>
  <div className="flex-1">Right content</div>
</div>

// 60/40 split
<div className="flex flex-col lg:flex-row gap-8">
  <div className="flex-[3]">Primary content (60%)</div>
  <div className="flex-[2]">Secondary content (40%)</div>
</div>
```

---

### 5. Hero Layout

Full-width with centered content and constrained text:

```tsx
<section className="relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden">
  <ICBoardBackground />
  <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        {/* Hero headline */}
      </h1>
      <p className="text-lg sm:text-xl text-vln-gray mb-8 max-w-2xl mx-auto">
        {/* Subheadline */}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* CTAs */}
      </div>
    </div>
  </div>
</section>
```

---

### 6. Form Layout

Single-column form, max-width constrained for readability:

```tsx
// Narrow form (contact, login)
<div className="max-w-lg mx-auto px-4">
  <form className="space-y-6">
    {/* Fields */}
  </form>
</div>

// Two-column form (booking)
<form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
  <div className="sm:col-span-2">
    {/* Full-width field */}
  </div>
  <div>{/* Half-width field */}</div>
  <div>{/* Half-width field */}</div>
</form>
```

---

### 7. Feature Alternating Layout

Alternating content/image sections:

```tsx
{features.map((feature, i) => (
  <div key={feature.id}
    className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 lg:gap-16`}>
    <div className="flex-1">
      {/* Text content */}
    </div>
    <div className="flex-1">
      {/* Visual / image */}
    </div>
  </div>
))}
```

---

## Spacing Reference

| Section type | Vertical padding |
|-------------|-----------------|
| Hero | `py-16 sm:py-24 lg:py-32` |
| Standard section | `py-12 sm:py-16 lg:py-24` |
| Compact section | `py-8 sm:py-12 lg:py-16` |
| Footer | `py-8 sm:py-12` |

---

## Z-Index Scale

| Layer | z-index | Usage |
|-------|---------|-------|
| Background | 0 | IC board, background elements |
| Content | 10 | Standard content |
| Sticky elements | 40 | Sticky header, scroll-to-top |
| Dropdowns | 50 | Dropdown menus |
| Modals | 100 | Modal overlays |
| Toast notifications | 200 | Toast/alert messages |
