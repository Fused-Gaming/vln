import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PeraltaCC Security Proposal | VLN',
  description: 'Confidential security engagement proposal - Authorized access only',
  robots: 'noindex, nofollow',
}

const sections = [
  { id: '01', title: 'Executive Summary', file: '01-executive-summary.md' },
  { id: '02', title: 'Scope of Work', file: '02-scope-of-work.md' },
  { id: '04', title: 'Deliverables', file: '04-deliverables.md' },
  { id: '05', title: 'Timeline', file: '05-timeline.md' },
  { id: '06', title: 'Pricing & Retainer', file: '06-pricing.md' },
  { id: '07', title: 'Team & Credentials', file: '07-team.md' },
  { id: '08', title: 'Terms & References', file: '08-terms-and-references.md' },
  { id: '09', title: 'Risk Assessment', file: '09-risk-assessment.md' },
  { id: '10', title: 'Implementation Roadmap', file: '10-implementation-roadmap.md' },
  { id: '12', title: 'Success Metrics', file: '12-success-metrics.md' },
  { id: '13', title: 'Company Background', file: '13-company-background.md' },
  { id: '14', title: 'Appendices & Reference', file: '14-appendices.md' },
]

export default function PeraltaProposalPage() {
  return (
    <div className="min-h-screen bg-vln-bg text-vln-text">
      {/* Header */}
      <div className="border-b border-vln-sage/20 bg-gradient-to-b from-vln-bg to-vln-bg/95 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 inline-block rounded-lg bg-red-900/20 px-3 py-1 text-xs font-semibold text-red-400">
            🔐 CONFIDENTIAL – AUTHORIZED ACCESS ONLY
          </div>
          <h1 className="mt-4 text-4xl font-bold text-vln-text">
            PeraltaCC Security Engagement
          </h1>
          <p className="mt-2 text-lg text-vln-text/70">
            Comprehensive 12-Section Proposal Package
          </p>
          <p className="mt-4 text-sm text-vln-text/60">
            Prepared by <span className="font-semibold text-vln-sage">VLN – Vulnerability Lab Network</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-8 py-12">
        {/* Warning Banner */}
        <div className="mb-8 rounded-lg border border-yellow-900/30 bg-yellow-900/10 p-6">
          <p className="text-sm text-yellow-200">
            <strong>⚠️ Confidentiality Notice:</strong> This proposal is confidential and proprietary to VLN.
            It is provided exclusively for authorized recipients. Unauthorized distribution or disclosure is prohibited.
            All sections are subject to non-disclosure agreements.
          </p>
        </div>

        {/* Proposal Overview */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-vln-sage">Proposal Contents</h2>
          <p className="mb-6 text-vln-text/80">
            This proposal package includes comprehensive security engagement documentation covering audit scope,
            timeline, team qualifications, risk assessment, implementation roadmap, and success metrics.
          </p>

          {/* Sections Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`/docs/peralta/${section.id}`}
                className="group rounded-lg border border-vln-sage/30 bg-vln-text/5 p-4 transition-all hover:border-vln-sage hover:bg-vln-sage/10 hover:shadow-[0_0_12px_#a6c3a7_1a]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-vln-sage">SECTION {section.id}</span>
                    <h3 className="mt-1 font-semibold text-vln-text group-hover:text-vln-sage">
                      {section.title}
                    </h3>
                  </div>
                  <span className="text-lg text-vln-sage/50 group-hover:text-vln-sage">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Document Info */}
        <div className="rounded-lg border border-vln-sage/20 bg-vln-text/5 p-6">
          <h3 className="mb-4 font-semibold text-vln-sage">Document Information</h3>
          <dl className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-vln-text/70">Classification:</dt>
              <dd className="font-semibold">Confidential – Client Delivery</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-vln-text/70">Recipient:</dt>
              <dd className="font-semibold">PeraltaCC</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-vln-text/70">Total Sections:</dt>
              <dd className="font-semibold">{sections.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-vln-text/70">Format:</dt>
              <dd className="font-semibold">Markdown / PDF Ready</dd>
            </div>
          </dl>
        </div>

        {/* Contact Footer */}
        <div className="mt-12 border-t border-vln-sage/20 pt-8 text-center text-sm text-vln-text/70">
          <p>For questions or access requests, contact:</p>
          <p className="mt-2 font-semibold text-vln-sage">
            engage@vln.gg
          </p>
          <p className="mt-4 text-xs">
            This delivery is tracked and logged for security purposes.
          </p>
        </div>
      </div>
    </div>
  )
}
