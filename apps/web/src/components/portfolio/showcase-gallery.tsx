'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Box, Cpu, Image as ImageIcon, Layers, Monitor, Printer, X, ZoomIn } from 'lucide-react';
import {
  SHOWCASE_GALLERY,
  type ShowcaseCategory,
  type ShowcaseItem,
} from '@/data/portfolio';

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

type FilterKey = 'all' | ShowcaseCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: '3d-models', label: '3D Models' },
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
  const [filter, setFilter] = useState<FilterKey>('all');
  const [activeItem, setActiveItem] = useState<ShowcaseItem | null>(null);

  const visibleItems =
    filter === 'all'
      ? SHOWCASE_GALLERY
      : SHOWCASE_GALLERY.filter((item) => item.category === filter);

  useEffect(() => {
    if (!activeItem) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeItem]);

  return (
    <div className="mt-8 border border-[var(--void-border)] bg-[var(--void-surface)]">
      <div className="flex flex-col justify-between gap-3 border-b border-[var(--void-border)] px-4 py-4 sm:flex-row sm:items-center sm:px-6">
        <div className="space-y-0.5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-accent)]">
            Visual Showcase · Models, Prints, Wiring &amp; Offline Samples
          </p>
          <p className="text-xs text-[var(--void-ink-muted)] sm:text-sm">
            Samples of CAD models, 3D-printed housings, soldered wiring, and local systems. Tap any item to inspect.
          </p>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-1 border-b border-[var(--void-border)] bg-[var(--void-bg)] px-4 py-2 sm:px-6">
        {FILTERS.map((item) => {
          const active = filter === item.key;
          const count =
            item.key === 'all'
              ? SHOWCASE_GALLERY.length
              : SHOWCASE_GALLERY.filter((entry) => entry.category === item.key).length;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`relative min-h-[40px] px-3 font-mono text-xs transition-colors ${
                active
                  ? 'text-[var(--void-ink)]'
                  : 'text-[var(--void-ink-dim)] hover:text-[var(--void-ink)]'
              }`}
            >
              {item.label} ({count})
              {active ? (
                <motion.span
                  layoutId="showcase-filter-tab"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--void-accent)]"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Responsive Showcase Grid */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
        {visibleItems.map((item) => {
          const CategoryIcon = CATEGORY_ICONS[item.category] ?? Layers;
          const isInteractive3D = Boolean(item.modelSrc);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveItem(item)}
              className="group flex flex-col border border-[var(--void-border)] bg-[var(--void-bg)] text-left transition-colors hover:border-[var(--void-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--void-accent)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--void-border)] bg-[var(--void-bg-alt)]">
                {item.imageSrc ? (
                  <>
                    {item.lightImageSrc ? (
                      <>
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="void-thumb-dark h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <img
                          src={item.lightImageSrc}
                          alt={item.title}
                          className="void-thumb-light h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </>
                    ) : (
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    )}
                    {isInteractive3D ? (
                      <>
                        <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1 border border-[var(--void-border)] bg-[var(--void-header-bg)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink)] backdrop-blur-sm">
                          <Box className="h-3 w-3 text-[var(--void-accent)]" strokeWidth={1.75} />
                          3D CAD
                        </span>
                        <span className="pointer-events-none absolute bottom-2.5 right-2.5 border border-[var(--void-border)] bg-[var(--void-header-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--void-accent)] backdrop-blur-sm">
                          Interactive 3D · {item.partCount ?? 2} Parts →
                        </span>
                      </>
                    ) : null}
                  </>
                ) : (
                  <div className="void-draft-grid flex h-full w-full flex-col justify-between p-3">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                      <span>{item.categoryLabel}</span>
                      <CategoryIcon className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1.5 py-2 text-center">
                      {isInteractive3D ? (
                        <>
                          <Box className="h-7 w-7 text-[var(--void-accent)]" strokeWidth={1.35} />
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink)]">
                            Interactive 3D · {item.partCount ?? 2} Parts
                          </span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-6 w-6 text-[var(--void-ink-dim)]" strokeWidth={1.25} />
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-muted)]">
                            Photo Placeholder
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-[var(--void-border)] pt-2 font-mono text-[10px] text-[var(--void-ink-dim)]">
                      <span>{isInteractive3D ? 'Rotate · X-Ray · Parts' : 'Ready for upload'}</span>
                      {isInteractive3D ? (
                        <span className="text-[var(--void-accent)]">Inspect in 3D →</span>
                      ) : (
                        <ZoomIn className="h-3 w-3 text-[var(--void-accent)]" strokeWidth={1.5} />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-3.5">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[var(--void-ink)] transition-colors group-hover:text-[var(--void-accent)]">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[var(--void-ink-muted)]">
                    {item.caption}
                  </p>
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                  {item.tools}
                </p>
              </div>
            </button>
          );
        })}
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
              <div className="flex items-center justify-between border-b border-[var(--void-border)] px-4 py-3 sm:px-5">
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

              <div className="overflow-y-auto p-4 sm:p-5">
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
                    ) : (
                      <div className="void-draft-grid flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 p-6 text-center">
                        <ImageIcon className="h-10 w-10 text-[var(--void-ink-dim)]" strokeWidth={1.25} />
                        <p className="font-mono text-xs uppercase tracking-widest text-[var(--void-ink)]">
                          Showcase Placeholder Slot
                        </p>
                        <p className="max-w-md font-mono text-xs text-[var(--void-ink-muted)]">
                          Save your image at <span className="text-[var(--void-accent)]">{activeItem.suggestedPath}</span> and set{' '}
                          <span className="text-[var(--void-ink)]">imageSrc</span> in{' '}
                          <span className="text-[var(--void-ink)]">apps/web/src/data/portfolio.ts</span>.
                        </p>
                      </div>
                    )}
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
