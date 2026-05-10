# VLN Complete Directory Tree Structure

Complete file and directory structure for the VLN project including all three newly scaffolded projects.

---

## 📁 Full Project Structure

```
/home/user/vln/
│
├── 📄 README.md                              # Project overview
├── 📄 CLAUDE.md                              # Claude Code guidelines
├── 📄 package.json                           # NPM configuration
├── 📄 pnpm-workspace.yaml                    # Monorepo configuration
├── 📄 .gitignore                             # Git ignore rules
│
├── 📚 docs/                                  # Documentation
│   ├── 📄 DESIGN-SYSTEM-GETTING-STARTED.md  # Design system entry point
│   ├── 📄 DOCUMENTATION-GETTING-STARTED.md  # Documentation entry point
│   ├── 📄 VLN-SITE-INTEGRATION-ARCHITECTURE.md
│   ├── design/
│   │   ├── mockups/
│   │   ├── flows/
│   │   ├── tokens/
│   │   └── STATUS.md
│   ├── devops/
│   │   ├── workflows/
│   │   ├── deployment/
│   │   └── scripts/
│   ├── planning/
│   ├── technical/
│   └── guides/
│
├── 📦 .claude/                               # Claude Code configuration
│   ├── README.md
│   ├── settings.local.json
│   ├── local-docs/                          # Local documentation
│   │   ├── VLN-SYSTEM-PROMPT.md
│   │   ├── VLN-QUICK-REFERENCE.txt
│   │   ├── VLN-IMPLEMENTATION-GUIDE.md
│   │   ├── VLN-MASTER-SUMMARY.md
│   │   ├── VLN-GETTING-STARTED.md
│   │   ├── vln-deploy.sh
│   │   └── project-scaffolds/
│   │       ├── INTEGRATION-MASTER-PLAN.md
│   │       └── VLN-SITE-INTEGRATION-ARCHITECTURE.md
│   └── sessions/                            # Session cache (git-ignored)
│
├── 🎨 design-site/                          # Design system site (Astro)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.astro                  # Homepage
│   │   │   ├── ace/                         # ACE design system
│   │   │   │   ├── index.astro
│   │   │   │   ├── components.astro
│   │   │   │   ├── tokens.astro
│   │   │   │   └── [...slug].astro
│   │   │   ├── skill/                       # Skill tools design
│   │   │   │   ├── index.astro
│   │   │   │   ├── components.astro
│   │   │   │   └── [...slug].astro
│   │   │   ├── peraltacc/                   # Peralta design
│   │   │   │   ├── index.astro
│   │   │   │   ├── components.astro
│   │   │   │   └── [...slug].astro
│   │   │   └── [...slug].astro
│   │   ├── layouts/
│   │   ├── components/
│   │   └── styles/
│   ├── public/
│   ├── astro.config.mjs
│   └── package.json
│
├── 📖 docs-site/                            # Documentation site (Astro)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.astro                  # Homepage
│   │   │   ├── ace/                         # ACE documentation
│   │   │   │   ├── index.astro
│   │   │   │   ├── overview.astro
│   │   │   │   ├── game-mechanics.astro
│   │   │   │   ├── api-reference/
│   │   │   │   ├── integration-guide.astro
│   │   │   │   ├── examples.astro
│   │   │   │   └── [...slug].astro
│   │   │   ├── skill/                       # Skill documentation
│   │   │   │   ├── index.astro
│   │   │   │   ├── overview.astro
│   │   │   │   ├── mcp-protocol.astro
│   │   │   │   ├── tool-reference/
│   │   │   │   ├── api-reference/
│   │   │   │   ├── integration-guide.astro
│   │   │   │   ├── best-practices.astro
│   │   │   │   └── [...slug].astro
│   │   │   ├── peraltacc/                   # Peralta documentation
│   │   │   │   ├── index.astro
│   │   │   │   ├── overview.astro
│   │   │   │   ├── architecture.astro
│   │   │   │   ├── api-reference/
│   │   │   │   ├── deployment.astro
│   │   │   │   ├── configuration.astro
│   │   │   │   ├── pdf.astro
│   │   │   │   └── [...slug].astro
│   │   │   └── [...slug].astro
│   │   ├── layouts/
│   │   ├── components/
│   │   └── styles/
│   ├── public/
│   ├── astro.config.mjs
│   └── package.json
│
├── 🎮 app/                                  # Main Next.js app
│   ├── (site)/
│   │   ├── page.tsx                         # Landing page
│   │   └── layout.tsx
│   ├── demo/
│   │   ├── blackjack/                       # ACE Blackjack game
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   └── ...
│   ├── api/
│   │   ├── blackjack/                       # ACE API routes
│   │   │   ├── route.ts
│   │   │   └── [action]/route.ts
│   │   ├── skills/                          # Skill-MCP API routes
│   │   │   ├── route.ts
│   │   │   └── [toolId]/route.ts
│   │   ├── peralta/                         # Peralta API routes
│   │   │   ├── route.ts
│   │   │   └── [endpoint]/route.ts
│   │   └── ...
│   └── layout.tsx
│
├── 🎨 components/                           # React components
│   ├── ui/                                  # Shadcn/UI components
│   ├── vln/                                 # Custom VLN components
│   ├── games/
│   │   └── blackjack/                       # ACE Blackjack components
│   │       ├── GameBoard.tsx
│   │       ├── Card.tsx
│   │       ├── Hand.tsx
│   │       ├── ActionButtons.tsx
│   │       ├── BetControls.tsx
│   │       └── [...25+ more components]
│   ├── skill-tools/                         # Skill-MCP components
│   │   ├── ToolCard.tsx
│   │   ├── ToolDashboard.tsx
│   │   ├── ControlPanel.tsx
│   │   └── [...]
│   └── icons/
│
├── 🛠️ lib/                                  # Utilities and helpers
│   ├── games/
│   │   └── blackjack/                       # ACE game logic
│   │       ├── engine.ts
│   │       ├── hand.ts
│   │       ├── deck.ts
│   │       ├── dealer.ts
│   │       ├── payouts.ts
│   │       ├── insurance.ts
│   │       ├── rng.ts
│   │       └── [...]
│   ├── skill-tools/                         # Skill-MCP logic
│   │   ├── mcp-protocol.ts
│   │   ├── tool-registry.ts
│   │   ├── api-client.ts
│   │   └── [...]
│   ├── utils/
│   ├── validation/
│   └── email/
│
├── 🎯 hooks/                                # Custom React hooks
│   ├── games/
│   │   ├── useBlackjack.ts
│   │   ├── useHand.ts
│   │   ├── usePayout.ts
│   │   ├── useAnimation.ts
│   │   └── [...]
│   └── [...]
│
├── 🎨 styles/                               # Global styles
│   ├── globals.css
│   ├── games/
│   │   └── blackjack.css
│   ├── skill-tools.css
│   └── peralta.css
│
├── 📁 public/                               # Static assets
│   ├── vln-logo-dark.svg
│   ├── vln-logo-light.svg
│   ├── games/
│   │   └── blackjack/
│   │       ├── cards/
│   │       │   ├── card-♠-A.svg
│   │       │   ├── card-♥-A.svg
│   │       │   └── [...52 card SVGs]
│   │       ├── chips/
│   │       │   ├── chip-5.svg
│   │       │   ├── chip-10.svg
│   │       │   └── [...]
│   │       └── backgrounds/
│   ├── skill-tools/
│   │   └── [tool icons and assets]
│   └── peralta/
│       └── [brand assets]
│
├── 🧪 __tests__/                            # Test files
│   ├── games/
│   │   └── blackjack/
│   │       ├── hand.test.ts
│   │       ├── deck.test.ts
│   │       ├── dealer.test.ts
│   │       ├── payouts.test.ts
│   │       └── [...12+ test files]
│   ├── components/
│   └── hooks/
│
├── 🎯 prisma/                               # Database schema
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── 🚀 scripts/                              # Utility scripts
│   ├── db-init.ts
│   └── [...]
│
├── 🎮 peralta-docs/                         # Peralta Docusaurus site
│   ├── docs/                                # 33 documentation pages
│   │   ├── getting-started/
│   │   ├── architecture/
│   │   ├── implementation/
│   │   ├── api-reference/
│   │   ├── deployment/
│   │   └── faq/
│   ├── src/
│   │   ├── css/
│   │   │   └── custom.css                   # VLN branding (1,250+ lines)
│   │   ├── pages/
│   │   └── components/
│   ├── scripts/
│   │   └── generate-pdf.js                  # PDF generation
│   ├── sidebars.js
│   ├── docusaurus.config.js
│   ├── package.json
│   └── README.md
│
├── 📋 .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   ├── preview.yml
│   │   └── security-scan.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
└── 🔧 [config files]
    ├── next.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    ├── eslint.config.js
    ├── vitest.config.ts
    └── [...]
```

---

## 🌐 Site-Specific Structures

### design.vln.gg Routes
```
/                          # Core design system
/ace                       # ACE Blackjack design
/skill                     # Skill-MCP tools design
/peraltacc                 # Peralta design system
```

### docs.vln.gg Routes
```
/                          # Core documentation
/ace                       # ACE Blackjack docs
/skill                     # Skill-MCP tools docs
/peraltacc                 # Peralta docs + PDF
```

---

## 📊 Statistics

- **Total Directories:** 40+
- **Total Files:** 200+
- **Documentation Pages:** 51+ pages
- **Test Files:** 12+
- **React Components:** 80+
- **API Routes:** 15+
- **Design Tokens:** 136+

---

## 🔗 Key Integrations

All three projects (ACE, Skill-MCP, Peralta) are integrated into:
1. **design.vln.gg** - Shared design tokens and components
2. **docs.vln.gg** - Unified technical documentation
3. **Main app** - Cross-project features and APIs

---

**Structure Updated:** 2026-04-28  
**Ready for:** Phase 1 implementation (creating routes and content migration)
