'use client';

import { useEffect, useRef } from 'react';

interface ZammadChatConfig {
  background: string;
  fontSize: string;
  chatId: number;
  show: boolean;
}

interface ZammadChatInstance {
  show: () => void;
  hide: () => void;
}

declare global {
  interface Window {
    ZammadChat?: new (config: ZammadChatConfig) => ZammadChatInstance;
    zammadChatInstance?: ZammadChatInstance;
  }
}

interface ZammadWidgetProps {
  show?: boolean;
}

export default function ZammadWidget({ show = false }: ZammadWidgetProps) {
  const scriptLoadedRef = useRef(false);

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
    script.id = 'zammad-chat-script';
    script.src = 'https://help.vln.gg/assets/chat/chat-no-jquery.min.js';
    script.async = true;

    script.onload = () => {
      console.log('[Zammad] Script loaded successfully');
      scriptLoadedRef.current = true;

      // Initialize Zammad chat after script loads
      if (window.ZammadChat) {
        try {
          const chatInstance = new window.ZammadChat({
            background: 'rgb(9,13,14)',
            fontSize: '12px',
            chatId: 1,
            show: show
          });

          // Store instance globally for later access
          window.zammadChatInstance = chatInstance;
          console.log('[Zammad] Chat widget initialized');

          // Small delay to ensure Zammad sets up its methods
          setTimeout(() => {
            // Trigger a custom event when Zammad is fully ready
            window.dispatchEvent(new Event('zammad-ready'));
          }, 500);
        } catch (error) {
          console.error('[Zammad] Failed to initialize chat widget:', error);
        }
      } else {
        console.error('[Zammad] ZammadChat constructor not found on window object');
      }
    };

    script.onerror = (error) => {
      console.error('[Zammad] Failed to load chat script:', error);
      console.error('[Zammad] Please verify the Zammad instance is accessible at: https://help.vln.gg');
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
