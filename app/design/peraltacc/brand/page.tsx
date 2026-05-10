import Link from 'next/link';
import { Metadata } from 'next';
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Brand Identity - Peralta Design System',
  description:
    'Peralta brand mission, values, and design philosophy',
  openGraph: {
    title: 'Brand Identity - Peralta Design System',
    description: 'Peralta brand mission, values, and design philosophy',
    url: 'https://design.vln.gg/peraltacc/brand',
    type: 'website'
  }
};

export default function PeraltaBrandPage() {
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
            Brand Identity
          </h1>
          <p className="text-xl text-gray-400">
            Mission, values, and design philosophy that define Peralta
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Peralta empowers organizations to protect their digital infrastructure with
              intelligent, automated security solutions. We believe that enterprise-grade
              security should be accessible, transparent, and integrated seamlessly into
              modern development workflows.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 p-6 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <div className="text-3xl">🛡️</div>
              <h3 className="font-semibold text-white text-lg">Trust & Integrity</h3>
              <p className="text-gray-400">
                Security is built on trust. We maintain the highest standards of transparency
                and ethical practices in everything we do.
              </p>
            </div>
            <div className="space-y-3 p-6 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <div className="text-3xl">🎯</div>
              <h3 className="font-semibold text-white text-lg">Precision & Rigor</h3>
              <p className="text-gray-400">
                We apply mathematical rigor and attention to detail in threat modeling,
                vulnerability detection, and security analysis.
              </p>
            </div>
            <div className="space-y-3 p-6 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <div className="text-3xl">⚡</div>
              <h3 className="font-semibold text-white text-lg">Speed & Efficiency</h3>
              <p className="text-gray-400">
                Security shouldn&apos;t slow development. We build fast, scalable systems that
                integrate naturally into DevOps pipelines.
              </p>
            </div>
            <div className="space-y-3 p-6 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <div className="text-3xl">🧠</div>
              <h3 className="font-semibold text-white text-lg">Intelligence & Insight</h3>
              <p className="text-gray-400">
                We provide actionable intelligence backed by deep analysis, not false alarms.
                Every detection is meaningful.
              </p>
            </div>
            <div className="space-y-3 p-6 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <div className="text-3xl">🤝</div>
              <h3 className="font-semibold text-white text-lg">Partnership</h3>
              <p className="text-gray-400">
                We work alongside our clients as partners, not vendors. Your success is our
                success.
              </p>
            </div>
            <div className="space-y-3 p-6 border border-white/10 rounded-lg hover:border-sage-500/30 transition-colors">
              <div className="text-3xl">🌱</div>
              <h3 className="font-semibold text-white text-lg">Continuous Growth</h3>
              <p className="text-gray-400">
                The threat landscape evolves constantly. We continuously learn, adapt, and
                improve our capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Design Philosophy</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage-500/20 border border-sage-500/50 text-sage-400 text-sm">1</span>
                Clarity Over Complexity
              </h3>
              <p className="text-gray-400 ml-12">
                Security concepts are inherently complex, but we present them clearly. Every
                design decision reduces cognitive load and makes security insights more accessible.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage-500/20 border border-sage-500/50 text-sage-400 text-sm">2</span>
                Accessibility is Non-Negotiable
              </h3>
              <p className="text-gray-400 ml-12">
                All users deserve equal access. We meet WCAG AA standards minimum, support keyboard
                navigation, and provide proper semantic structure throughout.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage-500/20 border border-sage-500/50 text-sage-400 text-sm">3</span>
                Motion as Communication
              </h3>
              <p className="text-gray-400 ml-12">
                Subtle animations guide attention and communicate state changes. Motion is purposeful,
                never gratuitous.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage-500/20 border border-sage-500/50 text-sage-400 text-sm">4</span>
                Consistency Builds Confidence
              </h3>
              <p className="text-gray-400 ml-12">
                Users trust systems that behave predictably. Every interaction, color choice,
                and layout decision reinforces our brand and builds user confidence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage-500/20 border border-sage-500/50 text-sage-400 text-sm">5</span>
                Data-Driven Decisions
              </h3>
              <p className="text-gray-400 ml-12">
                Every design choice is backed by research, user testing, and performance metrics.
                We measure, analyze, and iterate.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Language */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Visual Language</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-3 text-lg">Color Palette</h3>
              <p className="text-gray-400 mb-4">
                Our color system communicates meaning and hierarchy while maintaining visual balance.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-charcoal border border-white/20" />
                  <div>
                    <p className="font-mono text-sm text-white">Matte Charcoal #0f0f0f</p>
                    <p className="text-xs text-gray-500">Primary background</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sage-500" />
                  <div>
                    <p className="font-mono text-sm text-white">Sage Green #a6c3a7</p>
                    <p className="text-xs text-gray-500">Primary accent</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-gray-500" />
                  <div>
                    <p className="font-mono text-sm text-white">Warm Blue-Gray #aab7c8</p>
                    <p className="text-xs text-gray-500">Secondary accent</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white border border-white/20" />
                  <div>
                    <p className="font-mono text-sm text-white">Soft Glow White #ffffff</p>
                    <p className="text-xs text-gray-500">UI highlighting</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-lg">Typography</h3>
              <p className="text-gray-400 mb-4">
                Clean, modern typefaces that ensure readability and professionalism.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-sage-500">▸</span>
                  <span><span className="font-semibold">Inter</span> &ndash; Primary sans-serif for UI and body text</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sage-500">▸</span>
                  <span><span className="font-semibold">JetBrains Mono</span> &ndash; Technical content and code</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-lg">Spacing & Radius</h3>
              <p className="text-gray-400 mb-4">
                Consistent spacing creates rhythm. Subtle border radius makes interfaces friendly.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-sage-500">▸</span>
                  <span><span className="font-semibold">Border Radius</span> – 12px for most components</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sage-500">▸</span>
                  <span><span className="font-semibold">Spacing Scale</span> – 4px base unit (4, 8, 12, 16, 24, 32, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sage-500">▸</span>
                  <span><span className="font-semibold">Shadow Lift</span> – Subtle elevation with glowing sage accent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brand Tone */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Brand Tone</h2>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Peralta&apos;s voice is:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-white">Professional & Trustworthy</p>
                <p className="text-sm text-gray-400">
                  We maintain credibility through expert knowledge and clear communication.
                </p>
              </div>
              <div className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-white">Precise & Technical</p>
                <p className="text-sm text-gray-400">
                  We respect our users&apos; intelligence and provide specific, detailed information.
                </p>
              </div>
              <div className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-white">Approachable & Clear</p>
                <p className="text-sm text-gray-400">
                  Complex concepts are explained clearly without condescension.
                </p>
              </div>
              <div className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-white">Collaborative & Helpful</p>
                <p className="text-sm text-gray-400">
                  We position ourselves as partners in our clients&apos; security journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/design/peraltacc"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start gap-3">
                <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Back
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Design System Hub
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/design/peraltacc/colors"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left"
            >
              <div className="flex items-start gap-3 sm:flex-row-reverse">
                <LucideArrowRight className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Next
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Color Palette
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
