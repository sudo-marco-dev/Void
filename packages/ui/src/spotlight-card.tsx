'use client';

import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Renders subtle CAD drafting crosshairs at opposite corners. */
  crosshairs?: boolean;
}

/** Minimalist 1px hairline surface with subtle pointer spotlight sheen. */
export function SpotlightCard({
  children,
  className = '',
  crosshairs = false,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
    onMouseMove?.(event);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      className={`group relative border border-[var(--void-border)] bg-[var(--void-surface)] transition-colors duration-300 hover:border-[var(--void-border-strong)] ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, var(--void-spotlight), transparent 72%)`,
        }}
      />

      {crosshairs ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[5px] -top-[9px] select-none font-mono text-xs text-[var(--void-ink-dim)]"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[9px] -right-[5px] select-none font-mono text-xs text-[var(--void-ink-dim)]"
          >
            +
          </span>
        </>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
