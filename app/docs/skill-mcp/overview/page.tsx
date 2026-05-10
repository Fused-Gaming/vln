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
  title: 'Overview - Skill MCP Tools',
  description: 'skill.vln.gg - Model Context Protocol integration for 28+ DevOps tools',
};

export default async function SkillMCPOverviewPage() {
  const sectionData = getSectionBySlug('skill-mcp');
  const pageData = getPageBySlug('skill-mcp', 'overview');
  const nextPage = getNextPage('skill-mcp', 'overview');
  const breadcrumbs = getBreadcrumbs('skill-mcp', 'overview');

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
          Skill MCP Tools
        </h1>
        <p className="text-lg text-gray-400">
          {pageData.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>10 min read</span>
          </div>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-sage-500/50 to-transparent" />

      {/* Content */}
      <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What is Skill MCP?</h2>
          <p className="leading-relaxed">
            <strong>skill.vln.gg</strong> is a centralized platform that exposes 28+ DevOps tools through a unified <strong>Model Context Protocol (MCP)</strong> interface. This allows AI agents, developers, and automation systems to interact with tools like GitHub, AWS, Kubernetes, and more through a single, standardized JSON-RPC 2.0 API.
          </p>
        </section>

        {/* Key Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Key Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border border-sage-500/30 rounded-lg bg-sage-500/5">
              <h4 className="font-semibold text-white mb-2">🛠️ 28+ Integrated Tools</h4>
              <p className="text-sm text-gray-400">
                GitHub, AWS, Azure, GCP, Kubernetes, Docker, Terraform, and more.
              </p>
            </div>
            <div className="p-4 border border-sage-500/30 rounded-lg bg-sage-500/5">
              <h4 className="font-semibold text-white mb-2">🔗 Unified API</h4>
              <p className="text-sm text-gray-400">
                Single JSON-RPC 2.0 interface for all tools.
              </p>
            </div>
            <div className="p-4 border border-sage-500/30 rounded-lg bg-sage-500/5">
              <h4 className="font-semibold text-white mb-2">🔐 Enterprise Security</h4>
              <p className="text-sm text-gray-400">
                Authentication, rate limiting, audit logging, and compliance ready.
              </p>
            </div>
            <div className="p-4 border border-sage-500/30 rounded-lg bg-sage-500/5">
              <h4 className="font-semibold text-white mb-2">⚡ AI-Ready</h4>
              <p className="text-sm text-gray-400">
                Optimized for AI agents and autonomous systems.
              </p>
            </div>
          </div>
        </section>

        {/* What is MCP? */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Understanding Model Context Protocol (MCP)</h2>
          <p className="leading-relaxed mb-3">
            MCP is an open protocol that allows AI models to interact with external tools and data sources. Think of it as a standardized way for AI agents to:
          </p>
          <ul className="space-y-2 list-disc list-inside text-gray-400">
            <li>Discover available tools and their capabilities</li>
            <li>Execute tool actions with standardized requests</li>
            <li>Receive structured responses back from tools</li>
            <li>Handle errors and rate limits gracefully</li>
          </ul>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Use Cases</h2>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">AI-Powered DevOps</h4>
              <p className="text-sm text-gray-400">
                Enable AI agents to manage infrastructure, deploy code, and respond to incidents.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">Automation at Scale</h4>
              <p className="text-sm text-gray-400">
                Unified interface reduces tool-switching and integration complexity.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">Developer Experience</h4>
              <p className="text-sm text-gray-400">
                Single API to learn and interact with all tools you need.
              </p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <h4 className="font-semibold text-white mb-1">Compliance & Auditing</h4>
              <p className="text-sm text-gray-400">
                Centralized logging and access control across all tool interactions.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5-Component Architecture</h2>
          <p className="text-gray-400 mb-3">
            Skill MCP consists of five core components:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <div className="flex gap-3">
              <span className="text-sage-500 font-bold flex-shrink-0">1</span>
              <div>
                <h4 className="font-semibold text-white">MCP Server</h4>
                <p className="text-sm text-gray-400">JSON-RPC 2.0 server handling tool registration and requests</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 font-bold flex-shrink-0">2</span>
              <div>
                <h4 className="font-semibold text-white">Tool Adapters</h4>
                <p className="text-sm text-gray-400">Individual adapters for each of 28+ tools (GitHub, AWS, K8s, etc.)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 font-bold flex-shrink-0">3</span>
              <div>
                <h4 className="font-semibold text-white">Authentication Layer</h4>
                <p className="text-sm text-gray-400">OAuth 2.0, API keys, and credential management</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 font-bold flex-shrink-0">4</span>
              <div>
                <h4 className="font-semibold text-white">Rate Limiter & Audit Log</h4>
                <p className="text-sm text-gray-400">Request throttling and comprehensive activity logging</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 font-bold flex-shrink-0">5</span>
              <div>
                <h4 className="font-semibold text-white">Client SDKs</h4>
                <p className="text-sm text-gray-400">JavaScript, Python, Go SDKs for easy integration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Quick Facts</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex gap-2">
              <span className="text-sage-500 flex-shrink-0">📦</span>
              <span className="text-sm text-gray-300"><strong>28+ Tools</strong> integrated and ready</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sage-500 flex-shrink-0">⏱️</span>
              <span className="text-sm text-gray-300"><strong>4-6 weeks</strong> to full MVP</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sage-500 flex-shrink-0">🚀</span>
              <span className="text-sm text-gray-300"><strong>5 phases</strong> of development</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sage-500 flex-shrink-0">🎯</span>
              <span className="text-sm text-gray-300"><strong>AI-ready</strong> from day one</span>
            </div>
          </div>
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
    </article>
  );
}
