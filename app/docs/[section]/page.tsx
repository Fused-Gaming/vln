import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllSections,
  getSectionBySlug,
  getPagesBySection,
  getBreadcrumbs
} from '@/lib/docs/sitemap';
import { LucideArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const sectionData = getSectionBySlug(section);

  if (!sectionData) {
    return {};
  }

  return {
    title: `${sectionData.title} - VLN Documentation`,
    description: sectionData.description,
    openGraph: {
      title: `${sectionData.title} - VLN Documentation`,
      description: sectionData.description,
      url: `https://vln.gg/docs/${section}`
    }
  };
}

export async function generateStaticParams() {
  return getAllSections().map(section => ({
    section: section.slug
  }));
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const sectionData = getSectionBySlug(section);

  if (!sectionData) {
    notFound();
  }

  const pages = getPagesBySection(section);
  const breadcrumbs = getBreadcrumbs(section);

  return (
    <article className="space-y-8">
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
        <div className="flex items-start gap-4">
          <div className="text-4xl">{sectionData.icon}</div>
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {sectionData.title}
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              {sectionData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map(page => (
          <Link
            key={page.slug}
            href={`/docs/${section}/${page.slug}`}
            className="group p-6 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-sage-300 transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {page.description}
                </p>
              </div>
              <LucideArrowRight className="w-5 h-5 text-sage-500 ml-4 mt-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>

      {/* Related Sections */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Other Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getAllSections()
            .filter(s => s.slug !== section)
            .slice(0, 3)
            .map(s => (
              <Link
                key={s.slug}
                href={`/docs/${s.slug}`}
                className="group p-4 border border-white/10 rounded-lg hover:border-sage-500/50 hover:bg-white/[0.01] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white group-hover:text-sage-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {s.pages.length} pages
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}
