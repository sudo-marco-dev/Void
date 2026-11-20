'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Layers,
  Monitor,
  Smartphone,
  X,
} from 'lucide-react';
import type { PortfolioProject } from '@/data/portfolio';

interface ProjectDrawerProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const [tab, setTab] = useState<'preview' | 'screenshots' | 'specs'>('preview');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [shotIdx, setShotIdx] = useState(0);

  useEffect(() => {
    if (!project) return;

    setFrameLoaded(false);
    setShotIdx(0);
    if (project.embeddable && project.liveUrl) {
      setTab('preview');
    } else if (project.galleryImages && project.galleryImages.length > 0) {
      setTab('screenshots');
    } else {
      setTab('specs');
    }
    setViewportMode(window.innerWidth < 768 ? 'mobile' : 'desktop');

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  const gallery = project?.galleryImages ?? [];
  const activeShot = gallery[shotIdx] ?? gallery[0] ?? null;

  return (
    <AnimatePresence>
      {project ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-project-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Mobile Bottom Sheet (92dvh) / Desktop Centered Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-[92dvh] w-full max-w-6xl flex-col border border-[var(--void-border)] bg-[var(--void-bg)] md:h-[85dvh]"
          >
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--void-border)] bg-[var(--void-surface)] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--void-ink-dim)]">
                  <span className="text-[var(--void-accent)]">{project.index}</span> · {project.category}
                </p>
                <h3
                  id="drawer-project-title"
                  className="truncate text-base font-semibold text-[var(--void-ink)] sm:text-lg"
                >
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-btn-bg)] px-3 font-mono text-xs font-medium text-[var(--void-btn-ink)] transition-colors hover:bg-[var(--void-btn-hover)]"
                  >
                    Open Live Site
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                ) : null}

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-bg)] px-3 font-mono text-xs text-[var(--void-ink)] transition-colors hover:border-[var(--void-border-strong)]"
                >
                  <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span className="hidden sm:inline">GitHub</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close preview"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-secondary)] transition-colors hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Sub-toolbar: Tabs & Desktop/Mobile Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--void-border)] bg-[var(--void-bg)] px-4 py-2 sm:px-6">
              <div className="flex items-center gap-1 font-mono text-xs">
                {project.embeddable && project.liveUrl ? (
                  <button
                    type="button"
                    onClick={() => setTab('preview')}
                    className={`relative min-h-[40px] px-3 transition-colors ${
                      tab === 'preview'
                        ? 'text-[var(--void-ink)]'
                        : 'text-[var(--void-ink-dim)] hover:text-[var(--void-ink)]'
                    }`}
                  >
                    Live Preview
                    {tab === 'preview' ? (
                      <motion.span
                        layoutId="drawer-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--void-accent)]"
                      />
                    ) : null}
                  </button>
                ) : null}

                {gallery.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setTab('screenshots')}
                    className={`relative min-h-[40px] px-3 transition-colors ${
                      tab === 'screenshots'
                        ? 'text-[var(--void-ink)]'
                        : 'text-[var(--void-ink-dim)] hover:text-[var(--void-ink)]'
                    }`}
                  >
                    Screenshots ({gallery.length})
                    {tab === 'screenshots' ? (
                      <motion.span
                        layoutId="drawer-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--void-accent)]"
                      />
                    ) : null}
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => setTab('specs')}
                  className={`relative min-h-[40px] px-3 transition-colors ${
                    tab === 'specs'
                      ? 'text-[var(--void-ink)]'
                      : 'text-[var(--void-ink-dim)] hover:text-[var(--void-ink)]'
                  }`}
                >
                  Specs &amp; Architecture
                  {tab === 'specs' ? (
                    <motion.span
                      layoutId="drawer-tab-indicator"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--void-accent)]"
                    />
                  ) : null}
                </button>
              </div>

              {tab === 'preview' && project.liveUrl ? (
                <div className="flex items-center gap-1 border border-[var(--void-border)] bg-[var(--void-surface)] p-0.5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setViewportMode('mobile')}
                    className={`inline-flex min-h-[34px] items-center gap-1.5 px-2.5 transition-colors ${
                      viewportMode === 'mobile'
                        ? 'bg-[var(--void-border)] text-[var(--void-ink)]'
                        : 'text-[var(--void-ink-muted)] hover:text-[var(--void-ink)]'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportMode('desktop')}
                    className={`inline-flex min-h-[34px] items-center gap-1.5 px-2.5 transition-colors ${
                      viewportMode === 'desktop'
                        ? 'bg-[var(--void-border)] text-[var(--void-ink)]'
                        : 'text-[var(--void-ink-muted)] hover:text-[var(--void-ink)]'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Desktop
                  </button>
                </div>
              ) : null}
            </div>

            {/* Content Viewport */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {tab === 'preview' && project.liveUrl ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div
                    className={`relative flex h-full flex-col overflow-hidden border border-[var(--void-border)] bg-[var(--void-surface)] transition-all duration-300 ${
                      viewportMode === 'mobile' ? 'w-full max-w-[390px]' : 'w-full'
                    }`}
                  >
                    {!frameLoaded ? (
                      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center font-mono text-xs text-[var(--void-ink-muted)]">
                        <span>Connecting to {project.liveUrl}...</span>
                        <span className="text-[11px] text-[var(--void-ink-dim)]">
                          If blocked by an in-app browser, tap Open Live Site above.
                        </span>
                      </div>
                    ) : null}
                    <iframe
                      src={project.liveUrl}
                      title={`${project.title} interactive preview`}
                      onLoad={() => setFrameLoaded(true)}
                      className={`h-full w-full flex-1 border-0 bg-white ${
                        frameLoaded ? 'block' : 'hidden'
                      }`}
                    />
                  </div>
                </div>
              ) : tab === 'screenshots' && activeShot ? (
                <div className="mx-auto max-w-5xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border border-[var(--void-border)] bg-[var(--void-surface)] p-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {gallery.map((shot, idx) => (
                        <button
                          key={shot.src}
                          type="button"
                          onClick={() => setShotIdx(idx)}
                          className={`min-h-[36px] border px-2.5 font-mono text-xs transition-colors ${
                            idx === shotIdx
                              ? 'border-[var(--void-accent)] bg-[var(--void-bg)] text-[var(--void-ink)]'
                              : 'border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-muted)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]'
                          }`}
                        >
                          0{idx + 1} · {shot.title}
                        </button>
                      ))}
                    </div>

                    {gallery.length > 1 ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setShotIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                          aria-label="Previous screenshot"
                          className="inline-flex h-9 w-9 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-muted)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
                        >
                          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setShotIdx((prev) => (prev + 1) % gallery.length)}
                          aria-label="Next screenshot"
                          className="inline-flex h-9 w-9 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-muted)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
                        >
                          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="overflow-hidden border border-[var(--void-border)] bg-[var(--void-bg-alt)]">
                    <img
                      src={activeShot.src}
                      alt={activeShot.title}
                      className="h-auto w-full object-contain"
                    />
                  </div>

                  <div className="border border-[var(--void-border)] bg-[var(--void-surface)] p-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--void-accent)]">
                      {activeShot.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--void-ink-muted)]">
                      {activeShot.caption}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl space-y-6">
                  <div className="border border-[var(--void-border)] bg-[var(--void-surface)] p-5">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--void-ink-dim)]">
                      Overview
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-[var(--void-ink)]">
                      {project.plainSummary}
                    </p>
                  </div>

                  <div className="border border-[var(--void-border)] bg-[var(--void-surface)] p-5">
                    <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--void-ink-muted)]">
                      <Layers className="h-4 w-4 text-[var(--void-accent)]" strokeWidth={1.5} />
                      Key Capabilities &amp; Engineering Highlights
                    </div>
                    <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--void-ink-secondary)]">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-[var(--void-accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-[var(--void-border)] bg-[var(--void-surface)] p-5">
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--void-ink-muted)]">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-[var(--void-border)] bg-[var(--void-bg)] px-3 py-1 font-mono text-xs text-[var(--void-ink-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
