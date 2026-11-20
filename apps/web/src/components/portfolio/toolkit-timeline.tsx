import { SectionHeader } from '@void/ui';
import { BSIT_TIMELINE, TOOLKIT_GROUPS } from '@/data/portfolio';

export function ToolkitSection() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeader
        index="03"
        label="Tech & Maker Toolkit"
        title="Languages, Frameworks & Lab Equipment"
        description="Tools and technologies applied across live deployments, school systems, IoT builds, and 3D prototyping."
      />

      <div className="grid grid-cols-1 border border-[var(--void-border)] bg-[var(--void-surface)] sm:grid-cols-2 lg:grid-cols-4">
        {TOOLKIT_GROUPS.map((group) => (
          <div
            key={group.heading}
            className="border-b border-[var(--void-border)] p-5 sm:border-r sm:last:border-r-0 sm:p-6 lg:border-b-0"
          >
            <h3 className="mb-4 border-b border-[var(--void-border)] pb-2.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-accent)]">
              {group.heading}
            </h3>
            <ul className="space-y-2 text-sm text-[var(--void-ink-secondary)]">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 bg-[var(--void-ink-dim)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeader
        index="05"
        label="BSIT Progression"
        title="What I Built Through College"
        description="From early programming drills to containerized apps, relational POS systems, real school client deployments, and capstone engineering."
      />

      <div className="border-l border-[var(--void-border)] pl-5 sm:pl-8">
        <ol className="space-y-7">
          {BSIT_TIMELINE.map((milestone, index) => (
            <li key={milestone.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 border border-[var(--void-accent)] bg-[var(--void-bg)] sm:-left-[37px]"
              />
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[var(--void-accent)]">0{index + 1}</span>
                <span className="opacity-40">/</span>
                <span className="uppercase tracking-[0.16em] text-[var(--void-ink-dim)]">
                  {milestone.stage}
                </span>
              </div>
              <h3 className="mt-1 text-base font-semibold text-[var(--void-ink)] sm:text-lg">
                {milestone.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--void-ink-muted)]">
                {milestone.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ToolkitTimeline() {
  return (
    <>
      <ToolkitSection />
      <JourneySection />
    </>
  );
}
