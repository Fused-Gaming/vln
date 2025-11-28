"use client";

import Link from "next/link";
import { Shield, Zap, ZapOff } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAnimations } from "@/lib/animation-context";

export default function Header() {
  const pathname = usePathname();
  const { animationsEnabled, toggleAnimations } = useAnimations();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-vln-sage/20 backdrop-blur-md bg-vln-bg/80">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-vln-sage" />
            <span className="text-xl sm:text-2xl font-bold text-vln-sage">VLN</span>
            <span className="text-xs sm:text-sm text-vln-bluegray hidden sm:inline">
              by Fused Gaming
            </span>
          </Link>
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link
              href="/services"
              className={`text-sm sm:text-base transition-colors ${
                isActive("/services")
                  ? "text-vln-sage font-semibold"
                  : "text-vln-white hover:text-vln-sage"
              }`}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className={`text-sm sm:text-base transition-colors ${
                isActive("/pricing")
                  ? "text-vln-sage font-semibold"
                  : "text-vln-white hover:text-vln-sage"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`text-sm sm:text-base transition-colors ${
                isActive("/contact")
                  ? "text-vln-sage font-semibold"
                  : "text-vln-white hover:text-vln-sage"
              }`}
            >
              Contact
            </Link>

            {/* Animation Toggle Button */}
            <button
              onClick={toggleAnimations}
              className="p-2 rounded-md border border-vln-sage/30 hover:border-vln-sage hover:bg-vln-sage/10 transition-all"
              aria-label={animationsEnabled ? "Disable animations" : "Enable animations"}
              title={animationsEnabled ? "Disable animations" : "Enable animations"}
            >
              {animationsEnabled ? (
                <Zap className="w-4 h-4 text-vln-sage" />
              ) : (
                <ZapOff className="w-4 h-4 text-vln-bluegray" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
