import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export function DocHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Hidden on smaller screens, shown in sidebar */}
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 font-bold text-lg text-white hover:text-sage-400 transition-colors"
          >
            <span>🔐</span>
            <span>VLN</span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search Bar */}
          <div className="hidden md:flex items-center px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors w-64">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search docs..."
              className="flex-1 ml-2 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              disabled
            />
            <kbd className="ml-2 px-2 py-1 text-xs bg-white/10 rounded text-gray-400 hidden sm:block">
              ⌘K
            </kbd>
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/Fused-Gaming/vln"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 ml-6 px-4 py-2 text-sm font-medium text-gray-400 hover:text-sage-400 transition-colors"
          >
            <span>🔗</span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
