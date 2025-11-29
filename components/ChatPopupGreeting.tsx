'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    zammadChatOpen?: () => void;
  }
}

interface ChatPopupGreetingProps {
  autoShowDelay?: number;
}

export default function ChatPopupGreeting({ autoShowDelay = 2000 }: ChatPopupGreetingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup in this session
    const dismissed = sessionStorage.getItem('chat-popup-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Check if Zammad is loaded
    const checkZammad = setInterval(() => {
      if (window.zammadChatOpen) {
        setIsReady(true);
        clearInterval(checkZammad);
      }
    }, 100);

    // Show popup after delay
    const timer = setTimeout(() => {
      if (!dismissed) {
        setIsVisible(true);
      }
    }, autoShowDelay);

    return () => {
      clearInterval(checkZammad);
      clearTimeout(timer);
    };
  }, [autoShowDelay]);

  const handleStartChat = () => {
    if (window.zammadChatOpen) {
      window.zammadChatOpen();
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('chat-popup-dismissed', 'true');
  };

  if (isDismissed || !isReady) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed z-40',
        // Mobile: bottom center
        'bottom-6 left-1/2 -translate-x-1/2',
        // Desktop: bottom right (away from scroll-to-top)
        'md:bottom-8 md:right-8 md:left-auto md:translate-x-0',
        'transition-all duration-500 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <div className="bg-vln-bg-light border border-vln-sage/30 rounded-lg shadow-2xl max-w-sm overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-vln-sage/20 to-vln-bg-light border-b border-vln-sage/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-vln-sage" />
            <h3 className="text-vln-white font-semibold text-sm">Welcome to VLN Security!</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-vln-gray hover:text-vln-white transition-colors p-1 hover:bg-vln-bg-lighter rounded"
            aria-label="Close popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-vln-gray text-sm">
            Hi! Need help securing your smart contracts?
          </p>

          <ul className="space-y-2 text-sm text-vln-gray">
            <li className="flex items-start gap-2">
              <span className="text-vln-sage mt-0.5">•</span>
              <span>Smart Contract Audits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-vln-sage mt-0.5">•</span>
              <span>Vulnerability Research</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-vln-sage mt-0.5">•</span>
              <span>24/7 Incident Response</span>
            </li>
          </ul>

          <button
            onClick={handleStartChat}
            className={cn(
              'w-full py-2.5 px-4 rounded-lg',
              'bg-vln-sage hover:bg-vln-sage-light',
              'text-vln-bg font-semibold text-sm',
              'transition-all duration-300',
              'glow-lift',
              'hover:shadow-vln-glow',
              'flex items-center justify-center gap-2'
            )}
          >
            Start Chat
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
