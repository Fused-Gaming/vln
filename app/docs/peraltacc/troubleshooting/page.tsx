import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getSectionBySlug,
  getPageBySlug,
  getPreviousPage,
  getBreadcrumbs
} from '@/lib/docs/sitemap';
import { LucideArrowLeft, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Troubleshooting - Peralta Platform',
  description: 'Common issues and solutions',
};

export default async function PeraltaTroubleshootingPage() {
  const sectionData = getSectionBySlug('peraltacc');
  const pageData = getPageBySlug('peraltacc', 'troubleshooting');
  const previousPage = getPreviousPage('peraltacc', 'troubleshooting');
  const breadcrumbs = getBreadcrumbs('peraltacc', 'troubleshooting');

  if (!pageData || !sectionData) {
    notFound();
  }

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
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>7 min read</span></div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Common Issues</h2>
          <div className="space-y-4">
            <div className="p-4 border border-white/10 rounded-lg space-y-2">
              <h3 className="font-semibold text-white">Database Connection Timeout</h3>
              <p className="text-sm text-gray-400"><span className="font-semibold">Problem:</span> Unable to connect to PostgreSQL database</p>
              <p className="text-sm text-gray-400"><span className="font-semibold">Solution:</span> Check DATABASE_URL, verify network connectivity, ensure database is running</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2">
              <h3 className="font-semibold text-white">High CPU Usage</h3>
              <p className="text-sm text-gray-400"><span className="font-semibold">Problem:</span> Detection engine consuming excessive CPU resources</p>
              <p className="text-sm text-gray-400"><span className="font-semibold">Solution:</span> Reduce rule complexity, disable inactive rules, add more worker threads</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2">
              <h3 className="font-semibold text-white">Missing Alerts</h3>
              <p className="text-sm text-gray-400"><span className="font-semibold">Problem:</span> Not receiving expected security alerts</p>
              <p className="text-sm text-gray-400"><span className="font-semibold">Solution:</span> Verify alert thresholds, check notification channels, review detection rules</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2">
              <h3 className="font-semibold text-white">API Rate Limiting</h3>
              <p className="text-sm text-gray-400"><span className="font-semibold">Problem:</span> Getting 429 Too Many Requests errors</p>
              <p className="text-sm text-gray-400"><span className="font-semibold">Solution:</span> Reduce request frequency, implement exponential backoff, contact support for limit increase</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Debugging Tips</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Enable debug logging:</span> Set LOG_LEVEL=debug to get detailed output</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Check system resources:</span> Monitor CPU, memory, disk usage</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Review logs:</span> Check application and system logs for errors</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Test connectivity:</span> Verify network connectivity to all dependencies</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span><span className="font-semibold">Validate configuration:</span> Use config validation tools to check syntax</span></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Performance Optimization</h2>
          <div className="space-y-3">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="font-semibold text-white mb-2">For High Event Throughput</p>
              <ul className="space-y-1 text-sm text-gray-400 list-disc list-inside">
                <li>Enable event batching and compression</li>
                <li>Use dedicated worker nodes for processing</li>
                <li>Implement event sampling if needed</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="font-semibold text-white mb-2">For Large Datasets</p>
              <ul className="space-y-1 text-sm text-gray-400 list-disc list-inside">
                <li>Use database indexing on critical fields</li>
                <li>Implement data retention policies</li>
                <li>Archive old data regularly</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Getting Help</h2>
          <p className="leading-relaxed">
            If you can&apos;t resolve an issue, contact support with the following information:
          </p>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            <li>Detailed error message and stack trace</li>
            <li>System information (OS, resources, version)</li>
            <li>Relevant logs (last 100 lines)</li>
            <li>Steps to reproduce the issue</li>
            <li>Your configuration (sanitized)</li>
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
        <Link href="/docs/peraltacc" className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left">
          <div className="flex items-start gap-3 sm:flex-row-reverse">
            <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0 rotate-180" />
            <div className="flex-1 text-sm">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Home</div>
              <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">Documentation Hub</div>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
