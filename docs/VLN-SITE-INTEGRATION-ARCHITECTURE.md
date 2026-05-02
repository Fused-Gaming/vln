# VLN Standards Sites Integration Architecture

## 🎯 Integration Strategy

All three projects must be properly documented and consolidated into the main VLN standards sites with dedicated routes and complete documentation.

---

## 📍 Site Structure

### design.vln.gg Integration

```
design.vln.gg/
├── /                          # Core design system (existing)
│   ├── tokens/               # Core design tokens
│   ├── components/           # Shared components
│   └── guidelines/           # Design principles
│
├── /ace                       # ACE Blackjack Game Design System
│   ├── design-tokens/        # Game-specific color palette
│   ├── components/           # Game UI components
│   │   ├── game-board/
│   │   ├── card-designs/
│   │   ├── player-ui/
│   │   └── betting-interface/
│   ├── animations/           # Game animations and transitions
│   ├── icons/                # Game-specific iconography
│   └── examples/             # Gameplay visual examples
│
├── /skill                     # Skill-MCP Tools Design System
│   ├── design-tokens/        # Tool-specific design tokens
│   ├── components/           # Tool widget components
│   │   ├── tool-cards/
│   │   ├── control-panels/
│   │   ├── status-displays/
│   │   └── integration-widgets/
│   ├── patterns/             # UI patterns for tool integration
│   ├── accessibility/        # Tool accessibility guidelines
│   └── examples/             # Tool component showcase
│
└── /peraltacc                # Peralta Project Design System
    ├── design-tokens/        # Peralta-specific design tokens
    ├── components/           # Peralta components
    ├── layouts/              # Page layout patterns
    ├── typography/           # Text hierarchy and fonts
    └── visual-hierarchy/      # Design principles
```

### docs.vln.gg Integration

```
docs.vln.gg/
├── /                          # Core documentation (existing)
│   ├── getting-started/      # VLN overview
│   ├── architecture/         # System architecture
│   └── api-reference/        # Core APIs
│
├── /ace                       # ACE Blackjack Documentation
│   ├── overview/             # Game overview and rules
│   ├── game-mechanics/       # Detailed game mechanics
│   ├── api-reference/        # Game API endpoints
│   │   ├── player-api/
│   │   ├── betting-api/
│   │   ├── game-state-api/
│   │   └── event-api/
│   ├── integration-guide/    # How to integrate ACE
│   ├── deployment/           # Game deployment guide
│   ├── examples/             # Code examples and recipes
│   ├── troubleshooting/      # Common issues and solutions
│   └── faq/                  # Frequently asked questions
│
├── /skill                     # Skill-MCP Tools Documentation
│   ├── overview/             # Skill-MCP overview
│   ├── mcp-protocol/         # MCP protocol specification
│   ├── tool-reference/       # Individual tool documentation
│   │   ├── tool-1/
│   │   ├── tool-2/
│   │   └── [all tools]/
│   ├── api-reference/        # Tool API specifications
│   ├── integration-guide/    # How to integrate tools
│   ├── best-practices/       # Integration best practices
│   ├── examples/             # Tool usage examples
│   └── troubleshooting/      # Tool troubleshooting
│
└── /peraltacc                # Peralta Project Documentation
    ├── overview/             # Project overview
    ├── architecture/         # Technical architecture
    ├── implementation/       # Implementation guide
    ├── api-reference/        # API documentation
    ├── deployment/           # Deployment procedures
    ├── configuration/        # Configuration guide
    ├── examples/             # Usage examples
    ├── troubleshooting/      # Issue resolution
    └── pdf/                  # PDF export (printable)
        └── peraltacc-full-documentation.pdf
```

---

## 🔗 Cross-Project Navigation

All three projects accessible from:
1. **Main navigation** on design.vln.gg
   - "ACE" dropdown
   - "Skill Tools" dropdown
   - "Peralta" dropdown

2. **Main navigation** on docs.vln.gg
   - "ACE Game" section
   - "Skill Tools" section
   - "Peralta Project" section

3. **Search** functionality spans all three projects
   - Unified search across design.vln.gg
   - Unified search across docs.vln.gg

---

## 📋 Content Organization by Project

### ACE Blackjack (design.vln.gg/ace + docs.vln.gg/ace)

**Design System Content:**
- Card design specifications
- Game board UI components
- Player interface components
- Betting interface design
- Animation specifications
- Color palette (game-specific)
- Icon set (card suits, game actions)

**Documentation Content:**
- Game rules and mechanics
- Player API reference
- Betting system documentation
- Game state management
- Event handling guide
- Integration examples
- Deployment checklist

### Skill-MCP Tools (design.vln.gg/skill + docs.vln.gg/skill)

**Design System Content:**
- Tool card components
- Control panel designs
- Status display components
- Integration widget styles
- MCP protocol visual patterns
- Tool-specific color scheme
- Accessibility patterns

**Documentation Content:**
- MCP protocol specification
- Individual tool documentation
- Tool API reference
- Integration patterns
- Best practices guide
- Code examples
- Tool compatibility matrix

### Peralta Project (design.vln.gg/peraltacc + docs.vln.gg/peraltacc)

**Design System Content:**
- Design token definitions
- Component library
- Layout patterns
- Typography system
- Color palette
- Visual hierarchy guidelines

**Documentation Content:**
- Project overview
- Technical architecture
- Implementation guide
- API reference
- Deployment procedures
- Configuration guide
- Printable PDF documentation

---

## 🚀 Implementation Plan

### Phase 1: Site Structure Setup
- [ ] Create `/ace` route on design.vln.gg
- [ ] Create `/skill` route on design.vln.gg
- [ ] Create `/peraltacc` route on design.vln.gg
- [ ] Create `/ace` route on docs.vln.gg
- [ ] Create `/skill` route on docs.vln.gg
- [ ] Create `/peraltacc` route on docs.vln.gg

### Phase 2: Content Integration
- [ ] Migrate ACE content to design.vln.gg/ace
- [ ] Migrate Skill content to design.vln.gg/skill
- [ ] Migrate Peralta content to design.vln.gg/peraltacc
- [ ] Migrate ACE docs to docs.vln.gg/ace
- [ ] Migrate Skill docs to docs.vln.gg/skill
- [ ] Migrate Peralta docs to docs.vln.gg/peraltacc

### Phase 3: Navigation & Search
- [ ] Update main navigation menus
- [ ] Add breadcrumb navigation
- [ ] Implement unified search
- [ ] Add cross-project links
- [ ] Test navigation flows

### Phase 4: PDF Export (Peralta)
- [ ] Configure Docusaurus PDF generation
- [ ] Test single-document PDF export
- [ ] Validate print-friendly styling
- [ ] Generate final PDF

### Phase 5: Validation & Deployment
- [ ] Link integrity checks
- [ ] Accessibility audit (WCAG AA)
- [ ] SEO optimization
- [ ] Performance testing
- [ ] Production deployment

---

## 📊 Integration Checklist

### design.vln.gg
- [ ] ACE: Design tokens integrated
- [ ] ACE: Components documented
- [ ] ACE: Color palette defined
- [ ] Skill: Tool widgets displayed
- [ ] Skill: Integration patterns shown
- [ ] Peralta: Design system defined
- [ ] Peralta: Component library accessible
- [ ] Navigation updated
- [ ] Search working across all projects

### docs.vln.gg
- [ ] ACE: Game mechanics documented
- [ ] ACE: API reference complete
- [ ] ACE: Integration guide ready
- [ ] Skill: MCP protocol documented
- [ ] Skill: Tool reference complete
- [ ] Skill: Integration guide ready
- [ ] Peralta: Full documentation migrated
- [ ] Peralta: PDF export functional
- [ ] Navigation updated
- [ ] Search working across all projects

---

## 🎯 Success Criteria

✅ **All three projects accessible via dedicated routes**
- design.vln.gg/ace
- design.vln.gg/skill
- design.vln.gg/peraltacc
- docs.vln.gg/ace
- docs.vln.gg/skill
- docs.vln.gg/peraltacc

✅ **Complete design system documentation for each project**
- Design tokens defined and documented
- Components showcased with examples
- Color palettes specified
- Accessibility guidelines included

✅ **Complete technical documentation for each project**
- Overview and getting started
- API reference
- Integration guides
- Troubleshooting guides
- Code examples

✅ **Unified navigation and search**
- Main navigation includes all projects
- Search spans all content
- Breadcrumbs show current location
- Cross-project links work

✅ **PDF export for Peralta**
- Single comprehensive PDF
- Includes full documentation
- Print-friendly formatting
- Proper table of contents

---

## 📝 Next Actions

1. **Consolidate agent outputs** - Gather scaffolding from all three agents
2. **Create route structures** - Set up /ace, /skill, /peraltacc on both sites
3. **Migrate content** - Move design tokens and documentation to proper locations
4. **Update navigation** - Add menu items and links for all projects
5. **Test integration** - Verify all links, search, and cross-references
6. **Deploy to production** - Push to design.vln.gg and docs.vln.gg

---

**Status:** Ready for implementation  
**Created:** 2026-04-28  
**Target Completion:** 2026-05-05
