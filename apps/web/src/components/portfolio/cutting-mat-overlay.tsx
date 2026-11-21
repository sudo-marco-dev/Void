'use client';

import { useEffect, useState } from 'react';

export function CuttingMatBackdrop() {
  return (
    <>
      {/* Dual-scale self-healing cutting mat grid */}
      <div
        aria-hidden="true"
        className="void-draft-grid-fade pointer-events-none fixed inset-0 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[440px]"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 0%, var(--void-glow), transparent 100%)',
        }}
      />

      {/* Corner 45 / 60 degree cutting-mat protractor markings */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-16 z-0 hidden h-56 w-56 opacity-20 lg:block"
        viewBox="0 0 220 220"
        fill="none"
      >
        <line
          x1="220"
          y1="0"
          x2="25"
          y2="195"
          stroke="var(--void-accent)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="220"
          y1="0"
          x2="92"
          y2="220"
          stroke="var(--void-amber)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <path
          d="M 145 0 A 75 75 0 0 0 220 75"
          stroke="var(--void-accent)"
          strokeWidth="1"
        />
        <text x="128" y="34" fill="var(--void-accent)" fontFamily="monospace" fontSize="10">
          45°
        </text>
        <text x="166" y="88" fill="var(--void-amber)" fontFamily="monospace" fontSize="10">
          60°
        </text>
      </svg>

      {/* Subtle bottom-left crosshair calibration stamp */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed bottom-4 left-4 z-0 hidden h-20 w-20 opacity-20 xl:block"
        viewBox="0 0 80 80"
        fill="none"
      >
        <circle cx="24" cy="56" r="14" stroke="var(--void-accent)" strokeWidth="1" />
        <line x1="24" y1="36" x2="24" y2="76" stroke="var(--void-accent)" strokeWidth="1" />
        <line x1="4" y1="56" x2="44" y2="56" stroke="var(--void-accent)" strokeWidth="1" />
        <text x="44" y="60" fill="var(--void-amber)" fontFamily="monospace" fontSize="8">
          0,0 MM
        </text>
      </svg>
    </>
  );
}

/** Graduated cutting-mat CM ruler strip with a live scroll caliper depth readout. */
export function CuttingMatRulerBar() {
  const [depthMm, setDepthMm] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const ratio = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setDepthMm(Math.round(ratio * 4200) / 10);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="mb-6 flex items-center justify-between border-b border-[var(--void-border)] pb-2.5 font-mono text-[11px] tracking-wider text-[var(--void-ink-dim)]"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="text-[var(--void-accent)]">00 CM</span>
        <span className="hidden opacity-45 sm:inline">| · | · |</span>
        <span className="hidden sm:inline">10</span>
        <span className="hidden opacity-45 md:inline">| · | · |</span>
        <span className="hidden md:inline">20</span>
        <span className="hidden opacity-45 md:inline">| · | · |</span>
        <span className="hidden md:inline">30</span>
        <span className="hidden opacity-45 lg:inline">| · | · |</span>
        <span className="hidden lg:inline">40 CM</span>
      </div>
      <span className="tabular-nums text-[var(--void-amber)]">
        CALIPER · {depthMm.toFixed(1)} MM
      </span>
    </div>
  );
}
