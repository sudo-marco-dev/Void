'use client';

import { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { SectionHeader } from '@void/ui';
import {
  FLAGSHIP_PROJECTS,
  MORE_BUILDS,
  type PortfolioProject,
  type SecondaryBuild,
} from '@/data/portfolio';
import { LivePreviewCard } from './live-preview-card';
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
  };
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeader
        index="01"
        label="Selected Works"
        title="Deployed Systems, POS & Live Builds"
        description="Real projects from Palawan State University, client school deployments, and web tools. Tap any card to inspect live previews or technical architecture."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
      <div className="mt-10 border border-[var(--void-border)] bg-[var(--void-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--void-border)] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-ink-muted)] sm:px-6">
          <span>More Builds &amp; Hardware Lab</span>
          <span className="text-[var(--void-ink-dim)]">{MORE_BUILDS.length} Repos</span>
        </div>

        <div className="divide-y divide-[var(--void-border)]">
          {MORE_BUILDS.map((item, idx) => (
            <div
              key={item.title}
              className="flex flex-col justify-between gap-4 px-4 py-4 transition-colors hover:bg-[var(--void-surface-hover)] sm:flex-row sm:items-center sm:px-6"
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
    </section>
  );
}
