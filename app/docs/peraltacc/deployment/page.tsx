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
  title: 'Deployment Guide - Peralta Platform',
  description: 'Deployment options and configuration',
};

export default async function PeraltaDeploymentPage() {
  const sectionData = getSectionBySlug('peraltacc');
  const pageData = getPageBySlug('peraltacc', 'deployment');
  const previousPage = getPreviousPage('peraltacc', 'deployment');
  const nextPage = getNextPage('peraltacc', 'deployment');
  const breadcrumbs = getBreadcrumbs('peraltacc', 'deployment');

  if (!pageData || !sectionData) {
    notFound();
  }

  const readTime = 11;

  return (
    <article className="space-y-8 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-2">
            <Link href={crumb.href} className="hover:text-sage-400 transition-colors">{crumb.label}</Link>
            {index < breadcrumbs.length - 1 && <span className="text-gray-600">/</span>}
          </div>
        ))}
      </nav>

      <div className="space-y-4 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">{pageData.title}</h1>
        <p className="text-lg text-gray-400">{pageData.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{readTime} min read</span></div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Deployment Options</h2>
          <div className="space-y-4">
            <div className="p-4 border border-white/10 rounded-lg"><h3 className="font-semibold text-white">AWS</h3><p className="text-sm text-gray-400">Deploy to AWS using CloudFormation or Terraform for managed infrastructure.</p></div>
            <div className="p-4 border border-white/10 rounded-lg"><h3 className="font-semibold text-white">Kubernetes</h3><p className="text-sm text-gray-400">Deploy using Helm charts for container orchestration and auto-scaling.</p></div>
            <div className="p-4 border border-white/10 rounded-lg"><h3 className="font-semibold text-white">Docker</h3><p className="text-sm text-gray-400">Deploy with Docker Compose for development or Docker Swarm for production.</p></div>
            <div className="p-4 border border-white/10 rounded-lg"><h3 className="font-semibold text-white">On-Premise</h3><p className="text-sm text-gray-400">Deploy on your own infrastructure with full control and isolation.</p></div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Pre-Deployment Checklist</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            <li>Review system requirements and resource allocation</li>
            <li>Configure networking and firewall rules</li>
            <li>Set up database and backup strategy</li>
            <li>Configure TLS/SSL certificates</li>
            <li>Set up monitoring and alerting</li>
            <li>Create deployment runbooks</li>
            <li>Plan rollback procedures</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Environment Setup</h2>
          <p className="leading-relaxed">Configure environment-specific variables:</p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs overflow-x-auto space-y-2">
            <p className="text-gray-300">ENVIRONMENT=production</p>
            <p className="text-gray-300">LOG_LEVEL=info</p>
            <p className="text-gray-300">ENABLE_MONITORING=true</p>
            <p className="text-gray-300">AUTO_SCALE=true</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Scaling Considerations</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Horizontal Scaling</span> - Add more instances for load distribution</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Vertical Scaling</span> - Increase resources per instance</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Database Optimization</span> - Use read replicas and caching</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Load Balancing</span> - Distribute traffic across instances</span></li>
          </ul>
        </section>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      <div className="grid gap-4 sm:grid-cols-2">
        {previousPage && (
          <Link href={`/docs/${previousPage.section.slug}/${previousPage.page.slug}`} className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all">
            <div className="flex items-start gap-3">
              <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Previous</div>
                <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">{previousPage.page.title}</div>
              </div>
            </div>
          </Link>
        )}
        {nextPage && (
          <Link href={`/docs/${nextPage.section.slug}/${nextPage.page.slug}`} className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left">
            <div className="flex items-start gap-3 sm:flex-row-reverse">
              <LucideArrowRight className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Next</div>
                <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">{nextPage.page.title}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}
