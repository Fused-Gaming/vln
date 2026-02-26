# Claude Code Development Workflow for VLN

**For: Developers and Contributors**

This guide explains how to use Claude Code effectively when working on VLN—covering git operations, prompting strategies, project context, and advanced agent orchestration.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Git Workflow](#git-workflow)
3. [Prompting Best Practices](#prompting-best-practices)
4. [Project Context Setup](#project-context-setup)
5. [Agent Orchestration](#agent-orchestration)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### 1. Open VLN in Claude Code

```bash
cd /path/to/vln
claude code .
```

### 2. Check Current Branch

```bash
git status
```

You should be on `integration/vln` or a feature branch starting with `feature/`.

### 3. Create Your Feature Branch

```bash
git checkout integration/vln
git pull origin integration/vln
git checkout -b feature/your-feature-name
```

### 4. Ask Claude Code for Help

```
I need to add a new audit intake form component.
Can you explore the codebase to understand the component structure?
```

---

## Git Workflow

### Branch Strategy

VLN uses an **integration-first branching model**:

```
main (production)
  ↑
  └── integration/vln (active development)
        ↑
        └── feature/component-name (your work)
```

**Key Rules:**
- Always base feature branches on `integration/vln`, not `main`
- Feature branches should be named: `feature/short-description`
- PRs target `integration/vln`, not `main`
- When using Claude Code, you may push to temporary `claude/*` branches for testing

### Creating a Feature Branch

```bash
git checkout integration/vln
git pull origin integration/vln
git checkout -b feature/audit-form-redesign
```

### Committing with Claude Code

When Claude Code commits your work, follow these conventions:

```
feat(components): add audit intake form
fix(api): correct payload validation
docs: update CLAUDE.md
chore: add CI script
refactor(ui): simplify button component
```

**Format:** `type(scope): description`

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation
- `chore` — Build, CI, dependencies
- `refactor` — Code restructuring (no feature/fix)
- `test` — Test additions or fixes
- `style` — Formatting (Prettier, linting)

### Pushing to Remote

Claude Code will push using:

```bash
git push -u origin feature/your-branch-name
```

If you're working on a temporary `claude/*` branch for testing:

```bash
git push -u origin claude/your-task-session-id
```

**Push Safety:**
- Always verify the branch name is correct before push
- Only push to branches you created
- Never force-push to `integration/vln` or `main`
- If push fails (403 error), verify the branch matches session requirements

---

## Prompting Best Practices

### Context Clues

When asking Claude Code to work on VLN, provide:

1. **What you want to build**
   ```
   "Add a new 'Advisory Library' page showing past VLN security research"
   ```

2. **Which part of the codebase** (if known)
   ```
   "Add it to app/(site)/advisory-library"
   ```

3. **Design/brand constraints**
   ```
   "Use sage green (#a6c3a7) accent, follow the card-lift shadow pattern"
   ```

4. **Any existing references**
   ```
   "Similar to the Services page at app/(site)/services/page.tsx"
   ```

### Effective Prompts for VLN

**For Exploration:**
```
Explore the codebase to understand:
- How page metadata is structured
- Where the component library is located
- How brand colors are applied in Tailwind

Then explain the patterns you found.
```

**For Implementation:**
```
I need to implement a security advisory card component.

Requirements:
- Display advisory title, severity level, and summary
- Use sage green for the "Critical" severity
- Include a "View Full Advisory" link
- Responsive design (mobile-first)
- Follows the card-lift shadow pattern from other VLN components

Please:
1. Search for similar components in the codebase
2. Create a new component at components/vln/AdvisoryCard.tsx
3. Add TypeScript types
4. Use only Tailwind + shadcn patterns
5. Make sure it matches VLN branding
```

**For Debugging:**
```
The build is failing with this error:
[paste error]

Can you:
1. Search for where this type is used
2. Identify what changed
3. Suggest a fix that follows VLN conventions
4. Check the build passes before committing
```

### Template: Task with Research Phase

```
I want to [goal].

Before implementing, please:
1. Explore the codebase to find [specific patterns/files]
2. Summarize what you found
3. Identify any potential issues

Then I'll approve the approach before you code.
```

---

## Project Context Setup

### CLAUDE.md Files

VLN includes a `CLAUDE.md` file at the root with project instructions. Claude Code reads this automatically.

**What's in CLAUDE.md:**
- Tech stack and commands
- Git workflow rules
- Architecture overview
- Design system specs (colors, fonts, tokens)
- Component standards
- Development guidelines

**When creating a subdirectory with different rules**, add a local `CLAUDE.md`:

```
# My Feature Branch Rules

## Commands
pnpm dev
pnpm build
pnpm test:my-feature

## Component Style
- Use client components sparingly
- Always include loading states
- Export TypeScript types

## API Endpoints
All POST endpoints must validate input with Zod.
```

Claude Code will respect both the root `CLAUDE.md` and any local version.

### Providing Extra Context

If Claude Code needs more context, add it in your prompt:

```
I'm working on the booking flow.

Here's the context:
- Bookings are stored in PostgreSQL via Prisma
- API endpoint: app/api/bookings/route.ts
- Email on confirmation uses Resend

Can you help me add a "Cancel Booking" feature?
```

### Brand Guidelines in Code

Claude Code has access to VLN's brand specs (from CLAUDE.md):

**Colors:**
```typescript
--vln-bg: #0f0f0f        // Matte charcoal
--vln-sage: #a6c3a7      // Sage green (primary accent)
--vln-bluegray: #aab7c8  // Warm blue-gray
--vln-accent: #a6c3a7    // Current accent (defaults to sage)
```

**Fonts:**
- Inter (primary)
- JetBrains Mono (technical content)

**Radius:** 12px
**Shadow Pattern:** `shadow-[0_0_0_0] hover:shadow-[0_0_8px_#a6c3a7]`

When asking Claude Code to build components, it will apply these automatically.

---

## Agent Orchestration

Claude Code supports specialized agents for different tasks. You can use them directly:

### Explore Agent

**Use when:** You need to understand how code is organized

```
I need to understand how authentication flows in VLN.
Can you explore the codebase and find:
- All NextAuth configuration
- Login/logout patterns
- Where session state is managed
```

The Explore agent will search efficiently and report back.

### Plan Agent

**Use when:** You want to plan a complex implementation before coding

```
I need to build a comprehensive audit dashboard.

Before coding, create a plan that includes:
- File structure
- Component hierarchy
- API endpoints needed
- Database schema changes
- Potential blockers
```

The Plan agent returns a detailed implementation strategy.

### General-Purpose Agent

**Use when:** You're tackling a complex, multi-step task

```
I need to add payment processing with Stripe.

Steps:
1. Research current Stripe setup
2. Design the payment flow
3. Create necessary API routes
4. Update the booking component
5. Test the full flow

Can you handle this end-to-end?
```

### Parallel Execution

Claude Code can run multiple agents simultaneously:

```
While I wait for the design mockups, can you:
1. (Explore agent) Map out the existing API structure
2. (Plan agent) Design the data schema for advisories
3. (General-purpose agent) Start building the form validation
```

Claude Code will work on all three in parallel and report back.

---

## Common Patterns

### Pattern 1: Adding a New Page

**Your prompt:**
```
Add a new "Team" page to the marketing site.

Requirements:
- Route: /team
- Show employee cards with names, roles, photos
- Mobile-responsive
- Use the same header/footer as other pages
- Apply VLN branding

Before coding, explore how the Services page is structured so I understand the pattern.
```

**What Claude Code will do:**
1. Explore the Services page structure
2. Ask clarifying questions if needed
3. Create `app/(site)/team/page.tsx`
4. Add metadata for SEO
5. Build responsive employee cards
6. Ensure it builds without errors

### Pattern 2: API Endpoint with Validation

**Your prompt:**
```
Create an API endpoint for submitting audit requests.

Specs:
- Route: POST /api/audits/request
- Input: company name, description, contact email
- Validate with Zod
- Return: { success: true, requestId: "..." }
- Error handling for invalid inputs

Check the existing API routes to understand the pattern first.
```

### Pattern 3: Component Refactoring

**Your prompt:**
```
The Button component is duplicated across several files.

Can you:
1. Find all instances of custom button code
2. Consolidate into components/vln/Button.tsx
3. Support: variant (primary/secondary), size, loading state
4. Update imports throughout the codebase
5. Ensure build passes
```

### Pattern 4: Performance Investigation

**Your prompt:**
```
The homepage is slow to load.

Can you:
1. Identify what's causing the slowdown
2. Check the bundle size
3. Look for inefficient images or scripts
4. Suggest optimizations
5. Run the build and check performance metrics
```

---

## Troubleshooting

### Build Fails After Changes

**What to ask Claude Code:**
```
The build failed with this error:
[paste error]

Can you:
1. Identify what went wrong
2. Check for TypeScript issues
3. Verify all imports are correct
4. Fix the issue and confirm build passes
```

### Git Push Fails (403 Error)

**Common cause:** Branch name doesn't match session requirements.

**Fix:**
```
My push failed with 403. Can you:
1. Check the current branch name
2. Verify it starts with 'claude/' and ends with my session ID
3. Push to the correct branch
```

### Component Not Rendering

**What to ask:**
```
The [ComponentName] component isn't rendering.

Can you:
1. Check if it's exported correctly
2. Verify imports in the parent component
3. Check for TypeScript type errors
4. Run the dev server and debug
```

### Styling Not Applied

**What to ask:**
```
The Tailwind classes aren't applying to [ComponentName].

Can you:
1. Verify Tailwind CSS is loaded
2. Check the Tailwind config for purge paths
3. Confirm the class names are valid Tailwind
4. Check for conflicting CSS
```

---

## Working with the VLN Team

### Before Submitting a PR

Ensure Claude Code has:
1. ✅ Run `pnpm build` successfully
2. ✅ Run `pnpm lint` with no errors
3. ✅ Created clear commit messages
4. ✅ Followed VLN branding guidelines
5. ✅ Added TypeScript types
6. ✅ Used server components by default
7. ✅ Tested responsive design (mobile-first)

### PR Checklist

When creating a PR to `integration/vln`:

```markdown
## Description
[What you built]

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring

## Testing
[How to test this locally]

## Screenshots (if applicable)
[Design/UI changes]

## Checklist
- [ ] Build passes (`pnpm build`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Follows VLN branding
- [ ] TypeScript strict mode
- [ ] Accessibility checked (WCAG AA)
- [ ] Mobile-responsive
```

---

## Resources

- **Root CLAUDE.md** — Full project instructions
- **docs/design/** — Design system, mockups, tokens
- **docs/devops/** — Deployment and CI/CD
- **docs/architecture/** — System design and security
- **CLAUDE.md directives** — What Claude Code prioritizes

---

**Next Steps:**

1. ✅ Read this guide
2. ✅ Open VLN in Claude Code: `claude code .`
3. ✅ Try a simple task: "Show me the structure of the app/ directory"
4. ✅ Create your feature branch and start building

**Questions?** Ask Claude Code directly—it's designed to help with context-aware answers.
