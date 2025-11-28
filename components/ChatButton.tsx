'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    zammadChatOpen?: () => void;
  }
}

interface ChatButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ChatButton({ className = '', children = 'Chat with us' }: ChatButtonProps) {
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
      className={`open-zammad-chat ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
