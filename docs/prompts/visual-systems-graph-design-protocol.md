# Visual Systems & Graph Design Protocol

> Stashed prompt for reuse in Claude Code sessions.
> Reference gist: https://gist.github.com/jlucus/372ac1ee1ca8ade67661ebdc525722dc
>
> **Last Used:** 2026-02-13 (v0.11.0 OG Image System implementation)
> **Improvements:** Added subdomain coverage section, docs.vln.gg pattern, rebase-first conflict strategy

---

## Prompt

When generating visual system documentation, diagram systems, or graph-based architecture artifacts, follow this protocol:

### Mermaid Diagram Requirements

Always include the following diagram types where relevant:

1. **`gitGraph`** — Branch and merge strategies
   ```mermaid
   gitGraph
     commit id: "init"
     branch feature/og-system
     checkout feature/og-system
     commit id: "feat: add OG routes"
     commit id: "fix: edge runtime"
     checkout main
     merge feature/og-system
   ```

2. **`sequenceDiagram`** — Request/response flows, API interactions
   ```mermaid
   sequenceDiagram
     participant Browser
     participant NextJS
     participant EdgeRuntime
     Browser->>NextJS: GET /api/og?title=Docs&subdomain=docs
     NextJS->>EdgeRuntime: Route to edge handler
     EdgeRuntime->>EdgeRuntime: Load fonts (Inter + JetBrains Mono)
     EdgeRuntime-->>Browser: ImageResponse 1200x630 PNG
   ```

3. **`flowchart TD`** — Decision trees, generation strategies
   ```mermaid
   flowchart TD
     A[Request URL] --> B{Convention-based route?}
     B -->|Yes| C[opengraph-image.tsx per route]
     B -->|No| D{API endpoint?}
     D -->|/api/og| E[Generic dynamic OG]
     D -->|/api/og/design| F[design.vln.gg dedicated]
     D -->|/api/og/docs| G[docs.vln.gg dedicated]
   ```

4. **`graph LR`** — Subdomain/architecture topology
   ```mermaid
   graph LR
     A[vln.gg] -->|Next.js convention| B[opengraph-image.tsx × 7]
     A -->|API route| C[/api/og generic]
     A -->|API route| D[/api/og/design]
     A -->|API route| E[/api/og/docs]
     D -->|serves| F[design.vln.gg]
     E -->|serves| G[docs.vln.gg]
     C -->|serves| H[*.vln.gg via query params]
   ```

---

### ASCII Wireframe Requirements

For every OG image variant, produce an 80-column ASCII wireframe at 1200×630 logical proportions:

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  [LOGO MARK]  VLN                              [SUBDOMAIN BADGE optional]   ║
║  ─────────────────────────────────────────────────────────────────────────  ║
║                                                                             ║
║   [V] VLN                              ┌─────────────────────────────────┐  ║
║                                        │  COLOR PALETTE                  │  ║
║   Page / Section Title                 │  ● Sage  ● Blue  ● Amber  ● Pur │  ║
║   ─────────────────────────            │                                 │  ║
║   Subtitle or tagline text             │  TYPOGRAPHY                     │  ║
║                                        │  Aa Inter                       │  ║
║   ┌─ domain.vln.gg ─────────────┐      │  01 JetBrains Mono              │  ║
║   └──────────────────────────────┘     │                                 │  ║
║                                        │  12px │ AAA │ 4px               │  ║
║                                        └─────────────────────────────────┘  ║
║  ─────────────────────────────────────────────────────────────────────────  ║
║  Powered by Fused Gaming                               domain.vln.gg        ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

**Wireframe rules:**
- Show all 4 brand accent colors and their semantic roles
- Label every interactive zone (CTAs, badges, URL chips)
- Include circuit trace SVG decoration positions
- Annotate glow radii and opacity levels

---

### Documentation Hosting Protocol

All visual system artifacts must be:

1. **Co-located with code** — `docs/design/` for design artifacts, `docs/prompts/` for reusable prompts
2. **Version-tagged** — Include `Last Updated` and version that introduced the artifact
3. **Linked bidirectionally** — README → artifact, artifact → README
4. **Mermaid-first** — Prefer Mermaid over static images; static images for pixel-exact previews only

### File Naming Conventions

```
docs/design/og-images.md          # OG image system wireframes + architecture
docs/design/ROUTES_AND_ELEMENTS.md # Route/element inventory
docs/prompts/<slug>.md             # Reusable prompt stashes (this pattern)
```

---

### OG Image Implementation Checklist

When implementing OG images for a new subdomain or route:

- [ ] Identify accent color (sage=main/green, blue=docs/api, amber=emergency/alerts, purple=design/premium)
- [ ] Draft ASCII wireframe in `docs/design/og-images.md`
- [ ] Choose route type:
  - Convention-based (`app/[route]/opengraph-image.tsx`) for Next.js pages
  - Dedicated API (`app/api/og/[subdomain]/route.tsx`) for external subdomains
  - Generic API (`/api/og?subdomain=x&title=y`) for low-traffic/dynamic subdomains
- [ ] Add `export const runtime = "edge"` and `export const dynamic = "force-dynamic"`
- [ ] Load fonts via `loadInterFont()` and `loadJetBrainsFont()` from `lib/og/utils.ts`
- [ ] Use design tokens from `OG_COLORS` — never hardcode hex values
- [ ] Test at `http://localhost:3000/[route]` in Next.js dev (or `/api/og/[subdomain]`)
- [ ] Update `docs/design/og-images.md` with new wireframe + Mermaid coverage diagram
- [ ] Update `docs/design/ROUTES_AND_ELEMENTS.md` OG table
- [ ] Update CHANGELOG.md with version entry

---

### Subdomain OG Coverage Map

| Subdomain | Route | Accent | Status |
|-----------|-------|--------|--------|
| vln.gg | `app/opengraph-image.tsx` | Rainbow | ✅ v0.11.0 |
| vln.gg/services | `app/services/opengraph-image.tsx` | Multi | ✅ v0.11.0 |
| vln.gg/contact | `app/contact/opengraph-image.tsx` | Sage | ✅ v0.11.0 |
| vln.gg/about | `app/about/opengraph-image.tsx` | Multi | ✅ v0.11.0 |
| vln.gg/pricing | `app/pricing/opengraph-image.tsx` | Sage | ✅ v0.11.0 |
| vln.gg/blog | `app/blog/opengraph-image.tsx` | Blue | ✅ v0.11.0 |
| vln.gg/faq | `app/faq/opengraph-image.tsx` | Sage | ✅ v0.11.0 |
| design.vln.gg | `app/api/og/design/route.tsx` | Purple | ✅ v0.11.0 |
| docs.vln.gg | `app/api/og/docs/route.tsx` | Blue | ✅ v0.11.0 |
| *.vln.gg (generic) | `app/api/og/route.tsx?subdomain=x` | Configurable | ✅ v0.11.0 |

---

### Conflict Resolution Strategy (Git)

When multiple branches modify the same versioned file (CHANGELOG.md, package.json, ROADMAP.md):

1. **Fetch first** — always `git fetch origin` before starting work
2. **Check for overlap** — `git diff origin/main...branch --name-only` on all active branches
3. **Version ahead** — if another branch owns `v0.x.0`, claim `v0.x+1.0`
4. **Rebase, don't merge** — `git rebase origin/<other-branch>` to change common ancestor and eliminate 3-way conflicts
5. **Simulate both directions** before pushing:
   ```bash
   # Test: other branch merged first, then ours
   git checkout -b test/sim origin/main
   git merge --no-ff origin/<other-branch> -m "sim"
   git merge --no-commit --no-ff <our-branch>
   # EXIT: 0 = clean
   ```

---

*© 2025 VLN - Fused Gaming. Internal use only.*
