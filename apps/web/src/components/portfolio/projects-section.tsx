'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Box, Code2, Eye, Lock } from 'lucide-react';
import {
  FLAGSHIP_PROJECTS,
  MORE_BUILDS,
  type PortfolioProject,
  type SecondaryBuild,
} from '@/data/portfolio';
import { LivePreviewCard } from './live-preview-card';
import { StickyChapter } from './motion-primitives';
import { ProjectDrawer } from './project-drawer';

function buildToProject(item: SecondaryBuild, index: number): PortfolioProject {
  return {
    id: item.title.toLowerCase().replace(/\s+/g, '-'),
    index: `0${index + 5}`,
    title: item.title,
    category: item.kind,
    plainSummary: item.summary,
    highlights: [item.summary, `Status: ${item.statusLabel}`],
    stack: item.stack,
    liveUrl: item.liveUrl,
    repoUrl: item.repoUrl,
    embeddable: item.embeddable,
    previewNote: item.statusLabel,
    cadShowcaseId: item.cadShowcaseId,
    cadLabel: item.cadLabel,
  };
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const onOpenProject = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found = FLAGSHIP_PROJECTS.find((p) => p.id === id);
      if (found) setSelected(found);
    };
    window.addEventListener('void:open-project', onOpenProject);
    return () => window.removeEventListener('void:open-project', onOpenProject);
  }, []);

  return (
    <StickyChapter
      id="work"
      chapterCode="CODE ZONE"
      index="01"
      label="Selected Works · Act I"
      title="Deployed Systems, POS & Live Builds"
      narrative="Every project started with a real operational bottleneck at Palawan State University or a partner school, engineered from schema design to deployed hardware bridges."
      noteBadge={
        <span className="inline-flex items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--void-ink-muted)]">
          <Code2 className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.6} />
          <span>src/deployments · main</span>
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FLAGSHIP_PROJECTS.map((project) => (
          <LivePreviewCard
            key={project.id}
            project={project}
            hidePreview={Boolean(selected)}
            onInspect={(proj) => setSelected(proj)}
          />
        ))}
      </div>

      {/* More Builds & Hardware Lab */}
      <div className="mt-8 border border-[var(--void-border)] bg-[var(--void-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--void-border)] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-ink-muted)] sm:px-5">
          <span>More Builds &amp; Hardware Lab</span>
          <span className="text-[var(--void-ink-dim)]">{MORE_BUILDS.length} Repos</span>
        </div>

        <div className="divide-y divide-[var(--void-border)]">
          {MORE_BUILDS.map((item, idx) => (
            <div
              key={item.title}
              className="flex flex-col justify-between gap-4 px-4 py-4 transition-colors hover:bg-[var(--void-surface-hover)] sm:flex-row sm:items-center sm:px-5"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-medium text-[var(--void-ink)] sm:text-base">
                    {item.title}
                  </h3>
                  <span className="border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-muted)]">
                    {item.kind}
                  </span>
                </div>
                <p className="text-sm text-[var(--void-ink-muted)]">{item.summary}</p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {item.cadShowcaseId ? (
                  <button
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent('void:open-showcase', { detail: item.cadShowcaseId }),
                      )
                    }
                    className="inline-flex min-h-[40px] items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-bg)] px-3 font-mono text-xs text-[var(--void-amber)] transition-colors hover:border-[var(--void-amber)]"
                  >
                    <Box className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {item.cadLabel ?? '3D Model'}
                  </button>
                ) : null}

                {item.embeddable && item.liveUrl ? (
                  <button
                    type="button"
                    onClick={() => setSelected(buildToProject(item, idx))}
                    className="inline-flex min-h-[40px] items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-bg)] px-3 font-mono text-xs text-[var(--void-accent)] transition-colors hover:border-[var(--void-accent)]"
                  >
                    <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Live Preview
                  </button>
                ) : item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-1 border border-[var(--void-border)] bg-[var(--void-bg)] px-3 font-mono text-xs text-[var(--void-ink-secondary)] hover:border-[var(--void-border-strong)]"
                  >
                    {item.statusLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                ) : item.statusLabel === 'Private Vercel' ? (
                  <span className="inline-flex min-h-[40px] items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-bg)] px-3 font-mono text-xs text-[var(--void-ink-dim)]">
                    <Lock className="h-3 w-3 text-[var(--void-amber)]" strokeWidth={1.5} />
                    Private Vercel
                  </span>
                ) : null}

                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1 border border-[var(--void-border)] bg-[var(--void-bg)] px-3 font-mono text-xs text-[var(--void-ink-secondary)] transition-colors hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
                >
                  Source
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </StickyChapter>
  );
}
