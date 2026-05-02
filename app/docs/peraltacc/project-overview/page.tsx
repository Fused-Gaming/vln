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
  title: 'Project Overview - Peralta Platform',
  description: 'Peralta mission, values, and key features',
};

export default async function PeraltaOverviewPage() {
  const sectionData = getSectionBySlug('peraltacc');
  const pageData = getPageBySlug('peraltacc', 'project-overview');
  const nextPage = getNextPage('peraltacc', 'project-overview');
  const breadcrumbs = getBreadcrumbs('peraltacc', 'project-overview');

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
          <h2 className="text-2xl font-bold text-white">Mission</h2>
          <p className="leading-relaxed">
            Peralta is a cutting-edge security platform designed to protect enterprise digital infrastructure
            from evolving threats. We provide intelligent, automated security solutions that integrate seamlessly
            into modern DevOps workflows while maintaining the highest standards of rigor and transparency.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Key Features</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <span>🛡️</span> Advanced Threat Detection
              </h3>
              <p className="text-sm text-gray-400">
                Multi-layered threat detection using machine learning, behavior analysis, and signature-based detection.
              </p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <span>⚡</span> Real-time Response
              </h3>
              <p className="text-sm text-gray-400">
                Instant threat detection and response with automated remediation capabilities and alerting.
              </p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <span>📊</span> Comprehensive Analytics
              </h3>
              <p className="text-sm text-gray-400">
                Deep insights into security posture with detailed reporting and trend analysis.
              </p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <span>🔄</span> DevOps Integration
              </h3>
              <p className="text-sm text-gray-400">
                Seamless integration with CI/CD pipelines and modern development workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Use Cases</h2>
          <div className="space-y-4">
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-2">Enterprise Security</h4>
              <p className="text-sm text-gray-400">
                Protect large-scale infrastructure with comprehensive threat monitoring and compliance reporting.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-2">DevSecOps</h4>
              <p className="text-sm text-gray-400">
                Integrate security into development pipelines with automated scanning and policy enforcement.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-2">Vulnerability Management</h4>
              <p className="text-sm text-gray-400">
                Track, prioritize, and remediate vulnerabilities across your entire infrastructure.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-2">Compliance & Audit</h4>
              <p className="text-sm text-gray-400">
                Meet regulatory requirements with comprehensive audit trails and compliance reporting.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Getting Started</h2>
          <p className="leading-relaxed">
            Getting started with Peralta is straightforward. Follow these steps:
          </p>
          <ol className="space-y-3 list-decimal list-inside">
            <li className="text-gray-300">
              <span className="font-semibold">Review the Architecture</span> - Understand how Peralta components work together
            </li>
            <li className="text-gray-300">
              <span className="font-semibold">Set Up Your Environment</span> - Configure prerequisites and dependencies
            </li>
            <li className="text-gray-300">
              <span className="font-semibold">Deploy</span> - Follow deployment guides for your infrastructure
            </li>
            <li className="text-gray-300">
              <span className="font-semibold">Configure</span> - Set up security policies and detection rules
            </li>
            <li className="text-gray-300">
              <span className="font-semibold">Monitor</span> - Start monitoring and responding to threats
            </li>
          </ol>
        </section>

        {/* Core Components Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Core Components</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Detection Engine</h4>
                <p className="text-sm text-gray-400">
                  Multi-layered threat detection with ML-powered analysis
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Response Engine</h4>
                <p className="text-sm text-gray-400">
                  Automated incident response and remediation
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Analytics Dashboard</h4>
                <p className="text-sm text-gray-400">
                  Comprehensive security insights and reporting
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">API Layer</h4>
                <p className="text-sm text-gray-400">
                  RESTful APIs for integration and automation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Technology Stack</h2>
          <ul className="space-y-2">
            <li className="flex gap-2 text-gray-300">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">Backend:</span> Node.js/TypeScript, Python for ML components</span>
            </li>
            <li className="flex gap-2 text-gray-300">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">Database:</span> PostgreSQL for structured data, Redis for caching</span>
            </li>
            <li className="flex gap-2 text-gray-300">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">Frontend:</span> Next.js, React with TypeScript</span>
            </li>
            <li className="flex gap-2 text-gray-300">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">Infrastructure:</span> Kubernetes, Docker, AWS/GCP</span>
            </li>
            <li className="flex gap-2 text-gray-300">
              <span className="text-sage-500">▸</span>
              <span><span className="font-semibold">Monitoring:</span> Prometheus, Grafana, ELK Stack</span>
            </li>
          </ul>
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

      {/* CTA */}
      <div className="mt-12 p-6 border border-sage-500/30 rounded-lg bg-sage-500/5">
        <p className="text-gray-300 mb-4">
          Ready to secure your infrastructure? Start with the next section to learn about Peralta&apos;s architecture.
        </p>
        <Link
          href="/docs/peraltacc/architecture"
          className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 transition-colors"
        >
          Learn Architecture
          <LucideArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
