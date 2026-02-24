# VLN Docs-Site Architecture
## Technical Implementation Plan

**Status:** Architecture Design
**Version:** 1.0
**Last Updated:** February 2026
**Audience:** Development team

---

## Overview

The VLN docs-site is a Next.js 15 integrated documentation platform that lives at `/docs` route, built with markdown-based content, React components, and optimized for performance and accessibility.

---

## Technology Stack

### Frontend Framework
```
Next.js 15              App Router, Server Components, Edge functions
React 19               Hooks, Server Components by default
TypeScript             Strict mode, full type safety
Tailwind CSS           Utility-first styling
```

### Content & Rendering
```
Markdown              MDX for dynamic content + React components
remark/rehype         Markdown processing pipeline
Syntax Highlighting   Shiki (server-side, no JS)
Table of Contents     Auto-generated from headings
```

### Search & Navigation
```
Client-Side Search    In-memory index (small dataset)
Keyboard Shortcuts    Cmd+K for search, "/" for focus
Navigation State      React Context (current section, page)
```

### Performance
```
Static Generation    ISR for docs (60s revalidation)
Image Optimization   Next.js Image component
Font Loading         Preload Inter + JetBrains Mono
Caching              Cache-Control headers (1 year for assets)
```

---

## File Structure

### App Router Structure

```
app/
├── docs/
│   ├── layout.tsx                 # Docs layout wrapper
│   ├── page.tsx                   # Docs index/welcome page
│   │
│   ├── [category]/                # Dynamic category routes
│   │   ├── page.tsx               # Category overview
│   │   │
│   │   ├── [page]/                # Dynamic page routes
│   │   │   ├── page.tsx           # Document page
│   │   │   └── metadata.ts        # Dynamic metadata/OG
│   │   │
│   │   └── route.ts (optional)    # API route for search index
│   │
│   ├── api/
│   │   ├── search/route.ts        # Full-text search endpoint
│   │   └── sitemap/route.ts       # Dynamic sitemap.xml
│   │
│   └── not-found.tsx              # 404 for /docs routes
│
└── ... (other app routes)
```

### Components Structure

```
components/
├── docs/                           # Docs-specific components
│   ├── DocLayout.tsx               # Main docs layout container
│   ├── Sidebar.tsx                 # Navigation sidebar
│   ├── TableOfContents.tsx         # Right sidebar TOC
│   ├── Breadcrumb.tsx              # Breadcrumb navigation
│   ├── SearchBar.tsx               # Search input + modal
│   ├── Callout.tsx                 # Info/warning/error boxes
│   ├── CodeBlock.tsx               # Syntax-highlighted code
│   ├── MdxComponents.tsx           # MDX component overrides
│   ├── RelatedDocs.tsx             # "See also" section
│   └── DocHeader.tsx               # Title + metadata
│
├── ui/                             # Shared UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   ├── icon.tsx
│   └── spinner.tsx
│
└── layout/
    ├── header.tsx
    ├── footer.tsx
    └── navigation.tsx
```

### Content Structure

```
docs/                              # Documentation content (markdown)
├── devops/
│   ├── _metadata.json             # Category metadata
│   ├── index.md                   # Category overview
│   ├── QUICK-START.md
│   ├── DISCORD-WEBHOOKS.md        # Moved from root
│   │
│   ├── getting-started/
│   │   ├── _metadata.json
│   │   ├── index.md               # Section overview
│   │   ├── prerequisites.md
│   │   ├── local-setup.md
│   │   ├── first-deploy.md
│   │   └── troubleshooting.md
│   │
│   ├── ci-cd/
│   │   ├── _metadata.json
│   │   ├── index.md
│   │   ├── overview.md
│   │   ├── github-actions/
│   │   │   ├── ci.md
│   │   │   ├── deploy.md
│   │   │   ├── preview.md
│   │   │   ├── security.md
│   │   │   └── notifications.md
│   │   ├── triggers.md
│   │   ├── event-matrix.md
│   │   └── custom-workflows.md
│   │
│   ├── deployment/
│   │   ├── _metadata.json
│   │   ├── index.md
│   │   ├── overview.md
│   │   ├── vercel-setup.md
│   │   ├── environments.md
│   │   ├── manual-deploy.md
│   │   ├── rollback.md
│   │   └── troubleshooting.md
│   │
│   └── ... (other sections)
│
└── index.md                       # Docs home page
```

### Metadata Files

Each section has a `_metadata.json` that defines structure:

```json
{
  "title": "Getting Started",
  "description": "Set up your VLN development environment",
  "icon": "🚀",
  "order": 1,
  "pages": [
    {
      "slug": "prerequisites",
      "title": "Prerequisites",
      "description": "Install required tools",
      "order": 1
    },
    {
      "slug": "local-setup",
      "title": "Local Development Setup",
      "description": "Run VLN locally",
      "order": 2
    }
  ]
}
```

---

## Dynamic Route Implementation

### Category Route: `app/docs/[category]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import { getCategoryData } from '@/lib/docs';
import DocLayout from '@/components/docs/DocLayout';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const data = getCategoryData(category);

  if (!data) return {};

  return {
    title: `${data.title} - VLN Docs`,
    description: data.description,
    openGraph: {
      title: `${data.title} - VLN Docs`,
      description: data.description,
      url: `https://vln.gg/docs/${category}`
    }
  };
}

export async function generateStaticParams() {
  return getCategories().map(cat => ({ category: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const data = getCategoryData(category);

  if (!data) notFound();

  return (
    <DocLayout>
      <article>
        <h1>{data.title}</h1>
        <p>{data.description}</p>

        <nav className="mt-8 grid gap-4">
          {data.pages.map(page => (
            <Link
              key={page.slug}
              href={`/docs/${category}/${page.slug}`}
              className="border rounded-lg p-4 hover:border-sage"
            >
              <h3>{page.title}</h3>
              <p className="text-secondary">{page.description}</p>
            </Link>
          ))}
        </nav>
      </article>
    </DocLayout>
  );
}
```

### Page Route: `app/docs/[category]/[page]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import { getPageContent, getPageMetadata } from '@/lib/docs';
import DocLayout from '@/components/docs/DocLayout';
import { MDXContent } from '@/components/docs/MdxComponents';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category, page } = await params;
  const metadata = getPageMetadata(category, page);

  if (!metadata) return {};

  return {
    title: `${metadata.title} - VLN Docs`,
    description: metadata.description,
    authors: metadata.author ? [{ name: metadata.author }] : [],
    openGraph: {
      title: `${metadata.title} - VLN Docs`,
      description: metadata.description,
      url: `https://vln.gg/docs/${category}/${page}`
    }
  };
}

export async function generateStaticParams() {
  // Generate all page combinations
  const pages = [];
  for (const category of getCategories()) {
    for (const page of getPagesInCategory(category.slug)) {
      pages.push({ category: category.slug, page: page.slug });
    }
  }
  return pages;
}

export default async function PageContent({ params }: Props) {
  const { category, page } = await params;
  const { content, metadata } = await getPageContent(category, page);

  if (!content) notFound();

  return (
    <DocLayout category={category} page={page}>
      <DocHeader metadata={metadata} />
      <TableOfContents content={content} />
      <MDXContent content={content} />
      <RelatedDocs category={category} page={page} />
    </DocLayout>
  );
}
```

---

## Component Specifications

### DocLayout Component

```typescript
interface DocLayoutProps {
  children: React.ReactNode;
  category?: string;
  page?: string;
}

export default function DocLayout({
  children,
  category,
  page
}: DocLayoutProps) {
  return (
    <div className="flex min-h-screen bg-charcoal">
      {/* Sidebar */}
      <Sidebar category={category} page={page} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex flex-1">
          {/* Content Area */}
          <article className="flex-1 max-w-[800px] px-8 py-12">
            {children}
          </article>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block w-64 pl-8 pr-4 py-12">
            <TableOfContents />
          </aside>
        </div>

        <Footer />
      </main>
    </div>
  );
}
```

### Sidebar Component

```typescript
interface SidebarProps {
  category?: string;
  page?: string;
}

export default function Sidebar({ category, page }: SidebarProps) {
  const categories = getCategories();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40"
        onClick={() => setOpen(!open)}
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <nav className={`
        fixed lg:relative lg:flex flex-col w-64 h-screen
        bg-charcoal-light border-r border-white/10
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300
        overflow-y-auto
      `}>
        {/* Logo */}
        <Link href="/docs" className="px-6 py-4 border-b border-white/10">
          <span className="font-bold">📚 VLN Docs</span>
        </Link>

        {/* Search */}
        <SearchBar />

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 space-y-4">
          {categories.map(cat => (
            <SidebarSection
              key={cat.slug}
              category={cat}
              isActive={category === cat.slug}
            />
          ))}
        </div>

        {/* Footer */}
        <SidebarFooter />
      </nav>

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
```

### CodeBlock Component

```typescript
interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
  highlight?: number[];
}

export function CodeBlock({
  language,
  code,
  filename,
  highlight
}: CodeBlockProps) {
  const highlighted = getHighlightedCode(code, language, highlight);

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-charcoal-darker border-b border-white/10">
        <span className="text-sm text-secondary">
          {filename || language}
        </span>
        <CopyButton code={code} />
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm">
        <code
          dangerouslySetInnerHTML={{ __html: highlighted }}
          className={`language-${language}`}
        />
      </pre>
    </div>
  );
}
```

### Callout Component

```typescript
type CalloutType = 'info' | 'warning' | 'success' | 'error';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: 'ℹ️',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500',
    textColor: 'text-sky-300'
  },
  warning: {
    icon: '⚠️',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-300'
  },
  success: {
    icon: '✅',
    bgColor: 'bg-sage-500/10',
    borderColor: 'border-sage-500',
    textColor: 'text-sage-300'
  },
  error: {
    icon: '🚨',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500',
    textColor: 'text-red-300'
  }
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div className={`
      my-6 pl-4 border-l-4 rounded-r-lg p-4
      ${config.bgColor} ${config.borderColor}
    `}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{config.icon}</span>
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${config.textColor} mb-1`}>
              {title}
            </h4>
          )}
          <div className="text-sm text-secondary">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Search Implementation

### Search Index Generation

```typescript
// lib/docs/search-index.ts

interface SearchEntry {
  id: string;
  title: string;
  content: string;
  url: string;
  category: string;
  type: 'heading' | 'paragraph' | 'code';
}

export async function generateSearchIndex(): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];
  const categories = getCategories();

  for (const category of categories) {
    const pages = getPagesInCategory(category.slug);

    for (const page of pages) {
      const content = await getPageContent(category.slug, page.slug);
      const headings = extractHeadings(content.markdown);
      const paragraphs = extractParagraphs(content.markdown);

      for (const heading of headings) {
        entries.push({
          id: `${category.slug}-${page.slug}-${heading.id}`,
          title: heading.text,
          content: heading.text,
          url: `/docs/${category.slug}/${page.slug}#${heading.id}`,
          category: category.title,
          type: 'heading'
        });
      }

      for (const para of paragraphs) {
        entries.push({
          id: `${category.slug}-${page.slug}-para`,
          title: page.title,
          content: para,
          url: `/docs/${category.slug}/${page.slug}`,
          category: category.title,
          type: 'paragraph'
        });
      }
    }
  }

  return entries;
}
```

### Search API Route

```typescript
// app/docs/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateSearchIndex } from '@/lib/docs/search-index';

let searchIndex: SearchEntry[] = [];

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  // Generate index on first request (or revalidate)
  if (searchIndex.length === 0) {
    searchIndex = await generateSearchIndex();
  }

  const results = searchIndex
    .filter(entry =>
      entry.content.toLowerCase().includes(query) ||
      entry.title.toLowerCase().includes(query)
    )
    .slice(0, 10)
    .map(({ id, title, url, type }) => ({ id, title, url, type }));

  return NextResponse.json(results);
}
```

---

## Build & Optimization

### Static Generation

```typescript
// next.config.ts

export default {
  // Enable ISR (Incremental Static Regeneration)
  experimental: {
    isrMemoryCacheSize: 50 * 1024 * 1024, // 50 MB
  }
};
```

### Markdown Processing

```typescript
// lib/docs/process-markdown.ts

import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import { rehype } from 'rehype';
import rehypeShiki from '@shikijs/rehype';
import remarkGfm from 'remark-gfm';

const processor = remark()
  .use(remarkFrontmatter)
  .use(remarkMdx)
  .use(remarkGfm)
  .pipe(rehype)
  .use(rehypeShiki, {
    theme: 'github-dark',
    langs: [
      'typescript',
      'javascript',
      'bash',
      'yaml',
      'json',
      'jsx',
      'tsx',
      'sql',
      'solidity'
    ]
  });

export async function processMarkdown(content: string) {
  const result = await processor.process(content);
  return result.value;
}
```

---

## Performance Optimization

### Image Optimization

```typescript
// Use Next.js Image component for all docs images

import Image from 'next/image';

export function DocImage({ src, alt, width, height }: Props) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-white/10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px"
        placeholder="blur"
        quality={90}
        className="w-full h-auto"
      />
    </div>
  );
}
```

### Font Loading

```typescript
// app/layout.tsx

import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## SEO & Meta Tags

### Dynamic Open Graph

```typescript
// lib/docs/metadata.ts

export function generateMetadata(category: string, page: string) {
  const data = getPageContent(category, page);

  return {
    title: `${data.title} - VLN Docs`,
    description: data.description,
    robots: 'index, follow',
    authors: data.author,
    openGraph: {
      title: `${data.title} - VLN Docs`,
      description: data.description,
      url: `https://vln.gg/docs/${category}/${page}`,
      type: 'article',
      image: `/og-images/docs/${category}.png`,
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} - VLN Docs`,
      description: data.description,
      image: `/og-images/docs/${category}.png`
    }
  };
}
```

### Sitemap Generation

```typescript
// app/docs/sitemap.ts

export default async function sitemap() {
  const categories = getCategories();
  const pages = [];

  pages.push({
    url: 'https://vln.gg/docs',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9
  });

  for (const category of categories) {
    pages.push({
      url: `https://vln.gg/docs/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    });

    for (const page of getPagesInCategory(category.slug)) {
      pages.push({
        url: `https://vln.gg/docs/${category.slug}/${page.slug}`,
        lastModified: page.updated || new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      });
    }
  }

  return pages;
}
```

---

## Analytics & Monitoring

### Page Views Tracking

```typescript
// components/docs/PageViewTracker.tsx

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
        custom_page_type: 'docs'
      });
    }
  }, [pathname]);

  return null;
}
```

---

## Deployment

### Vercel Configuration

```typescript
// vercel.json

{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "env": {
    "DOCS_REVALIDATE_SECONDS": {
      "value": "60"
    }
  },
  "regions": ["iad1"],
  "functions": {
    "app/docs/api/**": {
      "maxDuration": 10
    }
  }
}
```

---

## Next Steps

1. **Create docs layout component** - Implement DocLayout with sidebar
2. **Set up dynamic routes** - Create category and page routes
3. **Build components** - CodeBlock, Callout, SearchBar, etc.
4. **Process markdown** - Set up remark/rehype pipeline
5. **Write initial docs** - Start with quick-start and getting-started
6. **Test & optimize** - Lighthouse score, accessibility audit
7. **Deploy** - Push to production

---

**Version:** 1.0
**Status:** Ready for Development
**Last Updated:** February 24, 2026

