import Link from 'next/link';
import { Metadata } from 'next';
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Typography - Peralta Design System',
  description:
    'Font system, type scale, and typographic guidelines for Peralta',
  openGraph: {
    title: 'Typography - Peralta Design System',
    description: 'Font system, type scale, and typographic guidelines',
    url: 'https://design.vln.gg/peraltacc/typography',
    type: 'website'
  }
};

export default function PeraltaTypographyPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4 mb-12">
          <Link
            href="/design/peraltacc"
            className="inline-flex items-center gap-2 text-sage-400 hover:text-sage-300 transition-colors text-sm"
          >
            <LucideArrowLeft className="w-4 h-4" />
            Back to Design System
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Typography
          </h1>
          <p className="text-xl text-gray-400">
            Font system, type scale, and typographic guidelines
          </p>
        </div>

        {/* Font Stack */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Font Stack</h2>
            <p className="text-gray-400">
              We use a carefully selected combination of typefaces to ensure readability and consistency.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-lg">Primary: Inter</h3>
                <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg text-gray-400 mb-4">
                  Modern, clean, highly legible sans-serif
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <p><span className="text-sage-500">Usage:</span> All UI text, headings, body copy</p>
                <p><span className="text-sage-500">Weights:</span> 400, 500, 600, 700</p>
                <p><span className="text-sage-500">License:</span> Open source (OFL)</p>
              </div>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-lg">Secondary: JetBrains Mono</h3>
                <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-sm text-gray-400 mb-4">
                  Technical monospace font for code
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <p><span className="text-sage-500">Usage:</span> Code snippets, technical content</p>
                <p><span className="text-sage-500">Weights:</span> 400, 500, 700</p>
                <p><span className="text-sage-500">License:</span> Open source (OFL)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Type Scale */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Type Scale</h2>
            <p className="text-gray-400">
              Our modular type scale creates visual hierarchy and ensures readable text throughout.
            </p>
          </div>
          <div className="space-y-6">
            {/* H1 */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white">Heading 1</h1>
                <span className="text-xs text-gray-500">48px / 56px line-height</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">font-size: 48px; font-weight: 700; line-height: 1.2;</div>
              <p className="text-sm text-gray-400">Used for page titles and major section headings</p>
            </div>

            {/* H2 */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-4">
                <h2 className="text-3xl font-bold text-white">Heading 2</h2>
                <span className="text-xs text-gray-500">36px / 44px line-height</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">font-size: 36px; font-weight: 700; line-height: 1.2;</div>
              <p className="text-sm text-gray-400">Used for section headings and sub-headings</p>
            </div>

            {/* H3 */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-4">
                <h3 className="text-2xl font-bold text-white">Heading 3</h3>
                <span className="text-xs text-gray-500">28px / 36px line-height</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">font-size: 28px; font-weight: 700; line-height: 1.3;</div>
              <p className="text-sm text-gray-400">Used for component titles and subsections</p>
            </div>

            {/* H4 */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-4">
                <h4 className="text-xl font-bold text-white">Heading 4</h4>
                <span className="text-xs text-gray-500">24px / 32px line-height</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">font-size: 24px; font-weight: 700; line-height: 1.33;</div>
              <p className="text-sm text-gray-400">Used for card titles and labels</p>
            </div>

            {/* Body */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-4">
                <p className="text-base text-white">Body Text (Regular)</p>
                <span className="text-xs text-gray-500">16px / 24px line-height</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">font-size: 16px; font-weight: 400; line-height: 1.5;</div>
              <p className="text-sm text-gray-400">Standard body text for all primary content</p>
            </div>

            {/* Small */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-4">
                <p className="text-sm text-gray-400">Small Text</p>
                <span className="text-xs text-gray-500">14px / 20px line-height</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">font-size: 14px; font-weight: 400; line-height: 1.43;</div>
              <p className="text-sm text-gray-400">Secondary text, captions, and helper text</p>
            </div>

            {/* Extra Small */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-4">
                <p className="text-xs text-gray-500">Extra Small Text</p>
                <span className="text-xs text-gray-500">12px / 16px line-height</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">font-size: 12px; font-weight: 400; line-height: 1.33;</div>
              <p className="text-sm text-gray-400">Metadata, tags, and minimal text</p>
            </div>
          </div>
        </div>

        {/* Font Weights */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold text-white">Font Weights</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <p style={{ fontWeight: 400 }} className="text-white">Regular (400)</p>
              <p className="text-sm text-gray-400">Default weight for body text and UI labels</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <p style={{ fontWeight: 500 }} className="text-white">Medium (500)</p>
              <p className="text-sm text-gray-400">Emphasis for important text, buttons</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <p style={{ fontWeight: 600 }} className="text-white">Semibold (600)</p>
              <p className="text-sm text-gray-400">Subheadings, labels, interactive elements</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <p style={{ fontWeight: 700 }} className="text-white">Bold (700)</p>
              <p className="text-sm text-gray-400">Headings and maximum emphasis</p>
            </div>
          </div>
        </div>

        {/* Line Height */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold text-white">Line Height</h2>
          <p className="text-gray-400">
            Proper line height improves readability and creates visual rhythm.
          </p>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-sage-400">Tight (1.2) - For headings</p>
              <p style={{ lineHeight: 1.2 }} className="text-base text-gray-300">
                Line height 1.2 creates a compact, impactful appearance. Best used with larger
                font sizes in headings and titles.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-6">
              <p className="text-sm font-semibold text-sage-400">Normal (1.5) - For body text</p>
              <p style={{ lineHeight: 1.5 }} className="text-base text-gray-300">
                Line height 1.5 provides excellent readability for body text. This is the standard
                line height used throughout the design system for all body copy and regular text.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-6">
              <p className="text-sm font-semibold text-sage-400">Relaxed (1.75) - For long-form content</p>
              <p style={{ lineHeight: 1.75 }} className="text-base text-gray-300">
                Line height 1.75 is optimal for long-form content, articles, and documentation.
                The extra space between lines reduces eye strain and improves comprehension.
              </p>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-white">Usage Guidelines</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white">Text Hierarchy</h3>
              <p className="text-sm text-gray-400">
                Use the type scale consistently to create clear visual hierarchy. Never skip heading levels
                (H1 to H3 to H5) as this affects both aesthetics and accessibility.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white">Readability</h3>
              <p className="text-sm text-gray-400">
                Ensure sufficient contrast between text and background. Never use colors with less than
                4.5:1 contrast ratio for body text. For large text (18px+), 3:1 is acceptable.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white">Line Length</h3>
              <p className="text-sm text-gray-400">
                Keep line length between 50-75 characters for optimal readability. Longer lines create
                eye strain; shorter lines cause awkward text wrapping.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-3">
              <h3 className="font-semibold text-white">Font Loading</h3>
              <p className="text-sm text-gray-400">
                Fonts are loaded via Next.js localFont to ensure consistent typography and optimal
                performance. Never use web-safe fonts as fallbacks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/design/peraltacc/colors"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start gap-3">
                <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Previous
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Color Palette
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/design/peraltacc/components"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left"
            >
              <div className="flex items-start gap-3 sm:flex-row-reverse">
                <LucideArrowRight className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Next
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Components
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
