import Link from "next/link";
import { Github, Linkedin, Twitter, Facebook, MessageCircle, Send, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-vln-sage/20 bg-vln-bg/90 backdrop-blur-md mt-12 sm:mt-24">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-vln-sage mb-3 sm:mb-4">VLN</h3>
            <p className="text-vln-gray text-xs sm:text-sm mb-4">
              Smart Contract Vulnerability Research Lab
              <br />
              <span className="text-xs">A Fused Gaming Initiative</span>
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">
              Resources
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
              <p>
                <Link href="/about" className="hover:text-vln-sage transition-colors">
                  About Us
                </Link>
              </p>
              <p>
                <Link href="/get-help" className="hover:text-vln-sage transition-colors">
                  Get Help
                </Link>
              </p>
              <p>
                <Link href="/faq" className="hover:text-vln-sage transition-colors">
                  FAQ
                </Link>
              </p>
              <p>
                <Link href="/blog" className="hover:text-vln-sage transition-colors">
                  Blog
                </Link>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">
              Services
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
              <p>
                <Link href="/services#audits" className="hover:text-vln-sage transition-colors">
                  Audits
                </Link>
              </p>
              <p>
                <Link href="/services#pentest" className="hover:text-vln-sage transition-colors">
                  Pen Test
                </Link>
              </p>
              <p>
                <Link href="/services#development" className="hover:text-vln-sage transition-colors">
                  Development
                </Link>
              </p>
              <p>
                <Link href="/services#design" className="hover:text-vln-sage transition-colors">
                  Design
                </Link>
              </p>
              <p>
                <Link href="/services#university" className="hover:text-vln-sage transition-colors">
                  VLN University
                </Link>
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">
              Legal
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
              <p>
                <Link href="/terms" className="hover:text-vln-sage transition-colors">
                  Terms of Service
                </Link>
              </p>
              <p>
                <Link href="/privacy" className="hover:text-vln-sage transition-colors">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link href="/refunds" className="hover:text-vln-sage transition-colors">
                  Refund Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-vln-white mb-3 sm:mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://github.com/Fused-Gaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-vln-bg-light hover:bg-vln-sage/10 hover:text-vln-sage transition-all glow-lift"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/vlngg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-vln-bg-light hover:bg-vln-sage/10 hover:text-vln-sage transition-all glow-lift"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/vlngg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-vln-bg-light hover:bg-vln-sage/10 hover:text-vln-sage transition-all glow-lift"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/vlngg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-vln-bg-light hover:bg-vln-sage/10 hover:text-vln-sage transition-all glow-lift"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.gg/P5XuPyJJRN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-vln-bg-light hover:bg-vln-sage/10 hover:text-vln-sage transition-all glow-lift"
                  aria-label="Discord"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/vlngg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-vln-bg-light hover:bg-vln-sage/10 hover:text-vln-sage transition-all glow-lift"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
              {/* Contact Links */}
              <div className="space-y-2 text-xs sm:text-sm text-vln-gray">
                <p>
                  <a href="mailto:info@vln.gg" className="hover:text-vln-sage transition-colors inline-flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    info@vln.gg
                  </a>
                </p>
                <p>
                  <a href="https://vln.gg" className="hover:text-vln-sage transition-colors inline-flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    vln.gg
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-vln-sage/20 text-center text-xs sm:text-sm text-vln-gray">
          <p className="mb-2">Securing the future of blockchain gaming</p>
          <p className="text-xs">© 2025 VLN - Fused Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
