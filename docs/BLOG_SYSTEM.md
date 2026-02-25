# 📝 VLN Blog & Articles System

> **Automatically generate blog entries from documentation. Single source, maximum impact.**

---

## Overview

The VLN Blog System automatically transforms documentation into published blog content. Write documentation once, and it's automatically compiled into blog posts, feeds, and sitemaps.

### Key Features

✅ **Auto-Generation** — Blog posts generated from research, security, and infrastructure docs
✅ **Smart Categories** — Articles, research, releases, announcements
✅ **Feed Generation** — JSON Feed + Atom/RSS for subscriptions
✅ **Sitemap Support** — Automatic sitemap generation for SEO
✅ **Metadata Extraction** — Title, date, author auto-extracted
✅ **GitHub Integration** — Source links back to documentation
✅ **Zero-Divergence** — Blog content synced from single source

---

## Architecture

```
docs/
├── _source/
│   └── blog/                           # ⭐ Blog source files
│       ├── articles/                   # General articles
│       ├── research/                   # Research findings
│       ├── releases/                   # Release notes
│       └── announcements/              # Announcements
│
├── _generated/
│   └── blog/                           # 🤖 AUTO-GENERATED blog entries
│       ├── articles/
│       ├── research/
│       ├── releases/
│       ├── announcements/
│       ├── feed.json                   # JSON Feed format
│       ├── atom.xml                    # Atom/RSS feed
│       ├── sitemap.json                # SEO sitemap
│       └── index.json                  # Blog index
│
└── _sync/
    └── blog/                           # Synced to docs-site/src/content/blog/
        └── [same structure as _generated/blog]
```

---

## How It Works

### 1. Auto-Generation from Documentation

The system watches specific documentation categories and auto-generates blog posts:

**Research Files** → Blog posts in "research" category
```
docs/_source/research/rng-analysis/*.md  →  Blog entry
docs/_source/research/smart-contracts/*.md  →  Blog entry
docs/_source/research/wallet-flows/*.md  →  Blog entry
```

**Security Files** → Blog posts in "security" category
```
docs/_source/security/threat-modeling/*.md  →  Blog entry
docs/_source/security/audit-methodology/*.md  →  Blog entry
docs/_source/security/vulnerability-scoring/*.md  →  Blog entry
```

**Infrastructure Files** → Blog posts in "infrastructure" category
```
docs/_source/infrastructure/database/*.md  →  Blog entry
docs/_source/infrastructure/networking/*.md  →  Blog entry
docs/_source/infrastructure/storage/*.md  →  Blog entry
```

### 2. Blog Entry Generation

When content is detected, the system:

1. **Extracts Metadata**
   - Title from existing frontmatter or H1 heading
   - Date from frontmatter or file modified time
   - Author from frontmatter or defaults to "VLN Team"
   - Description from existing frontmatter or first paragraph

2. **Generates Frontmatter**
   ```yaml
   title: "RNG Analysis Results"
   description: "Statistical analysis of gaming RNG implementation"
   date: "2026-02-25"
   author: "VLN Team"
   category: "research"
   featured: false
   tags: [research, rng, gaming]
   sourceFile: "docs/_source/research/rng-analysis/statistical-analysis.md"
   editUrl: "https://github.com/Fused-Gaming/vln/tree/main/..."
   published: true
   ```

3. **Creates Blog Post**
   - File: `docs/_generated/blog/research/2026-02-25-rng-analysis-results.md`
   - Includes source link for easy editing
   - Ready for publishing

### 3. Feed Generation

Automatically generates:

**JSON Feed** (`.feed.json`)
```json
{
  "version": "1.0",
  "title": "VLN Blog",
  "description": "Security research, insights, and updates from VLN",
  "entries": [
    {
      "title": "RNG Analysis Results",
      "date": "2026-02-25",
      "description": "Statistical analysis...",
      "author": "VLN Team",
      "url": "/blog/research/2026-02-25-rng-analysis-results/"
    }
  ]
}
```

**Atom Feed** (`.atom.xml`)
```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>VLN Blog</title>
  <entry>
    <title>RNG Analysis Results</title>
    <published>2026-02-25</published>
    <!-- ... -->
  </entry>
</feed>
```

**Sitemap** (`.sitemap.json`)
```json
[
  {
    "path": "research/2026-02-25-rng-analysis-results",
    "lastModified": "2026-02-25"
  }
]
```

---

## Directory Structure

### Blog Source Files

Write new blog content in `docs/_source/blog/`:

#### Articles (`articles/`)

General articles, insights, and updates:

```markdown
# My Article Title

Introduction and context...

## Section 1

Content...

## Section 2

More content...

---

Learn more in the [documentation](/docs/path).
```

#### Research (`research/`)

Technical research and analysis:

```markdown
# Smart Contract Vulnerability Analysis

Executive summary...

## Methodology

How we analyzed...

## Findings

What we discovered...

## Recommendations

What should be done...
```

#### Releases (`releases/`)

Release notes and version updates:

```markdown
# VLN v1.2.0 Release

## What's New

- Feature 1
- Feature 2
- Feature 3

## Bug Fixes

- Fixed issue #123
- Fixed issue #124

## Breaking Changes

- Removed deprecated API

## Migration Guide

How to upgrade...
```

#### Announcements (`announcements/`)

Important announcements and news:

```markdown
# VLN Partners with Company X

We're excited to announce...

## What This Means

Benefits of the partnership...

## Timeline

When things happen...

## Learn More

[Partnership details](link)
```

---

## Writing Blog Content

### Option 1: Write in Blog Source

Create new files in `docs/_source/blog/`:

```bash
touch docs/_source/blog/articles/my-article.md
```

Write with optional frontmatter:

```markdown
---
title: My Custom Title
description: Custom description
author: Your Name
date: 2026-02-25
tags: [tag1, tag2]
featured: true
---

# My Article Title

Content here...
```

### Option 2: Document → Blog Auto-Generation

Write documentation in `docs/_source/research/`, `docs/_source/security/`, or `docs/_source/infrastructure/`:

```bash
touch docs/_source/research/rng-analysis/new-study.md
```

The system automatically:
- ✅ Detects the documentation file
- ✅ Generates blog metadata
- ✅ Creates a blog entry in `_generated/blog/`
- ✅ Makes it available for publishing

**Trigger:** Push to your branch

```bash
git add docs/_source/research/
git commit -m "research: add new rng analysis"
git push origin feature/rng-study
```

---

## Publishing Blog Posts

### Manual Publishing

1. **Write or auto-generate** blog entry in `docs/_source/blog/`
2. **Push to feature branch**
3. **PR created** → Blog preview available
4. **Merge to `integration/vln`** → Published automatically

### Automated Publishing

The workflow:

1. **Detects changes** to `docs/_source/`
2. **Generates blog entries** with `generate-blog-entries.js`
3. **Syncs to docs-site** with `sync-blog.js`
4. **Generates feeds** (JSON, Atom, sitemap)
5. **Commits** `docs/_generated/blog/` and `docs/_sync/blog/`

### Feed Subscriptions

Users can subscribe to:

- **JSON Feed:** `https://vln.gg/blog/feed.json`
- **Atom Feed:** `https://vln.gg/blog/atom.xml`
- **Sitemap:** `https://vln.gg/blog/sitemap.json`

---

## Scripts

### Generate Blog Entries

Trigger blog generation from documentation:

```bash
node scripts/generate-blog-entries.js
```

**What it does:**
- Reads source files from configured categories
- Extracts or generates metadata
- Creates dated blog entries in `docs/_generated/blog/`
- Updates `index.json`

**Output:**
```
✓ research: 3 blog entries generated
✓ security: 2 blog entries generated
✓ infrastructure: 1 blog entry generated
✓ Total entries generated: 6
```

### Sync Blog Content

Sync generated blog to docs-site:

```bash
node scripts/sync-blog.js
```

**What it does:**
- Copies blog entries to `docs/_sync/blog/`
- Copies to `docs-site/src/content/blog/`
- Generates JSON Feed
- Generates Atom/RSS Feed
- Generates sitemap

**Output:**
```
✓ 6 blog posts synced to docs/_sync/blog/
✓ Blog synced to docs-site/src/content/blog/
✓ Generated JSON Feed and Atom Feed
✓ Blog sitemap: 6 entries
```

---

## Workflow Integration

### Automatic On Every Commit

When you push changes:

```bash
git push origin feature/new-research
```

GitHub Actions:
1. **Sync documentation** from `docs/_source/`
2. **Generate blog entries** from research/security/infrastructure
3. **Sync blog content** to docs-site
4. **Build documentation sites**
5. **Create PR comment** with status

### Deployment

Blog posts are automatically deployed with:
- `docs-site` — Published to documentation site
- **Feed URLs** — Available for subscriptions
- **GitHub Pages** — Can be hosted on gh-pages

---

## Best Practices

### Do ✅

- ✅ Keep blog posts focused on specific topic
- ✅ Use clear, descriptive titles
- ✅ Include examples and code blocks
- ✅ Link to related documentation
- ✅ Provide context and motivation
- ✅ Include "Edit on GitHub" link (auto-added)
- ✅ Target audience clearly

### Don't ❌

- ❌ Don't duplicate content across blog and docs
- ❌ Don't manually edit generated blog entries
- ❌ Don't commit to `docs/_generated/blog/` directly
- ❌ Don't remove frontmatter from blog posts
- ❌ Don't publish draft content without review
- ❌ Don't edit dates (breaks feed ordering)

---

## Examples

### Example 1: Research Article

**Source:** `docs/_source/research/wallet-flows/user-flow-analysis.md`

```markdown
# User Wallet Flow Analysis

We analyzed wallet flows for 10K+ gaming transactions.

## Methodology

Transaction sampling and risk classification...

## Findings

Critical patterns identified:
- 3.2% show unusual withdrawal patterns
- 0.8% exhibit signature spoofing attempts
- 12.1% use high-risk wallets

## Recommendations

1. Implement real-time monitoring
2. Add 2FA for high-value transactions
3. Block flagged wallets

[Full technical details →](/docs/research/wallet-flows)
```

**Generated Blog:** `docs/_generated/blog/research/2026-02-25-user-wallet-flow-analysis.md`

```markdown
---
title: "User Wallet Flow Analysis"
description: "Analysis of wallet flows for 10K+ gaming transactions"
date: "2026-02-25"
author: "VLN Team"
category: "research"
featured: false
tags: ["research", "wallet", "flow"]
sourceFile: "docs/_source/research/wallet-flows/user-flow-analysis.md"
editUrl: "https://github.com/Fused-Gaming/vln/tree/main/docs/_source/research/wallet-flows/user-flow-analysis.md"
published: true
---

[Original content + feed metadata]
```

### Example 2: Release Notes

**Source:** `docs/_source/blog/releases/v1.2.0.md`

```markdown
# VLN Security Platform v1.2.0

Released February 2026 with major improvements to smart contract auditing.

## ✨ New Features

- ML-based vulnerability detection (+45% accuracy)
- Real-time RNG monitoring dashboard
- Webhook integration for audit alerts
- Support for 15+ EVM-compatible chains

## 🐛 Bug Fixes

- Fixed false positives in signature validation
- Corrected gas estimation calculations
- Improved UI performance on large datasets

## Breaking Changes

- Deprecated `v1` API endpoints (use `v2`)
- Updated webhook payload format

[Migration guide →](/docs/guides/upgrading-to-v1-2)
```

**Published to:** `docs/_sync/blog/releases/` and auto-feeds generated

---

## FAQ

**Q: Can I manually control blog publication?**
A: Blog entries in `docs/_source/blog/` are always published. Use a `published: false` frontmatter key to hide entries.

**Q: How often are blog entries generated?**
A: On every push to any branch. Quick deterministic process.

**Q: Can blog entries be different per site?**
A: Not recommended. Blog sync is unified. Use categories to organize.

**Q: How do I feature a blog post?**
A: Add `featured: true` to frontmatter, and sites can display featured posts prominently.

**Q: Can I auto-generate from docs I didn't write?**
A: Yes, auto-generation watches specific directories (research, security, infrastructure) and extracts metadata automatically.

**Q: How do people subscribe to the blog?**
A: Provide subscription links to feeds:
- JSON: `https://vln.gg/blog/feed.json`
- Atom: `https://vln.gg/blog/atom.xml`

**Q: Can I customize the blog feed?**
A: Yes, edit `blog.adapter.json` to change behavior, or modify `scripts/sync-blog.js` for feed generation.

---

## Resources

- **Documentation System:** `/docs/DOCUMENTATION_SYSTEM.md`
- **Blog Adapter:** `/docs/_adapters/blog.adapter.json`
- **Blog Source:** `/docs/_source/blog/`
- **Scripts:** `/scripts/generate-blog-entries.js`, `/scripts/sync-blog.js`
- **Workflow:** `.github/workflows/auto-update-docs.yml`

---

## Support

For blog system issues:

1. Check CI logs: `.github/workflows/auto-update-docs.yml`
2. Run locally: `node scripts/generate-blog-entries.js`
3. Verify metadata extraction
4. Check `docs/_generated/blog/index.json`
5. Ask in #documentation channel

🤖 **Blog System** — Managed by VLN Documentation Bot
