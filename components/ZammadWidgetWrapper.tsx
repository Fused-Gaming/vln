'use client';

import { usePathname } from 'next/navigation';
import ZammadWidget from './ZammadWidget';
import ChatPopupGreeting from './ChatPopupGreeting';

export default function ZammadWidgetWrapper() {
  const pathname = usePathname();

  // Auto-show popup greeting only on homepage
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Zammad widget initialization - hidden by default */}
      <ZammadWidget show={false} />

      {/* Popup greeting - only on homepage */}
      {isHomePage && <ChatPopupGreeting />}
    </>
  );
}
