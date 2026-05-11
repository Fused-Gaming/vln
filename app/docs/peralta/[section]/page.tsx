import { notFound } from 'next/navigation'
import Link from 'next/link'
import { readFileSync } from 'fs'
import { join } from 'path'
import { Metadata } from 'next'

interface PageProps {
  params: {
    section: string
  }
}

const sectionMap: Record<
  string,
  { title: string; file: string; prev?: string; next?: string }
> = {
  '01': {
    title: 'Executive Summary',
    file: '01-executive-summary.md',
    next: '02',
  },
  '02': { title: 'Scope of Work', file: '02-scope-of-work.md', prev: '01', next: '04' },
  '04': { title: 'Deliverables', file: '04-deliverables.md', prev: '02', next: '05' },
  '05': { title: 'Timeline', file: '05-timeline.md', prev: '04', next: '06' },
  '06': { title: 'Pricing & Retainer', file: '06-pricing.md', prev: '05', next: '07' },
  '07': { title: 'Team & Credentials', file: '07-team.md', prev: '06', next: '08' },
  '08': { title: 'Terms & References', file: '08-terms-and-references.md', prev: '07', next: '09' },
  '09': { title: 'Risk Assessment', file: '09-risk-assessment.md', prev: '08', next: '10' },
  '10': {
    title: 'Implementation Roadmap',
    file: '10-implementation-roadmap.md',
    prev: '09',
    next: '12',
  },
  '12': { title: 'Success Metrics', file: '12-success-metrics.md', prev: '10', next: '13' },
  '13': { title: 'Company Background', file: '13-company-background.md', prev: '12', next: '14' },
  '14': { title: 'Appendices & Reference', file: '14-appendices.md', prev: '13' },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const sectionInfo = sectionMap[params.section]
  if (!sectionInfo) return { title: 'Not Found' }

  return {
    title: `${sectionInfo.title} | PeraltaCC Proposal | VLN`,
    description: `${sectionInfo.title} - Confidential security engagement proposal`,
    robots: 'noindex, nofollow',
  }
}

export async function generateStaticParams() {
  return Object.keys(sectionMap).map((section) => ({
    section,
  }))
}

function parseMarkdownToHTML(markdown: string): string {
  // Basic markdown to HTML conversion
  let html = markdown
    .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold text-vln-sage mt-6 mb-2">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold text-vln-sage mt-8 mb-3">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold text-vln-text mt-8 mb-4">$1</h1>')
    .replace(/^\- (.*?)$/gm, '<li class="ml-4 text-vln-text/80">$1</li>')
    .replace(/^(\d+)\. (.*?)$/gm, '<li class="ml-4 text-vln-text/80">$2</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-vln-sage hover:underline">$1</a>')
    .replace(/\n\n/g, '</p><p class="my-4 text-vln-text/80">')

  return `<div class="prose prose-invert max-w-none"><p class="my-4 text-vln-text/80">${html}</p></div>`
}

export default function SectionPage({ params }: PageProps) {
  const sectionInfo = sectionMap[params.section]

  if (!sectionInfo) {
    notFound()
  }

  try {
    const filePath = join(
      process.cwd(),
      'docs/peraltacc-addendum/client-delivery',
      sectionInfo.file
    )
    const content = readFileSync(filePath, 'utf-8')

    return (
      <div className="min-h-screen bg-vln-bg text-vln-text">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-vln-sage/20 bg-vln-bg/95 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
            <Link href="/docs/peralta" className="text-sm text-vln-sage hover:underline">
              ← Back to Proposal
            </Link>
            <div className="text-xs font-semibold text-vln-sage">
              SECTION {params.section}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-8 py-12">
          <div className="mb-8 rounded-lg border border-red-900/20 bg-red-900/10 p-4 text-xs text-red-400">
            🔐 CONFIDENTIAL – DO NOT DISTRIBUTE
          </div>

          <article className="prose prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: parseMarkdownToHTML(content),
              }}
            />
          </article>

          {/* Navigation */}
          <div className="mt-12 flex justify-between border-t border-vln-sage/20 pt-8">
            {sectionInfo.prev ? (
              <Link
                href={`/docs/peralta/${sectionInfo.prev}`}
                className="rounded-lg border border-vln-sage/30 bg-vln-sage/5 px-4 py-2 text-sm text-vln-sage transition-all hover:bg-vln-sage/10 hover:shadow-[0_0_8px_#a6c3a7_1a]"
              >
                ← Previous Section
              </Link>
            ) : (
              <div />
            )}

            {sectionInfo.next ? (
              <Link
                href={`/docs/peralta/${sectionInfo.next}`}
                className="rounded-lg border border-vln-sage/30 bg-vln-sage/5 px-4 py-2 text-sm text-vln-sage transition-all hover:bg-vln-sage/10 hover:shadow-[0_0_8px_#a6c3a7_1a]"
              >
                Next Section →
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-vln-sage/20 pt-8 text-center text-xs text-vln-text/60">
            <p>
              This proposal is confidential. Unauthorized distribution is prohibited by law.
            </p>
            <p className="mt-2">
              For questions: <span className="text-vln-sage">engage@vln.gg</span>
            </p>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Failed to load section ${params.section}:`, error)
    notFound()
  }
}
