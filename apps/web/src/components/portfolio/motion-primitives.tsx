'use client';

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

function useFineInteractiveMotion(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => {
      const fine = window.matchMedia('(pointer: fine)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnabled(fine && !reduced);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return enabled;
}

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  crosshairs?: boolean;
  maxTilt?: number;
  hoverScale?: number;
  onClick?: () => void;
  onKeyDown?: HTMLAttributes<HTMLDivElement>['onKeyDown'];
  role?: string;
  tabIndex?: number;
}

/** 3D cursor-tilt card with spring recoil and directional spotlight sheen. */
export function TiltCard({
  children,
  className = '',
  crosshairs = false,
  maxTilt = 4.2,
  hoverScale = 1.015,
  onClick,
  onKeyDown,
  role,
  tabIndex,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const interactive = useFineInteractiveMotion();
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0 });

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const springX = useSpring(normX, { stiffness: 260, damping: 24 });
  const springY = useSpring(normY, { stiffness: 260, damping: 24 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setSpot({ x: localX, y: localY });

    if (interactive && rect.width > 0 && rect.height > 0) {
      normX.set(localX / rect.width - 0.5);
      normY.set(localY / rect.height - 0.5);
    }
  }

  function handleMouseLeave() {
    setHovered(false);
    normX.set(0);
    normY.set(0);
  }

  return (
    <div style={{ perspective: interactive ? '1100px' : undefined }} className="h-full">
      <motion.div
        ref={cardRef}
        role={role}
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={interactive ? { rotateX, rotateY } : undefined}
        whileHover={interactive ? { scale: hoverScale, y: -2 } : undefined}
        whileTap={onClick ? { scale: 0.985 } : undefined}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className={`group relative h-full border border-[var(--void-border)] bg-[var(--void-surface)] transition-colors duration-300 hover:border-[var(--void-border-strong)] ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${spot.x}px ${spot.y}px, var(--void-spotlight), transparent 72%)`,
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

        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    </div>
  );
}

/** Pulls CTA links/buttons gently toward the cursor with snappy spring snap-back. */
export function MagneticButton({
  children,
  className = '',
  strength = 7,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const interactive = useFineInteractiveMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 22 });
  const y = useSpring(rawY, { stiffness: 320, damping: 22 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!interactive || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={wrapRef}
      style={interactive ? { x, y } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Tactile pill/badge with playful micro-shake and spring pop on hover/tap. */
export function MicroWiggleBadge({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      whileHover={{
        scale: 1.07,
        y: -2,
        rotate: [0, -2.5, 2.5, -1, 0],
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.94, rotate: 0 }}
      className={`inline-flex cursor-default select-none items-center ${className}`}
    >
      {children}
    </motion.span>
  );
}

export interface StickyChapterProps {
  id: string;
  chapterCode: string;
  index: string;
  label: string;
  title: string;
  narrative: string;
  noteBadge?: ReactNode;
  children: ReactNode;
}

/** Desktop 2-column chapter shell: pinned narrative story column + scrolling cards stage. */
export function StickyChapter({
  id,
  chapterCode,
  index,
  label,
  title,
  narrative,
  noteBadge,
  children,
}: StickyChapterProps) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-4">
          <div className="space-y-4 border-b border-[var(--void-border)] pb-5 lg:sticky lg:top-24 lg:border-b-0 lg:border-l lg:border-[var(--void-border)] lg:pb-0 lg:pl-5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]">
              <span className="text-[var(--void-accent)]">{index}</span>
              <span className="text-[var(--void-ink-dim)]">/</span>
              <span className="text-[var(--void-amber)]">{chapterCode}</span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--void-ink-dim)]">
              {label}
            </p>

            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--void-ink)] sm:text-3xl">
              {title}
            </h2>

            <p className="text-sm leading-relaxed text-[var(--void-ink-muted)] sm:text-base">
              {narrative}
            </p>

            {noteBadge ? <div className="pt-1">{noteBadge}</div> : null}
          </div>
        </aside>

        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

let activeBodyScrollLocks = 0;

/** Reference-counted body scroll lock safe across rapid modal handoffs (e.g. Cmd+K -> Drawer). */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    activeBodyScrollLocks += 1;
    document.body.style.overflow = 'hidden';

    return () => {
      activeBodyScrollLocks = Math.max(0, activeBodyScrollLocks - 1);
      if (activeBodyScrollLocks === 0) {
        document.body.style.overflow = '';
      }
    };
  }, [locked]);
}

/** Razor-thin cutting-mat scroll progress line tracking story advancement. */
export function ChapterProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-[var(--void-accent)]"
    />
  );
}
