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
  title: 'Domain Configuration - VLN Ecosystem',
  description: 'Top-level domain and subdomain setup strategies',
};

export default async function VLNDomainConfigurationPage() {
  const sectionData = getSectionBySlug('vln-ecosystem');
  const pageData = getPageBySlug('vln-ecosystem', 'domain-configuration');
  const previousPage = getPreviousPage('vln-ecosystem', 'domain-configuration');
  const nextPage = getNextPage('vln-ecosystem', 'domain-configuration');
  const breadcrumbs = getBreadcrumbs('vln-ecosystem', 'domain-configuration');

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
        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Domain Topology</h2>
          <p className="leading-relaxed">
            VLN.GG operates across a primary domain (vln.gg) with multiple strategic subdomains, each serving specific purposes. This guide covers DNS configuration, SSL/TLS setup, and future subdomain expansion strategies.
          </p>
        </section>

        {/* Current Domain Structure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Current Domain Structure</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-sage-400 mb-2">vln.gg</h4>
              <p className="text-sm text-gray-400 mb-2"><strong>Purpose:</strong> Primary marketing site</p>
              <p className="text-sm text-gray-400"><strong>Content:</strong> Homepage, services overview, contact, booking</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-sage-400 mb-2">docs.vln.gg</h4>
              <p className="text-sm text-gray-400 mb-2"><strong>Purpose:</strong> Documentation hub (public + auth-gated)</p>
              <p className="text-sm text-gray-400"><strong>Content:</strong> Guides, API references, design systems, versioned documentation</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-sage-400 mb-2">api.vln.gg</h4>
              <p className="text-sm text-gray-400 mb-2"><strong>Purpose:</strong> API endpoints</p>
              <p className="text-sm text-gray-400"><strong>Content:</strong> Audit requests, booking, webhooks, client management</p>
            </div>
          </div>
        </section>

        {/* Future Subdomain Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Future Subdomain Strategy</h2>
          <p className="text-gray-400 mb-3">
            Reserved subdomains for planned features:
          </p>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-blue-400 mb-2">portal.vln.gg</h4>
              <p className="text-sm text-gray-400"><strong>Planned for:</strong> Client portal (Q3 2026)</p>
              <p className="text-sm text-gray-400">Secure document delivery, engagement tracking, report access</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-blue-400 mb-2">status.vln.gg</h4>
              <p className="text-sm text-gray-400"><strong>Planned for:</strong> Status page</p>
              <p className="text-sm text-gray-400">System uptime, incident reporting, scheduled maintenance</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-blue-400 mb-2">blog.vln.gg</h4>
              <p className="text-sm text-gray-400"><strong>Planned for:</strong> Blog & advisory feed</p>
              <p className="text-sm text-gray-400">Security research, vulnerability advisories, case studies</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-mono font-semibold text-blue-400 mb-2">cdn.vln.gg</h4>
              <p className="text-sm text-gray-400"><strong>Planned for:</strong> Media & asset CDN</p>
              <p className="text-sm text-gray-400">Images, videos, large files optimized for global delivery</p>
            </div>
          </div>
        </section>

        {/* DNS Configuration */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">DNS Configuration</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-3">Required DNS Records</h4>
              <div className="bg-charcoal/50 border border-white/5 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-gray-300">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Name</th>
                      <th className="text-left p-3 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3">A</td>
                      <td className="p-3 font-mono">vln.gg</td>
                      <td className="p-3 font-mono">76.76.19.165</td>
                    </tr>
                    <tr>
                      <td className="p-3">CNAME</td>
                      <td className="p-3 font-mono">*.vln.gg</td>
                      <td className="p-3 font-mono">cname.vercel-dns.com</td>
                    </tr>
                    <tr>
                      <td className="p-3">MX</td>
                      <td className="p-3 font-mono">vln.gg</td>
                      <td className="p-3 font-mono">10 aspmx.l.google.com</td>
                    </tr>
                    <tr>
                      <td className="p-3">TXT</td>
                      <td className="p-3 font-mono">vln.gg</td>
                      <td className="p-3 font-mono">v=spf1 include:google.com ~all</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SSL/TLS Configuration */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">SSL/TLS Configuration</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Automatic SSL with Vercel</h4>
              <p className="text-sm text-gray-400">
                Vercel automatically provisions and renews SSL/TLS certificates for all custom domains. No additional configuration needed.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Security Headers</h4>
              <p className="text-sm text-gray-400 mb-3">
                All domains must include these HTTP security headers:
              </p>
              <div className="bg-charcoal/50 border border-white/5 rounded p-3 space-y-1 text-xs text-gray-300 font-mono">
                <div>Strict-Transport-Security: max-age=31536000</div>
                <div>X-Content-Type-Options: nosniff</div>
                <div>X-Frame-Options: DENY</div>
                <div>X-XSS-Protection: 1; mode=block</div>
              </div>
            </div>
          </div>
        </section>

        {/* Adding New Subdomains */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Adding New Subdomains</h2>
          <div className="bg-sage-500/10 border border-sage-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-4">
              When adding a new subdomain, follow these steps:
            </p>
            <ol className="space-y-3 text-sm text-gray-400 list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-white">Update DNS:</strong> Add CNAME record pointing to <code className="bg-white/10 px-1">cname.vercel-dns.com</code>
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Configure Vercel:</strong> Add custom domain in Vercel project settings
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Deploy Application:</strong> Push code to configure the subdomain endpoint
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Verify SSL:</strong> Confirm SSL certificate is active
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Update Documentation:</strong> Add subdomain to domain topology documentation
              </li>
            </ol>
          </div>
        </section>

        {/* Subdomain Governance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Subdomain Governance</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Naming Conventions</h4>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li>Use lowercase letters and hyphens only</li>
                <li>Keep subdomain names short and descriptive (3-15 characters)</li>
                <li>Use nouns, not verbs (e.g., <code className="bg-white/10 px-1">portal.vln.gg</code> not <code className="bg-white/10 px-1">manage.vln.gg</code>)</li>
              </ul>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Approval Process</h4>
              <p className="text-sm text-gray-400">
                New subdomains require approval from the project lead. Include use case, expected traffic, and integration with existing services.
              </p>
            </div>
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
