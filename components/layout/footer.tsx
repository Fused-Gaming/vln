import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-vln-sage/20 bg-vln-bg/90 backdrop-blur-md mt-12 sm:mt-24">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-vln-sage mb-3 sm:mb-4">VLN</h3>
            <p className="text-vln-gray text-xs sm:text-sm">
              Smart Contract Vulnerability Research Lab
              <br />
              <span className="text-xs">A Fused Gaming Initiative</span>
            </p>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
              <p>
                <a href="https://vln.gg" className="hover:text-vln-sage transition-colors">
                  vln.gg
                </a>
              </p>
              <p>
                <a href="mailto:info@vln.gg" className="hover:text-vln-sage transition-colors">
                  info@vln.gg
                </a>
              </p>
              <p>
                <a
                  href="https://t.me/vlngg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vln-sage transition-colors"
                >
                  @vlngg
                </a>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">
              Resources
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
              <p>
                <Link href="/services" className="hover:text-vln-sage transition-colors">
                  Services
                </Link>
              </p>
              <p>
                <Link href="/pricing" className="hover:text-vln-sage transition-colors">
                  Pricing
                </Link>
              </p>
              <p>
                <Link href="/contact" className="hover:text-vln-sage transition-colors">
                  Contact
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 sm:pt-8 border-t border-vln-sage/20 text-center text-xs sm:text-sm text-vln-gray">
          <p className="mb-2">Securing the future of blockchain gaming</p>
          <p className="text-xs">© 2025 VLN - Fused Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
