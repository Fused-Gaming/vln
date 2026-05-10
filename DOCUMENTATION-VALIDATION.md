# Documentation Validation & Formatting Workflow

Complete guide to the automated documentation validation and formatting system for VLN.

## Overview

The documentation validation workflow ensures:

- ✅ **Markdown Linting** - Consistent style and formatting
- ✅ **Formatting Compliance** - Proper formatting with Prettier
- ✅ **Link Validation** - All documentation links are valid
- ✅ **Code Block Validation** - Proper language syntax and structure
- ✅ **Documentation Structure** - Required metadata and proper hierarchy
- ✅ **Pre-Flight Checks** - Comprehensive pre-deployment validation

## GitHub Actions Workflow

### Workflow: `markdown-validate.yml`

**Triggers:**
- Pushes to `main`, `development`, `feature/**` branches
- Pull requests to `main`, `development`
- Changes to markdown files (`.md`, `.mdx`)

**Runs on:** Ubuntu Latest

### Workflow Jobs

#### 1. Markdown Linting
```yaml
Job: markdown-lint
Runs: markdownlint CLI
Config: .markdownlintrc.json
Output: Style violations
```

**Checks:**
- Line length (max 120 characters)
- Proper heading structure
- List formatting
- Link validity
- Code fence formatting

#### 2. Markdown Formatting
```yaml
Job: markdown-format
Runs: Prettier
Config: .prettierrc.json
Output: Formatting issues
```

**Checks:**
- Prose wrap (always)
- Print width (100 characters)
- Consistent line endings
- Trailing commas in lists

#### 3. Link Validation
```yaml
Job: link-validation
Runs: markdown-link-check
Config: .github/markdown-link-check-config.json
Output: Broken links
```

**Checks:**
- Internal links exist
- External links resolve
- Anchor links valid
- No circular references

#### 4. Code Blocks Validation
```yaml
Job: code-blocks-validation
Runs: Custom Node.js script
Config: None
Output: Code block issues
```

**Checks:**
- Valid language identifiers
- Proper fence markers
- No empty code blocks
- Unclosed fences

#### 5. Documentation Structure
```yaml
Job: documentation-structure
Runs: Custom Node.js script
Config: None
Output: Structure issues
```

**Checks:**
- Required frontmatter (title, description)
- Heading hierarchy
- Minimum content length
- Proper link formats

#### 6. Pre-Flight Check
```yaml
Job: pre-flight-check
Runs: All previous jobs + summary
Config: Multiple configs
Output: Comprehensive report
```

**Checks:**
- File structure validation
- Markdown file validation
- Configuration validation
- Workflow validation
- PR comment with results

## Configuration Files

### `.markdownlintrc.json`

Markdown linting rules based on Prettier style.

**Key Settings:**
```json
{
  "line-length": 120,
  "no-hard-tabs": true,
  "blanks-around-headings": true,
  "heading-increment": true,
  "ol-prefix": "one_or_ordered",
  "ul-style": "dash"
}
```

### `.prettierrc.json`

Prettier formatting configuration.

**Key Settings:**
```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "proseWrap": "always",
  "parser": "markdown"
}
```

### `.github/markdown-link-check-config.json`

Link validation configuration.

## Validation Scripts

### `/github/scripts/validate-code-blocks.js`

Validates code blocks in markdown files.

**Usage:**
```bash
node .github/scripts/validate-code-blocks.js
```

**Output:**
- File-by-file report
- Language identifier validation
- Empty/unclosed block detection
- Issues and fixes

### `.github/scripts/validate-doc-structure.js`

Validates documentation structure.

**Usage:**
```bash
node .github/scripts/validate-doc-structure.js
```

**Output:**
- Frontmatter validation
- Heading hierarchy check
- Link validation
- Content length check

### `.github/scripts/pre-flight-validation.js`

Comprehensive pre-deployment validation.

**Usage:**
```bash
node .github/scripts/pre-flight-validation.js
```

**Output:**
- Overall status report
- Configuration validation
- File structure check
- Workflow validation
- JSON report file

## Running Locally

### Run All Validation

```bash
# Install tools
npm install -g markdownlint-cli prettier markdown-link-check

# Run linting
markdownlint "**/*.md" --config .markdownlintrc.json

# Check formatting
prettier --check "**/*.md" --prose-wrap always

# Validate links
find . -name "*.md" | while read file; do
  markdown-link-check "$file" -c .github/markdown-link-check-config.json
done

# Run custom validations
node .github/scripts/validate-code-blocks.js
node .github/scripts/validate-doc-structure.js
node .github/scripts/pre-flight-validation.js
```

### Fix Formatting Issues

```bash
# Auto-fix formatting with Prettier
prettier --write "**/*.md" --prose-wrap always
```

### Quick Check

```bash
# Simple validation script
npm run docs:validate
```

## Documentation Standards

### Frontmatter

Every markdown file must start with YAML frontmatter:

```yaml
---
title: Page Title
description: Brief description for search and previews
---
```

**Required Fields:**
- `title` - Page title (string)
- `description` - Page description (string, 120 chars max)

### Heading Hierarchy

```markdown
# Main Title (H1)

## Section (H2)

### Subsection (H3)

#### Detail (H4)
```

**Rules:**
- Start with H1
- Don't skip levels (H1 → H3 is invalid)
- Use consistent capitalization

### Code Blocks

```typescript
// Valid language identifiers
```bash     // Shell
```python   // Python
```javascript // JavaScript
```typescript // TypeScript
```sql      // SQL
```yaml     // YAML
```json     // JSON
```html     // HTML
```
```

**Rules:**
- Always specify language
- Valid identifier required (see full list in validate-code-blocks.js)
- Close all code fences
- No empty code blocks

### Links

**Internal Links:**
```markdown
[Page Title](/docs/section/page)
[Anchor Link](#section-heading)
```

**External Links:**
```markdown
[GitHub](https://github.com/Fused-Gaming/vln)
```

**Rules:**
- Use relative paths for internal docs
- Use full URLs for external links
- Keep anchor links lowercase with hyphens
- Link text should be descriptive

## GitHub Actions Workflow Triggers

### Push Events
```
Triggers when:
- Commits pushed to main, development, feature/* branches
- Any markdown file (*.md, *.mdx) changed
- Config files changed (.markdownlintrc.json, .prettierrc.json)
- Workflow file itself changed
```

### Pull Request Events
```
Triggers when:
- PR opened to main, development
- Any markdown file changed
- Config files changed
- Workflow file changed

Posts comment with validation results
```

## PR Comments

When a PR is validated, a comment is posted with:

```markdown
## ✅ Markdown Validation Report

| Check | Status | Details |
|-------|--------|---------|
| Linting | Pass | 0 issues |
| Formatting | Pass | 0 files |
| Links | Pass | 0 broken |
| Code Blocks | Pass | 0 issues |
| Structure | Pass | 0 issues |

**Overall:** PASS

All validations passed successfully.
```

## Common Issues & Fixes

### Formatting Issues

**Error:** Files fail prettier check

**Fix:**
```bash
prettier --write "**/*.md" --prose-wrap always
git add .
git commit -m "style: fix markdown formatting"
git push
```

### Missing Frontmatter

**Error:** Document missing frontmatter

**Fix:** Add to top of file
```yaml
---
title: Your Page Title
description: Brief description here
---

# Your Page Title

Content starts here...
```

### Invalid Language in Code Block

**Error:** Invalid language identifier "js" (should be "javascript")

**Fix:** Use valid language from list:
- `javascript` not `js`
- `typescript` not `ts`
- `bash` not `shell`
- etc.

### Broken Links

**Error:** Link to non-existent page

**Fix:** Verify path
```markdown
# Wrong
[Link](/docs/section/nonexistent)

# Right (if file exists)
[Link](/docs/section/existing-page)
```

### Heading Hierarchy

**Error:** H2 followed by H4 (skipped H3)

**Fix:** Use proper hierarchy
```markdown
# H1 - Main Title

## H2 - Section

### H3 - Subsection

#### H4 - Detail
```

## Best Practices

### Before Committing

```bash
# 1. Auto-format with Prettier
prettier --write "**/*.md"

# 2. Run linting
markdownlint "**/*.md"

# 3. Validate code blocks
node .github/scripts/validate-code-blocks.js

# 4. Check structure
node .github/scripts/validate-doc-structure.js

# 5. Run pre-flight
node .github/scripts/pre-flight-validation.js
```

### In Pull Requests

1. GitHub Actions automatically validates
2. Review the validation report comment
3. Fix any issues flagged
4. Push fix to same PR
5. Validation re-runs automatically

### Documentation Quality

- **Clarity:** Write in clear, concise language
- **Completeness:** Include all required sections
- **Consistency:** Follow established patterns
- **Correctness:** Verify code examples work
- **Currency:** Keep documentation up-to-date

## Troubleshooting

### Workflow Not Triggering

**Check:**
- Files changed match path filters
- Branch is in trigger list
- Workflow file is in `.github/workflows/`

### Script Errors

**Common causes:**
- Missing dependencies (npm install)
- Invalid paths (use absolute paths)
- Glob patterns not matching (check file extensions)

**Fix:**
```bash
# Reinstall dependencies
npm install

# Run with debugging
node --trace-warnings .github/scripts/validate-code-blocks.js
```

### Link Check False Positives

**Issue:** Valid links marked as broken

**Fix:** Update `.github/markdown-link-check-config.json`
```json
{
  "ignorePatterns": [
    "https://localhost:*"
  ]
}
```

## Continuous Integration

All validation runs automatically:

1. **On Push** - To feature branches
2. **On PR** - To main/development
3. **Before Merge** - All checks must pass
4. **Artifact Upload** - Reports saved for 30 days

## Related Documentation

- [Documentation Getting Started](/docs/DOCUMENTATION-GETTING-STARTED.md)
- [Design Standards](/docs/PERALTA-DESIGN-STANDARDS.md)
- [Contributing Guidelines](/CONTRIBUTING.md)

## Support

For issues with validation:

1. Check configuration files are valid JSON
2. Verify markdown files have proper syntax
3. Review GitHub Actions logs
4. Check artifact reports
5. Open an issue with validation report

---

**Last Updated:** 2026-04-28  
**Status:** Active  
**Maintained By:** VLN Team
