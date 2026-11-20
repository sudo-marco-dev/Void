'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CONTACT_LINKS, PROFILE } from '@/data/portfolio';
import { ThemeToggle } from './theme-toggle';

const NAV_LINKS = [
  { href: '#work', index: '01', label: 'Work' },
  { href: '#craft', index: '02', label: 'Craft' },
  { href: '#stack', index: '03', label: 'Stack' },
  { href: '#community', index: '04', label: 'Community' },
  { href: '#journey', index: '05', label: 'Journey' },
  { href: '#contact', index: '06', label: 'Contact' },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--void-border)] bg-[var(--void-header-bg)] backdrop-blur-md"
      style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="flex min-h-[44px] items-center gap-2.5 font-mono text-xs tracking-wider text-[var(--void-ink)]"
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-[var(--void-live)]"
            aria-hidden="true"
          />
          <span className="font-semibold">{PROFILE.brand}</span>
          <span className="text-[var(--void-ink-dim)]">//</span>
          <span className="text-[var(--void-ink-muted)]">DEV</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-1.5 font-mono text-xs text-[var(--void-ink-muted)] transition-colors hover:text-[var(--void-ink)]"
            >
              <span className="text-[var(--void-ink-dim)] transition-colors group-hover:text-[var(--void-accent)]">
                {item.index}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
          <a
            href={CONTACT_LINKS.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-surface)] px-3 font-mono text-xs text-[var(--void-ink)] transition-colors hover:border-[var(--void-border-strong)]"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--void-ink-muted)]" strokeWidth={1.5} />
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--void-border)] bg-[var(--void-surface)] text-[var(--void-ink)] transition-colors hover:border-[var(--void-border-strong)]"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
            className="overflow-hidden border-t border-[var(--void-border)] bg-[var(--void-bg)] md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-3">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[44px] items-center justify-between border-b border-[var(--void-border-subtle)] py-2 font-mono text-sm text-[var(--void-ink-secondary)] transition-colors hover:text-[var(--void-ink)]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[var(--void-ink-dim)]">{item.index}</span>
                </a>
              ))}
              <a
                href={CONTACT_LINKS.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex min-h-[44px] items-center justify-between border border-[var(--void-border)] bg-[var(--void-surface)] px-4 font-mono text-sm text-[var(--void-ink)]"
              >
                <span>GitHub ({CONTACT_LINKS.githubHandle})</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--void-accent)]" strokeWidth={1.5} />
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
