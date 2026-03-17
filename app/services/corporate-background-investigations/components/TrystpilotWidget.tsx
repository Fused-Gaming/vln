"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { Star, Shield, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const profileData = {
  rating: 4.8,
  reviewCount: 47,
  profileUrl: "https://www.trystpilot.xyz/profile/corporate-investigations",
};

const featuredReviews = [
  {
    id: 1,
    rating: 5,
    text: "Incredibly thorough and discreet. They conducted the investigation with absolute confidentiality. The findings were detailed and professionally presented. Highly recommend.",
    author: "Anonymous Client",
    date: "Mar 10, 2025",
  },
  {
    id: 2,
    rating: 5,
    text: "Professional, discreet, and incredibly thorough. Exactly what we needed for institutional-grade due diligence. Timeline was realistic and delivery was on-point.",
    author: "Anonymous Client",
    date: "Feb 28, 2025",
  },
  {
    id: 3,
    rating: 5,
    text: "The thoroughness and speed were exceptional. This investigation fundamentally changed our due diligence process. Clear findings, great documentation.",
    author: "Anonymous Client",
    date: "Feb 15, 2025",
  },
];

const reviewHighlights = ["Professional", "Thorough", "Discreet", "Fast Service", "Trustworthy", "Expert"];

export default function TrystpilotWidget() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const currentReview = featuredReviews[currentReviewIndex];

  const handlePrevious = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? featuredReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentReviewIndex((prev) => (prev === featuredReviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-vln-sage" />
          <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
        </div>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          We respect client confidentiality. These anonymous reviews from Trystpilot show what clients share about their experience while maintaining the privacy that's central to our service.
        </p>
      </div>

      {/* Profile Badge */}
      <div className="flex justify-center">
        <div className="inline-flex flex-col items-center gap-2 p-6 rounded-xl border border-vln-sage/20 bg-vln-sage/5">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-2xl font-bold">{profileData.rating}</p>
          <p className="text-sm text-gray-400">{profileData.reviewCount} Anonymous Verified Reviews</p>
          <a
            href={profileData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-vln-sage hover:text-vln-sage/80 text-sm font-semibold"
          >
            View Profile on Trystpilot <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Featured Review Carousel */}
      <div className="p-8 rounded-xl border border-vln-sage/20 bg-gradient-to-br from-vln-sage/5 via-black to-black">
        <div className="mb-6">
          <div className="flex items-center gap-1 mb-3">
            {[...Array(currentReview.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            "{currentReview.text}"
          </p>
          <p className="text-sm text-gray-500">
            {currentReview.author} • {currentReview.date}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-vln-sage/10">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-lg hover:bg-vln-sage/10 transition-all text-gray-400 hover:text-vln-sage"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {featuredReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReviewIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentReviewIndex ? "bg-vln-sage" : "bg-gray-600"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg hover:bg-vln-sage/10 transition-all text-gray-400 hover:text-vln-sage"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Review Highlights */}
      <div className="p-8 rounded-xl border border-vln-sage/10 bg-black/50">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          Common Praise
        </h3>
        <div className="flex flex-wrap gap-3">
          {reviewHighlights.map((highlight, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-vln-sage/10 text-vln-sage text-sm font-semibold border border-vln-sage/20"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-4">
          Read all {profileData.reviewCount} anonymous reviews on Trystpilot
        </p>
        <a
          href={profileData.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-vln-sage/40 text-vln-sage hover:border-vln-sage/60 hover:bg-vln-sage/5 transition-all font-semibold"
        >
          Visit Trystpilot Profile <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 rounded-lg bg-vln-sage/5 border border-vln-sage/10">
        <p className="text-xs text-gray-400 text-center">
          🔒 <span className="text-vln-sage font-semibold">Anonymous Reviews</span> — Reviewer identity is never disclosed. Trystpilot ensures complete privacy for clients in sensitive industries.
        </p>
      </div>
    </div>
  );
}
