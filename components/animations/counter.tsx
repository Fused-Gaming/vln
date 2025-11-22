"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  end: number;
  duration?: number; // in ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Performance-optimized counter animation
 * Uses requestAnimationFrame for smooth 60fps animation
 * Triggers when element enters viewport
 */
export default function Counter({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = Date.now();
          const startValue = 0;
          const endValue = end;

          const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (endValue - startValue) * easeOutCubic;

            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue); // Ensure we end at exact value
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  const formatNumber = (value: number) => {
    return value.toFixed(decimals);
  };

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
