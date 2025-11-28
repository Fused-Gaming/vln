# VLN Routes & Elements Reference

> Complete inventory of all pages, components, and design elements

**Last Updated:** November 2024

---

## Page Routes

### Public Routes

| Route | Title | Description | Status |
|-------|-------|-------------|--------|
| `/` | Homepage | Main conversion-focused sales page | ✓ Live |
| `/services` | Services | Detailed service offerings | ✓ Live |
| `/pricing` | Pricing | Pricing tiers and retainers | ✓ Live |
| `/contact` | Contact | Contact form and booking | ✓ Live |
| `/demo` | Demo | Product demo (if applicable) | ✓ Live |
| `/home-enhanced` | Enhanced Home | Alternative homepage design | ✓ Live |
| `/sitemap.xml` | Sitemap | XML sitemap for SEO | ✓ Live |

### Future Routes (Planned)

| Route | Title | Description | Status |
|-------|-------|-------------|--------|
| `/testimonials` | Testimonials | Full testimonials page | ○ Planned |
| `/case-studies` | Case Studies | Detailed success stories | ○ Planned |
| `/case-studies/[slug]` | Case Study Detail | Individual case study | ○ Planned |
| `/blog` | Blog | Security articles & research | ○ Planned |
| `/blog/[slug]` | Blog Post | Individual blog post | ○ Planned |
| `/faq` | FAQ | Full FAQ page | ○ Planned |
| `/vise` | VISE Platform | Education platform | ○ Planned |
| `/about` | About | Team & company info | ○ Planned |
| `/legal/privacy` | Privacy Policy | Privacy policy | ○ Planned |
| `/legal/terms` | Terms of Service | Terms of service | ○ Planned |

---

## Homepage Sections

### 1. Hero Section
**Location:** Top of homepage
**Purpose:** Primary conversion point

**Elements:**
- **Headline:** "Your Contract Has Bugs"
- **Subheadline:** "Let us find them before hackers do"
- **Description:** Brief value proposition
- **Primary CTA:** "Start Free 30-Min Scan" (sage green button)
- **Secondary CTA:** "24/7 Emergency Forensics" (amber button with Siren icon)
- **Trust Badges (3):**
  - Search icon: "47 Critical Vulns Found"
  - DollarSign icon: "$5.2M Funds Recovered"
  - ShieldCheck icon: "0 Post-Audit Hacks"

**Animations:**
- CSSFade for text (staggered delays: 0ms, 200ms, 400ms, 600ms, 800ms)
- Direction: upward fade

---

### 2. Stats Grid
**Purpose:** Trust & social proof through metrics

**Elements (8 cards):**
1. **47** - Critical Vulns Discovered (sage)
2. **$5.2M** - Funds Recovered Through Forensics (blue)
3. **200+** - Developers Trained in Secure Practices (amber)
4. **100%** - Zero Post-Audit Hacks (purple)
5. **12** - Years Blockchain Security Experience (sage)
6. **3** - Legal Cases Supported w/ Expert Testimony (blue)
7. **48** - Hours Critical Bug Reporting SLA (amber)
8. **24/7** - Forensics Response Available (purple)

**Animations:**
- StaggerFade on scroll (100ms delay between cards)
- Counter animation for numbers

**Component:** `<StatsGrid />`

---

### 3. Service Pillars
**Purpose:** Showcase 4 core offerings

**Services:**

#### 3.1 Prevention
- **Icon:** Shield (sage)
- **Subtitle:** Smart Contract Audits
- **Price:** $2K-10K
- **Turnaround:** 3-7 days
- **CTA:** "Start Free 30-Min Scan"
- **Features:** Vulnerability discovery, CVSS scoring, PoC development, fix verification

#### 3.2 Forensics
- **Icon:** Search (amber)
- **Subtitle:** Post-Exploit Investigation
- **Price:** $15K-50K
- **Turnaround:** < 24hr response
- **CTA:** "24/7 Emergency Hotline"
- **Features:** Fund tracing, exploit analysis, expert testimony, court-ready reports

#### 3.3 Training
- **Icon:** GraduationCap (blue)
- **Subtitle:** Corporate Workshops
- **Price:** $3.5K/day
- **Turnaround:** 1-2 weeks
- **CTA:** "Book Workshop"
- **Features:** Full-day workshops, team development, best practices

#### 3.4 Education (VISE)
- **Icon:** BookOpen (purple)
- **Subtitle:** Online Courses & Certifications
- **Price:** Free - $500
- **Turnaround:** Self-paced
- **CTA:** "Start Free Module"
- **Features:** Free modules, paid certification tracks, on-chain credentials

**Component:** `<ServicePillars />`

---

### 4. Urgency Banner
**Purpose:** Create FOMO, drive conversions

**Elements:**
- AlertCircle icon (amber)
- Headline: "Launch in 30 Days?"
- Subtext: "We have X audit slots available for [Month Year]"
- Progress bar showing availability (10 of 13 booked)
- CTA: "Book Your Slot Now"

**Component:** `<UrgencyBanner />`

---

### 5. Testimonials Section
**Purpose:** Social proof from verified clients

**Elements (3 testimonials displayed):**

#### 5.1 Prevention Audit
- **Rating:** 5 stars
- **Impact:** "Saved us $2M"
- **Quote:** "VLN found a critical reentrancy bug..."
- **Author:** Sarah Chen, CTO @ DeFi Gaming Protocol
- **Date:** November 2024
- **Badge:** "Verified Client"

#### 5.2 Forensics
- **Rating:** 5 stars
- **Impact:** "Expert testimony was crucial"
- **Quote:** "After a $1.5M exploit, VLN's forensic analysis..."
- **Author:** Michael Torres, Legal Counsel @ BlockPlay Studios
- **Date:** October 2024
- **Badge:** "Verified Client"

#### 5.3 Training
- **Rating:** 5 stars
- **Impact:** "Training transformed our team"
- **Quote:** "VLN's full-day workshop gave our development team..."
- **Author:** James Park, VP Engineering @ NFT Gaming Inc
- **Date:** September 2024
- **Badge:** "Verified Client"

**CTA:** "View All 47 Reviews"

**Component:** `<TestimonialsSection />`

---

### 6. Comparison Table
**Purpose:** Differentiate VLN from competitors

**Comparison Points (10 features):**
1. Prevention Audits (VLN ✓, Typical ✓, Automated ✓)
2. Post-Exploit Forensics (VLN ✓, Typical ✗, Automated ✗)
3. Expert Testimony (VLN ✓, Typical ✗, Automated ✗)
4. Team Training (VLN ✓, Typical ✗, Automated ✗)
5. On-Chain Certification (VLN ✓, Typical ✗, Automated ✗)
6. Gaming Focus (VLN ✓, Typical ✗, Automated ✗)
7. 48hr Critical Alerts (VLN ✓, Typical ✗, Automated ✓)
8. Human Review (VLN ✓, Typical ✓, Automated ✗)
9. Fix Verification (VLN ✓, Typical Sometimes, Automated ✗)
10. Government Experience (VLN ✓, Typical ✗, Automated ✗)

**Pricing Comparison:**
- VLN: $2K-10K, 3-7 days
- Typical: $5K-50K, 2-6 weeks
- Automated: $100-500, Minutes

**Component:** `<ComparisonTable />`

---

### 7. Pricing Section
**Purpose:** Transparent pricing builds trust

**Tiers:**
- **Small:** < 500 lines, $2K-4K
- **Medium:** 500-2K lines, $5K-8K
- **Large:** 2K+ lines, $10K+

**Included in All Audits:**
- Comprehensive vulnerability analysis
- CVSS scoring & risk assessment
- Foundry PoC exploits for critical findings
- 30-day fix verification (free)
- Critical bugs flagged within 48 hours

**CTA:** "Start Free 30-Min Scan"

---

### 8. FAQ Section
**Purpose:** Objection handling & education

**Questions (8 displayed):**
1. Why pay for audit when free tools exist?
2. How do I trust you with my code?
3. Can you guarantee 100% security?
4. What if I get exploited after your audit?
5. Do you work with legal/law enforcement?
6. How long does an audit take?
7. What's included in free scan?
8. Do you offer ongoing support?

**CTA:** "See All 23 Questions"

**Component:** `<FAQSection />`

---

### 9. Guarantee Section
**Purpose:** Risk reversal

**Elements:**
- ShieldCheck icon (sage, 8x8)
- Headline: "The VLN Guarantee"
- 4 Guarantees:
  - "If we find zero vulnerabilities, you pay nothing*"
  - "30-day free fix verification on all findings"
  - "Critical bugs flagged within 48 hours"
  - "Detailed, actionable remediation steps included"
- Disclaimer: "*Applies to prevention audits only. Small review fee may apply."
- CTA: "Start Your Free Scan"

**Component:** `<GuaranteeSection />`

---

### 10. Final CTA
**Purpose:** Last conversion opportunity

**Elements:**
- Headline: "Don't Launch with Vulnerabilities"
- Subheadline: "Your contract has bugs. Let us find them before hackers do."
- Primary CTA: "Start Free 30-Min Scan"
- Secondary CTA: "View All Services"
- Trust Line: "Trusted by blockchain gaming projects, DeFi protocols, and smart contract developers"
- Credentials: "12 Years Experience • Government Cleared • Expert Testimony"

---

## Design Components

### Animation Components
| Component | File | Purpose |
|-----------|------|---------|
| CSSFade | `/components/animations/css-fade.tsx` | Lightweight fade with direction |
| Counter | `/components/animations/counter.tsx` | Animated number counting |
| StaggerFade | `/components/animations/stagger-fade.tsx` | Sequential list animations |

### VLN Components
| Component | File | Purpose |
|-----------|------|---------|
| ICBoardBackground | `/components/vln/ic-board-background.tsx` | Futuristic circuit board animation |
| StatCard | `/components/vln/stat-card.tsx` | Individual stat metric card |
| StatsGrid | `/components/vln/stats-grid.tsx` | 8-card stats dashboard |
| ServicePillars | `/components/vln/service-pillars.tsx` | 4 service offerings |
| Testimonial | `/components/vln/testimonial.tsx` | Single testimonial card |
| TestimonialsSection | `/components/vln/testimonials-section.tsx` | Full testimonials layout |
| FAQSection | `/components/vln/faq-section.tsx` | Accordion FAQ |
| ComparisonTable | `/components/vln/comparison-table.tsx` | Feature comparison table |
| GuaranteeSection | `/components/vln/guarantee-section.tsx` | Risk reversal section |
| UrgencyBanner | `/components/vln/urgency-banner.tsx` | FOMO availability banner |

### UI Components
| Component | File | Purpose |
|-----------|------|---------|
| Button | `/components/ui/button.tsx` | Primary/secondary/ghost buttons |
| Card | `/components/ui/card.tsx` | Content cards |

### Layout Components
| Component | File | Purpose |
|-----------|------|---------|
| Header | `/components/layout/header.tsx` | Site header with navigation |
| Footer | `/components/layout/footer.tsx` | Site footer with links |

---

## Icon Usage

All icons from **Lucide React** (tree-shakeable, lightweight):

| Icon | Usage | Color |
|------|-------|-------|
| Search | Vuln discovery, forensics | Sage |
| DollarSign | Funds recovered | Blue |
| ShieldCheck | Zero hacks, guarantee | Purple/Sage |
| Siren | Emergency forensics | Amber |
| Check | List items, features | Sage |
| ChevronDown | FAQ accordion | Sage |
| AlertCircle | Urgency banner | Amber |
| Shield | Prevention service | Sage |
| GraduationCap | Training service | Blue |
| BookOpen | Education service | Purple |
| Star | Testimonial ratings | Amber |
| ArrowRight | CTAs, links | Varies |

---

## Color Usage by Section

| Section | Primary Color | Accent |
|---------|---------------|--------|
| Hero | Rainbow gradient | Sage (CTA) |
| Stats Grid | Multi-color rotation | All 4 colors |
| Services | Service-specific | Sage/Amber/Blue/Purple |
| Urgency | Amber | Amber border |
| Testimonials | Sage | Star ratings (amber) |
| Comparison | Sage | Blue (table) |
| Pricing | Sage | Tier highlights |
| FAQ | Sage | Border/hover |
| Guarantee | Sage | ShieldCheck icon |
| Final CTA | Rainbow gradient | Sage (CTA) |

---

## Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Homepage Bundle | < 300KB | 162KB ✓ |
| LCP | < 2.5s | TBD |
| FID | < 100ms | TBD |
| CLS | < 0.1 | TBD |
| Lighthouse Score | > 90 | TBD |

---

## Asset Inventory

### Fonts
- Inter (loaded via CDN)
- JetBrains Mono (loaded via CDN)

### Images
- `/public/vln-logo-dark.svg` - Dark theme logo
- `/public/vln-logo-light.svg` - Light theme logo
- `/public/VLN2.svg` - Social media preview

### Icons
- All from Lucide React (no custom SVGs needed)

---

## Accessibility Features

- WCAG AAA color contrast (19:1 for body text)
- Keyboard navigation (all CTAs)
- ARIA labels (buttons, links, sections)
- Focus indicators (visible, high-contrast)
- Semantic HTML (proper heading hierarchy)
- Alt text (all images)
- Skip to content link
- Respects `prefers-reduced-motion`

---

## SEO Elements

### Meta Tags (per page)
- Title tag (max 60 chars)
- Meta description (max 160 chars)
- Open Graph tags (title, description, image, url)
- Twitter Card tags
- Canonical URL
- Structured data (Organization, WebSite)

### Sitemap
- `/sitemap.xml` - Dynamic generation
- Includes all public routes
- Updated on build

### robots.txt
- Allows all crawlers
- Sitemap reference

---

## Mobile Responsiveness

### Breakpoints
- **Mobile:** 320px - 640px
- **Tablet:** 641px - 1024px
- **Desktop:** 1025px - 1280px
- **Wide:** 1281px+

### Mobile Priorities
1. Hero CTA (large, thumb-friendly)
2. Trust badges (2x2 grid)
3. Services (stacked)
4. Testimonials (swipe/scroll)
5. FAQ (accordion)
6. Simplified pricing (stacked tiers)

---

## Content Management

### Editable Content (no CMS yet)
- Testimonials (`/components/vln/testimonials-section.tsx`)
- Stats (`/components/vln/stats-grid.tsx`)
- Services (`/components/vln/service-pillars.tsx`)
- FAQ (`/components/vln/faq-section.tsx`)
- Pricing tiers (`/app/page.tsx`)

### Future CMS Integration
- Blog posts
- Case studies
- Testimonials
- Team members
- Service pages

---

## Conversion Tracking

### Primary Conversions
1. "Start Free 30-Min Scan" clicks
2. Form submissions
3. "24/7 Emergency Forensics" clicks
4. "Book Workshop" clicks

### Secondary Conversions
1. "View All Reviews" clicks
2. Service card clicks
3. FAQ expansions
4. Pricing tier views

### Tracking Method
- Google Analytics 4 (planned)
- Cloudflare Web Analytics (active)
- Custom event tracking

---

## Testing Checklist

- [ ] All routes load correctly
- [ ] All CTAs link to correct destinations
- [ ] Mobile responsive (iPhone SE → iPad Pro)
- [ ] Animations smooth (60fps)
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Forms validate correctly

---

This document serves as the single source of truth for VLN's page structure, components, and design elements.
