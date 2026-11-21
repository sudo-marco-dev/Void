'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Box, Cpu, Image as ImageIcon, Layers, Monitor, Printer, X, ZoomIn } from 'lucide-react';
import {
  SHOWCASE_GALLERY,
  type ShowcaseCategory,
  type ShowcaseItem,
} from '@/data/portfolio';
import { CadCoverflowCarousel } from './cad-coverflow-carousel';
import { TiltCard, useBodyScrollLock } from './motion-primitives';

const CadModelViewer = dynamic(
  () => import('./cad-model-viewer').then((mod) => mod.CadModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="void-draft-grid flex h-[340px] w-full flex-col items-center justify-center gap-2 border border-[var(--void-border)] bg-[var(--void-bg-alt)] font-mono text-xs text-[var(--void-ink-muted)] sm:h-[420px]">
        <Box className="h-6 w-6 text-[var(--void-accent)]" strokeWidth={1.5} />
        <span>Initializing 3D CAD workspace...</span>
      </div>
    ),
  },
);

type CraftFilterKey = 'all-craft' | Exclude<ShowcaseCategory, '3d-models'>;

const CRAFT_FILTERS: { key: CraftFilterKey; label: string }[] = [
  { key: 'all-craft', label: 'All Craft' },
  { key: '3d-prints', label: '3D Prints' },
  { key: 'hardware', label: 'Wiring & Hardware' },
  { key: 'offline-apps', label: 'Offline Apps' },
];

const CATEGORY_ICONS: Record<ShowcaseCategory, typeof Box> = {
  '3d-models': Box,
  '3d-prints': Printer,
  hardware: Cpu,
  'offline-apps': Monitor,
};

export function ShowcaseGallery() {
  const [craftFilter, setCraftFilter] = useState<CraftFilterKey>('all-craft');
  const [activeItem, setActiveItem] = useState<ShowcaseItem | null>(null);

  const cadModels = useMemo(
    () => SHOWCASE_GALLERY.filter((item) => item.category === '3d-models'),
    [],
  );

  const craftItems = useMemo(
    () => SHOWCASE_GALLERY.filter((item) => item.category !== '3d-models'),
    [],
  );

  const visibleCraft =
    craftFilter === 'all-craft'
      ? craftItems
      : craftItems.filter((item) => item.category === craftFilter);

  useEffect(() => {
    const onOpenShowcase = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found = SHOWCASE_GALLERY.find((item) => item.id === id);
      if (found) {
        if (found.category !== '3d-models') {
          setCraftFilter(found.category);
        }
        setActiveItem(found);
      }
    };
    window.addEventListener('void:open-showcase', onOpenShowcase);
    return () => window.removeEventListener('void:open-showcase', onOpenShowcase);
  }, []);

  useBodyScrollLock(Boolean(activeItem));

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeItem]);

  return (
    <div id="showcase" className="mt-8 space-y-8">
      {/* 1. Interactive 3D CAD Coverflow Deck */}
      <CadCoverflowCarousel
        items={cadModels}
        paused={Boolean(activeItem)}
        onSelectModel={setActiveItem}
      />

      {/* 2. Filterable Physical Craft & Local Builds Shelf */}
      <div className="border border-[var(--void-border)] bg-[var(--void-surface)]">
        <div className="flex flex-col justify-between gap-2 border-b border-[var(--void-border)] px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <div className="space-y-0.5">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-amber)]">
              Physical Craft, Wiring &amp; Offline Systems ({craftItems.length})
            </p>
            <p className="text-xs text-[var(--void-ink-muted)] sm:text-sm">
              Dual-nozzle Creator 3 prints, soldered ESP32 hardware, and seeded POS screens. Tap any card to zoom.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 border-b border-[var(--void-border)] bg-[var(--void-bg)] px-4 py-2 sm:px-6">
          {CRAFT_FILTERS.map((item) => {
            const active = craftFilter === item.key;
            const count =
              item.key === 'all-craft'
                ? craftItems.length
                : craftItems.filter((entry) => entry.category === item.key).length;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setCraftFilter(item.key)}
                className={`relative min-h-[40px] px-3 font-mono text-xs transition-colors ${
                  active
                    ? 'text-[var(--void-ink)]'
                    : 'text-[var(--void-ink-dim)] hover:text-[var(--void-ink)]'
                }`}
              >
                {item.label} ({count})
                {active ? (
                  <motion.span
                    layoutId="craft-filter-tab"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--void-amber)]"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          {visibleCraft.map((item) => {
            const CategoryIcon = CATEGORY_ICONS[item.category] ?? Layers;
            return (
              <TiltCard key={item.id} maxTilt={4.5} hoverScale={1.02} className="bg-[var(--void-bg)]">
                <button
                  type="button"
                  onClick={() => setActiveItem(item)}
                  className="flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--void-accent)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--void-border)] bg-[var(--void-bg-alt)]">
                    {item.imageSrc ? (
                      <>
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 border border-[var(--void-border)] bg-[var(--void-header-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--void-ink)] opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                          <ZoomIn className="h-3 w-3 text-[var(--void-accent)]" strokeWidth={1.6} />
                          Zoom
                        </span>
                      </>
                    ) : (
                      <div className="void-draft-grid flex h-full w-full flex-col justify-between p-3">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                          <span>{item.categoryLabel}</span>
                          <CategoryIcon className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1.5 py-2 text-center">
                          <ImageIcon className="h-6 w-6 text-[var(--void-ink-dim)]" strokeWidth={1.25} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-3.5">
                    <div className="space-y-1">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--void-accent)]">
                        {item.categoryLabel}
                      </p>
                      <h4 className="text-sm font-semibold text-[var(--void-ink)] transition-colors group-hover:text-[var(--void-accent)]">
                        {item.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-[var(--void-ink-muted)]">
                        {item.caption}
                      </p>
                    </div>
                    <p className="mt-3 border-t border-[var(--void-border)] pt-2.5 font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                      {item.tools}
                    </p>
                  </div>
                </button>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Tap-to-Zoom Lightbox / Interactive 3D CAD Modal */}
      <AnimatePresence>
        {activeItem ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="showcase-lightbox-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className={`relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden border border-[var(--void-border)] bg-[var(--void-surface)] ${
                activeItem.modelSrc ? 'max-w-4xl' : 'max-w-2xl'
              }`}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--void-border)] px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--void-accent)]">
                    {activeItem.categoryLabel} · {activeItem.tools}
                  </p>
                  <h3
                    id="showcase-lightbox-title"
                    className="truncate text-base font-semibold text-[var(--void-ink)]"
                  >
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  aria-label="Close showcase preview"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-secondary)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div
                data-lenis-prevent
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5"
              >
                {activeItem.modelSrc ? (
                  <CadModelViewer
                    modelSrc={activeItem.modelSrc}
                    modelConfig={activeItem.modelConfig}
                    partCount={activeItem.partCount}
                    title={activeItem.title}
                  />
                ) : (
                  <div className="flex max-h-[62dvh] w-full items-center justify-center overflow-hidden border border-[var(--void-border)] bg-[var(--void-bg)]">
                    {activeItem.imageSrc ? (
                      <img
                        src={activeItem.imageSrc}
                        alt={activeItem.title}
                        className="max-h-[62dvh] w-full object-contain"
                      />
                    ) : null}
                  </div>
                )}

                <p className="mt-4 text-sm leading-relaxed text-[var(--void-ink-muted)]">
                  {activeItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
