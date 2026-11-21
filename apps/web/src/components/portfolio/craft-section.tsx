'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Cpu, Globe, Wrench } from 'lucide-react';
import { OFFERINGS, SIGNAL_FLOW_NODES } from '@/data/portfolio';
import { StickyChapter, TiltCard } from './motion-primitives';
import { ShowcaseGallery } from './showcase-gallery';

const OFFERING_ICONS = [Globe, Cpu, Box] as const;

export function CraftSection() {
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const activeNode = SIGNAL_FLOW_NODES[activeNodeIdx] ?? SIGNAL_FLOW_NODES[0];

  return (
    <div id="craft">
      <StickyChapter
        id="craft-narrative"
        chapterCode="MAKER MAT"
        index="02"
        label="Calipers to Cloud · Act II"
        title="Software, Electronics & 3D Prototyping"
        narrative="Where digital code meets physical hardware: from caliper measurements and Onshape enclosures to dual-nozzle Creator 3 prints and soldered ESP32 telemetry."
        noteBadge={
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
            <span className="inline-flex items-center gap-1 border border-[var(--void-border)] bg-[var(--void-surface)] px-2 py-1 text-[var(--void-amber)]">
              <Wrench className="h-3 w-3" strokeWidth={1.6} />
              0.4MM NOZZLE
            </span>
            <span className="border border-[var(--void-border)] bg-[var(--void-surface)] px-2 py-1 text-[var(--void-accent)]">
              ±0.1MM CALIPER
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {OFFERINGS.map((item, idx) => {
            const Icon = OFFERING_ICONS[idx] ?? Globe;
            return (
              <TiltCard key={item.index} crosshairs maxTilt={4} hoverScale={1.018} className="p-5">
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[var(--void-accent)]">{item.index}</span>
                      <Icon className="h-4 w-4 text-[var(--void-ink-muted)]" strokeWidth={1.5} />
                    </div>
                    <h3 className="min-h-[3rem] text-base font-semibold tracking-tight text-[var(--void-ink)]">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--void-ink-muted)] sm:text-sm">
                      {item.plainEnglish}
                    </p>
                  </div>
                  <p className="mt-5 min-h-[2.75rem] border-t border-[var(--void-border)] pt-3 font-mono text-[10px] leading-relaxed text-[var(--void-ink-dim)]">
                    {item.techProof}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Interactive Physical-to-Cloud Signal Flow */}
        <div className="mt-6 border border-[var(--void-border)] bg-[var(--void-surface)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--void-border)] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-ink-muted)] sm:px-5">
            <span>Physical-to-Cloud Signal Flow · Onshape + PITBI @ PSU</span>
            <span className="text-[11px] text-[var(--void-amber)]">Tap a stage to inspect</span>
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--void-border)] sm:grid-cols-4 sm:divide-y-0">
            {SIGNAL_FLOW_NODES.map((node, idx) => {
              const active = idx === activeNodeIdx;
              return (
                <button
                  key={node.step}
                  type="button"
                  onClick={() => setActiveNodeIdx(idx)}
                  className="relative flex flex-col items-start gap-1 p-3.5 text-left transition-colors hover:bg-[var(--void-surface-hover)] sm:p-4"
                >
                  {active ? (
                    <motion.span
                      layoutId="signal-flow-active"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="pointer-events-none absolute inset-0 border border-[var(--void-accent)] bg-[var(--void-bg)]"
                    />
                  ) : null}
                  <span
                    className={`relative z-10 font-mono text-[10px] uppercase tracking-widest ${
                      active ? 'text-[var(--void-accent)]' : 'text-[var(--void-ink-dim)]'
                    }`}
                  >
                    {node.step}
                  </span>
                  <span className="relative z-10 text-sm font-semibold text-[var(--void-ink)]">
                    {node.shortTitle}
                  </span>
                  <span className="relative z-10 font-mono text-[10px] text-[var(--void-ink-muted)]">
                    {node.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-[var(--void-border)] bg-[var(--void-bg)] p-4 sm:p-5 lg:grid-cols-12 lg:items-center">
            <div className="space-y-1.5 lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--void-amber)]">
                {activeNode.stageLabel}
              </p>
              <h4 className="text-base font-semibold text-[var(--void-ink)]">{activeNode.tool}</h4>
              <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
                {activeNode.detail}
              </p>
            </div>

            <dl className="space-y-2 border border-[var(--void-border)] bg-[var(--void-surface)] p-3 font-mono text-[11px] lg:col-span-5">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[var(--void-ink-dim)]">INPUT</dt>
                <dd className="text-right text-[var(--void-ink-secondary)]">{activeNode.input}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-[var(--void-border-subtle)] pt-2">
                <dt className="text-[var(--void-ink-dim)]">OUTPUT</dt>
                <dd className="text-right text-[var(--void-ink-secondary)]">{activeNode.output}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-[var(--void-border-subtle)] pt-2">
                <dt className="text-[var(--void-ink-dim)]">PROOF</dt>
                <dd className="text-right text-[var(--void-accent)]">{activeNode.proof}</dd>
              </div>
            </dl>
          </div>
        </div>
      </StickyChapter>

      {/* Full-Width 3D Coverflow CAD Deck & Filterable Craft Shelf */}
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
        <ShowcaseGallery />
      </div>
    </div>
  );
}
