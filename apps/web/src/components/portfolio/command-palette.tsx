'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Box,
  Command,
  Copy,
  Layers,
  MessageCircle,
  Search,
  SunMoon,
  X,
} from 'lucide-react';
import {
  CONTACT_LINKS,
  FLAGSHIP_PROJECTS,
  SHOWCASE_GALLERY,
} from '@/data/portfolio';
import { useBodyScrollLock } from './motion-primitives';

interface PaletteAction {
  id: string;
  group: 'Sections' | '3D CAD Models' | 'Projects' | 'Actions';
  label: string;
  meta: string;
  keywords: string;
  run: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<PaletteAction[]>(() => {
    const jumpTo = (hash: string) => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const sectionActions: PaletteAction[] = [
      { id: 'sec-top', group: 'Sections', label: 'Top · Hero & Spec Plate', meta: '00', keywords: 'hero top home profile', run: () => jumpTo('#top') },
      { id: 'sec-work', group: 'Sections', label: '01 · Selected Works & Code Zone', meta: '01', keywords: 'work projects code live', run: () => jumpTo('#work') },
      { id: 'sec-craft', group: 'Sections', label: '02 · Maker Cutting Mat & 3D Lab', meta: '02', keywords: 'craft 3d cad prints hardware showcase', run: () => jumpTo('#craft') },
      { id: 'sec-stack', group: 'Sections', label: '03 · Tech & Maker Toolkit', meta: '03', keywords: 'stack skills tools equipment', run: () => jumpTo('#stack') },
      { id: 'sec-community', group: 'Sections', label: '04 · Workshops, Awards & Certificates', meta: '04', keywords: 'awards sui pitbi certificate cipher lab', run: () => jumpTo('#community') },
      { id: 'sec-journey', group: 'Sections', label: '05 · BSIT Progression', meta: '05', keywords: 'journey college timeline psu', run: () => jumpTo('#journey') },
      { id: 'sec-contact', group: 'Sections', label: '06 · Contact & Inquiries', meta: '06', keywords: 'contact email messenger github', run: () => jumpTo('#contact') },
    ];

    const projectActions: PaletteAction[] = FLAGSHIP_PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      group: 'Projects',
      label: p.title,
      meta: p.index,
      keywords: `${p.title} ${p.category} ${p.stack.join(' ')}`,
      run: () => {
        jumpTo('#work');
        window.dispatchEvent(new CustomEvent('void:open-project', { detail: p.id }));
      },
    }));

    const cadActions: PaletteAction[] = SHOWCASE_GALLERY.filter((item) => item.modelSrc).map(
      (item) => ({
        id: `cad-${item.id}`,
        group: '3D CAD Models',
        label: item.title,
        meta: `${item.partCount ?? 2} Parts`,
        keywords: `${item.title} ${item.tools} 3d cad glb onshape`,
        run: () => {
          jumpTo('#showcase');
          window.dispatchEvent(new CustomEvent('void:open-showcase', { detail: item.id }));
        },
      }),
    );

    const utilityActions: PaletteAction[] = [
      {
        id: 'act-theme',
        group: 'Actions',
        label: 'Flip Cutting Mat Theme (Dark Mat / Cream Board)',
        meta: 'Theme',
        keywords: 'theme dark light cream board cutting mat toggle',
        run: () => {
          document.querySelector<HTMLButtonElement>('[data-void-theme-toggle="true"]')?.click();
        },
      },
      {
        id: 'act-copy-email',
        group: 'Actions',
        label: `Copy Email (${CONTACT_LINKS.email})`,
        meta: 'Copy',
        keywords: 'copy email gmail contact',
        run: () => {
          navigator.clipboard?.writeText(CONTACT_LINKS.email).catch(() => {});
        },
      },
      {
        id: 'act-messenger',
        group: 'Actions',
        label: 'Message on Messenger (m.me/marcorye255)',
        meta: 'Chat',
        keywords: 'messenger chat message inquiry',
        run: () => {
          window.open(CONTACT_LINKS.messengerUrl, '_blank', 'noopener,noreferrer');
        },
      },
    ];

    return [...cadActions, ...projectActions, ...utilityActions, ...sectionActions];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q) ||
        a.keywords.toLowerCase().includes(q),
    );
  }, [actions, query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !open &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('void:open-cmd', onOpen);
    window.addEventListener('keydown', onGlobalKey);
    return () => {
      window.removeEventListener('void:open-cmd', onOpen);
      window.removeEventListener('keydown', onGlobalKey);
    };
  }, [open]);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
        );
      } else if (e.key === 'Enter' && filtered[activeIdx]) {
        e.preventDefault();
        const chosen = filtered[activeIdx];
        setOpen(false);
        chosen.run();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, filtered, activeIdx]);

  function getGroupIcon(group: PaletteAction['group'], id: string) {
    if (group === '3D CAD Models') return Box;
    if (group === 'Projects') return Layers;
    if (id === 'act-theme') return SunMoon;
    if (id === 'act-copy-email') return Copy;
    if (id === 'act-messenger') return MessageCircle;
    return ArrowRight;
  }

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24"
          role="dialog"
          aria-modal="true"
          aria-label="Quick command palette"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden border border-[var(--void-border)] bg-[var(--void-surface)] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[var(--void-border)] bg-[var(--void-bg)] px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-[var(--void-accent)]" strokeWidth={1.75} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a project, open a 3D CAD model, or toggle theme..."
                className="w-full bg-transparent text-sm text-[var(--void-ink)] placeholder:text-[var(--void-ink-dim)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close command palette"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--void-border)] text-[var(--void-ink-muted)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="max-h-[60dvh] divide-y divide-[var(--void-border-subtle)] overflow-y-auto overscroll-contain"
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center font-mono text-xs text-[var(--void-ink-dim)]">
                  No matching projects, 3D assemblies, or sections.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = getGroupIcon(item.group, item.id);
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => {
                        setOpen(false);
                        item.run();
                      }}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors ${
                        isActive ? 'bg-[var(--void-surface-hover)]' : ''
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? 'text-[var(--void-accent)]' : 'text-[var(--void-ink-dim)]'
                          }`}
                          strokeWidth={1.6}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[var(--void-ink)]">
                            {item.label}
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--void-ink-dim)]">
                            {item.group}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 border border-[var(--void-border)] bg-[var(--void-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--void-amber)]">
                        {item.meta}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--void-border)] bg-[var(--void-bg)] px-4 py-2 font-mono text-[10px] text-[var(--void-ink-dim)]">
              <span className="inline-flex items-center gap-1.5">
                <Command className="h-3 w-3 text-[var(--void-accent)]" strokeWidth={1.6} />
                <span>↑↓ Navigate · Enter Select · Esc Close</span>
              </span>
              <span>⌘K / Ctrl+K</span>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
