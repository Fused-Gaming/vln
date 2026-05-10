import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getSectionBySlug,
  getPageBySlug,
  getNextPage,
  getBreadcrumbs
} from '@/lib/docs/sitemap';
import { LucideArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ecosystem Overview - VLN',
  description: 'VLN.GG architecture and ecosystem topology',
};

export default async function VLNEcosystemOverviewPage() {
  const sectionData = getSectionBySlug('vln-ecosystem');
  const pageData = getPageBySlug('vln-ecosystem', 'overview');
  const nextPage = getNextPage('vln-ecosystem', 'overview');
  const breadcrumbs = getBreadcrumbs('vln-ecosystem', 'overview');

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
            <span>8 min read</span>
          </div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      {/* Content */}
      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        {/* Mission Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">VLN.GG Ecosystem</h2>
          <p className="leading-relaxed">
            VLN.GG is a comprehensive security consulting platform built on a modular, scalable architecture. The ecosystem encompasses multiple interconnected services, documentation layers, and deployment patterns designed for enterprise-grade security analysis and smart contract auditing.
          </p>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Architecture Overview</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <p className="text-gray-400">
              The VLN ecosystem is organized around three primary layers:
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-lg">🌐 Frontend Layer</h4>
                <p className="text-sm text-gray-400">
                  Next.js 15 powered marketing site, documentation hub, and client-facing interfaces deployed on Vercel with full CDN support.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-lg">🔌 API & Service Layer</h4>
                <p className="text-sm text-gray-400">
                  Serverless functions handling audit requests, booking, webhooks, and client management. Built on Next.js API routes with PostgreSQL backing.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-lg">📚 Documentation & Knowledge Base</h4>
                <p className="text-sm text-gray-400">
                  Versioned, searchable documentation including deployment guides, design standards, API references, and confidential internal documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Domain Topology */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Domain Topology</h2>
          <p className="leading-relaxed">
            VLN.GG operates across multiple domains and subdomains, each serving specific purposes:
          </p>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">vln.gg</h4>
              <p className="text-sm text-gray-400">
                Primary marketing site, service index, and public documentation.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">docs.vln.gg</h4>
              <p className="text-sm text-gray-400">
                Comprehensive documentation hub with versioned guides, API references, and internal docs (auth-gated).
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">api.vln.gg</h4>
              <p className="text-sm text-gray-400">
                API endpoints for audit requests, booking, and client management.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">portal.vln.gg</h4>
              <p className="text-sm text-gray-400">
                Client portal for managing engagements, accessing reports, and document delivery (planned).
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Core Principles</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-white block">Enterprise-Grade Security</span>
                <span className="text-sm text-gray-400">All infrastructure follows zero-trust principles with encryption at rest and in transit.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-white block">Immutable Documentation</span>
                <span className="text-sm text-gray-400">All documentation is versioned with immutable release notes and change tracking.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-white block">Scalable by Design</span>
                <span className="text-sm text-gray-400">Modular architecture allows independent scaling of domains, services, and documentation tiers.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-white block">Client-Centric</span>
                <span className="text-sm text-gray-400">Clear separation between public documentation and confidential engagement materials.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Quick Links */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Next Steps</h2>
          <p className="leading-relaxed">
            Choose a section below based on your role:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/docs/vln-ecosystem/deployment-guide"
              className="p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1">Deployment Guide</h4>
                  <p className="text-sm text-gray-400">Deploy VLN ecosystem</p>
                </div>
                <LucideArrowRight className="w-4 h-4 text-sage-500" />
              </div>
            </Link>
            <Link
              href="/docs/vln-ecosystem/design-directives"
              className="p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1">Design Directives</h4>
                  <p className="text-sm text-gray-400">Platform design standards</p>
                </div>
                <LucideArrowRight className="w-4 h-4 text-sage-500" />
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* Navigation */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div />
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
