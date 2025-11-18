'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from './container';

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        isScrolled
          ? 'border-vln-bluegray/20 bg-vln-bg/95 backdrop-blur-lg'
          : 'border-transparent bg-transparent',
        className
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-vln-sage">VLN.gg</span>
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/services"
              className="text-sm font-medium transition-colors hover:text-vln-sage"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-vln-sage"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-vln-sage"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-vln bg-vln-sage px-6 text-sm font-medium text-vln-bg transition-all hover:shadow-vln-glow hover:brightness-110"
            >
              Request Audit
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
