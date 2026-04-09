"use client";

import { useEffect } from "react";

interface CalendlyEmbedProps {
  url: string;
  height?: string;
  title?: string;
  description?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: { url: string; text: string; color: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export default function CalendlyEmbed({
  url,
  height = "900px",
  title = "Schedule a Consultation",
  description = "Book a free 30-minute security consultation with our team",
}: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly script dynamically
    if (!document.getElementById("calendly-script")) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        // Initialize Calendly widget after script loads
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: url,
            parentElement: document.getElementById("calendly-embed"),
          });
        }
      };
      document.body.appendChild(script);
    } else if (window.Calendly) {
      // Script already loaded, initialize widget
      window.Calendly.initInlineWidget({
        url: url,
        parentElement: document.getElementById("calendly-embed"),
      });
    }
  }, [url]);

  return (
    <div className="w-full">
      {title && (
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-vln-white mb-2">{title}</h2>
          {description && <p className="text-vln-gray text-base sm:text-lg">{description}</p>}
        </div>
      )}

      <div className="calendly-embed-wrapper bg-vln-bg-light/50 border border-vln-sage/20 rounded-vln overflow-hidden">
        {/* Calendly widget will render here */}
        <div
          id="calendly-embed"
          style={{
            minHeight: height,
            width: "100%",
          }}
          className="calendly-inline-widget"
        />
      </div>

      <style jsx>{`
        :global(.calendly-embed-wrapper .calendly-inline-widget) {
          width: 100%;
          min-height: ${height};
        }

        /* Ensure responsive behavior */
        @media (max-width: 768px) {
          :global(.calendly-embed-wrapper .calendly-inline-widget) {
            min-height: 600px;
          }
        }

        /* VLN theme overrides for Calendly widget */
        :global(.calendly-inline-widget) {
          --calendly-brand-color: #86d993;
          --calendly-secondary-color: #7dd3fc;
          --calendly-text-color: #f8f9fa;
          --calendly-bg-color: #0a0e0f;
        }
      `}</style>
    </div>
  );
}
