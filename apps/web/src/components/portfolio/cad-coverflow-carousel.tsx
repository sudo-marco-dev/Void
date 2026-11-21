'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'motion/react';
import { Box, ChevronLeft, ChevronRight, MoveHorizontal, Sparkles } from 'lucide-react';
import type { ShowcaseItem } from '@/data/portfolio';

interface CadCoverflowCarouselProps {
  items: ShowcaseItem[];
  paused?: boolean;
  onSelectModel: (item: ShowcaseItem) => void;
}

const AUTO_ROTATE_INTERVAL_MS = 3500;
const IDLE_RESUME_COOLDOWN_MS = 4000;

function getCircularOffset(index: number, activeIndex: number, length: number): number {
  let diff = index - activeIndex;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

/** Interactive 3D perspective coverflow deck with idle auto-rotation for flipping through Onshape & Fusion .glb CAD models. */
export function CadCoverflowCarousel({
  items,
  paused = false,
  onSelectModel,
}: CadCoverflowCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const stepBy = useCallback(
    (delta: number) => {
      if (!items.length) return;
      setActiveIdx((prev) => (prev + delta + items.length) % items.length);
    },
    [items.length],
  );

  const registerManualAction = useCallback(() => {
    setCooldownUntil(Date.now() + IDLE_RESUME_COOLDOWN_MS);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || paused || isHovered || isFocused || isDragging || items.length <= 1) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const waitMs = Math.max(0, cooldownUntil - Date.now());

    const startTimer = setTimeout(() => {
      if (waitMs > 0) {
        stepBy(1);
      }
      intervalId = setInterval(() => {
        stepBy(1);
      }, AUTO_ROTATE_INTERVAL_MS);
    }, waitMs);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [shouldReduceMotion, paused, isHovered, isFocused, isDragging, cooldownUntil, items.length, stepBy]);

  function handlePanEnd(_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    setIsDragging(false);
    if (info.offset.x < -36 || info.velocity.x < -280) {
      registerManualAction();
      stepBy(1);
    } else if (info.offset.x > 36 || info.velocity.x > 280) {
      registerManualAction();
      stepBy(-1);
    }
  }

  const activeItem = items[activeIdx] ?? items[0];
  if (!activeItem) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border border-[var(--void-border)] bg-[var(--void-surface)]"
    >
      {/* Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--void-border)] px-4 py-3.5 sm:px-6">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-accent)]">
            <Box className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>3D CAD Coverflow Deck · {items.length} Assemblies</span>
          </div>
          <p className="text-xs text-[var(--void-ink-muted)]">
            Auto-rotates cleanly when idle. Drag, click side cards, or tap center to inspect parts &amp; X-Ray in 3D.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="hidden items-center gap-1 border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-1 font-mono text-[10px] text-[var(--void-ink-dim)] sm:inline-flex">
            <MoveHorizontal className="h-3 w-3 text-[var(--void-amber)]" strokeWidth={1.6} />
            SWIPE OR CLICK
          </span>
          <button
            type="button"
            onClick={() => {
              registerManualAction();
              stepBy(-1);
            }}
            aria-label="Previous 3D model"
            className="inline-flex h-10 w-10 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink)] transition-colors hover:border-[var(--void-accent)] hover:text-[var(--void-accent)]"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => {
              registerManualAction();
              stepBy(1);
            }}
            aria-label="Next 3D model"
            className="inline-flex h-10 w-10 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink)] transition-colors hover:border-[var(--void-accent)] hover:text-[var(--void-accent)]"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <motion.div
        tabIndex={0}
        onPanStart={() => {
          setIsDragging(true);
          registerManualAction();
        }}
        onPanEnd={handlePanEnd}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={() => {
          setIsFocused(false);
          registerManualAction();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            registerManualAction();
            stepBy(1);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            registerManualAction();
            stepBy(-1);
          } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectModel(activeItem);
          }
        }}
        style={{ perspective: '1250px' }}
        className="void-draft-grid relative flex h-[368px] cursor-grab select-none items-center justify-center overflow-hidden bg-[var(--void-bg-alt)] px-4 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--void-accent)] sm:h-[420px]"
      >
        {items.map((item, idx) => {
          const offset = getCircularOffset(idx, activeIdx, items.length);
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          const isHidden = absOffset > 2;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => {
                if (isCenter) {
                  onSelectModel(item);
                } else {
                  registerManualAction();
                  setActiveIdx(idx);
                }
              }}
              aria-label={
                isCenter ? `Launch 3D CAD viewer for ${item.title}` : `Focus ${item.title}`
              }
              initial={false}
              animate={{
                x: offset * 175,
                scale: isCenter ? 1 : absOffset === 1 ? 0.82 : 0.66,
                rotateY: offset * -24,
                opacity: isHidden ? 0 : isCenter ? 1 : absOffset === 1 ? 0.68 : 0.3,
                z: isCenter ? 48 : absOffset === 1 ? -60 : -140,
              }}
              whileHover={isCenter ? { scale: 1.02, y: -2 } : { opacity: 0.9 }}
              whileTap={isCenter ? { scale: 0.985 } : undefined}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              style={{
                zIndex: 30 - absOffset * 10,
                pointerEvents: isHidden ? 'none' : 'auto',
                transformStyle: 'preserve-3d',
              }}
              className={`absolute flex h-[258px] w-[250px] flex-col overflow-hidden border bg-[var(--void-surface)] text-left shadow-2xl sm:h-[324px] sm:w-[340px] ${
                isCenter
                  ? 'border-[var(--void-accent)] ring-1 ring-[var(--void-accent)]/40'
                  : 'border-[var(--void-border)]'
              }`}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden border-b border-[var(--void-border)] bg-[var(--void-bg)]">
                {item.imageSrc ? (
                  <>
                    {item.lightImageSrc ? (
                      <>
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          draggable={false}
                          className="void-thumb-dark h-full w-full object-cover"
                        />
                        <img
                          src={item.lightImageSrc}
                          alt={item.title}
                          draggable={false}
                          className="void-thumb-light h-full w-full object-cover"
                        />
                      </>
                    ) : (
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </>
                ) : null}

                <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1 border border-[var(--void-border)] bg-[var(--void-header-bg)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink)] backdrop-blur-sm">
                  <Box className="h-3 w-3 text-[var(--void-accent)]" strokeWidth={1.75} />
                  0{idx + 1} / {items.length}
                </span>

                {isCenter ? (
                  <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 border border-[var(--void-accent)] bg-[var(--void-header-bg)] px-2.5 py-1 font-mono text-[10px] font-medium text-[var(--void-accent)] backdrop-blur-sm">
                    <Sparkles className="h-3 w-3" strokeWidth={1.75} />
                    Inspect 3D · {item.partCount ?? 2} Parts →
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col justify-center px-3 py-2.5 sm:px-3.5 sm:py-3">
                <p className="truncate text-sm font-semibold leading-snug text-[var(--void-ink)]">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                  {item.tools}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Active Assembly Details & Quick Selector Dots */}
      <div className="flex flex-col justify-between gap-4 border-t border-[var(--void-border)] bg-[var(--void-bg)] p-4 sm:flex-row sm:items-center sm:px-6">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
            <span className="text-[var(--void-amber)]">
              ACTIVE MODEL 0{activeIdx + 1}
            </span>
            <span className="text-[var(--void-ink-dim)]">·</span>
            <span className="text-[var(--void-accent)]">
              {activeItem.partCount ?? 2} Interactive Parts
            </span>
          </div>
          <h4 className="text-base font-semibold text-[var(--void-ink)]">
            {activeItem.title}
          </h4>
          <p className="min-h-[3.75rem] max-w-xl text-xs leading-relaxed text-[var(--void-ink-muted)] sm:min-h-[4.25rem] sm:text-sm">
            {activeItem.caption}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-2.5 sm:items-end">
          <button
            type="button"
            onClick={() => onSelectModel(activeItem)}
            className="inline-flex min-h-[42px] items-center justify-center gap-2 border border-[var(--void-border)] bg-[var(--void-btn-bg)] px-4 font-mono text-xs font-medium text-[var(--void-btn-ink)] transition-colors hover:bg-[var(--void-btn-hover)]"
          >
            <Box className="h-3.5 w-3.5" strokeWidth={1.75} />
            Launch 3D CAD Inspector →
          </button>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
            {items.map((item, idx) => {
              const selected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    registerManualAction();
                    setActiveIdx(idx);
                  }}
                  aria-label={`Select 3D model ${idx + 1}: ${item.title}`}
                  className={`min-h-[28px] border px-2 font-mono text-[10px] transition-colors ${
                    selected
                      ? 'border-[var(--void-accent)] bg-[var(--void-surface)] text-[var(--void-accent)]'
                      : 'border-[var(--void-border)] bg-[var(--void-surface)] text-[var(--void-ink-dim)] hover:text-[var(--void-ink)]'
                  }`}
                >
                  0{idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
