---
title: Peralta Component Library
description: Peralta Web3 and Identity Component Previews
---

## Component Previews

This section showcases key components of the Peralta decentralized identity design system.

### 1. Wallet Connect Modal

Modal dialog for connecting a Web3 wallet.

```
╔═════════════════════════════════════╗
║ Connect Wallet                      ║
║ [×]                                 ║
╠═════════════════════════════════════╣
║                                     ║
║ Select a wallet:                    ║
║                                     ║
║ ┌──────────────┐ ┌──────────────┐   ║
║ │   🦊         │ │   💼         │   ║
║ │  MetaMask    │ │  Ledger Live │   ║
║ └──────────────┘ └──────────────┘   ║
║                                     ║
║ ┌──────────────┐ ┌──────────────┐   ║
║ │   📱         │ │   🔗         │   ║
║ │ WalletConnect│ │  Coinbase   │   ║
║ └──────────────┘ └──────────────┘   ║
║                                     ║
║ Or scan with mobile:                ║
║ [QR Code]                           ║
║                                     ║
║ Network: [Ethereum ▼] [Polygon ▼]  ║
║                                     ║
║ [Cancel]                            ║
╚═════════════════════════════════════╝
```

**States:**
- **Disconnected:** Show wallet options
- **Connecting:** Spinner + status message
- **Connected:** Show address, balance, network
- **Error:** Show error message + retry button

**Features:**
- Popular wallet buttons with icons
- QR code for mobile wallets
- Recent wallets quick access
- Network selector (Ethereum, Polygon, Arbitrum, etc.)
- Loading states during connection

---

### 2. Chain Selector

Dropdown for switching blockchain networks.

```
Current Network Badge:
┌──────────────┐
│ 🔗 Ethereum  │  Main Network
│ Mainnet      │
└──────────────┘

Click to Expand:
┌──────────────────────────────────┐
│ 🔗 Ethereum (Selected)           │
│    Mainnet (Live)                │
│    Gas: 45 Gwei | 14.2 blocks/s  │
├──────────────────────────────────┤
│ 🟣 Polygon                       │
│    Mainnet (Live)                │
│    Gas: 120 Gwei | 2.1s blocks   │
├──────────────────────────────────┤
│ 🔵 Arbitrum                      │
│    Mainnet (Live)                │
│    Gas: Low | <1s blocks         │
├──────────────────────────────────┤
│ 🟠 Optimism                      │
│    Mainnet (Live)                │
│    Gas: Low | ~2s blocks         │
├──────────────────────────────────┤
│ 🟢 Base                          │
│    Testnet (Beta)                │
│    Gas: Low | ~2s blocks         │
└──────────────────────────────────┘
```

**Display Information:**
- Network icon + name
- Network type (Mainnet/Testnet)
- Status (Live/Beta/Inactive)
- Gas price (optional)
- Block time (optional)

**Colors:**
- Ethereum: #627eea (Blue)
- Polygon: #8247e5 (Purple)
- Arbitrum: #28a0f0 (Light Blue)
- Optimism: #ff0420 (Red)
- Base: #0052ff (Dark Blue)

---

### 3. Credential Card

Display a verified credential or claim.

```
┌─────────────────────────────────────┐
│ [Issuer Logo]   ENS Name Verified   │
│                                     │
│ ✓ Verified                          │
│   On-chain proof                    │
│                                     │
│ Name: alice.eth                     │
│ Verified: 2026-04-15               │
│ Expires: 2027-04-15                │
│                                     │
│ Issuer: ENS Labs                    │
│ Network: Ethereum Mainnet          │
│                                     │
│ [View Details] [Share] [Revoke]    │
└─────────────────────────────────────┘
```

**Card Variants:**
1. **Compact:** Show 1-2 fields, minimal details
2. **Expanded:** Full details with all claims
3. **Verification:** Highlight verification chain
4. **Sharable:** Include QR code

**States:**
- **Verified (Green):** ✓ Icon, highlighted border
- **Pending (Amber):** ⏳ Icon, pending state
- **Revoked (Red):** ✗ Icon, grayed out
- **Unverified (Gray):** ⚠️ Icon, self-claimed

**Information:**
- Issuer logo/icon
- Credential name
- Status badge with timestamp
- Key claim fields
- Verification details
- Action buttons

---

### 4. Verification Status Badge

Inline status indicator for credentials.

```
Verified (Green):
┌──────────────┐
│ ✓ Verified   │
│ 2026-04-15   │
│ Ethereum     │
└──────────────┘

Pending (Amber):
┌──────────────┐
│ ⏳ Pending   │
│ 2026-04-20   │
│ 2 days ago   │
└──────────────┘

Revoked (Red):
┌──────────────┐
│ ✗ Revoked    │
│ 2026-04-10   │
│ No longer    │
│ valid        │
└──────────────┘

Unverified (Gray):
┌──────────────┐
│ ⚠️ Claimed   │
│ Self-signed  │
│ No proof     │
└──────────────┘
```

**Color Scheme:**
- Verified: #4ade80 (Green)
- Pending: #fbbf24 (Amber)
- Revoked: #ef4444 (Red)
- Unverified: #9ca3af (Gray)

**Displayed Info:**
- Status icon + label
- Timestamp (issued/verified)
- Additional context (network, days ago)

---

### 5. Credential Details Modal

Full credential information and proof details.

```
╔═════════════════════════════════════╗
║ ENS Name Verification               ║
║ [×]                                 ║
╠═════════════════════════════════════╣
║                                     ║
║ Header:                             ║
║ ✓ Verified | alice.eth              ║
║                                     ║
├─────────────────────────────────────┤
║ Claims:                             ║
║ • Name: alice.eth                   ║
║ • Address: 0x742d...                ║
║ • Verified: Yes                     ║
║                                     ║
├─────────────────────────────────────┤
║ Blockchain Details:                 ║
║ • Network: Ethereum Mainnet         ║
║ • Tx Hash: 0x2d4f...               ║
║   [Copy] [View on Etherscan]       ║
║ • Contract: 0x9062...              ║
║ • Block: 19,245,123                ║
║ • Timestamp: 2026-04-15 14:32 UTC  ║
║                                     ║
├─────────────────────────────────────┤
║ Timeline:                           ║
║ • Issued: 2026-04-15               ║
║ • Verified: 2026-04-15             ║
║ • Expires: 2027-04-15              ║
║                                     ║
├─────────────────────────────────────┤
║ [Share] [Download] [View on Chain] ║
║ [Revoke]                            ║
╚═════════════════════════════════════╝
```

**Sections:**
- Header (credential type, status, identifier)
- Claims (structured claim data)
- Blockchain info (network, transaction, contract)
- Timeline (issued, verified, expires)
- Actions (share, download, revoke)

**Interactions:**
- Copy transaction hash to clipboard
- Link to block explorer
- Share credential (generates link/QR)
- Download as JSON-LD
- Revoke if applicable

---

### 6. Zero-Knowledge Proof Disclosure

Show what data will be shared.

```
╔═════════════════════════════════════╗
║ Share Credential                    ║
║ alice.eth asks to verify your ID    ║
║ [×]                                 ║
╠═════════════════════════════════════╣
║                                     ║
║ Credentials to Share:               ║
║ □ Address (Will share)              ║
║ □ Name (Will share)                 ║
║ □ Verified Status (Will share)      ║
║ ☑ Transaction History (Private)     ║
║ ☑ Email (Private)                   ║
║                                     ║
║ Recipient:                          ║
║ alice.eth                           ║
║ (Verified smart contract)           ║
║                                     ║
║ Data Usage:                         ║
║ "To verify your identity for        ║
║  account creation"                  ║
║                                     ║
║ Validity:                           ║
║ Valid for 30 days                   ║
║ [Can revoke anytime]                ║
║                                     ║
║ [Approve] [Deny]                    ║
╚═════════════════════════════════════╝
```

**Features:**
- Checkboxes to select shared claims
- Visual indication of private claims
- Recipient information
- Data usage explanation
- Validity period
- Ability to revoke later

---

### 7. Identity Profile Card

User's Peralta identity display.

```
┌─────────────────────────────────────┐
│ [Avatar]                            │
│ Alice Chen                          │
│ alice.eth                           │
│                                     │
│ ✓ 12 Verified Credentials          │
│ ⭐ Trust Score: 89/100              │
│                                     ║
│ Verified Addresses:                 │
│ 0x742d35Cc6634C0532925a3b844Bc...  │
│ 0x1234567890abcdef...               │
│                                     │
│ Social:                             │
│ 🔗 LinkedIn 🐦 Twitter              │
│                                     │
│ [View Full Profile]                 │
│ [Share Profile]                     │
│ [Trust This User]                   │
└─────────────────────────────────────┘
```

**Sections:**
- Profile image/avatar
- Display name
- DID or primary identifier
- Verified credential count
- Trust/reputation score
- Verified wallet addresses
- Social links
- Action buttons

**States:**
- **Own Profile:** Show edit button, more options
- **Other's Profile:** Show trust/verify buttons

---

### 8. Cross-Chain Bridge Widget

Show multi-chain credential transfer.

```
┌─────────────────────────────────────┐
│ Bridge Credentials                  │
│                                     │
│ From Network:                       │
│ [Ethereum ▼] (Current)              │
│                                     │
│ To Network:                         │
│ [Polygon ▼]                         │
│                                     │
│ ↓ Select Credentials ↓              │
│                                     │
│ ☑ ENS Name Verification             │
│ ☑ Proof of Humanity                 │
│ □ Lens Protocol                     │
│                                     │
│ Fee: 0.05 ETH ($75)                │
│ Time: ~5 minutes                   │
│                                     │
│ Bridge Via: [Across ▼]              │
│                                     │
│ [Confirm Bridge] [Cancel]           │
└─────────────────────────────────────┘
```

**Flow:**
1. Select source network
2. Select destination network
3. Select which credentials to bridge
4. Review fees and time estimate
5. Confirm transaction
6. Monitor bridge status
7. Complete on destination network

**Information:**
- Bridge provider
- Estimated time
- Fees (display in ETH + USD)
- Selected credentials
- Status indicator

---

### 9. Transaction Confirmation Modal

Confirm blockchain transactions.

```
╔═════════════════════════════════════╗
║ Confirm Transaction                 ║
║ [×]                                 ║
╠═════════════════════════════════════╣
║                                     ║
║ Revoke Credential: ENS Name        ║
║                                     ║
║ From:                               ║
║ 0x742d...                           ║
║ alice.eth [✓ You]                   ║
║                                     ║
║ To:                                 ║
║ 0x9062...                           ║
║ ENS Registry Contract               ║
║                                     ║
║ Gas Fee:                            ║
║ 0.0015 ETH ($2.25)                 ║
║ [⚡ Standard] [Fast] [Instant]     ║
║                                     ║
║ Network:                            ║
║ Ethereum Mainnet                    ║
║                                     ║
║ ⚠️ This action cannot be undone    ║
║                                     ║
║ [Approve] [Reject]                  ║
╚═════════════════════════════════════╝
```

**Content:**
- Transaction description
- From/To addresses
- Address verification (ENS names)
- Gas fee with speed options
- Network confirmation
- Risk warning if applicable

**Safety Features:**
- ENS name verification
- Phishing warnings (if detected)
- Clear action description
- Estimated transaction time

---

### 10. Trust Score Widget

Display user's credibility score.

```
Trust Score: 89 / 100

[████████░] 89%

Breakdown:
┌────────────────────────────────┐
│ Verified Credentials: 12/15    │
│ ████████░░ 80%                 │
│                                │
│ Transaction History:            │
│ 247 successful (100% on-time)   │
│ █████████░ 95%                 │
│                                │
│ Community Votes: +47            │
│ ██████░░░ 60%                  │
│                                │
│ Age of Account: 1 year          │
│ ████████░░ 80%                 │
└────────────────────────────────┘

[View Evidence] [Report Issue]
```

**Score Composition:**
- Verified credential count
- Transaction success/timing rate
- Community votes/trust
- Account age
- Other factors

**Display Options:**
- Overall score (0-100)
- Breakdown by category
- Visual indicators (bar, stars)
- Supporting evidence link

---

## Design Tokens Reference

### Primary Brand Colors
```css
--peralta-primary: #8b5cf6;      /* Purple */
--peralta-secondary: #6d28d9;    /* Dark purple */
--peralta-light: #c4b5fd;        /* Light purple */
--peralta-grad-1: #8b5cf6;       /* Gradient start */
--peralta-grad-2: #a855f7;       /* Gradient end */
```

### Network Colors
```css
--peralta-eth: #627eea;          /* Ethereum blue */
--peralta-polygon: #8247e5;      /* Polygon purple */
--peralta-arbitrum: #28a0f0;     /* Arbitrum cyan */
--peralta-op: #ff0420;           /* Optimism red */
--peralta-base: #0052ff;         /* Base dark blue */
```

### Status Colors
```css
--peralta-verified: #4ade80;     /* Green */
--peralta-pending: #fbbf24;      /* Amber */
--peralta-revoked: #ef4444;      /* Red */
--peralta-unverified: #9ca3af;   /* Gray */
```

### Typography
```css
/* Identity Names */
font-size: 24-28px;
font-weight: 700;
font-family: 'Inter', sans-serif;

/* Credential Titles */
font-size: 16-18px;
font-weight: 600;

/* Claim Labels */
font-size: 12-14px;
font-weight: 500;

/* Address/Hash (Monospace) */
font-family: 'JetBrains Mono', monospace;
font-size: 12px;
```

### Spacing
```css
/* Modal Dimensions */
--modal-width: 480px (desktop);
--modal-width: 90% (mobile);

/* Card Padding */
--card-padding: 16px (mobile), 20px (desktop);
--card-gap: 16px (grid);

/* Input Height */
--input-height: 40px (base);

/* Touch Targets */
--touch-target: 44px minimum;
```

---

## Component Checklist

- [x] Wallet connect modal
- [x] Chain selector dropdown
- [x] Credential card (multiple variants)
- [x] Verification status badge
- [x] Credential details modal
- [x] Zero-knowledge proof disclosure
- [x] Identity profile card
- [x] Cross-chain bridge widget
- [x] Transaction confirmation modal
- [x] Trust score widget
- [x] Mobile responsive layouts
- [x] Accessibility (keyboard, screen readers)

---

## Implementation Notes

### Web3 Integration
- ethers.js for wallet connection and transactions
- IPFS for credential storage (optional)
- The Graph for on-chain data queries
- ENS for address resolution

### Security
- Sign transactions with user's wallet (no keys on server)
- Verify credentials on-chain
- Use Web3Auth for key management
- Support hardware wallets (Ledger, Trezor)

### Performance
- Cache wallet connections
- Lazy-load blockchain network data
- Optimize credential queries
- Debounce input validation

### Testing
- Unit tests: Credential validation
- Integration tests: Wallet connections
- E2E tests: Full credential flows
- Security: Input validation, XSS prevention
