import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getSectionBySlug,
  getPageBySlug,
  getPreviousPage,
  getNextPage,
  getBreadcrumbs
} from '@/lib/docs/sitemap';
import { LucideArrowRight, LucideArrowLeft, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation Versioning - VLN Ecosystem',
  description: 'Versioning strategy and release management for VLN documentation',
};

export default async function VLNVersioningPage() {
  const sectionData = getSectionBySlug('vln-ecosystem');
  const pageData = getPageBySlug('vln-ecosystem', 'versioning');
  const previousPage = getPreviousPage('vln-ecosystem', 'versioning');
  const nextPage = getNextPage('vln-ecosystem', 'versioning');
  const breadcrumbs = getBreadcrumbs('vln-ecosystem', 'versioning');

  if (!pageData || !sectionData) {
    notFound();
  }

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
            <span>7 min read</span>
          </div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      {/* Content */}
      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Documentation Versioning</h2>
          <p className="leading-relaxed">
            VLN documentation is versioned to ensure consistency across releases, maintain historical context, and provide clear upgrade paths. All documentation follows semantic versioning principles.
          </p>
        </section>

        {/* Versioning Scheme */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Semantic Versioning Scheme</h2>
          <p className="text-gray-400 mb-4">
            Documentation versions follow the format: <code className="bg-white/10 px-2 py-1 rounded">MAJOR.MINOR.PATCH</code>
          </p>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-sage-400 mb-2">MAJOR Version</h4>
              <p className="text-sm text-gray-400">
                Incremented for breaking changes, major feature releases, or significant architectural changes. Examples: API endpoint changes, new required environment variables.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-blue-400 mb-2">MINOR Version</h4>
              <p className="text-sm text-gray-400">
                Incremented for new features, non-breaking changes, or new documentation sections. Examples: New configuration options, additional guides.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-green-400 mb-2">PATCH Version</h4>
              <p className="text-sm text-gray-400">
                Incremented for bug fixes, documentation corrections, or clarifications. No feature changes.
              </p>
            </div>
          </div>
        </section>

        {/* Current Version */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Current Version History</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="font-semibold text-white">v1.0.0</h4>
                  <p className="text-sm text-gray-400">Initial release - May 2026</p>
                </div>
                <span className="text-xs px-2 py-1 bg-sage-500/20 text-sage-300 rounded">Latest</span>
              </div>
              <p className="text-sm text-gray-400">
                <strong>Changes:</strong> Initial ecosystem documentation, deployment guides, design directives, domain configuration, and versioning framework.
              </p>
            </div>
          </div>
        </section>

        {/* Release Cadence */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Release Cadence</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">MAJOR Releases</h4>
              <p className="text-sm text-gray-400">
                Approximately every 6-12 months. Accompanied by migration guides and breaking change documentation.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">MINOR Releases</h4>
              <p className="text-sm text-gray-400">
                Monthly or as-needed basis. Includes feature releases and new documentation sections.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">PATCH Releases</h4>
              <p className="text-sm text-gray-400">
                Ongoing. Published immediately when bugs or clarifications are discovered.
              </p>
            </div>
          </div>
        </section>

        {/* Document Metadata */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Document Metadata</h2>
          <p className="text-gray-400 mb-3">
            All documentation pages must include metadata headers:
          </p>
          <div className="bg-charcoal/50 border border-white/5 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1">
            <div>---</div>
            <div>title: &quot;Document Title&quot;</div>
            <div>version: &quot;1.0.0&quot;</div>
            <div>status: &quot;stable&quot;</div>
            <div>lastUpdated: &quot;2026-05-02&quot;</div>
            <div>author: &quot;VLN Team&quot;</div>
            <div>---</div>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            <strong>Status values:</strong> stable, beta, deprecated, archived
          </p>
        </section>

        {/* Changelog */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Maintaining a Changelog</h2>
          <p className="text-gray-400 mb-3">
            Keep a <code className="bg-white/10 px-2 py-1 rounded">CHANGELOG.md</code> in the docs directory:
          </p>
          <div className="bg-charcoal/50 border border-white/5 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1 max-h-48 overflow-y-auto">
            <div className="text-sage-400"># Changelog</div>
            <div className="text-gray-500 mt-2">## [1.0.0] - 2026-05-02</div>
            <div className="text-gray-500">### Added</div>
            <div>- Initial ecosystem documentation</div>
            <div>- Deployment guides for all components</div>
            <div className="text-gray-500 mt-2">### Changed</div>
            <div>- Restructured PeraltaCC documentation</div>
            <div className="text-gray-500 mt-2">### Deprecated</div>
            <div>- Old API reference (use v1.0.0 instead)</div>
          </div>
        </section>

        {/* Deprecation Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Deprecation Policy</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Deprecation Notice</h4>
              <p className="text-sm text-gray-400">
                When deprecating documentation, mark it with a deprecation notice linking to the replacement. Keep for one major version.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Archive Process</h4>
              <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                <li>Mark as deprecated in v1.x</li>
                <li>Remove in v2.0</li>
                <li>Archive in <code className="bg-white/10 px-1">/docs/archive/v1.x/</code></li>
              </ol>
            </div>
          </div>
        </section>

        {/* Future: Versioned URLs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Future: Versioned Documentation URLs</h2>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-3">
              <strong>Planned for v1.1.0:</strong> Support for versioned documentation URLs:
            </p>
            <div className="bg-charcoal/50 border border-white/5 rounded p-3 text-xs text-gray-300 font-mono space-y-1">
              <div>docs.vln.gg/v1.0.0/vln-ecosystem/overview</div>
              <div>docs.vln.gg/latest/vln-ecosystem/overview</div>
              <div>docs.vln.gg/vln-ecosystem/overview (redirects to latest)</div>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              This will allow users to reference specific documentation versions and easily access historical documentation.
            </p>
          </div>
        </section>
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
            className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right"
          >
            <div className="flex items-start gap-3 flex-row-reverse">
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
        ) : null}
      </div>
    </article>
  );
}
