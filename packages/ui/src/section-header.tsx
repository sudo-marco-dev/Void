import type { ReactNode } from 'react';

export interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Numbered architectural drafting header with crisp 1px rule. */
export function SectionHeader({
  index,
  label,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 border-b border-[var(--void-border)] pb-5 sm:mb-10 sm:pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--void-ink-dim)]">
            <span className="text-[var(--void-accent)]">{index}</span>
            <span className="mx-2 opacity-50">/</span>
            {label}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--void-ink)] sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--void-ink-muted)] sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
