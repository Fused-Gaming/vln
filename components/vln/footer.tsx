import * as React from 'react';
import Link from 'next/link';
import { Container } from './container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-vln-bluegray/20 bg-vln-bg">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-bold text-vln-sage">
                  VLN.gg
                </span>
              </Link>
              <p className="mt-4 text-sm text-vln-bluegray">
                Elite security for the next generation of gaming infrastructure.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-vln-sage">
                Services
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/services/platform-security"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    Platform Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/rng-analysis"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    RNG Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/smart-contracts"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    Smart Contracts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/wallet-flow"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    Wallet Flow Analysis
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-vln-sage">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-vln-sage">
                Legal
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-vln-bluegray/20 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-vln-bluegray">
                © {currentYear} VLN.gg - Powered by Fused Gaming. All rights
                reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="https://github.com/Fused-Gaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vln-bluegray transition-colors hover:text-vln-sage"
                  aria-label="GitHub"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
