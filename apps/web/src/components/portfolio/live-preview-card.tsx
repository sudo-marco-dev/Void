'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Layers, Monitor } from 'lucide-react';
import type { PortfolioProject } from '@/data/portfolio';

interface LivePreviewCardProps {
  project: PortfolioProject;
  hidePreview?: boolean;
  onInspect: (project: PortfolioProject) => void;
}

const MONITOR_W = 1440;
const MONITOR_H = 900;

export function LivePreviewCard({
  project,
  hidePreview = false,
  onInspect,
}: LivePreviewCardProps) {
  const frameBoxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.37);
  const [inView, setInView] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [offscreenAbove, setOffscreenAbove] = useState(false);

  useEffect(() => {
    const el = frameBoxRef.current;
    if (!el) return;

    const updateScale = (width: number) => {
      if (width > 0) {
        setScale(width / MONITOR_W);
      }
    };

    updateScale(el.getBoundingClientRect().width);

    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      updateScale(width);
    });
    ro.observe(el);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '120px' },
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = frameBoxRef.current;
    if (!el || !project.embeddable) {
      setOffscreenAbove(false);
      return;
    }

    let rafId = 0;
    const checkPosition = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      // Only hide once the preview frame has scrolled completely past the 64px sticky navbar.
      setOffscreenAbove(rect.bottom <= 64);
    };
    const onScrollOrResize = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(checkPosition);
      }
    };

    checkPosition();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [project.embeddable]);

  useEffect(() => {
    if (hidePreview) {
      setIframeLoaded(false);
    }
  }, [hidePreview]);

  const isEmbeddable = project.embeddable && Boolean(project.liveUrl);
  const isHidden = hidePreview || offscreenAbove;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onInspect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect(project);
        }
      }}
      className="group relative flex h-full cursor-pointer flex-col border border-[var(--void-border)] bg-[var(--void-surface)] transition-colors duration-300 hover:border-[var(--void-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--void-accent)]"
    >
      {/* Browser chrome preview frame */}
      <div className="border-b border-[var(--void-border)] bg-[var(--void-bg)]">
        <div className="flex items-center justify-between border-b border-[var(--void-border)] px-3 py-2 font-mono text-[11px] text-[var(--void-ink-dim)]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--void-border-strong)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--void-border-strong)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--void-border-strong)]" />
            <span className="ml-2 max-w-[180px] truncate sm:max-w-[230px]">
              {project.liveUrl
                ? project.liveUrl.replace(/^https?:\/\//, '')
                : project.previewImage
                  ? 'local · nextjs + postgresql'
                  : 'github.com/sudo-marco-dev'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[var(--void-ink-muted)]">
            {project.embeddable ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--void-live)]" />
                Live
              </>
            ) : project.previewImage ? (
              'Local System'
            ) : (
              'Architecture'
            )}
          </span>
        </div>

        <div
          ref={frameBoxRef}
          className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--void-bg-alt)]"
          style={{
            contain: 'strict',
            clipPath: 'inset(0)',
            isolation: 'isolate',
          }}
        >
          {isEmbeddable ? (
            <>
              {!iframeLoaded ? (
                <div className="void-draft-grid absolute inset-0 z-10 flex flex-col justify-between bg-[var(--void-bg-alt)] p-4 sm:p-5">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--void-ink-dim)]">
                    <span>Loading Desktop Preview</span>
                    <Monitor className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-xs text-[var(--void-accent)]">
                      {project.previewNote}
                    </p>
                    <p className="text-sm font-medium text-[var(--void-ink)]">{project.title}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--void-border)] pt-2.5 font-mono text-[11px] text-[var(--void-ink-muted)]">
                    <span>1440×900 Monitor View</span>
                    <span className="text-[var(--void-accent)]">Inspect →</span>
                  </div>
                </div>
              ) : null}

              {inView && !hidePreview && project.liveUrl ? (
                <iframe
                  src={project.liveUrl}
                  title={`${project.title} live desktop preview`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setIframeLoaded(true)}
                  className="pointer-events-none absolute left-0 top-0 block border-0 bg-[var(--void-bg-alt)] transition-opacity duration-300"
                  style={{
                    width: MONITOR_W,
                    height: MONITOR_H,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    opacity: iframeLoaded && !isHidden ? 1 : 0,
                    visibility: isHidden ? 'hidden' : 'visible',
                  }}
                />
              ) : null}
            </>
          ) : project.previewImage ? (
            /* Captured local deployment preview for non-hosted systems */
            <div className="relative h-full w-full overflow-hidden bg-[var(--void-bg-alt)]">
              <img
                src={project.previewImage}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            /* Schematic architecture preview for non-deployed repos */
            <div className="void-draft-grid flex h-full w-full flex-col justify-between p-4 sm:p-5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--void-ink-dim)]">
                <span>System Blueprint</span>
                <Layers className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.5} />
              </div>

              {project.schematicModules ? (
                <div className="grid grid-cols-2 gap-2">
                  {project.schematicModules.map((mod) => (
                    <div
                      key={mod}
                      className="border border-[var(--void-border)] bg-[var(--void-surface)] px-2.5 py-2 font-mono text-[11px] text-[var(--void-ink-secondary)]"
                    >
                      {mod}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <p className="font-mono text-xs text-[var(--void-accent)]">{project.previewNote}</p>
                  <p className="text-sm font-medium text-[var(--void-ink)]">{project.title}</p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-[var(--void-border)] pt-2.5 font-mono text-[11px] text-[var(--void-ink-muted)]">
                <span>Case Study + Repo</span>
                <span className="text-[var(--void-accent)]">Inspect →</span>
              </div>
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(to top, var(--void-bg), transparent)',
            }}
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 font-mono text-xs">
            <span className="text-[var(--void-ink-dim)]">
              <span className="text-[var(--void-accent)]">{project.index}</span>
              <span className="mx-1.5 opacity-50">/</span>
              {project.category}
            </span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-[var(--void-ink)] transition-colors group-hover:text-[var(--void-accent)] sm:text-xl">
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
            {project.plainSummary}
          </p>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-1 font-mono text-[11px] text-[var(--void-ink-secondary)]"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 ? (
              <span className="border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-1 font-mono text-[11px] text-[var(--void-ink-dim)]">
                +{project.stack.length - 5}
              </span>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-[var(--void-border)] pt-3.5 font-mono text-xs">
            <span className="text-[var(--void-ink)] transition-colors group-hover:text-[var(--void-accent)]">
              {project.embeddable
                ? 'Open Interactive Preview →'
                : project.galleryImages?.length
                  ? 'Open Screenshots & Specs →'
                  : 'View System Breakdown →'}
            </span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Open ${project.title} live site in a new tab`}
                className="inline-flex min-h-[36px] items-center gap-1 px-2 text-[var(--void-ink-muted)] hover:text-[var(--void-ink)]"
              >
                Live
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
