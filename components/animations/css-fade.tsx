"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CSSFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number; // in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number; // in ms
  once?: boolean;
}

/**
 * Performance-optimized fade animation using pure CSS
 * Much lighter than Framer Motion for simple fade effects
 * Uses Intersection Observer for efficient scroll detection
 */
export default function CSSFade({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 600,
  once = true,
}: CSSFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px', // Trigger slightly before element enters viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(20px)';
        case 'down':
          return 'translateY(-20px)';
        case 'left':
          return 'translateX(20px)';
        case 'right':
          return 'translateX(-20px)';
        default:
          return 'none';
      }
    }
    return 'none';
  };

  return (
    <div
      ref={ref}
      className={cn('transition-all', className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
