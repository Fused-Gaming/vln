'use client';

import { usePathname } from 'next/navigation';
import ZammadWidget from './ZammadWidget';

export default function ZammadWidgetWrapper() {
  const pathname = usePathname();

  // Auto-show only on homepage
  const isHomePage = pathname === '/';

  return <ZammadWidget show={isHomePage} />;
}
