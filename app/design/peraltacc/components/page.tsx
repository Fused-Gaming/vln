import Link from 'next/link';
import { Metadata } from 'next';
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Component Library - Peralta Design System',
  description:
    'Interactive component library with interactive previews and usage guidelines',
  openGraph: {
    title: 'Component Library - Peralta Design System',
    description: 'Interactive component library with previews and guidelines',
    url: 'https://design.vln.gg/peraltacc/components',
    type: 'website'
  }
};

export default function PeraltaComponentsPage() {
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
            Component Library
          </h1>
          <p className="text-xl text-gray-400">
            Interactive components with live previews and usage guidelines
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Buttons</h2>
            <p className="text-gray-400">
              All buttons include hover, active, and disabled states with smooth transitions.
            </p>
          </div>
          <div className="space-y-6">
            {/* Primary Button */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">Primary Button</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 active:bg-sage-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Primary
                </button>
                <button disabled className="px-6 py-3 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Disabled
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Used for primary actions, CTAs, and important interactions.
              </p>
            </div>

            {/* Secondary Button */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">Secondary Button</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 border-2 border-blue-gray-500 text-blue-gray-400 font-semibold rounded-lg hover:bg-blue-gray-500/10 active:bg-blue-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Secondary
                </button>
                <button disabled className="px-6 py-3 border-2 border-blue-gray-500 text-blue-gray-400 font-semibold rounded-lg hover:bg-blue-gray-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Disabled
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Used for secondary actions and alternative options.
              </p>
            </div>

            {/* Tertiary Button */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">Tertiary Button</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 text-sage-400 font-semibold rounded-lg hover:text-sage-300 hover:bg-sage-500/10 active:bg-sage-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Tertiary
                </button>
                <button disabled className="px-6 py-3 text-sage-400 font-semibold rounded-lg hover:text-sage-300 hover:bg-sage-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Disabled
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Used for tertiary actions and lower-priority interactions.
              </p>
            </div>

            {/* Danger Button */}
            <div className="p-6 border border-white/10 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">Danger Button</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 active:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Delete
                </button>
                <button disabled className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Disabled
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Used for destructive actions like delete. Requires user confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Cards</h2>
            <p className="text-gray-400">
              Cards group related content and provide visual separation with subtle borders.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-6 border border-white/10 rounded-lg hover:border-sage-500/50 transition-colors space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-lg">Card Title</h3>
                <p className="text-sm text-gray-400">
                  This is a card component. Cards are used to group related content and provide
                  clear visual hierarchy.
                </p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button className="flex-1 px-4 py-2 text-sm bg-sage-500 text-charcoal font-semibold rounded hover:bg-sage-400 transition-colors">
                  Action
                </button>
              </div>
            </div>
            <div className="p-6 border border-white/10 rounded-lg hover:border-sage-500/50 transition-colors space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-lg">Elevated Card</h3>
                <p className="text-sm text-gray-400">
                  Cards can feature different elevations and hover states to improve interactivity
                  and visual feedback.
                </p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button className="flex-1 px-4 py-2 text-sm border border-sage-500 text-sage-400 font-semibold rounded hover:bg-sage-500/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Input Fields</h2>
            <p className="text-gray-400">
              Form inputs with clear focus states and helpful error messaging.
            </p>
          </div>
          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Text Input
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Email Input
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Textarea
              </label>
              <textarea
                placeholder="Enter your message..."
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500/50 transition-colors resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 text-sage-500 focus:ring-sage-500"
                />
                <span className="text-sm text-gray-300">I agree to the terms</span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Data Tables</h2>
            <p className="text-gray-400">
              Responsive tables for displaying structured data with clear hierarchy.
            </p>
          </div>
          <div className="overflow-x-auto border border-white/10 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">John Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-400">john@example.com</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-sage-400 hover:text-sage-300">Edit</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">Jane Smith</td>
                  <td className="px-6 py-4 text-sm text-gray-400">jane@example.com</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-sage-400 hover:text-sage-300">Edit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals & Dialogs */}
        <div className="space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Modals & Dialogs</h2>
            <p className="text-gray-400">
              Modal windows for important interactions and confirmations.
            </p>
          </div>
          <div className="p-6 border border-white/10 rounded-lg space-y-4">
            <div className="max-w-md mx-auto border border-white/20 rounded-lg bg-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="font-semibold text-white">Modal Title</h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                <p className="text-gray-300">
                  This is a modal dialog. Use modals for important messages, confirmations, and interactions that
                  require user attention.
                </p>
              </div>
              <div className="px-6 py-4 border-t border-white/10 flex gap-3 justify-end">
                <button className="px-4 py-2 text-sm border border-white/20 text-gray-300 rounded hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm bg-sage-500 text-charcoal font-semibold rounded hover:bg-sage-400 transition-colors">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Component Guidelines */}
        <div className="space-y-8 mb-16 bg-white/5 border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white">Component Guidelines</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">▸</span>
              <p>All components are built with accessibility in mind (WCAG AA compliance)</p>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">▸</span>
              <p>Use Tailwind CSS utility classes with design tokens for consistency</p>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">▸</span>
              <p>Components support dark mode by default</p>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">▸</span>
              <p>Maintain consistent spacing using the 4px base unit</p>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">▸</span>
              <p>Always include focus states for keyboard navigation</p>
            </div>
            <div className="flex gap-3">
              <span className="text-sage-500 flex-shrink-0">▸</span>
              <p>Test components across different screen sizes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/design/peraltacc/typography"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start gap-3">
                <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Previous
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Typography
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/design/peraltacc/layout"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left"
            >
              <div className="flex items-start gap-3 sm:flex-row-reverse">
                <LucideArrowRight className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Next
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Layout System
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
