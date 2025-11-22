"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StaggerFadeProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number; // delay between each child in ms
  childClassName?: string;
  once?: boolean;
}

/**
 * Performance-optimized stagger animation using CSS
 * Lighter alternative to Framer Motion's staggerChildren
 * Uses Intersection Observer for efficient triggering
 */
export default function StaggerFade({
  children,
  className,
  staggerDelay = 100,
  childClassName,
  once = true,
}: StaggerFadeProps) {
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
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn('transition-all duration-600', childClassName)}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${index * staggerDelay}ms`,
            willChange: isVisible ? 'auto' : 'opacity, transform',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
