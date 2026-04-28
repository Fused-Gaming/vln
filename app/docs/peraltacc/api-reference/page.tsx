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
  title: 'API Reference - Peralta Platform',
  description: 'Complete endpoint documentation and specifications',
};

export default async function PeraltaAPIReferencePage() {
  const sectionData = getSectionBySlug('peraltacc');
  const pageData = getPageBySlug('peraltacc', 'api-reference');
  const previousPage = getPreviousPage('peraltacc', 'api-reference');
  const nextPage = getNextPage('peraltacc', 'api-reference');
  const breadcrumbs = getBreadcrumbs('peraltacc', 'api-reference');

  if (!pageData || !sectionData) {
    notFound();
  }

  return (
    <article className="space-y-8 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-2">
            <Link href={crumb.href} className="hover:text-sage-400 transition-colors">
              {crumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="text-gray-600">/</span>}
          </div>
        ))}
      </nav>

      <div className="space-y-4 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">{pageData.title}</h1>
        <p className="text-lg text-gray-400">{pageData.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>15 min read</span>
          </div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Authentication</h2>
          <p className="leading-relaxed">
            All API requests require authentication using API tokens. Include your token in the Authorization header.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
            <p className="text-gray-300">Authorization: Bearer YOUR_API_TOKEN</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Base URL</h2>
          <p className="leading-relaxed">All API endpoints are accessible at:</p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm">
            <p className="text-gray-300">https://api.peraltacc.io/v1</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Core Endpoints</h2>
          <div className="space-y-4">
            <div className="p-4 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white font-mono text-sm">GET /alerts</h3>
              <p className="text-sm text-gray-400">Retrieve security alerts</p>
              <p className="text-xs text-gray-500">Returns: Array of alert objects with severity and timestamp</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white font-mono text-sm">POST /events</h3>
              <p className="text-sm text-gray-400">Submit security events for analysis</p>
              <p className="text-xs text-gray-500">Requires: JSON event payload with timestamp and event type</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white font-mono text-sm">GET /incidents/{`{id}`}</h3>
              <p className="text-sm text-gray-400">Get incident details and status</p>
              <p className="text-xs text-gray-500">Returns: Incident object with timeline and mitigation status</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white font-mono text-sm">POST /rules</h3>
              <p className="text-sm text-gray-400">Create custom detection rules</p>
              <p className="text-xs text-gray-500">Requires: Rule definition with conditions and actions</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Response Format</h2>
          <p className="leading-relaxed">All responses are returned in JSON format:</p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">{`{
  "status": "success",
  "data": { /* response data */ },
  "error": null,
  "timestamp": "2026-04-28T15:00:00Z"
}`}</pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Error Codes</h2>
          <div className="space-y-2">
            <div className="flex gap-4 text-sm">
              <span className="font-mono text-sage-500 w-20">400</span>
              <span className="text-gray-400">Bad Request - Invalid parameters</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="font-mono text-sage-500 w-20">401</span>
              <span className="text-gray-400">Unauthorized - Invalid or missing token</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="font-mono text-sage-500 w-20">403</span>
              <span className="text-gray-400">Forbidden - Insufficient permissions</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="font-mono text-sage-500 w-20">429</span>
              <span className="text-gray-400">Rate Limited - Too many requests</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="font-mono text-sage-500 w-20">500</span>
              <span className="text-gray-400">Server Error - Internal error occurred</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Rate Limiting</h2>
          <p className="leading-relaxed">
            API requests are rate limited to 1000 requests per hour per API token.
            Rate limit information is included in response headers.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">X-RateLimit-Limit</span> - Total requests allowed</span>
            </li>
            <li className="flex gap-2">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">X-RateLimit-Remaining</span> - Requests remaining</span>
            </li>
            <li className="flex gap-2">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">X-RateLimit-Reset</span> - Unix timestamp of limit reset</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      <div className="grid gap-4 sm:grid-cols-2">
        {previousPage ? (
          <Link
            href={`/docs/${previousPage.section.slug}/${previousPage.page.slug}`}
            className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
          >
            <div className="flex items-start gap-3">
              <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Previous</div>
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
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Next</div>
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
    </article>
  );
}
