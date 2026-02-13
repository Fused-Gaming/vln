# Claude Agent Task Prompt — DevOps Docusaurus OG & Design System

> Use this prompt when starting a Claude Code session in the `Fused-Gaming/DevOps` repository.
> Copy the block below verbatim as your first message to the agent.

---

## Task Prompt (copy → paste into new Claude Code session in Fused-Gaming/DevOps)

```
You are updating the Fused Gaming DevOps repository which hosts two Docusaurus sites:

  - design.vln.gg  — VLN Design System (Docusaurus, Active)
  - docs.vln.gg    — VLN Documentation Hub (Docusaurus, Planned / scaffold only)

## Your Objectives

1. **Add Open Graph metadata** to both Docusaurus sites pointing to the deployed
   VLN Next.js OG image API endpoints:
     - design.vln.gg  → https://vln.gg/api/og/design
     - docs.vln.gg    → https://vln.gg/api/og/docs?title={page_title}&accent=blue

2. **Update the design.vln.gg Docusaurus site** to document the VLN OG Image System
   (the system that was built in the vln.gg Next.js repo). Add a new doc page at:
     docs/og-images.md
   This page should mirror the content from the source of truth in the vln.gg repo:
   https://github.com/Fused-Gaming/vln/blob/main/docs/design/og-images.md
   including all ASCII wireframes, Mermaid diagrams, and API reference.

3. **Add a Design Tokens reference page** to design.vln.gg from the color system:
     docs/design-tokens.md
   Source: https://github.com/Fused-Gaming/vln/blob/main/docs/design/tokens/colors.md

4. **Ensure the Docusaurus theme** uses VLN brand colors, not Docusaurus defaults.
   Apply these CSS custom properties in custom.css:
     --ifm-color-primary: #86d993;        /* VLN Sage */
     --ifm-color-primary-dark: #5fb76f;
     --ifm-color-primary-darker: #4fa560;
     --ifm-color-primary-darkest: #3a8d48;
     --ifm-color-primary-light: #a8e9b4;
     --ifm-color-primary-lighter: #c4f0cc;
     --ifm-color-primary-lightest: #e0f8e4;
     --ifm-background-color: #0a0e0f;
     --ifm-background-surface-color: #151a1c;
     --ifm-font-color-base: #f8f9fa;
     --ifm-heading-color: #f8f9fa;
     --ifm-code-font-size: 95%;
     --docusaurus-highlighted-code-line-bg: rgba(134, 217, 147, 0.1);

5. **Update docusaurus.config.js / docusaurus.config.ts** with proper metadata blocks:

   For design.vln.gg:
   ```js
   metadata: [
     { name: 'og:image', content: 'https://vln.gg/api/og/design' },
     { name: 'og:image:width', content: '1200' },
     { name: 'og:image:height', content: '630' },
     { name: 'og:type', content: 'website' },
     { name: 'twitter:card', content: 'summary_large_image' },
     { name: 'twitter:image', content: 'https://vln.gg/api/og/design' },
   ],
   ```

   For docs.vln.gg:
   ```js
   metadata: [
     { name: 'og:image', content: 'https://vln.gg/api/og/docs' },
     { name: 'og:image:width', content: '1200' },
     { name: 'og:image:height', content: '630' },
     { name: 'og:type', content: 'website' },
     { name: 'twitter:card', content: 'summary_large_image' },
     { name: 'twitter:image', content: 'https://vln.gg/api/og/docs' },
   ],
   ```

6. **Commit all changes** to branch `claude/docusaurus-og-<session-id>` (replace
   <session-id> with your actual Claude session ID suffix), then push.

## Important Context

### OG API Endpoints (already live on vln.gg)

| Endpoint | Serves | Accent | Query Params |
|----------|--------|--------|--------------|
| `https://vln.gg/api/og/design` | design.vln.gg | Purple | none (static) |
| `https://vln.gg/api/og/docs` | docs.vln.gg | Blue | title, subtitle, badge |
| `https://vln.gg/api/og` | any subdomain | configurable | title, subtitle, accent, subdomain, badge |

### VLN Design Tokens (use exactly — never override)

```
Background:   #0a0e0f   (--vln-bg)
Card BG:      #151a1c   (--vln-bg-light)
Sage Green:   #86d993   (primary accent)
Sky Blue:     #7dd3fc   (docs/api accent)
Amber:        #fbbf24   (alerts/urgency)
Purple:       #c084fc   (design/premium)
White:        #f8f9fa   (body text)
Gray:         #cbd5e1   (secondary text)
Border R:     12px
Font UI:      Inter
Font Code:    JetBrains Mono
```

### Docusaurus Footer

Both sites should have consistent footers:
```
© 2025 VLN - Fused Gaming  |  vln.gg  |  design.vln.gg  |  docs.vln.gg
```

### Mermaid Diagrams

Docusaurus supports Mermaid natively via `@docusaurus/theme-mermaid`. If not
already installed, add it and enable in docusaurus.config:
```js
themes: ['@docusaurus/theme-mermaid'],
markdown: { mermaid: true },
```
All architecture diagrams from docs/design/og-images.md must render correctly.

### Git Workflow

- Branch from: `integration/devops` (or `main` if integration branch doesn't exist)
- Base PR target: `integration/devops`
- Commit convention: `feat(design.vln.gg): add OG metadata and design system docs`
- NEVER push directly to main

### Visual Systems Protocol

When drafting any new documentation page that involves diagrams or visual systems,
follow the Visual Systems & Graph Design Protocol:
https://github.com/Fused-Gaming/vln/blob/main/docs/prompts/visual-systems-graph-design-protocol.md

This protocol requires:
- Mermaid diagrams for architecture (gitGraph, flowchart, sequenceDiagram, graph LR)
- ASCII wireframes for any OG/social preview variants
- Documentation co-located with the feature it describes
- Bidirectional links between README and artifact files

### Success Criteria

- [ ] `pnpm build` passes for both Docusaurus sites (no broken links, no missing assets)
- [ ] OG image metadata present in rendered HTML `<head>` for both sites
- [ ] design.vln.gg has og-images.md doc page with all 10 wireframes
- [ ] design.vln.gg has design-tokens.md page with full color system
- [ ] VLN brand colors applied to Docusaurus theme (dark charcoal bg, sage primary)
- [ ] Mermaid diagrams render (theme-mermaid installed if missing)
- [ ] Footer consistent across both sites
- [ ] All changes committed to feature branch and pushed
```

---

## Notes for Using This Prompt

- The DevOps repo structure may differ — read `CLAUDE.md` in the DevOps repo first
- The Docusaurus config file may be `.js`, `.ts`, or `.mjs` — check before editing
- If `docs.vln.gg` is only a scaffold, focus design effort on `design.vln.gg` first
- The `/api/og/docs` and `/api/og/design` endpoints are **already deployed** on
  `vln.gg` — you do not need to build them, only reference them in Docusaurus config
- If the DevOps repo uses a monorepo layout (`packages/design-site/`, `packages/docs-site/`),
  adapt paths accordingly

---

*Last Updated: 2026-02-13 | Session: v0.11.0 OG Image System*
