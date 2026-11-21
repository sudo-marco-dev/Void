'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Images,
  Layers,
  Presentation,
  X,
  ZoomIn,
} from 'lucide-react';
import { SectionHeader } from '@void/ui';
import {
  CERTIFICATES,
  COMMUNITY_HIGHLIGHTS,
  type CertificateItem,
  type CommunityHighlight,
} from '@/data/portfolio';
import { TiltCard, useBodyScrollLock } from './motion-primitives';

const CARD_ICONS = [Award, Presentation, Layers] as const;

export function CommunitySection() {
  const [activeHighlight, setActiveHighlight] = useState<CommunityHighlight | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);

  useBodyScrollLock(Boolean(activeHighlight || activeCertificate));

  useEffect(() => {
    if (!activeHighlight && !activeCertificate) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveHighlight(null);
        setActiveCertificate(null);
      } else if (activeHighlight && e.key === 'ArrowRight') {
        setPhotoIdx((prev) => (prev + 1) % activeHighlight.photos.length);
      } else if (activeHighlight && e.key === 'ArrowLeft') {
        setPhotoIdx((prev) => (prev - 1 + activeHighlight.photos.length) % activeHighlight.photos.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeHighlight, activeCertificate]);

  function openGallery(item: CommunityHighlight, startIndex = 0) {
    setPhotoIdx(startIndex);
    setActiveHighlight(item);
  }

  function openCertificateById(certId: string) {
    const found = CERTIFICATES.find((c) => c.id === certId);
    if (found) setActiveCertificate(found);
  }

  const activePhoto = activeHighlight
    ? (activeHighlight.photos[photoIdx] ?? activeHighlight.photos[0])
    : null;

  return (
    <section id="community" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeader
        index="04"
        label="Workshops, Awards & Credentials"
        title="Recognition, Workshops & Certificates"
        description="Competition awards, hands-on technical workshops, collaborative studio projects, and verified certificates beyond solo software builds."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {COMMUNITY_HIGHLIGHTS.map((item, idx) => {
          const Icon = CARD_ICONS[idx] ?? Award;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.38, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <TiltCard maxTilt={3.5} hoverScale={1.015} className="h-full">
                <article className="flex h-full flex-col justify-between">
                  <div>
                    <button
                      type="button"
                      onClick={() => openGallery(item, 0)}
                      aria-label={`Inspect photos for ${item.title}`}
                      className="group relative block aspect-[16/10] w-full overflow-hidden border-b border-[var(--void-border)] bg-[var(--void-bg-alt)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--void-accent)]"
                    >
                      <img
                        src={item.coverSrc}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3">
                        <span className="inline-flex items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-header-bg)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink)] backdrop-blur-sm">
                          <Icon className="h-3 w-3 text-[var(--void-accent)]" strokeWidth={1.75} />
                          {item.badge}
                        </span>
                      </div>
                      <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 border border-[var(--void-border)] bg-[var(--void-header-bg)] px-2 py-1 font-mono text-[10px] text-[var(--void-ink)] backdrop-blur-sm">
                        <Images className="h-3 w-3 text-[var(--void-accent)]" strokeWidth={1.5} />
                        {item.photos.length} Photos
                      </span>
                    </button>

                    <div className="space-y-3 p-5 sm:p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--void-ink-dim)]">
                        <span className="text-[var(--void-accent)]">{item.index}</span> · {item.organizer}
                      </p>

                      <h3 className="min-h-[3.25rem] text-lg font-semibold tracking-tight text-[var(--void-ink)]">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
                        {item.summary}
                      </p>

                      <ul className="space-y-1.5 pt-1 text-xs leading-relaxed text-[var(--void-ink-secondary)]">
                        {item.highlights.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 bg-[var(--void-accent)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t border-[var(--void-border)] px-5 py-3.5 sm:px-6">
                    <button
                      type="button"
                      onClick={() => openGallery(item, 0)}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-bg)] px-3 font-mono text-xs text-[var(--void-ink)] transition-colors hover:border-[var(--void-border-strong)]"
                    >
                      <Images className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.5} />
                      Inspect Photos ({item.photos.length})
                    </button>

                    {item.certificateId ? (
                      <button
                        type="button"
                        onClick={() => openCertificateById(item.certificateId!)}
                        className="inline-flex min-h-[40px] items-center justify-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-btn-bg)] px-3 font-mono text-xs font-medium text-[var(--void-btn-ink)] transition-colors hover:bg-[var(--void-btn-hover)]"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                        <span>{item.certificateLabel ?? 'View Certificate'}</span>
                      </button>
                    ) : null}
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* Dedicated Certificates Subsection */}
      <div id="certificates" className="mt-8 border border-[var(--void-border)] bg-[var(--void-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--void-border)] px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--void-ink-muted)]">
            <BadgeCheck className="h-4 w-4 text-[var(--void-accent)]" strokeWidth={1.75} />
            <span>Certificates &amp; Verified Credentials</span>
          </div>
          <span className="font-mono text-xs text-[var(--void-accent)]">
            {CERTIFICATES.length} Verified
          </span>
        </div>

        <div
          className={`grid gap-5 p-4 sm:p-6 ${
            CERTIFICATES.length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className={`grid grid-cols-1 gap-5 border border-[var(--void-border)] bg-[var(--void-bg)] p-4 sm:p-5 ${
                CERTIFICATES.length === 1 ? 'lg:grid-cols-12 lg:items-center' : ''
              }`}
            >
              <div
                onClick={() => setActiveCertificate(cert)}
                onContextMenu={(e) => e.preventDefault()}
                className={`group relative cursor-zoom-in select-none overflow-hidden border border-[var(--void-border)] bg-[var(--void-bg-alt)] transition-colors hover:border-[var(--void-border-strong)] ${
                  CERTIFICATES.length === 1 ? 'aspect-[16/11] lg:col-span-5' : 'aspect-[16/11]'
                }`}
              >
                <img
                  src={cert.previewImage}
                  alt={`${cert.title} certificate`}
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div aria-hidden="true" className="absolute inset-0" />
              </div>

              <div
                className={`flex flex-col justify-between space-y-4 ${
                  CERTIFICATES.length === 1 ? 'lg:col-span-7' : ''
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider">
                    <span className="text-[var(--void-accent)]">{cert.credentialType}</span>
                    <span className="text-[var(--void-ink-dim)]">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--void-ink)] sm:text-xl">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--void-ink-secondary)]">
                    {cert.issuer}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
                    {cert.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveCertificate(cert)}
                    className="inline-flex min-h-[40px] items-center justify-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-btn-bg)] px-4 font-mono text-xs font-medium text-[var(--void-btn-ink)] transition-colors hover:bg-[var(--void-btn-hover)]"
                  >
                    <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Inspect Certificate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Modal Lightbox */}
      <AnimatePresence>
        {activeHighlight && activePhoto ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-lightbox-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setActiveHighlight(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden border border-[var(--void-border)] bg-[var(--void-surface)]"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--void-border)] px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--void-accent)]">
                    {activeHighlight.badge} · {activeHighlight.organizer}
                  </p>
                  <h3
                    id="community-lightbox-title"
                    className="truncate text-base font-semibold text-[var(--void-ink)]"
                  >
                    {activeHighlight.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHighlight(null)}
                  aria-label="Close event gallery"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-secondary)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div
                data-lenis-prevent
                className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--void-border)] bg-[var(--void-bg)]">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.caption}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
                    {activePhoto.caption}
                  </p>
                  {activeHighlight.photos.length > 1 ? (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setPhotoIdx(
                            (prev) => (prev - 1 + activeHighlight.photos.length) % activeHighlight.photos.length,
                          )
                        }
                        aria-label="Previous photo"
                        className="inline-flex h-10 w-10 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-secondary)] hover:border-[var(--void-border-strong)]"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoIdx((prev) => (prev + 1) % activeHighlight.photos.length)}
                        aria-label="Next photo"
                        className="inline-flex h-10 w-10 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-secondary)] hover:border-[var(--void-border-strong)]"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  ) : null}
                </div>

                {activeHighlight.photos.length > 1 ? (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {activeHighlight.photos.map((photo, idx) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setPhotoIdx(idx)}
                        className={`relative aspect-[16/10] overflow-hidden border transition-colors ${
                          idx === photoIdx
                            ? 'border-[var(--void-accent)] ring-1 ring-[var(--void-accent)]'
                            : 'border-[var(--void-border)] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {activeCertificate ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-lightbox-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setActiveCertificate(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden border border-[var(--void-border)] bg-[var(--void-surface)]"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--void-border)] px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--void-accent)]">
                    {activeCertificate.credentialType} · {activeCertificate.date}
                  </p>
                  <h3
                    id="certificate-lightbox-title"
                    className="truncate text-base font-semibold text-[var(--void-ink)]"
                  >
                    {activeCertificate.title}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCertificate(null)}
                    aria-label="Close certificate preview"
                    className="inline-flex h-10 w-10 items-center justify-center border border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-secondary)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div
                data-lenis-prevent
                className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5"
              >
                <div
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative select-none overflow-hidden border border-[var(--void-border)] bg-[var(--void-bg)]"
                >
                  <img
                    src={activeCertificate.previewImage}
                    alt={`${activeCertificate.title} preview`}
                    draggable={false}
                    className="pointer-events-none h-auto w-full object-contain"
                  />
                  <div aria-hidden="true" className="absolute inset-0" />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-xs text-[var(--void-ink-secondary)]">
                    Issued by {activeCertificate.issuer}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
                    {activeCertificate.summary}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
