import Link from 'next/link';
import { Metadata } from 'next';
import { LucideArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peralta Design System - VLN',
  description:
    'Comprehensive design system for Peralta platform. Brand guidelines, color palette, typography, components, and animations.',
  openGraph: {
    title: 'Peralta Design System',
    description:
      'Comprehensive design system for Peralta platform',
    url: 'https://design.vln.gg/peraltacc',
    type: 'website'
  }
};

interface DesignCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}

const designSections: DesignCard[] = [
  {
    title: 'Brand Identity',
    description: 'Mission, values, and design philosophy',
    href: '/design/peraltacc/brand',
    icon: '🎯',
    color: 'from-sage-500/20 to-transparent'
  },
  {
    title: 'Color Palette',
    description: 'Complete color system with semantic colors',
    href: '/design/peraltacc/colors',
    icon: '🎨',
    color: 'from-blue-gray-500/20 to-transparent'
  },
  {
    title: 'Typography',
    description: 'Font system and type scale showcase',
    href: '/design/peraltacc/typography',
    icon: '✍️',
    color: 'from-white/10 to-transparent'
  },
  {
    title: 'Component Library',
    description: 'Interactive component previews and usage',
    href: '/design/peraltacc/components',
    icon: '⚙️',
    color: 'from-sage-500/15 to-transparent'
  },
  {
    title: 'Layout System',
    description: 'Grid, spacing, and responsive design',
    href: '/design/peraltacc/layout',
    icon: '📐',
    color: 'from-blue-gray-500/15 to-transparent'
  },
  {
    title: 'Animations & Motion',
    description: 'Motion guidelines and animation examples',
    href: '/design/peraltacc/animations',
    icon: '✨',
    color: 'from-sage-500/10 to-transparent'
  }
];

export default function PeraltaDesignHub() {
  return (
    <main className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full bg-sage-500/10 border border-sage-500/20 text-sage-400 text-sm font-medium">
              Design System
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Peralta Design System
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Comprehensive design guidelines and interactive components for Peralta platform.
              Build consistent, accessible, and beautiful user experiences with our complete design system.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Quick Navigation */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {designSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-sage-500/50 transition-all duration-300 hover:bg-white/[0.02]"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{section.icon}</div>
                  <LucideArrowRight className="w-5 h-5 text-sage-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-sage-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Overview */}
        <div className="space-y-12">
          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Design System Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <div className="text-2xl">🎨</div>
                <h3 className="font-semibold text-white">Cohesive Brand Identity</h3>
                <p className="text-sm text-gray-400">
                  Consistent visual language across all Peralta touchpoints with carefully curated brand guidelines.
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-2xl">♿</div>
                <h3 className="font-semibold text-white">Accessibility First</h3>
                <p className="text-sm text-gray-400">
                  WCAG AA contrast compliance, keyboard navigation, and proper ARIA labels throughout.
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-2xl">📱</div>
                <h3 className="font-semibold text-white">Responsive Design</h3>
                <p className="text-sm text-gray-400">
                  Mobile-first approach with breakpoints optimized for all screen sizes.
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-2xl">⚡</div>
                <h3 className="font-semibold text-white">Performance Optimized</h3>
                <p className="text-sm text-gray-400">
                  Fast load times, optimized assets, and efficient rendering patterns.
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-2xl">🔄</div>
                <h3 className="font-semibold text-white">Component Reusability</h3>
                <p className="text-sm text-gray-400">
                  Modular components designed for consistent reuse across all platforms.
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-2xl">📚</div>
                <h3 className="font-semibold text-white">Complete Documentation</h3>
                <p className="text-sm text-gray-400">
                  Comprehensive guides, usage examples, and interactive previews included.
                </p>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Getting Started with Peralta Design
            </h2>
            <div className="bg-gradient-to-br from-sage-500/10 to-transparent border border-sage-500/20 rounded-xl p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-charcoal font-semibold text-sm">1</span>
                  Review Brand Identity
                </h3>
                <p className="text-gray-300 ml-10">
                  Start by understanding Peralta&apos;s mission, values, and design philosophy.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-charcoal font-semibold text-sm">2</span>
                  Explore the Color System
                </h3>
                <p className="text-gray-300 ml-10">
                  Learn about color psychology and proper color usage for accessibility.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-charcoal font-semibold text-sm">3</span>
                  Master Typography
                </h3>
                <p className="text-gray-300 ml-10">
                  Understand the type system, scale, and proper text hierarchy.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-charcoal font-semibold text-sm">4</span>
                  Build with Components
                </h3>
                <p className="text-gray-300 ml-10">
                  Use the pre-built component library for consistent UI implementation.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-charcoal font-semibold text-sm">5</span>
                  Apply Layout & Motion
                </h3>
                <p className="text-gray-300 ml-10">
                  Use the layout system and animation guidelines to create polished experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-white/10 bg-charcoal/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to dive in?
            </h2>
            <p className="text-gray-400 mb-8">
              Explore the complete design system and start building beautiful, accessible interfaces
              with Peralta&apos;s comprehensive guidelines and components.
            </p>
            <Link
              href="/design/peraltacc/brand"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 transition-colors"
            >
              Explore Brand Guidelines
              <LucideArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
