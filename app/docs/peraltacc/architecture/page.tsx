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
  title: 'Architecture Guide - Peralta Platform',
  description: 'System design, component hierarchy, and data flow',
};

export default async function PeraltaArchitecturePage() {
  const sectionData = getSectionBySlug('peraltacc');
  const pageData = getPageBySlug('peraltacc', 'architecture');
  const previousPage = getPreviousPage('peraltacc', 'architecture');
  const nextPage = getNextPage('peraltacc', 'architecture');
  const breadcrumbs = getBreadcrumbs('peraltacc', 'architecture');

  if (!pageData || !sectionData) {
    notFound();
  }

  return (
    <article className="space-y-8 max-w-4xl">
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

      <div className="space-y-4 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          {pageData.title}
        </h1>
        <p className="text-lg text-gray-400">{pageData.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>10 min read</span>
          </div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">System Architecture Overview</h2>
          <p className="leading-relaxed">
            Peralta is built with a modular, scalable architecture designed for high-throughput security operations.
            The system separates concerns into specialized components that communicate through well-defined APIs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Core Layers</h2>
          <div className="space-y-4">
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg">Data Collection Layer</h3>
              <p className="text-sm text-gray-400">
                Ingests data from multiple sources including logs, metrics, network traffic, and system events.
                Uses standardized formats and protocols for compatibility with various infrastructure platforms.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><span className="text-sage-500">Components:</span> Log collectors, metric exporters, event processors</p>
              </div>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg">Processing Layer</h3>
              <p className="text-sm text-gray-400">
                Analyzes collected data using ML models, signature detection, and behavioral analysis.
                Enriches events with threat intelligence and contextual information.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><span className="text-sage-500">Components:</span> Detection engine, ML pipeline, enrichment service</p>
              </div>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg">Response Layer</h3>
              <p className="text-sm text-gray-400">
                Executes automated responses and generates alerts. Triggers incident workflows and
                coordinates remediation across multiple systems.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><span className="text-sage-500">Components:</span> Response engine, workflow orchestrator, alerting service</p>
              </div>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white text-lg">Presentation Layer</h3>
              <p className="text-sm text-gray-400">
                Provides dashboards, reports, and APIs for users and systems to interact with Peralta.
                Includes analytics, configuration, and management interfaces.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><span className="text-sage-500">Components:</span> Web dashboard, REST API, admin panel</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Component Hierarchy</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 font-mono text-sm">
            <pre className="overflow-x-auto text-gray-300">{`Peralta Platform
├── Data Ingestion
│   ├── Log Collector
│   ├── Metric Exporter
│   └── Event Processor
├── Processing Engine
│   ├── Detection Module
│   ├── ML Pipeline
│   └── Enrichment Service
├── Response System
│   ├── Workflow Engine
│   ├── Action Executor
│   └── Alert Manager
└── Presentation Layer
    ├── Web Dashboard
    ├── API Server
    └── Admin Console`}</pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Data Flow</h2>
          <ol className="space-y-3 list-decimal list-inside text-gray-300">
            <li><span className="font-semibold">Collection:</span> Raw data enters from infrastructure sources</li>
            <li><span className="font-semibold">Normalization:</span> Events standardized to common format</li>
            <li><span className="font-semibold">Analysis:</span> Multiple detection methods applied in parallel</li>
            <li><span className="font-semibold">Correlation:</span> Related events grouped and analyzed together</li>
            <li><span className="font-semibold">Classification:</span> Threats categorized and severity assessed</li>
            <li><span className="font-semibold">Response:</span> Automated actions triggered based on policies</li>
            <li><span className="font-semibold">Storage:</span> Events persisted for audit and analytics</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Security Model</h2>
          <div className="space-y-3">
            <p className="text-gray-300">Peralta implements defense-in-depth across all layers:</p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span><span className="font-semibold">Authentication:</span> Multi-factor authentication for all users</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span><span className="font-semibold">Authorization:</span> Role-based access control (RBAC)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span><span className="font-semibold">Encryption:</span> End-to-end encryption for data in transit and at rest</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span><span className="font-semibold">Audit:</span> Complete audit trail of all system activities</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span><span className="font-semibold">Isolation:</span> Tenant isolation and network segmentation</span>
              </li>
            </ul>
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

      <div className="mt-12 p-6 border border-sage-500/30 rounded-lg bg-sage-500/5">
        <p className="text-gray-300 mb-4">
          Understand the architecture to make informed decisions about deployment and configuration.
        </p>
        <Link
          href="/docs/peraltacc/implementation"
          className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 transition-colors"
        >
          Implementation Guide
          <LucideArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
