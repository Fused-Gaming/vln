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
  title: 'Deployment Guide - VLN Ecosystem',
  description: 'Deploy VLN ecosystem components to production',
};

export default async function VLNDeploymentGuidePage() {
  const sectionData = getSectionBySlug('vln-ecosystem');
  const pageData = getPageBySlug('vln-ecosystem', 'deployment-guide');
  const previousPage = getPreviousPage('vln-ecosystem', 'deployment-guide');
  const nextPage = getNextPage('vln-ecosystem', 'deployment-guide');
  const breadcrumbs = getBreadcrumbs('vln-ecosystem', 'deployment-guide');

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
            <span>12 min read</span>
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
          <h2 className="text-2xl font-bold text-white">Deployment Overview</h2>
          <p className="leading-relaxed">
            VLN.GG ecosystem is deployed across multiple platforms and environments. This guide covers the complete deployment topology, infrastructure setup, and post-deployment verification procedures.
          </p>
        </section>

        {/* Deployment Architecture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Deployment Architecture</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <p className="text-gray-400">
              The VLN ecosystem uses a multi-tier deployment strategy:
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Vercel (Primary CDN)</h4>
                <p className="text-sm text-gray-400">
                  Next.js application frontend, documentation site, and API routes. Provides global CDN, edge functions, and automatic deployments from git.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">PostgreSQL (Database)</h4>
                <p className="text-sm text-gray-400">
                  Relational database for persistent storage. Managed via Supabase or self-hosted infrastructure.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">GitHub Actions (CI/CD)</h4>
                <p className="text-sm text-gray-400">
                  Automated testing, linting, building, and deployment workflows triggered on push and pull requests.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Optional: Cloudflare Workers (Edge)</h4>
                <p className="text-sm text-gray-400">
                  Advanced routing, WAF, DDoS protection, and edge-computed logic for future scaling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Prerequisites</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Required Accounts & Access</h4>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>GitHub repository with admin access</li>
                <li>Vercel account linked to GitHub</li>
                <li>PostgreSQL database (Supabase or self-hosted)</li>
                <li>Domain registrar with DNS access (for vln.gg and subdomains)</li>
                <li>Email service for transactional emails (SendGrid, Resend, or similar)</li>
              </ul>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Environment Variables</h4>
              <p className="text-sm text-gray-400 mb-3">
                Required secrets to be set in GitHub and Vercel:
              </p>
              <div className="bg-charcoal/50 border border-white/5 rounded p-4 text-xs text-gray-300 font-mono space-y-1 overflow-x-auto">
                <div>DATABASE_URL=postgresql://...</div>
                <div>NEXTAUTH_SECRET=...</div>
                <div>NEXTAUTH_URL=https://vln.gg</div>
                <div>EMAIL_SERVER_HOST=...</div>
                <div>EMAIL_SERVER_PORT=...</div>
                <div>EMAIL_SERVER_USER=...</div>
                <div>EMAIL_SERVER_PASSWORD=...</div>
                <div>EMAIL_FROM=noreply@vln.gg</div>
                <div>STRIPE_PUBLIC_KEY=...</div>
                <div>STRIPE_SECRET_KEY=...</div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment Steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Deployment Steps</h2>
          <div className="space-y-4">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">1. Prepare Infrastructure</h4>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                <li>Create PostgreSQL database and run migrations</li>
                <li>Configure DNS records for vln.gg and subdomains (docs.vln.gg, api.vln.gg, etc.)</li>
                <li>Set up email service provider and verify sender domain</li>
                <li>Configure GitHub repository secrets and Vercel environment variables</li>
              </ol>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">2. Link Vercel Project</h4>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                <li>Create Vercel project and link to GitHub repository</li>
                <li>Configure production deployment from main branch</li>
                <li>Enable preview deployments for pull requests</li>
                <li>Add custom domains (vln.gg, docs.vln.gg, api.vln.gg)</li>
              </ol>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">3. Configure CI/CD</h4>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                <li>Push code to integration/vln branch</li>
                <li>Verify GitHub Actions workflows execute successfully</li>
                <li>Run build, lint, and test checks</li>
                <li>Review security scans for vulnerabilities</li>
              </ol>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">4. Deploy to Production</h4>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                <li>Merge to main branch (via pull request from integration/vln)</li>
                <li>Vercel automatically deploys to production</li>
                <li>Run post-deployment smoke tests</li>
                <li>Verify all custom domains are accessible</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Post-Deployment Verification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Post-Deployment Verification</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Health Checks</h4>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li>✓ vln.gg responds with 200 status</li>
                <li>✓ docs.vln.gg loads documentation hub</li>
                <li>✓ API endpoints return proper responses</li>
                <li>✓ Database connections established</li>
                <li>✓ Email service operational</li>
              </ul>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Security Verification</h4>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li>✓ SSL/TLS certificates valid</li>
                <li>✓ HSTS headers present</li>
                <li>✓ Environment variables not exposed</li>
                <li>✓ Sensitive endpoints require authentication</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Rollback Procedures */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Rollback Procedures</h2>
          <p className="text-gray-400 mb-3">
            If deployment issues arise, follow these rollback procedures:
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-red-300">For Immediate Rollback</h4>
            <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
              <li>Revert the problematic commit from main branch</li>
              <li>Vercel automatically re-deploys from reverted commit</li>
              <li>Verify site functionality returns to normal</li>
              <li>Create issue to investigate root cause</li>
            </ol>
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
