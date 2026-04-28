import Link from 'next/link';
import { Metadata } from 'next';
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Layout System - Peralta Design System',
  description:
    'Grid system, spacing, and responsive design guidelines',
  openGraph: {
    title: 'Layout System - Peralta Design System',
    description: 'Grid system, spacing, and responsive design guidelines',
    url: 'https://design.vln.gg/peraltacc/layout',
    type: 'website'
  }
};

export default function PeraltaLayoutPage() {
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
            Layout System
          </h1>
          <p className="text-xl text-gray-400">
            Grid, spacing, and responsive design guidelines
          </p>
        </div>

        {/* Container Widths */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Container Widths</h2>
            <p className="text-gray-400">
              Consistent max-width containers ensure readable content and optimal viewing experience.
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="font-semibold text-white">Max-Width: 1280px (xl)</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div style={{ maxWidth: '1280px' }} className="mx-auto h-12 bg-sage-500/20 border border-sage-500 rounded flex items-center justify-center text-white">
                  1280px
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Primary container width for full-page layouts and wide content areas.
              </p>
            </div>
            <div className="space-y-3">
              <div className="font-semibold text-white">Max-Width: 896px (lg)</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div style={{ maxWidth: '896px' }} className="mx-auto h-12 bg-blue-gray-500/20 border border-blue-gray-500 rounded flex items-center justify-center text-white">
                  896px
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Used for documentation, articles, and focused content.
              </p>
            </div>
            <div className="space-y-3">
              <div className="font-semibold text-white">Max-Width: 640px (sm)</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div style={{ maxWidth: '640px' }} className="mx-auto h-12 bg-white/5 border border-white/20 rounded flex items-center justify-center text-white">
                  640px
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Used for forms, modals, and narrow content areas.
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Breakpoints */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Responsive Breakpoints</h2>
            <p className="text-gray-400">
              Mobile-first approach with thoughtful breakpoints for all device sizes.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
              <div className="font-mono text-sm text-sage-400">xs</div>
              <div className="text-lg font-semibold text-white">320px+</div>
              <p className="text-sm text-gray-400">Mobile phones (default)</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
              <div className="font-mono text-sm text-sage-400">sm</div>
              <div className="text-lg font-semibold text-white">640px+</div>
              <p className="text-sm text-gray-400">Landscape phones & small tablets</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
              <div className="font-mono text-sm text-sage-400">md</div>
              <div className="text-lg font-semibold text-white">768px+</div>
              <p className="text-sm text-gray-400">Tablets</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
              <div className="font-mono text-sm text-sage-400">lg</div>
              <div className="text-lg font-semibold text-white">1024px+</div>
              <p className="text-sm text-gray-400">Large tablets & laptops</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
              <div className="font-mono text-sm text-sage-400">xl</div>
              <div className="text-lg font-semibold text-white">1280px+</div>
              <p className="text-sm text-gray-400">Desktops</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
              <div className="font-mono text-sm text-sage-400">2xl</div>
              <div className="text-lg font-semibold text-white">1536px+</div>
              <p className="text-sm text-gray-400">Large desktops</p>
            </div>
          </div>
        </div>

        {/* Spacing System */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Spacing System</h2>
            <p className="text-gray-400">
              4px base unit with consistent scaling for all spacing needs.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { name: '4px', value: 'xs', usage: 'Minimal spacing (gap, padding)' },
              { name: '8px', value: 'sm', usage: 'Small spacing (inputs, small gaps)' },
              { name: '12px', value: 'md', usage: 'Base spacing (cards, sections)' },
              { name: '16px', value: 'lg', usage: 'Standard spacing (components, sections)' },
              { name: '24px', value: 'xl', usage: 'Large spacing (major sections)' },
              { name: '32px', value: '2xl', usage: 'Extra large spacing (page sections)' },
              { name: '48px', value: '3xl', usage: 'Maximum spacing (major layouts)' }
            ].map((space) => (
              <div key={space.value} className="border border-white/10 rounded-lg p-4 space-y-3 hover:border-sage-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div style={{ width: space.name, height: space.name }} className="bg-sage-500 rounded flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-white">{space.name}</p>
                    <p className="text-xs text-gray-500 font-mono">spacing-{space.value}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{space.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid System */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Grid System</h2>
            <p className="text-gray-400">
              12-column grid for responsive layouts using CSS Grid and Flexbox.
            </p>
          </div>
          <div className="space-y-6">
            {/* 2 Column */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-400">2-column layout</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-sage-500/20 border border-sage-500 rounded flex items-center justify-center text-white">
                  1/2
                </div>
                <div className="h-20 bg-sage-500/20 border border-sage-500 rounded flex items-center justify-center text-white">
                  1/2
                </div>
              </div>
            </div>

            {/* 3 Column */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-400">3-column layout</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-blue-gray-500/20 border border-blue-gray-500 rounded flex items-center justify-center text-white">
                  1/3
                </div>
                <div className="h-20 bg-blue-gray-500/20 border border-blue-gray-500 rounded flex items-center justify-center text-white">
                  1/3
                </div>
                <div className="h-20 bg-blue-gray-500/20 border border-blue-gray-500 rounded flex items-center justify-center text-white">
                  1/3
                </div>
              </div>
            </div>

            {/* Mixed */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-400">Flexible layout</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-20 bg-white/5 border border-white/20 rounded flex items-center justify-center text-white">
                  2/3
                </div>
                <div className="h-20 bg-white/5 border border-white/20 rounded flex items-center justify-center text-white">
                  1/3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-First Approach */}
        <div className="space-y-8 mb-16 bg-white/5 border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white">Mobile-First Approach</h2>
          <div className="space-y-4 text-gray-400 text-sm">
            <p>
              All designs start with mobile-sized layouts and progressively enhance for larger screens.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span>Default styles apply to mobile</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span>Use <code className="bg-white/10 px-2 py-1 rounded">sm:</code>, <code className="bg-white/10 px-2 py-1 rounded">md:</code>, etc. for larger screens</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span>Test all breakpoints during development</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">▸</span>
                <span>Never hide content on mobile (use responsive components instead)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Safe Areas & Padding */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-white">Safe Areas & Padding</h2>
          <div className="space-y-4">
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white">Horizontal Padding</h3>
              <p className="text-sm text-gray-400">
                Default horizontal padding is 16px on mobile, 24px on tablet, 32px on desktop.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-500">Mobile (xs): <code className="bg-white/10 px-2 py-1 rounded text-white">px-4</code></p>
                <p className="text-gray-500">Tablet (md): <code className="bg-white/10 px-2 py-1 rounded text-white">md:px-6</code></p>
                <p className="text-gray-500">Desktop (lg): <code className="bg-white/10 px-2 py-1 rounded text-white">lg:px-8</code></p>
              </div>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white">Vertical Spacing</h3>
              <p className="text-sm text-gray-400">
                Sections use consistent vertical padding for visual rhythm and breathing room.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-500">Small sections: <code className="bg-white/10 px-2 py-1 rounded text-white">py-8</code></p>
                <p className="text-gray-500">Medium sections: <code className="bg-white/10 px-2 py-1 rounded text-white">py-12</code></p>
                <p className="text-gray-500">Large sections: <code className="bg-white/10 px-2 py-1 rounded text-white">py-16</code></p>
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
              href="/design/peraltacc/components"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start gap-3">
                <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Previous
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Components
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/design/peraltacc/animations"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left"
            >
              <div className="flex items-start gap-3 sm:flex-row-reverse">
                <LucideArrowRight className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Next
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Animations
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
