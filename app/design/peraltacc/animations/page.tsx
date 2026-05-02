import Link from 'next/link';
import { Metadata } from 'next';
import { LucideArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Animations & Motion - Peralta Design System',
  description:
    'Motion guidelines, easing functions, and animation examples',
  openGraph: {
    title: 'Animations & Motion - Peralta Design System',
    description: 'Motion guidelines, easing functions, and animation examples',
    url: 'https://design.vln.gg/peraltacc/animations',
    type: 'website'
  }
};

export default function PeraltaAnimationsPage() {
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
            Animations & Motion
          </h1>
          <p className="text-xl text-gray-400">
            Motion guidelines, easing functions, and animation examples
          </p>
        </div>

        {/* Motion Philosophy */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Motion Philosophy</h2>
            <p className="text-gray-400">
              Motion guides attention and communicates state changes. Every animation serves a purpose.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Fast & Responsive
              </h3>
              <p className="text-sm text-gray-400">
                Motion is quick (150-300ms) to feel responsive and prevent impatience. Never block user interactions.
              </p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">👁️</span>
                Purposeful & Meaningful
              </h3>
              <p className="text-sm text-gray-400">
                Every animation communicates something. No animation for decoration alone.
              </p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">🎭</span>
                Subtle & Smooth
              </h3>
              <p className="text-sm text-gray-400">
                Motion is refined and smooth. Avoid harsh or jarring transitions.
              </p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg space-y-3 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">♿</span>
                Respects Preferences
              </h3>
              <p className="text-sm text-gray-400">
                Respects prefers-reduced-motion. Provides pause/stop controls when needed.
              </p>
            </div>
          </div>
        </div>

        {/* Duration & Easing */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold text-white">Duration & Easing</h2>
          <div className="space-y-6">
            {/* Durations */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Animation Duration</h3>
              <div className="space-y-3">
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">150ms - Fast</p>
                  <p className="text-sm text-gray-400">
                    Hover states, focus rings, quick feedback. Feels responsive and snappy.
                  </p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">250ms - Standard</p>
                  <p className="text-sm text-gray-400">
                    UI transitions, state changes, fades. Default duration for most interactions.
                  </p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">300ms - Medium</p>
                  <p className="text-sm text-gray-400">
                    Modal opens, slide-ins, important state changes. Provides smooth visual flow.
                  </p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">400ms+ - Slow</p>
                  <p className="text-sm text-gray-400">
                    Major transitions, page changes. Use sparingly to avoid feeling sluggish.
                  </p>
                </div>
              </div>
            </div>

            {/* Easing Functions */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="font-semibold text-white">Easing Functions</h3>
              <div className="space-y-3">
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">ease-in-out</p>
                  <p className="font-mono text-xs text-gray-500">cubic-bezier(0.4, 0, 0.2, 1)</p>
                  <p className="text-sm text-gray-400">
                    Default easing for most animations. Smooth acceleration and deceleration.
                  </p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">ease-out</p>
                  <p className="font-mono text-xs text-gray-500">cubic-bezier(0, 0, 0.2, 1)</p>
                  <p className="text-sm text-gray-400">
                    Entrance animations. Starts fast, ends slow. Feels natural and inviting.
                  </p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">ease-in</p>
                  <p className="font-mono text-xs text-gray-500">cubic-bezier(0.4, 0, 1, 1)</p>
                  <p className="text-sm text-gray-400">
                    Exit animations. Starts slow, ends fast. Creates sense of departing motion.
                  </p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg space-y-2 hover:border-sage-500/30 transition-colors">
                  <p className="font-semibold text-white">linear</p>
                  <p className="font-mono text-xs text-gray-500">linear</p>
                  <p className="text-sm text-gray-400">
                    Use rarely. Mechanical feel. Only for continuous rotations or scrolling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Animations */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold text-white">Common Animation Examples</h2>
          <div className="space-y-6">
            {/* Fade */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white">Fade In/Out</h3>
              <div className="h-20 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                <div className="animate-pulse w-12 h-12 bg-sage-500 rounded" />
              </div>
              <div className="text-sm space-y-2">
                <p className="text-gray-400">Use for: Visibility changes, opacity transitions</p>
                <p className="font-mono text-xs text-gray-500">transition-opacity duration-250</p>
              </div>
            </div>

            {/* Scale */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white">Scale</h3>
              <div className="h-20 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                <button className="px-6 py-3 bg-sage-500 text-charcoal font-semibold rounded-lg hover:scale-105 active:scale-95 transition-transform">
                  Hover me
                </button>
              </div>
              <div className="text-sm space-y-2">
                <p className="text-gray-400">Use for: Button interactions, emphasis, drawer open</p>
                <p className="font-mono text-xs text-gray-500">transition-transform duration-250 hover:scale-105</p>
              </div>
            </div>

            {/* Slide */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white">Slide In</h3>
              <div className="h-20 bg-white/5 border border-white/10 rounded flex items-center justify-center overflow-hidden">
                <div className="translate-x-4 hover:translate-x-0 transition-transform duration-300">
                  <span className="text-white">Slide in</span>
                </div>
              </div>
              <div className="text-sm space-y-2">
                <p className="text-gray-400">Use for: Drawer open, sidebar, tooltip appear</p>
                <p className="font-mono text-xs text-gray-500">transition-transform duration-300 translate-x-4 hover:translate-x-0</p>
              </div>
            </div>

            {/* Color */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4 hover:border-sage-500/30 transition-colors">
              <h3 className="font-semibold text-white">Color Transition</h3>
              <div className="h-20 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                <div className="px-6 py-3 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 transition-colors duration-250">
                  Hover for color
                </div>
              </div>
              <div className="text-sm space-y-2">
                <p className="text-gray-400">Use for: Hover states, status changes, focus rings</p>
                <p className="font-mono text-xs text-gray-500">transition-colors duration-250 hover:bg-sage-400</p>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Utilities */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <h2 className="text-2xl font-bold text-white">Tailwind Transition Utilities</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <p className="text-sm text-gray-400">
              Use these Tailwind classes for consistent animations:
            </p>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`/* Transition properties */
transition-all              /* All properties */
transition-colors           /* Color changes only */
transition-opacity          /* Opacity changes */
transition-transform        /* Transform only */
transition-shadow           /* Shadow only */

/* Duration */
duration-150                /* 150ms - fast */
duration-250                /* 250ms - standard */
duration-300                /* 300ms - medium */
duration-500                /* 500ms - slow */

/* Easing */
ease-in-out                 /* Default */
ease-in                     /* Exit animations */
ease-out                    /* Entrance animations */
linear                      /* Continuous motion */`}</code>
            </pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-white">Animation Best Practices</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-lg space-y-3">
              <p className="font-semibold text-white text-sm">Do&apos;s</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Keep animations under 300ms for UI interactions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Use ease-out for entrance, ease-in for exit</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Test with prefers-reduced-motion enabled</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Animate only properties that don&apos;t cause layout shift</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Use will-change for performance-critical animations</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg space-y-3">
              <p className="font-semibold text-white text-sm">Don&apos;ts</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Create animations longer than 500ms</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Use animations for decoration only</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Animate position, width, height (use transform instead)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Create infinite animations without pause</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Use linear easing for most interactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="space-y-8 mb-16 bg-white/5 border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white">Respecting Motion Preferences</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Always respect the user&apos;s motion preferences. Implement prefers-reduced-motion media queries:
            </p>
            <pre className="bg-white/5 border border-white/10 rounded p-4 text-sm overflow-x-auto">
              <code>{`@media (prefers-reduced-motion: reduce) {
  /* Disable animations for users who prefer reduced motion */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/design/peraltacc/layout"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start gap-3">
                <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Previous
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Layout System
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/design/peraltacc"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left"
            >
              <div className="flex items-start gap-3 sm:flex-row-reverse">
                <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0 rotate-180" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Home
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Design System Hub
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
