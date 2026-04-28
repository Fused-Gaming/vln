---
title: VLN Design Systems Overview
description: Complete Guide to ACE Blackjack, Skill-MCP, and Peralta Design Systems
---

## VLN Design Systems

VLN maintains three comprehensive design systems covering distinct product ecosystems, each with complete component libraries, color palettes, and integration guidelines.

---

## 1. ACE Blackjack Design System

**Status:** Active MVP
**Focus:** iGaming, High-Performance Gameplay

### Overview

ACE is VLN's premium blackjack gaming platform design system. It covers all game UI components, player interfaces, dealer management, and real-time multiplayer interactions.

### Key Characteristics

- **Game-First UX:** Instant feedback, sub-100ms interactions
- **Trust Through Clarity:** Transparent game states and odds
- **Accessibility Priority:** WCAG AAA compliant, colorblind-friendly
- **Mobile Excellence:** Touch-optimized controls and layouts
- **Compliance Ready:** Audit trail UI and regulatory reporting

### Design Highlights

| Element | Count | Status |
|---------|-------|--------|
| **Color Palette** | 10+ colors | Complete |
| **Components** | 10+ specialized widgets | Complete |
| **Animations** | 6 interaction patterns | Complete |
| **Responsive Breakpoints** | 3 (mobile, tablet, desktop) | Complete |
| **Accessibility Specs** | WCAG AAA | Complete |

### Primary Colors

- **Felt Green:** `#1a4d2e` — Game table background
- **Chip Gold:** `#d4af37` — Betting and premium UI
- **Card White:** `#f5f5f5` — Card backgrounds
- **Dealer Navy:** `#1a2a3a` — Status panels

### Core Components

1. **Player Hand Display** — Cards with running total
2. **Dealer Hand Display** — Hole card mechanics
3. **Betting Interface** — Chip selection and placement
4. **Action Buttons** — Hit, Stand, Double, Split, Insurance
5. **Game Status Panel** — Balance, bet, rounds
6. **Results Modal** — Outcome display with animations
7. **Multiplayer Indicators** — Seat positions and statuses
8. **Card Animations** — Deal, flip, and settle sequences
9. **Statistics Panel** — Session metrics and analytics

### Documentation

- [ACE Overview](/ace) — Complete design system guide
- [ACE Components](/ace/components) — Component library
- [ACE Colors](/ace/colors) — Color system and accessibility

### Implementation Notes

- Built for 60fps on mobile devices
- Network latency < 500ms acceptable
- Hand evaluation < 200ms target
- Supports 6-player tables minimum

---

## 2. Skill-MCP Design System

**Status:** Active MVP
**Focus:** AI Tools, Agent Interfaces, Security Automation

### Overview

Skill-MCP is VLN's Model Context Protocol integration framework. It provides a comprehensive design system for security tools, analysis agents, and workflow integration patterns.

### Key Characteristics

- **Agent-First UX:** Tools for both AI and human consumption
- **Composability:** Skills chain together seamlessly
- **Transparency:** Clear inputs, outputs, side effects
- **Audit Trail:** Every operation logged and reviewable
- **Safety Gates:** Permission models, rate limits, rollback

### Design Highlights

| Element | Count | Status |
|---------|-------|--------|
| **Tool Categories** | 7 color-coded categories | Complete |
| **Status Indicators** | 5 state colors | Complete |
| **Components** | 10+ tool interface widgets | Complete |
| **Permission Models** | Full RBAC framework | Complete |
| **Integration Patterns** | Tool chaining, approval flows | Complete |

### Category Colors

- **Analysis:** `#60a5fa` — Code analysis, static analysis
- **Execution:** `#f97316` — Command execution, scripts
- **Data Ops:** `#8b5cf6` — ETL, transformations
- **Network:** `#10b981` — APIs, webhooks
- **Security:** `#ef4444` — Encryption, scanning

### Core Components

1. **Skill Card** — Tool browsing and quick access
2. **Category Panel** — Grouped tool listings
3. **Input Panel** — Dynamic form generation
4. **Execution Monitor** — Real-time progress tracking
5. **Results Panel** — Multi-format output display
6. **Permission Gate** — Authorization UI
7. **Integration Widget** — Tool chaining interface
8. **Rate Limit Indicator** — Quota management
9. **Error Boundary** — Error handling and recovery

### Documentation

- [Skill-MCP Overview](/skill-mcp) — Complete design system
- [Skill-MCP Components](/skill-mcp/components) — Component library
- [Skill-MCP Colors](/skill-mcp/colors) — Color categorization

### Implementation Notes

- Virtual scrolling for large tool lists
- WebSocket for live log streaming
- Async execution with SSE updates
- Full audit logging of all operations

---

## 3. Peralta Design System

**Status:** Active MVP
**Focus:** Web3, Decentralized Identity, Blockchain

### Overview

Peralta is VLN's decentralized identity and Web3 integration system. It covers wallet connections, identity verification, credential management, and cross-chain interactions.

### Key Characteristics

- **Trust Transparency:** Users see exactly what's shared
- **Self-Sovereignty:** Full control over identity data
- **Interoperability:** Multi-chain, multi-wallet support
- **Privacy First:** Zero-knowledge proofs, selective disclosure
- **Accessibility:** Simple for users, powerful for developers

### Design Highlights

| Element | Count | Status |
|---------|-------|--------|
| **Brand Colors** | 5 primary shades | Complete |
| **Network Colors** | 5 blockchain networks | Complete |
| **Credential States** | 4 verification states | Complete |
| **Components** | 10+ Web3 widgets | Complete |
| **Standards Support** | EIP-191, EIP-712, VC, DID | Complete |

### Primary Colors

- **Peralta Purple:** `#8b5cf6` — Brand primary
- **Ethereum Blue:** `#627eea` — ETH network
- **Polygon Purple:** `#8247e5` — Polygon network
- **Arbitrum Cyan:** `#28a0f0` — Arbitrum network
- **Optimism Red:** `#ff0420` — Optimism network

### Core Components

1. **Wallet Connect Modal** — Multi-wallet connection
2. **Chain Selector** — Network switching UI
3. **Credential Card** — Credential display (multiple variants)
4. **Verification Badge** — Status indicators
5. **Credential Details Modal** — Full credential information
6. **Zero-Knowledge Disclosure** — Privacy-preserving sharing
7. **Identity Profile Card** — User identity display
8. **Cross-Chain Bridge Widget** — Multi-chain transfers
9. **Transaction Confirmation** — Blockchain transaction UI
10. **Trust Score Widget** — Reputation display

### Documentation

- [Peralta Overview](/peralta) — Complete design system
- [Peralta Components](/peralta/components) — Component library
- [Peralta Colors](/peralta/colors) — Blockchain network colors

### Implementation Notes

- ethers.js for wallet integration
- IPFS for credential storage (optional)
- Support for hardware wallets
- Gas optimization and fee estimation

---

## Cross-System Design Principles

### 1. Brand Consistency

All three systems integrate seamlessly with VLN's core brand:

- **Typography:** Inter (UI), JetBrains Mono (technical)
- **Radius:** 12px border-radius consistent across all systems
- **Spacing:** Shared spacing token system
- **Shadow/Glow:** Subtle effects, no excessive flare
- **Motion:** Purposeful, restrained animations

### 2. Accessibility Standards

Each system meets WCAG accessibility requirements:

- **WCAG AA Minimum:** Text contrast 4.5:1
- **WCAG AAA Target:** Text contrast 7:1
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Readers:** ARIA labels and live regions
- **Colorblind Support:** No color-only information

### 3. Responsive Design

All systems support mobile-first responsive layouts:

| Device | Breakpoint | Layout Changes |
|--------|-----------|-----------------|
| **Mobile** | 320-480px | 1-column, touch targets 44x44px |
| **Tablet** | 481-1024px | 2-3 columns, flexible spacing |
| **Desktop** | 1025px+ | Multi-column, expanded UI |

### 4. Performance Standards

- **Load Time:** < 2.5s LCP
- **Interaction:** < 100ms response time
- **Animations:** 60fps target (16.67ms per frame)
- **Bundle Size:** Monitored and optimized
- **Lighthouse Score:** > 85

### 5. Integration Points

Systems can be combined for unified experiences:

```
User Story: Gaming Platform
├─ ACE (Game UI)
├─ Skill-MCP (Game Analytics & Admin Tools)
└─ Peralta (Player Identity & Wallet)

User Story: Security Platform
├─ Skill-MCP (Primary Interface)
├─ ACE (Real-time Metrics Dashboards)
└─ Peralta (Team Identity & Access)

User Story: Web3 Dashboard
├─ Peralta (Primary Interface)
├─ Skill-MCP (Analysis & Integration Tools)
└─ ACE (Gaming Features)
```

---

## Design System Governance

### Ownership

| System | Owner | Focus |
|--------|-------|-------|
| **ACE** | Gaming Product | Blackjack, multiplayer gaming |
| **Skill-MCP** | Platform Engineering | Tools, automation, agents |
| **Peralta** | Web3 Team | Identity, blockchain, Web3 |

### Updates & Versioning

- **Version Format:** MAJOR.MINOR (semantic versioning)
- **Breaking Changes:** Major version only
- **Enhancement Releases:** Minor version, backward compatible
- **Patch Releases:** Bug fixes, documentation updates

### Documentation Maintenance

- Updated: Monthly component reviews
- Archived: Legacy components after v2.0
- Deprecation: 3-month notice before removal
- Migration Guides: Provided for all breaking changes

---

## Getting Started with VLN Design Systems

### Quick Start Guide

1. **Identify Your Product Category**
   - Gaming/UX → [ACE Blackjack](/ace)
   - Tools/Automation → [Skill-MCP](/skill-mcp)
   - Web3/Identity → [Peralta](/peralta)

2. **Review the Overview**
   - Read the system philosophy
   - Understand core principles
   - Note design characteristics

3. **Explore Components**
   - Browse the component library
   - Review usage examples
   - Copy code snippets

4. **Apply Colors & Tokens**
   - Use the color palette
   - Follow spacing guidelines
   - Implement animations

5. **Ensure Accessibility**
   - Test WCAG compliance
   - Validate keyboard navigation
   - Check colorblind support

### Resources

| Resource | Purpose |
|----------|---------|
| [ACE Design System](/ace) | Blackjack gaming |
| [Skill-MCP Design System](/skill-mcp) | Tools & agents |
| [Peralta Design System](/peralta) | Web3 & identity |
| [VLN Colors](/tokens/colors) | Shared color system |
| [VLN Typography](/tokens/typography) | Font standards |
| [Accessibility Guidelines](/responsive/accessibility) | WCAG compliance |

### Support & Contribution

- **Questions?** Review the component documentation
- **Bug Reports?** Check the system changelogs
- **Contributions?** See CONTRIBUTING.md guidelines
- **Feedback?** Use the GitHub issues system

---

## Design System Statistics

**Total Coverage:**
- **Components:** 30+
- **Color Palettes:** 40+ colors across all systems
- **Responsive Breakpoints:** 3 per system (9 total)
- **Accessibility Guidelines:** WCAG AAA where practical
- **Animation Systems:** 20+ interaction patterns
- **Documentation Pages:** 30+

**Maintenance:**
- **Last Updated:** April 2026
- **Components Reviewed:** Monthly
- **Accessibility Audits:** Quarterly
- **Performance Reviews:** Monthly

---

## Changelog

### v1.0 — April 2026 (Current)

**ACE Blackjack**
- Complete game design system
- 10+ core components
- Full color palette
- Accessibility standards

**Skill-MCP**
- Tool interface framework
- 7 category colors
- 10+ components
- Permission & approval flows

**Peralta Web3**
- Decentralized identity system
- 5 blockchain network colors
- 10+ Web3 components
- Credential & wallet management

---

## Related Documentation

- [VLN Design System](/) — Main overview
- [VLN Tokens](/tokens/colors) — Shared design tokens
- [Responsive Design](/responsive/layouts) — Layout patterns
- [Accessibility](/responsive/accessibility) — WCAG guidelines
- [Performance](/performance/guidelines) — Optimization rules

---

## Questions & Support

For questions about specific systems:

- **ACE:** Gaming product team
- **Skill-MCP:** Platform engineering
- **Peralta:** Web3 team

Check the individual system pages for contact information and community links.
