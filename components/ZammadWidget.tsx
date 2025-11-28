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
    // Prevent multiple script loads
    if (scriptLoadedRef.current) {
      // If instance exists and show state changed, toggle visibility
      if (window.zammadChatInstance) {
        if (show) {
          window.zammadChatInstance.show();
        } else {
          window.zammadChatInstance.hide();
        }
      }
      return;
    }

    // Check if script already exists in DOM
    const existingScript = document.querySelector('script[src*="chat-no-jquery"]');
    if (existingScript) {
      scriptLoadedRef.current = true;
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
            background: '#0f0f0f',
            fontSize: '14px',
            chatId: 1,
            show: show
          });

          // Store instance globally for later access
          window.zammadChatInstance = chatInstance;
          console.log('[Zammad] Chat widget initialized');
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

    // Cleanup function - only remove on unmount, not on re-render
    return () => {
      // Don't remove script, just hide widget
      if (window.zammadChatInstance) {
        window.zammadChatInstance.hide();
      }
    };
  }, [show]);

  return null; // This component doesn't render anything visible
}
