import { Box, Cpu, Globe } from 'lucide-react';
import { SectionHeader, SpotlightCard } from '@void/ui';
import { MAKER_PIPELINE, OFFERINGS } from '@/data/portfolio';
import { ShowcaseGallery } from './showcase-gallery';

const OFFERING_ICONS = [Globe, Cpu, Box] as const;

export function CraftSection() {
  return (
    <section id="craft" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeader
        index="02"
        label="What I Offer & Maker Craft"
        title="Software, Electronics & 3D Prototyping"
        description="Built to make sense whether you are hiring for a tech team or launching a real business system, combining clean web software with hands-on hardware and 3D fabrication."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {OFFERINGS.map((item, idx) => {
          const Icon = OFFERING_ICONS[idx] ?? Globe;
          return (
            <SpotlightCard key={item.index} crosshairs className="flex h-full flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--void-accent)]">{item.index}</span>
                  <Icon className="h-4 w-4 text-[var(--void-ink-muted)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--void-ink)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
                  {item.plainEnglish}
                </p>
              </div>
              <p className="mt-6 border-t border-[var(--void-border)] pt-3 font-mono text-[11px] leading-relaxed text-[var(--void-ink-dim)]">
                {item.techProof}
              </p>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Physical-to-Digital Workflow Strip */}
      <div className="mt-8 border border-[var(--void-border)] bg-[var(--void-surface)]">
        <div className="border-b border-[var(--void-border)] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-ink-muted)] sm:px-6">
          Physical Prototyping Pipeline · Onshape + PITBI @ PSU
        </div>
        <div className="grid grid-cols-1 divide-y divide-[var(--void-border)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {MAKER_PIPELINE.map((stage) => (
            <div key={stage.step} className="space-y-2 p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--void-accent)]">
                {stage.step}
              </p>
              <h4 className="text-sm font-semibold text-[var(--void-ink)]">{stage.tool}</h4>
              <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">{stage.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <ShowcaseGallery />
    </section>
  );
}
