"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import Button from "@/components/ui/button";

interface Review {
  rating: number;
  excerpt: string;
  alias: string;
  date: string;
}

const featuredReviews: Review[] = [
  {
    rating: 5,
    excerpt:
      "Incredibly thorough and discreet. They conducted the investigation with absolute confidentiality. The findings were detailed and professionally presented.",
    alias: "Anonymous Client",
    date: "Mar 10, 2025",
  },
  {
    rating: 5,
    excerpt:
      "Exceeded our expectations. Professional, timely, and the report was exactly what we needed for our internal decision-making. Highly recommend.",
    alias: "Confidential User",
    date: "Feb 28, 2025",
  },
  {
    rating: 5,
    excerpt:
      "Expert-level work. They found what we needed to find. The methodology was sound and the final presentation was boardroom-ready.",
    alias: "Anonymous Reviewer",
    date: "Feb 15, 2025",
  },
  {
    rating: 5,
    excerpt:
      "Trusted them with sensitive matters. Their professionalism and discretion are unmatched. Will definitely work with them again.",
    alias: "Private Client",
    date: "Jan 30, 2025",
  },
  {
    rating: 5,
    excerpt:
      "Fast turnaround without compromising quality. Every detail was accounted for. The investigation process was transparent and easy to follow.",
    alias: "Verified Buyer",
    date: "Jan 20, 2025",
  },
];

const reviewHighlights = [
  { tag: "Professional", count: 34 },
  { tag: "Thorough", count: 22 },
  { tag: "Discreet", count: 28 },
  { tag: "Fast Service", count: 15 },
  { tag: "Trustworthy", count: 20 },
  { tag: "Expert", count: 18 },
];

export default function TrystpilotWidget() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % featuredReviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
  };

  const currentReview = featuredReviews[currentReviewIndex];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Anonymity Badge */}
      <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-vln border-2 border-vln-sage/30 bg-vln-sage/5">
        <Lock className="w-5 h-5 text-vln-sage" />
        <span className="text-vln-sage font-mono text-sm">
          🔒 ANONYMOUS REVIEWS — Reviewer identity is never disclosed
        </span>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        <div className="text-center p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-vln-sage text-vln-sage" />
            ))}
          </div>
          <p className="text-3xl font-bold text-vln-sage">4.8</p>
          <p className="text-vln-gray text-sm mt-1">Average Rating</p>
        </div>

        <div className="text-center p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light">
          <p className="text-3xl font-bold text-vln-sage">47+</p>
          <p className="text-vln-gray text-sm mt-1">Anonymous</p>
          <p className="text-vln-gray text-sm">Verified Reviews</p>
        </div>

        <div className="text-center p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light">
          <p className="text-2xl font-bold text-vln-sage">Trystpilot</p>
          <p className="text-vln-gray text-sm mt-2">Privacy-First Review</p>
          <p className="text-vln-gray text-sm">Platform</p>
        </div>
      </div>

      {/* Featured Review Carousel */}
      <div className="p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light">
        <div className="mb-6">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(currentReview.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-vln-sage text-vln-sage" />
            ))}
          </div>
          <p className="text-lg text-vln-gray italic leading-relaxed mb-4">"{currentReview.excerpt}"</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-vln-white font-semibold">{currentReview.alias}</p>
              <p className="text-vln-gray text-sm">{currentReview.date}</p>
            </div>
            <a
              href="https://www.trystpilot.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-vln-sage hover:text-vln-sage-light text-sm font-mono transition-colors"
            >
              Read on Trystpilot →
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-vln-sage/10">
          <button
            onClick={prevReview}
            aria-label="Previous review"
            className="p-2 rounded-vln border border-vln-sage/20 hover:border-vln-sage/40 text-vln-sage hover:bg-vln-sage/10 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {featuredReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReviewIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentReviewIndex ? "bg-vln-sage w-6" : "bg-vln-sage/40"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            aria-label="Next review"
            className="p-2 rounded-vln border border-vln-sage/20 hover:border-vln-sage/40 text-vln-sage hover:bg-vln-sage/10 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Review Highlights */}
      <div className="p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light">
        <p className="text-sm font-mono text-vln-sage/70 uppercase tracking-wide mb-6">Common Feedback Themes</p>
        <div className="flex flex-wrap gap-3">
          {reviewHighlights.map((highlight, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full border border-vln-sage/30 bg-vln-sage/10 text-vln-sage text-sm font-medium hover:border-vln-sage/60 hover:bg-vln-sage/15 transition-all cursor-default"
            >
              {highlight.tag} <span className="text-vln-sage/70">({highlight.count})</span>
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="https://www.trystpilot.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[8px] bg-vln-bluegray text-vln-bg font-semibold text-base hover:bg-vln-bluegray/90 transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-bluegray shadow-vln-glow group"
        >
          Read All 47+ Anonymous Reviews on Trystpilot
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
        <p className="text-vln-gray text-sm mt-4 max-w-2xl mx-auto">
          At VLN, we believe privacy-first reviews matter. Trystpilot's anonymous platform respects the
          confidentiality that's central to our investigation service. Your feedback is protected.
        </p>
      </div>
    </div>
  );
}
