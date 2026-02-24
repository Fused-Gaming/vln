import Link from 'next/link';

export function DocFooter() {
  return (
    <footer className="border-t border-white/10 bg-charcoal/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* VLN */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">VLN</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-sage-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sage-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-sage-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sage-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/docs" className="hover:text-sage-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-sage-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Fused-Gaming/vln"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sage-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-sage-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sage-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-sage-400 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-sage-400 transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a href="mailto:info@vln.gg" className="hover:text-sage-400 transition-colors">
                  info@vln.gg
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} VLN - Fused Gaming. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-500">
            Security & Smart Contract Vulnerability Lab
          </p>
        </div>
      </div>
    </footer>
  );
}
