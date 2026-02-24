import Link from 'next/link';
import { Metadata } from 'next';
import { getAllSections } from '@/lib/docs/sitemap';
import { LucideArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation - VLN',
  description:
    'Welcome to VLN documentation hub. Learn about DevOps, CI/CD, deployment, security, and more.'
};

export default function DocsHomePage() {
  const sections = getAllSections();

  return (
    <article className="space-y-12">
      {/* Header */}
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          VLN Documentation
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Comprehensive guides for VLN development, DevOps, security, and smart
          contract auditing. Start with getting started or browse by topic.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        <Link
          href="/docs/getting-started/quick-start"
          className="group p-6 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quick Start
              </h3>
              <p className="text-sm text-gray-400">
                Get up and running in 5 minutes
              </p>
            </div>
            <LucideArrowRight className="w-5 h-5 text-sage-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/docs/getting-started"
          className="group p-6 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Getting Started
              </h3>
              <p className="text-sm text-gray-400">
                Complete setup guide for new developers
              </p>
            </div>
            <LucideArrowRight className="w-5 h-5 text-sage-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Sections Grid */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Explore Topics</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map(section => (
              <Link
                key={section.slug}
                href={`/docs/${section.slug}`}
                className="group p-6 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
              >
                <div className="space-y-3">
                  <div className="text-3xl">{section.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-sage-400 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {section.description}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {section.pages.length} pages
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 p-8 border border-sage-500/30 rounded-lg bg-sage-500/5">
        <h2 className="text-2xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
        <p className="text-gray-400 mb-6">
          Use the search bar at the top to quickly find any topic, or check our
          troubleshooting guide for common issues.
        </p>
        <div className="flex gap-4">
          <Link
            href="/docs/troubleshooting/faq"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 transition-colors"
          >
            View FAQ
            <LucideArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
