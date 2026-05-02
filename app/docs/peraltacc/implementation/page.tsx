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
  title: 'Implementation Guide - Peralta Platform',
  description: 'Setup and integration instructions',
};

export default async function PeraltaImplementationPage() {
  const sectionData = getSectionBySlug('peraltacc');
  const pageData = getPageBySlug('peraltacc', 'implementation');
  const previousPage = getPreviousPage('peraltacc', 'implementation');
  const nextPage = getNextPage('peraltacc', 'implementation');
  const breadcrumbs = getBreadcrumbs('peraltacc', 'implementation');

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
            <span>12 min read</span>
          </div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Prerequisites</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Node.js 18+ or Python 3.9+</li>
            <li>PostgreSQL 13+ for data storage</li>
            <li>Kubernetes cluster (optional, for cloud deployment)</li>
            <li>Docker for containerization</li>
            <li>Git for version control</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Installation Steps</h2>
          <ol className="space-y-3 list-decimal list-inside">
            <li><span className="font-semibold">Clone the repository</span> - Get the latest Peralta source</li>
            <li><span className="font-semibold">Install dependencies</span> - Run npm install or pip install</li>
            <li><span className="font-semibold">Configure database</span> - Set up PostgreSQL and migrations</li>
            <li><span className="font-semibold">Set environment variables</span> - Configure API keys and secrets</li>
            <li><span className="font-semibold">Initialize the system</span> - Run setup scripts</li>
            <li><span className="font-semibold">Start services</span> - Launch all components</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Configuration</h2>
          <p className="leading-relaxed">
            Configure Peralta through environment variables and configuration files. Key settings include:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">DATABASE_URL</span> - PostgreSQL connection string</span>
            </li>
            <li className="flex gap-2">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">API_KEY</span> - Authentication token for API</span>
            </li>
            <li className="flex gap-2">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">DETECTION_RULES</span> - Custom threat detection rules</span>
            </li>
            <li className="flex gap-2">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">LOG_LEVEL</span> - Logging verbosity (debug, info, warn, error)</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Integration Guide</h2>
          <div className="space-y-4">
            <div className="p-4 border border-white/10 rounded-lg">
              <h3 className="font-semibold text-white mb-2">With Kubernetes</h3>
              <p className="text-sm text-gray-400">Deploy using Helm charts for automated scaling and management.</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h3 className="font-semibold text-white mb-2">With Docker</h3>
              <p className="text-sm text-gray-400">Run containerized deployments with docker-compose or Docker Swarm.</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <h3 className="font-semibold text-white mb-2">With CI/CD</h3>
              <p className="text-sm text-gray-400">Integrate with Jenkins, GitLab CI, or GitHub Actions for automated testing.</p>
            </div>
          </div>
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
