'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';

type ChapterId = 'top' | 'work' | 'craft' | 'stack' | 'community' | 'journey';

const CHAPTER_LABELS: Record<ChapterId, { code: string; name: string; zone: 'code' | 'maker' }> = {
  top: { code: 'ACT 00', name: 'WORKBENCH', zone: 'code' },
  work: { code: 'ACT 01', name: 'CODE ZONE', zone: 'code' },
  craft: { code: 'ACT 02', name: 'MAKER MAT', zone: 'maker' },
  stack: { code: 'ACT 03', name: 'TOOLKIT', zone: 'maker' },
  community: { code: 'ACT 04', name: 'PROOF', zone: 'code' },
  journey: { code: 'ACT 05', name: 'TIMELINE', zone: 'code' },
};

interface InteractiveToolProps {
  id: string;
  activeTip: string | null;
  onToggleTip: (id: string) => void;
  title: string;
  detail: string;
  alignTip?: 'left' | 'right';
  children: ReactNode;
}

function InteractiveRailTool({
  id,
  activeTip,
  onToggleTip,
  title,
  detail,
  alignTip = 'left',
  children,
}: InteractiveToolProps) {
  const isOpen = activeTip === id;

  return (
    <div className="relative flex justify-center">
      <motion.button
        type="button"
        onClick={() => onToggleTip(id)}
        aria-label={title}
        whileHover={{ scale: 1.09, rotate: -5 }}
        whileTap={{ scale: 0.92, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 360, damping: 20 }}
        className="pointer-events-auto cursor-pointer border border-transparent p-1.5 transition-colors hover:border-[var(--void-border)] hover:bg-[var(--void-surface)]/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--void-accent)]"
      >
        {children}
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, x: alignTip === 'left' ? -6 : 6, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: alignTip === 'left' ? -4 : 4, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className={`pointer-events-auto absolute top-0 z-30 w-44 border border-[var(--void-accent)] bg-[var(--void-surface)] p-2.5 text-left font-mono text-[10px] shadow-xl ${
              alignTip === 'left' ? 'left-full ml-2' : 'right-full mr-2'
            }`}
          >
            <p className="font-semibold uppercase tracking-wider text-[var(--void-accent)]">
              {title}
            </p>
            <p className="mt-1 leading-relaxed text-[var(--void-ink-muted)]">{detail}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * Sticky left/right side-rail companions reacting to scroll depth, scroll velocity,
 * active story chapter, and direct hover/click playfulness on wide desktop viewports.
 */
export function StickySideRails() {
  const { scrollY, scrollYProgress } = useScroll();
  const [chapter, setChapter] = useState<ChapterId>('top');
  const [caliperMm, setCaliperMm] = useState(0);
  const [spoolBoost, setSpoolBoost] = useState(0);
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const [scrollDir, setScrollDir] = useState<'idle' | 'down' | 'up'>('idle');

  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { damping: 38, stiffness: 280 });

  const railLagY = useTransform(smoothVelocity, [-1800, 1800], [-16, 16]);
  const velocitySkewY = useTransform(smoothVelocity, [-1800, 1800], [-6, 6]);
  const velocityTilt = useTransform(smoothVelocity, [-1800, 1800], [-5, 5]);
  const caliperJawY = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const spoolSpin = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const cutterGripAngle = useTransform(smoothVelocity, [-1800, 1800], [-6, 6]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setCaliperMm(Math.round(latest * 1450) / 10);
  });

  useMotionValueEvent(rawVelocity, 'change', (v) => {
    if (v > 35) setScrollDir('down');
    else if (v < -35) setScrollDir('up');
    else setScrollDir('idle');
  });

  useEffect(() => {
    const ids: ChapterId[] = ['top', 'work', 'craft', 'stack', 'community', 'journey'];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && visible.target.id in CHAPTER_LABELS) {
          setChapter(visible.target.id as ChapterId);
        }
      },
      { rootMargin: '-28% 0px -50% 0px', threshold: [0.05, 0.2, 0.5] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!activeTip) return;
    const timer = window.setTimeout(() => setActiveTip(null), 4200);
    return () => window.clearTimeout(timer);
  }, [activeTip]);

  function toggleTip(id: string) {
    if (id === 'spool') {
      setSpoolBoost((prev) => prev + 120);
    }
    setActiveTip((prev) => (prev === id ? null : id));
  }

  const chapterMeta = CHAPTER_LABELS[chapter];
  const isMakerZone = chapterMeta.zone === 'maker';

  return (
    <div
      aria-hidden="false"
      className="pointer-events-none fixed inset-x-0 top-24 bottom-8 z-20 hidden min-[1360px]:block"
    >
      {/* Left Rail: Active Chapter + Live Animated Vernier Caliper + Code/Cutter Instrument */}
      <motion.aside
        style={{ y: railLagY, skewY: velocitySkewY }}
        className="absolute left-3 top-0 flex w-24 flex-col items-center gap-4 min-[1520px]:left-6"
      >
        <div className="w-full border border-[var(--void-border)] bg-[var(--void-surface)]/88 px-2 py-2 text-center font-mono backdrop-blur-xs">
          <div className="text-[10px] font-semibold text-[var(--void-accent)]">
            {chapterMeta.code}
          </div>
          <div className="mt-0.5 text-[9px] tracking-wider text-[var(--void-ink-dim)]">
            {chapterMeta.name}
          </div>
        </div>

        <InteractiveRailTool
          id="caliper"
          activeTip={activeTip}
          onToggleTip={toggleTip}
          title="Vernier Caliper · 0.1mm"
          detail="Slides dynamically as you scroll. Used to measure real ESP32, OLED & battery lid clearances before modeling in Onshape."
          alignTip="left"
        >
          <div className="flex flex-col items-center gap-1">
            <svg width="68" height="120" viewBox="0 0 92 160" fill="none">
              {/* Fixed beam + upper jaw */}
              <path
                d="M28 8 H42 V146 H28 V54 L10 42 V30 H28 V8 Z"
                stroke="var(--void-accent)"
                strokeWidth="1.7"
              />
              {/* Ruler graduation ticks */}
              <line x1="30" y1="22" x2="36" y2="22" stroke="var(--void-accent)" strokeWidth="1.2" />
              <line x1="30" y1="34" x2="35" y2="34" stroke="var(--void-accent)" strokeWidth="1.2" />
              <line x1="30" y1="46" x2="37" y2="46" stroke="var(--void-accent)" strokeWidth="1.2" />
              <line x1="30" y1="68" x2="36" y2="68" stroke="var(--void-accent)" strokeWidth="1.2" />
              <line x1="30" y1="82" x2="35" y2="82" stroke="var(--void-accent)" strokeWidth="1.2" />
              <line x1="30" y1="96" x2="37" y2="96" stroke="var(--void-accent)" strokeWidth="1.2" />
              <line x1="30" y1="110" x2="35" y2="110" stroke="var(--void-accent)" strokeWidth="1.2" />
              {/* Scroll-driven movable lower jaw */}
              <motion.g style={{ y: caliperJawY }}>
                <path
                  d="M42 42 H74 V64 H42 M42 64 L18 78 V56 Z"
                  stroke="var(--void-amber)"
                  strokeWidth="1.8"
                  fill="var(--void-bg)"
                />
                <circle cx="58" cy="53" r="2.5" fill="var(--void-amber)" />
              </motion.g>
            </svg>
            <span className="font-mono text-[9px] tabular-nums text-[var(--void-amber)]">
              {caliperMm.toFixed(1)}mm
            </span>
          </div>
        </InteractiveRailTool>

        <InteractiveRailTool
          id="left-tool"
          activeTip={activeTip}
          onToggleTip={toggleTip}
          title={isMakerZone ? 'Flush Cutters · Electronics' : 'Next.js 15 + TypeScript'}
          detail={
            isMakerZone
              ? 'Trimming soldered leads, PLA supports, and custom wire harnesses for ESP32 prototypes.'
              : 'Strict TypeScript App Router interfaces paired with Supabase Auth, PostgreSQL RLS, and Vercel Edge.'
          }
          alignTip="left"
        >
          {isMakerZone ? (
            <motion.svg
              style={{ rotate: cutterGripAngle }}
              width="66"
              height="82"
              viewBox="0 0 108 128"
              fill="none"
            >
              <path
                d="M44 18 L54 44 L48 52 L34 26 Z M64 18 L54 44 L60 52 L74 26 Z"
                stroke="var(--void-accent)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="54" cy="48" r="5" stroke="var(--void-amber)" strokeWidth="1.8" />
              <path
                d="M50 53 C40 72, 34 92, 26 114 M58 53 C68 72, 74 92, 82 114"
                stroke="var(--void-amber)"
                strokeWidth="2.1"
                strokeLinecap="round"
              />
            </motion.svg>
          ) : (
            <svg width="66" height="66" viewBox="0 0 96 96" fill="none">
              <rect
                x="4"
                y="4"
                width="88"
                height="88"
                stroke="var(--void-accent)"
                strokeWidth="1.4"
                strokeDasharray="4 4"
              />
              <path
                d="M28 34 L18 48 L28 62 M68 34 L78 48 L68 62 M54 28 L42 68"
                stroke="var(--void-amber)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </InteractiveRailTool>
      </motion.aside>

      {/* Right Rail: Scroll Direction Telemetry + Spinning Filament Spool + 0.4mm Brass Nozzle / HTTP */}
      <motion.aside
        style={{ y: railLagY, rotate: velocityTilt }}
        className="absolute right-3 top-4 flex w-24 flex-col items-center gap-4 min-[1520px]:right-6"
      >
        <div className="w-full border border-[var(--void-border)] bg-[var(--void-surface)]/88 px-2 py-2 text-center font-mono backdrop-blur-xs">
          <div className="text-[10px] font-semibold text-[var(--void-amber)]">
            {scrollDir === 'down' ? 'SCROLL ↓' : scrollDir === 'up' ? 'SCROLL ↑' : 'STANDBY'}
          </div>
          <div className="mt-0.5 text-[9px] tracking-wider text-[var(--void-ink-dim)]">
            BENCH HUD
          </div>
        </div>

        <InteractiveRailTool
          id="spool"
          activeTip={activeTip}
          onToggleTip={toggleTip}
          title="PLA / PETG Spool (Click to Spin)"
          detail="Spins directly with your scroll wheel and velocity. Dual-color & rapid 1-day prints on Flashforge Creator 3 at PITBI."
          alignTip="right"
        >
          <motion.div
            animate={{ rotate: spoolBoost }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            <motion.svg
              style={{ rotate: spoolSpin }}
              width="66"
              height="66"
              viewBox="0 0 112 112"
              fill="none"
            >
              <circle cx="56" cy="56" r="46" stroke="var(--void-amber)" strokeWidth="1.8" />
              <circle
                cx="56"
                cy="56"
                r="34"
                stroke="var(--void-accent)"
                strokeWidth="1.4"
                strokeDasharray="5 5"
              />
              <circle cx="56" cy="56" r="14" stroke="var(--void-amber)" strokeWidth="1.8" />
              <path
                d="M56 10 V22 M56 90 V102 M10 56 H22 M90 56 H102"
                stroke="var(--void-accent)"
                strokeWidth="1.6"
              />
            </motion.svg>
          </motion.div>
        </InteractiveRailTool>

        <InteractiveRailTool
          id="right-tool"
          activeTip={activeTip}
          onToggleTip={toggleTip}
          title={isMakerZone ? '0.4mm IDEX Extruder · 210°C' : '200 OK · Live Edge API'}
          detail={
            isMakerZone
              ? 'Dual-nozzle hotend setup demonstrated live during Project Nexus for student builders.'
              : 'Production apps monitored with Playwright E2E tests and Supabase Realtime CDC.'
          }
          alignTip="right"
        >
          {isMakerZone ? (
            <svg width="64" height="82" viewBox="0 0 104 128" fill="none">
              <rect x="26" y="10" width="52" height="18" stroke="var(--void-accent)" strokeWidth="1.6" />
              <line x1="26" y1="28" x2="78" y2="28" stroke="var(--void-accent)" strokeWidth="1.3" />
              <rect x="34" y="28" width="36" height="14" stroke="var(--void-ink-muted)" strokeWidth="1.3" />
              <rect x="24" y="42" width="56" height="24" stroke="var(--void-amber)" strokeWidth="1.8" />
              <path d="M40 66 H64 L60 80 L54 92 H50 L44 80 Z" stroke="var(--void-amber)" strokeWidth="1.8" />
              <path
                d="M52 96 C52 104, 62 104, 68 104 H88"
                stroke="var(--void-accent)"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
            </svg>
          ) : (
            <svg width="68" height="52" viewBox="0 0 108 76" fill="none">
              <rect x="2" y="2" width="104" height="72" stroke="var(--void-accent)" strokeWidth="1.5" />
              <line x1="2" y1="18" x2="106" y2="18" stroke="var(--void-accent)" strokeWidth="1.3" />
              <circle cx="12" cy="10" r="2.5" fill="var(--void-amber)" />
              <circle cx="22" cy="10" r="2.5" fill="var(--void-accent)" />
              <line x1="12" y1="32" x2="70" y2="32" stroke="var(--void-accent)" strokeWidth="1.6" />
              <line x1="12" y1="45" x2="90" y2="45" stroke="var(--void-ink-muted)" strokeWidth="1.4" />
              <line x1="12" y1="58" x2="54" y2="58" stroke="var(--void-amber)" strokeWidth="1.6" />
            </svg>
          )}
        </InteractiveRailTool>
      </motion.aside>
    </div>
  );
}
