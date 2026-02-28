# VLN Developer Guides

**Comprehensive guides for working on VLN with Claude Code and standard development practices.**

---

## 📚 Quick Navigation

### For New Contributors

1. **[Getting Started with Claude Code](./claude-code-workflow.md)** ← Start here!
   - Quick start (5 minutes)
   - Git workflow and branching
   - Basic prompting patterns
   - Common project context

2. **[Claude Code Prompting Templates](./claude-code-prompts.md)**
   - Reusable prompt templates for common tasks
   - Exploration, implementation, debugging patterns
   - VLN-specific templates
   - Tips for better results

### For Experienced Developers

3. **[Advanced Claude Code Techniques](./claude-code-advanced.md)**
   - Complex refactoring and architecture
   - Database schema design and migrations
   - Performance optimization
   - Parallel task execution
   - Team collaboration patterns

---

## 🚀 Quick Start (5 Minutes)

### 1. Clone and Open

```bash
git clone https://github.com/Fused-Gaming/vln.git
cd vln
claude code .
```

### 2. Create Your Feature Branch

```bash
git checkout integration/vln
git pull origin integration/vln
git checkout -b feature/your-feature-name
```

### 3. Ask Claude Code for Help

```
I want to build [feature].

Before coding, can you explore the codebase to understand:
- How similar features are structured
- What components and patterns are used
- Any constraints I should know about
```

### 4. Review and Iterate

Claude Code will explore, explain, and implement. You review and give feedback.

### 5. Commit and Push

```bash
# Claude Code will commit with proper conventions
# Then push to your feature branch
git push -u origin feature/your-feature-name
```

### 6. Create a Pull Request

Target: `integration/vln` (never `main`)

---

## 📖 By Task Type

### I want to...

| Goal | Start Here |
|------|-----------|
| **Add a new page/route** | [Claude Code Workflow: Pattern 1](./claude-code-workflow.md#pattern-1-adding-a-new-page) |
| **Build a new component** | [Claude Code Workflow: Pattern 2](./claude-code-workflow.md#pattern-2-api-endpoint-with-validation) |
| **Create an API endpoint** | [Prompts: Build an API Endpoint](./claude-code-prompts.md#build-an-api-endpoint) |
| **Fix a bug** | [Prompts: Fix a bug](./claude-code-prompts.md#fix-a-bug) |
| **Understand existing code** | [Prompts: Understand an existing feature](./claude-code-prompts.md#understand-an-existing-feature) |
| **Refactor code** | [Advanced: Complex Refactoring](./claude-code-advanced.md#complex-code-refactoring) |
| **Optimize performance** | [Advanced: Performance & Monitoring](./claude-code-advanced.md#performance--monitoring) |
| **Set up a database** | [Advanced: Database & Backend](./claude-code-advanced.md#database--backend-integration) |
| **Debug a complex issue** | [Advanced: Debugging Complex Issues](./claude-code-advanced.md#debugging-complex-issues) |

---

## 🎯 Key Concepts

### Git Workflow

```
main (production)
  ↓
integration/vln (active development)
  ↓
feature/your-feature (your work here)
```

**Rules:**
- Always branch from `integration/vln`
- Always PR to `integration/vln` (never `main`)
- Commit messages follow: `type(scope): description`

### Commit Types

```
feat(components): add audit intake form    # New feature
fix(api): correct payload validation       # Bug fix
docs: update CLAUDE.md                    # Documentation
refactor(ui): simplify button             # Code restructuring
chore: update dependencies                # Maintenance
test: add audit form tests                # Tests
```

### VLN Branding

**Colors (use these):**
- `#a6c3a7` — Sage green (primary accent)
- `#0f0f0f` — Matte charcoal (background)
- `#aab7c8` — Warm blue-gray (secondary)

**Fonts:**
- Inter (UI)
- JetBrains Mono (code)

**Design Token:**
- Radius: 12px
- Shadow hover: `shadow-[0_0_0_0] hover:shadow-[0_0_8px_#a6c3a7]`

### Tech Stack

```
Framework:   Next.js 15 (App Router)
Language:    TypeScript 5.x
Styling:     Tailwind CSS
Components:  Shadcn/UI + VLN custom
Database:    PostgreSQL + Prisma (planned)
Auth:        NextAuth.js (planned)
```

---

## ⚡ Common Prompts

### For Exploration

```
Can you explore the codebase and show me how [pattern] is implemented?
```

### For Implementation

```
I need to build [component/feature].

Requirements:
- [requirement 1]
- [requirement 2]

Please:
1. Explore similar implementations first
2. Explain your approach
3. Create the implementation
4. Verify the build passes
```

### For Debugging

```
[Problem description]

Can you:
1. Locate the issue
2. Explain what's wrong
3. Implement the fix
4. Verify the build passes
```

### For Code Review

```
Before I create a PR, can you:
1. Run pnpm build
2. Run pnpm lint
3. Check TypeScript
4. Verify accessibility
5. Report any issues
```

---

## 🔍 Understanding the Codebase

### Project Structure

```
app/
├── (site)/              # Public marketing pages
├── services/            # Security/audit service pages
├── contact/             # Contact and booking
├── api/                 # Backend API routes
└── layout.tsx

components/
├── ui/                  # Shadcn-based components
├── vln/                 # VLN brand components
└── icons/               # Icon components

lib/
├── utils/               # Utility functions
├── validation/          # Zod schemas
└── email/               # Email templates

docs/
├── design/              # Design system, mockups
├── devops/              # Deployment, CI/CD
├── guides/              # Developer guides
└── technical/           # Architecture docs
```

### Key Technologies

- **Next.js 15** — Modern React framework with App Router
- **Tailwind CSS** — Utility-first styling
- **Shadcn/UI** — Accessible React components
- **TypeScript** — Type safety for JavaScript
- **Zod** — Schema validation
- **Prisma** — Database ORM

### Development Commands

```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build (required before PR)
pnpm lint     # Check code quality
pnpm test     # Run tests
pnpm start    # Run production build locally
```

---

## ✅ Before Creating a PR

**Checklist:**

- [ ] Created feature branch from `integration/vln`
- [ ] Code follows TypeScript strict mode
- [ ] `pnpm build` passes without errors
- [ ] `pnpm lint` passes
- [ ] Responsive design (mobile-first tested)
- [ ] VLN branding applied correctly
- [ ] Accessibility checked (WCAG AA)
- [ ] Commit messages follow conventions
- [ ] Ready to PR to `integration/vln`

---

## 🤝 Working with Claude Code

### Claude Code is best for:

✅ Exploring codebases quickly
✅ Implementing features end-to-end
✅ Fixing bugs with research
✅ Refactoring and optimization
✅ Code review and quality checks
✅ Generating documentation
✅ Running tests and builds

### What Claude Code won't do:

❌ Contribute to production `main` branch directly
❌ Push without your approval
❌ Make decisions without explaining first
❌ Bypass security or accessibility standards

### How to get the best results:

1. **Be specific** — "Add a button" vs. "Add a primary CTA button that submits the form"
2. **Provide context** — Link to existing files that should be used as patterns
3. **Ask to explain first** — "Before coding, explain your approach"
4. **Request verification** — "Ensure the build passes before committing"
5. **Break down complex tasks** — Let Claude Code show progress between steps

---

## 🐛 Getting Help

### Common Issues

**Build failing?**
```
The build failed with: [error]
Can you identify and fix the issue?
```

**Git branch problems?**
```
My branch is behind integration/vln.
Can you fetch, rebase, and resolve conflicts?
```

**Component not rendering?**
```
[ComponentName] should appear at [location] but doesn't.
Can you debug?
```

### Resources

- **Project Instructions:** `/CLAUDE.md` (root)
- **Design System:** `/docs/design/`
- **Architecture:** `/docs/architecture/`
- **DevOps:** `/docs/devops/`

### Questions?

1. Ask Claude Code directly — it understands VLN's project context
2. Check existing documentation in `/docs/`
3. Review similar implementations in the codebase

---

## 📝 Contributing to These Guides

If you discover new patterns, tips, or improvements to these guides:

1. Create a branch: `feature/improve-guides`
2. Add your content or improvements
3. Create a PR to `integration/vln`
4. Include context about what you added and why

---

## 🎓 Learning Path

**New to VLN?**
1. Read "Getting Started with Claude Code" (this takes 10-15 minutes)
2. Create a simple feature using a template from "Prompting Templates"
3. Get feedback from the team

**Want advanced techniques?**
1. Review "Advanced Claude Code Techniques"
2. Try a complex task (refactoring, performance optimization, etc.)
3. Use parallel execution to speed up your work

---

**Ready to build?** Start with [Getting Started with Claude Code](./claude-code-workflow.md)!

---

*Last updated: February 2026*
*For VLN Contributors and Developers*
