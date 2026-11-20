'use client';

import { useState } from 'react';
import { Check, Copy, Github, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_LINKS, PROFILE } from '@/data/portfolio';

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_LINKS.email);
      setCopied(true);
      setNotice(null);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setNotice(`Email: ${CONTACT_LINKS.email}`);
    }
  }

  return (
    <footer id="contact" className="border-t border-[var(--void-border)] bg-[var(--void-bg-alt)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-3 lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--void-accent)]">
              06 / Contact &amp; Inquiries
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--void-ink)] sm:text-3xl">
              {PROFILE.fullName}
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-[var(--void-ink-muted)] sm:text-base">
              {PROFILE.availability}. Reach out directly for OJT opportunities, web &amp; system
              development, or custom ESP32 / 3D prototyping projects.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6">
            {/* Messenger (Primary quick-chat CTA) */}
            <a
              href={CONTACT_LINKS.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-between border border-[var(--void-border)] bg-[var(--void-btn-bg)] px-4 text-sm font-medium text-[var(--void-btn-ink)] transition-colors hover:bg-[var(--void-btn-hover)] sm:col-span-2"
            >
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Message on Messenger
              </span>
              <span className="font-mono text-xs opacity-75">m.me/marcorye255 →</span>
            </a>

            {/* Email + One-Tap Copy */}
            <div className="flex min-h-[48px] border border-[var(--void-border)] bg-[var(--void-surface)]">
              <a
                href={`mailto:${CONTACT_LINKS.email}`}
                className="flex min-w-0 flex-1 items-center gap-2 px-4 text-sm font-medium text-[var(--void-ink)] transition-colors hover:text-[var(--void-accent)]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--void-ink-muted)]" strokeWidth={1.5} />
                <span className="truncate">{CONTACT_LINKS.email}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex min-w-[44px] items-center justify-center border-l border-[var(--void-border)] text-[var(--void-ink-muted)] transition-colors hover:bg-[var(--void-surface-hover)] hover:text-[var(--void-ink)]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--void-live)]" strokeWidth={1.75} />
                ) : (
                  <Copy className="h-4 w-4" strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* GitHub */}
            <a
              href={CONTACT_LINKS.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-between border border-[var(--void-border)] bg-[var(--void-surface)] px-4 text-sm font-medium text-[var(--void-ink)] transition-colors hover:border-[var(--void-border-strong)]"
            >
              <span className="inline-flex items-center gap-2">
                <Github className="h-4 w-4 text-[var(--void-ink-muted)]" strokeWidth={1.5} />
                GitHub
              </span>
              <span className="font-mono text-xs text-[var(--void-accent)]">
                {CONTACT_LINKS.githubHandle}
              </span>
            </a>
          </div>
        </div>

        {notice ? (
          <p className="mt-4 border border-[var(--void-border)] bg-[var(--void-surface)] px-3 py-2 font-mono text-xs text-[var(--void-accent)]">
            {notice}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-[var(--void-border)] pt-6 font-mono text-xs text-[var(--void-ink-dim)] sm:flex-row sm:items-center">
          <span>© 2026 {PROFILE.fullName}</span>
          <span>{PROFILE.university}</span>
        </div>
      </div>
    </footer>
  );
}
