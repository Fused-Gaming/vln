'use client';

import { usePathname } from 'next/navigation';
import ZammadWidget from './ZammadWidget';
import ChatButton from './ChatButton';
import ChatPopupGreeting from './ChatPopupGreeting';

export default function ZammadWidgetWrapper() {
  const pathname = usePathname();

  // Auto-show popup greeting only on homepage
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Zammad widget initialization - hidden by default */}
      <ZammadWidget show={false} />

      {/* Chat button - always visible on left side */}
      <ChatButton />

      {/* Popup greeting - only on homepage */}
      {isHomePage && <ChatPopupGreeting />}
    </>
  );
}
