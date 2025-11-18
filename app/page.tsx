import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="vln-heading mb-4 text-5xl md:text-7xl">
          <span className="vln-text-gradient">VLN.gg</span>
        </h1>

        <p className="mb-8 text-xl text-vln-bluegray md:text-2xl">
          iGaming Security & Smart Contract Intelligence
        </p>

        <div className="vln-card mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-gray-300">
            Enterprise-grade security consulting, RNG analysis, wallet-flow
            risk modeling, and EVM smart contract auditing for high-risk,
            high-throughput gaming systems.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="vln-button vln-button-primary">
            Request Audit
          </button>
          <button className="vln-button vln-button-secondary">
            View Services
          </button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="vln-card">
            <h3 className="vln-heading mb-2 text-xl text-vln-sage">
              Platform Security
            </h3>
            <p className="text-sm text-gray-400">
              Comprehensive application security assessments
            </p>
          </div>

          <div className="vln-card">
            <h3 className="vln-heading mb-2 text-xl text-vln-sage">
              RNG Analysis
            </h3>
            <p className="text-sm text-gray-400">
              Statistical validation and cryptographic review
            </p>
          </div>

          <div className="vln-card">
            <h3 className="vln-heading mb-2 text-xl text-vln-sage">
              Smart Contracts
            </h3>
            <p className="text-sm text-gray-400">
              EVM security audits with formal verification
            </p>
          </div>
        </div>

        <footer className="mt-16 text-sm text-gray-500">
          <p>Powered by Fused Gaming</p>
        </footer>
      </div>
    </main>
  );
}
