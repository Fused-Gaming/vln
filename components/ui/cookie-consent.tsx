"use client";

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Cookie Consent Banner
 * Displays privacy-focused cookie consent notice
 * Uses localStorage to remember user preference
 */
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/dismissed
    const hasConsented = localStorage.getItem('vln-cookie-consent');
    if (!hasConsented) {
      // Show banner after a brief delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('vln-cookie-consent', 'true');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('vln-cookie-consent', 'dismissed');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6',
        'bg-vln-bg/95 backdrop-blur-md border-t-2 border-vln-sage/20',
        'shadow-lg',
        'animate-in slide-in-from-bottom duration-500'
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="p-3 rounded-vln bg-vln-sage/10">
              <Cookie className="w-6 h-6 text-vln-sage" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-vln-white">
              Privacy-Focused Analytics
            </h3>
            <p className="text-sm text-vln-gray leading-relaxed">
              We use privacy-focused Cloudflare Web Analytics to understand how visitors use our site.
              This tool does not track personally identifiable information and complies with GDPR.
              By continuing to use our site, you consent to this minimal data collection.
              See our{' '}
              <a href="/privacy" className="text-vln-sage hover:underline">
                Privacy Policy
              </a>{' '}
              for details.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleAccept}
              className="px-6 py-2 rounded-vln bg-vln-sage text-vln-bg font-medium hover:bg-vln-sage/90 transition-all glow-lift"
            >
              Accept
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 rounded-md hover:bg-vln-sage/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5 text-vln-gray hover:text-vln-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
