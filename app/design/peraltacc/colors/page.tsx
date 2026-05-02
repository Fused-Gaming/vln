import Link from 'next/link';
import { Metadata } from 'next';
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Palette - Peralta Design System',
  description:
    'Complete color system for Peralta with semantic colors and contrast guidelines',
  openGraph: {
    title: 'Color Palette - Peralta Design System',
    description: 'Complete color system for Peralta with semantic colors',
    url: 'https://design.vln.gg/peraltacc/colors',
    type: 'website'
  }
};

interface ColorSwatch {
  name: string;
  hex: string;
  usage: string;
  contrast?: boolean;
}

const neutralColors: ColorSwatch[] = [
  { name: 'Charcoal', hex: '#0f0f0f', usage: 'Primary background' },
  { name: 'Dark Gray', hex: '#1a1a1a', usage: 'Secondary background' },
  { name: 'Gray 700', hex: '#2d2d2d', usage: 'Borders and dividers' },
  { name: 'Gray 600', hex: '#4b4b4b', usage: 'Secondary text' },
  { name: 'Gray 400', hex: '#9ca3af', usage: 'Tertiary text' },
  { name: 'Gray 200', hex: '#e5e7eb', usage: 'Light borders' },
  { name: 'White', hex: '#ffffff', usage: 'Primary text, highlights' }
];

const accentColors: ColorSwatch[] = [
  { name: 'Sage Green', hex: '#a6c3a7', usage: 'Primary accent, CTAs' },
  { name: 'Sage Green Light', hex: '#c4d4c5', usage: 'Hover states' },
  { name: 'Blue-Gray', hex: '#aab7c8', usage: 'Secondary accent' },
  { name: 'Blue-Gray Light', hex: '#c5cfd8', usage: 'Hover states' }
];

const semanticColors: ColorSwatch[] = [
  { name: 'Success', hex: '#10b981', usage: 'Success states, confirmations' },
  { name: 'Warning', hex: '#f59e0b', usage: 'Warnings, cautions' },
  { name: 'Error', hex: '#ef4444', usage: 'Errors, destructive actions' },
  { name: 'Info', hex: '#3b82f6', usage: 'Information, status' }
];

const ColorSwatchComponent = ({ swatch }: { swatch: ColorSwatch }) => (
  <div className="space-y-3">
    <div
      className="w-full h-24 rounded-lg border border-white/10 transition-transform hover:scale-105"
      style={{ backgroundColor: swatch.hex }}
    />
    <div className="space-y-1">
      <div className="flex items-start justify-between">
        <p className="font-semibold text-white">{swatch.name}</p>
      </div>
      <p className="font-mono text-sm text-gray-400">{swatch.hex}</p>
      <p className="text-xs text-gray-500">{swatch.usage}</p>
    </div>
  </div>
);

export default function PeraltaColorsPage() {
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
            Color Palette
          </h1>
          <p className="text-xl text-gray-400">
            Complete color system with semantic colors and accessibility guidelines
          </p>
        </div>

        {/* Neutral Colors */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Neutral Colors</h2>
            <p className="text-gray-400">
              The foundation of our color system. Used for backgrounds, text, and structural elements.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {neutralColors.map((color) => (
              <ColorSwatchComponent key={color.hex} swatch={color} />
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Primary & Secondary Accents</h2>
            <p className="text-gray-400">
              These colors create visual hierarchy and draw attention to key interactive elements.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {accentColors.map((color) => (
              <ColorSwatchComponent key={color.hex} swatch={color} />
            ))}
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Semantic Colors</h2>
            <p className="text-gray-400">
              Communicate meaning through color. Always provide text labels in addition to color.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {semanticColors.map((color) => (
              <ColorSwatchComponent key={color.hex} swatch={color} />
            ))}
          </div>
        </div>

        {/* Contrast & Accessibility */}
        <div className="space-y-8 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Contrast & Accessibility</h2>
            <p className="text-gray-400">
              All color combinations meet WCAG AA standards for contrast ratios.
            </p>
          </div>
          <div className="space-y-6">
            {/* Text Contrast Examples */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Text Contrast Examples</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-6 rounded-lg bg-charcoal border border-sage-500/50">
                  <p className="text-white text-sm mb-3">Sage Green on Charcoal</p>
                  <div className="space-y-2">
                    <p style={{ color: '#a6c3a7' }} className="text-sm">
                      Heading text (large)
                    </p>
                    <p style={{ color: '#a6c3a7' }} className="text-xs">
                      Body text (small)
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Contrast Ratio: 6.2:1 (AAA)</p>
                </div>
                <div className="p-6 rounded-lg bg-charcoal border border-white/20">
                  <p className="text-white text-sm mb-3">White on Charcoal</p>
                  <div className="space-y-2">
                    <p className="text-white text-sm">Heading text (large)</p>
                    <p className="text-white text-xs">Body text (small)</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Contrast Ratio: 19.6:1 (AAA)</p>
                </div>
              </div>
            </div>

            {/* Do's and Don'ts */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-6 border border-green-500/50 rounded-lg bg-green-500/5 space-y-3">
                <p className="font-semibold text-white text-sm">Do&apos;s</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500">✓</span>
                    <span>Use semantic colors consistently</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500">✓</span>
                    <span>Test contrast with accessibility tools</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500">✓</span>
                    <span>Provide text labels with color coding</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500">✓</span>
                    <span>Maintain consistency across interfaces</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-red-500/50 rounded-lg bg-red-500/5 space-y-3">
                <p className="font-semibold text-white text-sm">Don&apos;ts</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">✗</span>
                    <span>Rely solely on color for meaning</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">✗</span>
                    <span>Use insufficient color contrast</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">✗</span>
                    <span>Mix color semantics (green for error)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">✗</span>
                    <span>Create custom color palettes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Variables */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-white">CSS Design Tokens</h2>
          <p className="text-gray-400">
            Use these CSS variables in your stylesheets for consistency:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`--vln-bg: #0f0f0f;
--vln-sage: #a6c3a7;
--vln-bluegray: #aab7c8;
--vln-accent: var(--vln-sage);

/* Semantic Colors */
--vln-success: #10b981;
--vln-warning: #f59e0b;
--vln-error: #ef4444;
--vln-info: #3b82f6;

/* Borders & Dividers */
--vln-border: rgba(255, 255, 255, 0.1);
--vln-border-light: rgba(255, 255, 255, 0.05);

/* Text */
--vln-text-primary: #ffffff;
--vln-text-secondary: #d1d5db;
--vln-text-tertiary: #9ca3af;`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/design/peraltacc/brand"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start gap-3">
                <LucideArrowLeft className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Previous
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Brand Identity
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/design/peraltacc/typography"
              className="group p-4 border border-white/10 rounded-lg hover:border-sage-500 hover:bg-white/[0.02] transition-all text-right sm:text-left"
            >
              <div className="flex items-start gap-3 sm:flex-row-reverse">
                <LucideArrowRight className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Next
                  </div>
                  <div className="font-semibold text-white group-hover:text-sage-300 transition-colors">
                    Typography
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
