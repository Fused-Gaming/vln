import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getSectionBySlug,
  getPageBySlug,
  getPreviousPage,
  getBreadcrumbs
} from '@/lib/docs/sitemap';
import { LucideArrowLeft, Clock, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Confidential Documentation - VLN Ecosystem',
  description: 'Authentication-gated internal documentation (coming soon)',
};

export default async function VLNConfidentialDocsPage() {
  const sectionData = getSectionBySlug('vln-ecosystem');
  const pageData = getPageBySlug('vln-ecosystem', 'confidential-docs');
  const previousPage = getPreviousPage('vln-ecosystem', 'confidential-docs');
  const breadcrumbs = getBreadcrumbs('vln-ecosystem', 'confidential-docs');

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
        <div className="flex items-start gap-3">
          <Lock className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {pageData.title}
            </h1>
            <p className="text-lg text-gray-400">{pageData.description}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Planned for Q3 2026</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-amber-500/50 to-transparent" />

      {/* Content */}
      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
          <p className="leading-relaxed">
            This section is reserved for authentication-gated internal documentation. These materials will include sensitive deployment details, client engagement procedures, security incident playbooks, and confidential architecture information.
          </p>
        </section>

        {/* What's Planned */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What&apos;s Planned</h2>
          <div className="space-y-4">
            <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-500/5">
              <h4 className="font-semibold text-amber-300 mb-2">🔐 Authentication System</h4>
              <p className="text-sm text-gray-400">
                OAuth 2.0 integration with NextAuth.js for role-based access control to confidential documentation.
              </p>
            </div>
            <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-500/5">
              <h4 className="font-semibold text-amber-300 mb-2">📋 Engagement Playbooks</h4>
              <p className="text-sm text-gray-400">
                Client engagement procedures, scope management, remediation tracking, and billing workflows.
              </p>
            </div>
            <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-500/5">
              <h4 className="font-semibold text-amber-300 mb-2">🛡️ Security Procedures</h4>
              <p className="text-sm text-gray-400">
                Incident response playbooks, vulnerability disclosure procedures, and forensic analysis workflows.
              </p>
            </div>
            <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-500/5">
              <h4 className="font-semibold text-amber-300 mb-2">🏗️ Internal Architecture</h4>
              <p className="text-sm text-gray-400">
                Detailed system architecture, database schemas, API secrets management, and infrastructure code.
              </p>
            </div>
            <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-500/5">
              <h4 className="font-semibold text-amber-300 mb-2">💰 Billing & Retainers</h4>
              <p className="text-sm text-gray-400">
                Engagement pricing, payment terms, retainer tracking, and financial reporting templates.
              </p>
            </div>
          </div>
        </section>

        {/* Access Control */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Access Control Strategy</h2>
          <p className="text-gray-400 mb-3">
            Documentation will be organized by role and sensitivity level:
          </p>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">👥 Role-Based Access</h4>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li><strong>Admin:</strong> Full access to all confidential documentation</li>
                <li><strong>Lead:</strong> Access to client engagements and team procedures</li>
                <li><strong>Auditor:</strong> Access only to assigned engagement materials</li>
              </ul>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">🔒 Sensitivity Levels</h4>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li><strong>Internal:</strong> VLN team only</li>
                <li><strong>Client:</strong> Engagement-specific materials</li>
                <li><strong>Public:</strong> Client-facing documentation (current docs.vln.gg)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Implementation Timeline</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex gap-3">
              <span className="font-semibold text-white min-w-24">Q3 2026:</span>
              <span>Authentication system implementation and role configuration</span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-white min-w-24">Q4 2026:</span>
              <span>Migration of confidential materials from private repos to gated documentation</span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-white min-w-24">Q1 2027:</span>
              <span>Full deployment with client portal integration</span>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Technical Architecture (Planned)</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <p className="text-gray-400 mb-4">
              The authentication system will use NextAuth.js with the following components:
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="text-sage-500 flex-shrink-0">→</span>
                <span className="text-gray-400"><strong>Provider:</strong> GitHub OAuth (team-based access)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-sage-500 flex-shrink-0">→</span>
                <span className="text-gray-400"><strong>Database:</strong> PostgreSQL role mapping and audit logs</span>
              </div>
              <div className="flex gap-3">
                <span className="text-sage-500 flex-shrink-0">→</span>
                <span className="text-gray-400"><strong>Middleware:</strong> Edge functions for access control</span>
              </div>
              <div className="flex gap-3">
                <span className="text-sage-500 flex-shrink-0">→</span>
                <span className="text-gray-400"><strong>Audit:</strong> Comprehensive access logs for compliance</span>
              </div>
            </div>
          </div>
        </section>

        {/* How to Prepare */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">How to Prepare</h2>
          <p className="text-gray-400 mb-3">
            To prepare for confidential documentation rollout:
          </p>
          <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
            <li>Audit existing confidential materials in private repositories</li>
            <li>Create confidentiality classification rubric</li>
            <li>Map current VLN team roles to proposed access tiers</li>
            <li>Document sensitive procedures for future migration</li>
            <li>Review compliance requirements (GDPR, SOC2, etc.)</li>
          </ol>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <div className="p-6 border border-sage-500/30 rounded-lg bg-sage-500/5">
            <h2 className="text-2xl font-bold text-white mb-3">Questions?</h2>
            <p className="text-gray-400 mb-4">
              For questions about confidential documentation access or timeline, contact the VLN team directly.
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
      </div>
    </article>
  );
}
