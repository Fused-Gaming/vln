import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ACE Design System',
  description: 'ACE blackjack game design system and component library'
};

export default function ACEDesignSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-vln-bg via-slate-900 to-vln-bg">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">🃏 ACE Design System</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Component library, design tokens, and visual patterns for ACE blackjack games
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Color Palette Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Color Palette</h2>
            <p className="text-gray-400">VLN core colors + ACE game colors for a cohesive aesthetic</p>
          </div>

          {/* VLN Core Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-sage-300">VLN Core Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sage Green */}
              <div className="space-y-2">
                <div className="h-32 bg-vln-sage rounded-lg border border-white/20" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Sage Green</div>
                  <div className="text-sm text-gray-400">#86d993</div>
                  <div className="text-xs text-gray-500">Primary accent, success states</div>
                </div>
              </div>

              {/* Blue-Gray */}
              <div className="space-y-2">
                <div className="h-32 bg-vln-bluegray rounded-lg border border-white/20" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Warm Blue-Gray</div>
                  <div className="text-sm text-gray-400">#7dd3fc</div>
                  <div className="text-xs text-gray-500">Secondary accent, info states</div>
                </div>
              </div>

              {/* Charcoal */}
              <div className="space-y-2">
                <div className="h-32 bg-vln-bg border border-white/20 rounded-lg" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Matte Charcoal</div>
                  <div className="text-sm text-gray-400">#0a0e0f</div>
                  <div className="text-xs text-gray-500">Background base</div>
                </div>
              </div>

              {/* Soft White */}
              <div className="space-y-2">
                <div className="h-32 bg-white rounded-lg border border-white/20" />
                <div className="space-y-1">
                  <div className="font-semibold text-vln-bg">Soft Glow White</div>
                  <div className="text-sm text-gray-600">#f8f9fa</div>
                  <div className="text-xs text-gray-500">UI highlights, text</div>
                </div>
              </div>
            </div>
          </div>

          {/* ACE Game Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-vln-bluegray">ACE Game Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Muted Gold */}
              <div className="space-y-2">
                <div className="h-32 bg-vln-amber rounded-lg border border-white/20" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Muted Gold</div>
                  <div className="text-sm text-gray-400">#fbbf24</div>
                  <div className="text-xs text-gray-500">Winnings, payout highlights</div>
                </div>
              </div>

              {/* Table Green */}
              <div className="space-y-2">
                <div className="h-32 bg-emerald-900 rounded-lg border border-white/20" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Table Green</div>
                  <div className="text-sm text-gray-400">#065f46</div>
                  <div className="text-xs text-gray-500">Felt background</div>
                </div>
              </div>

              {/* Hearts (Red) */}
              <div className="space-y-2">
                <div className="h-32 bg-red-600 rounded-lg border border-white/20" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Hearts & Diamonds</div>
                  <div className="text-sm text-gray-400">#dc2626</div>
                  <div className="text-xs text-gray-500">Red card suits</div>
                </div>
              </div>

              {/* Clubs/Spades (Black) */}
              <div className="space-y-2">
                <div className="h-32 bg-black rounded-lg border border-white/20" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">Clubs & Spades</div>
                  <div className="text-sm text-gray-400">#000000</div>
                  <div className="text-xs text-gray-500">Black card suits</div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Usage Guide */}
          <div className="border border-white/10 rounded-lg p-6 bg-white/5">
            <h4 className="text-lg font-semibold text-white mb-4">Usage Guidelines</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex gap-3">
                <span className="text-vln-sage">→</span>
                <span><strong>Sage Green:</strong> Call-to-action buttons, success messages, active states</span>
              </li>
              <li className="flex gap-3">
                <span className="text-vln-bluegray">→</span>
                <span><strong>Blue-Gray:</strong> Secondary buttons, info messages, borders</span>
              </li>
              <li className="flex gap-3">
                <span className="text-vln-amber">→</span>
                <span><strong>Muted Gold:</strong> Winnings display, payout amounts, premium highlights</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">→</span>
                <span><strong>Table Green:</strong> Game board background, card layout area</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Design Tokens Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Design Tokens</h2>
            <p className="text-gray-400">Standardized spacing, typography, and animation values</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spacing */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Spacing</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">xs</span>
                  <span className="text-gray-300">4px (0.25rem)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">sm</span>
                  <span className="text-gray-300">8px (0.5rem)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">md</span>
                  <span className="text-gray-300">16px (1rem)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">lg</span>
                  <span className="text-gray-300">24px (1.5rem)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">xl</span>
                  <span className="text-gray-300">32px (2rem)</span>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Typography</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Primary: Inter</span>
                </div>
                <div>
                  <span className="text-gray-400">Mono: JetBrains Mono</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-4xl font-bold text-white mb-2">H1: 36px</div>
                  <div className="text-2xl font-bold text-white mb-2">H2: 24px</div>
                  <div className="text-xl font-semibold text-white mb-2">H3: 20px</div>
                  <div className="text-base text-gray-300">Body: 16px</div>
                </div>
              </div>
            </div>

            {/* Borders & Radius */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Borders & Radius</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Radius</span>
                  <span className="text-gray-300">12px (default)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Border</span>
                  <span className="text-gray-300">1px solid (default)</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-12 bg-white/10 rounded-lg border border-white/20" />
                <div className="text-xs text-gray-400">12px rounded corners</div>
              </div>
            </div>

            {/* Shadows & Effects */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Effects</h3>
              <div className="space-y-3 text-sm">
                <div className="text-gray-400">Card Lift: 4px</div>
                <div className="text-gray-400">Glow Radius: 8px</div>
                <div className="text-gray-400">Transition: 200ms ease-out</div>
              </div>
              <div className="mt-4 p-3 bg-white/10 rounded-lg shadow-lg hover:shadow-[0_0_8px_#a6c3a7] transition-all">
                Hover effect example
              </div>
            </div>
          </div>
        </section>

        {/* Component Library Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Component Library</h2>
            <p className="text-gray-400">Pre-built components for rapid game development</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Component */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Card Component</h3>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-28 bg-white rounded border-2 border-black flex items-center justify-center font-bold text-black text-2xl shadow-lg">
                  A♠
                </div>
              </div>
              <p className="text-sm text-gray-400">Playing card with flip animation, suit symbols, and value display</p>
            </div>

            {/* Hand Display */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Hand Display</h3>
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-16 h-24 bg-white rounded border-2 border-black flex items-center justify-center font-bold text-black text-lg">K♣
                </div>
                <div className="w-16 h-24 bg-white rounded border-2 border-black flex items-center justify-center font-bold text-black text-lg">Q♦
                </div>
              </div>
              <p className="text-sm text-gray-400">Multiple cards with total value display</p>
            </div>

            {/* Action Buttons */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Action Buttons</h3>
              <div className="flex gap-2 flex-wrap mb-4">
                <button className="px-4 py-2 bg-vln-sage text-vln-bg rounded font-semibold hover:shadow-vln-glow transition-all">
                  Hit
                </button>
                <button className="px-4 py-2 bg-vln-bluegray text-vln-bg rounded font-semibold">
                  Stand
                </button>
              </div>
              <p className="text-sm text-gray-400">Interactive buttons with hover effects and glowing accents</p>
            </div>

            {/* Bet Controls */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Bet Controls</h3>
              <div className="space-y-2 mb-4">
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-vln-amber text-vln-bg rounded text-sm font-semibold">25</button>
                  <button className="px-3 py-1 bg-vln-amber text-vln-bg rounded text-sm font-semibold">50</button>
                  <button className="px-3 py-1 bg-vln-amber text-vln-bg rounded text-sm font-semibold">100</button>
                </div>
                <input type="number" placeholder="Bet" className="w-full px-3 py-2 rounded bg-vln-bg-light text-white border border-white/10" />
              </div>
              <p className="text-sm text-gray-400">Chips, preset buttons, and input field</p>
            </div>

            {/* Results Modal */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Results Modal</h3>
              <div className="bg-emerald-900/50 p-4 rounded text-center space-y-2 mb-4">
                <div className="text-2xl font-bold text-vln-amber">+150 units</div>
                <div className="text-white">Blackjack!</div>
              </div>
              <p className="text-sm text-gray-400">Outcome display with animations and payout highlights</p>
            </div>

            {/* Game Board */}
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Game Board</h3>
              <div className="bg-emerald-900 aspect-video rounded flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-white/60 text-sm">Game area layout</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">Complete responsive game board with felt background</p>
            </div>
          </div>
        </section>

        {/* Examples & Patterns Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Examples & Patterns</h2>
            <p className="text-gray-400">Live examples and common usage patterns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Game State: Playing</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div><strong className="text-white">Your Hand:</strong> 18 (K♣ + 8♦)</div>
                <div><strong className="text-white">Dealer Shows:</strong> Q♠</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-vln-sage text-vln-bg rounded text-xs font-semibold">
                    Hit
                  </button>
                  <button className="px-3 py-1 bg-vln-sage text-vln-bg rounded text-xs font-semibold">
                    Stand
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-white/10 rounded-lg p-6 bg-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Game State: Betting</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div><strong className="text-white">Balance:</strong> <span className="text-vln-amber">$1,000</span></div>
                <div><strong className="text-white">Bet Amount:</strong> $50</div>
                <button className="w-full px-4 py-2 bg-vln-sage text-vln-bg rounded font-semibold">
                  Place Bet
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Link */}
        <section className="border border-vln-sage/30 rounded-lg p-8 bg-vln-sage/5">
          <h2 className="text-2xl font-bold text-white mb-4">Full Documentation</h2>
          <p className="text-gray-400 mb-6">
            For complete API reference, integration guide, and code examples, visit the ACE documentation portal.
          </p>
          <a
            href="/docs/ace-blackjack/overview"
            className="inline-flex items-center gap-2 px-4 py-2 bg-vln-sage text-vln-bg font-semibold rounded-lg hover:shadow-vln-glow transition-colors"
          >
            View Documentation
            <span>→</span>
          </a>
        </section>
      </div>
    </div>
  );
}
