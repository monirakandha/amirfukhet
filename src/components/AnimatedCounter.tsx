'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g. "7+ yrs", "50+", "12", "32+", "07+"
  className?: string;
  duration?: number; // duration in ms
}

export default function AnimatedCounter({ value, className = '', duration = 1500 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Extract numeric part and non-numeric parts
    // Match first integer or decimal sequence
    const match = value.match(/(\d+)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(match[0], 10);
    const numIndex = match.index || 0;
    const prefix = value.slice(0, numIndex);
    const suffix = value.slice(numIndex + match[0].length);
    const isPadded = match[0].length > 1 && match[0].startsWith('0');
    const targetLength = match[0].length;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out cubic function
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easeOutProgress * targetNum);

            let formattedNum = currentNum.toString();
            if (isPadded) {
              formattedNum = formattedNum.padStart(targetLength, '0');
            }

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={containerRef} className={className}>
      {hasAnimated ? displayValue : `${value.replace(/\d+/, '0')}`}
    </span>
  );
}
