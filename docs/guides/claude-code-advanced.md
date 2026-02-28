# Claude Code Advanced Techniques for VLN

**For experienced Claude Code users and complex VLN tasks.**

---

## Advanced Git Operations

### Working with Multiple Branches

**Scenario:** You want Claude Code to manage multiple feature branches in parallel.

```
I'm working on two features in parallel:
1. Feature A on branch feature/audit-form
2. Feature B on branch feature-advisory-library

Can you:
1. Check what's currently staged/uncommitted
2. Stash any changes
3. Switch to the next branch
4. Show me the status

I'll tell you which branch to work on next.
```

### Rebasing & Merging Cleanly

**Scenario:** Your feature branch is behind `integration/vln`

```
Can you:
1. Fetch the latest from integration/vln
2. Rebase my current branch on top of it
3. Resolve any conflicts (I'll help if needed)
4. Show me what changed

Don't push yet—I want to review first.
```

### Amending & Reorganizing Commits

**Scenario:** You want to fix a commit message or combine commits

```
My last 3 commits are rough. Can you:
1. Show me the commit log
2. Squash the commits into one logical change
3. Use a clean commit message following conventions

Don't push—just prepare it locally.
```

---

## Complex Code Refactoring

### Extract Shared Logic Across Components

**Scenario:** You notice logic repeated in multiple components

```
I've noticed this pattern in:
- components/vln/ServiceCard.tsx
- components/vln/AdvisoryCard.tsx
- components/ui/Card.tsx

Can you:
1. Create a reusable utility or hook that encapsulates this logic
2. Update all three components to use it
3. Ensure types are correct
4. Run tests to verify nothing broke
5. Create a commit explaining the extraction
```

### Performance Optimization with Server/Client Split

**Scenario:** A page is slow because too much is running on the client

```
The /advisory page is slow on mobile.

Can you:
1. Identify what's rendering client-side vs. server-side
2. Move data fetching and processing to server components
3. Keep only interactive elements as client components
4. Measure the performance improvement (Lighthouse)
5. Commit with performance notes
```

### Type Safety Across API Layers

**Scenario:** You want type-safe integration between API and frontend

```
I want full type safety between my API endpoint and frontend.

API route: app/api/advisories/route.ts
Frontend component: components/vln/AdvisoryList.tsx

Can you:
1. Create a shared types file (lib/types/advisory.ts)
2. Update the API to export/use these types
3. Update the component to import and use them
4. Add Zod validation on the API
5. Ensure TypeScript catches any mismatches
```

---

## Database & Backend Integration

### Schema Design Review

**Scenario:** Before implementing, ensure your data model is sound

```
I'm building a booking system. Here's my Prisma schema:

[paste schema]

Can you:
1. Review for normalization
2. Check for missing indexes
3. Identify potential N+1 queries
4. Suggest improvements
5. Flag any security concerns

Don't implement yet—just review.
```

### API with Complex Validation

**Scenario:** Your endpoint needs sophisticated input validation

```
I have a booking API that needs to:
- Validate email format
- Ensure date is in the future
- Check that booking doesn't conflict with existing ones
- Verify user has credits

Can you:
1. Create comprehensive Zod schemas
2. Build the validation logic
3. Return clear error messages
4. Handle edge cases
5. Add TypeScript types for all responses
```

---

## Testing & Quality Assurance

### Test-Driven Component Development

**Scenario:** Build a component with tests from the start

```
I need a [ComponentName] that [requirements].

Can you:
1. Create test cases for the requirements
2. Create the component to pass the tests
3. Ensure all edge cases are covered
4. Show test coverage

Use Vitest and React Testing Library.
```

### Coverage Analysis

**Scenario:** You want to identify untested code paths

```
Can you:
1. Run the test suite with coverage reporting
2. Identify files with <80% coverage
3. Suggest what tests are missing
4. Help me write tests for critical paths
```

---

## Collaboration & Code Review

### Preparing a Detailed PR Description

**Scenario:** Create comprehensive documentation for reviewers

```
I'm ready for PR review. Can you:
1. Generate a detailed PR description including:
   - What problem this solves
   - Key implementation details
   - Breaking changes (if any)
   - Screenshots (if UI changes)
   - Testing steps
   - Dependencies added
2. Create a checklist for reviewers
```

### Addressing Review Feedback

**Scenario:** Reviewers want changes; organize the fixes

```
Here's the review feedback:
[paste feedback]

Can you:
1. Group feedback by topic
2. Identify which items are blockers
3. Implement all fixes
4. Create a new commit referencing the feedback
5. Verify nothing else broke
```

---

## Performance & Monitoring

### Lighthouse Analysis

**Scenario:** Improve Core Web Vitals

```
The homepage Lighthouse score is [score].

Can you:
1. Run Lighthouse locally
2. Identify the main bottlenecks
3. Implement optimizations (images, code splitting, caching)
4. Re-run and report improvement
5. Document the changes
```

### Bundle Size Analysis

**Scenario:** Your app is shipping too much JavaScript

```
Can you:
1. Analyze the bundle with next/bundle-analyzer
2. Identify the largest dependencies
3. Suggest code-splitting opportunities
4. Implement improvements
5. Show before/after sizes
```

---

## Complex Workflows

### Multi-Stage Feature Development

**Scenario:** Build a feature in phases with interim reviews

```
I'm building [feature] in 3 stages:
1. Core functionality + API
2. UI and integration
3. Advanced features and optimization

For stage 1, can you:
[describe requirements]

I'll review and approve before stage 2.
```

### Dependency Upgrade Management

**Scenario:** Upgrade a major dependency safely

```
I need to upgrade [dependency] from v1 to v2.

Breaking changes to handle:
[list them]

Can you:
1. Search for all usages of the old API
2. Create a branch
3. Update dependencies
4. Fix all breaking changes
5. Run tests and build
6. Create a detailed commit message
```

### Migration Script Development

**Scenario:** Create a data migration for the database

```
I'm changing the [table] schema from [old] to [new].

Existing data: [describe]
New structure: [describe]
Data transformation: [describe]

Can you:
1. Design the migration approach
2. Write the Prisma migration
3. Test with sample data
4. Create the migration commit
5. Document any manual steps needed
```

---

## Debugging Complex Issues

### Performance Bottleneck Investigation

**Scenario:** Find why a specific operation is slow

```
The audit submission takes [time] seconds.

Steps to reproduce:
[describe]

Can you:
1. Add performance monitoring/logging
2. Test locally and identify where time is spent
3. Profile the code
4. Implement optimizations
5. Measure improvement
```

### Memory Leak Detection

**Scenario:** The app's memory usage grows over time

```
Memory usage grows when [specific action].

Can you:
1. Check for event listeners not being cleaned up
2. Look for objects not being garbage collected
3. Review component lifecycle (useEffect cleanup)
4. Identify the leak
5. Implement the fix
```

### Type Error Deep Dive

**Scenario:** A complex TypeScript error is hard to understand

```
I'm getting this TypeScript error:
[paste error]

In this code:
[paste code]

Can you:
1. Explain what the error means
2. Why TypeScript is complaining
3. Show the correct type annotation
4. Explain the broader pattern
```

---

## Building Reusable Patterns

### Creating a Custom Hook

**Scenario:** Logic used in multiple components

```
Multiple components use this logic:
[describe the pattern]

Can you:
1. Extract into a custom hook: hooks/use[Name].ts
2. Add TypeScript types
3. Include JSDoc documentation
4. Update all components to use it
5. Add example usage in a comment
```

### Building a Plugin System

**Scenario:** Create extensibility in VLN

```
I want to build a plugin system for [feature].

Requirements:
- Plugins should [capability]
- Register at [location]
- Hook into [process]

Can you:
1. Design the plugin architecture
2. Create base plugin interface
3. Show how to register plugins
4. Create an example plugin
5. Document for external developers
```

---

## Working with AI Models & LLMs

### Structured Output from Claude API

**Scenario:** If VLN integrates Claude API for features

```
I need to call Claude API from my backend to [task].

Can you:
1. Create an API route that calls Claude
2. Add structured output parsing (JSON mode)
3. Handle streaming responses
4. Add error handling
5. Add rate limiting
6. Document the integration
```

---

## Documentation & Knowledge Management

### Auto-generating API Documentation

**Scenario:** Keep docs in sync with code

```
Can you generate OpenAPI/Swagger docs for:
- All endpoints in app/api/
- Include request/response schemas
- Add descriptions from comments
- Include example requests
```

### Creating Architecture Decision Records (ADRs)

**Scenario:** Document why you chose a specific approach

```
I made a decision to [use X instead of Y].

Reasons:
[list them]

Can you create an ADR at docs/architecture/decisions/ADR-[number]-[topic].md
that documents:
- Context
- Decision
- Rationale
- Consequences
- Alternatives considered
```

---

## Team Collaboration Patterns

### Code Review Prep

**Scenario:** Before asking for review, ensure quality

```
Before I request review, can you:
1. Run the full test suite
2. Run linting and formatting
3. Check TypeScript strict mode
4. Run accessibility audits
5. Do a final build
6. Report any issues

Then I'll create the PR.
```

### Onboarding Documentation

**Scenario:** Create docs for new team members

```
Can you create getting-started docs for [feature] including:
- File structure overview
- Key patterns used
- How to add similar features
- Common gotchas
- Testing examples

Place at docs/guides/[feature]-guide.md
```

---

## Emergency Response

### Revert & Recover

**Scenario:** Something broke production

```
The feature I pushed is broken. I need to:
1. Revert to the last good commit
2. Identify what went wrong
3. Create a fix
4. Push the fix

Can you help with the revert and analysis?
```

### Hotfix Process

**Scenario:** Critical bug in production

```
We have a critical bug in production: [describe]

Can you:
1. Create a hotfix branch from main
2. Implement the minimal fix
3. Ensure it passes tests
4. Create a clear commit message
5. Prepare it for push (don't push yet)

This will get merged directly to main and integration/vln.
```

---

## Tips for Advanced Work

1. **Always ask Claude Code to explain first** — "Before you code, explain your approach and ask for approval"

2. **Use intermediate commits** — Rather than one giant commit, break into logical chunks Claude Code can commit separately

3. **Leverage parallel execution** — Ask Claude Code to research + code + test in parallel when possible

4. **Document decisions** — "Create an ADR explaining why you chose this approach"

5. **Test thoroughly** — "Don't commit until all tests pass locally"

6. **Review build output** — "Show me the build output and performance metrics"

7. **Use branches strategically** — Keep feature branches small and focused; don't mix unrelated work

---

## Common Advanced Scenarios

| Scenario | Ask Claude Code To |
|----------|----------|
| Optimize slow page | "Run Lighthouse, identify bottlenecks, implement fixes, measure improvement" |
| Refactor large component | "Extract into smaller components, extract shared hooks, ensure tests pass" |
| Fix complex bug | "Reproduce it, trace the code path, explain the bug, implement fix" |
| Upgrade dependency | "Find all usages, update code, run tests, create commit" |
| Review code quality | "Scan for type safety, performance, accessibility, security issues" |
| Prepare for production | "Run full test suite, lint, build, performance audit, code review" |

---

**When in doubt:** Ask Claude Code to "explain before you code" — this prevents wasted effort on the wrong approach.
