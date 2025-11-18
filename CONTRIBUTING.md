# Contributing to VLN

Thank you for your interest in contributing to VLN (Vulnerability Lab Network)! We welcome contributions from the community and appreciate your efforts to improve our platform.

This guide will help you understand our development process and how to submit contributions effectively.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to hello@vln.gg.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or higher
- **pnpm** 8.0 or higher
- **Git** installed and configured
- A **GitHub account**

### Fork and Clone

1. **Fork the repository** on GitHub

2. **Clone your fork:**

```bash
git clone https://github.com/YOUR_USERNAME/vln.git
cd vln
```

3. **Add upstream remote:**

```bash
git remote add upstream https://github.com/Fused-Gaming/vln.git
```

4. **Install dependencies:**

```bash
pnpm install
```

5. **Verify installation:**

```bash
pnpm dev
```

Visit `http://localhost:3000` to confirm the development server is running.

---

## Development Workflow

### Branch Strategy

VLN uses an **integration-first branching model**:

- **`main`** — Production branch (protected)
- **`integration/vln`** — Active integration branch
- **`feature/*`** — Feature branches
- **`fix/*`** — Bug fix branches
- **`docs/*`** — Documentation branches

### Creating a Feature Branch

```bash
# Sync with upstream
git checkout integration/vln
git pull upstream integration/vln

# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Commit with conventional commits
git add .
git commit -m "feat(scope): add your feature"

# Push to your fork
git push origin feature/your-feature-name
```

### Keeping Your Branch Updated

```bash
# Fetch upstream changes
git fetch upstream

# Rebase on integration/vln
git checkout feature/your-feature-name
git rebase upstream/integration/vln

# Force push to your fork (if already pushed)
git push origin feature/your-feature-name --force-with-lease
```

---

## Pull Request Process

### Before Submitting

Ensure your contribution meets these requirements:

- [ ] Code builds successfully (`pnpm build`)
- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Code follows our style guide
- [ ] Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Documentation is updated (if needed)
- [ ] No merge conflicts with `integration/vln`

### Submitting a Pull Request

1. **Push to your fork:**

```bash
git push origin feature/your-feature-name
```

2. **Create PR on GitHub:**
   - Base branch: `integration/vln` (NOT `main`)
   - Compare branch: `your-fork:feature/your-feature-name`

3. **Fill out PR template:**
   - Clear title using conventional commits format
   - Detailed description of changes
   - Link related issues
   - Add screenshots (if UI changes)
   - List breaking changes (if any)

4. **Request review:**
   - Tag relevant maintainers
   - Respond to feedback promptly
   - Make requested changes

### PR Review Process

1. **Automated Checks**
   - CI/CD pipeline runs
   - Build verification
   - Test execution
   - Lint checks

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Maintain respectful discussion

3. **Merge**
   - Maintainer merges to `integration/vln`
   - Feature branch can be deleted
   - Changes deployed to staging

---

## Coding Standards

### TypeScript

- **Strict mode enabled** — No `any` types unless absolutely necessary
- **Type everything** — Explicit types for function parameters and returns
- **Use interfaces** for object shapes
- **Prefer const** over let

**Example:**

```typescript
// Good
interface User {
  id: string;
  email: string;
  role: 'admin' | 'client';
}

function getUser(id: string): Promise<User | null> {
  // Implementation
}

// Bad
function getUser(id: any) {
  // Implementation
}
```

### React & Next.js

- **Server Components by default** — Use `'use client'` only when necessary
- **Component file structure:**

```tsx
// 1. Imports
import { ComponentProps } from './types';

// 2. Types/Interfaces
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

// 3. Component
export function Button({ variant, children }: ButtonProps) {
  return <button className={variant}>{children}</button>;
}
```

- **Naming conventions:**
  - Components: `PascalCase` (e.g., `AuditForm`)
  - Files: `kebab-case` (e.g., `audit-form.tsx`)
  - Utilities: `camelCase` (e.g., `formatDate`)

### Styling

- **Tailwind CSS only** — No custom CSS unless absolutely necessary
- **Design tokens** — Use VLN design tokens from BRANDING.md
- **Responsive** — Mobile-first approach
- **Accessibility** — WCAG AA compliance

**Example:**

```tsx
// Good
<button className="bg-vln-sage text-vln-bg hover:shadow-[0_0_8px_#a6c3a7] transition-all">
  Submit Audit
</button>

// Bad
<button style={{ backgroundColor: '#a6c3a7' }}>
  Submit Audit
</button>
```

### File Organization

```
components/
├── ui/              # Shadcn base components
├── vln/             # VLN custom components
│   ├── audit-form/
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── __tests__/
│   │       └── audit-form.test.tsx
│   └── ...
└── icons/
```

### Naming Files

- **Component files:** `component-name.tsx`
- **Utility files:** `util-name.ts`
- **Type files:** `types.ts`
- **Test files:** `component-name.test.tsx`
- **API routes:** `route.ts`

---

## Testing Guidelines

### Unit Tests

- **Vitest** for unit testing
- **Test file location:** Co-located in `__tests__/` directory
- **Coverage requirements:**
  - Lines: 80%
  - Branches: 70%
  - Functions: 75%

**Example:**

```typescript
// components/vln/button/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-vln-sage');
  });
});
```

### E2E Tests

- **Playwright** for end-to-end testing
- **Test critical user flows:**
  - Authentication
  - Form submissions
  - Payment flows
  - Report viewing

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

---

## Documentation

### Code Comments

- **When to comment:**
  - Complex algorithms
  - Non-obvious business logic
  - Security-sensitive code
  - Public API functions

- **When NOT to comment:**
  - Self-explanatory code
  - Obvious variable names
  - Implementation details (use function names instead)

**Example:**

```typescript
// Good
/**
 * Validates RNG output against chi-square test
 * @param values - Array of random values
 * @param threshold - Significance level (default: 0.05)
 * @returns true if distribution is statistically random
 */
function validateRNGDistribution(values: number[], threshold = 0.05): boolean {
  // Implementation
}

// Bad
// This function validates RNG
function validate(v: any) {
  // Loop through values
  for (let i = 0; i < v.length; i++) {
    // Do something
  }
}
```

### Documentation Updates

When your changes require documentation updates:

- Update relevant `.md` files
- Add JSDoc comments to public APIs
- Update examples in README
- Add migration guides for breaking changes

---

## Commit Guidelines

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(audit): add RNG analysis form` |
| `fix` | Bug fix | `fix(api): handle null user sessions` |
| `docs` | Documentation | `docs: update contribution guidelines` |
| `style` | Code style | `style(button): fix tailwind spacing` |
| `refactor` | Code refactoring | `refactor(auth): simplify session logic` |
| `perf` | Performance | `perf(api): optimize database queries` |
| `test` | Tests | `test(form): add validation tests` |
| `chore` | Maintenance | `chore: update dependencies` |
| `ci` | CI/CD | `ci: add security scanning workflow` |

### Commit Message Examples

```bash
# Feature
feat(vln): add wallet flow risk modeling dashboard

# Bug fix
fix(api): prevent SQL injection in audit endpoint

# Breaking change
feat(auth)!: migrate to OAuth 2.0

BREAKING CHANGE: Session tokens are no longer supported.
Migrate to OAuth 2.0 using the new authentication flow.

# Multi-line
feat(reports): add PDF export functionality

- Generate PDF from audit results
- Include vulnerability severity charts
- Support custom branding

Closes #123
```

---

## Pull Request Template

When creating a PR, use this template:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing performed

## Screenshots (if applicable)

[Add screenshots here]

## Related Issues

Closes #123
Related to #456

## Checklist

- [ ] Code builds successfully
- [ ] All tests pass
- [ ] Linting passes
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (if needed)
- [ ] No breaking changes (or documented)
```

---

## Getting Help

### Resources

- **Documentation:** [docs/](docs/)
- **Design System:** [BRANDING.md](BRANDING.md)
- **Development Guide:** [CLAUDE.md](CLAUDE.md)
- **Security Policy:** [SECURITY.md](SECURITY.md)

### Communication

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** Questions and general discussion
- **Email:** hello@vln.gg

### Good First Issues

Look for issues labeled `good first issue` for beginner-friendly contributions.

---

## Recognition

Contributors will be:

- Listed in project documentation
- Credited in release notes
- Given shoutouts in community updates

---

## License

By contributing to VLN, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).

---

**Thank you for contributing to VLN!** Your efforts help build better security infrastructure for the gaming industry.
