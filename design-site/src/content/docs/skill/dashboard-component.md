---
title: "Tool Dashboard Component"
description: "Multi-view dashboard for displaying and managing tools with filtering and search"
---

# Tool Dashboard Component

The Tool Dashboard provides a comprehensive view of all available tools with multiple viewing modes, filtering, and search capabilities.

## Component Overview

The Tool Dashboard is the primary interface for tool discovery and management. It supports three distinct view modes (Grid, List, Kanban) and provides powerful filtering and search functionality to help users find and manage tools effectively.

## Specifications

### Container
- **Width:** Full viewport width with max 1280px on desktop
- **Height:** Viewport height - header (100vh - 64px)
- **Padding:** 24px (desktop), 16px (tablet), 12px (mobile)
- **Background:** #0f0f0f (vln-bg)

### Tool Count Display
- **Position:** Top left, below header
- **Format:** "28 tools available"
- **Font:** 14px, 400 weight, bluegray color

## View Modes

### 1. Grid View

Traditional card grid layout, best for visual scanning and overview.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ [Filter] [Search] [View: Grid List Kanban]     │
├─────────────────────────────────────────────────┤
│ [Tool] [Tool] [Tool]                            │
│ [Tool] [Tool] [Tool]                            │
│ [Tool] [Tool] [Tool]                            │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- **Desktop (1024px+):** 3 columns
- **Tablet (640px-1024px):** 2 columns
- **Mobile (<640px):** 1 column
- **Card Width:** Responsive to container
- **Card Height:** 200px fixed
- **Gap:** 16px between cards
- **Padding:** 24px container padding

**Features:**
- Hover scale animation (1.02)
- Smooth transitions (150ms)
- Responsive card sizing
- Scroll to load more

### 2. List View

Detailed list with inline information and actions.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ [Icon] Tool Name      Ready      [⋮] [Open]   │
│        Tool description goes here...            │
├─────────────────────────────────────────────────┤
│ [Icon] Another Tool   Running    [⋮] [Open]   │
│        Tool description goes here...            │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- **Item Height:** 80px (includes description)
- **Padding:** 16px per item
- **Border:** 1px solid #2a2a2a between items
- **Icon Size:** 32px
- **Text Layout:** 2-line (title + description)
- **Status Width:** 100px right-aligned
- **Action Buttons:** 44px wide, right side

**Features:**
- Sortable by name, status, category
- Inline status indicators
- Quick action buttons
- Expand/collapse details

### 3. Kanban View

Status-based column layout for tracking tool states.

**Layout:**
```
┌──────────────┬──────────────┬──────────────┐
│ Ready (12)   │ Running (2)  │ Error (1)    │
├──────────────┼──────────────┼──────────────┤
│ [Tool 1]     │ [Tool 15]    │ [Tool 25]    │
│ [Tool 2]     │ [Tool 18]    │              │
│ [Tool 3]     │              │              │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Specifications:**
- **Column Count:** 3 (Ready, Running, Error)
- **Column Width:** Responsive, equal distribution
- **Column Gap:** 16px
- **Column Header Height:** 44px
- **Card Height in Column:** 120px
- **Card Gap:** 12px within column
- **Drag & Drop:** Supported (future)

**Features:**
- Grouped by status
- Count badges per column
- Scroll within columns
- Quick status overview
- Color-coded columns

## Filtering System

### Filter Panel

Located above tool display, accessible via toggle button.

```
┌─────────────────────────────────────────┐
│ [Show Filters ▼]                        │
├─────────────────────────────────────────┤
│ Category                                │
│ ☑ Security        ☑ Analysis            │
│ ☑ Automation      ☑ Integration         │
│ ☑ Monitoring      ☐ (unused)            │
│                                         │
│ Status                                  │
│ ☑ Ready           ☑ Running             │
│ ☑ Error           ☑ Disabled            │
│                                         │
│ [Clear All] [Apply Filters]            │
└─────────────────────────────────────────┘
```

**Specifications:**
- **Panel Width:** Full width (mobile), 300px (desktop sidebar)
- **Layout:** Collapsible sections
- **Background:** #1a1a1a
- **Border:** 1px solid #2a2a2a
- **Animation:** Slide in/out (250ms)

### Available Filters

**By Category:**
- Security Tools
- Analysis Tools
- Automation Tools
- Integration Tools
- Monitoring Tools

**By Status:**
- Ready (available)
- Running (executing)
- Error (failed)
- Disabled (unavailable)

**By Custom Tags:**
- Requires authentication
- Rate limited
- Experimental
- Deprecated

## Search Functionality

### Search Bar

Prominent search input above tool grid/list.

```
┌─────────────────────────────────┐
│ [🔍] Search tools... [✕]       │
└─────────────────────────────────┘
```

**Specifications:**
- **Width:** 100% (desktop: max 600px)
- **Height:** 44px
- **Padding:** 12px left, 12px right
- **Icon:** 20px, left side
- **Clear Button:** Visible when text entered
- **Placeholder:** "Search by name or description..."

**Search Features:**
- Real-time search
- Case-insensitive
- Searches: name, description, category, ID
- Highlights matched terms
- Shows result count
- Clear with Escape key

### Search Results

Results update dynamically as user types:

```
Searching for "security"
Found 8 tools:
- Security Scanner (security)
- Security Checker (security)
- API Security (security)
...
```

## Toolbar

Controls and information above tool display.

```
┌─────────────────────────────────────────┐
│ [≡ Filters] [Search...] [Grid] [List]  │
│ 28 tools found (4 of 10 shown)          │
└─────────────────────────────────────────┘
```

**Elements (Left to Right):**
1. **Filter Toggle:** Opens/closes filter panel
2. **Search Input:** Real-time tool search
3. **View Selector:** Toggle between Grid/List/Kanban
4. **Results Count:** Shows found/displayed/total
5. **Sort Dropdown:** Sort by name, status, category
6. **Action Menu:** Additional options (⋮)

**Specifications:**
- **Height:** 56px
- **Background:** #0f0f0f with border bottom
- **Padding:** 12px sides, 8px top/bottom
- **Border:** 1px solid #2a2a2a/20

## Responsive Behavior

### Desktop (1024px+)
- **Layout:** Side filters + main content
- **Filter Panel:** 300px sidebar (collapsible)
- **Tool Grid:** 3 columns
- **Search:** 600px max width
- **Toolbar:** Full width, horizontal layout

### Tablet (640px - 1024px)
- **Layout:** Top filters, slide-out panel
- **Filter Panel:** Full-width modal on top
- **Tool Grid:** 2 columns
- **Search:** Full width
- **Toolbar:** Responsive, wraps if needed

### Mobile (<640px)
- **Layout:** Filters accessible via menu
- **Filter Panel:** Bottom sheet or modal
- **Tool Grid:** 1 column, full width
- **Search:** Full width, stacked layout
- **Toolbar:** Vertical stacking

## Pagination & Lazy Loading

### Infinite Scroll
Default loading behavior:

```
[Tool 1]
[Tool 2]
...
[Tool 28]
[Loading spinner...]
[Tool 29] (loaded on scroll)
```

**Specifications:**
- **Trigger:** 200px from bottom
- **Batch Size:** 20 tools per load
- **Animation:** Fade in (200ms)
- **Loader:** Centered spinner + text

### Pagination (Alternative)

```
┌─────────────────────────────────┐
│ Page: [1] [2] [3] [4]    Next → │
│ Showing 1-20 of 28 tools        │
└─────────────────────────────────┘
```

## Empty States

### No Tools Found
When no tools match filters/search:

```
┌─────────────────────────────────┐
│           No tools found         │
│     Try adjusting your filters   │
│                                 │
│ [Clear Filters] [Browse All]   │
└─────────────────────────────────┘
```

### Loading State
Initial page load:

```
┌─────────────────────────────────┐
│   [Loading skeleton card]       │
│   [Loading skeleton card]       │
│   [Loading skeleton card]       │
└─────────────────────────────────┘
```

## Accessibility

### Keyboard Navigation
```
Tab:        Move to next tool/control
Shift+Tab:  Move to previous
Enter:      Open selected tool
Space:      Toggle filter checkbox
Escape:     Close filter panel
/           Focus search input
```

### Screen Reader Support
```jsx
<div
  role="region"
  aria-label="Available tools"
  aria-live="polite"
>
  {tools.map(tool => (
    <article
      key={tool.id}
      role="button"
      tabIndex={0}
      aria-label={`${tool.name}, ${tool.status}`}
      aria-describedby={`tool-desc-${tool.id}`}
    >
      {tool.name}
      <p id={`tool-desc-${tool.id}`}>{tool.description}</p>
    </article>
  ))}
</div>
```

### WCAG Compliance
- ✅ Keyboard accessible (Tab, Enter, Space)
- ✅ Focus indicators visible
- ✅ ARIA labels for regions
- ✅ Live regions for search results
- ✅ Color contrast 4.5:1 minimum
- ✅ Touch targets 44px minimum

## Performance

### Optimization Techniques
- **Virtual Scrolling:** Only render visible cards (large lists)
- **Lazy Loading:** Load images on demand
- **Memoization:** Cache filter/search results
- **Debounced Search:** 300ms delay between searches
- **Code Splitting:** Load views dynamically

### Target Performance
- **First Paint:** < 1s
- **Tool Display:** < 500ms
- **Search:** < 200ms
- **Filter Apply:** < 300ms
- **View Switch:** < 150ms

## Interactive Examples

### Basic Dashboard

```jsx
<ToolDashboard
  tools={tools}
  view="grid"
  onSelectTool={(tool) => openTool(tool.id)}
/>
```

### With Filters

```jsx
<ToolDashboard
  tools={tools}
  view="list"
  filters={{
    categories: ['security', 'automation'],
    status: ['ready']
  }}
  onFilterChange={handleFilterChange}
/>
```

### Kanban View

```jsx
<ToolDashboard
  tools={tools}
  view="kanban"
  groupBy="status"
  draggable={true}
  onToolMove={handleMove}
/>
```

## Design Tokens

```css
/* Dashboard Layout */
--dashboard-width: 100%;
--dashboard-max-width: 1280px;
--dashboard-padding: 24px;
--dashboard-gap: 16px;

/* Grid View */
--grid-columns-desktop: 3;
--grid-columns-tablet: 2;
--grid-columns-mobile: 1;
--grid-gap: 16px;
--grid-item-height: 200px;

/* List View */
--list-item-height: 80px;
--list-item-padding: 16px;
--list-gap: 0px; /* Items have border-bottom */

/* Kanban View */
--kanban-columns: 3;
--kanban-column-gap: 16px;
--kanban-card-height: 120px;
--kanban-card-gap: 12px;

/* Toolbar */
--toolbar-height: 56px;
--toolbar-padding: 12px;
--toolbar-gap: 12px;

/* Filter Panel */
--filter-width-desktop: 300px;
--filter-width-mobile: 100%;
--filter-gap: 16px;
```

## Testing Checklist

- [ ] All view modes render correctly
- [ ] Responsive at all breakpoints
- [ ] Search works in real-time
- [ ] Filters apply and clear correctly
- [ ] Sorting options work
- [ ] Pagination/infinite scroll works
- [ ] Keyboard navigation functional
- [ ] Focus indicators visible
- [ ] Screen reader announces tools
- [ ] Empty states display correctly
- [ ] Loading states smooth
- [ ] Performance targets met (Lighthouse)
- [ ] Accessibility audit passes

---

**Component Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
