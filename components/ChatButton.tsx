'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    zammadChatOpen?: () => void;
  }
}

interface ChatButtonProps {
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export default function ChatButton({
  className = '',
  children,
  showIcon = true
}: ChatButtonProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Zammad is loaded
    const checkZammad = setInterval(() => {
      if (window.zammadChatOpen) {
        setIsReady(true);
        clearInterval(checkZammad);
      }
    }, 100);

    return () => clearInterval(checkZammad);
  }, []);

  const handleClick = () => {
    if (window.zammadChatOpen) {
      window.zammadChatOpen();
    }
  };

  if (!isReady) {
    return null; // Don't show button until Zammad is loaded
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'fixed bottom-6 left-6 z-50',
        'p-3 rounded-full',
        'bg-vln-sage/90 hover:bg-vln-sage',
        'text-vln-bg',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300',
        'glow-lift',
        'hover:scale-110',
        className
      )}
      aria-label="Open chat support"
    >
      {showIcon && <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
      {children}
    </button>
  );
}
