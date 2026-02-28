# Claude Code Prompting Templates for VLN

**Quick reference for effective prompts when working on VLN.**

---

## Exploration & Discovery

### "Show me the architecture"

```
Can you explore the codebase and explain:
- What pages exist in app/(site)/
- How components are organized
- Where the API routes are
- How styling is applied (Tailwind setup)
- Where configuration files live

Provide a brief summary of the overall structure.
```

### "Understand an existing feature"

```
I want to understand how [feature] works.

Can you:
1. Find all files related to [feature]
2. Trace the data flow (input → processing → output)
3. Identify dependencies
4. Summarize the key patterns used

Don't modify anything yet—just explain.
```

### "Find similar implementations"

```
Before I build [new component/feature], can you search for:
- Similar components or patterns
- How other pages handle [specific requirement]
- What libraries/utilities are used for [task]

Report back with file paths and brief explanations.
```

---

## Implementation Tasks

### "Build a new page"

```
I need to create a new page: [page name]

Requirements:
- URL: /[path]
- Purpose: [what it shows]
- Key sections: [describe main content]
- Design reference: [link existing page or describe style]
- Interactive elements: [forms, buttons, etc.]

Please:
1. Explore similar pages to understand the pattern
2. Create the page file
3. Add metadata (title, description)
4. Build responsive layout (mobile-first)
5. Use VLN brand colors and design tokens
6. Verify the build passes
```

### "Add a new component"

```
I need a new [component name] component.

Specifications:
- Purpose: [what it does]
- Props/inputs: [data it receives]
- Visual style: [appearance requirements]
- Interactions: [hover, click behaviors]
- Accessibility: [keyboard nav, ARIA requirements]

Please:
1. Check if similar components exist
2. Create components/vln/[ComponentName].tsx
3. Add TypeScript types
4. Include demo/usage comment
5. Use Tailwind + shadcn patterns only
6. Make it accessible (WCAG AA)
```

### "Build an API endpoint"

```
I need a new API endpoint for [functionality].

Specs:
- Method: GET/POST/PATCH/DELETE
- Route: /api/[resource]/[action]
- Input: [describe parameters/body]
- Output: [describe response structure]
- Validation: [what should be validated]
- Error cases: [what could go wrong]

Please:
1. Create the route handler at app/api/[resource]/route.ts
2. Use Zod for input validation
3. Add proper error handling
4. Return typed JSON responses
5. Include JSDoc comments
6. Test locally before committing
```

### "Fix a bug"

```
I found a bug: [describe the problem]

Expected behavior: [what should happen]
Actual behavior: [what's happening instead]
Affected file/component: [if known]

Can you:
1. Reproduce/locate the issue
2. Identify the root cause
3. Implement a fix
4. Run the build to confirm
5. Create a commit with a clear message
```

---

## Code Quality & Refactoring

### "Check code quality"

```
Can you review [file/component] for:
- TypeScript type safety
- Accessibility compliance (WCAG AA)
- Performance issues
- Code duplication
- Missing error handling
- VLN branding compliance

Report issues and suggest fixes.
```

### "Improve performance"

```
The [page/feature] feels slow.

Can you:
1. Identify performance bottlenecks
2. Check for unnecessary re-renders
3. Optimize images
4. Review bundle size
5. Suggest specific improvements
6. Implement and measure results
```

### "Remove duplication"

```
I think [component/pattern] is repeated.

Can you:
1. Find all instances of [pattern]
2. Extract into a reusable module
3. Update imports throughout
4. Ensure nothing breaks
5. Verify build passes
```

---

## Integration & Connections

### "Connect component to API"

```
I have a form component and an API endpoint.

Component: [file path]
API: [endpoint path]

Can you:
1. Add state management for form data
2. Handle form submission
3. Call the API endpoint
4. Handle success/error states
5. Show loading indicator
6. Display validation errors
```

### "Add data fetching"

```
I need to fetch [data] and display it in [component].

Data source: [API endpoint/database query]
Display location: [component/page]

Please:
1. Check how other components fetch data
2. Use the same pattern (Server Components/Client hooks)
3. Handle loading state
4. Handle error state
5. Cache appropriately
```

---

## Deployment & Integration

### "Prepare for production"

```
Before merging to integration/vln, can you:
1. Run pnpm build and verify it passes
2. Run pnpm lint and fix any issues
3. Check TypeScript: pnpm typecheck
4. Run tests (if applicable)
5. Verify mobile responsiveness
6. Check accessibility with a tool
7. Create a clear commit message
```

### "Create a pull request"

```
I'm ready to merge my work.

Can you:
1. Verify all changes are committed
2. Check the branch is up to date with integration/vln
3. Create a PR title following convention: type(scope): description
4. Write a clear PR description (what, why, testing)
5. Push to remote with: git push -u origin [branch]
```

---

## Debugging & Troubleshooting

### "Build is failing"

```
The build failed with this error:
[paste the full error message]

Can you:
1. Identify the issue
2. Check for typos or missing imports
3. Verify TypeScript types are correct
4. Search for related issues in the codebase
5. Fix the problem
6. Run build again to confirm
```

### "Component not showing"

```
[ComponentName] should display at [location] but nothing appears.

Can you:
1. Verify the component file exists
2. Check imports are correct
3. Look for TypeScript errors
4. Verify CSS classes are applied
5. Check browser console for errors
6. Debug and fix
```

### "Styling not working"

```
The Tailwind class [classname] isn't being applied to [component].

Can you:
1. Check if the class is valid Tailwind
2. Verify Tailwind config includes the file
3. Look for CSS conflicts
4. Check if the element is actually rendered
5. Fix and verify styling works
```

---

## VLN-Specific Templates

### "Follow the VLN design system"

```
When building [component/page], ensure:
- Primary accent: sage green (#a6c3a7)
- Background: matte charcoal (#0f0f0f)
- Font: Inter for UI, JetBrains Mono for code
- Border radius: 12px
- Shadow on hover: shadow-[0_0_0_0] hover:shadow-[0_0_8px_#a6c3a7]
- Tone: professional, high-trust, research lab aesthetic
- No neon, no cyberpunk

Apply these consistently across [what you're building].
```

### "Match existing patterns"

```
I want [new feature/page] to match the style of [existing reference].

Can you:
1. Study [reference file/component]
2. Identify the key patterns (layout, spacing, colors, interactions)
3. Apply the same patterns to [new feature]
4. Ensure consistency
```

### "Accessibility compliance"

```
Can you ensure [component/page] is accessible?

Checklist:
- WCAG AA color contrast (4.5:1 for text)
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels on interactive elements
- Semantic HTML
- Focus indicators visible
- Screen reader tested (if possible)

Review and fix any issues.
```

---

## Advanced Patterns

### "Parallel task execution"

```
While you're working, can you also:
1. (In parallel) Create the database schema for [feature]
2. (In parallel) Stub out the API endpoints
3. (In parallel) Design the component structure

Then let me know when all are ready, and I'll review.
```

### "Iterate on design"

```
Build [component] with this design, then I'll give feedback.

First version:
- [description and requirements]

Please:
1. Create the component
2. Show me a screenshot or description
3. Wait for my feedback before refining
```

### "Research then decide"

```
I'm not sure how to implement [feature].

Can you:
1. Explore the codebase for similar implementations
2. Summarize the patterns you found
3. Suggest the best approach for [feature]
4. Wait for my approval before coding

I want to understand the options before we build.
```

---

## Tips for Better Results

1. **Be specific** — "Add a button" vs. "Add a primary call-to-action button that submits a form with an error state"

2. **Provide context** — Reference existing files/components that should be used as patterns

3. **Mention constraints** — "No new dependencies," "Mobile-first," "Accessibility required"

4. **Break complex tasks into steps** — Let Claude Code show you progress, ask questions before diving into code

5. **Use examples** — If you have a reference design or existing implementation, point to it

6. **Ask for understanding** — "Before coding, explain what you'll do and why"

7. **Request verification** — "Run the build and ensure it passes" ensures quality

---

## Common Mistakes to Avoid

❌ **Too vague:** "Make it better"
✅ **Specific:** "Improve the contact form's error messages to be clearer and add better validation feedback"

❌ **Too long:** [5+ paragraphs with every detail]
✅ **Focused:** [Key requirements + context file paths]

❌ **Unclear scope:** "Fix everything"
✅ **Clear scope:** "Fix the button styling in the hero section only"

❌ **No reference:** "Create a component"
✅ **With reference:** "Create a component like the one in components/ui/Card.tsx"

---

**Ready to prompt?** Start with one of the templates above and customize it for your task!
