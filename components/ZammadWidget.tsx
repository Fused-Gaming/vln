'use client';

import { useEffect } from 'react';

interface ZammadChatConfig {
  background: string;
  fontSize: string;
  chatId: number;
  show: boolean;
}

declare global {
  interface Window {
    ZammadChat?: new (config: ZammadChatConfig) => void;
  }
}

interface ZammadWidgetProps {
  show?: boolean;
}

export default function ZammadWidget({ show = false }: ZammadWidgetProps) {
  useEffect(() => {
    // Prevent duplicate script loading
    if (document.querySelector('script[src*="chat-no-jquery.min.js"]')) {
      // Script already loaded, just initialize if needed
      if (window.ZammadChat && !document.querySelector('.zammad-chat')) {
        new window.ZammadChat({
          background: 'rgb(9,13,14)',
          fontSize: '12px',
          chatId: 1,
          show: show
        });
      }
      return;
    }

    // Load the Zammad chat script
    const script = document.createElement('script');
    script.src = 'https://help.vln.gg/assets/chat/chat-no-jquery.min.js';
    script.async = true;

    script.onload = () => {
      // Initialize Zammad chat after script loads
      if (window.ZammadChat) {
        new window.ZammadChat({
          background: 'rgb(9,13,14)',
          fontSize: '12px',
          chatId: 1,
          show: show
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup: Only remove script, not the widget DOM
    return () => {
      // Don't remove the script as it may be needed for navigation
      // The widget itself persists across page changes intentionally
    };
  }, [show]);

  return null; // This component doesn't render anything visible
}
