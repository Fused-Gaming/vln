import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllSections,
  getSectionBySlug,
  getPageBySlug,
  getPreviousPage,
  getNextPage,
  getBreadcrumbs
} from '@/lib/docs/sitemap';
import { LucideArrowLeft, LucideArrowRight, Clock } from 'lucide-react';

interface Props {
  params: Promise<{ section: string; page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, page } = await params;
  const pageData = getPageBySlug(section, page);
  const sectionData = getSectionBySlug(section);

  if (!pageData || !sectionData) {
    return {};
  }

  return {
    title: `${pageData.title} - VLN Documentation`,
    description: pageData.description,
    openGraph: {
      title: `${pageData.title} - VLN Documentation`,
      description: pageData.description,
      url: `https://vln.gg/docs/${section}/${page}`
    }
  };
}

export async function generateStaticParams() {
  const params = [];

  for (const section of getAllSections()) {
    for (const page of section.pages) {
      params.push({
        section: section.slug,
        page: page.slug
      });
    }
  }

  return params;
}

// Placeholder content - will be replaced with actual markdown content
function getPageContent(section: string, page: string): string {
  return `
# ${page.charAt(0).toUpperCase() + page.slice(1)} Guide

This is a placeholder for the ${page} documentation page in the ${section} section.

## Coming Soon

This documentation page is being prepared. Check back soon for comprehensive guides and instructions.

### What to Expect

- Step-by-step instructions
- Code examples
- Best practices
- Troubleshooting tips
- Related resources

Please visit the [documentation hub](/docs) to explore other topics in the meantime.
`;
}

export default async function PageContent({ params }: Props) {
  const { section, page } = await params;
  const pageData = getPageBySlug(section, page);
  const sectionData = getSectionBySlug(section);

  if (!pageData || !sectionData) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbs(section, page);
  const previousPage = getPreviousPage(section, page);
  const nextPage = getNextPage(section, page);
  const content = getPageContent(section, page);

  // Estimated read time (rough calculation)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="space-y-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-2">
            <Link
              href={crumb.href}
              className="hover:text-sage-400 transition-colors"
            >
              {crumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="text-gray-600">/</span>
            )}
          </div>
        ))}
      </nav>

      {/* Header */}
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          {pageData.title}
        </h1>
        <p className="text-lg text-gray-400">{pageData.description}</p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime} min read</span>
          </div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      {/* Content - Placeholder */}
      <div className="prose prose-invert max-w-none">
        <div className="text-gray-300 space-y-4">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph.replace(/^#+\s+/, '')}
            </p>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* Navigation */}
      <div className="grid gap-4 sm:grid-cols-2">
        {previousPage ? (
          <Link
            href={`/docs/${previousPage.section.slug}/${previousPage.page.slug}`}
            className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
          >
            <div className="flex items-start gap-3">
              <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Previous
                </div>
                <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                  {previousPage.page.title}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPage ? (
          <Link
            href={`/docs/${nextPage.section.slug}/${nextPage.page.slug}`}
            className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left"
          >
            <div className="flex items-start gap-3 sm:flex-row-reverse">
              <LucideArrowRight className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Next
                </div>
                <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                  {nextPage.page.title}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 p-6 border border-sage-500/30 rounded-lg bg-sage-500/5">
        <p className="text-gray-300 mb-4">
          Have questions or found an issue? Let us know!
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 transition-colors"
        >
          Get Help
          <LucideArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
