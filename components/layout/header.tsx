"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  ZapOff,
  MessageCircle,
  Menu,
  X,
  Shield,
  Tag,
  Users,
  Mail,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAnimations } from "@/lib/animation-context";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    zammadChatOpen?: () => void;
  }
}

const navLinks = [
  { href: "/services", label: "Services", icon: Shield },
  { href: "/pricing", label: "Pricing", icon: Tag },
  { href: "/referrals", label: "Referrals", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const { animationsEnabled, toggleAnimations } = useAnimations();
  const [isChatReady, setIsChatReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleZammadReady = () => {
      if (window.zammadChatOpen) {
        setIsChatReady(true);
      }
    };

    const checkZammad = setInterval(() => {
      if (window.zammadChatOpen) {
        setIsChatReady(true);
        clearInterval(checkZammad);
      }
    }, 100);

    window.addEventListener("zammad-ready", handleZammadReady);

    const timeout = setTimeout(() => clearInterval(checkZammad), 10000);

    return () => {
      clearInterval(checkZammad);
      clearTimeout(timeout);
      window.removeEventListener("zammad-ready", handleZammadReady);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleChatToggle = () => {
    if (window.zammadChatOpen) {
      window.zammadChatOpen();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-vln-sage/20 backdrop-blur-md bg-vln-bg/80">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/vln-logo-dark.svg"
              width={164}
              height={40}
              alt="VLN.gg"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-base transition-colors ${
                  isActive(href)
                    ? "text-vln-sage font-semibold"
                    : "text-vln-white hover:text-vln-sage"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Chat Toggle Button */}
            {isChatReady && (
              <button
                onClick={handleChatToggle}
                className="p-2 rounded-md border border-vln-sage/30 hover:border-vln-sage hover:bg-vln-sage/10 transition-all glow-lift"
                aria-label="Open chat support"
                title="Chat with us"
              >
                <MessageCircle className="w-4 h-4 text-vln-sage" />
              </button>
            )}

            {/* Animation Toggle Button */}
            <button
              onClick={toggleAnimations}
              className="p-2 rounded-md border border-vln-sage/30 hover:border-vln-sage hover:bg-vln-sage/10 transition-all"
              aria-label={
                animationsEnabled ? "Disable animations" : "Enable animations"
              }
              title={
                animationsEnabled ? "Disable animations" : "Enable animations"
              }
            >
              {animationsEnabled ? (
                <Zap className="w-4 h-4 text-vln-sage" />
              ) : (
                <ZapOff className="w-4 h-4 text-vln-bluegray" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Animation Toggle (always visible on mobile) */}
            <button
              onClick={toggleAnimations}
              className="p-2 rounded-md border border-vln-sage/30 hover:border-vln-sage hover:bg-vln-sage/10 transition-all"
              aria-label={
                animationsEnabled ? "Disable animations" : "Enable animations"
              }
            >
              {animationsEnabled ? (
                <Zap className="w-4 h-4 text-vln-sage" />
              ) : (
                <ZapOff className="w-4 h-4 text-vln-bluegray" />
              )}
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-md border border-vln-sage/30 hover:border-vln-sage hover:bg-vln-sage/10 transition-all"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-vln-sage" />
              ) : (
                <Menu className="w-5 h-5 text-vln-sage" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-vln-sage/20 bg-vln-bg/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(href)
                    ? "text-vln-sage font-semibold bg-vln-sage/10"
                    : "text-vln-white hover:text-vln-sage hover:bg-vln-sage/5"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-base">{label}</span>
              </Link>
            ))}

            {/* Chat in mobile menu */}
            {isChatReady && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleChatToggle();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-vln-white hover:text-vln-sage hover:bg-vln-sage/5 transition-all"
                aria-label="Open chat support"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span className="text-base">Chat Support</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
