---
title: Peralta Design System
description: Peralta - Decentralized Identity & Web3 Integration Design System
---

> Decentralized Identity & Web3 Brand Identity System

**Last Updated:** April 2026
**Version:** 1.0
**Status:** Active

---

## Peralta Overview

Peralta is VLN's decentralized identity and Web3 integration system for secure, verifiable, portable credentials and self-sovereign identity management. The design system covers wallet connections, identity verification flows, credential displays, trust indicators, and cross-chain interactions.

## Design Philosophy

1. **Trust Transparency** — Users see exactly what data they're sharing
2. **Self-Sovereignty** — Full control over credentials and identity data
3. **Interoperability** — Seamless multi-chain, multi-wallet support
4. **Privacy First** — Zero-knowledge proofs, selective disclosure
5. **Accessibility** — Simple for non-technical users, power tools for devs

---

## Color Palette

### Primary Brand Colors

| Element | Token | Hex | Usage |
|---------|-------|-----|-------|
| **Primary** | `--peralta-primary` | `#8b5cf6` | Brand color, primary actions, links |
| **Secondary** | `--peralta-secondary` | `#6d28d9` | Secondary buttons, accents |
| **Light Accent** | `--peralta-light` | `#c4b5fd` | Hover states, highlights |
| **Gradient Start** | `--peralta-grad-1` | `#8b5cf6` | Background gradients |
| **Gradient End** | `--peralta-grad-2` | `#a855f7` | Background gradients |

### Blockchain Network Colors

| Network | Token | Hex | Usage |
|---------|-------|-----|-------|
| **Ethereum** | `--peralta-eth` | `#627eea` | ETH chain indicator |
| **Polygon** | `--peralta-polygon` | `#8247e5` | Polygon chain indicator |
| **Arbitrum** | `--peralta-arbitrum` | `#28a0f0` | Arbitrum chain indicator |
| **Optimism** | `--peralta-op` | `#ff0420` | Optimism chain indicator |
| **Base** | `--peralta-base` | `#0052ff` | Base chain indicator |

### Trust & Credential States

| State | Token | Hex | Usage |
|-------|-------|-----|-------|
| **Verified** | `--peralta-verified` | `#4ade80` | Verified credentials, proven status |
| **Pending** | `--peralta-pending` | `#fbbf24` | Verification in progress |
| **Revoked** | `--peralta-revoked` | `#ef4444` | Revoked credentials, expired proofs |
| **Unverified** | `--peralta-unverified` | `#9ca3af` | Unverified claims, grey out |

### VLN Integration

| Element | Token | Hex | Usage |
|---------|-------|-----|-------|
| **Sage Green** | `--vln-sage` | `#a6c3a7` | Links, secondary UI |
| **Blue-Gray** | `--vln-bluegray` | `#aab7c8` | Borders, metadata text |

---

## Component Library

### Wallet Connect Modal

**Purpose:** Connect Web3 wallet to application

**Elements:**
- List of supported wallets (MetaMask, WalletConnect, Ledger, etc.)
- Network selector (Ethereum, Polygon, Arbitrum, etc.)
- Connection status indicator
- Error handling and retry

**States:**
- Disconnected (show wallet options)
- Connecting (spinner, status message)
- Connected (show address, balance, network)
- Error (with retry button)

**Features:**
- QR code for mobile wallets
- Recent wallets quick-access
- Network mismatch warnings
- Gas fee estimation

### Chain Selector

**Purpose:** Switch between blockchain networks

**Display:**
- Current network badge (icon + name)
- Dropdown showing available networks
- Network status (mainnet/testnet)
- Gas price indicator (optional)

**Interaction:**
- Dropdown on click
- Icon shows active network
- Visual confirmation on switch
- Auto-switch for relevant pages

### Credential Card

**Purpose:** Display verified credentials and claims

**Layout:**
- Issuer logo/icon (left)
- Credential name (header)
- Verification status badge (green/yellow/red)
- Claim data (structured fields)
- Issue/Expiration dates (small text)
- View details / Share / Revoke buttons

**Card Variants:**
1. **Compact:** Summary view (1-2 visible fields)
2. **Expanded:** Full details with all fields
3. **Verification:** Highlight verification chain
4. **Sharable:** Include share link/QR

### Verification Status Badge

**Purpose:** Show credential verification state

**States & Colors:**
- **Verified (Green):** ✓ On-chain proof
- **Pending (Amber):** ⏳ Awaiting confirmation
- **Revoked (Red):** ✗ No longer valid
- **Unverified (Gray):** ⚠️ Self-claimed

**Information:**
- Status icon + text label
- Verification timestamp
- Issuer / blockchain reference
- Click to view proof details

### Credential Details Modal

**Purpose:** Show full credential information

**Sections:**
1. **Header** — Credential type, issuer, status
2. **Claims** — Structured claim data, verification proof
3. **Blockchain Info** — Transaction hash, contract address, network
4. **Timeline** — Issued, verified, expires dates
5. **Actions** — Share, Download, View on Chain, Revoke

**Features:**
- Copy transaction hash to clipboard
- View on block explorer link
- Share credential (generate link/QR)
- Download as JSON-LD
- Revoke if applicable

### Zero-Knowledge Proof Disclosure

**Purpose:** Show what data will be revealed when sharing

**Elements:**
- List of claims to be shared (checkboxes)
- Fields kept private (visual indication)
- Recipient information
- Data usage explanation
- Approve / Decline buttons

**Transparency:**
- Clear what's shared vs private
- Purpose of use
- Expiration of disclosure
- Ability to revoke later

### Identity Profile Card

**Purpose:** Display user's Peralta identity

**Sections:**
- Profile image / avatar
- Display name / DID
- Verified credentials count badge
- Reputation / Trust score (if applicable)
- Wallet addresses (primary + linked)
- Social links / contact methods

**States:**
- View own profile (show edit button)
- View others' profile (show verify / trust buttons)

### Cross-Chain Bridge Widget

**Purpose:** Facilitate multi-chain credential transfer

**Flow:**
1. Select source network
2. Select destination network
3. Confirm transaction
4. Monitor bridge status
5. Complete / retry

**Information:**
- Bridge provider
- Estimated time
- Fees
- Slippage (if applicable)

### Transaction Confirmation Modal

**Purpose:** Confirm blockchain transactions

**Content:**
- From/To addresses
- Amount and token
- Gas fee estimate
- Network confirmation
- Approve / Reject buttons

**Safety Features:**
- Address verification (show ENS names)
- Phishing warnings if detected
- Clear action description
- Estimated transaction time

### Trust Score Widget

**Purpose:** Display user credibility/reputation

**Display:**
- Numeric score (0-100)
- Visual indicator (bar, stars, circles)
- Breakdown by category:
  - Credential count
  - Verification rate
  - On-time transaction history
  - Community votes

**Interaction:**
- Hover for detailed breakdown
- Click for report/evidence

### Revocation Interface

**Purpose:** Allow users to revoke issued credentials

**Elements:**
- List of issued credentials
- Revocation reason selector
- Confirmation message
- Estimated blockchain cost
- Revoke / Cancel buttons

**States:**
- Pre-revocation (no revocation)
- Revoking (pending blockchain confirmation)
- Revoked (crossed out, grayed)

### Network Status Indicator

**Purpose:** Show blockchain network health

**Display:**
- Network name + status icon
- Block time / gas price (optional)
- Network congestion (low/medium/high)
- Last update timestamp

**Colors:**
- Green: Normal
- Yellow: Congested
- Orange: Slow
- Red: Down/Error

---

## Typography System

| Usage | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| **Identity Name** | Inter | 24-28px | Bold 700 | 1.2 |
| **Credential Title** | Inter | 16-18px | SemiBold 600 | 1.3 |
| **Claim Label** | Inter | 12-14px | Medium 500 | 1.4 |
| **Claim Value** | Inter | 14px | Regular 400 | 1.5 |
| **Address/Hash** | JetBrains Mono | 12px | Regular 400 | 1.6 |
| **Status Text** | Inter | 12px | Medium 500 | 1.4 |
| **Description** | Inter | 14px | Regular 400 | 1.5 |

---

## Spacing & Layout

### Modal Dimensions
- **Desktop:** 480px width, max 90vh height
- **Tablet:** 90% width, max 85vh height
- **Mobile:** Full width - 16px padding

### Card Spacing
- **Grid Gap:** 16px (mobile), 20px (tablet), 24px (desktop)
- **Internal Padding:** 16px (mobile), 20px (desktop)
- **Section Gap:** 12px within card, 24px between cards

### Input Fields
- **Height:** 40px (base), 56px (large), auto (textarea)
- **Padding:** 10px horizontal (base), 14px (large)
- **Label Gap:** 8px
- **Field Group Gap:** 16px

### Touch Targets
- **Minimum:** 44x44px (WCAG)
- **Buttons:** 44-56px height
- **Toggle/Checkbox:** 20x20px (44x44px target area)
- **Network Badge:** 40-48px

---

## Animations

### Modal Entry
- Duration: 250ms
- Easing: ease-out
- Effect: Scale from center + fade in

### Credential Load
- Duration: 300ms
- Easing: ease-out
- Effect: Slide up + fade in

### Status Change
- Duration: 200ms
- Easing: ease-in-out
- Effect: Color transition + icon change

### Chain Switch
- Duration: 200ms
- Easing: ease-in-out
- Effect: Rotate badge + color change

### Transaction Progress
- Duration: 2000ms
- Easing: linear
- Effect: Progress bar fill, auto-repeat

### Error Shake
- Duration: 400ms
- Easing: ease-in-out
- Effect: Horizontal shake (3-5px)

---

## Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys in lists and dropdowns
- Escape to close modals
- Focus visible on all elements

### Screen Reader
- ARIA labels on all buttons and icons
- Form inputs associated with labels
- Live regions for status updates
- Credential card role="region"
- Error messages linked to inputs

### Color & Contrast
- Verification badges: WCAG AAA (7:1+)
- Text on colored backgrounds: WCAG AA (4.5:1)
- Icons supplemented with text labels
- High contrast mode supported

### Vision Support
- Font size controls (browser zoom works)
- Line height: 1.5+ for readability
- No color alone to convey information
- Alt text for all images/icons

---

## Integration with Web3 Standards

### Standards Supported
- **EIP-191:** Personal message signing
- **EIP-712:** Typed structured data signing
- **Verifiable Credentials (W3C):** JSON-LD format
- **DID (W3C):** Decentralized Identifiers
- **OIDC4VP:** OpenID Connect for Verifiable Presentations

### Wallet Compatibility
- MetaMask
- WalletConnect
- Ledger Live
- Trezor
- Coinbase Wallet
- Argent
- Magic Link
- Web3Auth

---

## Brand Integration

Peralta integrates with VLN's core brand:

- **Primary Purple:** Peralta's distinctive brand color
- **Secondary:** VLN Sage Green for links and secondary actions
- **Typography:** Inter for UI, JetBrains Mono for addresses/hashes
- **Radius:** 12px consistent with VLN design tokens
- **Shadows:** Subtle glow effects for cards
- **Motion:** Purposeful, restrained animations

---

## Responsive Breakpoints

| Device | Width | Modal Width | Card Layout | Font Scale |
|--------|-------|-------------|-------------|-----------|
| **Mobile** | 320-480px | Full - 16px | 1 column | 0.9x |
| **Tablet** | 481-1024px | 90% width | 2 columns | 1.0x |
| **Desktop** | 1025px+ | 480px | 3+ columns | 1.0x |

---

## Security & Privacy

### Data Handling
- Credentials stored locally (browser storage / wallet)
- Zero-knowledge proofs for selective disclosure
- No credential data on central servers
- User controls all sharing permissions

### Transaction Safety
- Address verification (ENS/ENS-like)
- Phishing detection and warnings
- Multi-sig transaction support
- Transaction hash verification

### Compliance
- GDPR compliant (user data ownership)
- No tracking or analytics on credentials
- Optional privacy mode (Tor support)
- Self-hosted credential validation options

---

## Implementation Guidelines

### Component Library
- Reusable wallet connector component
- Credential card with variants
- Chain selector with network icons
- Modal wrapper for Web3 interactions

### State Management
- Connected wallet state
- Active network state
- Credential store (local)
- Pending transactions queue

### API Integration
- Wallet connection via ethers.js / Web3.js
- Smart contract interactions
- Credential verification endpoints
- Graph query for on-chain data

### Testing
- Unit: Credential validation, parsing
- Integration: Wallet connection, transactions
- E2E: Full credential flow
- Security: Input validation, XSS prevention

---

## Related Documentation

- [VLN Design Tokens](/tokens/colors)
- [VLN Accessibility Guidelines](/responsive/accessibility)
- [VLN Brand Guidelines](/branding/logo)

---

## Changelog

### v1.0 — April 2026
- Initial Peralta design system
- Wallet connection and chain selector
- Credential display and verification
- Web3 standard integration
- Zero-knowledge proof disclosure
- Cross-chain bridge widgets
- Trust score and reputation systems
- Accessibility and security guidelines
