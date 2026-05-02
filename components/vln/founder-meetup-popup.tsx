"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Clock, Linkedin, Link as LinkIcon } from "lucide-react";

interface FounderMeetupPopupProps {
  lumaEventUrl?: string;
  linkedInUrl?: string;
}

const MEETUP_CONFIG = {
  venue: "The Crybaby",
  address: "1928 Telegraph Ave",
  city: "Oakland, CA 94612",
  country: "United States",
  dayOfWeek: "Every Wednesday",
  timeStart: "5:00 PM",
  timeEnd: "7:00 PM",
  timezone: "PT",
  description:
    "Connect with web3 founders, builders, and security leaders. Perfect for founding teams and startup founders looking to network.",
  lumaEventUrl: "https://luma.com/ija0zqkf",
  linkedInUrl: "https://linkedin.com/company/vlngg",
};

const STORAGE_KEY = "vln_founder_meetup_dismissed";

/**
 * FounderMeetupPopup - Enhanced modal inviting founders to weekly VLN meetup
 * Features:
 * - Auto-show after delay (3s mobile, 5s desktop)
 * - Dismissible with 24-hour persistence
 * - Scroll-aware positioning (sticky, follows user)
 * - Social sharing (LinkedIn, Luma, copy link)
 * - Polished animations and micro-interactions
 * - VLN design system compliance
 * - Full accessibility
 */
export default function FounderMeetupPopup({
  lumaEventUrl = MEETUP_CONFIG.lumaEventUrl,
}: FounderMeetupPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if dismissed in last 24 hours
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) {
        const dismissedTime = parseInt(dismissed);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (now - dismissedTime < twentyFourHours) {
          return; // Still within dismissal period
        }
      }
    } catch {
      // localStorage is unavailable (private browsing, third-party iframe, etc.)
      // Continue to show the popup
    }

    // Determine delay based on viewport width
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const delay = isMobile ? 3000 : 5000;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);

      // Log impression
      try {
        fetch("/api/events/meetup/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "impression",
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {
          /* Silent fail */
        });
      } catch {
        /* Silent fail */
      }
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Detect scroll for smoother UX
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    // Save dismissal to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // localStorage is unavailable (private browsing, third-party iframe, etc.)
      // Continue gracefully without persistence
    }

    // Log analytics
    try {
      fetch("/api/events/meetup/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "dismiss",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        /* Silent fail */
      });
    } catch {
      /* Silent fail */
    }

    // Animate out
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleJoinClick = () => {
    // Log conversion
    try {
      fetch("/api/events/meetup/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "join_click",
          source: "popup",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        /* Silent fail */
      });
    } catch {
      /* Silent fail */
    }

    // Open Luma event in new tab
    window.open(lumaEventUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      "https://vln.gg/?ref=founder-meetup"
    )}`;

    try {
      fetch("/api/events/meetup/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "share_click",
          platform: "linkedin",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        /* Silent fail */
      });
    } catch {
      /* Silent fail */
    }

    window.open(linkedInShareUrl, "_blank", "width=550,height=680");
  };

  const handleCopyLink = () => {
    const eventUrl = "https://vln.gg/?ref=founder-meetup";
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      try {
        fetch("/api/events/meetup/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "share_click",
            platform: "copy_link",
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {
          /* Silent fail */
        });
      } catch {
        /* Silent fail */
      }
    });
  };

  if (!isVisible) return null;

  // Determine position based on scroll
  const positionClass = hasScrolled ? "fixed bottom-6 right-6" : "fixed top-1/2 left-1/2";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isAnimating ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`z-50 transition-all duration-300 ${
          positionClass
        } ${
          !hasScrolled
            ? "transform -translate-x-1/2 -translate-y-1/2"
            : ""
        }`}
      >
        <div
          className={`w-[90vw] max-w-[420px] rounded-vln bg-vln-bg border border-vln-sage/30 shadow-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 ${
            isAnimating
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {/* Header with close button */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <p className="text-xs font-mono uppercase tracking-widest text-vln-sage mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-vln-sage animate-pulse"></span>
                VLN Founders Network
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-vln-white leading-tight">
                Weekly Meetup
              </h2>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-2 rounded-lg text-vln-gray hover:text-vln-white hover:bg-vln-sage/10 transition-all duration-200 hover:shadow-[0_0_8px_#a6c3a7_30%]"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content */}
          <p className="text-vln-gray mb-6 text-sm leading-relaxed">
            Connect with web3 founders and security leaders. No pitch, just peers talking to peers.
          </p>

          {/* Event details card - Compact and Polished */}
          <div className="bg-gradient-to-br from-vln-sage/5 to-vln-bluegray/5 border border-vln-sage/15 rounded-lg p-4 mb-6">
            {/* Venue */}
            <div className="mb-4 pb-4 border-b border-vln-sage/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-vln-sage flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-vln-white">
                    {MEETUP_CONFIG.venue}
                  </p>
                  <p className="text-vln-gray-dark text-xs font-mono mt-0.5">
                    {MEETUP_CONFIG.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-vln-bluegray flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-vln-white">
                  {MEETUP_CONFIG.dayOfWeek}
                </p>
                <p className="text-vln-gray-dark text-xs mt-0.5">
                  {MEETUP_CONFIG.timeStart} – {MEETUP_CONFIG.timeEnd} {MEETUP_CONFIG.timezone}
                </p>
              </div>
            </div>
          </div>

          {/* Share buttons - Refined layout */}
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-vln-gray-dark mb-3 opacity-75">
              Share with your network
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleLinkedInShare}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-vln-bg-light border border-vln-bluegray/20 text-vln-bluegray hover:border-vln-bluegray/50 hover:bg-vln-bluegray/5 transition-all duration-200 text-xs font-medium hover:shadow-[0_0_6px_#aab7c8_20%]"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-vln-bg-light border border-vln-bluegray/20 text-vln-bluegray hover:border-vln-bluegray/50 hover:bg-vln-bluegray/5 transition-all duration-200 text-xs font-medium hover:shadow-[0_0_6px_#aab7c8_20%]"
                aria-label="Copy link"
                title={copied ? "Copied!" : "Copy link"}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {copied ? "✓" : "Link"}
                </span>
              </button>

              <a
                href={lumaEventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-vln-sage/10 border border-vln-sage/40 text-vln-sage hover:border-vln-sage/70 hover:bg-vln-sage/15 transition-all duration-200 text-xs font-medium hover:shadow-[0_0_6px_#a6c3a7_20%]"
                onClick={() => {
                  try {
                    fetch("/api/events/meetup/analytics", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        event: "share_click",
                        platform: "luma",
                        timestamp: new Date().toISOString(),
                      }),
                    }).catch(() => {
                      /* Silent fail */
                    });
                  } catch {
                    /* Silent fail */
                  }
                }}
              >
                <span>📍</span>
                <span className="hidden sm:inline">Luma</span>
              </a>
            </div>
          </div>

          {/* Action buttons - Premium CTA */}
          <div className="space-y-2.5">
            <button
              onClick={handleJoinClick}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-vln-sage to-vln-sage text-vln-bg font-semibold text-sm hover:shadow-[0_0_16px_#a6c3a7_40%] transition-all duration-200 active:scale-95"
            >
              ✨ Join on Luma
            </button>

            <button
              onClick={handleDismiss}
              className="w-full px-4 py-2 text-vln-bluegray hover:text-vln-white transition-colors text-xs font-medium"
            >
              I&apos;ll pass for now
            </button>
          </div>

          {/* Subtle footer indicator - Scroll hint */}
          {!hasScrolled && (
            <div className="mt-4 text-center text-xs text-vln-gray-dark opacity-60">
              This popup follows as you scroll
            </div>
          )}
        </div>
      </div>
    </>
  );
}
