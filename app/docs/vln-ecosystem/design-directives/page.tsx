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
  title: 'Design Directives - VLN Ecosystem',
  description: 'Design principles and standards for VLN ecosystem',
};

export default async function VLNDesignDirectivesPage() {
  const sectionData = getSectionBySlug('vln-ecosystem');
  const pageData = getPageBySlug('vln-ecosystem', 'design-directives');
  const previousPage = getPreviousPage('vln-ecosystem', 'design-directives');
  const nextPage = getNextPage('vln-ecosystem', 'design-directives');
  const breadcrumbs = getBreadcrumbs('vln-ecosystem', 'design-directives');

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
            <span>10 min read</span>
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
          <h2 className="text-2xl font-bold text-white">Design Directives</h2>
          <p className="leading-relaxed">
            All new features, pages, and components added to the VLN ecosystem must adhere to these design directives. These guidelines ensure consistency, maintainability, and alignment with VLN brand identity across all platforms.
          </p>
        </section>

        {/* Brand Identity */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Brand Identity</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Color Palette</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-charcoal border border-white/20 rounded" />
                  <span><strong>Matte Charcoal (#0f0f0f)</strong> - Primary background</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#a6c3a7] border border-white/20 rounded" />
                  <span><strong>Sage Green (#a6c3a7)</strong> - Primary accent</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#aab7c8] border border-white/20 rounded" />
                  <span><strong>Warm Blue-Gray (#aab7c8)</strong> - Secondary accent</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white border border-white/20 rounded" />
                  <span><strong>Soft Glow White</strong> - UI highlighting</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Typography</h4>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li><strong>Primary:</strong> Inter (body text, headings)</li>
                <li><strong>Secondary:</strong> JetBrains Mono (code, technical content)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Component Standards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Component Standards</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Server Components (Default)</h4>
              <p className="text-sm text-gray-400">
                All new components should be server components by default. Only use <code className="bg-white/10 px-2 py-1 rounded">&apos;use client&apos;</code> when the component requires interactivity.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Interactive Elements</h4>
              <p className="text-sm text-gray-400 mb-2">
                All buttons, links, and interactive elements must:
              </p>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li>Use glow-lift states with Sage Green accent</li>
                <li>Include keyboard navigation support</li>
                <li>Have proper ARIA labels for accessibility</li>
              </ul>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Styling Rules</h4>
              <p className="text-sm text-gray-400 mb-2">
                Use Tailwind CSS exclusively. Follow these rules:
              </p>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li>Use design token variables (--vln-sage, --vln-bluegray)</li>
                <li>No inline styles or CSS-in-JS</li>
                <li>Maintain consistent spacing using Tailwind scale</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Layout System */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Layout System</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Container</h4>
              <p className="text-sm text-gray-400">
                Max width: <code className="bg-white/10 px-2 py-1 rounded">1280px</code>
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Mobile First Approach</h4>
              <p className="text-sm text-gray-400 mb-2">Design for mobile first, then enhance for larger screens</p>
              <div className="grid gap-2 text-xs text-gray-400 font-mono">
                <div className="flex justify-between">
                  <span>sm:</span><span>640px</span>
                </div>
                <div className="flex justify-between">
                  <span>md:</span><span>768px</span>
                </div>
                <div className="flex justify-between">
                  <span>lg:</span><span>1024px</span>
                </div>
                <div className="flex justify-between">
                  <span>xl:</span><span>1280px</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Motion & Interaction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Motion & Interaction</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Animations</h4>
              <p className="text-sm text-gray-400">
                Motion should be used sparingly. Prefer subtle transitions over elaborate animations. Focus on improving UX, not decoration.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Hover States</h4>
              <p className="text-sm text-gray-400 mb-2">
                Interactive elements should have clear hover states:
              </p>
              <div className="bg-charcoal/50 border border-white/5 rounded p-3 text-xs text-gray-300 font-mono">
                transition-all shadow-[0_0_0_0] hover:shadow-[0_0_8px_#a6c3a7]
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Accessibility Requirements</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <span className="text-sm"><strong>WCAG AA Contrast</strong> - All text must meet WCAG AA contrast ratio requirements</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <span className="text-sm"><strong>Keyboard Navigation</strong> - All interactive elements must be keyboard accessible</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <span className="text-sm"><strong>ARIA Labels</strong> - Use semantic HTML and ARIA labels where needed</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <span className="text-sm"><strong>Focus Indicators</strong> - Never hide focus indicators; style them clearly</span>
            </li>
          </ul>
        </section>

        {/* Documentation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Documentation for New Features</h2>
          <p className="text-sm text-gray-400 mb-3">
            All new features must include documentation covering:
          </p>
          <div className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
            <div>📖 <strong>Overview</strong> - What the feature does and why it matters</div>
            <div>🚀 <strong>Getting Started</strong> - How to use the feature with examples</div>
            <div>⚙️ <strong>Configuration</strong> - Available options and settings</div>
            <div>🔗 <strong>API Reference</strong> - For technical integrations</div>
            <div>❓ <strong>FAQ & Troubleshooting</strong> - Common questions and solutions</div>
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
