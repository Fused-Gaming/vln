---
title: Voice & Tone
description: VLN communication guidelines — clarity, professionalism, and brand voice
---

> Migrated from Fused-Gaming/DevOps design-standards

---

## Brand Voice Pillars

| Pillar | Description |
|--------|-------------|
| **Simple & Direct** | Clear language, no jargon or fluff |
| **Technical yet Accessible** | Expert knowledge, readable to all |
| **Solution-Focused** | Lead with outcomes, not features |
| **Contemporary** | Modern, professional — no trendy slang |

---

## Core Principles

### 1. Clarity First

Write for the reader, not for yourself. If a simpler word works, use it. If a sentence can be cut, cut it.

```
Instead of: "Leveraging our proprietary vulnerability assessment methodologies..."
Write:       "Our security audit finds vulnerabilities before hackers do."
```

### 2. Active Voice

Prefer active constructions that convey confidence and directness.

```
Instead of: "Your contract will be reviewed by our team"
Write:       "Our team reviews your contract"
```

### 3. Eliminate Filler

Remove unnecessary words. Every word must earn its place.

```
Instead of: "In order to be able to begin the process of..."
Write:       "To start..."
```

### 4. Minimize Jargon

Use technical terms when necessary, but always pair with plain-language context for non-expert readers.

```
Instead of: "We perform CVSS 3.1 risk scoring and formal verification"
Write:       "We score every vulnerability by severity (CVSS 3.1) and verify the fix works"
```

---

## Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| **Marketing / CTAs** | Confident, direct, urgent | "Start your free scan today" |
| **Security findings** | Precise, factual, actionable | "Critical reentrancy bug found in line 247" |
| **Success states** | Affirming, brief | "Scan complete. No critical vulnerabilities found." |
| **Error messages** | Factual, helpful | "Submission failed. Check your email and try again." |
| **Emergency (forensics)** | Calm, immediate, action-oriented | "We're on it. Our response team has been notified." |
| **Educational content** | Clear, step-by-step | "First, deploy your contract to testnet..." |

---

## UI Copy Guidelines

### Buttons & CTAs

- Use imperative verbs: "Start", "Book", "View", "Send"
- Be specific: "Start Free 30-Min Scan" not "Click Here"
- Match urgency to context: "Book Your Slot" for urgency, "Learn More" for browsing

### Form Labels & Placeholders

```
Label:       "Full Name"          (not "Enter your full name")
Placeholder: "John Doe"           (not "Type here...")
Required:    "Email *"            (asterisk + aria-required)
Hint:        "We'll use this to send your audit report"
Error:       "Please enter a valid email address"
```

### Error Messages

Be specific, not vague. Tell the user what happened and what to do.

```
Bad:  "An error occurred"
Good: "We couldn't send your message. Please try again or email us at info@vln.gg"
```

### Success Messages

Confirm what happened and set next-step expectations.

```
"Your message was sent. We'll respond within 24 hours."
"Scan started. You'll receive results by email within 3–7 days."
```

---

## What VLN Is Not

| Avoid | Instead |
|-------|---------|
| Overly formal / stiff | Professional but approachable |
| Trendy / slang | Contemporary but timeless |
| Hype / exaggeration | Confident, fact-based claims |
| Fear-mongering | Empowering, solution-focused |
| Passive voice | Active, direct |

---

## Writing Checklist

Before publishing any copy:

- [ ] Uses active voice
- [ ] No unnecessary words or filler phrases
- [ ] Technical terms are explained or paired with plain language
- [ ] CTAs are specific and imperative
- [ ] Error messages say what happened and what to do
- [ ] Success messages confirm action and set expectations
- [ ] No claims that can't be verified (stats, guarantees)
- [ ] Consistent with VLN brand tone (professional, direct, research-lab)
