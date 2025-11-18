# VLN - Smart Contract Vulnerability Research Lab

**by Fused Gaming**

Professional security audits for blockchain gaming projects. World-class vulnerability research with a focus on blockchain gaming infrastructure.

---

## 🎯 About VLN

VLN is Fused Gaming's smart contract security research platform, specializing in:

- 🔐 Smart contract security audits
- 🔬 Vulnerability research & disclosure
- 🎮 Blockchain gaming infrastructure security
- 📊 DeFi protocol analysis
- 🛡️ Penetration testing for EVM smart contracts

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm 9.x or higher

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Development Server

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📁 Project Structure

```
vln/
├── app/                    # Next.js App Router pages
│   ├── (site)/            # Marketing pages
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn-based components (future)
│   └── vln/              # Custom VLN components (future)
├── lib/                   # Utilities and helpers
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── design/          # Design specifications
│   ├── devops/          # DevOps guides
│   ├── planning/        # Project planning
│   ├── technical/       # Technical documentation
│   └── guides/          # User guides
├── devops/              # DevOps repository (cloned)
└── .github/
    └── workflows/       # CI/CD workflows
```

---

## 🎨 Design System

### Brand Colors

- **Matte Charcoal** (`#0f0f0f`) - Background base
- **Sage Green** (`#a6c3a7`) - Primary accent
- **Warm Blue-Gray** (`#aab7c8`) - Secondary accent
- **Soft Glow White** (`#f8f9fa`) - Text/highlights

### Typography

- **Primary Font**: Inter (sans-serif)
- **Monospace Font**: JetBrains Mono (technical content)

### Design Tokens

```css
--vln-bg: #0f0f0f;
--vln-sage: #a6c3a7;
--vln-bluegray: #aab7c8;
--vln-white: #f8f9fa;
--vln-accent: var(--vln-sage);
--vln-radius: 12px;
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Deployment**: Vercel (planned)
- **CI/CD**: GitHub Actions

---

## 📋 Development Workflow

### Branch Strategy

Following the Fused Gaming integration-first branching model:

- `main` - Production branch (protected)
- `integration/vln` - Active integration branch for VLN
- `feature/<name>` - Feature branches

### Creating a Feature Branch

```bash
# Create and switch to feature branch from integration
git checkout integration/vln
git pull
git checkout -b feature/my-feature

# Make changes, commit, and push
git add .
git commit -m "feat(vln): add my feature"
git push -u origin feature/my-feature
```

### Pull Request Process

1. Create PR targeting `integration/vln` (NOT `main`)
2. Ensure all CI checks pass
3. Wait for code review
4. Merge when approved

### Commit Convention

Follow Conventional Commits:

```bash
feat(vln): add new feature
fix(api): correct bug
docs: update README
chore: update dependencies
```

---

## 🔒 Security

VLN operates under strict responsible disclosure principles:

- ✅ **Educational & Research Use Only**
- ✅ **Test on Testnets** (Sepolia, etc.)
- ✅ **Responsible Disclosure** to affected parties
- ❌ **NO Mainnet Exploitation** without authorization
- ❌ **NO Malicious Use**

All research is conducted to improve blockchain security and for educational purposes.

---

## 📞 Contact

- **🌐 Website**: [vln.gg](https://vln.gg)
- **📧 Email**: [info@vln.gg](mailto:info@vln.gg)
- **💬 Telegram**: [@vlngg](https://t.me/vlngg)
- **🐙 GitHub**: [github.com/Fused-Gaming/vln](https://github.com/Fused-Gaming/vln)

---

## 📝 Documentation

For detailed documentation, see:

- [CLAUDE.md](./CLAUDE.md) - Contribution guidelines for Claude Code
- [BRANDING.md](./BRANDING.md) - Official branding guidelines
- [docs/](./docs/) - Technical and project documentation

---

## 🎮 About Fused Gaming

**Fused Gaming** is a blockchain gaming and security research organization specializing in:

- 🔐 Smart contract security audits
- 🔬 Vulnerability research & disclosure
- 🎮 Blockchain gaming infrastructure
- 📊 DeFi protocol analysis

**Learn More**: [vln.gg](https://vln.gg)

---

## 📄 License

See [LICENSE](./LICENSE) file for details.

---

**VLN** - *Securing the future of blockchain gaming*

*A Fused Gaming Initiative*

© 2024 VLN - Fused Gaming. All rights reserved.
