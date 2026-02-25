# GitHub CLI Authentication Guide

**Safe for public repositories** — No tokens in documentation

---

## 🔐 Secure Authentication Setup

The `gh` CLI is already installed. To authenticate securely:

### Step 1: Interactive Login (Recommended)

```bash
gh auth login
```

This opens an interactive prompt that guides you through secure authentication options.

**You will be asked:**
1. Which GitHub host: `GitHub.com` or `GitHub Enterprise Server`?
2. Which authentication protocol: `HTTPS` or `SSH`?
3. Authenticate via browser or existing token?

### Step 2: Browser-Based Flow (Most Secure)

When prompted, choose **browser-based authentication**. This:
- Opens your browser to GitHub
- Authorizes the CLI locally
- Never exposes tokens in your terminal
- Stores credentials securely in `~/.config/gh/hosts.yml`

### Step 3: Verify Authentication

```bash
gh auth status
```

This shows:
- Authenticated user
- GitHub host
- Authentication protocol

---

## 📚 Official Documentation

For detailed guidance, see:
- **gh CLI Manual:** https://cli.github.com/manual/gh_auth_login
- **GitHub CLI Docs:** https://docs.github.com/en/github-cli/github-cli/getting-started-with-github-cli

---

## ✅ Once Authenticated

Run the script to post phase tracking comments:

```bash
./scripts/post-phase-comments.sh
```

This script reads your authenticated credentials from `~/.config/gh/` and posts comments to:
- Issue #64 (Phase 1 - Brand & Distribution)
- Issue #114 (Phase 2 - Operationalize Audits)
- Issue #149 (Phase 3 - Productize Security)

---

## 🔒 Security Notes

- **Never commit tokens** to version control
- **Browser auth** is the most secure method
- Credentials stored in `~/.config/gh/hosts.yml` (user-local, not in repo)
- SSH authentication is an alternative for additional security
- Use `gh auth logout` if you need to change authentication

---

## 🆘 Troubleshooting

```bash
# Check current auth status
gh auth status

# Switch to different account
gh auth switch

# Refresh credentials
gh auth refresh

# Clear authentication
gh auth logout
```

For more help:
```bash
gh auth --help
gh auth login --help
```
