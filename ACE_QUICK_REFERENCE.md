# ACE Blackjack Content - Quick Reference

## 🎯 Access Points

### Design System
```
URL: /internal/ace-design-system
```
Visual reference for colors, components, and design tokens.

### Documentation Hub
```
Base URL: /docs/ace-blackjack/
```

| Page | URL | Purpose |
|------|-----|---------|
| Overview | `/docs/ace-blackjack/overview` | Game rules & mechanics |
| Getting Started | `/docs/ace-blackjack/getting-started` | Setup & initialization |
| API Reference | `/docs/ace-blackjack/api-reference` | Method documentation |
| Integration Guide | `/docs/ace-blackjack/integration-guide` | Component patterns |
| Code Examples | `/docs/ace-blackjack/code-examples` | Working code samples |
| FAQ | `/docs/ace-blackjack/faq` | Q&A & troubleshooting |

---

## 📁 File Locations

**Documentation:**
```
app/docs/ace-blackjack/
├── overview/content.mdx
├── getting-started/content.mdx
├── api-reference/content.mdx
├── integration-guide/content.mdx
├── code-examples/content.mdx
└── faq/content.mdx
```

**Design System:**
```
app/internal/ace-design-system/page.tsx
```

**Configuration:**
```
lib/docs/sitemap.ts (ace-blackjack section added)
```

---

## 🚀 Getting Started

### For Designers
1. Visit `/internal/ace-design-system`
2. Review color palette and component library
3. Use VLN Tailwind colors (see design page)

### For Developers
1. Start at `/docs/ace-blackjack/overview` (understand game)
2. Read `/docs/ace-blackjack/getting-started` (setup)
3. Reference `/docs/ace-blackjack/api-reference` (methods)
4. Follow `/docs/ace-blackjack/integration-guide` (patterns)
5. Check code examples and FAQ for specifics

### For Integration
1. Install: `npm install @vln/ace-blackjack`
2. Initialize: See Getting Started guide
3. Build UI: Reference component examples
4. Handle events: See event listener patterns
5. Test: Use testing examples

---

## 📚 Content Overview

| Section | Lines | Topics |
|---------|-------|--------|
| Overview | 430+ | Rules, payouts, game flow |
| Getting Started | 380+ | Setup, config, initialization |
| API Reference | 540+ | 18 methods + events |
| Integration | 490+ | Components, state, patterns |
| Code Examples | 380+ | 15+ working examples |
| FAQ | 460+ | 30+ Q&A + troubleshooting |

**Total: 2,697 lines of documentation + 372 lines of design system code**

---

## 🎨 Color System

**Core VLN Colors** (from Tailwind):
- `bg-vln-sage` - Primary action (#86d993)
- `bg-vln-bluegray` - Secondary action (#7dd3fc)
- `bg-vln-amber` - Highlights/wins (#fbbf24)
- `bg-vln-bg` - Background (#0a0e0f)

**Game Colors**:
- `bg-emerald-900` - Table felt background

Use in components:
```tsx
<button className="bg-vln-sage text-vln-bg">Action</button>
```

---

## 🔌 API Quick Overview

**Main Classes:**
- `ACEGame` - Main game engine
- Configuration interface for setup

**Core Methods:**
- `initialize()` - Setup game
- `placeBet()` - Place wager
- `deal()` - Deal cards
- `hit()`, `stand()`, `doubleDown()`, `split()` - Player actions
- `getGameState()`, `getPlayer()`, `getOutcome()` - State inspection

**Events:**
- `gameStart`, `dealCards`, `playerAction`, `dealerAction`
- `gameEnd`, `balanceUpdate`, `error`

Subscribe:
```typescript
game.on('gameEnd', (result) => {
  console.log('Payout:', result.payout);
});
```

---

## 📱 Responsive Breakpoints

From Tailwind config:
- `sm: 640px` - Small screens
- `md: 768px` - Medium screens
- `lg: 1024px` - Large screens
- `xl: 1280px` - Extra large

---

## ✅ Verified Status

- [x] All documentation pages created
- [x] Design system page created
- [x] Sitemap integration complete
- [x] Sidebar navigation working
- [x] Production build passes
- [x] TypeScript validation passes
- [x] All 6 doc pages render correctly
- [x] Mobile responsive verified
- [x] Color system integrated

---

## 🔗 Related Files

- **CLAUDE.md** - Project guidelines
- **BRANDING.md** - VLN brand specifications
- **tailwind.config.ts** - Color token definitions
- **ACE_CONTENT_INTEGRATION.md** - Detailed integration guide
- **ACE_CONTENT_DELIVERY_SUMMARY.md** - Complete delivery report

---

## 💡 Tips

1. **Color Tokens**: Always use VLN colors from Tailwind, not arbitrary Hex values
2. **Responsive**: Design mobile-first with Tailwind breakpoints
3. **Accessibility**: Check WCAG AA contrast ratios
4. **Events**: Always clean up event listeners in useEffect cleanup
5. **State**: Use memoization for expensive computations
6. **Testing**: Use fixed RNG seeds for reproducible tests

---

## 🆘 Need Help?

- **Game Rules?** → Read `/docs/ace-blackjack/overview`
- **Setup Issues?** → Check `/docs/ace-blackjack/getting-started`
- **API Questions?** → Reference `/docs/ace-blackjack/api-reference`
- **Integration Help?** → Follow `/docs/ace-blackjack/integration-guide`
- **Code Examples?** → Browse `/docs/ace-blackjack/code-examples`
- **Troubleshooting?** → Search `/docs/ace-blackjack/faq`

---

## 📊 Statistics

- **Total Content**: 3,069 lines
- **Documentation**: 2,697 lines
- **Design System**: 372 lines
- **Pages**: 6 documentation + 1 design system
- **Code Examples**: 15+
- **API Methods**: 18
- **Event Types**: 7
- **FAQ Entries**: 30+

---

## 🎯 Next Steps

1. Build passes: ✓
2. Content published: ✓
3. Integration complete: ✓
4. Ready for design team: ✓
5. Ready for development team: ✓
6. Ready for deployment: ✓

Deploy when ready with `pnpm build && pnpm start`
