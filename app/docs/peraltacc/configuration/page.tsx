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
  title: 'Configuration Guide - Peralta Platform',
  description: 'Settings and environment setup',
};

export default async function PeraltaConfigurationPage() {
  const sectionData = getSectionBySlug('peraltacc');
  const pageData = getPageBySlug('peraltacc', 'configuration');
  const previousPage = getPreviousPage('peraltacc', 'configuration');
  const nextPage = getNextPage('peraltacc', 'configuration');
  const breadcrumbs = getBreadcrumbs('peraltacc', 'configuration');

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
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>9 min read</span></div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Configuration Files</h2>
          <p className="leading-relaxed">Peralta uses YAML configuration files for all settings:</p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs">
            <p className="text-gray-300">/etc/peralta/config.yaml</p>
            <p className="text-gray-300">/etc/peralta/detection-rules.yaml</p>
            <p className="text-gray-300">/etc/peralta/response-policies.yaml</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Environment Variables</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="font-semibold text-white mb-1">DATABASE_URL</p>
              <p className="text-sm text-gray-400">PostgreSQL connection string with credentials</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="font-semibold text-white mb-1">REDIS_URL</p>
              <p className="text-sm text-gray-400">Redis connection for caching and queuing</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="font-semibold text-white mb-1">LOG_LEVEL</p>
              <p className="text-sm text-gray-400">Logging verbosity (debug, info, warn, error)</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="font-semibold text-white mb-1">ENABLE_TLS</p>
              <p className="text-sm text-gray-400">Enable HTTPS/TLS encryption</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Detection Rules Configuration</h2>
          <p className="leading-relaxed">Configure custom threat detection rules:</p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-gray-300">{`detection:
  rules:
    - name: "Brute Force Attack"
      enabled: true
      severity: high
      conditions:
        - failed_attempts: "> 5"
        - timeframe: "< 5m"
      actions:
        - alert: true
        - block_ip: true`}</pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Response Policies</h2>
          <p className="leading-relaxed">Define how Peralta responds to detected threats:</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span>Automatic alerting thresholds</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span>Incident escalation procedures</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span>Automatic remediation actions</span></li>
            <li className="flex gap-2"><span className="text-sage-500">▸</span><span>Integration with external systems</span></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Performance Tuning</h2>
          <div className="space-y-3">
            <p className="text-gray-300">Optimize Peralta for your infrastructure:</p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Adjust worker thread count for CPU utilization</li>
              <li>Configure memory limits and garbage collection</li>
              <li>Set connection pool sizes for database access</li>
              <li>Enable caching for frequently accessed data</li>
            </ul>
          </div>
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
