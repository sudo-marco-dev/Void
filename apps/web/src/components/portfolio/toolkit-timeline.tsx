'use client';

import { motion } from 'motion/react';
import { BSIT_TIMELINE, TOOLKIT_GROUPS } from '@/data/portfolio';
import { StickyChapter, TiltCard } from './motion-primitives';

export function ToolkitSection() {
  return (
    <StickyChapter
      id="stack"
      chapterCode="TOOLKIT"
      index="03"
      label="Tech & Maker Stack · Act III"
      title="Languages, Frameworks & Lab Equipment"
      narrative="Tools applied across deployed web platforms, relational schemas, embedded ESP32 firmware, and rapid 3D fabrication."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {TOOLKIT_GROUPS.map((group) => (
          <TiltCard key={group.heading} maxTilt={2.5} hoverScale={1.01} className="flex flex-col p-5">
            <h3 className="mb-3.5 border-b border-[var(--void-border)] pb-2.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-accent)]">
              {group.heading}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center border border-[var(--void-border)] bg-[var(--void-bg)] px-2.5 py-1.5 font-mono text-xs text-[var(--void-ink-secondary)] transition-colors hover:border-[var(--void-accent)] hover:text-[var(--void-ink)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </StickyChapter>
  );
}

export function JourneySection() {
  return (
    <StickyChapter
      id="journey"
      chapterCode="TIMELINE"
      index="05"
      label="BSIT Progression · Act V"
      title="What I Built Through College"
      narrative="From early Python drills and Sui Move cohorts to containerized services, POS ledgers, real school hardware, and capstone engineering."
    >
      <div className="border-l border-[var(--void-border)] pl-5 sm:pl-7">
        <ol className="space-y-6">
          {BSIT_TIMELINE.map((milestone, index) => (
            <motion.li
              key={milestone.title}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative border border-[var(--void-border)] bg-[var(--void-surface)] p-4 transition-colors hover:border-[var(--void-border-strong)] sm:p-5"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[25px] top-5 h-2.5 w-2.5 border border-[var(--void-accent)] bg-[var(--void-bg)] sm:-left-[33px]"
              />
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[var(--void-accent)]">0{index + 1}</span>
                <span className="opacity-40">/</span>
                <span className="uppercase tracking-[0.16em] text-[var(--void-amber)]">
                  {milestone.stage}
                </span>
              </div>
              <h3 className="mt-1.5 text-base font-semibold text-[var(--void-ink)] sm:text-lg">
                {milestone.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--void-ink-muted)]">
                {milestone.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </StickyChapter>
  );
}
