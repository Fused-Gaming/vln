'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllSections, getPagesBySection } from '@/lib/docs/sitemap';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sections = getAllSections();

  // Extract section slug from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentSection = pathSegments[1];

  const toggleSection = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 hover:bg-white/10 rounded-lg"
        aria-label="Toggle menu"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed lg:relative lg:flex flex-col w-64 h-screen
          bg-charcoal border-r border-white/10
          transform transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 z-35
          overflow-y-auto
        `}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10 sticky top-0 bg-charcoal">
          <Link
            href="/docs"
            className="flex items-center gap-2 font-bold text-lg text-white hover:text-sage-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            <span>📚</span>
            <span>VLN Docs</span>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {sections.map(section => {
            const isActive = currentSection === section.slug;
            const pages = getPagesBySection(section.slug);

            return (
              <div key={section.slug} className="space-y-1">
                {/* Section Header */}
                <Link
                  href={`/docs/${section.slug}`}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                    ${
                      isActive
                        ? 'bg-sage-500/20 text-sage-300 border-l-4 border-sage-500'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-semibold flex-1">{section.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Pages (show if section is active) */}
                {isActive && (
                  <div className="ml-6 space-y-1 border-l border-white/10 pl-3">
                    {pages.map(page => {
                      const pageActive = pathname.includes(
                        `/docs/${section.slug}/${page.slug}`
                      );

                      return (
                        <Link
                          key={page.slug}
                          href={`/docs/${section.slug}/${page.slug}`}
                          className={`
                            block px-3 py-2 text-sm rounded transition-all
                            ${
                              pageActive
                                ? 'bg-sage-500/20 text-sage-300 font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }
                          `}
                          onClick={() => setOpen(false)}
                        >
                          {page.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 space-y-3 text-sm text-gray-400">
          <div className="space-y-2">
            <a
              href="https://github.com/Fused-Gaming/vln"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-sage-400 transition-colors"
            >
              <span>🔗</span>
              <span>GitHub</span>
            </a>
            <a
              href="/contact"
              className="flex items-center gap-2 hover:text-sage-400 transition-colors"
            >
              <span>💬</span>
              <span>Get Help</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
