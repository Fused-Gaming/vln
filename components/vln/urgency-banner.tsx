"use client";

import { AlertCircle } from 'lucide-react';
import Button from '@/components/ui/button';
import CSSFade from '@/components/animations/css-fade';

interface UrgencyBannerProps {
  slotsTotal?: number;
  slotsBooked?: number;
  month?: string;
}

/**
 * Urgency banner showing limited availability
 * Creates FOMO for conversion optimization
 */
export default function UrgencyBanner({
  slotsTotal = 13,
  slotsBooked = 10,
  month = 'December 2024',
}: UrgencyBannerProps) {
  const slotsRemaining = slotsTotal - slotsBooked;
  const percentBooked = (slotsBooked / slotsTotal) * 100;

  return (
    <CSSFade>
      <div className="bg-vln-bg-light border-2 border-vln-amber/30 rounded-vln p-6 sm:p-8 max-w-2xl mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-vln-amber" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-vln-white mb-2">
              Launch in 30 Days?
            </h3>
            <p className="text-vln-gray">
              We have <span className="text-vln-amber font-bold">{slotsRemaining} audit slots</span> available for {month}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-vln-gray-dark mb-2">
            <span>{slotsBooked} of {slotsTotal} slots booked</span>
            <span>{Math.round(percentBooked)}%</span>
          </div>
          <div className="w-full h-3 bg-vln-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-vln-amber to-vln-amber-light transition-all duration-1000"
              style={{ width: `${percentBooked}%` }}
            />
          </div>
        </div>

        <Button variant="primary" size="lg" href="/contact" className="w-full group">
          Book Your Slot Now
          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </Button>
      </div>
    </CSSFade>
  );
}
