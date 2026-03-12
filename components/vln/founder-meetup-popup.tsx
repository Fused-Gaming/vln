"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Clock, Linkedin, Link as LinkIcon } from "lucide-react";
import Button from "@/components/ui/button";

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
  description: "Connect with web3 founders, builders, and security leaders. Perfect for founding teams and startup founders looking to network.",
  lumaEventUrl: "https://lu.ma/vlnfounders",
  linkedInUrl: "https://linkedin.com/company/vlngg",
};

const STORAGE_KEY = "vln_founder_meetup_dismissed";

/**
 * FounderMeetupPopup - Modal inviting founders to weekly VLN meetup
 * Features:
 * - Auto-show after delay (3s mobile, 5s desktop)
 * - Dismissible with 24-hour persistence
 * - Social sharing (LinkedIn, Luma, copy link)
 * - VLN design system compliance
 * - Full accessibility
 */
export default function FounderMeetupPopup({
  lumaEventUrl = MEETUP_CONFIG.lumaEventUrl,
  linkedInUrl = MEETUP_CONFIG.linkedInUrl,
}: FounderMeetupPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if dismissed in last 24 hours
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - dismissedTime < twentyFourHours) {
        return; // Still within dismissal period
      }
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
          /* Silent fail - analytics not critical */
        });
      } catch {
        /* Silent fail - analytics not critical */
      }
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    // Save dismissal to localStorage
    localStorage.setItem(STORAGE_KEY, Date.now().toString());

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
    const shareUrl = encodeURIComponent("https://vln.gg/?ref=founder-meetup");
    const shareText = encodeURIComponent(
      "Connecting with @vlngg at their weekly founder meetup in Oakland - join us Wednesdays 5-7pm at The Crybaby!"
    );
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isAnimating ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isAnimating
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
      >
        <div className="w-[90vw] max-w-[500px] rounded-vln bg-vln-bg border border-vln-sage/30 shadow-lg p-6 sm:p-8">
          {/* Header with close button */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-vln-sage mb-1">
                🔗 VLN Founders Network
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-vln-white">
                Weekly Meetup
              </h2>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-2 rounded-vln text-vln-gray hover:text-vln-white hover:bg-vln-sage/10 transition-all duration-200 hover:shadow-[0_0_8px_#a6c3a7]"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content */}
          <p className="text-vln-gray mb-6 text-sm sm:text-base leading-relaxed">
            Connect with web3 founders, builders, and security leaders. Perfect for founding teams.
          </p>

          {/* Event details card */}
          <div className="bg-vln-bg-light border border-vln-sage/20 rounded-vln p-5 sm:p-6 mb-6">
            {/* Venue */}
            <div className="mb-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-vln-sage flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-vln-white mb-1">
                    {MEETUP_CONFIG.venue}
                  </p>
                  <p className="text-vln-gray-dark text-sm font-mono">
                    {MEETUP_CONFIG.address}
                  </p>
                  <p className="text-vln-gray-dark text-sm font-mono">
                    {MEETUP_CONFIG.city}, {MEETUP_CONFIG.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-vln-bluegray flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-vln-white mb-1">
                  {MEETUP_CONFIG.dayOfWeek}
                </p>
                <p className="text-vln-gray-dark text-sm">
                  {MEETUP_CONFIG.timeStart} – {MEETUP_CONFIG.timeEnd} {MEETUP_CONFIG.timezone}
                </p>
              </div>
            </div>
          </div>

          {/* Share buttons */}
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-vln-bluegray mb-3">
              Share with your network
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleLinkedInShare}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-vln bg-vln-bg-light border border-vln-bluegray/30 text-vln-bluegray hover:border-vln-bluegray/60 hover:bg-vln-bluegray/5 transition-all duration-200 text-sm font-medium hover:shadow-[0_0_8px_#aab7c8]"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-vln bg-vln-bg-light border border-vln-bluegray/30 text-vln-bluegray hover:border-vln-bluegray/60 hover:bg-vln-bluegray/5 transition-all duration-200 text-sm font-medium hover:shadow-[0_0_8px_#aab7c8]"
                aria-label="Copy link"
                title={copied ? "Copied!" : "Copy link"}
              >
                <LinkIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {copied ? "Copied!" : "Link"}
                </span>
              </button>

              <a
                href={lumaEventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-vln bg-vln-sage/10 border border-vln-sage/40 text-vln-sage hover:border-vln-sage/80 hover:bg-vln-sage/20 transition-all duration-200 text-sm font-medium hover:shadow-[0_0_8px_#a6c3a7]"
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
                <span className="text-lg">📍</span>
                <span className="hidden sm:inline">Luma</span>
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleJoinClick}
              className="w-full group shadow-[0_0_8px_#a6c3a7_1%] hover:shadow-[0_0_12px_#a6c3a7]"
            >
              ✨ Join VLN Network
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>

            <button
              onClick={handleDismiss}
              className="w-full px-4 py-2 text-vln-bluegray hover:text-vln-white transition-colors text-sm font-medium"
            >
              or dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
