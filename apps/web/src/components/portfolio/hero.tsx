'use client';

import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, User } from 'lucide-react';
import { PROFILE } from '@/data/portfolio';
import { CuttingMatRulerBar } from './cutting-mat-overlay';
import { MagneticButton, MicroWiggleBadge, TiltCard } from './motion-primitives';

const SPEC_ROWS = [
  { label: 'Academic', value: `${PROFILE.degree} · PSU` },
  { label: 'Web Stack', value: 'Next.js · React · Supabase' },
  { label: 'Hardware', value: 'ESP32 / CAM · Soldering' },
  { label: '3D CAD', value: 'Onshape · Creator 3 (PITBI)' },
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:pt-14"
    >
      <CuttingMatRulerBar />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 lg:col-span-7"
        >
          <div className="flex flex-wrap items-center gap-2">
            <MicroWiggleBadge className="border border-[var(--void-border)] bg-[var(--void-surface)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--void-ink-muted)]">
              <span>{PROFILE.fullName}</span>
              <span className="mx-2 opacity-40">·</span>
              <span className="text-[var(--void-ink)]">BSIT 4th Year</span>
            </MicroWiggleBadge>
            <MicroWiggleBadge className="gap-2 border border-[var(--void-border)] bg-[var(--void-surface)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--void-amber)]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--void-live)]"
                aria-hidden="true"
              />
              <span>{PROFILE.shortAvailability}</span>
            </MicroWiggleBadge>
          </div>

          <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--void-ink)] sm:text-5xl">
            {PROFILE.headline}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[var(--void-ink-muted)] sm:text-lg">
            {PROFILE.subheadline}
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <MagneticButton className="w-full sm:w-auto">
              <a
                href="#work"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[var(--void-btn-bg)] px-5 py-2.5 text-sm font-medium text-[var(--void-btn-ink)] transition-colors hover:bg-[var(--void-btn-hover)] sm:w-auto"
              >
                Preview Featured Work
                <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <a
                href="#contact"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-[var(--void-border)] bg-[var(--void-surface)] px-5 py-2.5 text-sm font-medium text-[var(--void-ink)] transition-colors hover:border-[var(--void-border-strong)] sm:w-auto"
              >
                Contact &amp; Inquiries
                <ArrowRight className="h-4 w-4 text-[var(--void-accent)]" strokeWidth={1.75} />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <TiltCard crosshairs maxTilt={3.5} hoverScale={1.01} className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--void-border)] pb-3 font-mono text-xs">
              <span className="uppercase tracking-[0.16em] text-[var(--void-ink-muted)]">
                Workbench Spec · 1:1
              </span>
              <span className="text-[var(--void-amber)]">REV.05 · 2026</span>
            </div>

            {/* Embedded Headshot + Identity Row */}
            <div className="mb-5 flex items-center gap-4 border-b border-[var(--void-border-subtle)] pb-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-[var(--void-border)] bg-[var(--void-bg)] sm:h-20 sm:w-20">
                {PROFILE.headshotSrc ? (
                  <img
                    src={PROFILE.headshotSrc}
                    alt={`${PROFILE.fullName} portrait`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="void-draft-grid flex h-full w-full flex-col items-center justify-center gap-1 text-center">
                    <User className="h-5 w-5 text-[var(--void-ink-muted)]" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              <div className="min-w-0 space-y-1">
                <p className="truncate text-base font-semibold text-[var(--void-ink)]">
                  {PROFILE.fullName}
                </p>
                <p className="font-mono text-xs text-[var(--void-accent)]">
                  @{PROFILE.handle}
                </p>
                <p className="text-xs text-[var(--void-ink-muted)]">{PROFILE.location}</p>
              </div>
            </div>

            <dl className="space-y-3 text-xs sm:text-sm">
              {SPEC_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--void-border-subtle)] pb-2.5 last:border-b-0 last:pb-0"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-[var(--void-ink-dim)]">
                    {row.label}
                  </dt>
                  <dd className="text-right font-medium text-[var(--void-ink-secondary)]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--void-border)] pt-4 text-center font-mono">
              <MicroWiggleBadge className="w-full flex-col border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-2">
                <div className="text-sm font-semibold tabular-nums text-[var(--void-ink)]">4+</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                  Live Vercel
                </div>
              </MicroWiggleBadge>
              <MicroWiggleBadge className="w-full flex-col border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-2">
                <div className="text-sm font-semibold tabular-nums text-[var(--void-accent)]">
                  6 GLB
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                  3D CAD
                </div>
              </MicroWiggleBadge>
              <MicroWiggleBadge className="w-full flex-col border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-2">
                <div className="text-sm font-semibold tabular-nums text-[var(--void-amber)]">
                  ESP32
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                  IoT + Print
                </div>
              </MicroWiggleBadge>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
